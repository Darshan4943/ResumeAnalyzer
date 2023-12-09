import React from 'react'
import Challenge from '~/components/featured/candidate/beforeLogin/Challenge'
import CandidateHero from '~/components/featured/candidate/beforeLogin/HeroSection'

import Interview from '~/components/featured/candidate/beforeLogin/Interview'
import Candidate_animation from '~/components/featured/candidate/beforeLogin/animation'


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
