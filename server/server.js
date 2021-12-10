/**
 * Main file run express server 
 * const PORT = process.env.PORT || 3001
 */

const app = require("./app");

// Environment Variable
require("dotenv").config();

// Port number
const PORT = process.env.PORT || 3001;

// Database module
const Dao = require("./db/conn");

// DataBase name
const dbName = "parkings";

// Collection Name
const collName = "parking_streets";

/**
 * This IIFE starts listening after 
 * the connection to database is established
 */
(async () => {
  try {
        
    // Create Dao instance
    let dao = new Dao();

    // Connect to database
    await dao.connect(dbName, collName);

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}!`);
    });
    
  } catch (e) {
    console.error("could not connect");
    console.error(e.message);
    process.exit();
  }
  
})();
