
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import Tesseract from "tesseract.js";

import axios from 'axios';
import { DocSVG, PDFSvg, PNGICON } from '../../utils/svg';
import MiniLoader from '../../components/common/mini-loader';
import { telCode } from '../../utils/data';
import { useMediaQuery } from "@react-hook/media-query";
import ReactSelect from "react-select";
import { toast } from 'react-toastify';
import SuccessPopUp from '../../components/common/successPopUp';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const typedarray = new Uint8Array(event.target.result);
            pdfjs.getDocument(typedarray).promise.then(function (pdf) {
                try {
                    pdf.getPage(pageNumber).then(function (page) {
                        page.getTextContent().then(function (textContent) {
                            const textItems = textContent.items.map((item) => item.str);
                            resolve(textItems.join(" "));
                        });
                    });
                } catch (err) {
                    console.log(err);
                    return;
                }
            });
        };
        reader.readAsArrayBuffer(file);
    });
};
function EasyApply() {
    const fileRef = useRef(null);
    const router = useRouter();
    const { id } = router.query
    const [loading, setLoading] = useState(false);
    console.log(555,loading)
    const [fileData, setFileData] = useState(null);
    const [tab, setTab] = useState(0);
    const [uploadLimit, setUploadLimit] = useState(0);
    const [file, setfile] = useState();
    const [limitUsedModal, setLimitUsedModal] = useState(false);
    const [resumeErrorPopup, setResumeErrorPopup] = useState(false);
    const [count, setCount] = useState(0);
    const [docfileError, setDocFileError] = useState(false);
    const [planAvailable, setplanAvailable] = useState(false);

    const handleButtonClick = () => {
        fileRef.current.click();
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const selectedFile = event.dataTransfer.files[0];
        handleFile(selectedFile);
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const selectedFile = event.target.files[0];
        handleFile(selectedFile);
    };

    const handleFile = (selectedFile) => {
        if (selectedFile) {
            if (selectedFile.type === "application/pdf" || "application/msword" || "application/docs") {
                // Adjust file type checks as per your requirement
                sendFile(selectedFile);
            } else {
                setDocFileError(true);
            }
        }
    };

    const sendFile = (file) => {
        setfile(file);

    };

    const extracteText = async (file) => {

        return new Promise(async (resolve, reject) => {
            const textData = [];
            if (
                file?.type ==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                file?.type == "application/msword"
            ) {

                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const content = e.target.result;
                        var doc = new Docxtemplater(new PizZip(content), {
                            delimiters: {
                                start: "12op1j2po1j2poj1po",
                                end: "op21j4po21jp4oj1op24j",
                            },
                        });
                        var text = doc.getFullText();
                        localStorage.setItem(
                            "text",
                            JSON.stringify(text)
                        );

                        textData.push({ text });
                        resolve(textData);
                    } catch (error) {

                        if (error.message.includes("Can't find end of central directory") ||
                            error?.properties?.error ===
                            "The filetype for this file could not be identified, is this file corrupted" ||
                            error?.message ===
                            "The filetype for this file could not be identified, is this file corrupted ?"
                        ) {
                            setDocFileError(true);
                        }
                    }
                };
                reader.readAsBinaryString(file);
            } else if (file?.type == "image/png") {

                Tesseract.recognize(file, "eng", {
                    logger: (m) => console.log(m),
                })
                    .then(({ data: { text } }) => {
                        textData.push({ text });
                        resolve(textData);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else if (file?.type == "application/pdf") {

                let fullText = "";
                const pdfTextPromises = [];
                const fileUrl = URL.createObjectURL(file);

                const loadingTask = pdfjs.getDocument(fileUrl);
                const pdf = await loadingTask.promise;

                for (let i = 1; i <= pdf.numPages; i++) {
                    pdfTextPromises.push(fileToText(file, i));
                }
                Promise.all(pdfTextPromises)
                    .then((texts) => {
                        fullText = texts.join("");
                        textData.push({ text: fullText });
                        resolve(textData);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                console.error("Unsupported file type.");
            }
        });
    };


    const navigate = () => {

        setLoading(true);
        extracteText(file).then((result) => {


            if (result[0]?.text?.length > 0) {
                axios
                    .post("http://localhost:2000/api/resume/extraction", {
                        data: result,
                    })
                    .then((res) => {

                        if (Object.keys(res.data.data[0]).length > 0) {
                            localStorage.setItem(
                                "parsedResume",
                                JSON.stringify(res.data.data[0])
                            );
                            setLoading(false);
                            setTimeout(() => {
                                setTab(1)
                            }, 2000);

                        } else {
                            setCount(count + 1);
                        }
                    })
                    .catch((err) => {
                        setLoading(false);
                        console.log(err);
                        extracteText();
                    });
            } else {
                setResumeErrorPopup(true);

                // setLoading(false);
                // setfile();
                // setCount(count + 1);
            }
        });
    };


    useEffect(() => {
        if (count > 2) {
            setLoading(false);
            setfile();
            setResumeErrorPopup(true);
            setCount(0);
        } else if (count == 1 || count == 2) {
            navigate();
        }
    }, [count]);

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

    }

    const [selectedItem, setSelectedItem] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTelCode, setFilteredTelCode] = useState([]);
    const [parseData, setParseData] = useState()
    const [formError, setFormError] = useState({});
    const [text, setText] = useState("");
    const [loadingg, setLoadingg] = useState(false);
    const [fileName, setFileName] = useState()
    const [error, setError] = useState()
    const isViewportBelow850 = useMediaQuery("(max-width:850px)");
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (tab === 1) {

            const parsedResume = JSON.parse(localStorage.getItem("parsedResume"));
            setParseData(parsedResume)
            const textData = JSON.parse(localStorage.getItem("text"));
            setText(textData)
        }

    }, [tab]);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        dial_code: "",
        img: null,
    });

    useEffect(() => {

        if (parseData) {

            setData({
                ...data,
                firstName: parseData?.first_name || "",
                lastName: parseData?.last_name || "",
                mobileNo: parseData?.mobileNo || "",
                email: parseData?.email || "",
                dial_code: parseData?.dial_code || "",
            });

            const selectedItem = telCode.find((item) => item.dial_code === parseData?.dial_code);

            if (selectedItem) {
                setSelectedItem(selectedItem);
            }
        }
    }, [parseData]);
    const validateInput = (fieldName, value) => {
        const errors = { ...formError };

        switch (fieldName) {
            case "firstName":
                if (!value.trim()) {
                    errors.firstName = "First Name is required";
                } else if (!isNaN(value)) {
                    errors.firstName = "First Name cannot be a number";
                } else if (/\d/.test(value)) {
                    errors.firstName = "First Name cannot contain numbers";
                } else {
                    delete errors.firstName;
                }
                break;

            case "lastName":
                if (!value.trim()) {
                    errors.lastName = "Last Name is required";
                } else if (!isNaN(value)) {
                    errors.lastName = "Last Name cannot be a number";
                } else if (/\d/.test(value)) {
                    errors.lastName = "Last Name cannot contain numbers";
                } else {
                    delete errors.lastName;
                }
                break;

            case "email":
                if (!value.trim()) {
                    errors.email = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = "Invalid email format";
                } else {
                    delete errors.email;
                }
                break;

            case "mobileNo":
                if (!value.trim()) {
                    errors.mobileNo = "Mobile Number is required";
                } else if (isNaN(value)) {
                    errors.mobileNo = "Mobile Number cannot be text";
                } else if (value.length < 10) {
                    errors.mobileNo = "Mobile Number must be 10 digits";
                } else {
                    delete errors.mobileNo;
                }
                break;



            case "dial_code":
                if (!value.trim()) {
                    errors.dial_code = "Country Code is required";
                } else {
                    delete errors.dial_code;
                }
                break;

            default:
                break;
        }

        setFormError(errors);
        return errors;
    };



    const applyForJob = () => {
        const isValid = validateFields(); // Validate all fields
        if (!isValid) {
            // toast.error("Please fill in all required fields correctly.");
            return;
        }

        setLoading(true);
        const formDataToSend = new FormData();

        formDataToSend.append("percentage", "");
        formDataToSend.append("extractedText", text);
        formDataToSend.append("parseData", JSON.stringify(parseData));
        if (file) {
            formDataToSend.append("uploadedResume", file);
        }

        formDataToSend.append(
            "formData",
            JSON.stringify({
                personal: {
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    email: data?.email,
                    dial_code: data?.dial_code,
                    mobileNo: data?.mobileNo,
                },

            })
        );

        axios
            .post(`http://localhost:2000/api/job/easyApply/${id}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setSuccess(true)
                // localStorage.setItem(
                //     "parsedResume",""

                // );

            })
            .catch((err) => {
                console.error(err);

                if (err.response && err.response.data) {
                    const message = err.response.data.message;
                    if (message === "Application already exists") {
                        setError("Application already exists")
                    } else {
                        toast.error(message || "Something went wrong. Please try again.");
                    }
                } else {
                    toast.error("Network error. Please check your connection.");
                }
            })
            .finally(() => {
                setLoading(false);
            });


    };

    useEffect(() => {
        const filterLogic = (item) =>
            item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.dial_code.includes(searchTerm);
        const filteredCodes = telCode.filter(filterLogic);
        const firstSixCodes = filteredCodes.slice(0, 6);
        const remainingCodes = filteredCodes.slice(6);

        const sortedRemainingCodes = remainingCodes.sort((a, b) => {
            const numA = parseInt(a.dial_code.replace("+", ""), 10);
            const numB = parseInt(b.dial_code.replace("+", ""), 10);
            return numA - numB;
        });
        const combinedCodes = [...firstSixCodes, ...sortedRemainingCodes];
        setFilteredTelCode(combinedCodes);
    }, [telCode, searchTerm]);

    const customFilterOption = ({ label, value, data }, inputValue) => {
        const lowercasedInput = inputValue.toLowerCase();
        return (
            data.code.toLowerCase().includes(lowercasedInput) ||
            data.dial_code.includes(inputValue)
        );
    };


    const handleInputChange = (fieldName, value) => {

        if (fieldName == "mobileNo") {
            if (value.replace(/\D/g, "").length <= 10) {
                setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
                if (value.replace(/\D/g, "").length < 10) {
                    setFormError((prevErrors) => ({
                        ...prevErrors,
                        mobileNo: "length must be 10",
                    }));
                }
                else {
                    setFormError((prevErrors) => {
                        const updatedErrors = { ...prevErrors };
                        delete updatedErrors.mobileNo;
                        return updatedErrors;
                    });
                }
            }
        }
        else {
            setData({ ...data, [fieldName]: value });
            validateInput(fieldName, value);
        }
    }
    const validateFields = () => {
        const requiredFields = [
            { key: "firstName", error: "Enter First Name" },
            { key: "lastName", error: "Enter Last Name" },
            { key: "email", error: "Enter a valid Email" },
            { key: "dial_code", error: "Select a country code" },
            { key: "mobileNo", error: "Enter Contact Number" },

        ];

        let errors = { ...formError };

        requiredFields.forEach((field) => {
            const value = data[field.key];
            if (!value || (typeof value === "string" && !value.trim())) {
                errors[field.key] = field.error;
            }
        });


        setFormError(errors);
        return Object.keys(errors).length === 0;
    };
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setData({ ...data, dial_code: item.dial_code, country: item.name });
        setSearchTerm("");
        setFormError((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors.dial_code;
            return updatedErrors;
        });
    };

    return (
        <>
            {tab == 0 ?
                <div className='customMargins py-[72px] flex gap-[96px] justify-center'>
                    <div className='h-[30px] w-[330px] scr1024:block hidden '>
                        <img
                            src="/images/auth/AiProfileCreation.png"
                            alt=""
                            className="h-[300px] w-[300px]  object-cover"

                        />
                    </div>
                    <div className='bg-[#FFFFFF] rounded-[16px] p-6 flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>

                            <p className='text-[14px] font-[500] text-[#646464] leading-tight'>Easy process to Apply Job</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[12px] font-[500] text-[#646464] leading-tight'>1. Upload your CV/Resume.</p>
                            <p className='text-[12px] font-[500] text-[#646464] leading-tight'>2. Let system scan it and make your application almost ready.</p>
                        </div>
                        {loading ? (
                            <div className="border-dashed border-[3px] border-[#BCBCBC] flex flex-col rounded-[12px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper h-[107px] sm:w-[360px]">
                                <MiniLoader />
                                <span>Analyzing Resume, Please Wait...</span>
                            </div>
                        ) : (
                            <div
                                ref={fileRef}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className="border-dashed border-[3px] border-[#BCBCBC] flex flex-col sm:w-[360px] rounded-[12px] px-[8px] py-[16px] items-center justify-center gap-[8px] upload-btn-wrapper h-[107px]"
                            >
                                <input
                                    type="file"
                                    name="myfile"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,"

                                />
                                {file ? (
                                    <div className="w-full flex justify-center ">
                                        <div className="flex scr420:flex-row flex-col gap-[16px] items-center justify-between md:w-[95%] w-[95%]">
                                            <div className="flex flex-row gap-[16px] items-center scr420:w-[60%] w-full scr420:justify-start justify-center">
                                                <div>{fileIconSeter(file)}</div>
                                                <span className="text-[12px] w-[80%] break-all">{file.name}</span>
                                            </div>
                                            <button className="btn_hover_effect sm:px-[8px] px-1 py-[6px] border border-[#06A9EF] rounded-[12px] text-[12px] sm:text-[14px] sm:min-w-[105px] min-w-[90px] cursor-pointer">
                                                Browse file
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 40 40"
                                                fill="none"
                                                onClick={handleButtonClick}
                                            >
                                                <g clipPath="url(#clip0_4121_52475)">
                                                    <path
                                                        d="M25 13.3333H25.0167"
                                                        stroke="#06A9EF"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                                                        stroke="#06A9EF"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                                                        stroke="#06A9EF"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                                                        stroke="#06A9EF"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4121_52475">
                                                        <rect width="40" height="40" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-[4px] font-normal">
                                            <div className="flex text-center justify-center scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                                                drag and drop or{" "}
                                                <span onClick={handleButtonClick} className="text-[#06A9EF]">
                                                    &nbsp;Browse file{" "}
                                                </span>
                                                &nbsp;to upload
                                            </div>
                                            <p className="text-center text-[12px] font-normal text-[#7C8493]">PDF or DOCS</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        <div className='flex gap-6 justify-center'>
                            <button onClick={() => router.back()} className='border border-[#06A9EF] text-[14px] font-[600] rounded-[30px] h-[42px] w-[104px]'>
                                Back
                            </button>

                            <button
                                disabled={file && !loading ? false : true}
                                className={`sm:px-9 px-6 py-3 bg-[#06A9EF]   text-[14px] font-[600] rounded-[30px] h-[42px] w-[139px] leading-tight text-white ${file && !loading
                                    ? "opacity-100 btn_hover_effect"
                                    : "opacity-50"
                                    } `}
                                onClick={navigate}
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </div>
                :
                <div className=" flex justify-center items-center py-[72px]  gap-[50px] customMargins">
                    {/* <div className="h-[480px] min-w-[480px] scr1024:block hidden">
                        <img
                            src="/images/auth/signIn.png"
                            alt=""
                            className="h-[480px] w-[480px]  object-cover "

                        />
                    </div> */}
                    <div

                        className="  bg-white flex w-[400px]  sm:p-[24px] p-3 gap-[16px] flex-col justify-center items-center rounded-[24px] "
                        style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >

                        <div className="flex scr390:flex-row flex-col gap-4 w-full ">
                            <div className="scr390:w-[50%] w-full flex flex-col gap-1">
                                <div className={`flex flex-col px-[16px] py-[10px] border-[1px]   rounded-[8px] border-solid ${formError.firstName ? "border-red" : "border-[#DEDEDE]"}`}>

                                    <input
                                        type="text"
                                        name=""
                                        className="font-[400] text-[12px] w-[80%]"
                                        placeholder="Enter First Name"
                                        value={data.firstName}
                                        onChange={(e) =>
                                            handleInputChange("firstName", e.target.value)
                                        }
                                    />

                                </div>

                            </div>
                            <div className="scr390:w-[50%] w-full flex flex-col gap-1">
                                <div className={`flex flex-col px-[16px] py-[10px] border-[1px]  rounded-[8px] border-solid ${formError.lastName ? "border-red" : "border-[#DEDEDE]"}`}>
                                    <input
                                        type="text"
                                        name=""
                                        className="font-[400] text-[12px] w-[80%]"
                                        placeholder="Enter Last Name"
                                        value={data.lastName}
                                        onChange={(e) =>
                                            handleInputChange("lastName", e.target.value)
                                        }
                                    />

                                </div>

                            </div>
                        </div>
                        <div className={`flex w-full  rounded-[8px] gap-4 border-[1px] border-solid  h-[40px]  ${(formError.mobileNo || formError.dial_code) ? "border-red" : "border-[#DEDEDE]"}`}>

                            <div
                                onWheel={(e) => e.stopPropagation()}
                                className="   text-[14px] justify-center items-center  flex font-[500] text-[#646464]"
                            >
                                <div className="flex items-center justify-center gap-2 cursor-pointer  ">
                                    <div className="flex items-center  gap-1 cursor-pointer  ">
                                        <ReactSelect
                                            options={filteredTelCode}
                                            className=" flex  items-center py-1 ml-[10px] text-[12px] font-normal  rounded-[8px]"
                                            name=""
                                            placeholder="Select"
                                            value={selectedItem}
                                            onChange={handleItemClick}
                                            getOptionLabel={(option) => (
                                                <div className="flex items-center  ">
                                                    <img
                                                        src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                                        width="20px"
                                                    />
                                                    <span className="ml-2 text-[#333333] text-[12px] font-[400]">
                                                        {option.code} {option.dial_code}
                                                    </span>
                                                </div>
                                            )}
                                            // getOptionValue={(option) => option.code}
                                            filterOption={customFilterOption}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    border: "none",

                                                    minWidth: "120px",
                                                    outline: "none",
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                                colors: {
                                                    ...theme.colors,
                                                    // primary25: 'hotpink',
                                                    primary: "neutral0",
                                                },
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>


                            <input
                                className="w-full text-[12px] font-[400] mr-2 "
                                type="text"
                                name=""
                                // id="single_input"
                                placeholder={`${isViewportBelow850
                                    ? "Enter Number "
                                    : "Enter Contact Number "
                                    }`}
                                value={data.mobileNo}
                                onChange={(e) =>
                                    handleInputChange("mobileNo", e.target.value)
                                }
                            />




                        </div>

                        <div className="w-full flex flex-col gap-2">


                            <div className="flex gap-2  items-center justify-between w-full">
                                <input
                                    className={`text-[12px] w-full font-[400] px-[16px] py-[10px] border-[1px]  rounded-[8px] border-solid  h-[40px] ${formError.email ? "border-red" : "border-[#DEDEDE]"}`}


                                    type="email"
                                    name=""

                                    placeholder="Enter Email"
                                    value={data.email}
                                    onChange={(e) => {
                                        handleInputChange("email", e.target.value); setError("")

                                    }}
                                />

                            </div>


                        </div>

                        <div className="flex flex-row gap-[16px] items-center  w-full  justify-start">
                            <div>{fileIconSeter(file)}</div>
                            <span className="text-[12px] w-[80%] break-all">{file.name}</span>
                        </div>

                        {error &&
                            <p className='text-[12px] w-full text-red font-medium'>{error}</p>
                        }
                        <div className='flex justify-between w-full'>
                            <button onClick={() => setTab(0)} className='border border-[#06A9EF] text-[14px] font-[600] rounded-[30px] h-[42px] w-[104px]'>
                                Back
                            </button>

                            {loading ?
                                <div className='w-[119px] bg-blue rounded-[30px] px-9 flex items-center justify-center font-medium h-[40px] text-white'>
                                    <MiniLoader />
                                </div>
                                :
                                <button onClick={applyForJob} className='w-[119px] bg-blue rounded-[30px] px-9 flex items-center justify-center font-medium h-[40px] text-white'>
                                    Apply
                                </button>
                            }
                        </div>
                    </div>
                    {success &&
                        <>
                            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                                <SuccessPopUp text={"Application sent Successfully"} isButton={true} />
                            </div>
                        </>

                    }

                </div>
            }
        </>
    )
}

export default EasyApply