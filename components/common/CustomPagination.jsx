import React, { useState } from 'react';
import MiniLoader from './mini-loader';

function CustomPagination({ setPage,page, setLimit, totalPages, limit, setMiniloading, miniLoading,title,isBackground,defaultLimit }) {

    const [currentPage, setCurrentPage] = useState(page);

    const nextPage = (e) => {
        e.stopPropagation();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setPage(currentPage + 1);
        }
    };

    const prevPage = (e) => {
        e.stopPropagation();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPage(currentPage - 1);
        }
    };
    const handleChange = (e) => {

        setLimit(parseInt(e.target.value));
        setPage(1);
        setCurrentPage(1);
    };


    return (
        <div style={{
            ...(isBackground && {
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              borderTop: "1px solid #D3D3D3",
              backgroundColor: "white",
            }),
          }}
          
           className="sm:px-[16px] px-0 w-full justify-between flex  py-4 ">
            <div className="flex items-center sm:gap-4 gap-2">
                <p className="text-[14px] text-[#646464] font-600">View</p>
                <div className="flex gap-[8px] items-center">
                    {/* <p className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600">{limit}</p> */}

                    <select
                        value={limit}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleChange(e)}
                        className="text-[14px] px-[16px] py-[10px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600 outline-none"
                    >
                        <option value={defaultLimit ? defaultLimit : "10"}>{defaultLimit ? defaultLimit : "10"}</option>
                        {/* <option value="10">10</option> */}
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <p className="text-[14px] sm:block hidden text-[#646464] font-[600]">
                    {title} per page
                </p>
            </div>

            <div
                className="flex items-center"
                style={{ radious: "0px 0px 16px 16px" }}
            >
                <div className="mr-4">{miniLoading && <MiniLoader />}</div>

                <p className="text-[14px] text-[#646464] font-[500]">
                    pages
                    <span className="text-[#333] px-[10px] font-[600]">
                        {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="text-[#333] px-[10px]  font-[600]">
                        {totalPages}
                    </span>
                </p>
                <button disabled={currentPage === 1}>
                    <svg
                        onClick={(e) => prevPage(e)}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_2529_10517)">
                            <path
                                d="M15 6L9 12L15 18"
                                stroke={currentPage !== 1 ? "#333333" : "#646464"}
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_2529_10517">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <button disabled={currentPage === totalPages}>
                    <svg
                        width="25"
                        height="24"
                        onClick={(e) => nextPage(e)}
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_2529_10530)">
                            <path
                                d="M9.375 6L15.625 12L9.375 18"
                                stroke={currentPage !== totalPages ? "#333333" : "#646464"}
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_2529_10530">
                                <rect width="25" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CustomPagination;
