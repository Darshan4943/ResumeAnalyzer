import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { templates } from "../../utils/data";
import { useSelector } from "react-redux";
import { PDFSvg, SearchIcon } from "../../utils/svg";
import Fuse from "fuse.js";
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

const UserResumes = ({
  setSelect,
  setIsAll,
  isAll,
  resumeList,
  selected,
  setCount,
  selectedClient,
  setNewData,
}) => {
  const [data, setData] = useState([]);
  const taskRef = useRef(null);
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (userDataGlobal) {
      if (userDataGlobal?.role == "recruiter") {
       
        setData(resumeList);
        setAllData(resumeList);
        // setSelect(resumeList[0]);
      } else if (userDataGlobal?.role == "user") {
        axios
          .get("http://localhost:2000/api/resume/" + userDataGlobal?._id)
          .then((response) => {
            setData(response.data.data);
            setAllData(response.data.data);
            setCount(response.data.data.length);
            setSelect(response.data.data[0]);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
  }, [userDataGlobal, selectedClient, resumeList]);

  const searchHandler = (value) => {
    if (value.length > 0) {
      const options = {
        includeScore: true,
        keys: [
          "firstName",
          "lastName",
          "email",
          "mobileNo",
          "location",
          "designation",
          "fileName",
        ],
      };
      const fuse = new Fuse(allData, options);
      const result = fuse.search(value);
      setData(result.map((item) => item.item));
    } else {
      setData(allData);
    }
  };
  return (
    <>
      <div className="rounded-[16px] border bg-[#F9F9F9] border-[#DEDEDE] sm:p-[16px] p-2 flex flex-col gap-[16px]">
        <div className="flex flex-row items-center justify-between sm:gap-[12px] gap-1  ">
          <div className="flex flex-row gap-[8px] py-[8px] sm:px-[12px] px-1 h-[40px] bg-[#fff] border border-[#DEDEDE] rounded-[30px] items-center">
            <SearchIcon />
            <input
              type="text"
              className="bg-[#fff] text-[#333333] placeholder:text-[#333333]  w-[75%]"
              placeholder="Select"
              onChange={(e) => searchHandler(e.target.value)}
            />
          </div>

          <span className="text-[14px] text-[#808080] w-[35%] flex justify-end">
            {data?.length}
            {" Items"}
          </span>
        </div>
        <div className="border-b-[1px] border-[#DEDEDE] w-full h-[1px]"></div>

        {data?.length > 0 ? (
          <div
            className="flex flex-row flex-wrap gap-4   py-4  h-[247px] overflow-y-auto bg-[#FFFFFF] border-[1px] border-[#DEDEDE] rounded-[16px] p-[8px]"
            // style={{ overflowX: "auto" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {data?.map((item, index) => (
              <>
                <div
                  className="w-[98px] flex flex-col relative group gap-[6px]  items-center py-4 min-h-[90px] rounded-[8px] cursor-pointer "
                  style={{
                    background:
                      item._id == selected?._id ? "#D1EDFF" : "transparent",
                    height: "fit-content",
                  }}
                  onClick={() => {
                    setIsAll(false);
                    setSelect(item);
                    setNewData(null);
                  }}
                >
                  <PDFSvg />
                  <span
                    className="text-[14px] text-[#333333] text-center"
                    style={{ wordBreak: "break-all" }}
                  >
                    {item.fileName}
                  </span>
                  <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-10px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                    {item.fileName}
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="text-[20px] font-medium text-center w-full py-[24px]">
            No Resume Available, <br /> Please create resume
          </div>
        )}
      </div>
    </>
  );
};
export default UserResumes;
