import app from "../server";
import request from "supertest";

describe("test all endpoints", () => {
  it("get all user data", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([
      { id: 1, fname: "vikas", lname: "singh", age: 25 },
    ]);
  });

  it("get single user data", async () => {
    const response = await request(app).get("/user/1");
    expect(response.status).toBe(200);
  });

  it("return 404 for non-existent user", async () => {
    const response = await request(app).get("/user/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User not found",
    });
  });

  it("create user", async () => {
    const newUser = { fname: "John", lname: "Doe", age: 30 };
    const response = await request(app).post("/user").send(newUser);
    expect(response.status).toBe(201);
  });

  it("update user", async () => {
    const updateData = { fname: "vikash", lname: "singh", age: 30 };
    const response = await request(app).patch("/user/1").send();
    expect(response.status).toBe(200);
  });

  it("delete user", async () => {
    const response = await request(app).delete("/user/1");
    expect(response.status).toBe(200);
  });

  it("return 404 for non-existent user", async () => {
    const response = await request(app).delete("/user/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User not found",
    });
  });
});
