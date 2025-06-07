import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import MiniLoader from "./mini-loader";
import { setWeek } from "date-fns";
import { defaultParameters } from "../../utils/data";

const ItemType = "PARAMETER";

const MatchingParameter = ({ item, index, moveItem, toggleItem, changePercentage }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });
    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, "");
        changePercentage(index, value === "" ? 0 : Number(value));
    };


    return (
        <div ref={(node) => ref(drop(node))} style={{ boxShadow: "0px 1px 4px 0px #00000040", cursor: "grab", }} className="flex items-center justify-between p-3 my-4 bg-white  rounded-[12px] ">
            <div className="flex flex-col gap-2 w-full">

                <div className="flex scr420:flex-row flex-col sm:items-center items-start justify-between gap-3">

                    <div className="flex items-center w-full   gap-3">

                        <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center rounded-full  font-[500] text-[14px] bg-[#C6EEFF]">{index + 1}</div>
                        <label className="switch min-w-[52px] ">
                            <input type="checkbox" checked={item.enabled} onChange={() => toggleItem(index)} />
                            <span className="slider round"></span>
                        </label>
                        <div className="font-semibold sm:text-[14px] text-[12px] block sm:w-[200px] scr420:w-[170px] w-full break-words">{item.label}</div>
                        <div className="font-[400] border border-[#DEDEDE] rounded-[8px] px-4 scr1168:flex hidden items-center text-[12px] break-words w-[600px] h-[46px] ">{item.description}  </div>
                    </div>
                    <div className="flex items-center   gap-3">

                        <div className=" text-center border border-[#DEDEDE] rounded-[8px] sm:h-[46px] h-[36px] flex items-center px-2">
                            <input
                                type="text"
                                value={item.percentage}
                                onChange={(e) => handleChange(e, index)}
                                className={` sm:w-[30px] w-[20px] sm:text-[16px] text-[12px] font-semibold ${!item.enabled ? ' cursor-not-allowed' : ''}`}
                                disabled={!item.enabled}
                            />
                            <span className="font-semibold sm:text-[16px] text-[12px]">%</span>

                        </div>
                        <div className="flex flex-col">
                            <button onClick={() => moveItem(index, index - 1)} disabled={index === 0}>
                                <ChevronUp className={`w-5 h-5 ${index === 0 ? "text-gray-400" : "text-black"}`} />
                            </button>
                            <button onClick={() => moveItem(index, index + 1)} disabled={index === 4}>
                                <ChevronDown className={`w-5 h-5 ${index === 4 ? "text-gray-400" : "text-black"}`} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="font-[400] border border-[#DEDEDE] rounded-[8px] px-4 scr1168:hidden flex  items-center text-[12px] break-words scr1168:w-[600px] py-1 w-full scr1168:h-[46px] ">{item.description}  </div>


            </div>

        </div>
    );
};

