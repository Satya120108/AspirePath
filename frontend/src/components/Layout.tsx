import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, Sun, Moon, Bell, Sparkles, User as UserIcon } from 'lucide-react';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Page titles map
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Career Intelligence Dashboard';
      case '/resume':
        return 'AI Resume Intelligence';
      case '/job-match':
        return 'Explainable Job Match Engine';
      case '/skill-gap':
        return 'Skill Gap & Project Recommender';
      case '/roadmap':
        return 'Personalized Career Roadmap';
      case '/interview':
        return 'AI Interview Preparation';
      case '/assistant':
        return 'CareerIQ AI Assistant';
      case '/resume-builder':
        return 'Interactive Resume Builder';
      case '/settings':
        return 'Account & Profile Settings';
      default:
        return 'CareerIQ Platform';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white truncate">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Quick Assistant Access */}
            <button
              onClick={() => navigate('/assistant')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Ask AI</span>
            </button>

            {/* User Profile avatar */}
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.name ? user.name.slice(0, 1).toUpperCase() : <UserIcon className="w-4 h-4" />}
              </div>
              <span className="hidden md:inline text-xs font-medium text-slate-700 dark:text-slate-200">
                {user?.name?.split(' ')[0] || 'User'}
              </span>
            </button>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
