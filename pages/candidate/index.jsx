import React from 'react'
import ProfileSection from '../../components/featured/candidate/candidateHome/ProfileSection'
import MiddleSection from '../../components/featured/candidate/candidateHome/middleSection'
function CandidateHome() {
  return (
    <div className='flex gap-4 customMargins py-6 min-w-[1200px]'>
      <div className='flex flex-col gap-4 max-w-[262px]'>
        <ProfileSection />
        <div className='min-w-[262px] rounded-[12px] bg-[#FFFFFF] h-[300px]'>

        </div>
      </div>
      <MiddleSection />
      <div className='w-[262px] flex flex-col gap-6'>
        <img src="/images/home/GenerativeAI.png" className="w-full" alt="Event Flyer" />
        <img src="/images/home/GenerativeAI.png" className="w-full" alt="Generative AI" />
      </div>
    </div>
  )
}

export default CandidateHome
