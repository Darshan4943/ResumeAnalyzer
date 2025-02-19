import React, { useEffect, useState } from "react";
import Progress_bar from "./ProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import ResumePreview from "../../common/ResumePreview";
import { DesignationSVG } from "../../../utils/svg";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
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
const InternalJobMatching = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [details, setDetails] = useState();
  const [resuneList, setResuneList] = useState([]);

  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:2000/api/client/getByRecruiter/${userDataGlobal?._id}`
      )
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  const jobMatching = () => {
    setLoading(true);
    axios
      .post("http://localhost:2000/api/jobMatching/" + userDataGlobal?._id, {
        jd: text,
        resumeCount,
      })
      .then((res) => {
      
        setResuneList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col gap-4 min-h-[70vh] ">
      {preview && (
        <>
          <ResumePreview
            selectedResumeIndex={selected.resumeTemplateIndex}
            data={selected}
            selectedColor={selected.selectedColor}
            selectedFont={selected.selectedFont}
            setPreview={setPreview}
            preview={true}
          />
        </>
      )}
      <div
        className="flex ml:flex-row flex-col gap-12 w-[100%] p-4 "
        style={{
          boxShadow: "0px 1px 6px 0px rgb(84 84 84 / 25%)",
          borderRadius: "0px 12px 12px 12px",
        }}
      >
        <div className="flex flex-col gap-6 ml:w-[50%] w-[50%]">
          <div className="flex flex-col gap-4 ">
            <div className="text-[18px] font-medium">Job Description</div>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (e.target.value.length < 100) {
                  setError("Minimum 100 characters required.");
                } else {
                  setError("");
                }
              }}
              rows={6}
              cols={50}
              placeholder="Enter your text here..."
              className=" border border-[#06A9EF] rounded-[8px] outline-none h-auto p-2"
            />
            {error && <div className="text-red">{error}</div>}
          </div>
          <div className="flex flex-row gap-4 items-center">
            <span className="text-[20px] font-500">
              Select search Results Limit{" "}
            </span>
            <input
              type="text"
              value={resumeCount}
              onChange={(e) => {
                setResumeCount(e.target.value);
              }}
              name=""
              id=""
              placeholder="Ex. 5"
              className="h-[44px] w-[80px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] "
            />
          </div>
          <button
            className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] w-[166px]"
            disabled={loading || text.length < 100}
            onClick={() => {
              jobMatching();
            }}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4  text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <div className="flex gap-[8px] w-full justify-between">
                Find Match{" "}
                <img
                  src="/images/icons/person_search.png"
                  className="h-[24px] w-[24px]"
                  alt=""
                />{" "}
              </div>
            )}
          </button>
        </div>
        <div className="ml:w-[50%] w-[50%] bg-[#F9F9F9] rounded-[16px] border border-[#DEDEDE] py-[16px] px-[24px] flex flex-col gap-[16px] ">
          <div>Total Results ({resuneList?.length})</div>
          <div className=" flex flex-row flex-wrap justify-between  gap-[24px] ">
            {resuneList?.length > 0 ? (
              <>
                {resuneList
                  .sort((a, b) => b.percentage - a.percentage)
                  ?.map((data, index) => (
                    <div
                      className="flex flex-col gap-[8px] w-[44%] rounded-[16px] bg-white shadow-lg py-[16px] px-[24px]"
                      key={index}
                    >
                      <div className="flex flex-col gap-[4px]">
                        <div className="flex gap-[4px] text-[16px] font-500">
                          <span>{data?.firstName}</span>{" "}
                          <span>{data?.lastName}</span>
                        </div>
                        <div className="flex gap-[4px] items-center ">
                          <DesignationSVG />
                          <span className="text-[14px] font-500 ">
                            {data?.designation}
                          </span>
                        </div>
                      </div>
                      <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]">
                        <div className="w-full h-full rounded-[8px]  flex justify-center  group relative ">
                          <PdfViewer pdfUrl={data?.resumeUrl} />

                          <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-full w-full rounded-[6px] opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                            <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
                              <div
                                className="flex items-center flex-col cursor-pointer"
                                style={{
                                  borderBottom: "1px solid #646464",
                                  paddingBottom: "12px",
                                }}
                                onClick={() => {
                                  setSelected(data);
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
                              </div>

                              <a
                                href={data.resumeUrl}
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
                      </div>
                      {data?.percentage && (
                        <Progress_bar progress={data.percentage} />
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-full">
                <img src="/images/NoMatch.png" alt="" className="w-[40%] " />
                <span className="text-[#808080]">No Match Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalJobMatching;
