/**
 * Test load.js 
 * @author Estefan Maheux-Saban
 * @author Yassine Ibhir
 */
const readData = require("../utils/load")


//Ensure that the module loads the file and returns an object.
test("Test loading a file", async() => {
  const data = await readData("__tests__/sample.json");
  expect(data).toBeDefined()
});


describe("Test number of elements in array ", () => {
  test("It should return 2 elements", async () => {
    const data = await readData("__tests__/sample.json");
    const elements = data.length;
    expect(elements).toBe(2);
  });
});


describe("test if objects contain geometry field ", () => {
  test("It should return 2 elements with geometry field", async () => {
    const data = await readData("__tests__/sample.json");
    data.forEach(element => {
      const hasGeometry = element["geometry"] !== undefined
      expect(hasGeometry).toBe(true);
    });
  });
});

  