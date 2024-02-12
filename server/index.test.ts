import http from 'http';
// import { users } from '.';
import { requestHandler } from './handler';
import { IUser } from './types';

const users: IUser[] = [];

// const user = {
//   id: '6258b341-ca4b-434e-90d2-ce13cb2c6e82',
//   name: 'alex',
//   age: '22',
//   hobbies: ['tv', 'games'],
// };

describe('Server Tests', () => {
  let server: http.Server;

  beforeAll((done) => {
    server = http.createServer(requestHandler);
    server.listen(4000, done);
  });
  afterAll((done) => {
    server.close(done);
  });
  const postOptions = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  test('GET /api/users should return all users', (done) => {
    const req = http.request(postOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(data)).toEqual(users);
        done();
      });
    });

    req.end();
  });
});
