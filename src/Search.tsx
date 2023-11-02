interface SearchProps {
  search: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ search, onSearch }: SearchProps) => {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" value={search} type="text" onChange={onSearch} />
    </>
  );
};

export default Search;
