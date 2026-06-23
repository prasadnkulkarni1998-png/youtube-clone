import React, {useEffect, useState} from 'react'
import './Playvideo.css'
import video from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../Data'
import { data } from 'react-router-dom'
import moment from 'moment'



const Playvideo = ({videoId, setLoading}) => {

    const[apiData, setApiData] = useState(null)
    const[channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([]);

       const fetchVideoData = async () => {
        
       try{
        setLoading(true);
         // Fetching video data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then (res => res.json()) .then(data => setApiData(data.items[0]))
       } catch(err){
        console.error(err);
       }
  
    }

    const fetchOtherData = async () => {

        try{
             const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(res => res.json()) .then(data => setChannelData(data.items[0]))
        
        // Fetcing Comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))
    

        } catch(err){
            console.log(err);
        } finally {
  setTimeout(() => {
    setLoading(false);
  }, 3000); 
}
    
       
    }
 
    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        fetchOtherData();
    }, [apiData])
    
  return (
    <div className='play-video'>
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title is Here"}</h3>
        <div className='play-video-info'>
            <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} views  &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow(): ""}</p>
               <div>
                 <span><img src={like} alt="Like" />{apiData?value_converter(apiData.statistics.likeCount):16}</span>
                 <span><img src={dislike} alt="Dislike" /></span>
                 <span><img src={share} alt="Share" />Share</span>
                 <span><img src={save} alt="Save" />Save</span>
               </div>

        </div>
        <hr />
        <div className='publisher'>
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <h4>{apiData?apiData.snippet.channelTitle:""}</h4>
                <p>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscribers</p>
            </div>
            <button>Subscribe</button>
        </div>
        <div className='vid-description'>
            <p>{apiData?apiData.snippet.description:"Description here"}</p>
            <p>Subscribe to great Stack to watch more Tutorials on web development</p>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):102} comments</h4>

            {commentData.map((item, index) => {
                return(
            <div key = {index} className='comment'>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                 <div> 
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>2 days ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className='comment-action'>
                        <img src={like} alt="Like" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                          <img src={dislike} alt="Dislike" />
                    </div>
                </div>
            </div>

                    
                )


            })}
          
           
        </div>
       
         
    </div>
  )
}

export default Playvideo
