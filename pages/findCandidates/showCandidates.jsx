import React from 'react';
import CandidateCard from './candidateCard';
import CustomPagination from '../../components/common/CustomPagination';

function ShowCandidates({ candidates, save, setMiniloading,
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
  expandedUser

}) {


  return (
    <div className="  min-h-screen mt-[-16px] w-full">
      <div className='flex gap-4 justify-between items-center'>
        {/* <div className='flex gap-4 items-center'>
          <button
            disabled={selectedCandidates.length < 1}
            onClick={() => allSave()}
            className={`p-2 rounded-full ${selectedCandidates.length > 0 && "hover:bg-[#E9EEF6] hover:fill-black transition-colors cursor-pointer h-[40px] w-[40px]"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className={`fill-[#8993a4] ${selectedCandidates.length > 0 && "hover:fill-black"}`}
            >
              <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
          </button>
        </div> */}
        {totalCount > 10 && (
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
        )}
      </div>
      <div className='flex flex-col gap-6'>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} save={save} data={data}
            setSelectedCandidates={setSelectedCandidates}
            selectedCandidates={selectedCandidates} allSave={allSave}
            expandedUser={expandedUser}
            setExpandedUser={setExpandedUser} />
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
