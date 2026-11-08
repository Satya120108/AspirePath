from typing import Dict, Any

class RoadmapService:
    @classmethod
    def generate_roadmap(cls, target_role: str, user_profile: dict = None) -> Dict[str, Any]:
        return {
            'target_role': target_role,
            'summary': f"A structured 8-week career acceleration roadmap tailored to your background to achieve industry-ready competence as a {target_role}.",
            'total_duration_weeks': 8,
            'completion_percentage': 25,
            'tasks': [
                {
                    'stage': 'Beginner',
                    'title': 'Master GraphQL Schema Definition & Apollo Client',
                    'description': 'Implement a GraphQL server in Node.js or Python Strawberry with query resolvers, mutations, and DataLoader to prevent N+1 queries.',
                    'skills': ['GraphQL', 'Apollo Client', 'DataLoader'],
                    'resource_url': 'https://graphql.org/learn/',
                    'resource_name': 'Official GraphQL Documentation',
                    'estimated_days': 5,
                    'is_completed': True,
                    'order': 1
                },
                {
                    'stage': 'Beginner',
                    'title': 'Automate CI/CD with GitHub Actions & Linters',
                    'description': 'Configure automated pull request validation: run unit tests, type checks (tsc), and security vulnerability scanning on every push.',
                    'skills': ['GitHub Actions', 'YAML', 'CI/CD'],
                    'resource_url': 'https://docs.github.com/en/actions',
                    'resource_name': 'GitHub Actions Quickstart',
                    'estimated_days': 4,
                    'is_completed': False,
                    'order': 2
                },
                {
                    'stage': 'Intermediate',
                    'title': 'Implement Redis Caching Patterns & Rate Limiter',
                    'description': 'Build a sliding-window rate limiter and distributed session store using Redis commands with TTL strategies.',
                    'skills': ['Redis', 'Rate Limiting', 'Caching'],
                    'resource_url': 'https://redis.io/learn',
                    'resource_name': 'Redis University',
                    'estimated_days': 6,
                    'is_completed': False,
                    'order': 3
                },
                {
                    'stage': 'Intermediate',
                    'title': 'Container Orchestration with Minikube / K8s',
                    'description': 'Create Kubernetes Pods, Deployments, ConfigMaps, and Services for a React frontend and Flask backend.',
                    'skills': ['Kubernetes', 'K8s Services', 'Deployments'],
                    'resource_url': 'https://kubernetes.io/docs/tutorials/',
                    'resource_name': 'Kubernetes Official Tutorials',
                    'estimated_days': 10,
                    'is_completed': False,
                    'order': 4
                },
                {
                    'stage': 'Advanced',
                    'title': 'Full Stack System Design & Mock Architecture',
                    'description': 'Study high-level system design for scalable services (TinyURL, Twitter feed, Web Crawler). Practice drawing C4 architecture diagrams.',
                    'skills': ['System Design', 'Scalability', 'Load Balancing'],
                    'resource_url': 'https://github.com/donnemartin/system-design-primer',
                    'resource_name': 'System Design Primer',
                    'estimated_days': 14,
                    'is_completed': False,
                    'order': 5
                }
            ],
            'recommended_capstone_project': {
                'title': 'Cloud-Scale Microservices E-Commerce Pipeline',
                'description': 'An end-to-end full stack platform featuring GraphQL gateway, asynchronous worker queue, Redis cache, automated GitHub Actions CI/CD, and Kubernetes deployment manifest.',
                'skills': ['GraphQL', 'Kubernetes', 'Redis', 'CI/CD', 'React', 'Python']
            }
        }
