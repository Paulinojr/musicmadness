import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
     <div className="intro-components">
       <h1>Music madness</h1>
       <div className="size-label">
        <label> Select tournament size </label>
        <select>
          <option value="undefined" />
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="64">64</option>
        </select>
      </div>
       <div>
         <input type="text" id="artist" />
         <button>Go</button>
       </div>
     </div>
    </div>
  );
}

export default App;
