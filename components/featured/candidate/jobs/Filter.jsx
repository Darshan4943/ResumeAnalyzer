import React from "react";

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
        <div className="flex flex-col items-start justify-center gap-2">
          {child.map((itemValue, index) => {
            const isObject = typeof itemValue === "object";
            return (
              <div key={index} className="flex items-center gap-2">
                {itemValue && itemValue !== "" && (
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
                )}
                <p className="font-montserrat font-normal text-[14px] text-black flex flex-col">
                  {isObject ? itemValue?.label : itemValue}
                </p>
              </div>
            );
          })}
        </div>
      )}


      {!isHidden && (
        <div className="text-[14px] font-[600] text-blue pl-6 -mt-1">View More</div>
      )}
      <div className="border-b border-[#AFAFAF80] w-full h-[1px]"></div>
    </div>
  );
}

export default Filter;
