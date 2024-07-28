import './showPost.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPost, updatePostLikes, saveComment, getComments } from './postSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import {  useEffect, useState } from 'react'
import { faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from '../../assets/user-solid.svg'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import {toggleLike, toggleComment,toggleAddcomments} from './postSlice'

// import { showAllPost } from './showPostSlice'
type myPost = {
  [x: string]: any
  postID:number,
  userPost:string
  userFirstName: string
  userLastName: string
  postBio: string
  userURL: string
  postURL: string
  postLiked: number
  showComment: boolean
}


const ShowPost = () => {

  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  const postStatus = useSelector((state:any) => state.posts.loading2)
  let post = useSelector((state:any)=> state.posts.posts)
  const commentStatus = useSelector((state:any) => state.posts.loading3)
  let comments = useSelector((state:any)=> state.posts.comments)
  const [addComment,setAddComment] = useState<string>('')
  // const [showComments,setShowComments] = useState<boolean>(false)

  console.log(post,"postststs")
  console.log(comments,"comments")

// {commentStatus == "succeeded" ? comments.map((comment:any)=>(
//   console.log(comment,"this is bs")
// )): null}

  useEffect(() => {

    if(postStatus == 'idle'){
      console.log("in useEffect")
      dispatch(getPost())
    }
  },[])

  function handleLikes (postID:number){
    post = post.map((myPost: myPost) => 
      myPost.postID == postID ? {...myPost, postLiked: myPost.postLiked == 1 ? 0 :  1} : myPost
    )
    console.log(post,"new post")
    dispatch(toggleLike(post))
    dispatch(updatePostLikes({postID}))
  }

  function handleComments (postID:number){

    post = post.map((myPost: myPost) => 
    myPost.postID == postID ? {...myPost, showComment: !myPost.showComment } : myPost
  )
    dispatch(toggleComment(post))
    dispatch(getComments({postID}))
    // setShowComments(!showComments)
    console.log(postID,"postID in commenyts")
  }

  function sendComment (e: React.FormEvent<HTMLFormElement>,postID:number){
    e.preventDefault()
    if(addComment != ''){
      dispatch(saveComment({addComment,postID}))
      dispatch(toggleAddcomments({comment:addComment,postID}))
    }

    setAddComment('')
  }

  return (
     <>
     {postStatus == "idle" &&<h2>loading</h2>}
     {postStatus == "succeeded" && console.log(post,"uigdfhkjslhhhhhhhl  ofdghdfjklgfd jfdghfdgoidflgj")}
     {postStatus == "succeeded" && post.map((p:myPost)=>(
      
      <div key={p.postID} className="post_container">
        <div className="post_profile">
          <div className="post_profile_left">
            <div className="post_profile_img">
              <img src={p.userURL ? p.userURL : Profile} alt="" />
            </div>
            <div className="post_profile_details">
              <div className="post_name">
                <p className='name'>{p.userFirstName + " " + p.userLastName}</p>
                <p>following</p>
                <p className="post_bio">{p.postBio}</p>
              </div>
            </div>
          </div>
          <div className="post_profile_right">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="post_description">
          <p>{p.userPost}</p>
        </div>
        <div className="post_img">
          <img src={p.postURL ? p.postURL : Profile} alt="" />
        </div>

        <div className="post_actions">
          {/* <div className="like_count">
            <p>123</p>
            <div className="post_comments">
              <p>28 comments</p>
              <p>8 reports</p>
            </div>
          </div> */}

          <div className="post_like">
            <div className="post_icon"  onClick={() => handleLikes(p.postID)}>
              <FontAwesomeIcon className={p.postLiked == 1 ? "like_active": ""} icon={faThumbsUp} />
              <p>Like</p>
            </div>
            <div className="post_icon" onClick={() => handleComments(p.postID)}>
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
        <div className={ p.showComment ? "comment_container show" : "comment_container"}>
          <div className="comment_input">
            <div className="commment_profile_img">
              <img src={Profile} alt="" />
            </div>
            <form onSubmit={(e) => sendComment(e,p.postID)}>
              <input value={addComment} onChange={(e) => setAddComment(e.target.value)} type="text" />
            </form>
          </div>
          {commentStatus === 'succeeded' && console.log(comments,"in comp comments")}
          {commentStatus === 'succeeded' && comments[p.postID]?.map((comment:any) => (
          <div key={comment.comment_id} className="show_comments">
            <p>{comment.comment}</p>
          </div>
        ))}
        </div>
      </div>
       ))}
      </>

  )
}

export default ShowPost