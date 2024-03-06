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
}) => {
  const [namePreview, setNamePreview] = useState(false);
  const [name, setName] = useState(data.firstName + "_resume");
  const userDataGlobal = useSelector((state) => state.userData);
 
  const callData = () => {
    axios
      .get("https://freedygoservices.in/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setName(data.firstName + "_resume " + (res.data.data.length + 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callData();
  }, [userDataGlobal]);
  const templates = [
    // {
    //   title: "Template1",
    //   imgUrl: "/images/templates/template1.png",
    //   index: 1,
    //   fontFamily: "Lato",
    //   themeColor: "#414042",
    // },
    // {
    //   title: "Template2",
    //   imgUrl: "/images/templates/template2.png",
    //   index: 2,
    //   fontFamily: "Barlow",
    //   themeColor: "#F7902B",
    // },
    {
      title: "Template3",
      imgUrl: "/images/templates/template3.png",
      index: 3,
      fontFamily: "Inter",
      themeColor: "#414042",
    },
    {
      title: "Template4",
      imgUrl: "/images/templates/template4.png",
      index: 4,
      fontFamily: "Montserrat",
      themeColor: "#00AEEF",
    },
    // {
    //   title: "Template5",
    //   imgUrl: "/images/templates/template5.png",
    //   index: 5,
    //   fontFamily: "Kanit",
    //   themeColor: "#316059",
    // },
    // {
    //   title: "Template6",
    //   imgUrl: "/images/templates/template6.png",
    //   index: 6,
    //   fontFamily: "Lato",
    //   themeColor: "#FFC20E",
    // },
    // {
    //   title: "Template7",
    //   imgUrl: "/images/templates/template7.png",
    //   index: 7,
    //   fontFamily: "Montserrat",
    //   themeColor: "#0077F9",
    // },
    // {
    //   title: "Template8",
    //   imgUrl: "/images/templates/template8.png",
    //   index: 8,
    //   fontFamily: "Montserrat",
    //   themeColor: "#646464",
    // },
    // {
    //   title: "Template9",
    //   imgUrl: "/images/templates/template9.png",
    //   index: 9,
    //   fontFamily: "Montserrat",
    //   themeColor: "#FFD740",
    // },
    // {
    //   title: "Template10",
    //   imgUrl: "/images/templates/template10.png",
    //   index: 10,
    //   fontFamily: "Inter",
    //   themeColor: "#F2BE5C",
    // },
    // {
    //   title: "Template11",
    //   imgUrl: "/images/templates/template11.png",
    //   index: 11,
    //   fontFamily: "Montserrat",
    //   themeColor: "#E6E7E8",
    // },
    // {
    //   title: "Template12",
    //   imgUrl: "/images/templates/template12.png",
    //   index: 12,
    //   fontFamily: "Lato",
    //   themeColor: "#0C2438",
    // },
    {
      title: "Template13",
      imgUrl: "/images/templates/template13.png",
      index: 13,
      fontFamily: "Poppins",
      themeColor: "#0E6CC2",
    },
    // {
    //   title: "Template14",
    //   imgUrl: "/images/templates/template14.png",
    //   index: 14,
    //   fontFamily: "Inter",
    //   themeColor: "#242424",
    // },
    // {
    //   title: "Template15",
    //   imgUrl: "/images/templates/template15.png",
    //   index: 15,
    //   fontFamily: "Inter",
    //   themeColor: "#716D6D",
    // },
    // {
    //   title: "Template16",
    //   imgUrl: "/images/templates/template53.png",
    //   index: 16,
    //   fontFamily: "Inter",
    //   themeColor: "#545554",
    // },
    // {
    //   title: "Template17",
    //   imgUrl: "/images/templates/template17.png",
    //   index: 17,
    //   fontFamily: "Montserrat",
    //   themeColor: "#D1D2D3",
    // },
    {
      title: "Template18",
      imgUrl: "/images/templates/template54.png",
      index: 18,
      fontFamily: "Montserrat",
      themeColor: "#F1F1F1",
    },
    // {
    //   title: "Template19",
    //   imgUrl: "/images/templates/template19.png",
    //   index: 19,
    //   fontFamily: "Inter",
    //   themeColor: "#000000",
    // },
    // {
    //   title: "Template20",
    //   imgUrl: "/images/templates/template20.png",
    //   index: 20,
    //   fontFamily: "Montserrat",
    //   themeColor: "#303030",
    // },
  ];

  const renderTemplates = () => {
    const selectedStyle = {
      borderTop: " 4px solid #06A9EF",
      borderBottom: "4px solid #06A9EF",
      height: " 210px",
      width: "auto",
    };
    return templates.map((template, index) => (
      <img
        style={selectedResumeIndex == template.index ? selectedStyle : {}}
        key={index}
        src={template.imgUrl}
        className="h-[200px] w-[140.91px] rounded-[6px]"
        alt=""
        onClick={() => handleImageClick(template)}
      />
    ));
  };

  const renderAllTemplates = () => {
    return templates.map((template, index) => (
      <img
        key={index}
        src={template.imgUrl}
        className="h-[330px] w-[234px] rounded-[6px] transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }}
        alt=""
        onClick={() => {
          handleImageClick(template);
          setIsAll(false);
        }}
      />
    ));
  };

  const [isAll, setIsAll] = useState(false);

  const handleImageClick = (template) => {
    togglePreview(true, template.index);
    setSelectedColor(template.themeColor);
    setSelectedFont(template.fontFamily);
  };

  const resumeRef = useRef();
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useState(false);

  const togglePreview = (isVisible, index) => {
    setSelectedResumeIndex(index);
  };
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
    }
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsAll(false);
      setPreview(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const saveResume = async (blob) => {
    if (isEdit) {
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
      formData.append("pdfBlob", blob);

      axios
        .put("https://freedygoservices.in/api/resume/" + id, formData)
        .then((res) => {
          toast.success("Resume Updated successfully");
          setLoading(false);
          callData();
        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
          toast.success("Something went wrong ");
        });
    } else {
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
        .post("https://freedygoservices.in/api/resume/add", formData)
        .then((res) => {
          toast.success("Resume Saved To Collection successfully");
          setLoading(false);
          callData();
        })
        .catch((err) => {
          console.log(err);
          toast.success("Something went wrong ");
          setLoading(false);
        });
    }
  };
  const MyComponent = () => {
    return (
      <Document height="1124px" dpi={72}>
        {selectResumeTemplate(selectedResumeIndex)}
      </Document>
    );
  };

  return (
    <div
      className="ml:w-[60%] w-[100%] "
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div
        className="flex  h-fit flex-col w-full  sm:p-4 p-2 gap-[14px] rounded-lg bg-white shadow-md"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
          <div
            className="flex gap-4 pb-[10px]  items-center"
            style={{ overflowX: "auto" }}
          >
            {renderTemplates()}
          </div>
        </div>

        <div
          onClick={() => setIsAll(true)}
          className="flex justify-end text-[18px] font-[500] text-[#06A9EF] cursor-pointer"
        >
          See All Templets
        </div>
        {isAll && (
          <div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
              <div
                ref={taskRef}
                onWheel={(e) => e.stopPropagation()}
                className=" absolute flex p-6 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap justify-center items-center ml:w-[65%] w-[90%] h-[90vh] overflow-y-auto "
              >
                {renderAllTemplates()}
              </div>
            </div>
          </div>
        )}
        <div className="" ref={resumeRef}>
          <div className="flex justify-between flex-wrap scr1024:gap-4 gap-2">
            <div className="flex items-center justify-between ml:w-[50%] w-full gap-4">
              <div
                className=" text-[20px] font-montserrat font-medium  cursor-pointer "
                onClick={() => setNamePreview(true)}
              >
                {name}

              </div>
              {selectedResumeIndex !== undefined && (
                <BlobProvider document={<MyComponent />}>
                  {({ blob, url, loading, error }) => {
                    return (
                      <button
                        onClick={() => saveResume(blob)}
                        disabled={loading}
                        className="flex gap-1 text-[14px] sm:w-[150px]  justify-center  font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] "
                      >
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            role="status"
                            class="inline w-4 h-4 me-3  animate-spin"
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
                  }}
                </BlobProvider>
              )}
            </div>
            <div className="flex sm:gap-[16px] scr1024:gap-2 gap-2 items-center justify-end ml:w-[45%] w-full">
              {selectedResumeIndex !== undefined && (
                <>
                  <div className="mobile">
                    <div className="flex gap-2 scr420:gap-[16px] justify-between ">
                      <button
                        className=" text-[12px] flex gap-1 items-center justify-between text-[#333] font-montserrat font-semibold px-2 py-2 rounded-[8px] border border-[#06A9EF]"
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
                  <PDFDownloadLink
                    document={<MyComponent />}
                    fileName={name + ".pdf"}
                  >
                    {({ blob, url, loading, error }) => (
                      <button className="flex gap-1 text-[14px] w-[51.4px] h-[40px]  justify-center  font-montserrat font-semibold  rounded-[8px] items-center border border-[#06A9EF] ">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                          <g mask="url(#mask0_635_20356)">
                            <path d="M9.99967 13.333L5.83301 9.16634L6.99967 7.95801L9.16634 10.1247V3.33301H10.833V10.1247L12.9997 7.95801L14.1663 9.16634L9.99967 13.333ZM4.99967 16.6663C4.54134 16.6663 4.14898 16.5031 3.82259 16.1768C3.4962 15.8504 3.33301 15.458 3.33301 14.9997V12.4997H4.99967V14.9997H14.9997V12.4997H16.6663V14.9997C16.6663 15.458 16.5031 15.8504 16.1768 16.1768C15.8504 16.5031 15.458 16.6663 14.9997 16.6663H4.99967Z" fill="#333333" />
                          </g>
                        </svg>

                      </button>
                    )}
                  </PDFDownloadLink>
                </>
              )}

              <button
                onClick={() => setPreview(true)}
                className="flex gap-1 text-[14px] w-[150px]  justify-center  font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] b"
              >
                Full Screen View
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mobile">
          <div className="flex gap-2 scr420:gap-[16px] justify-between">
            <button
              className=" text-[12px] flex gap-1 items-center justify-between text-[#333] font-montserrat font-semibold px-2 py-1 rounded-[8px] border border-[#06A9EF]"
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
        </div> */}
        {selectedResumeIndex !== undefined && (
          <div
            className=" w-full flex items-center justify-center mt-3 bg-[#525659] py-[24px] rounded-[8px]"
            style={{
              transformOrigin: "top left",
            }}
          >
            <PDFViewer width="80%" height="900px" showToolbar={false}>
              <MyComponent />
            </PDFViewer>
          </div>
        )}
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
                    <PDFDownloadLink
                      document={<MyComponent />}
                      fileName="somename.pdf"
                    >
                      {({ blob, url, loading, error }) => (
                        <button className="flex gap-1 text-[14px] w-[51.4px] h-[40px]  justify-center text-[#FFF] font-montserrat font-semibold  rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
                          <img
                            src="/images/download.png"
                            style={{
                              height: "34px",
                              width: "34px",
                              objectFit: "contain",
                            }}
                            alt=""
                          />
                        </button>
                      )}
                    </PDFDownloadLink>
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
        />
      )}
    </div>
  );
};

export default ResumePreview;
