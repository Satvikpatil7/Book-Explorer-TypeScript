import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#ccd5ae] shadow-md px-6 py-4"> {/* Updated background to match your theme */}
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold text-[#606c38]">Book Explorer</h1> {/* Updated text color */}
        <ul className="flex gap-6 text-[#283618] font-medium"> {/* Updated text color */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-[#606c38] underline' : 'hover:text-[#606c38]' // Updated color to match theme
              }
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? 'text-[#606c38] underline' : 'hover:text-[#606c38]' // Updated color to match theme
              }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
