const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./database/databaseConfig");
const logger = require("morgan");
const routes = require("./routes/index.routes");
require("dotenv").config();

let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

app.use(cors());
app.set("port", port);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    result: null,
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

connectDB();

module.exports = app;
