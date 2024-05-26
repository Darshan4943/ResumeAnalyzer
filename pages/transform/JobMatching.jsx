import React, { useEffect, useReducer, useRef, useState } from "react";
import InternalJobMatching from "../../components/featured/jobMatching/internal";
import ExternalJobMatching from "../../components/featured/jobMatching/external";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
import axios from "axios";
import { DocSVG, PDFSvg, SearchIcon } from "../../utils/svg";
import { useRouter } from "next/router";
import JdFiles from "../../components/featured/candidate/createResume/components/JdFiles";
import JdMatching from "../../components/featured/candidate/createResume/components/JdMatching";
import JdDescription from "../../components/featured/candidate/createResume/components/JdDescription";
import EarthLoader from "../../components/common/EarthLoader";
import Tesseract from "tesseract.js";
import { pdfjs } from "react-pdf";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { toast } from "react-toastify";

const JobMatching = () => {
  const [loading, setLoading] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);
  const router = useRouter();
  const fileRef = useRef(null);
  const userDataGlobal = useSelector((state) => state.userData);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState([
    {
        "name": "Nagaraju Pagolu",
        "matching_percentage": "40%",
        "conclusion": "The candidate possesses some relevant skills and experience in semiconductor industry, but lacks direct experience in Machine Learning which is a key requirement for the ML Engineer role. While the candidate has some transferable skills, additional training or experience may be needed to excel in this position.",
        "matching_parameters": [
            {
                "title": "Skills and Competencies",
                "matching_points": "5 out of 10",
                "description": "The candidate has skills in Analog/Mixed signal and IO layout designs, floor planning, layout verification, and semiconductor devices. While these skills show technical proficiency, they do not directly align with the required ML frameworks and programming languages like Tensorflow, PyTorch, Python, and Java for the ML Engineer role."
            },
            {
                "title": "Relevant Experience in the Required Field",
                "matching_points": "3 out of 10",
                "description": "The candidate has experience in semiconductor industry and working with Cadence tools, but lacks direct experience in machine learning development, which is a key requirement for the ML Engineer role."
            },
            {
                "title": "Roles and Responsibilities",
                "matching_points": "2 out of 10",
                "description": "The candidate's responsibilities mentioned in the resume focus on hierarchical and top-level placement and routing in semiconductor industry, which do not directly align with the key responsibilities of designing and managing scalable infrastructure for ML development in the job description."
            },
            {
                "title": "Objective and Professional Summary from Resume",
                "matching_points": "2 out of 10",
                "description": "The candidate's professional summary does not mention any specific alignment with machine learning or ML frameworks, which are crucial for the ML Engineer role at Uplers."
            },
            {
                "title": "Total Experience",
                "matching_points": "3 out of 10",
                "description": "The candidate's total professional experience of 3.5+ years in semiconductor industry is below the required 8 years of experience for the ML Engineer role."
            },
            {
                "title": "Educational Qualification",
                "matching_points": "3 out of 10",
                "description": "The candidate holds a Bachelor's degree in Electronics and Communication engineering, which is relevant to the technical field, but does not specify additional qualifications in ML or related fields as required for the ML Engineer role."
            },
            {
                "title": "Keywords",
                "matching_points": "2 out of 10",
                "description": "While the candidate has mentioned some technical keywords in the resume related to semiconductor industry, they do not align with the specific ML keywords highlighted in the job description."
            },
            {
                "title": "Job Tenure and Stability",
                "matching_points": "5 out of 10",
                "description": "The candidate's job tenure shows consistency in previous roles, which demonstrates reliability and stability in their career progression."
            },
            {
                "title": "Additional Activities",
                "matching_points": "1 out of 10",
                "description": "There are no additional activities or interests mentioned in the resume that indicate alignment with the company culture or values."
            },
            {
                "title": "Cultural Fit",
                "matching_points": "2 out of 10",
                "description": "Based on the information provided in the resume, the candidate may not have a strong cultural fit with a company focusing on machine learning and data analytics."
            }
        ],
        "fileName": "1nagaraju-CV.PDF",
        "file": "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/1nagaraju-CV.PDF",
        "type": "file"
    },
    {
        "name": "Raju A. Mopagar",
        "matching_percentage": "55%",
        "conclusion": "The candidate, Raju A. Mopagar, has relevant experience in business development, especially in the US market which aligns with the job requirements. However, there are gaps in skills related to machine learning frameworks and technologies as mentioned in the job description. The candidate's total experience and cultural fit are also factors to consider.",
        "matching_parameters": [
            {
                "title": "Skills and Competencies",
                "matching_points": "4 out of 10",
                "description": "The candidate has strong domain knowledge in areas such as networking, network security, wireless networking, and cloud technologies which are relevant. However, there is a lack of mention of ML frameworks like Tensorflow and PyTorch, and other required skills like distributed computing and SQL."
            },
            {
                "title": "Relevant Experience in the Required Field",
                "matching_points": "8 out of 10",
                "description": "The candidate has over 19 years of experience in business development, especially in the US market, which aligns well with the job requirements for a Senior Machine Learning Engineer. The candidate has a proven track record of generating revenue from acquired customers."
            },
            {
                "title": "Roles and Responsibilities",
                "matching_points": "7 out of 10",
                "description": "The candidate's responsibilities in Benison Technologies align with the key responsibilities mentioned in the job description, such as end-to-end sales, account management, and managing lead generation teams. However, there is a lack of direct experience in machine learning infrastructure."
            },
            {
                "title": "Objective and Professional Summary from Resume",
                "matching_points": "6 out of 10",
                "description": "The candidate's summary focuses on business development experience rather than technical expertise in machine learning. However, the candidate's proactive and target-driven attitude is a positive aspect."
            },
            {
                "title": "Total Experience",
                "matching_points": "8 out of 10",
                "description": "The candidate's over 19 years of professional experience demonstrates a strong background in the industry. However, the lack of specific experience in machine learning may be a concern."
            },
            {
                "title": "Educational Qualification",
                "matching_points": "0 out of 10",
                "description": "The candidate's educational qualifications are not mentioned in the resume, which is a key requirement as per the job description (BS or MS in Computer Science or equivalent)."
            },
            {
                "title": "Keywords",
                "matching_points": "3 out of 10",
                "description": "The resume mentions some keywords related to technology and networking, but lacks specific keywords mentioned in the job description such as Machine Learning, AWS, CI/CD, and Kubernetes."
            },
            {
                "title": "Achievements",
                "matching_points": "7 out of 10",
                "description": "The candidate's achievements in generating revenue and acquiring large customers are relevant to the job role. However, specific achievements related to machine learning or technical aspects are missing."
            },
            {
                "title": "Willingness to Relocate",
                "matching_points": "10 out of 10",
                "description": "The candidate's willingness to relocate is not mentioned in the resume. This could be an area for further discussion during the interview process."
            },
            {
                "title": "Reference and Recommendation",
                "matching_points": "0 out of 10",
                "description": "No references or recommendations are provided in the resume, which could have added credibility to the candidate's profile."
            },
            {
                "title": "Job Tenure and Stability",
                "matching_points": "8 out of 10",
                "description": "The candidate's job tenure at Benison Technologies shows stability and consistency, which reflects reliability in previous roles. This is a positive aspect for the candidate."
            },
            {
                "title": "Additional Activities",
                "matching_points": "5 out of 10",
                "description": "The candidate's short business visits to the US and Germany demonstrate a global perspective and potential cultural fit. However, specific interests or activities related to machine learning or technology are not mentioned."
            },
            {
                "title": "Cultural Fit",
                "matching_points": "6 out of 10",
                "description": "The candidate's experience in diverse markets like the US and Europe may contribute to cultural fit. However, the lack of specific technical skills and educational background as per the job description could be a potential gap."
            },
            {
                "title": "Others",
                "matching_points": "4 out of 10",
                "description": "Overall, the candidate's experience in business development and exposure to technology domains align well with the job requirements. However, there are gaps in technical skills and educational qualifications that need to be addressed."
            }
        ],
        "fileName": "1Raju Mopagar resume.pdf",
        "file": "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/1Raju%20Mopagar%20resume.pdf",
        "type": "file"
    },
    {
        "name": "ASHOK_BANDI_PD01231",
        "matching_percentage": "30%",
        "conclusion": "The candidate has relevant experience in ASIC design, but lacks the required skills and qualifications for the ML Engineer position at Uplers.",
        "matching_parameters": [
            {
                "title": "Skills and Competencies",
                "matching_points": "2 out of 10",
                "description": "The candidate has expertise in Physical Design flow stages and tools like ICC2 and PrimeTime, but lacks skills in ML frameworks like Tensorflow and PyTorch, distributed computing, and programming languages like Python and Java as required by the job description."
            },
            {
                "title": "Relevant Experience in the Required Field",
                "matching_points": "3 out of 10",
                "description": "The candidate has 3+ years of experience in ASIC Design, with specific project experience in lower design nodes and technologies like 7nm and 16nm. While the candidate has experience in block level timing closure, the role requires experience in ML infrastructure development and monitoring systems implementation."
            },
            {
                "title": "Roles and Responsibilities",
                "matching_points": "1 out of 10",
                "description": "The candidate's roles and responsibilities focus on Physical Design flow stages and block level timing closure, which do not directly align with the ML infrastructure development and monitoring responsibilities outlined in the job description."
            },
            {
                "title": "Objective and Professional Summary from Resume",
                "matching_points": "1 out of 10",
                "description": "The candidate's objective is focused on gaining experience in the semiconductor industry, which does not align with the objective of revolutionizing data and ML infrastructure as required by the job."
            },
            {
                "title": "Total Experience",
                "matching_points": "4 out of 10",
                "description": "The candidate has 3+ years of experience in ASIC Design, which demonstrates technical expertise but lacks specific experience in ML frameworks and distributed computing."
            },
            {
                "title": "Educational Qualification",
                "matching_points": "0 out of 10",
                "description": "The candidate's educational background in ECE does not meet the requirement of a BS or MS in Computer Science or equivalent as specified in the job description."
            },
            {
                "title": "Keywords",
                "matching_points": "0 out of 10",
                "description": "The candidate's resume does not include key ML-related keywords like Tensorflow, PyTorch, AWS, CI/CD, and Kubernetes mentioned in the job description."
            },
            {
                "title": "Achievements",
                "matching_points": "0 out of 10",
                "description": "The candidate's achievements in Physical Design and project experience do not directly relate to the ML engineering responsibilities outlined in the job description."
            },
            {
                "title": "Willingness to Relocate",
                "matching_points": "5 out of 10",
                "description": "The candidate's resume does not mention any willingness or unwillingness to relocate, making it neutral in this aspect."
            },
            {
                "title": "Reference and Recommendation",
                "matching_points": "0 out of 10",
                "description": "The resume does not include any references or recommendations relevant to the job role at Uplers."
            },
            {
                "title": "Job Tenure and Stability",
                "matching_points": "2 out of 10",
                "description": "The candidate's job tenure in previous roles shows consistency and stability, which reflects reliability but does not directly impact the mismatch in required skills and experience."
            },
            {
                "title": "Additional Activities",
                "matching_points": "0 out of 10",
                "description": "The resume does not include any additional activities or interests that demonstrate alignment with the company culture or values of Uplers."
            },
            {
                "title": "Cultural Fit",
                "matching_points": "2 out of 10",
                "description": "Based on the information provided in the resume, the candidate's focus on semiconductor industry and previous experience in ASIC design may not align with the data-centric and ML-focused culture at Uplers."
            },
            {
                "title": "Others",
                "matching_points": "0 out of 10",
                "description": "No other relevant factors or information in the resume directly contribute to the candidate's suitability for the ML Engineer position at Uplers."
            }
        ],
        "fileName": "3ASHOK_BANDI_PD01231[3.3].docx",
        "file": "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/3ASHOK_BANDI_PD01231%5B3.3%5D.docx",
        "type": "file"
    },
    {
        "name": "GIRISH SURESH NAKADI",
        "matching_percentage": "60%",
        "conclusion": "The candidate has a strong background in DevOps and AWS Cloud services, with relevant experience and skills that align well with the job description. While there are some areas where the candidate falls short of the job requirements, overall, there is a good match in terms of skills, experience, and qualifications.",
        "matching_parameters": [
            {
                "title": "Skills and Competencies",
                "matching_points": "8 out of 10",
                "description": "The candidate's skills in DevOps tools such as Kubernetes, Docker, Jenkins, and AWS Cloud Services align well with the required skills mentioned in the job description. The candidate also has experience in Continuous Integration and Continuous Delivery, which are key skills required for the role."
            },
            {
                "title": "Relevant Experience in the Required Field",
                "matching_points": "7 out of 10",
                "description": "The candidate has 4.4+ years of experience in DevOps and AWS Cloud, which falls slightly short of the 8 years of experience required in the job description. However, the candidate's experience in designing and implementing infrastructure on AWS Cloud and using CI/CD tools is relevant to the job requirements."
            },
            {
                "title": "Roles and Responsibilities",
                "matching_points": "6 out of 10",
                "description": "The candidate's responsibilities related to designing infrastructure on AWS Cloud, implementing CI/CD pipelines, and working with Kubernetes align with some of the key responsibilities mentioned in the job description. However, there is a lack of specific experience in machine learning infrastructure design and deployment."
            },
            {
                "title": "Objective and Professional Summary from Resume",
                "matching_points": "5 out of 10",
                "description": "The candidate's professional summary focuses on DevOps and AWS Cloud, which aligns with the technical aspects of the job role. However, there is a limited mention of machine learning or data-related experience in the summary, which is a key aspect of the job description."
            },
            {
                "title": "Total Experience",
                "matching_points": "5 out of 10",
                "description": "The candidate's total experience of 4.4+ years falls short of the required 8 years of experience. While the candidate has relevant experience in DevOps and AWS Cloud, the overall experience level is not at par with the job requirements."
            },
            {
                "title": "Educational Qualification",
                "matching_points": "N/A",
                "description": "Educational qualifications are not explicitly mentioned in the resume data provided. Further verification is required to assess alignment with the job description."
            },
            {
                "title": "Keywords",
                "matching_points": "7 out of 10",
                "description": "The candidate's resume includes keywords such as Kubernetes, AWS, CI/CD, and Docker, which are also mentioned in the job description. This indicates some level of alignment in terms of technical skills."
            },
            {
                "title": "Achievements",
                "matching_points": "N/A",
                "description": "No specific achievements are highlighted in the resume data provided. Further information is needed to assess the candidate's accomplishments and their relevance to the job role."
            },
            {
                "title": "Willingness to Relocate",
                "matching_points": "N/A",
                "description": "The candidate's willingness to relocate is not mentioned in the resume data provided. Additional information is required to assess this aspect."
            },
            {
                "title": "Reference and Recommendation",
                "matching_points": "N/A",
                "description": "No references or recommendations are provided in the resume data. Further insights are needed to evaluate this aspect."
            },
            {
                "title": "Job Tenure and Stability",
                "matching_points": "8 out of 10",
                "description": "The candidate's job tenure and stability appear to be consistent, with a focus on DevOps and AWS Cloud services across various roles. This indicates reliability and expertise in the field."
            },
            {
                "title": "Additional Activities",
                "matching_points": "N/A",
                "description": "No additional activities or interests are mentioned in the resume data. Further information would be beneficial to assess alignment with company culture."
            },
            {
                "title": "Cultural Fit",
                "matching_points": "6 out of 10",
                "description": "Based on the information provided in the resume, the candidate's technical skills and experience in DevOps align well with the job requirements. However, there is a lack of specific experience in machine learning, which may impact cultural fit with the company's focus on data and ML."
            },
            {
                "title": "Others",
                "matching_points": "N/A",
                "description": "No other relevant factors or information are explicitly provided in the resume data. Further insights would be necessary for a comprehensive assessment of the candidate's suitability for the role."
            }
        ],
        "fileName": "3GirishNakadi_DevOps Eng.pdf",
        "file": "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/3GirishNakadi_DevOps%20Eng.pdf",
        "type": "file"
    },
    {
        "name": "Nagendra K",
        "matching_percentage": "60%",
        "conclusion": "The candidate shows strong experience in Physical Design and CAD Engineering, which aligns with some of the technical requirements of the ML Engineer role. However, there are gaps in machine learning and infrastructure skills. The candidate's willingness to relocate should be evaluated as the job is a remote position.",
        "matching_parameters": [
            {
                "title": "Skills and Competencies",
                "matching_points": "5 out of 10",
                "description": "The candidate demonstrates strong skills in Physical Design, Synthesis, PnR tools like Innovus and ICC2 Synopsys, and scripting with Python, Perl, and TCL. These technical skills partially match the required ML frameworks, Python, and SQL but lack experience in distributed computing and ML frameworks like Tensorflow and PyTorch."
            },
            {
                "title": "Relevant Experience in the Required Field",
                "matching_points": "6 out of 10",
                "description": "The candidate has relevant experience in Physical Design Engineering, STA, and CAD Engineering. While this experience showcases technical skills and problem-solving abilities, there is a gap in experience related to ML frameworks and distributed computing."
            },
            {
                "title": "Roles and Responsibilities",
                "matching_points": "7 out of 10",
                "description": "The candidate's roles and responsibilities focus on Physical Design, Synthesis, and CAD Engineering tasks, which involve detailed analysis, debugging, and scripting. While these tasks demonstrate technical proficiency, they do not directly align with the ML Engineer responsibilities outlined in the job description."
            },
            {
                "title": "Objective and Professional Summary from Resume",
                "matching_points": "4 out of 10",
                "description": "The candidate's professional summary highlights experience in Physical Design and CAD Engineering, showcasing technical skills and problem-solving abilities. However, it lacks specific alignment with machine learning infrastructure and development, which are key aspects of the ML Engineer role."
            },
            {
                "title": "Total Experience",
                "matching_points": "6 out of 10",
                "description": "The candidate possesses 3 years of experience in Physical Design and CAD Engineering, which demonstrates a strong technical background. However, the lack of experience in ML frameworks, distributed computing, and relevant ML operations may impact the suitability for the ML Engineer role."
            },
            {
                "title": "Educational Qualification",
                "matching_points": "3 out of 10",
                "description": "The candidate holds a Bachelor's degree in Telecommunications, which provides a foundational technical background. However, the lack of a Computer Science degree and specific coursework in ML frameworks may affect the fit for the ML Engineer role."
            },
            {
                "title": "Keywords",
                "matching_points": "4 out of 10",
                "description": "The candidate's resume includes some relevant keywords like Python and Perl scripting, PnR tools like Innovus, and Synthesis. However, there is a lack of specific ML framework and infrastructure keywords mentioned in the job description."
            },
            {
                "title": "Achievements",
                "matching_points": "3 out of 10",
                "description": "The candidate's achievements in Physical Design Engineering highlight skills in debugging, analysis, and scripting. While these achievements showcase technical proficiency, they do not directly align with ML development, monitoring, and infrastructure tasks."
            },
            {
                "title": "Willingness to Relocate",
                "matching_points": "5 out of 10",
                "description": "The candidate's resume does not explicitly mention willingness to relocate. Further clarification is needed to determine compatibility with the remote work setup offered by the job."
            },
            {
                "title": "Reference and Recommendation",
                "matching_points": "1 out of 10",
                "description": "There is no reference or recommendation provided in the candidate's resume, which could have added credibility to the experience and skills mentioned."
            },
            {
                "title": "Job Tenure and Stability",
                "matching_points": "7 out of 10",
                "description": "The candidate's job tenure and stability in previous roles demonstrate consistency and reliability. This indicates a strong work ethic and commitment to professional growth, which are valuable traits for the ML Engineer role."
            },
            {
                "title": "Additional Activities",
                "matching_points": "6 out of 10",
                "description": "The candidate's hobbies of reading novels and travelling showcase interests in personal growth and exploration. While these activities may not directly relate to the ML Engineer role, they highlight a well-rounded individual with diverse interests."
            },
            {
                "title": "Cultural Fit",
                "matching_points": "2 out of 10",
                "description": "The candidate's resume does not provide explicit information on cultural fit or alignment with company values. Further assessment is needed to evaluate compatibility with the company culture."
            },
            {
                "title": "Others",
                "matching_points": "1 out of 10",
                "description": "The candidate's resume lacks specific information on relevant ML projects, certifications, or professional development activities that could enhance the application for the ML Engineer role."
            }
        ],
        "fileName": "1Nagendra STA.DOCX",
        "file": "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/resumes/1Nagendra%20STA.DOCX",
        "type": "file"
    }
]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [tab, setTab] = useState(null);
  const [ParentId, setParentId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    value: "My Collection",
    label: "My Collection",
  });

  const { clients, folders, clientId, parentId, trash } = router.query;
  const [isBack, setIsBack] = useState(false);
  const [recall, setRecall] = useReducer((x) => x + 1, 0);

  const [options, setOptions] = useState(["My Collection"]);

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const [files, setFiles] = useState([]);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesFileTypes, setSelectedIndexesFilesType] = useState([]);
  const [resuneList, setResuneList] = useState([]);
  const selectOptions = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };
  const handleButtonClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    if (selectedOptions.value === "My Collection") {
      setTab(1);

      if (parentId) {
        console.log(1111, parentId);
        localStorage.setItem("parentId", parentId);
        setParentId(parentId);
        getParentData(parentId);
      } else {
        getFolderData();
      }
    } else if (selectedOptions.value === "My Clients") {
      setTab(0);

      if (clientId) {
        getClientData(clientId);
      } else {
        getClients();
      }
    }
    const storedIndexes = localStorage.getItem("selectedIndexes");
    const storedIndexesFileType = localStorage.getItem(
      "selectedIndexesFileType"
    );

    if (storedIndexesFileType) {
      setSelectedIndexesFilesType(JSON.parse(storedIndexesFileType));
    }

    if (storedIndexes) {
      setSelectedIndexes(JSON.parse(storedIndexes));
    }
  }, [selectedOptions, clientId, parentId, userDataGlobal, recall]);

  const getParentData = (parentId) => {
    axios
      .get(`http://localhost:2000/api/folder/getByParentId/${parentId}`)
      .then((res) => {
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClientData = (clientId) => {
    axios
      .get("http://localhost:2000/api/resume/" + clientId)
      .then((res) => {
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFolderData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:2000/api/folder/get/${userDataGlobal._id}`)
      .then((res) => {
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const getClients = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:2000/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        // console.log(res.data.data);
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const processItem = async (data) => {
    console.log(data);
    return;
    // axios
    //   .post("http://localhost:2000/api/external/jobMatching/", {
    //     jd: text,
    //     ids: data,
    //   })
    //   .then((res) => {
    //     console.log("first")
    //     // setResuneList([...resuneList, res.data.data]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const jobMatching = () => {
    setLoadingg(true);
    setIsAnimate(false);
    axios
      .post("http://localhost:2000/api/jd/extraction", {
        text,
      })
      .then(async (res) => {
        const jd = res.data.jsonData[0];
        console.log(jd);
        try {
          const outputData = [];
          const promise = selectedIndexesFileTypes
            .slice(0, 5)
            .map(async (item, index) => {
              const { data } = await axios.post(
                "http://localhost:2000/api/external/jobMatching/",
                {
                  jd: jd,
                  id: item,
                }
              );

              outputData.push(data);

              setLoadingg(false);
            });
          const resolvedData = await Promise.all(promise);
          setResumeList([...resumeList, outputData]);
          setLoadingg(false);
        } catch (e) {
          console.log("error", e);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingg(false);
        toast.error("Something went wrong, please try again");
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
  const textExtractor = async (textData) => {
    const { data } = await axios.post(
      "http://localhost:2000/api/resume/extraction",
      {
        data: textData,
      }
    );
    return data.data;
  };
  const parseData = () => {
    return new Promise((resolve, reject) => {
      const textData = [];
      Object.values(files).forEach(async (file, index) => {
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
            textData.push({ text, index });
          };
          reader.readAsBinaryString(file);
        } else if (file.type == "image/png") {
          Tesseract.recognize(file, "eng", {
            logger: (m) => console.log(m),
          }).then(async ({ data: { text } }) => {
            textData.push({ text, index });
          });
        } else if (file.type == "application/pdf") {
          let fullText = "";
          const pdfTextPromises = [];
          for (let i = 1; i <= 1; i++) {
            pdfTextPromises.push(fileToText(file, i));
          }
          Promise.all(pdfTextPromises).then(async (texts) => {
            fullText = texts.join("");
            textData.push({ text: fullText, index });
          });
        }
        return;
      });
      setTimeout(() => {
        resolve(textData);
      }, 1000);
    });
  };

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    const textData = [];
    if (Object.values(selectedFiles).length) {
      const promise = Object.values(selectedFiles).map((file, index) => {
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

            textData.push({ index, text });
          };
          reader.readAsBinaryString(file);
        } else if (file.type == "image/png") {
          Tesseract.recognize(file, "eng", {
            logger: (m) => console.log(m),
          }).then(async ({ data: { text } }) => {
            textData.push({ index, text });
          });
        } else if (file.type == "application/pdf") {
          let fullText = "";
          const pdfTextPromises = [];

          for (let i = 1; i <= 1; i++) {
            pdfTextPromises.push(fileToText(file, i));
          }

          Promise.all(pdfTextPromises).then(async (texts) => {
            fullText = texts.join("");
            textData.push({ index, text: fullText });
          });
        }
      });
      await Promise.all(promise);
    }
    // setTextData(textData);
    setFiles(selectedFiles);
  };

  return (
    <div className=" md:py-6 py-3 flex flex-col gap-4 min-h-[80vh] customMargins ">
      {loadingg && <EarthLoader />}
      <div className=" font-semibold  text-[20px]">
        Job Description Matching
      </div>
      <div className="bg-[#DEDEDE] w-full h-[1px]"></div>

      <div className="flex ml:flex-row flex-col gap-4 h-full">
        <div className="ml:w-[40%] w-full flex  flex-col gap-6">
          {/* <ReactSelect
            options={options?.map((item, index) => ({
              value: item,
              label: item,
            }))}
            className="my-4 outline outline-offset-1 outline-blue rounded-[8px]"
            name=""
            placeholder="Select"
            value={selectedOptions}
            onChange={(selectedOption) => selectOptions(selectedOption)}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                minWidth: "130px",
              }),
            }}
          /> */}
          <div className="text-[18px] text-[#333333] font-medium">
            Select From Collection
          </div>
          {selectedOptions.value == "Upload File" ? (
            <div className="flex flex-col gap-4 ">
              <div
                ref={fileRef}
                onDrop={handleFileChange}
                className="border-dashed border-[3px] border-[#333] flex flex-row w-full justify-center rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
              >
                <input
                  type="file"
                  name="myfile"
                  onChange={handleFileChange}
                  multiple
                />
                {Object.keys(files).length > 0 ? (
                  <div className="w-full flex justify-center items-center">
                    <div className="flex flex-row gap-[16px] items-center justify-between w-[80%]  ">
                      <div className="flex flex-row gap-[16px] items-center  ">
                        <span className="tex-[16px] font-[500]">
                          ({Object.values(files).length}) Files Selected
                        </span>
                      </div>
                      <button
                        className="px-[16px] py-[8px] border border-[#06A9EF]  rounded-[12px]"
                        onClick={handleButtonClick}
                      >
                        Browse file
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="  flex  flex-col  items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        onClick={handleButtonClick}
                      >
                        <g clipPath="url(#clip0_4121_52475)">
                          <path
                            d="M25 13.3333H25.0167"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4121_52475">
                            <rect width="40" height="40" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]	font-normal	">
                      <div className="flex text-center justify-center  scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                        <span
                          onClick={handleButtonClick}
                          className="text-[#06A9EF]"
                        >
                          &nbsp;Browse file{" "}
                        </span>
                        &nbsp;to upload PDF or DOCS
                      </div>
                      <p className="text-center text-[12px] font-normal text-[#7C8493]"></p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <button
                  className="sm:px-9 py-3 h-[48px] px-6 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]"
                  id="button"
                  onClick={() => {
                    setFiles([]);
                  }}
                  style={{ opacity: files.length == 0 ? 0.6 : 1 }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] w-[166px] flex flex-row justify-between "
                  onClick={extractData}
                  disabled={files.length == 0}
                  style={{ opacity: files.length == 0 ? 0.6 : 1 }}
                >
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
            </div>
          ) : (
            <JdFiles
              details={details}
              query={router.query}
              selectedOptions={selectedOptions.value}
              setSelectedIndexes={setSelectedIndexes}
              selectedIndexes={selectedIndexes}
              loading={loading}
              selectedIndexesFileTypes={selectedIndexesFileTypes}
              setSelectedIndexesFilesType={setSelectedIndexesFilesType}
            />
          )}

          <JdDescription
            text={text}
            error={error}
            resumeCount={resumeCount}
            loadingg={loadingg}
            setText={setText}
            setError={setError}
            setResumeCount={setResumeCount}
            jobMatching={jobMatching}
          />
        </div>
        <div className="bg-[#DEDEDE] ml:h-screen h-[1px] ml:w-[1px] w-full"></div>
        <div className="ml:w-[60%] w-full">
          <JdMatching
            details={details}
            resumeList={resumeList}
            isAnimate={isAnimate}
          />
        </div>
      </div>
    </div>
  );
};

export default JobMatching;

// import React, { useEffect, useState } from "react";
// import InternalJobMatching from "../../components/featured/jobMatching/internal";
// import ExternalJobMatching from "../../components/featured/jobMatching/external";

// const JobMatching = () => {
//   const [tabIndex, setTabIndex] = useState(1);
//   return (
//     <div className=" p-6 flex flex-col gap-6 min-h-[80vh] ">
//       <div className=" font-semibold text-[24px]">Job Description Matching</div>

//       <div className="relative">
//         <div
//           className="absolute top-[0px]"
//           style={{
//             width: "fit-content",
//           }}
//         >
//           <button
//             onClick={() => setTabIndex(1)}
//             style={{
//               borderRadius:
//                 tabIndex == 1 ? "12px 0px 0px 0px" : "12px 0px 0px 0px",
//               boxShadow: "rgb(84 84 84 / 19%) -3px -2px 4px -1px",
//               borderBottom: `1px solid ${
//                 tabIndex == 1 ? "#06A9EF" : "#c7c7c7"
//               } `,
//             }}
//             className={`px-4 py-3 ${
//               tabIndex == 1
//                 ? " bg-[#06A9EF] text-white"
//                 : " text-black bg-[#fff]"
//             }  text-[16px]  font-semibold w-[166px]`}
//           >
//             Internal
//           </button>
//           <button
//             onClick={() => setTabIndex(2)}
//             style={{
//               borderRadius:
//                 tabIndex == 2 ? "0px 12px 0px 0px" : "0px 12px 0px 0px",
//               boxShadow: "rgb(84 84 84 / 19%) 2px -2px 4px -1px",
//               borderBottom: `1px solid ${
//                 tabIndex == 2 ? "#06A9EF" : "#c7c7c7"
//               } `,
//             }}
//             className={`px-4 py-3 ${
//               tabIndex == 2
//                 ? " bg-[#06A9EF] text-white"
//                 : " text-black bg-[#fff]"
//             } text-[16px] font-semibold  w-[166px]`}
//           >
//             External
//           </button>
//         </div>
//         <div className="mt-[48px]">
//           {tabIndex == 1 ? <InternalJobMatching /> : <ExternalJobMatching />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobMatching;
