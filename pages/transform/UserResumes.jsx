import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { templates } from "../../utils/data";
import { useSelector } from "react-redux";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const selectedStyle = {
  borderTop: " 4px solid #06A9EF",
  borderBottom: "4px solid #06A9EF",
};
const PdfViewer = ({ pdfUrl, isAll, index, selected }) => {
  const [numPages, setNumPages] = useState();
  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }
  console.log(123, selected);
  return (
    <div
      style={{
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        overflow: "hidden",
        height: isAll ? "auto" : "272px",
        width: isAll ? "auto" : "192px",
        ...(selected && selectedStyle),
      }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={() => {
          return (
            <div
              className={`w-[${isAll ? "234px" : "192px"}] h-[${
                isAll ? "330px" : "272px"
              }] flex items-center justify-center `}
              style={{ filter: "blur(2px)" }}
            >
              {templates.find((item) => item.index == index) ? (
                <img
                  src={templates.find((item) => item.index == index)?.imgUrl}
                  className="w-full h-full"
                  alt=""
                />
              ) : (
                "Loading..."
              )}
            </div>
          );
        }}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

const UserResumes = ({ setSelect, setIsAll, isAll, resumeList, selected }) => {
  const [data, setData] = useState([]);
  const taskRef = useRef(null);
  const userDataGlobal = useSelector((state) => state.userData);

  useEffect(() => {
    console.log("first")
    if (userDataGlobal == "recruiter") {
      setData(resumeList);
      // setSelect(resumeList[0]);
    } else {
      console.log("first")
      axios
        .get("https://freedygoservices.in/api/resume/" + userDataGlobal?._id)
        .then((response) => {
          setData(response.data.data);
          setSelect(response.data.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userDataGlobal]);

  return isAll ? (
    <div>
      <div className="fixed z-[200] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div
        className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  "
        onClick={(e) => {
          e.stopPropagation();
          setIsAll(false);
        }}
      >
        <div
          ref={taskRef}
          onWheel={(e) => e.stopPropagation()}
          className="resumeListContainer absolute flex p-10 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap   w-[65%] h-[90vh] overflow-y-auto items-center justify-center "
        >
          {data?.map((item, index) => (
            <div
              className="   transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => {
                setIsAll(false);
                setSelect(item);
              }}
              key={index}
            >
              <PdfViewer
                isAll={isAll}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
                pdfUrl={item?.resumeUrl}
                index={item.resumeTemplateIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    data?.map((item, index) => (
      <div
        className=""
        onClick={() => {
          setIsAll(false);
          setSelect(item);
        }}
        key={index}
      >
        <PdfViewer
          pdfUrl={item?.resumeUrl}
          index={item.resumeTemplateIndex}
          selected={item._id == selected._id}
        />
      </div>
    ))
  );
};
export default UserResumes;
