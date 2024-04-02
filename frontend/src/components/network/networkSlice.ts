import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

type myState = {
    networkProfile: string[]
    status: string
    error1: string | null | undefined
 }

const initialState: myState = {
   networkProfile: [],
   status: "idle" ,
   error1: null,
}
 
export const getNetworkProfile = createAsyncThunk('profile/getallprofiledetails',async () =>{
    try{
        const response = await api.get('profile/getallprofiledetails', {
          headers:{
          // "Accept": "application/json",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }});
        
        if(response.headers['authorization']){
          localStorage.setItem('jwtToken',response.headers['authorization'])
        }
       
        return response.data.message
    }catch(error){
        console.log(error,"Error")
        throw error
    }
})

export const sendConnectionDetails = createAsyncThunk('profile/sendconnectiondetails',async (connectiondata: {connectionTo:number, connectionFrom:string | null}) =>{
  try{
      const response = await api.post('profile/sendconnectiondetails', connectiondata, {
        headers:{
        // "Accept": "application/json",
        "Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
      }});
      
      if(response.headers['authorization']){
        localStorage.setItem('jwtToken',response.headers['authorization'])
      }
     
      return response.data.message
  }catch(error){
      console.log(error,"Error")
      throw error
  }
})



const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{

      handleConnections: (state, action)=> {
        state.networkProfile = action.payload
      },

    },
    extraReducers: (builder) => {
        // Handle the first fetch request
        builder.addCase(getNetworkProfile.pending, (state) => {
          state.status = "idle";
          state.error1 = null;
        });
        builder.addCase(getNetworkProfile.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.networkProfile = action.payload;
        });
        builder.addCase(getNetworkProfile.rejected, (state, action) => {
          state.status = "failed";
          state.error1 = action.error.message;
        });

      }
})


export const { handleConnections } = postSlice.actions
export default postSlice.reducer