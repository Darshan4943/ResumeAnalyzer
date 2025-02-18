import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";

import { jwtDecode } from "jwt-decode";
import { setPageOpened } from "../Redux/slices/websiteSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer1 = ({ pdfUrl, onDownloadClick, loadingg, setLoadingg }) => {
  const [numPages, setNumPages] = useState();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setTimeout(() => {
      setLoadingg(false);
    }, 1000);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoadingg(false);
  //   }, 3000);
  // }, [])

  return (
    <>
      <div
        style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
        className={`w-[600px] h-[80vh] shadow-md rounded-lg ${
          !loadingg && "overflow-y-auto"
        } web600 overflow-hidden `}
        // onClick={onDownloadClick}
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
      <div
        style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
        className={`w-[292px] h-[380px] shadow-md rounded-lg ${
          !loadingg && "overflow-y-auto"
        } resumes1 mobile600 overflow-hidden `}
        onClick={onDownloadClick}
      >
        {loadingg && (
          <div className="skeleton-loader">
            <div className="skeleton-image"></div>
            <div className="skeleton-text">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <div className="skeleton-line shorter"></div>
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
    </>
  );
};
const Name = () => {
  const router = useRouter();
  const { name } = router.query;
  const [userId] = Array.isArray(name) ? name : [name];

  const [loadingg, setLoadingg] = useState(true);

  const dispatch = useDispatch();
  const [selectedResume, setSelectedResume] = useState();

  useEffect(() => {
    dispatch(setPageOpened());
    if (userId) {
      axios
        .get("http://localhost:2000/api/skiloteckuser/userId/" + userId)
        .then((res) => {
          const decode = jwtDecode(res.data.data);
          setSelectedResume(decode._doc);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, name]);

  const handleDownloadClick = () => {
    if (selectedResume?.resumeUrl) {
      const link = document.createElement("a");
      link.href = selectedResume.resumeUrl;
      link.download = "_resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div
        className={"bg-white z-[1000] fixed w-[100%] top-0  "}
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
          <div className="text-[20px] text-gray-800 font-medium web600">
            {selectedResume?.resumeName?.length > 22
              ? `${selectedResume?.resumeName?.slice(0, 21)}...`
              : selectedResume?.resumeName}
          </div>
          <button
            onClick={handleDownloadClick}
            className="bg-blue  px-4 py-2 text-white rounded-lg font-medium"
          >
            Download
          </button>
        </div>
      </div>
      <div className="flex  flex-col gap-4  items-center  my-12 website">
        {!loadingg && (
          <div className="text-[16px] text-gray-800 font-medium mobile600">
            {selectedResume?.resumeName?.length > 22
              ? `${selectedResume?.resumeName?.slice(0, 21)}...`
              : selectedResume?.resumeName}
          </div>
        )}
        <PdfViewer1
          pdfUrl={selectedResume?.resumeUrl}
          onDownloadClick={handleDownloadClick}
          loadingg={loadingg}
          setLoadingg={setLoadingg}
        />
      </div>
    </>
  );
};

export default Name;
