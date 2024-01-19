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
import ALink from "@/components/alink";
import { Close_svg } from "@/utils/svg";
import Resume1 from "../../resumeTemplates/resume1";
import Resume2 from "../../resumeTemplates/resume2";



import Resume5 from "../../resumeTemplates/resume5";
import Resume6 from "../../resumeTemplates/resume6";
import Resume3 from "../../resumeTemplates/resume3";
import Resume4 from "../../resumeTemplates/resume4";
import Resume7 from "../../resumeTemplates/resume4";



const ResumePreview = ({ data, isSetEdit }) => {
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const resumeRef = useRef();
  const [preview, setPreview] = useState(false);

  const [selectedResumeIndex, setSelectedResumeIndex] = useState(1);
  const [loading, setLoading] = useState(false);


  const togglePreview = (isVisible, index) => {
    // setPreview(isVisible);
    setSelectedResumeIndex(index);
  };
  const selectResumeTemplate = (index) => {
    switch (index) {
      case 1:
        return <Resume2 data={data} />
      case 2:
        return <Resume1 data={data} />
      case 3:
        return <Resume3 data={data} />
      case 4:
        return <Resume4 data={data} />
      case 5:
        return <Resume5 data={data} />
      default:
        return <Resume2 data={data} />
    }
  };


  const pdfConverter = async () => {
    html2canvas(resumeRef.current, { autoResize: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setLoading(true);
      axios
        .put(
          "https://freedygoservices.in/api/candidate/addResume/" + userDataGlobal._id,
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
    <>
      <div
        className="flex  h-fit flex-col ml:w-[49%] w-[100%] p-4 gap-[14px] rounded-lg bg-white shadow-md"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
          <div className=" flex gap-4 pb-[10px]" style={{ overflowX: "auto" }}>
            <img
              src="/images/services/resume2.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 1)}
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
              src="/images/services/resume1.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 2)}
            />
            <img
              src="/images/services/resume5.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
              onClick={() => togglePreview(true, 5)}
            />

          </div>
        </div>
        <div  className="mobile">
       
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
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">

                <g mask="url(#mask0_5925_110931)">
                  <path d="M4.66404 15.8317H5.71531L14.2458 7.30121L13.1945 6.24994L4.66404 14.7804V15.8317ZM3.41406 17.0817V14.2612L14.4061 3.27402C14.5321 3.15956 14.6712 3.07112 14.8235 3.00868C14.9757 2.94625 15.1354 2.91504 15.3025 2.91504C15.4696 2.91504 15.6314 2.94469 15.7881 3.004C15.9447 3.06329 16.0834 3.15757 16.2041 3.28683L17.2217 4.31727C17.351 4.43799 17.4431 4.57691 17.4981 4.73402C17.5532 4.89112 17.5807 5.04821 17.5807 5.20531C17.5807 5.37288 17.5521 5.5328 17.4948 5.68506C17.4376 5.83734 17.3466 5.97648 17.2217 6.1025L6.23454 17.0817H3.41406ZM13.7109 6.78479L13.1945 6.24994L14.2458 7.30121L13.7109 6.78479Z" fill="#333333" />
                </g>
              </svg>
              Edit
            </button>

            <button 
              className=" text-[12px] flex gap-1 items-center justify-between text-[#333] font-montserrat font-semibold px-2 py-1 rounded-[8px] border border-[#06A9EF]"
              onClick={() => generatePdf()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">

                <g mask="url(#mask0_5925_110936)">
                  <path d="M10.5 13.157L6.94233 9.59938L7.82052 8.69554L9.875 10.75V3.75H11.125V10.75L13.1794 8.69554L14.0576 9.59938L10.5 13.157ZM5.75642 16.25C5.33547 16.25 4.97917 16.1041 4.6875 15.8125C4.39583 15.5208 4.25 15.1645 4.25 14.7435V12.484H5.49998V14.7435C5.49998 14.8077 5.52669 14.8664 5.5801 14.9199C5.63353 14.9733 5.69231 15 5.75642 15H15.2435C15.3077 15 15.3664 14.9733 15.4199 14.9199C15.4733 14.8664 15.5 14.8077 15.5 14.7435V12.484H16.75V14.7435C16.75 15.1645 16.6041 15.5208 16.3125 15.8125C16.0208 16.1041 15.6645 16.25 15.2435 16.25H5.75642Z" fill="#333333" />
                </g>
              </svg>
              Download
            </button>
           

          </div>
        </div>

        <div className="web">
          <div className="flex justify-between">
            <div className=" text-[20px]  font-montserrat font-medium flex items-center">
              Preview
            </div>

            <div className="flex gap-[16px]">
              <button
                onClick={() => setPreview(true)}
                className="flex gap-1 text-[14px] w-[90px]  justify-center text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
              >
                Save
              </button>

            

            </div>
          </div>
        </div>
      

        <div
          className=" border border-[#06A9EF] transform xxsm:scale-[35%] scr340:scale-[37%] scr360:scale-[39%] scr390:scale-[42%] scr420:scale-[46%] sm:scale-[53%] scr540:scale-[60%] ms:scale-[68%] scr700:scale-[80%] md:scale-[88%] scr820:scale-[95%] ml:scale-[46%] scr900:scale-[50%] lg:scale-[54%] scr1024:scale-[57%] scr1100:scale-[62%] xxlg:scale-[63%] scr1150:scale-[63%] "
          style={{
            width: "50.1rem",
            // scale: "0.65",
            transformOrigin: "top left",
          }}
        >
          {selectResumeTemplate(selectedResumeIndex)}
        
        </div>
      </div>
      {preview && (
        <>
          {" "}
          <div
            className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"
            onClick={() => setPreview(false)}
          ></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins transform xxsm:scale-[35%] scr340:scale-[37%] scr360:scale-[39%] scr390:scale-[42%] scr420:scale-[46%] sm:scale-[53%] scr540:scale-[60%] ms:scale-[68%] scr700:scale-[80%] md:scale-[88%] scr820:scale-[95%] ml:scale-[100%] ">
            <div className="absolute bg-white overflow-y-scroll h-[90vh] p-8 rounded-[8px]">
              <div className="flex gap-[16px] justify-end">
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
                  className=" text-[12px] text-[#333] font-montserrat font-semibold px-9 py-1 rounded-[8px] border border-[#06A9EF]"
                  onClick={() => generatePdf()}
                >
                  Download Resume
                </button>
                <ALink href="/profile">
                  <button className="flex gap-1 text-[12px] h-[38px] w-[90px] justify-center  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
                    Profile
                  </button>
                </ALink>
                <div className="" onClick={() => setPreview(false)}>
                  <Close_svg />
                </div>
              </div>
              <div className="mt-2 " ref={resumeRef}>
                {selectResumeTemplate(selectedResumeIndex)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResumePreview;