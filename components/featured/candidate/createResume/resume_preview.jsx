import React, { useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import html2canvas from "html2canvas";
import Resume5 from "../../resumeTemplates/resume5";
import axios from "axios";
import AWS from "aws-sdk";
import ReactDOMServer from "react-dom/server";

import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reCallUserData } from "@/Redux/actions/user";
import MiniLoader from "@/components/common/mini-loader";
import ALink from "@/components/alink";
const ResumePreview = ({ data }) => {
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const resumeRef = useRef();
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useState(false);

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
      filename: `${userDataGlobal.basics.firstName}-skilotech-resume-${userDataGlobal.resumeUrl.length}.pdf`,
    });
  };


  const [showPDF, setShowPDF] = useState(false);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  const generatePDFf = () => {
    const element = document.getElementById("pdfContent");

    const opt = {

      margin: 5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };
  const PDFViewer = (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[500] overflow-y-auto">
      <div className="bg-gray-800 bg-opacity-50 w-full h-full flex justify-center items-center">
        <div className="bg-white flex flex-col gap-4 p-4 rounded-lg shadow-md max-w-[210mm] max-h-[80vh] overflow-y-auto">
          <div id="pdfContent">
            <Resume5 data={data} />
          </div>
          <div className="flex justify-between">
            <button className="text-[12px] text-[#FFF]  font-semibold px-3 py-[2px] rounded-[8px] border border-[#06A9EF] bg-[#06A9EF]" onClick={generatePDFf}>Download Resume</button>
            <button className="text-[12px] text-[#333]  font-semibold px-9 py-1 rounded-[8px] border border-[#06A9EF]" onClick={togglePDFView}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <div
        className="flex  h-fit flex-col w-[49%] p-4 gap-[14px] rounded-lg bg-white shadow-md"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
          <div className=" flex gap-4 pb-[10px]" style={{ overflowX: "auto" }}>
            <img
              src="/images/services/resume-template-1.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
            <img
              src="/images/services/resume-template-2.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
            <img
              src="/images/services/resume-template-1.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
            <img
              src="/images/services/resume-template-2.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
            <img
              src="/images/services/resume-template-1.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
            <img
              src="/images/services/resume-template-2.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
            <img
              src="/images/services/resume-template-1.png"
              className="h-[200px] w-[140.91px] rounded-[6px]"
              alt=""
            />
          </div>
        </div> */}

        <div className="flex justify-between">
          <div className=" text-[20px]  font-montserrat font-medium flex items-center">
            Preview
          </div>

          <div className="flex gap-[16px]">
            <button
              onClick={() => setPreview(true)}
              className="flex gap-1 text-[14px] w-[90px] flex justify-center text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
            >
              Save
            </button>

            {/* <button onClick={() => setShowPDF(true)} className=" text-[12px] text-[#333] font-montserrat font-semibold px-4 py-1 rounded-[8px] border border-[#06A9EF]">
              preview
            </button> */}

          </div>
        </div>
        {showPDF && PDFViewer}

        <div
          className=""
          style={{
            width: "44rem",
            scale: "0.7",
            transformOrigin: "top left",
          }}
        >
          <Resume5 data={data} />
        </div>
      </div>
      {preview && (
        <>
          {" "}
          <div
            className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"
            onClick={() => setPreview(false)}
          ></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
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
              </div>
              <div ref={resumeRef}>
                <Resume5 data={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResumePreview;