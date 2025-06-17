import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [actor, setActor] = useState('');

  const handleSearch = () => {
    onSearch(search, genre, actor);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title"
        className="flex-1 p-2 border rounded-md"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Filter by genre"
        className="flex-1 p-2 border rounded-md"
      />
      <input
        type="text"
        value={actor}
        onChange={(e) => setActor(e.target.value)}
        placeholder="Filter by actor"
        className="flex-1 p-2 border rounded-md"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;