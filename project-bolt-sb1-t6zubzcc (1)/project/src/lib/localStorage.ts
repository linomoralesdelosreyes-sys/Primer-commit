// Sistema de almacenamiento local para el modo demo
export interface LocalGameResult {
  id: string;
  player_name: string;
  avatar: 'chapaquita' | 'eustaquio';
  grade: string;
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  time_played: number;
  difficulty: 'facil' | 'intermedio' | 'dificil';
  created_at: string;
}

export interface LocalGameSession {
  id: string;
  player_name: string;
  avatar: 'chapaquita' | 'eustaquio';
  grade: string;
  games_played: number;
  best_score: number;
  best_score_facil: number;
  best_score_intermedio: number;
  best_score_dificil: number;
  language: 'es' | 'en';
  difficulty: 'facil' | 'intermedio' | 'dificil';
  created_at: string;
  updated_at: string;
}

const RESULTS_KEY = 'game_results';
const SESSION_KEY = 'game_session';

// Guardar resultado del juego
export function saveGameResult(result: Omit<LocalGameResult, 'id' | 'created_at'>): LocalGameResult {
  const results = getGameResults();
  const newResult: LocalGameResult = {
    ...result,
    id: `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  results.push(newResult);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  return newResult;
}

// Obtener todos los resultados
export function getGameResults(): LocalGameResult[] {
  try {
    const data = localStorage.getItem(RESULTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Obtener resultados filtrados por grado
export function getResultsByGrade(grade?: string): LocalGameResult[] {
  const results = getGameResults();
  if (!grade) return results;
  return results.filter(r => r.grade === grade);
}

// Guardar o actualizar sesión
export function saveGameSession(session: Omit<LocalGameSession, 'id' | 'created_at' | 'updated_at'>): LocalGameSession {
  const existingSession = getGameSession();
  
  if (existingSession && existingSession.player_name === session.player_name) {
    // Actualizar sesión existente
    const updatedSession: LocalGameSession = {
      ...existingSession,
      ...session,
      games_played: existingSession.games_played + 1,
      best_score: Math.max(existingSession.best_score, session.best_score),
      updated_at: new Date().toISOString(),
    };
    
    // Actualizar mejor puntaje por dificultad
    if (session.difficulty === 'facil') {
      updatedSession.best_score_facil = Math.max(existingSession.best_score_facil || 0, session.best_score);
    } else if (session.difficulty === 'intermedio') {
      updatedSession.best_score_intermedio = Math.max(existingSession.best_score_intermedio || 0, session.best_score);
    } else if (session.difficulty === 'dificil') {
      updatedSession.best_score_dificil = Math.max(existingSession.best_score_dificil || 0, session.best_score);
    }
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
    return updatedSession;
  } else {
    // Crear nueva sesión
    const newSession: LocalGameSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      games_played: 1,
      best_score: session.best_score,
      best_score_facil: session.difficulty === 'facil' ? session.best_score : 0,
      best_score_intermedio: session.difficulty === 'intermedio' ? session.best_score : 0,
      best_score_dificil: session.difficulty === 'dificil' ? session.best_score : 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    return newSession;
  }
}

// Obtener sesión actual
export function getGameSession(): LocalGameSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Obtener estadísticas del jugador
export function getPlayerStats(playerName: string): {
  gamesPlayed: number;
  bestScore: number;
  bestScoreFacil: number;
  bestScoreIntermedio: number;
  bestScoreDificil: number;
  totalCorrect: number;
  totalIncorrect: number;
} {
  const results = getGameResults().filter(r => r.player_name === playerName);
  const session = getGameSession();
  
  return {
    gamesPlayed: session?.games_played || 0,
    bestScore: session?.best_score || 0,
    bestScoreFacil: session?.best_score_facil || 0,
    bestScoreIntermedio: session?.best_score_intermedio || 0,
    bestScoreDificil: session?.best_score_dificil || 0,
    totalCorrect: results.reduce((sum, r) => sum + r.correct_answers, 0),
    totalIncorrect: results.reduce((sum, r) => sum + r.incorrect_answers, 0),
  };
}

// Limpiar todos los datos (para reiniciar)
export function clearAllGameData(): void {
  localStorage.removeItem(RESULTS_KEY);
  localStorage.removeItem(SESSION_KEY);
}

// Obtener top 10 puntajes
export function getTopScores(limit: number = 10, grade?: string): LocalGameResult[] {
  let results = getGameResults();
  
  if (grade) {
    results = results.filter(r => r.grade === grade);
  }
  
  return results
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, limit);
}

