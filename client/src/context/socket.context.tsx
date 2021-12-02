import { createContext, useContext, useState } from "react";
import io, {Socket} from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/evets";

const socket = io(SOCKET_URL);
interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string, usertype: string }[];
  setMessages: Function;
  roomId?: string;
  usertype?: string;
  setUsertype: Function;
  guest?:string;
  setGuest:Function;
  // rooms: object;
}
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  setUsertype: ()=>false,
  setGuest:()=>false,
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState('');
  const [messages, setMessages] = useState([]);
  const [guest, setGuest] = useState('');
  socket.on(EVENTS.SERVER.JOINED_ROOM, ()=>{
    setMessages([]);
  })

  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({message, username,time, usertype})=>{
    setMessages([
      ...messages,
      {
        message,
        username,
        time,
        usertype
      }
    ])
  })
  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        usertype,
        setUsertype,
        messages,
        setMessages,
        setGuest,
        guest

      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;