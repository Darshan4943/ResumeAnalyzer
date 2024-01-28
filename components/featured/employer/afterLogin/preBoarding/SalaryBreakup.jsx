import React from 'react'

function SalaryBreakup({setSalaryBreakup}) {
    return (
        <div
            className="ml:w-[89.55%] h-[80vh] overflow-y-auto w-[100%] flex flex-col items-start ml:gap-6 gap-4 rounded-md bg-white ml:p-6 p-3 "
            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
        >
            <div className="w-full flex items-center justify-between self-stretch">
                <p className="text-[#333] font-Montserrat text-[18px] ml:text-[24px] font-medium">
                    Salary Breakup
                </p>
                <svg
                onClick={()=>setSalaryBreakup(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                >
                    <g mask="url(#mask0_7804_66958)">
                        <path
                            d="M7.32984 22.5298L5.96875 21.1687L12.6382 14.4993L5.96875 7.82984L7.32984 6.46875L13.9993 13.1382L20.6687 6.46875L22.0298 7.82984L15.3604 14.4993L22.0298 21.1687L20.6687 22.5298L13.9993 15.8604L7.32984 22.5298Z"
                            fill="#333333"
                        />
                    </g>
                </svg>
            </div>
            <div className="flex px-0 ml:px-6 flex-col items-start gap-1 ml:gap-6 self-stretch w-full">
                <div className="flex self-stretch ml:flex-row flex-col gap-4 ml:gap-12 items-start ml:items-center w-[100%]">
                    <div className="flex items-center ml:gap-6 ml:w-[35.25%] w-full justify-between">
                        <p className="text-[#333] font-Montserrat text-[16px] ml:text-[19px] font-semibold  ">
                            Annual Salary
                        </p>
                        <div
                            className="w-[56.05%] flex py-2 px-4 items-center rounded-md bg-white"
                            style={{ border: "1px solid  #646464" }}
                        >
                            <input
                                type="text"
                                className="text-[#333] font-Montserrat text-[16px] font-medium w-[84%]"
                                placeholder="440000"
                            />
                        </div>
                    </div>
                    <div className="w-[26.39%] flex items-center gap-4">
                        <p className="text-[#333] font-Montserrat text-[14px] ml:text-[20px] font-medium">
                            Monthly
                        </p>
                        <p className="text-[#06A9EF] font-Montserrat text-[18px] ml:text-[24px] font-[700] whitespace-nowrap ">
                            Rs. 36,666.66
                        </p>
                    </div>
                </div>
                <div className="w-[100%] ml:justify-between self-stretch flex ml:flex-row flex-col items-start">
                    <div className="flex flex-col items-start gap-2 ml:gap-6 w-full ml:w-[44.52%]">
                        <div className="flex flex-col items-start gap-4 self-stretch w-full">
                            <p className="text-[#333] font-Montserrat text-[20px] font-semibold">
                                Salary Breakup
                            </p>
                            <div className="flex self-stretch items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                                        Basic <span className="text-[#646464] font-Montserrat text-[14px] font-medium">(On Gross)</span>
                                    </p>

                                </div>
                                <div
                                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                                    style={{
                                        border: "1px solid var(--Text-Secondary, #646464)",
                                    }}
                                >
                                    <input type="text" className="w-[86%]" />
                                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                                        %
                                    </p>
                                </div>
                            </div>
                            <div className="flex self-stretch items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                                        House Rent Allowances <span className="text-[#646464] font-Montserrat text-[14px] font-medium">(On Basic)</span>
                                    </p>

                                </div>
                                <div
                                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                                    style={{
                                        border: "1px solid var(--Text-Secondary, #646464)",
                                    }}
                                >
                                    <input type="text" className="w-[86%]" />
                                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                                        %
                                    </p>
                                </div>
                            </div>
                            <div className="flex self-stretch items-center justify-between w-full ">
                                <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                                    Conveyance Allowances
                                </p>
                                <div
                                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                                    style={{
                                        border: "1px solid var(--Text-Secondary, #646464)",
                                    }}
                                >
                                    <input type="text" className="w-[86%]" />
                                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                                        %
                                    </p>
                                </div>
                            </div>
                            <div className="flex self-stretch items-center justify-between w-full ">
                                <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                                    Other Allowances
                                </p>
                                <div
                                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                                    style={{
                                        border: "1px solid var(--Text-Secondary, #646464)",
                                    }}
                                >
                                    <input type="text" className="w-[86%]" />
                                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                                        %
                                    </p>
                                </div>
                            </div>
                            <div className="flex self-stretch items-center justify-between w-full ">
                                <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                                    Medical Allowances
                                </p>
                                <div
                                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                                    style={{
                                        border: "1px solid var(--Text-Secondary, #646464)",
                                    }}
                                >
                                    <input type="text" className="w-[86%]" />
                                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                                        %
                                    </p>
                                </div>
                            </div>
                            <div className="flex self-stretch items-center justify-between w-full ">
                                <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                                    Special Allowances{" "}
                                </p>
                                <div
                                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                                    style={{
                                        border: "1px solid var(--Text-Secondary, #646464)",
                                    }}
                                >
                                    <input type="text" className="w-[86%]" />
                                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                                        %
                                    </p>
                                </div>
                            </div>
                            <div className="w-[40.83%] flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_7804_67003)">
                                        <path
                                            d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                                            fill="#06A9EF"
                                        />
                                    </g>
                                </svg>
                                <p className="text-[#06A9EF] font-Montserrat text-[16px] font-semibold whitespace-nowrap ">
                                    Add Salary Breakup
                                </p>
                            </div>
                        </div>


                    </div>
                    <div className="web w-[10.96%] flex items-center ml:h-[27rem] justify-center ">
                        <div className="w-[1px] web h-full bg-[#646464]"></div>
                    </div>
                    <div className="mobile w-[100%] ml:w-0 flex items-center h-[2rem] justify-center ">
                        <div className="h-[1px] mobile w-full bg-[#646464]"></div>
                    </div>
                    <div className="flex flex-col items-start gap-6 w-full ml:w-[44.52%]">
              <div className="flex flex-col items-start gap-4 self-stretch w-full">
                 <p className="text-[#333] font-Montserrat text-[20px] font-semibold ">Salary Deduction</p>
           
              <div className="flex self-stretch items-center justify-between w-full">
                  <div className="flex items-center gap-2 w-[34.84%]">
                    <p className="text-[#333] font-Montserrat text-[16px] font-medium whitespace-nowrap">
                      Basic <span className="text-[#646464] font-Montserrat text-[14px] font-medium whitespace-nowrap">(On Gross)</span>
                    </p>
                  
                  </div>
                  <div
                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                    style={{
                      border: "1px solid var(--Text-Secondary, #646464)",
                    }}
                  >
                    <input type="text" className="w-[86%]" />
                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                      %
                    </p>
                  </div>
                </div>
              <div className="flex self-stretch items-center justify-between w-full">
                  <div className="flex items-center gap-2 w-[50.83%]">
                    <p className="text-[#333] font-Montserrat text-[16px] font-medium ">
                    Provident Fund (PF)  <span className="text-[#646464] font-Montserrat text-[14px] font-medium whitespace-nowrap">
                    (On Basic)
                    </span>
                    </p>
                   
                  </div>
                  <div
                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                    style={{
                      border: "1px solid var(--Text-Secondary, #646464)",
                    }}
                  >
                    <input type="text" className="w-[86%]" />
                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                      %
                    </p>
                  </div>
                </div>
              <div className="flex self-stretch items-center justify-between w-full">
                  <div className="flex items-center gap-2  w-[75%]">
                    <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                    Employees state insurance (ESI)  <span className="text-[#646464]  font-Montserrat text-[14px] font-medium ">
                    (On Gross)
                    </span>
                    </p>
                   
                  </div>
                  <div
                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                    style={{
                      border: "1px solid var(--Text-Secondary, #646464)",
                    }}
                  >
                    <input type="text" className="w-[86%]" />
                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                      %
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center self-stretch">
                  <div className="flex py-2 px-4 items-center rounded-md bg-white"
                  style={{border:' 1px solid var(--Text-Secondary, #646464)'}}
                  >
                  <input type="text" className="flex" name="" id="" />
                  </div>
                  <div
                    className="flex py-2 px-4 justify-end items-center rounded-md bg-white w-[20.41%]"
                    style={{
                      border: "1px solid var(--Text-Secondary, #646464)",
                    }}
                  >
                    <input type="text" className="w-[86%]" />
                    <p className="text-[#333] font-Montserrat text-[14px] font-semibold">
                      %
                    </p>
                  </div>

                </div>
                <div className="w-[40.83%] flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g mask="url(#mask0_7804_67003)">
                    <path
                      d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>
                <p className="text-[#06A9EF] font-Montserrat text-[16px] font-semibold whitespace-nowrap ">
                Add Deductions
                </p>
              </div>
                </div>


            </div>

                </div>
            </div>

        </div>
    )
}

export default SalaryBreakup