import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-indicative',
    tenseId: 'indicative',
    title: 'Present Indicative',
    subtitle: 'Presente de Indicativo',
    simpleFormula: 'Verb Stem + Present Endings (-o, -as/-es, -a/-e, -amos/-emos/-imos, -áis/-éis/-ís, -an/-en)',
    summary: 'The basic present tense used for facts, daily habits, current states, and general truths ("I eat", "She works", "We live").',
    whenToUse: [
      {
        situation: 'Habits & Routines',
        englishEquivalent: 'I work out every morning.',
        exampleEs: 'Hago ejercicio todas las mañanas.',
        exampleEn: 'I work out every morning.',
      },
      {
        situation: 'General Facts & Truths',
        englishEquivalent: 'Water boils at 100 degrees.',
        exampleEs: 'El agua hierve a 100 grados.',
        exampleEn: 'Water boils at 100 degrees.',
      },
      {
        situation: 'Actions Happening Now',
        englishEquivalent: 'She speaks on the phone.',
        exampleEs: 'Ella habla por teléfono.',
        exampleEn: 'She speaks on the phone.',
      },
      {
        situation: 'Scheduled Near Future',
        englishEquivalent: 'The train arrives at 5 PM.',
        exampleEs: 'El tren llega a las cinco.',
        exampleEn: 'The train arrives at 5 PM.',
      },
    ],
    formationRules: [
      {
        group: 'Regular -AR Verbs (e.g. Hablar - to speak)',
        rule: 'Drop -AR from infinitive, add: -o, -as, -a, -amos, -áis, -an',
        endings: { yo: '-o', tu: '-as', el: '-a', nosotros: '-amos', vosotros: '-áis', ellos: '-an' },
        examples: [
          { es: 'Yo hablo español', en: 'I speak Spanish' },
          { es: 'Tú hablas mucho', en: 'You speak a lot' },
        ],
      },
      {
        group: 'Regular -ER Verbs (e.g. Comer - to eat)',
        rule: 'Drop -ER from infinitive, add: -o, -es, -e, -emos, -éis, -en',
        endings: { yo: '-o', tu: '-es', el: '-e', nosotros: '-emos', vosotros: '-éis', ellos: '-en' },
        examples: [
          { es: 'Ella come fruta', en: 'She eats fruit' },
          { es: 'Nosotros comemos juntos', en: 'We eat together' },
        ],
      },
      {
        group: 'Regular -IR Verbs (e.g. Vivir - to live)',
        rule: 'Drop -IR from infinitive, add: -o, -es, -e, -imos, -ís, -en (same as -ER except nosotros/vosotros)',
        endings: { yo: '-o', tu: '-es', el: '-e', nosotros: '-imos', vosotros: '-ís', ellos: '-en' },
        examples: [
          { es: 'Yo vivo en Madrid', en: 'I live in Madrid' },
          { es: 'Ellos viven cerca', en: 'They live nearby' },
        ],
      },
      {
        group: 'Stem-Changing "Boot Verbs"',
        rule: 'The vowel in the stem changes for ALL forms EXCEPT Nosotros & Vosotros (inside the shape of a boot!).',
        examples: [
          { es: 'o ➔ ue: Querer ➔ yo quiero, tú quieres, nosotros queremos', en: 'to want' },
          { es: 'e ➔ ie: Poder ➔ yo puedo, tú puedes, nosotros podemos', en: 'to be able to' },
          { es: 'e ➔ i: Pedir ➔ yo pido, tú pides, nosotros pedimos', en: 'to ask for' },
          { es: 'u ➔ ue: Jugar ➔ yo juego, tú juegas, nosotros jugamos', en: 'to play' },
        ],
      },
      {
        group: 'Special "Yo" Irregulars (-GO & -ZCO)',
        rule: 'Only the "Yo" (I) form is irregular; all other persons follow regular rules.',
        examples: [
          { es: '-GO verbs: tener ➔ tengo, hacer ➔ hago, poner ➔ pongo, salir ➔ salgo', en: 'I have, I do, I put, I leave' },
          { es: '-ZCO verbs: conocer ➔ conozco, ofrecer ➔ ofrezco, conducir ➔ conduzco', en: 'I know, I offer, I drive' },
        ],
      },
    ],
    memoryTricks: [
      'Boot Pattern: Picture a tall cowboy boot covering yo, tú, él/ella, and ellos. The stem changes INSIDE the boot, but OUTSIDE the boot (nosotros/vosotros), the stem stays normal!',
      'YO-GO verbs: Ten-go, Pon-go, Sa-lgo, Ha-go, Trai-go, Di-go. Remember "I GO on my own in the Yo form!"',
    ],
    commonTraps: [
      'SER vs ESTAR trap: Both mean "to be". Use SER for permanent identity/time (Soy de México), use ESTAR for location & temporary states (Estoy cansado).',
      'Don’t change the stem in NOSOTROS: "Queremos" NOT "Quieremos"!',
    ],
  },
  {
    id: 'lesson-continuous',
    tenseId: 'continuous',
    title: 'Present Continuous',
    subtitle: 'Presente Continuo / Progresivo',
    simpleFormula: 'Estar (present) + Gerund (-ando / -iendo)',
    summary: 'Used specifically for actions that are actively happening right this very second ("I am currently eating", "They are studying now").',
    whenToUse: [
      {
        situation: 'Actions Happening Right Now',
        englishEquivalent: 'I am reading a book right now.',
        exampleEs: 'Estoy leyendo un libro ahora mismo.',
        exampleEn: 'I am reading a book right now.',
      },
      {
        situation: 'Temporary Ongoing Activity',
        englishEquivalent: 'He is living with a friend this month.',
        exampleEs: 'Él está viviendo con un amigo este mes.',
        exampleEn: 'He is living with a friend this month.',
      },
    ],
    formationRules: [
      {
        group: '1. Conjugate ESTAR for the subject',
        rule: 'Yo estoy, Tú estás, Él/Ella está, Nosotros estamos, Vosotros estáis, Ellos están',
        examples: [
          { es: 'Estoy...', en: 'I am...' },
          { es: 'Estamos...', en: 'We are...' },
        ],
      },
      {
        group: '2. Create the Gerund (-ing in English)',
        rule: '-AR verbs ➔ -ando (Hablar ➔ Hablando) | -ER & -IR verbs ➔ -iendo (Comer ➔ Comiendo, Vivir ➔ Viviendo)',
        examples: [
          { es: 'Trabajar ➔ Trabajando', en: 'Working' },
          { es: 'Escribir ➔ Escribiendo', en: 'Writing' },
        ],
      },
      {
        group: '3. Irregular Gerunds',
        rule: 'Vowel changes when a stem ends in a vowel or has double vowels: leer ➔ leyendo, ir ➔ yendo, oír ➔ oyendo, decir ➔ diciendo, dormir ➔ durmiendo.',
        examples: [
          { es: 'Estoy leyendo el periódico.', en: 'I am reading the newspaper.' },
          { es: 'Ella está durmiendo.', en: 'She is sleeping.' },
        ],
      },
    ],
    memoryTricks: [
      'Think of -ANDO as "And-Oh, I am walking!" and -IENDO as "I am eating in the end!"',
      'The English "I am going tomorrow" TRAP: In English we use present continuous for future plans ("I am leaving tomorrow"). In Spanish, NEVER use continuous for future! Use Present Indicative: "Salgo mañana" or "Voy a salir mañana".',
    ],
    commonTraps: [
      'Never drop the verb ESTAR! Saying "Yo comiendo" is broken Spanish like "I eating". Always say "Estoy comiendo".',
      'Do NOT use present continuous for future intentions.',
    ],
  },
  {
    id: 'lesson-subjunctive',
    tenseId: 'subjunctive',
    title: 'Present Subjunctive',
    subtitle: 'Presente de Subjuntivo',
    simpleFormula: 'Yo form of Present Indicative ➔ Drop -O ➔ Swap Vowels (-AR gets -E / -ER & -IR get -A)',
    summary: 'Used when expressing desires, doubts, emotions, recommendations, or non-factual possibilities ("I hope that you win", "It is important that he study").',
    whenToUse: [
      {
        situation: 'Wishes & Desires (W)',
        englishEquivalent: 'I want you to eat well.',
        exampleEs: 'Quiero que comas bien.',
        exampleEn: 'I want you to eat well.',
      },
      {
        situation: 'Emotions (E)',
        englishEquivalent: 'I am happy that you are here.',
        exampleEs: 'Me alegra que estés aquí.',
        exampleEn: 'I am happy that you are here.',
      },
      {
        situation: 'Impersonal Expressions (I)',
        englishEquivalent: 'It is important that we practice.',
        exampleEs: 'Es importante que practiquemos.',
        exampleEn: 'It is important that we practice.',
      },
      {
        situation: 'Recommendations & Requests (R)',
        englishEquivalent: 'The teacher suggests that you read.',
        exampleEs: 'El profesor sugiere que leas.',
        exampleEn: 'The teacher suggests that you read.',
      },
      {
        situation: 'Doubt & Denial (D)',
        englishEquivalent: 'I doubt that he knows.',
        exampleEs: 'Dudo que él sepa.',
        exampleEn: 'I doubt that he knows.',
      },
      {
        situation: 'Ojalá (O)',
        englishEquivalent: 'Hopefully / God willing it rains!',
        exampleEs: '¡Ojalá que llueva!',
        exampleEn: 'Hopefully it rains!',
      },
    ],
    formationRules: [
      {
        group: 'Golden Rule: The Opposite Vowel Swap',
        rule: 'Take the Present Indicative "Yo" form, drop the -O, and switch: -AR verbs take -E endings (-e, -es, -e, -emos, -éis, -en). -ER & -IR verbs take -A endings (-a, -as, -a, -amos, -áis, -an).',
        examples: [
          { es: 'Hablar ➔ Hablo ➔ Hable, Hables, Hable, Hablemos, Habléis, Hablen', en: 'to speak' },
          { es: 'Comer ➔ Como ➔ Coma, Comas, Coma, Comamos, Comáis, Coman', en: 'to eat' },
          { es: 'Tener ➔ Tengo ➔ Tenga, Tengas, Tenga, Tengamos, Tengáis, Tengan', en: 'to have' },
        ],
      },
      {
        group: 'Irregular Subjunctive (DISCO)',
        rule: 'Verbs without an -O in "Yo" form have special forms: Dar (dé), Ir (vaya), Ser (sea), Estar (esté), Saber (sepa). Plus Haber (haya).',
        examples: [
          { es: 'Dar ➔ dé, des, dé, demos, deis, den', en: 'give' },
          { es: 'Ir ➔ vaya, vayas, vaya, vayamos, vayáis, vayan', en: 'go' },
          { es: 'Ser ➔ sea, seas, sea, seamos, seáis, sean', en: 'be' },
          { es: 'Estar ➔ esté, estés, esté, estemos, estéis, estén', en: 'be' },
          { es: 'Saber ➔ sepa, sepas, sepa, sepamos, sepáis, sepan', en: 'know' },
        ],
      },
    ],
    memoryTricks: [
      'Remember the WEIRDO acronym for triggers: Wishes, Emotions, Impersonal expressions, Recommendations, Doubt, Ojalá.',
      'Remember the 3-part sentence bridge: [Subject A + Trigger Verb] + QUE + [Subject B + Subjunctive Verb]. Example: (Yo quiero) QUE (tú vengas).',
    ],
    commonTraps: [
      'If there is NO second subject, use Infinitive instead of Subjunctive! "Quiero comer" (I want to eat) vs "Quiero que comas" (I want YOU to eat).',
      'Certainty triggers (Creo que..., Es verdad que...) use INDICATIVE because there is no doubt!',
    ],
  },
  {
    id: 'lesson-perfect-indicative',
    tenseId: 'perfect_indicative',
    title: 'Present Perfect Indicative',
    subtitle: 'Pretérito Perfecto Compuesto',
    simpleFormula: 'Haber (he, has, ha, hemos, habéis, han) + Past Participle (-ado / -ido)',
    summary: 'Used for completed actions connected to the present time frame ("I have eaten today", "Have you seen this?").',
    whenToUse: [
      {
        situation: 'Recent Past Actions with Present Impact',
        englishEquivalent: 'I have eaten today.',
        exampleEs: 'He comido hoy.',
        exampleEn: 'I have eaten today.',
      },
      {
        situation: 'Life Experiences (Ever/Never)',
        englishEquivalent: 'Have you ever visited Spain?',
        exampleEs: '¿Has visitado España alguna vez?',
        exampleEn: 'Have you ever visited Spain?',
      },
    ],
    formationRules: [
      {
        group: '1. Conjugate HABER in Present Indicative',
        rule: 'Yo he, Tú has, Él/Ella ha, Nosotros hemos, Vosotros habéis, Ellos han',
        examples: [
          { es: 'He hablado con Juan.', en: 'I have spoken with Juan.' },
          { es: 'Hemos terminado.', en: 'We have finished.' },
        ],
      },
      {
        group: '2. Add Past Participle',
        rule: '-AR verbs ➔ -ado (Hablar ➔ Hablado) | -ER & -IR verbs ➔ -ido (Comer ➔ Comido, Vivir ➔ Vivido)',
        examples: [
          { es: 'Trabajar ➔ Trabado', en: 'Worked' },
          { es: 'Aprender ➔ Aprendido', en: 'Learned' },
        ],
      },
      {
        group: '3. Irregular Participles (REVVV MAC PHUN)',
        rule: 'Roto (romper), Escrito (escribir), Vuelto (volver), Visto (ver), Vivo (N/A), Muerto (morir), Abierto (abrir), Cubierto (cubrir), Puesto (poner), Hecho (hacer), Dicho (decir).',
        examples: [
          { es: 'Hacer ➔ Hecho ("He hecho la tarea")', en: 'Done ("I have done the homework")' },
          { es: 'Ver ➔ Visto ("¿Has visto esta película?")', en: 'Seen ("Have you seen this movie?")' },
        ],
      },
    ],
    memoryTricks: [
      'NEVER put any word between Haber and the Participle in Spanish! Say "No he comido nada" (NOT "He no comido").',
      'The participle ending NEVER changes with subject gender in compound tenses! "Ella ha comido", "Ellos han comido" (always -ido).',
    ],
    commonTraps: [
      'Don’t confuse "Haber" (auxiliary have) with "Tener" (possession have)! Say "He comido" (I have eaten), NOT "Tengo comido".',
    ],
  },
  {
    id: 'lesson-perfect-subjunctive',
    tenseId: 'perfect_subjunctive',
    title: 'Present Perfect Subjunctive',
    subtitle: 'Pretérito Perfecto de Subjuntivo',
    simpleFormula: 'Haber in Subjunctive (haya, hayas, haya, hayamos, hayáis, hayan) + Past Participle (-ado / -ido)',
    summary: 'Used when WEIRDO triggers (wishes, doubt, emotions) refer to an action that has already happened ("I hope you have arrived safely").',
    whenToUse: [
      {
        situation: 'Emotions about Past Actions',
        englishEquivalent: 'I am glad that you have come.',
        exampleEs: 'Me alegro de que hayas venido.',
        exampleEn: 'I am glad that you have come.',
      },
      {
        situation: 'Doubt about Past Accomplishments',
        englishEquivalent: 'I doubt that he has finished.',
        exampleEs: 'Dudo que él haya terminado.',
        exampleEn: 'I doubt that he has finished.',
      },
      {
        situation: 'Hope regarding Past Events',
        englishEquivalent: 'I hope you have slept well.',
        exampleEs: 'Espero que hayas dormido bien.',
        exampleEn: 'I hope you have slept well.',
      },
    ],
    formationRules: [
      {
        group: 'Conjugate Subjunctive HABER + Participle',
        rule: 'Yo haya, Tú hayas, Él haya, Nosotros hayamos, Vosotros hayáis, Ellos hayan + [Participle]',
        examples: [
          { es: 'Espero que hayas comido.', en: 'I hope you have eaten.' },
          { es: 'Dudo que hayan llegado.', en: 'I doubt that they have arrived.' },
        ],
      },
    ],
    memoryTricks: [
      'Remember: "HAYA" is just Subjunctive "HE". Apply WEIRDO triggers + past action!',
    ],
    commonTraps: [
      'Don’t forget irregular participles carry over from Present Perfect: escrito, dicho, hecho, visto, abierto, vuelto.',
    ],
  },
  {
    id: 'lesson-imperative',
    tenseId: 'imperative',
    title: 'Imperative / Present Commands',
    subtitle: 'Mandatos Presentes',
    simpleFormula: 'Informal Affirmative (Tú = 3rd person indicative) | Informal Negative & Formal (Usted/es = Subjunctive)',
    summary: 'Used to give direct commands, advice, instructions, or requests ("Speak!", "Don’t eat!", "Let’s go!").',
    whenToUse: [
      {
        situation: 'Direct Instructions & Advice',
        englishEquivalent: 'Eat your vegetables!',
        exampleEs: '¡Come tus verduras!',
        exampleEn: 'Eat your vegetables!',
      },
      {
        situation: 'Formal Polite Requests',
        englishEquivalent: 'Please sit down, sir.',
        exampleEs: 'Tome asiento, por favor.',
        exampleEn: 'Please sit down, sir.',
      },
      {
        situation: 'Group Proposals (Nosotros)',
        englishEquivalent: 'Let us study together!',
        exampleEs: '¡Estudienos juntos! / ¡Vamos a estudiar!',
        exampleEn: 'Let us study together!',
      },
    ],
    formationRules: [
      {
        group: '1. Informal Affirmative Commands (Tú)',
        rule: 'Identical to the 3rd Person Singular (él/ella) Present Indicative: Hablar ➔ ¡Habla! | Comer ➔ ¡Come! | Escribir ➔ ¡Escribe!',
        examples: [
          { es: '¡Escucha con atención!', en: 'Listen carefully!' },
          { es: '¡Abre la puerta!', en: 'Open the door!' },
        ],
      },
      {
        group: '2. Irregular Tú Commands (Vin Diesel Trick)',
        rule: '8 short irregulars: Ven (venir), Di (decir), Sal (salir), Haz (hacer), Ten (tener), Ve (ir), Pon (poner), Sé (ser).',
        examples: [
          { es: '¡Haz la tarea!', en: 'Do the homework!' },
          { es: '¡Ten cuidado!', en: 'Be careful!' },
          { es: '¡Dime la verdad!', en: 'Tell me the truth!' },
        ],
      },
      {
        group: '3. Informal Negative Commands (No + Tú)',
        rule: 'Add "No" + Present Subjunctive "tú" form: No hablar ➔ ¡No hables! | No comer ➔ ¡No comas!',
        examples: [
          { es: '¡No hables tan rápido!', en: 'Don\'t speak so fast!' },
          { es: '¡No comas eso!', en: 'Don\'t eat that!' },
        ],
      },
      {
        group: '4. Formal Commands (Usted / Ustedes)',
        rule: 'Use Present Subjunctive form! Usted hablar ➔ ¡Hable! | Ustedes hablar ➔ ¡Hablen!',
        examples: [
          { es: 'Pase adelante, por favor.', en: 'Come in, please (Usted).' },
          { es: 'Escuchen bien todos.', en: 'Listen closely everyone (Ustedes).' },
        ],
      },
    ],
    memoryTricks: [
      'Vin Diesel Weapon Trick for Irregular Tú Commands: "Vin Diesel has ten weapons, eh?" ➔ Ven, Di, Sal, Haz, Ten, Ve, Pon, Sé!',
      'Positive Tú = Normal 3rd person. Negative Tú & Formal = Subjunctive switch!',
    ],
    commonTraps: [
      'Pronouns attaching: In affirmative commands, attach object pronouns to the end! "Dímelo" (Tell me it). In negative commands, put pronouns BEFORE! "No me lo digas" (Don\'t tell me it).',
    ],
  },
];
