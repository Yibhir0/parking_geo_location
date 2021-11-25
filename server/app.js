/**
  * Link to all endPoint
 */

 const express = require("express");
 const app = express();
 const path = require("path");
 const api = require("./routes/api");
 
 
 app.use("/api", api);
 
 //app.use(express.static(path.resolve(__dirname, '../client/build')));
 
 module.exports = app;
 