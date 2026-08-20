function BookCard({ title, author, category, available }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>

      <p>
        <strong>Author:</strong> {author}
      </p>

      <p>
        <strong>Category:</strong> {category}
      </p>

      <p>
        <strong>Availability:</strong>{" "}
        <span className={available ? "available" : "not-available"}>
          {available ? "Available" : "Not Available"}
        </span>
      </p>
    </div>
  );
}

export default BookCard;