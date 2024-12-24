import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

function RequisitionFilter() {

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
    return (
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px]">
            <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
                {headings.map((headingObj, index) => (
                    <>
                        <select className=" w-[19.87%] bg-whites" onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
                            <option value=""> {headingObj.heading}</option>
                            {headingObj.options.map((option, optIndex) => (
                                <option key={optIndex} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="w-[1px] bg-[#E0E0E0] h-[24px]"></div>
                    </>
                ))}
                <button className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[36px] text-[#FFFFFF] text-[14px] font-[600]">Search</button>
            </div>
        </div>
    )
}

export default RequisitionFilter
