const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/usuarios.db');

db.serialize(() => {
  db.run(`
    create table if not exists usuarios (
      id integer primary key autoincrement,
      nome text not null,
      email text unique not null,
      senha text not null
    )
  `);
});

module.exports = db;