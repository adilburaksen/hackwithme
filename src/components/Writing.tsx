import React from 'react';
import { RESEARCH_POSTS } from '../constants';
import PageIntro from './PageIntro';
import RecordList from './RecordList';

const Writing: React.FC = () => {
  const count = String(RESEARCH_POSTS.length).padStart(2, '0');
  return (
    <div className="anim-fade">
      <PageIntro
        command="ls /writing --sort date"
        title="Archive"
        meta={`${count} records · external → medium.com`}
      />
      <RecordList posts={RESEARCH_POSTS} variant="full" topBorder />
    </div>
  );
};

export default Writing;
