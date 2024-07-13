import React, { useState } from 'react';
import { Image, Button } from '@nextui-org/react';
import ReactHowler from 'react-howler';
import { songs } from './songs';
import { Pause, PlayCircleIcon } from 'lucide-react';

function AudioComponent() {
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    return (
        <div className="md:absolute top-2 right-0 flex flex-col md:items-end  rounded-2xl p-4">
            <ReactHowler
                src={currentSong.song}
                playing={isPlaying}
                html5={true}
            />
            <div className="flex w-full items-center justify-between mb-4">
                <div className='flex'>
                    <Image src={currentSong.cover} className='w-full h-ful object-cover' alt={currentSong.title} width={50} height={50} />
                    <div className="ml-2 text-start">
                        <span className="text-black">{currentSong.title}</span>
                        <span className="text-gray-400 block">{currentSong.artist}</span>
                    </div>
                </div>
                <div className="ml-2 flex gap-2">
                    {isPlaying ? (
                        <Button className='min-w-0 m-0 p-2 text-white' color='warning' auto onClick={handlePlayPause}>
                            <Pause />
                        </Button>
                    ) : (
                        <Button className='min-w-0 m-0 p-2 text-white' color='warning' auto onClick={handlePlayPause}>
                            <PlayCircleIcon />
                        </Button>
                    )}
                </div>
            </div>
            <div className="w-full flex md:flex-col align-middle overflow-auto">
                {songs.map((song) => (
                    <div key={song.id} className="flex w-auto items-center justify-end mb-2 cursor-pointer" onClick={() => playSong(song)}>
                        <Image src={song.cover} alt={song.title} className='' width={50} height={50} />
                        <div className="ml-2">
                            {/* <span className="text-white">{song.title}</span> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AudioComponent;