const createUsers  = `
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAP
)
`;

module.exports = createUsers;