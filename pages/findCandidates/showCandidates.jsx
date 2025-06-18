import React from 'react';
import CandidateCard from './candidateCard';

function ShowCandidates({candidates,save}) {
  return (
      <div className="p-6  min-h-screen">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate._id} candidate={candidate} save={save} />
      ))}
    </div>
  );
}

export default ShowCandidates;
