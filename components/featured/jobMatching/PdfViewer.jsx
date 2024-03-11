
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const PdfViewer = ({ data,file }) => {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        width: "192px",
        height: "272px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
    
      
    </div>
  );
};

export default PdfViewer;