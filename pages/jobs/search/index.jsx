import React, { useState } from "react";
import { AddIcon } from "../../../utils/svg";
import JobListing from "./jobListing";
import Files from "./files";
import axios from "axios";
import { toast } from "react-toastify";

const Index = () => {
  const [resumeCount, setResumeCount] = useState(5);
  const [threshold, setThreshold] = useState(100);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([
    {
      _id: "660e41a2ca3d2b6d39ea29d6",
      companyName: "freedygo",
      jobTitle: "Ui-ux",
      location: ['["pune"]'],
      description:
        "<p>As a UX and Graphic Designer at VE3, you will play a pivotal role in shaping user experiences and creating stunning visual content. This position requires a unique blend of UX design, graphic design, and exceptional PowerPoint presentation skills. The ideal candidate should have a keen eye for detail, an innovative approach to design, and the ability to translate user needs and business goals into impactful design solutions.</p>",
      salaryType: "Annual",
      minSalary: "2",
      maxSalary: "5",
      requiredQualification: "BCA",
      deadLine: "2024-04-18",
      experiance: "0-2 years",
      skills: ['["UX/UI Design","Figma"]'],
      createdAt: "2024-04-04T05:58:58.280Z",
      updatedAt: "2024-04-04T05:58:58.280Z",
      __v: 0,
      applications: [],
      percentage: 3,
      "Matching parameters": [],
      "Matching parameters details": {
        required: {},
        provided: {},
      },
      "justification Of Matching":
        "No matching parameters found, hence the percentage is 0%",
    },
    {
      _id: "660e41d751871ea3681f13b6",
      companyName: "freedygo",
      jobTitle: "Ui-ux",
      location: ["pune"],
      description:
        "<p>As a UX and Graphic Designer at VE3, you will play a pivotal role in shaping user experiences and creating stunning visual content. This position requires a unique blend of UX design, graphic design, and exceptional PowerPoint presentation skills. The ideal candidate should have a keen eye for detail, an innovative approach to design, and the ability to translate user needs and business goals into impactful design solutions.</p>",
      salaryType: "Annual",
      minSalary: "2",
      maxSalary: "5",
      requiredQualification: "BCA",
      deadLine: "2024-04-18",
      experiance: "0-2 years",
      skills: ["UX/UI Design", "Figma"],
      createdAt: "2024-04-04T05:59:51.655Z",
      updatedAt: "2024-04-04T05:59:51.655Z",
      __v: 0,
      applications: [],
      percentage: 3,
      "Matching parameters": [],
      "Matching parameters details": {
        required: {},
        provided: {},
      },
      "justification Of Matching":
        "No matching parameters found, hence the percentage is 0%",
    },
    {
      _id: "660e421c51871ea3681f13b8",
      companyName: "freedygo",
      jobTitle: "Ui-ux",
      location: ["pune"],
      description:
        "<p>As a UX and Graphic Designer at VE3, you will play a pivotal role in shaping user experiences and creating stunning visual content. This position requires a unique blend of UX design, graphic design, and exceptional PowerPoint presentation skills. The ideal candidate should have a keen eye for detail, an innovative approach to design, and the ability to translate user needs and business goals into impactful design solutions.</p>",
      salaryType: "Annual",
      minSalary: "2",
      maxSalary: "5",
      requiredQualification: "BCA",
      deadLine: "2024-04-18",
      experiance: "0-2 years",
      skills: ["UX/UI Design", "Figma"],
      createdAt: "2024-04-04T06:01:00.580Z",
      updatedAt: "2024-04-04T06:01:00.580Z",
      __v: 0,
      applications: [],
      percentage: 3,
      "Matching parameters": [],
      "Matching parameters details": {
        required: {},
        provided: {},
      },
      "justification Of Matching":
        "No matching parameters found, hence the percentage is 0%",
    },
    {
      _id: "660e42457c152ed2c0ce4676",
      companyName: "freedygo",
      jobTitle: "Ui-ux",
      location: ["pune"],
      description:
        "<p>As a UX and Graphic Designer at VE3, you will play a pivotal role in shaping user experiences and creating stunning visual content. This position requires a unique blend of UX design, graphic design, and exceptional PowerPoint presentation skills. The ideal candidate should have a keen eye for detail, an innovative approach to design, and the ability to translate user needs and business goals into impactful design solutions.</p>",
      salaryType: "Annual",
      minSalary: "2",
      maxSalary: "5",
      requiredQualification: "BCA",
      deadLine: "2024-04-18",
      experiance: "0-2 years",
      skills: ["UX/UI Design", "Figma"],
      logo: "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/discount.png",
      createdAt: "2024-04-04T06:01:41.964Z",
      updatedAt: "2024-04-04T06:01:41.964Z",
      __v: 0,
      applications: [],
      percentage: 3,
      "Matching parameters": [],
      "Matching parameters details": {
        required: {},
        provided: {},
      },
      "justification Of Matching":
        "No matching parameters found, hence the percentage is 0%",
    },
    {
      _id: "660e428338f86936e4e51fde",
      companyName: "freedygo",
      jobTitle: "Ui-ux",
      location: ["pune"],
      description:
        "<p>As a UX and Graphic Designer at VE3, you will play a pivotal role in shaping user experiences and creating stunning visual content. This position requires a unique blend of UX design, graphic design, and exceptional PowerPoint presentation skills. The ideal candidate should have a keen eye for detail, an innovative approach to design, and the ability to translate user needs and business goals into impactful design solutions.</p>",
      salaryType: "Annual",
      minSalary: "2",
      maxSalary: "5",
      requiredQualification: "BCA",
      deadLine: "2024-04-18",
      experiance: "0-2 years",
      skills: ["UX/UI Design", "Figma"],
      logo: "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/discount.png",
      createdBy: "65fa90fd96a0cbfb444e1c5b",
      createdAt: "2024-04-04T06:02:43.199Z",
      updatedAt: "2024-04-04T06:02:43.199Z",
      __v: 0,
      applications: [],
      percentage: 3,
      "Matching parameters": [],
      "Matching parameters details": {
        required: {},
        provided: {},
      },
      "justification Of Matching":
        "No matching parameters found, hence the percentage is 0%",
    },
    {
      _id: "660e42d138f86936e4e51fe0",
      companyName: "freedygo",
      jobTitle: "Ui-ux",
      location: ["pune"],
      description:
        "<p>As a UX and Graphic Designer at VE3, you will play a pivotal role in shaping user experiences and creating stunning visual content. This position requires a unique blend of UX design, graphic design, and exceptional PowerPoint presentation skills. The ideal candidate should have a keen eye for detail, an innovative approach to design, and the ability to translate user needs and business goals into impactful design solutions.</p>",
      salaryType: "Annual",
      minSalary: "2",
      maxSalary: "5",
      requiredQualification: "BCA",
      deadLine: "2024-04-18",
      experiance: "0-2 years",
      skills: ["UX/UI Design", "Figma"],
      logo: "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/discount.png",
      createdBy: "65fa90fd96a0cbfb444e1c5b",
      createdAt: "2024-04-04T06:04:01.201Z",
      updatedAt: "2024-04-04T06:04:01.201Z",
      __v: 0,
      applications: [],
      percentage: 16,
      "Matching parameters": [],
      "Matching parameters details": {
        required: {},
        provided: {},
      },
      "justification Of Matching":
        "No matching parameters found between the resume data and job data.",
    },
    {
      _id: "660e7140ff624d2627c777b2",
      companyName: "Freedygo",
      jobTitle: "Tech Lead",
      location: ["Pune", "Delhi"],
      description:
        "<p>Job Description: Technical Lead (MERN Stack) We are seeking a highly skilled and experienced Technical Lead with expertise in MERN stack development, blockchain experience, strong coding abilities, team management skills, and excellent communication. As a Technical Lead, you will be responsible for overseeing the technical aspects of projects, leading a team of developers, and ensuring the successful delivery of high-quality software solutions. Responsibilities Technical Leadership: • Provide technical guidance, architectural expertise, and mentorship to the development team. • Lead the design and development of robust, scalable, and efficient MERN stack applications. • Collaborate with cross-functional teams to define project requirements and - ensure technical feasibility. • Stay updated with the latest industry trends, technologies, and best practices to drive innovation and improvement. • Experience working on blockchain based projects would be a plus. • Team Management Supervise and lead a team of developers, including task allocation, performance monitoring, and fostering a collaborative work environment. Conduct regular code reviews and provide constructive feedback to ensure code quality and adherence to coding standards. Facilitate knowledge sharing, learning, and skill development within the team. Identify training needs and provide coaching to enhance the team's technical capabilities Manage team dynamics, resolve conflicts, and promote a positive and productive work environment • Coding and Development : Lead by example by actively participating in coding activities and taking ownership of critical modules or complex features. Ensure that coding practices are followed, and high-quality code is delivered on time. Collaborate with the team to solve technical challenges and make informed decisions. Perform code reviews, identify areas of improvement, and drive code refactoring initiatives. • Communication and Collaboration : Effectively communicate technical concepts, project updates, and recommendations to both technical and non-technical stakeholders. Collaborate closely with cross-functional teams, including product managers, designers, and quality assurance, to ensure seamless integration and delivery of software solutions. Act as a bridge between the development team and management, providing updates, insights, and recommendations. Requirements • Bachelor's or Master's degree in Computer Science, Engineering, or a related field. • Total Experience 8+ years. • Proven experience (3 - 5 years) as a Technical Lead or similar role in MERN stack development. • Strong proficiency in MERN stack technologies and related frameworks and libraries. • Solid understanding of software development principles, design patterns, and best practices. • Experience in team management, including task allocation, performance evaluation, and mentorship. • Blockchain experience, with knowledge of blockchain concepts • Strong coding skills and ability to actively contribute to the development process. • Excellent communication skills with the ability to convey complex technical concepts to both technical and non-technical stakeholders. • Strong problem-solving and analytical abilities, with a keen attention to detail. • Ability to handle multiple projects simultaneously and work in a fast-paced, dynamic environment. • Proactive and self-driven with a passion for staying updated with emerging technologies and trends. Skills: coding,best practices,blockchain experience,blockchain concepts,high-quality code,quality assurance,identify training,technical guidance,architectural expertise,design patterns,code reviews,solve technical challenges,blockchain based projects,mern stack technologies,software development principles,mern stack applications,mern stack development</p>",
      salaryType: "Annual",
      minSalary: "10",
      maxSalary: "20",
      requiredQualification: "MBA",
      deadLine: "2024-04-23",
      experiance: "2-5 years",
      skills: ["Node.js", "QA Testing"],
      logo: "",
      createdBy: "65fa90fd96a0cbfb444e1c5b",
      applications: [],
      createdAt: "2024-04-04T09:22:08.085Z",
      updatedAt: "2024-04-04T09:22:08.085Z",
      __v: 0,
      percentage: 32,
      "Matching parameters": ["skills"],
      "Matching parameters details": {
        required: {
          skills: ["Node.js"],
        },
        provided: {
          skills: ["NODE JS"],
        },
      },
      "justification Of Matching":
        "Skills requirement for Node.js in job data partially matches with the skills mentioned in the resume data with the skill 'NODE JS'.",
    },
  ]);
  const [selected, setSelected] = useState(false);
  const searchJob = () => {
    setLoading(true);
    axios
      .post("https://freedygoservices.in/api/job/search", {
        ...selected,
        resumeCount,
        threshold,
      })
      .then((res) => {
        if (res.data.success) {
          const result = res.data?.data
            .filter(
              (item) => parseFloat(item.percentage) <= parseInt(threshold)
            )
            .slice(0, resumeCount);
          setJobs(result);
          setLoading(false);
        } else {
          toast.error("Something went wrong Please try again");
        }
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  return (
    <>
      <div className="job-list customMargins flex flex-col gap-[16px] ">
        <div className="flex justify-between items-center header w-full">
          <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] ">
            Search Jobs
          </span>
        </div>
        <div className="flex ml:flex-row flex-col gap-4 h-full justify-between">
          <div className="ml:w-[40%] w-full flex  flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[16px] text-[#333333] font-medium">
                Select Resume from Collection
              </span>
              <Files setSelected={setSelected} selected={selected} />
            </div>

            <div className="flex flex-row gap-3 items-center">
              <span className="text-[16px] text-[#333333] font-medium">
                Select search Results Limit
              </span>
              <input
                type="number"
                placeholder="5"
                value={resumeCount}
                onChange={(e) => setResumeCount(e.target.value)}
                className="md:h-[44px] h-[40px]  w-[80px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] leading-tight"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[16px] text-[#333333] font-medium">
                Set Matching Threshold
              </span>
              <div className="w-full flex flex-row justify-between items-center">
                <input
                  id="default-range"
                  type="range"
                  min="0"
                  max="100"
                  value={threshold}
                  onChange={(e) => {
                    setThreshold(e.target.value);
                  }}
                  class="w-[88%] h-2 bg-[#DEDEDE] rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-[10%]">{threshold} %</div>
              </div>
            </div>
            <button
              className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] md:w-[166px] scr420:w-[200px] w-full"
              style={{ opacity: loading ? 0.5 : 1 }}
              disabled={loading}
              onClick={searchJob}
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4  text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <div className="flex gap-[8px] w-full justify-center">
                  Search Jobs
                </div>
              )}
            </button>
          </div>

          <div className="bg-[#DEDEDE] ml:h-screen h-[1px] ml:w-[1px] w-full"></div>
          <div className="ml:w-[56%] w-full">
            <JobListing jobs={jobs}  />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
