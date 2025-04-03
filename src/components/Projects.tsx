import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="card overflow-hidden flex flex-col h-full">
    <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover"
      />
    </div>
    
    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
    
    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
      {project.tags.map((tag, index) => (
        <span 
          key={index} 
          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          {tag}
        </span>
      ))}
    </div>
    
    <div className="flex gap-3 mt-2">
      {project.githubUrl && (
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
          aria-label={`View ${project.title} code on GitHub`}
        >
          <FiGithub className="w-5 h-5" />
        </a>
      )}
      
      {project.liveUrl && (
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary transition-colors"
          aria-label={`View ${project.title} live demo`}
        >
          <FiExternalLink className="w-5 h-5" />
        </a>
      )}
    </div>
  </div>
);

const Projects = () => {
  // Sample projects - replace with your actual projects
  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website built with React and Tailwind CSS.",
      image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://yourportfolio.com"
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce application with user authentication and payment integration.",
      image: "https://via.placeholder.com/600x400?text=E-commerce+Platform",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/username/ecommerce",
      liveUrl: "https://yourecommerce.com"
    },
    {
      title: "Photography Portfolio",
      description: "A showcase of photography work with image gallery and filtering capabilities.",
      image: "https://via.placeholder.com/600x400?text=Photography+Portfolio",
      tags: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/username/photo-portfolio",
      liveUrl: "https://yourphotos.com"
    }
  ];

  return (
    <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 