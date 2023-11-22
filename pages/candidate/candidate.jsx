import React from 'react'
import Challenge from '~/components/featured/candidate/Challenge'
import CandidateHero from '~/components/featured/candidate/HeroSection'

import Interview from '~/components/featured/candidate/Interview'
import Candidate_animation from '~/components/featured/candidate/animation'


function Candidate() {
  return (
    <div>
    <CandidateHero/>
    <Candidate_animation/>
      <Interview/>
      <Challenge/>
      
    </div>
  )
}

export default Candidate
