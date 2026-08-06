import { Verb, ConjugationMap, VerbCategory } from '../types';

function makeVerb(
  id: string,
  infinitive: string,
  english: string,
  type: 'ar' | 'er' | 'ir',
  category: VerbCategory,
  notes: string,
  indMap: ConjugationMap,
  subMap: ConjugationMap,
  opts?: {
    gerund?: string;
    participle?: string;
    tuImp?: string;
  }
): Verb {
  const stem = infinitive.slice(0, -2);
  const ger = opts?.gerund || (type === 'ar' ? `${stem}ando` : `${stem}iendo`);
  const part = opts?.participle || (type === 'ar' ? `${stem}ado` : `${stem}ido`);

  const defaultTuCmd = opts?.tuImp || indMap.el;

  return {
    id,
    infinitive,
    english,
    type,
    category,
    notes,
    gerund: ger,
    participle: part,
    conjugations: {
      indicative: indMap,
      continuous: {
        yo: `estoy ${ger}`,
        tu: `estás ${ger}`,
        el: `está ${ger}`,
        nosotros: `estamos ${ger}`,
        vosotros: `estáis ${ger}`,
        ellos: `están ${ger}`,
      },
      subjunctive: subMap,
      perfect_indicative: {
        yo: `he ${part}`,
        tu: `has ${part}`,
        el: `ha ${part}`,
        nosotros: `hemos ${part}`,
        vosotros: `habéis ${part}`,
        ellos: `han ${part}`,
      },
      perfect_subjunctive: {
        yo: `haya ${part}`,
        tu: `hayas ${part}`,
        el: `haya ${part}`,
        nosotros: `hayamos ${part}`,
        vosotros: `hayáis ${part}`,
        ellos: `hayan ${part}`,
      },
      imperative: {
        yo: '—',
        tu: defaultTuCmd,
        el: subMap.el,
        nosotros: subMap.nosotros,
        vosotros: type === 'ar' ? `${stem}ad` : type === 'er' ? `${stem}ed` : `${stem}id`,
        ellos: subMap.ellos,
      },
    },
  };
}

function regAr(infinitive: string, english: string, notes = 'Standard regular -ar verb.'): Verb {
  const stem = infinitive.slice(0, -2);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'ar',
    'regular',
    notes,
    { yo: `${stem}o`, tu: `${stem}as`, el: `${stem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${stem}an` },
    { yo: `${stem}e`, tu: `${stem}es`, el: `${stem}e`, nosotros: `${stem}emos`, vosotros: `${stem}éis`, ellos: `${stem}en` }
  );
}

function regEr(infinitive: string, english: string, notes = 'Standard regular -er verb.', opts?: { gerund?: string; participle?: string }): Verb {
  const stem = infinitive.slice(0, -2);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'er',
    'regular',
    notes,
    { yo: `${stem}o`, tu: `${stem}es`, el: `${stem}e`, nosotros: `${stem}emos`, vosotros: `${stem}éis`, ellos: `${stem}en` },
    { yo: `${stem}a`, tu: `${stem}as`, el: `${stem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${stem}an` },
    opts
  );
}

function regIr(infinitive: string, english: string, notes = 'Standard regular -ir verb.', opts?: { gerund?: string; participle?: string }): Verb {
  const stem = infinitive.slice(0, -2);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'ir',
    'regular',
    notes,
    { yo: `${stem}o`, tu: `${stem}es`, el: `${stem}e`, nosotros: `${stem}imos`, vosotros: `${stem}ís`, ellos: `${stem}en` },
    { yo: `${stem}a`, tu: `${stem}as`, el: `${stem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${stem}an` },
    opts
  );
}

function stemE_IE_AR(infinitive: string, english: string, notes = 'Stem changes e ➔ ie in boot forms.'): Verb {
  const stem = infinitive.slice(0, -2);
  const lastE = stem.lastIndexOf('e');
  const bootStem = stem.slice(0, lastE) + 'ie' + stem.slice(lastE + 1);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'ar',
    'stem_change_e_ie',
    notes,
    { yo: `${bootStem}o`, tu: `${bootStem}as`, el: `${bootStem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${bootStem}an` },
    { yo: `${bootStem}e`, tu: `${bootStem}es`, el: `${bootStem}e`, nosotros: `${stem}emos`, vosotros: `${stem}éis`, ellos: `${bootStem}en` }
  );
}

