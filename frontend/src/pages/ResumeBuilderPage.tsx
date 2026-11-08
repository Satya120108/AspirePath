import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Printer,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Check,
  Eye,
  LayoutTemplate
} from 'lucide-react';

export const ResumeBuilderPage: React.FC = () => {
  const { user } = useAuth();

  const [template, setTemplate] = useState<'modern' | 'minimal' | 'executive'>('modern');

  // Resume form state
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex.morgan@stanford.edu',
    phone: '+1 (555) 349-8812',
    location: user?.profile?.location || 'San Francisco, CA',
    linkedin: user?.profile?.linkedin_url || 'linkedin.com/in/alexmorgan-cs',
    github: user?.profile?.github_url || 'github.com/alexmorgan-dev',
    summary:
      'Passionate and results-oriented Full Stack Engineer with proven experience designing high-throughput Python microservices, responsive React web apps, and distributed systems. Reduced application latency by 38% and supported 4,500+ active users.',
  });

  const [skills, setSkills] = useState([
    'Python', 'TypeScript', 'JavaScript', 'React.js', 'Node.js',
    'PostgreSQL', 'Docker', 'RESTful APIs', 'Git', 'Data Structures & Algorithms'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const [experiences, setExperiences] = useState([
    {
      role: 'Software Engineering Intern',
      company: 'Dataview Analytics',
      duration: 'June 2024 - Aug 2024',
      bullets: [
        'Built real-time telemetry analytics microservice using Python and Flask, processing 250k+ events/day with 99.9% uptime.',
        'Refactored data visualization dashboard in React and Tailwind, reducing initial load latency by 38%.',
        'Authored comprehensive unit and integration test suite increasing code coverage from 62% to 89%.'
      ]
    }
  ]);

  const [projects, setProjects] = useState([
    {
      title: 'DevScale – Cloud Native Task Orchestrator',
      technologies: 'Go, Docker, Redis, Prometheus',
      description: 'Distributed job scheduler with worker pools and asynchronous task execution. Reduced asynchronous processing time by 45%.'
    },
    {
      title: 'PulseHealth – AI Symptom Triaging Assistant',
      technologies: 'React, Python, FastAPI, Gemini API',
      description: 'Full-stack medical consultation assistant using LLMs. Achieved 91% concordance with physician validation benchmarks.'
    }
  ]);

  const [education, setEducation] = useState([
    {
      degree: 'B.S. in Computer Science',
      institution: 'Stanford University',
      year: '2021 - 2025 (Expected)',
      gpa: '3.82 / 4.00'
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive ATS Resume Builder</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Resume Builder & PDF Exporter
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Craft an ATS-optimized, high-impact resume with live preview and instant export
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Template Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['modern', 'minimal', 'executive'] as const).map((tmpl) => (
              <button
                key={tmpl}
                onClick={() => setTemplate(tmpl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                  template === tmpl
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {tmpl}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Form Editor (hidden when printing) */}
        <div className="space-y-6 print:hidden">
          {/* Personal Information */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Personal & Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Phone</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-500 text-xs mb-1">
                Executive Professional Summary
              </label>
              <textarea
                rows={3}
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Skills Editor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Technical Skills Taxonomy
            </h3>
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. GraphQL, Kubernetes)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white"
              >
                Add
              </button>
            </form>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {sk}
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                    className="hover:text-red-500 text-slate-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Document Preview */}
        <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200 min-h-[700px] text-xs leading-normal font-sans print:p-0 print:shadow-none print:border-none print:rounded-none">
          {/* Document Header */}
          <div className="text-center pb-4 border-b border-slate-300 mb-4">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600 mt-1">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
              <span>•</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5">
                Professional Summary
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Technical Skills */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5">
              Technical Competencies
            </h2>
            <p className="text-[11px] text-slate-800 leading-relaxed">
              <strong>Core Skills:</strong> {skills.join(' • ')}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2">
              Work Experience
            </h2>
            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{exp.role}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{exp.duration}</span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-900 block mb-1">
                  {exp.company}
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2">
              Key Engineering Projects
            </h2>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  <span className="text-[10px] text-slate-500 italic">[{proj.technologies}]</span>
                </div>
                <p className="text-[11px] text-slate-700">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-[11px]">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600"> — {edu.institution}</span>
                </div>
                <span className="text-slate-500">{edu.year} | GPA: {edu.gpa}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
