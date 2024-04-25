const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Setup mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to database");
}

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.json("Hello");
});

// Route
const userRouter = require("./routes/users");
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
