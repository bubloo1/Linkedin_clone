import './showPost.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from './showPostSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
// import { showAllPost } from './showPostSlice'
type myPost = {
  post_id:number,
  user_post:string
}
const ShowPost = () => {
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  const postStatus = useSelector((state:any) => state.showPosts.status)
  const post = useSelector((state:any)=> state.showPosts)
  // let post = useSelector(showAllPost)
  // console.log(post,"sdfdsfgsdfgfsd")
  console.log(post,"postststs")

  useEffect(() => {

    if(postStatus == 'idle'){
      console.log("in useEffect")
      dispatch(getPost())
    }
  },[])
  // post = post[0].message
  // console.log(post,"post")
  // console.log(getAllPost,"getAllpost")
  return (
    <>
      <br />
      <div className="post_container">
          <div className="show_posts">
            {post.status === "idle" &&<h2>loading</h2>}
            {post.status == "succeeded" ? post.posts[0].map((p:myPost)=>(
              <h2 key={p.post_id}>{p.user_post}</h2>
              // console.log(p.post_id,p.user_post)
            )): null}
          </div>
      </div>
    </>
  )
}

export default ShowPost