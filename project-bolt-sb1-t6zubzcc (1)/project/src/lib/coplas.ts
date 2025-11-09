// Coplas locales para modo demo
export interface LocalCopla {
  id: string;
  title: string;
  content: string;
  category: 'carnaval' | 'pascua' | 'cruz' | 'sanAntonio' | 'santiago' | 'todosSantos';
  audio_url?: string;
}

export const localCoplas: LocalCopla[] = [
  // COPLAS DE CARNAVAL
  {
    id: 'carnaval_1',
    title: 'Yo soy mosita cantora',
    content: `Yo soy mosita cantora

Cuando llega el carnaval 

Yo no como yo no duermo 

Me mantengo con las copla`,
    category: 'carnaval',
    audio_url: '/music/carnaval (2).mp3'
  },
  {
    id: 'carnaval_2',
    title: 'Esta cajita no es mía',
    content: `Esta cajita no es mía
Esta cajita es prestada
Si su dueño me la pide
No tengo más que entregarla`,
    category: 'carnaval'
  },
  {
    id: 'carnaval_3',
    title: 'Soy mendeño si señores',
    content: `Soy mendeño si señores
Mendeño de corazón
Canto coplas de las venas
Venas en el corazón`,
    category: 'carnaval'
  },
  {
    id: 'carnaval_4',
    title: 'Cuando canto coplas lindas',
    content: `Cuando canto coplas lindas
Me preguntan de ande soy
Orgulloso de concepto
Mendeño de corazón`,
    category: 'carnaval'
  },
  {
    id: 'carnaval_5',
    title: 'Amada cajita mía',
    content: `Amada cajita mía
La dos debemos cantar
Tu con tu suave armonía
Yo con mi voz desigual`,
    category: 'carnaval'
  },

  // COPLAS DE PASCUA
  {
    id: 'pascua_1',
    title: 'Apégate chapaquita',
    content: `Apégate chapaquita 

Vente a mi lado 

No tengas miedo vidita 

No soy casado`,
    category: 'pascua',
    audio_url: 'https://drive.google.com/file/d/1lKKv3uWPzgVdWF-xmTXTfzJbT4z2umT0/view?usp=sharing'
  },
  {
    id: 'pascua_2',
    title: 'Un corazón de madera',
    content: `Un corazón de madera 

me voy a mandar a hacer 

para que no siento 

ni sepa lo que es querer`,
    category: 'pascua'
  },
  {
    id: 'pascua_3',
    title: 'Cuál es el mal que les hago',
    content: `Cuál es el mal que les hago 

Visita de haber venido 

Con pisar en sus hombrales 

Zambita les eh ofendido`,
    category: 'pascua'
  },
  {
    id: 'pascua_4',
    title: 'Adiós te dices mis ajos',
    content: `Adiós te dices mis ajos 

Adiós te dicen llorando 

Adiós te vengo a decirte 

Vidita nose hasta cuando`,
    category: 'pascua'
  },

  // COPLAS DE LA CRUZ
  {
    id: 'cruz_1',
    title: 'Donde piensas vos llevarme',
    content: `Donde piensas vos llevarme

en tanto frío

yo solito había sido

tu aborrecido`,
    category: 'cruz',
    audio_url: 'https://drive.google.com/file/d/1lKKv3uWPzgVdWF-xmTXTfzJbT4z2umT0/view?usp=sharing'
  },
  {
    id: 'cruz_2',
    title: 'Tanta naranja madura',
    content: `Tanta naranja madura 

tanto limón por el suelo 

tanta mosas tan bonito 

y yo pobre sin consuelo`,
    category: 'cruz'
  },
  {
    id: 'cruz_3',
    title: 'Ya se ah caído el arbolito',
    content: `Ya se ah caído el arbolito 

que dormía el pavo real 

haora duerme en el suelito 

como cualquier animal`,
    category: 'cruz'
  },
  {
    id: 'cruz_4',
    title: 'Abrígame con tus alas',
    content: `Abrígame con tus alas 

como la gallina al huevo 

olvida glorias pasadas 

volverme a querer de nuevo`,
    category: 'cruz'
  },

  // COPLAS DE SAN ANTONIO
  {
    id: 'sanAntonio_1',
    title: 'Dice que andas hablando',
    content: `Dice que andas hablando
Diciendo que no te importa
Si de mi no te importa
Deja de andar hablar
Si te quise no me acuerdo
Si te amé ya no lo sé`,
    category: 'sanAntonio',
    audio_url: 'https://drive.google.com/file/d/18u-W3NYWOhBbylb7lK9jJ4B-6WUdeeJI/view?usp=sharing'
  },
  {
    id: 'sanAntonio_2',
    title: 'Si corazón de oro tuviera',
    content: `Si corazón de oro tuviera
Papel de plata comprara
Escribiera una carta
Vidita te lo mandara

Y dentro de la carta
te mandara una flor
Dentro de la flor
te mandar mi amor`,
    category: 'sanAntonio'
  },

  // COPLAS DE SANTIAGO
  {
    id: 'santiago_1',
    title: 'Yo te quisiera vidita',
    content: `Yo te quisiera vidita

pero tu dueño está viendo

Échale un puñado de sueño

Que se divierta durmiendo`,
    category: 'santiago'
  },
  {
    id: 'santiago_2',
    title: 'Un corazón de madera',
    content: `Un corazón de madera

me voy a mandar a hacer

para que no siento

ni sepa lo que es querer`,
    category: 'santiago'
  },
  {
    id: 'santiago_3',
    title: 'Cuál es el mal que les hago',
    content: `Cuál es el mal que les hago

Visita de haber venido

Con pisar en sus hombrales

Zambita les eh ofendido`,
    category: 'santiago'
  },
  {
    id: 'santiago_4',
    title: 'Adiós te dices mis ajos',
    content: `Adiós te dices mis ajos

Adiós te dicen llorando

Adiós te vengo a decirte

Vidita nose hasta cuando`,
    category: 'santiago'
  },

  // COPLAS DE TODOS SANTOS
  {
    id: 'todosSantos_1',
    title: 'Tanta naranja madura',
    content: `Tanta naranja madura

tanto limón por el suelo

tanta mosas tan bonito

y yo pobre sin consuelo`,
    category: 'todosSantos'
  },
  {
    id: 'todosSantos_2',
    title: 'Ya se ah caído el arbolito',
    content: `Ya se ah caído el arbolito

que dormía el pavo real

haora duerme en el suelito

como cualquier animal`,
    category: 'todosSantos'
  },
  {
    id: 'todosSantos_3',
    title: 'Abrígame con tus alas',
    content: `Abrígame con tus alas

como la gallina al huevo

olvida glorias pasadas

volverme a querer de nuevo`,
    category: 'todosSantos'
  },
  {
    id: 'todosSantos_4',
    title: 'A los todo santos',
    content: `A los todo santos

como no hay de volver

aver si las aguas corren

por dónde sabían correr`,
    category: 'todosSantos'
  }
];

