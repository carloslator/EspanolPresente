import React, { useState } from 'react';
import { LESSONS } from '../data/lessons';
import { PresentTense } from '../types';
import { speakSpanish } from '../utils/speech';
import { Volume2, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

interface LessonViewProps {
  onGoToVerbs?: (tense: PresentTense) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ onGoToVerbs }) => {
  const [selectedTense, setSelectedTense] = useState<PresentTense>('indicative');
  const activeLesson = LESSONS.find((l) => l.tenseId === selectedTense) || LESSONS[0];

  const tenseTabs: { id: PresentTense; label: string; badge: string }[] = [
    { id: 'indicative', label: 'Present Indicative', badge: 'Habits & Facts' },
    { id: 'continuous', label: 'Present Continuous', badge: 'Right Now' },
    { id: 'subjunctive', label: 'Present Subjunctive', badge: 'WEIRDO Triggers' },
    { id: 'perfect_indicative', label: 'Present Perfect', badge: 'Have + Done' },
    { id: 'perfect_subjunctive', label: 'Perfect Subjunctive', badge: 'Subjunctive Past' },
    { id: 'imperative', label: 'Commands', badge: 'Do / Don\'t!' },
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Tense Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tenseTabs.map((t) => {
          const isActive = selectedTense === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTense(t.id)}
              className={`p-3 text-left border border-black transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-black text-white font-bold'
                  : 'bg-white text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <div className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${isActive ? 'text-red-500' : 'text-neutral-500'}`}>
                {t.badge}
              </div>
              <div className="text-sm font-extrabold leading-tight uppercase tracking-tight">
                {t.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Hero Lesson Header Banner - Editorial Editorial Style */}
      <div className="bg-white border border-black p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="max-w-3xl">
          <div className="text-red-600 text-[11px] uppercase font-bold tracking-widest mb-2">
            GRAMÁTICA DE PRESENTE <span className="text-black">/</span> {activeLesson.subtitle}
          </div>
          <h2 className="text-4xl sm:text-6xl font-black leading-[0.95] tracking-tighter uppercase mb-4 text-[#111111]">
            {activeLesson.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-neutral-800">
            {activeLesson.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4 min-w-[240px] border-l border-black pl-6 w-full lg:w-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">FÓRMULA RÁPIDA</div>
          <div className="text-xl font-black text-red-600 uppercase tracking-tight">
            {activeLesson.simpleFormula}
          </div>

          {onGoToVerbs && (
            <button
              onClick={() => onGoToVerbs(selectedTense)}
              className="mt-2 inline-flex items-center justify-between bg-black text-white hover:bg-red-600 transition-colors px-4 py-3 text-xs font-bold uppercase tracking-widest border border-black"
            >
              <span>Ver Verbos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid: When To Use & Formation Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* When To Use Section */}
        <div className="bg-white border border-black p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-black pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                CUÁNDO USARLO
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">USOS PRINCIPALES</span>
          </div>

          <div className="space-y-4">
            {activeLesson.whenToUse.map((sc, idx) => (
              <div key={idx} className="p-4 bg-[#F9F9F9] border border-black space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                    {sc.situation}
                  </span>
                  <span className="text-xs text-neutral-500 italic">
                    Inglés: "{sc.englishEquivalent}"
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 border border-black">
                  <div>
                    <span className="text-base font-bold text-black block font-sans">
                      {sc.exampleEs}
                    </span>
                    <span className="text-xs text-neutral-600 italic">
                      "{sc.exampleEn}"
                    </span>
                  </div>
                  <button
                    onClick={() => speakSpanish(sc.exampleEs)}
                    title="Pronunciación"
                    className="p-2 bg-neutral-100 hover:bg-black hover:text-white transition-colors border border-black"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formation Rules Section */}
        <div className="bg-white border border-black p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-black pb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                REGLAS DE FORMACIÓN
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">ESTRUCTURA</span>
          </div>

          <div className="space-y-5">
            {activeLesson.formationRules.map((rule, idx) => (
              <div key={idx} className="border border-black p-4 space-y-3 bg-[#F9F9F9]">
                <h4 className="text-xs font-black text-black uppercase tracking-wider border-b border-black pb-2">
                  {rule.group}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                  {rule.rule}
                </p>

                {rule.endings && (
                  <div className="grid grid-cols-3 gap-2 text-center bg-black text-white p-3 text-xs font-mono">
                    <div>Yo: <span className="text-red-500 font-bold">{rule.endings.yo}</span></div>
                    <div>Tú: <span className="text-red-500 font-bold">{rule.endings.tu}</span></div>
                    <div>Él: <span className="text-red-500 font-bold">{rule.endings.el}</span></div>
                    <div>Nosotros: <span className="text-red-500 font-bold">{rule.endings.nosotros}</span></div>
                    <div>Vosotros: <span className="text-red-500 font-bold">{rule.endings.vosotros}</span></div>
                    <div>Ellos: <span className="text-red-500 font-bold">{rule.endings.ellos}</span></div>
                  </div>
                )}

                {rule.examples.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {rule.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="flex items-center justify-between text-xs bg-white px-3 py-2 border border-black font-medium">
                        <span className="font-bold text-black">{ex.es}</span>
                        <span className="text-neutral-500 italic">{ex.en}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Memory Hacks & Common Traps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Memory Hacks */}
        <div className="bg-black text-white p-6 sm:p-8 border border-black space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-black uppercase tracking-wider text-white">
                REGLAS Y TRUCOS MNEMOTÉCNICOS
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">SHORTCUTS</span>
          </div>
          <ul className="space-y-3">
            {activeLesson.memoryTricks.map((m, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900 p-3.5 border border-neutral-800">
                <span className="text-red-600 font-mono font-bold">0{idx + 1}.</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Traps */}
        <div className="bg-white text-black p-6 sm:p-8 border-l-4 border-l-red-600 border border-black space-y-4">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-black uppercase tracking-wider text-black">
                ERRORES COMUNES A EVITAR
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-bold">⚠️ TRAPS</span>
          </div>
          <ul className="space-y-3">
            {activeLesson.commonTraps.map((t, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800 leading-relaxed bg-[#F9F9F9] p-3.5 border border-black">
                <span className="text-red-600 font-bold">●</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
