import { useState, useEffect } from "react";
import "./UserCard.css";
import { Star, Users } from "phosphor-react";

//Components
import { StatusCard } from "./StatusCard";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addUserOnFav, removeUserOnFav } from "../features/githubUserRedux";

export function UserCard() {
  const githubUser = useSelector((state: any) => state.githubUser.user);
  const favUsers = useSelector((state: any) => state.githubUser.favUsers);

  const dispatch = useDispatch();

  const [favUser, setFavUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    verifFavUser();
  }, [githubUser]);

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

  return (
    <div>
      {githubUser ? (
        <>
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
        </>
      ) : null}
    </div>
  );
}
