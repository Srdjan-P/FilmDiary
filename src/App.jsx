import { useEffect, useState } from "react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

const KEY = "40bcec08";

export default function App() {
  const [query, setQuery] = useState("armageddon");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;

    async function fetchMovies() {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search);
    }
    fetchMovies();
  }, [query]);
  console.log(movies);

  return (
    <>
      <Header>
        <Logo />
        <Search />
      </Header>
      <Main>
        <Navigation />
        <SearchResults />
        <MovieList />
      </Main>
    </>
  );
}
