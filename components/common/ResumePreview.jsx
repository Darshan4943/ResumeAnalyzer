import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useRef, useState } from "react";
import { selectResumeTemplate } from "../../utils/middleware";
import { ClosedIcon } from "../../utils/svg";
import Fonts from "../../public/fonts/fonts";
import CoverPdfViewer from "./CoverPdfViewer";

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
  const modalRef = useRef(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const PdfViewer = ({ pdfUrl, loadingg, setLoadingg }) => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
      setTimeout(() => {
        setLoadingg(false);
      }, 1000);
    };

    return (
      <div
        style={{
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          width: "550px",
          height: "572px",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {loadingg && (
          <div className="skeleton-loader1">
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
        <div
          ref={modalRef}
          className="flex items-center justify-center py-[16px] resumes2"
        >
          <button
            onClick={() => setPreview(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-black transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.28384 13.8838L0.117188 12.7172L5.83386 7.00051L0.117188 1.28384L1.28384 0.117188L7.00051 5.83386L12.7172 0.117188L13.8838 1.28384L8.16716 7.00051L13.8838 12.7172L12.7172 13.8838L7.00051 8.16716L1.28384 13.8838Z"
                fill="#333333"
              />
            </svg>
          </button>
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
