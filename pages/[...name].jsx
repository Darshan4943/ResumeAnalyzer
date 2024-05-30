import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";
import { setPageOpened } from "../Redux/actions/website";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer1 = ({ pdfUrl, onDownloadClick }) => {
  const [numPages, setNumPages] = useState();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
      className="w-[600px] h-[80vh] shadow-md rounded-lg overflow-y-auto"
      onClick={onDownloadClick}
    >
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};
const Name = () => {
  const router = useRouter();
  const { name } = router.query;
  const [resume, setResume] = useState();
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageOpened());
    if (userDataGlobal) {
      axios
        .get("https://jamblix.com/api/resume/" + userDataGlobal._id)
        .then((res) => {
          const selectedResume = res.data.data.find(
            (resume) => resume._id === userDataGlobal.selectedResume
          );
          setResume(selectedResume);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal, name]);

  const handleDownloadClick = () => {
    if (resume?.resumeUrl) {
      const link = document.createElement("a");
      link.href = resume.resumeUrl;
      link.download = "resume.pdf"; // The name you want the downloaded file to have
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div
        className={

          "bg-white z-[1000] fixed w-[100%] top-0  "
        }
        style={{
          borderBottom: "1.5px solid #DEDEDE",
        }}
      >
        <div className="customMargins py-3 flex justify-between items-center ">
          <img
            className="object-contain h-[40px]"
            src="/images/logo_skilotech.png"
            alt=""
          />
          <div className="text-[20px] text-gray-800 font-medium">
            {resume?.fileName?.length > 22
              ? `${resume?.fileName?.slice(0, 21)}...`
              : resume?.fileName}
          </div>
          <button
            onClick={handleDownloadClick}
            className="bg-blue  px-4 py-2 text-white rounded-lg font-medium"
          >
            Download
          </button>
        </div>

      </div>
      <div className="flex justify-center   my-12 website">
        <PdfViewer1 pdfUrl={userDataGlobal?.resumeUrl} onDownloadClick={handleDownloadClick} />
      </div>
    </>
  );
};

export default Name;