import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

// Project interface
export interface Project {
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

// Hook options interface
interface UseGitHubProjectsOptions {
  username: string;
  refreshInterval?: number;
  dedupingInterval?: number;
}

/**
 * Custom hook for fetching GitHub projects with SWR
 */
export function useGitHubProjects(options: UseGitHubProjectsOptions) {
  const { 
    username, 
    refreshInterval = 5 * 60 * 1000, // 5 minutes default
    dedupingInterval = 60 * 1000 // 1 minute default
  } = options;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Basic fetcher for JSON
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    return response.json();
  };

  // Custom fetcher for GitHub topics with preview header
  const topicsFetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch topics: ${response.status} ${response.statusText}`);
    }
    return response.json();
  };

  // SWR hook for fetching repositories
  const { 
    data: repoData, 
    error: repoError, 
    isLoading, 
    isValidating,
    mutate: refreshRepos
  } = useSWR(
    `https://api.github.com/users/${username}/repos`,
    fetcher,
    {
      refreshInterval,
      dedupingInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: () => {
        setLastUpdated(new Date());
      }
    }
  );

  // Create a custom SWR key for topics
  const getTopicsKey = (repoName: string) => `https://api.github.com/repos/${username}/${repoName}/topics`;

  // Update projects when repository data changes
  useEffect(() => {
    if (!repoData) return;

    // Transform GitHub repository data to Project interface
    const initialProjects = repoData.map((repo: GitHubRepo) => {
      const fallbackProjectType = 'Development';
      
      return {
        id: repo.id,
        title: repo.name,
        description: repo.description || 'No description provided',
        image: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        tags: [], // Will be populated by the next effect
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        type: fallbackProjectType // Will be updated based on topics
      };
    });

    setProjects(initialProjects);
  }, [repoData, username]);

  // Fetch topics for each repository
  useEffect(() => {
    if (!projects.length) return;

    // Process projects in batches to avoid rate limiting
    const processProjectsWithTopics = async () => {
      const batchSize = 5;
      const updatedProjects = [...projects];
      
      for (let i = 0; i < projects.length; i += batchSize) {
        const batch = projects.slice(i, i + batchSize);
        const batchPromises = batch.map(async (project: Project, index: number) => {
          try {
            // Extract repo name from GitHub URL
            const repoName = project.githubUrl.split('/').pop();
            if (!repoName) return;

            // Fetch topics directly with topicsFetcher, but use mutate so future calls will use SWR
            const topicsUrl = getTopicsKey(repoName);
            const topicsData = await topicsFetcher(topicsUrl);
            
            // Add to SWR cache so future calls will be cached
            mutate(topicsUrl, topicsData, false);

            const topics = topicsData.names || [];
            let projectType = 'Development'; // Default type
            
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

            // Update project in the batch
            updatedProjects[i + index] = {
              ...project,
              tags: topics,
              type: projectType
            };
          } catch (error) {
            console.error(`Error fetching topics for ${project.title}:`, error);
          }
        });
        
        await Promise.all(batchPromises);
        
        // Add a small delay between batches to avoid rate limiting
        if (i + batchSize < projects.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Update all projects at once
      setProjects(updatedProjects);
    };

    processProjectsWithTopics();
  }, [projects.length, username]);

  // Manual refresh function
  const refresh = () => {
    refreshRepos();
  };

  return {
    projects,
    error: repoError,
    isLoading,
    isValidating,
    lastUpdated,
    refresh
  };
}

export default useGitHubProjects; 