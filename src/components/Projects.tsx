import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiCode, FiVideo, FiCamera, FiEdit, FiYoutube, FiRefreshCw } from 'react-icons/fi';
import useGitHubProjects, { Project } from '../hooks/useGitHubProjects';

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="card overflow-hidden flex flex-col h-full">
    <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover"
        loading="lazy"
        width="600"
        height="400"
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

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-secondary"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-8">
    <p>{message}</p>
    <p className="mt-2">Showing sample projects instead.</p>
  </div>
);

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  // GitHub username - you can replace this with your own
  const githubUsername = 'WilsonRIP';
  
  // Use our custom hook for GitHub projects
  const { 
    projects, 
    error, 
    isLoading, 
    isValidating, 
    lastUpdated, 
    refresh 
  } = useGitHubProjects({
    username: githubUsername,
    refreshInterval: 5 * 60 * 1000, // 5 minutes
  });

  // Filter categories
  const filters = [
    { type: 'All', icon: FiCode },
    { type: 'Development', icon: FiCode },
    { type: 'Video Editing', icon: FiVideo },
    { type: 'Photography', icon: FiCamera },
    { type: 'Photoshop', icon: FiEdit },
    { type: 'Streaming/YouTube', icon: FiYoutube }
  ];

  // Update filtered projects when active filter changes
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

  // Format the last updated time
  const formatLastUpdated = (date: Date | null) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  return (
    <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/30">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-8">
          {/* Filter buttons - wrapped in a div */}
          <div className="flex flex-wrap justify-center gap-3 mb-4 md:mb-0">
            {filters.map((filter) => (
              <FilterButton
                key={filter.type}
                active={activeFilter === filter.type}
                type={filter.type}
                icon={filter.icon}
                onClick={() => handleFilterClick(filter.type)}
              />
            ))}
          </div>
          
          {/* Refresh and last updated info */}
          <div className="flex flex-col items-end">
            <button 
              onClick={refresh}
              disabled={isValidating}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Refresh projects"
            >
              <FiRefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
              <span>{isValidating ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Last updated: {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <ErrorMessage message={error.message || 'Error fetching projects'} />
        )}
        
        {/* Loading state */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          /* Projects grid with virtualization for better performance */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        
        {/* No projects message */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No projects found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 