import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Replace with API call to fetch books
    setBooks([
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
    ]);
  }, []);

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
