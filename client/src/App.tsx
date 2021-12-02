import './App.css';
import SocketProvider from './context/socket.context'
import Chat from './components/Chat';
function App() {
  return (
    <SocketProvider>
      <div className="App">
        <Chat/>
      </div>
    </SocketProvider>
  );
}

export default App;
