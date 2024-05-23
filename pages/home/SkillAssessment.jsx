import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// import SkillModel from "../../../../../components/featured/candidate/profile/modals/skill_modal";

import MiniLoader from "../../components/common/mini-loader";
import { camelCase, dateSeter, formatDate } from "../../utils/middleware";
import Timer from "../../components/common/timer";
import CloseIcon, {
  AssessmentSvg,
  Assessmentlogo,
  Close_svg,
} from "../../utils/svg";
import CreatableSelect from "react-select/creatable";
import { SkillList } from "../../utils/data";
import { toast } from "react-toastify";

import generatePDF, { Resolution, Margin } from "react-to-pdf";
import QuestionList from "../../components/featured/home/QuestionList";
import SkillModel from "../../components/featured/candidate/createResume/components/SkillModel";
import { reCallUserData } from "../../Redux/actions/user";
import Certificate from "../../components/featured/home/Certificate";

import { pdf } from "@react-pdf/renderer";

function SkillAssessment() {
  const resumeRef = useRef();
  const resumeRef1 = useRef();
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
  const [loading, setLoading] = useState(false);
  const [btnEnable, setBtnEnable] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const dispatch = useDispatch();
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [showSecondDiv, setshowSecondDiv] = useState(false);
  const [assessmentList, setAssessmentList] = useState([]);
  const [isLevel, setisLevel] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState();
  // const [skills, setSkills] = useState(SkillList);
  const [userSkills, setUserSkills] = useState();
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(30);
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [assesmentType, setAssesmentType] = useState("Normal");
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
  console.log(66699, toggle);
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

  console.log(833, skippedArray);

  const [uniqueQuestions, setUniqueQuestions] = useState([]);

  // START
  // START
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    axios
      .get("https://freedygoservices.in/api/allSkills")
      .then((res) => {
        const names = res.data.map((skill) => skill.name);

        setSkills(names);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [skillList]);

  const handleInputChange = async (selectedOption) => {
    const found = skillList?.find(
      (item) => item.skill.name === selectedOption.label
    );
    if (!found) {
      try {
        const response = await fetch("https://freedygoservices.in/api/skills", {
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
    const uniqueQuestionsSet = new Set();
    const filteredQuestions = [];

    question.forEach((data) => {
      if (
        !uniqueQuestionsSet.has(data.question) && assesmentType === "Normal"
          ? filteredQuestions.length < 10
          : filteredQuestions.length < 60
      ) {
        uniqueQuestionsSet.add(data.question);
        filteredQuestions.push(data);
      }
    });
    setUniqueQuestions(filteredQuestions);

    // while (filteredQuestions.length < 10) {
    //   toggleContent(); // This function should generate a new unique question
    // if (!uniqueQuestionsSet.has(newQuestion.question)) {
    //   uniqueQuestionsSet.add(newQuestion.question);
    //   filteredQuestions.push(newQuestion);
    // }
    // }

    if (
      assesmentType === "Normal"
        ? filteredQuestions.length < 10
        : filteredQuestions.length < 60 && selectedSkill
    ) {
      toggleContent();
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
    axios
      .get("https://freedygoservices.in/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
    // setLoadingg(true);
    return new Promise((resolve, reject) => {
      generatePDF(resumeRef1, {
        filename: `${"certificate"}-assessment-skilotech.pdf`,
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
          // setLoadingg(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        // setLoadingg(false);
      });
  };
  const toggleContent = () => {
    if (selectedSkill) {
      setLoading(true);
      if (
        assesmentType === "Normal"
          ? uniqueQuestions.length < 10
          : uniqueQuestions.length < 60
      ) {
        axios
          .post("https://freedygoservices.in/api/getQuetions", {
            skill: selectedSkill,
            level: level,
          })
          .then((res) => {
            console.log(2443, res);
            setQuestion([
              ...question,
              ...JSON.parse(res.data.data.choices[0].message.content),
            ]);
            setToggle(1);
            setLoading(false);
            setStartTimer(true);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    } else {
      toast.error("Please select a skill to start skill assessment");
    }
  };

  useEffect(() => {
    if (uniqueQuestions.length > questionIndex + 2) {
      setBtnEnable(true);
    }
  }, [questionIndex]);

  // useEffect(() => {
  //   let timer;
  //   if (startTimer) {
  //     timer = setTimeout(() => {
  //       if (questionIndex + 1 < question.length) {
  //         setQuestionIndex(questionIndex + 1);
  //         setStartTimer(false);
  //         setTimer(30);
  //       } else {

  //       }
  //     }, 30000);
  //   }

  //   return () => clearTimeout(timer);
  // }, [startTimer, questionIndex, question]);

  useEffect(() => {
    setStartTimer(true);
  }, [questionIndex]);

  const sumbit = () => {
    setStartTimer(false);

    setTimer(30);
    // if (question.length < 10) {
    //   toggleContent();
    // }

    if (assesmentType === "Normal" ? questionIndex == 9 : questionIndex == 59) {
      axios
        .post("https://freedygoservices.in/api/assessment/add", {
          userId: userDataGlobal._id,
          skill: selectedSkill,
          score: checkAnswer() * assesmentType === "Normal" ? 10 : 60,
          date: new Date(),
        })
        .then((res) => {
          setScore(true);
        })
        .catch((err) => {
          console.log(err);
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
    if (questionIndex) {
      timer = setTimeout(() => {
        if (
          (questionIndex === assesmentType) === "Normal" ? 9 : 59 && !isSubmit
        ) {
          sumbit();
        }
      }, 30000);
    }

    return () => clearTimeout(timer);
  }, [questionIndex]);

  // useEffect(() => {
  //   if (
  //     questionIndex == 1 ||
  //     questionIndex == 2 ||
  //     questionIndex == 3 ||
  //     questionIndex == 4
  //   ) {
  //     toggleContent();
  //   }
  // }, [questionIndex]);

  useEffect(() => {
    axios
      .get(
        `https://freedygoservices.in/api/assessment/getByUser/${userDataGlobal._id}`
      )
      .then((res) => {
        setAssessmentList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSkill, reCall, userDataGlobal]);

  const answerSetter = (question, Answer) => {
    // console.log(211, question, Answer);
    // const dummyData = [...answer];
    const skip = skippedArray.find((item) => {
      if (item.question == question && Answer != "") {
        return true;
      }
      return false;
    });
    // console.log(237, skip);
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

    // dummyData[question - 1] = { Answer, question: question };
    // console.log(214, dummyData);
  };

  // console.log(244, skippedArray);
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
        if (uniqueQuestions[item?.question - 1]?.answer == item?.Answer) {
          correctAnswer = correctAnswer + 1;
        }
      }
    });

    return correctAnswer;
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
    let totalQuestions = uniqueQuestions.length;

    // Calculate percentage score
    let percentageScore = (correctAnswers * 100) / totalQuestions;

    // Convert percentage to a mark out of 60

    return percentageScore + `%`;
  }

  return (
    <div className="">
      <div
        onWheel={(e) => e.stopPropagation()}
        className="bg-[#F9F9F9] w-full h-[92vh] "
      >
        {toggle === 0 && (
          <div className="flex flex-col gap-[16px] pt-[24px] pb-[95px] items-center  customMargins">
            <div className=" w-[100%] flex flex-row gap-[8px]">
              <button
                className={` rounded-[12px] ml:px-[22.8px] px-3 ${
                  assesmentType === "Normal"
                    ? "bg-blue text-white btn_hover_effect"
                    : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                } ml:min-w-[235px] min-w-[180px] py-2  flex gap-2 ml:text-[16px] scr420:text-[14px] text-[12px] justify-center items-center   h-[40px] font-semibold`}
                onClick={() => setAssesmentType("Normal")}
              >
                Normal Assesment
              </button>
              <button
                className={`rounded-[12px] min-w-[138px] flex justify-center items-center ${
                  assesmentType === "Certificate"
                    ? "bg-blue text-white btn_hover_effect"
                    : "bg-white text-[#333] border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                }  py-2 px-6 text-[16px] font-medium `}
                onClick={() => setAssesmentType("Certificate")}
              >
                Certified Assesment
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
                        <div className="text-[20px] font-medium">My Skills</div>
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
              )}
            </div>
            {isLevel && (
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
                    {/* <div className="flex flex-col gap-2 font-medium justify-center items-center ">
                      <div className="ml:w-[380px] scr390:w-[342px] w-[290px] flex flex-col gap-2 ">
                        Difficulty Level
                        <div className="flex scr390:text-[14px] text-[13px] font-medium rounded-[6px] p-[6px] border border-[#DEDEDE] scr390:w-[342px] w-[290px]">
                          <button
                            onClick={() => { setLevel("Easy"); setisLevel(false) }}
                            className={`flex justify-center items-center w-[109px] py-1 ${level === "Easy" && "bg-blue rounded-[4px] text-white"
                              }`}
                          >
                            {" "}
                            Easy
                          </button>
                          <button
                            onClick={() => { setLevel("Intermediate"); setisLevel(false) }}
                            className={`flex justify-center items-center w-[109px] py-1 ${level === "Intermediate" &&
                              "bg-blue rounded-[4px] text-white"
                              }`}
                          >
                            {" "}
                            Intermediate
                          </button>
                          <button
                            onClick={() => { setLevel("Advanced"); setisLevel(false) }}
                            className={`flex justify-center items-center w-[109px] py-1 ${level === "Advanced" &&
                              "bg-blue rounded-[4px] text-white"
                              }`}
                          >
                            {" "}
                            Advanced
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col lg:flex-row justify-center items-center w-[100%] gap-6">
              <div
                className={`p-[12px] ms:px-[60px] ms:customMargins ${
                  showSecondDiv ? "lg:w-[50%]" : "w-[100.95%] "
                } scr1024:w-[50%] sm:w-[85%] w-[100%]  px-[12px] rounded-[12px] bg-[#005A81] flex flex-col  items-center gap-[8px] scr820:gap-[16px] `}
              >
                <div className="text-[20px] font-[600] text-[#fff] flex flex-row gap-[12px]">
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
                    setisLevel(true);
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
                <div className="flex flex-col justify-start items-center rounded-lg shadow-md lg:w-[60%] sm:w-[85%]  w-[100%] ">
                  <div className="flex h-16 px-4 py-3  items-center self-stretch border-b border-solid border-[#DEDEDE] bg-[#E0F6FF] rounded-lg justify-between">
                    <div className="flex w-[35.18%] justify-between items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Assessment Name
                      </p>
                    </div>
                    {/* <div className="flex w-[19.95%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Status
                      </p>
                    </div> */}
                    <div className="flex w-[19.95%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Date
                      </p>
                    </div>
                    {/* <div className="flex w-[19.95%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Time
                      </p>
                    </div> */}
                    <div className="flex w-[19.95%] justify-center items-center self-stretch  ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Score
                      </p>
                    </div>
                  </div>
                  <div className="max-h-[388px] lg:h-[285px] w-full overflow-auto ">
                    {assessmentList?.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-solid border-[#DEDEDE] w-full"
                      >
                        <div className="flex  text-center  justify-between flex-row lg:gap-[14px] py-[8px] px-[16px]  w-[93%] lg:w-full items-center self-stretch ">
                          <div className=" lg:w-[40%] w-[50%]  flex justify-between gap-[12px]">
                            <div className="flex  gap-3 items-center self-stretch ">
                              <div className="w-[40px] h-[40px]">
                                <Assessmentlogo />
                              </div>
                              <div className="w-full">
                                <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                                  {item.skill}
                                </p>
                              </div>
                            </div>
                            {/* <div className="flex  justify-center  items-center self-stretch  ">
                              <p
                                className={`${item.score > 60
                                  ? "text-[#0C8A0A]"
                                  : "text-[red]"
                                  } items-center  font-montserrat text-sm font-semibold leading-7`}
                              >
                                {item.score > 60 ? "Completed" : "Incomplete"}
                              </p>
                            </div> */}
                          </div>
                          <div className="lg:w-[66%] w-[62%] flex justify-between gap-[12px] ">
                            <div className="flex  justify-center items-center self-stretch ">
                              <p className="text-[14px] font-montserrat text-base font-medium leading-6">
                                {item?.date && formatDate(item?.date)}
                              </p>
                            </div>
                            {/* <div className="flex  justify-center items-center self-stretch ">
                              <p className="text-[14px] font-montserrat text-base font-medium leading-6">
                                {item?.date && convertToDateTime(item?.date)}
                              </p>
                            </div> */}
                            <div className="flex  justify-center lg:w-[40%]  items-center self-stretch  ">
                              <p className="text-[#0C8A0A] items-center  font-montserrat text-sm font-semibold leading-7">
                                {item.score / 10} / 10
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {toggle === 1 && (
          // <div className="w-full flex justify-between items-center scr540:gap-[24px] flex-row py-[36px] gap-[8px]">
          //   <div className="w-[8px] lg:w-[22%] h-[2px] bg-[#06A9EF] border-none"></div>
          //   <div className="w-full   lg:max-w-[903px] flex flex-col gap-[24px]">
          //     <div className="bg-[#fff] border-[2px] border-solid border-[#06A9EF] rounded-[12px] py-[24px] px-[16px] lg:px-[60px] flex flex-col gap-[12px]">
          //       <div className="w-full flex flex-row justify-center gap-[12px] text-[14px] lg:text-[20px] font-[600]">
          //         <Assessmentlogo />
          //         {camelCase(selectedSkill)} Assessment
          //       </div>
          //       <div className="flex flex-col gap-[24px]">
          //         <div
          //           className="rounded-[6px] lg:rounded-[16px] flex flex-col gap-[12px] p-[24px] bg-[#E0F6FF]"
          //           style={{
          //             boxShadow: "  0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          //           }}
          //         >
          //           <div className="text-[14px] lg:text-[20px] text-[#06A9EF] font-[600]">
          //             Question {questionIndex + 1}
          //           </div>
          //           <div className="text-[12px] lg:text-[16px] text-[#333] font-[600]">
          //             {question[questionIndex]?.question}
          //           </div>
          //         </div>
          //         <div className="flex flex-col lg:flex-row gap-[24px]">
          //           <div className="w-full flex items-between  flex-col gap-[24px]">
          //             <div
          //               className={`py-[12px] px-[16px] break-all rounded-[6px] lg:rounded-[8px] text-[12px] lg:text-[16px] font-[600] h-[50%]  ${isSelected(
          //                 question[questionIndex]?.options[0],
          //                 questionIndex + 1
          //               ) && "bg-[#06A9EF] text-white"
          //                 }`}
          //               style={{
          //                 boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
          //               }}
          //               onClick={() =>
          //                 answerSeter(
          //                   questionIndex + 1,
          //                   question[questionIndex]?.options[0]
          //                 )
          //               }
          //             >
          //               A) {question[questionIndex]?.options[0]}
          //             </div>
          //             <div
          //               className={`py-[12px] px-[16px] break-all rounded-[6px] lg:rounded-[8px] text-[12px] lg:text-[16px] font-[600] h-[50%]  ${isSelected(
          //                 question[questionIndex]?.options[2],
          //                 questionIndex + 1
          //               ) && "bg-[#06A9EF] text-white"
          //                 }`}
          //               style={{
          //                 boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
          //               }}
          //               onClick={() =>
          //                 answerSeter(
          //                   questionIndex + 1,
          //                   question[questionIndex]?.options[2]
          //                 )
          //               }
          //             >
          //               C) {question[questionIndex]?.options[2]}
          //             </div>
          //           </div>
          //           <div className="w-full flex flex-col items-between gap-[24px]">
          //             <div
          //               className={`py-[12px] px-[16px] break-all rounded-[6px] lg:rounded-[8px] text-[12px] lg:text-[16px] font-[600] h-[50%]  ${isSelected(
          //                 question[questionIndex]?.options[1],
          //                 questionIndex + 1
          //               ) && "bg-[#06A9EF] text-white"
          //                 }`}
          //               style={{
          //                 boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
          //               }}
          //               onClick={() =>
          //                 answerSeter(
          //                   questionIndex + 1,
          //                   question[questionIndex]?.options[1]
          //                 )
          //               }
          //             >
          //               B) {question[questionIndex]?.options[1]}
          //             </div>
          //             <div
          //               className={`py-[12px] px-[16px] break-all rounded-[6px] lg:rounded-[8px] text-[12px] lg:text-[16px] font-[600] h-[50%]  ${isSelected(
          //                 question[questionIndex]?.options[3],
          //                 questionIndex + 1
          //               ) && "bg-[#06A9EF] text-white"
          //                 }`}
          //               style={{
          //                 boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
          //               }}
          //               onClick={() =>
          //                 answerSeter(
          //                   questionIndex + 1,
          //                   question[questionIndex]?.options[3]
          //                 )
          //               }
          //             >
          //               D) {question[questionIndex]?.options[3]}
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //     <div className="flex flex-col lg:flex-row w-full gap-[16px]  justify-center items-center">
          //       <div className="w-full  flex justify-center lg:justify-start  ">
          //         <Timer
          //           startTimer={startTimer}
          //           setIsTimerOver={setIsTimerOver}
          //           questionIndex={questionIndex}
          //           timer={timer}
          //           setTimer={setTimer}
          //           setQuestionIndex={setQuestionIndex}
          //           setStartTimer={setStartTimer}
          //           question={question}
          //         />
          //       </div>
          //       <div
          //         style={{ opacity: loading ? "0.5" : 1 }}
          //         disabled={loading}
          //         className="flex flex-row gap-[3px] items-center cursor-pointer text-[18px] font-[600] min-w-[174px] w-fit px-[12px] py-[8px] justify-between  rounded-[8px] border-[1px] border-solid border-[#06A9EF] bg-[#fff]"
          //         onClick={() => {
          //           if (questionIndex == 9) {
          //             axios
          //               .post(
          //                 "https://freedygoservices.in/api/assessment/add",
          //                 {
          //                   userId: userDataGlobal._id,
          //                   skill: selectedSkill,
          //                   score: checkAnswer() * 10,
          //                   date: new Date(),
          //                 }
          //               )
          //               .then((res) => {
          //                 setScore(true);
          //               })
          //               .catch((err) => {
          //                 console.log(err);
          //               });
          //           } else {
          //             setQuestionIndex(
          //               questionIndex + 1 < 10 ? questionIndex + 1 : 9
          //             );
          //           }
          //           setSkipped([...skipped, questionIndex]);
          //         }}
          //       >
          //         <span className="text-red">X</span>
          //         Not Relevent
          //       </div>
          //       <div className="flex flex-row justify-between lg:gap-[72px] w-full">
          //         <div
          //           className="flex flex-row gap-[3px] items-center justify-center text-[18px] font-[600]"
          //           onClick={() =>
          //             setQuestionIndex(
          //               questionIndex - 1 >= 0 ? questionIndex - 1 : 0
          //             )
          //           }
          //         >
          //           <svg
          //             xlgns="http://www.w3.org/2000/svg"
          //             width="40"
          //             height="40"
          //             viewBox="0 0 40 40"
          //             fill="none"
          //           >
          //             <g mask="url(#mask0_4403_58165)">
          //               <path
          //                 d="M17.9367 19.9998L23.2027 25.2658L21.7444 26.7658L14.9785 19.9998L21.7444 13.2338L23.2027 14.7338L17.9367 19.9998ZM19.9959 35.8331C22.1858 35.8331 24.2442 35.4175 26.1711 34.5864C28.098 33.7553 29.7742 32.6228 31.1995 31.1888C32.6249 29.7548 33.7534 28.0765 34.5848 26.154C35.4163 24.2315 35.832 22.1811 35.832 20.0026C35.832 17.8127 35.4165 15.7543 34.5854 13.8274C33.7543 11.9005 32.6263 10.2244 31.2016 8.79901C29.7769 7.37362 28.1015 6.24519 26.1754 5.41371C24.2494 4.58224 22.1914 4.1665 20.0015 4.1665C17.8116 4.1665 15.7579 4.58206 13.8402 5.41317C11.9226 6.24428 10.2465 7.3722 8.81182 8.79692C7.37718 10.2217 6.24413 11.8971 5.41265 13.8231C4.58118 15.7492 4.16545 17.8071 4.16545 19.997C4.16545 22.1755 4.581 24.2264 5.41211 26.1498C6.24323 28.0731 7.37578 29.7521 8.80978 31.1867C10.2438 32.6214 11.9192 33.7544 13.8359 34.5859C15.7527 35.4174 17.8061 35.8331 19.9959 35.8331Z"
          //                 fill="#06A9EF"
          //               />
          //             </g>
          //           </svg>
          //           Previous
          //         </div>

          //         <button
          //           className="flex flex-row gap-[3px] items-center justify-center text-[18px] font-[600] "
          //           style={{ opacity: loading ? "0.5" : 1 }}
          //           disabled={loading}
          //           onClick={() => {
          //             sumbit()
          //           }}
          //         >
          //           {questionIndex == 9 ? "Submit" : "Next"}
          //           <svg
          //             xlgns="http://www.w3.org/2000/svg"
          //             width="40"
          //             height="40"
          //             viewBox="0 0 40 40"
          //             fill="none"
          //           >
          //             <g mask="url(#mask0_4403_58171)">
          //               <path
          //                 d="M22.0633 19.9998L16.7973 25.2658L18.2556 26.7658L25.0215 19.9998L18.2556 13.2338L16.7973 14.7338L22.0633 19.9998ZM20.0041 35.8331C17.8142 35.8331 15.7558 35.4175 13.8289 34.5864C11.902 33.7553 10.2258 32.6228 8.80047 31.1888C7.37508 29.7548 6.24665 28.0765 5.41518 26.154C4.58371 24.2315 4.16797 22.1811 4.16797 20.0026C4.16797 17.8127 4.58352 15.7543 5.41464 13.8274C6.24575 11.9005 7.37366 10.2244 8.79839 8.79901C10.2231 7.37362 11.8985 6.24519 13.8246 5.41371C15.7506 4.58224 17.8086 4.1665 19.9985 4.1665C22.1884 4.1665 24.2421 4.58206 26.1598 5.41317C28.0774 6.24428 29.7535 7.3722 31.1882 8.79692C32.6228 10.2217 33.7559 11.8971 34.5873 13.8231C35.4188 15.7492 35.8346 17.8071 35.8346 19.997C35.8346 22.1755 35.419 24.2264 34.5879 26.1498C33.7568 28.0731 32.6242 29.7521 31.1902 31.1867C29.7562 32.6214 28.0808 33.7544 26.1641 34.5859C24.2473 35.4174 22.1939 35.8331 20.0041 35.8331Z"
          //                 fill="#06A9EF"
          //               />
          //             </g>
          //           </svg>
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          //   <div className="w-[8px] lg:w-[22%] h-[2px] bg-[#06A9EF] border-none"></div>
          // </div>
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
                  question={uniqueQuestions}
                  answerSetter={answerSetter}
                />
              </div>
              <div className="flex gap-4 w-full items-center">
                <div className=" relative h-[10px] rounded-[6px] bg-[#DEDEDE] w-full">
                  <div
                    className={`absolute h-[10px] rounded-[6px] bg-[#06A9EF] w-[${
                      (questionIndex + 1) * assesmentType === "Normal" ? 10 : 60
                    }%] `}
                  ></div>
                </div>
                <p className="text-[16px] flex justify-end font-semibold w-[60px]">
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
                    {" "}
                    Question {questionIndex + 1}
                  </p>
                  <div className="flex flex-col gap-8 text-[#333333] font-medium ms:text-[16px] text-[14px]">
                    <p> {uniqueQuestions[questionIndex]?.question}</p>
                  </div>
                  <div className="w-full flex  flex-col gap-5">
                    {uniqueQuestions[questionIndex]?.options.map(
                      (option, index) => (
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
                              uniqueQuestions[questionIndex]?.question
                            )}
                            onChange={() =>
                              answerSetter(
                                questionIndex + 1,
                                option,
                                uniqueQuestions[questionIndex]?.question
                              )
                            }
                          />
                          <label
                            htmlFor={`option${index}`}
                            className="text-[14px] ms:text-[16px] font-[500] leading-tight"
                          >
                            {option}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex gap-6 ">
                  <button
                    style={{ opacity: !btnEnable ? "0.5" : 1 }}
                    disabled={!btnEnable}
                    className="flex flex-row gap-[3px] items-center cursor-pointer text-[16px] font-[500]   px-[24px] py-[12px] justify-between leading-tight  rounded-[12px] border-[1px] border-solid border-[#06A9EF] "
                    // onClick={() => {
                    //   if (questionIndex == 9) {
                    //     axios
                    //       .post(
                    //         "https://freedygoservices.in/api/assessment/add",
                    //         {
                    //           userId: userDataGlobal._id,
                    //           skill: selectedSkill,
                    //           score: checkAnswer() * 10,
                    //           date: new Date(),
                    //         }
                    //       )
                    //       .then((res) => {
                    //         setScore(true);
                    //       })
                    //       .catch((err) => {
                    //         console.log(err);
                    //       });
                    //   } else {
                    //     setQuestionIndex(
                    //       questionIndex + 1 < 10 ? questionIndex + 1 : 9
                    //     );
                    //   }
                    //   setSkipped([...skipped, questionIndex]);
                    // }}
                    onClick={() => {
                      sumbit();
                    }}
                  >
                    Skip
                  </button>

                  <button
                    className="flex flex-row gap-[3px] items-center px-6 py-3 rounded-[12px] bg-blue leading-tight text-white justify-center text-[16px] font-[600] "
                    style={{ opacity: !btnEnable ? "0.5" : 1 }}
                    disabled={!btnEnable}
                    onClick={() => {
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
                  <div className="text-[#333] px-[12px] pt-[12px] text-[20px] font-[600]">
                    Assessment Score
                  </div>
                  <div className="w-full bg-[#005A81] py-[12px] px-[30px] text-[#fff] text-[18px] font-[600] text-center">
                    Assessment Completed!
                  </div>
                  <div className="px-[12px] w-full">
                    <div
                      className="p-[12px] w-full flex flex-col gap-[16px] rounded-[8px] "
                      style={{
                        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <div className="flex items-center gap-[4px] text-[#333] text-[16px] font-[600]">
                        <Assessmentlogo />
                        {camelCase(selectedSkill)} Assessment
                      </div>
                      <div className="flex flex-col gap-[16px] w-full">
                        <div className="text-[#0C8A0A] text-[16px] font-[600] ">
                          Completed
                        </div>
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
                          {assesmentType === "Normal" &&
                            ((checkAnswer() / uniqueQuestions.length) * 100) /
                              10}
                          {assesmentType === "Normal" && `/${10}`}
                          {assesmentType !== "Normal" && calculateMarkOutOf60()}
                          {assesmentType !== "Normal" && (
                            <div className="text-[18px] text-[#5B5B5B] font-[600]">
                              {calculateMarkOutOf60()}
                            </div>
                          )}
                        </div>

                        {assesmentType !== "Normal" && (
                          <>
                            {calculateMarkOutOf60() > 42 ? (
                              <div className="text-[18px] text-[#0C8A0A] font-[600]">
                                You are eligible for Certificate
                              </div>
                            ) : (
                              <di className="text-[18px] text-[#C00000] font-[600]">
                                You are not eligible for Certificate
                              </di>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex  justify-between items-center pb-[12px] ${
                      assesmentType !== "Normal" && calculateMarkOutOf60() > 42
                        ? "sm:w-[90%] w-[95%]"
                        : "w-[80%]"
                    } `}
                  >
                    <button
                      onClick={() => {
                        setToggle(0);
                        setScore(false);
                        setQuestionIndex(0);
                        setQuestion([]);
                        setSkipped([]);
                        window.location.reload();
                        dispatch(reCallUserData());
                      }}
                      className="border-[1px]  border-solid border-[#06A9EF] rounded-[12px] px-[14px] sm:px-[24px] py-[8px] text-[12px] scr700:text-[16px] text-[#333] font-[500]"
                    >
                      Close
                    </button>

                    {assesmentType !== "Normal" &&
                      calculateMarkOutOf60() > 42 && (
                        <button
                          className="border-[1px] min-w-[132.78px] flex justify-center items-center border-solid border-[#06A9EF] rounded-[12px] px-[12px] sm:px-[14px] py-[8px] text-[12px] scr700:text-[16px]  font-[500] bg-blue text-white"
                          onClick={() => generatePdf2()}
                        >
                          Download Certificate
                        </button>
                      )}
                    <button
                      className="border-[1px] min-w-[60.78px] sm:min-w-[132.78px] flex justify-center items-center border-solid border-[#06A9EF] rounded-[12px] px-[8px] sm:px-[24px] py-[8px] text-[12px] scr700:text-[16px] font-[500] bg-blue text-white"
                      onClick={() => generatePdf()}
                    >
                      {" "}
                      {loadingg && <MiniLoader />}
                      {!loadingg && "Download"}
                    </button>
                  </div>

                  <div
                    className="absolute overflow-hidden left-[-5000px]"
                    ref={resumeRef}
                  >
                    <QuestionList
                      questions={uniqueQuestions}
                      answers={answer}
                      selectedSkill={selectedSkill}
                      checkAnswer={checkAnswer}
                    />
                  </div>

                  <div
                    className="absolute overflow-hidden left-[-8000px]"
                    ref={resumeRef1}
                  >
                    <Certificate />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SkillAssessment;
