import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import MiniLoader from "./mini-loader";

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
        <div ref={(node) => ref(drop(node))} style={{ boxShadow: "0px 1px 4px 0px #00000040",cursor: "grab", }} className="flex items-center justify-between p-3 my-4 bg-white  rounded-[12px] ">
            <div className="flex items-center gap-3">


                <div className="w-[26px] h-[26px] flex items-center justify-center rounded-full  font-[500] text-[14px] bg-[#C6EEFF]">{index + 1}</div>
                <label className="switch">
                    <input type="checkbox" checked={item.enabled} onChange={() => toggleItem(index)} />
                    <span className="slider round"></span>
                </label>
                <div className="font-semibold text-[14px] block w-[200px] break-words">{item.label}</div>
                <div className="font-[400] border border-[#DEDEDE] rounded-[8px] px-4 flex items-center text-[12px] break-words w-[600px] h-[46px] ">{item.description}  </div>


                <div className=" text-center border border-[#DEDEDE] rounded-[8px] h-[46px] flex items-center px-2">
                    <input
                        type="text"
                        value={item.percentage}
                        onChange={(e) => handleChange(e, index)}
                        className={` w-[30px] text-[16px] font-semibold ${!item.enabled ? ' cursor-not-allowed' : ''}`}
                        disabled={!item.enabled}
                    />
                    <span className="font-semibold">%</span>
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
    );
};

const JdParameters = ({ setOpenParamenters }) => {
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [loading, setLoading] = useState(false)
    const [parameters, setParameters] = useState([
        { label: "Skills and Competencies", description: "Identify and highlight any skills and competencies in the resume that match the required and preferred skills and competencies in the job description.", percentage: 15, enabled: true },
        { label: "Relevant Experience in the Required Field", description: "Compare the candidate's experience in the relevant field with the job requirements, noting any areas where the candidate meets, exceeds, or falls short of the required experience.", percentage: 15, enabled: true },
        { label: "Roles and Responsibilities", description: "Evaluate the roles and responsibilities listed in the candidate's work experience and compare them with those required by the job description.", percentage: 15, enabled: true },
        { label: "Objective and Professional Summary from Resume", description: "Assess the candidate's objective and professional summary in the resume to determine alignment with the job role and company values.", percentage: 10, enabled: true },
        { label: "Total Experience", description: "Summarize the candidate's total professional experience, including all relevant fields, and compare it with the job requirements.", percentage: 10, enabled: true },
        { label: "Educational Qualification", description: "Compare the candidate's educational qualifications with the required and preferred educational background mentioned in the job description.", percentage: 10, enabled: true },
        { label: "Keywords", description: "Identify any keywords from the job description that are present in the candidate's resume.", percentage: 10, enabled: true },
        { label: "Achievements", description: "Review the candidate's achievements and assess their relevance and impact in relation to the job role.", percentage: 15, enabled: true }
    ]);


    useEffect(() => {
        const fetchJDParameters = async () => {

            try {
                const data = await axios.get(`http://localhost:2000/api/jdParameters/get/${userDataGlobal?._id}`);

                if (data?.data?.data?.parameters) {
                    console.log("hii")
                    setParameters(data?.data?.data?.parameters);
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
            const response = await axios.post(`http://localhost:2000/api/jdParameters/add`, {
                userId: userDataGlobal?._id,
                parameters
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

    const toggleItem = (index) => {
        setParameters((prev) => prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p)));
    };

    const changePercentage = (index, value) => {
        setParameters((prev) => prev.map((p, i) => (i === index ? { ...p, percentage: value } : p)));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-fit h-[80vh] overflow-y-auto p-6 bg-white rounded-[12px] ">
                <div className="flex justify-between items-center">

                    <p className="text-[16px] font-semibold ">Set Matching Parameters</p>
                    <svg onClick={() => setOpenParamenters(false)} className=" cursor-pointer" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.29165 14.3917L0.125 13.225L5.84168 7.50833L0.125 1.79165L1.29165 0.625L7.00833 6.34168L12.725 0.625L13.8917 1.79165L8.17498 7.50833L13.8917 13.225L12.725 14.3917L7.00833 8.67498L1.29165 14.3917Z" fill="#333333" />
                    </svg>

                </div>

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
                <div className="w-full flex justify-end">
                    <button onClick={addJDParameters} className=" mt-4 bg_Button   rounded-[30px]  disabled:opacity-50 w-[152px] flex  justify-center items-center px-6 h-[38px]" disabled={parameters.reduce((sum, p) => sum + (p.enabled ? p.percentage : 0), 0) !== 100}>
                        {loading ?
                            <MiniLoader /> :
                            "Save Parameters"   
                        }
                    </button>
                </div>
            </div>
        </DndProvider>
    );
};

export default JdParameters;
