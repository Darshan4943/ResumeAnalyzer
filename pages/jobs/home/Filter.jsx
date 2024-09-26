import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { setJob } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Filter({
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
  clear,
  
}) {
  const { title, child, img } = item;
  const dispatch = useDispatch();
  const [localIsDropdownOpen, setLocalIsDropdownOpen] = useState(isOpen);
  const dropdownRef = useRef(null);

 
  const handleClearFilters = () => {
    onChange(null, filterType, null);
    setLocalIsDropdownOpen(false);

  };




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
    <div className="flex flex-col col-span-3 rounded-[8px]   w-[280px] ">
      <div className="flex justify-between  px-4 items-start  ">
      {title}
      </div>

      {/* <div className="h-[996px] overflow-hidden overflow-y-scroll "> */}
        <div className="flex flex-col items-start justify-center p-4 gap-2 ">
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


          <div className="border-b border-gray w-full h-[10px]"></div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Filter;
