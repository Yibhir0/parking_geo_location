/**
  * Link to all endPoint
 */

const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/api.js");

// Compression config
//const compression = require("compression");

// Compression middelware
app.use(compression());

// Cache policy 1 year
app.use(function (req, res, next) {
  res.set("Cache-control", "public, max-age=31536000");
  next();
});

app.use("/api", api);

app.use(express.static(path.resolve(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../client/build")));


module.exports = app;
