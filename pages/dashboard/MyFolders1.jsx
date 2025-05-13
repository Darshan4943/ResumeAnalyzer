import React, { useState } from "react";

import { dateSeter, fileIconSeter, fileIconSeter1 } from "../../utils/middleware";
import MiniLoader from "../../components/common/mini-loader";
import axios from "axios";
import { toast } from "react-toastify";

function MyFolders1({
    toggleSelect,
    isList,
    tab,
    tabIndex,
    data,
    files,

    selectedIndexes,
    openFolder,
}) {

    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [select, setSelect] = useState(false);
    const [selectedApplicants, setSelectedApplicants] = useState([]);
   
    const [selectAll, setSelectAll] = useState(false);
    function sortFoldersAndFiles(data) {
        return data.sort((a, b) => {
            if (a.type === b.type) {
                return 0;
            }
            return a.type === "folder" ? -1 : 1;
        });
    }
    const handleCheckboxChange = (applicant) => {
        setSelectedApplicants((prevSelected) => {
            const isSelected = prevSelected.find((item) => item._id === applicant._id);
            if (isSelected) {
                return prevSelected.filter((item) => item._id !== applicant._id);
            } else {
                return [...prevSelected, applicant];
            }
        });
    };

    // Handle 'select all' checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Select only applicants with paymentStatus !== true
            const unpaidApplicants = data.filter(applicant => !applicant.paymentStatus);
            setSelectedApplicants(unpaidApplicants);
        } else {
            setSelectedApplicants([]);
        }
        setSelectAll(e.target.checked);
    };
    
    const handleSendMail = async (applicants) => {
        setLoading1(true)
        try {
            const response = await axios.post('http://localhost:2000/api/sendEvaluationMail', {
                userData: applicants.map((app) => ({
                    email: app?.enhancedVersion?.email,
                    evaluationSummary: app?.evaluation,
                    id: app?._id,
                    myCollection: true,
                    resumeUrl: app.file

                })),
            });

            if (response.data.success) {
                toast.success("Email sent Successfully")
                setLoading1(false)

            }
        } catch (error) {
            console.error("Error sending email:", error);
            setLoading1(false)
        }
    };
    const handleSendIndividualMail = async (applicant) => {
        console.log(applicant)
        setLoading(applicant._id)
        try {
            const response = await axios.post('http://localhost:2000/api/sendEvaluationMail', {
                userData: [{
                    email: applicant?.enhancedVersion?.email,
                    evaluationSummary: applicant?.evaluation,
                    id: applicant?._id,
                    myCollection: true,
                    resumeUrl: applicant.file
                }]
            });

            if (response.data.success) {
                setLoading("")
                toast.success("Email sent Successfully")
            } else {
                setLoading("")
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setLoading("")
        }
    };

    return (
        <div className="h-[calc(85vh-180px)] overflow-y-auto">


            <div className="flex justify-end mb-4 gap-4">

                {select &&
                    <div className="flex gap-2 items-center text-[14px] font-medium">
                        <input
                            className="w-[16px] h-[16px]"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        Select All

                    </div>
                }
                <div
                    onClick={() => setSelect(!select)}
                    className=" flex gap-2 text-[14px] font-medium  items-center cursor-pointer bg-[#DEDEDE] px-3 rounded-[30px]"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g mask="url(#mask0_1148_17404)">
                            <path
                                d="M11.8548 15.3759C11.548 15.3759 11.2839 15.2651 11.0622 15.0435C10.8406 14.8219 10.7298 14.5577 10.7298 14.251V11.1067C10.7298 10.8 10.8406 10.5358 11.0622 10.3142C11.2839 10.0926 11.548 9.98175 11.8548 9.98175H14.999C15.3057 9.98175 15.5699 10.0926 15.7915 10.3142C16.0132 10.5358 16.124 10.8 16.124 11.1067V14.251C16.124 14.5577 16.0132 14.8219 15.7915 15.0435C15.5699 15.2651 15.3057 15.3759 14.999 15.3759H11.8548ZM11.8548 14.251H14.999V11.1067H11.8548V14.251ZM1.87402 13.2413V12.1163H8.33556V13.2413H1.87402ZM11.8548 8.02016C11.548 8.02016 11.2839 7.90935 11.0622 7.68773C10.8406 7.4661 10.7298 7.20193 10.7298 6.8952V3.75096C10.7298 3.44423 10.8406 3.18006 11.0622 2.95843C11.2839 2.7368 11.548 2.62598 11.8548 2.62598H14.999C15.3057 2.62598 15.5699 2.7368 15.7915 2.95843C16.0132 3.18006 16.124 3.44423 16.124 3.75096V6.8952C16.124 7.20193 16.0132 7.4661 15.7915 7.68773C15.5699 7.90935 15.3057 8.02016 14.999 8.02016H11.8548ZM11.8548 6.8952H14.999V3.75096H11.8548V6.8952ZM1.87402 5.88557V4.76059H8.33556V5.88557H1.87402Z"
                                fill="#333333"
                            />
                        </g>
                    </svg>

                    <p className="sm:block  hidden">Select</p>
                </div>
                {loading1 ?
                    <button
                        className="text-[14px] w-[108.49px] font-[500] flex items-center justify-center  rounded-[30px] bg_Button px-4 h-[40px]"

                    >
                        <MiniLoader />
                    </button>
                    :
                    <button
                        className="text-[14px] font-[500] rounded-[30px] bg-blue-500 text-white px-6 h-[40px] bg_Button"
                        onClick={() => handleSendMail(selectedApplicants)} // Send to selected applicants
                        disabled={selectedApplicants.length === 0}
                    >
                        Send Mail
                    </button>
                }
            </div>
            <div className="rounded-[16px] pt-2 flex flex-row gap-y-6 flex-wrap justify-start scr460:justify-start  w-full ">
                {data?.length > 0 ? (
                    <>

                        <table className="w-[100%] flex flex-col">
                            <thead className="flex w-full">
                                <tr className="flex w-full ">

                                    <th className="py-3 px-2 w-[15%] scr390:px-4 rounded-l-[12px] bg-[#C2E7FF] text-[12px] scr390:text-[14px]  text-left border-r border-[#FFF] font-medium">
                                        File Name
                                    </th>
                                    <th className="py-3 px-2 w-[20%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF] font-medium">
                                        Name
                                    </th>
                                    <th className="py-3 px-2 w-[10%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF] font-medium">
                                        Dial Code
                                    </th>
                                    <th className="py-3 px-2 w-[15%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF] font-medium">
                                        Mobile Number
                                    </th>
                                    <th className="py-3 px-2 w-[25%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF] font-medium">
                                        Email
                                    </th>
                                    <th className="py-3 px-2 w-[15%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF]  rounded-r-[12px] font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortFoldersAndFiles(data).map((item, index) => (
                                    <tr
                                        key={index}
                                        onClick={() =>
                                            openFolder(index, item._id, item.fileName, item)
                                        }
                                        className="cursor-pointer flex w-full"
                                    >
                                        <td className="px-2 group  w-[15%] break-all scr390:px-4 py-2 text-[12px] scr390:text-[14px] font-medium flex gap-2 relative items-center">

                                            {select && (
                                                <input
                                                    key={item.id}
                                                    className="w-[16px] h-[16px]"
                                                    type="checkbox"
                                                    checked={selectedApplicants.some((items) => items._id === item._id)}
                                                    onChange={() => handleCheckboxChange(item)}
                                                />
                                            )}
                                            <div className="h-[24px] min-w-[21px]">
                                                {fileIconSeter1(item)}
                                            </div>
                                            <span
                                                style={{ overflow: "hidden" }}
                                                className="text-[12px] scr390:text-[14px]">

                                                {item.fileName.length > 10
                                                    ? item.fileName.slice(0, 10) + " " + "..."
                                                    : item.fileName}

                                            </span>
                                            <div className="z-[200] absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break top-[35px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                                                {item.fileName}
                                            </div>
                                        </td>
                                        <td className="w-[20%] scr460:px-4 justify-between flex  items-center  text-[12px] scr390:text-[14px]">
                                            {item?.enhancedVersion?.firstName} {item?.enhancedVersion?.lastName}



                                        </td>
                                        <td className="w-[10%] scr460:px-4 justify-between flex  items-center text-[12px] scr390:text-[14px]">
                                            {item?.enhancedVersion?.dialCode}


                                        </td>
                                        <td className="w-[15%] scr460:px-4 justify-between flex  items-center  text-[12px] scr390:text-[14px]">
                                            {item?.enhancedVersion?.mobileNumber}


                                        </td>
                                        <td className="w-[25%] scr460:px-4 justify-between flex  items-center  text-[12px] scr390:text-[14px]">
                                            {item?.enhancedVersion?.email}


                                        </td>


                                        <td className="px-4 py-2 w-[15%] ">
                                            {item?.type !== "folder" &&
                                                <div className="flex  items-center justify-center gap-[8px]">
                                                    {loading === item._id ?
                                                        <button
                                                            className="text-[14px] font-[500] flex items-center justify-center w-[92.49px] rounded-[30px] bg_Button px-4 h-[40px]"

                                                        >
                                                            <MiniLoader />
                                                        </button>
                                                        :
                                                        <button
                                                            disabled={!item.isEvaluate || item.paymentStatus}
                                                            className={`text-[14px] font-[500] rounded-[30px] bg_Button px-4 h-[40px] ${(!item.isEvaluate || item.paymentStatus) && "opacity-50"}`}
                                                            onClick={() => handleSendIndividualMail(item)} // Send mail to individual
                                                        >
                                                            Send Mail
                                                        </button>
                                                    }
                                                </div>
                                            }
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </>
                ) : (



                    <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
                        <img
                            src="/images/noFile.png"
                            className="h-[300px] w-[375px]"
                            alt=""
                        />
                        <div className="text-[20px] font-medium text-[#808080]">
                            No Folders Available{" "}
                        </div>
                    </div>


                )}
            </div>


        </div>
    );
}

export default MyFolders1;
