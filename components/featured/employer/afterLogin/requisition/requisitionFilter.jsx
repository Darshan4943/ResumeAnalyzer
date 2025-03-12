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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [headings, setHeadings] = useState([
    {
      heading: "Department",
      displayName: "Job Title",
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
      displayName: "Location",
      options: ["Mumbai"],
    },
    {
      heading: "Status",
      displayName: " Status",
      options: ["Pending", "Approved"],
    },
    {
      heading: "Priority",
      displayName: " Priority",
      options: ["Yes", "No"],
    },
  ]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.161:2000/api/getRequisitionTitel/${userDataGlobal?._id}`
        );
        const data = response.data;

        if (data && Array.isArray(data)) {
          const departments = [
            ...new Set(data.map((item) => item.jobTitle.trim().toLowerCase())),
          ].map(
            (title) =>
              data.find((item) => item.jobTitle.trim().toLowerCase() === title)
                ?.jobTitle
          );

          const locations = [
            ...new Set(
              data.flatMap((item) =>
                item.location.map((loc) => loc.trim().toLowerCase())
              )
            ),
          ].map((loc) =>
            data
              .flatMap((item) => item.location)
              .find((l) => l.trim().toLowerCase() === loc)
          );

          const priorities = [
            ...new Set(
              data.map((item) => (item.isPriority ? "Yes" : "No").toLowerCase())
            ),
          ].map((priority) => (priority === "yes" ? "Yes" : "No"));

          setHeadings((prevHeadings) =>
            prevHeadings.map((heading) => {
              switch (heading.heading) {
                case "Department":
                  return { ...heading, options: departments };
                case "Location":
                  return { ...heading, options: locations };
                case "Priority":
                  return { ...heading, options: priorities };
                default:
                  return heading;
              }
            })
          );
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
    <>
      <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] hidden md:block">
        <div className="w-full flex items-center justify-between border border-[#D3D3D3] px-[12px] py-[10px] rounded-[6px]">
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
                placeholder={headingObj.displayName || headingObj.heading}
                isSearchable={true}
                noOptionsMessage={() => "No options available"}
                styles={customStyles}
              />
              {index < headings.length - 1 && (
                <div className="w-[1px] bg-[#E0E0E0] h-[24px]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] md:hidden flex justify-end">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center gap-2 text-[#333] font-medium px-3 py-2 rounded-[6px] transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-[#333]"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="9" y2="18" />
          </svg>
          Sort
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="w-[90%] max-w-[400px] bg-white rounded-[6px] p-[16px] shadow-lg">
            <h2 className="text-center text-[16px] font-bold mb-[10px]">
              Sort By
            </h2>

            <div className="flex flex-col gap-[14px]">
              {headings.map((headingObj, index) => (
                <Select
                  key={index}
                  className="w-full bg-whites"
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
              ))}
            </div>

            <div className="flex justify-between mt-[16px]">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray px-[16px] py-[8px] rounded-[6px] text-white text-[14px] font-[600]"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-[#06A9EF] px-[16px] py-[8px] rounded-[6px] text-white text-[14px] font-[600]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RequisitionFilter;
