import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { setJob } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

const InputBox = ({
  isCountrySet,
  setTotalpages,
  setTotalCount,
  limit,
  setJobData,
  item,
  filterType,
  onChange,
  filters,
  className,
  country,
  userSkills,
  page,
  setLoading,
  isOpen,
  onDropdownClick,
  id,
  setClear,
  clear
}) => {
  const { title, child, img } = item;
  const dispatch = useDispatch();
  const [localIsDropdownOpen, setLocalIsDropdownOpen] = useState(isOpen);
  const dropdownRef = useRef(null);

  const getFilterData = async () => {
    setLoading(true)
    const mappedFilters = {
      sortBy: filters.SortBy,
      jobType: filters.JobType,
      datePosted: filters.DatePosted,
      industryType: filters.Industry,
      salaries: filters.Salary,
      experience: filters.Experience,
      education: filters.Education,
      industryType: filters.IndustryType,
      jobMode: filters.JobMode,
    };

    try {
      // if (country) {
      const response = await axios.post(
        "https://jamblix.com/api/job/getFilterData",
        {
          requiredSkills: userSkills?.map((item) => item),
          country,
          ...mappedFilters,
        },
        {
          params: { page, limit },
        }
      );

      setJobData(response.data.data)
      setTotalCount(response.data.totalCount);
      setTotalpages(response.data.totalPages);
      // dispatch(setJob(response.data.data));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setLocalIsDropdownOpen(false);
      // }
    } catch (error) {
      console.error("Error fetching filter data", error);
    }
  };

  const handleClearFilters = () => {
    onChange(null, filterType, null);
    setLocalIsDropdownOpen(false);

  };


  useEffect(() => {
    if (isCountrySet) {
      getFilterData()
    }
  }, [clear]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLocalIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`rounded-md bg-white shadow-md flex justify-center items-center group relative ${className}`}
      onClick={() => {
        onDropdownClick(id);
        setLocalIsDropdownOpen(true);
      }}
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
        {localIsDropdownOpen && (
          <div
            ref={dropdownRef}
            className="dropdown mt-1 bg-[#fff] p-4 rounded-[6px] absolute bottom-100 left-[1px] w-[280px] gap-[10px] top-[46px] max-h-[270px] overflow-y-scroll"
            style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex flex-col gap-5 items-start">
              {child.length > 0 ? (
                <div className="flex gap-2 self-stretch flex-col items-start">
                  {child.map((itemValue, index) => {
                    const isObject = typeof itemValue === 'object';
                    return (
                      <div key={index} className="flex items-center gap-2">
                        {itemValue && itemValue !== '' &&
                          <input
                            type="checkbox"
                            className="rounded-md border h-[20px] w-[20px] border-blue bg-white object-cover"
                            onChange={(e) => onChange(e, filterType, isObject ? itemValue?.value : itemValue)}
                            checked={(filters[filterType] || []).includes(isObject ? itemValue?.value : itemValue)}
                          />
                        }
                        <div className="flex flex-col items-start">
                          <p className="font-montserrat font-medium text-[12px] text-black flex flex-col">
                            {isObject ? itemValue?.label : itemValue}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No options available</p>
              )}
              <div className="flex justify-between items-start w-full gap-2">
                <button
                  className="rounded-[8px] border border-blue w-[45%] text-black py-[8px]"
                  onClick={handleClearFilters}
                >
                  <p className="text-[12px] font-[700px] text-black">Clear</p>
                </button>
                <button
                  className="rounded-[8px] border border-blue bg-blue w-[45%] text-black py-[8px]"
                  onClick={getFilterData}
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
