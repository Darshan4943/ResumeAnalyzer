import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import MiniLoader from "../../components/common/miniLoader";

function List() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedJD, setSelectedJD] = useState(null);
  const popupRef = useRef();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(false);
  const getJobDescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.skilotech.com/api/jd/list/${userDataGlobal?._id}`
      );
      setLoading(false);
      setData(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching job descriptions:",
        error.response?.data || error.message
      );
      return [];
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `https://api.skilotech.com/api/jd/delete/${id}`
      );

      if (response.status === 200) {
        toast.success("Job description deleted successfully!");
        getJobDescriptions();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete job description"
      );
    }
  };

  useEffect(() => {
    getJobDescriptions();
  }, []);

  const handlePreview = (jd) => {
    setSelectedJD(jd);
  };

  const closePopup = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setSelectedJD(null);
    }
  };

  useEffect(() => {
    if (selectedJD) {
      document.addEventListener("mousedown", closePopup);
    } else {
      document.removeEventListener("mousedown", closePopup);
    }
    return () => {
      document.removeEventListener("mousedown", closePopup);
    };
  }, [selectedJD]);

  const handleDownload = (title, id) => {
    const contentElement = document.getElementById(`resumeContent-${id}`);
    if (!contentElement) return;

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const safeTitle = title?.replace(/[<>:"/\\|?*]+/g, "") || "resume";

    pdf.html(contentElement, {
      x: 10,
      y: 10,
      html2canvas: {
        scale: 1,
      },
      callback: function (doc) {
        doc.save(`${safeTitle}_jd.pdf`);
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[17px] font-medium">JD Builder</p>
      <button
        onClick={() => router.push("jdCreation")}
        className="px-6 h-[38px] rounded-[30px] bg_Button w-fit"
      >
        Create Job Description
      </button>

      {loading ? (
        <MiniLoader />
      ) : (
        <>
          {data?.length > 0 ? (
            <div className="flex gap-4 flex-wrap">
              {data.map((jd) => (
                <div key={jd._id} className="flex gap-2 flex-col items-center">
                  <div className="bg-white rounded-[12px] p-4 w-[192px] h-[256px] relative overflow-hidden group">
                    <div
                      id={`resumeContent-${jd._id}`}
                      className="text-[5px] font-[400]"
                      dangerouslySetInnerHTML={{
                        __html: jd.jd,
                      }}
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-200">
                      <div className="flex flex-col bg-[#333333] rounded-[16px] px-3 py-2 gap-2  items-center justify-center">
                        <div
                          onClick={() => handlePreview(jd)}
                          className="flex flex-col gap-[2px] items-center cursor-pointer"
                        >
                          <button className="flex items-center justify-center p-1 ">
                            <svg
                              width="20"
                              height="14"
                              viewBox="0 0 22 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.0028 11.5769C12.1359 11.5769 13.0983 11.1803 13.89 10.3871C14.6816 9.59394 15.0775 8.6308 15.0775 7.4977C15.0775 6.36462 14.6809 5.40224 13.8877 4.61058C13.0945 3.81891 12.1314 3.42308 10.9983 3.42308C9.8652 3.42308 8.90283 3.81966 8.11116 4.61283C7.3195 5.40601 6.92366 6.36915 6.92366 7.50225C6.92366 8.63533 7.32025 9.59771 8.11341 10.3894C8.9066 11.181 9.86974 11.5769 11.0028 11.5769ZM11.0006 10.2C10.2506 10.2 9.61306 9.93748 9.08806 9.41248C8.56306 8.88748 8.30056 8.24998 8.30056 7.49998C8.30056 6.74998 8.56306 6.11248 9.08806 5.58748C9.61306 5.06248 10.2506 4.79998 11.0006 4.79998C11.7506 4.79998 12.3881 5.06248 12.9131 5.58748C13.4381 6.11248 13.7006 6.74998 13.7006 7.49998C13.7006 8.24998 13.4381 8.88748 12.9131 9.41248C12.3881 9.93748 11.7506 10.2 11.0006 10.2ZM11.0019 14.5C8.70232 14.5 6.60699 13.8657 4.71596 12.5971C2.82495 11.3285 1.43265 9.62946 0.539062 7.49998C1.43265 5.37049 2.8245 3.67146 4.71461 2.40288C6.60471 1.13429 8.69957 0.5 10.9992 0.5C13.2988 0.5 15.3941 1.13429 17.2852 2.40288C19.1762 3.67146 20.5685 5.37049 21.4621 7.49998C20.5685 9.62946 19.1766 11.3285 17.2865 12.5971C15.3964 13.8657 13.3016 14.5 11.0019 14.5ZM11.0006 13C12.8839 13 14.6131 12.5041 16.1881 11.5125C17.7631 10.5208 18.9672 9.18331 19.8006 7.49998C18.9672 5.81664 17.7631 4.47914 16.1881 3.48748C14.6131 2.49581 12.8839 1.99998 11.0006 1.99998C9.11723 1.99998 7.38806 2.49581 5.81306 3.48748C4.23806 4.47914 3.0339 5.81664 2.20056 7.49998C3.0339 9.18331 4.23806 10.5208 5.81306 11.5125C7.38806 12.5041 9.11723 13 11.0006 13Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                          <p className="text-[11px] font-[600] text-white">
                            Preview
                          </p>
                        </div>
                        <div className=" border-[1px] border-[#FFFFFF] w-[50px]"></div>

                        <div
                          onClick={() =>
                            router.push(`/jdCreation/create?id=${jd?._id}`)
                          }
                          className="flex flex-col gap-[2px] items-center cursor-pointer"
                        >
                          <button className="flex items-center justify-center  p-1 ">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g mask="url(#mask0_9618_112303)">
                                <path
                                  d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z"
                                  fill="white"
                                />
                              </g>
                            </svg>
                          </button>
                          <p className="text-[11px] font-[600] text-white">
                            Edit
                          </p>
                        </div>
                        <div className=" border-[1px] border-[#FFFFFF] w-[50px]"></div>
                        <div
                          className="flex items-center flex-col cursor-pointer"
                          onClick={() =>
                            router.push(
                              "/common/jobPosting/CreateNewJob?jd=" + jd?._id
                            )
                          }
                          // onClick={() => handleDownload(jd?.jobTitle, jd?._id)}
                        >
                          {/* <img
                            src="/images/icons/download.png"
                            className="h-[20px] w-[20px]"
                            alt=""
                          /> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#fff"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                            />
                          </svg>

                          <span className="text-[11px] font-semibold text-white ">
                            Post
                          </span>
                        </div>
                        <div className=" border-[1px] border-[#FFFFFF] w-[50px]"></div>

                        <div
                          onClick={() => handleDelete(jd._id)}
                          className="flex flex-col gap-[2px] items-center cursor-pointer"
                        >
                          <button className="flex items-center justify-center  p-1 ">
                            <MdDelete size={20} color="red" />
                          </button>
                          <p className="text-[11px] font-[600] text-white">
                            Delete
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] font-medium">{jd.jobTitle}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-[46px] bg-[#FFFFFF] p-[16px] rounded-[12px] ">
              <div className="sm:text-[24px] text-[16px] font-[600] text-center">
                JD Builder Steps
              </div>
              <div className="flex scr1024:flex-row flex-col justify-between scr1024:gap-0 gap-10 items-center">
                <div className="w-[300px] flex flex-col justify-center items-center gap-[14px]">
                  <div className="w-[172px] h-[172px]">
                    <img src="images/recruiter/step1.png" alt="" />
                  </div>
                  <div>
                    <p className="text-[16px] font-[600] text-center">
                      Step 1 : Initiate JD Creation
                    </p>
                    <p className="text-[14px] font-[400] text-center">
                      Begin the process of creating a new Job Description by
                      clicking the &quot;Create Job Description&quot; button.
                    </p>
                  </div>
                </div>
                <div className="w-[80px]">
                  <img
                    src="images/recruiter/arrowjd.png"
                    className="transition-transform duration-300 scr1024:rotate-0 rotate-90"
                    alt=""
                  />
                </div>
                <div className="w-[300px] flex flex-col justify-center items-center gap-[14px]">
                  <div className="w-[172px] h-[172px]">
                    <img src="images/recruiter/step2.png" alt="" />
                  </div>
                  <div>
                    <p className="text-[16px] font-[600] text-center">
                      Step 2 : Complete the Job Description Form
                    </p>
                    <p className="text-[14px] font-[400] text-center">
                      Fill in all the required details for the Job Description,
                      including job title, description, skills, experience, and
                      any other relevant information.
                    </p>
                  </div>
                </div>
                <div className="w-[80px]">
                  <img
                    src="images/recruiter/arrowjd.png"
                    className="transition-transform duration-300 scr1024:rotate-0 rotate-90"
                    alt=""
                  />
                </div>
                <div className="w-[300px] flex flex-col justify-center items-center gap-[14px]">
                  <div className="w-[172px] h-[172px]">
                    <img src="images/recruiter/step3.png" alt="" />
                  </div>
                  <div>
                    <p className="text-[16px] font-[600] text-center">
                      Step 3 : Finalize and Create the Job Description
                    </p>
                    <p className="text-[14px] font-[400] text-center">
                      Review the information you have entered, and then click
                      the &quot;Create&quot; button to save and publish your new
                      Job Description.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedJD && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] px-4 animate-fadeIn">
              <div
                ref={popupRef}
                className="bg-white p-6 rounded-3xl w-full max-w-[750px] h-[70vh] overflow-hidden shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedJD(null)}
                  className="absolute top-4 right-4  w-10 h-10 flex items-center justify-center "
                >
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99735 11.1271L3.50485 17.6191C3.21518 17.9091 2.86402 18.0508 2.45135 18.0441C2.03835 18.0378 1.68702 17.8898 1.39735 17.6001C1.10768 17.3104 0.96285 16.9559 0.96285 16.5366C0.96285 16.1173 1.10768 15.7628 1.39735 15.4731L7.87035 9.0001L1.37835 2.5576C1.08835 2.26793 0.946683 1.91343 0.95335 1.4941C0.959683 1.0751 1.10768 0.720761 1.39735 0.431094C1.68702 0.141094 2.04152 -0.00390625 2.46085 -0.00390625C2.88018 -0.00390625 3.23468 0.141094 3.52435 0.431094L9.99735 6.9231L16.4398 0.431094C16.7295 0.141094 17.0807 -0.00390625 17.4933 -0.00390625C17.9063 -0.00390625 18.2577 0.141094 18.5473 0.431094C18.8577 0.741095 19.0128 1.10059 19.0128 1.5096C19.0128 1.9186 18.8577 2.26793 18.5473 2.5576L12.0743 9.0001L18.5663 15.4926C18.8563 15.7823 19.0013 16.1334 19.0013 16.5461C19.0013 16.9591 18.8563 17.3104 18.5663 17.6001C18.2563 17.9104 17.8968 18.0656 17.4878 18.0656C17.0788 18.0656 16.7295 17.9104 16.4398 17.6001L9.99735 11.1271Z"
                      fill="#333333"
                    />
                  </svg>
                </button>

                <h2 className="text-[16px] font-semibold mb-4 text-gray-800">
                  {selectedJD.jobTitle}
                </h2>

                <div
                  className="text-[14px] space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                  dangerouslySetInnerHTML={{
                    __html: selectedJD.jd,
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default List;
