import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LeftArow } from "../../../utils/svg";
import { dateSeter } from "../../../utils/middleware";
import Applications from "./applications";
import Details from "./details";
import MiniLoader from "../../../components/common/miniLoader";

const Index = () => {
  const router = useRouter();
  const { id, isUser } = router.query;
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const userDataGlobal = useSelector((state) => state.userData);
  const [jobPost, setJobPost] = useState(null);
  const [applications, setApplications] = useState([]);
  const getData = () => {
    setLoading(true);
    if (id) {
      axios
        .get("https://freedygoservices.in/api/job/getById/" + id)
        .then((res) => {
          setLoading(false);
          setJobPost(res.data.data);
          setApplications(res.data.applications);
        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
        });
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div
      className="min-h-[90vh] my-[16px] rounded-[16px] customMargins flex flex-col gap-[16px] "
      style={{ boxShadow: " 0px 1px 2px 0px #00000040" }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[70vh] ">
          <MiniLoader />
        </div>
      ) : (
        <>
          <div className="p-[24px] flex flex-row gap-[16px] items-center">
            <div
              className="h-[36px] w-[36px] rounded-[36px] border border-[#bebebe] flex items-center justify-center "
              onClick={() => router.back()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.1751 8.83345L8.5918 14.2501C8.75845 14.4168 8.84039 14.6112 8.83762 14.8335C8.83484 15.0557 8.75011 15.2501 8.58345 15.4168C8.41678 15.5779 8.22234 15.6598 8.00012 15.6626C7.77791 15.6654 7.58346 15.5835 7.4168 15.4168L0.583447 8.58345C0.494563 8.49456 0.432063 8.4029 0.395947 8.30845C0.359847 8.21401 0.341797 8.11124 0.341797 8.00012C0.341797 7.88901 0.359847 7.78623 0.395947 7.6918C0.432063 7.59735 0.494563 7.50568 0.583447 7.4168L7.4168 0.583447C7.5779 0.422347 7.77095 0.341797 7.99595 0.341797C8.22095 0.341797 8.41678 0.422347 8.58345 0.583447C8.75011 0.750114 8.83345 0.945947 8.83345 1.17095C8.83345 1.39595 8.75011 1.59178 8.58345 1.75845L3.1751 7.1668H15.1668C15.4057 7.1668 15.6043 7.24596 15.7626 7.4043C15.921 7.56263 16.0001 7.76124 16.0001 8.00012C16.0001 8.23901 15.921 8.43761 15.7626 8.59595C15.6043 8.75428 15.4057 8.83345 15.1668 8.83345H3.1751Z"
                  fill="#1C1B1F"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[8px]">
              <span className="text-[#333333] text-[20px] font-medium ">
                {jobPost?.jobTitle}
              </span>
            </div>
          </div>
          <div
            className="flex flex-row gap-[40px] px-[24px]"
            style={{ borderBottom: "1px solid #bebebe" }}
          >
            <div
              className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
              onClick={() => setTab(0)}
              style={{
                borderBottom: `4px solid ${tab == 0 ? "#06A9EF" : "white"}`,
              }}
            >
              Job Details
            </div>
            {isUser ? null : (
              <div
                className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
                onClick={() => setTab(1)}
                style={{
                  borderBottom: `4px solid ${tab == 1 ? "#06A9EF" : "white"}`,
                }}
              >
                Applicants
              </div>
            )}
          </div>
          {tab == 0 && (
            <Details applications={applications} jobPost={jobPost} />
          )}
          {tab == 1 && (
            <Applications applications={applications} jobPost={jobPost} />
          )}
        </>
      )}
    </div>
  );
};

export default Index;
