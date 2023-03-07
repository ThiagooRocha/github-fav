import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  id: number;
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  repos_url: string;
  followers: number;
  following: number;
  message?: string;
}

interface InitState {
  user: null | UserData;
  favUsers: UserData[]
}

const initialState: InitState = {
  user: null,
  favUsers: [
   
  ],
};

export const githubUserSlice = createSlice({
  name: "githubUser",
  initialState,
  reducers: {
    getUser: (state, action) => {
      const data = action.payload.data;
      const newObj = {
        user: data,
        favUsers: [...state.favUsers],
      };

      return newObj;
    },

    addUserOnFav: (state, action) => {
      const user = action.payload.githubUser;
      const newObj = {
        user: state.user,
        favUsers: [...state.favUsers, user],
      };

      return newObj;
    },
    removeUserOnFav: (state, action) => {
      const user = action.payload.githubUser;
      const removeFavUser = state.favUsers.filter(item => item.id !== user.id) 

      const newObj = {
        user: state.user,
        favUsers: removeFavUser
      }

      return newObj
    }
  },
});

export const { getUser, addUserOnFav, removeUserOnFav } = githubUserSlice.actions;
export const githubUserReducer = githubUserSlice.reducer;
