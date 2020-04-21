import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="App">
     <div className="intro-components">
       <h1>Music madness</h1>
       <Search></Search>
     </div>
    </div>
  );
}

export default App;
