import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:5000/flashcards', { question, answer })
      .then(() => {
        setQuestion('');
        setAnswer('');
        alert('Flashcard added');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="admin">
      <h1 className="admin-heading">Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="admin-input"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="admin-input"
      />
      <button onClick={handleSubmit} className="admin-button">Add Flashcard</button>
    </div>
  );
}

export default Admin;
