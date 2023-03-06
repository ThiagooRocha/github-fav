import { configureStore } from "@reduxjs/toolkit" 
import { githubUserReducer } from "./features/githubUserRedux"

export const store = configureStore({
    reducer: {
        githubUser: githubUserReducer
    }
})