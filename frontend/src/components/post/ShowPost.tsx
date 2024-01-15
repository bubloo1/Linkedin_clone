import './showPost.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from './postSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
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
    <>
      <br />
      <div className="post_container">
          <div className="show_posts">
            {postStatus == "idle" &&<h2>loading</h2>}
            {postStatus == "succeeded" ? post.map((p:myPost)=>(
              <h2 key={p.post_id}>{p.user_post}</h2>
            )): null}
          </div>
      </div>
    </>
  )
}

export default ShowPost