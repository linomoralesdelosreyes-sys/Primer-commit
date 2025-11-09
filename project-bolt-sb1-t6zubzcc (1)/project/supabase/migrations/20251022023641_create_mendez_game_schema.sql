/*
  # Create Mendez Educational Game Schema

  ## Overview
  This migration creates the database structure for an interactive educational game about Mendez,
  featuring a spinning wheel with quiz questions about history, legends, music, flora, and fauna.

  ## New Tables
  
  ### `questions`
  Stores quiz questions for the game in multiple categories and languages
  - `id` (uuid, primary key) - Unique identifier
  - `category` (text) - Category: historia, leyenda, musica, flora, fauna
  - `question_es` (text) - Question text in Spanish
  - `question_en` (text) - Question text in English
  - `option_a_es` (text) - First option in Spanish
  - `option_a_en` (text) - First option in English
  - `option_b_es` (text) - Second option in Spanish
  - `option_b_en` (text) - Second option in English
  - `option_c_es` (text) - Third option in Spanish
  - `option_c_en` (text) - Third option in English
  - `correct_answer` (text) - Correct answer: 'a', 'b', or 'c'
  - `created_at` (timestamptz) - Timestamp of creation

  ### `game_sessions`
  Tracks player game sessions
  - `id` (uuid, primary key) - Unique identifier
  - `player_name` (text) - Player's chosen name
  - `avatar` (text) - Selected avatar: 'chapaquita' or 'eustaquio'
  - `lives` (integer) - Current number of lives (max 5)
  - `score` (integer) - Current score
  - `language` (text) - Selected language: 'es' or 'en'
  - `created_at` (timestamptz) - Session start time
  - `updated_at` (timestamptz) - Last update time

  ## Security
  - Enable RLS on all tables
  - Allow public read access to questions (educational content)
  - Allow anyone to create and update their own game sessions
*/

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('historia', 'leyenda', 'musica', 'flora', 'fauna')),
  question_es text NOT NULL,
  question_en text NOT NULL,
  option_a_es text NOT NULL,
  option_a_en text NOT NULL,
  option_b_es text NOT NULL,
  option_b_en text NOT NULL,
  option_c_es text NOT NULL,
  option_c_en text NOT NULL,
  correct_answer text NOT NULL CHECK (correct_answer IN ('a', 'b', 'c')),
  created_at timestamptz DEFAULT now()
);

-- Create game_sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL DEFAULT '',
  avatar text NOT NULL CHECK (avatar IN ('chapaquita', 'eustaquio')),
  lives integer NOT NULL DEFAULT 5 CHECK (lives >= 0 AND lives <= 5),
  score integer NOT NULL DEFAULT 0,
  language text NOT NULL DEFAULT 'es' CHECK (language IN ('es', 'en')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Questions policies (public read access for educational content)
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  USING (true);

-- Game sessions policies
CREATE POLICY "Anyone can create game sessions"
  ON game_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read game sessions"
  ON game_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update game sessions"
  ON game_sessions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Insert sample questions
INSERT INTO questions (category, question_es, question_en, option_a_es, option_a_en, option_b_es, option_b_en, option_c_es, option_c_en, correct_answer) VALUES
-- Historia
('historia', '¿En qué año nació Eustaquio Méndez?', 'What year was Eustaquio Méndez born?', '1772', '1772', '1785', '1785', '1790', '1790', 'a'),
('historia', '¿Dónde nació Eustaquio Méndez?', 'Where was Eustaquio Méndez born?', 'La Paz', 'La Paz', 'Tarija', 'Tarija', 'Potosí', 'Potosí', 'b'),
('historia', '¿Qué apodo tenía Eustaquio Méndez?', 'What nickname did Eustaquio Méndez have?', 'El Moto', 'El Moto', 'El Tigre', 'El Tiger', 'El León', 'The Lion', 'a'),

-- Leyenda
('leyenda', '¿Qué representa la Chapaquita en la cultura tarijeña?', 'What does the Chapaquita represent in Tarijeña culture?', 'Una mujer valiente', 'A brave woman', 'Una bailarina', 'A dancer', 'Una cantante', 'A singer', 'a'),
('leyenda', '¿De dónde viene el término "Chapaco"?', 'Where does the term "Chapaco" come from?', 'De una palabra quechua', 'From a Quechua word', 'De la cultura chaqueña', 'From Chaco culture', 'De un apellido español', 'From a Spanish surname', 'b'),

-- Música
('musica', '¿Cuál es el instrumento típico de Tarija?', 'What is the typical instrument of Tarija?', 'La guitarra', 'The guitar', 'El charango', 'The charango', 'La quena', 'The quena', 'b'),
('musica', '¿Qué danza es tradicional de Tarija?', 'Which dance is traditional of Tarija?', 'La cueca', 'La cueca', 'La morenada', 'La morenada', 'La diablada', 'La diablada', 'a'),

-- Flora
('flora', '¿Qué árbol es símbolo de Tarija?', 'What tree is a symbol of Tarija?', 'El pino', 'The pine', 'El algarrobo', 'The carob tree', 'El sauce', 'The willow', 'b'),
('flora', '¿Qué fruta es característica de los valles tarijeños?', 'What fruit is characteristic of Tarija valleys?', 'La manzana', 'The apple', 'La uva', 'The grape', 'La naranja', 'The orange', 'b'),

-- Fauna
('fauna', '¿Qué ave es común en los valles de Tarija?', 'What bird is common in Tarija valleys?', 'El cóndor', 'The condor', 'El loro', 'The parrot', 'La perdiz', 'The partridge', 'c'),
('fauna', '¿Qué animal habita en el Chaco tarijeño?', 'What animal lives in the Tarija Chaco?', 'El tatú', 'The armadillo', 'El pingüino', 'The penguin', 'El oso', 'The bear', 'a');
