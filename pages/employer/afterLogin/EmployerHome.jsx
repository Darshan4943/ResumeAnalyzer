import React from "react";

function Employer_Home() {
  const reuisition = [
    {
      tittle1: "Assistant Manager",
      tittle2: "Customer Support",
      opening: "1 position",
      location: "mumbai",
      budget: "Not Available",
      requested_by: "hr manager ",
      hiring_period: "pending",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },

    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
  ];

  return (
    <>
      <div className="px-5">
        <div class="h-[72px] bg-[#fff] p-[16px] flex flex-row justify-between">
          <p class="h-[29px] text-[24px] font-[500px]">All Job Requisitions</p>
          <button class=" h-[40px] bg-[#06A9EF] rounded-lg text-[16px] text-white w-[159px]">
            + Create New Job
          </button>
        </div>

        <div class="h-[49px] bg-[#06A9EF] flex flex-row p-[16px] align-baseline text-center text-[white]">
          <p class="w-[171.33px] text-start">Job Title</p>
          <p class="w-[171.33px]">No. of Openings</p>
          <p class="w-[171.33px] mx-[-9px]">Location</p>
          <p class="w-[171.33px] mx-[30px]">Budget</p>
          <p class="w-[171.33px] mx-[25px]">Requested by</p>
          <p class="w-[171.33px]">Hiring Period</p>
          <p className="w-[171.33px]"></p>
        </div>

        {reuisition.map((reuisition) => (
          <div class="h-[64px] flex flex-row  justify-between  align-baseline py-[12px] px-[16px] border-bottom border-solid border-[1px] border-[rgba(100, 100, 100, 0.60)]">
            <div class="h-[64px] w-[171.33px] text-start ">
              <p className="text-[14px] font-[500] text-[#06A9EF]">
                {reuisition.tittle1}
              </p>
              <p className="text-[12px] font-[500] text-[#646464]">
                {reuisition.tittle2}
              </p>
            </div>
            <p class="h-[64px] w-[171.33px] flex  align-baseline ">
              {reuisition.opening}
            </p>
            <p class="h-[64px] w-[171.33px] flex align-baseline">
              {reuisition.location}
            </p>
            <p class="h-[64px] w-[171.33px] flex  align-baseline">
              {reuisition.budget}
            </p>
            <p class="h-[64px] w-[171.33px] flex  align-baseline">
              {reuisition.requested_by}
            </p>
            <p class="h-[64px] w-[171.33px] mx-[5px] flex  align-baseline">
              {reuisition.hiring_period}
            </p>
            <button className="px-[12px] py-[8px] flex justify-center items-center gap-[4px] border-[1px] border-solid border-[#06A9EF] rounded-[8px] text-[14px] font-[500] ">
              <span className="h-[24px] w-[24px]">+</span> Post Job
            </button>
          </div>
        ))}
        <div className="flex py-[2px] px-0 justify-end items-center gap-[26px] align-self-stretch rounded-b-lg bg-white border-bottom border-solid border-[1px] border-[rgba(100, 100, 100, 0.60)]">
          <div className="flex flex-row justify-end gap-[26px] py-[16px] px-[12px] ">
            <p className="text-primary font-montserrat text-base font-normal leading-166 tracking-tighter flex  ">
              Rows per page:
            </p>
            <select>
              <option>10</option>
              <option>9</option>
              <option>8</option>
              <option>7</option>
              <option>6</option>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
            <p>1-5 of 13</p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.7069 7.41L14.2969 6L8.29688 12L14.2969 18L15.7069 16.59L11.1269 12L15.7069 7.41Z"
                  fill="#333333"
                />
              </svg>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.70687 6L8.29688 7.41L12.8769 12L8.29688 16.59L9.70687 18L15.7069 12L9.70687 6Z"
              fill="#333333"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Employer_Home;
