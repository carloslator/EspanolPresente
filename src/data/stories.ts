import { Story } from '../types';

export const STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Un Día Ordinario en Madrid',
    level: 'beginner',
    description: 'Follow Lucas through his daily morning routine in Madrid, observing how present indicative and continuous tenses describe active habits.',
    paragraphs: [
      {
        text: 'Lucas vive en el centro de Madrid. Todos los días se levanta a las siete de la mañana y bebe un café caliente.',
        english: 'Lucas lives in the center of Madrid. Every day he gets up at seven in the morning and drinks a hot coffee.',
        annotations: [
          { word: 'vive', tense: 'indicative', infinitive: 'vivir', note: 'Regular present indicative 3rd person singular describing a habit.' },
          { word: 'se levanta', tense: 'indicative', infinitive: 'levantarse', note: 'Reflexive present indicative habit.' },
          { word: 'bebe', tense: 'indicative', infinitive: 'beber', note: 'Regular -er verb habit.' },
        ],
      },
      {
        text: 'En este momento, Lucas está caminando por la Gran Vía porque quiere llegar temprano a su trabajo.',
        english: 'Right now, Lucas is walking along Gran Vía because he wants to arrive early at his job.',
        annotations: [
          { word: 'está caminando', tense: 'continuous', infinitive: 'caminar', note: 'Present Continuous: Estar (está) + gerund (-ando) for action in real-time.' },
          { word: 'quiere', tense: 'indicative', infinitive: 'querer', note: 'Boot verb e ➔ ie stem change.' },
        ],
      },
      {
        text: 'Su jefa siempre le dice: "¡Llega a tiempo y haz tus informes!". Hoy él ha preparado todo de antemano.',
        english: 'His boss always tells him: "Arrive on time and do your reports!". Today he has prepared everything in advance.',
        annotations: [
          { word: 'dice', tense: 'indicative', infinitive: 'decir', note: 'Yo-go and stem-changing e ➔ i verb.' },
          { word: 'Llega', tense: 'imperative', infinitive: 'llegar', note: 'Informal affirmative command (tú form).' },
          { word: 'haz', tense: 'imperative', infinitive: 'hacer', note: 'Irregular Vin Diesel tú command.' },
          { word: 'ha preparado', tense: 'perfect_indicative', infinitive: 'preparar', note: 'Present perfect: Haber (ha) + prepared.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'sq-1',
        tense: 'indicative',
        type: 'multiple_choice',
        prompt: 'Why does the text use "está caminando" instead of just "camina"?',
        options: [
          'Because it is an action happening right at this moment.',
          'Because it happened yesterday.',
          'Because it is a command.',
          'Because Lucas doubts he can walk.'
        ],
        correctAnswer: 'Because it is an action happening right at this moment.',
        explanation: 'Present Continuous (está caminando) emphasizes real-time ongoing progress right now.',
      },
      {
        id: 'sq-2',
        tense: 'imperative',
        type: 'multiple_choice',
        prompt: 'What form of command is "¡haz tus informes!"?',
        options: [
          'Informal affirmative command (tú) of hacer',
          'Formal command (usted) of hacer',
          'Negative command of hacer',
          'Present Subjunctive of hacer'
        ],
        correctAnswer: 'Informal affirmative command (tú) of hacer',
        explanation: 'HAZ is the irregular affirmative tú command for hacer.',
      },
    ],
  },
  {
    id: 'story-2',
    title: 'En el Café de los Deseos',
    level: 'intermediate',
    description: 'Listen to Maria and Sofia discuss their travel plans, showcasing the Present Subjunctive and Present Perfect Subjunctive in conversation.',
    paragraphs: [
      {
        text: 'Sofía y María están sentadas en un café. María le dice: "Dudo que tengamos tiempo para visitar el museo hoy".',
        english: 'Sofia and Maria are sitting in a café. Maria says to her: "I doubt that we have time to visit the museum today".',
        annotations: [
          { word: 'están sentadas', tense: 'indicative', infinitive: 'estar', note: 'Estar expressing current physical state.' },
          { word: 'Dudo que', tense: 'subjunctive', infinitive: 'dudar', note: 'WEIRDO Doubt trigger!' },
          { word: 'tengamos', tense: 'subjunctive', infinitive: 'tener', note: 'Subjunctive of tener following "Dudo que".' },
        ],
      },
      {
        text: 'Sofía responde: "Espero que no hayas olvidado comprar las entradas. ¡No te preocupes y disfrutemos el día!".',
        english: 'Sofia responds: "I hope you haven\'t forgotten to buy the tickets. Don\'t worry and let\'s enjoy the day!".',
        annotations: [
          { word: 'Espero que', tense: 'perfect_subjunctive', infinitive: 'esperar', note: 'WEIRDO Wish trigger.' },
          { word: 'hayas olvidado', tense: 'perfect_subjunctive', infinitive: 'olvidar', note: 'Present Perfect Subjunctive: Haya(s) + olvidado.' },
          { word: 'No te preocupes', tense: 'imperative', infinitive: 'preocuparse', note: 'Negative informal command.' },
          { word: 'disfrutemos', tense: 'imperative', infinitive: 'disfrutar', note: 'Nosotros command ("Let\'s enjoy!").' },
        ],
      },
    ],
    quiz: [
      {
        id: 'sq-3',
        tense: 'subjunctive',
        type: 'multiple_choice',
        prompt: 'Why is "tengamos" in the subjunctive mood in the story?',
        options: [
          'Because it comes after the doubt trigger "Dudo que".',
          'Because it is an action in the past.',
          'Because it is a regular habit.',
          'Because it is a command to a boss.'
        ],
        correctAnswer: 'Because it comes after the doubt trigger "Dudo que".',
        explanation: '"Dudo que" expresses uncertainty/doubt, which triggers the subjunctive mood.',
      },
    ],
  },
];
