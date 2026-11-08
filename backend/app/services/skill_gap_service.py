from typing import List, Dict, Any

ROLE_REQUIREMENTS_DB = {
    'full stack': {
        'required': [
            {'name': 'Python / TypeScript', 'importance': 'Critical'},
            {'name': 'React.js / Next.js', 'importance': 'Critical'},
            {'name': 'PostgreSQL / Database Design', 'importance': 'Critical'},
            {'name': 'Kubernetes & CI/CD', 'importance': 'Important'},
            {'name': 'GraphQL / REST APIs', 'importance': 'Important'},
            {'name': 'Redis / Caching Architecture', 'importance': 'Important'},
            {'name': 'AWS / Cloud Infrastructure', 'importance': 'Nice-to-have'},
        ],
        'missing_defaults': [
            {
                'name': 'CI/CD & GitHub Actions',
                'category': 'DevOps & Tooling',
                'learning_priority': 'High',
                'estimated_time': '1 week',
                'why_needed': 'Modern development teams require automated testing and build validation on pull requests.'
            },
            {
                'name': 'GraphQL API Design',
                'category': 'Backend Architecture',
                'learning_priority': 'High',
                'estimated_time': '1.5 weeks',
                'why_needed': 'Frequently used in modern consumer and fintech web applications for flexible client querying.'
            },
            {
                'name': 'Kubernetes (K8s) Fundamentals',
                'category': 'Infrastructure',
                'learning_priority': 'Medium',
                'estimated_time': '2 weeks',
                'why_needed': 'Industry standard for orchestrating containerized microservices in production.'
            },
            {
                'name': 'Redis Distributed Caching',
                'category': 'Performance',
                'learning_priority': 'Medium',
                'estimated_time': '5 days',
                'why_needed': 'Essential for low-latency session management and rate limiting.'
            }
        ],
        'projects': [
            {
                'title': 'Automated CI/CD Microservice with GraphQL & Redis',
                'description': 'Build a production-grade order management service with GraphQL queries, Redis write-through cache, and a complete GitHub Actions CI/CD pipeline deploying to cloud containers.',
                'skills_developed': ['GraphQL', 'Redis', 'GitHub Actions', 'Docker'],
                'difficulty': 'Intermediate',
                'estimated_hours': 24,
                'portfolio_value': 'Directly validates the top 3 skills currently missing on your resume.'
            },
            {
                'title': 'Kubernetes Cluster Deployment of Full-Stack App',
                'description': 'Containerize your React + Flask application with multi-stage Docker builds, create Helm charts, and configure ingress routing with cert-manager.',
                'skills_developed': ['Kubernetes', 'Helm', 'Multi-stage Docker', 'Ingress'],
                'difficulty': 'Advanced',
                'estimated_hours': 32,
                'portfolio_value': 'Proves to engineering managers that you can deploy and maintain code in production.'
            }
        ]
    }
}

class SkillGapService:
    @classmethod
    def analyze_gaps(cls, target_role: str, user_skills: List[str] = None) -> Dict[str, Any]:
        role_key = 'full stack'
        for key in ROLE_REQUIREMENTS_DB:
            if key in target_role.lower():
                role_key = key
                break

        role_data = ROLE_REQUIREMENTS_DB[role_key]

        if not user_skills:
            user_skills = ['Python', 'TypeScript', 'React.js', 'PostgreSQL', 'Docker', 'RESTful APIs']

        existing = [
            {'name': s, 'level': 'Advanced' if idx < 3 else 'Intermediate', 'match': True}
            for idx, s in enumerate(user_skills[:6])
        ]

        return {
            'target_role': target_role,
            'existing_skills': existing,
            'required_skills': role_data['required'],
            'missing_skills': role_data['missing_defaults'],
            'recommended_projects': role_data['projects']
        }
