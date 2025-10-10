import { useEffect, useState } from "react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import MovieCard from "./components/MovieCard";
import { Routes, Route, NavLink, useLocation } from "react-router";
import WatchList from "./components/WatchList";
import WatchedList from "./components/WatchedList";

const KEY = "40bcec08";

const initialMovies = [
  "wednesday",
  "marvel",
  "brooklyn",
  "red notice",
  "resident alien",
  "supernatural",
  "lucifer",
  "lethal weapon",
  "jurassic world",
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
  const location = useLocation();

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    setIsOpen(true);
  }

  function handleCloseMovie() {
    setSelectedMovie(null);
    setIsOpen(false);
  }

  useEffect(() => {
    if (location.pathname === "/" && !query) {
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
    }
  }, [location.pathname, query]);

  useEffect(() => {
    if (!query.trim()) {
      if (location.pathname === "/") {
        return;
      }
      setMovies([]);
      return;
    }

    const timer = setTimeout(async function fetchMovies() {
      setIsLoading(true);

      try {
        const url = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setResults(data.totalResults);
        } else {
          setMovies([]);
          setResults(0);
        }
      } catch (error) {
        console.error("Error fetching movies", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, location.pathname]);

  return (
    <>
      <Header>
        <NavLink to="/" onClick={() => setQuery("")}>
          <Logo />
        </NavLink>
        <Search query={query} setQuery={setQuery} />
      </Header>
      <Main>
        <Navigation>
          <NavLink to="/">Search Movies</NavLink>
          <NavLink to="/watch">Watch List</NavLink>
          <NavLink to="/watched">Watched List</NavLink>
        </Navigation>
        <SearchResults />
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                movies={movies}
                onSelectMovie={handleSelectMovie}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/watch" element={<WatchList />} />
          <Route path="/watched" element={<WatchedList />} />
        </Routes>
      </Main>

      {isOpen && selectedMovie && (
        <MovieCard
          selectedMovie={selectedMovie}
          onClose={handleCloseMovie}
          KEY={KEY}
        />
      )}
    </>
  );
}
