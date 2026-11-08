import React, { useState } from 'react';
import { X, GitCompare, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import type { ResumeVersion } from '../types';

interface ResumeCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  versions: ResumeVersion[];
}

export const ResumeCompareModal: React.FC<ResumeCompareModalProps> = ({
  isOpen,
  onClose,
  versions,
}) => {
  const [v1Id, setV1Id] = useState<number>(versions[0]?.id || 1);
  const [v2Id, setV2Id] = useState<number>(versions[versions.length - 1]?.id || 3);

  if (!isOpen) return null;

  const v1 = versions.find((v) => v.id === Number(v1Id)) || versions[0];
  const v2 = versions.find((v) => v.id === Number(v2Id)) || versions[versions.length - 1];

  const scoreDiff = (v2?.overall_score || 0) - (v1?.overall_score || 0);
  const skillsDiff = (v2?.skills_count || 0) - (v1?.skills_count || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Resume Version Evolution Comparison
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track how ATS scoring, keyword density, and technical achievements have progressed
            </p>
          </div>
        </div>

        {/* Version Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Base Version (Earlier)
            </label>
            <select
              value={v1Id}
              onChange={(e) => setV1Id(Number(e.target.value))}
              className="w-full text-xs font-semibold p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
            >
              {versions.map((ver) => (
                <option key={ver.id} value={ver.id}>
                  v{ver.version_number} - {ver.title} ({ver.overall_score}/100)
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
              Target Version (Latest)
            </label>
            <select
              value={v2Id}
              onChange={(e) => setV2Id(Number(e.target.value))}
              className="w-full text-xs font-semibold p-2 rounded-lg bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-600 text-slate-800 dark:text-white"
            >
              {versions.map((ver) => (
                <option key={ver.id} value={ver.id}>
                  v{ver.version_number} - {ver.title} ({ver.overall_score}/100)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delta Summary Pill */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                Measurable Evolution Growth
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                AI optimization and metric-driven revisions have significantly boosted resume strength
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Score Delta</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff} pts
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Skills Added</span>
              <span className="text-lg font-black text-teal-600 dark:text-teal-400">
                {skillsDiff >= 0 ? `+${skillsDiff}` : skillsDiff} skills
              </span>
            </div>
          </div>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Card 1 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500">v{v1?.version_number} Base</span>
              <span className="text-xs text-slate-400">{v1?.created_at}</span>
            </div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">{v1?.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{v1?.notes}</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Overall Score</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{v1?.overall_score}/100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Skills Detected</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{v1?.skills_count}</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl border-2 border-indigo-500/50 bg-indigo-50/20 dark:bg-indigo-950/20">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100 dark:border-indigo-800/50">
              <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400">v{v2?.version_number} Optimized</span>
              <span className="text-xs text-slate-400">{v2?.created_at}</span>
            </div>
            <p className="font-bold text-sm text-slate-900 dark:text-white mb-2">{v2?.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{v2?.notes}</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-indigo-100 dark:border-indigo-800/40">
                <span className="text-slate-500">Overall Score</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{v2?.overall_score}/100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-100 dark:border-indigo-800/40">
                <span className="text-slate-500">Skills Detected</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{v2?.skills_count}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Change breakdown */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-bold block text-slate-800 dark:text-slate-100 mb-1">Key Upgrades in Version {v2?.version_number}:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Added quantified metrics (250k+ events, 38% latency)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Incorporated Docker & Microservices keywords</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Optimized ATS header formatting & standard date tokens</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Stronger career objective statement with keyword density</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
