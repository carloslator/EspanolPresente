import React, { useState } from 'react';
import { VERBS } from '../data/verbs';
import { PresentTense, SubjectPerson } from '../types';
import { speakSpanish } from '../utils/speech';
import { markVerbMastered, getUserStats } from '../utils/storage';
import { Search, Volume2, Check, Sparkles, Filter } from 'lucide-react';

interface VerbExplorerProps {
  initialTense?: PresentTense;
}

export const VerbExplorer: React.FC<VerbExplorerProps> = ({ initialTense = 'indicative' }) => {
  const [selectedVerbId, setSelectedVerbId] = useState<string>('hablar');
  const [selectedTense, setSelectedTense] = useState<PresentTense>(initialTense);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stats, setStats] = useState(getUserStats());

  // Interactive tester state
  const [testAnswer, setTestAnswer] = useState<string>('');
  const [testPerson, setTestPerson] = useState<SubjectPerson>('yo');
  const [testResult, setTestResult] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const selectedVerb = VERBS.find((v) => v.id === selectedVerbId) || VERBS[0];

  const filteredVerbs = VERBS.filter((v) => {
    const matchesSearch = v.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) || v.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryLabels: Record<string, string> = {
    all: 'TODAS LAS CATEGORÍAS',
    regular: 'VERBOS REGULARES',
    stem_change_e_ie: 'CAMBIO DE RAÍZ (E ➔ IE)',
    stem_change_o_ue: 'CAMBIO DE RAÍZ (O ➔ UE)',
    stem_change_e_i: 'CAMBIO DE RAÍZ (E ➔ I)',
    go_verb: 'VERBOS YO-GO',
    zco_verb: 'VERBOS YO-ZCO',
    irregular: 'VERBOS IRREGULARES',
  };

  const tenseNames: Record<PresentTense, string> = {
    indicative: 'Present Indicative',
    continuous: 'Present Continuous',
    subjunctive: 'Present Subjunctive',
    perfect_indicative: 'Present Perfect Indicative',
    perfect_subjunctive: 'Present Perfect Subjunctive',
    imperative: 'Imperative / Commands',
  };

  const subjectLabels: Record<SubjectPerson, { label: string; en: string }> = {
    yo: { label: 'Yo', en: 'I' },
    tu: { label: 'Tú', en: 'You (inf)' },
    el: { label: 'Él / Ella / Ud.', en: 'He / She / You (formal)' },
    nosotros: { label: 'Nosotros', en: 'We' },
    vosotros: { label: 'Vosotros', en: 'You all (Spain)' },
    ellos: { label: 'Ellos / Ellas / Uds.', en: 'They / You all' },
  };

  const currentConjugations = selectedVerb.conjugations[selectedTense];

  const handleToggleMastered = (verbId: string) => {
    const updated = markVerbMastered(verbId);
    setStats(updated);
  };

  const isMastered = stats.masteredVerbs.includes(selectedVerb.id);

  const handleCheckTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testAnswer.trim()) return;

    const expected = currentConjugations[testPerson].toLowerCase().trim();
    const userInput = testAnswer.toLowerCase().trim();

    if (userInput === expected) {
      setTestResult({
        isCorrect: true,
        message: `¡Correcto! ${subjectLabels[testPerson].label} ${expected}`,
      });
      speakSpanish(`${subjectLabels[testPerson].label} ${expected}`);
    } else {
      setTestResult({
        isCorrect: false,
        message: `Incorrecto. Esperado: "${expected}", escribiste: "${userInput}"`,
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Search & Filter Header */}
      <div className="bg-white border border-black p-4 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar verbo (ej. hablar, tener, want, quer...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-black text-sm text-black bg-[#F9F9F9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-black font-sans"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-[#F9F9F9] px-2.5 py-2 border border-black shrink-0">
              {filteredVerbs.length} VERBOS
            </span>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-2.5 px-3 border border-black text-xs font-bold uppercase tracking-wider bg-[#F9F9F9] text-black"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Verb Chip List */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-black max-h-52 overflow-y-auto">
          {filteredVerbs.map((v) => {
            const isSelected = v.id === selectedVerb.id;
            const isMaster = stats.masteredVerbs.includes(v.id);
            return (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVerbId(v.id);
                  setTestResult(null);
                  setTestAnswer('');
                }}
                className={`px-3 py-1.5 border border-black text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                <span>{v.infinitive}</span>
                {isMaster && <Check className="w-3 h-3 text-red-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Verb Details Header */}
      <div className="bg-white border border-black p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-bold tracking-widest px-2.5 py-0.5 uppercase">
                VERBO -{selectedVerb.type.toUpperCase()}
              </span>
              <span className="bg-black text-white text-[10px] font-bold tracking-widest px-2.5 py-0.5 uppercase border border-black">
                {selectedVerb.category.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black">
                {selectedVerb.infinitive}
              </h2>
              <button
                onClick={() => speakSpanish(selectedVerb.infinitive)}
                className="p-2.5 bg-black hover:bg-red-600 text-white border border-black transition-colors"
                title="Pronunciación del infinitivo"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-neutral-600 text-base mt-1 italic font-medium">
              "{selectedVerb.english}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggleMastered(selectedVerb.id)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-black transition-colors flex items-center gap-2 ${
                isMastered
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              <Check className="w-4 h-4 text-red-600" />
              {isMastered ? 'DOMINADO' : 'MARCAR DOMINADO'}
            </button>
          </div>
        </div>

        {/* Tense Selector Bar */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block">
            TIEMPO GRAMATICAL SELECCIONADO:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(Object.keys(tenseNames) as PresentTense[]).map((tKey) => (
              <button
                key={tKey}
                onClick={() => {
                  setSelectedTense(tKey);
                  setTestResult(null);
                }}
                className={`p-2.5 text-xs font-bold uppercase tracking-tight text-center border border-black transition-all ${
                  selectedTense === tKey
                    ? 'bg-black text-white'
                    : 'bg-[#F9F9F9] text-black hover:bg-neutral-200'
                }`}
              >
                {tenseNames[tKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Conjugation Table Grid (Editorial Style) */}
        <div className="bg-[#F9F9F9] p-6 border border-black space-y-4">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-red-600">
              TABLA DE CONJUGACIÓN: {tenseNames[selectedTense].toUpperCase()}
            </h3>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              Toca para escuchar 🔊
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(subjectLabels) as SubjectPerson[]).map((personKey) => {
              const conjugatedForm = currentConjugations[personKey];
              const pInfo = subjectLabels[personKey];

              return (
                <div
                  key={personKey}
                  onClick={() => speakSpanish(`${pInfo.label} ${conjugatedForm}`)}
                  className="bg-white border border-black p-4 hover:bg-black hover:text-white transition-all cursor-pointer group flex items-baseline justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase opacity-50 block mb-1">
                      {pInfo.label} ({pInfo.en})
                    </span>
                    <span className="text-2xl font-black tracking-tight text-black group-hover:text-white">
                      {conjugatedForm}
                    </span>
                  </div>
                  <Volume2 className="w-4 h-4 text-neutral-400 group-hover:text-red-500 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Conjugation Self-Test Box */}
        <div className="bg-black text-white p-6 border border-black space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              AUTOEVALUACIÓN: PRÁCTICA DE CONJUGACIÓN PARA "{selectedVerb.infinitive.toUpperCase()}"
            </h4>
          </div>

          <form onSubmit={handleCheckTest} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={testPerson}
              onChange={(e) => {
                setTestPerson(e.target.value as SubjectPerson);
                setTestResult(null);
              }}
              className="py-2.5 px-3 bg-neutral-900 border border-neutral-700 text-white text-xs font-bold uppercase"
            >
              {Object.entries(subjectLabels).map(([pKey, pVal]) => (
                <option key={pKey} value={pKey}>
                  {pVal.label} ({pVal.en})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder={`Escribe la forma para ${subjectLabels[testPerson].label}...`}
              value={testAnswer}
              onChange={(e) => setTestAnswer(e.target.value)}
              className="flex-1 py-2.5 px-4 bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-red-600 focus:outline-none font-sans"
            />

            <button
              type="submit"
              className="py-2.5 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-colors border border-red-600"
            >
              COMPROBAR
            </button>
          </form>

          {testResult && (
            <div
              className={`p-3 text-xs font-bold border uppercase tracking-wide ${
                testResult.isCorrect
                  ? 'bg-white text-black border-white'
                  : 'bg-red-950 text-red-200 border-red-600'
              }`}
            >
              {testResult.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
