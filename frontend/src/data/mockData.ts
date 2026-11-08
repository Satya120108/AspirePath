import type {
  ResumeAnalysis,
  JobMatchResult,
  SkillGapAnalysis,
  CareerRoadmap,
  InterviewSession,
  DashboardSummary,
  ResumeVersion
} from '../types';

export const mockResumeAnalysis: ResumeAnalysis = {
  id: 101,
  resume_id: 1,
  overall_score: 84,
  score_breakdown: {
    ats_compatibility: 90,
    skills_relevance: 85,
    impact_and_metrics: 78,
    structure_and_formatting: 88,
    experience_depth: 79,
  },
  contact_info: {
    name: 'Alex Morgan',
    email: 'alex.morgan@stanford.edu',
    phone: '+1 (555) 349-8812',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan-cs',
    github: 'github.com/alexmorgan-dev',
  },
  technical_skills: [
    'Python', 'TypeScript', 'JavaScript', 'React.js', 'Node.js',
    'PostgreSQL', 'Docker', 'RESTful APIs', 'Git', 'Data Structures & Algorithms'
  ],
  soft_skills: [
    'Cross-functional Collaboration', 'Technical Communication', 'Analytical Problem Solving',
    'Agile Methodologies', 'Self-directed Learning'
  ],
  tools_and_frameworks: [
    'Vite', 'Tailwind CSS', 'Flask', 'FastAPI', 'AWS (S3, EC2)', 'Redis', 'Jest', 'Postman'
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      institution: 'Stanford University',
      year: '2021 - 2025 (Expected)',
      gpa_or_grade: '3.82 / 4.00',
      highlights: [
        'Coursework: Distributed Systems, Machine Learning, Operating Systems, Database Internals',
        'Dean\'s Honor List (4 semesters)'
      ]
    }
  ],
  experience: [
    {
      role: 'Software Engineering Intern',
      company: 'Dataview Analytics',
      duration: 'June 2024 - Aug 2024',
      bullets: [
        'Built real-time telemetry analytics microservice using Python and Flask, processing 250k+ events/day with 99.9% uptime.',
        'Refactored data visualization dashboard in React and Tailwind, reducing initial load latency by 38%.',
        'Authored comprehensive unit and integration test suite increasing code coverage from 62% to 89%.'
      ],
      skills_used: ['Python', 'Flask', 'React', 'Docker', 'PostgreSQL']
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'CampusCloud Inc.',
      duration: 'Jan 2024 - May 2024',
      bullets: [
        'Engineered student collaboration portal serving 4,500 active campus users using TypeScript and Node.js.',
        'Implemented JWT token authentication with RBAC (Role-Based Access Control) and Redis session caching.',
        'Collaborated with UX team to redesign responsive course evaluation workflows.'
      ],
      skills_used: ['TypeScript', 'Node.js', 'Redis', 'Tailwind CSS']
    }
  ],
  projects: [
    {
      title: 'DevScale – Cloud Native Task Orchestrator',
      description: 'Distributed job scheduler with worker pools and asynchronous task execution.',
      technologies: ['Go', 'Docker', 'Redis', 'Prometheus'],
      impact_metric: 'Reduced asynchronous background task processing time by 45%',
      link: 'github.com/alexmorgan-dev/devscale'
    },
    {
      title: 'PulseHealth – AI Symptom Triaging Assistant',
      description: 'Full-stack medical consultation assistant using LLMs and medical terminology verification.',
      technologies: ['React', 'Python', 'FastAPI', 'Gemini API'],
      impact_metric: 'Achieved 91% concordance with physician validation benchmarks',
      link: 'github.com/alexmorgan-dev/pulsehealth'
    }
  ],
  certifications: [
    'AWS Certified Cloud Practitioner (2024)',
    'Meta Front-End Developer Professional Certificate'
  ],
  achievements: [
    '1st Place Winner – CalHacks 2024 (Best Developer Tool Track)',
    'Selected for Google Student Developer Club Core Team'
  ],
  strengths: [
    'Strong balance of both frontend (React/TypeScript) and backend (Python/Flask/Node) modern technologies.',
    'Quantified bullet points with measurable impact metrics (e.g. "reduced latency by 38%").',
    'Solid distributed systems and cloud engineering foundations demonstrated in projects.'
  ],
  weaknesses: [
    'Limited evidence of CI/CD pipeline configuration (e.g., GitHub Actions, Kubernetes).',
    'Could expand upon system design and architectural decision trade-offs.',
    'Professional summary lacks targeted alignment with specific senior or specialization tracks.'
  ],
  missing_information: [
    'Security practices such as OWASP compliance or API rate-limiting methodologies.',
    'Experience with cloud monitoring/alerting tools (e.g., Datadog, Grafana).'
  ],
  ats_suggestions: [
    'Standardize date format across all roles to "Month YYYY" for ATS parsing engines.',
    'Include keywords like "Microservices", "CI/CD", and "Unit Testing" directly in the skills block.',
    'Ensure project repository links use clean standard URLs.'
  ],
  improved_summary: 'Passionate and results-oriented Full Stack Engineer with proven experience designing high-throughput Python microservices, responsive React web apps, and distributed systems. Track record of reducing application latency by 38% and developing tools supporting 4,500+ active users. Eager to contribute scalable engineering solutions in a fast-paced product team.',
  career_dna: {
    primary_archetype: 'Full-Stack Systems Builder',
    secondary_archetype: 'Data-Informed Product Engineer',
    technical_breadth: 88,
    problem_solving_depth: 82,
    leadership_readiness: 74,
    growth_velocity: 92,
    recommended_focus: 'Cloud-Native Distributed Systems & Microservice Architecture'
  },
  created_at: new Date().toISOString()
};

