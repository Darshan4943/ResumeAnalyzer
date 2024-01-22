

import React, { useEffect, useState } from "react";
import { TablePagination } from '@mui/material';

import { useRouter } from "next/router";
import CreateNewRequisition from "@/components/featured/employer/CreateNewRequisition";


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




            {toggle === 0 &&
                <>
                    <div className="web">
                        <div className=" w-[100%] max-h-[70vh]  rounded-[20px]  relative overflow-y-scroll ">
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

                                            <select className=" w-[19.87%] bg-white p-4 " onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
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

                                <div className=" overflow-y-auto">
                                    {requisition.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req, index) => (
                                        <div key={index} className=" items-center flex flex-row py-[12px] px-[16px] justify-between border-b border-solid  border-[rgba(100, 100, 100, 0.60)] bg-white ">
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
                           
                        </div>
                    </div>
                    <div className="mobile ">
                        <div className=" flex flex-col gap-2  ml:max-h-[70vh] overflow-y-scroll relative ">
                            <div className="sticky top-0">
                                <div className=" bg-[#fff] p-[12px]  flex flex-col ms:flex-row gap-[12px] z-[500] justify-between rounded-t-[12px] ">
                                    <p className="h-[29px] text-[18px] ml:text-[24px] font-[500px]">
                                        All Requisition Requests
                                    </p>

                                    <button
                                        onClick={toggleContent}
                                        className=" py-[8px] px-[12px] bg-[#06A9EF] rounded-lg text-[14px] ml:text-[16px] text-white "
                                    >
                                        Create New Requistion
                                    </button>

                                </div>
                                <div className="flex bg-[#06A9EF] gap-[1px] p-4 ml:w-[20%] w-full">
                                    <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
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
                                        <div>
                                            Sort

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div>
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
                                                    {req.Location}
                                                </div>
                                            </div>
                                            <div className="flex justify-evenly">
                                                <div className="text-center">
                                                    <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                                                        Requested by
                                                    </div>
                                                    <div className="text-[#333] text-[12px] font-[500]  ">
                                                        {req.Requestedby}
                                                        <div className="text-[#646464] text-[10px] font-[500]"></div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="py-[6px] px-[12px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                                                        Budget
                                                    </div>
                                                    <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                                                        {req.Budget}
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

                                            <div className="flex justify-between items-center self-stretch">
                                                <div className="flex items-center self-stretch rounded-sm bg-[#E0F6FF]">
                                                    <div className="flex py-3 px-[6px] bg-[#F8F8F8] rounded-[4px 0 0 4px]">
                                                        <p className="text-[#333] text-[12px] font-medium">
                                                            Priority
                                                        </p>
                                                    </div>
                                                    <div className="flex py-[6px] px-3 ">
                                                        <p className="text-[#333] text-[12px] font-medium">
                                                            Yes
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                                                        <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                                                            Pending
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                className="h-[80px] rounded-b-[12px] py-[12px] px-[16px]  bg-white sticky bottom-0 w-[100%]"
                                count={requisition.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                </>
            }

            {toggle === 1 &&
                <CreateNewRequisition />
            }

        </div>
    );
}

export default Requisition;
