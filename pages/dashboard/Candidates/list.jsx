import React from "react";
import { dateSeter } from "../../../utils/middleware";
import { useRouter } from "next/router";

const List = ({ userList, selectedCandidate, setSelectedCandidate }) => {
  const router = useRouter();
  return (
    <>
      {userList?.length > 0 ? (
        <table className="w-full">
          <thead className="w-full">
            <tr className="w-full bg-[#06A9EF] flex flex-row justify-between items-center px-[24px] py-[12px]">
              <th className="w-[5%] flex items-center justify-center">
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
              </th>
              <th className="text-[16px] font-semibold text-white w-[25%] text-left ">
                Email
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%]">
                Created At
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%]">
                Active Plan
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((item, index) => (
              <tr
                className="w-full  flex flex-row justify-between items-center px-[24px] py-[16px] border-b-[1px] border-[#bebebe]"
                key={index}
              >
                <th className="w-[5%] flex items-center justify-center">
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
                </th>

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
                    {item.email }
                  </span>
                </th>
                <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                  {dateSeter(item.createdAt)}
                </th>
                <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                 {item?.subscription ? item.subscription?.plan : '-'}
                </th>
                <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                  <button
                    className={`${
                      item.subscription
                        ? "bg-[#E9EEF6] text-[#bebebe] "
                        : "bg-[#06a9ef] text-white"
                    } py-[8px] px-[16px] rounded-[8px]`}
                    onClick={() =>
                      router.push(
                        `/dashboard/Candidates/plans?recruiterid=${item._id}&role=${item.role}`
                      )
                    }
                  >
                    Active Plan
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center w-full text-[24px] text-[#bebebe] font-semibold h-[40vh]">
          No Recruiter Available !
        </div>
      )}
    </>
  );
};

export default List;
