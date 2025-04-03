const About = () => {
  return (
    <section id="about" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <p className="mb-4">
              I'm a passionate creator with a diverse skill set spanning development, photography, video production, and content creation. My journey into the digital world has allowed me to blend technical expertise with creative vision.
            </p>
            
            <p className="mb-4">
              As a Full Stack Developer, I build responsive and interactive web applications using modern technologies. My background in photography and video editing allows me to create compelling visual content that tells a story.
            </p>
            
            <p>
              When I'm not coding or editing, you can find me streaming on Twitch or creating content for my YouTube channel, where I share tutorials, gameplay, and creative projects with my community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 