import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BulkUploadPopUp({ setOpenPopup }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const allowedFileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
    ];
    const validateFile = (file) => {
        if (file) {
            if (allowedFileTypes.includes(file.type)) {
                setFile(file);
                setError("");
            } else {
                setError("Invalid file type. Please upload a .xls or .csv file.");
                setFile(null);
            }
        }
    };


    const handleDrop = (e) => {
        e.preventDefault();
        setError("");
        const droppedFile = e.dataTransfer.files[0];
        validateFile(droppedFile);
    };

    const handleFileChange = (e) => {
        setError("");
        setFile(e.target.files[0]);

        const selectedFile = e.target.files[0];
        validateFile(selectedFile);
    };
    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file");
            return;
        }

        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("createdByName", userDataGlobal?.companyId
            ? userDataGlobal?.companyName
            : `${userDataGlobal?.firstName} ${userDataGlobal?.lastName}`);
        formData.append("role", userDataGlobal?.role)
        formData.append("employerCompId", userDataGlobal?.companyId)

        try {
            const response = await axios.post(
                `https://jamblix.com/api/job/bulkUploadJobs/${userDataGlobal?._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setFile(null);
            setMessage(response.data.message);
            toast.success(response.data.message);
            setOpenPopup(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex justify-center items-center">
            <div className="bg-white flex gap-4 flex-col  rounded-lg shadow-lg p-6 relative">
                <div className=" flex justify-between items-center">
                    <h2 className="text-[18px] font-[600] text-start ">
                        Upload Bulk Jobs
                    </h2>
                    <button
                        onClick={() => {
                            setFile("");
                            setOpenPopup(false);
                        }}
                        className=""
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.71874 11.1648L0.84375 10.2898L5.13126 6.00234L0.84375 1.71483L1.71874 0.839844L6.00624 5.12735L10.2938 0.839844L11.1687 1.71483L6.88123 6.00234L11.1687 10.2898L10.2938 11.1648L6.00624 6.87733L1.71874 11.1648Z"
                                fill="#333333"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-blue bg-[#EFFAFF]  rounded-md p-6 text-center "
                >
                    <div className="flex items-center gap-[16px] justify-center">
                        <div>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0_9696_113401)">
                                    <path
                                        d="M21.7975 12.9867V7.30933C21.7975 7.14683 21.7225 6.99668 21.6163 6.87789L15.2511 0.193863C15.1323 0.0688933 14.9634 0 14.7947 0H4.70285C2.83975 0 1.35156 1.51932 1.35156 3.38264V22.4656C1.35156 24.329 2.83975 25.8233 4.70285 25.8233H12.6688C14.1756 28.3243 16.9144 30 20.0342 30C24.7737 30 28.6441 26.1483 28.6441 21.4027C28.6505 17.2572 25.6741 13.7933 21.7975 12.9867ZM15.42 2.19475L19.6905 6.69021H16.9205C16.0952 6.69021 15.42 6.00883 15.42 5.18348V2.19475ZM4.70285 24.5727C3.53372 24.5727 2.60217 23.6348 2.60217 22.4656V3.38264C2.60217 2.2071 3.53372 1.25061 4.70285 1.25061H14.1694V5.18348C14.1694 6.7028 15.4012 7.94082 16.9205 7.94082H20.5469V12.824C20.3595 12.8178 20.2093 12.7991 20.0468 12.7991C17.8647 12.7991 15.8576 13.637 14.3445 14.9501H6.40366C6.05966 14.9501 5.77836 15.2314 5.77836 15.5752C5.77836 15.9192 6.05966 16.2005 6.40366 16.2005H13.1815C12.7375 16.8258 12.3685 17.4511 12.0811 18.1389H6.40366C6.05966 18.1389 5.77836 18.4202 5.77836 18.7642C5.77836 19.1079 6.05966 19.3895 6.40366 19.3895H11.6746C11.5182 20.0148 11.437 20.7087 11.437 21.4027C11.437 22.5281 11.6558 23.6412 12.0497 24.5791H4.70285V24.5727ZM20.0407 28.7558C15.989 28.7558 12.6938 25.4606 12.6938 21.4089C12.6938 17.3572 15.9826 14.062 20.0407 14.062C24.0985 14.062 27.3873 17.3572 27.3873 21.4089C27.3873 25.4606 24.0923 28.7558 20.0407 28.7558Z"
                                        fill="#06A9EF"
                                    />
                                    <path
                                        d="M6.40655 13.067H12.7404C13.0844 13.067 13.3657 12.7855 13.3657 12.4417C13.3657 12.0977 13.0844 11.8164 12.7404 11.8164H6.40655C6.06255 11.8164 5.78125 12.0977 5.78125 12.4417C5.78125 12.7855 6.06255 13.067 6.40655 13.067Z"
                                        fill="#06A9EF"
                                    />
                                    <path
                                        d="M20.4868 16.7938C20.3681 16.6688 20.2055 16.5938 20.0305 16.5938C19.8554 16.5938 19.6929 16.6688 19.5741 16.7938L15.9099 20.7267C15.6723 20.9768 15.6911 21.3769 15.9413 21.6083C16.1914 21.8459 16.5977 21.8271 16.8353 21.5772L19.4239 18.8073V25.635C19.4239 25.979 19.7052 26.2603 20.0492 26.2603C20.393 26.2603 20.6745 25.979 20.6745 25.635V18.8073L23.2442 21.5772C23.3694 21.7083 23.5319 21.7772 23.7008 21.7772C23.8507 21.7772 24.0009 21.7209 24.1258 21.6083C24.376 21.3707 24.3948 20.9768 24.1572 20.7267L20.4868 16.7938Z"
                                        fill="#06A9EF"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_9696_113401">
                                        <rect width="30" height="30" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <div>
                            <div className="flex text-[12px] gap-1 font-[400]">
                                <label
                                    htmlFor="file-upload"
                                    className="text-[#06A9EF] cursor-pointer hover:underline"
                                >
                                    Browse
                                </label>
                                file or drag and drop
                            </div>
                            <div className="flex text-[12px] font-[400]">
                                Allowed file formats: XLS, CSV
                            </div>
                        </div>
                    </div>

                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".xls, .xlsx, .csv"
                    />
                </div>

                {file && (
                    <div className="text-green items-center justify-center flex text-sm mb-2">
                        {file.name} uploaded successfully!
                    </div>
                )}

                <div className="text-[11px] font-[500] flex flex-col gap-2 w-full">
                    <p>
                        1. Download the Template{" "}
                        <span className="font-[400]">
                            - Click on &quot;Download CSV File&quot; to get the required
                            format.
                        </span>
                    </p>
                    <p>
                        2. Fill in the Job Details
                        <span className="font-[400]">
                            {" "}
                            - Open the file, enter all job-related information, and save
                            it.
                        </span>
                    </p>
                    <p>
                        3. Upload the File{" "}
                        <span className="font-[400]">
                            - Click &quot;Browse&quot; or drag and drop your completed CSV
                            file.
                        </span>
                    </p>
                    <p>
                        4. Submit the Jobs
                        <span className="font-[400]">
                            - Click &quot;Upload&quot; to post your jobs successfully.
                        </span>
                    </p>
                </div>

                <div className="flex justify-end gap-4 ">
                    <a
                        href="https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/job_details.xlsx"
                        download="job_details.xlsx"
                        className="border-[#06A9EF] border-[1px] text-[12px] font-[600] px-4 py-2 rounded-[30px] flex gap-2 items-center"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 8.68125C5.9 8.68125 5.80625 8.66562 5.71875 8.63437C5.63125 8.60312 5.55 8.55 5.475 8.475L2.775 5.775C2.625 5.625 2.55313 5.45 2.55938 5.25C2.56563 5.05 2.6375 4.875 2.775 4.725C2.925 4.575 3.10312 4.49688 3.30937 4.49063C3.51562 4.48438 3.69375 4.55625 3.84375 4.70625L5.25 6.1125V0.75C5.25 0.5375 5.32188 0.359375 5.46562 0.215625C5.60938 0.071875 5.7875 0 6 0C6.2125 0 6.39063 0.071875 6.53438 0.215625C6.67813 0.359375 6.75 0.5375 6.75 0.75V6.1125L8.15625 4.70625C8.30625 4.55625 8.48438 4.48438 8.69063 4.49063C8.89688 4.49688 9.075 4.575 9.225 4.725C9.3625 4.875 9.43438 5.05 9.44063 5.25C9.44688 5.45 9.375 5.625 9.225 5.775L6.525 8.475C6.45 8.55 6.36875 8.60312 6.28125 8.63437C6.19375 8.66562 6.1 8.68125 6 8.68125ZM1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V9C0 8.7875 0.071875 8.60938 0.215625 8.46563C0.359375 8.32188 0.5375 8.25 0.75 8.25C0.9625 8.25 1.14062 8.32188 1.28437 8.46563C1.42813 8.60938 1.5 8.7875 1.5 9V10.5H10.5V9C10.5 8.7875 10.5719 8.60938 10.7156 8.46563C10.8594 8.32188 11.0375 8.25 11.25 8.25C11.4625 8.25 11.6406 8.32188 11.7844 8.46563C11.9281 8.60938 12 8.7875 12 9V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5Z"
                                fill="#333333"
                            />
                        </svg>
                        Download CSV File
                    </a>

                    <button
                        onClick={() => {
                            handleUpload();
                        }}
                        className="bg-blue text-white text-[12px] font-[600] px-4 py-2 rounded-[30px] "
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BulkUploadPopUp;
