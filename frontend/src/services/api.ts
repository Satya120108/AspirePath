import axios from 'axios';
import type { 
  User, 
  UserProfile, 
  ResumeData, 
  ResumeAnalysis, 
  JobMatchResult, 
  SkillGapAnalysis, 
  CareerRoadmap, 
  RoadmapTask,
  InterviewSession, 
  InterviewQuestion, 
  DashboardSummary,
  ResumeVersion 
} from '../types';

const API_BASE = '/api';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000,
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('careeriq_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401 unauth
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isDemo = localStorage.getItem('careeriq_demo_mode') === 'true';
      if (!isDemo && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        localStorage.removeItem('careeriq_token');
        localStorage.removeItem('careeriq_user');
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth
  auth: {
    register: (data: { email: string; password: string; name: string }) =>
      apiClient.post<{ token: string; user: User }>('/auth/register', data),
    login: (data: { email: string; password: string }) =>
      apiClient.post<{ token: string; user: User }>('/auth/login', data),
    logout: () => apiClient.post('/auth/logout'),
    getMe: () => apiClient.get<{ user: User }>('/auth/me'),
    updateProfile: (data: Partial<UserProfile>) => apiClient.put<UserProfile>('/auth/profile', data),
    updatePassword: (data: { current_password?: string; new_password: string }) =>
      apiClient.post('/auth/update-password', data),
  },

  // Resume
  resume: {
    upload: (formData: FormData) =>
      apiClient.post<ResumeData>('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    analyze: (resumeId?: number) =>
      apiClient.post<ResumeAnalysis>('/resume/analyze', { resume_id: resumeId }),
    getLatest: () => apiClient.get<ResumeData>('/resume/latest'),
    getAnalysis: () => apiClient.get<ResumeAnalysis>('/resume/analysis'),
    getVersions: () => apiClient.get<ResumeVersion[]>('/resume/versions'),
    compareVersions: (v1: number, v2: number) =>
      apiClient.post<{ comparison: any }>('/resume/compare', { version_1: v1, version_2: v2 }),
  },

  // Jobs
  jobs: {
    analyzeMatch: (data: { job_description: string; job_title?: string; company?: string }) =>
      apiClient.post<JobMatchResult>('/jobs/analyze', data),
    getSavedMatches: () => apiClient.get<JobMatchResult[]>('/jobs/matches'),
    simulateImprovement: (data: { added_skills: string[]; added_projects: string[]; job_description: string }) =>
      apiClient.post<{
        original_score: number;
        simulated_score: number;
        score_delta: number;
        impact_analysis: string[];
      }>('/jobs/simulate', data),
  },

  // Skills
  skills: {
    analyzeGaps: (data: { target_role: string }) =>
      apiClient.post<SkillGapAnalysis>('/skills/analyze', data),
    getRecommendedProjects: (data: { missing_skills: string[]; target_role?: string }) =>
      apiClient.post<{ projects: SkillGapAnalysis['recommended_projects'] }>('/skills/recommend-projects', data),
  },

  // Roadmap
  roadmap: {
    generate: (data: { target_role: string; timeframe_months?: number }) =>
      apiClient.post<CareerRoadmap>('/roadmap/generate', data),
    getLatest: () => apiClient.get<CareerRoadmap>('/roadmap/latest'),
    updateTask: (taskId: number, data: { is_completed: boolean }) =>
      apiClient.patch<RoadmapTask>(`/roadmap/tasks/${taskId}`, data),
  },

  // Interview
  interview: {
    generateQuestions: (data: { role: string; category: string; difficulty: string; count?: number }) =>
      apiClient.post<InterviewSession>('/interview/generate', data),
    evaluateAnswer: (data: { question: string; category: string; difficulty: string; user_answer: string; key_points?: string[] }) =>
      apiClient.post<InterviewQuestion['evaluation']>('/interview/evaluate', data),
    saveSession: (data: any) => apiClient.post('/interview/save', data),
    getHistory: () => apiClient.get<InterviewSession[]>('/interview/history'),
  },

  // Career Assistant
  assistant: {
    chat: (data: { message: string; history?: Array<{ sender: string; content: string }> }) =>
      apiClient.post<{ response: string }>('/assistant/chat', data),
  },

  // Dashboard
  dashboard: {
    getSummary: () => apiClient.get<DashboardSummary>('/dashboard/summary'),
  },
};
