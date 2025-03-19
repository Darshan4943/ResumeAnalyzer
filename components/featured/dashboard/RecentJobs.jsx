import { ratingClasses, TablePagination } from "@mui/material";
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
function RecentJobs({ isPending }) {
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

  const fetchJobs = useCallback(async () => {
    setMiniloading(true);
    try {
      const response = await axios.get(
        `https://dev.api.skilotech.com/api/job/getAllJobDetails/${userDataGlobal._id}`,
        {
          params: { page, limit, search: searchQuery },
        }
      );
      const recentApplications = response.data.jobs.slice(0, 5);
      setApplicants(recentApplications);

      // setApplicants(response.data.jobs);
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
        "https://dev.api.skilotech.com/api/hiring/shortlistCandidate",
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

  const texts = ["start", "start", "start", "start", "start", "start", "end"];
  const widths = ["20%", "20%", "16%", "16%", "16%", "7%", "5%"];

  const applicant_head = [
    {
      name: "Job Title",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "Company Name",
      check: "",
    },
    {
      name: "Location",
      check: "",
    },
    {
      name: "Post Date",
      check: "",
    },
    {
      name: "Deadline",
      check: "",
    },
    {
      name: "Status",
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
            <p className="font-[600] text-[16px]">Recent Job Posts</p>
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
          {!applicants?.length == 0 ? (
            <>
              {applicants?.map((applicant, index) => (
                <>
                  <div
                    className={`flex w-[100%] border-b border-[#D4D4D480]  p-[16px] justify-between items-center ${
                      checkedApplicants[index] ? "bg-[#D3F1FF]" : "bg-[#FFFFFF]"
                    }`}
                    key={applicant._id}
                  >
                    <div className="  gap-[20px]  w-full justify-between flex items-center">
                      <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                        <p className="text-[14px] font-[600]">
                          {applicant.jobTitle} {""}
                        </p>
                      </div>
                      <div className="flex w-[20%] items-center justify-start   gap-[8px]">
                        <p className="text-[14px] font-[600]">
                          {applicant.companyName}
                        </p>
                      </div>

                      <div className="flex w-[16%] items-center justify-start  text-[14px] font-[600]   gap-[8px]">
                        {applicant.location}
                      </div>
                      <div className=" flex justify-start w-[16%]">
                        <div className=" flex text-[14px] font-[600] items-center gap-[8px] rounded-[80px] w-fit">
                          {new Date(applicant.createdAt)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(",", "")}
                        </div>
                      </div>
                      <div className=" flex text-[14px] w-[16%] justify-start  font-[600]">
                        <p>
                          {new Date(applicant.deadLine)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(",", "")}
                        </p>
                      </div>

                      <div className="flex text-[12px] w-[7%] font-[500]">
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color:
                              applicant.status === "Active"
                                ? "#0C8A0A"
                                : applicant.status === "Inactive"
                                ? "rgb(221 218 64)"
                                : applicant.status === "Closed"
                                ? "#B3261E"
                                : "gray",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor:
                                applicant.status === "Active"
                                  ? "#0C8A0A"
                                  : applicant.status === "Inactive"
                                  ? "rgb(221 218 64)"
                                  : applicant.status === "Closed"
                                  ? "#B3261E"
                                  : "gray",
                            }}
                          ></span>
                          {applicant.status}
                        </p>
                      </div>

                      <div className="flex justify-end  w-[5%] items-center gap-[16px] relative">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/common/hiring/JobPost?id=${applicant._id}`
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
            {!applicants?.length == 0 ? (
              <>
                {applicants?.map((applicant, index) => (
                  <div
                    onClick={() => {
                      if (!isPopupVisible) {
                        router.push(
                          `/common/hiring/JobPost?id=${applicant._id}`
                        );
                      }
                    }}
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
                            {applicant.jobTitle}
                          </p>
                        </div>
                        <p className="text-[14px] font-[600]">
                          {applicant.companyName}
                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#333] font-[600]">
                          <p>
                            {new Date(applicant.createdAt)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(",", "")}
                          </p>
                        </p>
                        <div className=" flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ">
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              color:
                                applicant.status === "Active"
                                  ? "#0C8A0A"
                                  : applicant.status === "Inactive"
                                  ? "rgb(221 218 64)"
                                  : applicant.status === "Closed"
                                  ? "#B3261E"
                                  : "gray",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor:
                                  applicant.status === "Active"
                                    ? "#0C8A0A"
                                    : applicant.status === "Inactive"
                                    ? "rgb(221 218 64)"
                                    : applicant.status === "Closed"
                                    ? "#B3261E"
                                    : "gray",
                              }}
                            ></span>
                            {applicant.status}
                          </p>
                        </div>{" "}
                      </div>
                      <div className="flex justify-between items-center  w-[100%]">
                        {/* <p className="text-[14px] font-[600]">
                        {new Date(applicant.deadLine)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(",", "")}
                        </p> */}
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

      {/* {totalCount > 5 && (
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
      )} */}
    </>
  );
}

export default RecentJobs;
