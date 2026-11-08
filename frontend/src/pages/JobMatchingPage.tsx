import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { mockJobMatchResult } from '../data/mockData';
import type { JobMatchResult } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { CareerSimulatorModal } from '../components/CareerSimulatorModal';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Building2,
  Search
} from 'lucide-react';

export const JobMatchingPage: React.FC = () => {
  const { isDemo } = useAuth();
  const [jobTitle, setJobTitle] = useState('Full Stack Software Engineer (New Grad / Junior)');
  const [company, setCompany] = useState('Stripe');
  const [jobDescription, setJobDescription] = useState(
    `About the Role:
We are looking for a passionate Full Stack Software Engineer to join our merchant dashboard team. You will build user-facing web applications in TypeScript and React, design scalable REST APIs in Python/Node, and interact with PostgreSQL databases and Docker containers.

Requirements:
- Strong proficiency in Python, TypeScript, and React.
- Experience building RESTful APIs and database schemas (PostgreSQL or MySQL).
- Familiarity with containerization (Docker) and Git workflows.
- Knowledge of GraphQL and Kubernetes is a big plus.
- Excellent analytical problem-solving and collaboration skills.`
  );
  const [matchResult, setMatchResult] = useState<JobMatchResult>(mockJobMatchResult);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const sampleRoles = [
    {
      title: 'Full Stack Engineer @ Stripe',
      company: 'Stripe',
      desc: `We are looking for a Full Stack Engineer to build reliable payment workflows. You will design RESTful APIs in Python, write TypeScript/React frontends, configure Docker containers, and query PostgreSQL. Bonus: GraphQL, Kubernetes, Redis, and automated CI/CD.`
    },
    {
      title: 'Backend Systems Engineer @ Cloudflare',
      company: 'Cloudflare',
      desc: `Seeking a Backend Engineer passionate about distributed systems and edge networking. Requirements: Python or Go, Docker, Linux systems internals, concurrency, microservices, and database tuning.`
    },
    {
      title: 'Frontend React Engineer @ Airbnb',
      company: 'Airbnb',
      desc: `Join our design systems team! Requirements: Deep React, TypeScript, Tailwind CSS, Next.js, accessibility (WCAG), performance optimization, and testing (Jest/Playwright).`
    }
  ];

  const handleSelectSample = (sample: typeof sampleRoles[0]) => {
    setJobTitle(sample.title);
    setCompany(sample.company);
    setJobDescription(sample.desc);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    try {
      if (isDemo) {
        setTimeout(() => {
          setIsAnalyzing(false);
          setMatchResult({
            ...mockJobMatchResult,
            job_title: jobTitle,
            company: company,
          });
        }, 1000);
        return;
      }

      const res = await api.jobs.analyzeMatch({
        job_description: jobDescription,
        job_title: jobTitle,
        company: company,
      });
      setMatchResult(res.data);
    } catch (err) {
      console.error(err);
      setMatchResult(mockJobMatchResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explainable ML & Vector Matching</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Explainable Job Matching Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Paste any job description to evaluate mathematical compatibility, matching skills, experience overlap, and run hypothetical simulations.
        </p>
      </div>

      {/* Input Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Job Posting Input
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Try preset:</span>
            {sampleRoles.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition"
              >
                {s.company}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Target Job Title
              </label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Job Description / Requirements Text
            </label>
            <textarea
              rows={5}
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Computing Cosine Similarity & Matrix Alignment...
              </span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze Job Compatibility</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Match Results Display */}
      {matchResult && (
        <div className="space-y-6">
          {/* Top Score Banner with Simulator CTA */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ScoreGauge
                score={matchResult.compatibility_score}
                size="lg"
                label="Overall Match"
                subtitle="Calculated Fit"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800">
                  {matchResult.company || 'Target Role'}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {matchResult.job_title}
                </h3>
                <p className="text-xs text-slate-500 max-w-md">
                  {matchResult.match_explanation}
                </p>
              </div>
            </div>

            {/* Career Simulator trigger button */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center sm:text-right">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                Hypothetical Scenario Testing
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 max-w-xs">
                Simulate how adding GraphQL or Kubernetes would increase your score before building them.
              </p>
              <button
                onClick={() => setSimulatorOpen(true)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 transition"
              >
                <Zap className="w-4 h-4" />
                <span>Launch Career Simulator</span>
              </button>
            </div>
          </div>

          {/* 3 Sub-component Mathematical Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Skill Overlap Ratio
              </p>
              <p className="text-2xl font-black text-indigo-600 dark:text-cyan-400 mt-1">
                {matchResult.breakdown.skill_match_percentage}%
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Exact keyword & synonym matches</p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Experience Alignment
              </p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {matchResult.breakdown.experience_alignment}%
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Internship & project scope depth</p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Semantic Cosine Similarity
              </p>
              <p className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">
                {matchResult.breakdown.semantic_similarity}%
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">TF-IDF vector text correlation</p>
            </div>
          </div>

          {/* Matching vs Missing Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Matching */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Matching Skills ({matchResult.matching_skills.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchResult.matching_skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Missing Prerequisites ({matchResult.missing_skills.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchResult.missing_skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  >
                    ✗ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Relevant Experience & Projects Overlap */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Why This Resume Matches: Detailed Line Evidence
            </h3>
            <div className="space-y-2.5">
              {matchResult.relevant_experience_matches.map((exp, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{exp}</span>
                </div>
              ))}
              {matchResult.relevant_projects_matches.map((prj, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span>{prj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations to reach 95%+ */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Action Plan to Achieve 95%+ Compatibility
            </h3>
            <div className="space-y-2">
              {matchResult.actionable_recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-indigo-600 dark:text-cyan-400">{i + 1}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Simulator Modal */}
      <CareerSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        currentScore={matchResult?.compatibility_score || 86}
        jobDescription={jobDescription}
      />
    </div>
  );
};
