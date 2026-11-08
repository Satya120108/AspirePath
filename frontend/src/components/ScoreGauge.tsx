import React from 'react';

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  subtitle?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  maxScore = 100,
  size = 'md',
  label = 'Overall Score',
  subtitle,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

  // Color classes based on percentage
  const getColor = (pct: number) => {
    if (pct >= 80) return { stroke: '#10b981', text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800' };
    if (pct >= 65) return { stroke: '#6366f1', text: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-200 dark:border-indigo-800' };
    if (pct >= 50) return { stroke: '#f59e0b', text: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800' };
    return { stroke: '#ef4444', text: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200 dark:border-rose-800' };
  };

  const color = getColor(percentage);

  const dimensions = {
    sm: { width: 90, radius: 36, stroke: 6, textSize: 'text-lg', labelSize: 'text-[10px]' },
    md: { width: 140, radius: 56, stroke: 8, textSize: 'text-3xl', labelSize: 'text-xs' },
    lg: { width: 180, radius: 72, stroke: 10, textSize: 'text-4xl', labelSize: 'text-sm' },
  }[size];

  const circumference = 2 * Math.PI * dimensions.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center p-2">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dimensions.width}
          height={dimensions.width}
          className="transform -rotate-90 transition-all duration-1000 ease-out"
        >
          {/* Background circle */}
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.width / 2}
            r={dimensions.radius}
            stroke="currentColor"
            strokeWidth={dimensions.stroke}
            className="text-slate-100 dark:text-slate-800"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.width / 2}
            r={dimensions.radius}
            stroke={color.stroke}
            strokeWidth={dimensions.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-black tracking-tight ${dimensions.textSize} ${color.text}`}>
            {percentage}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            / {maxScore}
          </span>
        </div>
      </div>

      {label && (
        <span className={`mt-2 font-bold text-slate-800 dark:text-slate-200 ${dimensions.labelSize}`}>
          {label}
        </span>
      )}
      {subtitle && (
        <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
  );
};
