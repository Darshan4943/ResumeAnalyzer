import React from 'react'

function LastSection() {
  return (
    <div className="customMargins">
      <div class="flex w-full justify-center ">
        <div class=" rounded-[16px] bg-efficient-back flex w-full py-[24px] justify-center items-center">
          <p class="text-white font-montserrat text-[36px] font-semibold leading-normal text-center">
            <span class='text-yellow leading-[44px]'>Efficient Hiring</span> for Employers, <br />Enhanced Opportunities
            for Candidates
          </p>
        </div>
      </div>

      {/* bottom section start */}

      <div class='flex flex-row mt-[50px] w-full mb-[36px]'>
        <div class= 'w-[50%] flex flex-col gap-[36px] items-start'>
          <div class='w-[100%]'>
            <p class='text-light-black font-montserrat text-[20px] font-semibold leading-26'>Time and Resource Savings:</p>
            <span class='text-[16px]'>
              Save employers time and resources by handling the time-consuming
              tasks of sourcing, screening, and coordinating interviews,
              allowing employers to focus on their core business activities.
            </span>
          </div>

          <div class='w-[100%]'>
            <p class='text-light-black font-montserrat text-[20px] font-semibold leading-26'>Faster Hiring:</p>
            <span class='text-[16px]'>
              Expedite the hiring process by quickly identifying qualified
              candidates and efficiently coordinating interviews and offers,
              reducing time to fill for job openings.
            </span>
          </div>

          <div class='w-[100%]'>
            <p class='text-light-black font-montserrat text-[20px] font-semibold leading-26'>Continuous Improvement:</p>
            <span class='text-[16px]'>
              Collaboration allows for feedback and the opportunity to refine
              the hiring process over time, leading to ongoing improvements in
              recruitment and talent acquisition.
            </span>
          </div>

          <div class='w-[100%]'>
            <p class='text-light-black font-montserrat text-[20px] font-semibold leading-26'>Higher-Quality Matches:</p>
            <span class='text-[16px]'>
              Collaboration between recruiters and employers aims to match
              candidates with positions that align with their skills,
              experience, and career aspirations, leading to a better job fit.
            </span>
          </div>
        </div>

        <div class='flex justify-center items-center w-[50%] px-[20px] py-[10px]'>
          <img class='w-full flex content-center bg-no-repeat' src="./images/recruiter/clap_img.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default LastSection