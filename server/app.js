/**
  * Link to all endPoint
 */
"use srict"

const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/api.js");
 

app.use("/api", api);
app.use(express.static(path.resolve(__dirname, '../client')));
console.dir(__dirname)
  

module.exports = app;