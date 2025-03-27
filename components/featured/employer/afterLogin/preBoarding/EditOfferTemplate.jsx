import React, { useState } from 'react'
import SalaryBreakup from './SalaryBreakup';

function EditOfferTemplate({ setEditTemplate }) {
  const [salaryBreakup, setSalaryBreakup] = useState(false)

  const AttributesList = [
    "First Name",
    "Last Name",
    "Date Of Joining (dd-mm-yyyy)",
    "Date Of Joining (dd MMM, yyyy)",
    "Offer Expiry Date (dd MMM, yyyy)",
    "Gender",
    "Email",
    "Mobile Number",
    "Job Title",
    "Department",
    "Location",
    "Annual Salary",
    "Salary Breakup",
    "Mr/ Ms",
    "Current Date (dd-mm-yyyy)",
    "Current Date (dd MMM, yyyy)",
    "Org Signatures 1",
    "Org Signatures 2",
    "Candidate Signature",
    "Company Name",
    "Company Website",
  ];
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <div
          className="p-[12px] bg-[#fff] rounded-[12px]"
          style={{
            boxShadow: " 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex gap-[12px] text-[18px] ml:text-[24px] font-[500] items-center">
            <svg
              onClick={() => setEditTemplate(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className=' cursor-pointer'
            >
              <g mask="url(#mask0_7804_66843)">
                <path
                  d="M9.12656 15.1641L15.6599 21.6974L13.9974 23.3307L4.66406 13.9974L13.9974 4.66406L15.6599 6.2974L9.12656 12.8307H23.3307V15.1641H9.12656Z"
                  fill="#333333"
                />
              </g>
            </svg>
            Edit Offer Letter Template
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[8px] text-[16px] ml:text-[20px] font-[500] ">
                {" "}
                Name of the Template{" "}
                <div className="border-[1px] rounded-[6px] border-solid border-[##646464] w-full ml:w-[50%] py-[12px] px-[16px] ">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="text-[14px] font-[500]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] text-[16px] ml:text-[20px] font-[500]">
                Description
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="border-[1px] rounded-[6px] border-solid border-[##646464] py-[8px] px-[16px]"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] text-[16px] ml:text-[20px] font-[500] ml:gap-[8px]">
              Page Setup
              <div className="flex flex-col ml:flex-row gap-[12px] ml:gap-[24px]">
                <div className="flex flex-col gap-[8px] justify-center">
                  <div className="text-[#333] text-[14px] ml:text-[16px] font-[500] flex flex-col gap-[4px]">
                    Header Section
                    <div className="text-[#646464] text-[12px] ml:ml:text-[14px] font-[400]">
                      This image will be shown at top of section. Ex.Company Logo
                    </div>
                  </div>
                  <div>
                    <button className="flex items-center py-[8px] px-[16px] gap-[4px] rounded-[8px] border-[1px] border-solid border-[#06A9EF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g mask="url(#mask0_7804_54386)">
                          <path
                            d="M11.3469 15.388V6.58801L8.8565 9.07838L7.92767 8.16881L11.9968 4.09961L16.066 8.16881L15.1372 9.07838L12.6468 6.58801V15.388H11.3469ZM6.89747 18.6996C6.44707 18.6996 6.06771 18.5441 5.75938 18.2333C5.45104 17.9225 5.29688 17.542 5.29688 17.0919V15.5804H6.59685V17.0919C6.59685 17.1688 6.6289 17.2393 6.693 17.3034C6.75712 17.3675 6.82764 17.3996 6.90457 17.3996H17.0891C17.1661 17.3996 17.2366 17.3675 17.3007 17.3034C17.3648 17.2393 17.3968 17.1688 17.3968 17.0919V15.5804H18.6968V17.0919C18.6968 17.542 18.5413 17.9225 18.2303 18.2333C17.9192 18.5441 17.5385 18.6996 17.0881 18.6996H6.89747Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                      Upload File
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] justify-center">
                  <div className="text-[#333] text-[14px] ml:text-[16px] font-[500] flex flex-col gap-[4px]">
                    Footer Section
                    <div className="text-[#646464] text-[12px] ml:text-[14px] font-[400]">
                      This image will be shown at bottom of section. Ex.Company
                      Logo{" "}
                    </div>
                  </div>
                  <div>
                    <button className="flex items-center py-[8px] px-[16px] gap-[4px] rounded-[8px] border-[1px] border-solid border-[#06A9EF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g mask="url(#mask0_7804_54386)">
                          <path
                            d="M11.3469 15.388V6.58801L8.8565 9.07838L7.92767 8.16881L11.9968 4.09961L16.066 8.16881L15.1372 9.07838L12.6468 6.58801V15.388H11.3469ZM6.89747 18.6996C6.44707 18.6996 6.06771 18.5441 5.75938 18.2333C5.45104 17.9225 5.29688 17.542 5.29688 17.0919V15.5804H6.59685V17.0919C6.59685 17.1688 6.6289 17.2393 6.693 17.3034C6.75712 17.3675 6.82764 17.3996 6.90457 17.3996H17.0891C17.1661 17.3996 17.2366 17.3675 17.3007 17.3034C17.3648 17.2393 17.3968 17.1688 17.3968 17.0919V15.5804H18.6968V17.0919C18.6968 17.542 18.5413 17.9225 18.2303 18.2333C17.9192 18.5441 17.5385 18.6996 17.0881 18.6996H6.89747Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                      Upload File
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px] justify-center ml:gap-[8px]">
                  <div className="text-[14px] font-[500] ">
                    Company Info
                    <div className="border-[1px] rounded-[6px] border-solid border-[##646464] w-[50%]w-full sm:w-[50%] ml:w-full  py-[8px] px-[16px] ">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="text-[14px] font-[500] h-[17px]"
                      />
                    </div>
                  </div>
                  <div className="text-[14px] font-[500] ">
                    Contact
                    <div className="border-[1px] rounded-[6px] border-solid border-[##646464] w-full sm:w-[50%] ml:w-full  py-[8px] px-[16px] ">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="text-[14px] font-[500] h-[17px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml:flex-row-reverse gap-[16px]">
          <div
            className="ml:w-[28.90%] p-[12px] bg-[#fff] flex flex-col gap-[12px] rounded-[12px]"
            style={{
              boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col text-[18px] font-[500] text-[#333]">
                Attributes
                <div className="text-[12px] font-[400] text-[#646464]">
                  Click on a field below to insert it into template.
                </div>
              </div>
              <div className="flex gap-[8px] py-[8px] px-[16px] items-center rounded-[6px] border-solid border-[1px] border-[#DEDEDE]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                    stroke="#646464"
                    stroke-width="1.80251"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input type="text" placeholder="Search" name="" id="" />
              </div>
            </div>
            <div className="p-[12px] flex flex-col h-[124px] ml:h-[788px] border-solid border-[1px] border-[#DEDEDE] rounded-[6px] gap-[20px] overflow-y-auto">
              {AttributesList.map((item,index) => (
                <div key={index} className="text-[14px] flex gap-2  justify-between font-[500] text-[#06A9EF]">
                  {item}
                  {item === "Salary Breakup" &&
                    <svg onClick={() => setSalaryBreakup(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                      <g mask="url(#mask0_7804_66922)">
                        <path d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z" fill="#06A9EF" />
                      </g>
                    </svg>
                  }
                </div>

              ))}
            </div>
            <div className="w-full flex justify-end text-[14px] text-[#333] font-[600]">
              See all
            </div>
          </div>
          <div
            className="w-full bg-[#fff] rounded-[12px] py-[12px] px-[8px] flex flex-col gap-[12px]"
            style={{
              boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex justify-between text-[18px] font-[500] text-[#333]">
              Preview{" "}
              <button className="py-[8px] px-[16px] bg-[#06A9EF] rounded-[8px] text-[#fff] text-[14px] font-[600]">
                Save Changes
              </button>
            </div>
            <div>
              <div
                className="bg-[#F2F4F7] py-[8%] px-[10%] w-full items-center justify-center  flex gap-[8px] rounded-tl-[8px] rounded-tr-[8px] rounded-br-0 rounded-bl-0"
                style={{
                 boxShadow:" 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)"
                }}
              >
                <img className='w-fit h-fit ' src="/images/Content.png" alt="" />

              </div>
            </div>
          </div>
        </div>


      </div>

      {salaryBreakup &&
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed w-full z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins ">
            <SalaryBreakup setSalaryBreakup={setSalaryBreakup} />
          </div>
        </>

      }

    </>
  )
}

export default EditOfferTemplate