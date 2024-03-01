import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Viewer } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
 

const MyCollection = () => {
  const userDataGlobal = useSelector((state) => state.userData);
  const [resumeList, setResumeList] = useState([]);
console.log(13,resumeList)
  useEffect(() => {
    axios
      .get("http://localhost:2000/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setResumeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  const PdfViewer = () => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess(numPages) {
      setNumPages(numPages);
    }

    const pdfUrl = resumeList.length > 0 ? resumeList[0].resumeUrl : null;

      

    return (
      <div style={{ width: "192px", height: "272px" }}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    );
  };
  return (
    <div className="customMargins py-6 min-h-[80vh] ">
      <div className="flex flex-col gap-16">
        <div className="text-[24px] font-semibold text-[#333333]">
          {" "}
          My Collection
        </div>
        <div className="flex flex-row flex-wrap  ">
          {resumeList?.map((item) => (
            <>
              <div>
                <PdfViewer pdfUrl={item?.resumeUrl} />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
