import http from 'http';
import { IUser } from './types';
import { PORT } from './constants';
import { requestHandler } from './handler';

export const users: IUser[] = [];

const server = http.createServer((req, res) => {
  try {
    requestHandler(req, res);
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
