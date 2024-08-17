import React, {useContext} from 'react'
import Sidebar from './components/sidebar'
import Player from './components/player'
import Display from './components/display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {

  const {audioRef, track, songsData} = useContext(PlayerContext) 

  return (
    <div className='h-screen bg-black'>
      {
        songsData.length !== 0 
        ? <>
          <div className='h-[90%] flex'>
            <Sidebar/>
            <Display/>
          </div>
          <Player/>
          </>
    :null
      }
      {/* <div className='h-[90%] flex'>
        <Sidebar/>
        <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} src={track.file} preload='auto'></audio>  link ref */}

      <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>


    </div>
  )
}

export default App
