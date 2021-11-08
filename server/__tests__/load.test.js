/**
 * Test load.js 
 */
const readData = require("../utils/load")

//Ensure that the module loads the file and returns an object.
test("Test loading a file", async() => {
  const data = await readData("__tests__/sample.json");
  expect(data).toBeDefined()
});
  