import { memo, useEffect, useRef } from 'react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    
    // Add animation class after component mounts
    setTimeout(() => {
      title.classList.add('animate-text-reveal');
    }, 300);
  }, []);

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 opacity-0 transform transition-all duration-1000 tracking-tight"
        >
          Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient">WilsonIIRIP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-shadow-subtle animate-fade-in-up font-light">
          Full Stack Developer, Photographer, Video Editor, Photo Editor, Streamer, YouTuber
        </p>
      </div>
    </section>
  );
};

export default memo(Hero); 