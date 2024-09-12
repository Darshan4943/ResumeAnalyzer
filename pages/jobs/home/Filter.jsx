import React, { useState, useEffect } from "react";
import axios from "axios";
import { setJob } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Filter({
  jobtypeData,
  setFilters,
  handleCheckboxChange,
  filters,
  page,
  userSkills,
  country,
  setLoading,
}) {
  console.log("j", jobtypeData);
  let posted = ["Anytime", "Past month", "Past week", " Past 24 hrs"];
  const dispatch = useDispatch();
  const getFilterRespData = async () => {
    if (country) {
      setLoading(true);
      await axios
        .post(
          "http://localhost:2000/api/job/getFilterData",
          {
            requiredSkills: userSkills?.map((item) => item),
            country,
            ...filters,
          },
          {
            params: { page },
          }
        )
        .then((res) => {
          console.log("data1111", res.data);
          setLoading(false);
          dispatch(setJob(res.data));
        })
        .catch((err) => {
          console.log(11, err);
        });
    }
  };

  useEffect(() => {
    getFilterRespData();
  }, [filters]);
  return (
    <div className="flex flex-col col-span-3 rounded-[8px] h-[70vh] bg-white shadow-md ">
      <div className="flex justify-between  p-4 bg-white shadow-md  items-start rounded-t-[8px] ">
        <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
          All Filters
        </p>
        <button className="text-primary font-montserrat text-sm font-medium text-blue">
          Reset all
        </button>
      </div>

      <div className="h-[996px] overflow-hidden overflow-y-scroll ">
        <div className="flex flex-col items-start justify-center p-4 gap-2 ">
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Location
            </p>
          </div>
          {/**
          <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
            <div className="w-[24px] h-[24px]">
              <img src="/images/jobs/ser.png" alt="" />
            </div>
            <input
              type="text"
              placeholder="search"
              className="font-montserrat font-normal text-[14px] text-black "
            />
          </div> */}
          {jobtypeData &&
            jobtypeData?.locations?.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center gap-2 self-stretch"
                key={index}
              >
                <div className="flex items-center gap-2 self-stretch">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                    onChange={() => handleCheckboxChange("jobType", item)}
                  />
                  <p className="font-montserrat font-medium text-[12px] text-black">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          <div className="border-b border-gray w-full h-[10px]"></div>

          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Industry
            </p>
          </div>
          {/** 
          <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
            <div className="w-[24px] h-[24px]">
              <img src="/images/jobs/ser.png" alt="" />
            </div>
            <input
              type="text"
              placeholder="search"
              className="font-montserrat font-normal text-[14px] text-black "
            />
          </div>*/}

          {jobtypeData?.industryTypes.length > 0 &&
            jobtypeData?.industryTypes?.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center gap-2 self-stretch"
                key={index}
              >
                <div className="flex items-center gap-2 self-stretch">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                    onChange={() => handleCheckboxChange("industryType", item)}
                  />
                  <p className="font-montserrat font-medium text-[12px] text-black">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          <div className="border-b border-gray w-full h-[10px]"></div>
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Salary
            </p>
          </div>

          {jobtypeData?.salaries.length > 0 &&
            jobtypeData?.salaries?.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center gap-2 self-stretch"
                key={index}
              >
                <div className="flex items-center gap-2 self-stretch">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                    onChange={() => handleCheckboxChange("salaries", item)}
                  />
                  <p className="font-montserrat font-medium text-[12px] text-black">
                    {`${item.minSalary}-${item.maxSalary}`}
                  </p>
                </div>
              </div>
            ))}
          <div className="border-b border-gray w-full h-[10px]"></div>
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black"></p>
          </div>
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Experience
            </p>
          </div>

          {jobtypeData?.experiences.length > 0 &&
            jobtypeData?.experiences?.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center gap-2 self-stretch"
                key={index}
              >
                <div className="flex items-center gap-2 self-stretch">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                    onChange={() => handleCheckboxChange("location", item)}
                  />
                  <p className="font-montserrat font-medium text-[12px] text-black">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          <div className="border-b border-gray w-full h-[10px]"></div>

          {/* SCROLL  */}
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Education
            </p>
          </div>
          {/**  <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
            <div className="w-[24px] h-[24px]">
              <img src="/images/jobs/ser.png" alt="" />
            </div>
            <input
              type="text"
              placeholder="search"
              className="font-montserrat font-normal text-[14px] text-black "
            />
          </div>*/}

          {jobtypeData?.educations.length > 0 &&
            jobtypeData?.educations?.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center gap-2 self-stretch"
                key={index}
              >
                <div className="flex items-center gap-2 self-stretch">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                    onChange={() => handleCheckboxChange("education", item)}
                  />
                  <p className="font-montserrat font-medium text-[12px] text-black">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          <div className="border-b border-gray w-full h-[10px]"></div>
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Job type
            </p>
          </div>

          {jobtypeData?.jobTypes.length > 0 &&
            jobtypeData?.jobTypes?.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center gap-2 self-stretch"
                key={index}
              >
                <div className="flex items-center gap-2 self-stretch">
                  <input
                    type="checkbox"
                    className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                    onChange={() => handleCheckboxChange("jobType", item)}
                  />
                  <p className="font-montserrat font-medium text-[12px] text-black">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          {/**   <div className="border-b border-gray w-full h-[10px]"></div>
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Job mode
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 self-stretch">
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
              />

              <p className="font-montserrat font-medium text-[12px] text-black">
                On-site
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
              />

              <p className="font-montserrat font-medium text-[12px] text-black">
                Remote
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
              />

              <p className="font-montserrat font-medium text-[12px] text-black">
                Hybrid
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch border-blue">
              <input
                type="checkbox"
                className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
              />

              <p className="font-montserrat font-medium text-[12px] text-black">
                International
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch border-blue">
              <input
                type="checkbox"
                className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
              />

              <p className="font-montserrat font-medium text-[12px] text-black">
                Work From Home
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch border-blue">
              <input
                type="checkbox"
                className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
              />

              <p className="font-montserrat font-medium text-[12px] text-black">
                Jobs for Women
              </p>
            </div>
          </div>
*/}
          <div className="border-b border-gray w-full h-[10px]"></div>
          <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
            <p className="font-montserrat font-medium text-[16px] text-black">
              By Date posted
            </p>
          </div>

          {posted.map((item, index) => (
            <div
              className="flex flex-col justify-center items-center gap-2 self-stretch"
              key={index}
            >
              <div className="flex items-center gap-2 self-stretch">
                <input
                  type="checkbox"
                  className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                  onChange={() => handleCheckboxChange("datePosted", item)}
                />
                <p className="font-montserrat font-medium text-[12px] text-black">
                  {item}
                </p>
              </div>
            </div>
          ))}

          <div className="border-b border-gray w-full h-[10px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
