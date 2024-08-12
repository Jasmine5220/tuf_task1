import React from 'react';
import './Flashcard.css';

function Flashcard({ question, answer, flipped, setFlipped }) {
  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <h3>{question}</h3>
        </div>
        <div className="flashcard-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
