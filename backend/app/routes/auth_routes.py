from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app.repositories import UserRepository, ActivityRepository
from app.schemas import RegisterSchema, LoginSchema, ProfileUpdateSchema
from pydantic import ValidationError

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    try:
        valid_data = RegisterSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    existing = UserRepository.get_by_email(valid_data.email)
    if existing:
        return jsonify({'message': 'User with this email already exists'}), 400

    hashed_pw = generate_password_hash(valid_data.password)
    user = UserRepository.create_user(
        name=valid_data.name,
        email=valid_data.email,
        password_hash=hashed_pw
    )

    token = create_access_token(identity=str(user.id))
    ActivityRepository.log(user.id, 'user_registered', 'Account created successfully')

    return jsonify({
        'token': token,
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    try:
        valid_data = LoginSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    user = UserRepository.get_by_email(valid_data.email)
    if not user or not check_password_hash(user.password_hash, valid_data.password):
        return jsonify({'message': 'Invalid email or password'}), 401

    token = create_access_token(identity=str(user.id))
    ActivityRepository.log(user.id, 'user_login', 'Signed into CareerIQ portal')

    return jsonify({
        'token': token,
        'user': user.to_dict()
    }), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required(optional=True)
def logout():
    return jsonify({'message': 'Logged out successfully'}), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = int(get_jwt_identity())
    user = UserRepository.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'user': user.to_dict()}), 200


@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        valid_data = ProfileUpdateSchema(**data)
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.errors()}), 400

    profile = UserRepository.update_profile(user_id, **valid_data.model_dump(exclude_unset=True))
    return jsonify(profile.to_dict()), 200


@auth_bp.route('/update-password', methods=['POST'])
@jwt_required()
def update_password():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    new_pw = data.get('new_password')
    if not new_pw or len(new_pw) < 6:
        return jsonify({'message': 'New password must be at least 6 characters'}), 400

    user = UserRepository.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    from app.models import db
    user.password_hash = generate_password_hash(new_pw)
    db.session.commit()
    return jsonify({'message': 'Password updated successfully'}), 200
