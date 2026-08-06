export type PresentTense = 
  | 'indicative' 
  | 'continuous' 
  | 'subjunctive' 
  | 'perfect_indicative' 
  | 'perfect_subjunctive' 
  | 'imperative';

export type SubjectPerson = 'yo' | 'tu' | 'el' | 'nosotros' | 'vosotros' | 'ellos';

export type VerbCategory = 
  | 'regular' 
  | 'stem_change_o_ue' 
  | 'stem_change_e_ie' 
  | 'stem_change_e_i' 
  | 'stem_change_u_ue' 
  | 'go_verb' 
  | 'zco_verb' 
  | 'irregular';

export interface ConjugationMap {
  yo: string;
  tu: string;
  el: string; // él / ella / usted
  nosotros: string;
  vosotros: string;
  ellos: string; // ellos / ellas / ustedes
}

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  type: 'ar' | 'er' | 'ir';
  category: VerbCategory;
  notes?: string;
  gerund?: string;
  participle?: string;
  conjugations: Record<PresentTense, ConjugationMap>;
}

export interface UsageScenario {
  situation: string;
  englishEquivalent: string;
  exampleEs: string;
  exampleEn: string;
}

export interface FormationRule {
  group: string;
  rule: string;
  endings?: Record<string, string>;
  examples: { es: string; en: string }[];
}

export interface Lesson {
  id: string;
  tenseId: PresentTense;
  title: string;
  subtitle: string;
  simpleFormula: string;
  summary: string;
  whenToUse: UsageScenario[];
  formationRules: FormationRule[];
  memoryTricks: string[];
  commonTraps: string[];
}

export interface Flashcard {
  id: string;
  tense: PresentTense;
  promptInfinitive: string;
  subject: string;
  subjectEn: string;
  correctAnswer: string;
  exampleSentence: string;
  translation: string;
  explanation: string;
  category: VerbCategory;
}

export interface QuizQuestion {
  id: string;
  tense: PresentTense;
  type: 'multiple_choice' | 'fill_in_blank' | 'error_fix';
  prompt: string;
  contextSentence?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface Annotation {
  word: string;
  tense: PresentTense;
  infinitive: string;
  note: string;
}

export interface StoryParagraph {
  text: string;
  english: string;
  annotations: Annotation[];
}

export interface Story {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate';
  description: string;
  paragraphs: StoryParagraph[];
  quiz: QuizQuestion[];
}

export interface UserStats {
  cardsStudied: number;
  quizzesTaken: number;
  correctAnswers: number;
  streakDays: number;
  lastStudiedDate: string;
  masteredVerbs: string[];
}
