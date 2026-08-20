import { useState } from "react";

function BorrowPage() {
  const [memberName, setMemberName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      memberName,
      bookTitle,
      borrowDate,
      returnDate,
    });
  };

  return (
    <div className="page">
      <h2>Borrow Book</h2>

      <form className="borrow-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Member Name</label>
          <input
            type="text"
            value={memberName}
            onChange={(event) => setMemberName(event.target.value)}
            placeholder="Enter member name"
          />
        </div>

        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(event) => setBookTitle(event.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label>Borrow Date</label>
          <input
            type="date"
            value={borrowDate}
            onChange={(event) => setBorrowDate(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
          />
        </div>

        <button type="submit">Borrow Book</button>
      </form>

      {memberName && (
        <div className="state-display">
          Borrowing request for <strong>{memberName}</strong>
        </div>
      )}
    </div>
  );
}

export default BorrowPage;