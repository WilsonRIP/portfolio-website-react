import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { ThemeContext } from './ThemeProvider';
import homeIcon from '../assets/home.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  
  // Add scroll detection for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`py-2 px-4 md:px-6 shadow-sm transition-all duration-300 bg-white/90 backdrop-blur-sm dark:bg-gray-800/80 dark:backdrop-blur-sm ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with gradient effect */}
        <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient">WilsonIIRIP</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-3">
            <li>
              <Link 
                to="/" 
                className={`transition-all duration-300 flex items-center ${isActive('/') ? 'scale-110' : 'hover:scale-110'}`}
                aria-label="Home"
              >
                <img 
                  src={homeIcon} 
                  alt="Home" 
                  className="w-6 h-6 filter drop-shadow-md transition-transform hover:drop-shadow-lg" 
                />
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`transition-all duration-300 hover:text-shadow-glow ${isActive('/about') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className={`transition-all duration-300 hover:text-shadow-glow ${isActive('/projects') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`transition-all duration-300 hover:text-shadow-glow ${isActive('/contact') ? 'text-primary font-semibold' : 'hover:text-primary'}`}
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
            {theme === 'dark' ? 
              <FiSun className="w-5 h-5 text-yellow-300 animate-fade-in" /> : 
              <FiMoon className="w-5 h-5 text-indigo-500 animate-fade-in" />
            }
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
        <div className="md:hidden absolute left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md z-10 py-4 px-4 animate-fade-in">
          <nav>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 transition-colors flex items-center ${isActive('/') ? 'scale-105' : ''}`}
                  onClick={toggleMenu}
                >
                  <img src={homeIcon} alt="Home" className="w-6 h-6 mr-2" /> 
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block py-2 transition-colors ${isActive('/about') ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold' : 'hover:text-primary'}`}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className={`block py-2 transition-colors ${isActive('/projects') ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold' : 'hover:text-primary'}`}
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`block py-2 transition-colors ${isActive('/contact') ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold' : 'hover:text-primary'}`}
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