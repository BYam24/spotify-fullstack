import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({image, name, desc, id}) => {

  const navigate = useNavigate() //use this hook to open albums

  return (
    <div onClick={() => navigate(`/album/${id}`)} //clicking on the album will change the route to localHost:5173/album/0 ; notice how the displayHome will not display here because in Display.jsx we set the Display Home to only show if we are at "/"
      className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>

      <img className='rounded' src={image} alt="" />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
      
    </div>
  )
}

export default AlbumItem
