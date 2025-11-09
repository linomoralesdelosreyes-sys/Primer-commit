import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, BookOpen, Music, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { localCoplas } from '../lib/coplas';
import { localCuentos, CuentoQuestion } from '../lib/cuentos';

type Section = 'main' | 'cuentos' | 'coplas';
type CoplasSubsection = 'carnaval' | 'cruz' | 'sanAntonio' | 'santiago';

interface Copla {
  id: string;
  title: string;
  content: string;
  audio_url?: string;
}

interface Cuento {
  id: string;
  title: string;
  content: string;
  created_at: string;
  questions?: CuentoQuestion[];
}

export function BibliotecaScreen() {
  const { setScreen } = useGame();
  const [section, setSection] = useState<Section>('main');
  const [coplasSubsection, setCoplasSubsection] = useState<CoplasSubsection | null>(null);
  const [coplas, setCoplas] = useState<Copla[]>([]);
  const [cuentos, setCuentos] = useState<Cuento[]>([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | null>>({});

  useEffect(() => {
    if (coplasSubsection) {
      loadCoplas(coplasSubsection);
    }
  }, [coplasSubsection]);

  useEffect(() => {
    if (section === 'cuentos') {
      loadCuentos();
    }
  }, [section]);

  const loadCoplas = async (category: CoplasSubsection) => {
    setLoading(true);
    try {
      // Modo demo: usar coplas locales si Supabase no está configurado
      if (!supabase) {
        const coplasFiltered = localCoplas.filter(c => c.category === category);
        setCoplas(coplasFiltered as any[]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('coplas')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: true });

      if (data && !error) {
        setCoplas(data);
      }
    } catch (error) {
      console.warn('Error cargando coplas:', error);
    }
    setLoading(false);
  };

  const loadCuentos = async () => {
    setLoading(true);
    try {
      // Modo demo: usar cuentos locales si Supabase no está configurado
      if (!supabase) {
        setCuentos(localCuentos as any[]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cuentos')
        .select('*')
        .order('created_at', { ascending: true });

      if (data && !error) {
        setCuentos(data);
      }
    } catch (error) {
      console.warn('Error cargando cuentos:', error);
    }
    setLoading(false);
  };

  const handleBack = () => {
    if (coplasSubsection) {
      setCoplasSubsection(null);
    } else if (section !== 'main') {
      setSection('main');
    } else {
      setScreen('welcome');
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const renderQuestion = (question: CuentoQuestion, index: number) => {
    const userAnswer = userAnswers[question.id];
    const isAnswered = userAnswer !== undefined && userAnswer !== null;
    const isCorrect = isAnswered && userAnswer === question.correct_answer;

    return (
      <div key={question.id} className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
        <div className="flex items-start mb-3">
          <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
            {index + 1}
          </span>
          <p className="text-gray-800 font-medium flex-1">{question.question}</p>
        </div>
        
        <div className="space-y-2 ml-11">
          {question.options.map((option, optionIndex) => {
            const isSelected = userAnswer === optionIndex;
            const showCorrect = isAnswered && optionIndex === question.correct_answer;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            let buttonClass = 'w-full text-left p-3 rounded-lg border-2 transition-all ';
            if (showCorrect) {
              buttonClass += 'bg-green-100 border-green-500 text-green-800';
            } else if (showIncorrect) {
              buttonClass += 'bg-red-100 border-red-500 text-red-800';
            } else if (isSelected) {
              buttonClass += 'bg-blue-100 border-blue-500 text-blue-800';
            } else {
              buttonClass += 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50';
            }

            return (
              <button
                key={optionIndex}
                onClick={() => !isAnswered && handleAnswerSelect(question.id, optionIndex)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-600 ml-2" />}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`mt-3 ml-11 p-3 rounded-lg ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-medium">
              {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto. La respuesta correcta es: ' + question.options[question.correct_answer]}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderMain = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Biblioteca Mendeña
      </h2>

      <button
        onClick={() => setSection('cuentos')}
        className="w-full p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold">Cuentos</span>
          </div>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => setSection('coplas')}
        className="w-full p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Music className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold">Coplas</span>
          </div>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );

  const renderCuentos = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Cuentos
      </h2>
      {loading ? (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-gray-600 text-center">Cargando...</p>
        </div>
      ) : cuentos.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-gray-600 text-center">No hay cuentos disponibles</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cuentos.map((cuento) => (
            <div key={cuento.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-600 mb-4">{cuento.title}</h3>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">
                {cuento.content}
              </div>
              
              {cuento.questions && cuento.questions.length > 0 && (
                <div className="mt-6 pt-6 border-t-2 border-blue-100">
                  <h4 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
                    <span className="mr-2">📝</span>
                    Preguntas de comprensión
                  </h4>
                  <div className="space-y-4">
                    {cuento.questions.map((question, index) => renderQuestion(question, index))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCoplasMenu = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Coplas
      </h2>

      <button
        onClick={() => setCoplasSubsection('carnaval')}
        className="w-full p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">🎭 Carnaval</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => setCoplasSubsection('cruz')}
        className="w-full p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">✝️ La Cruz</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => setCoplasSubsection('sanAntonio')}
        className="w-full p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">⛪ San Antonio</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => setCoplasSubsection('santiago')}
        className="w-full p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">🐴 Santiago</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );

  const renderCoplasContent = (subsection: CoplasSubsection) => {
    const titles: Record<CoplasSubsection, string> = {
      carnaval: 'Coplas de Carnaval',
      cruz: 'Coplas de La Cruz',
      sanAntonio: 'Coplas de San Antonio',
      santiago: 'Coplas de Santiago'
    };

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {titles[subsection]}
        </h2>
        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-gray-600 text-center">Cargando...</p>
          </div>
        ) : coplas.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-gray-600 text-center">No hay coplas disponibles en esta categoría</p>
          </div>
        ) : (
          <div className="space-y-4">
            {coplas.map((copla) => (
              <div key={copla.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-600 mb-4">{copla.title}</h3>
                <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed mb-4">
                  {copla.content}
                </pre>
                {copla.audio_url && (
                  <a 
                    href={copla.audio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Music className="w-5 h-5" />
                    <span>Escuchar Audio</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {section === 'main' && renderMain()}
        {section === 'cuentos' && renderCuentos()}
        {section === 'coplas' && !coplasSubsection && renderCoplasMenu()}
        {section === 'coplas' && coplasSubsection && renderCoplasContent(coplasSubsection)}
      </div>
    </div>
  );
}
