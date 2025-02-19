require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");
const createRouter = require("./routes/createRouter");
const updateRouter = require("./routes/updateRouter");
const deleteRouter = require("./routes/deleteRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/create", createRouter);
app.use("/delete", deleteRouter);
app.use("/update", updateRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory Management Express app - listening on port ${PORT}!`);
});