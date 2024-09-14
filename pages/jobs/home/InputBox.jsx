import React, { useState } from "react";
import axios from "axios";
import { setJob } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";

const InputBox = ({
  item,
  filterType,
  onChange,
  filters,
  className,
  country,
  userSkills,
  page,
  setLoading,
}) => {
  const { title, child, img } = item;
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const getFilterData = async () => {
    setLoading(true);
    const mappedFilters = {
      sortBy: filters.sortby,
      jobType: filters.jobtype,
      datePosted: filters.dateposted,
      industryType: filters.industry,
      salaries: filters.salary,
      experience: filters.experience,
      education: filters.education,
      industryType: filters.industryType,
      jobMode: filters.jobmode,
    };

    if (country) {
      await axios
        .post(
          "http://localhost:2000/api/job/getFilterData",
          {
            requiredSkills: userSkills?.map((item) => item),
            country,
            ...mappedFilters,
          },
          {
            params: { page },
          }
        )
        .then((res) => {
          console.log("data11112", res.data);
          setLoading(false);
          dispatch(setJob(res.data));
          // Close the dropdown after receiving the response
          setIsDropdownOpen(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(11, err);
        });
    }
  };

  const handleClearFilters = () => {
    onChange(filterType, []);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`rounded-md bg-white shadow-md flex justify-center items-center group relative ${className}`}
      onMouseEnter={() => setIsDropdownOpen(true)} // Open the dropdown on hover
      onMouseLeave={() => setIsDropdownOpen(false)} // Close the dropdown when not hovering
    >
      <div className="text-[#333] justify-center items-center text-[14px] flex font-medium w-auto px-4 py-3 gap-1">
        <div className="transition-transform transform flex items-center justify-center gap-1">
          {title}
          <img
            src={img}
            className="h-[20px] w-[20px] object-cover"
            alt="icon"
          />
        </div>
        {isDropdownOpen && (
          <div
            className="dropdown mt-1 bg-[#fff] p-4 rounded-[6px] absolute bottom-100 left-[1px] w-[340px] gap-[10px] top-[46px]"
            style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex flex-col gap-5 items-start">
              <div className="flex gap-2 self-stretch flex-col items-start">
                {child.map((itemValue, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded-md border h-[20px] w-[20px] border-blue bg-white object-cover"
                      onChange={(e) => onChange(e, filterType, itemValue)}
                    //   checked={(filters[filterType] || []).includes(itemValue)}
                    checked={(filters[filterType] || []).includes(itemValue)}
                    />
                    <div className="flex flex-col items-start">
                      <p className="font-montserrat font-medium text-[12px] text-black flex flex-col">
                        {itemValue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-start w-full gap-2">
                <button
                  className="rounded-[8px] border border-blue w-[49%] text-black py-[12px]"
                  onClick={handleClearFilters} // Clear filters on click
                >
                  <p className="text-[12px] font-[700px] text-black">Clear</p>
                </button>
                <button
                  className="rounded-[8px] border border-blue bg-blue w-[49%] text-black py-[12px]"
                  onClick={getFilterData} // Fetch data on click
                >
                  <p className="text-[12px] font-[700px] text-white">Apply</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBox;
