-- database of users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  password TEXT,
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
  event_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- database of which user signed up for the event
CREATE TABLE IF NOT EXISTS signups (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  event_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- articles by users related to motorcycle riding stuff
CREATE TABLE IF NOT EXISTS userarticles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  article_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- articles
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
