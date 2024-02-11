import http from 'http';
import { v4 as uuid } from 'uuid';
import { users } from '.';
import { API_ENDPOINT, requiredFields } from './constants';
import { getUserIdFromUrl, isProvidedUserIdValid } from './utils';

export const requestHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
): void => {
  switch (req.method) {
    case 'GET':
      if (req.url === API_ENDPOINT) {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(users));
      }
      if (req.url?.startsWith(API_ENDPOINT) && req.url !== API_ENDPOINT) {
        const userId = getUserIdFromUrl(req.url);
        if (isProvidedUserIdValid(userId)) {
          const user = users.filter((user) => user.id === userId);
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
      break;

    case 'POST':
      if (req.url === API_ENDPOINT) {
        const userId = uuid();

        req.on('data', (chunk) => {
          const record = JSON.parse(chunk.toString());
          if (requiredFields.filter((field) => !(field in record)).length) {
            res.writeHead(400, { 'Content-type': 'text/plain' });
            res.end('Body does not contain required fields');
          } else {
            record.id = userId;
            users.push(record);
          }
        });

        req.on('end', () => {
          const user = users.filter((user) => user.id === userId);
          if (user.length) {
            res.writeHead(201, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(user));
          }
        });
      }
      break;

    case 'PUT':
      if (req.url?.startsWith(API_ENDPOINT) && req.url !== API_ENDPOINT) {
        const userId = getUserIdFromUrl(req.url);
        const targetUserIndex = users.findIndex((user) => user.id === userId);
        console.log(targetUserIndex);

        if (isProvidedUserIdValid(userId)) {
          req.on('data', (chunk) => {
            const record = JSON.parse(chunk.toString());

            if (targetUserIndex !== -1) {
              users[targetUserIndex] = { ...users[targetUserIndex], ...record };
            } else {
              res.writeHead(404, { 'Content-type': 'text/plain' });
              res.end('User with provided id is not found');
            }
          });

          req.on('end', () => {
            if (targetUserIndex !== -1) {
              res.writeHead(200, { 'Content-type': 'application/json' });
              res.end(JSON.stringify(users[targetUserIndex]));
            }
          });
        } else {
          res.writeHead(400, { 'Content-type': 'text/plain' });
          res.end('Provided user Id is invalid');
        }
      }
      break;

    default:
      break;
  }
};
