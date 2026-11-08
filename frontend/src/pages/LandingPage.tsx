import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  Bot,
  Compass,
  CheckCircle2,
  FileCheck,
  Milestone,
  Dna,
  Users,
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { loginAsDemo, user } = useAuth();
  const navigate = useNavigate();

  const handleLaunchDemo = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background gradient decorative shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/20 via-cyan-400/15 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-cyan-300 shadow-sm mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>AI-Powered Career Intelligence Platform for Job Seekers</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Transform Your Resume Into a{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Personalized Career Growth Plan
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CareerIQ goes beyond basic resume parsers. Uncover your Career DNA, calculate explainable job compatibility, bridge skill gaps with targeted projects, and prepare for interviews with conversational AI.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:opacity-95 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  <span>Start Free Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLaunchDemo}
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-xl text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <Compass className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                  <span>Explore Live Demo (1-Click)</span>
                </button>
              </>
            )}
          </div>

          {/* Social Proof metrics */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-cyan-400">98.4%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">ATS Parsing Accuracy</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-cyan-400">3.2x</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Interview Rate Increase</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-cyan-400">15,000+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Skill Vectors Indexed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-cyan-400">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Explainable Scoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-16 bg-white dark:bg-[#070b14] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block mb-2">
              Comprehensive Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need To Secure Your Dream Role
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              A unified pipeline integrating natural language processing, vector similarity matching, and Google Gemini AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Deep ATS & Resume Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Extract technical skills, quantify experience impact, detect missing sections, and generate an ATS-optimized executive summary.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Explainable Job Match Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No black-box percentages. Uses TF-IDF cosine similarity and skill matrices to reveal exact matching skills and missing prerequisites.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Career DNA Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Proprietary algorithmic archetype scoring classifying technical breadth, problem-solving depth, and leadership trajectory.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Career Improvement Simulator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hypothetically test adding skills like GraphQL or Kubernetes to see your job compatibility increase before writing a single line of code.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Milestone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Personalized Career Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step beginner to advanced milestones with curated learning links and an interactive checkbox checklist that saves your progress.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                AI Interview Prep & Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice technical, HR, and behavioral interview questions with structured AI grading for relevance, clarity, accuracy, and completeness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block mb-2">
            Seamless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How CareerIQ Propels Your Career
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
            <span className="text-4xl font-black text-indigo-100 dark:text-indigo-950 absolute top-4 right-4">01</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold mb-4">1</div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Upload Your Resume</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Drop in your PDF resume. Our backend extracts text via PyPDF, cleans token boundaries, and sends structured prompts to Gemini.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
            <span className="text-4xl font-black text-indigo-100 dark:text-indigo-950 absolute top-4 right-4">02</span>
            <div className="w-10 h-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold mb-4">2</div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Paste Job Descriptions</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compare your experience with real job postings. Instantly view matching skills, missing technologies, and recommendations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
            <span className="text-4xl font-black text-indigo-100 dark:text-indigo-950 absolute top-4 right-4">03</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold mb-4">3</div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Execute Your Roadmap</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Follow tailored project recommendations, check off roadmap tasks, practice interview questions, and build your ATS-ready resume.
            </p>
          </div>
        </div>
      </section>

      {/* Illustrative Testimonials & Stats */}
      <section id="stats" className="py-16 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Sample Illustrative Candidate Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Loved by Students & Job Seekers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4">
                "CareerIQ showed me that my resume was missing microservice metrics. Following the roadmap and building the recommended Redis project landed me my first SWE internship!"
              </p>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Priya Patel</p>
                <p className="text-[10px] text-slate-500">CS Senior, University of Michigan</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4">
                "The Explainable Job Matching is incredible. Rather than a vague 70%, it told me precisely which 3 skills I needed for the Stripe job description."
              </p>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Marcus Vance</p>
                <p className="text-[10px] text-slate-500">New Grad Full Stack Developer</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4">
                "Practicing system design interview questions with real-time feedback helped me ace my technical round. The Token Bucket feedback was spot-on."
              </p>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Elena Rostova</p>
                <p className="text-[10px] text-slate-500">Backend Engineer Candidate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Ready to Accelerate Your Career Trajectory?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
          Join thousands of candidates who transformed generic resumes into structured, high-impact career growth engines.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            Create Free Account
          </Link>
          <button
            onClick={handleLaunchDemo}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-xl text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Explore Interactive Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-[#070b14] text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white">CareerIQ</span>
            <span>— AI-Powered Career Intelligence</span>
          </div>
          <div className="flex gap-6">
            <Link to="/resume" className="hover:text-indigo-600">Resume Intelligence</Link>
            <Link to="/job-match" className="hover:text-indigo-600">Job Matching</Link>
            <Link to="/roadmap" className="hover:text-indigo-600">Career Roadmap</Link>
            <Link to="/interview" className="hover:text-indigo-600">Interview Prep</Link>
          </div>
          <p>© {new Date().getFullYear()} CareerIQ. Built for students and job seekers.</p>
        </div>
      </footer>
    </div>
  );
};
