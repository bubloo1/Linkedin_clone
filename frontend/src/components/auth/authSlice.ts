import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

// import Cookies from 'js-cookie';

// Retrieving the token
// const token = Cookies.get('jwtToken');

type myState = {
    user: string[],
    loginUser: string[]
    status: 'idle',
    error: null
 }

const initialState: myState = {
   user: [],
   loginUser:[],
   status: 'idle',
   error: null
}

type signupUserProps = {
    email: string,
    password: string
}

export const createNewUser = createAsyncThunk('/auth/signup',async (initialPost: signupUserProps) =>{
    const response = await api.post('/auth/signup', initialPost);
    console.log(response,"response")
    if (response.data.token){
        console.log(response.data.token,"token in front end")
        localStorage.setItem('jwtToken', response.data.token);
    }
    return response.data
})

export const loginUser = createAsyncThunk('/auth/login',async (initialPost: signupUserProps) =>{
    const response = await api.post('/auth/login', initialPost);
    console.log(response,"response")
    if (response.data.token){
        console.log(response.data.token,"token in front end")
        localStorage.setItem('jwtToken', response.data.token);
    }
    return response.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    },
    extraReducers(builders) {
        builders.addCase(createNewUser.fulfilled, (state,action)=> {
            state.user.push(action.payload.token)
        });
        builders.addCase(loginUser.fulfilled,(state,action) => {
            state.loginUser.push(action.payload.token)
        })
    },
})

export const selectAllUser = (state: { auth: { user: any; }; }) => state.auth.user

export default authSlice.reducer