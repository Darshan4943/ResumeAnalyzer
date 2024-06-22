import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import DeleteModal from "../../../common/deleteModal";

import { useRouter } from "next/router";

import { toast } from "react-toastify";

const CoverLetterPreview = ({coverList,PdfViewer,setSelected,setPreview,toggleSelect,setView}) => {
 
 

  return (
    <div className="flex flex-row flex-wrap gap-[48px] p-[24px] bg-[#F9F9F9] rounded-[12px]  ">
      <div
        onClick={() => router.push(`/coverLetter`)}
        style={{ boxShadow: "0px 0px 10px 5px #00000040" }}
        className="rounded-[12px] text-center text-white justify-center flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  scr540:w-[192px] w-[312px]  scr540:h-[272px] h-[135px] bg-[#646464] p-6 cursor-pointer"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8187 14.6206H0.0750732V12.1079H11.8187V0.364258H14.3314V12.1079H26.075V14.6206H14.3314V26.3642H11.8187V14.6206Z"
            fill="white"
          />
        </svg>

        <p>Create New Cover Letter</p>
      </div>
      <>
        {coverList?.map((item, index) => (
          <>
            <div
              key={index}
              className="flex flex-col h-[300px] items-center justify-between group relative resumes"
            >
              <PdfViewer pdfUrl={item?.resumeUrl} />
              <div className="text-[14px] text-[#333333] font-500">
                {item?.fileName?.length > 17
                  ? `${item.fileName.slice(0, 16)}...`
                  : item.fileName}
              </div>

              <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-[272px] w-full rounded-[6px] opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
                  <div
                    className="items-center flex-col cursor-pointer hidden md:flex"
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
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Preview
                    </span>
                  </div>
                  {/* <div
                              onClick={() => {
                                router.push({
                                  pathname: "/home/createResume",
                                  query: {
                                    data: JSON.stringify(item),
                                    isEdit: true,
                                  },
                                });
                              }}
                              className="flex items-center flex-col cursor-pointer"
                              style={{
                                borderBottom: "1px solid #646464",
                                paddingBottom: "12px",
                              }}
                            >
                              <img
                                src="/images/icons/edit.png"
                                className="h-[24px] w-[24px]"
                                alt=""
                              />
                              <span className="text-[12px] font-semibold text-white ">
                                Edit
                              </span>
                            </div> */}

                  <a
                    href={item.resumeUrl}
                    className="flex items-center flex-col cursor-pointer"
                  >
                    <img
                      src="/images/icons/download.png"
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Download
                    </span>
                  </a>
                  <a
                    onClick={() => {
                      toggleSelect(index);
                      setView(true);
                    }}
                    className="flex items-center flex-col cursor-pointer"
                  >
                    <img
                      src="/images/icons/delete_icon.png"
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Delete
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    </div>
  );
};

export default CoverLetterPreview;
