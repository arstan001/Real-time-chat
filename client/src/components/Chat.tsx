import { useSockets } from "../context/socket.context";
import styled from 'styled-components';
import Intro from "./Intro";
import { useRef, useState } from "react";
import EVENTS from "../config/evets";
import colors from "../config/color";
import smile from '../utils/smile.svg'
import clip from '../utils/clip.svg'
interface Props {
    isMe?:boolean;
    admin?:boolean;
    isLast?:boolean;
    shown?:boolean;
}

const Chat = () => {
    const {socket, username, messages, setMessages, roomId} = useSockets();
    const newMessageRef = useRef(null);
    const [shown, setShown] = useState(false);
    console.log(socket.id)
    // const scrollRef = useRef(null);
    function handleSendMessage() {
        const message = newMessageRef.current.value;
        if(message==='') return
        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username});
    
        const date = new Date();
    
        setMessages([
          ...messages,
          {
            username: username,
            message,
            time: `${date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()}`,
            userId:socket.id,
            file:false,
            fileUrl:null
          },
        ]);
    
        newMessageRef.current.value = "";
      }

    function isNext(index:number) {
        if(index===0) return true;
        else if(messages[index-1].username!==messages[index].username) return true;
        return false;
    }
    function isLast(index:number){
        if(index===messages.length-1) return true;
        else if(messages[index+1].username!==messages[index].username) return true;
        return false;
    }
    if(!username) return <Intro/>
    return(
        <Wrapper>
            <ChatContainer>
                    <ChatHeader>
                        <Header>Chat id: {roomId}</Header>
                    </ChatHeader>
                <div>
                    {messages.map((message, index)=>{
                        return <MessageContainer key={index} isLast={isLast(index)} isMe={message.userId===socket.id}>
                            {isNext(index) && <p style={{margin:`8px 0`, padding:`0`}}>{message.username}</p>}
                            <MessageWrapper isMe={message.userId===socket.id}>
                                <Message isMe={message.userId===socket.id}>{message.message}</Message>
                                {isLast(index) && <PTime>{message.time}</PTime>}
                            </MessageWrapper>
                        </MessageContainer>
                    })}
                </div>
            </ChatContainer> 
            <div style={{marginBottom:8}}>  
                <InputContainer>
                    <InputWrapper>
                        <div style={{display:'flex', marginBottom:16}}>
                            <InputText placeholder='Message...' ref={newMessageRef} rows={1}/>
                        </div>
                        <Options>
                            <ButtonWrapper shown={shown}>
                                {/* <div style={{width:24, marginRight:shown ? 24 : 0, transition:'all 0.2s ease-in-out'}}><Button style={{background:' #E75818', width:24, height:24, borderRadius:12, color:'white', fontSize:16}} onClick={()=> setShown(!shown)}>{ shown ? '-' : '+' }</Button></div> */}
                                {/* <Button style={{padding:0}} onClick={handleFileUpload}><img src={clip} alt=':)' width={16} height={16} style={{display:'flex'}}/></Button> */}
                                {/* <Button style={{marginLeft:16, padding:0}} onClick={handleSendMessage}><img src={smile} alt=':)' width={16} height={16} style={{display:'flex'}}/></Button> */}
                            </ButtonWrapper>
                            <Button style={{background:' #E75818', color:'white', borderRadius:4,padding:8}} onClick={handleSendMessage}>Send</Button>
                        </Options>
                    </InputWrapper>
                </InputContainer>
            </div>
        </Wrapper>
    )
}

const MessageContainer = styled.div<Props>`
    position:relative;
    width:100%;
    overflow:hidden;
    ${props=>props.isMe ? {textAlign:'right', padding:`0px 16px 4px 16px`} : {textAlign:'left', padding:'0 16px 4px 16px'}};
`
const MessageWrapper = styled.div<Props>`
    display: flex;
    position:relative;
    flex-wrap: wrap;
    ${props=>props.isMe && {flexDirection:'row-reverse'}}
    align-items: center;
    // overflow-wrap: break-word;
`
const Message = styled.p<Props>`
    padding:8px;
    display:block;
    max-width:50%;
    word-wrap:break-word;
    white-space: normal;
    border-radius: 8px 8px 4px 4px;
    text-align:left;
    background: ${props=>props.isMe ? colors.main : 'white'};
    margin: 0;
    ${props=>props.isMe && {color:'white'}}
`
const ButtonWrapper = styled.div<Props>`
    width: ${props=>props.shown ? '100%' : '24px'};
    overflow:hidden;
    transition:all 0.2s ease-in-out;
    display:flex;
    align-items: center;

`
const Header = styled.p`
    margin:0;
    color:${colors.darkGray};
    font-weight: 600;
    font-size: 12px;
`
const Wrapper = styled.div`
    height: 100vh;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ChatContainer = styled.div<Props>`
    position: relative;
    max-width: 758px;
    margin:8px;
    height: ${props=>props.admin ? 'calc(100vh - 287px)' : 'calc(100vh - 127px)'};
    overflow: auto;
    background-color: ${colors.gray};
    border-radius: 8px;
    box-sizing: border-box;
    @media only screen and (min-width: 712px) {
        height: calc(100vh - 157px);   
        max-width:${props=>!props.admin && '100%'};  
}
`
const ChatHeader = styled.div`
    height: 42px;
    width: 100%;
    display: flex;
    position: sticky;
    top:0;
    left: 0;
    align-items: center;
    justify-content: space-between;
    padding:9px 16px;
    border-bottom: 1px solid #16161629;
    box-sizing: border-box;
    background-color: ${colors.gray};
`
const InputText = styled.textarea`
    flex-grow: 1;
    border:none;
    outline:none;
    padding: 16px 0;
    resize: none;
    line-height: 150%;
    border-bottom: 1px solid rgba(22, 22, 22, 0.08);;
`
const InputContainer = styled.div<Props>`
    min-width: 288px;
    max-width: 742px;
    padding: ${props => props.admin ? '0 8px 8px 8px' : '8px'};
    border-radius: ${props => props.admin ? '0 0 8px 8px' : '8px'};
    margin:0 8px 0 8px;
    background-color: #1616160A;
    @media only screen and (min-width: 712px) {
    padding: 8px;  
    border-radius: 8px;
    max-width:${props=>!props.admin && '100%'};  

}
`
const InputWrapper = styled.div`
    display: block;
    background: white;
    padding: 4px 16px 16px 16px;
    border-radius: 8px;
`
const Options = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PTime = styled.p`
    font-size: 9px;
    margin: 0 8px;
`
const Button = styled.button`   
    background: none;
    border:none;
    outline:none;
    cursor: pointer;
`
export default Chat