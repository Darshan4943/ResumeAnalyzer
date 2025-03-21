import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Document, Page, pdfjs } from "react-pdf";
import { ClosedIcon } from "../../utils/svg";
import { selectResumeTemplate } from "../../utils/middleware";
import ResumePreview from "../../components/common/ResumePreview";
import { useRouter } from "next/router";

import DeleteModal from "../../components/common/deleteModal";
import { toast } from "react-toastify";
import MiniLoader from "../../components/common/miniLoader";
import Fuse from "fuse.js";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const MyCollection = () => {
  const router = useRouter();
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [select, setSelect] = useState(false);
 const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [view, setView] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isResumes, setIsResumes] = useState("resumes");
  const [coverList, setCoverList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2000/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setResumeList(res.data.data);
        setAllData(res.data.data)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userDataGlobal, deleted, isResumes]);

  useEffect(() => {
    setLoading(true);
    axios
      // .get("http://localhost:2000/api/cover/get/" + userDataGlobal?._id)
      .get("http://localhost:2000/api/cover/get/" + userDataGlobal?._id)

      .then((res) => {
        setCoverList(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userDataGlobal, deleted]);

  const toggleSelect = (index) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const deleteResume = () => {
    const ids = selectedIndexes.map((item) => resumeList[item]?._id);
    if (ids.length === 0) {
      toast.error("Please select file to delete");
      return;
    }

    axios
      .delete("http://localhost:2000/api/resume/deleteResume", {
        data: { ids },
      })
      .then((response) => {
        toast.success("Resume Deleted successfully");

        setView(false);
        setDeleted(!deleted);

        setSelectedIndexes([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteCoverLetter = () => {
    const ids = selectedIndexes.map((item) => coverList[item]?._id);
    if (ids.length === 0) {
      toast.error("Please select file to delete");
      return;
    }

    axios
      .delete(`http://localhost:2000/api/cover/delete/${ids}`)
      .then((response) => {
        toast.success("Cover Letter Deleted successfully");
        setView(false);
        setDeleted(!deleted);

        setSelectedIndexes([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const closeDeleteModal = () => {
    setView(false);
  };
  const coverPdfViewer = ({ pdfUrl }) => {
    function onDocumentLoadSuccess(numPages) {}

    return (
      <div
        style={{
          width: "750px",
          height: "500px",

          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6px",
          overflow: "scroll",
        }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  };

  const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess(numPages) {
      setNumPages(numPages);
    }

    return (
      <div
        style={{
          width: "234px",
          height: "330px",
          boxShadow: " 0px 2px 10px 1px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  };
  const changeHandler = (value) => {
    if (value.length > 0) {
      const options = {
        includeScore: true,
        threshold: 0.2,
     
        keys: [
          "fileName",
          
        ],
      };
      const fuse = new Fuse(allData, options);
      const result = fuse.search(value);
      setResumeList(result.map((item) => item.item));
    } else {
      setResumeList(allData);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(
        Array.from({ length: details?.length }, (_, index) => index)
      );
    }
    setSelectAll(!selectAll);
  };

  
  return (
    <>
      <div
        className={`${
          userDataGlobal?.role === "user" ? "customMargins" : ""
        } py-6 min-h-[80vh]`}
      >
        <div className="flex flex-col gap-[16px]">
          {userDataGlobal?.role === "user" ? (
            <div className="bg-[#F9F9F9] w-[248px] flex rounded-[30px] text-[14px] font-semibold">
              <button
                className={`${
                  isResumes === "resumes"
                    ? "bg-[#06A9EF] py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
                    : "py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%]"
                }`}
                onClick={() => setIsResumes("resumes")}
              >
                Resumes
              </button>
              <button
                className={`${
                  isResumes === "covers"
                    ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
                    : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%]"
                }`}
                onClick={() => setIsResumes("covers")}
              >
                Cover Letters
              </button>
            </div>
          ) : (
            <div className="flex ml:flex-row flex-col gap-4  justify-between ml:items-center ms:items-end items-end ">
              <div className="flex scr420:gap-4 gap-2 scr420:justify-between justify-start rounded-[30px] px-4  ml:w-[58%] w-[100%] items-center border-[1px] border-solid border-[#DEDEDE]">
                <div className="flex gap-4  w-full items-center h-[38px] ">
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
                    style={{ backgroundColor: "transparent" }}
                    className="w-full scr420:text-[16px] sm:text-[14px] sm:placeholder:text-[16px] placeholder:text-[14px]"
                    type="text"
                    placeholder={`Search Resume`}
                    onChange={(e) => changeHandler(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="flex gap-4  ms:items-center items-end justify-end relative">
                {!select && (
                  <div
                    onClick={() => setSelect(!select)}
                    className="scr420:px-6 px-2 h-[38px] flex gap-2 xsm:text-[14px] text-[12px]  font-semibold bg-[#E9EEF6] rounded-[30px] items-center cursor-pointer"
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
                  className={` ${
                    select ? "flex" : "hidden"
                  } gap-12  items-center w-[100%]  `}
                >
                  {select && (
                    <div className="bg-[#D1EDFF] flex scr420:gap-4  gap-2 rounded-[50px] px-2  items-center w-full scr420:min-w-[316px] min-w-[280px]   h-[38px]  ">
                      <div
                        onClick={() => setSelect(false)}
                        style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
                        className="bg-[#F9F9F9] rounded-[50%] p-[8.5px]  cursor-pointer"
                      >
                        <svg
                          width="10"
                          height="10"
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
                          width="18"
                          height="18"
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
                    onClick={() => {
                      router.push("/createResume/BuildResume");
                    }}
                    className="ml:hidden  items-center scr480:text-[16px] xsm:text-[14px] text-[12px] font-semibold  scr480:px-6 px-2  h-[38px] scr480:min-w-[224px] flex gap-1 bg-[#06A9EF] rounded-[30px] text-white"
                    type="button"
                  >
                    <svg
                      className="scr480:w-[27px] scr480:h-[27px] w-[22px] h-[22px]"
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
                    Create New Resume
                  </button>
                )}

                <button
                  onClick={() => {
                    router.push("/createResume/BuildResume");
                  }}
                  className=" ml:flex  hidden text-[16px] font-semibold  px-6 h-[38px]  items-center min-w-[224px]  ml:min-w-[262cpx] gap-1 bg-[#06A9EF] rounded-[30px] text-white"
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
                  Create New Resume
                </button>
              </div> */}
            </div>
          )}

          {loading ? (
            <div className="h-[60vh] w-full flex items-center justify-center">
              <MiniLoader />
            </div>
          ) : (
            <>
              {isResumes === "resumes" ? (
                <div className="flex flex-row scr540:justify-start justify-center flex-wrap  gap-x-[24px] gap-y-[48px] py-[24px]  rounded-[8px]  ">
                  <div
                    onClick={() => router.push(`/createResume/BuildResume`)}
                    style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
                    className="rounded-[8px] text-center  justify-center flex scr540:flex-col flex-row text-[14px] items-center gap-2 font-semibold  scr540:w-[234px] w-[312px]  scr540:h-[330px] h-[135px] p-6 cursor-pointer"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_120562)">
                        <path
                          d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>

                    <p>
                      Create New <br /> Resume
                    </p>
                  </div>
                  <>
                    {resumeList?.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="flex flex-col h-[360px] items-center justify-between group relative  resumes rounded-[8px]"
                        >
                          <PdfViewer pdfUrl={item?.resumeUrl} />
                          <div className="text-[14px] text-[#333333] font-[500]">
                            {item?.fileName?.length > 17
                              ? `${item?.fileName?.slice(0, 16)}...`
                              : item?.fileName}
                          </div>

                          <div className="bg-[#00000099] rounded-[8px] overflow-hidden absolute top-[0px] left-[0px] h-[330px] w-full  opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                            <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]   border border-gray-200 gap-[12px] bg-[#333333CC]">
                              <div
                                className="items-center flex-col cursor-pointer hidden md:flex"
                                style={{
                                  borderBottom: "1px solid #646464",
                                  paddingBottom: "12px",
                                }}
                                onClick={() => {
                                  setSelected(item);
                                  setPreview(true);
                                }}
                              >
                                <img
                                  src="/images/icons/visibility.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Preview
                                </span>
                              </div>
                              <div
                                onClick={() => {
                                  router.push({
                                    pathname: "/createResume",
                                    query: {
                                      data: JSON.stringify(item),
                                      isEdit: true,
                                    },
                                  });
                                }}
                                className="flex items-center flex-col cursor-pointer"
                                style={{
                                  borderBottom: "1px solid #646464",
                                  paddingBottom: "12px",
                                }}
                              >
                                <img
                                  src="/images/icons/edit.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Edit
                                </span>
                              </div>

                              <a
                                href={item.resumeUrl}
                                className="flex items-center flex-col cursor-pointer"
                              >
                                <img
                                  src="/images/icons/download.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Download
                                </span>
                              </a>
                              <a
                                onClick={() => {
                                  toggleSelect(index);
                                  setView(true);
                                }}
                                className="flex items-center flex-col cursor-pointer"
                              >
                                <img
                                  src="/images/icons/delete_icon.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Delete
                                </span>
                              </a>
                              {view && (
                                <DeleteModal
                                  deleteHandler={deleteResume}
                                  closeDeleteModal={closeDeleteModal}
                                  type={"resume"}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap gap-y-[48px] gap-x-[24px] p-[24px] bg-[#F9F9F9] rounded-[8px] scr540:justify-start justify-center  ">
                  <div
                    onClick={() => router.push(`/coverLetter`)}
                    style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
                    className="rounded-[8px] text-center  justify-center flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  scr540:w-[234px] w-[312px]  scr540:h-[330px] h-[135px]  p-6 cursor-pointer"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_120562)">
                        <path
                          d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>

                    <p>Create New Cover Letter</p>
                  </div>
                  <>
                    {coverList?.map((item, index) => (
                      <>
                        <div
                          key={index}
                          style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
                          className="flex flex-col h-[360px] items-center overflow-hidden justify-between group relative resumes"
                        >
                          <PdfViewer pdfUrl={item?.resumeUrl} />
                          <div className="text-[14px] text-[#333333] font-500">
                            {item?.fileName?.length > 17
                              ? `${item?.fileName?.slice(0, 16)}...`
                              : item?.fileName}
                          </div>

                          <div className="bg-[#00000099] rounded-[8px]  absolute top-[0px] left-[0px] h-[330px] w-full  opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                            <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-[8px] border border-gray-200 gap-[12px] bg-[#333333CC]">
                              <div
                                className="items-center flex-col cursor-pointer hidden md:flex"
                                style={{
                                  borderBottom: "1px solid #646464",
                                  paddingBottom: "12px",
                                }}
                                onClick={() => {
                                  setSelected(item);
                                  setPreview(true);
                                }}
                              >
                                <img
                                  src="/images/icons/visibility.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Preview
                                </span>
                              </div>
                              <div
                                onClick={() => {
                                  router.push({
                                    pathname: "/coverLetter",
                                    query: {
                                      EditData: JSON.stringify(item),
                                      isCoverEdit: true,
                                    },
                                  });
                                }}
                                className="flex items-center flex-col cursor-pointer"
                                style={{
                                  borderBottom: "1px solid #646464",
                                  paddingBottom: "12px",
                                }}
                              >
                                <img
                                  src="/images/icons/edit.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Edit
                                </span>
                              </div>

                              <a
                                href={item.resumeUrl}
                                className="flex items-center flex-col cursor-pointer"
                              >
                                <img
                                  src="/images/icons/download.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Download
                                </span>
                              </a>
                              <a
                                onClick={() => {
                                  toggleSelect(index);
                                  setView(true);
                                }}
                                className="flex items-center flex-col cursor-pointer"
                              >
                                <img
                                  src="/images/icons/delete_icon.png"
                                  className="h-[24px] w-[24px]"
                                  alt=""
                                />
                                <span className="text-[12px] font-semibold text-white ">
                                  Delete
                                </span>
                              </a>
                              {view && (
                                <DeleteModal
                                  deleteHandler={deleteCoverLetter}
                                  closeDeleteModal={closeDeleteModal}
                                  type={"Cover Letter"}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                </div>
              )}
            </>
          )}
        </div>
        {preview && (
          <>
            <ResumePreview
              selectedResumeIndex={selected.resumeTemplateIndex}
              data={selected}
              selectedColor={selected.selectedColor}
              selectedFont={selected.selectedFont}
              setPreview={setPreview}
              preview={true}
              isResumes={isResumes}
              coverPdfViewer={coverPdfViewer}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MyCollection;
