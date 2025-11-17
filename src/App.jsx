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
import NoResults from "./components/NoResults";

const KEY = "40bcec08";

const initialMovies = [
  "tt13443470",
  "tt0848228",
  "tt2467372",
  "tt7991608",
  "tt8690918",
  "tt14205554",
  "tt1375666",
  "tt0240890",
  "tt4052886",
  "tt4881806",
  "tt0816692",
  "tt9813792",
];

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

  const [watchList, setWatchList] = useState(() => {
    const storedValue = localStorage.getItem("watchList");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [confirmation, setConfirmation] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    setIsOpen(true);
  }

  function handleCloseMovie() {
    setSelectedMovie(null);
    setIsOpen(false);
  }

  function handleAddToWatchedList(movie) {
    setWatched((watched) => [...watched, movie]);
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

  function handleRemoveFromWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
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
    if (location.pathname === "/" && !query && movies.length === 0) {
      async function fetchInitialMovies() {
        setIsLoading(true);
        try {
          let allMovies = [];

          for (const term of initialMovies) {
            const url = `https://www.omdbapi.com/?apikey=${KEY}&i=${term}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.Response !== "False") {
              allMovies.push(data);
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
  }, [location.pathname, query, movies.length]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setLocalQuery("");
      setMovies([]);
      return;
    }

    if (!query.trim()) {
      if (location.pathname === "/") {
        setMovies([]);
        setResults("");
        return;
      }
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
        {location.pathname === "/" ? (
          <Search
            query={query}
            setQuery={setQuery}
            placeholder="Search titles..."
          />
        ) : (
          <Search
            localQuery={localQuery}
            setLocalQuery={setLocalQuery}
            placeholder={`Search your ${location.pathname.slice(1)} list...`}
          />
        )}
      </Header>
      <Main>
        <Navigation>
          <NavLink to="/">Search</NavLink>
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
                {query && !isLoading && results === 0 && (
                  <NoResults
                    message={`No results found for "${query}"`}
                    subMessage={"Try searching for a different title."}
                  />
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
                localQuery={localQuery}
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
                setWatched={setWatched}
                onRemoveMovie={handleRemoveFromWatched}
                localQuery={localQuery}
                onSelectMovie={handleSelectMovie}
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
          watched={watched}
          onAddToWatchList={handleAddToWatchList}
          location={location}
          watchList={watchList}
          onRemoveMovie={handleRemoveMovie}
          onRemoveWatchedMovie={handleRemoveFromWatched}
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
