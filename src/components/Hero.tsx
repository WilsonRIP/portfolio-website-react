import { FiArrowDown } from 'react-icons/fi';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hey, I'm <span className="text-primary">WilsonIIRIP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Full Stack Developer, Photographer, Video Editor, Photo Editor, Streamer, YouTuber
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="#contact" 
            className="btn btn-primary"
          >
            Contact Me
          </a>
          
          <a 
            href="#projects" 
            className="btn btn-secondary"
          >
            View My Work
          </a>
        </div>
        
        <button 
          onClick={scrollToAbout} 
          className="mx-auto flex items-center justify-center w-12 h-12 rounded-full 
                    border-2 border-gray-300 dark:border-gray-600 hover:border-primary 
                    dark:hover:border-primary animate-float transition-colors"
          aria-label="Scroll to about section"
        >
          <FiArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero; 