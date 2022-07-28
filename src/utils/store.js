import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import navbarReducer from './features/navSlice'
import tasksReducer from './features/taskSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        navbar: navbarReducer,
        tasks: tasksReducer,
    }
})

export default store;