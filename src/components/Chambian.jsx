import React from 'react'
import sample from '../assets/meems/win.png'
import sample1 from '../assets/meems/win1.jfif'
import sample2 from '../assets/meems/win2.jfif'
import sample3 from '../assets/meems/win3.jfif'
import sample5 from '../assets/meems/win4.jfif'
import sample6 from '../assets/meems/win5.jfif'
import sample7 from '../assets/meems/win6.jfif'
import sample8 from '../assets/meems/win7.jpg'
import sample9 from '../assets/meems/win8.jfif'
import sample10 from '../assets/meems/win9.jfif'
import sample11 from '../assets/meems/win10.jfif'
import sample12 from '../assets/meems/win11.gif'

import { Button, Image } from '@nextui-org/react'

function Chambian({ setShoWin }) {
  const images = [
    sample, sample1, sample2, sample3,
    sample5, sample6, sample7, sample8,
    sample9, sample10, sample11, sample12
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="text-center mt-4">
      <p className="text-green-500 text-lg font-semibold">You win</p>
      <Image className='mb-4' src={randomImage} />
      <div className='flex justify-between'>
        <Button variant='shadow' className='text-white' color='success' onClick={() => location.reload()}>Play again</Button>
        <Button variant='shadow' className='text-white' color='success' onClick={setShoWin}>Continue</Button>
      </div>
    </div>
  );
}

export default Chambian;
