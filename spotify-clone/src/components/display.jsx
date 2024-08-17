import React, {useEffect, useRef} from 'react'
import { Route, Routes, useLocation} from 'react-router-dom' 
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/frontend-assets/assets'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'


const Display = () => {

  const {albumsData} = useContext(PlayerContext);

  const displayRef = useRef();
  // console.log(displayRef)


  const location = useLocation(); //want to get web address param
  // console.log("web address extension: " , location)

  const isAlbum = location.pathname.includes("album");  //check if web address has the word album
  // console.log(isAlbum)

  const albumId= isAlbum ? location.pathname.split('/').pop() : ""
  // const albumId= isAlbum ? location.pathname.slice(-1) : "" 

  //slice the last index bc the last index of the string is the id
  // console.log(albumId)

  const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x) => (x._id == albumId)).bgColour : "#121212"; 
  // const bgColor = albumsData[Number(albumId)].bgColor 
  //comvert albumId which is a string to a number, then index
  // console.log(bgColor)


  useEffect(() => {
    if (isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`  //note: make sure to use backticks bc we are editing css properties
    } else {
      displayRef.current.style.background = `#121212`
    }
  })

  return (
    // useRef let us mutate the properties of the div below
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      {albumsData.length > 0 
      ?       
      <Routes>
        <Route path='/' element={<DisplayHome/>}>  </Route>  {/* if we ever open the route "/" which is home, it will display DisplayHome component */}
        {/* if we ever open the route "/" which is home, it will display DisplayHome component */}

        <Route path='/album/:id' element={<DisplayAlbum  album={albumsData.find((x)=> (x._id == albumId))}/>}> </Route> {/* if the page is /album/id then we want DisplayAlbum html to show */}
        {/* if the page is /album/id then we want DisplayAlbum html to show */}

      </Routes> : null}
      
      
    </div>
  )
}

export default Display
