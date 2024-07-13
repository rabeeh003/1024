import React, { useState } from 'react';
import './App.css';
import Game from './components/1024';
import AudioComponent from './components/Audio';

function App() {
  const [onMusic, setOnMusic] = useState(false)
  const [pad, setPad] = useState(false)
  return (
    <div className='w-fit m-auto'>
      {onMusic && (
        <AudioComponent />
      )}
      <Game pad={pad} setPad={setPad} onMusic={onMusic} setOnMusic={setOnMusic} />
    </div>
  );
}

export default App;
