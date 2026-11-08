import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { mockCareerRoadmap } from '../data/mockData';
import type { CareerRoadmap, RoadmapTask } from '../types';
import {
  Milestone,
  Sparkles,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  Layers,
  Award,
  BookOpen,
  Calendar,
  ChevronRight
} from 'lucide-react';

export const CareerRoadmapPage: React.FC = () => {
  const { user, isDemo } = useAuth();
  const [roadmap, setRoadmap] = useState<CareerRoadmap>(mockCareerRoadmap);
  const [selectedStage, setSelectedStage] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [targetRole, setTargetRole] = useState(user?.profile?.target_role || 'Full Stack Software Engineer');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (isDemo) {
        setRoadmap(mockCareerRoadmap);
        return;
      }
      try {
        const res = await api.roadmap.getLatest();
        if (res.data) setRoadmap(res.data);
      } catch (err) {
        setRoadmap(mockCareerRoadmap);
      }
    };

    fetchRoadmap();
  }, [isDemo]);

  const handleToggleTask = async (task: RoadmapTask) => {
    const updatedStatus = !task.is_completed;
    const updatedTasks = roadmap.tasks.map((t) =>
      t.id === task.id ? { ...t, is_completed: updatedStatus } : t
    );

    const completedCount = updatedTasks.filter((t) => t.is_completed).length;
    const newPercentage = Math.round((completedCount / updatedTasks.length) * 100);

    setRoadmap({
      ...roadmap,
      tasks: updatedTasks,
      completion_percentage: newPercentage,
    });

    if (!isDemo) {
      try {
        await api.roadmap.updateTask(task.id, { is_completed: updatedStatus });
      } catch (err) {
        console.error('Failed to persist task status to backend', err);
      }
    }
  };

  const handleRegenerateRoadmap = async () => {
    setIsGenerating(true);
    try {
      if (isDemo) {
        setTimeout(() => {
          setIsGenerating(false);
          setRoadmap({
            ...mockCareerRoadmap,
            target_role: targetRole,
          });
        }, 1200);
        return;
      }

      const res = await api.roadmap.generate({ target_role: targetRole });
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
      setRoadmap(mockCareerRoadmap);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredTasks =
    selectedStage === 'All'
      ? roadmap.tasks
      : roadmap.tasks.filter((t) => t.stage === selectedStage);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Dynamic Career Progression</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Personalized Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Milestone tasks calibrated to your existing skills and targeted toward {roadmap.target_role}
          </p>
        </div>

        <button
          onClick={handleRegenerateRoadmap}
          disabled={isGenerating}
          className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-1.5 transition disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
              Generating Roadmap...
            </span>
          ) : (
            <>
              <Milestone className="w-4 h-4" />
              <span>Regenerate Roadmap</span>
            </>
          )}
        </button>
      </div>

      {/* Progress & Duration Overview */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block">
              Estimated Duration: {roadmap.total_duration_weeks} Weeks
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Roadmap Completion Progress
            </h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-300">
              {roadmap.completion_percentage}%
            </span>
            <span className="text-xs text-slate-400">
              ({roadmap.tasks.filter((t) => t.is_completed).length} of {roadmap.tasks.length} tasks completed)
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700 ease-out"
            style={{ width: `${roadmap.completion_percentage}%` }}
          />
        </div>
      </div>

      {/* Stage Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((stage) => (
          <button
            key={stage}
            onClick={() => setSelectedStage(stage)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              selectedStage === stage
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <span>{stage} Stage</span>
            {stage !== 'All' && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {roadmap.tasks.filter((t) => t.stage === stage).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task Milestones List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const stageBadgeColor =
            task.stage === 'Beginner'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
              : task.stage === 'Intermediate'
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
              : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition-all duration-200 shadow-sm ${
                task.is_completed
                  ? 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Interactive Checkbox */}
                <button
                  type="button"
                  onClick={() => handleToggleTask(task)}
                  className="mt-1 flex-shrink-0 text-slate-400 hover:text-indigo-600 transition"
                  aria-label={task.is_completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.is_completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-indigo-600" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${stageBadgeColor}`}>
                        {task.stage}
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-bold ${
                          task.is_completed
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </h4>
                    </div>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{task.estimated_days} Days
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {/* Skills pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Target Skills:
                      </span>
                      {task.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Learning Resource Link */}
                    {task.resource_url && (
                      <a
                        href={task.resource_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{task.resource_name || 'Learning Resource'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capstone Project Card */}
      {roadmap.recommended_capstone_project && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-md">
          <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-cyan-400">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Roadmap Capstone Project
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {roadmap.recommended_capstone_project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {roadmap.recommended_capstone_project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {roadmap.recommended_capstone_project.skills.map((sk) => (
              <span
                key={sk}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
