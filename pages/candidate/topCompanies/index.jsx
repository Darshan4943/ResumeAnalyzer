import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const topCompam = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://192.168.1.161:2000/api/getTopcompanies"
      );
      const data = response.data;

      if (Array.isArray(data)) {
        setCompany(data);
      } else {
        setCompany([]);
      }
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    topCompam();
  }, []);

  return (
    <>
      <div className="customMargins  w-full flex flex-col gap-5 pt-6 pb-6">
        <span className="text-[18px] font-[500] text-[#000000]">
          Top Companies
        </span>
        <div className="flex scr700:flex-row flex-col gap-6 w-full">
          <div className="flex w-full justify-between gap-y-5 flex-wrap">
            {company?.map((i, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/jobs/candidate/aboutcompanies?id=${i._id}`);
               
                }}
                className="w-full lg:w-[49.05%] min-w-[268px] rounded-[10px] bg-[#FFFFFF] py-3 px-4 flex gap-[14px]"
              >
                <img
                  src={i.companyLogo}
                  alt={`${i.name} logo`}
                  className="min-h-[56px] min-w-[56px] max-w-[56px] max-h-[56px] rounded-[6px] object-contain"
                />
                <div className="flex flex-col gap-[6px]">
                  <span className="text-[14px] font-[500] text-[#333333]">
                    {i.name}
                  </span>
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0.5L8.5716 5.33688H13.6574L9.5429 8.32624L11.1145 13.1631L7 10.1738L2.8855 13.1631L4.4571 8.32624L0.342604 5.33688H5.4284L7 0.5Z"
                        fill="#F4D224"
                      />
                    </svg>
                    <span className="flex items-center text-[12px] font-[500] text-[#A1A1A1]">
                      {i.averageRating}
                    </span>
                    <div className="flex items-center w-[1px] h-[12px] bg-[#C5C5C5]"></div>
                    <span className="flex items-center text-[12px] font-[500] text-[#A1A1A1]">
                      {i.totalReviews} Reviews
                    </span>
                  </div>
                  <div className="py-[2px] px-[6px] border-[0.5px] border-solid border-[#DEDEDE] text-[10px] font-[400] text-[#333333] rounded-[12px]">
                    {/* {i.about} */}IT Services & Consulting
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center ">
            <img
              className=" sm:min-w-[357px] sm:max-w-[357px] h-[396px]"
              src="/images/topcomp.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Index;
