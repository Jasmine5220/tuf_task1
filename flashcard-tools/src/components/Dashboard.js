import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(res => setFlashcards(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddFlashcard = () => {
    axios.post('http://localhost:5000/flashcards', newFlashcard)
      .then(res => {
        setFlashcards([...flashcards, res.data]);
        setNewFlashcard({ question: '', answer: '' });
      })
      .catch(err => console.error(err));
  };

  const handleUpdateFlashcard = (id) => {
    axios.put(`http://localhost:5000/flashcards/${id}`, editingFlashcard)
      .then(() => {
        setFlashcards(flashcards.map(card => (card.id === id ? editingFlashcard : card)));
        setEditingFlashcard(null);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteFlashcard = (id) => {
    axios.delete(`http://localhost:5000/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(card => card.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Admin Dashboard</h2>
      <div className="dashboard-new-flashcard">
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={e => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          className="dashboard-input"
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={e => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          className="dashboard-input"
        />
        <button onClick={handleAddFlashcard} className="dashboard-button">Add Flashcard</button>
      </div>

      <div className="dashboard-flashcards-list">
        {flashcards.map(card => (
          <div key={card.id} className="dashboard-flashcard-item">
            {editingFlashcard && editingFlashcard.id === card.id ? (
              <>
                <input
                  type="text"
                  value={editingFlashcard.question}
                  onChange={e => setEditingFlashcard({ ...editingFlashcard, question: e.target.value })}
                  className="dashboard-input"
                />
                <input
                  type="text"
                  value={editingFlashcard.answer}
                  onChange={e => setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })}
                  className="dashboard-input"
                />
                <button onClick={() => handleUpdateFlashcard(card.id)} className="dashboard-button">Save</button>
                <button onClick={() => setEditingFlashcard(null)} className="dashboard-button">Cancel</button>
              </>
            ) : (
              <>
                <p className="dashboard-text"><strong>Q:</strong> {card.question}</p>
                <p className="dashboard-text"><strong>A:</strong> {card.answer}</p>
                <button onClick={() => setEditingFlashcard(card)} className="dashboard-button">Edit</button>
                <button onClick={() => handleDeleteFlashcard(card.id)} className="dashboard-button">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
