import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

type myState = {
    notificationDetails: string[]
    status: string
    error1: string | null | undefined
 }

const initialState: myState = {
    notificationDetails: [],
   status: "idle" ,
   error1: null,
}
 
export const getconnectionProfile = createAsyncThunk('notification/getnotifications',async () =>{
    try{
        const response = await api.get('profile/getnotifications', {
          headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
        console.log(response.data.message,"sdfgyghfdioslgjiou")
        return response.data.message
    }catch(error){
        console.log(error,"Error")
        throw error
    }
})



const notificationSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
      handleConnectionsRequests: (state,action) => {
        state.notificationDetails = action.payload
      }

    },
    extraReducers: (builder) => {
        // Handle the first fetch request
        builder.addCase(getconnectionProfile.pending, (state) => {
          state.status = "idle";
          state.error1 = null;
        });
        builder.addCase(getconnectionProfile.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.notificationDetails = action.payload;
        });
        builder.addCase(getconnectionProfile.rejected, (state, action) => {
          state.status = "failed";
          state.error1 = action.error.message;
        });

      }
})

export const { handleConnectionsRequests } = notificationSlice.actions

export default notificationSlice.reducer