/*
  # Add difficulty level and fourth option to questions

  1. Changes to `questions` table
    - Add `difficulty` column (facil, intermedio, dificil)
    - Add `option_d_es` and `option_d_en` columns for fourth answer option
    - Update `correct_answer` check constraint to include 'd'
  
  2. Notes
    - Existing questions will default to 'facil' difficulty
    - New option_d columns allow NULL for backward compatibility
    - Questions can now have 3 or 4 answer options
*/

-- Add difficulty column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'questions' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE questions ADD COLUMN difficulty text DEFAULT 'facil' NOT NULL;
    ALTER TABLE questions ADD CONSTRAINT questions_difficulty_check 
      CHECK (difficulty IN ('facil', 'intermedio', 'dificil'));
  END IF;
END $$;

-- Add option_d columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'questions' AND column_name = 'option_d_es'
  ) THEN
    ALTER TABLE questions ADD COLUMN option_d_es text;
    ALTER TABLE questions ADD COLUMN option_d_en text;
  END IF;
END $$;

-- Update correct_answer constraint to allow 'd'
DO $$
BEGIN
  ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_correct_answer_check;
  ALTER TABLE questions ADD CONSTRAINT questions_correct_answer_check 
    CHECK (correct_answer IN ('a', 'b', 'c', 'd'));
END $$;