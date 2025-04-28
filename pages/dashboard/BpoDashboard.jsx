
import React, { useState } from 'react';

import SkilotechCollection from './skilotechCollection';
import MyCollection from './MyCollection';
import JobApplicants from './jobApplicants';

function BpoDashboard() {

  const [option, setOption] = useState("skilotechCollection");


  return (
    <div className='flex flex-col gap-4'>
      <div className="bg-[#F9F9F9]  flex rounded-[30px] text-[14px] gap-4 font-semibold w-fit">
        <button
          className={`${option === "skilotechCollection"
            ? "bg-[#06A9EF] py-[8px] px-[28px] flex justify-center items-center rounded-[30px]  text-white w-fit"
            : "py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-fit "
            }`}
          onClick={() => setOption("skilotechCollection")}
        >
          Skilotech Collection
        </button>
        <button
          className={`${option === "myCollection"
            ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-fit text-white"
            : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-fit"
            }`}
          onClick={() => setOption("myCollection")}
        >
          My Collection
        </button>
        <button
          className={`${option === "jobApplicants"
            ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-fit text-white"
            : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-fit"
            }`}
          onClick={() => setOption("jobApplicants")}
        >
          Job Applicants
        </button>
      </div>
      {option === "skilotechCollection" &&
        <SkilotechCollection />

      }
      {option === "myCollection" &&
        <MyCollection />

      }
       {option === "jobApplicants" &&
        <JobApplicants />

      }
    </div>
  );
}

export default BpoDashboard;
