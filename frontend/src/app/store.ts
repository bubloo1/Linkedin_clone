import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../components/post/postSlice'
import authSlice from "../components/auth/authSlice";
import showPostSLice from "../components/post/showPostSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authSlice,
        showPosts: showPostSLice
    }
})