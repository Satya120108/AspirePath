from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr, Field

class RegisterSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdateSchema(BaseModel):
    full_name: Optional[str] = None
    headline: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    target_role: Optional[str] = None
    experience_level: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None

class JobAnalyzeSchema(BaseModel):
    job_description: str = Field(..., min_length=20)
    job_title: Optional[str] = 'Software Engineer'
    company: Optional[str] = 'Tech Company'

class JobSimulateSchema(BaseModel):
    added_skills: List[str] = Field(default_factory=list)
    added_projects: List[str] = Field(default_factory=list)
    job_description: str = Field(..., min_length=10)

class SkillAnalyzeSchema(BaseModel):
    target_role: str = Field(default='Full Stack Software Engineer')

class RoadmapGenerateSchema(BaseModel):
    target_role: str = Field(default='Full Stack Software Engineer')
    timeframe_months: Optional[int] = 3

class TaskUpdateSchema(BaseModel):
    is_completed: bool

class InterviewGenerateSchema(BaseModel):
    role: str = Field(default='Full Stack Software Engineer')
    category: str = Field(default='Technical')
    difficulty: str = Field(default='Mid-level')
    count: Optional[int] = 3

class InterviewEvaluateSchema(BaseModel):
    question: str
    category: str = 'Technical'
    difficulty: str = 'Mid-level'
    user_answer: str = Field(..., min_length=5)
    key_points: Optional[List[str]] = Field(default_factory=list)

class AssistantChatSchema(BaseModel):
    message: str = Field(..., min_length=1)
    history: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
