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
  favUsers: UserData[];
}

const initialState: InitState = {
  user: null,
  favUsers: [],
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
      const user: UserData = action.payload.githubUser;
      const newObj = {
        user: state.user,
        favUsers: [...state.favUsers, user],
      };

      localStorage.setItem("favUsers", JSON.stringify(newObj.favUsers));
      return newObj;
    },
    removeUserOnFav: (state, action) => {
      const user = action.payload.githubUser;
      const removeFavUser = state.favUsers.filter(
        (item) => item.id !== user.id
      );

      const newObj: any = {
        user: state.user,
        favUsers: removeFavUser,
      };

      localStorage.setItem("favUsers", JSON.stringify(newObj.favUsers));
      return newObj;
    },
    setFavUsers: (state, action) => {
      const localStorageFavUsers = action.payload.favUsers;

      const newObj = {
        user: state.user,
        favUsers: localStorageFavUsers,
      };

      return newObj;
    },
  },
});

export const { getUser, addUserOnFav, removeUserOnFav, setFavUsers } =
  githubUserSlice.actions;
export const githubUserReducer = githubUserSlice.reducer;
