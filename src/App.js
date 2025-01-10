import React, { useState, useEffect } from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle';
import Login from './components/Login';
import BookList from './components/BookList';
import BorrowedBooks from './components/BorrowedBooks';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Initialize login state and dark mode state from localStorage
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedRole = localStorage.getItem('userRole');
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';

    if (storedLoggedIn) {
      setLoggedIn(true);
      setUserRole(storedRole);
    }
    setDarkMode(storedDarkMode);
  }, []);

  // Persist dark mode state to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <header className="header">
        <h1>Library Management</h1>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>

      <Routes>
        {/* Default route for login and book list */}
        <Route
          path="/"
          element={loggedIn ? (
            <div>
              <BookList />
              <BorrowedBooks />
            </div>
          ) : (
            <Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />
          )}
        />

        {/* Specific route for /booklist */}
        <Route
          path="/booklist"
          element={loggedIn ? <BookList /> : <Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />}
        />
      </Routes>
    </div>
  );
}

export default App;
