-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  gender TEXT NOT NULL,
  bio TEXT,
  location GEOGRAPHY(POINT),
  photos TEXT[],
  interests TEXT[],
  values TEXT[],
  hotness_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('like', 'superlike', 'match')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('match', 'message', 'like')),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'reviewed', 'resolved')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'basic', 'premium', 'elite')),
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_matches_user1_id ON matches(user1_id);
CREATE INDEX idx_matches_user2_id ON matches(user2_id);
CREATE INDEX idx_messages_match_id ON messages(match_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX idx_reports_reported_user_id ON reports(reported_user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at
BEFORE UPDATE ON matches
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own matches" ON matches
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can insert their own matches" ON matches
  FOR INSERT WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() IN (SELECT user1_id FROM matches WHERE id = messages.match_id UNION SELECT user2_id FROM matches WHERE id = messages.match_id));

CREATE POLICY "Users can insert their own messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own reports" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);

CREATE POLICY "Users can insert their own reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Function to create a new user profile
CREATE OR REPLACE FUNCTION create_user_profile(
  p_email TEXT,
  p_password TEXT,
  p_name TEXT,
  p_birthdate DATE,
  p_gender TEXT,
  p_bio TEXT,
  p_location GEOGRAPHY(POINT),
  p_interests TEXT[],
  p_values TEXT[]
) RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Insert into users table
  INSERT INTO users (email, password)
  VALUES (p_email, p_password)
  RETURNING id INTO v_user_id;

  -- Insert into profiles table
  INSERT INTO profiles (user_id, name, birthdate, gender, bio, location, interests, values)
  VALUES (v_user_id, p_name, p_birthdate, p_gender, p_bio, p_location, p_interests, p_values);

  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update user profile
CREATE OR REPLACE FUNCTION update_user_profile(
  p_user_id UUID,
  p_name TEXT,
  p_bio TEXT,
  p_location GEOGRAPHY(POINT),
  p_interests TEXT[],
  p_values TEXT[]
) RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET name = p_name,
      bio = p_bio,
      location = p_location,
      interests = p_interests,
      values = p_values,
      updated_at = TIMEZONE('utc'::text, NOW())
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create a match
CREATE OR REPLACE FUNCTION create_match(
  p_user1_id UUID,
  p_user2_id UUID,
  p_status TEXT
) RETURNS UUID AS $$
DECLARE
  v_match_id UUID;
BEGIN
  INSERT INTO matches (user1_id, user2_id, status)
  VALUES (p_user1_id, p_user2_id, p_status)
  RETURNING id INTO v_match_id;

  -- Create notifications for both users
  INSERT INTO notifications (user_id, type, content)
  VALUES
    (p_user1_id, 'match', 'You have a new match!'),
    (p_user2_id, 'match', 'You have a new match!');

  RETURN v_match_id;
END;
$$ LANGUAGE plpgsql;

-- Function to send a message
CREATE OR REPLACE FUNCTION send_message(
  p_match_id UUID,
  p_sender_id UUID,
  p_content TEXT
) RETURNS UUID AS $$
DECLARE
  v_message_id UUID;
  v_recipient_id UUID;
BEGIN
  INSERT INTO messages (match_id, sender_id, content)
  VALUES (p_match_id, p_sender_id, p_content)
  RETURNING id INTO v_message_id;

  -- Determine the recipient
  SELECT CASE
    WHEN user1_id = p_sender_id THEN user2_id
    ELSE user1_id
  END INTO v_recipient_id
  FROM matches
  WHERE id = p_match_id;

  -- Create a notification for the recipient
  INSERT INTO notifications (user_id, type, content)
  VALUES (v_recipient_id, 'message', 'You have a new message!');

  RETURN v_message_id;
END;
$$ LANGUAGE plpgsql;

-- Function to report a user
CREATE OR REPLACE FUNCTION report_user(
  p_reporter_id UUID,
  p_reported_user_id UUID,
  p_reason TEXT,
  p_description TEXT
) RETURNS UUID AS $$
DECLARE
  v_report_id UUID;
BEGIN
  INSERT INTO reports (reporter_id, reported_user_id, reason, description)
  VALUES (p_reporter_id, p_reported_user_id, p_reason, p_description)
  RETURNING id INTO v_report_id;

  RETURN v_report_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update subscription
CREATE OR REPLACE FUNCTION update_subscription(
  p_user_id UUID,
  p_tier TEXT,
  p_end_date DATE
) RETURNS VOID AS $$
BEGIN
  INSERT INTO subscriptions (user_id, tier, start_date, end_date)
  VALUES (p_user_id, p_tier, CURRENT_DATE, p_end_date)
  ON CONFLICT (user_id)
  DO UPDATE SET
    tier = EXCLUDED.tier,
    start_date = CURRENT_DATE,
    end_date = EXCLUDED.end_date,
    updated_at = TIMEZONE('utc'::text, NOW());
END;
$$ LANGUAGE plpgsql;

-- Function to get potential matches
CREATE OR REPLACE FUNCTION get_potential_matches(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 10
) RETURNS TABLE (
  id UUID,
  name TEXT,
  age INTEGER,
  gender TEXT,
  bio TEXT,
  location GEOGRAPHY(POINT),
  interests TEXT[],
  values TEXT[],
  hotness_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    DATE_PART('year', AGE(p.birthdate)) AS age,
    p.gender,
    p.bio,
    p.location,
    p.interests,
    p.values,
    p.hotness_score
  FROM profiles p
  WHERE p.user_id != p_user_id
    AND p.user_id NOT IN (
      SELECT user2_id FROM matches WHERE user1_id = p_user_id
      UNION
      SELECT user1_id FROM matches WHERE user2_id = p_user_id
    )
  ORDER BY p.hotness_score DESC, RANDOM()
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;