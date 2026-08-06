import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, Bot, AlertCircle, RefreshCw } from 'lucide-react';

export const AiCoachView: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [loadingExplain, setLoadingExplain] = useState<boolean>(false);

  const [sentenceText, setSentenceText] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [loadingAnalyze, setLoadingAnalyze] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const sampleQuestions = [
    'Explain the difference between Present Indicative and Present Subjunctive in plain terms.',
    'Why is "dormir" called a boot verb in Present Indicative?',
    'When should I use Present Continuous vs Present Indicative?',
    'What is the Vin Diesel trick for irregular commands?',
    'What are the irregular past participles in Present Perfect?',
  ];

  const handleAskQuestion = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const query = customQ || question;
    if (!query.trim()) return;

    setLoadingExplain(true);
    setErrorMsg('');
    setExplanation('');

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer from AI tutor.');
      }

      setExplanation(data.explanation || 'No response returned.');
    } catch (err: any) {
      console.error('AI Explain error:', err);
      if (window.location.hostname.includes('github.io') || err?.message?.includes('404')) {
        setErrorMsg('Nota: El tutor IA requiere el servidor Node.js/Gemini backend. En GitHub Pages (hosting estático sin backend), las funciones de IA en vivo no están disponibles, pero todas las lecciones, tarjetas, quizzes y 100+ verbos funcionan al 100%.');
      } else {
        setErrorMsg(err.message || 'Error al conectar con la IA.');
      }
    } finally {
      setLoadingExplain(false);
    }
  };

  const handleAnalyzeSentence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentenceText.trim()) return;

    setLoadingAnalyze(true);
    setErrorMsg('');
    setAnalysis('');

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentenceText }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze sentence.');
      }

      setAnalysis(data.analysis || 'No analysis returned.');
    } catch (err: any) {
      console.error('AI Analyze error:', err);
      if (window.location.hostname.includes('github.io') || err?.message?.includes('404')) {
        setErrorMsg('Nota: El tutor IA requiere el servidor Node.js/Gemini backend. En GitHub Pages (hosting estático sin backend), las funciones de IA en vivo no están disponibles, pero todas las lecciones, tarjetas, quizzes y 100+ verbos funcionan al 100%.');
      } else {
        setErrorMsg(err.message || 'Error al conectar con la IA.');
      }
    } finally {
      setLoadingAnalyze(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto font-sans">
      {/* Header Banner */}
      <div className="bg-white text-black p-6 sm:p-10 border border-black space-y-3">
        <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-red-600" /> ASISTENCIA GEMINI AI
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
          TUTOR IA DE GRAMÁTICA ESPAÑOLA
        </h2>
        <p className="text-neutral-700 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
          Haz cualquier pregunta de gramática en inglés sencillo, obtén explicaciones inmediatas con ejemplos claros o pega una oración en español para analizar conjugaciones de presente.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-black">
          <AlertCircle className="w-5 h-5 text-white shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid: Ask Anything & Sentence Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Ask AI Tutor */}
        <div className="bg-white border border-black p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-black pb-4">
            <Bot className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-black text-black font-sans uppercase tracking-tight">
              PREGUNTA SOBRE EL PRESENTE
            </h3>
          </div>

          <form onSubmit={(e) => handleAskQuestion(e)} className="space-y-3">
            <textarea
              rows={3}
              placeholder="Ej. Why do we say 'quiero' instead of 'quero' in Spanish?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3.5 border border-black text-sm text-black bg-[#F9F9F9] focus:outline-none focus:ring-1 focus:ring-black font-sans"
            />

            <button
              type="submit"
              disabled={loadingExplain || !question.trim()}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-black"
            >
              {loadingExplain ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> PROCESANDO...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> PREGUNTAR A GEMINI AI
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="space-y-2 border-t border-black pt-4">
            <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">
              PREGUNTAS FRECUENTES:
            </div>
            <div className="flex flex-col gap-1.5">
              {sampleQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestion(sq);
                    handleAskQuestion(undefined, sq);
                  }}
                  className="text-left text-xs font-medium text-black hover:bg-black hover:text-white p-2.5 border border-black transition-colors"
                >
                  💬 "{sq}"
                </button>
              ))}
            </div>
          </div>

          {/* Answer Panel */}
          {explanation && (
            <div className="p-5 bg-black text-white border border-black space-y-3 font-sans text-sm animate-fade-in">
              <div className="text-xs font-bold uppercase text-red-500 tracking-widest border-b border-neutral-800 pb-2">
                EXPLICACIÓN DE GEMINI AI:
              </div>
              <div className="whitespace-pre-line text-neutral-200 leading-relaxed text-xs sm:text-sm font-medium">
                {explanation}
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Sentence Grammar Checker */}
        <div className="bg-white border border-black p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-black pb-4">
            <CheckCircle2 className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-black text-black font-sans uppercase tracking-tight">
              ANALIZADOR DE ORACIONES
            </h3>
          </div>

          <form onSubmit={handleAnalyzeSentence} className="space-y-3">
            <textarea
              rows={3}
              placeholder="Ej. Yo quieror comer pizza pero no puedo porque estoy trabajando."
              value={sentenceText}
              onChange={(e) => setSentenceText(e.target.value)}
              className="w-full p-3.5 border border-black text-sm text-black bg-[#F9F9F9] focus:outline-none focus:ring-1 focus:ring-black font-sans"
            />

            <button
              type="submit"
              disabled={loadingAnalyze || !sentenceText.trim()}
              className="w-full py-3.5 bg-black hover:bg-neutral-800 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-black"
            >
              {loadingAnalyze ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> ANALIZANDO...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-red-600" /> COMPROBAR CONJUGACIONES
                </>
              )}
            </button>
          </form>

          {/* Analysis Panel */}
          {analysis && (
            <div className="p-5 bg-black text-white border border-black space-y-3 font-sans text-sm animate-fade-in">
              <div className="text-xs font-bold uppercase text-red-500 tracking-widest border-b border-neutral-800 pb-2">
                ANÁLISIS Y CORRECCIÓN GRAMATICAL:
              </div>
              <div className="whitespace-pre-line text-neutral-200 leading-relaxed text-xs sm:text-sm font-medium">
                {analysis}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
