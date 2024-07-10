import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";
import { reCallUserData } from "../../Redux/actions/user";
import DeleteModal from "../../components/common/deleteModal";
import { toast } from "react-toastify";
import MiniLoader from "../../components/common/miniLoader";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl, loadingg, setLoadingg }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setTimeout(() => {
      setLoadingg(false);
    }, 2000);
  };

  return (
    <div
      style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
      className={`w-[132px] scr460:w-[192px] h-[200px] scr460:h-[272px] rounded-lg overflow-hidden `}
    >
      {loadingg && (
        <div className="skeleton-loader">
          <div className="skeleton-image"></div>
          <div className="skeleton-text">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line shorter"></div>
          </div>
        </div>
      )}
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
const Index = () => {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [loadingg, setLoadingg] = useState(true);
  const [selectedIndexes, setSelectedIndexes] = useState();
  const [selectedResumeUrl, setSelectedResumeUrl] = useState();
  const [selectedResumeName, setSelectedResumeName] = useState();
  const [selectedLink, setSelectedLink] = useState();
  const [copy, setCopy] = useState(false);
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    setLoading(true);
    if (userDataGlobal?._id) {
      axios
        .get(`https://jamblix.com/api/resume/${userDataGlobal._id}`)
        .then((res) => {
          setResumeList(res.data.data);

          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userDataGlobal]);

  const toggleSelect = (item) => {
    setSelectedIndexes(item._id);
    setSelectedResumeName(item.fileName);
    setSelectedResumeUrl(item.resumeUrl);
    setSelectedLink("");
    window.scroll(0, 0);
  };

  const generateToken = async () => {

    if (!userDataGlobal.firstName) {
      setEditProfilePopUp(true);
    }
    else {
      if (selectedIndexes) {
        try {
          const response = await axios.put(
            `https://jamblix.com/api/candidate/selectResume`,
            {
              selectedIndexes,
              selectedResumeUrl,
              _id: userDataGlobal._id,
              resumeName: selectedResumeName,
            }
          );

          if (response.status === 200) {
            const updatedCandidate = response.data;
            toast.success("Link Generated successfully");
            // setSelectedLink(`www.skilotech.com/${userDataGlobal.firstName}/${selectedResumeName}`)
            setSelectedLink(
              `https://www.skilotech.com/${userDataGlobal.id}/${userDataGlobal.firstName}`
            );
          } else {
            console.error("Error Generating Link:", response.data.message);
            toast.error("Failed to select resume.");
          }
        } catch (error) {
          console.error("Error Generating Link:", error.message);
          toast.error("Error occurred while generating link.");
        }
      } else {
        toast.error("Select resume first");
      }
    }

  };
  const copyToClipboard = (text) => {
    setCopy(true);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // alert('Link copied to clipboard');
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  console.log(resumeList)
  return (
    <>

      {editProfilePopUp && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute ms:w-[30%] w-[60%] flex flex-col gap-6  justify-between items-center text-center rounded-[24px] bg-white p-6  text-[24px] font-medium">
              First edit your profile to update the name !
              <button
                onClick={() => {
                  setEditProfilePopUp(false);
                  router.push("/auth/recruiter-signup?isUpdate=true");
                }}
                style={{ borderColor: "#06a9ef" }}
                className={`w-[200px] px-4 py-[12px] rounded-[12px] border-[1px] border-solid border-[#06a9ef] text-[20px] text-white font-[500] bg-blue hover:bg-[#06a9ef] 
             
            } hover:text-[#fff] transition-all duration-200`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}
      {loading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <MiniLoader />
        </div>
      ) : (
        <div className="customMargins py-6 min-h-[80vh]">
          {resumeList.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex ml:flex-row flex-col justify-between gap-2">
                <div className="text-2xl font-semibold text-gray-800">
                  My Resumes
                </div>
                <div className="flex gap-4 text-[16px] font-medium ms:items-center items-end justify-end ms:flex-row flex-col-reverse">
                  <div className="flex gap-2 justify-end">
                    {selectedLink && (
                      <svg
                        onClick={() => copyToClipboard(selectedLink)}
                        className="min-w-[24px] cursor-pointer"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_3016_35449)">
                          <path
                            d="M7.5 15C7.0875 15 6.73438 14.8531 6.44062 14.5594C6.14687 14.2656 6 13.9125 6 13.5V3.5C6 3.0875 6.14687 2.73438 6.44062 2.44063C6.73438 2.14688 7.0875 2 7.5 2H15.5C15.9125 2 16.2656 2.14688 16.5594 2.44063C16.8531 2.73438 17 3.0875 17 3.5V13.5C17 13.9125 16.8531 14.2656 16.5594 14.5594C16.2656 14.8531 15.9125 15 15.5 15H7.5ZM7.5 13.5H15.5V3.5H7.5V13.5ZM4.5 18C4.0875 18 3.73437 17.8531 3.44062 17.5594C3.14687 17.2656 3 16.9125 3 16.5V5.75C3 5.5375 3.07146 5.35937 3.21437 5.21562C3.35729 5.07187 3.53437 5 3.74562 5C3.95687 5 4.13542 5.07187 4.28125 5.21562C4.42708 5.35937 4.5 5.5375 4.5 5.75V16.5H13.25C13.4625 16.5 13.6406 16.5715 13.7844 16.7144C13.9281 16.8573 14 17.0344 14 17.2456C14 17.4569 13.9281 17.6354 13.7844 17.7812C13.6406 17.9271 13.4625 18 13.25 18H4.5Z"
                            fill={copy ? "#333333" : "#808080"}
                          />
                        </g>
                      </svg>
                    )}
                    <div
                      className=" cursor-pointer break-all"
                      onClick={() => openInNewTab(`${selectedLink}`)}
                    >
                      {selectedLink}
                    </div>
                  </div>
                  <button
                    onClick={generateToken}
                    className="bg-blue  px-4 py-2 text-white rounded-lg font-medium"
                  >
                    Generate Link
                  </button>
                </div>
              </div>

              <div style={{ columnGap: "10px" }} className="flex flex-wrap gap-9 p-6 bg-gray-100 rounded-lg">
                {resumeList.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => toggleSelect(item)}
                    className="flex flex-col h-[230px] scr460:h-[300px] items-center justify-between group relative cursor-pointer resumes"
                  >
                    <div
                      className={`${item._id === selectedIndexes
                        ? "border-4 border-blue rounded-[12px] "
                        : " border-4 border-white"
                        }  `}
                    >
                      <PdfViewer
                        pdfUrl={item.resumeUrl}
                        loadingg={loadingg}
                        setLoadingg={setLoadingg}
                      />
                    </div>
                    {!loadingg && (
                      <div className="text-sm text-gray-800 font-medium">
                        {item?.fileName?.length > 17
                          ? `${item?.fileName?.slice(0, 16)}...`
                          : item?.fileName}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-[24px] font-medium ">
              <img
                className="w-[400px] h-[340px] "
                src="/images/noFile.png"
                alt=""
              />
              <div className="flex flex-col gap-8 items-center">
                No resumes available
                <button
                  onClick={() => router.push("/home/BuildResume")}
                  className="bg-blue  px-4 py-2 text-white rounded-lg font-medium text-[16px] w-[180px] btn_hover_effect "
                >
                  Create Resume
                </button>
              </div>{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
