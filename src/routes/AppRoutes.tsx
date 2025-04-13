
import { Routes, Route } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import BookDetails from '../pages/BookDetails';
import FavoritesPage from '../pages/FavoritesPage';
import NotFound from '../pages/Notfound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
