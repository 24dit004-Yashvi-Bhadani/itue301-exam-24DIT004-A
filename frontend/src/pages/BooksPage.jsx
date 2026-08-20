import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/v1/books"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();

        setData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p className="status-message">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Books</h2>

      <div className="book-grid">
        {data.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            category={book.category}
            available={book.available}
          />
        ))}
      </div>
    </div>
  );
}

export default BooksPage;