const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoute = require("./routes/AuthRoute");
const animalRoute = require("./routes/AnimalRoutes");
const feedStockRoute = require("./routes/FeedStockRoutes");
const flockRoute = require("./routes/FlockRoutes");
const AnimalFeedRoute = require("./routes/FeedRoutes");


// Database
connectDB();

// Port
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname, "uploads")));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://dairy-farm-ry3z.onrender.com",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/animal", animalRoute);
app.use("/api/feedStock", feedStockRoute);
app.use("/api/flock", flockRoute);
app.use("/api/feeds", AnimalFeedRoute);


app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(_dirname, "client","dist","index.html"));
})

// app listening
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`.bgMagenta.white)
);
