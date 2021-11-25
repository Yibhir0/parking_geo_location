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
 
// Parser middleware will parse the json payload
router.use(express.json());
 
 // Routes to get documents within geospatial polygon.
router.get("/polygon", async function (req, res) {
  
  // Get the query string object
  const polyObj = req.query;

  // Validate if the query string contains valid keys and values
  const validPolyPoints = validatePolygonPoints(polyObj);

  // Get Dao intance
  const dao = new Dao();

  if(validPolyPoints){
    
    // Complete the other points of the polygon
    const polygon =  completePolygonPoints(validPolyPoints);
    
    // Get the document from database
    const documents = await dao.getDocumentsWithinGeoPolygon(polygon);
    
    // Send Json response
    res.send(documents);

  }

  // Send 404
  else{
    res.status(404).send({ "Error": "Query string is not valid or existent" });
  }
});

/**
 * This method adds the point missing the polygon
 * @param {Object} polyObj 
 * @returns Objects with the other points added
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