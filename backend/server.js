const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");

const app = express();

const PORT = 5000;

// --------------------
// Basic middleware
// --------------------

app.use(express.json());
app.use(cors());

// --------------------
// Request Logger
// --------------------

const requestLogger = (req, res, next) => {
  console.log(
    `[${req.method}] ${req.path} [${new Date().toISOString()}]`
  );

  next();
};

app.use(requestLogger);

// --------------------
// In-memory data
// --------------------

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    isbn: "9780132350884",
    available: true,
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    isbn: "9780135957059",
    available: false,
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Algorithms",
    isbn: "9780262046305",
    available: true,
  },
];

let borrowings = [];

// ==================================================
// TASK 3 APIs
// ==================================================

// --------------------
// Get all borrowings
// --------------------

app.get("/api/v1/borrowings", (req, res) => {
  res.status(200).json({
    success: true,
    data: borrowings,
  });
});

// --------------------
// Create borrowing
// --------------------

app.post("/api/v1/borrowings", (req, res) => {
  const {
    memberId,
    bookId,
    borrowDate,
    returnDate,
    status,
  } = req.body;

  const newBorrowing = {
    id: borrowings.length + 1,
    memberId,
    bookId,
    borrowDate,
    returnDate,
    status: status || "borrowed",
  };

  borrowings.push(newBorrowing);

  res.status(201).json({
    success: true,
    message: "Borrowing record created successfully",
    data: newBorrowing,
  });
});

// --------------------
// Get all books
// --------------------

app.get("/api/v1/books", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

// ==================================================
// TASK 5 - MONGODB + MONGOOSE APIs
// ==================================================

// --------------------
// Create Book in MongoDB
// --------------------

app.post("/api/v1/mongodb/books", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created in MongoDB",
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// --------------------
// Create Member in MongoDB
// --------------------

app.post("/api/v1/mongodb/members", async (req, res, next) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json({
      success: true,
      message: "Member created in MongoDB",
      data: member,
    });
  } catch (error) {
    next(error);
  }
});

// --------------------
// Create Borrowing in MongoDB
// --------------------

app.post("/api/v1/mongodb/borrowings", async (req, res, next) => {
  try {
    const borrowing = await Borrowing.create(req.body);

    res.status(201).json({
      success: true,
      message: "Borrowing record created in MongoDB",
      data: borrowing,
    });
  } catch (error) {
    next(error);
  }
});

// ==================================================
// GLOBAL ERROR HANDLER
// MUST BE LAST
// ==================================================

app.use((err, req, res, next) => {
  console.error(err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map(
        (error) => error.message
      ),
    });
  }

  // Duplicate unique field
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];

    return res.status(400).json({
      success: false,
      message: `${field || "Field"} already exists`,
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Other errors
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ==================================================
// MONGODB CONNECTION
// ==================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});