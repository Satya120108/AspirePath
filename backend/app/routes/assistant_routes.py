from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.repositories import UserRepository, ResumeRepository
from app.services.assistant_service import AssistantService
from app.schemas import AssistantChatSchema
from pydantic import ValidationError

assistant_bp = Blueprint('assistant', __name__, url_prefix='/api/assistant')

@assistant_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = AssistantChatSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    user = UserRepository.get_by_id(user_id)
    resume = ResumeRepository.get_latest_resume(user_id)

    user_context = {
        'name': user.name if user else 'Candidate',
        'target_role': user.profile.target_role if (user and user.profile) else 'Software Engineer',
        'experience_level': user.profile.experience_level if (user and user.profile) else 'Entry',
        'resume_score': resume.analysis.overall_score if (resume and resume.analysis) else None,
        'technical_skills': resume.analysis.technical_skills if (resume and resume.analysis) else []
    }

    reply = AssistantService.chat(
        user_message=valid_data.message,
        user_context=user_context,
        history=valid_data.history
    )

    return jsonify({'response': reply}), 200
