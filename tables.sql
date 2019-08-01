-- database of users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  password TEXT,
  profile_pic TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- database of events created by users, links user to the event they created
CREATE TABLE IF NOT EXISTS userevents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  event_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- information on event
CREATE TABLE IF NOT EXISTS eventinfo (
  id SERIAL PRIMARY KEY,
  event_name TEXT,
  start_date TEXT,
  end_date TEXT,
  duration TEXT,
  event_route TEXT,
  event_description TEXT,
  event_picture TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- database of which user signed up for the event
CREATE TABLE IF NOT EXISTS signups (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  event_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- database of comments made by users
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  event_id INTEGER,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
