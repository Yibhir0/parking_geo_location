/**
 * Main file run express server 
 * const PORT = process.env.PORT || 3001
 */

 "use strict"
 const app = require("./app");
 const Dao = require("./db/conn");
 const dbName = "parkings";

// Collection Name
const collName = "parking_streets";

 (async function(){
    
 try{
   

    // Create Dao instance
    let dao = new Dao();

    // Connect to database
    await dao.connect(dbName, collName);
    
    // Start server when database connection is set
    app.listen(3000, () => {
        console.log("Server listening on port 3000!");
      });
  
  } catch(err){
    console.error(err);
  }
 
})();


 