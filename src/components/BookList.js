import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend API
    axios.get('http://localhost:5000/api/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>
            {book.title} - {book.genre} ({book.stock} available)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
