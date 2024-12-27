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
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const MyCollection = () => {
  const router = useRouter();
  const { profileData } = useSelector((state) => state.profile.profileData); const { userDataGlobal } = useSelector((state) => state.user.userData);

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

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2000/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setResumeList(res.data.data);
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
    function onDocumentLoadSuccess(numPages) { }

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
          // borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  };
  return (
    <div className="customMargins py-6 min-h-[80vh] ">
      <div className="flex flex-col gap-[16px]">
        <div className="bg-[#F9F9F9] w-[248px] flex rounded-[30px] text-[14px] font-semibold">
          <button
            className={`${isResumes === "resumes"
              ? "bg-[#06A9EF] py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
              : "py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%]"
              }`}
            onClick={() => setIsResumes("resumes")}
          >
            Resumes
          </button>
          <button
            className={`${isResumes === "covers"
              ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
              : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%]"
              }`}
            onClick={() => setIsResumes("covers")}
          >
            Cover Letters
          </button>
        </div>
        {loading ? (
          <div className="h-[60vh] w-full flex items-center justify-center">
            <MiniLoader />
          </div>
        ) : (
          <>
            {isResumes === "resumes" ? (
              <div className="flex flex-row scr540:justify-start justify-center flex-wrap  gap-x-[24px] gap-y-[48px] p-[24px] bg-[#F9F9F9] rounded-[12px]  ">
                <div
                  onClick={() => router.push(`/home/BuildResume`)}
                  style={{ boxShadow: "0px 2px 10px 1px #00000040" }}

                  className="rounded-[8px] text-center  justify-center flex scr540:flex-col flex-row text-[14px] items-center gap-2 font-semibold  scr540:w-[234px] w-[312px]  scr540:h-[330px] h-[135px] p-6 cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g mask="url(#mask0_6706_120562)">
                      <path d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z" fill="#333333" />
                    </g>
                  </svg>


                  <p>Create New <br /> Resume</p>
                </div>
                <>
                  {resumeList?.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="flex flex-col h-[360px] items-center justify-between group relative resumes"
                      >
                        <PdfViewer pdfUrl={item?.resumeUrl} />
                        <div className="text-[14px] text-[#333333] font-[500]">
                          {item?.fileName?.length > 17
                            ? `${item?.fileName?.slice(0, 16)}...`
                            : item?.fileName}
                        </div>

                        <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-[330px] w-full  opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                          <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
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
                                  pathname: "/home/createResume",
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
              <div className="flex flex-row flex-wrap gap-y-[48px] gap-x-[24px] p-[24px] bg-[#F9F9F9] rounded-[12px] scr540:justify-start justify-center  ">
                <div
                  onClick={() => router.push(`/coverLetter`)}
                  style={{ boxShadow: "0px 0px 10px 5px #00000040" }}
                  className="rounded-[8px] text-center  justify-center flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  scr540:w-[234px] w-[312px]  scr540:h-[330px] h-[135px]  p-6 cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g mask="url(#mask0_6706_120562)">
                      <path d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z" fill="#333333" />
                    </g>
                  </svg>

                  <p>Create New Cover Letter</p>
                </div>
                <>
                  {coverList?.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="flex flex-col h-[360px] items-center justify-between group relative resumes"
                      >
                        <PdfViewer pdfUrl={item?.resumeUrl} />
                        <div className="text-[14px] text-[#333333] font-500">
                          {item?.fileName?.length > 17
                            ? `${item?.fileName?.slice(0, 16)}...`
                            : item?.fileName}
                        </div>

                        <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-[330px] w-full  opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                          <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
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
                                type={"cover"}
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
  );
};

export default MyCollection;
