from app.models import (
    db, User, UserProfile, Resume, ResumeAnalysis, ExtractedSkill,
    JobDescription, JobMatch, SkillGap, CareerRoadmap, RoadmapTask,
    InterviewSession, InterviewQuestion, SavedJob, CareerActivity, ResumeVersion
)

class UserRepository:
    @staticmethod
    def get_by_id(user_id: int):
        return User.query.get(user_id)

    @staticmethod
    def get_by_email(email: str):
        return User.query.filter_by(email=email.lower().strip()).first()

    @staticmethod
    def create_user(name: str, email: str, password_hash: str):
        user = User(
            name=name,
            email=email.lower().strip(),
            password_hash=password_hash
        )
        db.session.add(user)
        db.session.flush()

        profile = UserProfile(
            user_id=user.id,
            full_name=name,
            headline='Aspiring Software Engineer'
        )
        db.session.add(profile)
        db.session.commit()
        return user

    @staticmethod
    def update_profile(user_id: int, **kwargs):
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = UserProfile(user_id=user_id)
            db.session.add(profile)

        for key, value in kwargs.items():
            if hasattr(profile, key) and value is not None:
                setattr(profile, key, value)

        db.session.commit()
        return profile


class ResumeRepository:
    @staticmethod
    def save_resume(user_id: int, filename: str, file_path: str, file_size: int, extracted_text: str):
        # Set previous resumes to inactive
        Resume.query.filter_by(user_id=user_id).update({'is_active': False})
        resume = Resume(
            user_id=user_id,
            filename=filename,
            file_path=file_path,
            file_size=file_size,
            extracted_text=extracted_text,
            is_active=True
        )
        db.session.add(resume)
        db.session.commit()
        return resume

    @staticmethod
    def get_latest_resume(user_id: int):
        return Resume.query.filter_by(user_id=user_id, is_active=True).order_by(Resume.id.desc()).first()

    @staticmethod
    def save_analysis(resume_id: int, analysis_data: dict):
        existing = ResumeAnalysis.query.filter_by(resume_id=resume_id).first()
        if existing:
            db.session.delete(existing)
            db.session.flush()

        analysis = ResumeAnalysis(
            resume_id=resume_id,
            overall_score=analysis_data.get('overall_score', 80),
            score_breakdown=analysis_data.get('score_breakdown', {}),
            contact_info=analysis_data.get('contact_info', {}),
            technical_skills=analysis_data.get('technical_skills', []),
            soft_skills=analysis_data.get('soft_skills', []),
            tools_and_frameworks=analysis_data.get('tools_and_frameworks', []),
            education=analysis_data.get('education', []),
            experience=analysis_data.get('experience', []),
            projects=analysis_data.get('projects', []),
            certifications=analysis_data.get('certifications', []),
            achievements=analysis_data.get('achievements', []),
            strengths=analysis_data.get('strengths', []),
            weaknesses=analysis_data.get('weaknesses', []),
            missing_information=analysis_data.get('missing_information', []),
            ats_suggestions=analysis_data.get('ats_suggestions', []),
            improved_summary=analysis_data.get('improved_summary', ''),
            career_dna=analysis_data.get('career_dna', {})
        )
        db.session.add(analysis)
        db.session.commit()
        return analysis

    @staticmethod
    def get_analysis_by_resume_id(resume_id: int):
        return ResumeAnalysis.query.filter_by(resume_id=resume_id).first()

    @staticmethod
    def save_version(user_id: int, version_number: int, title: str, overall_score: int, skills_count: int, notes: str):
        version = ResumeVersion(
            user_id=user_id,
            version_number=version_number,
            title=title,
            overall_score=overall_score,
            skills_count=skills_count,
            notes=notes
        )
        db.session.add(version)
        db.session.commit()
        return version

    @staticmethod
    def get_user_versions(user_id: int):
        return ResumeVersion.query.filter_by(user_id=user_id).order_by(ResumeVersion.version_number.asc()).all()


class JobRepository:
    @staticmethod
    def save_job_match(user_id: int, resume_id: int, match_data: dict):
        match = JobMatch(
            user_id=user_id,
            resume_id=resume_id,
            job_title=match_data.get('job_title', 'Software Engineer'),
            company=match_data.get('company', 'Tech Company'),
            compatibility_score=match_data.get('compatibility_score', 75),
            breakdown=match_data.get('breakdown', {}),
            matching_skills=match_data.get('matching_skills', []),
            missing_skills=match_data.get('missing_skills', []),
            relevant_experience_matches=match_data.get('relevant_experience_matches', []),
            relevant_projects_matches=match_data.get('relevant_projects_matches', []),
            match_explanation=match_data.get('match_explanation', ''),
            actionable_recommendations=match_data.get('actionable_recommendations', [])
        )
        db.session.add(match)
        db.session.commit()
        return match

    @staticmethod
    def get_user_matches(user_id: int):
        return JobMatch.query.filter_by(user_id=user_id).order_by(JobMatch.id.desc()).all()


