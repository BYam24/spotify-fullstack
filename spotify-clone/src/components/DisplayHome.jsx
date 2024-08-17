import React from 'react'
import Navbar from './Navbar'
// import { albumsData } from '../assets/frontend-assets/assets'
import AlbumItem from './AlbumItem'
// import { songsData } from '../assets/frontend-assets/assets'
import SongItem from './SongItem'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {

  const {songsData, albumsData} = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Feature Charts</h1>
        <div className='flex overflow-auto'> {/* There will be a scrollbar and to hide it we need to go to index.css and do css*/}
          {albumsData.map( (item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
        </div>
        {/* using the map function to create album item*/}
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'> {/* There will be a scrollbar and to hide it we need to go to index.css and do css*/}
          {songsData.map( (item, index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
        </div>
        {/* using the map function to create album item*/}
      </div>
    </>
  )
}

export default DisplayHome
