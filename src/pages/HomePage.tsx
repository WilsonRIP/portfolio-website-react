import { useEffect } from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import backgroundImage from '../assets/background.png';
import { FiArrowDown } from 'react-icons/fi';

const HomePage = () => {
  // Add scroll animations for elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.initial-hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image with overlay for better text contrast */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <img 
          src={backgroundImage} 
          alt="Dark textured background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content with glass-morphism effect */}
      <div className="relative z-0">
        {/* Hero section with enhanced styling */}
        <div className="py-20 md:py-28 px-4">
          <Hero />
          
          {/* Custom scroll indicator to skills section */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={scrollToSkills}
              className="animate-bounce flex items-center justify-center p-2 rounded-full
                        bg-primary/10 hover:bg-primary/20 transition-all duration-300
                        border border-primary/30 text-primary"
              aria-label="Scroll to skills section"
            >
              <FiArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Skills section with glass-morphism card effect */}
        <div className="initial-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/40 py-10 rounded-t-3xl shadow-lg">
          <Skills />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 