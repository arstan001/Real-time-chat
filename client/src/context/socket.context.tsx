import { createContext, useContext, useEffect, useState } from "react";
import io, {Socket} from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/evets";

const socket = io(SOCKET_URL);

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string, userId: string }[];
  setMessages: Function;
  roomId?: string;
  rooms:object
}
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  messages: [],
  rooms:{}
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState({});
  const [roomId, setRoomId] = useState('');

  useEffect(()=>{
   window.onfocus = ()=>{
     document.title = 'Chat App'
   } 
  },[]) 
  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time, userId }) => {
      if (!document.hasFocus()) {
            document.title = "New message...";
          }
    setMessages((messages) => [...messages, { message, username, time, userId }]);
  });
}, [socket]);  
  socket.on(EVENTS.SERVER.JOINED_ROOM, (value)=>{
    setRoomId(value);
    setMessages([]);
  })
  socket.on(EVENTS.SERVER.ROOMS, (value)=>{
    setRooms(value);
  })

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        roomId,
        setUsername,
        messages,
        setMessages,
        rooms,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;