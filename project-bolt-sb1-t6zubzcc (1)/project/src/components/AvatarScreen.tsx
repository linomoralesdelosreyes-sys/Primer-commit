import { useGame } from '../context/GameContext';
import { translations } from '../translations';
import { ArrowLeft, Check } from 'lucide-react';
import chapaquitaAvatar from '../assets/Image 27.png';
import eustaquioAvatar from '../assets/Image 24.png';

export function AvatarScreen() {
  const { setScreen, avatar, setAvatar, language } = useGame();
  const t = translations[language].avatars;

  const handleSelect = (selectedAvatar: 'chapaquita' | 'eustaquio') => {
    setAvatar(selectedAvatar);
    setTimeout(() => setScreen('welcome'), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <button
          onClick={() => setScreen('welcome')}
          className="mb-8 flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">{t.back}</span>
        </button>

        <h1 className="text-5xl font-bold text-amber-900 text-center mb-12">
          {t.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => handleSelect('chapaquita')}
            className={`relative group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 ${
              avatar === 'chapaquita'
                ? 'border-green-500 bg-green-50'
                : 'border-amber-200 hover:border-amber-400'
            }`}
          >
            {avatar === 'chapaquita' && (
              <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex flex-col items-center space-y-6">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-pink-300 bg-yellow-100">
                <img 
                  src={chapaquitaAvatar} 
                  alt="Chapaquita" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h2 className="text-3xl font-bold text-amber-900">{t.chapaquita}</h2>
              <span className="text-sm text-amber-700 font-semibold bg-amber-100 px-4 py-2 rounded-full">
                {t.select}
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSelect('eustaquio')}
            className={`relative group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 ${
              avatar === 'eustaquio'
                ? 'border-green-500 bg-green-50'
                : 'border-amber-200 hover:border-amber-400'
            }`}
          >
            {avatar === 'eustaquio' && (
              <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex flex-col items-center space-y-6">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-blue-300 bg-yellow-100">
                <img 
                  src={eustaquioAvatar} 
                  alt="Eustaquio Méndez" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h2 className="text-3xl font-bold text-amber-900">{t.eustaquio}</h2>
              <span className="text-sm text-amber-700 font-semibold bg-amber-100 px-4 py-2 rounded-full">
                {t.select}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
