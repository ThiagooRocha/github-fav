import { useState, FormEvent } from "react";
import "./Libary.css";
import { Planet, MagnifyingGlass } from "phosphor-react";
const url = `https://api.github.com/users/`;

//Components
import { UserCard } from "../../components/UserCard";

//Router
import { useNavigate } from "react-router-dom";

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
  const favUsers = useSelector((state: any) => state.githubUser.favUsers);
  const dispatch = useDispatch();

  const [inputUser, setInputUser] = useState<string>("");
  const validation = inputUser !== "";
  const navigate = useNavigate();

  function navigateToUser(user: UserData) {
    if (user.id !== githubUser.id) {
      const data = user;
      dispatch(getUser({ data }));
    }
  }

  async function fetchUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validation) {
      try {
        const urlApi = await fetch(`${url}${inputUser}`);
        const data = (await urlApi.json()) as UserData;

        if (data.message === "Not Found") {
          console.log("Usúario não encontrado!");
        } else {
          dispatch(getUser({ data }));
          navigate("/libary");
          setInputUser('')
        }
      } catch (error) {
        console.log(error);
        setInputUser('')
      }
    }
  }

  return (
    <section className={openMenu ? "Libary active" : "Libary"}>
      <div className="menu_libary">
        <div className="container_btn">

          <form className="search_box" onSubmit={fetchUser}>
            <MagnifyingGlass size={25} />
            <input type="text" placeholder="Search a user" value={inputUser} onChange={(e) => setInputUser(e.target.value)}/>
          </form>

          <button onClick={() => setOpenMenu(!openMenu)}>
            <Planet size={25} />
          </button>
        </div>
        <div className="cards_fav_users">
          {favUsers.map((user: UserData) => (
            <div
              key={user.id}
              className="card_fav_user"
              onClick={() => navigateToUser(user)}
            >
              <div className="box_img">
                <img src={user.avatar_url} alt={user.login} />
              </div>
              <h2>{user.login}</h2>
            </div>
          ))}
        </div>
      </div>
      <UserCard />
    </section>
  );
}
