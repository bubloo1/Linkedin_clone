import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../components/post/postSlice'
import authSlice from "../components/auth/authSlice";
import profileSlice from "../components/profile/profileSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authSlice,
        profile: profileSlice
    }
})