from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.repositories import UserRepository, RoadmapRepository, ActivityRepository
from app.services.roadmap_service import RoadmapService
from app.schemas import RoadmapGenerateSchema, TaskUpdateSchema
from pydantic import ValidationError

roadmap_bp = Blueprint('roadmap', __name__, url_prefix='/api/roadmap')

@roadmap_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_roadmap():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = RoadmapGenerateSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    user = UserRepository.get_by_id(user_id)
    profile_dict = user.profile.to_dict() if (user and user.profile) else {}

    roadmap_data = RoadmapService.generate_roadmap(valid_data.target_role, profile_dict)
    saved_roadmap = RoadmapRepository.save_roadmap(user_id, valid_data.target_role, roadmap_data)

    ActivityRepository.log(user_id, 'roadmap_generated', f"Generated career roadmap for {valid_data.target_role}")

    return jsonify(saved_roadmap.to_dict()), 201


@roadmap_bp.route('/latest', methods=['GET'])
@jwt_required()
def get_latest():
    user_id = int(get_jwt_identity())
    roadmap = RoadmapRepository.get_latest_roadmap(user_id)
    if not roadmap:
        user = UserRepository.get_by_id(user_id)
        role = user.profile.target_role if (user and user.profile and user.profile.target_role) else 'Full Stack Software Engineer'
        roadmap_data = RoadmapService.generate_roadmap(role)
        roadmap = RoadmapRepository.save_roadmap(user_id, role, roadmap_data)
    return jsonify(roadmap.to_dict()), 200


@roadmap_bp.route('/tasks/<int:task_id>', methods=['PATCH'])
@jwt_required()
def update_task(task_id: int):
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = TaskUpdateSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    task = RoadmapRepository.update_task_completion(task_id, valid_data.is_completed)
    if not task:
        return jsonify({'message': 'Task not found'}), 404

    ActivityRepository.log(
        user_id,
        'roadmap_task',
        f"{'Completed' if valid_data.is_completed else 'Unchecked'} task: '{task.title}'"
    )

    return jsonify(task.to_dict()), 200
