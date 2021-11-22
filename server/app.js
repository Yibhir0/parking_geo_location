/**
  * Link to all endPoint
 */
"use srict"

const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/api.js");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = {
  info:{
    title: 'GeoJson api of parkings in Montreal',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./server/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);
 

app.use("/api", api);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.static(path.resolve(__dirname, '../client')));
  

module.exports = app;