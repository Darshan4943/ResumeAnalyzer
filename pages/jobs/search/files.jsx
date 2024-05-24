import React, { useEffect, useState } from "react";
import { PDFSvg, SearchIcon } from "../../../utils/svg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import MiniLoader from "../../../components/common/miniLoader";

const Files = ({ selected, setSelected }) => {
  const [loading, setLoading] = useState();
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jamblix.com/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setResumeList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);
  return (
    <>
      <div className="rounded-[16px] border bg-[#F9F9F9] border-[#DEDEDE] p-[16px] flex flex-col gap-[16px]">
        <div className="flex flex-row items-center justify-between gap-[12px] ">
          <div className="flex flex-row items-center gap-[12px] cursor-pointer ">
            <div className="flex flex-row gap-[8px] py-[8px] px-[12px] h-[40px] bg-[#fff] border border-[#DEDEDE] rounded-[30px] items-center">
              <SearchIcon />
              <input
                type="text"
                className="bg-[#fff] text-[#333333] placeholder:text-[#333333] w-[80%]"
                placeholder="Search"
                // onChange={(e) => searchHandler(e.target.value)}
              />
            </div>
          </div>
          <span className="text-[14px] text-[#808080] min-w-[75px] flex justify-end">
            {resumeList.length}
            {" Items"}
          </span>
        </div>
        <div className="border-b-[1px] border-[#DEDEDE] w-full h-[1px]"></div>
        <div className="flex flex-row flex-wrap gap-4   py-4  h-[247px] overflow-y-auto bg-[#FFFFFF] border-[1px] border-[#DEDEDE] rounded-[16px] p-[8px]">
          {loading ? (
            <div className="w-full ">
              <MiniLoader />
            </div>
          ) : resumeList?.length > 0 ? (
            resumeList?.map((item, index) => (
              <>
                <div
                  key={index}
                  onClick={() => setSelected(item)}
                  className={`w-[108px] flex flex-col gap-[6px] relative group items-center py-4 h-fit rounded-[8px] cursor-pointer ${
                    selected._id == item._id && "bg-[#effaff]"
                  } `}
                >
                  <div className="relative">
                    <PDFSvg />
                  </div>

                  <span className="md:text-[14px] text-[12px] text-[#333333] text-center break-all">
                    {item.fileName}.pdf
                  </span>
                  <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-5px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                    {item.fileName}
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="text-[20px] font-medium text-center w-full py-[24px]">
              No Resume Available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;
