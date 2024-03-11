import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ResumePreview from "../../common/ResumePreview";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const PdfViewer = ({ data, file }) => {
  const [numPages, setNumPages] = useState();
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState([]);
  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }
  const extractedText = data?.first_name;
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = extractedText + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        style={{
          width: "192px",
          height: "272px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
        <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-full w-full rounded-[6px] opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
          <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
            <a
              onClick={handleDownload}
              className="flex items-center flex-col cursor-pointer"
            >
              <img
                src="/images/icons/download.png"
                className="h-[28px] w-[28px]"
                alt=""
              />
              <span className="text-[14px] font-semibold text-white ">
                Download
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfViewer;
