import { memo } from 'react';
import { FiCode, FiCamera, FiVideo, FiEdit2, FiTv } from 'react-icons/fi';

// Memoize SkillCard to prevent unnecessary re-renders
const SkillCard = memo(({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType 
}) => (
  <div className="card hover:scale-105 transition-all duration-300">
    <div className="mb-4 text-primary dark:text-secondary">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
));

// Skills data defined outside component to prevent recreation on each render
const skillsData = [
  {
    title: "Full Stack Development",
    description: "Building responsive and interactive web applications with modern technologies.",
    icon: FiCode
  },
  {
    title: "Photography",
    description: "Capturing moments and creating stunning visual content.",
    icon: FiCamera
  },
  {
    title: "Video Production",
    description: "Creating and editing high-quality video content for various platforms.",
    icon: FiVideo
  },
  {
    title: "Photo Editing",
    description: "Professional photo enhancement and creative manipulation.",
    icon: FiEdit2
  },
  {
    title: "Streaming & Content Creation",
    description: "Live streaming and creating engaging content for audiences.",
    icon: FiTv
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              description={skill.description}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Skills); 