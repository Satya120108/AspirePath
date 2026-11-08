export interface User {
  id: number;
  email: string;
  name: string;
  role?: string;
  created_at?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id?: number;
  user_id?: number;
  full_name?: string;
  headline?: string;
  phone?: string;
  location?: string;
  target_role?: string;
  experience_level?: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
}

export interface SkillItem {
  id?: number;
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'framework' | 'language';
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years_experience?: number;
}

export interface ResumeData {
  id: number;
  filename: string;
  file_size?: number;
  extracted_text?: string;
  created_at: string;
  analysis?: ResumeAnalysis;
}

export interface ResumeAnalysis {
  id?: number;
  resume_id?: number;
  overall_score: number;
  score_breakdown: {
    ats_compatibility: number;
    skills_relevance: number;
    impact_and_metrics: number;
    structure_and_formatting: number;
    experience_depth: number;
  };
  contact_info: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
  };
  technical_skills: string[];
  soft_skills: string[];
  tools_and_frameworks: string[];
  education: Array<{
    degree: string;
    institution: string;
    year?: string;
    gpa_or_grade?: string;
    highlights?: string[];
  }>;
  experience: Array<{
    role: string;
    company: string;
    duration?: string;
    bullets?: string[];
    skills_used?: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies?: string[];
    impact_metric?: string;
    link?: string;
  }>;
  certifications: string[];
  achievements: string[];
  strengths: string[];
  weaknesses: string[];
  missing_information: string[];
  ats_suggestions: string[];
  improved_summary: string;
  career_dna: {
    primary_archetype: string;
    secondary_archetype: string;
    technical_breadth: number;
    problem_solving_depth: number;
    leadership_readiness: number;
    growth_velocity: number;
    recommended_focus: string;
  };
  created_at?: string;
}

export interface JobMatchResult {
  id?: number;
  job_title: string;
  company?: string;
  compatibility_score: number;
  breakdown: {
    skill_match_percentage: number;
    experience_alignment: number;
    semantic_similarity: number;
  };
  matching_skills: string[];
  missing_skills: string[];
  relevant_experience_matches: string[];
  relevant_projects_matches: string[];
  match_explanation: string;
  actionable_recommendations: string[];
  created_at?: string;
}

export interface SkillGapAnalysis {
  target_role: string;
  existing_skills: Array<{ name: string; level: string; match: boolean }>;
  required_skills: Array<{ name: string; importance: 'Critical' | 'Important' | 'Nice-to-have' }>;
  missing_skills: Array<{
    name: string;
    category: string;
    learning_priority: 'High' | 'Medium' | 'Low';
    estimated_time: string;
    why_needed: string;
  }>;
  recommended_projects: Array<{
    title: string;
    description: string;
    skills_developed: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimated_hours: number;
    portfolio_value: string;
  }>;
}

export interface RoadmapTask {
  id: number;
  stage: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  description: string;
  skills: string[];
  resource_url?: string;
  resource_name?: string;
  estimated_days: number;
  is_completed: boolean;
  order: number;
}

export interface CareerRoadmap {
  id: number;
  target_role: string;
  summary: string;
  total_duration_weeks: number;
  completion_percentage: number;
  tasks: RoadmapTask[];
  recommended_capstone_project?: {
    title: string;
    description: string;
    skills: string[];
  };
  created_at: string;
}

export interface InterviewQuestion {
  id?: number;
  session_id?: number;
  category: 'Technical' | 'HR' | 'Behavioral' | 'Project-based';
  difficulty: 'Junior' | 'Mid-level' | 'Senior';
  question: string;
  expected_key_points?: string[];
  user_answer?: string;
  evaluation?: {
    overall_score: number;
    relevance_score: number;
    clarity_score: number;
    technical_accuracy: number;
    completeness_score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    ideal_sample_answer: string;
  };
}

export interface InterviewSession {
  id: number;
  role: string;
  category: string;
  difficulty: string;
  score_average?: number;
  questions: InterviewQuestion[];
  created_at: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DashboardSummary {
  has_resume: boolean;
  resume_score: number;
  total_skills_identified: number;
  job_matches_analyzed: number;
  highest_job_match: number;
  skill_gaps_count: number;
  roadmap_progress: number;
  interviews_practiced: number;
  recent_activities: Array<{
    id: number;
    activity_type: string;
    description: string;
    timestamp: string;
  }>;
  recommended_actions: Array<{
    id: string;
    title: string;
    action_url: string;
    category: string;
    badge: string;
  }>;
  score_history: Array<{ date: string; score: number }>;
  skills_distribution: Array<{ name: string; count: number }>;
  career_dna?: ResumeAnalysis['career_dna'];
}

export interface ResumeVersion {
  id: number;
  version_number: number;
  title: string;
  overall_score: number;
  skills_count: number;
  notes?: string;
  created_at: string;
}
