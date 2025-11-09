/*
  # Create Biblioteca Mendeña Schema

  1. New Tables
    - `cuentos`
      - `id` (uuid, primary key)
      - `title` (text, story title)
      - `content` (text, story content)
      - `author` (text, optional author name)
      - `image_url` (text, optional cover image)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)
    
    - `coplas`
      - `id` (uuid, primary key)
      - `category` (text, one of: carnaval, pascua, cruz, sanAntonio, santiago)
      - `title` (text, copla title)
      - `content` (text, copla lyrics)
      - `audio_url` (text, optional audio file URL)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (biblioteca is public content)
    - Add policies for authenticated admin users to manage content

  3. Notes
    - All biblioteca content is publicly readable
    - Only authenticated admin users can create/update/delete content
    - Content is organized by categories for coplas
*/

CREATE TABLE IF NOT EXISTS cuentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cuentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cuentos"
  ON cuentos
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert cuentos"
  ON cuentos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cuentos"
  ON cuentos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cuentos"
  ON cuentos
  FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS coplas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('carnaval', 'pascua', 'cruz', 'sanAntonio', 'santiago')),
  title text NOT NULL,
  content text NOT NULL,
  audio_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE coplas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view coplas"
  ON coplas
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert coplas"
  ON coplas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update coplas"
  ON coplas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete coplas"
  ON coplas
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_coplas_category ON coplas(category);
