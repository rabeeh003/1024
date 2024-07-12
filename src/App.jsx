import React, { useState, useEffect } from 'react';
import './App.css';
import Gptcode from './components/Gptcode';
import Game from './components/1024';
import { Button } from '@nextui-org/react';
function App() {
  return (
    <div className='w-fit m-auto'>
      <div className='w-full flex justify-between mb-5'>
      <span className='h1 font-mono font-semibold text-gray-800'>1024</span>
      <Button size='sm' variant='ghost' color='' className='bg-gray-800' onClick={()=>location.reload()} >New game</Button>
      </div>
      <Game />
    </div>
  );
}

export default App;
