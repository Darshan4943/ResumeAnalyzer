import React, { useEffect, useState } from "react";
import { AddIcon, Edit_icon } from "../../../utils/svg";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { setLocation } from "../../../Redux/actions";
import { dateSeter } from "../../../utils/middleware";
import MiniLoader from "../../../components/common/miniLoader";
import { PencilLineIcon } from "lucide-react";

const Index = () => {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);

  const [loading, setLoading] = useState(false);
  const [jobPost, setJobPost] = useState([]);
  const getData = () => {
    setLoading(true);
    axios
      .get(
        "https://freedygoservices.in/api/job/getByCreatedId/" +
        userDataGlobal._id
      )
      .then((res) => {
        setLoading(false);
        setJobPost(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (userDataGlobal._id) {
      getData();
    }
  }, [userDataGlobal]);

  const isLive = (item) => {
    var date1 = new Date(item.deadLine);
    var date2 = new Date();

    if (date2 <= date1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="job-list customMargins flex flex-col gap-[16px]  ">
      <div className="flex sm:flex-row flex-col gap-4 justify-between sm:items-center items-end w-full">
        <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-full ">
          Job Listings
        </span>
        <button
          className="text-[16px] font-medium text-[#FFFFFF] bg-[#06A9EF] px-[12px] py-[8px] rounded-[8px] flex flex-row items-center gap-[4px] min-w-[190px] "
          onClick={() => router.push("/jobs/create")}
        >
          <AddIcon color={"#fff"} /> Create New Job
        </button>
      </div>
      <div>
        <div className=" flex flex-row flex-wrap gap-x-[34px]  gap-y-[24px] ">
          {loading ? (
            <div className="w-full flex items-center justify-center h-[80vh]">
              <MiniLoader />
            </div>
          ) : (
            <>
              {jobPost.length > 0 ? (
                <>
                  {jobPost.map((item, index) => (
                    <div
                      key={index}
                      className="job-card sm:min-w-[300px] w-full  sm:max-w-[380px]"
                      onClick={() =>
                        router.push("/jobs/details?id=" + item?._id)
                      }
                    >
                      <div className="px-[16px] flex flex-row justify-between ">
                        <div className="flex flex-col gap-[2px]">
                          <span className="text-[16px] text-[#06A9EF] font-medium">
                            {item?.jobTitle}
                          </span>
                          <span className="text-[12px] text-[#646464] font-medium">
                            {item?.location?.join(",")}
                          </span>
                          <span className="text-[10px] text-[#2706EF] font-medium">
                            {item?.experiance}
                          </span>
                        </div>
                        <div className="flex flex-row gap-2">
                          {isLive(item) ? (
                            <div className="border border-[#0C8A0A] text-[#0C8A0A] text-[12px] font-medium px-[16px] bg-[#E2FFE1] h-[24px] rounded-[6px] flex items-center justify-center">
                              Live
                            </div>
                          ) : (
                            <div className="border border-[#C00000] text-[#C00000] text-[12px] font-medium px-[16px] bg-[#FFEBEB] h-[24px] rounded-[6px] flex items-center justify-center">
                              Closed
                            </div>
                          )}
                          <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent
                              router.push("/jobs/create?id=" + item?._id);
                            }}
                          >
                            <PencilLineIcon color="#646464" />
                          </div>
                        </div>
                      </div>
                      <div className="px-[16px] flex flex-row justify-around bg-[#EFFAFF] items-center">
                        <div className="text-[14px] font-semibold text-[#333333] w-[50%] text-left">
                          Total Applications
                        </div>
                        <div className="text-[36px] font-semibold text-[#333333] w-[50%] text-center">
                          {item?.applications?.length}
                        </div>
                      </div>
                      <div className="px-[16px] flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-semibold text-[#646464]">
                            Date posted
                          </span>
                          <span className="text-[12px] font-semibold text-[#333333]">
                            {dateSeter(item.createdAt)}
                          </span>
                        </div>
                        {item.deadLine &&
                          <div className="flex flex-col">
                            <span className="text-[12px] font-semibold text-[#646464]">
                              Due On
                            </span>

                            <span className="text-[12px] font-semibold text-[#333333]">
                              {dateSeter(item.deadLine)}
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full h-[40vh] flex justify-center items-center text-[24px] text-[#bebebe] font-medium">
                  No Job Posted Yet !
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
