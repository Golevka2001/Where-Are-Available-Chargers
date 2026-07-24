CREATE TABLE IF NOT EXISTS charging_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campus_id TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  total_count INTEGER NOT NULL,
  available_count INTEGER NOT NULL,
  fault_count INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(campus_id, timestamp)
);
