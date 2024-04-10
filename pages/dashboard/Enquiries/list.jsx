import React from "react";
import { dateSeter } from "../../../utils/middleware";
import { useRouter } from "next/router";
import { plans } from "../../../utils/data";

const List = ({ list }) => {
  const router = useRouter();
  return (
    <>
      {list?.length > 0 ? (
        <table className="w-full">
          <thead className="w-full">
            <tr className="w-full bg-[#06A9EF] flex flex-row justify-between items-center px-[24px] py-[12px]">
              <th className="text-[16px] font-semibold text-white w-[5%] text-center ">
                Sr.no
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%] text-center">
                Enquiry At
              </th>
              <th className="text-[16px] font-semibold text-white w-[25%] text-left ">
                Email Address
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%] text-center ">
                Role
              </th>

              <th className="text-[16px] font-semibold text-white w-[15%]">
                Plan
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%]">
                Price
              </th>
              <th className="text-[16px] font-semibold text-white w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => (
              <tr
                className="w-full  flex flex-row justify-between items-center px-[24px] py-[16px] border-b-[1px] border-[#bebebe]"
                key={index}
              >
                <th className="text-[16px] font-semibold text-[#333333] w-[5%] text-center ">
                  {index + 1}
                </th>
                <th className="text-[14px] font-semibold text-[#333333] w-[15%] text-center">
                  {dateSeter(item.createdAt)}
                </th>
                <th className="  w-[25%] flex flex-row items-center gap-[8px]">
                  <span className="text-[14px] font-semibold text-[#333333] text-left">
                    {item?.userData?.email}
                  </span>
                </th>
                <th
                  className="text-[14px] font-semibold text-[#333333] w-[15%]"
                  style={{ textTransform: "capitalize" }}
                >
                  {item?.userData?.role
                    ? item?.userData?.role == "user"
                      ? "Candidate"
                      : item?.userData?.role
                    : "-"}
                </th>

                <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                  {item?.plan}
                </th>
                <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                  {
                    plans.find(
                      (data) => data.duration + " " + data.limit == item.plan
                    )?.price
                  }
                </th>
                <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                  <button
                    className={`bg-[#06a9ef] text-white py-[8px] px-[16px] rounded-[8px]`}
                    onClick={() =>
                      router.push(`/dashboard/Enquiries/details?id=${item._id}`)
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
