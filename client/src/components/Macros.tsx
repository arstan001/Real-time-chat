import styled from 'styled-components';
import EVENTS from '../config/evets';
import { useSockets } from "../context/socket.context";

interface FuncProp {
    onclick:(val:string)=>void;
}
const Macros : React.FC<FuncProp> = ({onclick}) => {
    const { socket, username, guest, setGuest} = useSockets();
    socket.on(EVENTS.SERVER.GUEST, (val)=>{
        setGuest(val.name)
    })
    const templates = [
        'Immersive chat startups have a very different vision for the future of voice',
        `Hello ${guest!=='' ? guest : '%user%' }  👋. My name is ${username}. What can I do for you today?`,
        'Apple opens another megastore in China amid William Barr criticism',
        `Hello ${guest!=='' ? guest : '%user%' }  👋. My name is ${username}. What can I do for you today?`
    ]
    return (
        <MacrosContainer>
            <MacrosWrapper>
                <Title>Macros</Title>
                <List>
                    {templates.map((item, index)=><Item key={`${index}${item}`} onClick={()=>onclick(item)}><p style={{fontSize:12, margin:0}}>{item}</p></Item>)}
                </List>
            </MacrosWrapper>
        </MacrosContainer>
    )
}

const MacrosContainer =  styled.div`
    height: 132px;
    min-width: 288px;
    padding: 8px 8px 0 8px;
    border-radius: 8px 8px 0 0;
    margin: 0 8px 0 8px;
    background-color: #1616160A;
    @media only screen and (min-width: 712px) {
        position: absolute;
        height: calc(100% - 24px);
        width: calc(100% - 798px);   
        /* max-width: 450px; */
        border-radius:8px;
        top:8px;
        right:0;
}
`
const MacrosWrapper = styled.div`
    background: white;
    padding: 8px;
    border-radius: 8px;
    overflow: auto;
    flex-shrink:0;
    @media only screen and (min-width: 712px) {
        height: calc(100% - 24px);
    }
`
const List = styled.div`
    display:flex;
    flex-direction:row; 
    gap:8px;
    height:70px;
    overflow:auto;
    padding-bottom:14px;
    @media only screen and (min-width: 712px) {
        flex-direction: column;
        height: 100%;
    }
`
const Title = styled.h4`
    margin:0 0 8px 0;
    font-weight: 600;
    font-size: 13px;
    text-align: left !important;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    text-align:left;
    min-width: 200px;
    height: 54px;
    border-radius: 8px;
    padding: 8px;
    background: rgba(22, 22, 22, 0.04);
    cursor: pointer;
`

export default Macros
