import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MiniLoader from "../../components/common/mini-loader";
import MiniLoader2 from "../../components/common/miniLoader";
import { camelCase, dateSeter, formatDate } from "../../utils/middleware";
import Timer from "../../components/common/timer";
import {

  Assessmentlogo,

  ClosedIcon30,
} from "../../utils/svg";
import CreatableSelect from "react-select/creatable";
import { SkillList } from "../../utils/data";
import { toast } from "react-toastify";

import generatePDF, { Resolution, Margin } from "react-to-pdf";
import QuestionList from "../../components/featured/home/QuestionList";
import SkillModel from "../../components/featured/candidate/createResume/components/SkillModel";
import { reCallUserData } from "../../Redux/actions/user";
import Certificate from "../../components/featured/home/Certificate";
import LimitUsedModal from "../../components/models/limitUsedModal";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { TRUE } from "sass";
import Result from "../../components/featured/home/Result";
import ResultPdf from "../../components/featured/home/ResultPdf";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";

function SkillAssessment() {
  const resumeRef = useRef();
  const resumeRef1 = useRef();
  const resumeRef2 = useRef();
  const userDataGlobal = useSelector((state) => state.userData);
  const [reCall, forceUpdate] = useReducer((x) => x + 1.0);
  const [viewAddSkill, setViewAddSkill] = useState(false);
  const router = useRouter();
  const query = router.query;
  const [skipped, setSkipped] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [score, setScore] = useState(false);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [mainLoading, setMainLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnEnable, setBtnEnable] = useState(false);
  const [btnEnable1, setBtnEnable1] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const dispatch = useDispatch();
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [showSecondDiv, setshowSecondDiv] = useState(false);
  const [assessmentList, setAssessmentList] = useState([]);
  // const [isActivePlan, setisActivePlan]=useState(false)
  const [isLevel, setisLevel] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState();

  // const [skills, setSkills] = useState(SkillList);
  const [userSkills, setUserSkills] = useState();
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(30);
  const [attemptCount, setAttemptCtn] = useState();
  const [normalCount, setNormalCount] = useState(0);
  const [certifiedCount, setCertifiedCount] = useState(0);

  
  const [isPlan, setIsplan] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  const [level, setLevel] = useState("Intermediate");
  const [resultType, setResultType] = useState(false);
  const [assesmentType, setAssesmentType] = useState("Normal");
  const [downloadCertificate, setDownloadCertificate] = useState([]);
  const [viewCertificate, setViewCertificate] = useState()
  const [viewCertificateData, setViewCertificateData] = useState([])
  const [viewCertificateLoader, setViewCertificateLoader] = useState(false)
  const firstContainer = useRef(null);
  const secondContainer = useRef(null);
  const thirdContainer = useRef(null);
  const fourthContainer = useRef(null);
  const fifthContainer = useRef(null);
  const sixthContainer = useRef(null);
  const seventhContainer = useRef(null);
  const eighthContainer = useRef(null);
  const ninthContainer = useRef(null);
  const tenthContainer = useRef(null);
  const barWidth = Math.ceil(
    ((questionIndex + 1) * 100) / (assesmentType === "Normal" ? 10 : 60)
  );



  const [skippedArray, setSkippedArray] = useState([
    // { question: 1, isSkiped: true, Answer: "" },
    // { question: 2, isSkiped: true, Answer: "" },
    // { question: 3, isSkiped: true, Answer: "" },
    // { question: 4, isSkiped: true, Answer: "" },
    // { question: 5, isSkiped: true, Answer: "" },
    // { question: 6, isSkiped: true, Answer: "" },
    // { question: 7, isSkiped: true, Answer: "" },
    // { question: 8, isSkiped: true, Answer: "" },
    // { question: 9, isSkiped: true, Answer: "" },
    // { question: 10, isSkiped: true, Answer: "" },
  ]);


  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setisLevel(false)
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSkippedArray(fillArray());
  }, [assesmentType]);

  const fillArray = () => {
    let count = assesmentType === "Normal" ? 10 : 60;
    let array = [];

    for (let i = 0; i < count; i++) {
      array.push({ question: i + 1, isSkiped: true, Answer: "" });
    }
    return array;
  };

  const [uniqueQuestions, setUniqueQuestions] = useState([]);

  // START
  // START
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/allSkills")
      .then((res) => {
        const names = res.data.map((skill) => skill.name);

        setSkills(names);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [skillList]);

  const handleInputChange = async (selectedOption) => {
    const found = skills?.find((item) => item === selectedOption.label);
    if (!found) {
      try {
        const response = await fetch("http://localhost:2000/api/skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: selectedOption.label }),
        });
        if (response.ok) {
          const newSkill = { skill: selectedOption.label };
          setSkillList([...skillList, newSkill]);
          setSelectedSkill(selectedOption.value);
          setInputValue(selectedOption.value);
        } else {
          console.error("Failed to add skill:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding skill:", error.message);
      }
    } else {
      setSelectedSkill(found);
    }
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  // const handleInputChange = (selectedOption) => {
  //   setSelectedSkill(selectedOption.value);
  //   setInputValue(selectedOption.value);
  // };
  // const handleLevelChange = (event) => {
  //   setLevel(event.target.value);
  // };

  useEffect(() => {
    if (question.length > 0) {
      // const uniqueQuestionsSet = new Set();
      // const filteredQuestions = [];

      // question.forEach((data) => {
      //   if (
      //     !uniqueQuestionsSet.has(data.question) && assesmentType === "Normal"
      //       ? filteredQuestions.length < 10
      //       : filteredQuestions.length < 60
      //   ) {
      //     uniqueQuestionsSet.add(data.question);
      //     filteredQuestions.push(data);
      //   }
      // });
      // setUniqueQuestions(filteredQuestions);

      // while (filteredQuestions.length < 10) {
      //   toggleContent(); // This function should generate a new unique question
      // if (!uniqueQuestionsSet.has(newQuestion.question)) {
      //   uniqueQuestionsSet.add(newQuestion.question);
      //   filteredQuestions.push(newQuestion);
      // }
      // }

      if (
        assesmentType === "Normal"
          ? question.length < 10
          : question.length < 60 && selectedSkill
      ) {
        toggleContent();
      }
    }
  }, [question]);

  const [isSkiped, setIsSkiped] = useState(false);

  // const handleInputChange = (selectedOption) => {
  //   setSelectedSkill(selectedOption.value);
  //   setInputValue(selectedOption.value);
  // };
  // const handleLevelChange = (event) => {
  //   setLevel(event.target.value);
  // };

  useEffect(() => {
    setMainLoading(true);
    axios
      .get("http://localhost:2000/api/resume/skills/" + userDataGlobal?._id)
      .then((res) => {
        setData(res.data.data);
        // setAttemptCtn(res.data.data?.count);
        setMainLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMainLoading(false);
      });
  }, [userDataGlobal]);

  useEffect(() => {
    const skillsSet = new Set();
    data.forEach((item) => {
      item.skills.forEach((skillObj) => {
        skillsSet.add(skillObj.skill);
      });
    });

    setUserSkills(Array.from(skillsSet));
  }, [data]);

  const generatePdf = () => {
    setLoadingg(true);
    return new Promise((resolve, reject) => {
      generatePDF(resumeRef, {
        filename: `${selectedSkill}-assessment-skilotech.pdf`,
      });
      resolve();
    })
      .then(() => {
        setTimeout(() => {
          setLoadingg(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        setLoadingg(false);
      });
  };

  const generatePdf2 = () => {
    setLoading3(true);
    return new Promise((resolve, reject) => {
      generatePDF(resumeRef1, {
        filename: `${selectedSkill}_certificate_skilotech.pdf`,
        resolution: Resolution.HIGH,
        page: {
          // // margin is in MM, default is Margin.NONE = 0
          // margin: Margin.SMALL,
          // default is 'A4'
          format: "letter",
          // default is 'portrait'
          orientation: "landscape",
        },
      });
      resolve();
    })
      .then(() => {
        setTimeout(() => {
          setLoading3(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        setLoading3(false);
      });
  };

  const toggleContent = () => {
    if (assesmentType !== "Normal" && !userDataGlobal.firstName) {
      setEditProfilePopUp(true);
    } else if (selectedSkill) {
      setLoading(true);
      if (
        (assesmentType === "Normal" && question.length < 10) ||
        (assesmentType !== "Normal" && question.length < 60)
      ) {
        axios
          .post("http://localhost:2000/api/qnaSkill", {
            skill: selectedSkill,
            level: level,
            lastQuestions: question,
            questionCount:
              question.length == 9 || question.length === 59 ? "1" : "2",
          })
          .then((res) => {


            if (res.data.success) {
              try {
                const newQuestions = res.data.data;
                const newQuestionArray = newQuestions.filter((item) => {
                  return !question.some(
                    (data) => data.question === item.question
                  );
                });
                setQuestion((prevQuestions) => [
                  ...prevQuestions,
                  ...newQuestionArray,
                ]);
                setToggle(1);
                setLoading(false);
                setStartTimer(true);
              } catch (error) {
                console.error("JSON parsing error: ", error);
                // Handle parsing error, possibly retry or show user-friendly message
              }
            } else {
              console.error("Backend error: ", res.data.error);
              setQuestion(question)
              // Handle backend error, show error message to user
            }
          })
          .catch((err) => {
            console.log(3999, err);
            setLoading(false);
          });
      }
    } else {
      toast.error("Please select a skill to start skill assessment");
    }
  };

  useEffect(() => {
    // if (assesmentType === "Normal") {
    //   if (questionIndex == 7 || questionIndex == 8) {
    //     setBtnEnable(true);
    //   }
    // } else if (assesmentType !== "Normal") {
    //   if (questionIndex == 59 || questionIndex == 60) {
    //     setBtnEnable(true);
    //   }
    // } else

    if (question.length > questionIndex + 2) {
      setBtnEnable(true);
    } else {
      if (assesmentType === "Normal") {
        if (questionIndex == 8 || questionIndex == 9) {
          setBtnEnable(true);
        }
      } else {
        if (assesmentType !== "Normal") {
          if (questionIndex == 58 || questionIndex == 59) {
            setBtnEnable(true);
          }
        }
      }
    }
  }, [question, questionIndex]);

  useEffect(() => {
    setStartTimer(true);
    setBtnEnable1(false)
  }, [questionIndex]);


  const skippedQuestion = () => {
    setTimer(30);
    if (assesmentType === "Normal" ? questionIndex == 9 : questionIndex == 59) {
      sumbit();
    } else {
      setQuestionIndex(
        questionIndex + 1 < assesmentType === "Normal"
          ? 10
          : 60
            ? questionIndex + 1
            : assesmentType === "Normal"
              ? 9
              : 59
      );

    }
  }


  const sumbit = () => {
    setStartTimer(false);

    setTimer(30);
    if (assesmentType === "Normal" ? questionIndex == 9 : questionIndex == 59) {
      axios
        .post("http://localhost:2000/api/assessment/add", {
          userId: userDataGlobal._id,
          skill: selectedSkill,
          score: checkAnswer(),
          date: new Date(),
          level: level,
          isCertification: assesmentType !== "Normal" ? true : false,
          count: assesmentType === "Normal" ? attemptCount + 1 : attemptCount,
        })
        .then((res) => {
          setDownloadCertificate(res.data.data);
          setToggle(0);
          setLoading(false);
          setQuestionIndex(0);
          setSkipped([]);
          setTimeout(() => {
            setScore(true);
          }, 500);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setTimer(30);

      setQuestionIndex(
        questionIndex + 1 < assesmentType === "Normal"
          ? 10
          : 60
            ? questionIndex + 1
            : assesmentType === "Normal"
              ? 9
              : 59
      );

    }
  };

  useEffect(() => {
    let timer;
    setIsNext(!isNext)
    if (questionIndex && isSubmit === false) {
      timer = setTimeout(() => {
        if (
          assesmentType === "Normal"
            ? questionIndex === 9
            : questionIndex === 59 && isSubmit === false
        ) {
          setIsNext(!isNext)
          sumbit();
        }
      }, 30000);
    }

    return () => clearTimeout(timer);
  }, [questionIndex, isSubmit]);


  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/assessment/getByUser/${userDataGlobal._id}`)
      .then((res) => {
        const data = res.data.data;
  
        const normalCount = data.filter(item => item.isCertification === false).length;
        const certifiedCount = data.filter(item => item.isCertification === true).length;
  
        setAttemptCtn(data.length);
        setAssessmentList(data.reverse());
  
        setNormalCount(normalCount);
        setCertifiedCount(certifiedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSkill, reCall, userDataGlobal]);
  

  const resetSelection = () => {
    answerSetter(questionIndex + 1, "");
    setBtnEnable1(false);
  };

  const answerSetter = (question, Answer) => {
    setBtnEnable1(true);
    const skip = skippedArray.find((item) => {
      if (item.question == question && Answer != "") {
        return true;
      }
      return false;
    });

    if (skip) {
      skip.isSkiped = false;
      skip.Answer = Answer;

      const updatedSkippedArray = skippedArray.map((item) => {
        if (item.question == skip.question) {
          return skip;
        }
        return item;
      });

      setSkippedArray(updatedSkippedArray);
      setAnswer(updatedSkippedArray);
    }

    if (Answer === "") {
      // Remove the answer if Answer is empty (reset case)
      const updatedSkippedArray = skippedArray.map((item) => {
        if (item.question == question) {
          return { ...item, isSkiped: true, Answer: "" };
        }
        return item;
      });

      setSkippedArray(updatedSkippedArray);
      setAnswer(updatedSkippedArray);
    }
  }
  const isSelected = (Answer, question) => {
    const findAnswer = answer.find(
      (data) => data?.Answer === Answer && data?.question == question
    );

    return findAnswer ? true : false;
  };

  const checkAnswer = () => {
    let correctAnswer = 0;

    answer.forEach((item) => {
      if (!skipped.includes(item?.question)) {
        if (question[item?.question - 1]?.answer == item?.Answer) {
          correctAnswer = correctAnswer + 1;
        }
      }
    });


    return Math.round(correctAnswer);
  };

  function convertToDateTime(dateString) {
    var date = new Date(dateString);

    var hour = date.getHours();
    var minute = date.getMinutes();

    var period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    minute = (minute < 10 ? "0" : "") + minute;

    var formattedTime = hour + ":" + minute + " " + period;

    return formattedTime;
  }

  function calculateMarkOutOf60() {
    let correctAnswers = checkAnswer();
    let totalQuestions = question.length;
    let percentageScore = ((correctAnswers * 100) / totalQuestions).toFixed(2);

    let markOutOf60 = Math.ceil((percentageScore * 60) / 100);
    return percentageScore + `%`;
  }
  // const handleDownload = async () => {
  //   setLoadingg(true);
  //   const doc = (
  //     <Result
  //       questions={question}
  //       answers={answer}
  //       selectedSkill={selectedSkill}
  //       checkAnswer={checkAnswer}
  //     />
  //   );
  //   const blob = await pdf(doc).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `${selectedSkill}_assessment.pdf`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  //   setLoadingg(false);
  // };

  const generatePdfBlob = async () => {
    const containers = [
      firstContainer.current,
      secondContainer.current,
      thirdContainer.current,
      fourthContainer.current,
      fifthContainer.current,
      sixthContainer.current,
      seventhContainer.current,
      eighthContainer.current,
      ninthContainer.current,
      tenthContainer.current,
    ];
    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < containers.length; i++) {
      const ref = containers[i];
      if (ref) {
        const canvas = await html2canvas(ref, { scale: 6 });
        const imgData = canvas.toDataURL("image/jpeg", 0.7);

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "JPEG", 0, 0, 595.28, 841.89);
      }
    }

    return pdf.output("blob");
  };

  const handleDownload = async () => {
    setLoadingg(true);

    const pdfBlob = await generatePdfBlob();
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedSkill}_assessment.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error("Failed to generate PDF");
    }
    // document.body.removeChild(container);
    setLoadingg(false);
  };

  // const handleStart = () => {
  //   const isActivePlan = JSON.parse(localStorage.getItem("planActive"));
  //   const activePlan = JSON.parse(localStorage.getItem("activePlan"));
  //   if (!isActivePlan) {
  //     setisLevel(false);
  //     setIsplan(true);
  //   }
  //   else if (!selectedSkill) {
  //     toast.error("Please select a skill to start assessment");
  //   }
  //   else if (isActivePlan && assesmentType === "Certificate" && activePlan === 1 && attemptCount < 0) {
  //     setisLevel(true);
  //   }
  //   else if (isActivePlan && assesmentType === "Normal" && activePlan === 1 && attemptCount < 3) {
  //     setisLevel(true);
  //   }
  //   else {
  //     setisLevel(true);
  //   }
  // };


  const handleStart = () => {
    const isActivePlan = JSON.parse(localStorage.getItem("planActive"));
    const activePlan = JSON.parse(localStorage.getItem("activePlan"));

    if (!isActivePlan) {
      setisLevel(false);
      setIsplan(true);
      return;
    }

    if (!selectedSkill) {
      toast.error("Please select a skill to start the assessment");
      return;
    }
  
    if (isActivePlan && activePlan === 1) {
      const isCertificateAssessment = assesmentType === "Certificate" && certifiedCount < 1;
      const isNormalAssessment = assesmentType === "Normal" && normalCount < 3;

      if (isCertificateAssessment || isNormalAssessment) {
        setisLevel(true);
        return;
      }
      setIsplan(true);
      toast.error("Attempt limit reached for this plan");
      setisLevel(false);
      return;
    }

    if (isActivePlan && activePlan !== 1) {
      setisLevel(true);
    }
  };

  function formatScore(score) {
    let percentageScore = (score * 100) / 60;
    return percentageScore % 1 === 0
      ? percentageScore
      : percentageScore.toFixed(2);
  }
  const generatePdf3 = async (item, index) => {

    setViewCertificateLoader(true);
    setViewCertificate(index);
    setViewCertificateData(item);


    await new Promise((resolve) => setTimeout(resolve, 0));


    try {
      await generatePDF(resumeRef2, {
        filename: `${item.skill}_certificate_skilotech.pdf`,
        resolution: Resolution.HIGH,
        page: {
          format: "letter",
          orientation: "landscape",
        },
      });


      setTimeout(() => {
        setViewCertificateLoader(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setViewCertificateLoader(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {editProfilePopUp && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute ms:w-[30%] w-[60%] flex flex-col gap-6  justify-between items-center text-center rounded-[24px] bg-white p-6  text-[24px] font-medium">
              First edit your profile to update the name !
              <button
                onClick={() => {
                  setEditProfilePopUp(false);
                  router.push("/auth/recruiter-signup?isUpdate=true");
                }}
                style={{ borderColor: "#06a9ef" }}
                className={`w-[200px] px-4 py-[12px] rounded-[12px] border-[1px] border-solid border-[#06a9ef] text-[20px] text-white font-[500] bg-blue hover:bg-[#06a9ef] 
             
            } hover:text-[#fff] transition-all duration-200`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}

      {isPlan && <LimitUsedModal visible={isPlan} setVisible={setIsplan} />}

      {mainLoading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <MiniLoader2 />
        </div>
      ) : (
        <div
          onWheel={(e) => e.stopPropagation()}
          className="bg-[#F9F9F9] w-full  " style={{ minHeight: 'calc(100vh - 56px)' }}
        >
          {toggle === 0 && (
            <div className="flex flex-col gap-[16px] pt-[24px] pb-[95px] items-center  customMargins">
              <div className=" w-[100%] flex flex-row gap-[8px] ">
                <button
                  className={` rounded-[12px] ml:px-[22.8px] scr420:px-3 px-2 ${assesmentType === "Normal"
                    ? "bg-blue text-white btn_hover_effect"
                    : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                    } ml:min-w-[235px] scr420:min-w-[180px] py-2  flex gap-2 ml:text-[16px] scr420:text-[14px] xsm:text-[12px] text-[12px] justify-center items-center   h-[40px] font-semibold`}
                  onClick={() => setAssesmentType("Normal")}
                >
                  Quick Assessment
                </button>
                <button
                  className={`rounded-[12px] min-w-[138px] flex justify-center items-center ${assesmentType === "Certificate"
                    ? "bg-blue text-white btn_hover_effect"
                    : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                    }  py-2 ml:px-6  scr420:px-3 px-1 ml:text-[16px] scr420:text-[14px] xsm:text-[12px] text-[12px] font-medium `}
                  onClick={() => setAssesmentType("Certificate")}
                >
                  Certified Assessment
                </button>
              </div>
              <div
                className="  w-[100%] ml:p-[16px] p-2 flex ml:flex-row flex-col justify-between  gap-[16px] rounded-[12px] bg-[#fff]"
                style={{
                  boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {viewAddSkill ? (
                  <div className=" w-[100%] flex justify-between ml:items-center items-end  gap-[16px] rounded-[12px] bg-[#fff]">
                    <div className="flex flex-col gap-4 w-[100%]">
                      <div className="flex scr540:flex-row flex-col  justify-between">
                        <div className="text-[20px] font-medium">
                          Select Skill
                        </div>
                        <div className="flex gap-2 justify-end ">
                          <button
                            onClick={() => setViewAddSkill(false)}
                            className="btn_hover_effect rounded-[12px] ml:px-[22.8px] px-3  ml:min-w-[235px] min-w-[180px] py-2  flex gap-2 ml:text-[16px] scr420:text-[14px] text-[12px] justify-center items-center bg-blue text-white ml:h-[40px] h-[40px] font-semibold"
                          >
                            Select From My Skills
                            <svg
                              class="w-4 h-4 hover:fill-current hover:text-gray-700"
                              viewBox="0 0 15 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.5 8H0.5V6H6.5V0H8.5V6H14.5V8H8.5V14H6.5V8Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                          <div
                            className="text-[#C00000]  ml:min-w-[136px] scr420:min-w-[112px] min-w-[96px] ml:text-[16px] scr420:text-[14px] text-[12px]  "
                            onClick={() => setshowSecondDiv(!showSecondDiv)}
                          >
                            {!showSecondDiv ? (
                              <button className=" btn_hover_effect rounded-[12px] ml:text-[16px] text-[12px] scr420:px-4 px-2 scr420:py-2 py-2 flex gap-2 justify-center items-center bg-blue text-white ml:h-[40px] h-[40px] font-semibold">
                                View Results
                              </button>
                            ) : (
                              <button className="btn_hover_effect rounded-[12px]  ml:text-[16px] text-[12px] scr420:px-4 px-2 scr420:py-2 py-2 flex gap-2 justify-center items-center bg-blue text-white ml:h-[40px] h-[40px] font-semibold">
                                Hide Results
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <CreatableSelect
                        options={skills.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        className="w-full"
                        onChange={handleInputChange}
                      />
                      {/* <CreatableSelect
                      onInputChange={(data) => {
                        // setSkills([data, ...skills]);
                      }}
                      options={skills.map((item) => ({
                        value: item,
                        label: camelCase(item),
                      }))}
                      className="w-full"
                      onChange={handleInputChange}
                    /> */}
                    </div>
                  </div>
                ) : (
                  <div className="  w-[100%] flex flex-col gap-[16px] rounded-[12px] bg-[#fff] ml:justify-between justify-center ">
                    <div className="flex flex-row gap-4  justify-between items-end w-full">
                      <div className="flex flex-col  gap-4 w-[100%]">
                        <div className="flex  scr540:flex-row flex-col justify-between">
                          <div className="text-[20px] font-medium">
                            My Skills
                          </div>
                          <div className="flex gap-2 justify-end ">
                            <button
                              onClick={() => setViewAddSkill(true)}
                              className="btn_hover_effect rounded-[12px] ml:px-[22.8px] px-3  ml:min-w-[235px] min-w-[180px] py-2  flex gap-2 ml:text-[16px] scr420:text-[14px] text-[12px] justify-center items-center bg-blue text-white  h-[40px] font-semibold"
                            >
                              Select Another Skill
                              <svg
                                class="w-4 h-4 hover:fill-current hover:text-gray-700"
                                viewBox="0 0 15 14"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.5 8H0.5V6H6.5V0H8.5V6H14.5V8H8.5V14H6.5V8Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <div
                              className="text-[#C00000]  ml:min-w-[136px] scr420:min-w-[112px] min-w-[96px] ml:text-[16px] scr420:text-[14px] text-[12px]  "
                              onClick={() => setshowSecondDiv(!showSecondDiv)}
                            >
                              {!showSecondDiv ? (
                                <button className="btn_hover_effect rounded-[12px] ml:text-[16px] text-[12px] scr420:px-4 px-2 scr420:py-2 py-2 flex gap-2 justify-center items-center bg-blue text-white ml:h-[40px] h-[40px] font-semibold">
                                  View Results
                                </button>
                              ) : (
                                <button className="btn_hover_effect rounded-[12px]  ml:text-[16px] text-[12px] scr420:px-4 px-2 scr420:py-2 py-2 flex gap-2 justify-center items-center bg-blue text-white ml:h-[40px] h-[40px] font-semibold">
                                  Hide Results
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex flex-row gap-[16px] overflow-x-auto flex-wrap ">
                          {userSkills?.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedSkill(item);
                              }}
                              className={`ml:px-4 ml:py-2 px-2 py-1 border-[1px] border-solid border-[#06A9EF] rounded-[25px] ml:text-[14px] text-[12px] font-medium text-[#333]  transition-[0.2s] ${selectedSkill == item &&
                                "bg-[#06A9EF] text-white"
                                }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* {isLevel && (
                <>
                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                    <div className="flex sm:p-4 p-2 flex-col text-[20px] leading-tight font-bold justify-center  scr420:gap-4 gap-3 min-w-[300px]  bg-white rounded-[16px]  ">
                      <div className="flex justify-between">
                        Difficulty Level
                        <div
                          onClick={() => {
                            setisLevel(false);
                          }}
                          className="cursor-pointer"
                        >
                          <CloseIcon />
                        </div>
                      </div>
                      <div className="flex sm:gap-4 gap-2 justify-between sm:text-[16px] text-[14px] font-medium">
                        <div>
                          <label className="flex gap-2 items-center">
                            <input
                              className="h-[15px] w-[15px]"
                              type="radio"
                              name="level"
                              value="Easy"
                              onChange={handleLevelChange}
                              checked={level === "Easy"}
                            />
                            Easy
                          </label>
                        </div>
                        <div>
                          <label className="flex gap-2 items-center">
                            <input
                              className="h-[15px] w-[15px]"
                              type="radio"
                              name="level"
                              value="Intermediate"
                              onChange={handleLevelChange}
                              checked={level === "Intermediate"}
                            />
                            Intermediate
                          </label>
                        </div>
                        <div>
                          <label className="flex gap-2 items-center">
                            <input
                              className="h-[15px] w-[15px]"
                              type="radio"
                              name="level"
                              value="Advanced"
                              onChange={handleLevelChange}
                              checked={level === "Advanced"}
                            />
                            Advanced
                          </label>
                        </div>
                      </div>
                      <div className="w-full flex justify-end">
                        <button
                          onClick={() => {
                            toggleContent();
                            setisLevel(false);
                          }}
                          className={`flex justify-center items-center w-[90px] py-1 text-[16px]
                              bg-blue rounded-[8px] text-white
                              }`}
                        >
                          {" "}
                          Start
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )} */}
              {isLevel && (
                <>
                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>

                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">

                    <div ref={taskRef} className="flex sm:py-4 py-2 flex-col text-[20px] leading-tight font-bold justify-center scr420:gap-5 gap-3 scr500:min-w-[489px] min-w-[300px]  bg-white rounded-[16px] relative  ">

                      <div className="w-full flex justify-center items-center">
                        <div onClick={() => setisLevel(false)} className=" cursor-pointer z-[3000] absolute right-2 top-2"><ClosedIcon30 /></div>
                        <svg width="119" height="80" viewBox="0 0 119 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M59.5001 0C75.6069 0 90.1958 6.49392 100.794 17.0056L96.6407 28.095L90.9404 26.8591C82.864 18.8692 71.7588 13.9349 59.5001 13.9349L50.5396 7.26812L59.5001 0Z" fill="#F93778" />
                          <path d="M28.0596 26.8591L19.6091 23.9092L18.2061 17.0056C28.8043 6.49392 43.3932 0 59.5 0V13.9349C47.2413 13.9349 36.136 18.8692 28.0596 26.8591Z" fill="#75E0F6" />
                          <path d="M118.103 58.2997H104.207C104.113 46.003 99.056 34.8884 90.9399 26.8594L100.793 17.0059C111.431 27.5566 118.009 42.1551 118.103 58.2997Z" fill="#FA7085" />
                          <path d="M14.7927 58.2997H0.897186C0.991041 42.1551 7.56852 27.5566 18.2061 17.0059L28.0596 26.8594C19.9438 34.8884 14.8863 46.003 14.7927 58.2997Z" fill="#01BAFE" />
                          <path d="M16.413 3.19531L28.0596 14.8422V26.8587L14.4587 17.0052L10.4046 9.2037L16.413 3.19531Z" fill="#555C7C" />
                          <path d="M28.0596 26.8581H16.0433L4.39641 15.2115L10.4046 9.20312L28.0596 26.8581Z" fill="#373A5B" />
                          <path d="M59.5011 60.7559H78.6533V74.8594L59.5011 79.9988L57.4903 71.0133L59.5011 60.7559Z" fill="#555C7C" />
                          <path d="M40.3488 60.7559H59.501V79.9988L40.3488 74.8594V60.7559Z" fill="#373A5B" />
                          <path d="M65.0079 50.186L72.9277 53.4035L68.4115 60.7564L67.7989 69.1881L59.5006 67.136L54.1286 56.4183L59.5006 43.6484L65.0079 50.186Z" fill="#FFE643" />
                          <path d="M53.9936 50.186L59.501 43.6484V67.136L51.2027 69.1881L50.59 60.7564L46.0738 53.4035L53.9936 50.186Z" fill="#FFCA00" />
                        </svg>
                      </div>
                      <div className="w-full py-[6px] flex justify-center items-center bg-[#06A9EF] text-[18px] font-[500] text-[#ffffff]"> Select difficulty level</div>
                      <div className="scr500:h-[44px] h-[34px] scr500:px-[20px] px-[12px] w-full flex justify-between">
                        <button className="scr500:w-[26.84%] w-[28.84%] rounded-[8px] flex justify-center items-center bg-[#ffffff] hover:bg-[#06A9EF] border-solid border-[0.82px] border-[#06A9EF] scr500:text-[16px] text-[12px] text-[#333333] hover:text-[#ffffff] font-[600]" onClick={() => { setLevel("Easy"); setisLevel(false); toggleContent() }}>Easy</button>
                        <button className="scr500:w-[33.96%] w-[36.84%] rounded-[8px] flex justify-center items-center bg-[#ffffff] hover:bg-[#06A9EF] border-solid border-[0.82px] border-[#06A9EF] scr500:text-[16px] text-[12px] text-[#333333] hover:text-[#ffffff] font-[600]" onClick={() => { setLevel("Intermediate"); setisLevel(false); toggleContent() }}>Intermediate</button>
                        <button className="scr500:w-[28.84%] w-[28.84%] rounded-[8px] flex justify-center items-center bg-[#ffffff] hover:bg-[#06A9EF] border-solid border-[0.82px] border-[#06A9EF] scr500:text-[16px] text-[12px] text-[#333333] hover:text-[#ffffff] font-[600]" onClick={() => { setLevel("Advanced"); setisLevel(false); toggleContent() }}>Advanced</button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-4 w-[100%]">
                <div className="flex flex-row justify-end">
                  {showSecondDiv && (
                    // <div className="flex flex-col justify-start items-center rounded-lg shadow-md lg:w-[60%] sm:w-[85%]  w-[100%] ">
                    <div className=" w-[100%] flex flex-row scr420:justify-end justify-center items-center gap-[8px]  ">
                      <button
                        className={` rounded-[12px] ml:px-[22.8px] xsm:px-2 px-1 ${!resultType
                          ? "bg-blue text-white btn_hover_effect"
                          : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                          } ml:min-w-[235px] ms:min-w-[180px] py-2  flex gap-2 ml:text-[16px] ms:text-[14px] scr420:text-[12px] text-[10px] justify-center items-center   h-[40px] font-semibold`}
                        onClick={() => setResultType(false)}
                      >
                        Quick Assesment Result
                      </button>
                      <button
                        className={`rounded-[12px] ms:min-w-[138px] flex justify-center items-center ${resultType
                          ? "bg-blue text-white btn_hover_effect"
                          : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                          }  py-2 scr420:px-6 xsm:px-2 px-1  ml:text-[16px] ms:text-[14px] scr420:text-[12px] text-[10px] font-medium  h-[40px] `}
                        onClick={() => setResultType(true)}
                      >
                        Certified Assesment Result
                      </button>
                    </div>
                    // </div>
                  )}
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center w-[100%] gap-6">
                  <div
                    className={`p-[12px] ms:px-[60px] ms:customMargins ${showSecondDiv ? "lg:w-[50%]" : "w-[95%] "
                      } scr1024:w-[50%] sm:w-[85%] w-[100%]  px-[12px] rounded-[12px] bg-[#005A81] flex flex-col  items-center gap-[8px] scr820:gap-[16px] `}
                  >
                    <div className="text-[20px] font-[600] text-[#fff] flex flex-row gap-[12px] text-center">
                      <Assessmentlogo />
                      {camelCase(selectedSkill)} Assessment
                    </div>
                    <div className="flex w-full gap-[6px] xsm:gap-[8px] sm:justify-between text-center ">
                      <div
                        className="w-full scr820:w-[136px] p-[8px] flex flex-col rounded-[12px] justify-center items-center gap-[8px]"
                        style={{
                          backgroundColor: "rgba(6, 169, 239, 0.50)",
                          backdropFilter: "blur(22.5px)",
                        }}
                      >
                        <svg
                          xlgns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 40 40"
                          fill="none"
                          className=" scr820:w-[40px]"
                        >
                          <g mask="url(#mask0_4403_58326)">
                            <path
                              d="M26.6875 35.279C25.725 35.279 24.9034 34.9392 24.2226 34.2597C23.5418 33.5803 23.2014 32.7602 23.2014 31.7995V25.1461C23.2014 24.1896 23.5418 23.3706 24.2226 22.689C24.9034 22.0074 25.725 21.6666 26.6875 21.6666H33.3343C34.2968 21.6666 35.1184 22.0074 35.7992 22.689C36.48 23.3706 36.8204 24.1896 36.8204 25.1461V31.7995C36.8204 32.7602 36.48 33.5803 35.7992 34.2597C35.1184 34.9392 34.2968 35.279 33.3343 35.279H26.6875ZM26.3644 32.1226H33.6573V24.823H26.3644V32.1226ZM3.05859 30.0543V26.8913H18.1881V30.0543H3.05859ZM26.6875 18.3333C25.725 18.3333 24.9034 17.9929 24.2226 17.3121C23.5418 16.6313 23.2014 15.8097 23.2014 14.8472V8.20048C23.2014 7.23795 23.5418 6.4163 24.2226 5.73552C24.9034 5.05474 25.725 4.71436 26.6875 4.71436H33.3343C34.2968 4.71436 35.1184 5.05474 35.7992 5.73552C36.48 6.4163 36.8204 7.23795 36.8204 8.20048V14.8472C36.8204 15.8097 36.48 16.6313 35.7992 17.3121C35.1184 17.9929 34.2968 18.3333 33.3343 18.3333H26.6875ZM26.3644 15.1703H33.6573V7.8774H26.3644V15.1703ZM3.05859 13.102V9.94565H18.1881V13.102H3.05859Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                        <div className="text-[12px] scr820:text-[18px] text-[#fff] font-[600] flex flex-col items-center">
                          {assesmentType === "Normal" ? 10 : 60} MCQs
                        </div>
                        <div className="text-[10px] scr820:text-[13px] text-[#fff] font-[500] flex flex-col items-center">
                          4 Options each
                        </div>
                      </div>
                      <div
                        className="w-full scr820:w-[136px] p-[8px] flex flex-col rounded-[12px] justify-center items-center gap-[8px] "
                        style={{
                          backgroundColor: "rgba(6, 169, 239, 0.50)",
                          backdropFilter: "blur(22.5px)",
                        }}
                      >
                        <svg
                          xlgns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g mask="url(#mask0_4403_58332)">
                            <path
                              d="M20.0004 36.9456C17.6682 36.9456 15.4719 36.502 13.4113 35.6148C11.3507 34.7276 9.55303 33.5167 8.01831 31.9819C6.48359 30.4472 5.27265 28.6497 4.38548 26.5893C3.49828 24.5289 3.05469 22.3327 3.05469 20.0008C3.05469 17.6504 3.49828 15.4446 4.38548 13.3836C5.27265 11.3226 6.48324 9.5293 8.01727 8.00361C9.5513 6.47791 11.3487 5.2705 13.4094 4.38136C15.4701 3.49219 17.6666 3.04761 19.9989 3.04761C22.3497 3.04761 24.5559 3.49201 26.6174 4.38082C28.6789 5.26965 30.4723 6.47662 31.9977 8.00173C33.5231 9.52682 34.7302 11.32 35.6192 13.3811C36.5082 15.4423 36.9526 17.6486 36.9526 19.9999C36.9526 20.7781 36.9034 21.5494 36.8049 22.3139C36.7063 23.0784 36.555 23.822 36.3509 24.5446C35.9675 24.1404 35.5301 23.8092 35.0386 23.5511C34.5471 23.2929 34.0182 23.1238 33.4518 23.0437C33.5655 22.5521 33.6502 22.055 33.706 21.5521C33.7617 21.0493 33.7896 20.5319 33.7896 19.9999C33.7896 16.1561 32.4524 12.8969 29.7779 10.2224C27.1033 7.5479 23.8431 6.21065 19.997 6.21065C16.1695 6.21065 12.915 7.5479 10.2334 10.2224C7.55188 12.8969 6.2111 16.1572 6.2111 20.0032C6.2111 23.8307 7.55133 27.0853 10.2318 29.7668C12.9122 32.4484 16.1675 33.7892 19.9976 33.7892C21.5258 33.7892 22.9767 33.554 24.3503 33.0836C25.7239 32.6131 26.9828 31.9644 28.1269 31.1373C28.4298 31.5966 28.7939 32.0051 29.2191 32.3627C29.6443 32.7203 30.1124 32.9981 30.6232 33.1961C29.1666 34.3766 27.5369 35.2967 25.7342 35.9562C23.9316 36.6158 22.0203 36.9456 20.0004 36.9456ZM32.545 30.2478C31.9865 30.2478 31.5136 30.0541 31.1266 29.6669C30.7395 29.2796 30.546 28.806 30.546 28.2463C30.546 27.6884 30.7396 27.2165 31.1269 26.8304C31.5142 26.4444 31.9877 26.2514 32.5475 26.2514C33.1053 26.2514 33.5773 26.4447 33.9633 26.8312C34.3493 27.2176 34.5423 27.6901 34.5423 28.2487C34.5423 28.8073 34.3491 29.2801 33.9626 29.6672C33.5761 30.0542 33.1036 30.2478 32.545 30.2478ZM25.7941 28.0186L18.5719 20.6049V11.3486H21.5955V19.3779L28.0112 25.8215L25.7941 28.0186Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                        <div className="text-[12px] scr820:text-[18px] text-[#fff] font-[600] flex flex-col items-center">
                          {assesmentType === "Normal" ? 5 : 30} Minutes
                        </div>
                        <div className="text-[10px] scr820:text-[13px] text-[#fff] font-[500] flex flex-col items-center">
                          30 seconds per Question
                        </div>
                      </div>
                      <div
                        className="w-full scr820:w-[136px] p-[8px] flex flex-col rounded-[12px] justify-center items-center gap-[8px]"
                        style={{
                          backgroundColor: "rgba(6, 169, 239, 0.50)",
                          backdropFilter: "blur(22.5px)",
                        }}
                      >
                        <svg
                          xlgns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g mask="url(#mask0_4403_58338)">
                            <path
                              d="M15.9248 9.36795H18.7557V6.5437H15.9248V9.36795ZM21.58 9.36795V6.5437H24.4108V9.36795H21.58ZM15.9248 20.6783V17.854H18.7557V20.6783H15.9248ZM27.2351 15.0231V12.1989H30.066V15.0231H27.2351ZM27.2351 20.6783V17.854H30.066V20.6783H27.2351ZM21.58 20.6783V17.854H24.4108V20.6783H21.58ZM27.2351 9.36795V6.5437H30.066V9.36795H27.2351ZM18.7557 12.1989V9.36795H21.58V12.1989H18.7557ZM9.9375 33.589V6.5437H13.1005V9.36795H15.9248V12.1966H13.1005V15.0253H15.9248V17.854H13.1005V33.589H9.9375ZM24.4108 17.854V15.0231H27.2351V17.854H24.4108ZM18.7557 17.854V15.0231H21.58V17.854H18.7557ZM15.9248 15.0231V12.1989H18.7557V15.0231H15.9248ZM21.58 15.0231V12.1989H24.4108V15.0231H21.58ZM24.4108 12.1989V9.36795H27.2351V12.1989H24.4108Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                        <div className="text-[12px] scr820:text-[18px] text-[#fff] font-[600] flex flex-col items-center">
                          {assesmentType === "Normal"
                            ? "Quick Result"
                            : "Quick Certification"}
                        </div>
                        <div className="text-[10px] scr820:text-[13px] text-[#fff] font-[500] flex flex-col items-center">
                          See your score after the Test
                        </div>
                      </div>
                    </div>
                    <div className="text-[14px] scr820:text-[16px] text-[#fff] font-[600] flex justify-center items-center">
                      Get ready to test your Skill!
                    </div>
                    <div className="flex flex-col justify-between items-center text-center w-full">
                      <div className="text-[10px] scr820:text-[12px] text-[#fff] font-[500] ">
                        The Test begins as soon as you click
                        <span className="text-[10px] scr820:text-[12px] text-[#fff] font-[700]">
                          {" "}
                          Start.
                        </span>
                      </div>
                      <div className="text-[10px] scr820:text-[12px] text-[#fff] font-[500] ">
                        Make sure you have a stable internet connection.
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        // setisLevel(true);
                        handleStart();
                      }}
                    >
                      <button
                        className="btn_hover_effect hover:border-[#ffc82c] h-[42px] w-[108px] flex items-center justify-center  rounded-[8px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] text-[#333] text-[14px] font-[500] "
                        disabled={loading}
                      // onClick={() =>
                      //   setQuestionIndex(
                      //     questionIndex + 1 < 10 ? questionIndex + 1 : 9
                      //   )
                      // }
                      >
                        {loading ? <MiniLoader /> : " Get Started"}
                      </button>
                    </div>
                  </div>

                  {showSecondDiv && (
                    <div className="flex flex-col  justify-center items-center lg:w-[60%] sm:w-[85%]  w-[100%] gap-6 ">
                      {!resultType ? (
                        <div className="flex flex-col justify-start items-center rounded-lg shadow-md  w-[100%] ">
                          <div className="flex h-16 scr420:px-4 px-2 py-3  items-center self-stretch border-b border-solid border-[#DEDEDE] bg-[#E0F6FF] rounded-lg justify-between">
                            <div className="flex w-[50%] justify-between items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                              <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                                Assessment Name
                              </p>
                            </div>
                            <div className="flex  w-[30%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                              <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                                Date
                              </p>
                            </div>
                            <div className="flex w-[20%] justify-center items-center self-stretch  ">
                              <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                                Score
                              </p>
                            </div>
                          </div>
                          <div className="max-h-[388px] lg:h-[285px] w-full overflow-auto ">
                            {assessmentList
                              ?.filter((data) => data.isCertification !== true)
                              ?.map((item, index) => (
                                <div
                                  key={index}
                                  className="border-b border-solid border-[#DEDEDE] w-full"
                                >
                                  <div className="flex  text-center gap-2 justify-between flex-row lg:gap-[14px] py-[8px] scr420:px-4 px-2 w-[100%] lg:w-full items-center self-stretch ">
                                    <div className="  w-[50%]  flex justify-between gap-[12px]">
                                      <div className="flex  gap-3 items-center self-stretch ">
                                        <div className="w-[40px] h-[40px]">
                                          <Assessmentlogo />
                                        </div>
                                        <div className="w-full">
                                          <p className="text-text-primary text-start break-word font-montserrat text-base font-medium leading-6">
                                            {item.skill}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex w-[30%] justify-center items-center self-stretch ">
                                      <p className="text-[14px] font-montserrat text-base font-medium leading-6">
                                        {item?.date && formatDate(item?.date)}
                                      </p>
                                    </div>
                                    <div className="flex w-[20%] justify-center items-center self-stretch  ">
                                      <p className="text-[#0C8A0A] items-center  font-montserrat text-sm font-semibold leading-7">
                                        {item.score} / 10
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-start items-center rounded-lg shadow-md lg:w-[100%] sm:w-[100%]  w-[100%] ">
                          <div className="flex h-16 scr420:px-4 px-2 py-3  items-center self-stretch border-b border-solid border-[#DEDEDE] bg-[#E0F6FF] rounded-lg justify-between">
                            <div className="flex w-[36.04%] ms:w-[50%] justify-between items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                              <p className="text-text-primary font-montserrat text-[12px] ms:text-base font-medium leading-6">
                                Assessment Name
                              </p>
                            </div>
                            <div className="flex w-[19.76%] ms:w-[30%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                              <p className="text-text-primary font-montserrat text-[12px] ms:text-base font-medium leading-6">
                                Date
                              </p>
                            </div>
                            <div className="flex w-[19.76%] ms:w-[20%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                              <p className="text-text-primary font-montserrat text-[12px] ms:text-base font-medium leading-6">
                                Score
                              </p>
                            </div>
                            <div className="flex w-[19.76%] ms:w-[20%] justify-center items-center self-stretch  ">
                              <p className="text-text-primary font-montserrat text-[12px] ms:text-base font-medium leading-6">
                                Certificate
                              </p>
                            </div>
                          </div>
                          <div className="max-h-[388px] lg:h-[285px] w-full overflow-auto ">
                            {assessmentList
                              ?.filter((data) => data.isCertification === true)
                              ?.map((item, index) => (
                                <div
                                  key={index}
                                  className="border-b border-solid border-[#DEDEDE] w-full"
                                >
                                  <div className="flex  text-center   flex-row  py-[8px] scr420:px-4 px-2  w-[100%] lg:w-full items-center self-stretch justify-between">
                                    <div className=" w-[36.04%] ms:w-[50%]  flex justify-between gap-[12px]">
                                      <div className="flex  gap-3 items-center self-stretch ">
                                        <div className="w-[40px] h-[40px]">
                                          <Assessmentlogo />
                                        </div>
                                        <div className="w-full">
                                          <p className="text-text-primary text-start break-word font-montserrat text-[10px] ms:text-base font-medium leading-6">
                                            {item.skill}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex  justify-center items-center self-stretch w-[19.76%] ms:w-[30%]">
                                      <p className=" font-montserrat text-[10px] ms:text-base font-medium leading-6">
                                        {item?.date && formatDate(item?.date)}
                                      </p>
                                    </div>
                                    <div className="flex  justify-center w-[20%]  items-center self-stretch  ">
                                      <p className="text-[#0C8A0A] items-center  font-montserrat text-sm font-semibold leading-7">
                                        {formatScore(item.score)}%
                                        {/* let percentageScore = ((correctAnswers * 100) / totalQuestions).toFixed(2); */}
                                      </p>
                                    </div>

                                    <div className="flex w-[19.76%] ms:w-[20%] justify-center items-center self-stretch  text-[10px] ms:text-base font-medium leading-6 ">
                                      {Number(formatScore(item.score)) >= 70 ?
                                        <button onClick={() => generatePdf3(item, index)} className="text-[#06A9EF] items-center font-montserrat text-[10px] ms:text-base font-semibold leading-4">
                                          {index === viewCertificate ?
                                            <>
                                              {viewCertificateLoader ?
                                                <svg
                                                  aria-hidden="true"
                                                  className="w-6 h-6 text-[#e0e0e0] animate-spin fill-[#06a9ef]"
                                                  viewBox="0 0 100 101"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                  />
                                                  <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                  />
                                                </svg>
                                                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                  <g mask="url(#mask0_5292_61102)">
                                                    <path d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#06A9EF" />
                                                  </g>
                                                </svg>
                                              }
                                            </>
                                            :
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                              <g mask="url(#mask0_5292_61102)">
                                                <path d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#06A9EF" />
                                              </g>
                                            </svg>}
                                        </button>
                                        :
                                        <svg className=" cursor-not-allowed" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                          <g mask="url(#mask0_5292_61102)">
                                            <path d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#DEDEDE" />
                                          </g>
                                        </svg>}

                                    </div>

                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {toggle === 1 && (
            <div className="flex flex-col gap-4 customMargins py-12">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 justify-between items-center">
                  <div className="flex gap-4 items-center sm:text-[20px] scr360:text-[18px] text-[16px] font-medium">
                    <Assessmentlogo />
                    <p>{camelCase(selectedSkill)} Assessment</p>
                  </div>
                  <Timer
                    startTimer={startTimer}
                    setIsTimerOver={setIsTimerOver}
                    questionIndex={questionIndex}
                    timer={timer}
                    setTimer={setTimer}
                    setQuestionIndex={setQuestionIndex}
                    setStartTimer={setStartTimer}
                    question={question}
                    answerSetter={answerSetter}
                  />
                </div>
                <div className="flex gap-4 w-full items-center">
                  <div className=" relative h-[10px] rounded-[6px] bg-[#DEDEDE] w-full">
                    <div
                      className={`absolute h-[10px] rounded-[6px] bg-[#06A9EF] `}
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>
                  <p className="text-[16px] flex justify-end font-semibold scr420:w-[70px] w-[85px]">
                    {" "}
                    {questionIndex + 1} / {assesmentType === "Normal" ? 10 : 60}
                  </p>
                </div>
                <div
                  className="bg-white p-4 rounded-[16px] flex flex-col gap-9 mt-2"
                  style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
                >
                  <div className="flex flex-col gap-6 ">
                    <p className="text-[#333333] font-medium">
                      Question {questionIndex + 1}
                    </p>
                    <div className="flex flex-col gap-8 text-[#333333] font-medium ms:text-[16px] text-[14px]">
                      <p> {question[questionIndex]?.question}</p>
                    </div>
                    <div className="w-full flex  flex-col gap-5">
                      {question[questionIndex]?.options.map((option, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <input
                            type="radio"
                            className="custom-radio min-w-[17px] min-h-[17px] mt-[2px]"
                            id={`option${index}`}
                            name="options"
                            value={option}
                            checked={isSelected(
                              option,
                              questionIndex + 1,
                              question[questionIndex]?.question
                            )}
                            onChange={() => {

                              answerSetter(
                                questionIndex + 1,
                                option,
                                question[questionIndex]?.question,

                              )

                            }
                            }
                          />
                          <label
                            htmlFor={`option${index}`}
                            className="text-[14px] ms:text-[16px] font-[500] leading-tight"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-6 ">
                    <button
                      style={{ opacity: !btnEnable ? "0.5" : 1 }}
                      disabled={!btnEnable}
                      className="flex flex-row gap-[3px] items-center cursor-pointer text-[16px] font-[500]   px-[24px] py-[12px] justify-between leading-tight  rounded-[12px] border-[1px] border-solid border-[#06A9EF] "
                      onClick={() => {
                        setIsNext(!isNext)
                        resetSelection();
                        setBtnEnable(false);
                        skippedQuestion()
                        let result = assesmentType === "Normal" ? 9 : 59;
                        if (questionIndex === result) {
                          setIsSubmit(true);
                        }
                      }}
                    >
                      Skip
                    </button>

                    <button
                      className="flex flex-row gap-[3px] items-center px-6 py-3 rounded-[12px] bg-blue leading-tight text-white justify-center text-[16px] font-[600] "
                      style={{ opacity: !btnEnable || !btnEnable1 ? "0.5" : 1 }}
                      disabled={!btnEnable || !btnEnable1}
                      onClick={() => {
                        setIsNext(!isNext)
                        setBtnEnable(false);
                        setBtnEnable1(false)
                        sumbit();

                        let result = assesmentType === "Normal" ? 9 : 59;
                        if (questionIndex === result) {
                          setIsSubmit(true);
                        }
                      }}
                    >
                      {assesmentType === "Normal"
                        ? questionIndex == 9
                          ? "Submit"
                          : "Next"
                        : questionIndex == 59
                          ? "Submit"
                          : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {score && (
            <>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60 "></div>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                <div className="absolute ms:w-[75.08%] w-[90%]  flex items-center justify-center ">
                  <div
                    className="rounded-[12px] bg-[#fff] w-[500px]  flex flex-col gap-[8px] items-center"
                    style={{
                      boxShadow: " 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="text-[#333] px-[12px] pt-[12px] text-[20px] font-[600] flex justify-start w-full">
                      Assessment Score
                    </div>
                    <div className="w-full bg-[#0C8A0A] py-[12px] px-[30px] text-[#fff] text-[18px] font-[600] text-center">
                      Assessment Completed
                    </div>
                    <div className="px-[12px] w-full">
                      <div
                        className="p-[12px] w-full flex flex-col gap-[16px] rounded-[8px] "
                        style={{
                          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <div className="flex items-center gap-[4px] text-[#333] text-[16px]  font-[600]">
                          <Assessmentlogo />
                          {camelCase(selectedSkill)} Assessment
                        </div>
                        <div className="flex flex-col gap-[16px] w-full">
                          {/* <div className="text-[#0C8A0A] text-[16px] font-[600] ">
                            Completed
                          </div> */}
                          <div className="">
                            <div className="flex justify-between items-center">
                              <div className="text-[14px] font-[600] text-[#646464] flex gap-[4px]">
                                <svg
                                  xlgns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_5925_115287)">
                                    <path
                                      d="M8.83073 14.3332L14.7057 8.45817L13.5391 7.2915L8.83073 11.9998L6.45573 9.62484L5.28906 10.7915L8.83073 14.3332ZM9.9974 18.8332C8.84462 18.8332 7.76128 18.6144 6.7474 18.1769C5.73351 17.7394 4.85156 17.1457 4.10156 16.3957C3.35156 15.6457 2.75781 14.7637 2.32031 13.7498C1.88281 12.7359 1.66406 11.6526 1.66406 10.4998C1.66406 9.34706 1.88281 8.26373 2.32031 7.24984C2.75781 6.23595 3.35156 5.354 4.10156 4.604C4.85156 3.854 5.73351 3.26025 6.7474 2.82275C7.76128 2.38525 8.84462 2.1665 9.9974 2.1665C11.1502 2.1665 12.2335 2.38525 13.2474 2.82275C14.2613 3.26025 15.1432 3.854 15.8932 4.604C16.6432 5.354 17.237 6.23595 17.6745 7.24984C18.112 8.26373 18.3307 9.34706 18.3307 10.4998C18.3307 11.6526 18.112 12.7359 17.6745 13.7498C17.237 14.7637 16.6432 15.6457 15.8932 16.3957C15.1432 17.1457 14.2613 17.7394 13.2474 18.1769C12.2335 18.6144 11.1502 18.8332 9.9974 18.8332ZM9.9974 17.1665C11.8585 17.1665 13.4349 16.5207 14.7266 15.229C16.0182 13.9373 16.6641 12.3609 16.6641 10.4998C16.6641 8.63873 16.0182 7.06234 14.7266 5.77067C13.4349 4.479 11.8585 3.83317 9.9974 3.83317C8.13628 3.83317 6.5599 4.479 5.26823 5.77067C3.97656 7.06234 3.33073 8.63873 3.33073 10.4998C3.33073 12.3609 3.97656 13.9373 5.26823 15.229C6.5599 16.5207 8.13628 17.1665 9.9974 17.1665Z"
                                      fill="#0C8A0A"
                                    />
                                  </g>
                                </svg>
                                You got Right{" "}
                              </div>
                              <div className="text-[22px] font-[600] text-[#263751]">
                                {checkAnswer()} Answers
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <div className="text-[14px] font-[600] text-[#646464] flex gap-[4px]">
                                <svg
                                  xlgns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_5925_115296)">
                                    <path
                                      d="M6.9974 14.6665L9.9974 11.6665L12.9974 14.6665L14.1641 13.4998L11.1641 10.4998L14.1641 7.49984L12.9974 6.33317L9.9974 9.33317L6.9974 6.33317L5.83073 7.49984L8.83073 10.4998L5.83073 13.4998L6.9974 14.6665ZM9.9974 18.8332C8.84462 18.8332 7.76128 18.6144 6.7474 18.1769C5.73351 17.7394 4.85156 17.1457 4.10156 16.3957C3.35156 15.6457 2.75781 14.7637 2.32031 13.7498C1.88281 12.7359 1.66406 11.6526 1.66406 10.4998C1.66406 9.34706 1.88281 8.26373 2.32031 7.24984C2.75781 6.23595 3.35156 5.354 4.10156 4.604C4.85156 3.854 5.73351 3.26025 6.7474 2.82275C7.76128 2.38525 8.84462 2.1665 9.9974 2.1665C11.1502 2.1665 12.2335 2.38525 13.2474 2.82275C14.2613 3.26025 15.1432 3.854 15.8932 4.604C16.6432 5.354 17.237 6.23595 17.6745 7.24984C18.112 8.26373 18.3307 9.34706 18.3307 10.4998C18.3307 11.6526 18.112 12.7359 17.6745 13.7498C17.237 14.7637 16.6432 15.6457 15.8932 16.3957C15.1432 17.1457 14.2613 17.7394 13.2474 18.1769C12.2335 18.6144 11.1502 18.8332 9.9974 18.8332ZM9.9974 17.1665C11.8585 17.1665 13.4349 16.5207 14.7266 15.229C16.0182 13.9373 16.6641 12.3609 16.6641 10.4998C16.6641 8.63873 16.0182 7.06234 14.7266 5.77067C13.4349 4.479 11.8585 3.83317 9.9974 3.83317C8.13628 3.83317 6.5599 4.479 5.26823 5.77067C3.97656 7.06234 3.33073 8.63873 3.33073 10.4998C3.33073 12.3609 3.97656 13.9373 5.26823 15.229C6.5599 16.5207 8.13628 17.1665 9.9974 17.1665Z"
                                      fill="#C00000"
                                    />
                                  </g>
                                </svg>
                                You got Wrong{" "}
                              </div>
                              <div className="text-[22px] font-[600] text-[#263751]">
                                {answer.length - checkAnswer()} Answers
                              </div>
                            </div>
                          </div>
                          <div className="text-[18px] text-[#5B5B5B] font-[600]">
                            Your Score is{" "}
                            {assesmentType === "Normal" && checkAnswer()}
                            {assesmentType === "Normal" && `/${10}`}
                            {assesmentType !== "Normal" && (
                              <>{calculateMarkOutOf60()}</>
                            )}
                          </div>

                          {assesmentType !== "Normal" && (
                            <>

                              {calculateMarkOutOf60() >= "70%" ? (
                                <div className="text-[18px] text-[#0C8A0A] font-[600]">
                                  You are eligible for Certificate
                                </div>
                              ) : (
                                <di className="text-[14px] text-[#C00000] font-[500]">
                                  The resulted score did not meet the Certification requirements. You may try again! (Required above 70%)

                                </di>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex  justify-between items-center pb-[12px] ${assesmentType !== "Normal" &&
                        calculateMarkOutOf60() >= "70%"
                        ? "sm:w-[90%] w-[95%]"
                        : "w-[80%]"
                        } `}
                    >
                      <button
                        onClick={() => {
                          setScore(false);
                          setSelectedSkill();
                          setQuestionIndex(0);
                          setQuestion([]);
                          setSkipped([]);
                          setUniqueQuestions([]);
                          setIsSubmit(false);
                          setIsNext(!isNext)
                          // setSkippedArray([])
                          // window.location.reload();
                          setBtnEnable1(false)
                          dispatch(reCallUserData());
                        }}
                        className="border-[1px]  border-solid bg-[#ffffff] hover:bg-[#06A9EF] hover:text-[#ffffff] border-[#06A9EF] rounded-[12px] px-[14px] sm:px-[24px] py-[8px] text-[12px] scr700:text-[16px] text-[#333] font-[500]"
                      >
                        Close
                      </button>

                      {assesmentType !== "Normal" &&
                        calculateMarkOutOf60() >= "70%" && (
                          <button
                            className="btn_hover_effect min-w-[132.78px] flex justify-center items-center rounded-[12px] px-[12px] sm:px-[14px] py-[8px] text-[12px] scr700:text-[16px]  font-[500] bg-blue text-white"
                            onClick={() => generatePdf2()}
                          >
                            {loading3 && <MiniLoader />}
                            {!loading3 && "Download Certificate"}

                          </button>
                        )}
                      <button
                        className="btn_hover_effect  min-w-[60.78px] sm:min-w-[132.78px] flex justify-center items-center   rounded-[12px] px-[8px] sm:px-[24px] py-[8px] text-[12px] scr700:text-[16px] font-[500] bg-blue text-white"
                        onClick={() => handleDownload()}
                      >
                        {" "}
                        {loadingg && <MiniLoader />}
                        {!loadingg && "Download"}
                      </button>
                    </div>

                    {/* <div
                      className="absolute overflow-hidden left-[-5000px]"
                      ref={resumeRef}
                    >
                      <Result
                        questions={question}
                        answers={answer}
                        selectedSkill={selectedSkill}
                        checkAnswer={checkAnswer}
                      />
                    </div> */}

                    <div
                      className="absolute overflow-hidden left-[-8000px]"
                      ref={resumeRef1}
                    >
                      <Certificate
                        selectedSkill={selectedSkill}
                        level={level}
                        downloadCertificate={downloadCertificate}
                        setDownloadCertificate={setDownloadCertificate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div
            className="flex overflow-hidden absolute left-[-9999px]"
          >
            <ResultPdf
              questions={question}
              answers={answer}
              selectedSkill={selectedSkill}
              checkAnswer={checkAnswer}
              firstContainer={firstContainer}
              secondContainer={secondContainer}
              thirdContainer={thirdContainer}
              fourthContainer={fourthContainer}
              fifthContainer={fifthContainer}
              sixthContainer={sixthContainer}
              seventhContainer={seventhContainer}
              eighthContainer={eighthContainer}
              ninthContainer={ninthContainer}
              tenthContainer={tenthContainer}
              assesmentType={assesmentType}
              level={level}
              isSubmit={isSubmit}
              questionIndex={questionIndex}
              isNext={isNext}
            />
          </div>
        </div>
      )}
      <div
        className="absolute overflow-hidden left-[-8000px]"
        ref={resumeRef2}
      >
        <Certificate
          selectedSkill={viewCertificateData.skill}
          level={viewCertificateData.level}
          downloadCertificate={viewCertificateData}
          setDownloadCertificate={setDownloadCertificate}
        />
      </div>

    </div>
  );
}

export default SkillAssessment;
