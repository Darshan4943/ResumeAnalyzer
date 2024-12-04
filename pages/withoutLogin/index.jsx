import React from 'react'
import HeroSection from '../../components/featured/withoutLogin/HeroSection'
import JobCategories from '../../components/featured/withoutLogin/JobCategories'
import SkillAssessment from '../../components/featured/withoutLogin/SkillAssessment'
import ForCandidate from '../../components/featured/withoutLogin/ForCandidate'
import DreamJob from '../../components/featured/home/Dreamjob'

function WithoutLogin() {
  return (
    <div className=' flex flex-col gap-[100px] bg-[#FFFFFF]'>
      <HeroSection/>
      <JobCategories/>
      <SkillAssessment/>
      <ForCandidate/>
      <DreamJob/>
      
    </div>
  )
}

export default WithoutLogin
