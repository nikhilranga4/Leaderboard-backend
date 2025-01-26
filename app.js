const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to handle CORS and other settings
app.use(cors({
  origin: [
    "http://localhost:3000",      // Your frontend (React.js) local URL
    "http://localhost:8080","http://192.168.1.4:8080","https://leaderboard8.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies/auth headers
  allowedHeaders: ["Content-Type", "Authorization"] // Allow specific headers
}));

// Middleware for parsing JSON bodies (using express.json() instead of bodyParser)
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);

// Handle 404 errors (if no matching routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
