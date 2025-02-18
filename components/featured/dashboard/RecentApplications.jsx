import { TablePagination } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import MiniLoader from "../../common/mini-loader";
import MiniLoaderr from "../../common/mini-loader";
import Pagination from "../../common/CustomPagination";
import CustomPagination from "../../common/CustomPagination";
import ShortlistMail from "../../../pages/common/hiring/ShortlistMail";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function RecentApplications({ isPending }) {
  const [id, setId] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [moreOption, setMoreOption] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [applicantIds, setApplicantIds] = useState();
  const [loadingg, setLoadingg] = useState({
    isLoading: false,
    applicantId: null,
  });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [checkedApplicants, setCheckedApplicants] = useState({});
  const [statusChange, setStatusChange] = useState(false);
  const [miniLoading, setMiniloading] = useState(true);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [allReject, setAllReject] = useState(false);
  const [shortlist, setShortlist] = useState([]);
  const [shortlistJobId, setShortlistJobId] = useState([]);
  const [hiringStage, setHiringStage] = useState("");

  const togglePopup = (applicant) => {
    setPopupVisible(!isPopupVisible);
    setShortlist([applicant]);
    setShortlistJobId(applicant?.jobId);
    setApplicantIds([applicant.applicantId]);
  };
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setSearchQuery(isPending);
  }, [isPending]);

  useEffect(() => {
    if (userDataGlobal && userDataGlobal?._id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);

  const widths = ["20%", "10%", "15%", "20%", "15%", "20%"];
  const texts = ["start", "start", "center", "center", "start", "end"];

  const fetchJobs = useCallback(async () => {
    setMiniloading(true);
    try {
      const response = await axios.get(
        `http://localhost:2000/api/job/getAllApplication/${userDataGlobal?._id}`,
        {
          params: { page, limit, search: searchQuery },
        }
      );
      setApplicants(response);
      setTotalCount(response.data.pagination.totalApplications);
      setTotalpages(response.data.pagination.totalPages);
      toast.dismiss();
    } catch (err) {
      console.error("Error fetching job applications:", err);
      toast.error("Failed to fetch job applications. Please try again later.");
    } finally {
      setMiniloading(false);
    }
  }, [userDataGlobal?._id, page, limit, searchQuery]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, statusChange]);

  const handleSend = async (applicant) => {
    setLoadingg({ isLoading: true, applicantId: applicant.applicantId });

    const emailDetails = {
      to: allReject
        ? checkedApplicants?.map((item) => item?.details?.personal?.email)
        : [applicant?.details?.personal?.email],
      cc: "",
      subject: "Unfortunately, Your Application has been Rejected",
      content:
        "<p>Dear Candidate,</p>\n<p>We are pleased to inform you that you have been Rejected .</p>\n<p>Please check your email for further details.</p>\n<p>Best regards,<br />The Skilotech Team</p>",
      applicantId: allReject
        ? checkedApplicants?.map((item) => item?.applicantId)
        : [applicant?.applicantId],
      jobId: applicant.jobId,
      newHiringStage: "Rejected",
    };

    try {
      const response = await axios.post(
        "http://localhost:2000/api/hiring/shortlistCandidate",
        emailDetails
      );

      toast.success("Email sent successfully!");
      setStatusChange(!statusChange);
      setCheckedApplicants([]);
      setLoadingg({ isLoading: false, applicantId: null });

      setAllReject(false);
    } catch (error) {
      setLoadingg({ isLoading: false, applicantId: null });
      setAllReject(false);

      console.error(
        "Error sending email details:",
        error.response?.data || error.message
      );
      toast.error("Failed to send email details. Please try again.");
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedApplicants((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const applicant_head = [
    {
      name: "Name of Candidate",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "source",
      check: "",
    },
    {
      name: "Profile Match",
      check: "",
    },
    {
      name: "Hiring stage",
      check: "",
    },
    {
      name: "Applied Date",
      check: "",
    },
    {
      name: "Action",
      check: "",
    },
  ];
  return (
    <>
      <div className="pt-6">
        <div
          className="flex py-4 px-2 flex-col bg-[#fff] items-center w-full"
          style={{
            boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <div className="flex lg:flex-row flex-col  w-[100%] ml:px-[16px] gap-4 lg:justify-between items-start lg:items-center bg-[#fff]">
            <p className="font-[600] text-[16px]">Recent Applications</p>

            <div className="flex gap-2 items-start justify-end sm:w-[430px]   ">
              <div
                className="flex py-2 px-3 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/employer/icon_search.png"
                  className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="w-full"
                />
              </div>
              {/* <div
                className="flex py-3 px-4 gap-2 justify-center items-center bg-white sm:w-[108px] w-[98px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/profile/fil.png"
                  className=" sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />

                <p className="font-Montserrat text-[14px] sm:text-base font-semibold leading-6 text-[#333]">
                  Filter
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="web">
        <div className="flex p-[16px] items-center   gap-[20px] bg-[#EFFAFF] border border-[#D6DDEB] ">
          {applicant_head.map((applicant_head, index) => (
            <div
              key={index}
              className="flex items-center w-full text-[#333333] gap-[8px]"
              style={{ width: widths[index] }}
            >
              <p
                style={{ textAlign: texts[index] }}
                className={`text-[14px] w-full font-[600] `}
              >
                {applicant_head.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col  items-start bg-[#fff]  overflow-y-auto">
          {!applicants?.data?.applications.length == 0 ? (
            <>
              {applicants?.data?.applications.map((applicant, index) => (
                <>
                  <div
                    className={`flex w-[100%] border-b border-[#D4D4D480]  p-[16px] justify-between items-center ${
                      checkedApplicants[index] ? "bg-[#D3F1FF]" : "bg-[#FFFFFF]"
                    }`}
                    key={applicant._id}
                  >
                    <div className="  gap-[20px]  w-full justify-between flex items-center">
                      <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                        <img
                          className="w-[40px]"
                          src="/images/employer/profile_icon.png"
                          alt=""
                        />
                        <p className="text-[14px] font-[600]">
                          {applicant.details?.personal?.firstName} {""}
                          {applicant.details?.personal?.lastName}
                        </p>
                      </div>
                      <div className="flex w-[10%] items-center justify-start   gap-[8px]">
                        <p className="text-[14px] font-[600]">
                          {applicant.source}
                        </p>
                      </div>

                      <div className="flex w-[15%] items-center justify-center   gap-[8px]">
                        <p className="text-[14px] font-[600]">
                          {applicant.matchingPercentage} %
                        </p>
                      </div>
                      <div className=" flex justify-center w-[20%]">
                        <div
                          className={` flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ${
                            checkedApplicants[index]
                              ? "bg-[#FFFFFF]"
                              : applicant.hiringStage === "Interview"
                              ? "bg-[#26A4FF1A]"
                              : applicant.hiringStage === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicant.hiringStage === "Hired"
                              ? "bg-[#56CDAD1A]"
                              : applicant.hiringStage === "Shortlisted"
                              ? "bg-[#4640DE1A]"
                              : applicant.hiringStage === "Rejected"
                              ? "bg-[#FF65501A]"
                              : applicant.hiringStage === "In Review"
                              ? "bg-[#EB85331A]"
                              : ""
                          } ${
                            applicant.hiringStage === "Interview"
                              ? "text-[#26A4FF]"
                              : applicant.hiringStage === "Pending"
                              ? "text-[#FFB836]"
                              : applicant.hiringStage === "Hired"
                              ? "text-[#56CDAD]"
                              : applicant.hiringStage === "Shortlisted"
                              ? "text-[#4640DE]"
                              : applicant.hiringStage === "Rejected"
                              ? "text-[#FF6550]"
                              : applicant.hiringStage === "In Review"
                              ? "text-[#FFB836]"
                              : "text-[#333333]"
                          }`}
                        >
                          {applicant.hiringStage}
                        </div>
                      </div>
                      <div className=" flex text-[14px] w-[15%]  font-[600]">
                        <p>
                          {new Date(applicant.appliedOn)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(",", "")}
                        </p>
                      </div>
                      <div className="flex justify-end  w-[20%] items-center gap-[16px] relative">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/common/hiring/ApplicantDetails?applicantId=${applicant.applicantId}&id=${applicant.jobId}`
                            )
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.0911 24H2.8901C2.13396 24 1.40878 23.6996 0.874111 23.165C0.339438 22.6303 0.0390625 21.9051 0.0390625 21.149L0.0390625 2.85103C0.0390625 2.09489 0.339438 1.36972 0.874111 0.835048C1.40878 0.300376 2.13396 0 2.8901 0L16.0904 0C16.8465 0 17.5717 0.300376 18.1064 0.835048C18.641 1.36972 18.9414 2.09489 18.9414 2.85103V11.2844C18.9498 11.3737 18.9395 11.4638 18.9111 11.5489C18.8827 11.634 18.8369 11.7123 18.7765 11.7786C18.7161 11.845 18.6425 11.898 18.5604 11.9343C18.4784 11.9705 18.3897 11.9893 18.2999 11.9893C18.2102 11.9893 18.1215 11.9705 18.0394 11.9343C17.9574 11.898 17.8838 11.845 17.8234 11.7786C17.763 11.7123 17.7171 11.634 17.6887 11.5489C17.6603 11.4638 17.65 11.3737 17.6584 11.2844V2.85103C17.6585 2.64763 17.6183 2.44622 17.5403 2.25837C17.4623 2.07052 17.3479 1.89991 17.2038 1.75635C17.0597 1.61278 16.8887 1.49908 16.7006 1.42176C16.5124 1.34444 16.3109 1.30502 16.1075 1.30577H2.8901C2.68573 1.30351 2.48295 1.34181 2.2935 1.41845C2.10404 1.4951 1.93166 1.60856 1.78636 1.75228C1.64105 1.89599 1.52569 2.06711 1.44697 2.25571C1.36825 2.44431 1.32772 2.64666 1.32773 2.85103V21.1661C1.32772 21.3704 1.36825 21.5728 1.44697 21.7614C1.52569 21.95 1.64105 22.1211 1.78636 22.2648C1.93166 22.4085 2.10404 22.522 2.2935 22.5987C2.48295 22.6753 2.68573 22.7136 2.8901 22.7113H13.0911C13.262 22.7113 13.4259 22.7792 13.5467 22.9001C13.6675 23.0209 13.7354 23.1848 13.7354 23.3557C13.7354 23.5266 13.6675 23.6904 13.5467 23.8113C13.4259 23.9321 13.262 24 13.0911 24Z"
                              fill="#224D90"
                            />
                            <path
                              d="M14.8904 6.88738H4.05644C3.96712 6.89581 3.87702 6.88549 3.79191 6.85709C3.70681 6.82869 3.62857 6.78282 3.56222 6.72243C3.49586 6.66205 3.44285 6.58847 3.40657 6.50641C3.3703 6.42435 3.35156 6.33562 3.35156 6.2459C3.35156 6.15618 3.3703 6.06744 3.40657 5.98538C3.44285 5.90332 3.49586 5.82974 3.56222 5.76936C3.62857 5.70897 3.70681 5.66311 3.79191 5.6347C3.87702 5.6063 3.96712 5.59598 4.05644 5.60441H14.8904C15.0501 5.61949 15.1984 5.69358 15.3064 5.81222C15.4143 5.93085 15.4742 6.08549 15.4742 6.2459C15.4742 6.4063 15.4143 6.56094 15.3064 6.67957C15.1984 6.79821 15.0501 6.87231 14.8904 6.88738Z"
                              fill="#224D90"
                            />
                            <path
                              d="M10.0327 11.898H4.07402C3.90313 11.898 3.73924 11.8302 3.61841 11.7093C3.49757 11.5885 3.42969 11.4246 3.42969 11.2537C3.42969 11.0828 3.49757 10.9189 3.61841 10.7981C3.73924 10.6773 3.90313 10.6094 4.07402 10.6094H10.0327C10.2036 10.6094 10.3675 10.6773 10.4883 10.7981C10.6091 10.9189 10.677 11.0828 10.677 11.2537C10.677 11.4246 10.6091 11.5885 10.4883 11.7093C10.3675 11.8302 10.2036 11.898 10.0327 11.898Z"
                              fill="#224D90"
                            />
                            <path
                              d="M18.02 22.0655C13.9887 22.0655 12.1925 18.2964 12.1184 18.1367C12.0809 18.0548 12.0649 17.9648 12.0719 17.875C12.0789 17.7852 12.1086 17.6987 12.1583 17.6236C12.2552 17.4753 14.5361 14.0312 18.02 14.0312C21.504 14.0312 23.7848 17.4525 23.8818 17.6178C23.9354 17.7033 23.9639 17.8021 23.9639 17.903C23.9639 18.0038 23.9354 18.1026 23.8818 18.1881C23.819 18.3306 21.7093 22.0655 18.02 22.0655ZM13.2303 17.96C13.6808 18.7526 15.2089 20.9992 18.02 20.9992C20.5518 20.9992 22.2624 18.7469 22.7927 17.9372C22.2225 17.1845 20.375 15.0861 18.02 15.0861C15.6651 15.0861 13.7891 17.2244 13.2303 17.96Z"
                              fill="#224D90"
                            />
                            <path
                              d="M18.1621 19.2071C18.7479 19.2071 19.2227 18.7323 19.2227 18.1465C19.2227 17.5608 18.7479 17.0859 18.1621 17.0859C17.5764 17.0859 17.1016 17.5608 17.1016 18.1465C17.1016 18.7323 17.5764 19.2071 18.1621 19.2071Z"
                              fill="#224D90"
                            />
                          </svg>
                        </div>
                        <button
                          disabled={
                            applicant?.hiringStage === "Rejected" ||
                            applicant?.hiringStage === "Shortlisted" ||
                            applicant?.hiringStage === "Hired"
                          }
                          style={{
                            opacity:
                              applicant?.hiringStage === "Rejected" ||
                              applicant?.hiringStage === "Shortlisted" ||
                              applicant?.hiringStage === "Hired"
                                ? 0.5
                                : 1,
                          }}
                          onClick={() => {
                            setHiringStage("Shortlisted");
                            togglePopup(applicant);
                          }}
                          className="text-[10px] flex justify-center items-center leading-tight text-white font-[500] py-[6px] px-[8px] rounded-[30px] bg-[#06A9EF]"
                        >
                          Shortlist
                        </button>

                        <>
                          {isPopupVisible && (
                            <ShortlistMail
                              shortlist={shortlist}
                              setPopupVisible={setPopupVisible}
                              id={shortlistJobId}
                              statusChange={statusChange}
                              setStatusChange={setStatusChange}
                              applicantIds={applicantIds}
                              newHiringStage={hiringStage}
                            />
                          )}
                        </>
                        {/* {loadingg.isLoading &&
                        loadingg.applicantId === applicant.applicantId ? (
                          <div className="w-[49.81px] flex justify-center items-center">
                            <MiniLoaderr />
                          </div>
                        ) : ( */}
                        <button
                          disabled={applicant?.hiringStage === "Rejected"}
                          style={{
                            opacity:
                              applicant?.hiringStage === "Rejected" ? 0.5 : 1,
                          }}
                          onClick={() => {
                            setHiringStage("Rejected");
                            togglePopup(applicant);
                          }}
                          className="text-[10px] font-[500] py-[4px] px-[8px] rounded-[30px] border-[1px] border-[#B3261E] text-[#B3261E]"
                        >
                          Reject
                        </button>
                        {/* )} */}

                        <AnimatePresence>
                          {moreOption && selectedDotIndex === index && (
                            <motion.div
                              initial={{ x: "100%" }}
                              animate={{ x: 0 }}
                              exit={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                              ref={taskRef}
                              className="absolute flex flex-col  rounded-[8px] left-0 right-0 z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-2 bg-white"
                              style={{
                                boxShadow:
                                  "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <div className="flex gap-[8px]  p-2 items-center flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_6622_123448)">
                                    <path
                                      d="M17.25 21.7501V18.7501H14.25V17.2501H17.25V14.2501H18.75V17.2501H21.75V18.7501H18.75V21.7501L17.25 21.7501ZM5.3077 19.5001C4.80257 19.5001 4.375 19.3251 4.025 18.9751C3.675 18.6251 3.5 18.1975 3.5 17.6924V6.30784C3.5 5.80271 3.675 5.37514 4.025 5.02514C4.375 4.67514 4.80257 4.50014 5.3077 4.50014H6.69233V2.38477H8.23075V4.50014H13.8077V2.38477H15.3076V4.50014H16.6922C17.1974 4.50014 17.625 4.67514 17.975 5.02514C18.325 5.37514 18.5 5.80271 18.5 6.30784V12.2155C18.25 12.1847 18 12.1694 17.75 12.1694C17.5 12.1694 17.25 12.1847 17 12.2155V10.3078H4.99997V17.6924C4.99997 17.7693 5.03202 17.8398 5.09612 17.904C5.16024 17.9681 5.23077 18.0001 5.3077 18.0001H12.1442C12.1442 18.2501 12.1596 18.5001 12.1904 18.7501C12.2211 19.0001 12.2776 19.2501 12.3596 19.5001H5.3077ZM4.99997 8.80787H17V6.30784C17 6.23091 16.9679 6.16038 16.9038 6.09627C16.8397 6.03217 16.7692 6.00012 16.6922 6.00012H5.3077C5.23077 6.00012 5.16024 6.03217 5.09612 6.09627C5.03202 6.16038 4.99997 6.23091 4.99997 6.30784V8.80787Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                <div className="block py-1 justify-start text-[14px]">
                                  Schedule Interview
                                </div>
                              </div>
                              <div className="flex gap-[8px] p-2 items-center flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_6622_123454)">
                                    <path
                                      d="M9.3077 18.7503V17.2504H20.5V18.7503H9.3077ZM9.3077 12.7503V11.2504H20.5V12.7503H9.3077ZM9.3077 6.75031V5.25036H20.5V6.75031H9.3077ZM5.16345 19.6638C4.706 19.6638 4.3144 19.5009 3.98865 19.1751C3.66288 18.8494 3.5 18.4578 3.5 18.0003C3.5 17.5429 3.66288 17.1513 3.98865 16.8255C4.3144 16.4998 4.706 16.3369 5.16345 16.3369C5.6209 16.3369 6.0125 16.4998 6.33825 16.8255C6.664 17.1513 6.82687 17.5429 6.82687 18.0003C6.82687 18.4578 6.664 18.8494 6.33825 19.1751C6.0125 19.5009 5.6209 19.6638 5.16345 19.6638ZM5.16345 13.6638C4.706 13.6638 4.3144 13.5009 3.98865 13.1751C3.66288 12.8494 3.5 12.4578 3.5 12.0003C3.5 11.5429 3.66288 11.1513 3.98865 10.8255C4.3144 10.4998 4.706 10.3369 5.16345 10.3369C5.6209 10.3369 6.0125 10.4998 6.33825 10.8255C6.664 11.1513 6.82687 11.5429 6.82687 12.0003C6.82687 12.4578 6.664 12.8494 6.33825 13.1751C6.0125 13.5009 5.6209 13.6638 5.16345 13.6638ZM5.16345 7.66376C4.706 7.66376 4.3144 7.50089 3.98865 7.17514C3.66288 6.84939 3.5 6.45779 3.5 6.00034C3.5 5.54289 3.66288 5.15129 3.98865 4.82554C4.3144 4.49979 4.706 4.33691 5.16345 4.33691C5.6209 4.33691 6.0125 4.49979 6.33825 4.82554C6.664 5.15129 6.82687 5.54289 6.82687 6.00034C6.82687 6.45779 6.664 6.84939 6.33825 7.17514C6.0125 7.50089 5.6209 7.66376 5.16345 7.66376Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                <div className="block py-1 justify-start break-words">
                                  Send Assessment
                                </div>
                              </div>
                              <div className="flex gap-[8px] p-2 items-center flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_6622_123460)">
                                    <path
                                      d="M17.4 12.6539L16.3461 11.6L18.4307 9.50003L16.3461 7.42503L17.4 6.35583L19.5 8.45583L21.575 6.35583L22.6442 7.42503L20.5538 9.50003L22.6442 11.6L21.575 12.6539L19.5 10.5789L17.4 12.6539ZM8.99995 11.6923C8.03747 11.6923 7.21352 11.3496 6.5281 10.6642C5.84268 9.97879 5.49997 9.15484 5.49997 8.19236C5.49997 7.22986 5.84268 6.40591 6.5281 5.72051C7.21352 5.03509 8.03747 4.69238 8.99995 4.69238C9.96243 4.69238 10.7864 5.03509 11.4718 5.72051C12.1572 6.40591 12.4999 7.22986 12.4999 8.19236C12.4999 9.15484 12.1572 9.97879 11.4718 10.6642C10.7864 11.3496 9.96243 11.6923 8.99995 11.6923ZM1.5 19.3077V17.0846C1.5 16.5949 1.633 16.1414 1.899 15.7241C2.16503 15.3068 2.52048 14.986 2.96535 14.7616C3.95382 14.277 4.95093 13.9135 5.9567 13.6712C6.96247 13.4289 7.97688 13.3078 8.99995 13.3078C10.023 13.3078 11.0374 13.4289 12.0432 13.6712C13.049 13.9135 14.0461 14.277 15.0345 14.7616C15.4794 14.986 15.8349 15.3068 16.1009 15.7241C16.3669 16.1414 16.4999 16.5949 16.4999 17.0846V19.3077H1.5ZM2.99995 17.8077H15V17.0846C15 16.8821 14.9413 16.6946 14.824 16.5221C14.7067 16.3497 14.5474 16.209 14.3461 16.1C13.4846 15.6757 12.6061 15.3542 11.7107 15.1356C10.8152 14.917 9.91165 14.8077 8.99995 14.8077C8.08825 14.8077 7.18468 14.917 6.28925 15.1356C5.39382 15.3542 4.51533 15.6757 3.6538 16.1C3.45252 16.209 3.29323 16.3497 3.17593 16.5221C3.05861 16.6946 2.99995 16.8821 2.99995 17.0846V17.8077ZM8.99995 10.1924C9.54995 10.1924 10.0208 9.99653 10.4124 9.60486C10.8041 9.21319 11 8.74236 11 8.19236C11 7.64236 10.8041 7.17153 10.4124 6.77986C10.0208 6.38819 9.54995 6.19236 8.99995 6.19236C8.44995 6.19236 7.97912 6.38819 7.58745 6.77986C7.19578 7.17153 6.99995 7.64236 6.99995 8.19236C6.99995 8.74236 7.19578 9.21319 7.58745 9.60486C7.97912 9.99653 8.44995 10.1924 8.99995 10.1924Z"
                                      fill="#C00000"
                                    />
                                  </g>
                                </svg>
                                <a className="block py-1 text-[#C00000]">
                                  Reject Candidate
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="p-10 w-full flex items-center justify-center">
              <img
                src="/images/employer/OBJECTS.png"
                alt="No data available"
                className="h-[114px] w-[200px]"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mobile">
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff] rounded-b-[16px] p-2 pb-3  overflow-y-auto w-[100%]">
            {!applicants?.data?.applications.length == 0 ? (
              <>
                {applicants?.data?.applications.map((applicant, index) => (
                  <div
                    onClick={() =>
                      router.push(
                        `/common/hiring/ApplicantDetails?applicantId=${applicant.applicantId}&id=${applicant.jobId}`
                      )
                    }
                    key={index}
                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl bg-[#FFFFFF]"
                    style={{
                      border: "1px solid #DEDEDE",
                    }}
                  >
                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start">
                      <div className="flex justify-between items-center self-stretch">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-[30px] h-[30px]"
                            src="/images/profile/john_doe.png"
                            alt=""
                          />
                          <p className="text-[14px] text-[#333] font-[600]">
                            {applicant.details?.personal?.firstName}
                          </p>
                        </div>
                        <p className="text-[14px] font-[600]">
                          {applicant.matchingPercentage} %
                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#333] font-[600]">
                          <p>
                            {new Date(applicant.appliedOn)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(",", "")}
                          </p>
                        </p>
                        <div
                          className={` flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ${
                            checkedApplicants[index]
                              ? "bg-[#FFFFFF]"
                              : applicant.hiringStage === "Interview"
                              ? "bg-[#26A4FF1A]"
                              : applicant.hiringStage === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicant.hiringStage === "Hired"
                              ? "bg-[#56CDAD1A]"
                              : applicant.hiringStage === "Shortlisted"
                              ? "bg-[#4640DE1A]"
                              : applicant.hiringStage === "Rejected"
                              ? "bg-[#FF65501A]"
                              : applicant.hiringStage === "In Review"
                              ? "bg-[#EB85331A]"
                              : ""
                          } ${
                            applicant.hiringStage === "Interview"
                              ? "text-[#26A4FF]"
                              : applicant.hiringStage === "Pending"
                              ? "text-[#FFB836]"
                              : applicant.hiringStage === "Hired"
                              ? "text-[#56CDAD]"
                              : applicant.hiringStage === "Shortlisted"
                              ? "text-[#4640DE]"
                              : applicant.hiringStage === "Rejected"
                              ? "text-[#FF6550]"
                              : applicant.hiringStage === "In Review"
                              ? "text-[#FFB836]"
                              : "text-[#333333]"
                          }`}
                        >
                          {applicant.hiringStage}
                        </div>{" "}
                      </div>
                      <div className="flex justify-between items-center  w-[100%]">
                        <p className="text-[14px] font-[600]">
                          {applicant.source}
                        </p>
                        <div className="flex gap-[10px]">
                          <button
                            disabled={
                              applicant?.hiringStage === "Rejected" ||
                              applicant?.hiringStage === "Shortlisted"
                            }
                            style={{
                              opacity:
                                applicant?.hiringStage === "Rejected" ||
                                applicant?.hiringStage === "Shortlisted"
                                  ? 0.5
                                  : 1,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePopup(applicant);
                            }}
                            className="text-[10px] flex justify-center items-center leading-tight text-white font-[500] py-[8px] px-[10px] rounded-[30px] bg-[#06A9EF]"
                          >
                            Shortlist
                          </button>
                          <>
                            {isPopupVisible && (
                              <ShortlistMail
                                shortlist={shortlist}
                                setPopupVisible={setPopupVisible}
                                id={shortlistJobId}
                                statusChange={statusChange}
                                setStatusChange={setStatusChange}
                                applicantIds={applicantIds}
                                newHiringStage={"Shortlisted"}
                              />
                            )}
                          </>
                          <button
                            disabled={applicant?.hiringStage === "Rejected"}
                            style={{
                              opacity:
                                applicant?.hiringStage === "Rejected" ? 0.5 : 1,
                            }}
                            onClick={() => handleSend(applicant)}
                            className="text-[10px] font-[500] py-[8px] px-[10px] rounded-[30px] border-[1px] border-[#B3261E] text-[#B3261E]"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-10 w-full flex items-center justify-center">
                <img
                  src="/images/employer/OBJECTS.png"
                  alt="No data available"
                  className="h-[200px] w-[300px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {totalCount > 5 && (
        <CustomPagination
          setMiniloading={setMiniloading}
          miniLoading={miniLoading}
          setPage={setPage}
          title={"Applications"}
          setLimit={setLimit}
          defaultLimit={10}
          totalPages={totalPages}
          limit={limit}
          page={page}
        />
      )}
    </>
  );
}

export default RecentApplications;
