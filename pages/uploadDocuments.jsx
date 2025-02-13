import React, { useEffect, useRef, useState } from "react";
import { setPageOpened } from "../Redux/slices/websiteSlice";
import { useDispatch } from "react-redux";

import MiniLoader from "../components/common/mini-loader";
import { useRouter } from "next/router";
import { DocSVG, PDFSvg, PNGICON } from "../utils/svg";
import axios from "axios";
import { toast } from "react-toastify";
import SuccessPopUp from "../components/common/successPopUp";

function UploadDocuments() {
    const router = useRouter();
    const { applicantId, jobId } = router.query

    const dispatch = useDispatch();
    dispatch(setPageOpened());
    const [previousStatus, setPreviousStatus] = useState("");

    const getDocumentsUploadStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/preboarding/documentsUploadStatus/${applicantId}/${jobId}`);
            setPreviousStatus(response.data.documentStatus)

            return response.data.documentStatus;
        } catch (error) {
            console.error("Error fetching offer acceptance status:", error.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {

        getDocumentsUploadStatus()

    }, [])



    const documentLabels = {
        isPhotoId: (
            <>
                Photo ID <span className="text-red">*</span> <p className="text-[10px]">(Aadhar card, Driving License, Pan Card, Passport, Voter ID Card)</p>
            </>
        ),
        isAddress: (
            <>
                Address Proof <span className="text-red">*</span>  <p className="text-[10px]">(Aadhar card, Driving License, Passport, Voter ID Card)</p>
            </>
        ),
        isPayroll: (
            <>
                Payroll Documents  <span className="text-red">*</span> <p className="text-[10px]">(Pan Card, Bank statement)</p>
            </>
        ),
        isAcademic: <> Academic Certificates<span className="text-red">*</span></>,
        isDegrees: <> Degree Certificates<span className="text-red">*</span></>,
        isExperience: <> Experience Letters<span className="text-red">*</span></>,
        isCertifications: <> Other Certifications</>,

    };

    const [files, setFiles] = useState({});
    const [loading, setLoading] = useState({});
    const [loading1, setLoading1] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [updating, setUpdating] = useState(false);
    const fileRefs = useRef({});


    const requiredFields = [
        "isPhotoId",
        "isAddress",
        "isPayroll",
        "isAcademic",
        "isDegrees",
        "isExperience",
    ];

    const uploadDocuments = async () => {
        const missingFields = requiredFields.filter((key) => !files[key]);

        if (missingFields.length > 0) {
            toast.error(`Please upload all required documents.`);
            return;
        }
        setLoading1(true)
        const formData = new FormData();
        Object.keys(files).forEach((key) => {
            if (files[key]) {
                formData.append(key, files[key]);
            }
        });

        try {
            const response = await axios.post(`http://localhost:2000/api/preboarding/uploadDocuments/${applicantId}/${jobId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading1(false)
            toast.success("Documents uploaded successfully.");
            setUpdated(true)
            return response.data;
        } catch (error) {
            console.error("Error uploading files:", error);
            setLoading1(false)
            throw error;
        }
    };

    const handleDrop = (event, key) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            handleFile(droppedFiles[0], key);
        }
    };
    
    const handleFileChange = (event, key) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        handleFile(selectedFile, key);
    };

    const handleFile = (selectedFile, key) => {
        if (selectedFile) {
            setUpdating(true)
            setLoading((prev) => ({ ...prev, [key]: true }));

            setTimeout(() => {

                selectedFile.type === "application/pdf" ||
                    selectedFile.type === "application/msword" ||
                    selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                setFiles((prev) => ({ ...prev, [key]: selectedFile }));


                setLoading((prev) => ({ ...prev, [key]: false }));
                setUpdating(false)
            }, 2000);
        }
    };
    const fileIconSeter = (data) => {
        if (
            data.name.includes("docx") ||
            data.name.includes("doc") ||
            data.name.includes("DOC")
        ) {
            return <DocSVG />;
        } else if (data.name.includes("pdf") || data.name.includes("PDF")) {
            return <PDFSvg />;
        } else if (
            data.name?.includes("png") ||
            data.name?.includes("jpg") ||
            data.name?.includes("jpeg")
        ) {
            return <PNGICON />;
        } else {
            
        }
    };

    return (
        <>
            <div className="bg-white z-[2000] fixed w-full top-0 ml-[-24px]" style={{ borderBottom: "1.5px solid #DEDEDE" }}>
                <div className="customMargins py-3 flex justify-between items-center">
                    <img className="object-contain h-[40px]" src="/images/logo_skilotech.png" alt="Logo" />
                </div>
            </div>





            <div className="flex customMargins gap-6 flex-wrap pt-4">
                {Object.keys(documentLabels).map((key) => {
                    if (router.query[key] === "true") {
                        return (
                            <div key={key} className="flex flex-col gap-4 py-2 px-4 bg-white rounded-[12px] w-[350px] justify-between">
                                <p className="font-medium">{documentLabels[key]} </p>

                                {loading[key] ? (
                                    <div className="border-dashed border-[1px] border-[#BCBCBC] flex flex-col w-full rounded-[12px] px-[24px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]">
                                        <MiniLoader />
                                        <span className="text-[14px]">Uploading document, Please Wait...</span>
                                    </div>
                                ) : (
                                    <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, key)}
                                        className="border-dashed border-[1px] border-[#BCBCBC]  flex flex-col rounded-[12px] px-[8px] py-[16px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem] w-full bg-white"
                                    >

                                        <input
                                            type="file"
                                            ref={(el) => (fileRefs.current[key] = el)}
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(e, key)}
                                            accept=".pdf,.jpg,.jpeg,.png,"

                                        />

                                        {files[key] ? (
                                            <div className="w-full flex justify-center">
                                                <div className="flex flex-row gap-[16px] items-center justify-between w-[95%]">
                                                    <div className="flex flex-row gap-[16px] items-center scr420:w-[60%] w-full">
                                                        <div>{fileIconSeter(files[key])} </div>
                                                        <span className="text-[12px] w-[80%] break-all">
                                                            {files[key].name.length > 25
                                                                ? files[key].name.substring(0, 25) + "..."
                                                                : files[key].name}
                                                        </span>

                                                    </div>
                                                    <button
                                                        className="btn_hover_effect sm:px-[8px] px-1 py-[6px] border border-[#06A9EF] rounded-[12px] text-[12px] sm:text-[16px] sm:min-w-[105px] min-w-[90px] cursor-pointer"
                                                        onClick={() => fileRefs.current[key]?.click()}
                                                    >
                                                        Browse file
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <div className="flex flex-col items-center">

                                                    
                                                </div>

                                                <div className="flex flex-col gap-[4px] font-normal">
                                                    <div className="flex text-center justify-center scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                                                        drag and drop or{" "}
                                                        <span onClick={() => fileRefs.current[key]?.click()} className="text-[#06A9EF]">
                                                            &nbsp;Browse file{" "}
                                                        </span>
                                                        &nbsp;to upload
                                                    </div>
                                                    {/* <p className="text-center text-[12px] font-normal text-[#7C8493]">PDF, JPG, JPEG, PNG</p> */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            <div className="w-full flex justify-end mt-4 customMargins">
                {loading1 ?
                    <div className="bg-blue px-4 py-2 text-white rounded-[12px] flex justify-center items-center font-medium w-[91.64px]">
                        <MiniLoader />
                    </div>
                    :
                    <button disabled={updating} onClick={uploadDocuments} className="bg-blue px-4 py-2 text-white rounded-[12px] flex justify-center items-center font-medium">
                        Submit
                    </button>
                }
            </div>



            {(previousStatus === "Submitted" || previousStatus === "Verified") &&
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">

                        <div className="customMargins w-full flex justify-center items-center ">

                            <SuccessPopUp text={"Documents Already Submitted"} isButton={false} />
                        </div>
                    </div>
                </>
            }


            {updated &&
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">

                        <div className="customMargins w-full flex justify-center items-center">

                            <SuccessPopUp text={"Documents Uploaded Successfully"} isButton={false} />
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default UploadDocuments;
