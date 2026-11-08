# CareerIQ – AI-Powered Resume & Career Intelligence Platform

> **"CareerIQ transforms your resume into a personalized career growth plan."**

CareerIQ is a production-grade, hackathon-winning career intelligence platform designed for college students, fresh graduates, and tech job seekers. It goes far beyond basic ATS scanners to uncover a candidate's **Career DNA**, calculate **explainable job compatibility**, simulate **hypothetical career upgrades**, recommend **practical portfolio projects**, provide **personalized multi-stage roadmaps**, and power **conversational AI interview preparation**.

---

## 🌟 Key Differentiating Features

1. **Career DNA Synthesis**: Algorithmic archetype scoring classifying technical breadth, problem-solving depth, leadership readiness, and growth velocity.
2. **Explainable Job Matching Engine**: No black-box percentages. Combines Scikit-learn TF-IDF cosine similarity, exact skill set matrix intersections, and experience relevance with line-by-line evidence.
3. **Career Improvement Simulator**: Lets candidates simulate adding hypothetical skills (e.g. GraphQL, Kubernetes) or capstone projects to forecast quantitative compatibility score boosts before writing a line of code.
4. **Skill-to-Project Recommendations**: Translates detected skill gaps directly into actionable, portfolio-ready engineering projects with estimated hours and difficulty levels.
5. **Resume Version Evolution Comparison**: Side-by-side comparison of historical resume revisions tracking score gains and newly detected technical keywords.
6. **1-Click Interactive Demo Mode**: Instant evaluation mode preloaded with realistic Stanford CS senior candidate intelligence, allowing immediate evaluation without file uploads.

---

## 🏗️ Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Dark/Light theme system
- **Routing**: React Router v7
- **Icons & Motion**: Lucide React + Framer Motion
- **Data Visualization**: Recharts (Interactive Area & Bar Charts)
- **HTTP Client**: Axios with Bearer token interceptor

### Backend
- **Framework**: Python 3.12 + Flask
- **API Security**: Flask-JWT-Extended + Werkzeug Password Hashing
- **CORS**: Flask-CORS
- **PDF Extraction**: PyPDF (multi-page text cleaning and boundary normalization)
- **ML & Vector Matching**: Scikit-learn (`TfidfVectorizer` + `cosine_similarity`)
- **Data Validation**: Pydantic v2
- **AI Integration**: Google Gemini API (`google-genai` with structured JSON schema enforcement and robust heuristic fallback)

### Database
- **Engine**: SQLite with SQLAlchemy ORM (15 relational models)
- **Migrations**: Flask-Migrate / Alembic
- **Persistence**: Relational schema covering Users, Profiles, Resumes, Analyses, Skills, Job Matches, Gaps, Roadmaps, Tasks, Sessions, and Activities.

---

## 📁 Project Architecture

```
CareerIQ/
├── frontend/
│   ├── src/
│   │   ├── components/        # Layout, Sidebar, Navbar, ScoreGauge, CareerDnaCard, Modals
│   │   ├── context/           # AuthContext (real auth + demo mode), ThemeContext
│   │   ├── data/              # Preloaded sample candidate intelligence (mockData.ts)
│   │   ├── pages/             # 14 complete SaaS pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   ├── ProfileSetupPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ResumeAnalyzerPage.tsx
│   │   │   ├── JobMatchingPage.tsx
│   │   │   ├── SkillGapPage.tsx
│   │   │   ├── CareerRoadmapPage.tsx
│   │   │   ├── InterviewPrepPage.tsx
│   │   │   ├── CareerAssistantPage.tsx
│   │   │   ├── ResumeBuilderPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── services/          # Centralized Axios API client (api.ts)
│   │   └── types/             # Complete TypeScript interfaces
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts         # Proxy to backend on port 5000
│
├── backend/
│   ├── app/
│   │   ├── models/            # 15 SQLAlchemy database models
│   │   ├── routes/            # REST API route controllers
│   │   ├── services/          # Business logic: Gemini, Scikit-learn, PyPDF, JobMatch
│   │   ├── repositories/      # SQLAlchemy data access layer
│   │   ├── schemas/           # Pydantic validation schemas
│   │   └── utils/             # Database seeder & helper utilities
│   ├── tests/
│   │   └── test_backend.py    # Automated integration test suite
│   ├── uploads/               # Uploaded PDF resumes
│   ├── app.py                 # Flask entry point
│   ├── config.py              # Configuration & environment loader
│   ├── requirements.txt       # Python backend dependencies
│   └── .env.example           # Environment template
│
└── README.md
```

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
- **Node.js**: v20+
- **Python**: 3.12+

