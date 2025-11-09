import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { translations } from '../translations';
import { getGameSession } from '../lib/localStorage';
import { Settings, Check, ChevronDown, Trophy, Lock } from 'lucide-react';
import logoImage from '../assets/image.png';
import chapaquitaAvatar from '../assets/Image 27.png';
import eustaquioAvatar from '../assets/Image 24.png';

export function WelcomeScreen() {
  const {
    setScreen,
    language,
    setLanguage,
    playerName,
    setPlayerName,
    grade,
    setGrade,
    avatar,
    setAvatar,
    difficulty,
    setDifficulty,
    bestScoreFacil,
    setBestScoreFacil,
  } = useGame();
  const t = translations[language].welcome;
  const [localName, setLocalName] = useState(playerName);
  const [isGradeOpen, setIsGradeOpen] = useState(false);

  const primaryGrades = ['2p', '3p', '4p', '5p', '6p'];
  const secondaryGrades = ['1s', '2s', '3s', '4s', '5s', '6s'];

  // Cargar mejor puntaje desde localStorage
  useEffect(() => {
    const session = getGameSession();
    if (session && session.best_score_facil) {
      setBestScoreFacil(session.best_score_facil);
    }
  }, []);

  const handleStartGame = () => {
    if (localName.trim() && grade && avatar) {
      setPlayerName(localName.trim());
      setScreen('game');
    }
  };

  const canStart = localName.trim().length > 0 && grade !== null && avatar !== null;
  // Desbloquear todos los niveles para modo demo
  const isMediumUnlocked = true; // bestScoreFacil >= 400;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      <div className="max-w-2xl mx-auto p-6 pb-48">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setScreen('achievements')}
            className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full p-3 shadow-md hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
          >
            <Trophy className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          {/* Logo del videojuego */}
          <div className="w-72 h-72 mb-4 flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="Logo Conociendo Méndez" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <p className="text-sm text-gray-600 text-center">{t.title}</p>
          <h1 className="text-2xl font-bold text-gray-800 text-center">{t.subtitle}</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t.yourName}
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder={t.namePlaceholder}
              maxLength={20}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none text-lg"
            />
            <p className="text-right text-xs text-gray-400 mt-1">
              {localName.length}/20
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t.gradeLevel}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGradeOpen(!isGradeOpen)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none text-lg text-left flex items-center justify-between"
              >
                <span className={grade ? 'text-gray-800' : 'text-gray-400'}>
                  {grade ? t[`grade${grade}` as keyof typeof t] : t.selectGrade}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isGradeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isGradeOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="mb-2">
                      <p className="px-3 py-2 text-xs font-bold text-gray-500">{t.primary}</p>
                      {primaryGrades.map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            setGrade(g as any);
                            setIsGradeOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                            grade === g
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {t[`grade${g}` as keyof typeof t]}
                        </button>
                      ))}
                    </div>

                    <div>
                      <p className="px-3 py-2 text-xs font-bold text-gray-500">{t.secondary}</p>
                      {secondaryGrades.map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            setGrade(g as any);
                            setIsGradeOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                            grade === g
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {t[`grade${g}` as keyof typeof t]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t.chooseDifficulty}</h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setDifficulty('facil')}
                className={`relative rounded-xl p-4 transition-all border-3 ${
                  difficulty === 'facil'
                    ? 'border-green-400 bg-green-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                {difficulty === 'facil' && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-5xl">⭐</div>
                  <span className="font-bold text-gray-800 text-sm">{t.easy}</span>
                </div>
              </button>

              <button
                onClick={() => isMediumUnlocked && setDifficulty('intermedio')}
                disabled={!isMediumUnlocked}
                className={`relative rounded-xl p-4 transition-all border-3 ${
                  !isMediumUnlocked
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-60'
                    : difficulty === 'intermedio'
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-yellow-300 hover:bg-yellow-50'
                }`}
              >
                {!isMediumUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 rounded-xl">
                    <Lock className="w-8 h-8 text-gray-600" />
                  </div>
                )}
                {difficulty === 'intermedio' && isMediumUnlocked && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex gap-1 text-4xl">
                    ⭐⭐
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{t.medium}</span>
                </div>
              </button>

              <button
                onClick={() => setDifficulty('dificil')}
                className={`relative rounded-xl p-4 transition-all border-3 ${
                  difficulty === 'dificil'
                    ? 'border-red-400 bg-red-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                {difficulty === 'dificil' && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex gap-1 text-3xl">
                    ⭐⭐⭐
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{t.hard}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t.chooseAvatar}</h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAvatar('chapaquita')}
                className={`relative group rounded-2xl p-6 transition-all border-4 ${
                  avatar === 'chapaquita'
                    ? 'border-pink-400 bg-pink-50 shadow-xl scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                {avatar === 'chapaquita' && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-pink-200 bg-yellow-100">
                    <img 
                      src={chapaquitaAvatar} 
                      alt="Mujer" 
                      className="w-full h-full object-cover object-[center_10%]"
                    />
                  </div>
                  <span className="font-bold text-gray-800">Mujer</span>
                </div>
              </button>

              <button
                onClick={() => setAvatar('eustaquio')}
                className={`relative group rounded-2xl p-6 transition-all border-4 ${
                  avatar === 'eustaquio'
                    ? 'border-blue-400 bg-blue-50 shadow-xl scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {avatar === 'eustaquio' && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-blue-200 bg-yellow-100">
                    <img 
                      src={eustaquioAvatar} 
                      alt="Varón" 
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <span className="font-bold text-gray-800">Varón</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent p-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <button
            onClick={handleStartGame}
            disabled={!canStart}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all transform ${
              canStart
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t.startGame}
          </button>
          <button
            onClick={() => setScreen('biblioteca')}
            className="w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all transform bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-105 active:scale-95"
          >
            Biblioteca Mendeña
          </button>
        </div>
      </div>
    </div>
  );
}
