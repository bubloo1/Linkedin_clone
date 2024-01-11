import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

// const initialState = [
//    {id:1,post:"somthuing"}
// ]

type myState = {
    posts: string[],
    status: 'idle',
    error: null
 }

const initialState: myState = {
   posts: [],
   status: 'idle',
   error: null
}

type AddNewPostPayload = {
    post: string; // Adjust the type as needed
  }
  


export const addNewPost = createAsyncThunk('posts/addNewPost',async (initialPost: AddNewPostPayload) =>{
    const response = await api.post('/post', initialPost);
    return response.data
})


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        // postAdded: {
        //     reducer(state,action:PayloadAction<{ post: string }>){
        //         state.posts.push(action.payload.post)
        //     },
        //     prepare(post){
        //         return {
        //             payload:{
        //                 post
        //             }

        //         } 
        //     }
        // }

    },
    extraReducers(builders){
        builders.addCase(addNewPost.fulfilled, (state,action)=>{
            state.posts.push(action.payload)
        })
    }

})

export const selectAllPosts = (state: { posts: { posts: any; }; }) => state.posts.posts

export default postSlice.reducer