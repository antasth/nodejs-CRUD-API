import http from 'http';
import { users } from './users';

const PORT = 3000;
const API_ENDPOINT = '/api/users';

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === API_ENDPOINT) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(users));
    }

    if (req.url?.startsWith(API_ENDPOINT)) {
      const regex = /\/(\d+)$/;
      const match = req.url.match(regex);
      const userId = match ? match[1] : null;
      if (userId) {
        const user = users.filter((user) => user.id === +userId);
        if (user.length) {
          res.writeHead(200, { 'Content-type': 'application/json' });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, { 'Content-type': 'text/plain' });
          res.end('User with provided id is not found');
        }
      } else {
        res.writeHead(400, { 'Content-type': 'text/plain' });
        res.end('Provided user Id is invalid');
      }
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
