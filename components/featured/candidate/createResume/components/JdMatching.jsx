import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { DesignationSVG, DocSVG } from "../../../../../utils/svg";
import Progress_bar from "../../../jobMatching/ProgressBar";
import ResumePreview from "../../../../common/ResumePreview";
import Image from "next/image";


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
const JdMatching = ({ details, resuneList }) => {

    console.log(38, resuneList)
    const [preview, setPreview] = useState(false);
    const [selected, setSelected] = useState(false);


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
                className="flex ml:flex-row flex-col gap-12 w-[100%] "

            >

                <div className="ml:w-[100%] w-[100%]  flex flex-col gap-[16px] ">
                    <div>Total Results ({resuneList?.length})</div>
                    <div className=" flex flex-row flex-wrap justify-between  gap-[24px] ">
                        {resuneList?.length > 0 ? (
                            <>
                                {resuneList
                                    .sort((a, b) => b.percentage - a.percentage)
                                    ?.map((data, index) => (
                                        <div
                                            className="flex flex-col gap-[8px] w-[44%] rounded-[16px] bg-white shadow-lg py-[16px] px-[24px] border border-[#DEDEDE]"
                                            key={index}
                                        >
                                            <div className="flex flex-col gap-[4px]">
                                                <div className="flex gap-[4px] text-[16px] font-500">
                                                    <span>
                                                        {
                                                            data?.firstName
                                                        }
                                                    </span>{" "}
                                                    <span>
                                                        {
                                                            data?.lastName
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex gap-[4px] items-center ">
                                                    <DesignationSVG />
                                                    <span className="text-[14px] font-500 ">
                                                        {
                                                            data?.designation
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="border border-[#DEDEDE] rounded-[8px] flex gap-6 justify-between items-center p-4">

                                                <div className="flex gap-2">
                                                    <img
                                                        src="/images/docIcon.png"
                                                        className="h-[48px] w-[48px]"
                                                        alt=""
                                                    />
                                                    {data.fileName}
                                                </div>
                                                <div
                                                    className="flex items-centergap-4 items-center"

                                                >

                                                    <div onClick={() => {
                                                        setSelected(data);
                                                        setPreview(true);
                                                    }} className="text-[14px] font-semibold text-[#06A9EF]  cursor-pointer ">
                                                        Preview
                                                    </div>


                                                    <a
                                                        href={data.resumeUrl}
                                                        className="flex items-center flex-col cursor-pointer"
                                                    >
                                                        <Image
                                                            src="/images/icons/download-black.png"
                                                            className="h-[28px] w-[28px]"
                                                            alt=""
                                                        />

                                                    </a>
                                                </div>
                                            </div>
                                            <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]">
                                                <div className="w-full h-full rounded-[8px]  flex justify-center  group relative ">
                                                    <PdfViewer pdfUrl={data?.resumeUrl} />




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

export default JdMatching;