const JdParameters = ({ setOpenParamenters }) => {
    const { userDataGlobal } = useSelector((state) => state.user.userData);

    const [weightage, setWeightage] = useState(true)
    const [priority, setPriority] = useState(true)
    const [loading, setLoading] = useState(false)
    const [not100, setNot100] = useState(false)
    const [parameters, setParameters] = useState([
        {
            label: "Skills and Competencies",
            description:
                "Identify and highlight any skills and competencies in the resume that match the required and preferred skills and competencies in the job description.",
            percentage: 25,
            enabled: true,
        },
        {
            label: "Relevant Experience in the Required Field",
            description:
                "Compare the candidate's experience in the relevant field with the job requirements, noting any areas where the candidate meets, exceeds, or falls short of the required experience.",
            percentage: 20,
            enabled: true,
        },
        {
            label: "Roles and Responsibilities",
            description:
                "Evaluate the roles and responsibilities listed in the candidate's work experience and compare them with those required by the job description.",
            percentage: 15,
            enabled: true,
        },
        {
            label: "Objective and Professional Summary from Resume",
            description:
                "Assess the candidate's objective and professional summary in the resume to determine alignment with the job role and company values.",
            percentage: 5,
            enabled: true,
        },
        {
            label: "Total Experience",
            description:
                "Summarize the candidate's total professional experience, including all relevant fields, and compare it with the job requirements.",
            percentage: 10,
            enabled: true,
        },
        {
            label: "Educational Qualification",
            description:
                "Compare the candidate's educational qualifications with the required and preferred educational background mentioned in the job description.",
            percentage: 10,
            enabled: true,
        },
        {
            label: "Keywords",
            description:
                "Identify any keywords from the job description that are present in the candidate's resume.",
            percentage: 10,
            enabled: true,
        },
        {
            label: "Achievements",
            description:
                "Review the candidate's achievements and assess their relevance and impact in relation to the job role.",
            percentage: 5,
            enabled: true,
        },
    ]);



    useEffect(() => {
        const fetchJDParameters = async () => {

            try {
                const data = await axios.get(`https://jamblix.com/api/jdParameters/get/${userDataGlobal?._id}`);

                if (data?.data?.data?.parameters) {

                    setParameters(data?.data?.data?.parameters);
                    setPriority(data?.data?.data?.priority)
                    setWeightage(data?.data?.data?.weightage)
                }
            } catch (error) {
                console.error("Error loading JD Parameters");
            }

        };
        fetchJDParameters();
    }, [userDataGlobal?._id]);

    const addJDParameters = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`https://jamblix.com/api/jdParameters/add`, {
                userId: userDataGlobal?._id,
                parameters,
                weightage,
                priority
            });
            setLoading(false);
            setOpenParamenters(false)
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error("Error saving JD Parameters:", error.response?.data || error.message);
            throw error;
        }
    };

    const moveItem = (from, to) => {
        if (to < 0 || to >= parameters.length) return;
        const updated = [...parameters];
        const [movedItem] = updated.splice(from, 1);
        updated.splice(to, 0, movedItem);
        setParameters(updated);
    };

    // Toggle enable/disable state
    const toggleItem = (index) => {
        setParameters((prev) => {
            let updated = [...prev];
            updated[index].enabled = !updated[index].enabled;

            const activeItems = updated.filter((p) => p.enabled);
            const activeCount = activeItems.length;

            if (updated[index].enabled) {
                // Redistribute evenly when enabling
                const evenValue = Math.floor(100 / activeCount);
                const remainder = 100 % activeCount;

                updated = updated.map((p) => ({
                    ...p,
                    percentage: p.enabled ? evenValue : 0,
                }));

                // Add remainder to the last active item
                let lastIndex = -1;
                updated.forEach((p, i) => {
                    if (p.enabled) lastIndex = i;
                });
                updated[lastIndex].percentage += remainder;

            } else {
                // Disable: set its percentage to 0, and redistribute among others
                updated[index].percentage = 0;

                const activeItems = updated.filter((p) => p.enabled);
                const activeCount = activeItems.length;
                const evenValue = Math.floor(100 / activeCount);
                const remainder = 100 % activeCount;

                let activeIndex = 0;
                for (let i = 0; i < updated.length; i++) {
                    if (updated[i].enabled) {
                        updated[i].percentage = evenValue + (activeIndex === activeCount - 1 ? remainder : 0);
                        activeIndex++;
                    }
                }
            }

            return updated;
        });
    };

    const changePercentage = (index, newValue) => {
        setParameters((prev) => {
            const updated = [...prev];
            const value = Math.min(Math.max(Number(newValue), 0), 100); // Clamp between 0 and 100
            updated[index].percentage = value;

            const enabledIndices = updated.map((p, i) => (p.enabled ? i : null)).filter((i) => i !== null);
            const otherEnabled = enabledIndices.filter((i) => i !== index);

            const total = updated.reduce((sum, p) => sum + (p.enabled ? p.percentage : 0), 0);

            // If total exceeds 100, reduce last item to maintain 100
            if (total > 100 && otherEnabled.length) {
                const last = otherEnabled[otherEnabled.length - 1];
                const excess = total - 100;
                updated[last].percentage = Math.max(0, updated[last].percentage - excess);
            }

            // If total below 100, and this is last editable, try to fix it
            if (total < 100 && otherEnabled.length) {
                const last = otherEnabled[otherEnabled.length - 1];
                const missing = 100 - total;
                updated[last].percentage += missing;
            }

            return updated;
        });
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-fit h-[80vh] overflow-y-auto  bg-white rounded-[12px] relative ">
                <div className="flex ml:flex-row flex-col gap-2 justify-between ml:items-center items-start sticky top-0 scr540:px-6 px-2 pt-4 pb-2 bg-white z-[200]">
                    <div className="flex justify-between ml:w-fit w-full items-center">
                        <p className="text-[16px] font-semibold ">Set Matching Parameters</p>
                        <svg onClick={() => setOpenParamenters(false)} className=" cursor-pointer ml:hidden block " width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.29165 14.3917L0.125 13.225L5.84168 7.50833L0.125 1.79165L1.29165 0.625L7.00833 6.34168L12.725 0.625L13.8917 1.79165L8.17498 7.50833L13.8917 13.225L12.725 14.3917L7.00833 8.67498L1.29165 14.3917Z" fill="#333333" />
                        </svg>
                    </div>

                    <div className="flex scr540:flex-row flex-col justify-end scr540:gap-6 gap-2 scr540:items-center items-start">
                        {parameters.reduce((sum, p) => sum + (p.enabled ? p.percentage : 0), 0) !== 100 &&
                            <p className="text-[12px] font-medium text-red">
                                Total percentage of active toggles should be 100
                            </p>
                        }
                        <button onClick={() => setParameters(defaultParameters)} className="text-blue text-[14px] font-medium">
                            Default Parameters
                        </button>
                        <svg onClick={() => setOpenParamenters(false)} className=" cursor-pointer ml:block hidden" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.29165 14.3917L0.125 13.225L5.84168 7.50833L0.125 1.79165L1.29165 0.625L7.00833 6.34168L12.725 0.625L13.8917 1.79165L8.17498 7.50833L13.8917 13.225L12.725 14.3917L7.00833 8.67498L1.29165 14.3917Z" fill="#333333" />
                        </svg>

                    </div>

                </div>
                <div className="scr540:px-6 px-2 pb-6">

                    {parameters.map((item, index) => (
                        <MatchingParameter
                            key={index}
                            item={item}
                            index={index}
                            moveItem={moveItem}
                            toggleItem={toggleItem}
                            changePercentage={changePercentage}
                        />
                    ))}
                    <div className="w-full flex ml:flex-row flex-col gap-4 justify-between mt-6">
                        <div className=" flex gap-6 items-center ">



                            <div className=" flex gap-2 items-center">
                                <p className="text-[14px] font-medium">Weightage</p>
                                <label className="switch">
                                    <input type="checkbox" checked={weightage} onChange={() => setWeightage(!weightage)} />
                                    <span className="slider round"></span>
                                </label>

                            </div>
                            <div className=" flex gap-2 items-center">
                                <p className="text-[14px] font-medium">Priority</p>
                                <label className="switch">
                                    <input type="checkbox" checked={priority} onChange={() => setPriority(!priority)} />
                                    <span className="slider round"></span>
                                </label>

                            </div>
                            <p className=" text-[12px] ml:block hidden text-blue font-medium">Drag & Drop the options to adjust Priority</p>


                        </div>
                        <div className="ml:w-fit w-full flex  sm:flex-row flex-col gap-2 justify-between sm:items-center items-end">

                            <p className="block ml:hidden text-[12px] text-blue font-medium">Drag & Drop the options to adjust Priority</p>
                            <button onClick={addJDParameters} className="  bg_Button   rounded-[30px]  disabled:opacity-50 w-[152px] min-w-[152px] flex  justify-center items-center px-6 h-[38px]" disabled={parameters.reduce((sum, p) => sum + (p.enabled ? p.percentage : 0), 0) !== 100}>
                                {loading ?
                                    <MiniLoader /> :
                                    "Save Parameters"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default JdParameters;
