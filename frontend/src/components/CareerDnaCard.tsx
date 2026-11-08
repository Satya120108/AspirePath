import React from 'react';
import { Dna, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';
import type { ResumeAnalysis } from '../types';

interface CareerDnaCardProps {
  dna?: ResumeAnalysis['career_dna'];
}

export const CareerDnaCard: React.FC<CareerDnaCardProps> = ({ dna }) => {
  if (!dna) return null;

  const attributes = [
    { label: 'Technical Breadth', value: dna.technical_breadth, icon: Cpu, color: 'bg-indigo-500' },
    { label: 'Problem-Solving Depth', value: dna.problem_solving_depth, icon: Sparkles, color: 'bg-cyan-500' },
    { label: 'Leadership Readiness', value: dna.leadership_readiness, icon: Award, color: 'bg-emerald-500' },
    { label: 'Growth Velocity', value: dna.growth_velocity, icon: TrendingUp, color: 'bg-amber-500' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-900/60 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Dna className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white">Career DNA Profile</h3>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/30 border border-indigo-400/40 text-cyan-300 rounded-full uppercase tracking-wider">
                Proprietary AI
              </span>
            </div>
            <p className="text-xs text-slate-300">Algorithmic synthesis of technical aptitude & growth traits</p>
          </div>
        </div>
      </div>

      {/* Archetype Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="text-[10px] font-semibold tracking-wider text-cyan-400 uppercase block">
            Primary Archetype
          </span>
          <p className="text-sm font-bold text-white mt-0.5">{dna.primary_archetype}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="text-[10px] font-semibold tracking-wider text-indigo-300 uppercase block">
            Secondary Archetype
          </span>
          <p className="text-sm font-bold text-white mt-0.5">{dna.secondary_archetype}</p>
        </div>
      </div>

      {/* Trait Progress Bars */}
      <div className="space-y-3 mb-5 relative z-10">
        {attributes.map((attr) => {
          const Icon = attr.icon;
          return (
            <div key={attr.label}>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  {attr.label}
                </span>
                <span className="font-bold text-white">{attr.value}%</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full ${attr.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${attr.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation footer */}
      <div className="p-3 rounded-xl bg-indigo-900/40 border border-indigo-700/50 text-xs text-indigo-100 relative z-10">
        <span className="font-bold text-cyan-300 block mb-0.5">Strategic Growth Focus:</span>
        <p className="text-slate-300 leading-relaxed">{dna.recommended_focus}</p>
      </div>
    </div>
  );
};
