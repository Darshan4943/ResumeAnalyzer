import { BlobProvider, Document, PDFViewer } from "@react-pdf/renderer";
import { Page, pdfjs } from "react-pdf";
import React from "react";
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
  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className=" absolute bg-white  px-4 py-2 rounded-lg shadow-lg ml:h-[90vh]  flex flex-col gap-2 items-end w-[800px]">
          <div className="flex gap-[16px]">
            <button onClick={() => setPreview(false)}>
              <ClosedIcon />
            </button>
          </div>

          <div className="w-full  bg-[#525659] h-[80vh] flex items-center justify-center">
            {isResumes == "covers" ? (
              <CoverPdfViewer pdfUrl={data?.resumeUrl} />
            ) : (
              <PDFViewer width="750" height="95%" showToolbar={false}>
                <Document>
                  {selectResumeTemplate(
                    selectedResumeIndex,
                    data,
                    selectedColor,
                    selectedFont,
                    preview
                  )}
                </Document>
              </PDFViewer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
