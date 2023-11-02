type SearchProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: SearchProps) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        value={searchTerm}
        onChange={onSearchInput}
        autoFocus
      />
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
