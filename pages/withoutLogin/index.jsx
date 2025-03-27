import React from 'react'
import HeroSection from '../../components/featured/withoutLogin/HeroSection'
import JobCategories from '../../components/featured/withoutLogin/JobCategories'
import SkillAssessment from '../../components/featured/withoutLogin/SkillAssessment'
import ForCandidate from '../../components/featured/withoutLogin/ForCandidate'
import DreamJob from '../../components/featured/home/Dreamjob'
import TrustedBy from '../../components/featured/withoutLogin/TrustedBy'
import ResumeComp from '../../components/featured/withoutLogin/ResumeComp'
import Testimonials from '../../components/featured/withoutLogin/Testimonials'
import FrequentAskQue from '../../components/featured/withoutLogin/FrequentAskQue'
import SubscriptionPlans from '../../components/featured/home/SubscriptionPlans'

function WithoutLogin() {
  return (
    <div className=' flex flex-col ms:gap-[100px] gap-9 bg-[#FFFFFF]'>
      <HeroSection/>
      <JobCategories/>
      <SkillAssessment/>
      <ForCandidate/>
      <DreamJob/>
      {/* <TrustedBy/> */}
      <ResumeComp/>
      <Testimonials/>
 
      <FrequentAskQue/>

      
    </div>
  )
}

export default WithoutLogin
