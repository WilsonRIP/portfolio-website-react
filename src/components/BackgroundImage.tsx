import { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Use higher priority loading for home page
  useEffect(() => {
    // Load a tiny placeholder first for better perceived performance
    const lowQualityImg = new Image();
    // Use a tiny compressed placeholder version of the background (could be created separately in production)
    lowQualityImg.src = '/src/assets/background-tiny.png';
    
    lowQualityImg.onload = () => {
      setLowQualityLoaded(true);
    };
    
    // Then load the full quality image
    const img = new Image();
    img.src = '/src/assets/background.png';
    
    // When the image is loaded, update state
    img.onload = () => {
      setImageLoaded(true);
    };
    
    // Set priority for the image depending on the page
    if (isHomePage) {
      img.fetchPriority = 'high';
    } else {
      img.fetchPriority = 'low';
    }
    
    return () => {
      img.onload = null;
      lowQualityImg.onload = null;
    };
  }, [isHomePage]);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Lightweight placeholder gradient while image loads */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-600 transition-opacity duration-1000 ${
          lowQualityLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Low quality placeholder image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          lowQualityLoaded && !imageLoaded ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{ 
          backgroundImage: lowQualityLoaded ? 'url(/src/assets/background-tiny.png)' : 'none',
          backgroundSize: 'cover',
          filter: 'blur(10px)'
        }}
      />
      
      {/* Actual background image that loads progressively */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          imageLoaded ? 'opacity-20 dark:opacity-10' : 'opacity-0'
        }`} 
        style={{ 
          backgroundImage: imageLoaded ? 'url(/src/assets/background.png)' : 'none',
          backgroundSize: 'cover'
        }}
      />
    </div>
  );
};

export default memo(BackgroundImage); 