function stemE_IE_ER(infinitive: string, english: string, notes = 'Stem changes e ➔ ie in boot forms.'): Verb {
  const stem = infinitive.slice(0, -2);
  const lastE = stem.lastIndexOf('e');
  const bootStem = stem.slice(0, lastE) + 'ie' + stem.slice(lastE + 1);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'er',
    'stem_change_e_ie',
    notes,
    { yo: `${bootStem}o`, tu: `${bootStem}es`, el: `${bootStem}e`, nosotros: `${stem}emos`, vosotros: `${stem}éis`, ellos: `${bootStem}en` },
    { yo: `${bootStem}a`, tu: `${bootStem}as`, el: `${bootStem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${bootStem}an` }
  );
}

function stemO_UE_AR(infinitive: string, english: string, notes = 'Stem changes o ➔ ue in boot forms.'): Verb {
  const stem = infinitive.slice(0, -2);
  const lastO = stem.lastIndexOf('o');
  const bootStem = stem.slice(0, lastO) + 'ue' + stem.slice(lastO + 1);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'ar',
    'stem_change_o_ue',
    notes,
    { yo: `${bootStem}o`, tu: `${bootStem}as`, el: `${bootStem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${bootStem}an` },
    { yo: `${bootStem}e`, tu: `${bootStem}es`, el: `${bootStem}e`, nosotros: `${stem}emos`, vosotros: `${stem}éis`, ellos: `${bootStem}en` }
  );
}

function stemO_UE_ER(infinitive: string, english: string, notes = 'Stem changes o ➔ ue in boot forms.', opts?: { gerund?: string; participle?: string }): Verb {
  const stem = infinitive.slice(0, -2);
  const lastO = stem.lastIndexOf('o');
  const bootStem = stem.slice(0, lastO) + 'ue' + stem.slice(lastO + 1);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'er',
    'stem_change_o_ue',
    notes,
    { yo: `${bootStem}o`, tu: `${bootStem}es`, el: `${bootStem}e`, nosotros: `${stem}emos`, vosotros: `${stem}éis`, ellos: `${bootStem}en` },
    { yo: `${bootStem}a`, tu: `${bootStem}as`, el: `${bootStem}a`, nosotros: `${stem}amos`, vosotros: `${stem}áis`, ellos: `${bootStem}an` },
    opts
  );
}

function stemE_I_IR(infinitive: string, english: string, notes = 'Stem changes e ➔ i in boot forms and subjunctive.', opts?: { gerund?: string }): Verb {
  const stem = infinitive.slice(0, -2);
  const lastE = stem.lastIndexOf('e');
  const bootStem = stem.slice(0, lastE) + 'i' + stem.slice(lastE + 1);
  return makeVerb(
    infinitive,
    infinitive,
    english,
    'ir',
    'stem_change_e_i',
    notes,
    { yo: `${bootStem}o`, tu: `${bootStem}es`, el: `${bootStem}e`, nosotros: `${stem}imos`, vosotros: `${stem}ís`, ellos: `${bootStem}en` },
    { yo: `${bootStem}a`, tu: `${bootStem}as`, el: `${bootStem}a`, nosotros: `${bootStem}amos`, vosotros: `${bootStem}áis`, ellos: `${bootStem}an` },
    opts
  );
}

function zcoVerb(infinitive: string, type: 'er' | 'ir', english: string, notes = 'Yo-zco verb in present indicative.'): Verb {
  const stem = infinitive.slice(0, -2);
  const zcoStem = stem.slice(0, -1) + 'zc';
  return makeVerb(
    infinitive,
    infinitive,
    english,
    type,
    'zco_verb',
    notes,
    { yo: `${zcoStem}o`, tu: `${stem}es`, el: `${stem}e`, nosotros: type === 'er' ? `${stem}emos` : `${stem}imos`, vosotros: type === 'er' ? `${stem}éis` : `${stem}ís`, ellos: `${stem}en` },
    { yo: `${zcoStem}a`, tu: `${zcoStem}as`, el: `${zcoStem}a`, nosotros: `${zcoStem}amos`, vosotros: `${zcoStem}áis`, ellos: `${zcoStem}an` }
  );
}

