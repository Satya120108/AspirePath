import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { mockInterviewQuestions } from '../data/mockData';
import type { InterviewSession, InterviewQuestion } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import {
  HelpCircle,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  History,
  BookOpen,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const InterviewPrepPage: React.FC = () => {
  const { user, isDemo } = useAuth();
  const [session, setSession] = useState<InterviewSession>(mockInterviewQuestions);
  const [category, setCategory] = useState<'Technical' | 'HR' | 'Behavioral' | 'Project-based'>('Technical');
  const [difficulty, setDifficulty] = useState<'Junior' | 'Mid-level' | 'Senior'>('Mid-level');
  const [role, setRole] = useState(user?.profile?.target_role || 'Full Stack Software Engineer');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(
    mockInterviewQuestions.questions[0]?.user_answer || ''
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewQuestion['evaluation'] | null>(
    mockInterviewQuestions.questions[0]?.evaluation || null
  );

  const activeQuestion = session.questions[activeQuestionIndex];

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setEvaluation(null);
    setUserAnswer('');
    try {
      if (isDemo) {
        setTimeout(() => {
          setIsGenerating(false);
          setSession({
            ...mockInterviewQuestions,
            role,
            category,
            difficulty,
          });
          setActiveQuestionIndex(0);
        }, 1000);
        return;
      }

      const res = await api.interview.generateQuestions({
        role,
        category,
        difficulty,
        count: 3,
      });
      setSession(res.data);
      setActiveQuestionIndex(0);
    } catch (err) {
      console.error(err);
      setSession(mockInterviewQuestions);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !activeQuestion) return;

    setIsEvaluating(true);
    try {
      if (isDemo) {
        setTimeout(() => {
          setIsEvaluating(false);
          setEvaluation(mockInterviewQuestions.questions[0].evaluation);
        }, 1100);
        return;
      }

      const res = await api.interview.evaluateAnswer({
        question: activeQuestion.question,
        category: activeQuestion.category,
        difficulty: activeQuestion.difficulty,
        user_answer: userAnswer,
        key_points: activeQuestion.expected_key_points,
      });
      setEvaluation(res.data);
    } catch (err) {
      console.error(err);
      setEvaluation(mockInterviewQuestions.questions[0].evaluation);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Simulation & Structured Rubric Grading</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            AI Interview Preparation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Practice domain-specific technical & behavioral questions with real-time feedback on clarity, technical accuracy, and completeness.
          </p>
        </div>
      </div>

      {/* Configuration & Generator Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Session Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Target Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Interview Track
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Technical">Technical & System Architecture</option>
              <option value="HR">HR & Cultural Fit</option>
              <option value="Behavioral">Behavioral (STAR Method)</option>
              <option value="Project-based">Deep-Dive on Resume Projects</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Difficulty Tier
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Junior">Junior / New Grad</option>
              <option value="Mid-level">Mid-level (1-3 YOE)</option>
              <option value="Senior">Senior / Staff</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateQuestions}
          disabled={isGenerating}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
              Synthesizing Questions with Gemini...
            </span>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate New Practice Scenario</span>
            </>
          )}
        </button>
      </div>

      {/* Active Question Display & Answer Box */}
      {activeQuestion && (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 border border-indigo-200 dark:border-indigo-800/80 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800 uppercase">
                  {activeQuestion.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {activeQuestion.difficulty}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                Question {activeQuestionIndex + 1} of {session.questions.length}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-4">
              "{activeQuestion.question}"
            </h3>

            {activeQuestion.expected_key_points && (
              <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Expected Interviewer Touchpoints:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {activeQuestion.expected_key_points.map((pt, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="text-indigo-600 dark:text-cyan-400 font-bold">•</span>
                      <span>{pt}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Answer Form */}
          <form onSubmit={handleEvaluateAnswer} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Your Spoken or Written Response
              </label>
              <span className="text-[11px] text-slate-400">
                {userAnswer.length} characters
              </span>
            </div>

            <textarea
              rows={5}
              required
              placeholder="Type your structured answer here (e.g. using STAR format or detailing architectural trade-offs)..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
            />

            <button
              type="submit"
              disabled={isEvaluating}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isEvaluating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                  Evaluating Response Metrics...
                </span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit & Request AI Evaluation</span>
                </>
              )}
            </button>
          </form>

          {/* Evaluation Results Card */}
          {evaluation && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <ScoreGauge score={evaluation.overall_score} size="md" label="Interview Score" />
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Strong Answer
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Rubric Assessment Overview
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mt-0.5">
                      {evaluation.feedback}
                    </p>
                  </div>
                </div>

                {/* Sub Scores */}
                <div className="grid grid-cols-2 gap-3 w-full sm:w-auto text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">Relevance</span>
                    <span className="font-bold text-indigo-600 dark:text-cyan-400 text-base">{evaluation.relevance_score}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">Clarity</span>
                    <span className="font-bold text-indigo-600 dark:text-cyan-400 text-base">{evaluation.clarity_score}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">Tech Accuracy</span>
                    <span className="font-bold text-indigo-600 dark:text-cyan-400 text-base">{evaluation.technical_accuracy}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">Completeness</span>
                    <span className="font-bold text-indigo-600 dark:text-cyan-400 text-base">{evaluation.completeness_score}%</span>
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Answer Strengths</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {evaluation.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold text-xs mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Suggested Refinements</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {evaluation.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ideal Sample Answer */}
              <div className="p-5 rounded-xl bg-indigo-50/60 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/60">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-cyan-400 font-bold text-xs mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Ideal Benchmark Answer</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{evaluation.ideal_sample_answer}"
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
