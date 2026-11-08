from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), default='Student / Job Seeker')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    profile = db.relationship('UserProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    resumes = db.relationship('Resume', backref='user', cascade='all, delete-orphan')
    skills = db.relationship('ExtractedSkill', backref='user', cascade='all, delete-orphan')
    job_descriptions = db.relationship('JobDescription', backref='user', cascade='all, delete-orphan')
    job_matches = db.relationship('JobMatch', backref='user', cascade='all, delete-orphan')
    skill_gaps = db.relationship('SkillGap', backref='user', cascade='all, delete-orphan')
    roadmaps = db.relationship('CareerRoadmap', backref='user', cascade='all, delete-orphan')
    interview_sessions = db.relationship('InterviewSession', backref='user', cascade='all, delete-orphan')
    saved_jobs = db.relationship('SavedJob', backref='user', cascade='all, delete-orphan')
    activities = db.relationship('CareerActivity', backref='user', cascade='all, delete-orphan')
    resume_versions = db.relationship('ResumeVersion', backref='user', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'profile': self.profile.to_dict() if self.profile else None
        }


class UserProfile(db.Model):
    __tablename__ = 'user_profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True)
    full_name = db.Column(db.String(100))
    headline = db.Column(db.String(200))
    phone = db.Column(db.String(30))
    location = db.Column(db.String(100))
    target_role = db.Column(db.String(120), default='Full Stack Software Engineer')
    experience_level = db.Column(db.String(30), default='Entry')
    bio = db.Column(db.Text)
    linkedin_url = db.Column(db.String(255))
    github_url = db.Column(db.String(255))
    portfolio_url = db.Column(db.String(255))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'full_name': self.full_name,
            'headline': self.headline,
            'phone': self.phone,
            'location': self.location,
            'target_role': self.target_role,
            'experience_level': self.experience_level,
            'bio': self.bio,
            'linkedin_url': self.linkedin_url,
            'github_url': self.github_url,
            'portfolio_url': self.portfolio_url
        }


class Resume(db.Model):
    __tablename__ = 'resumes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.Integer)
    extracted_text = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    analysis = db.relationship('ResumeAnalysis', backref='resume', uselist=False, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'filename': self.filename,
            'file_size': self.file_size,
            'extracted_text': self.extracted_text[:1000] + '...' if len(self.extracted_text) > 1000 else self.extracted_text,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'analysis': self.analysis.to_dict() if self.analysis else None
        }


class ResumeAnalysis(db.Model):
    __tablename__ = 'resume_analyses'

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resumes.id', ondelete='CASCADE'), nullable=False, unique=True)
    overall_score = db.Column(db.Integer, nullable=False)
    score_breakdown = db.Column(db.JSON, nullable=False)
    contact_info = db.Column(db.JSON, default=dict)
    technical_skills = db.Column(db.JSON, default=list)
    soft_skills = db.Column(db.JSON, default=list)
    tools_and_frameworks = db.Column(db.JSON, default=list)
    education = db.Column(db.JSON, default=list)
    experience = db.Column(db.JSON, default=list)
    projects = db.Column(db.JSON, default=list)
    certifications = db.Column(db.JSON, default=list)
    achievements = db.Column(db.JSON, default=list)
    strengths = db.Column(db.JSON, default=list)
    weaknesses = db.Column(db.JSON, default=list)
    missing_information = db.Column(db.JSON, default=list)
    ats_suggestions = db.Column(db.JSON, default=list)
    improved_summary = db.Column(db.Text)
    career_dna = db.Column(db.JSON, default=dict)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'resume_id': self.resume_id,
            'overall_score': self.overall_score,
            'score_breakdown': self.score_breakdown,
            'contact_info': self.contact_info,
            'technical_skills': self.technical_skills,
            'soft_skills': self.soft_skills,
            'tools_and_frameworks': self.tools_and_frameworks,
            'education': self.education,
            'experience': self.experience,
            'projects': self.projects,
            'certifications': self.certifications,
            'achievements': self.achievements,
            'strengths': self.strengths,
            'weaknesses': self.weaknesses,
            'missing_information': self.missing_information,
            'ats_suggestions': self.ats_suggestions,
            'improved_summary': self.improved_summary,
            'career_dna': self.career_dna,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class ExtractedSkill(db.Model):
    __tablename__ = 'extracted_skills'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resumes.id', ondelete='CASCADE'), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), default='technical')
    proficiency = db.Column(db.String(50), default='Intermediate')
    years_experience = db.Column(db.Float, default=1.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'proficiency': self.proficiency,
            'years_experience': self.years_experience
        }


