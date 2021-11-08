/**
 * Connecting to database, creating a collection
 * , inserting many, and disconnecting.
*/

// Mongodb client
const { MongoClient } = require("mongodb");

// Environment Variable
require("dotenv").config();

/**
 * Singelton class creates and accesses the database.
*/
class Dao {
  constructor(){
    
    // return instance if it already exists 
    if(Dao.instance instanceof Dao){
      return Dao.instance;
    }
    
    // Mongodb variables 
    this.mongoVars = {
      "client" : new MongoClient(process.env.ATLAS_URL),
      "dbName" : "parking_streets",
      "collection" : "parkings"
    }
    // Can't change the values of mongoVars
    Object.freeze(this.mongoVars);

    // Set the instance to the created object
    Dao.instance = this;

  }

  /**
   * This method connects to mongoDb
   */
  async connect(){
    
    try {

      await this.mongoVars.client.connect();

      console.log("Connected to Atlas");

    } catch (err) {

      console.error(err);
        
    }

  }

  /**
   * This method inserts the documents into the database.
   * It Creates a geospatial 2dsphere index.
   * @param {array of objects (documents)} data 
   */
  async insertMany(data){
    

    try {
      
      // Create or access a database
      const db = this.mongoVars.client.db(this.mongoVars.dbName);

      // Create or access a collection
      const col = db.collection(this.mongoVars.collection);

      // Insert many documents 
      const result = await col.insertMany(data);
      
      // Create geospatial index
      const index = await col.createIndex({ "geometry": "2dsphere" });
      
      // Print number of documents iserted
      console.log(result.insertedCount);

      // Print index result
      console.log(index);
    
    // Catch error and display it
    } catch (err) {

      console.error(err);

    }    
  
  }
  
  /**
   * This method closes the connection
   */
  async close(){
    try {
      this.mongoVars.client.close();
      
    } catch (err) {
  
      console.error(err);
  
    }    
  }


}

// Sample data
const parkings = [ 
    
  {
      
    "LOCATION": "Rue Fleury near Chambord St. (parking #335)",
    "HOURS": "3:00 pm to 07:00 am",
    "BOROUGH": "Ahunstic-Cartierville",
    "NBR_PLA_I": 17, 
    "NOTE_EN": "Hourly spaces",
    "TYPE_PAY": 0,
    "geometry": { "type": "Point", "coordinates": [-73.6584, 45.56] } 
  },
  {   
    "LOCATION": "Lucie-Bruneau Park - 7051 de l'Alsace Ave",
    "HOURS": "6:00 am to 6:00 pm",
    "BOROUGH": "Anjou",
    "NBR_PLA_I": 20,
    "NOTE_EN": null,
    "TYPE_PAY": 0,
    "geometry": { "type": "Point", "coordinates": [-73.5833, 45.6033] } 
  } 
];  


// Sample test
(async function(){
  const dao = new Dao();
  await dao.connect();
  await dao.insertMany(parkings);
  await dao.close();
  // check singelton implementation
  const dao1 = new Dao();
  console.log(dao === dao1);
})();

