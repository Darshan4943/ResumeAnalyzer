import React from 'react'
import ProfileSection from '../../components/featured/candidate/candidateHome/ProfileSection'
import MiddleSection from '../../components/featured/candidate/candidateHome/middleSection'
function CandidateHome() {
  return (
    <div className='flex flex-col ml:flex-row gap-4 customMargins py-6 scr1200:min-w-[1200px]'>
      <div className='flex flex-col gap-4 w-full ml:max-w-[262px]'>
        <ProfileSection />
        <div className='min-w-[262px] hidden ml:block rounded-[12px] bg-[#FFFFFF] h-[300px]'>
          <img src="/images/home/CandidatePoster3.png" className="w-full" alt="Generative AI" />
        </div>
      </div>
      <MiddleSection />
      <div className='w-[262px] hidden scr1200:flex flex-col gap-6'>
        <img src="/images/home/CandidatePoster1.png" className="w-full" alt="Event Flyer" />
        <img src="/images/home/CandidatePoster2.png" className="w-full" alt="Generative AI" />
      </div>
    </div>
  )
}
export default CandidateHome