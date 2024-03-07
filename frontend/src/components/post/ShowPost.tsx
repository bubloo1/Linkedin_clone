import './showPost.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from './postSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from '../../assets/user-solid.svg'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'

// import { showAllPost } from './showPostSlice'
type myPost = {
  post_id:number,
  user_post:string
}
const ShowPost = () => {
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  const postStatus = useSelector((state:any) => state.posts.loading2)
  const post = useSelector((state:any)=> state.posts.posts)

  console.log(post,"postststs")

  useEffect(() => {

    if(postStatus == 'idle'){
      console.log("in useEffect")
      dispatch(getPost())
    }
  },[])

  return (
    
      <div className="post_container">
        <div className="post_profile">
          <div className="post_profile_left">
            <div className="post_profile_img">
              <img src={Profile} alt="" />
            </div>
            <div className="post_profile_details">
              <div className="post_name">
                <p className='name'>Name</p>
                <p>following</p>
                <p className="post_bio">user bio</p>
              </div>
            </div>
          </div>
          <div className="post_profile_right">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="post_description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ipsum cum praesentium itaque quia error, repellendus at quo fugit incidunt veniam!</p>
        </div>
        <div className="post_img">
          <img src={Profile} alt="" />
        </div>

        <div className="post_actions">
          <div className="like_count">
            <p>123</p>
            <div className="post_comments">
              <p>28 comments</p>
              {/* <p>8 reports</p> */}
            </div>
          </div>

          <div className="post_like">
            <div className="post_icon">
              <FontAwesomeIcon icon={faThumbsUp} />
              <p>Like</p>
            </div>
            <div className="post_icon">
              <FontAwesomeIcon icon={faComment} />
              <p>Comment</p>
            </div>
            <div className="post_icon">
              <FontAwesomeIcon icon={faRetweet} />
              <p>Repost</p>
            </div>
            <div className="post_icon">
              <FontAwesomeIcon icon={faPaperPlane} />
              <p>Send</p>
            </div>
          </div>
        </div>

      </div>
  )
}

export default ShowPost