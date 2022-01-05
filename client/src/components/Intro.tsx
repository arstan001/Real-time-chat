import { useSockets } from "../context/socket.context";
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import EVENTS from "../config/evets";
interface Props{
    back?:boolean;
    shown?:boolean;
}
const Intro = () => {
    const {socket, setUsername, rooms} = useSockets();
    const [roomType, setRoomType] = useState<string>('');
    const [error, setError] = useState<boolean>(false)
    const usernameRef = useRef(null)
    const roomRef= useRef(null)
    useEffect(()=>{
        if(usernameRef) usernameRef.current.value = localStorage.getItem('username') || '';
    },[])
    function handleUsername(type:string){
        if(usernameRef.current?.value.length < 1){
            setError(true);
        }
        else {
            setError(false);
            if(roomType===''){
                setRoomType(type)
            }
            else if(roomType==='CREATE') {
                const value = roomRef.current.value;
                if(!value){
                    return
                }
                socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName:value});
                setUsername(usernameRef.current.value);
                localStorage.setItem('username', usernameRef.current.value);
                usernameRef.current.value='';
                roomRef.current.value='';
            }
            else if(roomType==='ENTER'){
                const value = roomRef.current.value;
                socket.emit(EVENTS.CLIENT.JOIN_ROOM, value);
                localStorage.setItem('username', usernameRef.current.value);
                setUsername(usernameRef.current.value);
                usernameRef.current.value='';
                roomRef.current.value='';
            }
    }
    }
    return(
        <Wrapper>
            <InputWrapper>
                <Title>Welcome to Chat!</Title>
                <Input ref={usernameRef} shown placeholder='Enter Username'/>
                <Input ref={roomRef} shown={roomType!==''} placeholder={`Enter Room ${roomType==='CREATE' ? 'NAME' : 'ID'}`}/>
                <Button shown={(roomType==='' || roomType==='ENTER')} onClick={()=>handleUsername('ENTER')}>Enter Room</Button>
                <Or shown={roomType===''}>{roomType==='' && 'or'}</Or>
                <Button shown={(roomType==='' || roomType==='CREATE')} onClick={()=>handleUsername('CREATE')}>{(roomType==='' || roomType==='CREATE') && 'Create a Room'}</Button>
                <Button shown={roomType!==''} onClick={()=>setRoomType('')} back={true}>{roomType!=='' && 'Go Back'}</Button>
            </InputWrapper>
                {error && <Error>Please enter the name first!</Error>}
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
    background-color: var(--default);
`
const Error = styled.p`
margin-top: 12px;
    color:var(--red);
`
const InputWrapper = styled.div`
    width: 324px;
    /* height: 100px; */
    position: relative;
    display: flex;
    padding: 24px;
    flex-direction: column;
    border-radius: 8px;
    background-color: var(--primary) ;
`
const Title = styled.h1`
    color:#fff;
    margin-bottom: 12px;
    width: 100%;
    
`
const Input = styled.input<Props>`
    border:none;
    width:  100%;
    height: 30px;
    margin-bottom: 12px;
    border-radius: 8px;
    padding: 0 12px;
    outline: none;
    ${props=>!props.shown && {display:'none'}}
    transition: all 0.1s ease-in-out;
`
const Or = styled.p<Props>`
    ${props=>!props.shown && {display:'none'}}
    transition: all 0.1s ease-in-out;
    font-size: 14px;
    color:#fff;
    margin-top: 4px;
    margin-bottom: 4px;
`
const Button= styled.button<Props>`
    border:none;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    cursor: pointer;
    ${props=>props.back && {background:'var(--red)', color:'#fff', width:'30%', marginLeft:'auto', marginRight:'auto', marginTop:'12px'}}
    ${props=>!props.shown && {display:'none'}}
    transition: all 0.1s ease-in-out;
    &:hover{
        background: ${props=>props.back ? 'var(--default)' : 'var(--hover)'};
        color:#fff;
    }
`
export default Intro