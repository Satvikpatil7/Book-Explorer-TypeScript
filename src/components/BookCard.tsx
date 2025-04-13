import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      description?: string;
      imageLinks?: {
        thumbnail: string;
      };
    };
  };
}

const BookCard: React.FC<BookCardProps> = React.memo(({ book }) => { 
  const { title, authors, description, imageLinks } = book.volumeInfo;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
      <img
        src={imageLinks?.thumbnail || 'https://via.placeholder.com/128x195?text=No+Image'}
        alt={title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x195?text=No+Image';
        }}
        className="w-full h-52 object-cover mb-4 rounded-lg"
      />

      <div>
        <h3 className="text-lg font-semibold text-[#606c38] line-clamp-1">{title}</h3> {/* Updated text color */}
        {authors && (
          <p className="text-sm text-[#283618] line-clamp-1">
            {authors.join(', ')}
          </p>
        )}
        {description && (
          <p className="text-sm mt-2 text-[#283618] line-clamp-3">
            {description}
          </p>
        )}
      </div>

      <Link
        to={`/book/${book.id}`}
        className="mt-4 inline-block text-[#606c38] hover:underline text-sm font-medium"
      >
        View Details →
      </Link>
    </div>
  );
});

export default BookCard;
