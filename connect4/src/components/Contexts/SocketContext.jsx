import { createContext } from 'react';
import { io } from 'socket.io-client';
import * as endpoints from '../API/endpoints';

/**
 * Create socket connection.
 * @param {string} username
 * @param {JSON} token
 * @returns
 */
export const newSocket = (username, token) => {
  return io(
    process.env.NODE_ENV === 'production' ? endpoints.EC2 : endpoints.LOCALHOST,
    {
      query: {
        username,
      },
      auth: {
        token,
      },
    }
  );
};

/**
 * Create socket context.
 */
export const SocketContext = createContext();
