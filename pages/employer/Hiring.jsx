import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import JobPost from "../../components/featured/employer/JobPost";
import ApplicantDetails from "../jobs/details/applicant-details";

function Hiring() {
  const router = useRouter();
  const query = router.query;

  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    if (query.content === "ApplicantDetails") {
      setToggle(2);
    } else if (query.content === "JobPost") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const toggleContent = () => {
    const JobPost = toggle ? "ApplicantDetails" : "JobPost";
    router.push(`Hiring/?content=${JobPost}`);
    setToggle((prevToggle) => !prevToggle);
  };

  const job_card = [
    {
      post: "Assistant Manager",
      location: "Delhi",
      time1: "Full-Time",
      yrs: "1-2years",
      time3: "",
      button: (
        <div className="flex gap-[3px] items-center">
          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#0C8A0A] rounded-[90px]"></div>
          <div className="text-[12px] font-[500] text-[#0C8A0A]">Active</div>
          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#B3261E] rounded-[90px]"></div>
          <div className="text-[12px] font-[500] text-[#B3261E]">inactive</div>
        </div>
      ),
      img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />,
      applicant_no: 16,
      date_posted: "24 May 2020",
      due_date: "30 May 2020",
    },
    {
      post: "Assistant Manager",
      location: "Delhi",
      time1: "Full-Time",
      yrs: "1-2years",
      time3: "",
      button: (
        <div className="flex gap-[3px] items-center">
          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#0C8A0A] rounded-[90px]"></div>
          <div className="text-[12px] font-[500] text-[#0C8A0A]">Active</div>
        </div>
      ),
      img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />,
      applicant_no: 16,
      date_posted: "24 May 2020",
      due_date: "30 May 2020",
    },
    {
      post: "Assistant Manager",
      location: "Delhi",
      time1: "Full-Time",
      yrs: "1-2years",
      time3: "",
      button: (
        <div className="flex gap-[3px] items-center">
          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#0C8A0A] rounded-[90px]"></div>
          <div className="text-[12px] font-[500] text-[#0C8A0A]">Active</div>
        </div>
      ),
      img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />,
      applicant_no: 16,
      date_posted: "24 May 2020",
      due_date: "30 May 2020",
    },
    {
      post: "Assistant Manager",
      location: "Delhi",
      time1: "Full-Time",
      yrs: "1-2years",
      time3: "",
      button: (
        <div className="flex gap-[3px] items-center">
          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#0C8A0A] rounded-[90px]"></div>
          <div className="text-[12px] font-[500] text-[#0C8A0A]">Active</div>
        </div>
      ),
      img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />,
      applicant_no: 16,
      date_posted: "24 May 2020",
      due_date: "30 May 2020",
    },

  ];
  const headings = [
    {
      heading: "Department",
      options: ["Assistant Manager", "Option 2", "Option 3"],
    },
    {
      heading: "Location",
      options: ["Mumbai", "Pune", "Banglore"],
    },
    {
      heading: "Status",
      options: ["Pending", "Approved"],
    },
    {
      heading: "Priority",
      options: ["Yes", "No"],
    },
  ];

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  return (
    <div>
      {toggle === 0 && (
        <div className="flex flex-col gap-[16px] w-[100%] ml:max-h-[80vh]  relative ">
          <div className=" mobile">
            <div className=" bg-[#fff] xsm:p-[12px] p-2 items-center flex  ms:flex-row xsm:gap-[12px] gap-2 z-[500] justify-between rounded-[12px] ">
              <p className="h-[29px] text-[18px] ml:text-[24px] font-medium">
                Job Post Status
              </p>

              <button
                onClick={() =>
                  router.push(
                    "/employer/afterLogin/JobPosting?content=CreateNewJob"
                  )
                }
                className=" py-[8px] xsm:px-[12px] px-2 bg-[#06A9EF] rounded-lg text-[14px] ml:text-[16px] text-white "
              >
                + Create New Job
              </button>
            </div>
            <div className="flex bg-[#06A9EF] gap-[1px] mt-4 p-3 ml:w-[20%] w-full">
              <div className=" bg-white p-3 flex gap-[10px] w-full items-center ">
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
                    stroke-width="2.02783"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  className="w-[100%] text-[#646464]"
                  type="text"
                  placeholder="search"
                />
              </div>
              <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_7540_118191)">
                    <path
                      d="M3.33203 5H16.6654"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 10H15"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66797 15H13.3346"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_7540_118191">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div>Sort</div>
              </div>
            </div>
          </div>
          <div className="xl:w-[1024px] scr1024:w-[800px] w-[700px]">
            <div className="h-[62px]  flex rounded-[6px] flex-row  justify-between  text-[#333] sticky top-[72px] ">
              {headings.map((headingObj, index) => (
                <>
                  <select
                    className=" w-[19.87%] bg-white p-4 text-[14px] font-normal "
                    onChange={(e) => handleHeadingChange(e, headingObj.heading)}
                  >
                    <option value=""> {headingObj.heading}</option>
                    {headingObj.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              ))}

              <div className="flex w-[19.87%] bg-white justify-center  p-2  ">
                <button className="px-[36px] py-[12px] rounded-[30px]  flex items-center justify-center bg-[#06A9EF] text-[14px] font-[600] text-[#FFFFFF]">
                  Search{" "}
                </button>
              </div>
            </div>
          </div>

          <div className=" grid md:grid-cols-12 grid-clos-6 gap-6">
            {job_card.map((job_card) => (
              <div
                onClick={toggleContent}
                className="flex py-[16px] px-[24px] flex-col items-start gap-[12px] flex-shrink-0 rounded-lg bg-[#fff] shadow-md col-span-6"
              >
                <div className="flex justify-between w-[100%]">
                  <div className="flex justify-between gap-[20px] ">
                    <p className=" text-[14px] font-[600]">{job_card.post}</p>
                    <div className="">{job_card.button}</div>
                  </div>
                  {job_card.img}
                </div>

                <div className="flex w-[100%] justify-between items-center ">
                  <p className="text-[#333] text-[18px] font-[600]">
                    Total Applications
                  </p>
                  <p className="text-[#333] items-center text-[36px] font-[600] ">
                    16
                  </p>
                </div>

                <div className="flex w-[100%] justify-between items-center ">
                  <div className="flex flex-col items-start gap-[4px]">
                    <p className="text-[12px] font-[600] text-[#646464]">
                      Date posted
                    </p>
                    <p className="text-[#333] font-[500] text-[12px]">
                      {job_card.date_posted}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-[4px]">
                    <p className="text-[12px] font-[600] text-[#646464]">
                      Due Date
                    </p>
                    <p className="text-[#333] font-[500] text-[12px]">
                      {job_card.due_date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-[10px]">
                  <div className="flex gap-[4px] items-center">
                    <div>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33073 11.7474C1.0099 11.7474 0.735243 11.6332 0.506771 11.4047C0.278299 11.1762 0.164062 10.9016 0.164062 10.5807V4.16406C0.164062 3.84323 0.278299 3.56858 0.506771 3.3401C0.735243 3.11163 1.0099 2.9974 1.33073 2.9974H3.66406V1.83073C3.66406 1.5099 3.7783 1.23524 4.00677 1.00677C4.23524 0.778299 4.5099 0.664062 4.83073 0.664062H7.16406C7.48489 0.664062 7.75955 0.778299 7.98802 1.00677C8.21649 1.23524 8.33073 1.5099 8.33073 1.83073V2.9974H10.6641C10.9849 2.9974 11.2595 3.11163 11.488 3.3401C11.7165 3.56858 11.8307 3.84323 11.8307 4.16406V10.5807C11.8307 10.9016 11.7165 11.1762 11.488 11.4047C11.2595 11.6332 10.9849 11.7474 10.6641 11.7474H1.33073ZM1.33073 10.5807H10.6641V4.16406H1.33073V10.5807ZM4.83073 2.9974H7.16406V1.83073H4.83073V2.9974Z"
                          fill="#646464"
                        />
                      </svg>
                    </div>
                    <div className="text-[12px] font-[400]">{job_card.yrs}</div>
                  </div>
                  <div className="border-[1px] border-[#AFAFAF]"></div>
                  <div className="flex gap-[4px] items-center">
                    <div>
                      <svg
                        width="10"
                        height="13"
                        viewBox="0 0 10 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66927 11.1641H7.33594V9.41406C7.33594 8.7724 7.10746 8.22309 6.65052 7.76615C6.19358 7.3092 5.64427 7.08073 5.0026 7.08073C4.36094 7.08073 3.81163 7.3092 3.35469 7.76615C2.89774 8.22309 2.66927 8.7724 2.66927 9.41406V11.1641ZM5.0026 5.91406C5.64427 5.91406 6.19358 5.68559 6.65052 5.22865C7.10746 4.7717 7.33594 4.2224 7.33594 3.58073V1.83073H2.66927V3.58073C2.66927 4.2224 2.89774 4.7717 3.35469 5.22865C3.81163 5.68559 4.36094 5.91406 5.0026 5.91406ZM0.335938 12.3307V11.1641H1.5026V9.41406C1.5026 8.82101 1.64115 8.26441 1.91823 7.74427C2.19531 7.22413 2.58177 6.80851 3.0776 6.4974C2.58177 6.18629 2.19531 5.77066 1.91823 5.25052C1.64115 4.73038 1.5026 4.17378 1.5026 3.58073V1.83073H0.335938V0.664062H9.66927V1.83073H8.5026V3.58073C8.5026 4.17378 8.36406 4.73038 8.08698 5.25052C7.8099 5.77066 7.42344 6.18629 6.9276 6.4974C7.42344 6.80851 7.8099 7.22413 8.08698 7.74427C8.36406 8.26441 8.5026 8.82101 8.5026 9.41406V11.1641H9.66927V12.3307H0.335938Z"
                          fill="#646464"
                        />
                      </svg>
                    </div>
                    <div className="text-[12px] font-[400]">{job_card.time1}</div>
                  </div>
                  <div className="border-[1px] border-[#AFAFAF]"></div>
                  <div className="flex gap-[4px] items-center">
                    <div>
                      <svg
                        width="10"
                        height="13"
                        viewBox="0 0 10 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.0026 6.4974C5.32344 6.4974 5.59809 6.38316 5.82656 6.15469C6.05503 5.92622 6.16927 5.65156 6.16927 5.33073C6.16927 5.0099 6.05503 4.73524 5.82656 4.50677C5.59809 4.2783 5.32344 4.16406 5.0026 4.16406C4.68177 4.16406 4.40712 4.2783 4.17865 4.50677C3.95017 4.73524 3.83594 5.0099 3.83594 5.33073C3.83594 5.65156 3.95017 5.92622 4.17865 6.15469C4.40712 6.38316 4.68177 6.4974 5.0026 6.4974ZM5.0026 10.7849C6.18871 9.69601 7.06858 8.70677 7.64219 7.81719C8.2158 6.9276 8.5026 6.13767 8.5026 5.4474C8.5026 4.38767 8.16476 3.51997 7.48906 2.84427C6.81337 2.16858 5.98455 1.83073 5.0026 1.83073C4.02066 1.83073 3.19184 2.16858 2.51615 2.84427C1.84045 3.51997 1.5026 4.38767 1.5026 5.4474C1.5026 6.13767 1.78941 6.9276 2.36302 7.81719C2.93663 8.70677 3.81649 9.69601 5.0026 10.7849ZM5.0026 12.3307C3.43733 10.9988 2.26823 9.76163 1.49531 8.61927C0.722396 7.47691 0.335938 6.41962 0.335938 5.4474C0.335938 3.98906 0.805035 2.82726 1.74323 1.96198C2.68142 1.0967 3.76788 0.664062 5.0026 0.664062C6.23733 0.664062 7.32378 1.0967 8.26198 1.96198C9.20017 2.82726 9.66927 3.98906 9.66927 5.4474C9.66927 6.41962 9.28281 7.47691 8.5099 8.61927C7.73698 9.76163 6.56788 10.9988 5.0026 12.3307Z"
                          fill="#646464"
                        />
                      </svg>
                    </div>
                    <div className="text-[12px] font-[400]">{job_card.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {toggle === 1 && (
        <JobPost toggleContentt={toggleContent} setToggle={setToggle} />
      )}
      {toggle === 2 && <ApplicantDetails setTogglee={setToggle} />}
    </div>
  );
}

export default Hiring;
