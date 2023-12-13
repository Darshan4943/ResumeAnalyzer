import React, { useRef } from "react";
import ALink from "~/components/alink";

const CandidateAiPower = () => {
  const fileRef = useRef(null)
  const handleButtonClick = () => {
    fileRef.current.click()
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

  }
  return (
    <div className="flex justify-center items-center py-[50px] relative " >

      <div className="last_img_parent_head top-[100px]">
        <div className="lastfour_img_cont">
          <div className="last_img_contener1">
            <img
              src="./images/auth/employer/last1.png"
              alt=""
              className="last_img_1"
            />
          </div>
          <div className="last_img_contener2">
            <img
              src="./images/auth/employer/last2.png"
              alt=""
              className="last_img_2"
            />
          </div>
          <div className="last_img_contener3">
            <img
              src="./images/auth/employer/last3.png"
              alt=""
              className="last_img_3"
            />
          </div>
          <div className="last_img_contener4">
            <img
              src="./images/auth/employer/last4.png"
              alt=""
              className="last_img_4"
            />
          </div>
          <div className="last_img_contener5">
            <img
              src="./images/auth/employer/last5.png"
              alt=""
              className="five_img_div"
            />
          </div>
          <div className="last_img_contener6">
            <img
              src="./images/auth/employer/last6.png"
              alt=""
              className="six_img_div"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[36px] p-[24px] justify-center items-center rounded-[12px] w-[33%] shadow_of_box  z-50" style={{
        borderRadius: '12px',
        background: '#FFF',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
      }}>
        <div className="flex flex-col gap-4">
          <p class="text-center font-semibold text-black-600 text-3xl">
            Ai Powered profile creation
          </p>
          <p class=" text-center font-medium text-lg not-italic	">
            Easy process to create your profile
          </p>
          <div className="flex flex-col gap-2">
            <p class="text-center font-medium text-sm	not-italic">
              1.Upload your CV/Resume.
            </p>
            <p class="text-center font-medium	text-sm	not-italic	">
              2.Let system scan it and make your profile almost ready.
            </p>
          </div>
        </div>
        <div class="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] px-[42px] py-[24px] items-center gap-[8px]">
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
            <p class="flex text-center justify-center  text-[14px] text-[#515B6F]">
              drag and drop or <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileChange} /><p onClick={handleButtonClick} class="text-[#06A9EF]" >&nbsp;Browse file </p>&nbsp;to upload
            </p>
            <p class="text-center text-[12px] font-normal text-[#7C8493]">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
          </div>
        </div>
        <div class="flex flex-row gap-[24px]">
          <ALink href="/Auth/Candidate_register">
            <button className="px-9 py-3 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]">Skip</button>
          </ALink>
          <ALink href="/Auth/Candidate_register">
            <button className="px-9 py-3 bg-[#06A9EF] border rounded-[12px] font-semibold text-white ">Continue</button>
          </ALink>


  
        </div>
      </div>
    </div>
  );
};

export default CandidateAiPower;
