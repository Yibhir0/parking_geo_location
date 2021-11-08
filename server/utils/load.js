/**
 * Read file that contains dataset using fs/promises
 * and return an array of objects (array of documents)
 * to store in mongodb. We only read values we use.
 * More details in the project instructions.
 */
 "use strict"

//Import fs module to read file
const fs = require("fs/promises")

/**
 * Read the content of the file with a 
 * given path.
 * 
 * @param {*} path path of the file to be read
 * @returns return an object made with the JSON.
 */
async function read(path){
  try{
    let data = await fs.readFile(path, "utf-8")
    return JSON.parse(data)
  }catch(err){
    console.error(err.message)
  }
}

/**
 * Calls the "read" method to read the content
 * and process the data to select the specific
 * properties
 * 
 * @returns {Object} Array of objects
 */
async function readData(){
  const finalArray = []
  let result = await read("./montreal_parking_streets.json")
  result.forEach(element => {
    finalArray.push({
      LOCATION: element.properties.LOCATION,
      HOURS: element.properties.HOURS,
      NBR_PLA_I: element.properties.NBR_PLA_I, 
      NOTE_EN: element.properties.NOTE_EN,
      TYPE_PAY: element.properties.TYPE_PAY,
      geometry: element.geometry
    });
  })
  return finalArray
} 

module.exports = readData
