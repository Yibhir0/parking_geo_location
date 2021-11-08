/**
 * Load atlas with dataset.
 */

const insertToDb = require("./utils/writeToDb");

const dbName = "parkings";

const collName = "parking_streets";

(async function(){

    await insertToDb(dbName,collName);

}());