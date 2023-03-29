import { useState, useEffect } from "react";
import "./UserCard.css";
import { Star, Users, Book, ArrowSquareOut, Checks } from "phosphor-react";

//Components
import { StatusCard } from "./StatusCard";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addUserOnFav, removeUserOnFav } from "../features/githubUserRedux";

interface UserRepos {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  visibility?: string;
}

export function UserCard() {
  const githubUser = useSelector((state: any) => state.githubUser.user);
  const favUsers = useSelector((state: any) => state.githubUser.favUsers);

  const dispatch = useDispatch();

  const [userRepos, setUserRepos] = useState<UserRepos[]>([]);
  const [favUser, setFavUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    verifFavUser();
    if (githubUser) {
      fetchUserRepos();
    }
  }, [githubUser]);

  async function fetchUserRepos() {
    setLoading(true);
    try {
      const userReposApi = await fetch(githubUser.repos_url);
      const data = await userReposApi.json();

      setUserRepos(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  function verifFavUser() {
    setFavUser(false);
    favUsers.map((item: any) => {
      if (item.id === githubUser.id) {
        return setFavUser(true);
      }
    });
  }

  function addFavUser() {
    if (!favUser) {
      dispatch(addUserOnFav({ githubUser }));
      setFavUser(true);
    }
  }
  function removeFavUser() {
    if (favUser) {
      dispatch(removeUserOnFav({ githubUser }));
      setFavUser(false);
    }
  }

  function convertRepoDate(date: string) {
    const convertedDate = date.slice(0, 10);
    return convertedDate.split("-").reverse().join("/");
  }

  return (
    <div>
      {githubUser ? (
        <div className="user_page">
          {loading && <StatusCard />}
          <div className="user_card">
            <div className="card_header">
              <div className="box_img">
                <img src={githubUser.avatar_url} alt={githubUser.login} />
              </div>

              {favUser ? (
                <Star size={30} onClick={removeFavUser} weight="fill" />
              ) : (
                <Star size={30} onClick={addFavUser} />
              )}

              <div className="header_infos">
                <h1>{githubUser.name}</h1>
                <h2>{githubUser.login}</h2>
                <p>{githubUser.bio}</p>
              </div>

              <div className="box_followers">
                <p>
                  <Users size={18} weight="bold" />{" "}
                  <strong>{githubUser.followers}</strong> followers
                </p>
                <p>
                  <strong>{githubUser.following}</strong> following
                </p>
              </div>
            </div>
          </div>

          <div className="user_repos">
            <h2>
              <Book size={25} /> Repositories
            </h2>

            <div className="repos_header">
              <form>
                <input type="text" placeholder="Find a repository..." />
              </form>
              <select name="" id="">
                <option value="">Last update</option>
                <option value="">Name</option>
              </select>
            </div>

            <div className="container_repos">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <>
                  {userRepos.map((repo: UserRepos) => (
                    <div key={repo.id} className="card_repos">
                      <p>{repo.name}</p>
                      <div className="card_repos_infos">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          title="show more"
                        >
                          <ArrowSquareOut size={20} />
                        </a>
                        <small title="created at">
                          <Checks size={20} color="#535bf2" />
                          {convertRepoDate(repo.created_at)}
                        </small>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
