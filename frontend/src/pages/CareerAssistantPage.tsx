import React, { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { ChatMessage } from '../types';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RefreshCw,
  Lightbulb,
  FileText,
  Briefcase
} from 'lucide-react';

export const CareerAssistantPage: React.FC = () => {
  const { user, isDemo } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      content: `Hello ${user?.name?.split(' ')[0] || 'there'}! I am your CareerIQ Intelligence Assistant. I have loaded your current resume profile and target role (${user?.profile?.target_role || 'Full Stack Software Engineer'}).\n\nHow can I help you today? You can ask me to rewrite a resume bullet point, explain system architecture concepts, suggest interview responses, or review a specific job requirement.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How do I rewrite my Dataview internship bullet to emphasize metrics?',
    'What are the key trade-offs between GraphQL and REST APIs?',
    'Explain the Token Bucket rate limiting algorithm for system design',
    'Suggest 2 practical projects to develop Kubernetes skills'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      if (isDemo) {
        setTimeout(() => {
          let reply = "That's a fantastic career question! Based on your target role as a Full Stack Software Engineer, focus on demonstrating distributed systems understanding and quantified business impact. For example, in your resume, replace 'worked on microservices' with 'Designed telemetry microservice in Python processing 250k+ daily events with 99.9% uptime, reducing latency by 38%.'";
          if (text.toLowerCase().includes('token bucket')) {
            reply = "The Token Bucket algorithm works by refilling tokens into a bucket of fixed capacity at a constant refill rate. When a request arrives, if tokens are available, one token is consumed and the request proceeds; otherwise, it is dropped or rejected with HTTP 429 Too Many Requests. It is ideal for handling traffic bursts while capping the overall throughput rate.";
          } else if (text.toLowerCase().includes('graphql')) {
            reply = "Key trade-offs:\n1. Over-fetching / Under-fetching: GraphQL lets clients query exact fields needed, whereas REST fixed endpoints often deliver unnecessary payloads.\n2. Caching: REST leverages standard HTTP edge caching (URLs, ETags); GraphQL POST requests require complex client-side normalized caches like Apollo.\n3. Complexity: GraphQL resolvers can easily encounter N+1 database queries unless DataLoader is implemented.";
          }

          const assistantMsg: ChatMessage = {
            id: `a-${Date.now()}`,
            sender: 'assistant',
            content: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setIsSending(false);
        }, 1000);
        return;
      }

      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        content: m.content
      }));

      const res = await api.assistant.chat({
        message: text,
        history: historyPayload
      });

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        content: res.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        content: "I'm having trouble connecting to the AI endpoint right now, but I can tell you that optimizing resume bullets with the STAR method (Situation, Task, Action, Result) will give you the highest immediate ROI for tech applications.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fadeIn">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              CareerIQ Intelligence Advisor
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Context Active: Resume & Profile Loaded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-indigo-800'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                {m.content}
                <div
                  className={`text-[10px] mt-2 text-right ${
                    isUser ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 rounded-tl-none flex items-center gap-2">
              <span className="animate-spin rounded-full h-3 w-3 border-2 border-indigo-600 border-t-transparent" />
              <span>Analyzing profile & crafting response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          Suggestions:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(p)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 whitespace-nowrap transition flex-shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about your resume, interview prep, or career roadmap..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
