import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { translations } from '../translations';
import { supabase, Question, demoQuestions } from '../lib/supabase';
import { saveGameResult, saveGameSession } from '../lib/localStorage';
import { Heart, CheckCircle, XCircle } from 'lucide-react';
import chapaquitaAvatar from '../assets/Image 27.png';
import eustaquioAvatar from '../assets/Image 24.png';

export function QuizScreen() {
  const {
    language,
    currentCategory,
    lives,
    setLives,
    score,
    setScore,
    setScreen,
    sessionId,
    avatar,
    playerName,
    grade,
    correctAnswers,
    setCorrectAnswers,
    incorrectAnswers,
    setIncorrectAnswers,
    gameStartTime,
    setGameStartTime,
    questionsAnswered,
    setQuestionsAnswered,
    difficulty,
    usedQuestionIds,
    setUsedQuestionIds,
  } = useGame();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Tiempo según dificultad: Fácil = 30s, Intermedio = 25s, Difícil = 14s
  const getInitialTime = () => {
    if (difficulty === 'facil') return 30;
    if (difficulty === 'intermedio') return 25;
    return 14; // difícil - mayor desafío con menos tiempo
  };
  
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const t = translations[language].welcome;
  const qt = translations[language].quiz;
  const gt = translations[language].game;

  // Reproducir música de fondo para las preguntas
  useEffect(() => {
    const audio = new Audio('/quiz-background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Volumen moderado para no distraer
    
    audio.play().catch(error => {
      console.log('No se pudo reproducir música de fondo:', error);
    });
    
    setBackgroundAudio(audio);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Pausar música cuando se muestra el resultado o se acaba el tiempo
  useEffect(() => {
    if (backgroundAudio && (showResult || timeLeft === 0)) {
      backgroundAudio.pause();
    } else if (backgroundAudio && !showResult && timeLeft > 0 && !loading) {
      backgroundAudio.play().catch(() => {});
    }
  }, [showResult, timeLeft, loading, backgroundAudio]);

  // Reproducir sonido de tick cada segundo durante todo el tiempo
  useEffect(() => {
    // Solo reproducir si la pregunta está activa
    if (timeLeft > 0 && !showResult && !loading) {
      playTickSound();
    }
  }, [timeLeft, showResult, loading]);

  // Función para reproducir sonido de tick cada segundo
  const playTickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Sonido de "tick" del reloj
      oscillator.type = 'sine';
      
      // Calcular intensidad basada en el tiempo restante
      const initialTime = getInitialTime();
      const timeProgress = 1 - (timeLeft / initialTime); // 0 al inicio, 1 al final
      
      // Frecuencia aumenta con la urgencia (400Hz -> 1000Hz)
      const frequency = 400 + (timeProgress * 600);
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      // Volumen aumenta con la urgencia (0.1 -> 0.5)
      const volume = 0.1 + (timeProgress * 0.4);
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      
    } catch (error) {
      console.log('No se pudo reproducir tick:', error);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [currentCategory]);

  useEffect(() => {
    if (loading || showResult || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, showResult, timeLeft]);

  const loadQuestion = async () => {
    setLoading(true);
    setTimeLeft(getInitialTime()); // Tiempo según dificultad: 30s fácil, 25s intermedio, 14s difícil
    setSelectedAnswer(null);
    setShowResult(false);

    console.log('📚 Cargando pregunta...');
    console.log('   Categoría actual:', currentCategory);
    console.log('   Dificultad:', difficulty);

    try {
      let data: Question[] = [];

      // Modo demo: usar preguntas locales si Supabase no está configurado
      if (!supabase) {
        data = demoQuestions.filter(
          q => q.category === currentCategory && 
          q.difficulty === difficulty &&
          !usedQuestionIds.includes(q.id)
        );
        console.log('   Preguntas encontradas:', data.length);
        console.log('   Preguntas usadas:', usedQuestionIds.length);
      } else {
        // Modo Supabase
        let query = supabase
          .from('questions')
          .select('*')
          .eq('category', currentCategory)
          .eq('difficulty', difficulty);

        if (usedQuestionIds.length > 0) {
          query = query.not('id', 'in', `(${usedQuestionIds.join(',')})`);
        }

        const result = await query;
        if (result.data && !result.error) {
          data = result.data;
        }
      }

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedQuestion = data[randomIndex];
        console.log('✅ Pregunta seleccionada:', {
          id: selectedQuestion.id,
          categoria: selectedQuestion.category,
          dificultad: selectedQuestion.difficulty,
          pregunta: selectedQuestion.question_es.substring(0, 50) + '...'
        });
        setQuestion(selectedQuestion);
        setUsedQuestionIds([...usedQuestionIds, selectedQuestion.id]);
      } else {
        console.log('❌ No se encontraron preguntas con estos filtros');
      }
    } catch (error) {
      console.error('Error cargando preguntas:', error);
    }
    setLoading(false);
  };

  const handleTimeout = async () => {
    if (selectedAnswer || !question) return;

    const newIncorrect = incorrectAnswers + 1;
    const newLives = Math.max(lives - 1, 0);
    const newQuestionsAnswered = questionsAnswered + 1;
    const gameEnded = newLives === 0 || newQuestionsAnswered >= 7;

    setIncorrectAnswers(newIncorrect);
    setLives(newLives);
    setQuestionsAnswered(newQuestionsAnswered);

    // El puntaje final es el acumulado sin bonificaciones extras
    // Sistema: 45 puntos máximo / 7 preguntas = 6.4 puntos por pregunta correcta
    let finalScore = score;

    if (sessionId && supabase) {
      try {
        await supabase
          .from('game_sessions')
          .update({
            lives: newLives,
            score: finalScore,
            updated_at: new Date().toISOString(),
          })
          .eq('id', sessionId);
      } catch (error) {
        console.warn('Error actualizando sesión:', error);
      }
    }

    if (gameEnded) {
      const timePlayed = gameStartTime ? Math.floor((Date.now() - gameStartTime) / 1000) : 0;

      // Guardar en Supabase si está configurado
      if (sessionId && supabase) {
        try {
          const { data: sessionData } = await supabase
            .from('game_sessions')
            .select('games_played, best_score')
            .eq('id', sessionId)
            .maybeSingle();

          const gamesPlayed = (sessionData?.games_played || 0) + 1;
          const bestScore = Math.max(sessionData?.best_score || 0, finalScore);

          await supabase
            .from('game_sessions')
            .update({
              games_played: gamesPlayed,
              best_score: bestScore,
            })
            .eq('id', sessionId);

          await supabase
            .from('game_results')
            .insert({
              session_id: sessionId,
              player_name: playerName,
              student_number: '',
              grade: grade || '',
              score: finalScore,
              correct_answers: correctAnswers,
              incorrect_answers: newIncorrect,
              time_played: timePlayed,
            });
        } catch (error) {
          console.warn('Error guardando resultados en Supabase:', error);
        }
      }

      // Siempre guardar en localStorage (modo demo o respaldo)
      try {
        saveGameResult({
          player_name: playerName || 'Jugador',
          avatar: avatar || 'chapaquita',
          grade: grade || '',
          score: finalScore,
          correct_answers: correctAnswers,
          incorrect_answers: newIncorrect,
          time_played: timePlayed,
          difficulty,
        });

        saveGameSession({
          player_name: playerName || 'Jugador',
          avatar: avatar || 'chapaquita',
          grade: grade || '',
          best_score: finalScore,
          language,
          difficulty,
        });

        console.log('✅ Resultado guardado exitosamente');
      } catch (error) {
        console.warn('Error guardando en localStorage:', error);
      }

      setTimeout(() => {
        setScreen('welcome');
        setLives(5);
        setScore(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setQuestionsAnswered(0);
        setGameStartTime(null);
        setUsedQuestionIds([]);
      }, 3000);
    } else {
      setTimeout(() => {
        loadQuestion();
      }, 2000);
    }
  };

  // Función para reproducir sonido de respuesta correcta
  const playCorrectAnswerSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Crear una melodía ascendente de éxito (3 notas)
      const notes = [523.25, 659.25, 783.99]; // Do, Mi, Sol (C, E, G)
      const duration = 0.15; // Duración de cada nota
      
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        const startTime = audioContext.currentTime + (index * duration);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
      
      console.log('🎵 Reproduciendo sonido de respuesta correcta');
    } catch (error) {
      console.log('No se pudo reproducir sonido de éxito:', error);
    }
  };

  // Función para reproducir sonido de respuesta incorrecta
  const playIncorrectAnswerSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Crear un sonido descendente de error (2 notas graves)
      const notes = [392.00, 311.13]; // Sol, Mi bemol (G, Eb) - sonido de error
      const duration = 0.2; // Duración de cada nota
      
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Usar onda cuadrada para sonido más áspero (error)
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        const startTime = audioContext.currentTime + (index * duration);
        gainNode.gain.setValueAtTime(0.2, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
      
      console.log('❌ Reproduciendo sonido de respuesta incorrecta');
    } catch (error) {
      console.log('No se pudo reproducir sonido de error:', error);
    }
  };

  const handleAnswer = async (answer: 'a' | 'b' | 'c' | 'd') => {
    if (selectedAnswer || !question) return;

    setSelectedAnswer(answer);
    const correct = answer === question.correct_answer;
    setIsCorrect(correct);
    setShowResult(true);

    // Reproducir sonido según si la respuesta es correcta o incorrecta
    if (correct) {
      playCorrectAnswerSound();
    } else {
      playIncorrectAnswerSound();
    }

    const newCorrect = correct ? correctAnswers + 1 : correctAnswers;
    const newIncorrect = correct ? incorrectAnswers : incorrectAnswers + 1;
    setCorrectAnswers(newCorrect);
    setIncorrectAnswers(newIncorrect);

    const newLives = correct ? lives : Math.max(lives - 1, 0);
    const newQuestionsAnswered = questionsAnswered + 1;

    // Sistema de puntuación: 45 puntos dividido entre 7 preguntas
    // Cada pregunta correcta vale exactamente 45/7 puntos
    let pointsPerQuestion = 0;
    if (correct) {
      pointsPerQuestion = 45 / 7; // Aproximadamente 6.43 puntos por pregunta correcta
    }
    
    const newScore = score + pointsPerQuestion;
    setLives(newLives);
    setScore(newScore);

    // Verificamos si el juego terminó
    const gameEnded = newLives === 0 || newQuestionsAnswered >= 7;
    
    // El puntaje final es simplemente la suma de puntos por respuestas correctas
    // Sistema: 45 puntos máximo / 7 preguntas = 6.4 puntos por pregunta
    let finalScore = newScore;

    // Actualizamos la sesión en la base de datos
    if (sessionId && supabase) {
      try {
        await supabase
          .from('game_sessions')
          .update({
            lives: newLives,
            score: finalScore,
            updated_at: new Date().toISOString(),
          })
          .eq('id', sessionId);
      } catch (error) {
        console.warn('Error actualizando sesión:', error);
      }
    }

    if (gameEnded) {
      setQuestionsAnswered(newQuestionsAnswered);
      const timePlayed = gameStartTime ? Math.floor((Date.now() - gameStartTime) / 1000) : 0;

      // Guardar en Supabase si está configurado
      if (sessionId && supabase) {
        try {
          const { data: sessionData } = await supabase
            .from('game_sessions')
            .select('games_played, best_score')
            .eq('id', sessionId)
            .maybeSingle();

          const gamesPlayed = (sessionData?.games_played || 0) + 1;
          const bestScore = Math.max(sessionData?.best_score || 0, finalScore);

          await supabase
            .from('game_sessions')
            .update({
              games_played: gamesPlayed,
              best_score: bestScore,
            })
            .eq('id', sessionId);

          await supabase
            .from('game_results')
            .insert({
              session_id: sessionId,
              player_name: playerName,
              student_number: '',
              grade: grade || '',
              score: finalScore,
              correct_answers: newCorrect,
              incorrect_answers: newIncorrect,
              time_played: timePlayed,
            });
        } catch (error) {
          console.warn('Error guardando resultados en Supabase:', error);
        }
      }

      // Siempre guardar en localStorage (modo demo o respaldo)
      try {
        saveGameResult({
          player_name: playerName || 'Jugador',
          avatar: avatar || 'chapaquita',
          grade: grade || '',
          score: finalScore,
          correct_answers: newCorrect,
          incorrect_answers: newIncorrect,
          time_played: timePlayed,
          difficulty,
        });

        saveGameSession({
          player_name: playerName || 'Jugador',
          avatar: avatar || 'chapaquita',
          grade: grade || '',
          best_score: finalScore,
          language,
          difficulty,
        });

        console.log('✅ Resultado guardado exitosamente');
      } catch (error) {
        console.warn('Error guardando en localStorage:', error);
      }

      setTimeout(() => {
        setScreen('welcome');
        setLives(5);
        setScore(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setQuestionsAnswered(0);
        setGameStartTime(null);
        setUsedQuestionIds([]);
      }, 3000);
    } else {
      setTimeout(() => {
        setQuestionsAnswered(newQuestionsAnswered);
        loadQuestion();
      }, 2000);
    }
  };

  const handleContinue = () => {
    if (lives === 0 || questionsAnswered >= 7) {
      setScreen('welcome');
      setLives(5);
      setScore(0);
      setQuestionsAnswered(0);
      setUsedQuestionIds([]);
    } else {
      loadQuestion();
    }
  };

  if (loading || !question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center">
        <div className="text-3xl font-bold text-amber-900">Cargando...</div>
      </div>
    );
  }

  const questionText = language === 'es' ? question.question_es : question.question_en;
  const options = [
    {
      id: 'a' as const,
      text: language === 'es' ? question.option_a_es : question.option_a_en,
    },
    {
      id: 'b' as const,
      text: language === 'es' ? question.option_b_es : question.option_b_en,
    },
    {
      id: 'c' as const,
      text: language === 'es' ? question.option_c_es : question.option_c_en,
    },
  ];

  if (question.option_d_es && question.option_d_en) {
    options.push({
      id: 'd' as const,
      text: language === 'es' ? question.option_d_es : question.option_d_en,
    });
  }

  // Avatar images
  const avatarDisplay = avatar === 'eustaquio' ? (
    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-blue-300 bg-yellow-100">
      <img src={eustaquioAvatar} alt="Eustaquio Méndez" className="w-full h-full object-cover object-[center_20%]" />
    </div>
  ) : (
    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-pink-300 bg-yellow-100">
      <img src={chapaquitaAvatar} alt="Chapaquita" className="w-full h-full object-cover object-[center_10%]" />
    </div>
  );

  // Sistema de calificación: 45 puntos máximo / 7 preguntas
  // Cada pregunta correcta vale 6.4 puntos (45 ÷ 7 ≈ 6.43)
  const maxScore = 45;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-100 relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl">🌄</div>
        <div className="absolute top-20 right-20 text-6xl">🌳</div>
        <div className="absolute bottom-20 left-20 text-6xl">🌺</div>
        <div className="absolute bottom-10 right-10 text-6xl">🦜</div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-amber-300 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 mb-1">Curso</p>
              <p className="text-lg font-bold text-blue-600">
                {t[`grade${grade}` as keyof typeof t] || grade}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 mb-1">Nivel</p>
              <p className="text-lg font-bold text-purple-600">
                {difficulty === 'facil' ? 'Fácil' : difficulty === 'intermedio' ? 'Intermedio' : 'Difícil'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 mb-1">Preguntas</p>
              <p className="text-lg font-bold text-green-600">{questionsAnswered}/7</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 mb-1">Correctas</p>
              <p className="text-lg font-bold text-emerald-600">{correctAnswers}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-amber-300">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-amber-900">{gt.lives}:</span>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-6 h-6 ${
                      i < lives ? 'fill-red-500 text-red-500' : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-blue-300">
            <span className="font-bold text-blue-900">⏱️ </span>
            <span className="text-2xl font-bold text-blue-600">{timeLeft}s</span>
          </div>

          <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-amber-300">
            <span className="font-bold text-amber-900">{gt.score}: </span>
            <span className="text-2xl font-bold text-amber-600">{Math.round(score * 10) / 10}/{maxScore}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-300 mb-8">
          <div className="flex items-center justify-center mb-6">
            {avatarDisplay}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                {gt.categories[currentCategory as keyof typeof gt.categories]}
              </div>
              <div className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                Pregunta {questionsAnswered + 1}/7
              </div>
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">{questionText}</h2>
          </div>

          <div className="space-y-4">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrectAnswer = question.correct_answer === option.id;
              const showCorrect = showResult && isCorrectAnswer;
              const showIncorrect = showResult && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-102 flex items-center justify-between ${
                    showCorrect
                      ? 'bg-green-500 text-white shadow-lg'
                      : showIncorrect
                      ? 'bg-red-500 text-white shadow-lg'
                      : isSelected
                      ? 'bg-amber-300 text-amber-900'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span>{option.text}</span>
                  {showCorrect && <CheckCircle className="w-6 h-6" />}
                  {showIncorrect && <XCircle className="w-6 h-6" />}
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (lives === 0 || questionsAnswered >= 7) && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-300 text-center animate-fade-in">
            {questionsAnswered >= 7 ? (
              <div>
                <div className="text-6xl mb-4">🎊</div>
                <h3 className="text-3xl font-bold mb-4 text-purple-600">
                  {correctAnswers === 7 ? '¡Excelente trabajo!' : correctAnswers >= 5 ? '¡Muy bien!' : correctAnswers >= 3 ? '¡Buen intento!' : '¡Sigue practicando!'}
                </h3>
                <p className="text-xl text-amber-900 mb-4">
                  {correctAnswers === 7 ? 'Dominas el tema perfectamente - ¡7 de 7 correctas!' : correctAnswers >= 5 ? 'Tienes un buen conocimiento del tema' : correctAnswers >= 3 ? 'Vas por buen camino' : 'La práctica te ayudará a mejorar'}
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <p className="text-lg font-semibold text-gray-700 mb-2">Tu Calificación</p>
                  <p className="text-5xl font-bold text-purple-600 mb-2">{Math.round(score * 10) / 10}/{maxScore}</p>
                  <p className="text-sm text-gray-600 mb-2">Sobre 45 puntos (7 preguntas)</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-green-600">{correctAnswers}</span> correctas
                    </div>
                    <div>•</div>
                    <div>
                      <span className="font-semibold text-red-600">{incorrectAnswers}</span> incorrectas
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  {qt.playAgain}
                </button>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-3xl font-bold mb-4 text-red-600">
                  {qt.gameOver}
                </h3>
                <p className="text-xl text-amber-900 mb-4">Te quedaste sin vidas</p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <p className="text-lg font-semibold text-gray-700 mb-2">Tu Calificación</p>
                  <p className="text-5xl font-bold text-purple-600 mb-2">{Math.round(score * 10) / 10}/{maxScore}</p>
                  <p className="text-sm text-gray-600 mb-2">Sobre 45 puntos (7 preguntas)</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-green-600">{correctAnswers}</span> correctas
                    </div>
                    <div>•</div>
                    <div>
                      <span className="font-semibold text-red-600">{incorrectAnswers}</span> incorrectas
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  {qt.playAgain}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
