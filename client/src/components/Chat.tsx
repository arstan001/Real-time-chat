import { useSockets } from "../context/socket.context";

const Chat = () => {
    const {socket} = useSockets();
    return(
        <div>
            <h1>Here is chat</h1>
            <p>{socket.id}</p>
        </div>
    )
}

export default Chat