export const mockJobMatchResult: JobMatchResult = {
  id: 201,
  job_title: 'Full Stack Software Engineer (New Grad / Junior)',
  company: 'Stripe / TechCorp',
  compatibility_score: 86,
  breakdown: {
    skill_match_percentage: 89,
    experience_alignment: 82,
    semantic_similarity: 87,
  },
  matching_skills: [
    'Python', 'TypeScript', 'React.js', 'Node.js', 'RESTful APIs',
    'Docker', 'PostgreSQL', 'Git', 'Agile Methodologies'
  ],
  missing_skills: [
    'GraphQL', 'Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform'
  ],
  relevant_experience_matches: [
    'Built telemetry microservices processing 250k+ daily events directly aligns with Stripe data pipelines.',
    'Implemented JWT RBAC security matching required auth infrastructure qualifications.',
    'Full-stack React dashboard optimization corresponds to merchant dashboard responsibilities.'
  ],
  relevant_projects_matches: [
    'DevScale Cloud Orchestrator demonstrates required concurrent programming & Redis caching principles.',
    'PulseHealth AI demonstrates experience calling enterprise LLM APIs with structured schemas.'
  ],
  match_explanation: 'Strong 86% match. Your background in both Python backend APIs and TypeScript/React frontends satisfies all core requirements for this role. Key areas for 95%+ alignment include container orchestration (Kubernetes) and automated CI/CD pipeline automation.',
  actionable_recommendations: [
    'Add a small GitHub Actions workflow to your DevScale repository and highlight CI/CD under your project details.',
    'Explore GraphQL query design in a weekend project to check off the API query language requirement.',
    'Emphasize your 250k+ events/day throughput metric in your initial recruiter screening call.'
  ],
  created_at: new Date().toISOString()
};

