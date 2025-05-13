import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "./list";
import { AddIcon } from "../../../utils/svg";
import { useRouter } from "next/router";
import MiniLoader from "../../../components/common/miniLoader";

function ActivePlans() {
  const [miniLoading, setMiniloading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);
  const [userList, setUserList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getData = () => {
    axios
      .get("http://localhost:2000/api/activeSubscription", {
        params: { page: currentPage, limit },
      })
      .then((res) => {


        setUserList(res.data.users.results);
        setTotalCount(res.data.totalCount);
        setData(res.data.users);
        setTotalpages(res.data.totalPages);
        setLimit(res?.data?.users?.current?.limit);
        setCurrentPage(res?.data?.users?.current?.page);


        setLoading(false);
        setTimeout(() => {
          setMiniloading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMiniloading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [currentPage, limit]);
  return (
    <>
      {/* { console.log("limit",currentPage)} */}
      <div className="customMargins py-[24px] flex flex-col gap-[16px]">
        <div className="flex w-full flex-row justify-between items-center">
          <span className="text-[24px] text-[#333333] font-semibold">
            Active List
          </span>
        </div>
        <div
          className="min-h-[65vh]  rounded-[16px] customMargins flex flex-col gap-[16px] py-[24px] w-full "
          style={{ boxShadow: " 0px 1px 2px 0px #00000040" }}
        >
          <div className="flex flex-row w-full justify-between items-center px-[16px]">
            <span className="text-[18px] text-[#333333] font-medium">
              Total Active - {totalCount}
              {/* Total Recruiters - {data.users ? data.users.results.length : 0} */}
            </span>
            <div className="rounded-[30px] py-2 px-3 flex gap-2 bg-[#E9EEF6] w-[336px]  items-center h-[40px] sm:min-w-[138px] min-w-[60%]  ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.499 15.5L18.999 19L15.499 15.5ZM4.99902 11C4.99902 11.7879 5.15422 12.5681 5.45575 13.2961C5.75727 14.0241 6.19923 14.6855 6.75638 15.2426C7.31353 15.7998 7.97497 16.2417 8.70292 16.5433C9.43088 16.8448 10.2111 17 10.999 17C11.787 17 12.5672 16.8448 13.2951 16.5433C14.0231 16.2417 14.6845 15.7998 15.2417 15.2426C15.7988 14.6855 16.2408 14.0241 16.5423 13.2961C16.8438 12.5681 16.999 11.7879 16.999 11C16.999 9.4087 16.3669 7.88258 15.2417 6.75736C14.1164 5.63214 12.5903 5 10.999 5C9.40772 5 7.8816 5.63214 6.75638 6.75736C5.63116 7.88258 4.99902 9.4087 4.99902 11V11Z"
                  stroke="#1F1F1F"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                // onChange={(e) => changeHandler(e.target.value)}
                className="w-full bg-[#E9EEF6] text-[#333333]"
                type="text"
                placeholder="Search "
              />
            </div>
          </div>
          {loading ? (
            <div className="flex w-full items-center justify-center h-[70vh]">
              <MiniLoader />
            </div>
          ) : (
            <List
              miniLoading={miniLoading}
              data={data}
              currentPage={currentPage}
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              userList={userList}
              setSelectedCandidate={setSelectedCandidate}
              selectedCandidate={selectedCandidate}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ActivePlans;
