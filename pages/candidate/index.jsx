import React from 'react'
import ProfileSection from '../../components/featured/candidate/candidateHome/ProfileSection'
import MiddleSection from '../../components/featured/candidate/candidateHome/middleSection'

function CandidateHome() {
  return (
    <div className='flex gap-4 customMargins pt-6'>
      <div className='flex flex-col gap-4 max-w-[262px]'>
        <ProfileSection />
        <div className='min-w-[262px] rounded-[12px] bg-[#FFFFFF] h-[300px]'>

        </div>
      </div>

      <MiddleSection />


    </div>
  )
}

export default CandidateHome
