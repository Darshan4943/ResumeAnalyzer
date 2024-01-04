import React, { useRef } from "react";
import generatePDF from 'react-to-pdf';
import html2canvas from "html2canvas";
import Resume5 from "../../resumeTemplates/resume5";
import axios from "axios";
import AWS from "aws-sdk";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
const ResumePreview = ({ data }) => {
  const resumeRef = useRef();

  const myComponentHTML = ReactDOMServer.renderToString(
    <Resume5 data={data} />
  );
  <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>Download PDF</button>
  const pdfConverter = async () => {
    // html2canvas(resumeRef.current, { autoResize: true }).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   axios
    //     .post("http://localhost:2000/temp", {
    //       pdfContent: imgData,
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {});
    // });
    generatePDF(resumeRef, {filename: 'page.pdf'})
  };
  return (
    <>
      <div
        className="flex  h-fit flex-col w-[49%] p-4 gap-[14px] rounded-lg bg-white shadow-md"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
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
        </div>

        <div className="flex justify-between">
          <div className=" text-[20px]  font-montserrat font-medium flex items-center">
            Preview
          </div>

          <div className="flex gap-[16px]">
            <button
              onClick={pdfConverter}
              className="flex gap-1 text-[12px]  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
            >
              <img
                src="/images/services/add_link.png"
                className="h-[24px] w-[24px] rounded-[6px]"
                alt=""
              />
              Attach
            </button>
            <button
              className=" text-[12px] text-[#333] font-montserrat font-semibold px-9 py-1 rounded-[8px] border border-[#06A9EF]"
              onClick={() => generatePDF(resumeRef, { filename: "page.pdf" })}
            >
              Download Resume
            </button>
          </div>
        </div>

        <div
          className=""
          style={{
            transform: "scale(0.87)",
            transformOrigin: "top left",
          }}
        >
          <div ref={resumeRef}>
            <Resume5 data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
