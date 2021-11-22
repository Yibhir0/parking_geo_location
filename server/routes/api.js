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
  
  const polyObj = req.query;

  const validPolyPoints = validatePolygonPoints(polyObj);

  const dao = new Dao();

  if(validPolyPoints){
    const polygon =  completePolygonPoints(validPolyPoints);
   
    const documents = await dao.getDocumentsWithinGeoPolygon(polygon);
    
    res.send(documents);

  }

  else{
    res.status(404).send({ "Error": "Query string is not valid or existent" });
  }
});

/**
 * 
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
 * 
 * @param {*} polyObj 
 * @returns 
 */
function validatePolygonPoints(polyObj){
  let coordinates = {}
  if(polyObj.neLat && polyObj.neLon && polyObj.swLat && polyObj.swLon){
    Object.keys(polyObj).forEach(k => {
      let result = validateNumeric(polyObj[k]);
      if(result){
        coordinates[k] = result
      }
      else{
        return false;
      }
    });
  }

  return coordinates;

  
}

/**
 * 
 * @param {*} num 
 * @returns 
 */
function validateNumeric(num){
  let result = parseFloat(num);
  return isNaN(result) ? undefined : result;

}

 
 module.exports = router;