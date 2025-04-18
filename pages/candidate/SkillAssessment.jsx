import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MiniLoader from "../../components/common/mini-loader";
import MiniLoader2 from "../../components/common/miniLoader";
import { camelCase, dateSeter, formatDate } from "../../utils/middleware";
import Timer from "../../components/common/timer";
import { Assessmentlogo, ClosedIcon30 } from "../../utils/svg";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

import Certificate from "../../components/featured/home/Certificate";
import LimitUsedModal from "../../components/models/limitUsedModal";
import ResultPdf from "../../components/featured/home/ResultPdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { updateAiHit } from "../../Redux/slices/aiHitsSlice";
import { setRecallData } from "../../Redux/slices/recallSlice";

function SkillAssessment() {
  const resumeRef = useRef();
  const resumeRef1 = useRef();
  const resumeRef2 = useRef();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [reCall, forceUpdate] = useReducer((x) => x + 1.0);
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
  const [isLevel, setisLevel] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState();
  const [userSkills, setUserSkills] = useState();
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(30);
  const [attemptCount, setAttemptCtn] = useState();
  const [isPlan, setIsplan] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  const [level, setLevel] = useState("Intermediate");
  const [resultType, setResultType] = useState(false);
  const [assesmentType, setAssesmentType] = useState("Normal");
  const [downloadCertificate, setDownloadCertificate] = useState([]);
  const [viewCertificate, setViewCertificate] = useState();
  const [viewCertificateData, setViewCertificateData] = useState([]);
  const [viewCertificateLoader, setViewCertificateLoader] = useState(false);
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
  const [isHovered, setIsHovered] = useState(false);
  const barWidth = Math.ceil(
    ((questionIndex + 1) * 100) / (assesmentType === "Normal" ? 10 : 60)
  );

  const [skippedArray, setSkippedArray] = useState([]);
  const [skillTestCount, setSkillTestCount] = useState(0);
  const [skillCertifiedCount, setSkillCertifiedCount] = useState(0);
  const [skillTestCountLimit, setSkillTestCountLimit] = useState(0);
  const [skillCertifiedCountLimit, setSkillCertifiedCountLimit] = useState(0);
  const [aiHitMonthly, setAiHitMonthly] = useState(0);
  const [aiHitMonthlyLimit, setAiHitMonthlyLimit] = useState(0);
  const [activePlan, setActivePlan] = useState();
  const { recallData } = useSelector((state) => state.recall);
  // const getLimits = () => {
  //   const skillTestCount = JSON.parse(localStorage.getItem("skillTestCount"));
  //   const skillCertifiedCount = JSON.parse(
  //     localStorage.getItem("skillCertifiedCount")
  //   );
  //   const skillTestCountLimit = JSON.parse(
  //     localStorage.getItem("skillTestCountLimit")
  //   );
  //   const skillCertifiedCountLimit = JSON.parse(
  //     localStorage.getItem("skillCertifiedCountLimit")
  //   );

  //   if (skillTestCount) {
  //     setSkillTestCount(skillTestCount);
  //   }
  //   if (skillCertifiedCount) {
  //     setSkillCertifiedCount(skillCertifiedCount);
  //   }

  //   if (skillTestCountLimit) {
  //     setSkillTestCountLimit(skillTestCountLimit);
  //   }
  //   if (skillCertifiedCountLimit) {
  //     setSkillCertifiedCountLimit(skillCertifiedCountLimit);
  //   }
  // };

  // useEffect(() => {
  //   getLimits();
  // }, []);

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
  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setisLevel(false);
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
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    axios
      .get("https://jamblix.com/api/allSkills")
      .then((res) => {
        const names = res.data.map((skill) => skill.name);

        setSkills(names);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [skillList]);

  const handleInputChange = async (selectedOption) => {
    const found = skills?.find((item) => item === selectedOption?.label);
    if (!found) {
      try {
        const response = await fetch("https://jamblix.com/api/skills", {
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

  useEffect(() => {
    if (question.length > 0) {
      if (
        assesmentType === "Normal"
          ? question.length < 10
          : question.length < 60 && selectedSkill
      ) {
        toggleContent();
      }
    }
  }, [question]);

  useEffect(() => {
    setMainLoading(true);
    axios
      .get("https://jamblix.com/api/resume/skills/" + userDataGlobal?._id)
      .then((res) => {
        setData(res.data.data);
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
          format: "letter",
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
          .post("https://jamblix.com/api/qnaSkill", {
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
              }
            } else {
              console.error("Backend error: ", res.data.error);
              setQuestion(question);
              toggleContent();
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
    setBtnEnable1(false);
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
  };

  const sumbit = () => {
    setStartTimer(false);

    setTimer(30);
    if (assesmentType === "Normal" ? questionIndex == 9 : questionIndex == 59) {
      axios
        .post("https://jamblix.com/api/assessment/add", {
          userId: userDataGlobal?._id,
          skill: selectedSkill,
          score: checkAnswer(),
          date: new Date(),
          level: level,
          isCertification: assesmentType !== "Normal" ? true : false,
          count: assesmentType === "Normal" ? attemptCount + 1 : attemptCount,
        })
        .then((res) => {
          // assesmentType === "Normal"
          //   ? localStorage.setItem("skillTestCount", Number(skillTestCount) + 1)
          //   : localStorage.setItem(
          //     "skillCertifiedCount",
          //     Number(skillCertifiedCount) + 1
          //   );
          // const skillTestCount1 = JSON.parse(
          //   localStorage.getItem("skillTestCount")
          // );
          // const skillCertifiedCount1 = JSON.parse(
          //   localStorage.getItem("skillCertifiedCount")
          // );
          // setSkillTestCount(skillTestCount1);
          // setSkillCertifiedCount(skillCertifiedCount1);
          dispatch(updateAiHit(userDataGlobal?._id));
          setTimeout(() => {
            dispatch(setRecallData(!recallData));
            getLimits();
          }, 1000);
          setDownloadCertificate(res.data.data);
          setToggle(0);
          setLoading(false);
          setQuestionIndex(0);
          setSkipped([]);
          setTimeout(() => {
            setScore(true);
            getLimits();
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
    setIsNext(!isNext);
    if (questionIndex && isSubmit === false) {
      timer = setTimeout(() => {
        if (
          assesmentType === "Normal"
            ? questionIndex === 9
            : questionIndex === 59 && isSubmit === false
        ) {
          setIsNext(!isNext);
          sumbit();
        }
      }, 30000);
    }

    return () => clearTimeout(timer);
  }, [questionIndex, isSubmit]);

  useEffect(() => {
    axios
      .get(
        `https://jamblix.com/api/assessment/getByUser/${userDataGlobal?._id}`
      )
      .then((res) => {
        const data = res.data.data;

        const normalCount = data.filter(
          (item) => item.isCertification === false
        ).length;
        const certifiedCount = data.filter(
          (item) => item.isCertification === true
        ).length;

        setAttemptCtn(data.length);
        setAssessmentList(data.reverse());
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
      const updatedSkippedArray = skippedArray.map((item) => {
        if (item.question == question) {
          return { ...item, isSkiped: true, Answer: "" };
        }
        return item;
      });

      setSkippedArray(updatedSkippedArray);
      setAnswer(updatedSkippedArray);
    }
  };
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
    // let correctAnswers = 58;
    let totalQuestions = question.length;
    let percentageScore = parseFloat(
      ((correctAnswers * 100) / totalQuestions).toFixed(2)
    );

    let markOutOf60 = Math.ceil((percentageScore * 60) / 100);
    return percentageScore;
  }

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
    setLoadingg(false);
  };

  // const handleStart = () => {
  //   const isActivePlan = JSON.parse(localStorage.getItem("planActive"));
  //   const activePlan = JSON.parse(localStorage.getItem("activePlan"));
  //   if (!selectedSkill) {
  //     toast.error("Please select a skill to start assessment");
  //   } else if (
  //     isActivePlan &&
  //     assesmentType === "Certificate" &&
  //     skillCertifiedCount < skillCertifiedCountLimit
  //   ) {
  //     setisLevel(true);
  //   } else if (
  //     isActivePlan &&
  //     assesmentType === "Normal" &&
  //     skillTestCount < skillTestCountLimit
  //   ) {
  //     setisLevel(true);
  //   } else {
  //     setisLevel(false);
  //     setIsplan(true);
  //   }
  // };
  const handleStart = () => {
    const isActivePlan = JSON.parse(localStorage.getItem("planActive"));

    if (!selectedSkill) {
      toast.error("Please select a skill to start assessment");
    } else if (isActivePlan && aiHitMonthly < aiHitMonthlyLimit) {
      setisLevel(true);
    } else {
      setisLevel(false);
      setIsplan(true);
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

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "999px",
      border: "1px solid #ddd",
      boxShadow: "none",
      paddingLeft: "16px",
      paddingRight: "40px", 
      height: "40px",
      backgroundColor: "white",
      fontSize: "14px",
      color: "#4B5563", 
      "&:hover": {
        borderColor: "#ccc",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94A3B8", 
    }),
    dropdownIndicator: () => null,
    indicatorSeparator: () => null,
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
                  router.push("/profile");
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
          className="bg-[#F9F9F9] w-full  "
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          {toggle === 0 && (
            <div className="flex flex-col gap-[24px] pt-[24px] pb-[95px] items-center  customMargins">
              <div
                className="  w-[100%] ml:p-[16px] p-2 flex ml:flex-row flex-col justify-between  gap-[16px] rounded-[12px] bg-[#fff]"
                style={{
                  boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="  w-[100%] flex flex-col gap-[16px] rounded-[12px] bg-[#fff] ml:justify-between justify-center ">
                  <div className="flex flex-row gap-4  justify-between items-end w-full">
                    <div className="flex flex-col  gap-4 w-[100%]">
                      <div className="text-[20px] font-medium">My Skills</div>

                      <div className="flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                          <CreatableSelect
                            isClearable
                            options={skills.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            styles={customStyles}
                            placeholder="Search Skill"
                            onChange={handleInputChange}
                            className="w-full"
                            components={{
                              DropdownIndicator: () => null,   
                              IndicatorSeparator: () => null, 
                            }}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.5193 12.6133C4.81164 12.6133 3.36547 12.0211 2.1808 10.8366C0.996302 9.6519 0.404053 8.20573 0.404053 6.49806C0.404053 4.7904 0.996302 3.34423 2.1808 2.15956C3.36547 0.975063 4.81164 0.382812 6.5193 0.382812C8.22697 0.382812 9.67314 0.975063 10.8578 2.15956C12.0423 3.34423 12.6346 4.7904 12.6346 6.49806C12.6346 7.21223 12.5147 7.89431 12.2751 8.54431C12.0352 9.19431 11.7153 9.75965 11.3153 10.2403L17.0693 15.9943C17.2078 16.1326 17.2786 16.3066 17.2818 16.5163C17.285 16.726 17.2141 16.9032 17.0693 17.0481C16.9245 17.1929 16.7488 17.2653 16.5423 17.2653C16.336 17.2653 16.1604 17.1929 16.0156 17.0481L10.2616 11.2941C9.76155 11.7069 9.18655 12.03 8.53655 12.2633C7.88655 12.4966 7.21414 12.6133 6.5193 12.6133ZM6.5193 11.1136C7.8078 11.1136 8.89914 10.6664 9.7933 9.77206C10.6876 8.8779 11.1348 7.78656 11.1348 6.49806C11.1348 5.20956 10.6876 4.11823 9.7933 3.22406C8.89914 2.32973 7.8078 1.88256 6.5193 1.88256C5.2308 1.88256 4.13947 2.32973 3.2453 3.22406C2.35097 4.11823 1.9038 5.20956 1.9038 6.49806C1.9038 7.78656 2.35097 8.8779 3.2453 9.77206C4.13947 10.6664 5.2308 11.1136 6.5193 11.1136Z"
                                fill="#646464"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="text-[#C00000]  ml:min-w-[136px] scr420:min-w-[112px] min-w-[96px] ml:text-[16px]   "
                          onClick={() => setshowSecondDiv(!showSecondDiv)}
                        >
                          {!showSecondDiv ? (
                            <button className="text-[#333333] scr420:text-[12px] text-[10px]  font-[600] gap-[2px] border-[1px] border-[#06A9EF] rounded-[30px] scr420:p-[6px_16px] p-[10px] flex justify-center items-center ">
                              <svg
                                width="18"
                                height="12"
                                viewBox="0 0 18 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.00005 9C9.93755 9 10.7344 8.67188 11.3907 8.01562C12.0469 7.35938 12.375 6.5625 12.375 5.625C12.375 4.6875 12.0469 3.89062 11.3907 3.23438C10.7344 2.57812 9.93755 2.25 9.00005 2.25C8.06255 2.25 7.26567 2.57812 6.60942 3.23438C5.95317 3.89062 5.62505 4.6875 5.62505 5.625C5.62505 6.5625 5.95317 7.35938 6.60942 8.01562C7.26567 8.67188 8.06255 9 9.00005 9ZM9.00005 7.65C8.43755 7.65 7.95942 7.45313 7.56567 7.05938C7.17192 6.66563 6.97505 6.1875 6.97505 5.625C6.97505 5.0625 7.17192 4.58437 7.56567 4.19063C7.95942 3.79688 8.43755 3.6 9.00005 3.6C9.56255 3.6 10.0407 3.79688 10.4344 4.19063C10.8282 4.58437 11.0251 5.0625 11.0251 5.625C11.0251 6.1875 10.8282 6.66563 10.4344 7.05938C10.0407 7.45313 9.56255 7.65 9.00005 7.65ZM9.00005 11.25C7.32505 11.25 5.79692 10.8 4.41567 9.9C3.03442 9 1.9438 7.8125 1.1438 6.3375C1.0813 6.225 1.03442 6.10938 1.00317 5.99063C0.971924 5.87188 0.956299 5.75 0.956299 5.625C0.956299 5.5 0.971924 5.37813 1.00317 5.25938C1.03442 5.14062 1.0813 5.025 1.1438 4.9125C1.9438 3.4375 3.03442 2.25 4.41567 1.35C5.79692 0.45 7.32505 0 9.00005 0C10.675 0 12.2032 0.45 13.5844 1.35C14.9657 2.25 16.0563 3.4375 16.8563 4.9125C16.9188 5.025 16.9657 5.14062 16.9969 5.25938C17.0282 5.37813 17.0438 5.5 17.0438 5.625C17.0438 5.75 17.0282 5.87188 16.9969 5.99063C16.9657 6.10938 16.9188 6.225 16.8563 6.3375C16.0563 7.8125 14.9657 9 13.5844 9.9C12.2032 10.8 10.675 11.25 9.00005 11.25ZM9.00005 9.75C10.4125 9.75 11.7094 9.37813 12.8907 8.63437C14.0719 7.89062 14.975 6.8875 15.6 5.625C14.975 4.3625 14.0719 3.35938 12.8907 2.61562C11.7094 1.87187 10.4125 1.5 9.00005 1.5C7.58755 1.5 6.29067 1.87187 5.10942 2.61562C3.92817 3.35938 3.02505 4.3625 2.40005 5.625C3.02505 6.8875 3.92817 7.89062 5.10942 8.63437C6.29067 9.37813 7.58755 9.75 9.00005 9.75Z"
                                  fill="#646464"
                                />
                              </svg>
                              View Results
                            </button>
                          ) : (
                            <button className="text-[#333333] scr420:text-[12px] text-[10px]  font-[600] gap-[2px] border-[1px] border-[#06A9EF] rounded-[30px] scr420:p-[6px_16px] p-[10px] flex justify-center items-center ">
                              <svg
                                width="18"
                                height="15"
                                viewBox="0 0 18 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.3813 4.24297C11.7438 4.60547 12.0094 5.01797 12.1781 5.48047C12.3469 5.94297 12.4063 6.41797 12.3563 6.90547C12.3563 7.09297 12.2875 7.25234 12.15 7.38359C12.0125 7.51484 11.85 7.58047 11.6625 7.58047C11.475 7.58047 11.3156 7.51484 11.1844 7.38359C11.0531 7.25234 10.9875 7.09297 10.9875 6.90547C11.05 6.58047 11.0313 6.26797 10.9313 5.96797C10.8313 5.66797 10.675 5.41172 10.4625 5.19922C10.25 4.98672 9.99375 4.82422 9.69375 4.71172C9.39375 4.59922 9.075 4.57422 8.7375 4.63672C8.55 4.63672 8.39063 4.56797 8.25938 4.43047C8.12813 4.29297 8.0625 4.13047 8.0625 3.94297C8.0625 3.75547 8.12813 3.59609 8.25938 3.46484C8.39063 3.33359 8.55 3.26797 8.7375 3.26797C9.2125 3.21797 9.68125 3.27734 10.1438 3.44609C10.6063 3.61484 11.0188 3.88047 11.3813 4.24297ZM9 2.49922C8.7625 2.49922 8.53125 2.50859 8.30625 2.52734C8.08125 2.54609 7.85625 2.58047 7.63125 2.63047C7.41875 2.66797 7.22813 2.63672 7.05938 2.53672C6.89063 2.43672 6.775 2.28672 6.7125 2.08672C6.65 1.88672 6.67188 1.69297 6.77813 1.50547C6.88438 1.31797 7.0375 1.20547 7.2375 1.16797C7.525 1.10547 7.81563 1.06172 8.10938 1.03672C8.40313 1.01172 8.7 0.999219 9 0.999219C10.7125 0.999219 12.2781 1.44922 13.6969 2.34922C15.1156 3.24922 16.2 4.46172 16.95 5.98672C17 6.08672 17.0375 6.18984 17.0625 6.29609C17.0875 6.40234 17.1 6.51172 17.1 6.62422C17.1 6.73672 17.0906 6.84609 17.0719 6.95234C17.0531 7.05859 17.0188 7.16172 16.9688 7.26172C16.7438 7.76172 16.4656 8.23047 16.1344 8.66797C15.8031 9.10547 15.4375 9.50547 15.0375 9.86797C14.8875 10.0055 14.7125 10.0617 14.5125 10.0367C14.3125 10.0117 14.15 9.91172 14.025 9.73672C13.9 9.56172 13.8469 9.37109 13.8656 9.16484C13.8844 8.95859 13.9688 8.78672 14.1188 8.64922C14.4188 8.36172 14.6938 8.04922 14.9438 7.71172C15.1938 7.37422 15.4125 7.01172 15.6 6.62422C14.975 5.36172 14.0719 4.35859 12.8906 3.61484C11.7094 2.87109 10.4125 2.49922 9 2.49922ZM9 12.2492C7.325 12.2492 5.79375 11.7961 4.40625 10.8898C3.01875 9.98359 1.925 8.79297 1.125 7.31797C1.0625 7.21797 1.01563 7.10859 0.984375 6.98984C0.953125 6.87109 0.9375 6.74922 0.9375 6.62422C0.9375 6.49922 0.95 6.38047 0.975 6.26797C1 6.15547 1.04375 6.04297 1.10625 5.93047C1.35625 5.43047 1.64688 4.95234 1.97813 4.49609C2.30938 4.03984 2.6875 3.62422 3.1125 3.24922L1.55625 1.67422C1.41875 1.52422 1.35313 1.34609 1.35938 1.13984C1.36563 0.933594 1.4375 0.761719 1.575 0.624219C1.7125 0.486719 1.8875 0.417969 2.1 0.417969C2.3125 0.417969 2.4875 0.486719 2.625 0.624219L15.375 13.3742C15.5125 13.5117 15.5844 13.6836 15.5906 13.8898C15.5969 14.0961 15.525 14.2742 15.375 14.4242C15.2375 14.5617 15.0625 14.6305 14.85 14.6305C14.6375 14.6305 14.4625 14.5617 14.325 14.4242L11.7 11.8367C11.2625 11.9742 10.8188 12.0773 10.3688 12.1461C9.91875 12.2148 9.4625 12.2492 9 12.2492ZM4.1625 4.29922C3.8 4.62422 3.46875 4.98047 3.16875 5.36797C2.86875 5.75547 2.6125 6.17422 2.4 6.62422C3.025 7.88672 3.92813 8.88984 5.10938 9.63359C6.29063 10.3773 7.5875 10.7492 9 10.7492C9.25 10.7492 9.49375 10.7336 9.73125 10.7023C9.96875 10.6711 10.2125 10.6367 10.4625 10.5992L9.7875 9.88672C9.65 9.92422 9.51875 9.95234 9.39375 9.97109C9.26875 9.98984 9.1375 9.99922 9 9.99922C8.0625 9.99922 7.26563 9.67109 6.60938 9.01484C5.95313 8.35859 5.625 7.56172 5.625 6.62422C5.625 6.48672 5.63438 6.35547 5.65313 6.23047C5.67188 6.10547 5.7 5.97422 5.7375 5.83672L4.1625 4.29922Z"
                                  fill="#646464"
                                />
                              </svg>
                              Hide Results
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row gap-[16px] overflow-x-auto flex-wrap ">
                        {userSkills?.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedSkill(item);
                            }}
                            className={`ml:px-4 ml:py-2 px-2 py-1 border-[1px] border-solid border-[#06A9EF] rounded-[25px] ml:text-[14px] text-[12px] font-medium text-[#333]  transition-[0.2s] ${
                              selectedSkill == item && "bg-[#06A9EF] text-white"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!showSecondDiv ? (
                <div className=" w-[100%] flex scr360:flex-row flex-col scr420:gap-[24px] gap-[16px] justify-center ">
                  <button
                    className={` rounded-[30px]  scr420:px-3 px-2   ${
                      assesmentType === "Normal"
                        ? "bg-blue text-white bg_Button text-[12px] "
                        : "bg-white text-[#333] border  text-[12px] font-[600] border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                    }  ml:px-6    py-2   font-[600] `}
                    onClick={() => setAssesmentType("Normal")}
                  >
                    Quick Assessment
                  </button>
                  <button
                    className={` rounded-[30px] scr420:px-3  px-2  text-[12px] ${
                      assesmentType === "Certificate"
                        ? "bg-blue text-white bg_Button text-[14px]"
                        : "bg-white text-[#333] border border-[#06A9EF] font-[600]  hover:bg-[#06A9EF] hover:text-[white]"
                    } ml:px-6   text-[12px] py-2 font-[600]  `}
                    onClick={() => setAssesmentType("Certificate")}
                  >
                    Certification Assessment
                  </button>
                </div>
              ) : (
                <div className=" w-[100%] flex justify-center flex-row gap-[24px] ">
                  {showSecondDiv && (
                    <div className=" w-[100%] flex scr360:flex-row flex-col scr420:gap-[24px] gap-[16px] justify-center  ">
                      <button
                        className={` rounded-[30px]  scr420:px-3 px-2 ]  ${
                          !resultType
                            ? "bg-blue text-white bg_Button"
                            : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                        }  ml:px-6  text-[12px] py-2  font-[600]   `}
                        onClick={() => setResultType(false)}
                      >
                        Quick Assesment Result
                      </button>
                      <button
                        className={` rounded-[30px] scr420:px-3  px-2 ${
                          resultType
                            ? "bg-blue text-white bg_Button text-[12px]"
                            : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                        }  ml:px-6  text-[12px] py-2  font-[600]`}
                        onClick={() => setResultType(true)}
                      >
                        Certification Assesment Result
                      </button>
                    </div>
                  )}
                </div>
              )}

              {isLevel && (
                <>
                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>

                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                    <div
                      ref={taskRef}
                      className="flex sm:py-4 py-2 flex-col text-[20px] leading-tight font-bold justify-center scr420:gap-5 gap-3 scr500:min-w-[489px] min-w-[300px]  bg-white rounded-[16px] relative  "
                    >
                      <div className="w-full flex justify-center items-center">
                        <div
                          onClick={() => setisLevel(false)}
                          className=" cursor-pointer z-[3000] absolute right-2 top-2"
                        >
                          <ClosedIcon30 />
                        </div>
                        <svg
                          width="119"
                          height="80"
                          viewBox="0 0 119 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M59.5001 0C75.6069 0 90.1958 6.49392 100.794 17.0056L96.6407 28.095L90.9404 26.8591C82.864 18.8692 71.7588 13.9349 59.5001 13.9349L50.5396 7.26812L59.5001 0Z"
                            fill="#F93778"
                          />
                          <path
                            d="M28.0596 26.8591L19.6091 23.9092L18.2061 17.0056C28.8043 6.49392 43.3932 0 59.5 0V13.9349C47.2413 13.9349 36.136 18.8692 28.0596 26.8591Z"
                            fill="#75E0F6"
                          />
                          <path
                            d="M118.103 58.2997H104.207C104.113 46.003 99.056 34.8884 90.9399 26.8594L100.793 17.0059C111.431 27.5566 118.009 42.1551 118.103 58.2997Z"
                            fill="#FA7085"
                          />
                          <path
                            d="M14.7927 58.2997H0.897186C0.991041 42.1551 7.56852 27.5566 18.2061 17.0059L28.0596 26.8594C19.9438 34.8884 14.8863 46.003 14.7927 58.2997Z"
                            fill="#01BAFE"
                          />
                          <path
                            d="M16.413 3.19531L28.0596 14.8422V26.8587L14.4587 17.0052L10.4046 9.2037L16.413 3.19531Z"
                            fill="#555C7C"
                          />
                          <path
                            d="M28.0596 26.8581H16.0433L4.39641 15.2115L10.4046 9.20312L28.0596 26.8581Z"
                            fill="#373A5B"
                          />
                          <path
                            d="M59.5011 60.7559H78.6533V74.8594L59.5011 79.9988L57.4903 71.0133L59.5011 60.7559Z"
                            fill="#555C7C"
                          />
                          <path
                            d="M40.3488 60.7559H59.501V79.9988L40.3488 74.8594V60.7559Z"
                            fill="#373A5B"
                          />
                          <path
                            d="M65.0079 50.186L72.9277 53.4035L68.4115 60.7564L67.7989 69.1881L59.5006 67.136L54.1286 56.4183L59.5006 43.6484L65.0079 50.186Z"
                            fill="#FFE643"
                          />
                          <path
                            d="M53.9936 50.186L59.501 43.6484V67.136L51.2027 69.1881L50.59 60.7564L46.0738 53.4035L53.9936 50.186Z"
                            fill="#FFCA00"
                          />
                        </svg>
                      </div>
                      <div className="w-full py-[6px] flex justify-center items-center bg-[#06A9EF] text-[18px] font-[500] text-[#ffffff]">
                        {" "}
                        Select difficulty level
                      </div>
                      <div className="scr500:h-[44px] h-[34px] scr500:px-[20px] px-[12px] w-full flex justify-between">
                        <button
                          className="scr500:w-[26.84%] w-[28.84%] rounded-[8px] flex justify-center items-center bg-[#ffffff] hover:bg-[#06A9EF] border-solid border-[0.82px] border-[#06A9EF] scr500:text-[16px] text-[12px] text-[#333333] hover:text-[#ffffff] font-[600]"
                          onClick={() => {
                            setLevel("Easy");
                            setisLevel(false);
                            toggleContent();
                          }}
                        >
                          Easy
                        </button>
                        <button
                          className="scr500:w-[33.96%] w-[36.84%] rounded-[8px] flex justify-center items-center bg-[#ffffff] hover:bg-[#06A9EF] border-solid border-[0.82px] border-[#06A9EF] scr500:text-[16px] text-[12px] text-[#333333] hover:text-[#ffffff] font-[600]"
                          onClick={() => {
                            setLevel("Intermediate");
                            setisLevel(false);
                            toggleContent();
                          }}
                        >
                          Intermediate
                        </button>
                        <button
                          className="scr500:w-[28.84%] w-[28.84%] rounded-[8px] flex justify-center items-center bg-[#ffffff] hover:bg-[#06A9EF] border-solid border-[0.82px] border-[#06A9EF] scr500:text-[16px] text-[12px] text-[#333333] hover:text-[#ffffff] font-[600]"
                          onClick={() => {
                            setLevel("Advanced");
                            setisLevel(false);
                            toggleContent();
                          }}
                        >
                          Advanced
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-4 w-[100%]">
                <div className="flex flex-col lg:flex-row justify-center items-center w-[100%] gap-6">
                  {!showSecondDiv ? (
                    <div
                      className={`p-[12px] xl:w-[100%] ms:px-[60px] scr1024: w-[100%]  rounded-[12px] bg-[#FFFFFF] flex flex-col  items-center gap-[8px] scr820:gap-[16px] `}
                    >
                      <div className="text-[20px] font-[600] text-[#333333] flex flex-row gap-[12px] text-center">
                        <Assessmentlogo />
                        {camelCase(selectedSkill)} Assessment
                      </div>
                      <div className="flex w-full ms:gap-[48px]  justify-center text-center scr420:gap-[20px] gap-[14px]">
                        <div
                          className=" w-[252px] md:h-[88px] h-[98px] p-[12px] flex md:flex-row  flex-col  rounded-[12px] justify-start items-center gap-[16px]"
                          style={{
                            backgroundColor: "rgba(203, 239, 255, 1)",
                            // backdropFilter: "blur(45px)",
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_6706_119836)">
                              <path
                                d="M26.6836 35.2795C25.7211 35.2795 24.8995 34.9397 24.2187 34.2602C23.5379 33.5807 23.1975 32.7607 23.1975 31.8V25.1466C23.1975 24.1901 23.5379 23.3711 24.2187 22.6895C24.8995 22.0079 25.7211 21.6671 26.6836 21.6671H33.3304C34.2929 21.6671 35.1145 22.0079 35.7953 22.6895C36.4761 23.3711 36.8165 24.1901 36.8165 25.1466V31.8C36.8165 32.7607 36.4761 33.5807 35.7953 34.2602C35.1145 34.9397 34.2929 35.2795 33.3304 35.2795H26.6836ZM26.3605 32.1231H33.6534V24.8235H26.3605V32.1231ZM3.05469 30.0548V26.8918H18.1842V30.0548H3.05469ZM26.6836 18.3338C25.7211 18.3338 24.8995 17.9934 24.2187 17.3126C23.5379 16.6318 23.1975 15.8102 23.1975 14.8477V8.20097C23.1975 7.23844 23.5379 6.41679 24.2187 5.73601C24.8995 5.05523 25.7211 4.71484 26.6836 4.71484H33.3304C34.2929 4.71484 35.1145 5.05523 35.7953 5.73601C36.4761 6.41679 36.8165 7.23844 36.8165 8.20097V14.8477C36.8165 15.8102 36.4761 16.6318 35.7953 17.3126C35.1145 17.9934 34.2929 18.3338 33.3304 18.3338H26.6836ZM26.3605 15.1708H33.6534V7.87788H26.3605V15.1708ZM3.05469 13.1025V9.94613H18.1842V13.1025H3.05469Z"
                                fill="#646464"
                              />
                            </g>
                          </svg>

                          <div className="flex flex-col gap-2 md:item-start item-center">
                            <div className="text-[10px] md:text-[12px]  scr820:text-[16px] text-[#333333] font-[600] flex flex-col leading-tight md:text-start text-center ">
                              {assesmentType === "Normal" ? 10 : 60} MCQs
                            </div>
                            <div className=" text-[10px] md:text-[12px]  scr820:text-[12px] text-[#333333] font-[500] flex flex-col leading-tight md:text-start text-center">
                              4 Options each
                            </div>
                          </div>
                        </div>

                        <div
                          className=" w-[252px] md:h-[88px] h-[98px] p-[12px] flex md:flex-row  flex-col  rounded-[12px] justify-start items-center gap-[16px]"
                          style={{
                            backgroundColor: "rgba(203, 239, 255, 1)",
                            backdropFilter: "blur(22.5px)",
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_6706_119843)">
                              <path
                                d="M20.0004 36.9448C17.6682 36.9448 15.4719 36.5012 13.4113 35.614C11.3507 34.7269 9.55303 33.5159 8.01831 31.9812C6.48359 30.4465 5.27265 28.6489 4.38548 26.5885C3.49828 24.5282 3.05469 22.332 3.05469 20.0001C3.05469 17.6496 3.49828 15.4439 4.38548 13.3829C5.27265 11.3219 6.48324 9.52857 8.01727 8.00287C9.5513 6.47718 11.3487 5.26976 13.4094 4.38063C15.4701 3.49146 17.6666 3.04688 19.9989 3.04688C22.3497 3.04688 24.5559 3.49128 26.6174 4.38008C28.6789 5.26892 30.4723 6.47589 31.9977 8.001C33.5231 9.52608 34.7302 11.3192 35.6192 13.3804C36.5082 15.4416 36.9526 17.6478 36.9526 19.9992C36.9526 20.7774 36.9034 21.5487 36.8049 22.3132C36.7063 23.0777 36.555 23.8212 36.3509 24.5439C35.9675 24.1397 35.5301 23.8085 35.0386 23.5504C34.5471 23.2922 34.0182 23.1231 33.4518 23.043C33.5655 22.5514 33.6502 22.0542 33.706 21.5514C33.7617 21.0486 33.7896 20.5312 33.7896 19.9992C33.7896 16.1554 32.4524 12.8962 29.7779 10.2217C27.1033 7.54717 23.8431 6.20992 19.997 6.20992C16.1695 6.20992 12.915 7.54717 10.2334 10.2217C7.55188 12.8962 6.2111 16.1565 6.2111 20.0025C6.2111 23.83 7.55133 27.0845 10.2318 29.7661C12.9122 32.4476 16.1675 33.7884 19.9976 33.7884C21.5258 33.7884 22.9767 33.5532 24.3503 33.0828C25.7239 32.6124 26.9828 31.9637 28.1269 31.1365C28.4298 31.5959 28.7939 32.0043 29.2191 32.362C29.6443 32.7195 30.1124 32.9974 30.6232 33.1954C29.1666 34.3759 27.5369 35.2959 25.7342 35.9555C23.9316 36.6151 22.0203 36.9448 20.0004 36.9448ZM32.545 30.247C31.9865 30.247 31.5136 30.0534 31.1266 29.6661C30.7395 29.2788 30.546 28.8053 30.546 28.2455C30.546 27.6877 30.7396 27.2157 31.1269 26.8297C31.5142 26.4437 31.9877 26.2507 32.5475 26.2507C33.1053 26.2507 33.5773 26.4439 33.9633 26.8304C34.3493 27.2169 34.5423 27.6894 34.5423 28.248C34.5423 28.8066 34.3491 29.2794 33.9626 29.6665C33.5761 30.0535 33.1036 30.247 32.545 30.247ZM25.7941 28.0179L18.5719 20.6042V11.3479H21.5955V19.3772L28.0112 25.8208L25.7941 28.0179Z"
                                fill="#646464"
                              />
                            </g>
                          </svg>

                          <div className="flex flex-col gap-2 md:item-start item-center">
                            <div className="text-[10px] md:text-[12px] scr820:text-[16px] text-[#333333] font-[600] flex flex-col leading-tight md:text-start text-center ">
                              {assesmentType === "Normal" ? 5 : 30} Minutes
                            </div>
                            <div className=" text-[10px] md:text-[12px]  scr820:text-[12px] text-[#333333] font-[500] flex flex-col leading-tight md:text-start text-center">
                              30 seconds per Question
                            </div>
                          </div>
                        </div>
                        <div
                          className=" w-[252px] md:h-[88px] h-[98px] p-[12px] flex md:flex-row  flex-col  rounded-[12px]  items-center gap-[16px]"
                          style={{
                            backgroundColor: "rgba(203, 239, 255, 1)",
                            backdropFilter: "blur(22.5px)",
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_6706_119850)">
                              <path
                                d="M15.9248 9.36722H18.7557V6.54297H15.9248V9.36722ZM21.58 9.36722V6.54297H24.4108V9.36722H21.58ZM15.9248 20.6776V17.8533H18.7557V20.6776H15.9248ZM27.2351 15.0224V12.1981H30.066V15.0224H27.2351ZM27.2351 20.6776V17.8533H30.066V20.6776H27.2351ZM21.58 20.6776V17.8533H24.4108V20.6776H21.58ZM27.2351 9.36722V6.54297H30.066V9.36722H27.2351ZM18.7557 12.1981V9.36722H21.58V12.1981H18.7557ZM9.9375 33.5883V6.54297H13.1005V9.36722H15.9248V12.1959H13.1005V15.0246H15.9248V17.8533H13.1005V33.5883H9.9375ZM24.4108 17.8533V15.0224H27.2351V17.8533H24.4108ZM18.7557 17.8533V15.0224H21.58V17.8533H18.7557ZM15.9248 15.0224V12.1981H18.7557V15.0224H15.9248ZM21.58 15.0224V12.1981H24.4108V15.0224H21.58ZM24.4108 12.1981V9.36722H27.2351V12.1981H24.4108Z"
                                fill="#646464"
                              />
                            </g>
                          </svg>

                          <div className="flex flex-col gap-2 md:item-start item-center">
                            <div className="text-[10px] md:text-[12px] scr820:text-[16px] text-[#333333] font-[600] flex flex-col leading-tight md:text-start text-center ">
                              {assesmentType === "Normal"
                                ? "Quick Result"
                                : "Quick Certification"}
                            </div>
                            <div className=" text-[10px] md:text-[12px]  scr820:text-[12px] text-[#333333] font-[500] flex flex-col leading-tight md:text-start text-center">
                              See your score after the Test
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[14px] font-[Montserrat] scr820:text-[16px] text-[#333333] font-[600] flex justify-center items-center">
                        Get ready to test your Skill!
                      </div>

                      <div
                        onClick={() => {
                          handleStart();
                        }}
                      >
                        <button
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          className="h-[38px] w-[252px] flex items-center justify-center rounded-[30px] text-[14px]  gap-[4px] font-[600] blue_border_Button   "
                          disabled={loading}
                        >
                          {loading ? (
                            <MiniLoader />
                          ) : (
                            <>
                              Start
                              <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill={isHovered ? "white" : "black"}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.45863 4.56116H0.9375C0.777875 4.56116 0.64425 4.50728 0.536625 4.39953C0.428875 4.29191 0.375 4.15828 0.375 3.99866C0.375 3.83903 0.428875 3.70541 0.536625 3.59778C0.64425 3.49003 0.777875 3.43616 0.9375 3.43616H9.45863L6.98944 0.966969C6.87794 0.855344 6.82288 0.724781 6.82425 0.575281C6.82575 0.425781 6.88081 0.292844 6.98944 0.176469C7.10581 0.0602194 7.23944 0.000156055 7.39031 -0.00371894C7.54131 -0.00759394 7.675 0.0486561 7.79137 0.165031L11.1504 3.52409C11.2207 3.59434 11.2702 3.66841 11.2989 3.74628C11.3278 3.82416 11.3422 3.90828 11.3422 3.99866C11.3422 4.08903 11.3278 4.17316 11.2989 4.25103C11.2702 4.32891 11.2207 4.40297 11.1504 4.47322L7.79137 7.83228C7.67975 7.94378 7.54731 7.99884 7.39406 7.99747C7.24069 7.99597 7.10581 7.93709 6.98944 7.82084C6.88081 7.70447 6.82456 7.57272 6.82069 7.42559C6.81681 7.27847 6.87306 7.14672 6.98944 7.03034L9.45863 4.56116Z"
                                  fill={isHovered ? "white" : "black"}
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="ms:flex pb-[36px] gap-[8px] justify-center items-center text-center w-full ">
                        <div className="text-[10px] scr820:text-[12px] text-[#646464] font-[500] ">
                          The Test begins as soon as you click
                          <span className="text-[10px] scr820:text-[12px] text-[#646464] font-[700]">
                            {" "}
                            Start.
                          </span>
                        </div>
                        <div className="text-[10px] scr820:text-[12px] text-[#646464] font-[500] ">
                          Make sure you have a stable internet connection.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {showSecondDiv && (
                        <div className="w-[100%]">
                          {showSecondDiv && (
                            <div className="flex flex-col  justify-center items-center lg:w-[100%] w-[100%]  gap-6 ">
                              {!resultType ? (
                                <div className="flex flex-col justify-start items-center rounded-lg shadow-md  w-[100%] ">
                                  <div className="flex h-16 scr420:px-4 px-2 py-3  items-center self-stretch border-b border-solid border-[#DEDEDE] bg-[#E0F6FF] rounded-lg justify-between">
                                    <div className="flex scr700:w-[20%] w-[116px] justify-between  items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                                      <p className=" ml:text-[16px] md:text-[14px] scr700:text-[13px] scr540:text-[12px] text-[10px] font-montserrat  font-medium leading-6">
                                        Assessment Name
                                      </p>
                                    </div>
                                    <div className="flex  scr700:w-[20%] w-[116px] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                                      <p className=" ml:text-[16px] scr540:text-[14px] text-[12px] font-montserrat  font-medium leading-6">
                                        Date
                                      </p>
                                    </div>
                                    <div className="flex w-[20%] justify-center items-center self-stretch  ">
                                      <p className=" ml:text-[16px] scr540:text-[14px] text-[12px] font-montserrat  font-medium leading-6">
                                        Score
                                      </p>
                                    </div>
                                  </div>
                                  <div className=" w-full overflow-auto ">
                                    {assessmentList
                                      ?.filter(
                                        (data) => data.isCertification !== true
                                      )
                                      ?.map((item, index) => (
                                        <div
                                          key={index}
                                          className="border-b border-solid border-[#DEDEDE] w-full"
                                        >
                                          <div className="flex  text-center gap-2 justify-between flex-row lg:gap-[14px] py-[8px] scr420:px-4 px-2 w-[100%] lg:w-full items-center self-stretch ">
                                            <div className="  w-[20%]  flex justify-between gap-[12px]">
                                              <div className="flex  gap-3 items-center self-stretch ">
                                                <div className="w-[40px] h-[40px]">
                                                  <Assessmentlogo />
                                                </div>
                                                <div className="w-full">
                                                  <p className=" ml:text-[16px] scr540:text-[14px] text-[12px] font-montserrat  font-medium leading-6">
                                                    {item.skill}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex w-[30%] justify-center items-center self-stretch ">
                                              <p className=" ml:text-[16px] scr540:text-[14px] text-[12px] font-montserrat  font-medium leading-6">
                                                {item?.date &&
                                                  formatDate(item?.date)}
                                              </p>
                                            </div>
                                            <div className="flex w-[20%] justify-center items-center self-stretch  ">
                                              <p className="text-[#0C8A0A] ml:text-[16px] scr540:text-[14px] text-[12px] items-center  font-montserrat text-sm font-semibold leading-7">
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
                                  <div className="w-full overflow-auto ">
                                    {assessmentList
                                      ?.filter(
                                        (data) => data.isCertification === true
                                      )
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
                                                {item?.date &&
                                                  formatDate(item?.date)}
                                              </p>
                                            </div>
                                            <div className="flex  justify-center w-[20%]  items-center self-stretch  ">
                                              <p className="text-[#0C8A0A] items-center  font-montserrat text-sm font-semibold leading-7">
                                                {formatScore(item.score)}%
                                              </p>
                                            </div>

                                            <div className="flex w-[19.76%] ms:w-[20%] justify-center items-center self-stretch  text-[10px] ms:text-base font-medium leading-6 ">
                                              {Number(
                                                formatScore(item.score)
                                              ) >= 70 ? (
                                                <button
                                                  onClick={() =>
                                                    generatePdf3(item, index)
                                                  }
                                                  className="text-[#06A9EF] items-center font-montserrat text-[10px] ms:text-base font-semibold leading-4"
                                                >
                                                  {index === viewCertificate ? (
                                                    <>
                                                      {viewCertificateLoader ? (
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
                                                      ) : (
                                                        <svg
                                                          width="24"
                                                          height="24"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <g mask="url(#mask0_5292_61102)">
                                                            <path
                                                              d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                                                              fill="#06A9EF"
                                                            />
                                                          </g>
                                                        </svg>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <svg
                                                      width="24"
                                                      height="24"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <g mask="url(#mask0_5292_61102)">
                                                        <path
                                                          d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                                                          fill="#06A9EF"
                                                        />
                                                      </g>
                                                    </svg>
                                                  )}
                                                </button>
                                              ) : (
                                                <svg
                                                  className=" cursor-not-allowed"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <g mask="url(#mask0_5292_61102)">
                                                    <path
                                                      d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                                                      fill="#DEDEDE"
                                                    />
                                                  </g>
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="flex flex-row justify-end"></div>
                        </div>
                      )}
                    </>
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
                    {questionIndex + 1} / {assesmentType === "Normal" ? 10 : 60}
                  </p>
                </div>
                <div
                  className="bg-white p-4 rounded-[16px] flex flex-col gap-9 mt-2"
                  style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
                >
                  <div className="flex flex-col gap-6 ">
                    <p className="text-[#333333] text-[20px] font-[600]">
                      Question {questionIndex + 1}
                    </p>
                    <div className="flex flex-col gap-8 bg-[#E0F6FF] p-[24px] rounded-[10px] text-[#333333] font-medium  md:text-[16px] text-[12px]">
                      <p> {question[questionIndex]?.question}</p>
                    </div>

                    <div className="w-full md:grid grid-cols-2 flex flex-col gap-[24px]">
                      {question[questionIndex]?.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-start py-[12px] px-[16px] gap-4 rounded-[8px] cursor-pointer ${
                            isSelected(
                              option,
                              questionIndex + 1,
                              question[questionIndex]?.question
                            )
                              ? "bg-[#06A9EF] text-white"
                              : "bg-white"
                          }`}
                          style={{
                            boxShadow: "0px 0px 2px 0px #00000080",
                            transition: "background-color 0.3s ease",
                          }}
                          onClick={() => {
                            answerSetter(
                              questionIndex + 1,
                              option,
                              question[questionIndex]?.question
                            );
                          }}
                        >
                          <div className="md:text-[14px] text-[12px]  font-[500] leading-tight">
                            {String.fromCharCode(65 + index)})
                          </div>
                          <label className="md:text-[14px] text-[12px]  font-[500] leading-tight">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-[16px] justify-end">
                    <button
                      style={{ opacity: !btnEnable ? "0.5" : 1 }}
                      disabled={!btnEnable}
                      className="flex flex-row gap-[3px] items-center cursor-pointer text-[14px] font-[600]   px-[24px] justify-between leading-tight  rounded-[30px] blue_border_Button "
                      onClick={() => {
                        setIsNext(!isNext);
                        resetSelection();
                        setBtnEnable(false);
                        skippedQuestion();
                        let result = assesmentType === "Normal" ? 9 : 59;
                        if (questionIndex === result) {
                          setIsSubmit(true);
                        }
                      }}
                    >
                      Skip
                    </button>
                    <button
                      className="flex flex-row gap-[4px] items-center px-6 bg_Button rounded-[30px] h-[38px]  leading-tight  justify-center text-[14px] font-[600] "
                      style={{ opacity: !btnEnable || !btnEnable1 ? "0.5" : 1 }}
                      disabled={!btnEnable || !btnEnable1}
                      onClick={() => {
                        setIsNext(!isNext);
                        setBtnEnable(false);
                        setBtnEnable1(false);
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

                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.45863 4.56116H0.9375C0.777875 4.56116 0.64425 4.50728 0.536625 4.39953C0.428875 4.29191 0.375 4.15828 0.375 3.99866C0.375 3.83903 0.428875 3.70541 0.536625 3.59778C0.64425 3.49003 0.777875 3.43616 0.9375 3.43616H9.45863L6.98944 0.966969C6.87794 0.855344 6.82288 0.724781 6.82425 0.575281C6.82575 0.425781 6.88081 0.292844 6.98944 0.176469C7.10581 0.0602194 7.23944 0.000156055 7.39031 -0.00371894C7.54131 -0.00759394 7.675 0.0486561 7.79137 0.165031L11.1504 3.52409C11.2207 3.59434 11.2702 3.66841 11.2989 3.74628C11.3278 3.82416 11.3422 3.90828 11.3422 3.99866C11.3422 4.08903 11.3278 4.17316 11.2989 4.25103C11.2702 4.32891 11.2207 4.40297 11.1504 4.47322L7.79137 7.83228C7.67975 7.94378 7.54731 7.99884 7.39406 7.99747C7.24069 7.99597 7.10581 7.93709 6.98944 7.82084C6.88081 7.70447 6.82456 7.57272 6.82069 7.42559C6.81681 7.27847 6.87306 7.14672 6.98944 7.03034L9.45863 4.56116Z"
                          fill="white"
                        />
                      </svg>
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
                              <>{calculateMarkOutOf60()} %</>
                            )}
                          </div>

                          {assesmentType !== "Normal" && (
                            <>
                              {calculateMarkOutOf60() >= 70.0 ? (
                                <div className="text-[18px] text-[#0C8A0A] font-[600]">
                                  You are eligible for Certificate
                                </div>
                              ) : (
                                <di className="text-[14px] text-[#C00000] font-[500]">
                                  The resulted score did not meet the
                                  Certification requirements. You may try again!
                                  (Required above 70%)
                                </di>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex  justify-between items-center pb-[12px] ${
                        assesmentType !== "Normal" &&
                        calculateMarkOutOf60() >= 70
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
                          setIsNext(!isNext);
                          // setSkippedArray([])
                          // window.location.reload();
                          setBtnEnable1(false);
                        }}
                        className=" rounded-[30px] px-[14px] sm:px-[24px] h-[38px] text-[12px] scr700:text-[16px] text-[#333] font-[500] blue_border_Button"
                      >
                        Close
                      </button>

                      {assesmentType !== "Normal" &&
                        calculateMarkOutOf60() >= 70 && (
                          <button
                            className="bg_Button min-w-[132.78px] flex justify-center items-center rounded-[30px] px-[12px] sm:px-[14px] text-[12px] h-[38px] scr700:text-[16px]  font-[500] "
                            onClick={() => generatePdf2()}
                          >
                            {loading3 && <MiniLoader />}
                            {!loading3 && "Download Certificate"}
                          </button>
                        )}
                      <button
                        className="bg_Button  min-w-[60.78px] sm:min-w-[132.78px] flex justify-center items-center   rounded-[30px] px-[8px] sm:px-[24px] h-[38px] text-[12px] scr700:text-[16px] font-[500] "
                        onClick={() => handleDownload()}
                      >
                        {loadingg && <MiniLoader />}
                        {!loadingg && "Download"}
                      </button>
                    </div>
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
          <div className="flex overflow-hidden absolute left-[-9999px]">
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
      <div className="absolute overflow-hidden left-[-8000px]" ref={resumeRef2}>
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
