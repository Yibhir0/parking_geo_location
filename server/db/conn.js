/**
 * Connecting to database, creating a collection
 * , inserting many, and disconnecting.
 * @author Yassine Ibhir
*/

// Mongodb client
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;



// Environment Variable
require("dotenv").config();

let instance = null ;

/**
 * Singelton class creates and accesses the database.
*/
class Dao {
  constructor(){
    
    // return instance if it already exists 
    if(instance){
      return instance;
    }
    
    // Mongodb variables 
    this.client =  new MongoClient(process.env.ATLAS_URL);
    this.db = null;
    this.collection = null;
    
    // Set the instance to the created object
    instance = this;

  }

  /**
   * This method connects to mongoDb
   * @param {data base name} dbName 
   * @param { collection name} collName 
   * @returns from function when connection isestablished
   */
  async connect(dbName, collName){

    if (this.db){
      console.log("Connected to Atlas");
      return;
    }
    
    try {

      // Connect to db
      await this.client.connect();

      console.log("Connected to Atlas");

      // Create or access a database
      this.db = await this.client.db(dbName);

      // Create or access a collection
      this.collection = await this.db.collection(collName);

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
  
      // Insert many documents 
      const result = await this.collection.insertMany(data);
      
      // Print number of documents iserted
      console.log(result.insertedCount);

    // Catch error and display it
    } catch (err) {

      console.error(err);

    }    
  
  }

  /**
   * Method Creates a geospatial 2dsphere index.
   * @param {object} index
   */
  async createInx(index){
    
    try {
      // Create geospatial index
      const result = await this.collection.createIndex(index);
    
      // Print index result
      console.log(result);
    // Catch error and display it
    } catch (err) {
      console.error(err);
    }  
    
    
  }

  /**
   * Method Retrieve whole document from database
   */
  async getAllDoc(){
    try{
      const result = await this.collection.find().toArray();
      return result;
    }catch(err){
      console.error(err);
    }
  }

/**
 * Method to Retrieve specific document from id
 * @param {id of document} id 
 * @returns document query
 */
  async getDocById(id){
    try{
      const result = await this.collection.find(ObjectId(id)).toArray();
      return result;
    } catch(err){
      console.error(err);
    }
  }
  
  /**
   * This method closes the connection
   */
  async close(){
    try {
      this.client.close();
      
    } catch (err) {
  
      console.error(err);
  
    }    
  }

  // Add 3 methods for endPoints


}

module.exports = Dao;

// Sample data
// const parkings = [ 
    
//   {
      
//     "LOCATION": "Rue Fleury near Chambord St. (parking #335)",
//     "HOURS": "3:00 pm to 07:00 am",
//     "BOROUGH": "Ahunstic-Cartierville",
//     "NBR_PLA_I": 17, 
//     "NOTE_EN": "Hourly spaces",
//     "TYPE_PAY": 0,
//     "geometry": { "type": "Point", "coordinates": [-73.6584, 45.56] } 
//   },
//   {   
//     "LOCATION": "Lucie-Bruneau Park - 7051 de l'Alsace Ave",
//     "HOURS": "6:00 am to 6:00 pm",
//     "BOROUGH": "Anjou",
//     "NBR_PLA_I": 20,
//     "NOTE_EN": null,
//     "TYPE_PAY": 0,
//     "geometry": { "type": "Point", "coordinates": [-73.5833, 45.6033] } 
//   } 
// ];  


// // Sample test
// (async function(){
//   const dao = new Dao();
//   await dao.connect("parking", "parking_streets");
//   await dao.insertMany(parkings);
//   await dao.close();
//   // check singelton implementation
//   const dao1 = new Dao();
//   console.log(dao === dao1);
// })();