export const mockSkillGapAnalysis: SkillGapAnalysis = {
  target_role: 'Full Stack Software Engineer',
  existing_skills: [
    { name: 'Python', level: 'Advanced', match: true },
    { name: 'TypeScript & React', level: 'Advanced', match: true },
    { name: 'PostgreSQL & SQL', level: 'Intermediate', match: true },
    { name: 'Docker', level: 'Intermediate', match: true },
    { name: 'REST APIs', level: 'Advanced', match: true },
  ],
  required_skills: [
    { name: 'Python / TypeScript', importance: 'Critical' },
    { name: 'React.js / Next.js', importance: 'Critical' },
    { name: 'PostgreSQL / Database Design', importance: 'Critical' },
    { name: 'Kubernetes & CI/CD', importance: 'Important' },
    { name: 'GraphQL / gRPC', importance: 'Important' },
    { name: 'System Design & Scalability', importance: 'Important' },
    { name: 'AWS Cloud Architecture', importance: 'Nice-to-have' },
  ],
  missing_skills: [
    {
      name: 'CI/CD & GitHub Actions',
      category: 'DevOps & Tooling',
      learning_priority: 'High',
      estimated_time: '1 week',
      why_needed: 'Modern teams require automated testing and deployment pipelines on every pull request.'
    },
    {
      name: 'GraphQL API Design',
      category: 'Backend Architecture',
      learning_priority: 'High',
      estimated_time: '1.5 weeks',
      why_needed: 'Frequently used in modern consumer and fintech web applications for flexible client querying.'
    },
    {
      name: 'Kubernetes (K8s) Fundamentals',
      category: 'Infrastructure',
      learning_priority: 'Medium',
      estimated_time: '2 weeks',
      why_needed: 'Industry standard for orchestrating containerized microservices in production.'
    },
    {
      name: 'Redis Distributed Caching',
      category: 'Performance',
      learning_priority: 'Medium',
      estimated_time: '5 days',
      why_needed: 'Essential for low-latency session management and rate limiting.'
    }
  ],
  recommended_projects: [
    {
      title: 'Automated CI/CD Microservice with GraphQL & Redis',
      description: 'Build a production-grade order management service with GraphQL queries, Redis write-through cache, and a complete GitHub Actions CI/CD pipeline deploying to cloud containers.',
      skills_developed: ['GraphQL', 'Redis', 'GitHub Actions', 'Docker'],
      difficulty: 'Intermediate',
      estimated_hours: 24,
      portfolio_value: 'Directly validates the top 3 skills currently missing on your resume.'
    },
    {
      title: 'Kubernetes Cluster Deployment of Full-Stack App',
      description: 'Containerize your React + Flask application with multi-stage Docker builds, create Helm charts, and configure ingress routing with cert-manager.',
      skills_developed: ['Kubernetes', 'Helm', 'Multi-stage Docker', 'Ingress'],
      difficulty: 'Advanced',
      estimated_hours: 32,
      portfolio_value: 'Proves to engineering managers that you can deploy and maintain code in production.'
    }
  ]
};

