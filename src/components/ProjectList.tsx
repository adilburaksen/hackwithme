import React from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-6">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col sm:flex-row sm:gap-6 group">
          <div className="font-mono text-xs text-subtext w-24 shrink-0 pt-0.5 mb-1 sm:mb-0">
            {project.year} <span className="text-subtext opacity-50">/</span> {project.status.toLowerCase()}
          </div>
          <div className="flex flex-col">
            <a href={project.link} className="font-mono text-base text-text hover:text-hovercolor hover:underline decoration-1 underline-offset-4 decoration-subtext w-fit transition-colors">
              {project.name}
            </a>
            <p className="mt-2 text-sm text-subtext font-serif max-w-md leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;