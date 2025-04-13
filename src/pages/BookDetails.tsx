import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholderImg from '../assets/placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/BookSlice';
import ShimmerDetails from '../components/ShimmerDetails'; 

// Define types for the book and its volume info
interface BookVolumeInfo {
  title: string;
  authors: string[];
  description: string;
  imageLinks?: {
    thumbnail: string;
  };
  publisher: string;
  publishedDate: string;
}

interface Book {
  id: string;
  volumeInfo: BookVolumeInfo;
}

const BookDetails: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // For confirmation modal

  // Fetch book details from the API
  const fetchBookDetails = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book details');
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError('Error loading book details');
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Access favorites from Redux store
  const favorites = useSelector((state: { books: { favorites: Book[] } }) => state.books.favorites);
  const isFavorite = book ? favorites.some((favorite) => favorite.id === book.id) : false;

  const handleToggleFavorite = () => {
    if (book) {
      if (isFavorite) {
        dispatch(removeFavorite(book)); // Remove from favorites
      } else {
        dispatch(addFavorite(book)); // Add to favorites
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle error and loading states
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!book) return <ShimmerDetails />; // Shimmer loading component

  const { title, authors, description, imageLinks, publisher, publishedDate } = book.volumeInfo;

  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="mb-6 inline-block text-[#606c38] hover:underline text-sm font-medium"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={imageLinks?.thumbnail || placeholderImg}
            alt={title}
            className="w-48 h-64 object-cover rounded-lg shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 text-[#606c38]">{title}</h1>
            {authors && <p className="text-[#a3b18a] mb-2">By {authors.join(', ')}</p>}
            {publisher && (
              <p className="text-sm text-[#a3b18a] mb-2">
                Published by {publisher} on {publishedDate}
              </p>
            )}
            {description && <div className="mt-4 text-[#a3b18a]">{description}</div>}

            <button
              onClick={handleToggleFavorite}
              className={`mt-4 text-white px-4 py-2 rounded-md ${
                isFavorite ? 'bg-[#a3b18a] hover:bg-[#606c38]' : 'bg-[#a3b18a] hover:bg-[#606c38]'
              }`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>

        {/* ✅ Modal for confirming add/remove action */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#ccd5ae] bg-opacity-75 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-lg font-bold mb-4 text-[#d4a373]">
                {isFavorite ? 'Removed from Favorites' : 'Added to Favorites'}
              </h2>
              <p className="mb-4 text-[#d4a373]">
                The book has been successfully {isFavorite ? 'removed from' : 'added to'} your favorites.
              </p>
              <button
                onClick={closeModal}
                className="bg-[#d4a373] text-white px-4 py-2 rounded-md hover:bg-[#fefae0]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default BookDetails;
