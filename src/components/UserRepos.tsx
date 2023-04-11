import { useState, useEffect } from "react";
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
  const [selectValue, setSelectValue] = useState<string>("lastUpdate");

  useEffect(() => {
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

  function convertRepoDate(date: string) {
    const convertedDate = date.slice(0, 10);
    return convertedDate.split("-").reverse().join("/");
  }

  function findRepository() {
    const filteredRepos = userRepos.filter((repo) => {
      return repo.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return filteredRepos;
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
        <select name="select" onChange={(e) => setSelectValue(e.target.value)}>
          <option value="lastUpdate">Last update</option>
          <option value="name">Name</option>
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
