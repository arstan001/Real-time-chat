import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
    connection: "connection",
    disconnecting:'disconnecting',
    CLIENT: {
      SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
      CREATE_ROOM:'CREATE_ROOM',
      JOIN_ROOM: "JOIN_ROOM",
      LEAVE_ROOM:'LEAVE_ROOM'
    },
    SERVER: {
      JOINED_ROOM: "JOINED_ROOM",
      ROOMS:'ROOMS',
      GUEST:'GUEST',
      ROOM_MESSAGE: "ROOM_MESSAGE",
    },
  };

const rooms:Record<string, {name:string}> = {}
function socket({ io }: { io: Server }) {
    logger.info(`Sockets enabled`);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName})=>{
          const roomId = nanoid();
          rooms[roomId]={name:roomName};
          socket.join(roomId);
          socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
          socket.emit(EVENTS.SERVER.ROOMS, rooms)
          socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)
        })

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId)=>{
            socket.join(roomId)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)
        })
        // socket.on(EVENTS.disconnecting, ()=>{
        //   logger.info(`User disconected ${socket.id} karta salam`);
        // })
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({message, roomId, username})=>{ 
            const date = new Date();
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()}`,
                userId:socket.id
            })
        })

    })

    

}

export default socket;
