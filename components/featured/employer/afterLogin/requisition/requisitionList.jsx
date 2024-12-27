import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { TablePagination } from '@mui/material';

function RequisitionList() {
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
        <div className="h-[calc(95vh-328px)] w-full bg-[#FFFFFF] overflow-hidden rounded-[6px]">
            <div className='w-full bg-[#E0F6FF] p-[16px] flex justify-between items-center'>
                {labels.map((req,index) => (
                    <div key={index} className='w-[12.84%] text-[#333333] text-center text-[16px] font-[600]'>{req}</div>
                ))}
            </div>
            <div className='overflow-scroll h-[66%]'>
                {requisition.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req, index) => (
                    <div key={index} className='w-full bg-[#FFFFFF] p-[16px] flex justify-between items-center border-b-[1px] border-solid border-[#DEDEDE]'>
                        <div className='w-[12.84%] text-[#333333] text-center text-[16px] font-[600] flex flex-col gap-[6px]'>
                            <div className='text-[#333333] text-center text-[14px] font-[500]'>{req.tittle1}</div>
                            <div className='text-[#646464] text-center text-[12px] font-[500]'>{req.tittle2}</div>
                        </div>
                        <div className='w-[12.84%] text-[#333333] text-center text-[16px] font-[600] flex flex-col gap-[6px]'>
                            <div className='text-[#333333] text-center text-[14px] font-[500]'>{req.Requestedby}</div>
                            <div className='text-[#646464] text-center text-[12px] font-[500]'>{req.date}</div>
                        </div>
                        <div className='w-[12.84%] text-[#333333] text-center text-[14px] font-[500]'>{req.Priority}</div>
                        <div className='w-[12.84%] text-[#333333] text-center text-[14px] font-[500]'>{req.Location}</div>
                        <div className='w-[12.84%] text-[#333333] text-center text-[14px] font-[500]'>{req.Budget}</div>
                        <div className='w-[12.84%] text-[#333333] text-center text-[14px] font-[500]'>{req.OpenPosition}</div>
                        <div className='w-[12.84%] text-[#333333] text-center text-[14px] font-[500]'>{req.Status}</div>
                    </div>
                ))}
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                className="h-[80px] rounded-b-[12px] flex items-center justify-end py-[12px] px-[16px] border-t bg-white sticky bottom-0 w-[100%]"
                count={requisition.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default RequisitionList
