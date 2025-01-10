import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BorrowedBooks({ userRole }) {
  const [borrowed_Books, setBorrowedBooks] = useState([]);

  useEffect(() => {
    if (userRole === 'staff') {
      // Fetch borrowed books if the user is staff
      axios.get('http://localhost:5000/api/borrowed-books')
        .then((response) => {
          setBorrowedBooks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching borrowed books:', error);
        });
    } else {
      setBorrowedBooks([]); // Don't display borrowed books for non-staff users
    }
  }, [userRole]);

  if (userRole !== 'staff') {
    return <p>You do not have access to this section.</p>;
  }

  return (
    <div>
      <h2>Borrowed Books</h2>
      <ul>
        {borrowed_Books.map((borrowedBook) => (
          <li key={borrowedBook.borrow_id}>
            Book ID: {borrowedBook.book_id} - Borrowed by User ID: {borrowedBook.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowedBooks;
