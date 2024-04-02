import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

type myState = {
    addPosts: string[]
    posts: string[]
    comments: Array<object>
    loading1: string
    loading2: string
    loading3: string
    error1: string | null | undefined
    error2: string | null | undefined
 }

const initialState: myState = {
   addPosts: [],
   posts: [],
   comments: [],
   loading1: "idle" ,
   loading2: "idle",
   loading3: "idle",
   error1: null,
   error2: null
}
  

export const addNewPost = createAsyncThunk('posts/addNewPost',async (PostData: FormData) =>{
    try{
        const response = await api.post('post/savepost', PostData, {
          headers:{
          // "Accept": "application/json",
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
        return response.data
    }catch(error){
        console.log(error,"Error")
        throw error
    }
})
// select p.*, ud.first_name, ud.last_name, ud.profile_url from posts as p join user_details as ud on ud.user_id = p.user_id;
export const getPost = createAsyncThunk('posts/showpost',async () =>{
    try{
      
        const response = await api.get('/post/showposts',{headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
         
        },withCredentials: true});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
        return response.data.message.map((post:any) => {
            return {postID:post.post_id, userPost:post.user_post, 
              userURL: "http://localhost:3500/" + post.profile_url, 
              userFirstName: post.first_name, userLastName: post.last_name, 
              postURL: "http://localhost:3500/" + post.post_url, postBio: post.user_bio,
              postLiked:post.post_like, likesCount:post.post_like_count, showComment: false}
        })
    }catch(err){
        throw err
    }
})

export const updatePostLikes = createAsyncThunk('posts/updatepostlikes',async (postID:any) =>{
    try{
        console.log(postID,"posid in dispatch")
        const response = await api.post('/post/updatepostlikes',postID,{ headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
         
        }});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
        return response.data
    }catch(err){
        throw err
    }
})

export const getComments = createAsyncThunk('posts/getcomments',async (postID:{postID:number}) =>{
    try{
        const response = await api.post('/post/getcomments', postID ,{ headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
         
        }});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
        return response.data.message
    }catch(err){
        throw err
    }
})

type myComment = {
  postID:number
  addComment: string
}

export const saveComment = createAsyncThunk('posts/savecomment',async (comment: myComment) =>{
    try{
        console.log(comment,"posid in dispatch")
        const response = await api.post('/post/savecomment',comment,{ headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
         
        }});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
        return response.data
    }catch(err){
        throw err
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
      toggleLike: (state, action)=> {
        state.posts = action.payload
      },
      toggleComment: (state, action)=> {
        state.posts = action.payload
      }

    },
    extraReducers: (builder) => {
        // Handle the first fetch request
        builder.addCase(addNewPost.pending, (state) => {
          state.loading1 = "idle";
          state.error1 = null;
        });
        builder.addCase(addNewPost.fulfilled, (state, action) => {
          state.loading1 = "succeeded";
          state.addPosts = action.payload;
        });
        builder.addCase(addNewPost.rejected, (state, action) => {
          state.loading1 = "failed";
          state.error1 = action.error.message;
        });
    
        // Handle the second fetch request
        builder.addCase(getPost.pending, (state) => {
          state.loading2 = "idle";
          state.error2 = null;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
          state.loading2 = "succeeded";
          state.posts = action.payload;
        });
        builder.addCase(getPost.rejected, (state, action) => {
          state.loading2 = "failed";
          state.error2 = action.error.message;
        });

        //comments fetch request
        builder.addCase(getComments.fulfilled, (state, action) => {
          state.loading3 = "succeeded";
          state.comments = action.payload;
        });

      },

})


export const { toggleLike } = postSlice.actions
export const { toggleComment } = postSlice.actions

export default postSlice.reducer