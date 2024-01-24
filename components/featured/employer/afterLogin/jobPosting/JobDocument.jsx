import { Delete_icon } from '@/utils/svg'
import React from 'react'

function JobDocument({setToggle}) {
  return (
    <div>
      <div
        className="rounded-[12px] p-[12px] flex flex-col justify-between ml:flex-row gap-[8px] mx-4 bg-[#fff]"
        style={{
          boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="text-[14px] ml:text-[20px] font-[500]">First Name</div>
        <div className="p-[12px] w-full ml:w-[80.76%] rounded-[12px] border-solid border-[0.5px] border-[#06A9EF] flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[12px]">
            <input
              type="text"
              name=""
              id=""
              className="py-[12px] px-[16px] rounded-[6px] border-[1px] border-solid border-[#646464] w-full"
            />
            <div className="w-[222px] py-[8px] px-[16px] flex justify-between gap-[8px] border-solid border-[1px] border-[#333] rounded-[6px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_7931_58508)">
                  <path
                    d="M4.5 14.75V13.25H13.5V14.75H4.5ZM4.5 10.75V9.25H19.5V10.75H4.5Z"
                    fill="#333333"
                  />
                </g>
              </svg>
              <select name="" id="" className="flex justify-between ">
                <option value="">Short Answer</option>
                <option value="">Long Answer</option>
                <option value="">Multiple choice</option>
                <option value="">Checkbox</option>
                <option value="">Dropdowns</option>
                <option value="">File Upload</option>
                <option value="">Date</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col ml:flex-row gap-[8px] w-full">
            <div className="flex flex-col gap-[8px] w-full">
              <div className="py-[12px] px-[16px] border-b  border-[#646464]">
                Short answer text
              </div>
              <div className="flex gap-[8px] py-[8px] px-[16px] items-center">
                <div className="flex gap-[8px]">Required </div>
                <Delete_icon />
              </div>
            </div>
            <div className="flex justify-end h-full ml:items-end">
              <button className="py-[12px] px-[24px] ml:px-[36px] rounded-[12px] border-solid border-[1px] border-[#06A9EF] bg-[#06A9EF] text-[#fff] text-[14px] font-[600]">
                save
              </button>
            </div>
          </div>
        </div>


      </div>

      <div className="flex justify-end text-[#333] text-[14px] font-[600] p-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g mask="url(#mask0_6622_123567)">
            <path
              d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z"
              fill="#333333"
            />
          </g>
        </svg>
        Add Section
      </div>

      <div className="flex flex-row bg-white p-4  gap-[4px] justify-between ">
        <button onClick={() => setToggle(0)} className="   border-[1px] border-solid border-[#06A9EF] text-[16px] font-medium px-9 py-3 rounded-[12px] max-scr1100:px-6 ">
          Cancel
        </button>
        <button onClick={() => setToggle(2)} className="  text-[#fff] text-[16px] font-semibold px-9 py-3 max-scr1100:px-6  bg-[#06A9EF] rounded-[12px]">
          Continue
        </button>
      </div>
    </div>
  )
}  

export default JobDocument