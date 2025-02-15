import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection_db from "./src/config/db.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import adminRoutes from "./src/routes/admin.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5000"
}));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/", authRoutes);


// Error Handler
app.use(errorHandler);

// Connaction DB
connection_db();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));