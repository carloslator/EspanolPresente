import React, { useState } from 'react';
import { STORIES } from '../data/stories';
import { Annotation, Story } from '../types';
import { speakSpanish } from '../utils/speech';
import { Volume2, Languages, BookMarked, Info, CheckCircle2 } from 'lucide-react';

export const StoryView: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(STORIES[0].id);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);

  const activeStory: Story = STORIES.find((s) => s.id === selectedStoryId) || STORIES[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto font-sans">
      {/* Story Selection Bar */}
      <div className="bg-white border border-black p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-red-600" />
          <span className="text-xs uppercase font-bold tracking-widest text-black">
            LECTURAS EN ESPAÑOL:
          </span>
        </div>

        <div className="flex items-center gap-2">
          {STORIES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedStoryId(s.id);
                setActiveAnnotation(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-black transition-all ${
                selectedStoryId === s.id
                  ? 'bg-black text-white'
                  : 'bg-[#F9F9F9] text-black hover:bg-neutral-200'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Story Main Container */}
      <div className="bg-white border border-black p-6 sm:p-8 space-y-6 text-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black pb-6">
          <div>
            <span className="bg-red-600 text-white text-[10px] font-bold tracking-widest px-2.5 py-0.5 uppercase">
              NIVEL: {activeStory.level.toUpperCase()}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-3 text-black">
              {activeStory.title}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-1 italic font-medium">
              {activeStory.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border border-black transition-colors flex items-center gap-2 ${
                showEnglish
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              <Languages className="w-4 h-4 text-red-500" />
              {showEnglish ? 'Ocultar Traducción' : 'Mostrar Traducción'}
            </button>
          </div>
        </div>

        {/* Paragraphs with Interleaved Annotations */}
        <div className="space-y-6">
          {activeStory.paragraphs.map((p, pIdx) => {
            const fullParagraphText = p.text;

            return (
              <div key={pIdx} className="bg-[#F9F9F9] border border-black p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-lg sm:text-xl text-black font-sans font-medium leading-relaxed">
                    {p.text.split(' ').map((word, wIdx) => {
                      const cleanWord = word.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ]/g, '');
                      const matchAnn = p.annotations.find(
                        (a) => a.word.toLowerCase() === cleanWord.toLowerCase()
                      );

                      if (matchAnn) {
                        return (
                          <span
                            key={wIdx}
                            onClick={() => setActiveAnnotation(matchAnn)}
                            className="inline-block mx-0.5 px-1 bg-red-600 text-white font-bold cursor-pointer hover:bg-black transition-colors"
                            title="Ver nota de gramática"
                          >
                            {word}{' '}
                          </span>
                        );
                      }
                      return word + ' ';
                    })}
                  </div>

                  <button
                    onClick={() => speakSpanish(fullParagraphText)}
                    className="p-2.5 bg-black hover:bg-red-600 text-white border border-black transition-colors shrink-0"
                    title="Narrar párrafo"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {showEnglish && (
                  <div className="text-xs sm:text-sm text-neutral-600 font-sans italic border-t border-black/20 pt-3">
                    "{p.english}"
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Annotation Grammar Inspector */}
        {activeAnnotation && (
          <div className="p-5 bg-black text-white border border-black space-y-2 text-xs font-sans animate-fade-in">
            <div className="flex items-center justify-between text-red-500 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-red-600" /> ANOTACIÓN GRAMATICAL: "{activeAnnotation.word}"
              </span>
              <button
                onClick={() => setActiveAnnotation(null)}
                className="text-white hover:text-red-500 font-bold uppercase text-[10px] tracking-widest"
              >
                ✕ CERRAR
              </button>
            </div>

            <div className="text-sm font-bold text-white uppercase tracking-tight">
              Infinitivo: <span className="text-red-500">{activeAnnotation.infinitive}</span> | Tiempo:{' '}
              <span className="text-neutral-300">{activeAnnotation.tense.replace(/_/g, ' ')}</span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              💡 {activeAnnotation.note}
            </p>
          </div>
        )}
      </div>

      {/* Story Comprehension Quiz */}
      {activeStory.quiz && activeStory.quiz.length > 0 && (
        <div className="bg-white border border-black p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-black pb-3">
            <CheckCircle2 className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-black text-black font-sans uppercase tracking-tight">
              COMPROBACIÓN DE GRAMÁTICA DE LA LECTURA
            </h3>
          </div>

          <div className="space-y-4">
            {activeStory.quiz.map((q) => (
              <div key={q.id} className="p-4 bg-[#F9F9F9] border border-black space-y-2">
                <div className="text-xs text-red-600 font-bold uppercase tracking-widest">
                  Pregunta de Comprensión:
                </div>
                <div className="text-sm font-bold text-black font-sans">
                  {q.prompt}
                </div>
                <div className="text-xs text-neutral-800 bg-white p-3 border border-black font-sans">
                  <span className="font-bold text-black">Explicación: </span>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
