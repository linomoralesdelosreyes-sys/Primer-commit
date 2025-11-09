import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Trophy, Award, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getGameSession, getTopScores } from '../lib/localStorage';

interface GameResult {
  id: string;
  player_name: string;
  student_number: string;
  grade: string;
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  time_played: number;
  created_at: string;
}

export function AchievementsScreen() {
  const { setScreen, playerName, sessionId, grade, language } = useGame();
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [results, setResults] = useState<GameResult[]>([]);
  const [showAllGrades, setShowAllGrades] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  const gradeOptions = [
    { value: '1p', label: '1° Primaria' },
    { value: '2p', label: '2° Primaria' },
    { value: '3p', label: '3° Primaria' },
    { value: '4p', label: '4° Primaria' },
    { value: '5p', label: '5° Primaria' },
    { value: '6p', label: '6° Primaria' },
    { value: '1s', label: '1° Secundaria' },
    { value: '2s', label: '2° Secundaria' },
    { value: '3s', label: '3° Secundaria' },
    { value: '4s', label: '4° Secundaria' },
    { value: '5s', label: '5° Secundaria' },
    { value: '6s', label: '6° Secundaria' },
  ];

  useEffect(() => {
    loadStats();
  }, [sessionId, showAllGrades, selectedGrade]);

  const loadStats = async () => {
    setLoading(true);

    try {
      // Modo demo sin Supabase - usar localStorage
      if (!supabase) {
        const session = getGameSession();
        
        if (session) {
          setGamesPlayed(session.games_played || 0);
          setBestScore(session.best_score || 0);
        } else {
          setGamesPlayed(0);
          setBestScore(0);
        }

        // Obtener resultados del localStorage
        const gradeToFilter = selectedGrade || (!showAllGrades && grade ? grade : undefined);
        const localResults = getTopScores(50, gradeToFilter);
        
        setResults(localResults as any[]);
        setLoading(false);
        return;
      }

      if (sessionId) {
        const { data: sessionData } = await supabase
          .from('game_sessions')
          .select('games_played, best_score')
          .eq('id', sessionId)
          .maybeSingle();

        if (sessionData) {
          setGamesPlayed(sessionData.games_played || 0);
          setBestScore(sessionData.best_score || 0);
        }
      }

      let query = supabase
        .from('game_results')
        .select('*')
        .order('score', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedGrade) {
        query = query.eq('grade', selectedGrade);
      } else if (!showAllGrades && grade) {
        query = query.eq('grade', grade);
      }

      const { data: resultsData } = await query.limit(50);

      if (resultsData) {
        setResults(resultsData);
      }
    } catch (error) {
      console.warn('Error cargando estadísticas:', error);
    }

    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const t = language === 'es'
    ? {
        title: 'Logros',
        welcome: '¡Hola',
        gamesPlayed: 'Partidas Jugadas',
        bestScore: 'Mejor Puntaje',
        viewAll: 'Ver Resultados de Todos los Cursos',
        viewMyGrade: 'Ver Solo Mi Curso',
        table: {
          user: 'Usuario',
          score: 'Puntaje',
          level: 'Nivel',
          correct: 'Correctas',
          incorrect: 'Incorrectas',
          time: 'Tiempo',
        },
        noResults: 'No hay resultados todavía',
      }
    : {
        title: 'Achievements',
        welcome: 'Hello',
        gamesPlayed: 'Games Played',
        bestScore: 'Best Score',
        viewAll: 'View Results from All Grades',
        viewMyGrade: 'View Only My Grade',
        table: {
          user: 'User',
          score: 'Score',
          level: 'Level',
          correct: 'Correct',
          incorrect: 'Incorrect',
          time: 'Time',
        },
        noResults: 'No results yet',
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setScreen('welcome')}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 ml-4 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-500" />
            {t.title}
          </h1>
        </div>

        <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl p-8 shadow-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                {t.welcome} {playerName}!
              </h2>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-white/80 text-sm font-semibold">{t.gamesPlayed}</p>
                  <p className="text-4xl font-bold text-white">{gamesPlayed}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-white/80 text-sm font-semibold">{t.bestScore}</p>
                  <p className="text-4xl font-bold text-white">{bestScore}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Award className="w-32 h-32 text-white/30" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <button
            onClick={() => {
              setShowAllGrades(!showAllGrades);
              setSelectedGrade(null);
            }}
            className="w-full py-4 rounded-2xl font-bold text-lg shadow-md transition-all transform bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-105 active:scale-95"
          >
            {showAllGrades ? t.viewMyGrade : t.viewAll}
          </button>

          {showAllGrades && (
            <div className="mt-4 relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full py-4 px-6 rounded-2xl font-semibold text-lg shadow-md transition-all transform bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center justify-between"
              >
                <span>
                  {selectedGrade
                    ? gradeOptions.find(g => g.value === selectedGrade)?.label
                    : 'Seleccionar Curso'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-xl border-2 border-gray-200 max-h-96 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedGrade(null);
                      setShowDropdown(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 font-semibold text-gray-700"
                  >
                    Todos los Cursos
                  </button>
                  {gradeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedGrade(option.value);
                        setShowDropdown(false);
                      }}
                      className={`w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 ${
                        selectedGrade === option.value ? 'bg-blue-100 font-bold text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-500 to-yellow-500">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">#</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">{t.table.user}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">{t.table.score}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">{t.table.level}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">{t.table.correct}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">{t.table.incorrect}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-white">{t.table.time}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      Cargando...
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      {t.noResults}
                    </td>
                  </tr>
                ) : (
                  results.map((result, index) => (
                    <tr
                      key={result.id}
                      className={`border-b border-gray-100 hover:bg-amber-50 transition-colors ${
                        index < 3 ? 'bg-amber-50/50' : ''
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {index === 0 && <span className="text-2xl">🥇</span>}
                          {index === 1 && <span className="text-2xl">🥈</span>}
                          {index === 2 && <span className="text-2xl">🥉</span>}
                          {index > 2 && <span className="text-gray-600 font-semibold">{index + 1}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{result.player_name}</td>
                      <td className="px-4 py-4">
                        <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
                          {result.score}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-semibold">{result.grade}</td>
                      <td className="px-4 py-4 text-green-600 font-semibold">{result.correct_answers}</td>
                      <td className="px-4 py-4 text-red-600 font-semibold">{result.incorrect_answers}</td>
                      <td className="px-4 py-4 text-gray-600 font-mono">{formatTime(result.time_played)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
