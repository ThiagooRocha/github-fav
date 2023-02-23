import { useState } from "react";
import "./UserCard.css";
import { Users, Book } from "phosphor-react";

interface UserData {
  id: number;
  login: string;
  bio: string;
  avatar_url: string;
  repos_url: string;
  repos: UserRepos[];
  followers_url: string;
  following_url: string;
  message?: string;
}
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
  const [users, setUsers] = useState<UserData[]>([
    {
      login: "ThiagooRocha",
      id: 100046543,
      bio: "Desenvolvedor Web, gosto sempre de me aventurar e aprender algo novo na área de tecnologia. Desenvolvedor em desenvolvimento 🚀",
      avatar_url: "https://avatars.githubusercontent.com/u/100046543?v=4",
      repos_url: "https://api.github.com/users/ThiagooRocha/repos",
      repos: [
        {
          id: 556104519,
          name: "task-list-react",
          description: "",
          html_url: "https://github.com/ThiagooRocha/task-list-react",
          created_at: "2022-10-23T04:01:28Z",
          updated_at: "2022-11-22T15:50:53Z",
        },
        {
          id: 568949548,
          name: "thiagoo-rocha",
          description: "",
          html_url: "https://github.com/ThiagooRocha/thiagoo-rocha",
          created_at: "2022-11-21T18:58:51Z",
          updated_at: "2022-11-22T03:35:01Z",
        },
        {
          id: 513690303,
          name: "ThiagooRocha",
          description: "",
          html_url: "https://github.com/ThiagooRocha/ThiagooRocha",
          created_at: "2022-07-13T22:38:45Z",
          updated_at: "2022-07-13T22:38:45Z",
        },
        {
          id: 594128682,
          name: "tier-list",
          description: "",
          html_url: "https://github.com/ThiagooRocha/tier-list",
          created_at: "2023-01-27T17:05:07Z",
          updated_at: "2023-02-11T03:38:03Z",
        },
        {
          id: 463713589,
          name: "Timer",
          description: "",
          html_url: "https://github.com/ThiagooRocha/Timer",
          created_at: "2022-02-26T00:30:03Z",
          updated_at: "2022-02-27T01:41:48Z",
        },
      ],
      followers_url: "https://api.github.com/users/ThiagooRocha/followers",
      following_url: "https://api.github.com/users/ThiagooRocha/following",
    },
  ]);

  return (
    <div>
      {users.length ? (
        <>
          {users.map((user) => (
            <div key={user.id} className="user_page">
              <div className="user_card">
                <div className="card_header">
                  <div className="box_img">
                    <img src={user.avatar_url} alt={user.login} />
                  </div>

                  <div className="header_infos">
                    <h1>Thiago Rocha</h1>
                    <h2>{user.login}</h2>
                    <p>{user.bio}</p>
                  </div>

                  <div className="box_followers">
                    <p>
                      <Users size={18} weight="bold" /> <strong>5</strong>{" "}
                      followers
                    </p>
                    <p>
                      <strong>7</strong> following
                    </p>
                  </div>
                </div>
              </div>

              <div className="user_repos">
                <h2><Book size={25} /> Repositories</h2>
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
                  {user.repos.map((repo) => (
                    <div key={repo.id} className="card_repos">
                      <p>{repo.name}</p>
                      <div className="card_repos_infos">
                        <a href={repo.html_url} target="_blank">
                          ver mais
                        </a>
                        <small>{repo.updated_at}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}