### 2. Backend Setup
```bash
# Navigate to project root
cd AspirePath

# Activate virtual environment
.\.venv\Scripts\activate   # Windows
# or source .venv/bin/activate (Linux/macOS)

# Install dependencies (if not already installed)
pip install -r backend/requirements.txt

# Configure environment variables (optional: add Gemini API key)
copy backend\.env.example backend\.env

# Run the Flask backend server
python backend/app.py
```
*Backend runs on `http://127.0.0.1:5000` with automated database migration and demo data seeding.*

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend
cd AspirePath/frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
*Frontend runs on `http://127.0.0.1:3000` with hot module reloading and API proxying.*

### 4. Run Automated Backend Tests
```bash
python backend/tests/test_backend.py
```
Output:
```
 -> GET /api/health passed: 200 OK
 -> POST /api/auth/login passed: 200 OK (JWT issued)
 -> GET /api/dashboard/summary passed: score=84
 -> POST /api/jobs/analyze passed: 68% fit
 -> POST /api/jobs/simulate passed: boost=+13%
ALL BACKEND & DATABASE TESTS PASSED SUCCESSFULLY!
```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health status | No |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Login and receive JWT access token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user & profile | Yes |
| `PUT` | `/api/auth/profile` | Update user target role, bio & links | Yes |
| `POST` | `/api/resume/upload` | Upload PDF resume and extract text | Yes |
| `POST` | `/api/resume/analyze` | Run Gemini analysis on uploaded resume | Yes |
| `GET` | `/api/resume/latest` | Fetch user's latest active resume | Yes |
| `GET` | `/api/resume/analysis` | Fetch resume analysis scores & DNA | Yes |
| `GET` | `/api/resume/versions` | Fetch resume revision history | Yes |
| `POST` | `/api/jobs/analyze` | Match resume against job description | Yes |
| `GET` | `/api/jobs/matches` | Fetch saved job match evaluations | Yes |
| `POST` | `/api/jobs/simulate` | Simulate score boost for added skills | Yes |
| `POST` | `/api/skills/analyze` | Analyze skill gaps for target role | Yes |
| `POST` | `/api/roadmap/generate` | Generate personalized career roadmap | Yes |
| `GET` | `/api/roadmap/latest` | Fetch active career roadmap | Yes |
| `PATCH`| `/api/roadmap/tasks/:id`| Toggle completion status of task | Yes |
| `POST` | `/api/interview/generate`| Generate AI practice questions | Yes |
| `POST` | `/api/interview/evaluate`| Evaluate user's answer with rubric | Yes |
| `POST` | `/api/assistant/chat` | Context-aware career assistant chat | Yes |
| `GET` | `/api/dashboard/summary` | Dynamic dashboard KPI metrics | Yes |

---

## 🏆 Hackathon Demonstration Flow

To demonstrate the full end-to-end user workflow:

1. **Launch App**: Open `http://127.0.0.1:3000`.
2. **Instant Demo Access**: Click **"1-Click Live Demo"** on the landing page or login screen.
3. **Career Intelligence Dashboard**: Inspect the 84/100 Resume Score, Career DNA Profile, score progression chart, and category breakdown.
4. **Resume Intelligence**: Navigate to **Resume Intelligence** to inspect ATS score breakdowns, extracted skill taxonomy, identified strengths/weaknesses, and version evolution comparison.
5. **Explainable Job Match**: Navigate to **Job Match**, select the **"Stripe"** preset or paste a custom description. Observe explainable match breakdown (Skill Overlap, Experience Alignment, TF-IDF Semantic Similarity).
6. **Career Simulator**: Click **"Launch Career Simulator"** and test adding "GraphQL" & "Kubernetes" to observe the score increase from 86% to 99%.
7. **Skill Gap & Projects**: View missing high-priority skills and inspect the curated **"Automated CI/CD Microservice with GraphQL & Redis"** capstone project.
8. **Career Roadmap**: Check off milestone tasks on the personalized roadmap and observe the progress bar update dynamically.
9. **AI Interview Prep**: Select "Technical", choose a question, enter a response, and receive structured rubric evaluation.
10. **Resume Builder**: Switch templates, preview the optimized resume, and click **Print / Export PDF**.

---

## 🔒 Security & Privacy

- **Password Hashing**: Passwords hashed with Werkzeug secure PBKDF2/SHA-256.
- **JWT Protection**: Cryptographically signed JSON Web Tokens for all sensitive endpoints.
- **Data Isolation**: User queries enforce foreign-key ownership filters to guarantee zero cross-tenant data leakage.
- **Safe Uploads**: PDF type verification, size caps (16MB), and filename sanitization.
- **Client Security**: API keys are isolated to backend environment variables.
