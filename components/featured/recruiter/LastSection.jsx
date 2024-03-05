import React from 'react'

function LastSection() {
  return (
    <div className="customMargins">
      <div class="flex w-full justify-center ">
        <div class=" rounded-[16px] bg-[#024E6E] flex w-full py-[8px] ml:py-[24px] justify-center items-center">
          <p class="text-white font-montserrat text-[12px] ml:text-[36px] font-[600] ml:font-semibold leading-[24px] ml:leading-tight text-center">
            <span class='text-[#FFDA1D] leading-[24px] ml:leading-tight'>Efficient Hiring</span> for Employers, <br />Enhanced Opportunities
            for Candidates
          </p>
        </div>
      </div>

      {/* bottom section start */}

      <div class='flex_class flex flex-col-reverse  mt-[24px] sm:mt-[50px] items-center w-full mb-[36px]'>
        <div class= 'sm:w-[100%] w-[100%] flex flex-col sm:gap-[16px] gap-[16px] items-start'>
          <div class='w-[100%] gap-1'>
            <p class='text-light-black font-montserrat text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-tight'>Time and Resource Savings:</p>
            <span class='text-[14px] sm:text-[16px] leading-[20px] sm:leading-tight'>
              Save employers time and resources by handling the time-consuming
              tasks of sourcing, screening, and coordinating interviews,
              allowing employers to focus on their core business activities.
            </span>
          </div>

          <div class='w-[100%] gap-1'>
            <p class='text-light-black font-montserrat text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-tight'>Faster Hiring:</p>
            <span class='text-[14px] sm:text-[16px] leading-[20px] sm:leading-tight'>
              Expedite the hiring process by quickly identifying qualified
              candidates and efficiently coordinating interviews and offers,
              reducing time to fill for job openings.
            </span>
          </div>

          <div class='w-[100%]'>
            <p class='text-light-black font-montserrat text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-tight'>Continuous Improvement:</p>
            <span class='text-[14px] sm:text-[16px] leading-[20px] sm:leading-tight'>
              Collaboration allows for feedback and the opportunity to refine
              the hiring process over time, leading to ongoing improvements in
              recruitment and talent acquisition.
            </span>
          </div>

          <div class='w-[100%]'>
            <p class='text-light-black font-montserrat text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-tight'>Higher-Quality Matches:</p>
            <span class='text-[14px] sm:text-[16px] leading-[20px] sm:leading-tight'>
              Collaboration between recruiters and employers aims to match
              candidates with positions that align with their skills,
              experience, and career aspirations, leading to a better job fit.
            </span>
          </div>
        </div>

        <div class='flex justify-center items-center w-[100%] px-[20px] py-[10px]'>
          <img class='flex w-[60%] sm:w-[80%] md:w-[80%] ml:w-[90%] lg-w-[90%] content-center bg-no-repeat' src="/images/recruiter/clap_img.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default LastSection