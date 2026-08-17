-- SAPALA 67 — initial schema

CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	name TEXT NOT NULL DEFAULT 'Admin',
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
	id TEXT PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	slug TEXT UNIQUE NOT NULL,
	title TEXT NOT NULL,
	category TEXT NOT NULL DEFAULT 'Umum',
	excerpt TEXT NOT NULL DEFAULT '',
	content TEXT NOT NULL DEFAULT '',
	author TEXT NOT NULL DEFAULT 'Tim Redaksi',
	image TEXT NOT NULL DEFAULT '',
	read_time TEXT NOT NULL DEFAULT '5 menit',
	date TEXT NOT NULL DEFAULT (date('now')),
	published INTEGER NOT NULL DEFAULT 1,
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gallery (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	src TEXT NOT NULL,
	alt TEXT NOT NULL DEFAULT '',
	category TEXT NOT NULL DEFAULT 'Umum',
	span TEXT NOT NULL DEFAULT 'col-span-1 row-span-1',
	sort INTEGER NOT NULL DEFAULT 0,
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	slug TEXT UNIQUE NOT NULL,
	title TEXT NOT NULL,
	category TEXT NOT NULL DEFAULT 'Kegiatan',
	description TEXT NOT NULL DEFAULT '',
	content TEXT NOT NULL DEFAULT '',
	image TEXT NOT NULL DEFAULT '',
	location TEXT NOT NULL DEFAULT '',
	start_date TEXT NOT NULL DEFAULT (date('now')),
	end_date TEXT NOT NULL DEFAULT '',
	published INTEGER NOT NULL DEFAULT 1,
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	message TEXT NOT NULL,
	is_read INTEGER NOT NULL DEFAULT 0,
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
