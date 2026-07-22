import React from 'react';
import { PROJECTS, PROJECTS_CURATION_NOTE } from '../constants';
import PageIntro from './PageIntro';
import ExternalLink from './ExternalLink';
import Status from './Status';

const Projects: React.FC = () => {
  const count = String(PROJECTS.length).padStart(2, '0');
  return (
    <div className="anim-fade">
      <PageIntro
        command="ls /projects"
        title="Experiments"
        meta={`${count} record${PROJECTS.length === 1 ? '' : 's'}`}
      />

      <div className="border-t border-subtle">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="grid gap-3 border-b border-subtle py-7 sm:grid-cols-[130px_1fr] sm:gap-8"
          >
            <div className="font-mono text-xs text-muted">
              <div>{project.year}</div>
              <div className="mt-2">
                <Status>{project.status}</Status>
              </div>
            </div>
            <div className="max-w-reading">
              <ExternalLink
                href={project.link}
                className="font-mono text-[18px] text-primary [overflow-wrap:anywhere]"
                arrowClassName="text-signal opacity-70"
              >
                {project.name}
              </ExternalLink>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">{project.description}</p>
            </div>
          </article>
        ))}

        <p className="pt-7 text-[15px] italic leading-[1.6] text-muted opacity-70">
          {PROJECTS_CURATION_NOTE}
        </p>
      </div>
    </div>
  );
};

export default Projects;