class JobDescription(db.Model):
    __tablename__ = 'job_descriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    job_title = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(100))
    raw_text = db.Column(db.Text, nullable=False)
    extracted_skills = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class JobMatch(db.Model):
    __tablename__ = 'job_matches'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resumes.id', ondelete='CASCADE'), nullable=True)
    job_title = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(100))
    compatibility_score = db.Column(db.Integer, nullable=False)
    breakdown = db.Column(db.JSON, nullable=False)
    matching_skills = db.Column(db.JSON, default=list)
    missing_skills = db.Column(db.JSON, default=list)
    relevant_experience_matches = db.Column(db.JSON, default=list)
    relevant_projects_matches = db.Column(db.JSON, default=list)
    match_explanation = db.Column(db.Text)
    actionable_recommendations = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'job_title': self.job_title,
            'company': self.company,
            'compatibility_score': self.compatibility_score,
            'breakdown': self.breakdown,
            'matching_skills': self.matching_skills,
            'missing_skills': self.missing_skills,
            'relevant_experience_matches': self.relevant_experience_matches,
            'relevant_projects_matches': self.relevant_projects_matches,
            'match_explanation': self.match_explanation,
            'actionable_recommendations': self.actionable_recommendations,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class SkillGap(db.Model):
    __tablename__ = 'skill_gaps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    target_role = db.Column(db.String(120), nullable=False)
    existing_skills = db.Column(db.JSON, default=list)
    required_skills = db.Column(db.JSON, default=list)
    missing_skills = db.Column(db.JSON, default=list)
    recommended_projects = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'target_role': self.target_role,
            'existing_skills': self.existing_skills,
            'required_skills': self.required_skills,
            'missing_skills': self.missing_skills,
            'recommended_projects': self.recommended_projects
        }


class CareerRoadmap(db.Model):
    __tablename__ = 'career_roadmaps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    target_role = db.Column(db.String(120), nullable=False)
    summary = db.Column(db.Text)
    total_duration_weeks = db.Column(db.Integer, default=8)
    completion_percentage = db.Column(db.Integer, default=0)
    recommended_capstone_project = db.Column(db.JSON, default=dict)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    tasks = db.relationship('RoadmapTask', backref='roadmap', cascade='all, delete-orphan', order_by='RoadmapTask.order')

    def to_dict(self):
        return {
            'id': self.id,
            'target_role': self.target_role,
            'summary': self.summary,
            'total_duration_weeks': self.total_duration_weeks,
            'completion_percentage': self.completion_percentage,
            'recommended_capstone_project': self.recommended_capstone_project,
            'tasks': [t.to_dict() for t in self.tasks],
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class RoadmapTask(db.Model):
    __tablename__ = 'roadmap_tasks'

    id = db.Column(db.Integer, primary_key=True)
    roadmap_id = db.Column(db.Integer, db.ForeignKey('career_roadmaps.id', ondelete='CASCADE'), nullable=False, index=True)
    stage = db.Column(db.String(30), nullable=False)  # Beginner, Intermediate, Advanced
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    skills = db.Column(db.JSON, default=list)
    resource_url = db.Column(db.String(500))
    resource_name = db.Column(db.String(200))
    estimated_days = db.Column(db.Integer, default=5)
    is_completed = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'stage': self.stage,
            'title': self.title,
            'description': self.description,
            'skills': self.skills,
            'resource_url': self.resource_url,
            'resource_name': self.resource_name,
            'estimated_days': self.estimated_days,
            'is_completed': self.is_completed,
            'order': self.order
        }


class InterviewSession(db.Model):
    __tablename__ = 'interview_sessions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    role = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    difficulty = db.Column(db.String(30), nullable=False)
    score_average = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    questions = db.relationship('InterviewQuestion', backref='session', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'role': self.role,
            'category': self.category,
            'difficulty': self.difficulty,
            'score_average': self.score_average,
            'questions': [q.to_dict() for q in self.questions],
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class InterviewQuestion(db.Model):
    __tablename__ = 'interview_questions'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('interview_sessions.id', ondelete='CASCADE'), nullable=False, index=True)
    category = db.Column(db.String(50))
    difficulty = db.Column(db.String(30))
    question = db.Column(db.Text, nullable=False)
    expected_key_points = db.Column(db.JSON, default=list)
    user_answer = db.Column(db.Text)
    evaluation = db.Column(db.JSON, default=dict)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'session_id': self.session_id,
            'category': self.category,
            'difficulty': self.difficulty,
            'question': self.question,
            'expected_key_points': self.expected_key_points,
            'user_answer': self.user_answer,
            'evaluation': self.evaluation
        }


class SavedJob(db.Model):
    __tablename__ = 'saved_jobs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    job_title = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(100))
    url = db.Column(db.String(500))
    notes = db.Column(db.Text)
    status = db.Column(db.String(50), default='Saved')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class CareerActivity(db.Model):
    __tablename__ = 'career_activities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    activity_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    meta_data = db.Column(db.JSON, default=dict)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'activity_type': self.activity_type,
            'description': self.description,
            'timestamp': self.created_at.strftime('%b %d, %Y') if self.created_at else 'Recent'
        }


class ResumeVersion(db.Model):
    __tablename__ = 'resume_versions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    version_number = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    overall_score = db.Column(db.Integer, nullable=False)
    skills_count = db.Column(db.Integer, default=0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'version_number': self.version_number,
            'title': self.title,
            'overall_score': self.overall_score,
            'skills_count': self.skills_count,
            'notes': self.notes,
            'created_at': self.created_at.strftime('%Y-%m-%d') if self.created_at else '2024-11-01'
        }
