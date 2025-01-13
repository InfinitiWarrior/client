import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList({ token }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.1.190:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, [token]);

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
