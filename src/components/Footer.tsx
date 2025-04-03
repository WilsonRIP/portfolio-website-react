import { FiGithub, FiTwitter, FiInstagram, FiYoutube, FiTwitch } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 bg-gray-50 dark:bg-gray-800/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-xl font-bold text-primary">WilsonIIRIP</a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Full Stack Developer, Photographer, Video Editor
            </p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
            >
              <FiTwitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
            >
              <FiInstagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
            >
              <FiYoutube className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitch"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
            >
              <FiTwitch className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>© {currentYear} WilsonIIRIP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 