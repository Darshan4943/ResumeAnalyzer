import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import LimitUsedModal from "../../components/models/limitUsedModal";
function ClientResume() {
  const router = useRouter();
  const [allData, setAllData] = useState([]);
  const [details, setDetails] = useState();
  const [clientCount, setClientCount] = useState(0);
  const [clientCountLimit, setClientCountLimit] = useState(0)

  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [limitPopUp, setLimitPopUp] = useState(false);
  const [planAvailable, setplanAvailable] = useState(false);

  useEffect(() => {
    const planavailable =
      localStorage.getItem("planAvailable") == "true" ? true : false;
    if (planavailable) {
      setplanAvailable(planavailable);
    }
  }, []);

  console.log(222, planAvailable)
  const getLimits = () => {
    const clientCount = localStorage.getItem("clientCount");
    const clientCountLimit = localStorage.getItem("clientCountLimit");
    setClientCountLimit(parseInt(clientCountLimit))
    setClientCount(parseInt(clientCount));

  };

  const { cover } = router.query

  useEffect(() => {
    getLimits();
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://dev.api.skilotech.com/api/client/getByRecruiter/${userDataGlobal?._id}`
      )
      .then((res) => {
        setDetails(res.data.data);
        setAllData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="flex justify-center ">
      <div className="flex flex-col gap-4  pb-2 w-[100%]">
        <div className="text-[20px] font-semibold">Select Candidate</div>
        <div
          // style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
          className="flex flex-col gap-4  rounded-[24px]"
        >
          <div className="flex ml:flex-row flex-col gap-4  justify-end ml:items-center items-end ">
            <div
              style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
              className="flex gap-4 justify-between rounded-[50px] px-4 py-3  w-[100%] items-center bg-white "
            >
              <div className="flex gap-4  w-[100%] items-center ">
                <svg
                  width="36"
                  height="36"
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
                  onChange={(e) => changeHandler(e.target.value)}
                  className="w-full  sm:placeholder:text-[16px] placeholder:text-[14px] "
                  type="text"
                  placeholder="Search client name or keyword"
                />
              </div>
              {/* <button
               
                className="text-[16px] font-semibold py-3 px-6 bg-[#06A9EF] rounded-[36px] text-white"
                type="button"
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="rounded-[16px]  flex flex-col gap-4 w-[98%]">
            {details?.length > 0 && (
              <div className="text-[20px] font-medium">
                Total Candidates ({details?.length})
              </div>
            )}

            <div className="flex  gap-5 flex-wrap scr700:justify-start justify-center ">
              {details?.length > 0 && (
              <div
              onClick={() => {
                router.push("/candidates/CreateNewClient");
              }}
              className="rounded-[16px] text-center text-[#333333] border-[1px] border-solid border-[#DEDEDE] bg-white justify-center flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  sm:min-w-[224px] min-w-[218px] max-w-[224px] p-6 cursor-pointer"
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
                  fill="#333333"
                />
              </svg>
              <p>Create New Candidate</p>
            </div>
              )}
              {details?.length > 0 ? (
                <>
                  {details?.map((detail, index) => (
                    <div
                      onClick={() =>
                        router.push(cover ? `/coverLetter?clientId=${detail._id}` : `/createResume/BuildResume?clientId=${detail._id}`)
                      }
                      key={index}
                      className="flex flex-col gap-4 cursor-pointer  p-4 rounded-[24px] sm:min-w-[224px] min-w-[218px] max-w-[224px] break-all bg-white"
                      // style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
                    >
                      <div className="flex justify-center relative">
                        <img
                          className="rounded-[50%] sm:h-[80px] sm:w-[80px] h-[80px] w-[80px] "
                          style={{ objectFit: "contain" }}
                          src={
                            detail.profilePicture
                              ? detail.profilePicture
                              : "/images/services/profile.png"
                          }
                          //   src="/images/services/profile.png"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-[18px] font-medium">
                          {" "}
                          {detail.firstName} {detail.lastName}
                        </p>
                        <div className="flex  gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_625_15669)">
                              <path
                                d="M3.58967 17.0833C3.16872 17.0833 2.81242 16.9374 2.52075 16.6458C2.22909 16.3541 2.08325 15.9978 2.08325 15.5768V6.92304C2.08325 6.5021 2.22909 6.14579 2.52075 5.85412C2.81242 5.56246 3.16872 5.41662 3.58967 5.41662H7.08325V4.0064C7.08325 3.58547 7.22909 3.22917 7.52075 2.9375C7.81242 2.64583 8.16872 2.5 8.58967 2.5H11.4101C11.8311 2.5 12.1874 2.64583 12.479 2.9375C12.7707 3.22917 12.9165 3.58547 12.9165 4.0064V5.41662H16.4101C16.8311 5.41662 17.1874 5.56246 17.479 5.85412C17.7707 6.14579 17.9165 6.5021 17.9165 6.92304V15.5768C17.9165 15.9978 17.7707 16.3541 17.479 16.6458C17.1874 16.9374 16.8311 17.0833 16.4101 17.0833H3.58967ZM8.33323 5.41662H11.6666V4.0064C11.6666 3.94228 11.6399 3.88352 11.5864 3.8301C11.533 3.77667 11.4742 3.74996 11.4101 3.74996H8.58967C8.52556 3.74996 8.46679 3.77667 8.41336 3.8301C8.35994 3.88352 8.33323 3.94228 8.33323 4.0064V5.41662ZM16.6666 12.2916H12.0832V13.7499H7.91659V12.2916H3.33323V15.5768C3.33323 15.6409 3.35994 15.6997 3.41336 15.7531C3.46679 15.8066 3.52556 15.8333 3.58967 15.8333H16.4101C16.4742 15.8333 16.533 15.8066 16.5864 15.7531C16.6399 15.6997 16.6666 15.6409 16.6666 15.5768V12.2916ZM9.16656 12.4999H10.8332V10.8333H9.16656V12.4999ZM3.33323 11.0416H7.91659V9.58329H12.0832V11.0416H16.6666V6.92304C16.6666 6.85893 16.6399 6.80016 16.5864 6.74673C16.533 6.69331 16.4742 6.6666 16.4101 6.6666H3.58967C3.52556 6.6666 3.46679 6.69331 3.41336 6.74673C3.35994 6.80016 3.33323 6.85893 3.33323 6.92304V11.0416Z"
                                fill="#06A9EF"
                              />
                            </g>
                          </svg>
                          <p className="text-[14px] font-medium">
                            {detail.designation}
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#DEDEDE] w-full h-[1px]"></div>
                      <div className="flex flex-col gap-2">
                        <p className="text-[16px] font-medium">Contact</p>

                        <div className="flex  gap-2">
                          <div className="h-[22px] w-[22px]">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g mask="url(#mask0_625_15649)">
                                <path
                                  d="M3.58967 16.25C3.16872 16.25 2.81242 16.1041 2.52075 15.8125C2.22909 15.5208 2.08325 15.1645 2.08325 14.7435V5.25642C2.08325 4.83547 2.22909 4.47917 2.52075 4.1875C2.81242 3.89583 3.16872 3.75 3.58967 3.75H16.4101C16.8311 3.75 17.1874 3.89583 17.479 4.1875C17.7707 4.47917 17.9165 4.83547 17.9165 5.25642V14.7435C17.9165 15.1645 17.7707 15.5208 17.479 15.8125C17.1874 16.1041 16.8311 16.25 16.4101 16.25H3.58967ZM9.9999 10.4647L3.33323 6.20187V14.7435C3.33323 14.8183 3.35727 14.8798 3.40536 14.9279C3.45344 14.9759 3.51488 15 3.58967 15H16.4101C16.4849 15 16.5464 14.9759 16.5944 14.9279C16.6425 14.8798 16.6666 14.8183 16.6666 14.7435V6.20187L9.9999 10.4647ZM9.9999 9.16665L16.5384 4.99998H3.46144L9.9999 9.16665ZM3.33323 6.20187V4.99998V14.7435C3.33323 14.8183 3.35727 14.8798 3.40536 14.9279C3.45344 14.9759 3.51488 15 3.58967 15H3.33323V6.20187Z"
                                  fill="#06A9EF"
                                />
                              </g>
                            </svg>
                          </div>
                          <p className="text-[14px] font-normal">
                            {detail.email}
                          </p>
                        </div>
                        <div className="flex  gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_625_15654)">
                              <path
                                d="M16.2004 17.0846C14.6299 17.0846 13.0521 16.7195 11.4672 15.9892C9.88228 15.259 8.42609 14.2288 7.09864 12.8987C5.77119 11.5686 4.74234 10.1124 4.0121 8.53014C3.28187 6.94787 2.91675 5.37149 2.91675 3.80099C2.91675 3.5487 3.00008 3.33846 3.16675 3.17026C3.33341 3.00207 3.54175 2.91797 3.79175 2.91797H6.50966C6.72014 2.91797 6.90577 2.98661 7.06656 3.12391C7.22735 3.2612 7.32964 3.4308 7.37344 3.63272L7.851 6.08462C7.88412 6.31218 7.87718 6.5077 7.83016 6.67116C7.78316 6.83461 7.69876 6.9719 7.57696 7.08301L5.65229 8.95641C5.96212 9.52371 6.31603 10.0603 6.714 10.5662C7.11197 11.0721 7.54279 11.5552 8.00646 12.0157C8.46373 12.473 8.94985 12.8977 9.46481 13.2898C9.97977 13.6819 10.5359 14.0467 11.1331 14.3843L13.0033 12.4981C13.1336 12.3624 13.2915 12.2673 13.4768 12.2128C13.6622 12.1584 13.8548 12.145 14.0546 12.1728L16.3686 12.6439C16.5791 12.6995 16.7508 12.8069 16.8839 12.966C17.0169 13.1252 17.0834 13.3058 17.0834 13.5077V16.2096C17.0834 16.4596 16.9993 16.6679 16.8311 16.8346C16.6629 17.0013 16.4526 17.0846 16.2004 17.0846ZM5.06096 7.77374L6.54814 6.35066C6.57485 6.32928 6.59221 6.2999 6.60023 6.26251C6.60824 6.22511 6.60691 6.19039 6.59623 6.15834L6.23404 4.29616C6.22336 4.25342 6.20466 4.22137 6.17796 4.20001C6.15125 4.17864 6.11653 4.16795 6.07379 4.16795H4.29173C4.25969 4.16795 4.23298 4.17864 4.2116 4.20001C4.19023 4.22137 4.17954 4.24808 4.17954 4.28014C4.22228 4.84958 4.31549 5.42811 4.45919 6.01572C4.60289 6.60333 4.80348 7.18934 5.06096 7.77374ZM12.3109 14.9756C12.8633 15.2331 13.4394 15.43 14.0393 15.5662C14.6392 15.7024 15.1998 15.7833 15.7212 15.809C15.7533 15.809 15.78 15.7983 15.8013 15.7769C15.8227 15.7556 15.8334 15.7288 15.8334 15.6968V13.9436C15.8334 13.9009 15.8227 13.8661 15.8013 13.8394C15.78 13.8127 15.7479 13.794 15.7052 13.7833L13.9552 13.4276C13.9231 13.4169 13.8951 13.4155 13.8711 13.4236C13.847 13.4316 13.8216 13.4489 13.7949 13.4756L12.3109 14.9756Z"
                                fill="#06A9EF"
                              />
                            </g>
                          </svg>

                          <p className="text-[14px] font-normal">
                            {detail.mobileNo}
                          </p>
                        </div>
                        <div className="flex  gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_625_15659)">
                              <path
                                d="M10.0015 9.88649C10.4161 9.88649 10.7706 9.73885 11.065 9.44357C11.3593 9.1483 11.5065 8.79333 11.5065 8.37868C11.5065 7.96402 11.3588 7.60953 11.0635 7.3152C10.7683 7.02086 10.4133 6.8737 9.99865 6.8737C9.58399 6.8737 9.2295 7.02134 8.93517 7.31661C8.64083 7.61189 8.49367 7.96686 8.49367 8.38151C8.49367 8.79616 8.64131 9.15066 8.93658 9.44499C9.23186 9.73932 9.58683 9.88649 10.0015 9.88649ZM10.0001 16.2599C11.6304 14.8005 12.878 13.4007 13.7429 12.0604C14.6077 10.7201 15.0401 9.54623 15.0401 8.53874C15.0401 7.01952 14.5575 5.77059 13.5922 4.79195C12.6269 3.81331 11.4295 3.32399 10.0001 3.32399C8.57058 3.32399 7.3732 3.81331 6.40792 4.79195C5.44264 5.77059 4.96 7.01952 4.96 8.53874C4.96 9.54623 5.39242 10.7201 6.25727 12.0604C7.12213 13.4007 8.36973 14.8005 10.0001 16.2599ZM10.0001 17.9233C7.90285 16.106 6.33021 14.4148 5.28213 12.8496C4.23406 11.2845 3.71002 9.8475 3.71002 8.53874C3.71002 6.61568 4.33208 5.0588 5.57621 3.86809C6.82032 2.67739 8.29494 2.08203 10.0001 2.08203C11.7052 2.08203 13.1798 2.67739 14.4239 3.86809C15.668 5.0588 16.2901 6.61568 16.2901 8.53874C16.2901 9.8475 15.7661 11.2845 14.718 12.8496C13.6699 14.4148 12.0973 16.106 10.0001 17.9233Z"
                                fill="#06A9EF"
                              />
                            </g>
                          </svg>

                          <p className="text-[14px] font-normal">
                            {detail.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div
                onClick={() => {
                  router.push("/candidates/CreateNewClient");
                }}
                className="rounded-[16px] text-center text-[#333333] border-[1px] border-solid border-[#DEDEDE] bg-white justify-center flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  sm:min-w-[224px] min-w-[218px] max-w-[224px] scr540:min-h-[320px] p-6 cursor-pointer"
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
                    fill="#333333"
                  />
                </svg>
                <p>Create New Candidate</p>
              </div>
              )}
            </div>
          </div>
        </div>
        {limitPopUp && (
          <LimitUsedModal visible={limitPopUp} setVisible={setLimitPopUp} />
        )}
      </div>
    </div>
  );
}

export default ClientResume;
