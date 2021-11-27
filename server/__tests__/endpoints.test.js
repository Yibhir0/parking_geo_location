
/**
 * Unit test the endpoints with supertest. The test
 * mock the database connection. 
 */
const request = require("supertest");
const app = require("../app");

const Dao = require("../db/conn");

jest.mock("../db/conn");


describe("GET /api ", () => {
    test("It should response with an array of json object", async () => {
      const resolvedValue = [{ "Mock": "Mock Me" }]
      jest.spyOn(Dao.prototype, "getAllDoc").mockResolvedValue(resolvedValue)
      const response = await request(app).get("/api");
      expect(response.body).toEqual(resolvedValue)
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe("application/json")
    })
  });
  
  describe("GET /api/id/:id ", () => {
    test("It should response with a json object", async () => {
      const resolvedValue = { "id": "Still Mocking" }
      jest.spyOn(Dao.prototype, "getDocById").mockResolvedValue(resolvedValue)
      const response = await request(app).get("/api/id/mockId");
      expect(response.body).toEqual(resolvedValue)
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe("application/json")
    })
  }); 

    
  describe("GET /api/polygon/?neLat=val&neLon=val&swLat=val&swLon=val ", () => {
    test("It should response with an array of json object", async () => {
      const resolvedValue = [{ "geo": "polygon" }]
      jest.spyOn(Dao.prototype, "getDocumentsWithinGeoPolygon").mockResolvedValue(resolvedValue)
      const response = await request(app).get("/api/polygon/?neLat=45&neLon=-73&swLat=50&swLon=-75");
      expect(response.body).toEqual(resolvedValue)
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe("application/json")
    })
  });