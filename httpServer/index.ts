import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3001;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(PORT || 3001, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});