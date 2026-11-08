from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.repositories import ResumeRepository, SkillRepository, ActivityRepository
from app.services.skill_gap_service import SkillGapService
from app.schemas import SkillAnalyzeSchema
from pydantic import ValidationError

skill_bp = Blueprint('skills', __name__, url_prefix='/api/skills')

@skill_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_skills():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = SkillAnalyzeSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    resume = ResumeRepository.get_latest_resume(user_id)
    user_skills = resume.analysis.technical_skills if (resume and resume.analysis) else None

    gap_data = SkillGapService.analyze_gaps(valid_data.target_role, user_skills)
    saved_gap = SkillRepository.save_skill_gap(user_id, valid_data.target_role, gap_data)

    ActivityRepository.log(user_id, 'skill_gap_analyzed', f"Evaluated skill gaps for {valid_data.target_role}")

    return jsonify(saved_gap.to_dict()), 200


@skill_bp.route('/gaps', methods=['GET'])
@jwt_required()
def get_gaps():
    user_id = int(get_jwt_identity())
    target_role = request.args.get('target_role', 'Full Stack Software Engineer')
    gap = SkillRepository.get_skill_gap(user_id, target_role)
    if not gap:
        gap_data = SkillGapService.analyze_gaps(target_role)
        gap = SkillRepository.save_skill_gap(user_id, target_role, gap_data)
    return jsonify(gap.to_dict()), 200


@skill_bp.route('/recommend-projects', methods=['POST'])
@jwt_required()
def recommend_projects():
    data = request.get_json() or {}
    target_role = data.get('target_role', 'Full Stack Software Engineer')
    gap_data = SkillGapService.analyze_gaps(target_role)
    return jsonify({'projects': gap_data['recommended_projects']}), 200
