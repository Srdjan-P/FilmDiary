import Header from "./components/Header";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

export default function App() {
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
