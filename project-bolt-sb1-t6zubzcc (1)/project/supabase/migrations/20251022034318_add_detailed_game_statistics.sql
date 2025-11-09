/*
  # Add Detailed Game Statistics Tracking

  1. Changes to Existing Tables
    - Add grade column to `game_sessions` table to track student's grade level
    - Add games_played, best_score columns for overall statistics
    
  2. New Tables
    - `game_results`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key to game_sessions)
      - `player_name` (text, student name)
      - `student_number` (text, optional student ID)
      - `grade` (text, grade level: 2p-6p, 1s-6s)
      - `score` (integer, final score)
      - `correct_answers` (integer, number of correct answers)
      - `incorrect_answers` (integer, number of incorrect answers)
      - `time_played` (integer, time in seconds)
      - `created_at` (timestamptz, when game was completed)

  3. Security
    - Enable RLS on new tables
    - Add policies for public read and insert access
    - All game data is publicly accessible for leaderboards

  4. Notes
    - Track individual game results for detailed statistics
    - Support filtering by grade level
    - Store completion time and accuracy metrics
*/

-- Add new columns to game_sessions if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'game_sessions' AND column_name = 'grade'
  ) THEN
    ALTER TABLE game_sessions ADD COLUMN grade text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'game_sessions' AND column_name = 'games_played'
  ) THEN
    ALTER TABLE game_sessions ADD COLUMN games_played integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'game_sessions' AND column_name = 'best_score'
  ) THEN
    ALTER TABLE game_sessions ADD COLUMN best_score integer DEFAULT 0;
  END IF;
END $$;

-- Create game_results table
CREATE TABLE IF NOT EXISTS game_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES game_sessions(id) ON DELETE CASCADE,
  player_name text NOT NULL DEFAULT '',
  student_number text DEFAULT '',
  grade text NOT NULL DEFAULT '',
  score integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  incorrect_answers integer NOT NULL DEFAULT 0,
  time_played integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;

-- Game results policies (public access for leaderboards)
CREATE POLICY "Anyone can view game results"
  ON game_results
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert game results"
  ON game_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update game results"
  ON game_results
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete game results"
  ON game_results
  FOR DELETE
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_game_results_grade ON game_results(grade);
CREATE INDEX IF NOT EXISTS idx_game_results_session_id ON game_results(session_id);
CREATE INDEX IF NOT EXISTS idx_game_results_score ON game_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_results_created_at ON game_results(created_at DESC);
