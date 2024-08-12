// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db-config');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());

// User registration
app.post('/register', (req, res) => {
  const { username, password, isAdmin = false } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.query('INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)', 
    [username, hash, isAdmin], 
    (err) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.json({ isAuthenticated: true, isAdmin: user.is_admin });
        } else {
          res.status(401).json({ isAuthenticated: false, message: 'Invalid credentials' });
        }
      });
    } else {
      res.status(401).json({ isAuthenticated: false, message: 'Invalid credentials' });
    }
  });
});

// Get all flashcards
app.get('/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a flashcard
app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err) => {
    if (err) throw err;
    res.send('Flashcard added.');
  });
});

// Edit a flashcard
app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
    if (err) throw err;
    res.send('Flashcard updated.');
  });
});

// Delete a flashcard
app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Flashcard deleted.');
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000.');
});
