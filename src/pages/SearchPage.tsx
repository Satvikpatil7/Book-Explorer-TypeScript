import { useState, useCallback, useRef, lazy, Suspense } from 'react';
import SearchForm from '../components/SearchForm';
import Shimmer from '../components/Shimmer';

const BookCard = lazy(() => import('../components/BookCard'));

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

const SearchPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasSearchedRef = useRef<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    hasSearchedRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Something went wrong. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto bg-[#fefae0] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#606c38]">
        Search Books
      </h2>

      <SearchForm onSearch={handleSearch} />

      {loading ? (
        <div className="mt-6">
          <Shimmer />
        </div>
      ) : error ? (
        <p className="text-center mt-6 text-[#bc6c25] font-semibold">{error}</p>
      ) : (
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length > 0 ? (
            <Suspense fallback={<Shimmer />}>
              {books.map((book) => (
                <BookCard key={book.id} book={book} /> // remove erro type error 
              ))}
            </Suspense>
          ) : hasSearchedRef.current ? (
            <p className="col-span-full text-center text-[#283618]">
              No books found. Try searching by title, author, or genre.
            </p>
          ) : null}
        </section>
      )}
    </main>
  );
};

export default SearchPage;
