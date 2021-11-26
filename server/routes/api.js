/**
 *  All the routes 
 *  Controllers for Api results
 * 1- endPoint that returns all documents
 * 2- endPoint that returns one document (id)
 * 3- endPoint returns documents within a rectangle
 * @author Yassine & Estefan 
 */

// Express module
const express = require("express");

// Initialize express router
const router = express.Router();

// Database module
const Dao = require("../db/conn");

// Swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Memory cache module
const cache = require("memory-cache");



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


// Parser middleware will parse the json payload
router.use(express.json());

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieves all the documents from database.
 *     description: Retrieves every single document from the collection.
 */
router.get("/", async function (req, res) {

  try{
    
    // Cache key 
    const cacheK = "getAll";

    // Get data from cache
    let allData = cache.get(cacheK);
    let dao = new Dao();
    
    // If data is not in cache
    if(!allData){
    
      // Get from db
      allData = await dao.getAllDoc();

      // Put data in cache
      cache.put(cacheK, allData);
    }
    
    res.send(allData);
  // Response with 404 error
  }catch(err){
    res.status(404).send({ "Error": err.message });
    console.error(err);
  }
}); 


 /**
 * @swagger
 * /polygon:
 *   get:
 *     summary: Retrieves all tthe points within polygon.
 *     description: Retrieves every single points from the collection with a given polygon object. Uses coordinates.
 */
 // Routes to get documents within geospatial polygon.
 router.get("/polygon", async function (req, res) {
  
  try{

      // Get the query string object
      const polyObj = req.query;

      // Cach key
      const cacheK = polyObj.neLat+polyObj.neLon+polyObj.swLat+polyObj.swLon;

      // Get data from cache
      let documents = cache.get(cacheK);

      if (!documents){

        // Validate if the query string contains valid keys and values
        const validPolyPoints = validatePolygonPoints(polyObj);
  
        // Get Dao intance
        const dao = new Dao();
      
        // Complete the other points of the polygon
        const polygon =  completePolygonPoints(validPolyPoints);

        // Get the document from database
        documents = await dao.getDocumentsWithinGeoPolygon(polygon);

        // We only store data when documents is not empty
        if(documents.length > 0){
          // Put data in cache
          cache.put(cacheK, documents);
        }
        
      }

      // Send Json response
      res.send(documents);
 
    }
  catch(err){
    res.status(404).send({ "Error": err.message });
  }

  });


/**
 * @swagger
 * /api/id/:id:
 *   get:
 *     summary: Retrieves document with specific id.
 *     description: Retrieves the selected document by giving an id value in the URL.
 */
router.get("/id/:id", async function(req, res){
  try{
    let dao = new Dao();

    // Cache key 
    const cacheK = req.params.id;
    // Get data from cache
    let document = cache.get(cacheK);

    if(!document){
      document = await dao.getDocById(cacheK);

      // We only store data when documents is not empty
      if(document.length > 0){
        // Put data in cache
        cache.put(cacheK, document);
      }
      
      
    }
    
    res.send(document);
  
  }catch(err){
    res.status(404).send({ "Error": err.message });
  }
})

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
 
/**
 * Adds more points to make a
 * polygon.
 * @param {*} polyObj 
 * @returns 
 */
function completePolygonPoints(polyObj){
  polyObj.nwLat = polyObj.neLat;
  polyObj.nwLon = polyObj.swLon;
  polyObj.seLat = polyObj.swLat;
  polyObj.seLon = polyObj.neLon;

  return polyObj;

}
/**
 * This method checks if the polygon object
 * contains all the coordinates. It uses a
 * helper method validateNumeric to convert from
 * string to float.
 * @param {Object} polyObj 
 * @returns Object with numeric coordinates
 */
function validatePolygonPoints(polyObj){
  let coordinates = {}
  if(polyObj.neLat != undefined && polyObj.neLon != undefined && polyObj.swLat != undefined && polyObj.swLon != undefined){
    
    Object.keys(polyObj).forEach(k => {
      let result = validateNumeric(polyObj[k]);
      
      if(result){
        coordinates[k] = result
      }
  
    });
  }

  return Object.keys(coordinates).length == 4 ?  coordinates : undefined;
  
}

/**
 * This method parses and validates points
 * @param {String} num 
 * @returns float or undefined
 */
function validateNumeric(num){
  let result = parseFloat(num);
  return isNaN(result) ? undefined : result;

}
 
module.exports = router;
