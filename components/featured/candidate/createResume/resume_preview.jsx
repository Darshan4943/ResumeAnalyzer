import React, { useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import html2canvas from "html2canvas";
import axios from "axios";
import AWS from "aws-sdk";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reCallUserData } from "@/Redux/actions/user";
import MiniLoader from "@/components/common/mini-loader";

import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
} from "@react-pdf/renderer";
import Sample from "../../resumeTemplates/Template1";
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
import Template24 from "../../resumeTemplates/Template24";
import Template8 from "../../resumeTemplates/Template8";
import Template28 from "../../resumeTemplates/Template28";

import Template30 from "../../resumeTemplates/Template30";
import Template10 from "../../resumeTemplates/Template10";
import Template29 from "../../resumeTemplates/Template29";
import Template33 from "../../resumeTemplates/Template33";
import Template32 from "../../resumeTemplates/Template32";
import Template38 from "../../resumeTemplates/Template38";
import Template31 from "../../resumeTemplates/Template31";
import Template36 from "../../resumeTemplates/Template36";
import Template20 from "../../resumeTemplates/Template20";
import Template11 from "../../resumeTemplates/Template11";
import Template19 from "../../resumeTemplates/Template19";



import Template25 from "../../resumeTemplates/Template25";
import Template39 from "../../resumeTemplates/Template39";
import Template40 from "../../resumeTemplates/Template40";
import Template35 from "../../resumeTemplates/Template35";
import Template37 from "../../resumeTemplates/Template37";
import Template41 from "../../resumeTemplates/Template41";
import Template42 from "../../resumeTemplates/Template42";
import Template43 from "../../resumeTemplates/Template43";
import Template49 from "../../resumeTemplates/Template49";
import Template51 from "../../resumeTemplates/Template51";
import Template53 from "../../resumeTemplates/Template53";
import Template54 from "../../resumeTemplates/Template54";
import Template55 from "../../resumeTemplates/Template55";






