import { Server, Socket } from 'socket.io';
import { socketRoute } from './utils/socket.utils.js';
import * as mysql from '../mysql/mysql.service.js';

const socketsMap = new Map<number, Socket>();

export const manageSocket = (io: Server) => {
  io.on(socketRoute.connection, (socket: Socket | undefined) => {
    if (!socket) return;

    let id: number = 0;
    let username: string | null = null;
    let sendError: boolean = false;


    //Connection
    try {
      if (socket.handshake.query.id) id = Number(socket.handshake.query.id);
      if (!id) sendError = true;
      if (socket.handshake.query.username)
        username = socket.handshake.query.username.toString();
      if (!username) sendError = true;
      if (!sendError) {
        socketsMap.set(id, socket);
        socket.emit(socketRoute.connected);
        socketsMap.forEach((value, key) => {
          if (key !== id) {
            value.emit(socketRoute.newConnection, id, username);
          }
        });
      } else {
        socket.emit(socketRoute.connection_failed);
        socket.disconnect();
      }
    } catch (error) {
      socket.emit(socketRoute.connection_failed);
      socket.disconnect();
    }

    //Disconnection by user
    socket.on(socketRoute.disconnect, () => {
      const query = 'UPDATE User SET lastConnection = ? WHERE id = ?';
      const values = [new Date(), id];
      mysql.updateUserMysqlData(query, values);
      socketsMap.delete(id);
      socketsMap.forEach((value, key) => {
        value.emit(socketRoute.newDisconnect, id, username);
      });
    });

    //request
    socket.on(socketRoute.isUserConnected, (id: number) => {
      const response: Socket | null = isSocketExist(id);
      socket.emit(socketRoute.receptIsConnected, response ? true : false);
    });

    socket.on(socketRoute.sendView, (senderUsername: string, receiverId: number) => {
      const response: Socket | null = isSocketExist(receiverId);
      if (response) response.emit(socketRoute.receptView, senderUsername);
    });

    socket.on(socketRoute.sendLike, (senderUsername: string, receiverId: number) => {
      const response: Socket | null = isSocketExist(receiverId);
      if (response) response.emit(socketRoute.receptLike, senderUsername);
    });

    socket.on(socketRoute.sendDislike, (senderUsername: string, receiverId: number) => {
      const response: Socket | null = isSocketExist(receiverId);
      if (response) response.emit(socketRoute.receptDislike, senderUsername);
    });

    socket.on(socketRoute.sendBan, (receiverId: number) => {
      const response: Socket | null = isSocketExist(receiverId);
      if (response) response.emit(socketRoute.receptBan);
    });
  });
};

const isSocketExist = (id: number): Socket | null => {
  socketsMap.forEach((value, key) => {
    if (key === id) return value;
  });
  return null;
};
