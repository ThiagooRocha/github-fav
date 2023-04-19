import { useEffect } from "react";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import { Home } from "./pages/Home/Home";
import { Libary } from "./pages/Libary/Libary";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavUsers } from "./features/githubUserRedux";

export function App() {
  const githubUser = useSelector((state: any) => state.githubUser.user);
  const dispatch = useDispatch();
  const localStorageFavUsers: any = localStorage.getItem("favUsers");
  const favUsers = JSON.parse(localStorageFavUsers);

  useEffect(() => {
    if (localStorageFavUsers) {
      dispatch(getUser({ data: favUsers[0] }));
      dispatch(setFavUsers({ favUsers }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/libary" element={ <Libary /> } />   
      </Routes>
    </BrowserRouter>
  );
}
