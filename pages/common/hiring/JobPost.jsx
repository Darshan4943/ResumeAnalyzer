import React, { useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import JobDetails from "./JobDetails";
import Analytics from "../../../components/featured/employer/Analytics";
import CustomPagination from "../../../components/common/CustomPagination";
import MiniLoader from "../../../components/common/miniLoader";
function JobPost({ toggleContentt, setToggle, data, selectedJob }) {
  const [option, setOption] = useState(0);
  const [moreOption, setMoreOption] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeOption, setActiveOption] = useState("applicant");
  const router = useRouter();
  const { id } = router.query;
  const [checkedApplicants, setCheckedApplicants] = useState({});
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [shortlist, setShortlist] = useState();
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [limit, setLimit] = useState(5);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [miniloading, setMiniloading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const togglePopup = (applicant) => {
    setPopupVisible(!isPopupVisible);
    setShortlist(applicant);
  };

  useEffect(() => {
    setLoading(true);
    const fetchJobDetails = async () => {
      setLoading(true);
      setMiniloading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:2000/api/job/getByIdApplication/${id}?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching job details: ${response.statusText}`);
        }
        const data = await response.json();
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setJobDetails(data);
        setTotalCount(data.pagination.totalCount);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setMiniloading(false);
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, page, limit]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedDotIndex, setSelectedDotIndex] = useState(null);

  const handleDotClick = (index) => {
    setMoreOption((prev) => !prev);
    setSelectedDotIndex(index);
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setMoreOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const applicant_head = [
    {
      name: "Name of Candidate",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "Rating",
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

  const applicant = [
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/empty_star.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",
      profile: "87%",
      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/empty_star.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",
      profile: "87%",
      status: "In Review",
      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",
      profile: "87%",
      status: "Shortlisted",
      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "5.0",
      profile: "87%",
      status: "Hired",
      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "2.0",
      profile: "87%",
      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",
      profile: "87%",
      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "3.0",
      profile: "87%",
      status: "Interview",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",
      profile: "87%",
      status: "Rejected",

      date: "13 July, 2021",
    },
  ];

  const widths = ["20%", "10%", "15%", "20%", "15%", "20%"];
  const handleCheckboxChange = (index) => {
    const updatedCheckedApplicants = [...checkedApplicants];
    updatedCheckedApplicants[index] = !checkedApplicants[index];
    setCheckedApplicants(updatedCheckedApplicants);
    const allChecked = updatedCheckedApplicants.every((item) => item);
    setSelectAll(allChecked);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedCheckedApplicants = Array(jobDetails?.length).fill(
      newSelectAll
    );
    setCheckedApplicants(updatedCheckedApplicants);
  };

  return (
    <div className=" mb-4 ">
      <div className="w-[100%] ml:max-h-[78vh] flex flex-col  relative   ">
        {jobDetails && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col w-[100%] scr700:px-[32px] px-[16px] py-[24px] justify-between rounded-[12px] gap-[17px] bg-[#fff] ">
              <div className="flex justify-between w-[100%] items-center">
                <div className="flex gap-[20px] justify-center  items-center">
                  <div onClick={router.back}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.371 8.7481L8.54025 13.9174C8.68892 14.066 8.76233 14.24 8.7605 14.4394C8.7585 14.6387 8.68 14.8159 8.525 14.9711C8.36983 15.1159 8.19417 15.1909 7.998 15.1961C7.80183 15.2013 7.62617 15.1263 7.471 14.9711L1.13075 8.63085C1.03708 8.53718 0.971083 8.43843 0.93275 8.3346C0.89425 8.23077 0.875 8.1186 0.875 7.9981C0.875 7.8776 0.89425 7.76543 0.93275 7.6616C0.971083 7.55777 1.03708 7.45902 1.13075 7.36535L7.471 1.0251C7.6095 0.886602 7.781 0.815768 7.9855 0.812602C8.19 0.809435 8.36983 0.880268 8.525 1.0251C8.68 1.18027 8.7575 1.35844 8.7575 1.5596C8.7575 1.76094 8.68 1.93918 8.525 2.09435L3.371 7.2481H14.748C14.9608 7.2481 15.139 7.31993 15.2825 7.4636C15.4262 7.6071 15.498 7.78527 15.498 7.9981C15.498 8.21093 15.4262 8.3891 15.2825 8.5326C15.139 8.67627 14.9608 8.7481 14.748 8.7481H3.371Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>
                  <div className="text-[16px] text-[#333333] font-[600]">
                    {jobDetails?.data?.jobDetails?.jobTitle}
                  </div>
                  <div className="flex justify-center items-center gap-[4px]">
                    {jobDetails?.data?.jobDetails?.status === "Live" ? (
                      <>
                        <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#0C8A0A] rounded-[90px]"></div>
                        <div className="text-[12px] font-[500] text-[#0C8A0A]">
                          Active
                        </div>
                      </>
                    ) : jobDetails?.data?.jobDetails?.status === "Hold" ? (
                      <>
                        <div className="w-[6px] h-[6px] bg-[#ddda40] rounded-full"></div>
                        <div className="text-[12px] font-[500] text-[#ddda40]">
                          On Hold
                        </div>
                      </>
                    ) : jobDetails?.data?.jobDetails?.status === "Closed" ? (
                      <>
                        <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#B3261E] rounded-[90px]"></div>
                        <div className="text-[12px] font-[500] text-[#B3261E]">
                          Inactive
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8055 19.5C14.057 19.5 13.4215 19.2383 12.899 18.7148C12.3767 18.1912 12.1155 17.5556 12.1155 16.8078C12.1155 16.7078 12.1501 16.4648 12.2193 16.0788L5.10775 11.8923C4.86675 12.1423 4.58042 12.3381 4.24875 12.4798C3.91708 12.6214 3.56175 12.6923 3.18275 12.6923C2.43758 12.6923 1.80417 12.4294 1.2825 11.9038C0.760833 11.3781 0.5 10.7435 0.5 10C0.5 9.2565 0.760833 8.62192 1.2825 8.09625C1.80417 7.57058 2.43758 7.30775 3.18275 7.30775C3.56175 7.30775 3.91708 7.37858 4.24875 7.52025C4.58042 7.66192 4.86675 7.85775 5.10775 8.10775L12.2193 3.93075C12.1796 3.80775 12.1523 3.68725 12.1375 3.56925C12.1228 3.45125 12.1155 3.32558 12.1155 3.19225C12.1155 2.44442 12.3774 1.80875 12.9012 1.28525C13.4253 0.761749 14.0615 0.5 14.81 0.5C15.5585 0.5 16.1939 0.762 16.7163 1.286C17.2388 1.80983 17.5 2.446 17.5 3.1945C17.5 3.943 17.2383 4.5785 16.7148 5.101C16.1912 5.62333 15.5556 5.8845 14.8077 5.8845C14.4269 5.8845 14.0728 5.81208 13.7452 5.66725C13.4176 5.52242 13.1333 5.325 12.8923 5.075L5.78075 9.2615C5.82042 9.38467 5.84767 9.50517 5.8625 9.623C5.87717 9.741 5.8845 9.86667 5.8845 10C5.8845 10.1333 5.87717 10.259 5.8625 10.377C5.84767 10.4948 5.82042 10.6153 5.78075 10.7385L12.8923 14.925C13.1333 14.675 13.4176 14.4776 13.7452 14.3328C14.0728 14.1879 14.4269 14.1155 14.8077 14.1155C15.5556 14.1155 16.1912 14.3774 16.7148 14.9012C17.2383 15.4253 17.5 16.0615 17.5 16.81C17.5 17.5585 17.238 18.1939 16.714 18.7163C16.1902 19.2388 15.554 19.5 14.8055 19.5ZM14.8077 18C15.1456 18 15.4287 17.8857 15.6572 17.6572C15.8857 17.4287 16 17.1456 16 16.8078C16 16.4699 15.8857 16.1868 15.6572 15.9583C15.4287 15.7296 15.1456 15.6152 14.8077 15.6152C14.4699 15.6152 14.1868 15.7296 13.9583 15.9583C13.7296 16.1868 13.6152 16.4699 13.6152 16.8078C13.6152 17.1456 13.7296 17.4287 13.9583 17.6572C14.1868 17.8857 14.4699 18 14.8077 18ZM3.18275 11.1923C3.52325 11.1923 3.80867 11.078 4.039 10.8495C4.2695 10.621 4.38475 10.3378 4.38475 10C4.38475 9.66217 4.2695 9.379 4.039 9.1505C3.80867 8.922 3.52325 8.80775 3.18275 8.80775C2.84758 8.80775 2.56667 8.922 2.34 9.1505C2.11333 9.379 2 9.66217 2 10C2 10.3378 2.11333 10.621 2.34 10.8495C2.56667 11.078 2.84758 11.1923 3.18275 11.1923ZM14.8077 4.38475C15.1456 4.38475 15.4287 4.27042 15.6572 4.04175C15.8857 3.81325 16 3.53008 16 3.19225C16 2.85442 15.8857 2.57125 15.6572 2.34275C15.4287 2.11425 15.1456 2 14.8077 2C14.4699 2 14.1868 2.11425 13.9583 2.34275C13.7296 2.57125 13.6152 2.85442 13.6152 3.19225C13.6152 3.53008 13.7296 3.81325 13.9583 4.04175C14.1868 4.27042 14.4699 4.38475 14.8077 4.38475Z"
                      fill="#646464"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col scr1024:flex-row justify-between">
                <div className="flex gap-[10px]  justify-start">
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.33073 11.7474C1.0099 11.7474 0.735243 11.6332 0.506771 11.4047C0.278299 11.1762 0.164062 10.9016 0.164062 10.5807V4.16406C0.164062 3.84323 0.278299 3.56858 0.506771 3.3401C0.735243 3.11163 1.0099 2.9974 1.33073 2.9974H3.66406V1.83073C3.66406 1.5099 3.7783 1.23524 4.00677 1.00677C4.23524 0.778299 4.5099 0.664062 4.83073 0.664062H7.16406C7.48489 0.664062 7.75955 0.778299 7.98802 1.00677C8.21649 1.23524 8.33073 1.5099 8.33073 1.83073V2.9974H10.6641C10.9849 2.9974 11.2595 3.11163 11.488 3.3401C11.7165 3.56858 11.8307 3.84323 11.8307 4.16406V10.5807C11.8307 10.9016 11.7165 11.1762 11.488 11.4047C11.2595 11.6332 10.9849 11.7474 10.6641 11.7474H1.33073ZM1.33073 10.5807H10.6641V4.16406H1.33073V10.5807ZM4.83073 2.9974H7.16406V1.83073H4.83073V2.9974Z"
                        fill="#646464"
                      />
                    </svg>
                    <div className="text-[12px] text-[#262626] font-[500]">
                      {jobDetails?.data?.jobDetails?.revalentExp}
                    </div>
                  </div>
                  <div className="border-[1px] border-[#AFAFAF]"></div>
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="10"
                      height="13"
                      viewBox="0 0 10 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66927 11.1641H7.33594V9.41406C7.33594 8.7724 7.10746 8.22309 6.65052 7.76615C6.19358 7.3092 5.64427 7.08073 5.0026 7.08073C4.36094 7.08073 3.81163 7.3092 3.35469 7.76615C2.89774 8.22309 2.66927 8.7724 2.66927 9.41406V11.1641ZM5.0026 5.91406C5.64427 5.91406 6.19358 5.68559 6.65052 5.22865C7.10746 4.7717 7.33594 4.2224 7.33594 3.58073V1.83073H2.66927V3.58073C2.66927 4.2224 2.89774 4.7717 3.35469 5.22865C3.81163 5.68559 4.36094 5.91406 5.0026 5.91406ZM0.335938 12.3307V11.1641H1.5026V9.41406C1.5026 8.82101 1.64115 8.26441 1.91823 7.74427C2.19531 7.22413 2.58177 6.80851 3.0776 6.4974C2.58177 6.18629 2.19531 5.77066 1.91823 5.25052C1.64115 4.73038 1.5026 4.17378 1.5026 3.58073V1.83073H0.335938V0.664062H9.66927V1.83073H8.5026V3.58073C8.5026 4.17378 8.36406 4.73038 8.08698 5.25052C7.8099 5.77066 7.42344 6.18629 6.9276 6.4974C7.42344 6.80851 7.8099 7.22413 8.08698 7.74427C8.36406 8.26441 8.5026 8.82101 8.5026 9.41406V11.1641H9.66927V12.3307H0.335938Z"
                        fill="#646464"
                      />
                    </svg>
                    <div className="text-[12px] txet-[#262626] font-[500]">
                      {jobDetails?.data?.jobDetails?.jobType}
                    </div>
                  </div>
                  <div className="border-[1px] border-[#AFAFAF]"></div>
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="10"
                      height="13"
                      viewBox="0 0 10 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.0026 6.4974C5.32344 6.4974 5.59809 6.38316 5.82656 6.15469C6.05503 5.92622 6.16927 5.65156 6.16927 5.33073C6.16927 5.0099 6.05503 4.73524 5.82656 4.50677C5.59809 4.2783 5.32344 4.16406 5.0026 4.16406C4.68177 4.16406 4.40712 4.2783 4.17865 4.50677C3.95017 4.73524 3.83594 5.0099 3.83594 5.33073C3.83594 5.65156 3.95017 5.92622 4.17865 6.15469C4.40712 6.38316 4.68177 6.4974 5.0026 6.4974ZM5.0026 10.7849C6.18871 9.69601 7.06858 8.70677 7.64219 7.81719C8.2158 6.9276 8.5026 6.13767 8.5026 5.4474C8.5026 4.38767 8.16476 3.51997 7.48906 2.84427C6.81337 2.16858 5.98455 1.83073 5.0026 1.83073C4.02066 1.83073 3.19184 2.16858 2.51615 2.84427C1.84045 3.51997 1.5026 4.38767 1.5026 5.4474C1.5026 6.13767 1.78941 6.9276 2.36302 7.81719C2.93663 8.70677 3.81649 9.69601 5.0026 10.7849ZM5.0026 12.3307C3.43733 10.9988 2.26823 9.76163 1.49531 8.61927C0.722396 7.47691 0.335938 6.41962 0.335938 5.4474C0.335938 3.98906 0.805035 2.82726 1.74323 1.96198C2.68142 1.0967 3.76788 0.664062 5.0026 0.664062C6.23733 0.664062 7.32378 1.0967 8.26198 1.96198C9.20017 2.82726 9.66927 3.98906 9.66927 5.4474C9.66927 6.41962 9.28281 7.47691 8.5099 8.61927C7.73698 9.76163 6.56788 10.9988 5.0026 12.3307Z"
                        fill="#646464"
                      />
                    </svg>
                    <div className="text-[12px] text-[#262626] font-[500]">
                      {jobDetails?.data?.jobDetails?.location?.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <div className="text-[14px] font-[600] text-[#333333]">
                    Total Applications
                  </div>
                  <div className="text-[24px] font-[600] text-[#333333]">
                    {jobDetails?.pagination?.length}
                  </div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <div className="text-[14px] font-[600] text-[#333333]">
                    Customer Support
                  </div>
                  <div className="text-[16px] font-[600] text-[#333333]">
                    4 /{" "}
                    <span className="text-[16px] font-[600] text-[#646464]">
                      {" "}
                      11 Hired
                    </span>
                  </div>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="text-[12px] font-[500] text-[#646464]">
                    Date posted
                  </div>
                  <svg
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2.5" r="2" fill="#333333" />
                  </svg>
                  <div className="text-[14px] font-[600] text-[#333333]">
                    {new Date(
                      jobDetails?.data?.jobDetails?.createdAt
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex px-[16px] ms:text-[16px] text-[14px] rounded-t-[16px]  items-start  ml:gap-[40px] gap-2 bg-[#fff]">
                <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                  <p
                    onClick={() => {
                      setOption(0), setActiveOption("applicant");
                    }}
                    className={` ${
                      activeOption === "applicant" ? "" : "text-[#646464]"
                    } cursor-pointer text-[16px] font-[600]`}
                  >
                    Applicant
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="89"
                    height="4"
                    viewBox="0 0 89 4"
                    fill="none"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                      fill={activeOption === "applicant" ? "#06A9EF" : "white"}
                    />
                  </svg>
                </div>
                <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                  <p
                    onClick={() => {
                      setOption(1), setActiveOption("JobDetails");
                    }}
                    className={` ${
                      activeOption === "JobDetails" ? "" : "text-[#646464]"
                    } cursor-pointer font-[600]`}
                  >
                    Job Details
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="89"
                    height="4"
                    viewBox="0 0 89 4"
                    fill="none"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                      fill={activeOption === "JobDetails" ? "#06A9EF" : "white"}
                    />
                  </svg>
                </div>
                <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                  <p
                    onClick={() => {
                      setOption(2), setActiveOption("Analytics");
                    }}
                    className={` ${
                      activeOption === "Analytics" ? "" : "text-[#646464]"
                    } cursor-pointer font-[600]`}
                  >
                    Analytics
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="89"
                    height="4"
                    viewBox="0 0 89 4"
                    fill="none"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                      fill={activeOption === "Analytics" ? "#06A9EF" : "white"}
                    />
                  </svg>
                </div>
              </div>
              <div className="h-[1px] bg-[#D6DDEB] w-full"></div>
            </div>
          </div>
        )}
        {option === 0 && (
          <div>
            {loading ? (
              <MiniLoader />
            ) : data?.length === 0 ? (
              <div className="p-3  flex items-center justify-center">
                <img
                  className="w-[40%]"
                  src="/images/employer/OBJECTS.png"
                  alt="No data available"
                />
              </div>
            ) : (
              <>
                <div className="flex scr700:flex-row flex-col p-[16px] justify-between scr700:items-center gap-4  bg-[#fff]">
                  <div className="flex items-start gap-[8px]">
                    <div className="ml:w-[314px] flex py-[12px] px-[16px] gap-[16px] rounded-[6px] border border-[#D6DDEB] bg-[#fff]">
                      <img
                        className="w-[24px] h-[24px]"
                        src="/images/employer/icon_search.png"
                        alt=""
                      />
                      <input
                        type="text"
                        placeholder="Search"
                        className="sm:w-full w-[100px]"
                      />
                    </div>
                    <div className="flex py-[12px] px-[16px] justify-center gap-[8px]">
                      <img
                        className="w-[24px]"
                        src="/images/employer/Icon_filter.png"
                        alt=""
                      />
                      <p className="font-[600]">Filter</p>
                    </div>
                  </div>
                  <div className="flex gap-[8px]">
                    <div className="text-[14px] font-[600] text-[#FFFFFF] bg-[#06A9EF] rounded-[30px] py-[12px] px-[36px]">
                      Shortlist
                    </div>
                    <div className="text-[14px] font-[600] text-[#B3261E] border-[1px] border-[#B3261E] rounded-[30px] py-[12px] px-[36px]">
                      Reject
                    </div>
                  </div>
                </div>
                <div className="web">
                  <div className="flex p-[16px] items-center   gap-[20px] bg-[#EFFAFF] border border-[#D6DDEB] ">
                    <input
                      className="w-[16px] h-[16px]"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    {applicant_head.map((applicant_head, index) => (
                      <div
                        key={index}
                        className="flex items-center w-full text-[#333333] gap-[8px]"
                        style={{ width: widths[index] }}
                      >
                        <p className="text-[14px] font-[600]">
                          {applicant_head.name}
                        </p>
                        <img
                          className="w-[24px]"
                          src="/images/employer/expand_more.png"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-[16px] items-start bg-[#fff]  overflow-y-auto">
                    {!jobDetails?.data.applications.length == 0 ? (
                      <>
                        {jobDetails?.data?.applications.map(
                          (applicant, index) => (
                            <>
                              <div
                                className={`flex w-[100%] p-[16px] justify-between items-center ${
                                  checkedApplicants[index]
                                    ? "bg-[#D3F1FF]"
                                    : "bg-[#FFFFFF]"
                                }`}
                                key={applicant._id}
                              >
                                <div className="  gap-[24px]  w-full justify-between flex items-center">
                                  <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                                    <input
                                      className="w-[16px] h-[16px]"
                                      type="checkbox"
                                      checked={!!checkedApplicants[index]}
                                      onChange={() =>
                                        handleCheckboxChange(index)
                                      }
                                    />
                                    <img
                                      className="w-[40px]"
                                      src="/images/employer/profile_icon.png"
                                      alt=""
                                    />
                                    <p className="text-[14px] font-[600]">
                                      {applicant.details?.personal?.firstName}
                                    </p>
                                  </div>
                                  <div className="flex w-[10%] items-center justify-center   gap-[8px]">
                                    <p className="text-[14px] font-[600]">
                                      {applicant.score}
                                    </p>
                                  </div>

                                  <div className="flex w-[15%] items-center justify-center   gap-[8px]">
                                    <p className="text-[14px] font-[600]">
                                      {applicant.matchingPercentage} %
                                    </p>
                                  </div>
                                  <div className="w-[20%]">
                                    <div
                                      className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${
                                        checkedApplicants[index]
                                          ? "bg-[#FFFFFF]"
                                          : applicant.status === "Interview"
                                          ? "bg-[#26A4FF1A]"
                                          : applicant.status === "Hired"
                                          ? "bg-[#56CDAD1A]"
                                          : applicant.status === "Shortlisted"
                                          ? "bg-[#4640DE1A]"
                                          : applicant.status === "Rejected"
                                          ? "bg-[#FF65501A]"
                                          : applicant.status === "In Review"
                                          ? "bg-[#EB85331A]"
                                          : ""
                                      } ${
                                        applicant.status === "Interview"
                                          ? "text-[#26A4FF]"
                                          : applicant.status === "Hired"
                                          ? "text-[#56CDAD]"
                                          : applicant.status === "Shortlisted"
                                          ? "text-[#4640DE]"
                                          : applicant.status === "Rejected"
                                          ? "text-[#FF6550]"
                                          : applicant.status === "In Review"
                                          ? "text-[#FFB836]"
                                          : "text-[#333333]"
                                      }`}
                                    >
                                      {applicant.status}
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
                                  <div className="flex  w-[20%] items-center gap-[16px] relative">
                                    <div
                                      className="cursor-pointer"
                                      onClick={() =>
                                        router.push(
                                          `/common/hiring/ApplicantDetails?applicantId=${applicant.applicantId}&id=${jobDetails.data.jobDetails._id}`
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
                                      onClick={() => togglePopup(applicant)}
                                      className="text-[10px] text-white font-[500] py-[4px] px-[8px] rounded-[30px] bg-[#06A9EF]"
                                    >
                                      Shortlist
                                    </button>

                                    <>
                                      {isPopupVisible && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
                                          <div className="bg-white p-8 rounded-lg shadow-lg w-[996px] h-[80vh]">
                                            <div className="mb-4 flex items-center">
                                              <div className="flex  flex-col">
                                                <div
                                                  onClick={() =>
                                                    setPopupVisible(false)
                                                  }
                                                  className=" flex w-full justify-end "
                                                >
                                                  <svg
                                                    width="20"
                                                    height="19"
                                                    viewBox="0 0 20 19"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M9.99735 11.1232L3.50485 17.6152C3.21518 17.9052 2.86402 18.0469 2.45135 18.0402C2.03835 18.0339 1.68702 17.8859 1.39735 17.5962C1.10768 17.3065 0.96285 16.952 0.96285 16.5327C0.96285 16.1134 1.10768 15.7589 1.39735 15.4692L7.87035 8.99619L1.37835 2.55369C1.08835 2.26402 0.946683 1.90952 0.95335 1.49019C0.959683 1.07119 1.10768 0.716855 1.39735 0.427188C1.68702 0.137188 2.04152 -0.0078125 2.46085 -0.0078125C2.88018 -0.0078125 3.23468 0.137188 3.52435 0.427188L9.99735 6.91919L16.4398 0.427188C16.7295 0.137188 17.0807 -0.0078125 17.4933 -0.0078125C17.9063 -0.0078125 18.2577 0.137188 18.5473 0.427188C18.8577 0.737188 19.0128 1.09669 19.0128 1.50569C19.0128 1.91469 18.8577 2.26402 18.5473 2.55369L12.0743 8.99619L18.5663 15.4887C18.8563 15.7784 19.0013 16.1295 19.0013 16.5422C19.0013 16.9552 18.8563 17.3065 18.5663 17.5962C18.2563 17.9065 17.8968 18.0617 17.4878 18.0617C17.0788 18.0617 16.7295 17.9065 16.4398 17.5962L9.99735 11.1232Z"
                                                      fill="#333333"
                                                    />
                                                  </svg>
                                                </div>
                                                <div className="flex flex-col gap-[10px]">
                                                  <div className="w-[914px] gap-[20px] flex flex-col">
                                                    <div className="flex items-center gap-[20px]">
                                                      <div className="text-[16px] font-[600]">
                                                        To
                                                      </div>
                                                      {shortlist.details
                                                        ?.personal?.firstName
                                                        .length == 0 &&
                                                      shortlist?.details
                                                        ?.personal?.lastName
                                                        .length == 0 ? (
                                                        ""
                                                      ) : (
                                                        <div className="border-[1px] border-[#D6DDEB] p-[6px] rounded-[26px] flex gap-[10px] items-center">
                                                          <div className="group relative">
                                                            <div className="text-[14px] font-[600]">
                                                              {shortlist.details
                                                                ?.personal
                                                                ?.firstName +
                                                                " " +
                                                                shortlist
                                                                  .details
                                                                  ?.personal
                                                                  ?.lastName}
                                                            </div>
                                                            <div>
                                                              <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                                                                {
                                                                  shortlist
                                                                    .details
                                                                    ?.personal
                                                                    ?.email
                                                                }
                                                              </div>
                                                            </div>
                                                          </div>

                                                          <div>
                                                            <svg
                                                              width="24"
                                                              height="24"
                                                              viewBox="0 0 24 24"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <g mask="url(#mask0_6706_92965)">
                                                                <path
                                                                  d="M11.9987 13.0655L8.75242 16.3115C8.60759 16.4565 8.43201 16.5273 8.22567 16.524C8.01917 16.5208 7.84351 16.4468 7.69867 16.302C7.55384 16.1572 7.48142 15.9799 7.48142 15.7703C7.48142 15.5606 7.55384 15.3833 7.69867 15.2385L10.9352 12.002L7.68917 8.78075C7.54417 8.63592 7.47334 8.45867 7.47667 8.249C7.47984 8.0395 7.55384 7.86233 7.69867 7.7175C7.84351 7.5725 8.02076 7.5 8.23042 7.5C8.44009 7.5 8.61734 7.5725 8.76218 7.7175L11.9987 10.9635L15.2199 7.7175C15.3648 7.5725 15.5403 7.5 15.7467 7.5C15.9532 7.5 16.1288 7.5725 16.2737 7.7175C16.4288 7.8725 16.5064 8.05225 16.5064 8.25675C16.5064 8.46125 16.4288 8.63592 16.2737 8.78075L13.0372 12.002L16.2832 15.2483C16.4282 15.3931 16.5007 15.5687 16.5007 15.775C16.5007 15.9815 16.4282 16.1572 16.2832 16.302C16.1282 16.4572 15.9484 16.5348 15.7439 16.5348C15.5394 16.5348 15.3648 16.4572 15.2199 16.302L11.9987 13.0655Z"
                                                                  fill="#333333"
                                                                />
                                                              </g>
                                                            </svg>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                    <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                                                  </div>

                                                  <div className="w-[914px] gap-[20px] flex flex-col">
                                                    <div className="flex items-center gap-[20px]">
                                                      <div className="text-[16px] font-[600]">
                                                        CC
                                                      </div>
                                                      <div className=" p-[4px] flex rounded-[26px]  gap-[10px] items-start">
                                                        <div className="flex flex-wrap gap-[10px]">
                                                          {tags.map(
                                                            (tag, index) => (
                                                              <div
                                                                key={index}
                                                                className="flex items-center border-[1px] border-[#D6DDEB] p-[6px] rounded-[26px]"
                                                              >
                                                                <span className="text-[14px] font-[600] mr-[8px]">
                                                                  {tag}
                                                                </span>
                                                                <div
                                                                  onClick={() =>
                                                                    removeTag(
                                                                      index
                                                                    )
                                                                  }
                                                                  className="cursor-pointer"
                                                                >
                                                                  <svg
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                  >
                                                                    <path
                                                                      d="M13.0655 11.9987L16.3115 8.75242C16.4565 8.60759 16.5273 8.43201 16.524 8.22567C16.5208 8.01917 16.4468 7.84351 16.302 7.69867C16.1572 7.55384 15.9799 7.48142 15.7703 7.48142C15.5606 7.48142 15.3833 7.55384 15.2385 7.69867L12.002 10.9352L8.78075 7.68917C8.63592 7.54417 8.45867 7.47334 8.249 7.47667C8.0395 7.47984 7.86233 7.55384 7.7175 7.69867C7.5725 7.84351 7.5 8.02076 7.5 8.23042C7.5 8.44009 7.5725 8.61734 7.7175 8.76218L10.9635 11.9987L7.7175 15.2199C7.5725 15.3648 7.5 15.5403 7.5 15.7467C7.5 15.9532 7.5725 16.1288 7.7175 16.2737C7.8725 16.4288 8.05225 16.5064 8.25675 16.5064C8.46125 16.5064 8.63592 16.4288 8.78075 16.2737L12.002 13.0372L15.2483 16.2832C15.3931 16.4282 15.5687 16.5007 15.775 16.5007C15.9815 16.5007 16.1572 16.4282 16.302 16.2832C16.4572 16.1282 16.5348 15.9484 16.5348 15.7439C16.5348 15.5394 16.4572 15.3648 16.302 15.2199L13.0655 11.9987Z"
                                                                      fill="#333333"
                                                                    />
                                                                  </svg>
                                                                </div>
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                        <div className="flex items-center gap-[10px]">
                                                          <input
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={(e) =>
                                                              setInputValue(
                                                                e.target.value
                                                              )
                                                            }
                                                            onKeyPress={
                                                              handleKeyPress
                                                            }
                                                            className=" p-[4px] rounded-[26px]"
                                                            placeholder="Enter Email"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                                                  </div>

                                                  <div className="flex gap-[24px]">
                                                    <div className="text-[16px] font-[600]">
                                                      Subject
                                                    </div>
                                                    <div className="text-[14px] font-[500]">
                                                      Contrary to popular
                                                      belief, Lorem Ipsum is not
                                                      simply random text. It has
                                                      roots in a piece of
                                                      classical Latin literature
                                                      from 45 BC, making it over
                                                      2000 years old.
                                                    </div>
                                                  </div>

                                                  <div className="text-[14px] font-[500] pt-[20px]">
                                                    Contrary to popular belief,
                                                    Lorem Ipsum is not simply
                                                    random text. It has roots in
                                                    a piece of classical Latin
                                                    literature from 45 BC,
                                                    making it over 2000 years
                                                    old.Lorem Ipsum is simply
                                                    dummy text of the printing
                                                    and typesetting industry.
                                                    Lorem Ipsum has been the
                                                    industrys standard dummy
                                                    text ever since the 1500s,
                                                    when an unknown printer took
                                                    a galley of type and
                                                    scrambled it to make a type
                                                    specimen book. It has
                                                    survived not only five
                                                    centuries, but also the leap
                                                    into electronic typesetting,
                                                    remaining essentially
                                                    unchanged.{" "}
                                                  </div>
                                                </div>
                                                <div className="pt-[120px]">
                                                  <div className="border-[1px]  border-[#DEDEDE] p-[8px] items-center rounded-[108px] flex justify-between">
                                                    <div className="flex gap-[10px] ">
                                                      <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                                                          stroke="#A6A6A6"
                                                          stroke-width="2"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                        />
                                                      </svg>
                                                      <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <g clip-path="url(#clip0_6706_92989)">
                                                          <path
                                                            d="M7 5H13C13.9283 5 14.8185 5.36875 15.4749 6.02513C16.1313 6.6815 16.5 7.57174 16.5 8.5C16.5 9.42826 16.1313 10.3185 15.4749 10.9749C14.8185 11.6313 13.9283 12 13 12H7V5Z"
                                                            stroke="#A6A6A6"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          />
                                                          <path
                                                            d="M13 12H14C14.9283 12 15.8185 12.3687 16.4749 13.0251C17.1313 13.6815 17.5 14.5717 17.5 15.5C17.5 16.4283 17.1313 17.3185 16.4749 17.9749C15.8185 18.6313 14.9283 19 14 19H7V12"
                                                            stroke="#A6A6A6"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          />
                                                        </g>
                                                        <defs>
                                                          <clipPath id="clip0_6706_92989">
                                                            <rect
                                                              width="24"
                                                              height="24"
                                                              fill="white"
                                                            />
                                                          </clipPath>
                                                        </defs>
                                                      </svg>

                                                      <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <g clip-path="url(#clip0_6706_92990)">
                                                          <path
                                                            d="M11 5H17"
                                                            stroke="#A6A6A6"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          />
                                                          <path
                                                            d="M7 19H13"
                                                            stroke="#A6A6A6"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          />
                                                          <path
                                                            d="M14 5L10 19"
                                                            stroke="#A6A6A6"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          />
                                                        </g>
                                                        <defs>
                                                          <clipPath id="clip0_6706_92990">
                                                            <rect
                                                              width="24"
                                                              height="24"
                                                              fill="white"
                                                            />
                                                          </clipPath>
                                                        </defs>
                                                      </svg>
                                                    </div>
                                                    <div className="bg-[#06A9EF] rounded-[30px] py-[12px] px-[36px] text-[#FFFFFF] text-[14px] flex gap-[6px] font-[600]">
                                                      <div>Send </div>

                                                      <div>
                                                        <svg
                                                          width="18"
                                                          height="18"
                                                          viewBox="0 0 18 18"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <g mask="url(#mask0_7727_21344)">
                                                            <path
                                                              d="M14.85 9.69123L3.3 14.5662C3.05 14.6662 2.8125 14.6444 2.5875 14.5006C2.3625 14.3569 2.25 14.1475 2.25 13.8725V4.12248C2.25 3.84748 2.3625 3.6381 2.5875 3.49435C2.8125 3.3506 3.05 3.32873 3.3 3.42873L14.85 8.30373C15.1625 8.44123 15.3188 8.67248 15.3188 8.99748C15.3188 9.32248 15.1625 9.55373 14.85 9.69123ZM3.75 12.7475L12.6375 8.99748L3.75 5.24748V7.87248L8.25 8.99748L3.75 10.1225V12.7475Z"
                                                              fill="white"
                                                            />
                                                          </g>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </>

                                    <button className="text-[10px] font-[500] py-[4px] px-[8px] rounded-[30px] border-[1px] border-[#B3261E]  text-[#B3261E]">
                                      Reject
                                    </button>

                                    <AnimatePresence>
                                      {moreOption &&
                                        selectedDotIndex === index && (
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
                          )
                        )}
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
                <div className="mobile">
                  <div className="flex flex-col items-start gap-4 self-stretch w-full">
                    <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
                      {!jobDetails?.data?.applications?.length == 0 ? (
                        <>
                          {jobDetails?.data?.applications?.map(
                            (applicant, index) => (
                              <>
                                <div
                                  className="flex w-[100%] p-[8px] justify-between items-center border border-[#DEDEDE] rounded-xl"
                                  // style={{
                                  //   background: index % 2 == 0 ? "#EFFAFF" : "#fff",
                                  // }}
                                >
                                  <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start">
                                    <div className="flex justify-between items-center self-stretch">
                                      <div className="flex items-center gap-2">
                                        <img
                                          className="w-[40px] h-[40px]"
                                          src="/images/profile/john_doe.png"
                                          alt=""
                                        />
                                        <p className="text-[14px] text-[#333] font-[600]">
                                          {
                                            applicant.details?.personal
                                              ?.firstName
                                          }
                                        </p>
                                      </div>
                                      <div className="flex justify-end items-center gap-4 relative">
                                        <div className="flex items-center gap-2">
                                          {applicant.img_star1}
                                          <p className="text-[14px] font-[600]">
                                            {applicant.score}
                                          </p>
                                        </div>
                                        <img
                                          onClick={() => handleDotClick(index)}
                                          className="w-[24px] cursor-pointer"
                                          src="/images/employer/three-dot1.png"
                                          alt=""
                                        />
                                        <AnimatePresence>
                                          {moreOption &&
                                            selectedDotIndex === index && (
                                              <motion.div
                                                initial={{ x: "100%" }}
                                                animate={{ x: 0 }}
                                                exit={{ x: "100%" }}
                                                transition={{ duration: 0.5 }}
                                                ref={taskRef}
                                                className="absolute flex flex-col  rounded-[8px]  z-10 top-[100%] w-[230px] border-l border-r border-b border-[#06A9EF] p-2 bg-white"
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

                                    <div className="flex justify-between items-center self-stretch">
                                      <p className="text-[14px] text-[#333] font-[600]">
                                        20 Nov, 2023{" "}
                                      </p>
                                      <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                                        <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                                          In Review
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex justify-center w-[100%]">
                                      <div
                                        onClick={toggleContentt}
                                        className="flex px-6 py-3 min-w-[257px] justify-center items-center gap-[10px] bg-[#E7F8FF]"
                                        style={{
                                          borderRadius: "8px",
                                          border:
                                            " 1px solid var(--primary, #06A9EF)",
                                        }}
                                      >
                                        <p className="text-[14px]  text-[#333] font-[600] font-Montserrat">
                                          See Application
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                          )}
                        </>
                      ) : (
                        <div className="p-3 w-full flex items-center justify-center">
                          <img
                            src="/images/employer/OBJECTS.png"
                            alt="No data available"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <CustomPagination
                    setMiniloading={setMiniloading}
                    miniloading={miniloading}
                    setPage={setPage}
                    title={"Applicant"}
                    setLimit={setLimit}
                    totalPages={Math.max(
                      1,
                      Math.ceil(jobDetails?.pagination?.length / limit)
                    )}
                    limit={limit}
                    page={page}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {option === 1 && (
          <div className="mb-6">
            <JobDetails jobDetails={jobDetails} />
          </div>
        )}
        {option === 2 && <Analytics />}
      </div>
    </div>
  );
}
export default JobPost;
