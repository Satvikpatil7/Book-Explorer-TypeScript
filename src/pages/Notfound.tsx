
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#ccd5ae]"> 
      <h1 className="text-5xl font-bold text-[#e9edc9] mb-4">404</h1> {/* Apply text color */}
      <p className="text-lg text-[#fefae0] mb-6"> {/* Apply text color */}
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-[#faedcd] text-[#d4a373] px-6 py-2 rounded-md hover:bg-[#ccd5ae] transition" 
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
