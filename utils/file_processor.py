"""
File processor utility for extracting text from uploaded files.
Supports PDF, DOCX, and TXT formats.
"""
import os


class ExtractionError(ValueError):
    """Raised when text cannot be extracted from an uploaded file."""


def extract_text_from_file(filepath: str) -> str:
    """
    Extract text content from a file based on its extension.

    Args:
        filepath: Absolute path to the uploaded file.

    Returns:
        Extracted text string (non-empty).

    Raises:
        ExtractionError: If the file type is unsupported or extraction fails.
    """
    ext = os.path.splitext(filepath)[1].lower()

    if ext == ".pdf":
        return _extract_from_pdf(filepath)
    elif ext in (".docx", ".doc"):
        return _extract_from_docx(filepath)
    elif ext == ".txt":
        return _extract_from_txt(filepath)
    else:
        raise ExtractionError(f"Unsupported file type: {ext}")


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
        if not text_parts:
            raise ExtractionError("No readable text found in the PDF. The file may be image-based or encrypted.")
        return "\n".join(text_parts)
    except ExtractionError:
        raise
    except Exception as e:
        raise ExtractionError(f"PDF extraction failed: {e}") from e


def _extract_from_docx(filepath: str) -> str:
    try:
        from docx import Document

        doc = Document(filepath)
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        if not paragraphs:
            raise ExtractionError("No readable text found in the document.")
        return "\n".join(paragraphs)
    except ExtractionError:
        raise
    except Exception as e:
        raise ExtractionError(f"DOCX extraction failed: {e}") from e


def _extract_from_txt(filepath: str) -> str:
    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            text = f.read()
        if not text.strip():
            raise ExtractionError("The text file appears to be empty.")
        return text
    except ExtractionError:
        raise
    except Exception as e:
        raise ExtractionError(f"TXT extraction failed: {e}") from e
