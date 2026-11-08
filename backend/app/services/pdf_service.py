import re
from pathlib import Path
from pypdf import PdfReader

class PDFService:
    @staticmethod
    def extract_text(file_path: str) -> str:
        """
        Extracts clean text from a PDF file using pypdf.
        Handles formatting, empty pages, and newline normalization.
        """
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"PDF file not found at {file_path}")

        reader = PdfReader(str(path))
        extracted_pages = []

        for page_num, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                extracted_pages.append(text)

        full_text = "\n\n".join(extracted_pages)
        
        # Clean up excessive whitespace and artifact chars
        full_text = re.sub(r'\r\n', '\n', full_text)
        full_text = re.sub(r'\n{3,}', '\n\n', full_text)
        full_text = re.sub(r'[ \t]{2,}', ' ', full_text)

        return full_text.strip()
