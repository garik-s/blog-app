require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");

const app = express();

const allowedOrigins = [
  'https://blog-app-zeta-peach.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
