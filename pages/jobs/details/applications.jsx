import React, { useState } from "react";
import { dateSeter } from "../../../utils/middleware";
import { useRouter } from "next/router";
import MiniLoader from "../../../components/common/mini-loader";

const Applications = ({
  jobPost,
  applications,
  setLimit,
  setPage,
  limit,
  page,
  miniLoading,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState([]);

  const handleChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="sm:p-[24px] p-3 flex sm:flex-row flex-col-reverse gap-[16px] sm:items-center items-start justify-between w-full">
        <span className="text-[16px] text-[#333333] font-semibold ">
          Total Applicants : {jobPost?.applications?.length}
        </span>
        {/*** 

        <div className="sm:w-fit  w-full">
          <div className="flex flex-row gap-[8px] py-[12px] px-[16px] bg-[#92DEFF] justify-center items-center rounded-[8px] w-full">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 1.31067H13.0473L12.9479 1.13965C12.8298 0.937667 12.661 0.770046 12.4582 0.653394C12.2555 0.536743 12.0257 0.475112 11.7918 0.474609H5.96388C5.6093 0.475005 5.26936 0.616037 5.01863 0.866762C4.7679 1.11749 4.62687 1.45743 4.62648 1.81201V3.14722H1.8374C1.48282 3.14761 1.14288 3.28865 0.892154 3.53937C0.641428 3.7901 0.500396 4.13004 0.5 4.48462V16.188C0.500397 16.5426 0.641429 16.8825 0.892155 17.1332C1.14288 17.384 1.48282 17.525 1.8374 17.5254H16.0336C16.3882 17.525 16.7281 17.384 16.9789 17.1333C17.2296 16.8825 17.3706 16.5426 17.371 16.188V14.8531H20.1626C20.5172 14.8527 20.8572 14.7116 21.1079 14.4608C21.3586 14.21 21.4996 13.87 21.5 13.5154V2.81067C21.4996 2.41297 21.3414 2.03167 21.0602 1.75045C20.779 1.46923 20.3977 1.31107 20 1.31067ZM20 2.06067C20.1988 2.06093 20.3894 2.14003 20.53 2.28062C20.6706 2.42122 20.7497 2.61184 20.75 2.81067V3.65266C20.5678 3.56064 20.3667 3.51211 20.1626 3.51086H14.3263L13.4833 2.06067H20ZM16.621 16.188C16.6218 16.2654 16.6071 16.3421 16.5779 16.4137C16.5487 16.4854 16.5054 16.5505 16.4507 16.6052C16.396 16.6599 16.3309 16.7031 16.2593 16.7323C16.1877 16.7616 16.1109 16.7762 16.0336 16.7754H1.8374C1.76004 16.7762 1.68328 16.7616 1.61164 16.7324C1.54 16.7031 1.47492 16.6599 1.42021 16.6052C1.3655 16.5505 1.32226 16.4854 1.29304 16.4138C1.26381 16.3421 1.24918 16.2654 1.25 16.188V4.48462C1.2502 4.3289 1.31215 4.17961 1.42227 4.06949C1.53239 3.95937 1.68168 3.89742 1.8374 3.89722H4.62647V13.5154C4.62685 13.87 4.76786 14.21 5.01858 14.4608C5.2693 14.7116 5.60925 14.8527 5.96387 14.8531H16.621L16.621 16.188ZM20.75 13.5154C20.7498 13.6711 20.6879 13.8205 20.5778 13.9307C20.4677 14.0409 20.3184 14.1029 20.1626 14.1031H5.96387C5.80808 14.1029 5.65875 14.0409 5.54863 13.9307C5.4385 13.8205 5.37659 13.6712 5.37647 13.5154V1.812C5.37667 1.65627 5.43862 1.50698 5.54873 1.39687C5.65885 1.28675 5.80814 1.2248 5.96387 1.2246H11.7917C11.8945 1.22486 11.9955 1.25196 12.0845 1.30321C12.1736 1.35447 12.2478 1.42811 12.2997 1.51683L13.7865 4.07445C13.8195 4.13117 13.8668 4.17824 13.9236 4.21096C13.9805 4.24367 14.045 4.26087 14.1106 4.26085H20.1626C20.3183 4.26108 20.4676 4.32304 20.5777 4.43316C20.6878 4.54327 20.7498 4.69254 20.75 4.84826V13.5154ZM13.0632 5.0896C12.2538 5.08959 11.4626 5.3296 10.7896 5.77928C10.1166 6.22895 9.59208 6.8681 9.28233 7.61589C8.97258 8.36368 8.89153 9.18653 9.04944 9.98038C9.20734 10.7742 9.5971 11.5034 10.1694 12.0758C10.7418 12.6481 11.471 13.0379 12.2648 13.1958C13.0587 13.3537 13.8815 13.2726 14.6293 12.9629C15.3771 12.6532 16.0162 12.1286 16.4659 11.4556C16.9156 10.7826 17.1556 9.99141 17.1556 9.182C17.1544 8.09701 16.7229 7.0568 15.9557 6.28959C15.1884 5.52238 14.1482 5.09082 13.0632 5.0896ZM13.0632 12.5244C12.4022 12.5244 11.756 12.3284 11.2063 11.9611C10.6566 11.5939 10.2282 11.0719 9.97524 10.4611C9.72226 9.85037 9.65606 9.17832 9.78503 8.52995C9.91399 7.88159 10.2323 7.28602 10.6998 6.81858C11.1672 6.35113 11.7628 6.03279 12.4111 5.90382C13.0595 5.77485 13.7315 5.84104 14.3423 6.09402C14.953 6.347 15.4751 6.7754 15.8423 7.32506C16.2096 7.87472 16.4056 8.52094 16.4056 9.182C16.4046 10.0682 16.0522 10.9177 15.4256 11.5443C14.799 12.171 13.9494 12.5234 13.0632 12.5244ZM14.9485 9.24902C14.9846 9.28257 15.0136 9.3229 15.0341 9.3677C15.0545 9.4125 15.066 9.46089 15.0677 9.5101C15.0694 9.55932 15.0615 9.6084 15.0442 9.65452C15.027 9.70065 15.0008 9.74292 14.9672 9.77893L13.3375 11.5265L13.3326 11.53C13.3033 11.5589 13.2695 11.5829 13.2325 11.6008C13.2249 11.6047 13.2191 11.6117 13.2113 11.615C13.1646 11.6354 13.1142 11.6459 13.0632 11.6459C13.0123 11.6459 12.9619 11.6354 12.9152 11.615C12.9072 11.6116 12.9014 11.6045 12.8936 11.6005C12.8567 11.5826 12.823 11.5588 12.7939 11.53L12.7889 11.5265L11.1593 9.77893C11.1256 9.74294 11.0993 9.70065 11.0819 9.65447C11.0646 9.6083 11.0565 9.55916 11.0582 9.50986C11.0598 9.46057 11.0712 9.41208 11.0916 9.36719C11.1121 9.3223 11.1412 9.28188 11.1773 9.24825C11.2133 9.21462 11.2557 9.18845 11.3019 9.17122C11.3482 9.15399 11.3973 9.14606 11.4466 9.14786C11.4959 9.14967 11.5444 9.16118 11.5892 9.18175C11.634 9.20231 11.6744 9.23152 11.7079 9.2677L12.6882 10.319V7.09277C12.6882 6.99331 12.7278 6.89793 12.7981 6.82761C12.8684 6.75728 12.9638 6.71777 13.0632 6.71777C13.1627 6.71777 13.2581 6.75728 13.3284 6.82761C13.3987 6.89793 13.4382 6.99331 13.4382 7.09277V10.319L14.4186 9.2677C14.4864 9.19498 14.5803 9.15216 14.6797 9.14866C14.779 9.14516 14.8757 9.18126 14.9485 9.24902Z"
                fill="white"
              />
              <path
                d="M20 1.31067H13.0473L12.9479 1.13965C12.8298 0.937667 12.661 0.770046 12.4582 0.653394C12.2555 0.536743 12.0257 0.475112 11.7918 0.474609H5.96388C5.6093 0.475005 5.26936 0.616037 5.01863 0.866762C4.7679 1.11749 4.62687 1.45743 4.62648 1.81201V3.14722H1.8374C1.48282 3.14761 1.14288 3.28865 0.892154 3.53937C0.641428 3.7901 0.500396 4.13004 0.5 4.48462V16.188C0.500397 16.5426 0.641429 16.8825 0.892155 17.1332C1.14288 17.384 1.48282 17.525 1.8374 17.5254H16.0336C16.3882 17.525 16.7281 17.384 16.9789 17.1333C17.2296 16.8825 17.3706 16.5426 17.371 16.188V14.8531H20.1626C20.5172 14.8527 20.8572 14.7116 21.1079 14.4608C21.3586 14.21 21.4996 13.87 21.5 13.5154V2.81067C21.4996 2.41297 21.3414 2.03167 21.0602 1.75045C20.779 1.46923 20.3977 1.31107 20 1.31067ZM20 2.06067C20.1988 2.06093 20.3894 2.14003 20.53 2.28062C20.6706 2.42122 20.7497 2.61184 20.75 2.81067V3.65266C20.5678 3.56064 20.3667 3.51211 20.1626 3.51086H14.3263L13.4833 2.06067H20ZM16.621 16.188C16.6218 16.2654 16.6071 16.3421 16.5779 16.4137C16.5487 16.4854 16.5054 16.5505 16.4507 16.6052C16.396 16.6599 16.3309 16.7031 16.2593 16.7323C16.1877 16.7616 16.1109 16.7762 16.0336 16.7754H1.8374C1.76004 16.7762 1.68328 16.7616 1.61164 16.7324C1.54 16.7031 1.47492 16.6599 1.42021 16.6052C1.3655 16.5505 1.32226 16.4854 1.29304 16.4138C1.26381 16.3421 1.24918 16.2654 1.25 16.188V4.48462C1.2502 4.3289 1.31215 4.17961 1.42227 4.06949C1.53239 3.95937 1.68168 3.89742 1.8374 3.89722H4.62647V13.5154C4.62685 13.87 4.76786 14.21 5.01858 14.4608C5.2693 14.7116 5.60925 14.8527 5.96387 14.8531H16.621L16.621 16.188ZM20.75 13.5154C20.7498 13.6711 20.6879 13.8205 20.5778 13.9307C20.4677 14.0409 20.3184 14.1029 20.1626 14.1031H5.96387C5.80808 14.1029 5.65875 14.0409 5.54863 13.9307C5.4385 13.8205 5.37659 13.6712 5.37647 13.5154V1.812C5.37667 1.65627 5.43862 1.50698 5.54873 1.39687C5.65885 1.28675 5.80814 1.2248 5.96387 1.2246H11.7917C11.8945 1.22486 11.9955 1.25196 12.0845 1.30321C12.1736 1.35447 12.2478 1.42811 12.2997 1.51683L13.7865 4.07445C13.8195 4.13117 13.8668 4.17824 13.9236 4.21096C13.9805 4.24367 14.045 4.26087 14.1106 4.26085H20.1626C20.3183 4.26108 20.4676 4.32304 20.5777 4.43316C20.6878 4.54327 20.7498 4.69254 20.75 4.84826V13.5154ZM13.0632 5.0896C12.2538 5.08959 11.4626 5.3296 10.7896 5.77928C10.1166 6.22895 9.59208 6.8681 9.28233 7.61589C8.97258 8.36368 8.89153 9.18653 9.04944 9.98038C9.20734 10.7742 9.5971 11.5034 10.1694 12.0758C10.7418 12.6481 11.471 13.0379 12.2648 13.1958C13.0587 13.3537 13.8815 13.2726 14.6293 12.9629C15.3771 12.6532 16.0162 12.1286 16.4659 11.4556C16.9156 10.7826 17.1556 9.99141 17.1556 9.182C17.1544 8.09701 16.7229 7.0568 15.9557 6.28959C15.1884 5.52238 14.1482 5.09082 13.0632 5.0896ZM13.0632 12.5244C12.4022 12.5244 11.756 12.3284 11.2063 11.9611C10.6566 11.5939 10.2282 11.0719 9.97524 10.4611C9.72226 9.85037 9.65606 9.17832 9.78503 8.52995C9.91399 7.88159 10.2323 7.28602 10.6998 6.81858C11.1672 6.35113 11.7628 6.03279 12.4111 5.90382C13.0595 5.77485 13.7315 5.84104 14.3423 6.09402C14.953 6.347 15.4751 6.7754 15.8423 7.32506C16.2096 7.87472 16.4056 8.52094 16.4056 9.182C16.4046 10.0682 16.0522 10.9177 15.4256 11.5443C14.799 12.171 13.9494 12.5234 13.0632 12.5244ZM14.9485 9.24902C14.9846 9.28257 15.0136 9.3229 15.0341 9.3677C15.0545 9.4125 15.066 9.46089 15.0677 9.5101C15.0694 9.55932 15.0615 9.6084 15.0442 9.65452C15.027 9.70065 15.0008 9.74292 14.9672 9.77893L13.3375 11.5265L13.3326 11.53C13.3033 11.5589 13.2695 11.5829 13.2325 11.6008C13.2249 11.6047 13.2191 11.6117 13.2113 11.615C13.1646 11.6354 13.1142 11.6459 13.0632 11.6459C13.0123 11.6459 12.9619 11.6354 12.9152 11.615C12.9072 11.6116 12.9014 11.6045 12.8936 11.6005C12.8567 11.5826 12.823 11.5588 12.7939 11.53L12.7889 11.5265L11.1593 9.77893C11.1256 9.74294 11.0993 9.70065 11.0819 9.65447C11.0646 9.6083 11.0565 9.55916 11.0582 9.50986C11.0598 9.46057 11.0712 9.41208 11.0916 9.36719C11.1121 9.3223 11.1412 9.28188 11.1773 9.24825C11.2133 9.21462 11.2557 9.18845 11.3019 9.17122C11.3482 9.15399 11.3973 9.14606 11.4466 9.14786C11.4959 9.14967 11.5444 9.16118 11.5892 9.18175C11.634 9.20231 11.6744 9.23152 11.7079 9.2677L12.6882 10.319V7.09277C12.6882 6.99331 12.7278 6.89793 12.7981 6.82761C12.8684 6.75728 12.9638 6.71777 13.0632 6.71777C13.1627 6.71777 13.2581 6.75728 13.3284 6.82761C13.3987 6.89793 13.4382 6.99331 13.4382 7.09277V10.319L14.4186 9.2677C14.4864 9.19498 14.5803 9.15216 14.6797 9.14866C14.779 9.14516 14.8757 9.18126 14.9485 9.24902Z"
                stroke="white"
                stroke-width="0.3"
                mask="url(#path-1-outside-1_2097_8072)"
              />
            </svg>
            <span className="text-[16px] text-white font-semibold ">
              Save to Collection
            </span>
          </div>
        </div>*/}
      </div>
      <div>
        {applications?.length > 0 ? (
          <>
            <div className="web">
              <table className="w-full ">
                <thead className="w-full">
                  <tr className="w-full bg-[#06A9EF] flex flex-row justify-between items-center px-[24px] py-[12px]">
                    <th className="w-[5%] flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="h-[18px] w-[18px]"
                        checked={selectedCandidate.length > 0}
                        onChange={() => {
                          if (selectedCandidate.length > 0) {
                            setSelectedCandidate([]);
                          } else {
                            setSelectedCandidate(applications);
                          }
                        }}
                      />
                    </th>
                    <th className="text-[16px] font-semibold text-white w-[25%] text-left ">
                      Name of Candidate
                    </th>
                    {/**
                    <th className="text-[16px] font-semibold text-white w-[15%] text-center ">
                      Location
                    </th>*/}
                    <th className="text-[16px] font-semibold text-white w-[15%]">
                      Profile Match
                    </th>
                    <th className="text-[16px] font-semibold text-white w-[15%]">
                      Applied Date
                    </th>
                    <th className="text-[16px] font-semibold text-white w-[15%]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications?.map((item, index) => (
                    <>
                      <tr
                        className="scr1024:w-full w-[95%]  flex flex-row justify-between items-center px-[24px] py-[16px]"
                        key={index}
                      >
                        <th className="w-[5%] flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="h-[14px] w-[14px]"
                            onChange={() => {
                              if (selectedCandidate.length > 0) {
                                setSelectedCandidate([]);
                              } else {
                                setSelectedCandidate(applications);
                              }
                            }}
                          />
                        </th>

                        <th className="  w-[25%] flex flex-row items-center gap-[8px]">
                          <img
                            src={
                              item.profilePhoto
                                ? item.profilePhoto
                                : "/images/services/profile.png"
                            }
                            alt="Selected File"
                            className="w-[40px] h-[40px] rounded-[50%] object-cover"
                          />
                          <span className="text-[14px] font-semibold text-[#333333] text-left">
                            {item.details.personal.firstName +
                              " " +
                              item.details?.personal?.lastName}
                          </span>
                        </th>
                        {/***
                        <th className="text-[14px] font-normal text-[#333333] w-[15%] text-center ">
                          {item?.details?.personal?.currentLocation}
                        </th>*/}
                        <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                          {item.matchingPercentage}%
                        </th>
                        <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                          {dateSeter(item.appliedOn)}
                        </th>
                        <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                          <button
                            className="bg-[#E9EEF6] py-[8px] px-[16px] rounded-[8px] min-w-[146px]"
                            onClick={() =>
                              router.push(
                                `/jobs/details/applicant-details?applicantId=${item.applicantId}&id=${jobPost._id}`
                              )
                            }
                          >
                            See Application
                          </button>
                        </th>
                      </tr>
                      <div className="w-full h-[1px] bg-[#E9EEF6]"> </div>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile">
              <div className="w-full h-[1px] bg-[#E9EEF6]"> </div>
              <div className="flex flex-col ">
                {applications?.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="flex flex-col sm:p-6 p-3 gap-3  "
                    >
                      <div className="flex gap-6 items-center">
                        <input
                          type="checkbox"
                          className="h-[24px] w-[24px]"
                          onChange={() => {
                            if (selectedCandidate.length > 0) {
                              setSelectedCandidate([]);
                            } else {
                              setSelectedCandidate(applications);
                            }
                          }}
                        />
                        <img
                          src={
                            item.profilePhoto
                              ? item.profilePhoto
                              : "/images/services/profile.png"
                          }
                          alt="Selected File"
                          className="w-[40px] h-[40px] rounded-[50%] object-cover"
                        />
                        <span className="text-[14px] font-semibold text-[#333333] text-left">
                          {item.firstName + " " + item.lastName}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between ">
                          <p className="text-[14px] text-[#808080] font-medium w-[60%]">
                            Profile Match
                          </p>
                          <div className=" flex justify-center text-[14px] font-semibold text-[#333333] w-[40%]">
                            {item.matchingPercentage}%
                          </div>
                        </div>
                        <div className="bg-[#DEDEDE] w-full h-[1px]"></div>
                        <div className="flex justify-between ">
                          <p className="text-[14px] text-[#808080] font-medium w-[60%]">
                            Applied Date
                          </p>
                          <div className=" flex justify-center text-[14px] font-semibold text-[#333333] w-[40%]">
                            {dateSeter(item.appliedOn)}
                          </div>
                        </div>
                        {/* <div className="bg-[#DEDEDE] w-full h-[1px]"></div>
                        <div className="flex justify-between ">
                          <p className="text-[14px] text-[#808080] font-medium w-[20%]">Location</p>
                          <div className=" flex justify-center text-[14px] font-semibold text-[#333333] w-[80%]">
                          {item?.location}
                          </div>
                        </div> */}
                      </div>
                      <button
                        className="bg-[#E9EEF6] py-[8px] px-[16px] rounded-[8px] w-full text-[14px] font-semibold"
                        onClick={() =>
                          router.push(
                            `/jobs/details/applicant-details?applicant=${item.resumeId}&job-post=${jobPost._id}`
                          )
                        }
                      >
                        See Application
                      </button>
                    </div>
                    <div className="bg-[#E9EEF6] w-full h-[2px]"></div>
                  </>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full text-[24px] text-[#bebebe] font-semibold h-[40vh]">
            No Applications Received Yet !
          </div>
        )}
        {applications?.length > 0 && (
          <div className="px-[16px] w-full justify-between flex pt-[8px]">
            <div className="flex items-center gap-4">
              <p className="text-[14px] text-[#646464] font-600">View</p>
              <div className="flex gap-[8px] items-center">
                {/* <p className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600">{limit}</p> */}
                <select
                  value={limit}
                  onChange={handleChange}
                  className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600"
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
              <p className="text-[14px] text-[#646464] font-[600]">
                Applicants per page
              </p>
            </div>
            <div
              className="flex items-center"
              style={{ radious: "0px 0px 16px 16px" }}
            >
              <div className="mr-4">{miniLoading && <MiniLoader />}</div>
              <p className="text-[14px] text-[#646464] font-[500]">
                pages
                <span className="text-[#333] px-[10px] font-[600]">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="text-[#333] px-[10px]  font-[600]">
                  {totalPages}
                </span>
              </p>
              <button
                disabled={applications?.previous && !applications?.previous}
              >
                <svg
                  onClick={prevPage}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2529_10517)">
                    <path
                      d="M15 6L9 12L15 18"
                      stroke={applications?.previous ? "#333333" : "#646464"}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2529_10517">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button disabled={!applications?.next}>
                <svg
                  width="25"
                  height="24"
                  onClick={nextPage}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2529_10530)">
                    <path
                      d="M9.375 6L15.625 12L9.375 18"
                      stroke={applications?.next ? "#333333" : "#646464"}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2529_10530">
                      <rect width="25" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Applications;
