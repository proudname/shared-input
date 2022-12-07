import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import { connect } from 'socket.io-client';
import generateSessionId from "./utils/generateSessionId";

const sessionId = generateSessionId();

const socket = connect('http://localhost:3001', { query: { sessionId }})

function App() {

  const [message, setMessage] = useState('');

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      socket.emit('message', value)
      setMessage(value);
  }

  const onSubmit = () => {
      fetch('http://localhost:3001/input', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ text: message, sessionId })
      })
  }

  useEffect(() => {
      socket.on('message', (data) => {
          setMessage(data);
      })
      return () => {
          socket.off('message');
      }
  }, [])

  return (
    <div className="App">
      <h3>Session id: {sessionId}</h3>
      <input type="text" value={message} onChange={onTextChange}/>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default App;
