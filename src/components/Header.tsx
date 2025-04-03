import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { ThemeContext } from './ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  const location = useLocation();
  
  if (!themeContext) {
    throw new Error('Header must be used within a ThemeProvider');
  }
  
  const { theme, toggleTheme } = themeContext;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="py-4 px-4 md:px-6 shadow-sm bg-white dark:bg-gray-800/80 dark:backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary">WilsonIIRIP</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`transition-colors ${isActive('/about') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className={`transition-colors ${isActive('/projects') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`transition-colors ${isActive('/contact') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10 py-4 px-4">
          <nav>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 transition-colors ${isActive('/') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block py-2 transition-colors ${isActive('/about') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className={`block py-2 transition-colors ${isActive('/projects') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`block py-2 transition-colors ${isActive('/contact') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 