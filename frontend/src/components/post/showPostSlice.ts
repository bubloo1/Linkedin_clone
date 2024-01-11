import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

type myState = {
    posts: string[],
    status: string,
    error: string | null | undefined
 }

const initialState: myState = {
   posts: [],
   status: "idle",
   error: null
}


export const getPost = createAsyncThunk('posts/showpost',async () =>{
    try{
        const response = await api.get('/post/showposts');
        console.log(response,"response")
        return response.data.message.map((post:any) => {
            return {post_id:post.post_id, user_post:post.user_post}
        })
    }catch(err){
        console.log(err,"error")
        throw err
    }
})


const showPostSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
    },
    extraReducers(builders){
        builders
        // .addCase(getPost.pending, (state, action)=>{
        //     state.status = "loading"
        // })
        .addCase(getPost.fulfilled, (state,action)=>{
            state.status = "succeeded"
            // console.log("in fullied")
            state.posts.push(action.payload)
        })
        .addCase(getPost.rejected, (state,action)=>{
            state.status = "failed"
            state.error = action.error.message
        })
    }

})

// export const showAllPost = (state: { showPosts: { posts: any; }; }) => state.showPosts.posts

export default showPostSlice.reducer