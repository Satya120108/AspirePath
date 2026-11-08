import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { mockSkillGapAnalysis } from '../data/mockData';
import type { SkillGapAnalysis } from '../types';
import {
  GitCompare,
  Sparkles,
  AlertCircle,
  FolderGit2,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const { user, isDemo } = useAuth();
  const [targetRole, setTargetRole] = useState(user?.profile?.target_role || 'Full Stack Software Engineer');
  const [gapData, setGapData] = useState<SkillGapAnalysis>(mockSkillGapAnalysis);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const fetchGaps = async () => {
      if (isDemo) {
        setGapData(mockSkillGapAnalysis);
        return;
      }
      try {
        const res = await api.skills.analyzeGaps({ target_role: targetRole });
        if (res.data) setGapData(res.data);
      } catch (err) {
        setGapData(mockSkillGapAnalysis);
      }
    };

    fetchGaps();
  }, [isDemo, targetRole]);

  const handleRefreshAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    try {
      if (isDemo) {
        setTimeout(() => {
          setIsAnalyzing(false);
          setGapData({ ...mockSkillGapAnalysis, target_role: targetRole });
        }, 900);
        return;
      }

      const res = await api.skills.analyzeGaps({ target_role: targetRole });
      setGapData(res.data);
    } catch (err) {
      console.error(err);
      setGapData(mockSkillGapAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Role Matrix & Gap Analysis</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Skill Gap & Practical Project Recommendations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Identify the exact technical competencies separating you from your dream role and build targeted portfolio projects.
          </p>
        </div>

        <form onSubmit={handleRefreshAnalysis} className="flex gap-2">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition"
          >
            {isAnalyzing ? 'Analyzing...' : 'Recalibrate'}
          </button>
        </form>
      </div>

      {/* Existing vs Required Skills Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Existing Skills */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Candidate Current Skills
            </h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              {gapData.existing_skills.length} Validated
            </span>
          </div>

          <div className="space-y-2.5">
            {gapData.existing_skills.map((skill, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Skills For Role */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Industry Demands for {gapData.target_role}
            </h3>
            <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">
              Standard Baseline
            </span>
          </div>

          <div className="space-y-2.5">
            {gapData.required_skills.map((req, i) => {
              const importanceColor =
                req.importance === 'Critical'
                  ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800'
                  : req.importance === 'Important'
                  ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';

              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{req.name}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${importanceColor}`}>
                    {req.importance}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Priority Missing Skills Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Missing Skills & Learning Priorities ({gapData.missing_skills.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gapData.missing_skills.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{m.name}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      m.learning_priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {m.learning_priority} Priority
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Category: {m.category}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {m.why_needed}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated Time: {m.estimated_time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Feature 4: Skill-to-Project Recommendations */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-cyan-50/50 to-white dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/80 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Skill-to-Project Recommendations
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-cyan-300 rounded-full uppercase">
                  Curated Projects
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instead of isolated tutorials, develop these end-to-end applications to demonstrate your new skills.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {gapData.recommended_projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    Difficulty: {proj.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{proj.estimated_hours} Hours
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  {proj.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {proj.description}
                </p>

                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Skills Developed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skills_developed.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 text-[11px] font-semibold rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-600 dark:text-cyan-400 block mb-0.5">
                  Portfolio Value:
                </span>
                <p>{proj.portfolio_value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
