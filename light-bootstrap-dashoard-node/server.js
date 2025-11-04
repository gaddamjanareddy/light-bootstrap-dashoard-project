require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT =  5000;
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes")

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,               
  allowedHeaders: ["Content-Type", "Authorization"], 
  method:["POST"]
}));
app.use(express.json());


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
    res.send("Hii from server")
})
app.use("/auth", authRoutes);  
app.use("/users", userRoutes);
app.use("/menus", menuRoutes);




app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
