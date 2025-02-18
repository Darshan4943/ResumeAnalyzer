import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useRef, useState } from "react";
import { selectResumeTemplate } from "../../utils/middleware";
import { ClosedIcon } from "../../utils/svg";
import Fonts from "../../public/fonts/fonts";
import CoverPdfViewer from "./CoverPdfViewer";
// import { generatePDFUsingRenderer } from "../../../../utils/middleware";
<Fonts />;
const ResumePreview = ({
  selectedResumeIndex,
  data,
  selectedColor,
  selectedFont,
  setPreview,
  preview,
  isResumes,
}) => {
  const [loadingg, setLoadingg] = useState(true);
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const PdfViewer = ({ pdfUrl, loadingg, setLoadingg }) => {
    const [numPages, setNumPages] = useState(null);
    console.log(loadingg);
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
      setTimeout(() => {
        setLoadingg(false);
      }, 1000);
    };

    return (
      <div
        style={{
          // width: "168px",
          // height: "192px",

          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          // overflow: "hidden",
          width: "600px",
          height: "572px",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {loadingg && (
          <div className="skeleton-loader1  ">
            <div className="skeleton-image1"></div>
            <div className="skeleton-text1">
              <div className="skeleton-title1"></div>
              <div className="skeleton-subtitle1"></div>
              <div className="skeleton-line1"></div>
              <div className="skeleton-line1 short"></div>
              <div className="skeleton-line1 shorter"></div>
            </div>
          </div>
        )}

        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {!loadingg &&
            Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>
      </div>
    );
  };
 

  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className=" flex items-center justify-center py-[16px] resumes2  ">
          <PdfViewer
            pdfUrl={data?.resumeUrl}
            loadingg={loadingg}
            setLoadingg={setLoadingg}
          />
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
