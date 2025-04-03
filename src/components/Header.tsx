import { useState, useContext } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { ThemeContext } from './ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error('Header must be used within a ThemeProvider');
  }
  
  const { theme, toggleTheme } = themeContext;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-4 md:px-6 shadow-sm bg-white dark:bg-gray-800/80 dark:backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-primary">WilsonIIRIP</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-primary transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
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
              <li><a href="#" className="block py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-primary transition-colors" onClick={toggleMenu}>About</a></li>
              <li><a href="#skills" className="block py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Skills</a></li>
              <li><a href="#projects" className="block py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Projects</a></li>
              <li><a href="#contact" className="block py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Contact</a></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 