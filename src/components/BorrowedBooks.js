import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BorrowedBooks({ token }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.1.190:5000/api/borrowed-books', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBorrowedBooks(response.data))
      .catch((error) => console.error('Error fetching borrowed books:', error));
  }, [token]);

  return (
    <div>
      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.borrow_id}>
            Book ID: {book.book_id} - Borrowed by User ID: {book.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowedBooks;
