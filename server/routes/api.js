/**
 *  All the routes 
 *  Controllers for Api results
 * 1- endPoint that returns all documents
 * 2- endPoint that returns one document (id)
 * 3- endPoint returns documents within a rectangle 
 */

const express = require("express");

const router = express.Router();

 // Database module
const Dao = require("../db/conn");
 
 //parser middleware will parse the json payload
 router.use(express.json());
 
 // Routes to get documents within geospatial polygon.
 router.post("/", async function (req, res) {
   const coordinates =  req.body;
   const dao = new Dao();
   const documents = await dao.getDocumentsWithinGeoPolygon(coordinates);
   res.json(documents);
 });


 
 module.exports = router;
 