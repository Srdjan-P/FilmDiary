import Button from "./Button";
import Loader from "./Loader";
import NoResults from "./NoResults";
import SearchResults from "./SearchResults";
import WatchedMovie from "./WatchedMovie";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function WatchedList({
  watched,
  isLoading,
  setConfirmation,
  onRemoveMovie,
  localQuery,
  onSelectMovie,
}) {
  const [sortBy, setSortBy] = useState("");
  const filteredData = watched.filter((item) => {
    if (!localQuery || localQuery === "") {
      return item;
    } else {
      const searchTerm = localQuery?.toLowerCase();
      const title = item.title || item.Title || "";

      return title?.toLowerCase().includes(searchTerm);
    }
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const lowRating = parseFloat(a.userRating);
    const highRating = parseFloat(b.userRating);

    if (sortBy === "high") {
      return highRating - lowRating;
    }

    if (sortBy === "low") {
      return lowRating - highRating;
    }

    return 0;
  });

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <SearchResults>
            <span className="text">
              You have {watched.length} titles on your list
            </span>
            {watched.length > 0 && (
              <Button onClick={() => setConfirmation(true)}>CLEAR LIST</Button>
            )}
          </SearchResults>

          {watched.length > 0 && (
            <div className="select">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sort-by">Sort by Rating</InputLabel>
                <Select
                  labelId="sort-by"
                  id="sort-by"
                  value={sortBy}
                  label="Sort by Rating"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="high">High to Low</MenuItem>
                  <MenuItem value="low">Low to High</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          <div className="watched-list">
            <ul>
              {sortedData.map((movie) => (
                <WatchedMovie
                  movie={movie}
                  key={movie.imdbID}
                  onRemoveMovie={onRemoveMovie}
                  onSelectMovie={onSelectMovie}
                />
              ))}
            </ul>
          </div>
        </>
      )}
      {watched.length === 0 && !localQuery && !isLoading && (
        <NoResults
          message={"Your Watched List is empty."}
          subMessage={"Start watching some movies!"}
        />
      )}

      {localQuery && filteredData.length === 0 && (
        <NoResults
          message={`No results found in your Watched List for "${localQuery}"`}
        />
      )}
    </>
  );
}
