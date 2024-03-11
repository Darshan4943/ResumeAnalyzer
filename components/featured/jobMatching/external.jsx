import React, { useEffect, useState } from "react";
import Progress_bar from "./ProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import ResumePreview from "../../common/ResumePreview";
import { DesignationSVG } from "../../../utils/svg";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import Tesseract from "tesseract.js";
import PdfViewer from "./PdfViewer";

const ExternalJobMatching = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const userDataGlobal = useSelector((state) => state.userData);
  const [details, setDetails] = useState();
  const [resuneList, setResuneList] = useState([
    {
      index: 0,
      first_name: "Sandesh",
      last_name: "Ghadage",
      percentage: 75,
      Matching_parameters: ["ReactJs", "Redux", "Associate Frontend Developer"],
    },
    {
      index: 1,
      first_name: "Neha",
      last_name: "Rajbhar",
      percentage: 70,
      Matching_parameters: [
        "React js",
        "Redux",
        "Advanced Java",
        "Full stack Developer",
      ],
    },
  ]);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);
  const [textDataFinal, setTextData] = useState([
    {
      index: 1,
      first_name: "Neha",
      last_name: "Rajbhar",
      years_of_experience: 1,
      experience: 11,
      programming_languages: [
        "Javascript",
        "React js",
        "React Native",
        "NodeJs",
        "ExpressJs",
        "Mongodb",
        "Redux",
        "HTML",
        "CSS",
        "Advance java",
        "Mysql",
        "Bootstrap",
        "Tailwind CSS",
      ],
      skills: ["Full stack Java Developer"],
      soft_skills: ["Time Management", "Leadership", "Creativity"],
      tools: null,
      education: ["Bachelor of Science in Information Technology"],
      degrees: null,
      text: "SKILLS  Javascript   React js   React Native  NodeJs   ExpressJs   Mongodb  Redux   HTML   CSS  Advance java   Mysql   Bootstrap  Tailwind CSS  SOFT SKILL  Time   Management  Leadership  Creativity  ACHIEVEMENT  3rd   Ranker   in   Final   year  Secured Third Rank in Final year of Graduation with  SGPA of 9.60  CERTIFICATES  Full stack Java Developer  Done certification as java developer  EDUCATION  Bachelor   of   Science   in   Information  Technology  June   2019 – March   2022  Ramanand Arya D.A.V. College, Thane Maharashtra  8.30 CGPA  Intermediate   (PCMB)  August   2017 – March   2019  K.B. College of Arts and Commerce, Thane  Maharashtra  Percentage - 46.15%  PROFESSIONAL EXPERIENCE (11 MONTHS)  Setup   My   Hotel   pvt   ltd,   Full   stack   developer  September   2023 – present   |   Pune,   India  Led the development of dynamic web applications as a MERN stack  developer, specializing in MongoDB, Express.js, React.js, and Node.js.  Contributed to the creation of robust and scalable solutions, ensuring  optimal user experiences and maintaining a keen eye for detail in a  fast-paced environment.  Kumar   InfoTech   Pvt   Ltd,   web   developer   Internship  March   2023 – August   2023  • Skilled in teamwork, owning tasks and timely deliveries.  • Integrated APIs, backend services with the frontend, data fetching  and state management using libraries like Redux toolkit or Recoil.  • Work on real life projects.  Java   Developer,   DecodeTech   PVT.   LTD  December   2022  • Intern as a Java Developer in DecodeTech pvt ltd  PROJECTS  1)   Gym   Website  April   2023 – April   2023  Tech Stack : React Js, CSS, React-Router-Dom, MUI  I have created an interactive website for a gym, with the main  focus being on designing and developing a user-friendly  interface that makes it easy for users to navigate and engage  with the content.  2)   Twitter   Clone  April   2023 – April   2023  Tech Stack : React JS, Redux, CSS, React-Router-Dom, MUI  I utilized React JS, and the Material UI library to design the  front-end of a Twitter clone website. With a focus on creating  an interactive user experience, I incorporated features that  allow users to post tweets, and like them  3)   Kanban   Board  May   2023 – May   2023  Tech Stack : React JS, CSS, React-Router-Dom, MUI, Recoil  I have created an interactive Trello Kanban Board that  provides a platform for creating lists and adding tasks with  drag and drop functionality.  4)   Real   Estate   website  August   2023 – August   2023  This is a real estate website from where a user can search for a  properties and view properties and if want to connect then can fill  contact form after filling user will get an mail on provided email id  Neha Rajbhar  rajrajbhar682@gmail.com  8591180252  LinkedIn  Github",
    },
    {
      index: 0,
      first_name: "Sandesh",
      last_name: "Ghadage",
      years_of_experience: null,
      experience: null,
      programming_languages: ["ReactJs", "React Native", "Redux"],
      skills: ["HTML", "CSS", "Bootstrap"],
      soft_skills: [
        "Teamwork",
        "Leadership",
        "Time Management",
        "Communication",
      ],
      tools: [
        "MongoDB",
        "Express Js",
        "Node Js",
        "AWS S3",
        "AWS Route53",
        "AWS EC2",
      ],
      education: [
        "Bachelor's Degree, Marathwada Mitra Mandal Institute of Technology, Pune 8.9 CGPA",
        "Diploma, Dr. D Y Patil school of engineering and technology, Pune. 83.59%",
      ],
      degrees: null,
      text: "SKILLS  ReactJs   React Native  Redux   MongoDB  Express Js   Node Js  HTML   CSS   Bootstrap  AWS S3   AWS Route53  AWS EC2  SOFT SKILLS  Teamwork   Leadership  Time Management  Communication  INTERESTS  Multiplayer Strategy Games  Song Writing  PROFESSIONAL EXPERIENCE  Associate   Frontend   Developer,   Setup   My   Hotel   Pvt   Ltd  • Led a dedicated team of three developers in the design,  development, and deployment of the company website.  • Managed project timelines, ensuring the team's adherence to  milestones and timely delivery of key features.  • Developed cross-platform mobile applications in React  Native, demonstrating proficiency in building apps from  scratch. Successfully integrated secure REST API ʼ s and  implemented the MVC architecture with Redux state  management for efficient app development.  • Spearheaded a complete redesign of the user interface for the  company's flagship product, resulting in a modern, intuitive,  and user-friendly experience.  • As a seasoned full-stack developer, I've actively collaborated  with backend developers to seamlessly integrate new  features, fostering a cohesive and efficient end-to-end  development process.  Mentor   and   Teaching   Assistance,   FunctionUp  • Teaching assistant - Mentored and guided 120+ students.  • Assisted students in resolving coding challenges and  debugging issues, promoting a problem-solving mindset  crucial for real-world React development scenarios.  • Delivered comprehensive lessons on ReactJS, covering  fundamental concepts to advanced topics. Provided hands-  on guidance to students, ensuring a deep understanding of  React architecture, component-based development, and  state management.  Flutter   Developer,   Blockchain   Internationale  • Collaborated with the development team to debug and fix  issues, ensuring the smooth performance of the mobile  applications.  • Spearheaded the end-to-end development of multiple mobile  applications using Flutter framework, ensuring optimal  performance and user experience.  • Designed and implemented visually appealing and intuitive  user interfaces, focusing on creating a delightful user  experience.  EDUCATION  Bachelor's   Degree,  Marathwada   Mitra   Mandal   Institute   of   Technology,   Pune  8.9 CGPA  Diploma,  Dr.   D   Y   Patil   school   of   engineering   and   technology,   Pune.  83.59%  Sandesh  Ghadage  Frontend Developer  sandeshghadage3@gmail.com  7972516029  Pune, India  https://github.com/sandeshghadage  https://www.linkedin.com/in/sandesh-  ghadage/ July   2023 – present   |   Pune,   India February   2023 – June   2023   |   Bangalore,   India October   2022 – March   2023   |   Pune,   India June   2019 – May   2022   |   Pune,   India June   2016 – May   2018   |   Pune,   India",
    },
  ]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:2000/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  const jobMatching = () => {
    setLoading(true);
    axios
      .post("http://localhost:2000/api/external/jobMatching", {
        jd: text,
        resumeCount,
        resumeData: textDataFinal,
      })
      .then((res) => {
        setResuneList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          pdf.getPage(pageNumber).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items.map((item) => item.str);
              resolve(textItems.join(" "));
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const extractData = async (text) => {
    const options = {
      method: "POST",
      url: "https://ai-textraction.p.rapidapi.com/textraction",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8ffd958bacmsh889c078a456bd48p14d53fjsn79a50f97f6ea",
        "X-RapidAPI-Host": "ai-textraction.p.rapidapi.com",
      },
      data: {
        text,
        entities: [
          {
            var_name: "first_name",
            type: "string",
            description: "first name of the person",
          },
          {
            var_name: "last_name",
            type: "string",
            description: "last name of the person",
          },
          {
            var_name: "years_of_experience",
            type: "integer",
            description: "years of experience",
          },
          {
            var_name: "experience",
            type: "integer",
            description: "persons work experience",
          },
          {
            var_name: "programming_languages",
            type: "array[string]",
            description: "programming languages experienced with",
          },
          {
            var_name: "skills",
            type: "array[string]",
            description: "persons skills",
          },
          {
            var_name: "soft_skills",
            type: "array[string]",
            description: "persons soft skills",
          },
          {
            var_name: "tools",
            type: "array[string]",
            description: "tools experienced with",
          },
          {
            var_name: "education",
            type: "array[string]",
            description: "education of person",
          },
          {
            var_name: "degrees",
            type: "array[string]",
            description: "degrees of person",
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  };

  const fileChangeHandler = async (e) => {
    const selectedFiles = e.target.files;
    const textData = [];
    if (Object.values(selectedFiles).length) {
      const promise = Object.values(selectedFiles).map((file, index) => {
        console.log(file);
        if (
          file.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target.result;
            var doc = new Docxtemplater(new PizZip(content), {
              delimiters: {
                start: "12op1j2po1j2poj1po",
                end: "op21j4po21jp4oj1op24j",
              },
            });
            var text = doc.getFullText();
            const extractedData = await extractData(text);
            textData.push({ index, ...extractedData, text });
          };
          reader.readAsBinaryString(file);
        } else if (file.type == "image/png") {
          Tesseract.recognize(
            file,
            "eng", // Language code (English in this case)
            { logger: (m) => console.log(m) } // Optional logger callback
          ).then(async ({ data: { text } }) => {
            const extractedData = await extractData(text);
            textData.push({ index, ...extractedData, text });
            // textData.push({ index, text });
          });
        } else if (file.type == "application/pdf") {
          let fullText = "";
          const pdfTextPromises = [];

          for (let i = 1; i <= 1; i++) {
            pdfTextPromises.push(fileToText(file, i));
          }

          Promise.all(pdfTextPromises).then(async (texts) => {
            fullText = texts.join("");

            const extractedData = await extractData(fullText);
            textData.push({ index, ...extractedData, text: fullText });
            // textData.push({ index, fullText });
          });
        }
      });
      await Promise.all(promise);
    }
    setTextData(textData);
    setFiles(selectedFiles);
  };

  return (
    <div className="flex flex-col gap-4 min-h-[70vh] ">
      {preview && (
        <>
          <ResumePreview
            selectedResumeIndex={selected.resumeTemplateIndex}
            data={selected}
            selectedColor={selected.selectedColor}
            selectedFont={selected.selectedFont}
            setPreview={setPreview}
            preview={true}
          />
        </>
      )}
      <div
        className="flex ml:flex-row flex-col gap-12 w-[100%] p-4 "
        style={{
          boxShadow: "0px 1px 6px 0px rgb(84 84 84 / 25%)",
          borderRadius: "0px 12px 12px 12px",
        }}
      >
        <div className="flex flex-col gap-6 ml:w-[50%] w-[50%]">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="upload-btn-wrapper w-[166px] ">
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  multiple
                  className="cursor-pointer"
                />
                <button className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] w-[166px] flex flex-row justify-between ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_925_19962)">
                      <path
                        d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                  Upload Files
                </button>
              </div>
              {Object.values(files).length > 0 && (
                <span className="tex-[16px] font-[500]">
                  ({Object.values(files).length}) Files Selected
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="text-[18px] font-medium">Job Description</div>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              rows={6}
              cols={50}
              placeholder="Enter your text here..."
              className=" border border-[#06A9EF] rounded-[8px] outline-none h-auto p-2"
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <span className="text-[20px] font-500">
              Select search Results Limit{" "}
            </span>
            <input
              type="text"
              value={resumeCount}
              onChange={(e) => {
                setResumeCount(e.target.value);
              }}
              name=""
              id=""
              placeholder="Ex. 5"
              className="h-[44px] w-[80px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] "
            />
          </div>
          <button
            className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] w-[166px]"
            disabled={loading}
            onClick={() => {
              jobMatching();
            }}
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
              <div className="flex gap-[8px] w-full justify-between">
                Find Match{" "}
                <img
                  src="/images/icons/person_search.png"
                  className="h-[24px] w-[24px]"
                  alt=""
                />{" "}
              </div>
            )}
          </button>
        </div>
        <div className="ml:w-[50%] w-[50%] bg-[#F9F9F9] rounded-[16px] border border-[#DEDEDE] py-[16px] px-[24px] flex flex-col gap-[16px] ">
          <div>Total Results ({resuneList?.length})</div>
          <div className=" flex flex-row flex-wrap justify-between  gap-[24px] ">
            {resuneList?.length > 0 ? (
              <>
                {resuneList
                  .sort((a, b) => b.percentage - a.percentage)
                  ?.map((data, index) => (
                    <div
                      className="flex flex-col gap-[8px] w-[44%] rounded-[16px] bg-white shadow-lg py-[16px] px-[24px]"
                      key={index}
                    >
                      <div className="flex flex-col gap-[4px]">
                        <div className="flex gap-[4px] text-[16px] font-500">
                          <span>{data?.first_name}</span>{" "}
                          <span>{data?.last_name}</span>
                        </div>
                      </div>
                      <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]">
                        <div className="w-full h-full rounded-[8px]  shadow  group relative ">
                          <PdfViewer
                            data={textDataFinal.find(
                              (data) => index == data.index
                            )}
                            file={Object.values(files).find(
                              (data, i) => index == i
                            )}
                          />

                          <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-full w-full rounded-[6px] opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                            <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
                              <div
                                className="flex items-center flex-col cursor-pointer"
                                style={{
                                  borderBottom: "1px solid #646464",
                                  paddingBottom: "12px",
                                }}
                                onClick={() => {
                                  setSelected(data);
                                  setPreview(true);
                                }}
                              >
                                <img
                                  src="/images/icons/visibility.png"
                                  className="h-[28px] w-[28px]"
                                  alt=""
                                />
                                <span className="text-[14px] font-semibold text-white ">
                                  Preview
                                </span>
                              </div>

                              <a
                                href={data.resumeUrl}
                                className="flex items-center flex-col cursor-pointer"
                              >
                                <img
                                  src="/images/icons/download.png"
                                  className="h-[28px] w-[28px]"
                                  alt=""
                                />
                                <span className="text-[14px] font-semibold text-white ">
                                  Download
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {data?.percentage && (
                        <Progress_bar progress={data.percentage} />
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-full">
                <img src="/images/NoMatch.png" alt="" className="w-[40%] " />
                <span className="text-[#808080]">No Match Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalJobMatching;
