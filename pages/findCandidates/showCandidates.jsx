import React from 'react';
import CandidateCard from './candidateCard';
import CustomPagination from '../../components/common/CustomPagination';

function ShowCandidates({ setLimitPopup,candidates, save, setMiniloading,
  miniLoading,
  setSelectedCandidates,
  selectedCandidates,
  setLimit,
  limit,
  totalPages,
  page,
  setPage,
  allSave,
  totalCount,
  data,
  setExpandedUser,
  expandedUser,
  preferences,jobId,
  jobData

}) {


  return (
    <div className="  min-h-screen  w-full">
  
        
        {/* {totalCount > 10 && (
          <CustomPagination
            setMiniloading={setMiniloading}
            miniLoading={miniLoading}
            setPage={setPage}
            title={"Profiles"}
            setLimit={setLimit}
            defaultLimit={10}
            totalPages={totalPages}
            limit={limit}
            page={page}
          />
        )} */}
  
      <div className='flex flex-col gap-6'>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} save={save} data={data}
            setSelectedCandidates={setSelectedCandidates}
            selectedCandidates={selectedCandidates} allSave={allSave}
            expandedUser={expandedUser}
            setExpandedUser={setExpandedUser} 
            jobId={jobId} preferences={preferences}
            jobData={jobData}
            setLimitPopup={setLimitPopup}
            />
        ))}
      </div>
      {totalCount > 10 && (
        <CustomPagination
          setMiniloading={setMiniloading}
          miniLoading={miniLoading}
          setPage={setPage}
          title={"Candidates"}
          setLimit={setLimit}
          defaultLimit={10}
          totalPages={totalPages}
          limit={limit}
          page={page}
        />
      )}
    </div>
  );
}

export default ShowCandidates;
