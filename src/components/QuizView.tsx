import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizQuestion } from '../types';
import { recordQuizCompleted } from '../utils/storage';
import { speakSpanish } from '../utils/speech';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award, Volume2 } from 'lucide-react';

export const QuizView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswerSubmitted) return;

    let userAnswer = '';
    if (question.type === 'multiple_choice') {
      userAnswer = selectedOption;
    } else {
      userAnswer = textInput.trim();
    }

    if (!userAnswer) return;

    const expected = question.correctAnswer.toLowerCase().trim();
    const actual = userAnswer.toLowerCase().trim();

    const correct = actual === expected;
    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    if (correct) {
      setScore((prev) => prev + 1);
      speakSpanish(question.correctAnswer);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption('');
      setTextInput('');
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      recordQuizCompleted(score + (isCorrect ? 1 : 0));
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setTextInput('');
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowHint(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="bg-white text-black p-8 sm:p-12 border border-black text-center max-w-2xl mx-auto space-y-6 animate-fade-in font-sans">
        <Award className="w-16 h-16 text-red-600 mx-auto" />
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            EVALUACIÓN FINALIZADA
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black">
            PUNTUACIÓN: {score} / {QUIZ_QUESTIONS.length}
          </h2>
          <div className="text-4xl font-black text-red-600 tracking-tighter">
            {percentage}%
          </div>
        </div>

        <p className="text-neutral-800 text-base font-medium max-w-md mx-auto leading-relaxed">
          {percentage >= 80
            ? '¡Excelente trabajo! Tienes un gran dominio de los tiempos de presente en español.'
            : percentage >= 60
            ? '¡Buen avance! Repasa las fórmulas en las lecciones para perfeccionar los detalles.'
            : '¡Sigue practicando! Enfócate en las conjugaciones irregulares y los desencadenantes del subjuntivo.'}
        </p>

        <button
          onClick={handleRestartQuiz}
          className="inline-flex items-center gap-2 bg-black hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 border border-black transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-red-600" /> REINICIAR EVALUACIÓN
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in font-sans">
      {/* Quiz Progress Header */}
      <div className="bg-white text-black p-4 border border-black flex items-center justify-between text-xs font-bold uppercase tracking-widest">
        <div>
          PREGUNTA <span className="text-red-600 font-black">{currentQuestionIndex + 1}</span> DE {QUIZ_QUESTIONS.length}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">TIEMPO:</span>
          <span className="bg-black text-white px-2 py-0.5 font-bold uppercase">
            {question.tense.replace(/_/g, ' ')}
          </span>
        </div>
        <div>PUNTOS: <span className="text-red-600 font-black">{score}</span></div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-black p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="text-xs uppercase font-bold text-red-600 tracking-widest">
            {question.type.replace(/_/g, ' ')}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight uppercase tracking-tight">
            {question.prompt}
          </h3>

          {question.contextSentence && (
            <div className="p-4 bg-[#F9F9F9] border border-black text-lg font-bold text-black font-sans my-4">
              "{question.contextSentence}"
            </div>
          )}
        </div>

        {/* Answer Options or Text Input */}
        {question.type === 'multiple_choice' && question.options ? (
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnStyle = 'bg-[#F9F9F9] border-black text-black hover:bg-neutral-200';

              if (isAnswerSubmitted) {
                if (option.toLowerCase() === question.correctAnswer.toLowerCase()) {
                  btnStyle = 'bg-black text-white border-black font-black';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-red-600 text-white border-black font-black';
                } else {
                  btnStyle = 'bg-white text-neutral-400 border-neutral-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-black text-white border-black font-black';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-4 border text-left font-sans text-sm sm:text-base transition-all flex items-center justify-between font-bold uppercase tracking-wide ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && option.toLowerCase() === question.correctAnswer.toLowerCase() && (
                    <CheckCircle2 className="w-5 h-5 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <div>
              <label className="text-xs uppercase text-neutral-500 font-bold tracking-widest block mb-2">
                ESCRIBE TU RESPUESTA:
              </label>
              <input
                type="text"
                disabled={isAnswerSubmitted}
                placeholder="Escribe la conjugación en español..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full p-3.5 border border-black focus:outline-none focus:ring-1 focus:ring-black font-sans text-base text-black bg-[#F9F9F9]"
              />
            </div>
          </form>
        )}

        {/* Hint toggle */}
        {question.hint && !isAnswerSubmitted && (
          <div className="pt-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-red-600 flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" /> {showHint ? 'OCULTAR PISTA' : '¿NECESITAS UNA PISTA?'}
            </button>
            {showHint && (
              <div className="mt-2 p-3.5 bg-[#F9F9F9] border border-black text-black text-xs font-medium italic">
                💡 {question.hint}
              </div>
            )}
          </div>
        )}

        {/* Answer Feedback Panel */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 border font-sans space-y-2 ${
              isCorrect
                ? 'bg-black text-white border-black'
                : 'bg-red-600 text-white border-black'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wide">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-red-500" /> ¡CORRECTO!
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-white" /> INCORRECTO. RESPUESTA ESPERADA: "{question.correctAnswer}"
                  </>
                )}
              </div>
              <button
                onClick={() => speakSpanish(question.correctAnswer)}
                className="p-1 text-white hover:opacity-75"
                title="Escuchar"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs leading-relaxed font-medium">{question.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="border-t border-black pt-4 flex items-center justify-end">
          {!isAnswerSubmitted ? (
            <button
              onClick={() => handleSubmitAnswer()}
              disabled={question.type === 'multiple_choice' ? !selectedOption : !textInput.trim()}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-widest transition-colors border border-black"
            >
              ENVIAR RESPUESTA
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors border border-black"
            >
              SIGUIENTE PREGUNTA <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
