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
module.exports = router;
 