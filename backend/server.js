const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Setup mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to database");
}

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

app.get("/", (req, res) => {
  res.json("Hello");
});

// Route
const userRouter = require("./routes/users");
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
