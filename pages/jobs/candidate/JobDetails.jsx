import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
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

  const [similarJobsVisible, setSimilarJobsVisible] = useState(false);
  const similarJobsRef = useRef(null);

  useEffect(() => {
    if (similarJobsRef.current) {
      const offset = 60;
      const elementPosition = similarJobsRef.current.offsetTop;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  }, [similarJobsVisible]);


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
  }, []);


  return (
    <>  {!loading ?


      <div className='customMargins py-6 flex gap-5'>

        <div className='flex flex-col gap-4 ml:max-w-[700px] w-full'>
          <Job_card jobData={jobData} getData={getData} setSaved={setSaved} save={save} setSimilarJobsVisible={setSimilarJobsVisible} similarJobsVisible={similarJobsVisible} />
          <Description

            selectedJob={jobData[0]}
            setLimitPopup={setLimitPopup}
          />
          <div ref={similarJobsRef}>
            <SimilarJobs />

          </div>

        </div>
        <div className='w-[400px]  hidden ml:flex flex-col px-2 pt-3 bg-[#FFFFFF] rounded-[16px] gap-1 h-fit'>

          <RelevantJobs />

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
