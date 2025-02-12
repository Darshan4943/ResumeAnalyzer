import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import InlineSVG from "./InlineSvg";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DocumentModal = ({ selectedFile, isOpen, setIsOpen }) => {
    if (!isOpen || !selectedFile) return null;

    const fileExtension = selectedFile.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";
    const isDoc = ["doc", "docx"].includes(fileExtension);

    const PdfViewer = ({ pdfUrl }) => {
        const [numPages, setNumPages] = useState();

        function onDocumentLoadSuccess(numPages) {
            setNumPages(numPages);
        }

        return (
            <div
                style={{
                    width: "595px",
                    height: "75vh",
                    // boxShadow: " 0px 2px 10px 1px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                    overflow: "scroll",
                    scrollbarWidth: "none"




                }}
            >
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={1} />
                </Document>
            </div>
        );
    };

    return (
        

            
                <div className="  rounded-lg   flex items-center justify-center ">
                    {isImage ? (
                        <img
                            src={selectedFile}
                            alt="Uploaded Document"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    ) : isPDF ? (
                        <div className="w-full h-full resumes2">
                            <PdfViewer pdfUrl={selectedFile} />
                        </div>
                    ) : isDoc ? (
                        <iframe
                            src={`https://docs.google.com/gview?url=${encodeURIComponent(
                                selectedFile
                            )}&embedded=true`}
                            className="w-full h-full"
                        />
                    ) : (
                        <InlineSVG imageUrl={selectedFile} />
                    )}
                </div>
           
        
    );
};

export default DocumentModal;
