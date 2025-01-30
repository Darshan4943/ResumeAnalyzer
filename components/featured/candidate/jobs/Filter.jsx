import React, { useState } from "react";

function Filter({
  item,
  filterType,
  onChange,
  filters,
  id,
  isHidden,
  toggleVisibility,
}) {
  const { title, child } = item;
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const filteredChildren = child.filter((itemValue) => {
    const value = typeof itemValue === "object" ? itemValue.label : itemValue;
    return value.toLowerCase().includes(searchQuery.toLowerCase());
  });


  const childrenToDisplay = isExpanded
    ? filteredChildren
    : filteredChildren.slice(0, 3);

  return (
    <div className="flex flex-col col-span-3 rounded-[8px] gap-3">
      <div className="flex justify-between items-start text-[16px] font-[600]">
        {title}
        <svg
          onClick={() => toggleVisibility(id)}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <g mask="url(#mask0_6191_65439)">
            <path
              d={
                !isHidden
                  ? "M11.9998 9.3225C11.8793 9.3225 11.7671 9.3417 11.6633 9.3802C11.5594 9.4187 11.4607 9.4847 11.367 9.5782L6.87276 14.0725C6.73442 14.211 6.66359 14.3851 6.66026 14.5947C6.65709 14.8042 6.72792 14.9815 6.87276 15.1265C7.01776 15.2713 7.19342 15.3438 7.39976 15.3438C7.60609 15.3438 7.78176 15.2713 7.92676 15.1265L11.9998 11.0532L16.0728 15.1265C16.2113 15.2648 16.3853 15.3357 16.595 15.339C16.8045 15.3422 16.9818 15.2713 17.1268 15.1265C17.2716 14.9815 17.344 14.8058 17.344 14.5995C17.344 14.3932 17.2716 14.2175 17.1268 14.0725L12.6325 9.5782C12.5388 9.4847 12.4401 9.4187 12.3363 9.3802C12.2324 9.3417 12.1203 9.3225 11.9998 9.3225Z"
                  : "M11.9998 14.6775C11.8793 14.6775 11.7671 14.6583 11.6633 14.6198C11.5594 14.5813 11.4607 14.5153 11.367 14.4218L6.87276 9.9275C6.73442 9.789 6.66359 9.61492 6.66026 9.40525C6.65709 9.19575 6.72792 9.0185 6.87276 8.8735C7.01776 8.72867 7.19342 8.65625 7.39976 8.65625C7.60609 8.65625 7.78176 8.72867 7.92676 8.8735L11.9998 12.9468L16.0728 8.8735C16.2113 8.73517 16.3853 8.66433 16.595 8.661C16.8045 8.65783 16.9818 8.72867 17.1268 8.8735C17.2716 9.0185 17.344 9.19417 17.344 9.4005C17.344 9.60683 17.2716 9.7825 17.1268 9.9275L12.6325 14.4218C12.5388 14.5153 12.4401 14.5813 12.3363 14.6198C12.2324 14.6583 12.1203 14.6775 11.9998 14.6775Z"
              }
              fill="#333333"
            />
          </g>
        </svg>
      </div>

      {!isHidden && (
        <>
          {isExpanded &&
            <div className="flex gap-2 border border-[#AFAFAF80] rounded-[30px] px-2 py-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g mask="url(#mask0_6706_103337)">
                  <path d="M9.5215 15.6153C7.81383 15.6153 6.36767 15.023 5.183 13.8385C3.9985 12.6538 3.40625 11.2077 3.40625 9.50002C3.40625 7.79235 3.9985 6.34618 5.183 5.16152C6.36767 3.97702 7.81383 3.38477 9.5215 3.38477C11.2292 3.38477 12.6753 3.97702 13.86 5.16152C15.0445 6.34618 15.6367 7.79235 15.6367 9.50002C15.6367 10.2142 15.5169 10.8963 15.2772 11.5463C15.0374 12.1963 14.7175 12.7616 14.3175 13.2423L20.0715 18.9963C20.21 19.1346 20.2808 19.3086 20.284 19.5183C20.2872 19.7279 20.2163 19.9052 20.0715 20.05C19.9267 20.1948 19.751 20.2673 19.5445 20.2673C19.3382 20.2673 19.1626 20.1948 19.0177 20.05L13.2638 14.296C12.7638 14.7088 12.1887 15.0319 11.5387 15.2653C10.8887 15.4986 10.2163 15.6153 9.5215 15.6153ZM9.5215 14.1155C10.81 14.1155 11.9013 13.6683 12.7955 12.774C13.6898 11.8798 14.137 10.7885 14.137 9.50002C14.137 8.21152 13.6898 7.12018 12.7955 6.22601C11.9013 5.33168 10.81 4.88452 9.5215 4.88452C8.233 4.88452 7.14167 5.33168 6.2475 6.22601C5.35317 7.12018 4.906 8.21152 4.906 9.50002C4.906 10.7885 5.35317 11.8798 6.2475 12.774C7.14167 13.6683 8.233 14.1155 9.5215 14.1155Z" fill="#333333" fill-opacity="0.5" />
                </g>
              </svg>

              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" w-full text-[14px]"
              />
            </div>
          }
        
          <div className="flex flex-col items-start  gap-2 max-h-[140px] overflow-y-auto  ">
            {childrenToDisplay.map((itemValue, index) => {
              const isObject = typeof itemValue === "object";
              return (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[16px] w-[16px] border-blue bg-white object-cover"
                    onChange={(e) =>
                      onChange(
                        e,
                        filterType,
                        isObject ? itemValue?.value : itemValue
                      )
                    }
                    checked={(filters[filterType] || []).includes(
                      isObject ? itemValue?.value : itemValue
                    )}
                  />
                  <p className="font-montserrat font-normal text-[14px] text-black">
                    {isObject ? itemValue?.label : itemValue}
                  </p>
                </div>
              );
            })}
          </div>

        
          {filteredChildren.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[14px] font-[600] text-blue pl-6 -mt-1"
            >
              {isExpanded ? "Show Less" : "View More"}
            </button>
          )}
        </>
      )}

      <div className="border-b border-[#AFAFAF80] w-full h-[1px]"></div>
    </div>
  );
}

export default Filter;
