import { useState } from "react";
import "./Libary.css";
import { Planet, MagnifyingGlass } from "phosphor-react";

//Components
import { UserCard } from "../../components/UserCard";

//Router 
import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/githubUserRedux";

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

export function Libary() {
  const [openMenu, setOpenMenu] = useState(false);
  const githubUser = useSelector((state: any) => state.githubUser.user);
  const favUsers = useSelector((state: any) => state.githubUser.favUsers )
  const dispatch = useDispatch()

  function navigateToUser(user: UserData){
      if(user.id !== githubUser.id){
        const data = user
        dispatch(getUser({ data }))
      }
   }

  return (
    <section className={openMenu ? "Libary active" : "Libary"}>
      <div className="menu_libary">
      <Link to='/'><MagnifyingGlass size={30} /></Link>
        <button onClick={() => setOpenMenu(!openMenu)}>
          <Planet size={25} />
        </button>
        <div className="cards_fav_users">
          {favUsers.map((user: UserData) => (
            <div key={user.id} className="card_fav_user" onClick={() => navigateToUser(user)}>
            <div className="box_img">
              <img src={user.avatar_url} alt={user.login} />
            </div>
            <h2>{user.login}</h2>
          </div>
          )) }
        </div>
      </div>
      <UserCard />
    </section>
  );
}