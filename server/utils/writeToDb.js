/**
 * Take the result array from load.js.
 * Use conn.js to insert the array of documents in mongodb
 * Create index geo.
 */


// Path of data set
const path = "./server/utils/montreal_parking_streets.json";

//Load module
const readData = require("./load");

// Database module
const Dao = require("../db/conn");

/**
 * Access load.js to get an array of documents.
 * Connet to database and InsertMany.
 * @param {String} dbName 
 * @param {string} colName 
 */
async function insertToDb(dbName, colName){

    // Read and get documents
    let documents = await readData(path);

    // Create Dao instance
    let dao = new Dao();

    // Connect to database
    await dao.connect(dbName, colName);
    
    // Insert documents
    await dao.insertMany(documents);
    
    // Close connection
    await dao.close();

}

module.exports = insertToDb;