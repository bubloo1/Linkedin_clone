import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

type myState = {
    profileDetails: string[],
    status: string,
    status2: string,
    error: string | null | undefined
 }

const initialState: myState = {
    profileDetails:[],
    status: "idle",
    status2: "idle",
    error: null
}

type sendProfilePayload = {
    selectedPronouns?:string
    firstName?: string
    lastName?: string
    additionalName?: string
    headline?: string
    country?: string
    city?: string
}

export const sendProfileDetails = createAsyncThunk('profile/saveprofiledetails',async (initialPost:sendProfilePayload) =>{
    try{
        const response = await api.post('/profile/saveprofiledetails',initialPost,{
            headers:{
            // "Accept": "application/json",
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
          }});
        console.log(response,"response")
        return response.data
     
    }catch(err){
        console.log(err,"error")
        throw err
    }
})

export const uploadProfileImage = createAsyncThunk('profile/image',async (formData:FormData) =>{
    try{
        const response = await api.post('/profile/profileimageupload',formData,{
            headers:{
            // "Accept": "application/json",
            // "Content-Type":"application/json",
            "Content-Type":"multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
          }});
        console.log(response,"response")
        return response.data
     
    }catch(err){
        console.log(err,"error")
        throw err
    }
})

export const getProfileDetails = createAsyncThunk('profile/getprofiledetails',async () =>{
    try{
        const response = await api.get('/profile/getprofiledetails',{
            headers:{
            // "Accept": "application/json",
            // "Content-Type":"application/json",
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
          }});
        console.log(response,"response")
        return response.data.message
     
    }catch(err){
        console.log(err,"error")
        throw err
    }
})

export const getConnectionCount = createAsyncThunk('profile/getconnectionCount',async (userID:string | null) =>{
    try{
        const response = await api.post('/profile/getconnectionCount',{userID},{
            headers:{
            // "Accept": "application/json",
            // "Content-Type":"application/json",
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
          }});
        console.log(response.data.message.connectionsCount,"response")
        return response.data.message.connectionCount
     
    }catch(err){
        console.log(err,"error")
        throw err
    }
})


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{

    },
    extraReducers(builders){
        builders
        .addCase(sendProfileDetails.pending, (state, action)=>{
            state.status = "idle"
        })
        .addCase(sendProfileDetails.fulfilled, (state,action)=>{
            state.status = "succeeded"
            // state.profileDetails.push(action.payload)
        })
        .addCase(sendProfileDetails.rejected, (state,action)=>{
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(getProfileDetails.rejected, (state,action)=>{
            state.status2 = "failed"
            state.error = action.error.message
        })
        .addCase(getProfileDetails.fulfilled, (state,action)=>{
            state.status2 = "succeeded"
            state.profileDetails = action.payload
        })
    }
})

export default profileSlice.reducer