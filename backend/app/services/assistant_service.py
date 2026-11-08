from typing import List, Dict, Any
from app.services.gemini_service import GeminiService

class AssistantService:
    @classmethod
    def chat(cls, user_message: str, user_context: dict = None, history: List[Dict[str, Any]] = None) -> str:
        prompt = (
            f"Candidate Profile: {user_context or {}}\n"
            f"User Question: {user_message}\n"
            "Provide helpful, practical, and highly motivating career guidance specifically for software and technology job candidates."
        )

        fallback = (
            f"Based on your profile as an aspiring {user_context.get('target_role', 'Software Engineer') if user_context else 'Software Engineer'}, "
            "I recommend focusing on high-impact projects that showcase end-to-end full stack architecture. "
            "Make sure your resume emphasizes quantified metrics (e.g., 'reduced API latency by 38%') rather than generic duty descriptions."
        )

        try:
            client = GeminiService.get_client()
            if not client:
                return fallback

            from config import Config
            model_name = Config.GEMINI_MODEL or 'gemini-2.5-flash'
            resp = client.models.generate_content(
                model=model_name,
                contents=prompt
            )
            return resp.text.strip()
        except Exception as e:
            print(f"[AssistantService] {e}")
            return fallback
