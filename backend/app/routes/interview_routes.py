from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.repositories import InterviewRepository, ActivityRepository
from app.services.interview_service import InterviewService
from app.schemas import InterviewGenerateSchema, InterviewEvaluateSchema
from pydantic import ValidationError

interview_bp = Blueprint('interview', __name__, url_prefix='/api/interview')

@interview_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = InterviewGenerateSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    questions = InterviewService.generate_questions(
        role=valid_data.role,
        category=valid_data.category,
        difficulty=valid_data.difficulty,
        count=valid_data.count
    )

    session = InterviewRepository.create_session(
        user_id=user_id,
        role=valid_data.role,
        category=valid_data.category,
        difficulty=valid_data.difficulty,
        questions_data=questions
    )

    ActivityRepository.log(user_id, 'interview_session', f"Created {valid_data.category} interview practice session")

    return jsonify(session.to_dict()), 201


@interview_bp.route('/evaluate', methods=['POST'])
@jwt_required()
def evaluate():
    data = request.get_json() or {}
    try:
        valid_data = InterviewEvaluateSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    eval_result = InterviewService.evaluate_answer(
        question=valid_data.question,
        category=valid_data.category,
        difficulty=valid_data.difficulty,
        user_answer=valid_data.user_answer,
        key_points=valid_data.key_points
    )

    user_id = int(get_jwt_identity())
    ActivityRepository.log(user_id, 'interview_answer', f"Evaluated interview answer with score {eval_result['overall_score']}/100")

    return jsonify(eval_result), 200


@interview_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = int(get_jwt_identity())
    sessions = InterviewRepository.get_user_sessions(user_id)
    return jsonify([s.to_dict() for s in sessions]), 200
