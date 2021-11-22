/**
 *  All the routes 
 *  Controllers for Api results
 * 1- endPoint that returns all documents
 * 2- endPoint that returns one document (id)
 * 3- endPoint returns documents within a rectangle 
 */

const express = require("express");
const router = express.Router();
const Dao = require("../db/conn");

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieves all the documents from database.
 *     description: Retrieves every single document from the collection.
 */
router.get("/", async function (req, res) {
  try{
    let dao = new Dao();
    let allData = await dao.getAllDoc();
    res.send(allData);
    await dao.close();
  }catch(err){
    console.error(err);
  }
});

/**
 * @swagger
 * /api/:id:
 *   get:
 *     summary: Retrieves document with specific id.
 *     description: Retrieves the selected document by giving an id value in the URL.
 */
router.get("/:id", async function(req, res){
  try{
    let dao = new Dao();
    const result = await dao.getDocById(req.params.id);
    res.send(result);
  }catch(err){
    console.error(err);
  }
})

module.exports = router;
 