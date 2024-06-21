import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

function CoverPdfViewer({ pdfUrl }) {
  function onDocumentLoadSuccess(numPages) {}

  return (
    <div
      style={{
        width: "600px",
        height: "500px",
        paddingTop: "4px",
        paddingBottom: "4px",
        display: "flex",
        justifyContent: "center",
        alineItems: "center",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        overflow: "scroll",
      }}
    >
      <Document
        width="650px"
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default CoverPdfViewer;
