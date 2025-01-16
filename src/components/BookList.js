import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList({ token }) {
  const [books, setBooks] = useState([]);
  const [cooldowns, setCooldowns] = useState({});

  useEffect(() => {
    axios
      .get('http://192.168.1.190:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, [token]);

  const handleBorrow = (bookId) => {
    if (cooldowns[bookId]) {
      alert(`Please wait ${cooldowns[bookId]} seconds before borrowing again.`);
      return;
    }

    axios
      .post(
        'http://192.168.1.190:5000/api/borrow',
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.book_id === bookId ? { ...book, stock: book.stock - 1 } : book
          )
        );

        setCooldowns((prevCooldowns) => ({
          ...prevCooldowns,
          [bookId]: 60,
        }));

        const countdown = setInterval(() => {
          setCooldowns((prevCooldowns) => {
            const updatedCooldowns = { ...prevCooldowns };
            if (updatedCooldowns[bookId] > 1) {
              updatedCooldowns[bookId] -= 1;
            } else {
              clearInterval(countdown);
              delete updatedCooldowns[bookId];
            }
            return updatedCooldowns;
          });
        }, 1000);
      })
      .catch((error) => {
        console.error('Error borrowing book:', error);
        alert('Could not borrow this book. Please try again.');
      });
  };

  return (
    <div>
      <h2>Available Books</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {books.map((book) => (
          <div
            key={book.book_id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3>{book.title}</h3>
            <p>Genre: {book.genre}</p>
            <p>Available Stock: {book.stock}</p>
            <button
              onClick={() => handleBorrow(book.book_id)}
              disabled={book.stock === 0 || cooldowns[book.book_id]}
              style={{
                backgroundColor:
                  book.stock === 0 || cooldowns[book.book_id] ? 'gray' : '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: book.stock === 0 || cooldowns[book.book_id] ? 'not-allowed' : 'pointer',
              }}
            >
              {book.stock === 0
                ? 'Out of Stock'
                : cooldowns[book.book_id]
                ? `Cooldown (${cooldowns[book.book_id]}s)`
                : 'Borrow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
