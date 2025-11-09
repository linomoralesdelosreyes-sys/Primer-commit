import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { translations } from '../translations';
import { ArrowLeft, Save } from 'lucide-react';

export function SettingsScreen() {
  const { setScreen, playerName, setPlayerName, language, setLanguage, difficulty, setDifficulty } = useGame();
  const [tempName, setTempName] = useState(playerName);
  const [tempLanguage, setTempLanguage] = useState(language);
  const [tempDifficulty, setTempDifficulty] = useState(difficulty);
  const t = translations[tempLanguage].settings;

  const handleSave = () => {
    setPlayerName(tempName);
    setLanguage(tempLanguage);
    setDifficulty(tempDifficulty);
    setScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <button
          onClick={() => setScreen('welcome')}
          className="mb-8 flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">{t.back}</span>
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-amber-200">
          <h1 className="text-4xl font-bold text-amber-900 text-center mb-8">
            {t.title}
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-amber-900 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-amber-900 mb-2">
                {t.language}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTempLanguage('es')}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    tempLanguage === 'es'
                      ? 'bg-amber-500 text-white shadow-lg scale-105'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {t.spanish}
                </button>
                <button
                  onClick={() => setTempLanguage('en')}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    tempLanguage === 'en'
                      ? 'bg-amber-500 text-white shadow-lg scale-105'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {t.english}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-amber-900 mb-2">
                {t.difficulty || "Dificultad"}
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setTempDifficulty('facil')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all flex flex-col items-center ${
                    tempDifficulty === 'facil'
                      ? 'bg-amber-500 text-white shadow-lg scale-105'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  <img src="/espada-transparente.png" alt="Espada Fácil" className="h-20 mb-2" />
                  {t.easy || "Fácil"}
                </button>
                <button
                  onClick={() => setTempDifficulty('intermedio')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all flex flex-col items-center ${
                    tempDifficulty === 'intermedio'
                      ? 'bg-amber-500 text-white shadow-lg scale-105'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  <img src="/espada-plateada.png" alt="Espada Intermedia" className="h-20 mb-2" />
                  {t.medium || "Intermedio"}
                </button>
                <button
                  onClick={() => setTempDifficulty('dificil')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all flex flex-col items-center ${
                    tempDifficulty === 'dificil'
                      ? 'bg-amber-500 text-white shadow-lg scale-105'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  <img src="/espada-dorada.png" alt="Espada Difícil" className="h-20 mb-2" />
                  {t.hard || "Difícil"}
                </button>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{t.save}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
