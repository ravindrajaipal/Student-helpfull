"""
File processor utility for extracting text from uploaded files.
Supports PDF, DOCX, and TXT formats.
"""
import os


def extract_text_from_file(filepath: str) -> str:
    """
    Extract text content from a file based on its extension.
    
    Args:
        filepath: Absolute path to the uploaded file.
    
    Returns:
        Extracted text string, or an error message if extraction fails.
    """
    ext = os.path.splitext(filepath)[1].lower()

    if ext == ".pdf":
        return _extract_from_pdf(filepath)
    elif ext in (".docx", ".doc"):
        return _extract_from_docx(filepath)
    elif ext == ".txt":
        return _extract_from_txt(filepath)
    else:
        return ""


def _extract_from_pdf(filepath: str) -> str:
    try:
        import PyPDF2

        text_parts = []
        with open(filepath, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text_parts.append(page_text)
        return "\n".join(text_parts)
    except Exception as e:
        return f"[PDF extraction error: {e}]"


def _extract_from_docx(filepath: str) -> str:
    try:
        from docx import Document

        doc = Document(filepath)
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n".join(paragraphs)
    except Exception as e:
        return f"[DOCX extraction error: {e}]"


def _extract_from_txt(filepath: str) -> str:
    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except Exception as e:
        return f"[TXT extraction error: {e}]"
