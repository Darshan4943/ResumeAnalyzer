

import React, { useEffect, useState } from "react";
import { TablePagination } from '@mui/material';


import { useRouter } from "next/router";
import CreateNewJob from "@/components/featured/employer/CreateNewJob";

function JobPosting() {
    const router = useRouter();
    const query = router.query;

    const [toggle, setToggle] = useState(0);


    useEffect(() => {

        if (query.content === "CreateNewJob") {
            setToggle(1);
        } else {
            setToggle(0);
        }
    }, [router.query]);

    const toggleContent = () => {
        const CreateNewJob = toggle ? "" : "CreateNewJob";
        router.push(`JobPosting/?content=${CreateNewJob}`);
        setToggle((prevToggle) => !prevToggle);
    };


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


    const search = [
        {
            heading: "Department",
            options: ["Assistant Manager", "Option 2", "Option 3"]
        },
        {
            heading: "Location",
            options: ["Mumbai", "Pune", "Banglore"]
        },
        {
            heading: "Status",
            options: ["Pending", "Approved"]
        },
        {
            heading: "Priority",
            options: ["Yes", "No"]
        }

    ];

    const handleHeadingChange = (event, index) => {
        const selectedOption = event.target.value;
        const selectedHeading = headings[index];


    };

    return (
        <div className="">




            {toggle === 0 &&
                <>
                    <div className="web">
                        <div className=" w-[100%] max-h-[80vh]  rounded-[20px]  relative overflow-y-scroll ">
                            <div className="h-[72px] bg-[#fff] p-[16px] flex flex-row justify-between rounded-t-[12px] sticky top-0">
                                <p className="h-[29px]  text-[24px] font-[500px]">All Job Requisitions</p>
                                <button
                                    onClick={toggleContent}
                                    className="h-[40px] bg-[#06A9EF] rounded-lg text-[16px] text-white w-[159px]"
                                >
                                    + Create New Job
                                </button>
                            </div>
                            <div className=" ">

                                <div className="h-[84px] bg-[#06A9EF]  flex flex-row p-[16px] justify-between  text-[#333] sticky top-[72px] ">
                                    {search.map((headingObj, index) => (
                                        <>

                                            <select className=" w-[19.87%] bg-white p-4 text-[14px] font-normal " onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
                                                <option value=""> {headingObj.heading}</option>
                                                {headingObj.options.map((option, optIndex) => (
                                                    <option key={optIndex} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    ))}
                                    <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]" >

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z" stroke="#646464" stroke-width="2.02783" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <input className="w-[100%] text-[14px] font-normal " type="text" placeholder="search" />
                                    </div>
                                </div>
                                <div className=" bg-[#E6E6E6] flex flex-row p-[16px]  gap-4  sticky top-[156px] ">



                                    {headings.map((req) => (
                                        < div className=" w-[14%]">
                                            {req}

                                        </div>

                                    ))}
                                    <div className="min-w-[115px]">

                                    </div>
                                </div>
                                <div className=" ">
                                    {requisition.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req, index) => (
                                        <div key={index} className=" items-center flex flex-row py-[12px] px-[16px] gap-4 border-b border-solid  border-[rgba(100, 100, 100, 0.60)] bg-white ">
                                            <div className=" w-[14%]">
                                                <p className="text-[14px] font-[500] text-[#06A9EF]">{req.tittle1}</p>
                                                <p className="text-[12px] font-[500] text-[#646464]">{req.tittle2}</p>
                                            </div>
                                            <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.opening}</p>
                                            <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.location}</p>
                                            <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.budget}</p>
                                            <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.requested_by}</p>
                                            <p className="text-[12px] w-[14%] font-[500] text-[#646464]">{req.hiring_period}</p>
                                            <button className="px-[12px] py-[8px] flex  min-w-[115px] items-center  gap-[4px] border-[1px] border-solid border-[#06A9EF] rounded-[8px] text-[14px] font-[500] ">
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

                    <div className="mobile max-h-[80vh] relative overflow-y-scroll">
                        {requisition
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((req, index) => (
                                <div className="p-[12px] bg-[#fff] rounded-[12px] gap-[16px] border-[0.5px] border-solid border-[#DEDEDE] mb-[8px]">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-[2px]">
                                            <div className="text-[12px] font-[500] text-[#06A9EF]">
                                                {req.tittle1}
                                            </div>
                                            <div className="text-[#646464] text-[10px] font-[500]">
                                                {req.tittle2}
                                            </div>
                                        </div>
                                        <div className="text-[#333] text-[12px] font-[500]">
                                            {req.location}
                                        </div>
                                    </div>
                                    <div className="flex justify-evenly">
                                        <div className="text-center">
                                            <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                                                Requested by
                                            </div>
                                            <div className="text-[#333] text-[12px] font-[500]  ">
                                                {req.requested_by}
                                                <div className="text-[#646464] text-[10px] font-[500]"></div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="py-[6px] px-[12px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                                                Budget
                                            </div>
                                            <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                                                {req.budget}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                                                Open Position
                                            </div>
                                            <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                                                {req.opening}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex items-center py-[6px] px-[12px] border-[1px] border-solid border-[#FF7A00] text-[14px] font-[600] text-[#FF7A00] rounded-[80px]">
                                            {req.hiring_period}
                                        </div>
                                        <button className="px-[12px] py-[6px] flex  min-w-[115px] items-center  gap-[4px] border-[1px] border-solid border-[#06A9EF] rounded-[8px] text-[12px] text-[#333] font-[500] ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_4754_60413)">
                                                    <path
                                                        d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z"
                                                        fill="#333333"
                                                    />
                                                </g>
                                            </svg>
                                            Post Job
                                        </button>
                                    </div>
                                </div>
                            ))}
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
                </>
            }

            {toggle === 1 &&
                <CreateNewJob />
            }

        </div>
    );
}

export default JobPosting;
