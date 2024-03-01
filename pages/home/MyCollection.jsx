import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Document, Page, pdfjs } from "react-pdf";
import { ClosedIcon } from "../../utils/svg";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const MyCollection = () => {
  const userDataGlobal = useSelector((state) => state.userData);
  const [resumeList, setResumeList] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    axios
      .get("https://freedygoservices.in/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setResumeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  const PdfViewer = ({ pdfUrl }) => {
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
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  };
  return (
    <div className="customMargins py-6 min-h-[80vh] ">
      <div className="flex flex-col gap-[16px]">
        <div className="text-[24px] font-semibold text-[#333333]">
          {" "}
          My Collection
        </div>
        <div className="flex flex-row flex-wrap gap-[48px] p-[24px] bg-[#F9F9F9] rounded-[12px]  ">
          {resumeList.length > 0 ? (
            <>
              {resumeList?.map((item) => (
                <>
                  <div className="flex flex-col h-[300px] items-center justify-between group relative ">
                    <PdfViewer pdfUrl={item?.resumeUrl} />
                    <div className="text-[14px] text-[#333333] font-500">
                      {item.fileName}.pdf
                    </div>

                    <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-[272px] w-full rounded-[6px] opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                      <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
                        {/* <div
                              className="flex items-center flex-col cursor-pointer"
                              style={{
                                borderBottom: "1px solid #646464",
                                paddingBottom: "12px",
                              }}
                              onClick={() => {
                                setSelected(item);
                                setPreview(true);
                              }}
                            >
                              <img
                                src="/images/icons/visibility.png"
                                className="h-[28px] w-[28px]"
                                alt=""
                              />
                              <span className="text-[14px] font-semibold text-white ">
                                Preview
                              </span>
                            </div> */}
                        {/* <div
                              className="flex items-center flex-col cursor-pointer"
                              style={{
                                borderBottom: "1px solid #646464",
                                paddingBottom: "12px",
                              }}
                            >
                              <img
                                src="/images/icons/edit.png"
                                className="h-[28px] w-[28px]"
                                alt=""
                              />
                              <span className="text-[14px] font-semibold text-white ">
                                Edit
                              </span>
                            </div> */}

                        <a
                          href={item.resumeUrl}
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
              ))}
            </>
          ):<div className="text-[24px] font-semibold text-center text-[#404040] w-full">No Resume Created Yet</div>}
        </div>
      </div>
      {preview && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
            <div className=" absolute bg-white  px-4 py-2 rounded-lg shadow-lg h-[90vh] flex flex-col gap-2 items-end w-[900px]">
              <div className="flex gap-[16px]">
                {" "}
                <button onClick={() => setPreview(false)}>
                  <ClosedIcon />
                </button>
              </div>

              <div className="w-full  bg-[#525659] h-full flex items-center justify-center">
                <div className="preview">
                  <Document
                    file={selected.resumeUrl}
                    // onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={1} />
                  </Document>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCollection;
