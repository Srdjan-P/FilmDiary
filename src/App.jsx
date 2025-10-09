import { useEffect, useState } from "react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";

const KEY = "40bcec08";

const initialMovies = [
  "wednesday",
  "marvel",
  "brooklyn",
  "red notice",
  "resident alien",
  "supernatural",
  "lucifer",
  "braveheart",
  "swordfish",
  "armageddon",
  "inception",
  "die hard",
];

// const mostPopularMovies = {
//   ids: [
//     "tt14205554", //KPop Demon Hunters
//     "tt7991608", //Red Notice
//   ],
// };

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    setIsOpen(true);
  }

  function handleCloseMovie() {
    setSelectedMovie(null);
    setIsOpen(false);
  }

  useEffect(() => {
    async function fetchInitialMovies() {
      setIsLoading(true);
      try {
        let allMovies = [];

        for (const term of initialMovies) {
          const url = `http://www.omdbapi.com/?apikey=${KEY}&s=${term}`;
          const res = await fetch(url);
          const data = await res.json();

          if (data.Search) {
            allMovies = [...allMovies, ...data.Search.slice(0, 1)];
          }
        }
        const shuffled = allMovies.sort(() => 0.5 - Math.random());
        setMovies(shuffled);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInitialMovies();
  }, []);

  useEffect(() => {
    const url = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;

    async function fetchMovies() {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search);
      setResults(data.totalResults);
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </Header>
      <Main>
        <Navigation />
        <SearchResults />
        {isLoading ? (
          <Loader />
        ) : (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}
      </Main>
      {isOpen && selectedMovie && (
        <MovieCard movie={selectedMovie} onClose={handleCloseMovie} KEY={KEY} />
      )}
    </>
  );
}
