import React from "react";
import { MdLocationOn, MdWork, MdSchool } from "react-icons/md";
import { PDFSvg, PDFSvg1 } from "../../utils/svg";
import { useRouter } from "next/router";

const CandidateCard = ({ candidate, save, setSelectedCandidates, selectedCandidates, allSave }) => {
    const {
        basics,
        workExperiance,
        education,
        resumeUrl,
        jobPrefrences,
        skills,
        userId


    } = candidate;

    const router= useRouter()

    const downloadResume = async (resumeUrl, firstName, lastName) => {
        try {
            if (!resumeUrl) {
                return alert("No resume available for download.");
            }


            const response = await fetch(resumeUrl);
            if (!response.ok) {
                throw new Error(`Error fetching resume: ${response.status}`);
            }

            const blob = await response.blob();

            const filename = `${firstName || "Candidate"}_${lastName || "Resume"}.pdf`;

            const link = document.createElement("a");
            const fileUrl = URL.createObjectURL(blob);
            link.href = fileUrl;
            link.download = filename;


            document.body.appendChild(link);
            link.click();


            document.body.removeChild(link);
            URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.error(error);
            alert("Error downloading resume. Please try again.");
        }
    };


    const getTotalExperience = (candidate) => {
        const jobs = candidate?.workExperiance || [];

        let totalMonths = 0;

        jobs.forEach(job => {
            const start = job?.jobDuration?.startDate;
            const end = job?.jobDuration?.endDate;
            const isCurrent = job?.isCurrent;

            if (!start?.year || !start?.month) return;

            const startDate = new Date(start.year, start.month - 1);
            const endDate = isCurrent
                ? new Date()
                : end?.year && end?.month
                    ? new Date(end.year, end.month - 1)
                    : new Date();

            const months =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());

            totalMonths += Math.max(0, months);
        });

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        return totalMonths > 0 ? `${years}y ${months}m` : "Fresher";
    };

    const currentJob = workExperiance?.find((exp) => exp.isCurrent);

    const topEdu = education?.[0];
    const keySkills = skills?.map((s) => s.label).join(" | ");
    const locations = jobPrefrences?.preferedLocation?.map((l) => l.location).join(", ");

    const handleCheckboxChange = (candidate) => {
        setSelectedCandidates((prev) => {
            const isSelected = prev.some((c) => c._id === candidate._id);
            if (isSelected) {
                // Remove candidate
                return prev.filter((c) => c._id !== candidate._id);
            } else {
                // Add candidate
                return [...prev, candidate];
            }
        });
    };


    return (
        <div className="border border-[#DEDEDE] rounded-lg p-4  shadow-sm bg-white flex justify-between">

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-lg font-medium">
                    {/* <input
                        type="checkbox"
                        checked={selectedCandidates?.some((c) => c._id === candidate._id)}
                        onChange={() => handleCheckboxChange(candidate)}
                        className="rounded border h-[16px] w-[16px] cursor-pointer"
                    /> */}
                    <div 
                    // onClick={()=>router.push(`/findCandidates/showProfile?id=${userId}`)}
                    //  className=" cursor-pointer"
                     >
                        {basics?.firstName} {basics?.lastName}
                    </div>

                </div>
                <div className="text-[12px] text-gray-600 flex items-center gap-2 mt-1">
                    <svg width="16" height="14" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.97176 17.4999C1.46663 17.4999 1.03906 17.3249 0.689063 16.9749C0.339063 16.6249 0.164062 16.1973 0.164062 15.6922V5.30765C0.164062 4.80252 0.339063 4.37495 0.689063 4.02495C1.03906 3.67495 1.46663 3.49995 1.97176 3.49995H6.16406V1.80768C6.16406 1.30256 6.33906 0.875 6.68906 0.525C7.03906 0.175 7.46663 0 7.97176 0H11.3563C11.8614 0 12.289 0.175 12.639 0.525C12.989 0.875 13.164 1.30256 13.164 1.80768V3.49995H17.3563C17.8614 3.49995 18.289 3.67495 18.639 4.02495C18.989 4.37495 19.164 4.80252 19.164 5.30765V15.6922C19.164 16.1973 18.989 16.6249 18.639 16.9749C18.289 17.3249 17.8614 17.4999 17.3563 17.4999H1.97176ZM7.66404 3.49995H11.664V1.80768C11.664 1.73074 11.632 1.66023 11.5679 1.59613C11.5038 1.53201 11.4332 1.49995 11.3563 1.49995H7.97176C7.89483 1.49995 7.8243 1.53201 7.76019 1.59613C7.69609 1.66023 7.66404 1.73074 7.66404 1.80768V3.49995ZM17.664 11.7499H12.164V13.4999H7.16406V11.7499H1.66404V15.6922C1.66404 15.7691 1.69609 15.8397 1.76019 15.9038C1.8243 15.9679 1.89483 15.9999 1.97176 15.9999H17.3563C17.4332 15.9999 17.5038 15.9679 17.5679 15.9038C17.632 15.8397 17.664 15.7691 17.664 15.6922V11.7499ZM8.66404 11.9999H10.664V9.99993H8.66404V11.9999ZM1.66404 10.25H7.16406V8.49995H12.164V10.25H17.664V5.30765C17.664 5.23072 17.632 5.16019 17.5679 5.09608C17.5038 5.03198 17.4332 4.99993 17.3563 4.99993H1.97176C1.89483 4.99993 1.8243 5.03198 1.76019 5.09608C1.69609 5.16019 1.66404 5.23072 1.66404 5.30765V10.25Z" fill="#333333" />
                    </svg>
                    {getTotalExperience(candidate)} &nbsp;{currentJob?.currentCTC && `| ₹${currentJob.currentCTC}`}
                    {basics?.currentLocation && "|"}
                    {basics?.currentLocation && (

                        <span className="flex items-center gap-1">

                            <svg
                                width="12"
                                height="16"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.66694 9.86535C8.16452 9.86535 8.58991 9.68818 8.94311 9.33385C9.29631 8.97952 9.47291 8.55356 9.47291 8.05598C9.47291 7.55839 9.29575 7.133 8.94141 6.7798C8.58708 6.4266 8.16112 6.25 7.66354 6.25C7.16595 6.25 6.74056 6.42717 6.38736 6.7815C6.03416 7.13583 5.85756 7.56179 5.85756 8.05938C5.85756 8.55696 6.03473 8.98235 6.38906 9.33555C6.7434 9.68875 7.16935 9.86535 7.66694 9.86535ZM7.66524 17.5135C9.62164 15.7622 11.1188 14.0824 12.1566 12.474C13.1944 10.8657 13.7133 9.45703 13.7133 8.24805C13.7133 6.42498 13.1341 4.92627 11.9758 3.7519C10.8175 2.57753 9.38062 1.99035 7.66524 1.99035C5.94985 1.99035 4.513 2.57753 3.35466 3.7519C2.19633 4.92627 1.61716 6.42498 1.61716 8.24805C1.61716 9.45703 2.13607 10.8657 3.17389 12.474C4.21172 14.0824 5.70884 15.7622 7.66524 17.5135ZM7.66524 19.5096C5.14859 17.3288 3.26141 15.2993 2.00371 13.4211C0.746029 11.5429 0.117188 9.81857 0.117188 8.24805C0.117188 5.94038 0.863662 4.07213 2.35661 2.64328C3.84955 1.21443 5.61909 0.5 7.66524 0.5C9.71139 0.5 11.4809 1.21443 12.9739 2.64328C14.4668 4.07213 15.2133 5.94038 15.2133 8.24805C15.2133 9.81857 14.5844 11.5429 13.3268 13.4211C12.0691 15.2993 10.1819 17.3288 7.66524 19.5096Z"
                                    fill="#333333"
                                />
                            </svg>
                            {basics.currentLocation}
                        </span>
                    )}

                </div>

                {/* {currentJob && */}
                <div className="mt-2 text-[12px] flex">
                    <div className="w-[100px] font-medium">Current</div>
                    <div className="flex-1">
                        {
                            currentJob?.jobTitle || currentJob?.companyName
                                ? (
                                    <>
                                        {currentJob?.jobTitle && currentJob.jobTitle !== "N/A" ? currentJob.jobTitle : ""}
                                        {currentJob?.companyName && currentJob.companyName !== "N/A" ? ` at ${currentJob.companyName}` : ""}
                                    </>
                                )
                                : "N/A"
                        }

                    </div>
                </div>

                {/* } */}
                <div className="mt-1 text-[12px] flex">
                    <div className="w-[100px] font-medium">Education</div>
                    <div className="flex-1">
                        {topEdu?.education || topEdu?.institute
                            ? (
                                <>
                                    {topEdu?.education && topEdu.education !== "N/A" ? topEdu.education : ""}
                                    {topEdu?.institute && topEdu.institute !== "N/A" ? ` at ${topEdu.institute}` : ""}
                                </>
                            )
                            : "N/A"}
                    </div>
                </div>



                <div className="mt-1 text-[12px] flex">
                    <div className="w-[100px] font-medium">Pref. locations</div>
                    <div className="flex-1">
                        {locations && locations.trim() !== "" ? locations : "Any"}
                    </div>
                </div>



                <div className="mt-1 text-[12px] flex">
                    <div className="w-[100px] font-medium">Key skills</div>
                    <div className="flex-1 flex flex-wrap">
                        {skills?.length > 0 ? (
                            skills.map((s, i) => (
                                <span key={i} className="mr-1">
                                    {s.label}
                                    {i !== skills.length - 1 && " | "}
                                </span>
                            ))
                        ) : (
                            "N/A"
                        )}
                    </div>
                </div>



                {/* <div className="mt-3 flex items-center gap-3 text-[12px]">
                    {resumeUrl && (
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-medium underline"
                        >
                            View Resume
                        </a>
                    )}

                </div> */}
            </div>

            <div className="flex justify-between gap-4">
                <div className="text-center flex flex-col gap-4 items-center justify-between w-[200px]">
                    {candidate?.profilePicture?.img ?
                        <img
                            src={candidate?.profilePicture?.img}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border"
                        />
                        :
                        <svg width="56" height="56" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112Z" fill="#EFFAFF" />
                            <path d="M72.848 57.683C82.1817 49.1898 82.1817 35.4196 72.848 26.9264C63.5142 18.4332 48.3812 18.4332 39.0475 26.9264C29.7137 35.4196 29.7137 49.1898 39.0475 57.683C48.3812 66.1762 63.5142 66.1762 72.848 57.683Z" fill="#D4E5EF" />
                            <path d="M55.9997 112C73.0335 112 88.2887 104.393 98.5596 92.3928C93.1092 75.6573 76.1189 66.7705 55.9997 66.7705C35.8804 66.7705 18.89 75.6573 13.4397 92.3928C23.7105 104.393 38.9659 112 55.9997 112Z" fill="#D4E5EF" />
                        </svg>


                    }
                    <div className="flex-1 text-[12px] font-medium text-center">
                        {currentJob ?
                            <>
                                {currentJob?.jobTitle} {currentJob?.companyName && "at"} {currentJob?.companyName}</>
                            :
                            <>
                                {topEdu?.education} {topEdu?.institute && "at"} {topEdu?.institute}

                            </>
                        }
                    </div>
                    {resumeUrl &&
                        <div onClick={() => downloadResume(resumeUrl, basics?.firstName, basics?.lastName)} className="flex gap-2 text-[13px] font-medium items-center cursor-pointer">
                            <div className="flex h-[30px] w-[30px]">

                                <PDFSvg1 />
                            </div>

                            {basics?.firstName}_{basics?.lastName}.pdf
                        </div>
                    }
                </div>
                <div className=" h-full w-[1px] bg-[#DEDEDE]"></div>
                <div className="flex flex-col gap-4">
                    <button
                        disabled={!resumeUrl}
                        onClick={() => save(candidate)}
                        className={`p-2 rounded-full ${resumeUrl && "hover:bg-[#E9EEF6] hover:fill-black transition-colors cursor-pointer"}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className={`fill-[#8993a4] ${resumeUrl && "hover:fill-black"}`}
                        >
                            <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                    </button>

                    {/* <div className="p-2 rounded-full hover:bg-[#E9EEF6] hover:fill-black transition-colors cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className="fill-[#8993a4] hover:fill-black"
                        >
                            <path d="m640-280-57-56 184-184-184-184 57-56 240 240-240 240ZM80-200v-160q0-83 58.5-141.5T280-560h247L383-704l57-56 240 240-240 240-57-56 144-144H280q-50 0-85 35t-35 85v160H80Z" />
                        </svg>
                    </div> */}
                </div>

            </div>
        </div>
    );
};

export default CandidateCard;
