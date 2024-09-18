import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LimitUsedModal from '../../../components/models/limitUsedModal';

function Description({ selectedJob, filter,setLimitPopup }) {
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    const [appliedJobs, setAppliedJobs] = useState()
    // const [limitPopup, setLimitPopup] = useState(false)
    const jobApplyCount = JSON.parse(localStorage.getItem("jobsApply"));
    const getData = () => {
        axios
            .get(`http://localhost:2000/api/job/getAppliedJobs/${userDataGlobal._id}`)
            .then((res) => setAppliedJobs(res.data))
            .catch((err) => console.error(err));

    }
    useEffect(() => {
        if (userDataGlobal._id) {
            getData();
        }
    }, [userDataGlobal]);


    return (
        <>
            <div>
                {selectedJob && (
                    <>
                        <div
                            className={`flex flex-col `}
                        >
                            <div
                                className="p-[16px]  border-[1px] border-[#06A9EF] bg-[#fff] rounded-[8px] flex flex-col gap-[16px]  "
                                style={{
                                    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                <div
                                    style={{
                                        borderBottom: "1px solid #646464",
                                    }}
                                >
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="text-[#333] text-[20px] font-[500]">
                                            {selectedJob.jobTitle}
                                        </div>

                                        <div className="text-[#333] text-[14px] font-[500]">
                                            {selectedJob.companyName}
                                        </div>

                                        <div className="flex flex-row gap-[4px] text-[#333] text-[12px] font-[400]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="15"
                                                viewBox="0 0 14 15"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_4475_58296)">
                                                    <path
                                                        d="M6.93699 7.50042C7.25707 7.50042 7.53108 7.38618 7.75902 7.15771C7.98695 6.92924 8.10092 6.65458 8.10092 6.33375C8.10092 6.01292 7.98695 5.73826 7.75902 5.50979C7.53108 5.28132 7.25707 5.16708 6.93699 5.16708C6.61691 5.16708 6.3429 5.28132 6.11496 5.50979C5.88702 5.73826 5.77305 6.01292 5.77305 6.33375C5.77305 6.65458 5.88702 6.92924 6.11496 7.15771C6.3429 7.38618 6.61691 7.50042 6.93699 7.50042ZM6.93699 11.7879C8.12032 10.699 8.99812 9.70979 9.57039 8.82021C10.1427 7.93063 10.4288 7.1407 10.4288 6.45042C10.4288 5.3907 10.0917 4.52299 9.41762 3.84729C8.74351 3.1716 7.91663 2.83375 6.93699 2.83375C5.95734 2.83375 5.13046 3.1716 4.45635 3.84729C3.78224 4.52299 3.44518 5.3907 3.44518 6.45042C3.44518 7.1407 3.73132 7.93063 4.30359 8.82021C4.87585 9.70979 5.75365 10.699 6.93699 11.7879ZM6.93699 13.3338C5.37538 12.0018 4.20902 10.7647 3.43791 9.62229C2.6668 8.47993 2.28125 7.42264 2.28125 6.45042C2.28125 4.99208 2.74925 3.83028 3.68525 2.965C4.62124 2.09972 5.70516 1.66708 6.93699 1.66708C8.16882 1.66708 9.25273 2.09972 10.1887 2.965C11.1247 3.83028 11.5927 4.99208 11.5927 6.45042C11.5927 7.42264 11.2072 8.47993 10.4361 9.62229C9.66496 10.7647 8.4986 12.0018 6.93699 13.3338Z"
                                                        fill="#333333"
                                                    />
                                                </g>
                                            </svg>
                                            {selectedJob?.country?.join(', ')} ||  {selectedJob?.location?.join(', ')}
                                        </div>
                                    </div>
                                    <div className="py-[16px] flex gap-2 leading-tight">
                                        <button
                                        disabled={appliedJobs?.some(job => job._id === selectedJob._id)}
                                            onClick={() => {
                                                if (jobApplyCount > 0) {
                                                    if (!appliedJobs?.some(job => job._id === selectedJob._id)) {
                                                        router.push(`/jobs/home/ApplyForm?id=${selectedJob._id}`);
                                                    }
                                                } else {
                                                    setLimitPopup(true);
                                                }
                                            }}
                                          
                                            className={`text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[8px] px-[16px] rounded-[30px] ${appliedJobs?.some(job => job._id === selectedJob._id) ? "cursor-not-allowed" : " cursor-pointer"}`}                                    >

                                            {appliedJobs?.some(job => job._id === selectedJob._id) ? "Applied" : "Apply Now"}
                                        </button>

                                        {/* <button className="text-[14px] font-[600] flex items-center border border-[#06A9EF] py-[8px] px-[16px] rounded-[30px]">
                            Save
                          </button> */}
                                    </div>
                                </div>
                                <div
                                    className="pb-[12px]"
                                    style={{
                                        borderBottom: "1px solid #646464",
                                    }}
                                >
                                    <div className="text-[20px] text-[500] text-[#333]">
                                        Job Details
                                    </div>
                                    <div className="flex flex-row gap-[5px] text-[12px] text-[#333] font-[500]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="14"
                                            viewBox="0 0 16 14"
                                            fill="none"
                                        >
                                            <g mask="url(#mask0_4475_58307)">
                                                <path
                                                    d="M2.45709 12.2504C2.11279 12.2504 1.81804 12.1362 1.57286 11.9077C1.32767 11.6792 1.20508 11.4046 1.20508 11.0837V4.66705C1.20508 4.34622 1.32767 4.07157 1.57286 3.84309C1.81804 3.61462 2.11279 3.50039 2.45709 3.50039H4.96113V2.33372C4.96113 2.01289 5.08372 1.73823 5.32891 1.50976C5.57409 1.28129 5.86884 1.16705 6.21314 1.16705H8.71717C9.06148 1.16705 9.35622 1.28129 9.60141 1.50976C9.8466 1.73823 9.96919 2.01289 9.96919 2.33372V3.50039H12.4732C12.8175 3.50039 13.1123 3.61462 13.3575 3.84309C13.6026 4.07157 13.7252 4.34622 13.7252 4.66705V11.0837C13.7252 11.4046 13.6026 11.6792 13.3575 11.9077C13.1123 12.1362 12.8175 12.2504 12.4732 12.2504H2.45709ZM2.45709 11.0837H12.4732V4.66705H2.45709V11.0837ZM6.21314 3.50039H8.71717V2.33372H6.21314V3.50039Z"
                                                    fill="#333333"
                                                />
                                            </g>
                                        </svg>
                                        {selectedJob.jobType}
                                    </div>
                                    {/* <div className="flex flex-row gap-[5px] text-[12px] text-[#333] font-[500]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                          >
                            <g mask="url(#mask0_4475_58313)">
                              <path
                                d="M4.96106 11.6671H9.96913V9.91705C9.96913 9.27539 9.72394 8.72608 9.23357 8.26914C8.74319 7.81219 8.1537 7.58372 7.4651 7.58372C6.77649 7.58372 6.187 7.81219 5.69662 8.26914C5.20625 8.72608 4.96106 9.27539 4.96106 9.91705V11.6671ZM7.4651 6.41705C8.1537 6.41705 8.74319 6.18858 9.23357 5.73164C9.72394 5.27469 9.96913 4.72539 9.96913 4.08372V2.33372H4.96106V4.08372C4.96106 4.72539 5.20625 5.27469 5.69662 5.73164C6.187 6.18858 6.77649 6.41705 7.4651 6.41705ZM2.45703 12.8337V11.6671H3.70905V9.91705C3.70905 9.324 3.85772 8.7674 4.15508 8.24726C4.45243 7.72712 4.86716 7.3115 5.39927 7.00039C4.86716 6.68928 4.45243 6.27365 4.15508 5.75351C3.85772 5.23337 3.70905 4.67678 3.70905 4.08372V2.33372H2.45703V1.16705H12.4732V2.33372H11.2211V4.08372C11.2211 4.67678 11.0725 5.23337 10.7751 5.75351C10.4778 6.27365 10.063 6.68928 9.53092 7.00039C10.063 7.3115 10.4778 7.72712 10.7751 8.24726C11.0725 8.7674 11.2211 9.324 11.2211 9.91705V11.6671H12.4732V12.8337H2.45703Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                          Permanent
                        </div> */}
                                </div>
                                {/* <div
                        className="flex flex-col gap-[10px] pb-[6px]"
                        style={{
                          borderBottom: "1px solid #646464",
                        }}
                      >
                        <div className="text-[20px] font-[500]">
                          Qualifications
                        </div>
                        <div className="text-[12px] font-[500]">
                          B.e (computer science) <br /> Total Work Experience 2
                          Years (Required)
                        </div>
                      </div> */}
                                {selectedJob?.description?.length > 0 && (
                                    <div className="flex flex-col gap-[8px]">
                                        <div className="text-[20px] font-[500]">
                                            Full job Description
                                        </div>
                                        <div className="text-[12px] text-[400] gap-[8px] flex flex-col">
                                            {selectedJob.description}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                      disabled={appliedJobs?.some(job => job._id === selectedJob._id)}
                                        onClick={() => {
                                            if (jobApplyCount > 0) {
                                                if (!appliedJobs?.some(job => job._id === selectedJob._id)) {
                                                    router.push(`/jobs/home/ApplyForm?id=${selectedJob._id}`);
                                                }
                                            } else {
                                                setLimitPopup(true);
                                            }
                                        }}

                                        className={`text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[8px] px-[16px] rounded-[30px] ${appliedJobs?.some(job => job._id === selectedJob._id) ? "cursor-not-allowed" : " cursor-pointer"}`}                                    >
                                        {appliedJobs?.some(job => job._id === selectedJob._id) ? "Applied" : "Apply Now"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}



            </div>

           
        </>
    )
}

export default Description
