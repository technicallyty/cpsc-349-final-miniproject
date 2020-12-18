import React from 'react';
import './App.css';
import Repos from "./Repos.js";

function App() {

  const [userName, setUsername] = React.useState("");
  const [go, setGo] = React.useState("");

  const letsGo = () => {
    setGo(userName);
  }

  return (
    <div>
    <h1>Pastel Colored GitHub Repo Viewer</h1>
    <description>GitHub Username:</description>
      <input value={userName} onChange={(e) => setUsername(e.target.value)}/>
      <button onClick={letsGo}>GO!</button>
      {
        go.length !== 0 &&
        <Repos user={go} />
      }
      
    </div>
  );
}

export default App;
