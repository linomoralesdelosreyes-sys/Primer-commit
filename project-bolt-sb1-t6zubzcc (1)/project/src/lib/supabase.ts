import { createClient } from '@supabase/supabase-js';
import { allQuestions } from './questions';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Solo crear el cliente de Supabase si las variables de entorno están configuradas correctamente
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && typeof supabaseUrl === 'string' && supabaseUrl.startsWith('http');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log para depuración
if (!isSupabaseConfigured) {
  console.log('🎮 Modo Demo: La app funciona sin Supabase con preguntas de demostración');
}

export type Question = {
  id: string;
  category: 'historia' | 'leyenda' | 'musica' | 'flora' | 'fauna';
  difficulty: 'facil' | 'intermedio' | 'dificil';
  question_es: string;
  question_en: string;
  option_a_es: string;
  option_a_en: string;
  option_b_es: string;
  option_b_en: string;
  option_c_es: string;
  option_c_en: string;
  option_d_es?: string;
  option_d_en?: string;
  correct_answer: 'a' | 'b' | 'c' | 'd';
};

export type GameSession = {
  id: string;
  player_name: string;
  avatar: 'chapaquita' | 'eustaquio';
  lives: number;
  score: number;
  language: 'es' | 'en';
  created_at: string;
  updated_at: string;
};

// Preguntas demo para modo sin Supabase
export const demoQuestions: Question[] = allQuestions;