import Template13 from "../../resumeTemplates/Template13";
import Template34 from "../../resumeTemplates/Template34";
import Template44 from "../../resumeTemplates/Template44";
import Template47 from "../../resumeTemplates/Template47";
import Template14 from "../../resumeTemplates/Template14";
import Template16 from "../../resumeTemplates/Template16";
import Template21 from "../../resumeTemplates/Template21";
import Template22 from "../../resumeTemplates/Template22";
import Template23 from "../../resumeTemplates/Template23";
import Template26 from "../../resumeTemplates/Template26";
import Template27 from "../../resumeTemplates/Template27";
import Template45 from "../../resumeTemplates/Template45";
import Fonts from "@/public/fonts/fonts";
<Fonts/>
const ResumePreview = ({ data, isSetEdit }) => {

  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const resumeRef = useRef();
  const [preview, setPreview] = useState(false);

  const [selectedResumeIndex, setSelectedResumeIndex] = useState();
  console.log(27, selectedResumeIndex);
  const [loading, setLoading] = useState(false);

  const togglePreview = (isVisible, index) => {
    // setPreview(isVisible);
    // console.log(data)
    setSelectedResumeIndex(index);
  };
  const selectResumeTemplate = (index) => {
    switch (index) {
      case 1:
        return <Template1 data={data} />;
      case 2:
        return <Template2 data={data} />;
      case 3:
        return <Template3 data={data} />;
      case 4:
        return <Template4 data={data} />;
      case 5:
        return <Template5 data={data} />;
      case 6:
        return <Template6 data={data} />;
      case 7:
        return <Template7 data={data} />;
      case 8:
        return <Template8 data={data} />;
      case 9:
        return <Template9 data={data} />;
      case 10:
        return <Template10 data={data} />;
      case 11:
        return <Template11 data={data} />;
      case 12:
        return <Template12 data={data} />;
      case 13:
        return <Template13 data={data} />;
      case 14:
        return <Template14 data={data} />;
      case 15:
        return <Template15 data={data} />;
      case 16:
        return <Template16 data={data} />;
      case 17:
        return <Template17 data={data} />;
      case 18:
        return <Template18 data={data} />;
      case 19:
        return <Template19 data={data} />;
      case 20:
        return <Template20 data={data} />;
      case 21:
        return <Template21 data={data} />;
      case 22:
        return <Template22 data={data} />;
      case 23:
        return <Template23 data={data} />;
      case 24:
        return <Template24 data={data} />;
      case 25:
        return <Template25 data={data} />;
      case 26:
        return <Template26 data={data} />;
      case 27:
        return <Template27 data={data} />;
      case 28:
        return <Template28 data={data} />;
      case 29:
        return <Template29 data={data} />;
      case 30:
        return <Template30 data={data} />;
      case 31:
        return <Template31 data={data} />;
      case 32:
        return <Template32 data={data} />;
      case 33:
        return <Template33 data={data} />;
      case 34:
        return <Template34 data={data} />;
      case 35:
        return <Template35 data={data} />;
      case 36:
        return <Template36 data={data} />;
      case 37:
        return <Template37 data={data} />;
      case 38:
        return <Template38 data={data} />;
      case 39:
        return <Template39 data={data} />;
      case 40:
        return <Template40 data={data} />;
      case 41:
        return <Template41 data={data} />;
      case 42:
        return <Template42 data={data} />;
      case 43:
        return <Template43 data={data} />;
      case 44:
        return <Template44 data={data} />;
      case 45:
        return <Template45 data={data} />;
      case 47:
        return <Template47 data={data} />;
      case 48:
        return <Template48 data={data} />;
      case 49:
        return <Template49 data={data} />;
      case 50:
        return <Template50 data={data} />;
        case 51:
          return <Template51 data={data} />;
          case 53:
          return <Template53 data={data} />;
          case 54:
          return <Template54 data={data} />;
          case 55:
            return <Template55 data={data} />;

      default:
        return <Template1 data={data} />;
    }
  };

  const pdfConverter = async () => {
    html2canvas(resumeRef.current, { autoResize: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setLoading(true);
      axios
        .put(
          "https://freedygoservices.in/api/candidate/addResume/" +
          userDataGlobal._id,
          {
            pdfContent: imgData,
          }
        )
        .then((res) => {
          setLoading(false);
          toast.success("Resume Attaches Successfully");
          dispatch(reCallUserData());
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoading(false);
          console.log(err);
        });
    });
  };
  const generatePdf = () => {
    generatePDF(resumeRef, {
      filename: `${userDataGlobal?.basics?.firstName}-skilotech-resume-${userDataGlobal?.resumeUrl?.length}.pdf`,
    });
  };

  const [showPDF, setShowPDF] = useState(false);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  return (
    <div
      className="ml:w-[49%] w-[100%]"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div
        className="flex  h-fit flex-col w-full  p-4 gap-[14px] rounded-lg bg-white shadow-md"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
          <div className=" flex gap-4 pb-[10px]" style={{ overflowX: "auto" }}>
            <img
              src="/images/services/resume1.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 1)}
            />
            <img
              src="/images/services/resume2.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 2)}
            />
            <img
              src="/images/services/resume3.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 3)}
            />
            <img
              src="/images/services/resume4.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 4)}
            />
            <img
              src="/images/services/resume5.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 5)}
            />
            <img
              src="/images/services/resume6.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 6)}
            />
            <img
              src="/images/services/resume7.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 7)}
            />
            <img
              src="/images/services/resume8.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 8)}
            />
            <img
              src="/images/services/resume9.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 9)}
            />
            <img
              src="/images/services/Template10.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 10)}
            />
            <img
              src="/images/services/resume11.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 11)}
            />
            <img
              src="/images/services/resume12.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 12)}
            />
            <img
              src="/images/services/template13.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 13)}
            />
            <img
              src="/images/services/template14.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 14)}
            />
            <img
              src="/images/services/template15.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 15)}
            />
            <img
              src="/images/services/template16.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 16)}
            />

            <img
              src="/images/services/template17.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 17)}
            />
            <img
              src="/images/services/template18.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 18)}
            />
            <img
              src="/images/services/template19.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 19)}
            />
            <img
              src="/images/services/template20.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 20)}
            />
            <img
              src="/images/services/template21.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 21)}
            />
            <img
              src="/images/services/template22.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 22)}
            />
            <img
              src="/images/services/template23.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 23)}
            />
            <img
              src="/images/services/resume24.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 24)}
            />
            <img
              src="/images/services/resume25.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 25)}
            />
            <img
              src="/images/services/template26.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 26)}
            />
            <img
              src="/images/services/template27.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 27)}
            />
            <img
              src="/images/services/template28.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 28)}
            />
            <img
              src="/images/services/template29.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 29)}
            />
            <img
              src="/images/services/template30.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 30)}
            />
            <img
              src="/images/services/resume31.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 31)}
            />
            <img
              src="/images/services/template32.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 32)}
            />
            <img
              src="/images/services/template33.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 33)}
            />
            <img
              src="/images/services/template34.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 34)}
            />
            <img
              src="/images/services/template35.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 35)}
            />
            <img
              src="/images/services/resume36.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 36)}
            />
            <img
              src="/images/services/template37.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 37)}
            />

            <img
              src="/images/services/template38.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 38)}
            />
            <img
              src="/images/services/template39.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 39)}
            />
            <img
              src="/images/services/template40.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 40)}
            />
            <img
              src="/images/services/template41.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 41)}
            />
            <img
              src="/images/services/template42.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 42)}
            />
            <img
              src="/images/services/template43.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 43)}
            />
            <img
              src="/images/services/template44.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 44)}
            />
            <img
              src="/images/services/template45.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 45)}
            />
            <img
              src="/images/services/template47.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 47)}
            />

              <img
              src="/images/services/template48.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 48)}
            />
       
            <img
              src="/images/services/template49.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 49)}
            />
            <img
              src="/images/services/template50.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 50)}
            />
            <img
              src="/images/services/template51.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 51)}
            />
             <img
              src="/images/services/template53.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 53)}
            />
             <img
              src="/images/services/template54.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 54)}
            />
             <img
              src="/images/services/template55.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 55)}
            />
          </div>
        </div>

        <div className="web" ref={resumeRef}>
          <div className="flex justify-between">
            <div className=" text-[20px]  font-montserrat font-medium flex items-center">
              Preview
            </div>

            <div className="flex gap-[16px]">
              <button
                onClick={pdfConverter}
                className="flex gap-1 text-[12px] h-[38px] w-[90px] justify-center  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
              >
                {loading ? (
                  <MiniLoader />
                ) : (
                  <>
                    {" "}
                    <img
                      src="/images/services/add_link.png"
                      className="h-[24px] w-[24px] rounded-[6px]"
                      alt=""
                    />
                    Attach
                  </>
                )}
              </button>
              <button
                onClick={() => setPreview(true)}
                className="flex gap-1 text-[14px] w-[150px]  justify-center text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
              >
                Full Screen View
              </button>
            </div>
          </div>
        </div>

        <div className="mobile">
          <div className="flex gap-2 scr420:gap-[16px] justify-between">
            <button
              onClick={pdfConverter}
              className="flex gap-1 text-[12px] h-[38px] w-[90px] justify-center  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
            >
              {loading ? (
                <MiniLoader />
              ) : (
                <>
                  {" "}
                  <img
                    src="/images/services/add_link.png"
                    className="h-[24px] w-[24px] rounded-[6px]"
                    alt=""
                  />
                  Attach
                </>
              )}
            </button>
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

            {/* <button
              className=" text-[12px] flex gap-1 items-center justify-between text-[#333] font-montserrat font-semibold px-2 py-1 rounded-[8px] border border-[#06A9EF]"
              onClick={() => generatePdf()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <g mask="url(#mask0_5925_110936)">
                  <path
                    d="M10.5 13.157L6.94233 9.59938L7.82052 8.69554L9.875 10.75V3.75H11.125V10.75L13.1794 8.69554L14.0576 9.59938L10.5 13.157ZM5.75642 16.25C5.33547 16.25 4.97917 16.1041 4.6875 15.8125C4.39583 15.5208 4.25 15.1645 4.25 14.7435V12.484H5.49998V14.7435C5.49998 14.8077 5.52669 14.8664 5.5801 14.9199C5.63353 14.9733 5.69231 15 5.75642 15H15.2435C15.3077 15 15.3664 14.9733 15.4199 14.9199C15.4733 14.8664 15.5 14.8077 15.5 14.7435V12.484H16.75V14.7435C16.75 15.1645 16.6041 15.5208 16.3125 15.8125C16.0208 16.1041 15.6645 16.25 15.2435 16.25H5.75642Z"
                    fill="#333333"
                  />
                </g>
              </svg>
              Download
            </button> */}
          </div>
        </div>

        {/* <div style={{ position: "absolute", left: 10000 }}>
          <div className="mt-2  " ref={resumeRef}>
            <div className=" ">{selectResumeTemplate(selectedResumeIndex)}</div>
          </div>
        </div> */}

        {/* <div
          className=" border border-[#06A9EF] transform xxsm:scale-[35%] scr340:scale-[37%] scr360:scale-[39%] scr390:scale-[42%] scr420:scale-[46%] sm:scale-[53%] scr540:scale-[60%] ms:scale-[68%] scr700:scale-[80%] md:scale-[88%] scr820:scale-[95%] ml:scale-[46%] scr900:scale-[50%] lg:scale-[54%] scr1024:scale-[57%] scr1100:scale-[62%] xxlg:scale-[63%] scr1150:scale-[65%]  scale-[33%]  "
          style={{
            width: "49.7rem",
            // scale: "0.65",
            transformOrigin: "top left",
          }}
        >
          {selectResumeTemplate(selectedResumeIndex)}
        </div> */}
        {selectedResumeIndex !== undefined && (
          <div
            className="  transform xxsm:scale-[35%] scr340:scale-[37%] scr360:scale-[39%] scr390:scale-[42%] scr420:scale-[46%] sm:scale-[53%] scr540:scale-[60%] ms:scale-[68%] scr700:scale-[80%] md:scale-[88%] scr820:scale-[95%] ml:scale-[46%] scr900:scale-[50%] lg:scale-[54%] scr1024:scale-[57%] scr1100:scale-[62%] xxlg:scale-[63%] scr1150:scale-[65%]  scale-[33%]  "
            style={{
              width: "49.7rem",
              // scale: "0.65",
              transformOrigin: "top left",
            }}
          >
            <PDFViewer width="100%" height="1160px">
              <Document height="1124px">
                {selectResumeTemplate(selectedResumeIndex)}
              </Document>
            </PDFViewer>
          </div>
        )}
      </div>
      {preview && (
        // <>
        //   {" "}
        //   <div
        //     className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60 web"
        //     onClick={() => setPreview(false)}
        //   ></div>
        //   <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins  ">
        //     <div className="absolute bg-white overflow-y-scroll h-[90vh] p-8 rounded-[8px]">
        //       <div className="flex gap-[16px] justify-end">
        //         <button
        //           onClick={pdfConverter}
        //           className="flex gap-1 text-[12px] h-[38px] w-[90px] justify-center  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
        //         >
        //           {loading ? (
        //             <MiniLoader />
        //           ) : (
        //             <>
        //               {" "}
        //               <img
        //                 src="/images/services/add_link.png"
        //                 className="h-[24px] w-[24px] rounded-[6px]"
        //                 alt=""
        //               />
        //               Attach
        //             </>
        //           )}
        //         </button>
        //         <button
        //           className=" text-[12px] text-[#333] font-montserrat font-semibold px-9 py-1 rounded-[8px] border border-[#06A9EF]"
        //           onClick={() => generatePdf()}
        //         >
        //           Download Resume
        //         </button>
        //         <ALink href="/profile">
        //           <button className="flex gap-1 text-[12px] h-[38px] w-[90px] justify-center  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
        //             Profile
        //           </button>
        //         </ALink>
        //         <div className="" onClick={() => setPreview(false)}>
        //           <Close_svg />
        //         </div>
        //       </div>
        //       <div className="mt-2 " ref={resumeRef}>
        //         {selectResumeTemplate(selectedResumeIndex)}
        //       </div>
        //     </div>
        //   </div>
        // </>
        <div className="fixed top-5 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md h-[80vh] ">
            <PDFViewer width="850" height="98%">
              <Document>{selectResumeTemplate(selectedResumeIndex)}</Document>
            </PDFViewer>
            <button onClick={() => setPreview(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
