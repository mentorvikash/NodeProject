import path from "path";
import app from "../server";
import request from "supertest";

describe("test file upload functionality", () => {
  it("if single file uploded", async () => {
    const response = await request(app)
      .post("/upload")
      .attach("file", path.join(__dirname, "../public/now.png"));
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('File uploaded successfully');
    });
});
