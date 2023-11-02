interface SearchProps {
  searchTerm: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: () => void;
}

const Search = ({
  searchTerm,
  handleSearchInput,
  handleSearchSubmit,
}: SearchProps) => {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        value={searchTerm}
        onChange={handleSearchInput}
        autoFocus
      />
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>
    </>
  );
};

export default Search;
