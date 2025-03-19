require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", postRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
