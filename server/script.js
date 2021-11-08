/**
 * Load atlas with dataset.
 */

const insertToDb = require("./utils/writeToDb");

// DataBase name
const dbName = "parkings";

// Collection Name
const collName = "parking_streets";

/**
 * Async IIFE populate dataset. 
 */
(async function(){

    await insertToDb(dbName,collName);

}());