import { createContext, useEffect, useRef, useState } from "react";
// import { songsData } from "../assets/frontend-assets/assets"; comment out because not we are using backend not predefined song 
import axios from 'axios'


export const PlayerContext = createContext();

const PlayerContextProvider  = (props) => {

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // const url = 'http://localhost:4000' 
  const url = 'https://spotify-backend-0f1n.onrender.com'
  //backend url

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);


  const [track, setTrack] = useState(songsData[1]); //set the track to the second song in the songData to be played
  const [playStatus, setPlayerStatus] = useState(false);


  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  })

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true)
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);

  }

  // const playWithId = async (id) => {  
  //   //deals with setting song
  //   await setTrack(songsData[id]);
  //   await audioRef.current.play();
  //   setPlayerStatus(true);
  // }

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id){
        setTrack(item)
      }
    })
    await audioRef.current.play();
    setPlayerStatus(true);
  }

  // const previous = async () => {
  //   if (track.id > 0){
  //     await setTrack(songsData[track.id-1])
  //     await audioRef.current.play()
  //     setPlayerStatus(true)
  //   }
  // }

   const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id == item._id && index > 0){
        await setTrack(songsData[index-1]);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    })
    
  }

  // const next = async () => {
  //   if (track.id < songsData.length-1){
  //     await setTrack(songsData[track.id+1])
  //     await audioRef.current.play()
  //     setPlayerStatus(true)
  //   }
  // }

    const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id == item._id && index < songsData.length-1){
        await setTrack(songsData[index+1]);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    })
  }

  const seekSong = async (e) => {
    // console.log(e)
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
  }



  const getSongData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0])

    } catch (error) {
      
    }
  }

  const getAlbumsData = async() => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {

        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) + "%"

        setTime({
          currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60)
        }
      })
    }
      } , 1000);
  }, [audioRef])


  useEffect(() =>{
    getSongData();
    getAlbumsData();
  }, []) //without [], it will create a problem: correct dependency arrays to avoid unnecessary or infinite re-renders
  
  

  //contextValue object
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track, setTrack,
    playStatus, setPlayerStatus,
    time, setTime,
    play, pause,
    playWithId,
    previous, next,
    seekSong,
    songsData,
    albumsData
  }

  return (
    <PlayerContext.Provider  value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider;