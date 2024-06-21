import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

function CoverPdfViewer({ pdfUrl }) {

  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 
  return (
    <div
      style={{
        width: "600px",
        height: "75vh",
      
        display: "flex",
        justifyContent: "center",
        alineItems: "center",

     
        overflow: "scroll",
      }}
    >
      <Document
      
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={590}
            />
          )
        )}
      </Document>
    </div>
  );
}

export default CoverPdfViewer;