class SkillRepository:
    @staticmethod
    def save_skill_gap(user_id: int, target_role: str, gap_data: dict):
        gap = SkillGap.query.filter_by(user_id=user_id, target_role=target_role).first()
        if not gap:
            gap = SkillGap(user_id=user_id, target_role=target_role)
            db.session.add(gap)

        gap.existing_skills = gap_data.get('existing_skills', [])
        gap.required_skills = gap_data.get('required_skills', [])
        gap.missing_skills = gap_data.get('missing_skills', [])
        gap.recommended_projects = gap_data.get('recommended_projects', [])
        db.session.commit()
        return gap

    @staticmethod
    def get_skill_gap(user_id: int, target_role: str):
        return SkillGap.query.filter_by(user_id=user_id, target_role=target_role).first()


class RoadmapRepository:
    @staticmethod
    def save_roadmap(user_id: int, target_role: str, roadmap_data: dict):
        # Remove previous roadmap for this role to overwrite with updated tasks
        existing = CareerRoadmap.query.filter_by(user_id=user_id, target_role=target_role).first()
        if existing:
            db.session.delete(existing)
            db.session.flush()

        roadmap = CareerRoadmap(
            user_id=user_id,
            target_role=target_role,
            summary=roadmap_data.get('summary', ''),
            total_duration_weeks=roadmap_data.get('total_duration_weeks', 8),
            completion_percentage=roadmap_data.get('completion_percentage', 0),
            recommended_capstone_project=roadmap_data.get('recommended_capstone_project', {})
        )
        db.session.add(roadmap)
        db.session.flush()

        for idx, t in enumerate(roadmap_data.get('tasks', [])):
            task = RoadmapTask(
                roadmap_id=roadmap.id,
                stage=t.get('stage', 'Beginner'),
                title=t.get('title', 'Task'),
                description=t.get('description', ''),
                skills=t.get('skills', []),
                resource_url=t.get('resource_url', ''),
                resource_name=t.get('resource_name', ''),
                estimated_days=t.get('estimated_days', 5),
                is_completed=t.get('is_completed', False),
                order=idx + 1
            )
            db.session.add(task)

        db.session.commit()
        return roadmap

    @staticmethod
    def get_latest_roadmap(user_id: int):
        return CareerRoadmap.query.filter_by(user_id=user_id).order_by(CareerRoadmap.id.desc()).first()

    @staticmethod
    def update_task_completion(task_id: int, is_completed: bool):
        task = RoadmapTask.query.get(task_id)
        if task:
            task.is_completed = is_completed
            roadmap = CareerRoadmap.query.get(task.roadmap_id)
            if roadmap:
                all_tasks = RoadmapTask.query.filter_by(roadmap_id=roadmap.id).all()
                completed = sum(1 for t in all_tasks if (t.is_completed if t.id != task_id else is_completed))
                roadmap.completion_percentage = int((completed / len(all_tasks)) * 100) if all_tasks else 0
            db.session.commit()
        return task


class InterviewRepository:
    @staticmethod
    def create_session(user_id: int, role: str, category: str, difficulty: str, questions_data: list):
        session = InterviewSession(
            user_id=user_id,
            role=role,
            category=category,
            difficulty=difficulty,
            score_average=0.0
        )
        db.session.add(session)
        db.session.flush()

        for q in questions_data:
            question_obj = InterviewQuestion(
                session_id=session.id,
                category=q.get('category', category),
                difficulty=q.get('difficulty', difficulty),
                question=q.get('question', ''),
                expected_key_points=q.get('expected_key_points', [])
            )
            db.session.add(question_obj)

        db.session.commit()
        return session

    @staticmethod
    def get_user_sessions(user_id: int):
        return InterviewSession.query.filter_by(user_id=user_id).order_by(InterviewSession.id.desc()).all()


class ActivityRepository:
    @staticmethod
    def log(user_id: int, activity_type: str, description: str, meta_data: dict = None):
        act = CareerActivity(
            user_id=user_id,
            activity_type=activity_type,
            description=description,
            meta_data=meta_data or {}
        )
        db.session.add(act)
        db.session.commit()
        return act

    @staticmethod
    def get_recent(user_id: int, limit: int = 5):
        return CareerActivity.query.filter_by(user_id=user_id).order_by(CareerActivity.id.desc()).limit(limit).all()
