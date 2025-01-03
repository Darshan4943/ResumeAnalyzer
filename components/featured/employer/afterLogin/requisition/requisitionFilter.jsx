import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function RequisitionFilter({ filterData, setFilterData }) {
  const router = useRouter();
  const query = router.query;
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    if (query.content === "CreateNewRequisition") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [query.content]);

  const headings = [
    {
      heading: "Department",
      options: [
        "Assistant Manager",
        "Product Manager",
        "Devlopment",
        "It",
        "Developer",
      ],
    },
    {
      heading: "Location",
      options: ["Mumbai", "Pune", "Bangalore"],
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
    const selectedHeading = headings[index].heading;

    setFilterData((prev) => ({
      ...prev,
      [selectedHeading]: selectedOption,
    }));
  };

  const handleSearch = () => {
    console.log("Filters applied:", filterData);
  };

  return (
    <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px]">
      <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
        {headings.map((headingObj, index) => (
          <React.Fragment key={index}>
            <select
              className="w-[19.87%] bg-whites"
              onChange={(e) => handleHeadingChange(e, index)}
              value={filterData[headingObj.heading] || ""}
            >
              <option value="">{headingObj.heading}</option>
              {headingObj.options.map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {index < headings.length - 1 && (
              <div className="w-[1px] bg-[#E0E0E0] h-[24px]"></div>
            )}
          </React.Fragment>
        ))}
        <button
          className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[36px] text-[#FFFFFF] text-[14px] font-[600]"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default RequisitionFilter;
