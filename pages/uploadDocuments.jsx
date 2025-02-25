import React, { useEffect, useRef, useState } from "react";
import { setPageOpened } from "../Redux/slices/websiteSlice";
import { useDispatch } from "react-redux";

import MiniLoader from "../components/common/mini-loader";
import { useRouter } from "next/router";
import { DocSVG, PDFSvg, PNGICON } from "../utils/svg";
import axios from "axios";
import { toast } from "react-toastify";
import SuccessPopUp from "../components/common/successPopUp";
import { uploadFile } from "../utils/data";

function UploadDocuments() {
    const router = useRouter();
    const { applicantId, jobId } = router.query

    const dispatch = useDispatch();
    dispatch(setPageOpened());
    const [previousStatus, setPreviousStatus] = useState("");

    const getDocumentsUploadStatus = async () => {
        try {
            const response = await axios.get(`https://dev.api.skilotech.com/api/preboarding/documentsUploadStatus/${applicantId}/${jobId}`);
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
    const filteredRequiredFields = requiredFields.filter(
        (key) => router.query[key] === "true"
    );

    const uploadDocuments = async () => {
        const missingFields = filteredRequiredFields.filter((key) => !files[key]);
    
        if (missingFields.length > 0) {
            toast.warn(`Some required documents are missing.`);
            return; 
        }
    
        setLoading1(true);
    
        const documentKeys = [
            "isPhotoId",
            "isAddress",
            "isPayroll",
            "isAcademic",
            "isDegrees",
            "isExperience",
            "isCertifications",
        ];
    
        const uploadedFiles = {};
    
       
        for (const key of documentKeys) {
            if (files[key]) {
                try {
                    const uploadedUrl = await uploadFile(files[key], key);
                    if (uploadedUrl) {
                        uploadedFiles[key] = uploadedUrl;
                    } else {
                        toast.error(`${key} upload failed. Please try again.`);
                    }
                } catch (error) {
                    toast.error(`${key} upload failed. Please try again.`);
                }
            }
        }
    
        if (Object.keys(uploadedFiles).length === 0) {
            setLoading1(false);
            toast.error("No files were uploaded. Please try again.");
            return;
        }
    
      
        try {
            const response = await axios.post(
                `https://dev.api.skilotech.com/api/preboarding/uploadDocuments/${applicantId}/${jobId}`,
                uploadedFiles, 
                { headers: { "Content-Type": "application/json" } }
            );
    
            setLoading1(false);
            setUpdated(true);
            toast.success("Documents uploaded successfully!");
            return response.data;
        } catch (error) {
            console.error("Error uploading files:", error);
            setLoading1(false);
            toast.error("Something went wrong while uploading files.");
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
            return (
                <svg
                    width="57"
                    height="48"
                    viewBox="0 0 57 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg "
                >
                    <path
                        d="M50.4997 7.99998H29.7362L27.3944 3.31641C26.8987 2.31758 26.1333 1.47753 25.1847 0.891397C24.2361 0.305266 23.1423 -0.00351467 22.0273 3.01816e-05H6.49996C4.90921 0.00177713 3.38411 0.634475 2.25928 1.75931C1.13445 2.88414 0.501747 4.40924 0.5 5.99999V41.9998C0.501747 43.5905 1.13445 45.1156 2.25928 46.2405C3.38411 47.3653 4.90921 47.998 6.49996 47.9997H50.4997C52.0904 47.998 53.6155 47.3653 54.7404 46.2405C55.8652 45.1156 56.4979 43.5905 56.4996 41.9998V13.9999C56.4979 12.4092 55.8652 10.8841 54.7404 9.75926C53.6155 8.63443 52.0904 8.00173 50.4997 7.99998Z"
                        fill="#4294FF"
                    />
                    <path
                        d="M51.9597 47.7996C51.4854 47.9373 50.9935 48.0047 50.4997 47.9996H6.49996C4.9101 47.995 3.38668 47.3614 2.26248 46.2371C1.13827 45.1129 0.504644 43.5895 0.5 41.9997V5.99989C0.499548 4.7876 0.868792 3.60401 1.55846 2.60702C2.24814 1.61003 3.22544 0.847069 4.35998 0.419922C9.95994 16.1198 23.0599 40.0197 51.9597 47.7996Z"
                        fill="#2965ED"
                    />
                </svg>
            );
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
                                        className="border-dashed border-[1px] border-[#BCBCBC]  flex flex-col justify-between rounded-[12px] px-[8px] py-[16px] items-center gap-[8px] upload-btn-wrapper  w-full bg-white h-[102.6px]"
                                    >

                                        <input
                                            type="file"
                                            ref={(el) => (fileRefs.current[key] = el)}
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(e, key)}
                                            accept=".pdf,.jpg,.jpeg,.png,"

                                        />

                                        {files[key] ? (
                                            <div className="w-full flex f-full ">
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
                                            <div className="w-full flex flex-col justify-between h-full">
                                                <div className="flex flex-col items-center justify-center">

                                                    <svg onClick={() => fileRefs.current[key]?.click()}
                                                        style={{ cursor: "pointer" }} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_6706_107586)">
                                                            <path d="M15.5 8H15.51" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M17.5 4H7.5C5.84315 4 4.5 5.34315 4.5 7V17C4.5 18.6569 5.84315 20 7.5 20H17.5C19.1569 20 20.5 18.6569 20.5 17V7C20.5 5.34315 19.1569 4 17.5 4Z" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M4.5 15L8.5 11C8.95606 10.5611 9.47339 10.3301 10 10.3301C10.5266 10.3301 11.0439 10.5611 11.5 11L16.5 16" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M14.5 14L15.5 13C15.9561 12.5611 16.4734 12.3301 17 12.3301C17.5266 12.3301 18.0439 12.5611 18.5 13L20.5 15" stroke="#06A9EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_6706_107586">
                                                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>


                                                <div className="flex text-center justify-center scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                                                    drag and drop or{" "}
                                                    <span onClick={() => fileRefs.current[key]?.click()} className="text-[#06A9EF]">
                                                        &nbsp;Browse file{" "}
                                                    </span>
                                                    &nbsp;to upload
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

            <div className="w-full flex justify-end mt-4 customMargins pb-6">
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
