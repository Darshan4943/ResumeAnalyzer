

import React, { useEffect, useState } from "react";
import { TablePagination } from '@mui/material';

import { useRouter } from "next/router";
import CreateNewRequisition from "../../components/featured/employer/CreateNewRequisition";
import RequisitionFilter from "../../components/featured/employer/afterLogin/requisition/requisitionFilter";
import RequisitionList from "../../components/featured/employer/afterLogin/requisition/requisitionList";



function Requisition() {
    const router = useRouter();
    const query = router.query;

    const [toggle, setToggle] = useState(0);
    const [openSort, setOpenSort] = useState(false);

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
                    <>
                        {/* <div className="web">
                            <div className=" w-[100%] max-h-[70vh]  rounded-t-[20px]  relative overflow-y-scroll ">
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

                                    <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#333] sticky top-[72px] ">
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
                                    <div className="flex px-4  py-2 items-center  justify-between ">
                                        {labels.map((req) => (
                                            < div className=" w-[12.85%] ">
                                                {req}

                                            </div>
                                        ))}
                                    </div>

                                    <div className=" overflow-y-auto">
                                        {requisition.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req, index) => (
                                            <div key={index} className={`items-center flex flex-row py-[12px] px-[16px] justify-between border-b border-solid  border-[rgba(100, 100, 100, 0.60)] ${index % 2 === 0 ? "bg-[#FFF]" : "bg-[#E0F6FF]"}  `}>
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
                        </div> */}
                        <div className="mobile  ">
                            <div className=" flex flex-col gap-2   relative ">
                                <div className="sticky top-0">
                                    <div className=" bg-[#fff] p-[12px]  flex flex-col ms:flex-row gap-[12px] z-[500] justify-between rounded-t-[12px] ">
                                        <p className="h-[29px] text-[18px] ml:text-[24px] font-[500px]">
                                            All Requisition Requests
                                        </p>
                                        <button
                                            onClick={toggleContent}
                                            className=" py-[8px] px-[12px] max-w-[210px] bg-[#06A9EF] rounded-lg text-[14px] ml:text-[16px] text-white "
                                        >
                                            + Create New Requistion
                                        </button>
                                    </div>
                                    <div className="flex relative bg-[#06A9EF] gap-[1px] p-4 ml:w-[20%] w-full">
                                        <div onClick={() => setOpenSort(true)} className=" w-full py-[12px] px-[16px] text-[#333] text-[14px] font-[600] flex gap-[8px] items-center bg-[#fff]">
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
                                        {
                                            openSort && (
                                                <div
                                                    style={{ boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.4)" }}
                                                    className="absolute top-[48px] right-[5px] flex flex-col gap-[10px] rounded-[6px] bg-[#FFFFFF] p-[12px] z-[100]">
                                                    {headings.map((headingObj, index) => (
                                                        <select key={index} className=" bg-whites" onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
                                                            <option value=""> {headingObj.heading}</option>
                                                            {headingObj.options.map((option, optIndex) => (
                                                                <option key={optIndex} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ))}
                                                    <button
                                                        onClick={() => setOpenSort(false)}
                                                        className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]">
                                                        Search
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div>
                                    {requisition
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((req, index) => (
                                            <div key={index} className="p-[12px] bg-[#fff] rounded-[12px] gap-[16px] border-[0.5px] border-solid border-[#DEDEDE] mb-[8px]">
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
                        <div className="ml:hidden">
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                className="h-[80px] rounded-b-[12px] py-[12px] px-[16px] border-t bg-white sticky bottom-0 w-[100%]"
                                count={requisition.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </>
                    <div className=" hidden ml:flex w-full flex-col gap-[12px]">
                        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] flex items-center justify-between text-[#333333] text-[18px] font-[500]">
                            All Requisition Requests
                            <button onClick={toggleContent} className="px-[36px] py-[12px] bg-[#06A9EF] text-[#FFFFFF] text-[14px] font-[600] rounded-[36px] flex gap-[2px] items-center">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g mask="url(#mask0_6706_81048)">
                                        <path d="M8.25 9.75H4.5C4.2875 9.75 4.10938 9.67812 3.96562 9.53438C3.82187 9.39062 3.75 9.2125 3.75 9C3.75 8.7875 3.82187 8.60938 3.96562 8.46562C4.10938 8.32188 4.2875 8.25 4.5 8.25H8.25V4.5C8.25 4.2875 8.32188 4.10938 8.46562 3.96562C8.60938 3.82187 8.7875 3.75 9 3.75C9.2125 3.75 9.39062 3.82187 9.53438 3.96562C9.67812 4.10938 9.75 4.2875 9.75 4.5V8.25H13.5C13.7125 8.25 13.8906 8.32188 14.0344 8.46562C14.1781 8.60938 14.25 8.7875 14.25 9C14.25 9.2125 14.1781 9.39062 14.0344 9.53438C13.8906 9.67812 13.7125 9.75 13.5 9.75H9.75V13.5C9.75 13.7125 9.67812 13.8906 9.53438 14.0344C9.39062 14.1781 9.2125 14.25 9 14.25C8.7875 14.25 8.60938 14.1781 8.46562 14.0344C8.32188 13.8906 8.25 13.7125 8.25 13.5V9.75Z" fill="white" />
                                    </g>
                                </svg>
                                Create New Requisition
                            </button>
                        </div>
                        <RequisitionFilter />
                        <RequisitionList />
                    </div>
                </>
            }

            {
                toggle === 1 &&
                <CreateNewRequisition setToggle={setToggle} />
            }

        </div >
    );
}

export default Requisition;
