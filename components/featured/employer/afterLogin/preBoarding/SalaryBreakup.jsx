import React from "react";

function SalaryBreakup({ setSalaryBreakup }) {
  const arr = [
    "Basic",
    "House Rent Allowances (HRA)",
    "Conveyance Allowances (CA)",
    "Other Allowances",
    "Medical Allowances",
    "Special Allowances",
  ];
  const arr2 = [
    "₹ 4,500",
    "₹ 4,500",
    "₹ 4,500",
    "₹ 4,500",
    "₹ 4,500",
    "₹ 4,500",

  ];
  const arr3 = [
    "₹ 54,000",
    "₹ 54,000",
    "₹ 54,000",
    "₹ 54,000",
    "₹ 54,000",
    "₹ 54,000",
  ];
  const arr4 = [
    "Professional Tax (PT)",
    "Provident Fund (PF)",
    "Insurance",

  ];
  const arr5 = [
    "₹ 1,500",
    "₹ 4,500",
    "₹ 4,500",


  ];
  const arr6 = [
    "₹ 18,000",
    "₹ 54,000",
    "₹ 54,000",

  ];

  const arr7 = [
    "Diwali Bonus",
  ]
  const arr8 = [
    "-",
  ]
  const arr9 = [
    "₹50,000",
  ]
  return (
    <div
      className="ml:w-[100%] h-[80vh] overflow-y-auto w-[100%] flex flex-col items-start ml:gap-6 gap-4 rounded-md bg-white ml:p-6 p-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="w-full flex items-center justify-between self-stretch">
        <p className="text-[#333] font-Montserrat text-[18px] ml:text-[24px] font-medium">
          Salary Breakup
        </p>
        <svg
          onClick={() => setSalaryBreakup(false)}
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
                    Basic{" "}
                    <span className="text-[#646464] font-Montserrat text-[14px] font-medium">
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
              <div className="flex self-stretch items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <p className="text-[#333] font-Montserrat text-[16px] font-medium">
                    House Rent Allowances{" "}
                    <span className="text-[#646464] font-Montserrat text-[14px] font-medium">
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
                <p className="text-[#06A9EF] font-Montserrat text-[16px] font-semibold whitespace-nowrap ">
                  + Add Salary Breakup
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
              <p className="text-[#333] font-Montserrat text-[20px] font-semibold ">
                Salary Deduction
              </p>

              <div className="flex self-stretch items-center justify-between w-full">
                <div className="flex items-center gap-2 w-[34.84%]">
                  <p className="text-[#333] font-Montserrat text-[16px] font-medium whitespace-nowrap">
                    Basic{" "}
                    <span className="text-[#646464] font-Montserrat text-[14px] font-medium whitespace-nowrap">
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
              <div className="flex self-stretch items-center justify-between w-full">
                <div className="flex items-center gap-2 w-[50.83%]">
                  <p className="text-[#333] font-Montserrat text-[16px] font-medium ">
                    Provident Fund (PF){" "}
                    <span className="text-[#646464] font-Montserrat text-[14px] font-medium whitespace-nowrap">
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
                    Employees state insurance (ESI){" "}
                    <span className="text-[#646464]  font-Montserrat text-[14px] font-medium ">
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
                <div
                  className="flex py-2 px-4 items-center rounded-md bg-white"
                  style={{
                    border: " 1px solid var(--Text-Secondary, #646464)",
                  }}
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
      <div className="flex items-center gap-2  px-0 ml:px-6  ml:gap-6 self-stretch w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <g mask="url(#mask0_8667_96158)">
            <path
              d="M12.834 15.1673H5.83398V12.834H12.834V5.83398H15.1673V12.834H22.1673V15.1673H15.1673V22.1673H12.834V15.1673Z"
              fill="#06A9EF"
            />
          </g>
        </svg>
        <p className="text-[#06A9EF] flex items font-Montserrat font-semibold text-[20px] ">
          Add Bonus
        </p>
      </div>

      <div
        className="w-[100%] p-4 min-h-[1100px] overflow-x-auto items-center self-stretch bg-[#F3F3F3] rounded-md "
        style={{ border: "1px solid  #DEDEDE" }}
      >
        <div className="flex flex-col items-center gap-4 w-[998px] ">
          <div className="flex items-start w-full">
            <p className="text-[24px] font-Montserrat text-[#333] font-medium ">
              Salary Structure
            </p>
          </div>
          <div
            className="flex items-start justify-center self-stretch w-full gap-[1px]"
            style={{ boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                  borderRadius: "4px 0px 0px 0px",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  {" "}
                  Details
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">Net Pay</div>
              </div>
            </div>
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  Monthly
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr2.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">₹ 17,450</div>

              </div>
            </div>
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                  borderRadius: " 0px 4px 0px 0px",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  Annually
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr3.map((cur, ind) => (
                  <div key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">₹ 2,09,400</div>

              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-[998px] mt-6 ">
          <div className="flex items-start w-full">
            <p className="text-[24px] font-Montserrat text-[#333] font-medium ">
              Deductions
            </p>
          </div>
          <div
            className="flex items-start justify-center self-stretch w-full gap-[1px]"
            style={{ boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                  borderRadius: "4px 0px 0px 0px",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  {" "}
                  Details
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr4.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">Net Pay</div>
              </div>
            </div>
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  Monthly
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr5.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">₹ 3,450</div>

              </div>
            </div>
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                  borderRadius: " 0px 4px 0px 0px",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  Annually
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr6.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">₹ 41,400</div>

              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-[998px] mt-6 ">
          <div className="flex items-start w-full">
            <p className="text-[24px] font-Montserrat text-[#333] font-medium ">
              Bonus
            </p>
          </div>
          <div
            className="flex items-start justify-center self-stretch w-full gap-[1px]"
            style={{ boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                  borderRadius: "4px 0px 0px 0px",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  {" "}
                  Details
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr7.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">Net Pay</div>
              </div>
            </div>
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  Monthly
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr8.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">-</div>

              </div>
            </div>
            <div className="flex w-[332px] flex-col gap-1 items-center">
              <div
                className="flex py-2 px-4 items-center gap-4 w-full"
                style={{
                  backgroundColor: "rgba(128, 129, 132, 0.20)",
                  borderRadius: " 0px 4px 0px 0px",
                }}
              >
                <p className="text-[14px] font-Montserrat text-[#333] font-medium ">
                  Annually
                </p>
              </div>
              <div className="flex flex-col w-full">
                {arr9.map((cur, ind) => (
                  <div
                  key={ind}
                    className="flex items-start w-full p-4 bg-[#fff]"
                    style={{ borderBottom: "1px solid var(--Stroke, #DEDEDE)" }}
                  >
                    <p
                      key={ind}
                      className="text-[14px] font-Montserrat text-[#333] font-medium "
                    >
                      {cur}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-white text-[#333] text-[16px] font-Montserrat font-[700]">₹ 50,400</div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <div className="w-full flex justify-end items-center">


      </div> */}
      <div className="flex justify-end gap-4 self-stretch items-start">
        <button   onClick={() => setSalaryBreakup(false)} className="text-[16px] py-2 px-4 justify-center items-center rounded-xl bg-white font-Montserrat font-medium text-[#333]"
          style={{ border: '1px solid var(--primary, #06A9EF)' }}
        >Cancel</button>
        <button  onClick={() => setSalaryBreakup(false)} className="text-[16px] py-2 px-4 justify-center items-center rounded-xl bg-[#06A9EF] font-Montserrat font-medium text-[#fff]"
          style={{ border: '1px solid var(--primary, #06A9EF)' }}
        >Save Changes</button>


      </div>
    </div>
  );
}

export default SalaryBreakup;
