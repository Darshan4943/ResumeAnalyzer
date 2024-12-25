import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Job_card from '../../../components/featured/candidate/jobs/JobCard';
import Description from '../../../components/featured/candidate/jobs/Description';
import MiniLoader from '../../../components/common/miniLoader';
import { useSelector } from 'react-redux';
import JobsForYou from '../../../components/featured/candidate/jobs/JobsForYou';
import RelevantJobs from '../../../components/featured/candidate/jobs/RelevantJobs';
import SimilarJobs from '../../../components/featured/candidate/jobs/SimilarJobs';

function JobDetails() {
  const [jobData, setJobData] = useState([]);
  const router = useRouter();
  const [limitPopup, setLimitPopup] = useState(false);
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const { profileData } = useSelector((state) => state.profile.profileData);
   const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [save, setSaved] = useState(false)
 

  const getData = () => {
    axios
      .get(`http://localhost:2000/api/job/${id}/user/${userDataGlobal?._id}`)
      .then((res) => {

        setJobData([res.data]);
        setTimeout(() => {
          setLoading(false)
        }, 500);

      })
      .catch((err) => {
        console.error(err)
        setTimeout(() => {
          setLoading(false)
        }, 500);


      })
  }


  useEffect(() => {

    getData()
  }, [save]);




  return (
    <>  {!loading ?


      <div className='customMargins py-6 flex gap-5'>

        <div className='flex flex-col gap-4 ml:max-w-[700px] w-full'>
          <Job_card jobData={jobData} setSaved={setSaved} save={save} />
          <Description

            selectedJob={jobData[0]}
            setLimitPopup={setLimitPopup}
          />
          <SimilarJobs/>
        </div>
        <div className='w-[400px]  hidden ml:flex flex-col px-2 pt-3 bg-[#FFFFFF] rounded-[16px] gap-1 h-fit'>
         
           <RelevantJobs/>
       
        </div>

      </div>
      :
      <div className=" h-[70vh] ">
        <MiniLoader />
      </div>
    }
    </>
  )
}

export default JobDetails
