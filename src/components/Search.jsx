import { useLocation } from "react-router";

export default function Search({
  query,
  setQuery,
  placeholder,
  localQuery,
  setLocalQuery,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const value = isHomePage ? query : localQuery;
  const onChange = isHomePage ? setQuery : setLocalQuery;

  return (
    <div className="search">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
