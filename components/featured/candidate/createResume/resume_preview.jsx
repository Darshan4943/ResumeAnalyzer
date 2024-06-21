import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import { toast } from "react-toastify";

import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  BlobProvider,
  pdf,
} from "@react-pdf/renderer";
import Template1 from "../../resumeTemplates/Template1";
import Template2 from "../../resumeTemplates/Template2";
import Template3 from "../../resumeTemplates/Template3";
import Template4 from "../../resumeTemplates/Template4";
import Template5 from "../../resumeTemplates/Template5";
import Template9 from "../../resumeTemplates/Template9";
import Template7 from "../../resumeTemplates/Template7";
import Template6 from "../../resumeTemplates/Template6";
import Template12 from "../../resumeTemplates/Template12";
import Template15 from "../../resumeTemplates/Template15";
import Template18 from "../../resumeTemplates/Template18";
import Template17 from "../../resumeTemplates/Template17";
import Template8 from "../../resumeTemplates/Template8";
import Template10 from "../../resumeTemplates/Template10";
import Template20 from "../../resumeTemplates/Template20";
import Template11 from "../../resumeTemplates/Template11";
import Template19 from "../../resumeTemplates/Template19";
import Template13 from "../../resumeTemplates/Template13";

import Template14 from "../../resumeTemplates/Template14";
import Template16 from "../../resumeTemplates/Template16";

import Fonts from "../../../../public/fonts/fonts";
import { ClosedIcon } from "../../../../utils/svg";
import { useSelector } from "react-redux";
import FileNameModel from "./components/fileNameModel";
import Template32 from "../../resumeTemplates/Template32";
import Template39 from "../../resumeTemplates/Template39";
import Template48 from "../../resumeTemplates/Template48";
import Template44 from "../../resumeTemplates/Template44";

