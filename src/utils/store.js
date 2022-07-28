import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import navbarReducer from './features/navSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        navbar: navbarReducer
    }
})

export default store;