import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Select from "react-select";

function RequisitionFilter({ filterData, setFilterData }) {
  const [attributes, setAttributes] = useState([]);

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

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/jobs/getDistinctJobTitlesAndLocations"
        );
        const data = response.data;
        setAttributes(data);
        setHeadings((prevHeadings) =>
          prevHeadings.map((item) => {
            if (item.heading === "Department") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.jobTitles])],
              };
            } else if (item.heading === "Location") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.locations])],
              };
            }
            return item;
          })
        );
      } catch (error) {
        console.error("Error fetching job attributes:", error);
      }
    };

    fetchAttributes();
  }, []);

  const [headings, setHeadings] = useState([
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
  ]);

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
      border: 'none', 
      boxShadow: 'none', 
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0, 
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none', 
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
                  ? { label: filterData[headingObj.heading], value: filterData[headingObj.heading] }
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
