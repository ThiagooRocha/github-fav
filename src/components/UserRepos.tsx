import { useState, useEffect } from "react";
import './UserRepos.css'
import { Book, ArrowSquareOut, Checks } from "phosphor-react";


//Redux
import { useSelector } from "react-redux";

interface UserRepos {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  visibility?: string;
}

export function UserRepos() {
  const githubUser = useSelector((state: any) => state.githubUser.user);

  const [userRepos, setUserRepos] = useState<UserRepos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("name");

  useEffect(() => {
    if (githubUser) {
      fetchUserRepos();
      setSearchInput("");
      setSelectValue("name");
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

  function convertRepoDate(date: string) {
    const convertedDate = date.toString().slice(0, 10);
    return convertedDate;
  }

  function findRepository() {
    const filteredRepos = userRepos.filter((repo) => {
      return repo.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return filteredRepos;
  }

  function sortUserRepos(e: any) {
    const value = e.target.value;
    if (value === "lastUpdate") {
      setSelectValue(value);
      sortByLastUpadate();
    } else if (value === "name") {
      setSelectValue(value);
      sortByName();
    }
  }

  function sortByName() {
    userRepos.sort((a, b) => a.name.localeCompare(b.name));
  }

  function sortByLastUpadate() {
    userRepos.sort(function (a, b) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }

  return (
    <div className="user_repos">
      <h2>
        <Book size={25} /> Repositories
      </h2>

      <div className="repos_header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            findRepository();
          }}
        >
          <input
            type="text"
            placeholder="Find a repository..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        <select name="select" value={selectValue} onChange={sortUserRepos}>
          <option value="name">Name</option>
          <option value="lastUpdate">Last update</option>
        </select>
      </div>

      <div className="container_repos">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {searchInput !== "" ? (
              <>
                {findRepository().map((repo: UserRepos) => (
                  <div key={repo.id} className="card_repos">
                    <p>{repo.name}</p>
                    <div className="card_repos_infos">
                      <a href={repo.html_url} target="_blank" title="show more">
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
            ) : (
              <>
                {userRepos.map((repo: UserRepos) => (
                  <div key={repo.id} className="card_repos">
                    <p>{repo.name}</p>
                    <div className="card_repos_infos">
                      <a href={repo.html_url} target="_blank" title="show more">
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
          </>
        )}
      </div>
    </div>
  );
}
