import { useState, useEffect, FormEvent } from "react";
import "./Libary.css";
import { Planet, MagnifyingGlass } from "phosphor-react";
const url = `https://api.github.com/users/`;

//Components
import { UserCard } from "../../components/UserCard";
import { UserRepos } from "../../components/UserRepos";
import { StatusCard } from "../../components/StatusCard";

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
interface InitState {
  user: null | UserData;
  favUsers: UserData[];
}
interface SelectorState {
  githubUser: InitState;
}

export function Libary() {
  const favUsers = useSelector(
    (state: SelectorState) => state.githubUser.favUsers
  );
  const githubUser = useSelector((state: any) => state.githubUser.user);
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const [inputUser, setInputUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");

  const validation = inputUser !== "";
  const navigate = useNavigate();

  if (githubUser == null) {
    navigate("/");
  }

  function navigateToUser(user: UserData) {
    if (user.id !== githubUser.id) {
      setError(false);
      const data = user;
      dispatch(getUser({ data }));
    }
  }

  async function fetchUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validation) {
      setLoading(true);
      setError(false);
      try {
        const urlApi = await fetch(`${url}${inputUser}`);
        const data = (await urlApi.json()) as UserData;

        if (data.message === "Not Found") {
          setLoading(false);
          setError(true);
          setMessageError("Usúario não encontrado!");
        } else {
          dispatch(getUser({ data }));
          navigate("/libary");
          setInputUser("");
          setError(false);
          setLoading(false);
          setOpenMenu(false);
        }
      } catch (error) {
        console.log(error);
        setInputUser("");
        setLoading(false);
        setError(true);
        setMessageError("erro");
      }
    }
  }

  return (
    <section className={openMenu ? "Libary active" : "Libary"}>
      {loading && <StatusCard />}
      {error && <StatusCard message={messageError} error />}

      <div className="menu_libary">
        <div className="container_btn">
          <form className="search_box" onSubmit={fetchUser}>
            <MagnifyingGlass size={25} />
            <input
              type="text"
              placeholder="Search a user"
              value={inputUser}
              onChange={(e) => setInputUser(e.target.value)}
            />
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
      <div
        className="menu_libary_overlay"
        onClick={() => {
          setOpenMenu(false);
        }}
      />
      <div className="user_page">
        <UserCard />
        <UserRepos />
      </div>
    </section>
  );
}
