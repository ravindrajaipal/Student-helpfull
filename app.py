"""
Student Helpfull – Exam Preparation Platform
Main Flask application entry point.
"""
import os
import json
from pathlib import Path

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

from utils.file_processor import extract_text_from_file
from utils.content_generator import generate_from_material, generate_from_topic

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = Path(__file__).parent / "uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)
ALLOWED_EXTENSIONS = {"pdf", "docx", "doc", "txt"}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB

app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/upload", methods=["POST"])
def upload_material():
    """
    Accept a file upload, extract its text, and return generated study aids.
    Form fields:
        file     – the uploaded file (PDF / DOCX / TXT)
        language – 'english' or 'hindi' (default: 'english')
    """
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not supported. Please upload PDF, DOCX, or TXT files."}), 400

    language = request.form.get("language", "english").lower()
    if language not in ("english", "hindi"):
        language = "english"

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    try:
        extracted_text = extract_text_from_file(filepath)
        result = generate_from_material(extracted_text, language)
        return jsonify({"success": True, "filename": filename, "data": result})
    except Exception:
        app.logger.exception("Error processing uploaded file")
        return jsonify({"error": "Processing failed. Please check your file and try again."}), 500
    finally:
        # Remove the uploaded file after processing to save disk space
        try:
            os.remove(filepath)
        except OSError:
            pass


@app.route("/api/generate", methods=["POST"])
def generate_topic():
    """
    Generate comprehensive study materials for a given subject and topic.
    JSON body:
        subject  – e.g. "Physics"
        topic    – e.g. "Newton's Laws of Motion"
        language – 'english' or 'hindi' (default: 'english')
    """
    body = request.get_json(silent=True) or {}

    subject = (body.get("subject") or "").strip()
    topic = (body.get("topic") or "").strip()
    language = (body.get("language") or "english").lower()

    if not subject:
        return jsonify({"error": "Subject is required"}), 400
    if not topic:
        return jsonify({"error": "Topic is required"}), 400
    if language not in ("english", "hindi"):
        language = "english"

    try:
        result = generate_from_topic(subject, topic, language)
        return jsonify({"success": True, "subject": subject, "topic": topic, "data": result})
    except Exception:
        app.logger.exception("Error generating topic content")
        return jsonify({"error": "Content generation failed. Please try again."}), 500


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
