import React, { useState, useEffect } from 'react';

function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Replace with API call to fetch borrowed books
    setBorrowedBooks([
      { id: 1, title: 'Book 1', borrower: 'User 1' },
      { id: 2, title: 'Book 2', borrower: 'User 2' },
    ]);
  }, []);

  return (
    <div>
      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.id}>
            {book.title} - Borrowed by {book.borrower}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowedBooks;
