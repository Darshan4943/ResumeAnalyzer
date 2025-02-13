import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";

function RequisitionFilter({ filterData, setFilterData }) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
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

  const [headings, setHeadings] = useState([
    {
      heading: "Department",
      options: [
        "Assistant Manager",
        "Product Manager",
        "Development",
        "IT",
        "Developer",
      ],
    },
    {
      heading: "Location",
      options: ["Mumbai"],
    },
    {
      heading: "Status",
      options: ["Pending", "Approved"],
    },
    {
      heading: "Priority",
      options: ["Yes", "No"],
    },
  ]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/getRequisitionTitel/${userDataGlobal?._id}`
        );
        const data = response.data;
 
        if (data && Array.isArray(data)) {
          const departments = [
            ...new Set(data.map((item) => item.jobTitle.trim().toLowerCase())),
          ].map((title) => data.find((item) => item.jobTitle.trim().toLowerCase() === title)?.jobTitle);
  
         const locations = [
            ...new Set(
              data.flatMap((item) => item.location.map((loc) => loc.trim().toLowerCase()))
            ),
          ].map((loc) => data.flatMap((item) => item.location).find((l) => l.trim().toLowerCase() === loc));
  
          const priorities = [
            ...new Set(data.map((item) => (item.isPriority ? "Yes" : "No").toLowerCase())),
          ].map((priority) => (priority === "yes" ? "Yes" : "No"));
  
          setHeadings((prevHeadings) => [
            {
              ...prevHeadings[0],
              options: departments,
            },
            {
              ...prevHeadings[1],
              options: locations,
            },
            {
              ...prevHeadings[2],
              options: ["Pending", "Approved"],
            },
            {
              ...prevHeadings[3],
              options: priorities,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching job attributes:", error);
      }
    };
  
    if (userDataGlobal?._id) {
      fetchAttributes();
    }
  }, [userDataGlobal?._id]);
  

  const handleHeadingChange = (selectedOption, index) => {
    const selectedHeading = headings[index].heading;

    setFilterData((prev) => ({
      ...prev,
      [selectedHeading]: selectedOption.value,
    }));
  };

  const handleSearch = () => {
    console.log("Filters applied:", filterData);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px]">
      <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
        {headings.map((headingObj, index) => (
          <React.Fragment key={index}>
            <Select
              className="w-[19.87%] bg-whites"
              options={headingObj.options.map((option) => ({
                value: option,
                label: option,
              }))}
              onChange={(selectedOption) =>
                handleHeadingChange(selectedOption, index)
              }
              value={
                filterData[headingObj.heading]
                  ? {
                      label: filterData[headingObj.heading],
                      value: filterData[headingObj.heading],
                    }
                  : null
              }
              placeholder={headingObj.heading}
              isSearchable={true}
              noOptionsMessage={() => "No options available"}
              styles={customStyles}
            />
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
