import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isDemo: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginAsDemo: () => void;
  logout: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const DEMO_USER: User = {
  id: 9999,
  name: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  role: 'Software Engineer Candidate',
  created_at: new Date().toISOString(),
  profile: {
    id: 9999,
    user_id: 9999,
    full_name: 'Alex Morgan',
    headline: 'Aspiring Full Stack Engineer | CS Senior @ Stanford',
    target_role: 'Full Stack Software Engineer',
    experience_level: 'Entry',
    location: 'San Francisco, CA',
    bio: 'Passionate computer science graduate with projects in React, Python, Cloud computing, and Machine Learning. Seeking full-time graduate SWE roles.',
    linkedin_url: 'https://linkedin.com/in/alexmorgan-cs',
    github_url: 'https://github.com/alexmorgan-dev',
  }
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('careeriq_token');
      const savedDemo = localStorage.getItem('careeriq_demo_mode') === 'true';

      if (savedDemo) {
        setIsDemo(true);
        setUser(DEMO_USER);
        setIsLoading(false);
        return;
      }

      if (savedToken) {
        setToken(savedToken);
        try {
          const res = await api.auth.getMe();
          setUser(res.data.user);
        } catch (err) {
          console.warn('Session expired or invalid token', err);
          localStorage.removeItem('careeriq_token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      const { token: receivedToken, user: receivedUser } = res.data;
      setToken(receivedToken);
      setUser(receivedUser);
      setIsDemo(false);
      localStorage.setItem('careeriq_token', receivedToken);
      localStorage.removeItem('careeriq_demo_mode');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.auth.register({ name, email, password });
      const { token: receivedToken, user: receivedUser } = res.data;
      setToken(receivedToken);
      setUser(receivedUser);
      setIsDemo(false);
      localStorage.setItem('careeriq_token', receivedToken);
      localStorage.removeItem('careeriq_demo_mode');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = () => {
    setIsDemo(true);
    setUser(DEMO_USER);
    localStorage.setItem('careeriq_demo_mode', 'true');
    localStorage.setItem('careeriq_token', 'demo-jwt-token-active');
  };

  const logout = () => {
    try {
      if (!isDemo && token) {
        api.auth.logout().catch(() => {});
      }
    } finally {
      setUser(null);
      setToken(null);
      setIsDemo(false);
      localStorage.removeItem('careeriq_token');
      localStorage.removeItem('careeriq_demo_mode');
      localStorage.removeItem('careeriq_user');
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (isDemo) {
      if (user) {
        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...profileData,
          }
        });
      }
      return;
    }

    const res = await api.auth.updateProfile(profileData);
    if (user) {
      setUser({
        ...user,
        profile: res.data,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isDemo,
        login,
        register,
        loginAsDemo,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
