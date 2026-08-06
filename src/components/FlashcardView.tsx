import { useState } from 'react';
import { FLASHCARDS } from '../data/flashcards';
import { speakSpanish } from '../utils/speech';
import { recordCardStudied } from '../utils/storage';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, RotateCw, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Layers } from 'lucide-react';

export const FlashcardView = () => {
  const [selectedTense, setSelectedTense] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });

  const filteredCards = selectedTense === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter((c) => c.tense === selectedTense);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleGrade = (correct: boolean) => {
    recordCardStudied();
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }));
    handleNext();
  };

  const tenseLabels: Record<string, string> = {
    all: 'TODOS LOS TIEMPOS',
    indicative: 'Present Indicative',
    continuous: 'Present Continuous',
    subjunctive: 'Present Subjunctive',
    perfect_indicative: 'Present Perfect',
    perfect_subjunctive: 'Perfect Subjunctive',
    imperative: 'Commands',
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto font-sans">
      {/* Filter Deck Bar */}
      <div className="bg-white border border-black p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-red-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            MAZO SELECCIONADO:
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
          {Object.entries(tenseLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedTense(key);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-black transition-all ${
                selectedTense === key
                  ? 'bg-black text-white'
                  : 'bg-[#F9F9F9] text-black hover:bg-neutral-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Score Counter */}
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black bg-white p-4 border border-black">
        <div>
          TARJETA <span className="font-black text-red-600">{currentIndex + 1}</span> DE <span className="font-black text-black">{filteredCards.length}</span>
        </div>

        <div className="flex items-center gap-6">
          <span>CORRECTAS: <strong className="text-black">{score.correct}</strong></span>
          <span>REPASAR: <strong className="text-red-600">{score.incorrect}</strong></span>
        </div>
      </div>

      {/* Interactive 3D Flip Card Container */}
      {currentCard && (
        <div className="perspective-1000 min-h-[380px] sm:min-h-[420px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id + (isFlipped ? '-back' : '-front')}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[380px] sm:min-h-[420px] p-6 sm:p-10 border border-black cursor-pointer flex flex-col justify-between transition-colors ${
                isFlipped ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b pb-4 border-current">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
                  isFlipped ? 'bg-red-600 text-white' : 'bg-black text-white'
                }`}>
                  {currentCard.tense.replace(/_/g, ' ')}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakSpanish(currentCard.exampleSentence.replace('_____', currentCard.correctAnswer));
                    }}
                    className="p-2 border border-current hover:bg-red-600 hover:text-white transition-colors"
                    title="Pronunciar frase"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-bold uppercase tracking-wider text-current/60 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> Voltear
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="my-auto text-center space-y-6 py-6">
                {!isFlipped ? (
                  /* FRONT OF CARD */
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                      CONJUGAR VERBO: <span className="text-red-600 font-black">{currentCard.promptInfinitive.toUpperCase()}</span> PARA <span className="text-black font-black">{currentCard.subject.toUpperCase()}</span> ({currentCard.subjectEn})
                    </div>

                    <div className="text-2xl sm:text-4xl font-black font-sans leading-relaxed tracking-tight text-black max-w-2xl mx-auto uppercase">
                      "{currentCard.exampleSentence}"
                    </div>

                    <p className="text-sm font-sans text-neutral-600 italic font-medium">
                      Traducción: "{currentCard.translation}"
                    </p>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest text-red-600 font-black">
                      CONJUGACIÓN CORRECTA
                    </div>

                    <div className="text-4xl sm:text-6xl font-black font-sans text-white tracking-tighter uppercase">
                      {currentCard.correctAnswer}
                    </div>

                    <div className="p-4 bg-neutral-900 border border-neutral-800 text-left max-w-xl mx-auto space-y-2">
                      <div className="text-xs uppercase text-red-500 font-bold tracking-widest">
                        Oración Completa:
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white font-sans">
                        {currentCard.exampleSentence.replace('_____', currentCard.correctAnswer)}
                      </div>
                      <div className="text-xs text-neutral-400 border-t border-neutral-800 pt-2 font-sans font-medium">
                        💡 {currentCard.explanation}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="border-t pt-4 border-current flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-current/60">
                  Categoría: {currentCard.category}
                </span>

                <span className="text-red-600 font-black">
                  {isFlipped ? 'RESPUESTA REVELADA' : 'TOCA PARA REVELAR'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Grade / Control Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          className="w-full sm:w-auto px-5 py-3 border border-black bg-white hover:bg-neutral-100 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Anterior
        </button>

        {isFlipped && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleGrade(false)}
              className="flex-1 sm:flex-none px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-black"
            >
              <XCircle className="w-4 h-4" /> Repasar
            </button>
            <button
              onClick={() => handleGrade(true)}
              className="flex-1 sm:flex-none px-6 py-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-black"
            >
              <CheckCircle2 className="w-4 h-4 text-red-600" /> Correcto
            </button>
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-5 py-3 border border-black bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          Siguiente <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
