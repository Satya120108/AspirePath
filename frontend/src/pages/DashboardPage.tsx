import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { mockDashboardSummary } from '../data/mockData';
import type { DashboardSummary } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { CareerDnaCard } from '../components/CareerDnaCard';
import {
  FileText,
  Briefcase,
  GitCompare,
  Milestone,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user, isDemo } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState<DashboardSummary>(mockDashboardSummary);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      if (isDemo) {
        setSummary(mockDashboardSummary);
        setLoading(false);
        return;
      }

      try {
        const res = await api.dashboard.getSummary();
        if (res.data) {
          setSummary(res.data);
        }
      } catch (err) {
        console.warn('Using preloaded dashboard metrics', err);
        setSummary(mockDashboardSummary);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [isDemo]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Trajectory Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Candidate'}!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Target Role: <strong className="text-cyan-300">{user?.profile?.target_role || 'Full Stack Software Engineer'}</strong>.
              Your resume meets industry baseline criteria, with 4 targeted skill opportunities identified.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigate('/resume')}
              className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Upload / Re-Scan Resume</span>
            </button>
            <button
              onClick={() => navigate('/job-match')}
              className="px-4 py-2 text-xs font-bold rounded-xl text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm flex items-center gap-1.5 transition"
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Matcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Resume Score
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {summary.resume_score}
              </span>
              <span className="text-xs font-bold text-emerald-500">+16 pts</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">ATS & Content Quality</p>
          </div>
          <ScoreGauge score={summary.resume_score} size="sm" label="" />
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Identified Skills
            </p>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {summary.total_skills_identified}
            </span>
            <span className="text-xs text-slate-400 ml-1.5">verified skills</span>
          </div>
          <Link
            to="/resume"
            className="mt-3 text-xs font-bold text-indigo-600 dark:text-cyan-400 flex items-center gap-1 hover:underline"
          >
            <span>View taxonomy</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Peak Job Alignment
            </p>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {summary.highest_job_match}%
            </span>
            <span className="text-xs text-slate-400 ml-1.5">Stripe SWE</span>
          </div>
          <Link
            to="/job-match"
            className="mt-3 text-xs font-bold text-indigo-600 dark:text-cyan-400 flex items-center gap-1 hover:underline"
          >
            <span>Run comparison</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Roadmap Velocity
            </p>
            <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
              <Milestone className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {summary.roadmap_progress}%
            </span>
            <span className="text-xs text-slate-400 ml-1.5">milestones done</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${summary.roadmap_progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Charts & Career DNA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart 1: Resume Score Evolution */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Resume Quality & ATS Progression
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track how resume improvements and skill additions increased parsing quality
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                +23% Total Growth
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={summary.score_history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#scoreGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Skills Distribution Breakdown */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Skills Taxonomy Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Categorized balance across languages, backend frameworks, data stores, and tooling
            </p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.skills_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Career DNA + Recommended Actions */}
        <div className="space-y-6">
          {/* Career DNA Card */}
          <CareerDnaCard dna={summary.career_dna} />

          {/* Recommended Actions */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                AI Next-Best Recommendations
              </h3>
            </div>
            <div className="space-y-2.5">
              {summary.recommended_actions.map((act) => (
                <Link
                  key={act.id}
                  to={act.action_url}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider block">
                      {act.category}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition">
                      {act.title}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {act.badge}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Activities
              </h3>
            </div>
            <div className="space-y-3">
              {summary.recent_activities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {act.description}
                    </p>
                    <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
