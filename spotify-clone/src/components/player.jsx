import React, { useContext } from 'react'
import {assets, songsData} from '../assets/frontend-assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

  const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong} = useContext(PlayerContext)

  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt="" />
        <div>
          {/* Get track from PlayerContext */}
          <p>{track.name}</p> {/* Name of first song that's exported */}
          <p>{track.desc.slice(0,12)}</p> {/* if you look at assets.js you will see that songData are struct/objects with fields: name, desc, file */}
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        {/* music control */}
        <div className='flex gap-4'>
          <img src={assets.shuffle_icon} className='w-4 cursor-pointer' alt="" />
          <img onClick={previous} src={assets.prev_icon} className='w-4 cursor-pointer' alt="" />
         
          {playStatus 
          ?  <img onClick={pause} src={assets.pause_icon} className='w-4 cursor-pointer' alt="" />
          :  <img onClick={play} src={assets.play_icon} className='w-4 cursor-pointer' alt="" /> 
          }

          <img onClick={next} src={assets.next_icon} className='w-4 cursor-pointer' alt="" />
          <img src={assets.loop_icon} className='w-4 cursor-pointer' alt="" />
        </div>


        {/* music progress */}
        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          {/* seekBg and seekBar are references for the div and hr*/}  
          <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-10 bg-green-800 rounded-full'/>
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>


      {/* right control panel */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className='w-4' src={assets.play_icon} alt="" />
        <img className='w-4' src={assets.mic_icon} alt="" />
        <img className='w-4' src={assets.queue_icon} alt="" />
        <img className='w-4' src={assets.speaker_icon} alt="" />
        <img className='w-4' src={assets.volume_icon} alt="" />

        <div className='w-20 bg-slate-50 h-1 rounded'></div>
        <img className='w-4' src={assets.mini_player_icon} alt="" />
        <img className='w-4' src={assets.zoom_icon} alt="" />

      </div>
      
    </div>
  )
  : null
}

export default Player
