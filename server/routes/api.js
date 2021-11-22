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
 * /api/id/:id:
 *   get:
 *     summary: Retrieves document with specific id.
 *     description: Retrieves the selected document by giving an id value in the URL.
 */
router.get("/id/:id", async function(req, res){
  try{
    let dao = new Dao();
    const result = await dao.getDocById(req.params.id);
    res.send(result);
  }catch(err){
    console.error(err);
  }
})

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
 