export const VERBS: Verb[] = [
  // Core Verbs
  regAr('hablar', 'to speak / to talk'),
  regEr('comer', 'to eat'),
  regIr('vivir', 'to live'),
  stemE_IE_ER('querer', 'to want / to love', 'Stem changes e ➔ ie in all forms except nosotros/vosotros.'),
  stemO_UE_ER('poder', 'to be able to / can', 'Stem changes o ➔ ue in boot forms.'),
  stemE_I_IR('pedir', 'to ask for / to order', 'Stem changes e ➔ i in boot forms and subjunctive.', { gerund: 'pidiendo' }),
  
  makeVerb(
    'jugar', 'jugar', 'to play (sports/games)', 'ar', 'stem_change_u_ue',
    'The only verb that changes u ➔ ue in boot forms.',
    { yo: 'juego', tu: 'juegas', el: 'juega', nosotros: 'jugamos', vosotros: 'jugáis', ellos: 'juegan' },
    { yo: 'juegue', tu: 'juegues', el: 'juegue', nosotros: 'juguemos', vosotros: 'juguéis', ellos: 'jueguen' }
  ),

  makeVerb(
    'dormir', 'dormir', 'to sleep', 'ir', 'stem_change_o_ue',
    'Stem changes o ➔ ue. Irregular gerund: durmiendo.',
    { yo: 'duermo', tu: 'duermes', el: 'duerme', nosotros: 'dormimos', vosotros: 'dormís', ellos: 'duermen' },
    { yo: 'duerma', tu: 'duermas', el: 'duerma', nosotros: 'durmamos', vosotros: 'durmáis', ellos: 'duerman' },
    { gerund: 'durmiendo' }
  ),

  makeVerb(
    'tener', 'tener', 'to have', 'er', 'go_verb',
    'Yo-go verb (tengo) + stem-changer (tienes). Irregular command: ten.',
    { yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', vosotros: 'tenéis', ellos: 'tienen' },
    { yo: 'tenga', tu: 'tengas', el: 'tenga', nosotros: 'tengamos', vosotros: 'tengáis', ellos: 'tengan' },
    { tuImp: 'ten' }
  ),

  makeVerb(
    'hacer', 'hacer', 'to do / to make', 'er', 'go_verb',
    'Yo-go verb (hago). Irregular participle: hecho. Command: haz.',
    { yo: 'hago', tu: 'haces', el: 'hace', nosotros: 'hacemos', vosotros: 'hacéis', ellos: 'hacen' },
    { yo: 'haga', tu: 'hagas', el: 'haga', nosotros: 'hagamos', vosotros: 'hagáis', ellos: 'hagan' },
    { participle: 'hecho', tuImp: 'haz' }
  ),

  makeVerb(
    'poner', 'poner', 'to put / to place', 'er', 'go_verb',
    'Yo-go verb (pongo). Irregular participle: puesto. Command: pon.',
    { yo: 'pongo', tu: 'pones', el: 'pone', nosotros: 'ponemos', vosotros: 'ponéis', ellos: 'ponen' },
    { yo: 'ponga', tu: 'pongas', el: 'ponga', nosotros: 'pongamos', vosotros: 'pongáis', ellos: 'pongan' },
    { participle: 'puesto', tuImp: 'pon' }
  ),

  makeVerb(
    'salir', 'salir', 'to exit / to go out', 'ir', 'go_verb',
    'Yo-go verb (salgo). Irregular command: sal.',
    { yo: 'salgo', tu: 'sales', el: 'sale', nosotros: 'salimos', vosotros: 'salís', ellos: 'salen' },
    { yo: 'salga', tu: 'salgas', el: 'salga', nosotros: 'salgamos', vosotros: 'salgáis', ellos: 'salgan' },
    { tuImp: 'sal' }
  ),

  makeVerb(
    'decir', 'decir', 'to say / to tell', 'ir', 'go_verb',
    'Yo-go + e➔i stem-changer. Irregular participle: dicho. Command: di.',
    { yo: 'digo', tu: 'dices', el: 'dice', nosotros: 'decimos', vosotros: 'decís', ellos: 'dicen' },
    { yo: 'diga', tu: 'digas', el: 'diga', nosotros: 'digamos', vosotros: 'digáis', ellos: 'digan' },
    { gerund: 'diciendo', participle: 'dicho', tuImp: 'di' }
  ),

  zcoVerb('conocer', 'er', 'to know (people / places)', 'Yo-zco verb: conozco.'),

  makeVerb(
    'ser', 'ser', 'to be (essential identity / time)', 'er', 'irregular',
    'Completely irregular in present indicative and subjunctive! Command: sé.',
    { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son' },
    { yo: 'sea', tu: 'seas', el: 'sea', nosotros: 'seamos', vosotros: 'seáis', ellos: 'sean' },
    { gerund: 'siendo', participle: 'sido', tuImp: 'sé' }
  ),

  makeVerb(
    'estar', 'estar', 'to be (location / temporary state)', 'ar', 'irregular',
    'Irregular present indicative with accents (estoy, estás). Subjunctive: esté.',
    { yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', vosotros: 'estáis', ellos: 'están' },
    { yo: 'esté', tu: 'estés', el: 'esté', nosotros: 'estemos', vosotros: 'estéis', ellos: 'estén' },
    { gerund: 'estando', participle: 'estado' }
  ),

  makeVerb(
    'ir', 'ir', 'to go', 'ir', 'irregular',
    'Completely irregular! Indicative: voy, vas, va... Subjunctive: vaya, vayas...',
    { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', vosotros: 'vais', ellos: 'van' },
    { yo: 'vaya', tu: 'vayas', el: 'vaya', nosotros: 'vayamos', vosotros: 'vayáis', ellos: 'vayan' },
    { gerund: 'yendo', participle: 'ido', tuImp: 've' }
  ),

  makeVerb(
    'saber', 'saber', 'to know (facts / how to do something)', 'er', 'irregular',
    'Yo form: sé. Subjunctive: sepa.',
    { yo: 'sé', tu: 'sabes', el: 'sabe', nosotros: 'sabemos', vosotros: 'sabéis', ellos: 'saben' },
    { yo: 'sepa', tu: 'sepas', el: 'sepa', nosotros: 'sepamos', vosotros: 'sepáis', ellos: 'sepan' },
    { gerund: 'sabiendo', participle: 'sabido' }
  ),

  makeVerb(
    'ver', 'ver', 'to see / to watch', 'er', 'irregular',
    'Yo form: veo. Irregular participle: visto.',
    { yo: 'veo', tu: 'ves', el: 've', nosotros: 'vemos', vosotros: 'veis', ellos: 'ven' },
    { yo: 'vea', tu: 'veas', el: 'vea', nosotros: 'veamos', vosotros: 'veáis', ellos: 'vean' },
    { gerund: 'viendo', participle: 'visto', tuImp: 've' }
  ),

  regIr('escribir', 'to write', 'Regular in present, but irregular participle: escrito.', { participle: 'escrito' }),

  // ================= 100+ ADDITIONAL VERBS =================

  // AR REGULAR (30 Verbs)
  regAr('amar', 'to love'),
  regAr('cantar', 'to sing'),
  regAr('bailar', 'to dance'),
  regAr('estudiar', 'to study'),
  regAr('trabajar', 'to work'),
  regAr('viajar', 'to travel'),
  regAr('escuchar', 'to listen'),
  regAr('mirar', 'to watch / look at'),
  regAr('comprar', 'to buy'),
  makeVerb('pagar', 'pagar', 'to pay', 'ar', 'regular', 'Spelling change in subjunctive (pague).',
    { yo: 'pago', tu: 'pagas', el: 'paga', nosotros: 'pagamos', vosotros: 'pagáis', ellos: 'pagan' },
    { yo: 'pague', tu: 'pagues', el: 'pague', nosotros: 'paguemos', vosotros: 'paguéis', ellos: 'paguen' }
  ),
  regAr('ayudar', 'to help'),
  makeVerb('buscar', 'buscar', 'to look for / to search', 'ar', 'regular', 'Spelling change in subjunctive (busque).',
    { yo: 'busco', tu: 'buscas', el: 'busca', nosotros: 'buscamos', vosotros: 'buscáis', ellos: 'buscan' },
    { yo: 'busque', tu: 'busques', el: 'busque', nosotros: 'busquemos', vosotros: 'busquéis', ellos: 'busquen' }
  ),
  regAr('caminar', 'to walk'),
  regAr('cocinar', 'to cook'),
  regAr('esperar', 'to wait / to hope'),
  makeVerb('explicar', 'explicar', 'to explain', 'ar', 'regular', 'Spelling change in subjunctive (explique).',
    { yo: 'explico', tu: 'explicas', el: 'explica', nosotros: 'explicamos', vosotros: 'explicáis', ellos: 'explican' },
    { yo: 'explique', tu: 'expliques', el: 'explique', nosotros: 'expliquemos', vosotros: 'expliquéis', ellos: 'expliquen' }
  ),
  regAr('ganar', 'to win / to earn'),
  regAr('llamar', 'to call'),
  makeVerb('llegar', 'llegar', 'to arrive', 'ar', 'regular', 'Spelling change in subjunctive (llegue).',
    { yo: 'llego', tu: 'llegas', el: 'llega', nosotros: 'llegamos', vosotros: 'llegáis', ellos: 'llegan' },
    { yo: 'llegue', tu: 'llegues', el: 'llegue', nosotros: 'lleguemos', vosotros: 'lleguéis', ellos: 'lleguen' }
  ),
  regAr('llevar', 'to carry / to wear'),
  regAr('limpiar', 'to clean'),
  regAr('mandar', 'to send / to order'),
  regAr('nadar', 'to swim'),
  regAr('necesitar', 'to need'),
  regAr('preguntar', 'to ask'),
  regAr('preparar', 'to prepare'),
  regAr('regalar', 'to give as a gift'),
  regAr('terminar', 'to finish'),
  regAr('tomar', 'to take / to drink'),
  regAr('usar', 'to use'),

  // ER REGULAR (15 Verbs)
  regEr('aprender', 'to learn'),
  regEr('beber', 'to drink'),
  regEr('comprender', 'to understand'),
  regEr('correr', 'to run'),
  regEr('deber', 'to owe / must'),
  regEr('esconder', 'to hide'),
  regEr('leer', 'to read', 'Irregular spelling in gerund (leyendo) and participle (leído).', { gerund: 'leyendo', participle: 'leído' }),
  regEr('meter', 'to put in / to insert'),
  regEr('responder', 'to answer'),
  regEr('romper', 'to break', 'Irregular participle: roto.', { participle: 'roto' }),
  regEr('vender', 'to sell'),
  regEr('temer', 'to fear'),
  regEr('prometer', 'to promise'),
  regEr('creer', 'to believe', 'Irregular spelling in gerund (creyendo) and participle (creído).', { gerund: 'creyendo', participle: 'creído' }),
  makeVerb('recoger', 'recoger', 'to pick up / to gather', 'er', 'regular', 'Spelling change yo form: recojo.',
    { yo: 'recojo', tu: 'recoges', el: 'recoge', nosotros: 'recogemos', vosotros: 'recogéis', ellos: 'recogen' },
    { yo: 'recoja', tu: 'recojas', el: 'recoja', nosotros: 'recojamos', vosotros: 'recojáis', ellos: 'recojan' }
  ),

  // IR REGULAR (15 Verbs)
  regIr('abrir', 'to open', 'Irregular participle: abierto.', { participle: 'abierto' }),
  regIr('asistir', 'to attend'),
  regIr('compartir', 'to share'),
  regIr('cumplir', 'to fulfill / to turn (age)'),
  regIr('decidir', 'to decide'),
  regIr('descubrir', 'to discover', 'Irregular participle: descubierto.', { participle: 'descubierto' }),
  regIr('discutir', 'to argue / to discuss'),
  regIr('imprimir', 'to print', 'Irregular participle: impreso.', { participle: 'impreso' }),
  regIr('ocurrir', 'to occur / to happen'),
  regIr('permitir', 'to allow'),
  regIr('persistir', 'to persist'),
  regIr('recibir', 'to receive'),
  regIr('subir', 'to go up / to climb'),
  regIr('sufrir', 'to suffer'),
  regIr('unir', 'to join / to unite'),

  // STEM-CHANGE E ➔ IE (12 Verbs)
  stemE_IE_AR('pensar', 'to think'),
  makeVerb('empezar', 'empezar', 'to start / to begin', 'ar', 'stem_change_e_ie', 'Stem changes e ➔ ie + z ➔ c in subjunctive.',
    { yo: 'empiezo', tu: 'empiezas', el: 'empieza', nosotros: 'empezamos', vosotros: 'empezáis', ellos: 'empiezan' },
    { yo: 'empiece', tu: 'empieces', el: 'empiece', nosotros: 'empecemos', vosotros: 'empecéis', ellos: 'empiecen' }
  ),
  makeVerb('comenzar', 'comenzar', 'to begin', 'ar', 'stem_change_e_ie', 'Stem changes e ➔ ie + z ➔ c in subjunctive.',
    { yo: 'comienzo', tu: 'comienzas', el: 'comienza', nosotros: 'comenzamos', vosotros: 'comenzáis', ellos: 'comienzan' },
    { yo: 'comience', tu: 'comiendes', el: 'comience', nosotros: 'comencemos', vosotros: 'comencéis', ellos: 'comiencen' }
  ),
  stemE_IE_ER('entender', 'to understand'),
  stemE_IE_ER('perder', 'to lose'),
  makeVerb('preferir', 'preferir', 'to prefer', 'ir', 'stem_change_e_ie', 'Stem changes e ➔ ie. Gerund: prefiriendo.',
    { yo: 'prefiero', tu: 'prefieres', el: 'prefiere', nosotros: 'preferimos', vosotros: 'preferís', ellos: 'prefieren' },
    { yo: 'prefiera', tu: 'prefieras', el: 'prefiera', nosotros: 'prefiramos', vosotros: 'prefiráis', ellos: 'prefieran' },
    { gerund: 'prefiriendo' }
  ),
  makeVerb('sentir', 'sentir', 'to feel / to regret', 'ir', 'stem_change_e_ie', 'Stem changes e ➔ ie. Gerund: sintiendo.',
    { yo: 'siento', tu: 'sientes', el: 'siente', nosotros: 'sentimos', vosotros: 'sentís', ellos: 'sienten' },
    { yo: 'sienta', tu: 'sientas', el: 'sienta', nosotros: 'sintamos', vosotros: 'sintáis', ellos: 'sientan' },
    { gerund: 'sintiendo' }
  ),
  stemE_IE_AR('cerrar', 'to close'),
  stemE_IE_AR('despertar', 'to wake up'),
  stemE_IE_AR('sentar', 'to sit down'),
  makeVerb('mentir', 'mentir', 'to lie', 'ir', 'stem_change_e_ie', 'Stem changes e ➔ ie. Gerund: mintiendo.',
    { yo: 'miento', tu: 'mientes', el: 'miente', nosotros: 'mentimos', vosotros: 'mentís', ellos: 'mienten' },
    { yo: 'mienta', tu: 'mientas', el: 'mienta', nosotros: 'mintamos', vosotros: 'mintáis', ellos: 'mientan' },
    { gerund: 'mintiendo' }
  ),
  makeVerb('negar', 'negar', 'to deny', 'ar', 'stem_change_e_ie', 'Stem changes e ➔ ie + g ➔ gu in subjunctive.',
    { yo: 'niego', tu: 'niegas', el: 'niega', nosotros: 'negamos', vosotros: 'negáis', ellos: 'niegan' },
    { yo: 'niegue', tu: 'niegues', el: 'niegue', nosotros: 'neguemos', vosotros: 'neguéis', ellos: 'nieguen' }
  ),

  // STEM-CHANGE O ➔ UE (12 Verbs)
  stemO_UE_ER('volver', 'to return / to come back', 'Stem changes o ➔ ue. Irregular participle: vuelto.', { participle: 'vuelto' }),
  stemO_UE_AR('encontrar', 'to find'),
  stemO_UE_AR('recordar', 'to remember'),
  stemO_UE_AR('mostrar', 'to show'),
  stemO_UE_AR('contar', 'to count / to tell (a story)'),
  stemO_UE_ER('doler', 'to hurt / to ache'),
  stemO_UE_ER('mover', 'to move (something)'),
  makeVerb('morir', 'morir', 'to die', 'ir', 'stem_change_o_ue', 'Stem changes o ➔ ue. Irregular gerund (muriendo) & participle (muerto).',
    { yo: 'muero', tu: 'mueres', el: 'muere', nosotros: 'morimos', vosotros: 'morís', ellos: 'mueren' },
    { yo: 'muera', tu: 'mueras', el: 'muera', nosotros: 'muramos', vosotros: 'muráis', ellos: 'mueran' },
    { gerund: 'muriendo', participle: 'muerto' }
  ),
  stemO_UE_AR('probar', 'to try / to test / to taste'),
  stemO_UE_AR('soñar', 'to dream'),
  stemO_UE_AR('volar', 'to fly'),
  makeVerb('almorzar', 'almorzar', 'to eat lunch', 'ar', 'stem_change_o_ue', 'Stem changes o ➔ ue + z ➔ c in subjunctive.',
    { yo: 'almuerzo', tu: 'almuerzas', el: 'almuerza', nosotros: 'almorzamos', vosotros: 'almorzáis', ellos: 'almuerzan' },
    { yo: 'almuerce', tu: 'almuerces', el: 'almuerce', nosotros: 'almorcemos', vosotros: 'almorcéis', ellos: 'almuercen' }
  ),

  // STEM-CHANGE E ➔ I (6 Verbs)
  makeVerb('seguir', 'seguir', 'to follow / to continue', 'ir', 'stem_change_e_i', 'Yo form: sigo. Stem changes e ➔ i. Gerund: siguiendo.',
    { yo: 'sigo', tu: 'sigues', el: 'sigue', nosotros: 'seguimos', vosotros: 'seguís', ellos: 'siguen' },
    { yo: 'siga', tu: 'sigas', el: 'siga', nosotros: 'sigamos', vosotros: 'sigáis', ellos: 'sigan' },
    { gerund: 'siguiendo' }
  ),
  stemE_I_IR('servir', 'to serve', 'Stem changes e ➔ i.', { gerund: 'sirviendo' }),
  stemE_I_IR('repetir', 'to repeat', 'Stem changes e ➔ i.', { gerund: 'repitiendo' }),
  stemE_I_IR('vestir', 'to dress / to wear', 'Stem changes e ➔ i.', { gerund: 'vistiendo' }),
  makeVerb('corregir', 'corregir', 'to correct', 'ir', 'stem_change_e_i', 'Yo form: corrijo. Stem changes e ➔ i. Gerund: corrigiendo.',
    { yo: 'corrijo', tu: 'corriges', el: 'corrige', nosotros: 'corregimos', vosotros: 'corregís', ellos: 'corrigen' },
    { yo: 'corrija', tu: 'corrijas', el: 'corrija', nosotros: 'corrijamos', vosotros: 'corrijáis', ellos: 'corrijan' },
    { gerund: 'corrigiendo' }
  ),
  makeVerb('sonreír', 'sonreír', 'to smile', 'ir', 'stem_change_e_i', 'Stem changes e ➔ í. Gerund: sonriendo.',
    { yo: 'sonrío', tu: 'sonríes', el: 'sonríe', nosotros: 'sonreímos', vosotros: 'sonreís', ellos: 'sonríen' },
    { yo: 'sonría', tu: 'sonrías', el: 'sonría', nosotros: 'sonriamos', vosotros: 'sonriáis', ellos: 'sonrían' },
    { gerund: 'sonriendo', participle: 'sonreído' }
  ),

  // YO-GO VERBS (7 Verbs)
  makeVerb('traer', 'traer', 'to bring', 'er', 'go_verb', 'Yo-go form (traigo). Gerund: trayendo, participle: traído.',
    { yo: 'traigo', tu: 'traes', el: 'trae', nosotros: 'traemos', vosotros: 'traéis', ellos: 'traen' },
    { yo: 'traiga', tu: 'traigas', el: 'traiga', nosotros: 'traigamos', vosotros: 'traigáis', ellos: 'traigan' },
    { gerund: 'trayendo', participle: 'traído' }
  ),
  makeVerb('caer', 'caer', 'to fall', 'er', 'go_verb', 'Yo-go form (caigo). Gerund: cayendo, participle: caído.',
    { yo: 'caigo', tu: 'caes', el: 'cae', nosotros: 'caemos', vosotros: 'caéis', ellos: 'caen' },
    { yo: 'caiga', tu: 'caigas', el: 'caiga', nosotros: 'caigamos', vosotros: 'caigáis', ellos: 'caigan' },
    { gerund: 'cayendo', participle: 'caído' }
  ),
  makeVerb('oír', 'oír', 'to hear', 'ir', 'go_verb', 'Yo-go form (oigo). Spelling changes with y in boot forms.',
    { yo: 'oigo', tu: 'oyes', el: 'oye', nosotros: 'oímos', vosotros: 'oís', ellos: 'oyen' },
    { yo: 'oiga', tu: 'oigas', el: 'oiga', nosotros: 'oigamos', vosotros: 'oigáis', ellos: 'oigan' },
    { gerund: 'oyendo', participle: 'oído' }
  ),
  makeVerb('venir', 'venir', 'to come', 'ir', 'go_verb', 'Yo-go (vengo) + e➔ie stem-changer. Command: ven.',
    { yo: 'vengo', tu: 'vienes', el: 'viene', nosotros: 'venimos', vosotros: 'venís', ellos: 'vienen' },
    { yo: 'venga', tu: 'vengas', el: 'venga', nosotros: 'vengamos', vosotros: 'vengáis', ellos: 'vengan' },
    { gerund: 'viniendo', tuImp: 'ven' }
  ),
  makeVerb('valer', 'valer', 'to be worth', 'er', 'go_verb', 'Yo-go form (valgo). Command: val.',
    { yo: 'valgo', tu: 'vales', el: 'vale', nosotros: 'valemos', vosotros: 'valéis', ellos: 'valen' },
    { yo: 'valga', tu: 'valgas', el: 'valga', nosotros: 'valgamos', vosotros: 'valgáis', ellos: 'valgan' },
    { tuImp: 'val' }
  ),
  makeVerb('suponer', 'suponer', 'to suppose', 'er', 'go_verb', 'Yo-go form (supongo). Participle: supuesto.',
    { yo: 'supongo', tu: 'supones', el: 'supone', nosotros: 'suponemos', vosotros: 'suponéis', ellos: 'suponen' },
    { yo: 'suponga', tu: 'supongas', el: 'suponga', nosotros: 'supongamos', vosotros: 'supongáis', ellos: 'supongan' },
    { participle: 'supuesto', tuImp: 'supón' }
  ),
  makeVerb('proponer', 'proponer', 'to propose', 'er', 'go_verb', 'Yo-go form (propongo). Participle: propuesto.',
    { yo: 'propongo', tu: 'propones', el: 'propone', nosotros: 'proponemos', vosotros: 'proponéis', ellos: 'proponen' },
    { yo: 'proponga', tu: 'propongas', el: 'proponga', nosotros: 'propongamos', vosotros: 'propongáis', ellos: 'propongan' },
    { participle: 'propuesto', tuImp: 'propón' }
  ),

  // YO-ZCO VERBS (6 Verbs)
  zcoVerb('producir', 'ir', 'to produce', 'Yo-zco verb: produzco.'),
  zcoVerb('conducir', 'ir', 'to drive / to lead', 'Yo-zco verb: conduzco.'),
  zcoVerb('traducir', 'ir', 'to translate', 'Yo-zco verb: traduzco.'),
  zcoVerb('ofrecer', 'er', 'to offer', 'Yo-zco verb: ofrezco.'),
  zcoVerb('parecer', 'er', 'to seem / to look like', 'Yo-zco verb: parezco.'),
  zcoVerb('nacer', 'er', 'to be born', 'Yo-zco verb: nazco.'),

  // IRREGULAR & SPECIAL (5 Verbs)
  makeVerb('caber', 'caber', 'to fit', 'er', 'irregular', 'Yo form: quepo. Subjunctive: quepa.',
    { yo: 'quepo', tu: 'cabes', el: 'cabe', nosotros: 'cabemos', vosotros: 'cabéis', ellos: 'caben' },
    { yo: 'quepa', tu: 'quepas', el: 'quepa', nosotros: 'quepamos', vosotros: 'quepáis', ellos: 'quepan' }
  ),
  makeVerb('dar', 'dar', 'to give', 'ar', 'irregular', 'Yo form: doy. Subjunctive: dé, des, dé...',
    { yo: 'doy', tu: 'das', el: 'da', nosotros: 'damos', vosotros: 'dais', ellos: 'dan' },
    { yo: 'dé', tu: 'des', el: 'dé', nosotros: 'demos', vosotros: 'deis', ellos: 'den' }
  ),
  makeVerb('haber', 'haber', 'to have (auxiliary verb)', 'er', 'irregular', 'Auxiliary verb used in perfect tenses.',
    { yo: 'he', tu: 'has', el: 'ha', nosotros: 'hemos', vosotros: 'habéis', ellos: 'han' },
    { yo: 'haya', tu: 'hayas', el: 'haya', nosotros: 'hayamos', vosotros: 'hayáis', ellos: 'hayan' }
  ),
  makeVerb('construir', 'construir', 'to build', 'ir', 'irregular', 'y added in boot forms. Gerund: construyendo.',
    { yo: 'construyo', tu: 'construyes', el: 'construye', nosotros: 'construimos', vosotros: 'construís', ellos: 'construyen' },
    { yo: 'construya', tu: 'construyas', el: 'construya', nosotros: 'construyamos', vosotros: 'construyáis', ellos: 'construyan' },
    { gerund: 'construyendo' }
  ),
  makeVerb('destruir', 'destruir', 'to destroy', 'ir', 'irregular', 'y added in boot forms. Gerund: destruyendo.',
    { yo: 'destruyo', tu: 'destruyes', el: 'destruye', nosotros: 'destruimos', vosotros: 'destruís', ellos: 'destruyen' },
    { yo: 'destruya', tu: 'destruyas', el: 'destruya', nosotros: 'destruyamos', vosotros: 'destruyamos', ellos: 'destruyan' },
    { gerund: 'destruyendo' }
  )
];
