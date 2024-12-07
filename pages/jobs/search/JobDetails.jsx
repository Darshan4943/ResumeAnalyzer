import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Job_card from '../home/JobCard';
import Description from '../home/Description';

function JobDetails() {
  const [jobData, setJobData] = useState([]);
  const router = useRouter();
  const [limitPopup, setLimitPopup] = useState(false);
  const { id } = router.query;
  console.log(jobData)
  useEffect(() => {


    axios
      .get(`http://localhost:2000/api/job/getById/${id}`)
      .then((res) => {
        setJobData([res.data]);


      })
      .catch((err) => console.error(err));

  }, []);
  return (
    <div className='customMargins py-6 flex gap-5'>
      <div className='flex flex-col gap-4 max-w-[700px]'>
        <Job_card jobData={jobData} />
        <Description
          selectedJob={jobData[0]}
          setLimitPopup={setLimitPopup}
        />
      </div>
      <div className='w-[400px]'>

      </div>

    </div>
  )
}

export default JobDetails
