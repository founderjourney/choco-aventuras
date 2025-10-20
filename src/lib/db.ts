let db;

if (process.env.NODE_ENV === 'production') {
  db = require('./db.prod').db;
} else {
  db = require('./db.dev').db;
}

export { db };