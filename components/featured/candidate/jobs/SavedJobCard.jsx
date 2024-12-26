import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';

import { CountPostingDays } from '../../../../utils/data';
import MiniLoader from '../../../common/mini-loader';
import { fetchUserData } from '../../../../Redux/slices/userSlice';

function SavedJobCard({ setSelectedJob, selectedJob, appliedJobs, setLimit, limit, savedJobList, totalPages, page, setPage, setMiniloading, miniLoading, getData }) {

     const { profileData } = useSelector((state) => state.profile.profileData);      
        const { userDataGlobal } = useSelector((state) => state.user.userData);


    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();


    const nextPage = (e) => {
        e.stopPropagation();
        setMiniloading(true)
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setPage(currentPage + 1);
        }
    };

    const prevPage = (e) => {
        e.stopPropagation();
        setMiniloading(true)
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPage(currentPage - 1);
        }
    };
    const handleChange = (e) => {
        setMiniloading(true)
        setLimit(parseInt(e.target.value));
        setPage(1)
        setCurrentPage(1)

    };



    const removeSavedJob = async (e, id) => {
        e.stopPropagation();
        try {
            const res = await axios.post(
                `http://localhost:2000/api/removeSavedJob/${userDataGlobal?._id}/${id}`
            );
            await dispatch(fetchUserData());
            await getData();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="flex flex-col gap-4">
            <div
                className={`flex flex-col rounded-md border-primary  `}

            >
                <div className=" flex flex-col gap-5 leading-tight ">
                    {savedJobList?.map((item, index) => (
                        <>
                            <div
                                onClick={() => {
                                    router.push(`/jobs/candidate/JobDetails?id=${item._id}`)
                                }}
                                className={`p-[16px] flex flex-col gap-[8px] bg-white relative z-0  rounded-[12px] `}
                                style={{
                                    boxShadow: "0px 0px 14px 0px #00000005"
                                }}
                                key={index}
                            >
                                <div className=" flex flex-col gap-[16px] ">
                                    <div className="flex flex-row">
                                        <div className="flex flex-col gap-[4px] w-full">
                                            <div className="xxsm:text-[16px] sm:text-[20px] font-medium">
                                                {item?.jobTitle}
                                            </div>
                                            <div className="text-[12px] font-medium">
                                                {item?.companyName}
                                            </div>
                                        </div>
                                        {item.logo && (
                                            <div className="flex flex-row  items-end">
                                                <img
                                                    src={item.logo}
                                                    alt=""
                                                    style={{
                                                        height: "56px",
                                                        width: "56px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-row gap-[11px] items-center leading-tight  flex-wrap ">
                                        {item?.experience && (
                                            <>
                                                {" "}
                                                <div className="flex flex-row gap-[4px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 15"
                                                        fill="none"
                                                    >
                                                        <g mask="url(#mask0_4135_57914)">
                                                            <path
                                                                d="M2.33073 12.7503C2.0099 12.7503 1.73524 12.6361 1.50677 12.4076C1.2783 12.1792 1.16406 11.9045 1.16406 11.5837V5.16701C1.16406 4.84617 1.2783 4.57152 1.50677 4.34305C1.73524 4.11458 2.0099 4.00034 2.33073 4.00034H4.66406V2.83367C4.66406 2.51284 4.7783 2.23819 5.00677 2.00972C5.23524 1.78124 5.5099 1.66701 5.83073 1.66701H8.16406C8.48489 1.66701 8.75955 1.78124 8.98802 2.00972C9.21649 2.23819 9.33073 2.51284 9.33073 2.83367V4.00034H11.6641C11.9849 4.00034 12.2595 4.11458 12.488 4.34305C12.7165 4.57152 12.8307 4.84617 12.8307 5.16701V11.5837C12.8307 11.9045 12.7165 12.1792 12.488 12.4076C12.2595 12.6361 11.9849 12.7503 11.6641 12.7503H2.33073ZM2.33073 11.5837H11.6641V5.16701H2.33073V11.5837ZM5.83073 4.00034H8.16406V2.83367H5.83073V4.00034Z"
                                                                fill="#646464"
                                                            />
                                                        </g>
                                                    </svg>

                                                    <div className="text-[#262626] text-[12px] font-[400] ">
                                                        {item.experience}
                                                    </div>
                                                </div>
                                                <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                                            </>
                                        )}
                                        {item?.jobType && (
                                            <>
                                                <div className="flex flex-row gap-[4px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 15"
                                                        fill="none"
                                                    >
                                                        <g mask="url(#mask0_4135_57920)">
                                                            <path
                                                                d="M4.66732 12.167H9.33398V10.417C9.33398 9.77534 9.10551 9.22604 8.64857 8.76909C8.19162 8.31215 7.64232 8.08367 7.00065 8.08367C6.35898 8.08367 5.80968 8.31215 5.35273 8.76909C4.89579 9.22604 4.66732 9.77534 4.66732 10.417V12.167ZM7.00065 6.91701C7.64232 6.91701 8.19162 6.68854 8.64857 6.23159C9.10551 5.77465 9.33398 5.22534 9.33398 4.58367V2.83367H4.66732V4.58367C4.66732 5.22534 4.89579 5.77465 5.35273 6.23159C5.80968 6.68854 6.35898 6.91701 7.00065 6.91701ZM2.33398 13.3337V12.167H3.50065V10.417C3.50065 9.82395 3.63919 9.26735 3.91628 8.74722C4.19336 8.22708 4.57982 7.81145 5.07565 7.50034C4.57982 7.18923 4.19336 6.77361 3.91628 6.25347C3.63919 5.73333 3.50065 5.17673 3.50065 4.58367V2.83367H2.33398V1.66701H11.6673V2.83367H10.5007V4.58367C10.5007 5.17673 10.3621 5.73333 10.085 6.25347C9.80794 6.77361 9.42148 7.18923 8.92565 7.50034C9.42148 7.81145 9.80794 8.22708 10.085 8.74722C10.3621 9.26735 10.5007 9.82395 10.5007 10.417V12.167H11.6673V13.3337H2.33398Z"
                                                                fill="#646464"
                                                            />
                                                        </g>
                                                    </svg>
                                                    <div className="text-[#262626] text-[12px] font-[400]">
                                                        {item.jobType}
                                                    </div>
                                                </div>
                                                <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                                            </>
                                        )}
                                        {item?.location && (
                                            <div className="flex flex-row gap-[4px]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 15"
                                                    fill="none"
                                                >
                                                    <g mask="url(#mask0_4135_57926)">
                                                        <path
                                                            d="M7.00065 7.50034C7.32148 7.50034 7.59614 7.38611 7.82461 7.15763C8.05308 6.92916 8.16732 6.65451 8.16732 6.33367C8.16732 6.01284 8.05308 5.73819 7.82461 5.50972C7.59614 5.28124 7.32148 5.16701 7.00065 5.16701C6.67982 5.16701 6.40516 5.28124 6.17669 5.50972C5.94822 5.73819 5.83398 6.01284 5.83398 6.33367C5.83398 6.65451 5.94822 6.92916 6.17669 7.15763C6.40516 7.38611 6.67982 7.50034 7.00065 7.50034ZM7.00065 11.7878C8.18676 10.699 9.06662 9.70972 9.64023 8.82013C10.2138 7.93055 10.5007 7.14062 10.5007 6.45034C10.5007 5.39062 10.1628 4.52291 9.48711 3.84722C8.81141 3.17152 7.9826 2.83367 7.00065 2.83367C6.01871 2.83367 5.18989 3.17152 4.51419 3.84722C3.8385 4.52291 3.50065 5.39062 3.50065 6.45034C3.50065 7.14062 3.78746 7.93055 4.36107 8.82013C4.93468 9.70972 5.81454 10.699 7.00065 11.7878ZM7.00065 13.3337C5.43537 12.0017 4.26628 10.7646 3.49336 9.62222C2.72044 8.47986 2.33398 7.42256 2.33398 6.45034C2.33398 4.99201 2.80308 3.8302 3.74128 2.96492C4.67947 2.09965 5.76593 1.66701 7.00065 1.66701C8.23537 1.66701 9.32183 2.09965 10.26 2.96492C11.1982 3.8302 11.6673 4.99201 11.6673 6.45034C11.6673 7.42256 11.2809 8.47986 10.5079 9.62222C9.73503 10.7646 8.56593 12.0017 7.00065 13.3337Z"
                                                            fill="#646464"
                                                        />
                                                    </g>
                                                </svg>
                                                <div className="text-[#262626] text-[12px] font-[400]">
                                                    {item.country.join(", ")} || {item.location.join(", ")}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-row gap-[4px]">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_4135_57931)">
                                                    <path
                                                        d="M4.375 10.675H9.625V9.45H4.375V10.675ZM4.375 8.225H9.625V7H4.375V8.225ZM3.0625 13.125C2.70156 13.125 2.39258 13.0051 2.13555 12.7652C1.87852 12.5253 1.75 12.2369 1.75 11.9V2.1C1.75 1.76313 1.87852 1.47474 2.13555 1.23484C2.39258 0.994948 2.70156 0.875 3.0625 0.875H8.3125L12.25 4.55V11.9C12.25 12.2369 12.1215 12.5253 11.8645 12.7652C11.6074 13.0051 11.2984 13.125 10.9375 13.125H3.0625ZM7.65625 5.1625V2.1H3.0625V11.9H10.9375V5.1625H7.65625Z"
                                                        fill="#646464"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text-[#262626] font-[400] text-[12px]">
                                            {item?.description?.length > 80
                                                ? `${item.description.slice(0, 80)}...`
                                                : item.description}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between items-center  p-1">
                                    {appliedJobs?.some(appliedJob => appliedJob._id === item._id) ? (
                                        <div className="text-[12px] text-[#333333] font-[500] font-Montserrat flex flex-row gap-2 items-center">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                <g mask="url(#mask0_5716_127442)">
                                                    <path d="M7.22917 18.5L5.66667 15.9167L2.72917 15.25L3 12.25L1 10L3 7.75L2.72917 4.75L5.66667 4.08333L7.22917 1.5L10 2.6875L12.7708 1.5L14.3333 4.08333L17.2708 4.75L17 7.75L19 10L17 12.25L17.2708 15.25L14.3333 15.9167L12.7708 18.5L10 17.3125L7.22917 18.5ZM7.83333 16.6042L10 15.6875L12.1667 16.6042L13.375 14.5833L15.6667 14.0625L15.4583 11.75L17 10L15.4583 8.25L15.6667 5.9375L13.375 5.41667L12.1667 3.39583L10 4.3125L7.83333 3.39583L6.625 5.41667L4.33333 5.91667L4.54167 8.25L3 10L4.5625 11.75L4.33333 14.0833L6.625 14.6042L7.83333 16.6042ZM8.9375 13L13.8958 8.0625L12.8333 7L8.9375 10.875L7.16667 9.125L6.10417 10.1875L8.9375 13Z" fill="#0C8A0A" />
                                                </g>
                                            </svg>

                                            Applied {CountPostingDays(
                                                appliedJobs
                                                    ?.find((job) => job._id === item._id)
                                                    ?.applications?.find((application) => application?.applicantId === userDataGlobal._id)
                                                    ?.appliedOn
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-[12px] text-[#333333] font-[500] font-Montserrat">
                                            Posted {CountPostingDays(item.createdAt)}
                                        </div>
                                    )}

                                    <div>

                                        <svg
                                            onClick={(e) => removeSavedJob(e, item._id)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            className=' cursor-pointer'
                                            height="18"
                                            viewBox="0 0 14 18"
                                            fill="none"
                                        >
                                            <path
                                                d="M0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V18L7 15L0 18Z"
                                                fill="#333333"
                                            />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div className="sm:px-[16px] px-0 w-full justify-between flex ">
                <div className="flex items-center sm:gap-4 gap-2">
                    <p className="text-[14px] text-[#646464] font-600">View</p>
                    <div className="flex gap-[8px] items-center">
                        {/* <p className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600">{limit}</p> */}


                        <select
                            value={limit}
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleChange}
                            className="text-[14px] px-[16px] py-[10px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600"
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>



                    </div>
                    <p className="text-[14px] sm:block hidden text-[#646464] font-[600]">Jobs per page</p>
                </div>

                <div className="flex items-center" style={{ radious: '0px 0px 16px 16px' }} >

                    <div className="mr-4">{miniLoading && <MiniLoader />}</div>

                    <p className="text-[14px] text-[#646464] font-[500]">pages<span className="text-[#333] px-[10px] font-[600]" >{currentPage}</span> of <span className="text-[#333] px-[10px]  font-[600]">{totalPages}</span></p>
                    <button
                        disabled={currentPage === 1}
                    >
                        <svg onClick={(e) => prevPage(e)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2529_10517)">
                                <path d="M15 6L9 12L15 18" stroke={
                                    currentPage !== 1 ? "#333333" :
                                        "#646464"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2529_10517">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                    >
                        <svg width="25" height="24"
                            onClick={(e) => nextPage(e)} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2529_10530)">
                                <path d="M9.375 6L15.625 12L9.375 18" stroke={
                                    currentPage !== totalPages ? "#333333" :
                                        "#646464"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2529_10530">
                                    <rect width="25" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default SavedJobCard
