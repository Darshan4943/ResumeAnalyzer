import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MiniLoader from "../../components/common/mini-loader";
import Select from "react-select";
import axios from "axios";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateAiHit } from "../../Redux/slices/aiHitsSlice";
import { setRecallData } from "../../Redux/slices/recallSlice";
import LimitUsedModal from "../../components/models/limitUsedModal";

function CreateJd() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { recallData } = useSelector((state) => state.recall);
    const [toggle, setToggle] = useState(0)
    const { id } = router.query
    const [activePlan, setActivePlan] = useState();
    const [limitPopup, setLimitPopup] = useState(false);
    const [aiHitMonthly, setAiHitMonthly] = useState(0);
    const [aiHitMonthlyLimit, setAiHitMonthlyLimit] = useState(0);

    useEffect(() => {
        if (id) {
            setToggle(1)
            getJobDescriptions()
        }
    }, [id]);

    const getLimits = () => {
        const aiHitMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
        setAiHitMonthly(aiHitMonthly);

        const aiHitMonthlyLimit = JSON.parse(
            localStorage.getItem("aiHitsMonthlyLimit")
        );
        setAiHitMonthlyLimit(aiHitMonthlyLimit);
        const activePlan = JSON.parse(localStorage.getItem("planActive"));

        setActivePlan(activePlan);
    };
    useEffect(() => {
        getLimits();
    }, []);


    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        jobRole: "",
        employmentType: "",
        workArrangement: " ",
        location: "",
        requiredEducation: "",
        requiredExperience: "",
        requiredSkills: "",
        salaryRange: "",
        jobDescription: "",
        keyResposibilities: ""
    });
    const [jobDescription, setJobDescription] = useState(null);
    const [jobTitle, setJobTitle] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingg, setLoadingg] = useState(false);
    const [error, setError] = useState(null);

    const { userDataGlobal } = useSelector((state) => state.user.userData);

    const getJobDescriptions = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/jd/getById/${id}`);
            setJobDescription(response.data.data.jd);

        } catch (error) {
            console.error("Error fetching job descriptions:", error.response?.data || error.message);

        }
    };

    const handleSubmit = async (e) => {
        if ((aiHitMonthly >= aiHitMonthlyLimit) || !activePlan) {
            setLimitPopup(true);
            return;
          }
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:2000/api/generate/jobDescription",
                formData
            );
            setJobTitle(response.data.jobTitle)
            const formattedDescription = `
      <p><span style="font-weight: bold; ">Job Title:</span> ${response.data.jobTitle}</p>
      <p><span style="font-weight: bold; ">Company Name:</span> ${response.data.company}</p>
      <p><span style="font-weight: bold; ">Employment Type:</span> ${response.data.employmentType}</p>
      <p><span style="font-weight: bold; ">Work Arrangement:</span> ${response.data.workArrangement}</p>
      <p><span style="font-weight: bold; ">Location:</span> ${response.data.location}</p>
      <p><span style="font-weight: bold; ">Salary Range:</span> ${response.data.salaryRange}</p>
      <p></p>
      <p style=" font-weight: bold; margin-top: 20px;">Job Role:</p>
      <p>${response.data.jobRole}</p>
      <p></p>
      <p style=" font-weight: bold; margin-top: 20px;">Job Description:</p>
      <p>${response.data.jobDescription}</p>
      <p></p>
      <p style=" font-weight: bold; margin-top: 20px;">Key Responsibilities:</p>
      <ul>
          ${response.data.responsibilities
                    .map((item) => `<li>${item}</li>`)
                    .join("")}
      </ul>
      <p></p>
      <p style=" font-weight: bold; margin-top: 20px;">Qualifications:</p>
        <ul>
          ${response.data.qualifications
                    ? response.data.qualifications.map((qualification) => `<li>${qualification}</li>`).join("")
                    : "<li>No benefits listed</li>"}
      </ul>
      <p></p>
      <p style=" font-weight: bold; margin-top: 20px;">Benefits & Perks:</p>
      <ul>
          ${response.data.benefits
                    ? response.data.benefits.map((benefit) => `<li>${benefit}</li>`).join("")
                    : "<li>No benefits listed</li>"}
      </ul>
      <p></p>
      <p style=" font-weight: bold; margin-top: 20px;">Required Skills:</p>
      <ul>
          ${Array.isArray(response.data.requiredSkills)
                    ? response.data.requiredSkills.map((skill) => `<li>${skill.trim()}</li>`).join("")
                    : response.data.requiredSkills
                        ? response.data.requiredSkills.toString().split(",").map((skill) => `<li>${skill.trim()}</li>`).join("")
                        : "<li>No skills listed</li>"}
      </ul>
  `;


            setJobDescription(formattedDescription);
            setToggle(1)
            dispatch(updateAiHit(userDataGlobal?._id))
            setTimeout(() => {
                dispatch(setRecallData(!recallData));
                getLimits();
            }, 1000);
        } catch (err) {
            setError("Error generating job description. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const options = [
        { value: "Full-time", label: "Full-time" },
        { value: "Part-time", label: "Part-time" },
    ];

    const options2 = [
        { value: "Work from home", label: "Work from home" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "On-site", label: "On-site" },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: "1px solid #DEDEDE",
            padding: "0 8px",
            height: "40px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "400",
            outline: "none",
            boxShadow: "none",
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    const previousPage = () => router.back();
    const resetFormData = () => {
        setFormData({
            jobTitle: "",
            company: "",
            jobRole: "",
            employmentType: "",
            workArrangement: " ",
            location: "",
            requiredEducation: "",
            requiredExperience: "",
            requiredSkills: "",
            salaryRange: "",
            keyResposibilities: "",
            jobDescription: ""
        });
    };
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className="ql-strike" aria-label="Strike"></button>
                <button
                    className="ql-list"
                    value="ordered"
                    aria-label="Ordered List"
                ></button>
                <button
                    className="ql-list"
                    value="bullet"
                    aria-label="Unordered List"
                ></button>
                <button className="ql-align" aria-label="Align Left"></button>
                <button
                    className="ql-align"
                    value="center"
                    aria-label="Align Center"
                ></button>
                <button
                    className="ql-align"
                    value="right"
                    aria-label="Align Right"
                ></button>
            </span>
        );
    };

    const header = renderHeader();

    const addJobDescription = async () => {
      

        try {
            setLoadingg(true)
            const url = id
                ? `http://localhost:2000/api/jd/update/${id}`
                : "http://localhost:2000/api/jd/add";

            const method = id ? "put" : "post";

            const response = await axios[method](url, { userId: userDataGlobal?._id, jd: jobDescription, jobTitle });

            toast.success(`Job Description ${id ? "updated" : "added"}  successfully`)
           
            setLoadingg(false)
            return response.data;
        } catch (error) {
            setLoadingg(false)
            console.error("Error:", error.response?.data || error.message);
            return null;
        }
    };




    return (
        <>
         <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
            {(toggle === 0) ?
                <div className="flex flex-col gap-[14px]">
                    <div className="flex gap-2 text-[17px] font-[500] ">
                        <svg onClick={() => router.back()} className=" cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g mask="url(#mask0_9417_111600)">
                                <path d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z" fill="#1C1B1F" />
                            </g>
                        </svg>

                        JD Creation
                    </div>

                    <div className=" gap-[32px] bg-[#FFFFFF] rounded-[14px] w-full scr800:p-6 p-3">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid scr1168:grid-cols-3 ms:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col">
                                        <label className=" mb-1 text-[14px]">Job Title</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            placeholder="Enter Job Title"
                                            className="border border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] text-[14px] "
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className=" mb-1 text-[14px]">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Enter Company Name"
                                            className="border border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] text-[14px] "
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[14px]mb-1">Job Role</label>
                                        <input
                                            type="text"
                                            name="jobRole"
                                            value={formData.jobRole}
                                            onChange={handleChange}
                                            placeholder="Enter Job Role"
                                            className="border border-[#DEDEDE] text-[14px] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-[14px]">Employment Type</label>
                                        <Select
                                            options={options}
                                            value={options.find(
                                                (option) => option.value === formData.employmentType
                                            )}
                                            onChange={(selectedOption) =>
                                                handleChange({
                                                    target: {
                                                        name: "employmentType",
                                                        value: selectedOption?.value,
                                                    },
                                                })
                                            }
                                            styles={customStyles}
                                            className="text-[14px]"
                                            placeholder="Select Employment Type"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className=" mb-1 text-[14px]">Specify the work arrangement</label>
                                        <Select
                                            options={options2}
                                            value={
                                                options2.find(
                                                    (option) => option.value === formData.workArrangement
                                                ) || null
                                            }
                                            className="text-[14px]"
                                            onChange={(selectedOption) =>
                                                handleChange({
                                                    target: {
                                                        name: "workArrangement",
                                                        value: selectedOption?.value || "",
                                                    },
                                                })
                                            }
                                            styles={customStyles}
                                            placeholder="Select Work Arrangement"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[14px] mb-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Enter Department Name"
                                            className="border text-[14px] border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-[14px] mb-1">Required Education</label>
                                        <input
                                            type="text"
                                            name="requiredEducation"
                                            value={formData.requiredEducation}
                                            onChange={handleChange}
                                            placeholder="Enter Required Education"
                                            className="border text-[14px] border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[14px] mb-1">
                                            Required Experience
                                        </label>
                                        <input
                                            type="text"
                                            name="requiredExperience"
                                            value={formData.requiredExperience}
                                            onChange={handleChange}
                                            placeholder="Enter Required Experience"
                                            className="border text-[14px] border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[14px] mb-1">Required Skills</label>
                                        <input
                                            type="text"
                                            name="requiredSkills"
                                            value={formData.requiredSkills}
                                            onChange={handleChange}
                                            placeholder="Enter Required Skills"
                                            className="border text-[14px] border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                                        />
                                    </div>

                                    <div className="flex flex-col  ">
                                        <label className="text-[14px] mb-1">Salary Range</label>
                                        <input
                                            type="text"
                                            name="salaryRange"
                                            value={formData.salaryRange}
                                            onChange={handleChange}
                                            placeholder="Enter Salary Range"
                                            className="border text-[14px] border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                                        />
                                    </div>
                                    <div className="flex flex-col scr1168:col-span-2 ms:col-span-2 col-span-1  ">
                                        <label className="text-[14px] mb-1">Key Responsibilities</label>
                                        <input
                                            type="text"
                                            name="keyResposibilities"
                                            value={formData.keyResposibilities}
                                            onChange={handleChange}
                                            placeholder="Enter Key Responsibilities"
                                            className="border text-[14px] border-[#DEDEDE] px-[14px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                                        />
                                    </div>
                                    <div className="flex flex-col scr1168:col-span-3 ms:col-span-2 col-span-1  ">
                                        <label className="text-[14px] mb-1">Job Description</label>
                                        <textarea
                                            type="text"
                                            name="jobDescription"
                                            value={formData.jobDescription}
                                            onChange={handleChange}
                                            placeholder="Enter Job Description"
                                            className="border text-[14px] border-[#DEDEDE] p-[14px] min-h-[100px]  outline-none justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    {/* <div className="flex justify-start p-[10px] md:p-4 w-full">
                    {" "}
                    <button
                      onClick={previousPage}
                      className="text-[12px] text-[#B3261E]  md:text-[14px] items-center cursor-pointer flex justify-start font-semibold px-6 red_border_Button rounded-[30px] h-[38px]"
                    >
                      Cancel
                    </button>
                  </div> */}
                                    <div className="flex justify-end p-[10px] md:p-4 w-full">
                                        <div className="flex gap-[4px] md:gap-[14px]">
                                            <button
                                                onClick={resetFormData}
                                                className="text-[12px] items-center  md:text-[14px]  cursor-pointer flex justify-start font-semibold px-6 blue_border_Button rounded-[30px] h-[38px]"
                                            >
                                                Reset
                                            </button>

                                            {loading ? (
                                                <div className="flex justify-center items-center text-sm font-semibold px-6 bg_Button rounded-[30px] h-[38px] w-[88.45px]">
                                                    <MiniLoader />
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={handleSubmit}
                                                    className="text-[12px] md:text-[14px] font-semibold px-6 bg_Button rounded-[30px] h-[38px]"
                                                >
                                                    Create
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <>
                    {(toggle === 1) &&
                        <div className="flex gap-2 text-[17px] font-[500] pb-4 ">
                            <svg onClick={() => setToggle(0)} className=" cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <g mask="url(#mask0_9417_111600)">
                                    <path d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z" fill="#1C1B1F" />
                                </g>
                            </svg>

                            JD Creation
                        </div>
                    }
                    <div>

                        <Editor
                            value={jobDescription}
                            onTextChange={(e) => setJobDescription(e.htmlValue)}
                            headerTemplate={header}
                            style={{
                                // border: "none",
                                fontSize: "14px",
                                color: "#333",



                            }}
                        />


                    </div>
                    <div className="w-full flex justify-end pt-6">
                        {loadingg ?
                            <button className="px-6 bg_Button rounded-[30px] h-[38px] w-[76.94px]">
                                <MiniLoader />
                            </button>
                            :
                            <button onClick={addJobDescription} className="px-6 bg_Button rounded-[30px] h-[38px]">
                                Save
                            </button>
                        }
                    </div>

                </>
            }
        </>
    );
}

export default CreateJd;
