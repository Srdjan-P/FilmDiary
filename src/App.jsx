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
import ClearList from "./components/ClearList";

const KEY = "40bcec08";

const initialMovies = [
  "wednesday",
  "avengers",
  "brooklyn",
  "red notice",
  "resident alien",
  "supernatural",
  "lucifer",
  "lethal weapon",
  "jurassic world",
  "serendipity",
  "inception",
  "KPop",
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
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState("");
  const [watchList, setWatchList] = useState(() => {
    const storedValue = localStorage.getItem("watchList");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [confirmation, setConfirmation] = useState(false);

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    setIsOpen(true);
  }

  function handleCloseMovie() {
    setSelectedMovie(null);
    setIsOpen(false);
    setComment("");
    setUserRating(0);
  }

  function handleAddToWatchedList(movie) {
    setWatched((watched) => [...watched, movie]);
    setUserRating(0);
    handleRemoveMovie(movie.imdbID);
  }

  function handleAddToWatchList(movie) {
    setWatchList((watchList) => [...watchList, movie]);
  }

  function handleRemoveMovie(id) {
    setWatchList((watchList) =>
      watchList.filter((movie) => movie.imdbID !== id)
    );
    setIsOpen(false);
  }

  function handleClearList() {
    if (location.pathname === "/watch") {
      setConfirmation(false);
      return setWatchList([]);
    } else if (location.pathname === "/watched") {
      setConfirmation(false);
      return setWatched([]);
    }
  }

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    if (location.pathname === "/" && !query) {
      async function fetchInitialMovies() {
        setIsLoading(true);
        try {
          let allMovies = [];

          for (const term of initialMovies) {
            const url = `https://www.omdbapi.com/?apikey=${KEY}&s=${term}`;
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
        const url = `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
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
    }, 800);

    return () => clearTimeout(timer);
  }, [query, location.pathname]);

  return (
    <>
      <Header>
        <NavLink to="/" onClick={() => setQuery("")}>
          <Logo />
        </NavLink>
        <Search
          query={query}
          setQuery={setQuery}
          disabled={location.pathname !== "/"}
        />
      </Header>
      <Main>
        <Navigation>
          <NavLink to="/">Search Movies</NavLink>
          <NavLink to="/watch">Watch List</NavLink>
          <NavLink to="/watched">Watched List</NavLink>
        </Navigation>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {query && results > 0 && (
                  <SearchResults>Search results for "{query}"</SearchResults>
                )}
                <MovieList
                  movies={movies}
                  onSelectMovie={handleSelectMovie}
                  isLoading={isLoading}
                />
              </>
            }
          />
          <Route
            path="/watch"
            element={
              <WatchList
                watchList={watchList}
                onSelectMovie={handleSelectMovie}
                isLoading={isLoading}
                setConfirmation={setConfirmation}
              />
            }
          />
          <Route
            path="/watched"
            element={
              <WatchedList
                watched={watched}
                setConfirmation={setConfirmation}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </Main>

      {isOpen && selectedMovie && (
        <MovieCard
          selectedMovie={selectedMovie}
          onClose={handleCloseMovie}
          onWatchedMovie={handleAddToWatchedList}
          KEY={KEY}
          userRating={userRating}
          setUserRating={setUserRating}
          comment={comment}
          setComment={setComment}
          watched={watched}
          onAddToWatchList={handleAddToWatchList}
          location={location}
          watchList={watchList}
          onRemoveMovie={handleRemoveMovie}
        />
      )}
      {confirmation && (
        <ClearList
          setConfirmation={setConfirmation}
          onConfirmation={handleClearList}
        />
      )}
    </>
  );
}
