
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import Profile from '../../assets/user-solid.svg'
import './postCard.css'
import { ChangeEvent, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/getBaseURL'

import { selectAllPosts,addNewPost } from './postSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'

const PostCard = () => {
    const sendPost = useSelector(selectAllPosts)
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    console.log(sendPost,"send posts")
    const [overlay,setOverlay] = useState<boolean>(false)
    const [post,setPost] = useState<string>('')

    function handleOverlay(){
        if(overlay){
            setOverlay(false)
        }else{
            setOverlay(true)
        }
      
    }

    const onPostChange = (e: ChangeEvent<HTMLInputElement>) => setPost(e.target.value)
 
    async function handlePost(e: { preventDefault: () => void }){
        e.preventDefault();
        await dispatch(addNewPost({post}));
    }

  return (
    <div className='postcard'>
        <div className= {`overlay ${overlay ? "show": null} `}></div>
        <div className="postcard-container">
            <div className="postcard-top">
                <img className='card-img' src={Profile} alt="" />
                <form onSubmit={handlePost}>
                <input type="text" placeholder = {` ${overlay ? "what do you want to talk about?": "Start to post" }`}
                 onClick={handleOverlay} className= {`post_input ${overlay ? "show": null }`} 
                    value={post} onChange={onPostChange}/>
                {/* <button onClick={handlePost}>Post</button> */}
                </form>
                <div className="">
                    <FontAwesomeIcon icon={faXmark} className={`post_cancel ${overlay ? "show": null} `}/>
                </div>
            </div>
            <div className="postcard-bottom">
                <div className="button-photo">
                    <FontAwesomeIcon className='image_icon' icon={faImage}/>
                    <button>Photo</button>
                </div>
                <div className="button-photo">
                    <FontAwesomeIcon className='card_icon' icon={faPlay}/>
                    <button>Video</button>
                </div>
                <div className="button-photo">
                    <FontAwesomeIcon className='card_icon' icon={faCalendar}/>
                    <button>Event</button>
                </div>
                <div className="button-photo">
                    <FontAwesomeIcon className='card_icon' icon={faNewspaper}/>
                    <button>Write Article</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard