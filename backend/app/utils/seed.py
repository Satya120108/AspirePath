from werkzeug.security import generate_password_hash
from app.models import db, User, UserProfile, Resume, ResumeAnalysis, JobMatch, SkillGap, CareerRoadmap, RoadmapTask, InterviewSession, InterviewQuestion, CareerActivity, ResumeVersion
from datetime import datetime

def seed_demo_data():
    """Seeds rich demo data if database is empty."""
    if User.query.first():
        return

    print("[Seeder] Populating initial demo user & candidate database records...")
    demo_user = User(
        name='Alex Morgan',
        email='alex.morgan@stanford.edu',
        password_hash=generate_password_hash('password123'),
        role='Full Stack Software Engineer Candidate'
    )
    db.session.add(demo_user)
    db.session.flush()

    profile = UserProfile(
        user_id=demo_user.id,
        full_name='Alex Morgan',
        headline='Aspiring Full Stack Engineer | CS Senior @ Stanford',
        target_role='Full Stack Software Engineer',
        experience_level='Entry',
        location='San Francisco, CA',
        bio='Passionate computer science graduate with projects in React, Python, Cloud computing, and Machine Learning. Seeking full-time graduate SWE roles.',
        linkedin_url='https://linkedin.com/in/alexmorgan-cs',
        github_url='https://github.com/alexmorgan-dev'
    )
    db.session.add(profile)

    resume = Resume(
        user_id=demo_user.id,
        filename='Alex_Morgan_Resume_2025.pdf',
        file_path='uploads/sample_resume.pdf',
        file_size=1048576,
        extracted_text=(
            "Alex Morgan\nalex.morgan@stanford.edu | (555) 349-8812 | San Francisco, CA\n\n"
            "EDUCATION\nStanford University - B.S. in Computer Science (GPA: 3.82/4.00) Expected 2025\n\n"
            "TECHNICAL SKILLS\nLanguages: Python, TypeScript, JavaScript, SQL\n"
            "Frameworks: React.js, Node.js, Flask, FastAPI\n"
            "Databases & Cloud: PostgreSQL, Redis, Docker, Git, AWS\n\n"
            "EXPERIENCE\nDataview Analytics - Software Engineering Intern (June 2024 - Aug 2024)\n"
            "- Built telemetry analytics microservice in Python/Flask processing 250k+ events/day with 99.9% uptime.\n"
            "- Refactored frontend in React and Tailwind CSS, reducing initial load latency by 38%.\n\n"
            "PROJECTS\nDevScale Cloud Native Task Orchestrator (Go, Docker, Redis)\n"
            "- Distributed scheduler reducing async task execution latency by 45%."
        ),
        is_active=True
    )
    db.session.add(resume)
    db.session.flush()

    analysis = ResumeAnalysis(
        resume_id=resume.id,
        overall_score=84,
        score_breakdown={
            'ats_compatibility': 90,
            'skills_relevance': 85,
            'impact_and_metrics': 78,
            'structure_and_formatting': 88,
            'experience_depth': 79
        },
        contact_info={
            'name': 'Alex Morgan',
            'email': 'alex.morgan@stanford.edu',
            'phone': '+1 (555) 349-8812',
            'location': 'San Francisco, CA'
        },
        technical_skills=['Python', 'TypeScript', 'JavaScript', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'RESTful APIs', 'Git'],
        soft_skills=['Cross-functional Collaboration', 'Technical Communication', 'Analytical Problem Solving'],
        tools_and_frameworks=['Vite', 'Tailwind CSS', 'Flask', 'Redis', 'Docker'],
        education=[{'degree': 'B.S. in Computer Science', 'institution': 'Stanford University', 'year': '2021 - 2025'}],
        experience=[{'role': 'Software Engineering Intern', 'company': 'Dataview Analytics', 'duration': '2024'}],
        projects=[{'title': 'DevScale Cloud Task Orchestrator', 'description': 'Distributed job scheduler with worker pools.'}],
        certifications=['AWS Certified Cloud Practitioner'],
        achievements=['1st Place CalHacks 2024'],
        strengths=['Strong balance of frontend & backend', 'Quantified metrics on latency reduction'],
        weaknesses=['Could include more CI/CD & Kubernetes experience'],
        missing_information=['API rate limiting & OWASP security practices'],
        ats_suggestions=['Ensure all date formats match Month YYYY standard', 'Include microservice keywords in skill block'],
        improved_summary='Passionate and results-oriented Full Stack Engineer with proven experience designing high-throughput Python microservices, responsive React web apps, and distributed systems. Track record of reducing application latency by 38% and developing tools supporting 4,500+ active users.',
        career_dna={
            'primary_archetype': 'Full-Stack Systems Builder',
            'secondary_archetype': 'Data-Informed Product Engineer',
            'technical_breadth': 88,
            'problem_solving_depth': 82,
            'leadership_readiness': 74,
            'growth_velocity': 92,
            'recommended_focus': 'Cloud-Native Distributed Systems & Microservice Architecture'
        }
    )
    db.session.add(analysis)

    # Job Match
    match = JobMatch(
        user_id=demo_user.id,
        resume_id=resume.id,
        job_title='Full Stack Software Engineer',
        company='Stripe',
        compatibility_score=86,
        breakdown={
            'skill_match_percentage': 89,
            'experience_alignment': 82,
            'semantic_similarity': 87
        },
        matching_skills=['Python', 'TypeScript', 'React.js', 'Node.js', 'RESTful APIs', 'Docker', 'PostgreSQL', 'Git'],
        missing_skills=['GraphQL', 'Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform'],
        relevant_experience_matches=['Built telemetry microservices processing 250k+ daily events directly aligns with Stripe data pipelines.'],
        relevant_projects_matches=['DevScale Cloud Orchestrator demonstrates required concurrent programming & Redis caching principles.'],
        match_explanation='Strong 86% match. Your background in both Python backend APIs and TypeScript/React frontends satisfies all core requirements for this role.',
        actionable_recommendations=['Add a GitHub Actions workflow to DevScale repository', 'Explore GraphQL query design in a weekend project']
    )
    db.session.add(match)

    # Roadmap
    roadmap = CareerRoadmap(
        user_id=demo_user.id,
        target_role='Full Stack Software Engineer',
        summary='Structured 8-week career acceleration roadmap tailored to Alex Morgan.',
        total_duration_weeks=8,
        completion_percentage=40,
        recommended_capstone_project={
            'title': 'Cloud-Scale Microservices E-Commerce Pipeline',
            'description': 'An end-to-end full stack platform featuring GraphQL gateway, asynchronous worker queue, Redis cache, automated GitHub Actions CI/CD, and Kubernetes deployment manifest.',
            'skills': ['GraphQL', 'Kubernetes', 'Redis', 'CI/CD', 'React', 'Python']
        }
    )
    db.session.add(roadmap)
    db.session.flush()

    tasks = [
        RoadmapTask(roadmap_id=roadmap.id, stage='Beginner', title='Master GraphQL Schema Definition & Apollo Client', description='Implement GraphQL server in Node.js or Python.', skills=['GraphQL'], estimated_days=5, is_completed=True, order=1),
        RoadmapTask(roadmap_id=roadmap.id, stage='Beginner', title='Automate CI/CD with GitHub Actions & Linters', description='Configure automated PR testing and type checks.', skills=['CI/CD', 'GitHub Actions'], estimated_days=4, is_completed=True, order=2),
        RoadmapTask(roadmap_id=roadmap.id, stage='Intermediate', title='Implement Redis Caching Patterns & Rate Limiter', description='Build sliding window rate limiter in Redis.', skills=['Redis', 'Rate Limiting'], estimated_days=6, is_completed=False, order=3),
        RoadmapTask(roadmap_id=roadmap.id, stage='Intermediate', title='Container Orchestration with Minikube / K8s', description='Create Pods, Deployments, and Ingress routing.', skills=['Kubernetes'], estimated_days=10, is_completed=False, order=4),
        RoadmapTask(roadmap_id=roadmap.id, stage='Advanced', title='Full Stack System Design & Mock Architecture', description='Study high-level scalable system designs.', skills=['System Design'], estimated_days=14, is_completed=False, order=5),
    ]
    db.session.add_all(tasks)

    # Resume Versions
    v1 = ResumeVersion(user_id=demo_user.id, version_number=1, title='Initial Draft – University Career Fair', overall_score=68, skills_count=14, notes='Baseline scan')
    v2 = ResumeVersion(user_id=demo_user.id, version_number=2, title='Post-Internship Technical Revision', overall_score=78, skills_count=19, notes='Added Dataview internship')
    v3 = ResumeVersion(user_id=demo_user.id, version_number=3, title='ATS-Optimized Full Stack Version', overall_score=84, skills_count=23, notes='Current optimized edition')
    db.session.add_all([v1, v2, v3])

    # Recent activities
    act1 = CareerActivity(user_id=demo_user.id, activity_type='resume_analyzed', description='Resume "Alex_Morgan_Resume_2025.pdf" analyzed with score 84/100')
    act2 = CareerActivity(user_id=demo_user.id, activity_type='job_matched', description='Evaluated job compatibility for Stripe "Full Stack Engineer" (86% match)')
    db.session.add_all([act1, act2])

    db.session.commit()
    print("[Seeder] Successfully populated demo data.")
