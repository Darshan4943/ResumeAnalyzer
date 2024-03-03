import {
  BlobProvider,
  Document,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
import Template1 from "../resumeTemplates/Template1";
import { selectResumeTemplate } from "../../../utils/middleware";

function TransformJd({
  resumeTemplateIndex,
  data,
  selectedColor,
  selectedFont,
  preview,
}) {
  const saveResume = async () => {};
  const MyComponent = () => {
    return (
      <Document height="1124px" dpi={72}>
        {selectResumeTemplate(
          resumeTemplateIndex,
          data,
          selectedColor,
          selectedFont,
          preview
        )}
      </Document>
    );
  };
  return (
    <div>
      <div className="flex justify-end w-full">
        <div className="flex gap-[16px] justify-end">
          {/* <BlobProvider document={<MyComponent />}>
            {({ blob, url, loading, error }) => {
              return (
                <button
                  onClick={() => saveResume(blob)}
                  className="flex gap-1 text-[14px] w-[150px]  justify-center text-[#FFF] font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
                >
                  Save
                </button>
              );
            }}
          </BlobProvider> */}

          {/* <button className="flex gap-1 text-[14px]   justify-center text-[#646464] font-montserrat font-semibold px-4 py-2 rounded-[8px] items-center border border-[#333333] bg-[#DEDEDE]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_461_22933)">
                <path
                  d="M4.16667 15.8333H5.35417L13.5 7.6875L12.3125 6.5L4.16667 14.6458V15.8333ZM2.5 17.5V13.9583L13.5 2.97917C13.6667 2.82639 13.8507 2.70833 14.0521 2.625C14.2535 2.54167 14.4653 2.5 14.6875 2.5C14.9097 2.5 15.125 2.54167 15.3333 2.625C15.5417 2.70833 15.7222 2.83333 15.875 3L17.0208 4.16667C17.1875 4.31944 17.309 4.5 17.3854 4.70833C17.4618 4.91667 17.5 5.125 17.5 5.33333C17.5 5.55556 17.4618 5.76736 17.3854 5.96875C17.309 6.17014 17.1875 6.35417 17.0208 6.52083L6.04167 17.5H2.5ZM12.8958 7.10417L12.3125 6.5L13.5 7.6875L12.8958 7.10417Z"
                  fill="#646464"
                />
              </g>
            </svg>
            Edit
          </button> */}
      {resumeTemplateIndex !== undefined && (

          <PDFDownloadLink document={<MyComponent />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (
              <button className="flex gap-1 text-[14px]   justify-center text-[#fff] font-montserrat font-semibold px-4 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_461_22942)">
                    <path
                      d="M9.99967 13.3333L5.83301 9.16668L6.99967 7.95834L9.16634 10.125V3.33334H10.833V10.125L12.9997 7.95834L14.1663 9.16668L9.99967 13.3333ZM4.99967 16.6667C4.54134 16.6667 4.14898 16.5035 3.82259 16.1771C3.4962 15.8507 3.33301 15.4583 3.33301 15V12.5H4.99967V15H14.9997V12.5H16.6663V15C16.6663 15.4583 16.5031 15.8507 16.1768 16.1771C15.8504 16.5035 15.458 16.6667 14.9997 16.6667H4.99967Z"
                      fill="#fff"
                    />
                  </g>
                </svg>
                Download
              </button>
            )}
          </PDFDownloadLink>
      )}
        </div>
      </div>
      {resumeTemplateIndex !== undefined && (
        <div
          className=" flex items-center justify-center bg-[#525659] py-[12px] rounded-[8px] mt-4"
          style={{ width: "100%", height: "800px" }}
        >
          <PDFViewer width="80%" height="760px" showToolbar={false}>
            <Document>
              {selectResumeTemplate(
                resumeTemplateIndex,
                data,
                selectedColor,
                selectedFont,
                preview
              )}
            </Document>
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

export default TransformJd;
