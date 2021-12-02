import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
    connection: "connection",
    CLIENT: {
      SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
      JOIN_ROOM: "JOIN_ROOM",
    },
    SERVER: {
      JOINED_ROOM: "JOINED_ROOM",
      GUEST:'GUEST',
      ROOM_MESSAGE: "ROOM_MESSAGE",
    },
  };

const roomId = nanoid(); 

function socket({ io }: { io: Server }) {
    logger.info(`Sockets enabled`);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (val)=>{
            socket.join(roomId)
            logger.info(`User connected ${val}`);
            if(val!=undefined) socket.to(roomId).emit(EVENTS.SERVER.GUEST, {name:val.name});
            socket.emit(EVENTS.SERVER.JOINED_ROOM)
        })

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({message, username, usertype})=>{
            const date = new Date();

            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`,
                usertype
            })
        })

    })

    

}

export default socket;
