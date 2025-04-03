const Hero = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hey, I'm <span className="text-primary">WilsonIIRIP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Full Stack Developer, Photographer, Video Editor, Photo Editor, Streamer, YouTuber
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  );
};

export default Hero; 