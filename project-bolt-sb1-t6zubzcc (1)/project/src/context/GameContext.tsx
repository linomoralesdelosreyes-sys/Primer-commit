import { createContext, useContext, useState, ReactNode } from 'react';

type Avatar = 'chapaquita' | 'eustaquio' | null;
type Language = 'es' | 'en';
type Screen = 'welcome' | 'avatars' | 'settings' | 'game' | 'quiz' | 'biblioteca' | 'achievements';
type Grade = '2p' | '3p' | '4p' | '5p' | '6p' | '1s' | '2s' | '3s' | '4s' | '5s' | '6s' | null;
type Difficulty = 'facil' | 'intermedio' | 'dificil';

interface GameContextType {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  avatar: Avatar;
  setAvatar: (avatar: Avatar) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  lives: number;
  setLives: (lives: number) => void;
  score: number;
  setScore: (score: number) => void;
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  currentCategory: string | null;
  setCurrentCategory: (category: string | null) => void;
  grade: Grade;
  setGrade: (grade: Grade) => void;
  correctAnswers: number;
  setCorrectAnswers: (count: number) => void;
  incorrectAnswers: number;
  setIncorrectAnswers: (count: number) => void;
  gameStartTime: number | null;
  setGameStartTime: (time: number | null) => void;
  questionsAnswered: number;
  setQuestionsAnswered: (count: number) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  bestScoreFacil: number;
  setBestScoreFacil: (score: number) => void;
  usedQuestionIds: number[];
  setUsedQuestionIds: (ids: number[]) => void;
  lastCategory: string | null;
  setLastCategory: (category: string | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [avatar, setAvatar] = useState<Avatar>(null);
  const [playerName, setPlayerName] = useState('');
  const [language, setLanguage] = useState<Language>('es');
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [grade, setGrade] = useState<Grade>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('facil');
  const [bestScoreFacil, setBestScoreFacil] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const [lastCategory, setLastCategory] = useState<string | null>(null);

  return (
    <GameContext.Provider
      value={{
        screen,
        setScreen,
        avatar,
        setAvatar,
        playerName,
        setPlayerName,
        language,
        setLanguage,
        lives,
        setLives,
        score,
        setScore,
        sessionId,
        setSessionId,
        currentCategory,
        setCurrentCategory,
        grade,
        setGrade,
        correctAnswers,
        setCorrectAnswers,
        incorrectAnswers,
        setIncorrectAnswers,
        gameStartTime,
        setGameStartTime,
        questionsAnswered,
        setQuestionsAnswered,
        difficulty,
        setDifficulty,
        bestScoreFacil,
        setBestScoreFacil,
        usedQuestionIds,
        setUsedQuestionIds,
        lastCategory,
        setLastCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
