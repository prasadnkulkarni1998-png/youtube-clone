import React, { useState } from 'react'
import './Video.css'
import Playvideo from '../../Components/PlayVideo/Playvideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'

const Video = () => {
  const {videoId, categoryId} = useParams();
  const [videoLoading, setVideoLoading] = useState(false);
  

  const loading = videoLoading 

  return (
    <div className='play-container'>
      {loading && (<LinearProgress color = "error" sx = {{height: 4, position: 'fixed', top: 0, left:0, width: '100%', zIndex: 9999}} />)}


      <Playvideo videoId = {videoId} setLoading = {setVideoLoading} />  
      <Recommended categoryId = {categoryId}  /> 
    </div>
  )
}

export default Video
