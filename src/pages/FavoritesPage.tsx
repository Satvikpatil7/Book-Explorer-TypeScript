import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../redux/BookSlice';
import BookCard from '../components/BookCard'; // Assuming you already have a BookCard component

interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  imageLinks: {
    thumbnail: string;
  };
  publisher: string;
  publishedDate: string;
}

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  // Type the selector's return value as an array of books
  const favorites = useSelector((state: { books: { favorites: Book[] } }) => state.books.favorites);

  // Handle removing a book from favorites
  const handleRemoveFavorite = (book: Book) => {
    dispatch(removeFavorite(book));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#FEFAE0]"> {/* Apply background color */}
      <h2 className="text-3xl font-bold mb-6 text-center text-[#606c38]">Your Favorite Books</h2> {/* Apply text color */}

      {/* Check if there are any favorites */}
      {favorites.length === 0 ? (
        <p className="text-center text-[#606c38]">You have no favorite books yet. Start adding some!</p> 
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map through the favorites list and display each book */}
          {favorites.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} />

              {/* Remove button always visible */}
              <button
                onClick={() => handleRemoveFavorite(book)}
                className="absolute top-2 right-2 bg-[#faedcd] text-[#d4a373] text-sm px-3 py-2 rounded-md hover:bg-[#ccd5ae] transition"
              >
                Remove
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default FavoritesPage;
