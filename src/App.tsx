import { useState } from 'react';
import { Header } from './components/Header';
import { LessonView } from './components/LessonView';
import { VerbExplorer } from './components/VerbExplorer';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { StoryView } from './components/StoryView';
import { AiCoachView } from './components/AiCoachView';
import { getUserStats } from './utils/storage';
import { PresentTense } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('lessons');
  const [targetVerbTense, setTargetVerbTense] = useState<PresentTense>('indicative');
  const [stats, setStats] = useState(getUserStats());

  const handleGoToVerbs = (tense: PresentTense) => {
    setTargetVerbTense(tense);
    setActiveTab('verbs');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#111111] font-sans flex flex-col antialiased">
      {/* Editorial Header & Tab Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'lessons' && <LessonView onGoToVerbs={handleGoToVerbs} />}
        {activeTab === 'verbs' && <VerbExplorer initialTense={targetVerbTense} />}
        {activeTab === 'flashcards' && <FlashcardView />}
        {activeTab === 'quiz' && <QuizView />}
        {activeTab === 'stories' && <StoryView />}
        {activeTab === 'ai-coach' && <AiCoachView />}
      </main>

      {/* Editorial Style Footer */}
      <footer className="border-t border-black bg-white text-[#111111] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-black">LUZ / ESPAÑOL</span>
            <span className="opacity-40">|</span>
            <span>EDICIÓN ESPAÑOL GRAMÁTICA DE PRESENTE</span>
          </div>

          <div className="flex items-center gap-6 opacity-60">
            <span>INDICATIVO</span>
            <span>CONTINUO</span>
            <span>SUBJUNTIVO</span>
            <span>PERFECTO</span>
            <span>IMPERATIVO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
