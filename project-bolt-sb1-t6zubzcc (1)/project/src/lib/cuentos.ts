// Cuentos y tradiciones locales para modo demo
export interface CuentoQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number; // índice de la respuesta correcta (0-3)
  type: 'multiple_choice' | 'true_false';
}

export interface LocalCuento {
  id: string;
  title: string;
  content: string;
  created_at: string;
  questions?: CuentoQuestion[]; // preguntas opcionales relacionadas con el cuento
}

export const localCuentos: LocalCuento[] = [
  {
    id: 'cuento_1',
    title: 'FIESTA DEL CARNAVAL',
    content: `Es una de las fiestas más alegres de la comunidad donde todos cantan coplas y bailan al son del erque y la caja. El que realiza la fiesta prepara chicha, diana y otras bebidas, se inicia con la marcada y señalada del ganado en el corral, acompañados del sonido del erque. Concluida la marcada todos sacan los animales del corral.

Cada persona lleva una piedra que significa un buey, ternero, vaca toro, etc. y entrega al dueño diciendo que para año sean más, el dueño recibe y las coloca en la pacha, luego todos retornan a la casa bailando el erque tomados de la mano. Posteriormente echan chicha, coca, cigarrillos a la pachamama ya que se cree que si no hacen el ganado no se multiplicá al contrario pueden enfermar y morir.`,
    created_at: '2024-01-01T00:00:00.000Z',
    questions: [
      {
        id: 'carnaval_q1',
        question: '¿Cómo se describe la fiesta del Carnaval en la comunidad?',
        options: [
          'Como una ceremonia religiosa',
          'Como una de las fiestas más alegres donde todos cantan y bailan',
          'Como una feria de animales',
          'Como una fiesta silenciosa y triste'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'carnaval_q2',
        question: '¿Qué instrumentos se tocan durante la fiesta?',
        options: [
          'Charango y quena',
          'Violín y tambor',
          'Erque y caja',
          'Bombo y guitarra'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'carnaval_q3',
        question: '¿Con qué actividad se inicia la fiesta?',
        options: [
          'Con una procesión religiosa',
          'Con la marcada y señalada del ganado en el corral',
          'Con el rezo a la Pachamama',
          'Con un desfile por las calles'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'carnaval_q4',
        question: '¿Qué representa la piedra que cada persona lleva?',
        options: [
          'Un animal del ganado como un buey o una vaca',
          'Un recuerdo familiar',
          'Un símbolo de amistad',
          'Un deseo de abundancia'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'carnaval_q5',
        question: '¿A quién se ofrece chicha, coca y cigarrillos al final de la celebración?',
        options: [
          'A la Pachamama',
          'A los músicos',
          'A los invitados',
          'A los animales'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'carnaval_q6',
        question: '¿Qué creen las personas si no realizan la ofrenda a la Pachamama?',
        options: [
          'Que los animales se escaparán',
          'Que no habrá lluvia',
          'Que el ganado no se multiplicará y puede enfermar o morir',
          'Que la chicha se perderá'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'carnaval_q7',
        question: 'Durante el Carnaval, la comunidad baila tomados de la mano al ritmo del erque.',
        options: [
          'Verdadero',
          'Falso'
        ],
        correct_answer: 0,
        type: 'true_false'
      }
    ]
  },
  {
    id: 'cuento_2',
    title: 'FIESTA DE LA CRUZ',
    content: `Es una fiesta tradicional de la comunidad, de mucha concurrencia, de mucha gente de las comunidades vecinas.

Esta fiesta se la realiza el 3 de mayo, empieza el 2 con el velo de la santa cruz, el velo consiste en que el alférez va a robar la cruz, (sacan la cruz y traer a su casa) una vez que la traen a su casa la enfloran de rosas pascuas y le prenden velas toda la noche, mucha gente acompañan el velo acompañados de dianas, canelados así también de los instrumentos típicos de la zona como es el violín. El 3 de mayo día de la cruz toman la chicha todo el día y en la tarde hacen la entrega (consiste en buscar a otras personas para que pasen la fiesta para el otro año en esta entrega le llevan un cántaro de chicha, tortas, un gallo, una caldera de canelao y una botella de trago bailando formando una rueda llevando las ofrendas en la cabeza, y le ponen en su delante de los nuevos alféreces, una vez que terminan de tomar su cántaro de chica y los demás que le entregaron, los nuevos alféreces entregan la vasijas bailando a los dueños y comparten las ofrendas con los presentes.`,
    created_at: '2024-01-02T00:00:00.000Z',
    questions: [
      {
        id: 'cruz_q1',
        question: '¿Cuándo se realiza la fiesta de la Cruz?',
        options: [
          'El 25 de julio',
          'El 3 de mayo',
          'El 1 de noviembre',
          'El 6 de agosto'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'cruz_q2',
        question: '¿Qué hace el alférez el 2 de mayo durante el "velo"?',
        options: [
          'Decora la iglesia',
          'Limpia las cruces del cementerio',
          'Va a robar la cruz y la lleva a su casa',
          'Prepara tortas'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'cruz_q3',
        question: '¿Con qué adornan la cruz en casa del alférez?',
        options: [
          'Rosas pascuas y velas',
          'Cintas de colores y hojas',
          'Flores de papel y panecillos',
          'Flores silvestres y frutas'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'cruz_q4',
        question: '¿Qué instrumentos acompañan la fiesta?',
        options: [
          'Violín y dianas',
          'Zampoña y guitarra',
          'Caja y erque',
          'Bombo y charango'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'cruz_q5',
        question: '¿Qué entregan los nuevos alféreces al recibir la fiesta?',
        options: [
          'Un ramo de flores',
          'Una cruz pequeña',
          'Un cántaro de chicha, tortas, un gallo, canelado y una botella de trago',
          'Una vela y pan'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'cruz_q6',
        question: '¿Cómo se realiza la entrega a los nuevos alféreces?',
        options: [
          'Bailando en rueda, llevando las ofrendas en la cabeza',
          'En silencio frente a la iglesia',
          'En procesión por la comunidad',
          'Con música moderna'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'cruz_q7',
        question: 'Durante la fiesta de la Cruz se comparte chicha y comida entre todos los presentes.',
        options: [
          'Verdadero',
          'Falso'
        ],
        correct_answer: 0,
        type: 'true_false'
      }
    ]
  },
  {
    id: 'cuento_3',
    title: 'TODOS SANTOS',
    content: `Es una fiesta religiosa que se realiza en diversas partes del mundo con características diferentes.

En nuestra comunidad se inicia el 1º de noviembre, donde todos preparan comidas, masitas, colocan en una mesa ya que se cree que las almas de los difuntos llegan a las 12 del mediodía, por tal motivo se coloca en la mesa todo lo que era de su agrado de las persona fallecida, al día siguiente se cree que las almas retornan al cielo a horas 12 del mediodía, por tal motivo todos van al cementerio a adornar las cruces con guirnaldas y flores, arreglan las sepulturas donde fueron enterrados los difuntos, cuando retornan a sus casas proceden a levantar lo que pusieron en la mesa y comparten entre todos.`,
    created_at: '2024-01-03T00:00:00.000Z',
    questions: [
      {
        id: 'santos_q1',
        question: '¿Cuándo se celebra esta fiesta en la comunidad?',
        options: [
          '31 de octubre',
          '1 de noviembre',
          '2 de noviembre',
          '3 de noviembre'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'santos_q2',
        question: '¿Qué preparan las familias para recibir a las almas?',
        options: [
          'Comidas y masitas que les gustaban a los difuntos',
          'Solo flores y velas',
          'Cántaros de chicha',
          'Misas y procesiones'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'santos_q3',
        question: '¿A qué hora se cree que llegan las almas el 1 de noviembre?',
        options: [
          'A las 3 de la tarde',
          'A las 12 del mediodía',
          'A las 6 de la mañana',
          'A la medianoche'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'santos_q4',
        question: '¿Qué hacen las familias al día siguiente?',
        options: [
          'Se reúnen en la plaza',
          'Limpian sus casas',
          'Van al cementerio a adornar las cruces y sepulturas',
          'Van a la iglesia a rezar'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'santos_q5',
        question: '¿Qué se hace al regresar del cementerio?',
        options: [
          'Se levanta la mesa y se comparte la comida entre todos',
          'Se quema la ofrenda',
          'Se entierra la comida',
          'Se guarda para el próximo año'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'santos_q6',
        question: '¿Qué simboliza adornar las cruces con flores y guirnaldas?',
        options: [
          'Petición de abundancia',
          'Alegría por la vida',
          'Amor y respeto a los difuntos',
          'Inicio del año agrícola'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'santos_q7',
        question: 'Las familias creen que las almas se van al cielo el 2 de noviembre al mediodía.',
        options: [
          'Verdadero',
          'Falso'
        ],
        correct_answer: 0,
        type: 'true_false'
      }
    ]
  },
  {
    id: 'cuento_4',
    title: 'FIESTA DE SANTIAGO',
    content: `La fiesta de Santiago se realiza el 25 de julio de cada año, es una fiesta religiosa donde la gente con mucha devoción y fe pide a la imagen que les ayude en sus trabajos, salud, etc.

En esta fiesta se desarrollan las siguientes actividades:

La carrera de caballos

Es una competencia de velocidad donde participan en parejas personas montadas en sus respectivos caballos donde en algunos casos el ganador el hacendado da un premio especial y en otros se lo realiza por devoción.

Cuartiada a caballo

Participan en parejas montadas en sus respectivos caballos llevan un cuarto, que consiste en un chivo o cordero, tomándolo del brazo u otro de la pierna con ayuda de los caballos tienen que romper galones, si logran romper cada uno se lleva la parte con la que se quedó.

Gallo enterrado

Consiste en cabar un hoyo y enterrar un gallo con la cabeza fuera de la tierra, las personas participantes son cubiertos los ojos con un trapo para que no se vea, se les hace dar dos vueltas, se le da un palo que al mismo tiempo le sirve como un apoyo, se lo coloca con dirección hacia el pollo que se encuentra a una distancia de 12 a 15 metros, el participante tiene que dirigirse hacia el gallo y con el palo a pegar el mismo tiempo 3 opciones si logra se lo lleva al gallo, o caso contrario da opción a otra persona.

Entrega

La persona o las personas encargadas de pasar la fiesta buscan a otras personas para que pasen la fiesta el año siguiente a los cuales entregan a un cántaro de chicha, canelado al son del tambor, bombo, quenilla y bailando con sus envases a la cabeza, concluida esta ceremonia se realiza un regocijo general. Es una fiesta que se caracteriza por el puchero y los tistinchos que en algunos lugares se mantienen y en otros tienden a desaparecer.`,
    created_at: '2024-01-04T00:00:00.000Z',
    questions: [
      {
        id: 'santiago_q1',
        question: '¿En qué fecha se realiza la fiesta de Santiago?',
        options: [
          'El 6 de agosto',
          'El 25 de julio',
          'El 3 de mayo',
          'El 1 de noviembre'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'santiago_q2',
        question: '¿Qué piden las personas a la imagen de Santiago?',
        options: [
          'Ayuda en sus trabajos y salud',
          'Lluvias para la cosecha',
          'Buen viaje',
          'Protección de animales'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'santiago_q3',
        question: '¿Qué competencia tradicional se realiza durante esta fiesta?',
        options: [
          'La carrera de caballos',
          'El velo de la cruz',
          'El gallo enterrado',
          'La marcada del ganado'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'santiago_q4',
        question: '¿Qué se hace en la "cuartiada a caballo"?',
        options: [
          'Se bendicen los caballos',
          'Dos personas montadas intentan romper galones llevando un chivo o cordero',
          'Se corre con antorchas',
          'Se baila en la plaza'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'santiago_q5',
        question: '¿En qué consiste el "gallo enterrado"?',
        options: [
          'Se pinta una imagen del gallo',
          'Se entierra un gallo y el participante con los ojos vendados debe golpearlo con un palo',
          'Se lo regala al ganador',
          'Se cocina el gallo bajo tierra'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'santiago_q6',
        question: '¿Qué entregan los antiguos alféreces a los nuevos?',
        options: [
          'Un cántaro de chicha, canelado y bailes con las ofrendas en la cabeza',
          'Panes y frutas',
          'Una vela y una cruz',
          'Un gallo de madera'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      },
      {
        id: 'santiago_q7',
        question: 'El puchero y los tistinchos son comidas típicas de la fiesta de Santiago.',
        options: [
          'Verdadero',
          'Falso'
        ],
        correct_answer: 0,
        type: 'true_false'
      }
    ]
  },
  {
    id: 'cuento_5',
    title: 'El Burro y el Tigre',
    content: `Había una vez un burro que comía pasto en una quebrada cuando apareció un tigre. El burro pensó: «Este me va a comer». Con la pata se arrancó una espina y el tigre le dijo: «Te voy a matar y después te voy a comer. Si quieres que te deje vivo, sáname esa espina de la pata; si no, te voy a arrancar el cogote cuando te coma».

Entonces el burro dio un gran salto y le pegó una patada en la boca al tigre, que salió volando y vio estrellas. Al tigre se le cayeron los dientes y ya no podía morder; así, no pudo comerse al burro. El burro se fue muy contento porque el tigre no podía comerlo, y el tigre se quedó lamentando su mala suerte: si hubiera hecho caso al burro, ahora tendría dientes para comer.`,
    created_at: '2024-01-05T00:00:00.000Z'
  },
  {
    id: 'cuento_6',
    title: 'El Zorro y el Cóndor',
    content: `Había una vez un zorro astuto que vivía en los valles de Tarija. Un día, mirando hacia el cielo, vio al majestuoso cóndor volando muy alto, planeando entre las nubes con sus grandes alas extendidas. El zorro sintió una gran envidia al ver cómo el cóndor podía contemplar el mundo desde las alturas.

Con su astucia característica, el zorro ideó un plan. Cuando el cóndor descendió a tierra, el zorro se le acercó con una sonrisa amable y le dijo: "Compadre cóndor, he escuchado que hay una gran fiesta en el cielo. Dicen que habrá música, comida y baile. ¿Podrías llevarme contigo? Yo llevaré mi charango para tocar música."

El cóndor, confiado y de buen corazón, aceptó ayudar al zorro. "Súbete a mi espalda, compadre," le dijo. El zorro, con su charango amarrado en la espalda, se montó sobre el gran ave y comenzaron a elevarse hacia el cielo.

Mientras más alto volaban, el zorro miraba hacia abajo con nerviosismo pero también con orgullo, pensando en cómo había engañado al cóndor. Sin embargo, el cóndor, siendo sabio y observador, pronto se dio cuenta de que no había ninguna fiesta en el cielo y que el zorro solo lo había usado para satisfacer su capricho.

Molesto por el engaño, el cóndor dio una vuelta brusca en el aire. El zorro, asustado, comenzó a caer desde las alturas, gritando: "¡Ayúdenme, ayúdenme! ¡Extiendan sus mantas para que no me estrelle!"

Los animales del valle escucharon sus gritos, pero ninguno movió un dedo para ayudarlo. Todos conocían al zorro y sabían que era mentiroso y astuto, siempre engañando a los demás para conseguir lo que quería. El zorro cayó fuertemente al suelo.

Desde ese día, el zorro aprendió que la astucia y el engaño no siempre son el mejor camino, y que cuando uno engaña a los demás, no puede esperar ayuda cuando la necesita.`,
    created_at: '2024-01-06T00:00:00.000Z',
    questions: [
      {
        id: 'zorro_condor_q1',
        question: '¿Dónde vivía el zorro al comienzo del cuento?',
        options: [
          'En las montañas nevadas',
          'En los valles de Tarija',
          'En el bosque amazónico',
          'En una cueva junto al río'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'zorro_condor_q2',
        question: '¿Qué sintió el zorro al ver al cóndor volando alto en el cielo?',
        options: [
          'Alegría',
          'Curiosidad',
          'Envidia',
          'Miedo'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'zorro_condor_q3',
        question: '¿Qué excusa usó el zorro para convencer al cóndor de llevarlo al cielo?',
        options: [
          'Que quería visitar a su familia',
          'Que había una tormenta',
          'Que había una fiesta en el cielo',
          'Que necesitaba buscar agua'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'zorro_condor_q4',
        question: '¿Qué llevaba el zorro en la espalda mientras volaba con el cóndor?',
        options: [
          'Un saco de comida',
          'Un tambor',
          'Un charango',
          'Una manta'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'zorro_condor_q5',
        question: '¿Qué hizo el cóndor cuando descubrió que el zorro lo había engañado?',
        options: [
          'Lo dejó en una nube',
          'Le quitó el charango',
          'Dio una vuelta brusca y el zorro cayó',
          'Lo llevó de regreso a tierra'
        ],
        correct_answer: 2,
        type: 'multiple_choice'
      },
      {
        id: 'zorro_condor_q6',
        question: '¿Por qué los demás animales no ayudaron al zorro cuando cayó?',
        options: [
          'Porque no escucharon su pedido',
          'Porque sabían que era mentiroso y astuto',
          'Porque no tenían mantas',
          'Porque estaban dormidos'
        ],
        correct_answer: 1,
        type: 'multiple_choice'
      },
      {
        id: 'zorro_condor_q7',
        question: '¿Qué enseñanza deja el cuento?',
        options: [
          'Que la astucia y el engaño no siempre son el mejor camino',
          'Que es bueno mentir para conseguir lo que se quiere',
          'Que los animales deben volar',
          'Que el cóndor y el zorro son enemigos'
        ],
        correct_answer: 0,
        type: 'multiple_choice'
      }
    ]
  }
];

