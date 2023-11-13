type SearchProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Array<string>;
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  suggestions,
}: SearchProps) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        value={searchTerm}
        onChange={onSearchInput}
        list="suggestions"
        autoComplete="off"
        autoFocus
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
