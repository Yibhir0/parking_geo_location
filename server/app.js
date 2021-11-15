/**
  * Link to all endPoint
 */
 "use srict"

 const express = require("express");
 const app = express();
 const path = require("path");
 

 app.get("/api", api);
  

 module.exports = app;