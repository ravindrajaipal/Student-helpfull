# Student Helpfull – AI Exam Preparation Platform

An AI-powered web application that helps students prepare for exams by generating comprehensive study materials in **English** and **Hindi (हिंदी)**.

---

## ✨ Features

### 📤 Upload Material
Upload your own study material (PDF, DOCX, or TXT) and instantly get:
- 📊 **Infographic** – Visual summary of key concepts
- ❓ **Quiz** – Interactive multiple-choice questions with explanations
- 🗺️ **Mind Map** – Hierarchical concept map

### 📚 Topic-Based Generation
Enter any **Subject** and **Topic** to instantly generate:
- 📄 **Full Notes** – Detailed notes with sections and key points
- ⚡ **Revision Notes** – Quick-revision checklist, formulas, and memory tips
- 🃏 **Flash Cards** – Flip-cards for active recall practice
- 📊 **Infographic** – Visual summary
- ❓ **Quiz** – Interactive MCQ quiz with scoring
- 🗺️ **Mind Map** – Visual concept map

### 🌐 Bilingual Support
All content is generated in your choice of **English** or **Hindi** with a single toggle.

---

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.9+
- pip

### 2. Clone & Install

```bash
git clone https://github.com/ravindrajaipal/Student-helpfull.git
cd Student-helpfull
pip install -r requirements.txt
```

### 3. Configure (Optional – for AI-generated content)

The app runs in **Demo Mode** out of the box with sample content.  
For AI-generated content, add your [Google Gemini API key](https://aistudio.google.com):

```bash
cp .env.example .env
# Edit .env and add:  GEMINI_API_KEY=your_key_here
```

### 4. Run

```bash
python app.py
```

Open your browser at **http://localhost:5000**

---

## 🏗️ Project Structure

```
Student-helpfull/
├── app.py                    # Flask application & API routes
├── requirements.txt          # Python dependencies
├── .env.example              # Environment variable template
├── utils/
│   ├── content_generator.py  # AI content generation (Gemini + demo fallback)
│   └── file_processor.py     # File text extraction (PDF / DOCX / TXT)
├── templates/
│   └── index.html            # Single-page frontend
├── static/
│   ├── css/style.css         # Custom styles
│   └── js/main.js            # Frontend logic (quiz engine, language toggle, etc.)
└── uploads/                  # Temporary upload directory (auto-created, not committed)
```

---

## 🔌 API Reference

### `POST /api/generate`
Generate study materials for a subject/topic.

**Request (JSON):**
```json
{
  "subject": "Physics",
  "topic": "Newton's Laws of Motion",
  "language": "english"
}
```

**Response (JSON):**
```json
{
  "success": true,
  "data": {
    "notes": { ... },
    "revision_notes": { ... },
    "flashcards": [ ... ],
    "quiz": [ ... ],
    "mindmap": { ... },
    "infographic": { ... }
  }
}
```

---

### `POST /api/upload`
Upload a file and generate study aids.

**Request (multipart/form-data):**
| Field | Type | Description |
|-------|------|-------------|
| `file` | File | PDF, DOCX, or TXT (max 16 MB) |
| `language` | String | `english` or `hindi` |

**Response (JSON):**
```json
{
  "success": true,
  "filename": "notes.pdf",
  "data": {
    "infographic": { ... },
    "quiz": [ ... ],
    "mindmap": { ... }
  }
}
```

---

## 🤖 AI Integration

The app integrates with **Google Gemini 1.5 Flash** for AI-generated content.

| Mode | Behaviour |
|------|-----------|
| No `GEMINI_API_KEY` | Demo mode – structured sample content |
| With `GEMINI_API_KEY` | Live AI-generated content via Gemini |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask, Flask-CORS |
| AI | Google Gemini 1.5 Flash |
| File parsing | PyPDF2, python-docx |
| Frontend | HTML5, Bootstrap 5, Bootstrap Icons |
| Fonts/Icons | CDN (no build step required) |