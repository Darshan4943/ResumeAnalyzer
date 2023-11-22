import React from 'react'

function RecruiterHero() {
  return (
    
    <div className="min-h-[560px] bg-cover bg-no-repeat pt-[61px] overflow-hidden bg-recruiter_back">
      <div className="customMargins">
        <div className="expand_text">
          <p  class="text-white font-montserrat text-[86px] leading-[105px] font-bold">
            <span class="text-yellow">Expand</span> your <br />
            recruiting limits
          </p>
        </div>
        <div class='mt-[24px]'>
          <p   class="text-white font-montserrat text-[26px]  font-bold">
            Connect with a broad <span class='text-yellow'>spectrum of Employers</span>
          </p>
        </div>
        <div class='bg-white h-[1px] w-[55%] my-[12px]'></div>
        <div className="para">
          <p class="max-w-[55%] text-white text-justify font-montserrat text-base font-medium leading-normal">
            Your consulting firm can tap into a vast network of employers
            through our platform. We connect you with a diverse range of
            companies, offering an extensive talent pool and growth
            opportunities. Join us to expand your professional horizons and open
            doors to a multitude of career possibilities.
          </p>
        </div>
        <div className="get_started_button">
          <button class="mt-[13px] border-none rounded-2xl bg-yellow flex items-center px-[48px] py-[18px] font-bold">Get started</button>
        </div>
      </div>
      </div>
  )
}

export default RecruiterHero