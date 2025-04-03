import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiCode, FiVideo, FiCamera, FiEdit, FiYoutube } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  type: string; // 'Development', 'Video Editing', 'Photography', 'Photoshop', 'Streaming/YouTube'
}

// GitHub repository interface
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  owner: {
    login: string;
  };
}

// GitHub topics interface
interface GitHubTopics {
  names: string[];
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

// Filter button component for project filtering
const FilterButton = ({ active, type, icon: Icon, onClick }: { active: boolean; type: string; icon: React.ElementType; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
      active 
        ? 'bg-primary text-white dark:bg-secondary' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{type}</span>
  </button>
);

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter categories
  const filters = [
    { type: 'All', icon: FiCode },
    { type: 'Development', icon: FiCode },
    { type: 'Video Editing', icon: FiVideo },
    { type: 'Photography', icon: FiCamera },
    { type: 'Photoshop', icon: FiEdit },
    { type: 'Streaming/YouTube', icon: FiYoutube }
  ];

  useEffect(() => {
    // Fetch GitHub repositories
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch from GitHub API - Replace 'username' with actual GitHub username
        const response = await fetch('https://api.github.com/users/WilsonRIP/repos');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub repositories: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json() as GitHubRepo[];
        
        // Check if there are any repositories
        if (data.length === 0) {
          throw new Error('No repositories found for this user');
        }
        
        // Map GitHub data to our Project interface
        // We'll use the topics as tags and to determine the project type
        const mappedProjects: Project[] = await Promise.all(
          data.map(async (repo: GitHubRepo) => {
            // Fetch topics (tags) for each repository
            const topicsResponse = await fetch(`https://api.github.com/repos/WilsonRIP/${repo.name}/topics`, {
              headers: {
                Accept: 'application/vnd.github.mercy-preview+json'
              }
            });
            
            let topics: string[] = [];
            let projectType = 'Development'; // Default type
            
            if (topicsResponse.ok) {
              const topicsData = await topicsResponse.json() as GitHubTopics;
              topics = topicsData.names || [];
              
              // Determine project type based on topics
              if (topics.includes('video-editing')) {
                projectType = 'Video Editing';
              } else if (topics.includes('photography')) {
                projectType = 'Photography';
              } else if (topics.includes('photoshop')) {
                projectType = 'Photoshop';
              } else if (topics.includes('streaming') || topics.includes('youtube')) {
                projectType = 'Streaming/YouTube';
              }
            }
            
            return {
              id: repo.id,
              title: repo.name,
              description: repo.description || 'No description provided',
              image: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
              tags: topics,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              type: projectType
            };
          })
        );
        
        setProjects(mappedProjects);
        setFilteredProjects(mappedProjects);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Error fetching projects: ${errorMessage}`);
        setLoading(false);
        console.error(err);
        
        // Fallback to sample projects if GitHub API fails
        const sampleProjects: Project[] = [
          {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio website built with React and Tailwind CSS.",
            image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
            tags: ["React", "TypeScript", "Tailwind CSS"],
            githubUrl: "https://github.com/WilsonRIP/portfolio",
            liveUrl: "https://yourportfolio.com",
            type: "Development"
          },
          {
            id: 2,
            title: "Video Editing Project",
            description: "A showcase of video editing skills and techniques.",
            image: "https://via.placeholder.com/600x400?text=Video+Editing",
            tags: ["Premiere Pro", "After Effects"],
            githubUrl: "https://github.com/WilsonRIP/video-portfolio",
            type: "Video Editing"
          },
          {
            id: 3,
            title: "Photography Portfolio",
            description: "A collection of photography work.",
            image: "https://via.placeholder.com/600x400?text=Photography",
            tags: ["Photography", "Lightroom"],
            githubUrl: "https://github.com/WilsonRIP/photo-portfolio",
            type: "Photography"
          }
        ];
        
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Filter projects when active filter changes
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.type === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);
  
  // Handle filter button click
  const handleFilterClick = (type: string) => {
    setActiveFilter(type);
  };

  return (
    <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/30">
      <div className="container mx-auto">
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <FilterButton
              key={filter.type}
              type={filter.type}
              icon={filter.icon}
              active={activeFilter === filter.type}
              onClick={() => handleFilterClick(filter.type)}
            />
          ))}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-secondary"></div>
          </div>
        ) : error ? (
          <div className="card p-6 text-center">
            <div className="mb-4 text-red-500 dark:text-red-400">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Could not load projects from GitHub</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <p className="text-gray-600 dark:text-gray-300">Showing sample projects instead</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">No projects found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 