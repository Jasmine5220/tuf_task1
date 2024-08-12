import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Flashcard from './components/Flashcard';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignInAsAdmin from './components/SignInAsAdmin';
import axios from 'axios';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated) { // Only fetch flashcards if authenticated
      axios.get('http://localhost:5000/flashcards')
        .then(res => setFlashcards(res.data))
        .catch(err => console.error(err));
    }
  }, [isAuthenticated]);

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/signin" 
            element={<SignIn setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/signinasadmin" 
            element={<SignInAsAdmin setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? (
              <div className="flashcard-container">
                {flashcards.length > 0 && (
                  <Flashcard
                    question={flashcards[currentIndex].question}
                    answer={flashcards[currentIndex].answer}
                    flipped={flipped}
                    setFlipped={setFlipped}
                  />
                )}
                <div className="navigation">
                  <button onClick={handlePrev}>Previous</button>
                  <button onClick={handleNext}>Next</button>
                </div>
              </div>
            ) : (
              <Navigate to="/signin" />
            )} 
          />
          {isAdmin && (
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} 
            />
          )}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
