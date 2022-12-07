import React from 'react';
import './App.css';
import useSession from "./hooks/useSession";

function App() {

  const { sessionId } = useSession();

  return (
    <div className="App">
      <h3>Session id: {sessionId}</h3>
      <input type="text"/>
      <button>Submit</button>
    </div>
  );
}

export default App;
