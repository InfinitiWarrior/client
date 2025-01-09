import React from 'react';

function DarkModeToggle({ setDarkMode }) {
  return (
    <button onClick={() => setDarkMode((prev) => !prev)}>
      Toggle Dark Mode
    </button>
  );
}

export default DarkModeToggle;
