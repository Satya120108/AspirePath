import sys
from pathlib import Path

# Add backend directory to path
backend_path = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_path))

from app import create_app
from app.models import db, User, Resume, ResumeAnalysis, JobMatch, CareerRoadmap

def main():
    print("Initializing Flask test application...", flush=True)
    app = create_app()

    with app.app_context():
        users = User.query.all()
        print(f"Users in database: {len(users)}", flush=True)
        for u in users:
            print(f" - User: {u.id} | {u.name} | {u.email}", flush=True)
            resumes = Resume.query.filter_by(user_id=u.id).all()
            print(f"   Resumes: {len(resumes)}", flush=True)
            matches = JobMatch.query.filter_by(user_id=u.id).all()
            print(f"   Job Matches: {len(matches)}", flush=True)
            roadmaps = CareerRoadmap.query.filter_by(user_id=u.id).all()
            print(f"   Roadmaps: {len(roadmaps)}", flush=True)

        print("Testing test client API requests...", flush=True)
        client = app.test_client()

        # Health endpoint
        res = client.get('/api/health')
        assert res.status_code == 200, f"Health check failed: {res.status_code}"
        print(" -> GET /api/health passed: 200 OK", flush=True)

        # Login test with seeded demo user
        res = client.post('/api/auth/login', json={
            'email': 'alex.morgan@stanford.edu',
            'password': 'password123'
        })
        assert res.status_code == 200, f"Login failed: {res.status_code} {res.get_json()}"
        token = res.get_json()['token']
        print(" -> POST /api/auth/login passed: 200 OK (JWT issued)", flush=True)

        headers = {'Authorization': f'Bearer {token}'}

        # Dashboard summary
        res = client.get('/api/dashboard/summary', headers=headers)
        assert res.status_code == 200, f"Dashboard summary failed: {res.status_code}"
        print(f" -> GET /api/dashboard/summary passed: score={res.get_json()['resume_score']}", flush=True)

        # Job matching engine test (explainable similarity)
        res = client.post('/api/jobs/analyze', headers=headers, json={
            'job_title': 'Full Stack Engineer',
            'company': 'Tech Corp',
            'job_description': 'Seeking Full Stack Engineer with Python, TypeScript, React, Docker, and PostgreSQL experience.'
        })
        assert res.status_code == 200, f"Job analyze failed: {res.status_code}"
        job_data = res.get_json()
        print(f" -> POST /api/jobs/analyze passed: {job_data['compatibility_score']}% fit", flush=True)

        # Simulation test
        res = client.post('/api/jobs/simulate', headers=headers, json={
            'added_skills': ['GraphQL', 'Kubernetes'],
            'added_projects': ['Cloud deployment orchestrator'],
            'job_description': 'Requirements: Python, React, GraphQL, Kubernetes'
        })
        assert res.status_code == 200, f"Job simulate failed: {res.status_code}"
        sim_data = res.get_json()
        print(f" -> POST /api/jobs/simulate passed: boost=+{sim_data['score_delta']}%", flush=True)

        print("\nALL BACKEND & DATABASE TESTS PASSED SUCCESSFULLY!", flush=True)

if __name__ == '__main__':
    main()
