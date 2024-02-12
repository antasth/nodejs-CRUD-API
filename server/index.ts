import http from 'http';
import { IUser } from './types';
import 'dotenv/config';
import { requestHandler } from './handler';

export const users: IUser[] = [];

const server = http.createServer((req, res) => {
  console.log(req);

  try {
    requestHandler(req, res);
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
