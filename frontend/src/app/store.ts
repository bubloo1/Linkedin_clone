import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../components/post/postSlice'
import authSlice from "../components/auth/authSlice";
import profileSlice from "../components/profile/profileSlice";
import chatSlice from "../components/chat/chatSlice";
import networkSlice from "../components/network/networkSlice";
import notificationSlice from '../components/notification/notificationSlice'

export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authSlice,
        profile: profileSlice,
        chat: chatSlice,
        network:networkSlice,
        connection: notificationSlice
    }
})