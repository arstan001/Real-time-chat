import { useSockets } from "../context/socket.context";
import styled from 'styled-components';
import { useRef } from "react";
import EVENTS from "../config/evets";
import colors from "../config/color";

const Intro = () => {
    const {socket, setUsername, setUsertype, setGuest} = useSockets();
    
    const usernameRef = useRef(null)
    function handleUsername(){
        const value = usernameRef.current.value;
        if(!value){
            return
        }
        setUsername(value);
        setGuest(value);
        setUsertype('Client');
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, {name:value});
        usernameRef.current.value='';
    }
    function handleAdmin(){
        setUsername('Admin');
        setUsertype('Admin');
        socket.emit(EVENTS.CLIENT.JOIN_ROOM);
        usernameRef.current.value='';
    }
    return(
        <Wrapper>
            <Input>
                <h1>Welcome to Chat!</h1>
                <Name ref={usernameRef} placeholder='Enter Username'/>
                <Button onClick={handleUsername}>Start</Button>
            </Input>
            <AdminButton onClick={handleAdmin}>admin</AdminButton>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #161616 ;
`
const Input = styled.div`
    width: 300px;
    /* height: 100px; */
    display: flex;
    padding: 24px;
    flex-direction: column;
    border-radius: 8px;
    background-color: #E75818 ;
`

const Name = styled.input`
    border:none;
    height: 30px;
    margin: 0px 24px 22px 24px;
    border-radius: 8px;
    padding: 0 12px;
    outline: none;
`
const Button = styled.button`
    border:none;
    width: 60px;
    height: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    cursor: pointer;
`
const AdminButton = styled.button`
    background: none;
    border:none;
    cursor: pointer;
    color:${colors.darkGray};
    margin-top: 12px;
    margin-bottom: -12px;
`
export default Intro