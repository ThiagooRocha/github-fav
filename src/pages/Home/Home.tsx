import { useState, FormEvent } from 'react';
import './Home.css'

import { MagnifyingGlass } from "phosphor-react";
const url = `https://api.github.com/users/`;

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
}

export function Home() {

  const [inputUser, setInputUser] = useState<string>("");
  const validation = inputUser !== "";

  async function fetchUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /* if (validation) {
      try {
        const urlApi = await fetch(`${url}${inputUser}`);
        const data = (await urlApi.json()) as UserData;

        if (data.message === "Not Found") {
          console.log("Usúario não encontrado!");
        } else {
          setUsers((prev) => [...prev, data]);
        }
      } catch (error) {
        console.log(error);
      }
    } */
  }

  return (
    <div className='Home'>
        <div className="wrappler">
        <h1>
          Pesquise seu usuário
          <br />
          do <span>GitHub</span>
        </h1>
        <div className="container">
          <h2>https://github.com/</h2>
          <form onSubmit={fetchUser}>
            <input
              type="text"
              value={inputUser}
              className={validation ? "inputUser active" : "inputUser"}
              onChange={(e) => setInputUser(e.target.value)}
            />
            <button className={validation ? "search-btn active" : "search-btn"}>
              <MagnifyingGlass size={32} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}