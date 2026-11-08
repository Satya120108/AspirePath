import os
import json
import re
from config import Config

class GeminiService:
    @classmethod
    def get_client(cls):
        api_key = Config.GEMINI_API_KEY or os.getenv('GEMINI_API_KEY', '')
        if not api_key:
            return None
        try:
            from google import genai
            return genai.Client(api_key=api_key)
        except Exception as e:
            print(f"[GeminiService] Could not initialize genai Client: {e}")
            return None

    @classmethod
    def generate_json(cls, prompt: str, fallback_data: dict) -> dict:
        client = cls.get_client()
        if not client:
            return fallback_data

        try:
            model_name = Config.GEMINI_MODEL or 'gemini-2.5-flash'
            system_instruction = (
                "You are an expert ATS and Senior Engineering Career Coach. "
                "Respond ONLY with valid, raw JSON matching the requested structure. "
                "Do not include Markdown backticks or commentary."
            )

            response = client.models.generate_content(
                model=model_name,
                contents=f"{system_instruction}\n\n{prompt}"
            )

            text_output = response.text.strip()
            
            # Clean possible markdown wrapping like ```json ... ```
            if text_output.startswith('```'):
                text_output = re.sub(r'^```(?:json)?\s*', '', text_output)
                text_output = re.sub(r'\s*```$', '', text_output)

            parsed = json.loads(text_output)
            return parsed
        except Exception as err:
            print(f"[GeminiService Error] {err}. Using fallback response.")
            return fallback_data