export const mockCareerRoadmap: CareerRoadmap = {
  id: 301,
  target_role: 'Full Stack Software Engineer',
  summary: 'A structured 8-week career acceleration roadmap tailored to Alex Morgan\'s existing software background to achieve senior junior / mid-level engineering competence.',
  total_duration_weeks: 8,
  completion_percentage: 42,
  tasks: [
    {
      id: 1,
      stage: 'Beginner',
      title: 'Master GraphQL Schema Definition & Apollo Client',
      description: 'Implement a GraphQL server in Node.js or Python Strawberry, with query resolvers, mutations, and DataLoader to prevent N+1 queries.',
      skills: ['GraphQL', 'Apollo Client', 'DataLoader'],
      resource_url: 'https://graphql.org/learn/',
      resource_name: 'Official GraphQL Documentation',
      estimated_days: 5,
      is_completed: true,
      order: 1
    },
    {
      id: 2,
      stage: 'Beginner',
      title: 'Automate CI/CD with GitHub Actions & Linters',
      description: 'Configure automated pull request validation: run unit tests, type checks (tsc), and security vulnerability scanning on every push.',
      skills: ['GitHub Actions', 'YAML', 'CI/CD'],
      resource_url: 'https://docs.github.com/en/actions',
      resource_name: 'GitHub Actions Quickstart',
      estimated_days: 4,
      is_completed: true,
      order: 2
    },
    {
      id: 3,
      stage: 'Intermediate',
      title: 'Implement Redis Caching Patterns & Rate Limiter',
      description: 'Build a sliding-window rate limiter and distributed session store using Redis commands with TTL strategies.',
      skills: ['Redis', 'Rate Limiting', 'Caching'],
      resource_url: 'https://redis.io/learn',
      resource_name: 'Redis University',
      estimated_days: 6,
      is_completed: false,
      order: 3
    },
    {
      id: 4,
      stage: 'Intermediate',
      title: 'Container Orchestration with Minikube / K8s',
      description: 'Create Kubernetes Pods, Deployments, ConfigMaps, and Services for a React frontend and Flask backend.',
      skills: ['Kubernetes', 'K8s Services', 'Deployments'],
      resource_url: 'https://kubernetes.io/docs/tutorials/',
      resource_name: 'Kubernetes Official Tutorials',
      estimated_days: 10,
      is_completed: false,
      order: 4
    },
    {
      id: 5,
      stage: 'Advanced',
      title: 'Full Stack System Design & Mock Architecture',
      description: 'Study high-level system design for scalable services (TinyURL, Twitter feed, Web Crawler). Practice drawing C4 architecture diagrams.',
      skills: ['System Design', 'Scalability', 'Load Balancing'],
      resource_url: 'https://github.com/donnemartin/system-design-primer',
      resource_name: 'System Design Primer',
      estimated_days: 14,
      is_completed: false,
      order: 5
    }
  ],
  recommended_capstone_project: {
    title: 'Cloud-Scale Microservices E-Commerce Pipeline',
    description: 'An end-to-end full stack platform featuring GraphQL gateway, asynchronous worker queue, Redis cache, automated GitHub Actions CI/CD, and Kubernetes deployment manifest.',
    skills: ['GraphQL', 'Kubernetes', 'Redis', 'CI/CD', 'React', 'Python']
  },
  created_at: new Date().toISOString()
};

export const mockInterviewQuestions: InterviewSession = {
  id: 401,
  role: 'Full Stack Software Engineer',
  category: 'Technical & System Architecture',
  difficulty: 'Mid-level',
  score_average: 85,
  questions: [
    {
      id: 1,
      session_id: 401,
      category: 'Technical',
      difficulty: 'Mid-level',
      question: 'Explain how you would design a rate limiting system for a public API handling 10,000 requests per second. Compare Token Bucket vs Sliding Window log.',
      expected_key_points: [
        'Token Bucket algorithm mechanism and burst handling',
        'Sliding Window counter/log memory trade-offs',
        'Redis atomic operations (INCR, MULTI/EXEC, Lua scripts)',
        'HTTP 429 Too Many Requests response headers (Retry-After)'
      ],
      user_answer: 'I would use Redis with a Sliding Window Counter algorithm or Token Bucket. With Token Bucket, tokens are refilled at a constant rate up to a capacity limit. When a request arrives, we deduct a token. In Redis, this can be implemented atomically using Lua scripts so that concurrent worker nodes share the exact token count without race conditions. If the bucket is empty, return HTTP 429 with Retry-After header.',
      evaluation: {
        overall_score: 90,
        relevance_score: 95,
        clarity_score: 88,
        technical_accuracy: 92,
        completeness_score: 86,
        feedback: 'Excellent answer! You accurately described the Token Bucket mechanics, specifically highlighted atomic Redis Lua scripting to prevent race conditions across distributed instances, and referenced the proper HTTP 429 response code.',
        strengths: [
          'Correctly highlighted distributed concurrency issues and proposed Redis Lua scripts.',
          'Understood HTTP protocol status codes and headers.',
          'Clear, concise technical articulation.'
        ],
        improvements: [
          'Could briefly mention fallback behavior if the Redis instance suffers a momentary network partition.',
          'Consider discussing client-side exponential backoff with jitter.'
        ],
        ideal_sample_answer: 'A high-throughput rate limiter (10k req/s) is best implemented at the API Gateway layer using Redis. The Token Bucket algorithm allows bursts up to maximum capacity while maintaining a steady refill rate. To ensure atomicity across distributed servers, execute a Redis Lua script that checks and updates timestamps in a single roundtrip. When exceeded, return HTTP 429 Too Many Requests with X-RateLimit-Remaining and Retry-After headers. For disaster resilience, fail-open with local in-memory fallback if Redis is unreachable.'
      }
    },
    {
      id: 2,
      session_id: 401,
      category: 'Behavioral',
      difficulty: 'Mid-level',
      question: 'Tell me about a time when you had to debug a difficult performance bottleneck in production or during an internship project.',
      expected_key_points: [
        'STAR format (Situation, Task, Action, Result)',
        'Methodology: Profiling, metrics, hypothesis testing',
        'Resolution and preventative measures'
      ]
    }
  ],
  created_at: new Date().toISOString()
};

