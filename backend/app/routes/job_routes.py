from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.repositories import ResumeRepository, JobRepository, ActivityRepository
from app.services.job_match_service import JobMatchService
from app.schemas import JobAnalyzeSchema, JobSimulateSchema
from pydantic import ValidationError

job_bp = Blueprint('jobs', __name__, url_prefix='/api/jobs')

@job_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_job():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = JobAnalyzeSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    resume = ResumeRepository.get_latest_resume(user_id)
    resume_text = resume.extracted_text if resume else "Python, TypeScript, React, Docker, SQL developer"
    resume_skills = resume.analysis.technical_skills if (resume and resume.analysis) else None

    match_result = JobMatchService.calculate_match(
        resume_text=resume_text,
        job_description=valid_data.job_description,
        resume_skills=resume_skills,
        job_title=valid_data.job_title,
        company=valid_data.company
    )

    resume_id = resume.id if resume else None
    saved_match = JobRepository.save_job_match(user_id, resume_id, match_result)

    ActivityRepository.log(
        user_id,
        'job_matched',
        f"Analyzed match for {valid_data.job_title} at {valid_data.company} ({match_result['compatibility_score']}%)"
    )

    return jsonify(saved_match.to_dict()), 200


@job_bp.route('/matches', methods=['GET'])
@jwt_required()
def get_matches():
    user_id = int(get_jwt_identity())
    matches = JobRepository.get_user_matches(user_id)
    return jsonify([m.to_dict() for m in matches]), 200


@job_bp.route('/simulate', methods=['POST'])
@jwt_required()
def simulate():
    data = request.get_json() or {}
    try:
        valid_data = JobSimulateSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    user_id = int(get_jwt_identity())
    resume = ResumeRepository.get_latest_resume(user_id)
    current_score = resume.analysis.overall_score if (resume and resume.analysis) else 75

    result = JobMatchService.simulate(
        original_score=current_score,
        added_skills=valid_data.added_skills,
        added_projects=valid_data.added_projects,
        job_description=valid_data.job_description
    )

    return jsonify(result), 200
