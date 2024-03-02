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
}) => {
  const templates = [
    {
      title: "Template1",
      imgUrl: "/images/templates/template1.png",
      index: 1,
      fontFamily: "Lato",
      themeColor: "#414042",
    },
    {
      title: "Template2",
      imgUrl: "/images/templates/template2.png",
      index: 2,
      fontFamily: "Barlow",
      themeColor: "#F7902B",
    },
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
    {
      title: "Template5",
      imgUrl: "/images/templates/template5.png",
      index: 5,
      fontFamily: "Kanit",
      themeColor: "#316059",
    },
    {
      title: "Template6",
      imgUrl: "/images/templates/template6.png",
      index: 6,
      fontFamily: "Lato",
      themeColor: "#FFC20E",
    },
    {
      title: "Template7",
      imgUrl: "/images/templates/template7.png",
      index: 7,
      fontFamily: "Montserrat",
      themeColor: "#0077F9",
    },
    {
      title: "Template8",
      imgUrl: "/images/templates/template8.png",
      index: 8,
      fontFamily: "Montserrat",
      themeColor: "#646464",
    },
    {
      title: "Template9",
      imgUrl: "/images/templates/template9.png",
      index: 9,
      fontFamily: "Montserrat",
      themeColor: "#FFD740",
    },
    {
      title: "Template10",
      imgUrl: "/images/templates/template10.png",
      index: 10,
      fontFamily: "Inter",
      themeColor: "#F2BE5C",
    },
    {
      title: "Template11",
      imgUrl: "/images/templates/template11.png",
      index: 11,
      fontFamily: "Montserrat",
      themeColor: "#E6E7E8",
    },
    {
      title: "Template12",
      imgUrl: "/images/templates/template12.png",
      index: 12,
      fontFamily: "Lato",
      themeColor: "#0C2438",
    },
    {
      title: "Template13",
      imgUrl: "/images/templates/template13.png",
      index: 13,
      fontFamily: "Poppins",
      themeColor: "#0E6CC2",
    },
    {
      title: "Template14",
      imgUrl: "/images/templates/template14.png",
      index: 14,
      fontFamily: "Inter",
      themeColor: "#242424",
    },
    {
      title: "Template15",
      imgUrl: "/images/templates/template15.png",
      index: 15,
      fontFamily: "Inter",
      themeColor: "#716D6D",
    },
    {
      title: "Template16",
      imgUrl: "/images/templates/template53.png",
      index: 16,
      fontFamily: "Inter",
      themeColor: "#545554",
    },
    {
      title: "Template17",
      imgUrl: "/images/templates/template17.png",
      index: 17,
      fontFamily: "Montserrat",
      themeColor: "#D1D2D3",
    },
    {
      title: "Template18",
      imgUrl: "/images/templates/template54.png",
      index: 18,
      fontFamily: "Montserrat",
      themeColor: "#F1F1F1",
    },
    {
      title: "Template19",
      imgUrl: "/images/templates/template19.png",
      index: 19,
      fontFamily: "Inter",
      themeColor: "#000000",
    },
    {
      title: "Template20",
      imgUrl: "/images/templates/template20.png",
      index: 20,
      fontFamily: "Montserrat",
      themeColor: "#303030",
    },
    // {
    //   title: "Template21",
    //   imgUrl: "/images/templates/template21.png",
    //   index: 21,
    //   fontFamily: "Montserrat",
    //   themeColor: "#494949",
    // },
    // {
    //   title: "Template22",
    //   imgUrl: "/images/templates/template22.png",
    //   index: 22,
    //   fontFamily: "Inter",
    //   themeColor: "#000000",
    // },
    // {
    //   title: "Template23",
    //   imgUrl: "/images/templates/template23.png",
    //   index: 23,
    //   fontFamily: "Inter",
    //   themeColor: "#000000",
    // },
    // {
    //   title: "Template24",
    //   imgUrl: "/images/templates/template24.png",
    //   index: 24,
    //   fontFamily: "Poppins",
    //   themeColor: "#FBEDE4",
    // },
    // {
    //   title: "Template25",
    //   imgUrl: "/images/templates/template25.png",
    //   index: 25,
    //   fontFamily: "Montserrat",
    //   themeColor: "#414042",
    // },
    // {
    //   title: "Template26",
    //   imgUrl: "/images/templates/template26.png",
    //   index: 26,
    //   fontFamily: "Montserrat",
    //   themeColor: "#414042",
    // },
    // {
    //   title: "Template27",
    //   imgUrl: "/images/templates/template27.png",
    //   index: 27,
    //   fontFamily: "Inter",
    //   themeColor: "#CB3122",
    // },
    // {
    //   title: "Template28",
    //   imgUrl: "/images/templates/template28.png",
    //   index: 28,
    //   fontFamily: "Inter",
    //   themeColor: "#2AB6BB",
    // },
    // {
    //   title: "Template29",
    //   imgUrl: "/images/templates/template29.png",
    //   index: 29,
    //   fontFamily: "Montserrat",
    //   themeColor: "#324955",
    // },
    // {
    //   title: "Template30",
    //   imgUrl: "/images/templates/template30.png",
    //   index: 30,
    //   fontFamily: "Montserrat",
    //   themeColor: "#0054A6",
    // },
    // {
    //   title: "Template31",
    //   imgUrl: "/images/templates/template31.png",
    //   index: 31,
    //   fontFamily: "Poppins",
    //   themeColor: "#227CFF",
    // },
    // {
    //   title: "Template32",
    //   imgUrl: "/images/templates/template32.png",
    //   index: 32,
    //   fontFamily: "Lato",
    //   themeColor: "#0072BC",
    // },
    // {
    //   title: "Template33",
    //   imgUrl: "/images/templates/template33.png",
    //   index: 33,
    //   fontFamily: "Kanit",
    //   themeColor: "#414042",
    // },
    // {
    //   title: "Template34",
    //   imgUrl: "/images/templates/template34.png",
    //   index: 34,
    //   fontFamily: "Poppins",
    //   themeColor: "#6C83B7",
    // },
    // {
    //   title: "Template35",
    //   imgUrl: "/images/templates/template35.png",
    //   index: 35,
    //   fontFamily: "Lato",
    //   themeColor: "#B3977F",
    // },
    // {
    //   title: "Template36",
    //   imgUrl: "/images/templates/template36.png",
    //   index: 36,
    //   fontFamily: "Lato",
    //   themeColor: "#F15A29",
    // },
    // {
    //   title: "Template37",
    //   imgUrl: "/images/templates/template37.png",
    //   index: 37,
    //   fontFamily: "Inter",
    //   themeColor: "#3956A3",
    // },
    // {
    //   title: "Template38",
    //   imgUrl: "/images/templates/template38.png",
    //   index: 38,
    //   fontFamily: "Lato",
    //   themeColor: "#C49A6C",
    // },
    // {
    //   title: "Template39",
    //   imgUrl: "/images/templates/template39.png",
    //   index: 39,
    //   fontFamily: "Lato",
    //   themeColor: "#030203",
    // },
    // {
    //   title: "Template40",
    //   imgUrl: "/images/templates/template40.png",
    //   index: 40,
    //   fontFamily: "Lato",
    //   themeColor: "#47484C",
    // },
    // {
    //   title: "Template41",
    //   imgUrl: "/images/templates/template41.png",
    //   index: 41,
    //   fontFamily: "Inter",
    //   themeColor: "#EDEDEE",
    // },
    // {
    //   title: "Template42",
    //   imgUrl: "/images/templates/template42.png",
    //   index: 42,
    //   fontFamily: "Lato",
    //   themeColor: "#414042",
    // },
    // {
    //   title: "Template43",
    //   imgUrl: "/images/templates/template43.png",
    //   index: 43,
    //   fontFamily: "Montserrat",
    //   themeColor: "#F9D3D0",
    // },
    // {
    //   title: "Template44",
    //   imgUrl: "/images/templates/template44.png",
    //   index: 44,
    //   fontFamily: "Inter",
    //   themeColor: "#C7EAFB",
    // },
    // {
    //   title: "Template45",
    //   imgUrl: "/images/templates/template45.png",
    //   index: 45,
    //   fontFamily: "Lato",
    //   themeColor: "#9E071C",
    // },
    // {
    //   title: "Template46",
    //   imgUrl: "/images/templates/template46.png",
    //   index: 46,
    //   fontFamily: "Lato",
    //   themeColor: "#00AEEF",
    // },
    // {
    //   title: "Template47",
    //   imgUrl: "/images/templates/template47.png",
    //   index: 47,
    //   fontFamily: "Poppins",
    //   themeColor: "#27AAE1",
    // },
    // {
    //   title: "Template48",
    //   imgUrl: "/images/templates/template48.png",
    //   index: 48,
    //   fontFamily: "Poppins",
    //   themeColor: "#F7941D",
    // },
    // {
    //   title: "Template49",
    //   imgUrl: "/images/templates/template49.png",
    //   index: 49,
    //   fontFamily: "Poppins",
    //   themeColor: "#27AAE1",
    // },
    // {
    //   title: "Template50",
    //   imgUrl: "/images/templates/template50.png",
    //   index: 50,
    //   fontFamily: "Inter",
    //   themeColor: "#1C75BC",
    // },
    // {
    //   title: "Template51",
    //   imgUrl: "/images/templates/template51.png",
    //   index: 51,
    //   fontFamily: "Inter",
    //   themeColor: "#F1D61B",
    // },
    // {
    //   title: "Template52",
    //   imgUrl: "/images/templates/template52.png",
    //   index: 52,
    //   fontFamily: "Lato",
    //   themeColor: "#304A9F",
    // },
    // {
    //   title: "Template53",
    //   imgUrl: "/images/templates/template53.png",
    //   index: 53,
    //   fontFamily: "Montserrat",
    //   themeColor: "#AC5428",
    // },
    // {
    //   title: "Template54",
    //   imgUrl: "/images/templates/template54.png",
    //   index: 54,
    //   fontFamily: "Montserrat",
    //   themeColor: "#83C3C9",
    // },
    // {
    //   title: "Template55",
    //   imgUrl: "/images/templates/template55.png",
    //   index: 55,
    //   fontFamily: "Montserrat",
    //   themeColor: "#FC9206",
    // },
    // {
    //   title: "Template56",
    //   imgUrl: "/images/templates/template56.png",
    //   index: 56,
    //   fontFamily: "Montserrat",
    //   themeColor: "#56C8E2",
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
        style={selectedResumeIndex == index + 1 ? selectedStyle : {}}
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

  const MyDocument = () => (
    <Document height="1124px">
      {selectResumeTemplate(selectedResumeIndex)}
    </Document>
  );

  const generatePDFUsingRenderer = async () => {
    // Render the PDF document to a blob
    const pdfBlob = await new Promise((resolve) => {
      const doc = React.createElement(MyDocument);
      const pdfString = ReactDOMServer.renderToString(doc);

      // Convert the rendered string to a Blob
      const blob = new Blob([pdfString], {
        type: "application/pdf",
      });
      resolve(blob);
    });

    return pdfBlob;
  };
  const saveResume = async (blob) => {
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
    formData.append("fileName", "resume" + selectedResumeIndex);
    formData.append("selectedColor", selectedColor);
    formData.append("selectedFont", selectedFont);

    axios
      .post("https://freedygoservices.in/api/resume/add", formData)
      .then((res) => {
        toast.success("Resume Saved To Collection successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.success("Something went wrong ");
      });
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
        className="flex  h-fit flex-col w-full  p-4 gap-[14px] rounded-lg bg-white shadow-md"
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
                className=" absolute flex p-6 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap justify-center items-center w-[65%] h-[90vh] overflow-y-auto "
              >
                {renderAllTemplates()}
              </div>
            </div>
          </div>
        )}
        <div className="web" ref={resumeRef}>
          <div className="flex justify-between">
            <div className=" text-[20px]  font-montserrat font-medium flex items-center">
              Preview
            </div>

            <div className="flex gap-[16px]">
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

              <button
                onClick={() => setPreview(true)}
                className="flex gap-1 text-[14px] w-[150px]  justify-center text-[#FFF] font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
              >
                Full Screen View
              </button>
            </div>
          </div>
        </div>

        <div className="mobile">
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
        </div>
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
              className=" absolute bg-white  px-4 py-2 rounded-lg shadow-lg h-[90vh] flex flex-col gap-2 items-end w-[900px]"
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
    </div>
  );
};

export default ResumePreview;
