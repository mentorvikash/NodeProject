import { createServer } from "http";
import { IncomingMessage, ServerResponse } from "http";
import request from "supertest";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

test("server is running of not", async () => {
  const response = await request(server).get("/");
  expect(response.text).toBe("Hello World");
});