import LimitUsedModal from "../../../models/limitUsedModal";
import Resume2 from "../../resumeTemplates/Resume2";
import Resume1 from "../../resumeTemplates/Resume1";
import MiniLoader from "../../../common/miniLoader";
import Template47 from "../../resumeTemplates/Template47";
import Template30 from "../../resumeTemplates/Template30";
import Template53 from "../../resumeTemplates/Template53";
// import { generatePDFUsingRenderer } from "../../../../utils/middleware";
<Fonts />;
const ResumePreview = ({
  data,
  isSetEdit,
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
  isEdit,
  id,
  render,
  clientId,
}) => {

  console.log(777, data)
  const [namePreview, setNamePreview] = useState(false);
  const [name, setName] = useState(data.firstName + "_resume");
  console.log(111,selectedColor)
  const userDataGlobal = useSelector((state) => state.userData);
  const [downloadBtnLoading, setDownloadBtnLoading] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(0);
  const [saveLimit, setSaveLimit] = useState(0);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [limitUsedModal, setLimitUsedModal] = useState(false);
  // console.log(67, userDataGlobal);
  const getLimits = () => {
    const downloadCount = localStorage.getItem("downloadCount");
    const saveCount = localStorage.getItem("saveCount");
    if (downloadCount) {
      setDownloadLimit(downloadCount);
    }
    if (saveCount) {
      setSaveLimit(saveCount);
    }
  };

  useEffect(() => {
    getLimits();
  }, []);

  useEffect(() => {
    setResumeLoading(true);
    const timer = setTimeout(() => {
      setResumeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [data, selectedFont, selectedColor]);

  const callData = () => {
    const id = userDataGlobal.role === "user" ? userDataGlobal?._id : clientId;
    if (id) {
      axios
        .get(`https://jamblix.com/api/resume/${id}`)

        .then((res) => {
          
          if (!isEdit) {
            setName(data.firstName + "_resume " + (res.data.data.length + 1));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    callData();
    if (!isEdit) {
      setName(data.firstName + "_resume");
    } else {
      if (Array.isArray(data.fileName) && data.fileName.length > 0) {
        const fileName = data.fileName[0];
        if (typeof fileName === 'string' && fileName.endsWith(".pdf")) {
          setName(fileName.slice(0, -4));
        } else {
          setName(fileName);
        }
      } else {
        setName('');
      }
    }
  }, [userDataGlobal, data.firstName, saveLimit]);

  const selectResumeTemplate = (index) => {
    switch (index) {
      case 1:
        return (
          <Template1
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 2:
        return (
          <Template2
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 3:
        return (
          <Template3
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 4:
        return (
          <Template4
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 5:
        return (
          <Template5
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 6:
        return (
          <Template6
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 7:
        return (
          <Template7
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 8:
        return (
          <Template8
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 9:
        return (
          <Template9
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 10:
        return (
          <Template10
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 11:
        return (
          <Template11
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 12:
        return (
          <Template12
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 13:
        return (
          <Template13
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 14:
        return (
          <Template14
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 15:
        return (
          <Template15
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 16:
        return (
          <Template16
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 17:
        return (
          <Template17
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 18:
        return (
          <Template18
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 19:
        return (
          <Template19
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 20:
        return (
          <Template20
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 44:
        return (
          <Template44
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 32:
        return (
          <Template32
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 39:
        return (
          <Template39
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 48:
        return (
          <Template48
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 47:
        return (
          <Template47
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 30:
        return (
          <Template30
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      case 53:
        return (
          <Template53
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
      default:
        return (
          <Template1
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        );
    }
  };

  const [preview, setPreview] = useState(false);
  const [isDisabled, setdisabled] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const resumeRef = useRef();
  const handleLoad = () => {
    setLoading(false);
  };

  const saveResume = async (blob, download) => {
    console.log(666, blob);
    setdisabled(true);

    if (blob !== null) {
      console.log(551, saveLimit);
      if (saveLimit <= 0) {
        setLimitUsedModal(true);
        return;
      }
      if (isEdit) {
        setSaveDisabled(true);
        setLoading(true);

        const formData = new FormData();
        if (Object.keys(data).length > 0) {
          Object.keys(data).map((key) => {
            if (Array.isArray(data[key]) && data[key].length > 0) {
              formData.append(key, JSON.stringify(data[key]));
            } else {
              formData.append(key, data[key]);
            }
          });
        }
        formData.append("resumeIndex", selectedResumeIndex);
        formData.append("fileName", name);
        formData.append("selectedColor", selectedColor);
        formData.append("selectedFont", selectedFont);
        formData.append("pdfBlob", blob);

        axios
          .put("https://jamblix.com/api/resume/" + id, formData)
          .then((res) => {
            localStorage.setItem("saveCount", saveLimit - 1);
            getLimits();
            toast.success("Resume Updated successfully");
            setTimeout(() => {
              setSaveDisabled(false);
            }, 3000);

            setTimeout(() => {
              setLoading(false);
            }, 1000);
            setTimeout(() => {
              setdisabled(false);
            }, 10000);
          })
          .catch((err) => {
            setLoading(false);
            setSaveDisabled(false);
            console.log(err);
            toast.error("Something went wrong ");
          });
      } else {
        setLoading(true);
        setSaveDisabled(true);

        const formData = new FormData();
        if (Object.keys(data).length > 0) {
          Object.keys(data).map((key) => {
            if (Array.isArray(data[key]) && data[key].length > 0) {
              formData.append(key, JSON.stringify(data[key]));
            } else {
              if (data[key] != undefined) {
                formData.append(key, data[key]);
              }
            }
          });
        }

        formData.append("pdfBlob", blob);
        formData.append("resumeIndex", selectedResumeIndex);
        formData.append("fileName", name);
        formData.append("selectedColor", selectedColor);
        formData.append("selectedFont", selectedFont);

        if (userDataGlobal.role === "user") {
          formData.append("userId", userDataGlobal._id);
        } else if (userDataGlobal.role === "recruiter") {
          formData.append("userId", data.clientId);
          formData.append("recruiterId", userDataGlobal._id);
        }

        axios
          .post("https://jamblix.com/api/resume/add", formData)
          .then((res) => {
            const pdfUrl = res.data.data.resumeUrl;

            localStorage.setItem("saveCount", saveLimit - 1);
            if (download) {
              const link = document.createElement("a");
              link.href = pdfUrl;
              link.download = res.data.data.fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }

            getLimits();
            toast.success("Resume Saved To Collection successfully");
            localStorage.removeItem("userData");
            setTimeout(() => {
              setSaveDisabled(false);
            }, 3000);
            setLoading(false);
            setTimeout(() => {
              setdisabled(false);
            }, 10000);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong ");
            setSaveDisabled(false);
            setLoading(false);
          });
      }
    } else {
      toast.error("Something went wrong, Please try again");
    }
  };
  const updateDownloadCount = async () => {
    setDownloadBtnLoading(true);
    axios
      .put(
        "https://jamblix.com/api/subscription/updateDownloadLimit/" +
        userDataGlobal._id
      )
      .then((res) => {
        const result = res.data;
        localStorage.setItem("downloadCount", result.data.resumeDownloads);
        getLimits();
        setDownloadBtnLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong Please try again");
        setDownloadBtnLoading(false);
      });
  };
  const MyComponent = () => {
    return (
      <Document height="1124px" dpi={72}>
        {selectResumeTemplate(selectedResumeIndex)}
      </Document>
    );
  };

  const generatePDFBlob = async () => {
    try {
      const blob = await pdf(<MyComponent />).toBlob();

      // console.log("Generated Blob size:", blob.size);
      // console.log("Generated Blob type:", blob.type);

      const arrayBuffer = await blob.arrayBuffer();
      if (arrayBuffer) {
        saveResume(blob);
      }

      // console.log("ArrayBuffer:", arrayBuffer);
    } catch (error) {
      console.error("Error generating PDF Blob:", error);
    }
  };

  const SaveBTN = (blob, url, loading) => {
    return (
      <button
        onClick={() => generatePDFBlob()}
        disabled={saveDisabled}
        style={{ opacity: saveDisabled ? "0.5" : 1 }}
        className=" hover:bg-[#06A9EF] hover:text-[white] flex gap-1 text-[14px]  sm:w-[150px]  justify-center  font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] "
      >
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3  animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          "Save"
        )}
      </button>
    );
  };
  const DownloadButton = () => (
    <BlobProvider document={<MyComponent />} fileName="demo.pdf">
      {({ blob, url, loading, error }) => (
        <button
          onClick={() => saveResume(blob, true)}
          disabled={saveDisabled}
          style={{ opacity: saveDisabled ? "0.5" : 1 }}
          className=" hover:bg-[#06A9EF] hover-svg-white hover:text-[white] flex gap-1 text-[14px] w-fit  justify-center  font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] "
        >
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3  animate-spin "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              className=""
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_635_20356)">
                <path
                  d="M9.99967 13.333L5.83301 9.16634L6.99967 7.95801L9.16634 10.1247V3.33301H10.833V10.1247L12.9997 7.95801L14.1663 9.16634L9.99967 13.333ZM4.99967 16.6663C4.54134 16.6663 4.14898 16.5031 3.82259 16.1768C3.4962 15.8504 3.33301 15.458 3.33301 14.9997V12.4997H4.99967V14.9997H14.9997V12.4997H16.6663V14.9997C16.6663 15.458 16.5031 15.8504 16.1768 16.1768C15.8504 16.5031 15.458 16.6663 14.9997 16.6663H4.99967Z"
                  fill="#333333"
                />
              </g>
            </svg>
          )}
        </button>
      )}
    </BlobProvider>
  );

  return (
    <div
      className="ml:w-[100%] w-[100%] "
      style={{
        position: "relative",
        overflowY: "auto",
        maxHeight: "88vh",
      }}
    >
      <LimitUsedModal visible={limitUsedModal} setVisible={setLimitUsedModal} />
      <div
        className="flex  h-fit flex-col w-full  sm:px-4 px-2 gap-[14px] rounded-lg bg-white shadow-md"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="" ref={resumeRef}>
          <div className="flex justify-between  scr1024:gap-4 gap-2 ">
            <div className="flex items-center justify-between ml:w-[58%] w-full gap-4 ">
              <div
                className=" text-[14px] scr460:text-[20px] font-montserrat font-medium flex gap-3 items-center cursor-pointer "
                onClick={() => setNamePreview(true)}
              >
                <p>{name}</p>
                <svg
                  className="mt-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <g mask="url(#mask0_5925_110931)">
                    <path
                      d="M4.66404 15.8317H5.71531L14.2458 7.30121L13.1945 6.24994L4.66404 14.7804V15.8317ZM3.41406 17.0817V14.2612L14.4061 3.27402C14.5321 3.15956 14.6712 3.07112 14.8235 3.00868C14.9757 2.94625 15.1354 2.91504 15.3025 2.91504C15.4696 2.91504 15.6314 2.94469 15.7881 3.004C15.9447 3.06329 16.0834 3.15757 16.2041 3.28683L17.2217 4.31727C17.351 4.43799 17.4431 4.57691 17.4981 4.73402C17.5532 4.89112 17.5807 5.04821 17.5807 5.20531C17.5807 5.37288 17.5521 5.5328 17.4948 5.68506C17.4376 5.83734 17.3466 5.97648 17.2217 6.1025L6.23454 17.0817H3.41406ZM13.7109 6.78479L13.1945 6.24994L14.2458 7.30121L13.7109 6.78479Z"
                      fill="#646464"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex sm:gap-[16px] scr1024:gap-2 gap-2 items-center justify-end ml:w-[32%] w-full">
              {selectedResumeIndex !== undefined && (
                <>
                  <div className="mobile ">
                    <div className="ms:flex gap-2 scr420:gap-[16px] justify-between hidden ">
                      <button
                        className="hover:bg-[#06A9EF] hover-svg-white hover:text-[white] text-[12px] flex gap-1 items-center justify-between text-[#333] font-montserrat font-semibold px-2 py-2 rounded-[8px] border border-[#06A9EF]"
                        onClick={() => isSetEdit(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <g mask="url(#mask0_5925_110931)">
                            <path
                              d="M4.66404 15.8317H5.71531L14.2458 7.30121L13.1945 6.24994L4.66404 14.7804V15.8317ZM3.41406 17.0817V14.2612L14.4061 3.27402C14.5321 3.15956 14.6712 3.07112 14.8235 3.00868C14.9757 2.94625 15.1354 2.91504 15.3025 2.91504C15.4696 2.91504 15.6314 2.94469 15.7881 3.004C15.9447 3.06329 16.0834 3.15757 16.2041 3.28683L17.2217 4.31727C17.351 4.43799 17.4431 4.57691 17.4981 4.73402C17.5532 4.89112 17.5807 5.04821 17.5807 5.20531C17.5807 5.37288 17.5521 5.5328 17.4948 5.68506C17.4376 5.83734 17.3466 5.97648 17.2217 6.1025L6.23454 17.0817H3.41406ZM13.7109 6.78479L13.1945 6.24994L14.2458 7.30121L13.7109 6.78479Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                  {selectedResumeIndex !== undefined && (
                    // <BlobProvider document={<MyComponent />}>
                    //   {({ blob, url, loading, error }) => (
                    <SaveBTN loading={loading} />
                    //   )}
                    // </BlobProvider>
                  )}
                  <DownloadButton />
                </>
              )}
            </div>
          </div>
        </div>

        {selectedResumeIndex !== undefined && (
          <div
            className=" w-full ms:flex items-center justify-center  bg-[#525659] py-[24px] rounded-[8px] min-h-[700px] relative hidden "
            style={{
              transformOrigin: "top left",
            }}
          >
            {/* {loading ? (
              <div>
                <MiniLoader />
              </div>
            ) : ( */}

            <PDFViewer width="90%" height="900px" showToolbar={false}>
              <MyComponent />
            </PDFViewer>

            {/* )}  */}
            {resumeLoading && (
              <div
                className=" absolute w-[90%] flex items-center justify-center bg-white py-[24px] rounded-[8px] min-h-[900px]  "
                style={{
                  transformOrigin: "top left",
                }}
              >
                <div className="z-[2000]">
                  <MiniLoader />
                </div>
              </div>
            )}
          </div>
        )}

        {/* <div
          className=" w-full flex items-center justify-center mt-3 bg-[#525659] py-[24px] rounded-[8px]"
          style={{
            transformOrigin: "top left",
          }}
        >
          {render && (
            <Resume1
              data={data}
              selectedColor={selectedColor}
              selectedFont={selectedFont}
            />
          )}
        </div> */}
      </div>
      {preview && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
            <div
              ref={taskRef}
              className=" absolute bg-white  px-4 py-2 rounded-lg shadow-lg h-[90vh] flex flex-col gap-2 items-end ml:w-[60%] sm:w-[80%] w-[95%]"
            >
              <div className="flex gap-[16px]">
                {" "}
                {selectedResumeIndex !== undefined && (
                  <>
                    <BlobProvider document={<MyComponent />}>
                      {({ blob, url, loading, error }) => {
                        return (
                          <button
                            onClick={() => saveResume(blob)}
                            className="flex gap-1 text-[14px] w-[150px]  justify-center text-[#FFF] font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
                          >
                            Save
                          </button>
                        );
                      }}
                    </BlobProvider>
                    <DownloadButton />
                  </>
                )}
                <button onClick={() => setPreview(false)}>
                  <ClosedIcon />
                </button>
              </div>

              <div className="w-full  bg-[#525659] h-full flex items-center justify-center">
                <PDFViewer width="750" height="100%" showToolbar={false}>
                  <Document>
                    {selectResumeTemplate(selectedResumeIndex)}
                  </Document>
                </PDFViewer>
              </div>
            </div>
          </div>
        </>
      )}
      {namePreview && (
        <FileNameModel
          data={data}
          setNamePreview={setNamePreview}
          setFunction={(data) => setName(data)}
          clientId={clientId}
          isResume={true}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default ResumePreview;
