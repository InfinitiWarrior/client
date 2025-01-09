import React, { useState } from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle';
import Login from './components/Login';
import BookList from './components/BookList';
import BorrowedBooks from './components/BorrowedBooks';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <header className="header">
        <h1>Library Management</h1>
        <DarkModeToggle setDarkMode={setDarkMode} />
      </header>

      {loggedIn ? (
        <div>
          <BookList />
          <BorrowedBooks />
        </div>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
