import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
    connection: "connection",
    disconnecting:'disconnecting',
    CLIENT: {
      SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
      JOIN_ROOM: "JOIN_ROOM",
      LEAVE_ROOM:'LEAVE_ROOM'
    },
    SERVER: {
      JOINED_ROOM: "JOINED_ROOM",
      GUEST:'GUEST',
      ROOM_MESSAGE: "ROOM_MESSAGE",
    },
  };
interface guest {
  guest:{name:string, id:string};
}
const roomId = nanoid(); 
let guest = {name:'', id:''};
function socket({ io }: { io: Server }) {
    logger.info(`Sockets enabled`);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (val)=>{
            socket.join(roomId)
            if(val!=undefined) {
              socket.to(roomId).emit(EVENTS.SERVER.GUEST, {name:val.name});
              socket.emit(EVENTS.SERVER.JOINED_ROOM);
              guest['name']=val.name;
            }
            else {
              socket.emit(EVENTS.SERVER.JOINED_ROOM, {guest:guest.name})
            }
        })
        // socket.on(EVENTS.disconnecting, ()=>{
        //   logger.info(`User disconected ${socket.id} karta salam`);
        // })
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
