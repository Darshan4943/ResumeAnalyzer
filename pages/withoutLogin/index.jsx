import React from 'react'
import HeroSection from '../../components/featured/withoutLogin/HeroSection'
import JobCategories from '../../components/featured/withoutLogin/JobCategories'
import SkillAssessment from '../../components/featured/withoutLogin/SkillAssessment'

function WithoutLogin() {
  return (
    <div className=' flex flex-col gap-[100px] bg-[#FFFFFF]'>
      <HeroSection/>
      <JobCategories/>
      <SkillAssessment/>
      
    </div>
  )
}

export default WithoutLogin
