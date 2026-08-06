import React from 'react';
import { UserStats } from '../types';
import { BookOpen, Search, Layers, CheckSquare, BookMarked, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: UserStats;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, stats }) => {
  const tabs = [
    { id: 'lessons', label: 'GRAMÁTICA', num: '01', icon: BookOpen },
    { id: 'verbs', label: 'VERBOS', num: '02', icon: Search },
    { id: 'flashcards', label: 'FLASHCARDS', num: '03', icon: Layers },
    { id: 'quiz', label: 'EJERCICIOS', num: '04', icon: CheckSquare },
    { id: 'stories', label: 'LECTURA', num: '05', icon: BookMarked },
    { id: 'ai-coach', label: 'TUTOR IA', num: '06', icon: Sparkles },
  ];

  return (
    <header className="border-b border-black bg-[#F9F9F9] text-[#111111] sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between py-5 border-b border-black gap-4">
          <div className="flex items-baseline gap-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase">
              PRESENTE <span className="text-red-600">/</span> ESPAÑOL
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 hidden sm:inline">
              SISTEMA EDITORIAL DE GRAMÁTICA
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 border border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>RACHA: {stats.streakDays} DÍAS</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 border border-black bg-black text-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
              <span>DOMINADOS: {stats.masteredVerbs.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Editorial style */}
        <nav className="flex overflow-x-auto no-scrollbar py-3 space-x-6 sm:space-x-8 text-[11px] font-bold uppercase tracking-widest" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-black text-black font-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <span className={isActive ? 'text-red-600' : 'opacity-40'}>{tab.num}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
