

import React, { useEffect, useState } from "react";
import { TablePagination } from '@mui/material';
import ALink from "~/components/alink";
import Breadcrumb from "~/components/common/BreadCrumb";
import CreateNewJob from "~/components/featured/employer/CreateNewJob";
import { useRouter } from "next/router";
import CreateNewRequisition from "~/components/featured/employer/CreateNewRequisition";

function Requisition() {
    const router = useRouter();
    const query = router.query;

    const [toggle, setToggle] = useState(0);


    useEffect(() => {

        if (query.content === "CreateNewRequisition") {
            setToggle(1);
        } else {
            setToggle(0);
        }
    }, [router.query]);

    const toggleContent = () => {
        const CreateNewRequisition = toggle ? "" : "CreateNewRequisition";
        router.push(`Requisition/?content=${CreateNewRequisition}`);
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
    const headings = [
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


    const labels = [
        'Requisition for',
        'Requested by',
        'Priority',
        'Location',
        'Budget',
        'Open Position',
        'Status',
    ];

    const requisition = [
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },

        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
        {
            tittle1: "Assistant Manager",
            tittle2: "Customer Support",
            Requestedby: "Customer",
            date: "on 4 Dec, 2023",
            Priority: "Yes",
            Location: "Mumbai",
            Budget: "Not Available",
            OpenPosition: "1 Position",
            Status: "Pending",
        },
    ];
    return (
        <div className="">

           
            <Breadcrumb />

            {toggle === 0 &&
                <div className="">
                    <div className=" w-[100%] max-h-[80vh]  rounded-[20px]  relative overflow-y-scroll ">
                        <div className="h-[72px] bg-[#fff] p-[16px] flex flex-row justify-between rounded-t-[12px] sticky top-0">
                            <p className="h-[29px]  text-[24px] font-[500px]">All Requisition Requests</p>
                            <button
                                onClick={toggleContent}
                                className="h-[40px] bg-[#06A9EF] rounded-lg text-[16px] text-white w-[242px]"
                            >
                                + Create New Requistion
                            </button>
                        </div>
                        <div className=" ">

                            <div className="h-[84px] bg-[#BCECFF] flex flex-row p-[16px] justify-between  text-[#333] sticky top-[72px] ">
                            {headings.map((headingObj, index) => (
                                    <>
                                        {/* < div className=" w-[19.87%] bg-white p-4">
                                        {headingObj.heading}

                                        </div> */}
                                        <select className=" w-[19.87%] bg-white p-4 " onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
                                            <option  value=""> {headingObj.heading}</option>
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
                                    <input className="w-[100%]" type="text" placeholder="search" />
                                </div>
                            </div>
                            <div className="flex px-4  py-2 items-center bg-[#E6E6E6] justify-between ">
                                {labels.map((req) => (
                                    < div className=" w-[12.85%] ">
                                        {req}

                                    </div>
                                ))}
                            </div>

                            <div className=" ">
                                {requisition.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req, index) => (
                                    <div key={index} className="h-[64px] items-center flex flex-row py-[12px] px-[16px] justify-between border-b border-solid  border-[rgba(100, 100, 100, 0.60)] bg-white ">
                                        <div className=" w-[12.85%] flex flex-col gap-[3px]">
                                            <p className="text-[14px] font-[500] text-[#06A9EF]">{req.tittle1}</p>
                                            <p className="text-[12px] font-[500] text-[#646464]">{req.tittle2}</p>
                                        </div>
                                        <div className=" w-[12.85%] flex flex-col gap-[3px]">
                                            <p className="text-[14px]  font-[500] text-[#646464]">{req.Requestedby}</p>
                                            <p className="text-[12px] font-[500] text-[#646464]">{req.date}</p>
                                        </div>

                                        <p className="text-[14px] w-[12.85%] font-[500] text-[#646464]">{req.Priority}</p>
                                        <p className="text-[14px] w-[12.85%] font-[500] text-[#646464]">{req.Location}</p>
                                        <p className="text-[14px] w-[12.85%] font-[500] text-[#646464]">{req.Budget}</p>
                                        <p className="text-[14px] w-[12.85%] font-[500] text-[#646464]">{req.OpenPosition}</p>
                                        <p className="text-[14px] w-[12.85%] font-[500] text-[#646464]">{req.Status}</p>
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
            }

            {toggle === 1 &&
                <CreateNewRequisition />
            }

        </div>
    );
}

export default Requisition;
