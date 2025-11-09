import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { translations } from '../translations';
import { supabase } from '../lib/supabase';
import chapaquitaAvatar from '../assets/Image 27.png';
import eustaquioAvatar from '../assets/Image 24.png';

const categories = ['musica', 'historia', 'fauna', 'flora'];
const categoryColors = {
  musica: '#8B5CF6',
  historia: '#EF4444',
  fauna: '#F59E0B',
  flora: '#10B981',
};

export function SpinningWheel() {
  const {
    language,
    avatar,
    lives,
    score,
    setScreen,
    setCurrentCategory,
    playerName,
    sessionId,
    setSessionId,
    setGameStartTime,
    grade,
    setUsedQuestionIds,
    lastCategory,
    setLastCategory,
  } = useGame();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const t = translations[language].game;

  // Función para reproducir sonido de ruleta girando - estilo silbido agudo
  const playSpinSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 4; // Duración total en segundos
      
      // Filtro paso alto para mantener tonos agudos/finos
      const filter = audioContext.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, audioContext.currentTime);
      filter.Q.setValueAtTime(1.5, audioContext.currentTime);
      
      // Nodo de ganancia principal
      const masterGain = audioContext.createGain();
      
      // Conexión: osciladores -> filtro -> ganancia -> salida
      filter.connect(masterGain);
      masterGain.connect(audioContext.destination);
      
      // Volumen principal con fade in y fade out suave
      masterGain.gain.setValueAtTime(0, audioContext.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.15); // Fade in rápido
      masterGain.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 3); // Mantener
      masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration); // Fade out
      
      // Oscilador principal - tono agudo como silbido
      const oscillator1 = audioContext.createOscillator();
      oscillator1.type = 'sine'; // Onda senoidal para sonido fino
      oscillator1.frequency.setValueAtTime(2400, audioContext.currentTime); // Frecuencia aguda inicial
      oscillator1.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + duration); // Desciende pero se mantiene agudo
      oscillator1.connect(filter);
      oscillator1.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + duration);
      
      // Oscilador secundario - armónico agudo adicional
      const oscillator2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(3600, audioContext.currentTime); // Octava superior
      oscillator2.frequency.exponentialRampToValueAtTime(1800, audioContext.currentTime + duration);
      gain2.gain.setValueAtTime(0.3, audioContext.currentTime); // Más sutil
      oscillator2.connect(gain2);
      gain2.connect(filter);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + duration);
      
      // LFO para vibrato (efecto de trino de pájaro)
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(6, audioContext.currentTime); // Vibrato rápido
      lfo.frequency.linearRampToValueAtTime(3, audioContext.currentTime + duration); // Se hace más lento
      lfoGain.gain.setValueAtTime(40, audioContext.currentTime); // Profundidad de vibrato
      lfoGain.gain.linearRampToValueAtTime(20, audioContext.currentTime + duration);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator1.frequency); // Modula el oscilador principal
      lfo.start(audioContext.currentTime);
      lfo.stop(audioContext.currentTime + duration);
      
      // Oscilador terciario para brillo adicional
      const oscillator3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      oscillator3.type = 'triangle'; // Onda triangular para tono más brillante
      oscillator3.frequency.setValueAtTime(1800, audioContext.currentTime);
      oscillator3.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + duration);
      gain3.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain3.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + duration);
      oscillator3.connect(gain3);
      gain3.connect(filter);
      oscillator3.start(audioContext.currentTime);
      oscillator3.stop(audioContext.currentTime + duration);
      
      console.log('🎵 Reproduciendo sonido de ruleta (estilo silbido agudo)');
      
    } catch (error) {
      console.log('No se pudo reproducir sonido:', error);
    }
  };

  const handleSpin = async () => {
    if (spinning) return;

    setUsedQuestionIds([]);

    if (!sessionId && supabase) {
      try {
        const { data, error } = await supabase
          .from('game_sessions')
          .insert({
            player_name: playerName || 'Player',
            avatar: avatar || 'chapaquita',
            lives,
            score,
            language,
            grade: grade || '',
            games_played: 0,
            best_score: 0,
          })
          .select()
          .maybeSingle();

        if (data && !error) {
          setSessionId(data.id);
          setGameStartTime(Date.now());
        }
      } catch (error) {
        console.warn('Error creando sesión, continuando sin guardar:', error);
        setGameStartTime(Date.now());
      }
    } else {
      setGameStartTime(Date.now());
    }

    setSpinning(true);
    
    // Reproducir sonido de ruleta
    playSpinSound();
    
    const extraSpins = 5;

    let availableCategories = categories;
    if (lastCategory) {
      availableCategories = categories.filter(cat => cat !== lastCategory);
    }

    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    const selectedCategory = availableCategories[randomIndex];
    const actualIndex = categories.indexOf(selectedCategory);

    const degreesPerSegment = 360 / categories.length;
    const targetRotation = 360 * extraSpins + (actualIndex * degreesPerSegment) + (degreesPerSegment / 2);

    setRotation(rotation + targetRotation);

    setTimeout(() => {
      setSpinning(false);
      console.log('🎯 Categoría seleccionada en ruleta:', selectedCategory);
      setCurrentCategory(selectedCategory);
      setLastCategory(selectedCategory);
      setScreen('quiz');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl">🌄</div>
        <div className="absolute top-20 right-20 text-6xl">🌳</div>
        <div className="absolute bottom-20 left-20 text-6xl">🌺</div>
        <div className="absolute bottom-10 right-10 text-6xl">🦜</div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end items-center mb-8">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-amber-300">
              <span className="font-bold text-amber-900">{t.score}: </span>
              <span className="text-2xl font-bold text-amber-600">45 pt</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-[450px] h-[550px] mb-8">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
                <svg width="40" height="60" viewBox="0 0 40 60">
                  <defs>
                    <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <filter id="pointerShadow">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.4"/>
                    </filter>
                  </defs>
                  <path
                    d="M 20 55 L 10 15 L 20 5 L 30 15 Z"
                    fill="url(#pointerGradient)"
                    stroke="#8B4513"
                    strokeWidth="2"
                    filter="url(#pointerShadow)"
                  />
                </svg>
              </div>

              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <svg width="450" height="500" viewBox="0 0 450 500">
                  <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="12" stdDeviation="12" floodOpacity="0.4"/>
                    </filter>
                    <radialGradient id="outerRing">
                      <stop offset="0%" stopColor="#A0522D" />
                      <stop offset="50%" stopColor="#8B4513" />
                      <stop offset="100%" stopColor="#654321" />
                    </radialGradient>
                    <radialGradient id="centerGradient">
                      <stop offset="0%" stopColor="#D2691E" />
                      <stop offset="50%" stopColor="#A0522D" />
                      <stop offset="100%" stopColor="#8B4513" />
                    </radialGradient>
                    <linearGradient id="standGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8B4513" />
                      <stop offset="50%" stopColor="#654321" />
                      <stop offset="100%" stopColor="#4A2511" />
                    </linearGradient>
                  </defs>

                  <ellipse cx="225" cy="495" rx="80" ry="8" fill="#4A2511" opacity="0.3" />

                  <path d="M 185 440 L 195 490 L 255 490 L 265 440 Z" fill="url(#standGradient)" stroke="#4A2511" strokeWidth="2" />
                  <rect x="195" y="490" width="60" height="10" rx="3" fill="#4A2511" />

                  <circle cx="225" cy="225" r="215" fill="url(#outerRing)" filter="url(#shadow)" />

                  <g
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: '225px 225px',
                      transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                    }}
                  >
                    {categories.map((category, index) => {
                      const segmentAngle = 360 / categories.length;
                      const startAngle = index * segmentAngle - 90;
                      const endAngle = startAngle + segmentAngle;

                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;

                      const x1 = 225 + 190 * Math.cos(startRad);
                      const y1 = 225 + 190 * Math.sin(startRad);
                      const x2 = 225 + 190 * Math.cos(endRad);
                      const y2 = 225 + 190 * Math.sin(endRad);

                      const largeArc = segmentAngle > 180 ? 1 : 0;

                      const textAngle = startAngle + segmentAngle / 2;
                      const textRad = (textAngle * Math.PI) / 180;
                      const textX = 225 + 120 * Math.cos(textRad);
                      const textY = 225 + 120 * Math.sin(textRad);

                      const baseColor = categoryColors[category as keyof typeof categoryColors];

                      return (
                        <g key={category}>
                          <path
                            d={`M 225 225 L ${x1} ${y1} A 190 190 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={baseColor}
                            stroke="#8B4513"
                            strokeWidth="2"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill="white"
                            fontSize="22"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                            style={{
                              textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                              textTransform: 'uppercase',
                              letterSpacing: '2px'
                            }}
                          >
                            {t.categories[category as keyof typeof t.categories]}
                          </text>
                        </g>
                      );
                    })}

                  </g>

                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45 - 90) * (Math.PI / 180);
                    const x = 225 + 205 * Math.cos(angle);
                    const y = 225 + 205 * Math.sin(angle);
                    return (
                      <circle key={i} cx={x} cy={y} r="10" fill="#F9C74F" stroke="#8B4513" strokeWidth="2" />
                    );
                  })}

                  <circle cx="225" cy="225" r="60" fill="url(#centerGradient)" stroke="#8B4513" strokeWidth="3" />
                  <circle cx="225" cy="225" r="45" fill="#A0522D" stroke="#654321" strokeWidth="2" />
                  <circle cx="225" cy="225" r="30" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />
                  <circle cx="225" cy="225" r="15" fill="#F9C74F" stroke="#8B4513" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSpin}
              disabled={spinning || lives === 0}
              className={`flex items-center gap-4 px-12 py-4 rounded-2xl font-bold text-xl shadow-xl transition-all transform ${
                spinning || lives === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:scale-105 active:scale-95'
              } text-white`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-yellow-100 shadow-md border-2 border-blue-200">
                {avatar === 'eustaquio' ? (
                  <img src={eustaquioAvatar} alt="Eustaquio Méndez" className="w-full h-full object-cover object-[center_20%]" />
                ) : (
                  <img src={chapaquitaAvatar} alt="Chapaquita" className="w-full h-full object-cover object-[center_10%]" />
                )}
              </div>
              <span>{spinning ? 'Girando...' : t.spin}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
