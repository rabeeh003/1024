import React, { useState, useEffect } from 'react';
import './App.css';
import Gptcode from './components/Gptcode';
import Game from './components/1024';
import { Button, Switch } from '@nextui-org/react';
import Audio from './components/Audio';
import { Music, VolumeX } from 'lucide-react';

function App() {
  const [onMusic, setOnMusic] = useState(true)
  return (
    <div className='w-fit m-auto'>
      {onMusic && (
        <Audio />
      )}
      <div className='w-full flex justify-between mb-5'>
        <span className='h1 font-mono font-semibold text-gray-800'>1024</span>
        <div className='flex flex-col justify-end items-end'>
          <Button size='sm' variant='ghost' color='' className='bg-gray-800' onClick={() => location.reload()} >New game</Button>
          <Switch
            isSelected={onMusic}
            onChange={()=>setOnMusic(!onMusic)}
            size="sm"
            color="warning"
            className='p-2 '
            startContent={<Music />}
            endContent={<VolumeX />}
          >
          </Switch>
        </div>
      </div>
      <Game />
    </div>
  );
}

export default App;
