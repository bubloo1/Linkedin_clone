import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/getBaseURL'

// import Cookies from 'js-cookie';

// Retrieving the token
// const token = Cookies.get('jwtToken');

type myState = {
    user: string[],
    status: 'idle',
    error: null
 }

const initialState: myState = {
   user: [],
   status: 'idle',
   error: null
}

type signupUserProps = {
    email: string,
    password: string
}

export const createNewUser = createAsyncThunk('/auth/signup',async (initialPost: signupUserProps) =>{
    const response = await api.post('/auth/signup', initialPost);
    if (response.data.token){
        console.log(response.data.token,"token in front end")
        sessionStorage.setItem('jwtToken', response.data.token);
        // console.log(Cookies.get('jwtToken'))
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
        })
    },
})

export const selectAllUser = (state: { auth: { user: any; }; }) => state.auth.user

export default authSlice.reducer