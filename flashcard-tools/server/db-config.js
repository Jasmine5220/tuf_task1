const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'J@$m!nej5220',
  database: 'flashcards_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

module.exports = db;
