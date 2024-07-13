import React, { useState, useEffect } from 'react';
import './App.css';
import Gptcode from './components/Gptcode';
import Game from './components/1024';
import { Button, Switch } from '@nextui-org/react';
import Audio from './components/Audio';
import { Gamepad, Gamepad2, Music, VolumeX } from 'lucide-react';

function App() {
  const [onMusic, setOnMusic] = useState(false)
  const [pad, setPad] = useState(false)
  return (
    <div className='w-fit m-auto'>
      {onMusic && (
        <Audio />
      )}
      <div className='w-full flex justify-between mb-5'>
        <span className='h1 font-mono font-semibold text-gray-800'>1024</span>
        <div className='flex flex-col justify-end items-end'>
          <Button size='sm' variant='ghost' color='' className='bg-gray-800' onClick={() => location.reload()} >New game</Button>
          <div className='flex justify-end'>
            <Switch
              isSelected={onMusic}
              onChange={() => setOnMusic(!onMusic)}
              size="sm"
              color="warning"
              className='my-2'
              startContent={<Music />}
              endContent={<VolumeX />}
            >
            </Switch>
            <Switch
              isSelected={pad}
              onChange={() => setPad(!pad)}
              size="sm"
              color="warning"
              className='my-2'
              endContent={<Gamepad2 />}
              startContent={<Gamepad2 />}
            >
            </Switch>
          </div>
        </div>
      </div>
      <Game pad={pad} />
    </div>
  );
}

export default App;
