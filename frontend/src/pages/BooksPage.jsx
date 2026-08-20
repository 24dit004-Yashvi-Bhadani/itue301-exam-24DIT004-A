import BookCard from "../components/BookCard";

function BooksPage() {
  const books = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      available: true,
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      category: "Programming",
      available: false,
    },
  ];

  return (
    <div className="page">
      <h2>Books</h2>

      <div className="book-grid">
        {books.map((book) => (
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