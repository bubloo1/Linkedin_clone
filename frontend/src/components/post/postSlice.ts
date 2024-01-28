import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

type myState = {
    addPosts: string[]
    posts: string[]
    loading1: string
    loading2: string
    error1: string | null | undefined
    error2: string | null | undefined
 }

const initialState: myState = {
   addPosts: [],
   posts: [],
   loading1: "idle" ,
   loading2: "idle",
   error1: null,
   error2: null
}

type AddNewPostPayload = {
    post: string; // Adjust the type as needed
  }
  
 
export const addNewPost = createAsyncThunk('posts/addNewPost',async (initialPost: AddNewPostPayload) =>{
    try{
        const response = await api.post('post/post', initialPost, {
          headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
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
            return {post_id:post.post_id, user_post:post.user_post}
        })
    }catch(err){
        throw err
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{

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
      },

})



export default postSlice.reducer