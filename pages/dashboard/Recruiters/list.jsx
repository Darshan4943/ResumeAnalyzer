import React from "react";
import { dateSeter } from "../../../utils/middleware";
import { useRouter } from "next/router";
import MiniLoader from "../../../components/common/mini-loader";

const List = ({ miniLoading, data, page, setPage, userList, setLimit, selectedCandidate, setSelectedCandidate, totalPages, currentPage, limit, setCurrentPage }) => {
  const router = useRouter();

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };
  const handleChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1)

  };

  return (
    <>
      {/* {console.log(2222,userList)} */}
      {userList?.length > 0 ? (
        <div className="w-full h-[56vh] overflow-auto relative">
          <table className="w-full">
            <thead className="w-full sticky top-0">
              <tr className="w-full bg-[#06A9EF] flex flex-row justify-between items-center px-[24px] py-[12px]">
                {/* <th className="w-[5%] flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-[18px] w-[18px]"
                    checked={selectedCandidate.length > 0}
                    onChange={() => {
                      if (selectedCandidate.length > 0) {
                        setSelectedCandidate([]);
                      } else {
                        setSelectedCandidate(userList);
                      }
                    }}
                  />
                </th> */}
                <th className="text-[16px] font-semibold text-white w-[25%] text-left ">
                  Name
                </th>
                <th className="text-[16px] font-semibold text-white w-[15%] text-center ">
                  Mobile Number
                </th>
                <th className="text-[16px] font-semibold text-white w-[15%] text-center ">
                  Location
                </th>
                <th className="text-[16px] font-semibold text-white w-[15%]">
                  Created At
                </th>
                <th className="text-[16px] font-semibold text-white w-[15%]">
                  Active Plan
                </th>
                {/* <th className="text-[16px] font-semibold text-white w-[15%]">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {userList?.map((item, index) => (
                <tr
                  className="w-full  flex flex-row justify-between items-center px-[24px] py-[16px] border-b-[1px] border-[#bebebe]"
                  key={index}
                >
                  {/* <th className="w-[5%] flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-[14px] w-[14px]"
                      checked={selectedCandidate.find(
                        (data) => data._id == item._id
                      )}
                      onChange={() => {
                        if (
                          selectedCandidate.find((data) => data._id == item._id)
                        ) {
                          setSelectedCandidate(
                            selectedCandidate.filter(
                              (data) => data._id != item._id
                            )
                          );
                        } else {
                          setSelectedCandidate([...selectedCandidate, item]);
                        }
                      }}
                    />
                  </th> */}

                  <th className="  w-[25%] flex flex-row items-center gap-[8px]">
                    <img
                      src={
                        item.profilePicture
                          ? item.profilePicture
                          : "/images/services/profile.png"
                      }
                      alt="Selected File"
                      className="w-[40px] h-[40px] rounded-[50%] object-cover"
                    />
                    <span className="text-[14px] font-semibold text-[#333333] text-left">
                      {item.firstName + " " + item.lastName}
                    </span>
                  </th>
                  <th className="text-[14px] font-normal text-[#333333] w-[15%] text-center ">
                    {item?.mobileNo}
                  </th>
                  <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                    {item.location ? item.location : "-"}
                  </th>
                  <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                    {dateSeter(item.createdAt)}
                  </th>
                  <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                    {item?.subscription ? item.subscription?.plan : "-"}
                  </th>
                  {/* <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                    <button
                      className={`${item.subscription
                        ? "bg-[#E9EEF6] text-[#bebebe] "
                        : "bg-[#06a9ef] text-white"
                        } py-[8px] px-[16px] rounded-[8px]`}
                      onClick={() =>
                        router.push(
                          `/dashboard/Recruiters/plans?recruiterid=${item._id}`
                        )
                      }
                    >
                      Active Plan
                    </button>
                  </th> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full text-[24px] text-[#bebebe] font-semibold h-[40vh]">
          No Recruiter Available !
        </div>
      )}

      <div className="px-[16px] w-full justify-between flex ">
        <div className="flex items-center gap-4">
          <p className="text-[14px] text-[#646464] font-600">View</p>
          <div className="flex gap-[8px] items-center">
            {/* <p className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600">{limit}</p> */}


            <select
              value={limit}
              onChange={handleChange}
              className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>



          </div>
          <p className="text-[14px] text-[#646464] font-[600]">Applicants per page</p>
        </div>

        <div className="flex items-center" style={{ radious: '0px 0px 16px 16px' }} >

          <div className="mr-4">{miniLoading && <MiniLoader />}</div>

          <p className="text-[14px] text-[#646464] font-[500]">pages<span className="text-[#333] px-[10px] font-[600]" >{currentPage}</span> of <span className="text-[#333] px-[10px]  font-[600]">{totalPages}</span></p>
          <button disabled={data?.previous && !data?.previous}>
            <svg onClick={prevPage} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2529_10517)">
                <path d="M15 6L9 12L15 18" stroke={data?.previous ? "#333333" : "#646464"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_2529_10517">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button disabled={!data?.next}>
            <svg width="25" height="24"
              onClick={nextPage} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2529_10530)">
                <path d="M9.375 6L15.625 12L9.375 18" stroke={data?.next ? "#333333" : "#646464"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
    </>
  );
};

export default List;
