

import React, { useState } from "react";
import { TablePagination } from '@mui/material';

function Employer_Home() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const headings = ["Job Title", "No. of Openings", "Location", "Budget", "Requested by", "Hiring Period"]

  const requisition = [
    {
      heading: "Job Title",
      tittle1: "Assistant Manager",
      tittle2: "Customer Support",
      opening: "1 position",
      location: "mumbai",
      budget: "Not Available",
      requested_by: "hr manager ",
      hiring_period: "pending",
    },
    {
      heading: "No. of Openings",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "Location",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "Budget",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },

    {
      heading: "Requested by",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "Hiring Period",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "Hiring Period",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
      tittle1: "CS Executive",
      tittle2: "Accounts",
      opening: "1 Position",
      location: "Banglore",
      budget: "$5000-5200",
      requested_by: "Market Executive",
      hiring_period: "Approved",
    },
    {
      heading: "",
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
    <div className="">
      <div className=" w-[100%] max-h-[80vh]  rounded-[20px]  relative overflow-y-scroll ">
        <div className="h-[72px] bg-[#fff] p-[16px] flex flex-row justify-between rounded-t-[12px] sticky top-0">
          <p className="h-[29px]  text-[24px] font-[500px]">All Job Requisitions</p>
          <button className="h-[40px] bg-[#06A9EF] rounded-lg text-[16px] text-white w-[159px]">
            + Create New Job
          </button>
        </div>
        <div className=" ">
          <div className="h-[49px] bg-[#06A9EF] flex flex-row p-[16px]  gap-4 text-[white] sticky top-[72px] ">
            {headings.map((req) => (
              < div className=" w-[14%]">
                {req}
                
              </div>

            ))}
            <div className="w-[8.90%]">

                </div>
          </div>
          <div className=" ">
            {requisition.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req, index) => (
              <div key={index} className="h-[64px] items-center flex flex-row py-[12px] px-[16px] gap-4 border-b border-solid  border-[rgba(100, 100, 100, 0.60)] bg-white ">
                <div className=" w-[14%]">
                  <p className="text-[14px] font-[500] text-[#06A9EF]">{req.tittle1}</p>
                  <p className="text-[12px] font-[500] text-[#646464]">{req.tittle2}</p>
                </div>
                <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.opening}</p>
                <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.location}</p>
                <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.budget}</p>
                <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.requested_by}</p>
                <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.hiring_period}</p>
                <button className="px-[12px] py-[8px] flex w-[8.90%] items-end justify-end gap-[4px] border-[1px] border-solid border-[#06A9EF] rounded-[8px] text-[14px] font-[500] ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                    <g mask="url(#mask0_4754_60413)">
                      <path d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z" fill="#333333" />
                    </g>
                  </svg>
                  Post Job
                </button>
              </div>
            ))}

          </div>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          className="h-[64px] rounded-b-[12px] py-[12px] px-[16px]  bg-white sticky bottom-0 w-[100%]"
          count={requisition.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default Employer_Home;
