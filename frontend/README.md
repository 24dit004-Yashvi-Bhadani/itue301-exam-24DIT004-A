# Library Book Management System

## 1. Project Name

Library Book Management System

This project implements selected parts of a library management system using React, Express, and MongoDB with Mongoose.

## 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## 4. MongoDB Setup

Create a MongoDB database using MongoDB Atlas or a local MongoDB installation.

Create a `.env` file inside the `backend` directory.

Add the MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

The application connects to MongoDB using Mongoose.

## 5. Required Environment Variable

The required environment variable is:

```env
MONGO_URI=your_mongodb_connection_string
```

The `.env` file should not be committed to GitHub.
