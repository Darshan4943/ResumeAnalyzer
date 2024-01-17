import React, { useRef } from 'react'

function CreateNewJob() {
  const fileRef = useRef(null)
  const handleButtonClick = () => {
    fileRef.current.click()
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

  }
  return (
    <div className="flex flex-row gap-[20px] max-h-[75vh] ">
      <div className=" w-[32.26%]  flex flex-col gap-4 rounded-[16px] py-2 bg-white" style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
        <div className="overflow-y-auto px-4 py-2 flex flex-col gap-4 " >
          <p className=" w-[full] text-[24px] font-[500] ">
            Create New Requisition
          </p>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Company Logo
            </p>
            <p className=" w-[full] text-[14px] font-[400] ">
              This image will be shown publicly as company logo.
            </p>
          </div>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="88" viewBox="0 0 74 88" fill="none">
              <g clip-path="url(#clip0_5399_62242)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 22.2406V64.9079L37.1482 86.9425L37.9988 85.5727L37.1482 44.1626L1.76009 22.2659L0.5 22.2406Z" fill="#449B82" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M73.4002 22.0402V65.3086L37.1484 86.9427V44.1627L72.0724 22.0728L73.4002 22.0402Z" fill="#9BDB9C" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M36.95 0.805969L73.4 22.0395L37.1482 44.8758L0.5 22.2399L36.95 0.805969Z" fill="#56CDAD" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M55.2566 17.8223L42.9285 25.1194V39.8477L30.5765 32.4308L18.6992 39.4613V70.2453L31.0273 62.6004V46.0301L44.1946 54.4355L55.2566 47.5758V17.8223Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_5399_62242">
                  <rect width="72.9" height="86.4" fill="white" transform="translate(0.5 0.799988)" />
                </clipPath>
              </defs>
            </svg>
            <div class="border-dashed border-[2px] border-[#06A9EF] flex flex-col w-full rounded-[12px] px-[42px] py-[24px] items-center gap-[8px]">
              <div className="  flex  flex-col  items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" onClick={handleButtonClick} >
                  <g clip-path="url(#clip0_4121_52475)">
                    <path d="M25 13.3333H25.0167" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_4121_52475">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="flex flex-col gap-[4px]	font-normal	">
                <p class="flex text-center justify-center  text-[14px] font-[400] text-[#515B6F]">
                  <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileChange} /><p onClick={handleButtonClick} class="text-[#06A9EF]" >&nbsp;Click to replace  </p>&nbsp;or drag and drop
                </p>
                <p class="text-center text-[14px] font-[400] text-[#7C8493]">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 '>
            <p className=" w-[full] text-[14px] font-[500] ">
              Theme Color
            </p>
            <div className='flex gap-4 p-2 border border-[#646464] rounded-[6px] w-[43%] justify-between'>
              <div className='h-[40px] w-[40px] rounded-[6px] bg-[#06A9EF]'></div>
              <div className='p-2 rounded-[6px] border border-[#646464] text-[16px] font-medium' > #06A9EF</div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Company Name
            </p>
            <input
              type="text"
              placeholder="Enter Company name"
              className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Location
            </p>
            <select
              className=" px-[16px] py-[8px]  border-[1px] border-solid border-[#646464] text-[14px]  font-[400] rounded-[6px]"
            >
              <option value="" disabled selected className="">Select </option>
              <option value="product_manager">Pune</option>
              <option value="developer">Mumbai</option>

            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              About Company
            </p>
            <p className=" w-[full] text-[14px] font-[400] ">
              Brief description for your company. URLs are hyperlinked.
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Description
            </p>
            <textarea
              className="h-[148px] border-[1px] border-solid border-[#646464] px-[16px] py-[8px] rounded-[6px] placeholder:text-[14px]  font-[400]"
              placeholder="Provide your comment"
            ></textarea>
            <p className=" w-[full] text-[14px] font-[400] ">
              Maximum 500 characters
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <button className="   border-[1px] border-solid border-[#06A9EF] text-[16px] font-medium px-9 py-3 rounded-[12px] max-scr1100:px-6 ">Reset</button>
            <button className="  text-[#fff] text-[16px] font-semibold px-9 py-3 max-scr1100:px-6  bg-[#06A9EF] rounded-[12px]">Save</button>
          </div>

        </div>


      </div>



      <div className=" w-[66.17%]  flex flex-col gap-4 rounded-[16px] py-2 bg-white" style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
        <div className="overflow-y-auto px-4 py-2 flex flex-col gap-4 " >
          <p className=" w-[full] text-[24px] font-[500] ">
            Post a Job
          </p>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Job Title
            </p>
            <input
              type="text"
              placeholder="Add job title / role"
              className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Tags
            </p>
            <input
              type="text"
              placeholder="Job keyword, tags etc"
              className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[14px] font-[500] ">
              Job Description
            </p>
            <input
              type="text"
              placeholder="Job keyword, tags etc"
              className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[24px] font-[500] ">
              Salary
            </p>
            <div className='flex  w-full justify-between'>
              <div className='flex flex-col gap-2 w-[31%] ' >
                <p className="  text-[14px] font-[500] ">
                 salary Type
                </p>
                <select
                  className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
                >
                  <option value="" disabled selected className="">Select </option>
                  <option value="product_manager">Annually</option>
                  <option value="developer">Monthly</option>

                </select>
              </div>
              <div className='flex flex-col gap-2 w-[31%]'>
                <p className="  text-[14px] font-[500] ">
                Min Salary
                </p>
                <input
                  type="text"
                  placeholder="Min Salary"
                  className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                />

              </div>
              <div className='flex flex-col gap-2 w-[31%] '>
              
                  <p className="  text-[14px] font-[500] ">
                    Max Salary
                  </p>
                  <input
                  type="text"
                  placeholder="Min Salary"
                  className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px] font-[400]"
                />

              </div>

            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className=" w-[full] text-[24px] font-[500] ">
              Job Information
            </p>
            <div className='flex gap-[20px] w-full justify-between'>
              <div className='flex flex-col gap-2 w-[32.59%] ' >
                <p className="  text-[14px] font-[500] ">
                  Job Sector
                </p>
                <select
                  className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
                >
                  <option value="" disabled selected className="">Select </option>
                  <option value="product_manager">Accounting</option>
                  <option value="developer">Developer</option>

                </select>
              </div>
              <div className='flex flex-col gap-2 w-[32.59%]'>
                <p className="  text-[14px] font-[500] ">
                  Job Type
                </p>
                <select
                  className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
                >
                  <option value="" disabled selected className="">Select </option>
                  <option value="product_manager">Full time</option>
                  <option value="developer">Part Time</option>

                </select>
              </div>
              <div className='flex flex-col gap-2 w-[32.59%] '>
                <div className='flex flex-col gap-2'>
                  <p className="  text-[14px] font-[500] ">
                    Work From
                  </p>
                  <select
                    className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
                  >
                    <option value="" disabled selected className="">Select </option>
                    <option value="product_manager">Home</option>
                    <option value="developer">Office</option>

                  </select>
                </div>
              </div>

            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className="  text-[14px] font-[500] ">
              Required Skills
            </p>
            <input
              type="text"
              placeholder="Add Skills"
              className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
            />
          </div>
          <div className='flex gap-[20px] w-full'>
            <div className='flex flex-col gap-2 w-[49%]'>
              <p className="  text-[14px] font-[500] ">
                Application Deadline
              </p>
              <input
                type="text"
                placeholder="dd / mm / yyyy"
                className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
              />
            </div>
            <div className='flex flex-col gap-2 w-[49%]'>
              <p className="  text-[14px] font-[500] ">
                Job Sector
              </p>
              <select
                className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px]   h-[41.33px]"
              >
                <option value="" disabled selected className="">Select </option>
                <option value="product_manager">Accounting</option>
                <option value="developer">Developer</option>

              </select>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className="  text-[14px] font-[500] ">
              Key Skills
            </p>
            <input
              type="text"
              placeholder="Add Skills"
              className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewJob
