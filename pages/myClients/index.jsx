import React, { useEffect, useRef, useState } from "react";
import ClientList from "../../components/featured/clients/ClientList";
import CreateNewClient from "./CreateNewClient";
import axios from "axios";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import { useRouter } from "next/router";

function MyClients() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isOptions, setIsOptions] = useState(false);
  const [details, setDetails] = useState();
  const userDataGlobal = useSelector((state) => state.userData);
  const [allData, setAllData] = useState([]);
  const taskRef = useRef(null);
  const router = useRouter();
  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const callData = () => {
    axios
      .get(
        `https://freedygoservices.in/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        setDetails(res.data.data);
        setAllData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callData();
  }, [userDataGlobal]);

  const changeHandler = (value) => {
    if (value.length > 0) {
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: [
          "firstName",
          "lastName",
          "email",
          "mobileNo",
          "location",
          "designation",
        ],
      };
      const fuse = new Fuse(allData, options);
      const result = fuse.search(value);
      setDetails(result.map((item) => item.item));
    } else {
      setDetails(allData);
    }
  };

  return (
    <div className="flex justify-center customMargins py-6">
      {tabIndex === 0 && (
        <div className="flex flex-col gap-4  w-[100%]">
          <div className="text-[20px] font-semibold">My Clients</div>
          <div
            style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
            className="flex flex-col gap-4 sm:p-6 px-2 py-3 rounded-[24px]"
          >
            <div className="flex ml:flex-row flex-col gap-4  justify-between ml:items-center items-end ">
              <div
                style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
                className="flex gap-4 justify-between rounded-[50px] px-4 py-3 ml:w-[82%] w-[100%] items-center "
              >
                <div className="flex gap-4  w-full items-center ">
                  <svg
                    className="min-w-[24px]"
                    width="24"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.25 23.25L28.5 28.5L23.25 23.25ZM7.5 16.5C7.5 17.6819 7.73279 18.8522 8.18508 19.9441C8.63738 21.0361 9.30031 22.0282 10.136 22.864C10.9718 23.6997 11.9639 24.3626 13.0558 24.8149C14.1478 25.2672 15.3181 25.5 16.5 25.5C17.6819 25.5 18.8522 25.2672 19.9441 24.8149C21.0361 24.3626 22.0282 23.6997 22.864 22.864C23.6997 22.0282 24.3626 21.0361 24.8149 19.9441C25.2672 18.8522 25.5 17.6819 25.5 16.5C25.5 14.1131 24.5518 11.8239 22.864 10.136C21.1761 8.44821 18.8869 7.5 16.5 7.5C14.1131 7.5 11.8239 8.44821 10.136 10.136C8.44821 11.8239 7.5 14.1131 7.5 16.5V16.5Z"
                      stroke="#646464"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    className="w-full h-[24px]"
                    type="text"
                    placeholder="Search client name or keyword"
                    onChange={(e) => changeHandler(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center  justify-end relative">
                <button
                  onClick={() => router.push("/myClients/CreateNewClient")}
                  className="text-[16px] font-semibold py-3 px-6 h-[48px] min-w-[228px] flex gap-1 bg-[#06A9EF] rounded-[12px] text-white"
                  type="button"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g mask="url(#mask0_612_10078)">
                      <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="white" />
                    </g>
                  </svg>
                  Create New Client
                </button>
                {/* <svg
                  className=" cursor-pointer"
                  onClick={() => setIsOptions(true)}
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_635_20303)">
                    <path
                      d="M19.9961 33.3337C19.3228 33.3337 18.7477 33.0939 18.2709 32.6145C17.794 32.135 17.5556 31.5586 17.5556 30.8853C17.5556 30.212 17.7953 29.6369 18.2748 29.1601C18.7543 28.6832 19.3307 28.4448 20.0039 28.4448C20.6772 28.4448 21.2523 28.6846 21.7292 29.164C22.206 29.6435 22.4444 30.2199 22.4444 30.8932C22.4444 31.5665 22.2047 32.1415 21.7252 32.6184C21.2458 33.0952 20.6694 33.3337 19.9961 33.3337ZM19.9961 22.4447C19.3228 22.4447 18.7477 22.205 18.2709 21.7255C17.794 21.2461 17.5556 20.6697 17.5556 19.9964C17.5556 19.3231 17.7953 18.748 18.2748 18.2712C18.7543 17.7943 19.3307 17.5559 20.0039 17.5559C20.6772 17.5559 21.2523 17.7956 21.7292 18.2751C22.206 18.7546 22.4444 19.331 22.4444 20.0042C22.4444 20.6775 22.2047 21.2526 21.7252 21.7295C21.2458 22.2063 20.6694 22.4447 19.9961 22.4447ZM19.9961 11.5558C19.3228 11.5558 18.7477 11.3161 18.2709 10.8366C17.794 10.3571 17.5556 9.78077 17.5556 9.10749C17.5556 8.43419 17.7953 7.85912 18.2748 7.38228C18.7543 6.90542 19.3307 6.66699 20.0039 6.66699C20.6772 6.66699 21.2523 6.90673 21.7292 7.3862C22.206 7.86567 22.4444 8.44205 22.4444 9.11533C22.4444 9.78863 22.2047 10.3637 21.7252 10.8406C21.2458 11.3174 20.6694 11.5558 19.9961 11.5558Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg> */}

                {/* {isOptions && (
                  <div
                    ref={taskRef}
                    className="absolute right-5 top-16 bg-white px-2 py-4 flex flex-col gap-1 rounded-[8px]"
                    style={{
                      boxShadow: "0px 1px 2px 0px #00000040",
                    }}
                  >
                    <p className="text-[14px] font-medium">Select All</p>

                    <p className="text-[14px] text-red font-medium">
                      Delete All
                    </p>
                  </div>
                )} */}
              </div>
            </div>
            {details?.length > 0 ? (
              <ClientList setTabIndex={setTabIndex} details={details} />
            ) : (
              <div
                onClick={() => router.push("/myClients/CreateNewClient")}
                style={{ boxShadow: "0px 0px 10px 5px #00000040" }}
                className="rounded-[12px] text-center text-white justify-center mt-[16px] flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  scr540:w-[192px] w-[312px]  scr540:h-[272px] h-[135px] bg-[#646464] p-6 cursor-pointer"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8187 14.6206H0.0750732V12.1079H11.8187V0.364258H14.3314V12.1079H26.075V14.6206H14.3314V26.3642H11.8187V14.6206Z"
                    fill="white"
                  />
                </svg>

                <p>Create New Client</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* {tabIndex === 2 && (
        <CreateNewClient setTabIndex={setTabIndex} callData={callData} />
      )} */}
    </div>
  );
}

export default MyClients;
