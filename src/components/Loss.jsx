import React from 'react'
import sample from '../assets/meems/loss.gif'
import sample1 from '../assets/meems/loss1.jfif'
import sample2 from '../assets/meems/loss2.jfif'
import sample3 from '../assets/meems/loss3.jfif'
import sample5 from '../assets/meems/loss4.jfif'
import sample6 from '../assets/meems/loss5.jfif'
import sample7 from '../assets/meems/loss6.gif'
import sample8 from '../assets/meems/loss7.jfif'
import sample9 from '../assets/meems/loss8.jfif'
import sample10 from '../assets/meems/loss9.jfif'
import sample11 from '../assets/meems/loss11.jfif'
import sample12 from '../assets/meems/loss12.jfif'
import sample13 from '../assets/meems/loss13.jfif'
import sample14 from '../assets/meems/loss14.jfif'
import sample15 from '../assets/meems/loss15.jfif'
import sample16 from '../assets/meems/loss16.jfif'
import sample17 from '../assets/meems/loss10.png'
import sample18 from '../assets/meems/loss17.png'
import sample19 from '../assets/meems/loss18.jfif'
import sample20 from '../assets/meems/loss19.jfif'
import sample21 from '../assets/meems/loss20.jfif'
import sample22 from '../assets/meems/loss21.jfif'
// import sample23 from '../assets/meems/loss22.jfif'
import sample24 from '../assets/meems/loss23.jfif'
import sample25 from '../assets/meems/loss24.jfif'
import sample26 from '../assets/meems/loss25.jfif'
import sample27 from '../assets/meems/loss26.jfif'
import sample28 from '../assets/meems/loss27.jfif'
import sample29 from '../assets/meems/loss28.jfif'
import sample30 from '../assets/meems/loss29.jfif'
import sample31 from '../assets/meems/loss30.jfif'

import { Button, Image } from '@nextui-org/react'

function Loss({resetGame}) {
    const images = [
        sample, sample1, sample2, sample3,
        sample5, sample6, sample7, sample8,
        sample9, sample10, sample11, sample12,
        sample13, sample14, sample15, sample16,
        sample17, sample18, sample19, sample20,
        sample21, sample22, sample24, sample25,
        sample26, sample27, sample28, sample29,
        sample30, sample31,
      ];
    
      const randomImage = images[Math.floor(Math.random() * images.length)];
    
      return (
        <div className="text-center mt-4">
          <p className="text-red-500 text-lg font-semibold">You lost!</p>
          <Image className='mb-4 max-w-[300px]' src={randomImage} />
          <Button variant='shadow' color='success' onClick={resetGame}>Restart</Button>
        </div>
      );
    }

export default Loss
