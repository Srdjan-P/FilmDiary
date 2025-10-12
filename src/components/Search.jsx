export default function Search({ query, setQuery, disabled }) {
  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies.."
        disabled={disabled}
      />
    </div>
  );
}