export const mockDashboardSummary: DashboardSummary = {
  has_resume: true,
  resume_score: 84,
  total_skills_identified: 23,
  job_matches_analyzed: 8,
  highest_job_match: 86,
  skill_gaps_count: 4,
  roadmap_progress: 42,
  interviews_practiced: 5,
  recent_activities: [
    {
      id: 1,
      activity_type: 'resume_analyzed',
      description: 'Resume "Alex_Morgan_Resume_2025.pdf" analyzed with score 84/100',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      activity_type: 'job_matched',
      description: 'Evaluated job compatibility for Stripe "Full Stack Engineer" (86% match)',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      activity_type: 'roadmap_task',
      description: 'Completed roadmap task: "Automate CI/CD with GitHub Actions"',
      timestamp: 'Yesterday'
    },
    {
      id: 4,
      activity_type: 'interview_completed',
      description: 'Scored 90/100 on System Architecture Technical Interview',
      timestamp: '2 days ago'
    }
  ],
  recommended_actions: [
    {
      id: 'rec-1',
      title: 'Close GraphQL Skill Gap',
      action_url: '/skill-gap',
      category: 'Skill Gap',
      badge: 'High Impact'
    },
    {
      id: 'rec-2',
      title: 'Simulate Compatibility for Google SWE Role',
      action_url: '/job-match',
      category: 'Job Match',
      badge: 'Recommended'
    },
    {
      id: 'rec-3',
      title: 'Practice HR & Behavioral Questions',
      action_url: '/interview',
      category: 'Interview Prep',
      badge: 'Actionable'
    }
  ],
  score_history: [
    { date: 'Oct 1', score: 68 },
    { date: 'Oct 15', score: 72 },
    { date: 'Nov 1', score: 78 },
    { date: 'Nov 7', score: 84 },
  ],
  skills_distribution: [
    { name: 'Languages', count: 4 },
    { name: 'Frameworks', count: 6 },
    { name: 'Databases & Tools', count: 5 },
    { name: 'DevOps & Cloud', count: 4 },
    { name: 'Soft Skills', count: 4 },
  ],
  career_dna: mockResumeAnalysis.career_dna
};

export const mockResumeVersions: ResumeVersion[] = [
  {
    id: 1,
    version_number: 1,
    title: 'Initial Draft – University Career Fair',
    overall_score: 68,
    skills_count: 14,
    notes: 'First draft uploaded before AI ATS optimizations.',
    created_at: '2024-10-01'
  },
  {
    id: 2,
    version_number: 2,
    title: 'Post-Internship Technical Revision',
    overall_score: 78,
    skills_count: 19,
    notes: 'Added Dataview Analytics internship metrics and Docker skills.',
    created_at: '2024-10-20'
  },
  {
    id: 3,
    version_number: 3,
    title: 'ATS-Optimized Full Stack Version',
    overall_score: 84,
    skills_count: 23,
    notes: 'Integrated AI recommendations: quantified latency reductions and structured keywords.',
    created_at: '2024-11-07'
  }
];
