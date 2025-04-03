import { useEffect, useRef, useCallback } from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import { FiArrowDown } from 'react-icons/fi';

const HomePage = () => {
  // Create refs for intersection observer to avoid requerying DOM
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const hiddenElementsRef = useRef<HTMLElement[]>([]);

  // Memoized scroll function to avoid recreation on each render
  const scrollToSkills = useCallback(() => {
    if (skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Add scroll animations for elements with a more efficient implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Get all elements once and store them in ref
    const elements = document.querySelectorAll<HTMLElement>('.initial-hidden');
    hiddenElementsRef.current = Array.from(elements);
    
    // Observe all elements
    hiddenElementsRef.current.forEach((el) => observer.observe(el));

    return () => {
      if (hiddenElementsRef.current.length > 0) {
        hiddenElementsRef.current.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background is now handled by BackgroundImage component in App.tsx */}
      
      {/* Content with glass-morphism effect */}
      <div className="relative z-0">
        {/* Hero section with enhanced styling */}
        <div className="py-20 md:py-28 px-4 bg-fade-in">
          <Hero />
          
          {/* Custom scroll indicator to skills section - using optimized bounce */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={scrollToSkills}
              className="animate-optimal-bounce flex items-center justify-center p-2 rounded-full
                        bg-primary/10 hover:bg-primary/20 transition-all duration-300
                        border border-primary/30 text-primary"
              aria-label="Scroll to skills section"
            >
              <FiArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Skills section with glass-morphism card effect */}
        <div 
          ref={skillsSectionRef}
          id="skills" 
          className="initial-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/40 py-10 rounded-t-3xl shadow-lg"
        >
          <Skills />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 