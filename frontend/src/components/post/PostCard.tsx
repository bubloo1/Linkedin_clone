
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import Profile from '../../assets/user-solid.svg'
import './postCard.css'
import { ChangeEvent, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addNewPost } from './postSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'

const PostCard = () => {
    // const sendPost = useSelector((state:any) => state.post.post)
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    // console.log(sendPost,"send posts")
    const [overlay,setOverlay] = useState<boolean>(false)
    const [post,setPost] = useState<string>('')
    const fileInputRef = useRef<any>(null)
    const [postImage,setPostImage] = useState<any>('')
    const [postUploadImage,setUploadPostImage] = useState<any>('')
    
    const onPostChange = (e: ChangeEvent<HTMLInputElement>) => setPost(e.target.value)

    function handleOverlay(n:number){
        if(n == 1 && !overlay) {
            setOverlay((prev) => !prev) 
        } else if (n == 0) {
            setOverlay((prev)=> !prev)
        }
      
    }

    function handleImgUpload(){
        fileInputRef.current.click()
    }

    function handlePostImg (e:any){
        // e.preventDefault();
        console.log(e.target.files[0],"sdfgfgdfgfgdg")
        const profileImage = e.target.files[0]
        setPostImage(URL.createObjectURL(profileImage))
        setUploadPostImage(profileImage)
        
    }

 
    async function handlePost(e: any){
        // e.preventDefault();
        // formData.append("post",post)
        const formData = new FormData()
        formData.append("post_image",postUploadImage)
        formData.append("post",post)
        await dispatch(addNewPost(formData));
        console.log(formData,"formData")
        setOverlay((prev) => !prev) 
        setPost('')
    }

  return (
    <div className='postcard'>
        <div className= {`post_overlay ${overlay ? "show":""} `}></div>
        <div className="postcard-container">
            <div className="postcard-top">
                <img className='card-img' src={Profile} alt="" />

                <input type="text" className='post_input' placeholder = {` ${overlay ? "what do you want to talk about?": "Start to post" }`}
                            onClick={() => handleOverlay(1)}  value={post} onChange={onPostChange}/>

    

                    <div style={{ display: `${overlay ? "block": "none"}`}} className= {`post_input_overlay ${overlay ? "show": null }`} >
                        <div className="post_form_profile">
                            <div className='post_over_profile'>
                                <img className='card-img' src={Profile} alt="" />
                                <p style={{ display: `${overlay ? "block": "none"}`}}>Name</p>
                            </div>
                            <FontAwesomeIcon onClick={() => handleOverlay(0)} icon={faXmark} className={`post_cancel ${overlay ? "show": null} `}/>
                        </div>

                        <input type="text" placeholder = {` ${overlay ? "what do you want to talk about?": "Start to post" }`}
                            onClick={() => handleOverlay(1)}  value={post} onChange={onPostChange}/>

                            <img src={postImage ? postImage : null} alt="" className='postupload_image'/>
                        <div className="post_actions">
                            <div className="button-photo" onClick={handleImgUpload} style={{ display: `${overlay ? "block": "none"}`}}>
                                <FontAwesomeIcon className='image_icon' icon={faImage}/>
                                <input ref={fileInputRef} onChange={handlePostImg} type="file" accept='image/*' style={{display:'none'}}/>
                                <button >Photo</button>
                            </div>
                            <button className='post_btn' onClick={handlePost} >Post</button>
                        </div>
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