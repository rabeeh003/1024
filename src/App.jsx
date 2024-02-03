import React, { useState, useEffect } from 'react';
import './App.css';
import Gptcode from './components/Gptcode';
import Game from './components/1024';
function App() {

  return (
    <>
      <h1 className='font-mono font-semibold text-orange-300 mb-5 text-left'>1024</h1>
      <Game />
    </>
  );
}

export default App;
