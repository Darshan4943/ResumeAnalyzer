import React, { useEffect, useRef, useState } from "react";
import ClientList from "../../../components/featured/clients/ClientList";
import CreateNewClient from "./CreateNewClient";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import { reCallUserData } from "../../../Redux/actions/user";
import { toast } from "react-toastify";
import LimitUsedModal from "../../../components/models/limitUsedModal";
function MyClients() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isOptions, setIsOptions] = useState(false);
  const [details, setDetails] = useState();
  const userDataGlobal = useSelector((state) => state.userData);
  const [allData, setAllData] = useState([]);
  const taskRef = useRef(null);
  const [select, setSelect] = useState(false);
  const router = useRouter();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [clientCount, setClientCount] = useState(0);
  const [clientCountLimit, setClientCountLimit] = useState(0)
  const [limitPopUp, setLimitPopUp] = useState(false);
  const dispatch = useDispatch();

  const [planAvailable, setplanAvailable] = useState(false);

  useEffect(() => {
    const planavailable =
      localStorage.getItem("planAvailable") == "true" ? true : false;
    if (planavailable) {
      setplanAvailable(planavailable);
    }
  }, []);

  const getLimits = () => {
    const clientCount = localStorage.getItem("clientCount");
    const clientCountLimit = localStorage.getItem("clientCountLimit");
    setClientCountLimit(parseInt(clientCountLimit))
    setClientCount(parseInt(clientCount));

  };

  useEffect(() => {
    getLimits();
  }, []);
    

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
        `http://localhost:2000/api/client/getByRecruiter/${userDataGlobal._id}`
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

  const deleteClient = () => {
    const ids = selectedIndexes.map((item) => details[item]._id);

    if (ids.length === 0) {
      toast.error("Please select file to delete");
      return;
    }

    axios
      .delete("http://localhost:2000/api/client/deleteClients", {
        data: { ids },
      })
      .then((response) => {

        dispatch(reCallUserData());
        toast.success("Client Deleted successfully");
        setSelectedIndexes([]);
        setSelect(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const changeHandler = (value) => {
    if (value.length > 0) {
      const options = {
        includeScore: true,
        threshold: 0.2,
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

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(
        Array.from({ length: details.length }, (_, index) => index)
      );
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (details?.length === selectedIndexes?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedIndexes]);

  return (
    <div className="flex justify-center customMargins py-6">
      {tabIndex === 0 && (
        <div className="flex flex-col gap-4  w-[100%]">
          <div className="text-[20px] font-semibold">My Clients</div>
          {/* <div className="bg-[#DEDEDE] w-full h-[1px]"></div> */}
          <div
            style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
            className="rounded-[16px] p-4 "
          >
            <div
              // style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
              className="flex flex-col gap-4  py-3 rounded-[24px]"
            >
              <div className="flex ml:flex-row flex-col gap-4  justify-between ml:items-center ms:items-end items-end ">
                <div
                  style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
                  className="flex scr420:gap-4 gap-2 scr420:justify-between justify-start rounded-[50px] px-4 py-3 ml:w-[58%] w-[100%] items-center "
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
                      className="w-full h-[24px] scr420:text-[16px] sm:text-[14px] sm:placeholder:text-[16px] placeholder:text-[14px]"
                      type="text"
                      placeholder="Search client name or keyword"
                      onChange={(e) => changeHandler(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4  ms:items-center items-end justify-end relative">
                  {!select && (
                    <div
                      onClick={() => setSelect(!select)}
                      className="scr420:py-3 scr420:px-4 px-2 py-2 flex gap-2 xsm:text-[14px] text-[12px]  font-semibold bg-[#E9EEF6] rounded-[8px] items-center cursor-pointer"
                    >
                      <svg
                        className="scr420:w-[27px] scr420:h-[27px] w-[22px] h-[22px]"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_2185_10021)">
                          <path
                            d="M13.1724 17.0836C12.8315 17.0836 12.538 16.9605 12.2918 16.7142C12.0455 16.468 11.9224 16.1744 11.9224 15.8336V12.34C11.9224 11.9992 12.0455 11.7057 12.2918 11.4595C12.538 11.2132 12.8315 11.0901 13.1724 11.0901H16.666C17.0068 11.0901 17.3003 11.2132 17.5465 11.4595C17.7928 11.7057 17.9159 11.9992 17.9159 12.34V15.8336C17.9159 16.1744 17.7928 16.468 17.5465 16.7142C17.3003 16.9605 17.0068 17.0836 16.666 17.0836H13.1724ZM13.1724 15.8336H16.666V12.34H13.1724V15.8336ZM2.08264 14.7118V13.4618H9.26212V14.7118H2.08264ZM13.1724 8.91053C12.8315 8.91053 12.538 8.78741 12.2918 8.54116C12.0455 8.29491 11.9224 8.00138 11.9224 7.66058V4.16697C11.9224 3.82617 12.0455 3.53264 12.2918 3.28639C12.538 3.04012 12.8315 2.91699 13.1724 2.91699H16.666C17.0068 2.91699 17.3003 3.04012 17.5465 3.28639C17.7928 3.53264 17.9159 3.82617 17.9159 4.16697V7.66058C17.9159 8.00138 17.7928 8.29491 17.5465 8.54116C17.3003 8.78741 17.0068 8.91053 16.666 8.91053H13.1724ZM13.1724 7.66058H16.666V4.16697H13.1724V7.66058ZM2.08264 6.53876V5.28878H9.26212V6.53876H2.08264Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                      Select
                    </div>
                  )}
                  <div
                    className={` ${select ? "flex" : "hidden"
                      } gap-12  items-center w-[100%]  `}
                  >
                    {select && (
                      <div className="bg-[#D1EDFF] flex scr420:gap-4  gap-2 rounded-[50px] px-3 scr420:py-3 py-2 items-center w-full scr420:min-w-[316px] min-w-[280px]  scr420:h-[48px] h-[40px]  ">
                        <div
                          onClick={() => setSelect(false)}
                          style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
                          className="bg-[#F9F9F9] rounded-[50%] p-[8.5px]  cursor-pointer"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 10.5L0.5 9.5L4.5 5.5L0.5 1.5L1.5 0.5L5.5 4.5L9.5 0.5L10.5 1.5L6.5 5.5L10.5 9.5L9.5 10.5L5.5 6.5L1.5 10.5Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                        <div className="flex ms:gap-6 sm:gap-4 gap-2 w-full scr540:justify-start justify-between items-center ">
                          <div className="flex gap-2 text-[14px] font-medium">
                            <label className="flex items-center gap-2 scr420:text-[14px] text-[13px] font-medium">
                              Select All
                              <input
                                type="checkbox"
                                className=" rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox cursor-pointer"
                                style={{ width: "20px", height: "20px" }}
                                checked={selectAll}
                                onChange={toggleSelectAll}
                              />
                            </label>
                          </div>

                          <svg
                            className=" cursor-pointer"
                            onClick={() => deleteClient()}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_1381_18138)">
                              <path
                                d="M5.83594 17.5C5.3776 17.5 4.98524 17.3368 4.65885 17.0104C4.33247 16.684 4.16927 16.2917 4.16927 15.8333V5H3.33594V3.33333H7.5026V2.5H12.5026V3.33333H16.6693V5H15.8359V15.8333C15.8359 16.2917 15.6727 16.684 15.3464 17.0104C15.02 17.3368 14.6276 17.5 14.1693 17.5H5.83594ZM14.1693 5H5.83594V15.8333H14.1693V5ZM7.5026 14.1667H9.16927V6.66667H7.5026V14.1667ZM10.8359 14.1667H12.5026V6.66667H10.8359V14.1667Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>

                          <div className="scr420:text-[14px] text-[13px] font-semibold min-w-[85px] items-center flex justify-end">
                            {selectedIndexes.length} selected
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {!select && (
                    <button
                      // onClick={() => {
                      //   if (clientCount >= clientCountLimit) {
                      //     setLimitPopUp(true);
                      //   } else {
                      //     router.push("/myClients/CreateNewClient");
                      //   }
                      // }}
                      // onClick={() => {
                      //   if (!planAvailable) {
                      //     setLimitPopUp(true);
                      //   } else {
                      //     router.push("/myClients/CreateNewClient");
                      //   }
                      // }}
                      onClick={() => {

                        router.push("/myClients/CreateNewClient");
    
                      }}
                      className="ml:hidden  items-center scr420:text-[16px] xsm:text-[14px] text-[12px] font-semibold scr420:py-3 scr420:px-6 px-2 py-2 scr420:h-[51px]  scr420:min-w-[224px] flex gap-1 bg-[#06A9EF] rounded-[12px] text-white"
                      type="button"
                    >
                      <svg
                        className="scr420:w-[27px] scr420:h-[27px] w-[22px] h-[22px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_612_10078)">
                          <path
                            d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                      Create New Client
                    </button>
                  )}

                  <button
                    // onClick={() => {
                    //   if (clientCount >= clientCountLimit) {
                    //     setLimitPopUp(true);
                    //   } else {
                    //     router.push("/myClients/CreateNewClient");
                    //   }
                    // }}
                    // onClick={() => {
                    //   if (!planAvailable) {
                    //     setLimitPopUp(true);
                    //   } else {
                    //     router.push("/myClients/CreateNewClient");
                    //   }
                    // }}
                    onClick={() => {

                      router.push("/myClients/CreateNewClient");
  
                    }}
                    className=" ml:flex hidden text-[16px] font-semibold py-3 px-5 h-[51px] min-w-[224px] gap-1 bg-[#06A9EF] rounded-[12px] text-white"
                    type="button"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_612_10078)">
                        <path
                          d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    Create New Client
                  </button>

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
                <ClientList
                  setTabIndex={setTabIndex}
                  details={details}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                  setSelect={setSelect}
                  select={select}
                  deleteClient={deleteClient}
                  clientCount={clientCount}
                  clientCountLimit={clientCountLimit}
                  setLimitPopUp={setLimitPopUp}
                />
              ) : (
                <div
                  // onClick={() => {
                  //   if (clientCount >= clientCountLimit) {
                  //     setLimitPopUp(true);
                  //   } else {
                  //     router.push("/myClients/CreateNewClient");
                  //   }
                  // }}
                  // onClick={() => {
                  //   if (!planAvailable) {
                  //     setLimitPopUp(true);
                  //   } else {
                  //     router.push("/myClients/CreateNewClient");
                  //   }
                  // }}
                  onClick={() => {

                    router.push("/myClients/CreateNewClient");

                  }}
                  style={{ boxShadow: "0px 0px 10px 5px #00000040" }}
                  className="rounded-[12px] text-center text-white justify-center mt-[16px] flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  scr540:w-[192px] w-[280px]  scr540:h-[272px] h-[135px] bg-[#646464] p-6 cursor-pointer"
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
              {limitPopUp && (
                <LimitUsedModal
                  visible={limitPopUp}
                  setVisible={setLimitPopUp}
                />
              )}
            </div>
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
