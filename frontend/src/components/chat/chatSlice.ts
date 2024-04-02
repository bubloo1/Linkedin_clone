import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

// import Cookies from 'js-cookie';

// Retrieving the token
// const token = Cookies.get('jwtToken');

type myState = {
    chatuser: string[],
    chatData: string[]
    status: string
    chatDataStatus: string
    error: null
 }

const initialState: myState = {
   chatuser: [],
   chatData: [],
   status: 'idle',
   chatDataStatus: 'idle',
   error: null
}

export const getUserdata = createAsyncThunk('/chat/getchatdetails',async () =>{
    console.log("in reponse")
    const response = await api.get('chat/getchatdetails',{
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
    });
    console.log(response,"response")
    if(response.headers['authorization']){
        localStorage.setItem('jwtToken',response.headers['authorization'])
      }
    return response.data.message.map((profile:any)=> {
        return {id:profile.user_id, username: profile.user_username, firstName: profile.first_name, 
            lastName: profile.last_name}
    })
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        addChat:(state,action) =>{
            state.chatData = action.payload
        }

    },
    extraReducers(builders) {
        builders.addCase(getUserdata.fulfilled,(state,action) => {
            state.status = "succeeded"
            state.chatuser = action.payload
        })
    },
})


export default chatSlice.reducer