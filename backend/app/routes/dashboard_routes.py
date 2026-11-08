from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.repositories import (
    UserRepository, ResumeRepository, JobRepository,
    SkillRepository, RoadmapRepository, InterviewRepository, ActivityRepository
)

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/summary', methods=['GET'])
@jwt_required()
def get_summary():
    user_id = int(get_jwt_identity())
    user = UserRepository.get_by_id(user_id)
    resume = ResumeRepository.get_latest_resume(user_id)
    matches = JobRepository.get_user_matches(user_id)
    roadmap = RoadmapRepository.get_latest_roadmap(user_id)
    interviews = InterviewRepository.get_user_sessions(user_id)
    recent_activities = ActivityRepository.get_recent(user_id, limit=5)

    has_resume = resume is not None and resume.analysis is not None
    resume_score = resume.analysis.overall_score if has_resume else 0
    total_skills = len(resume.analysis.technical_skills) if has_resume else 0

    highest_match = max([m.compatibility_score for m in matches], default=0)
    job_matches_count = len(matches)

    roadmap_progress = roadmap.completion_percentage if roadmap else 0
    interviews_count = len(interviews)

    # Score history from versions
    versions = ResumeRepository.get_user_versions(user_id)
    if versions:
        score_history = [{'date': v.created_at.strftime('%b %d'), 'score': v.overall_score} for v in versions]
    else:
        score_history = [{'date': 'Initial', 'score': resume_score or 75}]

    # Skills distribution
    if has_resume:
        skills_distribution = [
            {'name': 'Languages', 'count': min(5, len(resume.analysis.technical_skills))},
            {'name': 'Frameworks', 'count': len(resume.analysis.tools_and_frameworks)},
            {'name': 'Databases & Tools', 'count': 4},
            {'name': 'Soft Skills', 'count': len(resume.analysis.soft_skills)}
        ]
    else:
        skills_distribution = [
            {'name': 'Languages', 'count': 4},
            {'name': 'Frameworks', 'count': 6},
            {'name': 'Databases', 'count': 3},
            {'name': 'DevOps', 'count': 3}
        ]

    recommended_actions = [
        {
            'id': 'rec-1',
            'title': 'Close Top Skill Gaps for Target Role',
            'action_url': '/skill-gap',
            'category': 'Skill Gap',
            'badge': 'High Priority'
        },
        {
            'id': 'rec-2',
            'title': 'Run Job Match Against Target Company',
            'action_url': '/job-match',
            'category': 'Job Match',
            'badge': 'Recommended'
        },
        {
            'id': 'rec-3',
            'title': 'Practice System Architecture Interview Round',
            'action_url': '/interview',
            'category': 'Interview Prep',
            'badge': 'Actionable'
        }
    ]

    return jsonify({
        'has_resume': has_resume,
        'resume_score': resume_score,
        'total_skills_identified': total_skills,
        'job_matches_analyzed': job_matches_count,
        'highest_job_match': highest_match,
        'skill_gaps_count': 4,
        'roadmap_progress': roadmap_progress,
        'interviews_practiced': interviews_count,
        'recent_activities': [act.to_dict() for act in recent_activities],
        'recommended_actions': recommended_actions,
        'score_history': score_history,
        'skills_distribution': skills_distribution,
        'career_dna': resume.analysis.career_dna if has_resume else None
    }), 200
