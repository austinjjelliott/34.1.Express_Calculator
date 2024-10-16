const request = require("supertest");
const app = require("./express"); // Import the app

describe("find MEAN", function () {
  it("expects an error if no nums given ", async function () {
    const res = await request(app).get("/mean");
    expect(res.status).toBe(400);
    expect(res.body.err).toBe("nums are required");
  });
  it("finds the mean of an array of numbers", async function () {
    const res = await request(app).get("/mean?nums=1,2,3");
    expect(res.status).toBe(200);
    expect(res.body.operation).toBe("mean");
    expect(res.body.result).toBe(2);
  });
});

describe("find MEDIAN ", function () {
  it("expects an error if no nums given ", async function () {
    const res = await request(app).get("/median");
    expect(res.status).toBe(400);
    expect(res.body.err).toBe("nums are required");
  });
  it("finds the median of an array of numbers", async function () {
    const res = await request(app).get("/median?nums=1,2,3");
    expect(res.status).toBe(200);
    expect(res.body.operation).toBe("median");
    expect(res.body.result).toBe(2);
  });
});

describe("find MODE", function () {
  it("expects an error if no nums given ", async function () {
    const res = await request(app).get("/mode");
    expect(res.status).toBe(400);
    expect(res.body.err).toBe("nums are required");
  });
  it("finds the mode of an array of numbers", async function () {
    const res = await request(app).get("/mode?nums=1,2,2,3");
    expect(res.status).toBe(200);
    expect(res.body.operation).toBe("mode");
    expect(res.body.result).toBe(2);
  });
});
