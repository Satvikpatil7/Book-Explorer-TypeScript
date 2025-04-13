import React, { useState, useCallback } from 'react';

// Define the type for the onSearch prop
interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = React.memo(({ onSearch }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Memoized handleSubmit function
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!title && !author && !genre) {
        setError('Please fill at least one search field.');
        return;
      }

      setError('');

      let query = '';
      if (title) query += `intitle:${title}+`;
      if (author) query += `inauthor:${author}+`;
      if (genre) query += `${genre}`;

      onSearch(query.trim().replace(/\s+/g, '+')); // Pass the query to onSearch
    },
    [author, genre, onSearch, title]
  );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div>
        <label className="block mb-1 text-sm font-medium text-[#283618]">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="e.g., Harry Potter"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-[#283618]">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="e.g., J.K. Rowling"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-[#283618]">Genre / Keyword</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="e.g., fantasy"
        />
      </div>

      {error && <p className="text-red-500 text-sm col-span-full">{error}</p>}

      <button
        type="submit"
        className="mt-2 bg-[#d4a373] hover:bg-[#ccd5ae] text-white px-4 py-2 rounded col-span-full md:col-span-1"
      >
        Search
      </button>
    </form>
  );
});

export default SearchForm;
