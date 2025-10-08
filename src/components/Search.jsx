export default function Search({ query, setQuery }) {
  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies.."
      />
    </div>
  );
}
