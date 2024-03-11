import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";

// import SkillModel from "../../../../../components/featured/candidate/profile/modals/skill_modal";

import MiniLoader from "../../components/common/mini-loader";
import { camelCase, formatDate } from "../../utils/middleware";
import Timer from "../../components/common/timer";
import { Assessmentlogo } from "../../utils/svg";
import ReactSelect from "react-select";
import { SkillList } from "../../utils/data";
import { toast } from "react-toastify";

function SkillAssessment() {
  const userDataGlobal = useSelector((state) => state.userData);
  const [reCall, forceUpdate] = useReducer((x) => x + 1.0);
  const [viewAddSkill, setViewAddSkill] = useState(false);
  const router = useRouter();
  const query = router.query;
  const [toggle, setToggle] = useState(0);
  const [score, setScore] = useState(false);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [skipped, setSkipped] = useState([]);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [showSecondDiv, setshowSecondDiv] = useState(false);
  const [assessmentList, setAssessmentList] = useState([]);

  const [selectedSkill, setSelectedSkill] = useState();
  const [skills, setSkills] = useState(SkillList);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (selectedOption) => {
    setSelectedSkill(selectedOption.value);
    setInputValue(selectedOption.value);
  };

  const toggleContent = () => {
    if (selectedSkill) {
      setLoading(true);

      axios
        .post("https://freedygoservices.in/api/getQuetions", {
          skill: selectedSkill,
        })
        .then((res) => {
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
    } else {
      toast.error("Please select a skill to start skill assessment");
    }
  };

  useEffect(() => {
    if (
      questionIndex == 1 ||
      questionIndex == 2 ||
      questionIndex == 3 ||
      questionIndex == 4
    ) {
      toggleContent();
    }
  }, [questionIndex]);
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
  }, [selectedSkill, reCall]);

  const answerSeter = (question, Answer) => {
    const dummyData = [...answer];
    dummyData[question - 1] = { Answer, question: question };
    setAnswer(dummyData);
  };
  const isSelected = (Answer, question) => {
    const findAnswer = answer.find(
      (data) => data?.Answer === Answer && data?.question == question
    );
    return findAnswer ? true : false;
  };
  console.log(skipped);
  const checkAnswer = () => {
    let correctAnswer = 0;
    answer.forEach((item) => {
      console.log(item?.question)
      if (!skipped.includes(item?.question)) {
        if (question[item?.question - 1]?.answer == item?.Answer) {
          correctAnswer = correctAnswer + 1;
        }
      }
    });

    return correctAnswer;
  };
  console.log(checkAnswer())
  return (
    <div className="pt-2">
      {/* {viewAddSkill && (
        <SkillModel
          handleImageClick={setViewAddSkill}
          userData={userDataGlobal}
        />
      )} */}
      <div></div>
      <div
        onWheel={(e) => e.stopPropagation()}
        className="bg-[#F9F9F9] h-full w-full "
      >
        {toggle === 0 && (
          <div className="flex flex-col gap-[35px] pt-[24px] pb-[95px] items-start justify-start customMargins">
            <div
              className="customMargins  scr1024:w-[40%] sm:w-[60%] w-[80%] p-[16px] flex flex-col gap-[16px] rounded-[12px] bg-[#fff]"
              style={{
                boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="text-[20px] font-medium">Select Skill</div>

              <ReactSelect
                options={skills.map((item) => ({
                  value: item,
                  label: camelCase(item),
                }))}
                className="w-full"
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="flex justify-start w-full ">
              <button
                className="text-[#C00000] "
                onClick={() => setshowSecondDiv(!showSecondDiv)}
              >
                {!showSecondDiv ? (
                  <span className="text-[#0C8A0A] font-montserrat text-lg font-medium leading-normal">
                    Results
                  </span>
                ) : (
                  "X Close"
                )}
              </button>
            </div> */}
            <div className="flex flex-col ml:flex-row justify-center items-center w-full gap-6">
              {showSecondDiv && (
                <div className="flex flex-col justify-start items-center rounded-lg shadow-md w-full">
                  <div className="hidden  ml:flex h-16 px-4 py-3  items-center self-stretch border-b border-solid border-[#DEDEDE] bg-[#E0F6FF] rounded-lg">
                    <div className="flex w-[35.18%] justify-between items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Assessment Name
                      </p>
                    </div>
                    <div className="flex w-[19.95%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Status
                      </p>
                    </div>
                    <div className="flex w-[19.95%] justify-center items-center self-stretch border-r border-solid border-[#DEDEDE] ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Date
                      </p>
                    </div>
                    <div className="flex w-[19.95%] justify-center items-center self-stretch  ">
                      <p className="text-text-primary font-montserrat text-base font-medium leading-6">
                        Grade
                      </p>
                    </div>
                  </div>
                  <div className="max-h-[388px] ml:h-[388px] w-full overflow-auto ">
                    {assessmentList?.map((item) => (
                      <div
                        key={index}
                        className="border-b border-solid border-[#DEDEDE] w-full"
                      >
                        <div class="flex flex-col-reverse text-center  ml:flex-row ml:gap-[14px] py-[8px] px-[16px] w-[90%] ml:w-full items-center self-stretch ">
                          <div className="w-full flex justify-between gap-[12px]">
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
                            <div className="flex  justify-center  items-center self-stretch  ">
                              <p
                                className={`${
                                  item.score > 60
                                    ? "text-[#0C8A0A]"
                                    : "text-[red]"
                                } items-center  font-montserrat text-sm font-semibold leading-7`}
                              >
                                {item.score > 60 ? "Completed" : "Incomplete"}
                              </p>
                            </div>
                          </div>
                          <div className="w-full ml:w-[80%] flex justify-between gap-[12px]">
                            <div className="flex  justify-center items-center self-stretch ">
                              <p className="text-[14px] font-montserrat text-base font-medium leading-6">
                                {item?.date && formatDate(item?.date)}
                              </p>
                            </div>
                            <div className="flex  justify-center ml:w-[50%]  items-center self-stretch  ">
                              <p className="text-[#0C8A0A] items-center  font-montserrat text-sm font-semibold leading-7">
                                {item.score}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div
                className={`p-[12px] ms:px-[60px] ms:customMargins ${
                  showSecondDiv ? "ml:w-[50%]" : "w-[100.95%] "
                } scr1024:w-[50%] sm:w-[85%] w-[100%]  px-[12px] rounded-[12px] bg-[#005A81] flex flex-col  items-center gap-[8px] scr820:gap-[16px] `}
              >
                <div className="text-[20px] font-[600] text-[#fff] flex flex-row gap-[12px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_4403_58310)">
                      <path
                        d="M28.7109 15.6445C28.7109 23.5729 22.2838 30 14.3555 30C6.42715 30 0 23.5729 0 15.6445C0 7.71621 6.42715 1.28906 14.3555 1.28906C22.2838 1.28906 28.7109 7.71621 28.7109 15.6445Z"
                        fill="#00C1FB"
                      />
                      <path
                        d="M26.8555 13.5352C26.8555 20.0072 21.6088 25.2539 15.1367 25.2539C8.66463 25.2539 3.41797 20.0072 3.41797 13.5352C3.41797 7.06307 8.66463 1.81641 15.1367 1.81641C21.6088 1.81641 26.8555 7.06307 26.8555 13.5352Z"
                        fill="#00D1FC"
                      />
                      <path
                        d="M4.21875 28.1392H2.40234C1.91695 28.1392 1.52344 27.7456 1.52344 27.2603V15.5415C1.52344 15.0561 1.91695 14.6626 2.40234 14.6626H4.21875C4.70414 14.6626 5.09766 15.0561 5.09766 15.5415V27.2603C5.09766 27.7457 4.70414 28.1392 4.21875 28.1392Z"
                        fill="#FF3980"
                      />
                      <path
                        d="M15 15.5415V27.2603C15 27.7456 14.6065 28.1392 14.1211 28.1392H4.21875C3.73336 28.1392 3.33984 27.7456 3.33984 27.2603V15.5415C3.33984 15.0561 3.73336 14.6626 4.21875 14.6626H14.1211C14.6065 14.6626 15 15.0561 15 15.5415Z"
                        fill="#FF5E95"
                      />
                      <path
                        d="M8.70219 25.4944C8.70219 25.8665 8.40049 26.1682 8.02836 26.1682C7.65623 26.1682 7.35453 25.8665 7.35453 25.4944C7.35453 25.1222 7.65623 24.8205 8.02836 24.8205C8.40049 24.8205 8.70219 25.1222 8.70219 25.4944ZM10.4792 19.7149C10.4129 18.4375 9.35844 17.4167 8.07869 17.3909C6.83393 17.3651 5.76939 18.2739 5.59783 19.5031C5.58213 19.6156 5.57422 19.7305 5.57422 19.8446C5.57422 20.1682 5.83654 20.4305 6.16016 20.4305C6.48377 20.4305 6.74609 20.1682 6.74609 19.8446C6.74609 19.7845 6.75025 19.724 6.75846 19.6651C6.84805 19.0235 7.40727 18.5503 8.05514 18.5626C8.72357 18.576 9.2743 19.1089 9.30893 19.7756C9.32738 20.1316 9.20287 20.4696 8.9583 20.7271C8.7135 20.9849 8.38326 21.1269 8.02842 21.1269C7.70481 21.1269 7.44248 21.3892 7.44248 21.7129V23.6664C7.44248 23.99 7.70481 24.2524 8.02842 24.2524C8.35203 24.2524 8.61436 23.99 8.61436 23.6664V22.2271C9.06629 22.1152 9.48354 21.8759 9.80815 21.534C10.2761 21.0411 10.5145 20.395 10.4792 19.7149Z"
                        fill="#FFAFE2"
                      />
                      <path
                        d="M9.80814 21.534C9.48353 21.8758 9.06629 22.1152 8.61436 22.2271V22.3941C8.61436 22.7177 8.35203 22.9801 8.02842 22.9801C7.7048 22.9801 7.44248 22.7177 7.44248 22.3941V21.7129C7.44248 21.3901 7.7034 21.1264 8.02613 21.1269C8.38186 21.1275 8.71297 20.9855 8.9583 20.7271C9.20287 20.4696 9.32738 20.1316 9.30893 19.7756C9.2743 19.1089 8.72357 18.576 8.05514 18.5626C7.40727 18.5503 6.84805 19.0235 6.75846 19.6651C6.75061 19.7214 6.74645 19.779 6.74609 19.8364C6.74416 20.1484 6.49988 20.4153 6.18828 20.4299C5.85189 20.4456 5.57422 20.1775 5.57422 19.8446C5.57422 19.7305 5.58219 19.6156 5.59783 19.5031C5.76939 18.2739 6.83393 17.3651 8.07869 17.3909C9.35844 17.4167 10.4129 18.4375 10.4792 19.7149C10.5146 20.395 10.2762 21.041 9.80814 21.534Z"
                        fill="#FFC7E8"
                      />
                      <path
                        d="M29.9982 10.4151C29.9982 12.3188 29.4874 14.1032 28.5954 15.6387C28.4818 15.8344 28.3188 15.9974 28.1232 16.111C26.5875 17.003 24.8031 17.5138 22.8992 17.5138C17.1528 17.5137 12.4843 12.8451 12.4844 7.09869C12.4844 5.18672 12.9996 3.3951 13.8988 1.85502C14.0052 1.67273 14.1572 1.5208 14.3395 1.41439C15.8795 0.515273 17.6712 5.51523e-10 19.5831 5.51523e-10C25.3296 -5.85932e-05 29.9983 4.66863 29.9982 10.4151Z"
                        fill="#FFC143"
                      />
                      <path
                        d="M28.616 15.6097C26.817 18.7299 23.4472 20.8301 19.5869 20.8301C13.8348 20.8301 9.17188 16.1671 9.17188 10.415C9.17188 6.55472 11.2721 3.18493 14.3922 1.38599C13.5106 2.91499 13.0062 4.68892 13.0062 6.58067C13.0062 12.3328 17.6692 16.9957 23.4213 16.9957C25.313 16.9957 27.087 16.4913 28.616 15.6097Z"
                        fill="#FFB509"
                      />
                      <path
                        d="M20.4698 17.4778C20.4698 17.9658 20.0742 18.3614 19.5862 18.3614C19.0982 18.3614 18.7026 17.9658 18.7026 17.4778C18.7026 16.9898 19.0981 16.5942 19.5862 16.5942C20.0741 16.5942 20.4698 16.9898 20.4698 17.4778ZM24.1738 6.81947C24.0497 4.42856 22.076 2.51787 19.6805 2.46965C17.3541 2.424 15.3575 4.12234 15.0365 6.42303C15.0071 6.63356 14.9922 6.84883 14.9922 7.0627C14.9922 7.54809 15.3857 7.9416 15.8711 7.9416C16.3565 7.9416 16.75 7.54809 16.75 7.0627C16.75 6.92981 16.7592 6.79633 16.7774 6.66602C16.9728 5.2658 18.1752 4.22652 19.5871 4.22652C19.6063 4.22652 19.6257 4.2267 19.6451 4.22711C21.1236 4.25688 22.3418 5.43561 22.4184 6.91059C22.4592 7.69768 22.1838 8.44492 21.6428 9.01469C21.1015 9.58486 20.371 9.89887 19.5861 9.89887C19.1007 9.89887 18.7072 10.2924 18.7072 10.7778V14.6625C18.7072 15.1479 19.1007 15.5414 19.5861 15.5414C20.0715 15.5414 20.465 15.1479 20.465 14.6625V11.5737C21.397 11.3949 22.2469 10.9314 22.9175 10.2251C23.7938 9.30215 24.2399 8.09272 24.1738 6.81947Z"
                        fill="#FFE7BF"
                      />
                      <path
                        d="M22.9174 10.2251C22.2468 10.9314 21.3968 11.3949 20.4649 11.5737V12.4369C20.4649 12.9222 20.0714 13.3158 19.586 13.3158C19.1006 13.3158 18.7071 12.9222 18.7071 12.4369V10.7778C18.7071 10.2927 19.104 9.89939 19.5891 9.89887C20.3729 9.89805 21.1021 9.5841 21.6427 9.01469C22.1837 8.44492 22.4591 7.69768 22.4183 6.91059C22.3417 5.43561 21.1235 4.25688 19.645 4.22711C19.6256 4.2267 19.6062 4.22652 19.587 4.22652C18.1751 4.22652 16.9727 5.2658 16.7773 6.66602C16.7591 6.79633 16.7499 6.92981 16.7499 7.0627C16.7499 7.55729 16.3413 7.95649 15.8433 7.94119C15.3628 7.92643 14.9891 7.5134 14.9922 7.03275C14.9936 6.82873 15.0084 6.62377 15.0364 6.42303C15.3574 4.12234 17.354 2.424 19.6804 2.46965C22.0759 2.51787 24.0496 4.42856 24.1737 6.81947C24.2398 8.09277 23.7936 9.30221 22.9174 10.2251Z"
                        fill="#FFF5F5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4403_58310">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
                      xmlns="http://www.w3.org/2000/svg"
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
                      10 MCQs
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
                      xmlns="http://www.w3.org/2000/svg"
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
                      20 Minutes
                    </div>
                    <div className="text-[10px] scr820:text-[13px] text-[#fff] font-[500] flex flex-col items-center">
                      2 minute per Question
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
                      xmlns="http://www.w3.org/2000/svg"
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
                      Quick Result
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
                    toggleContent();
                  }}
                >
                  <button
                    className=" h-[42px] w-[108px] flex items-center justify-center  rounded-[8px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] text-[#333] text-[14px] font-[500] transition-all transition-[0.2s]"
                    disabled={loading}
                    // onClick={() =>
                    //   setQuestionIndex(
                    //     questionIndex + 1 < 10 ? questionIndex + 1 : 9
                    //   )
                    // }
                  >
                    {loading ? <MiniLoader /> : "Start"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {toggle === 1 && (
          <div className="w-full flex justify-between items-center gap-[0px] scr540:gap-[24px] flex-row py-[36px] gap-[8px]">
            <div className="w-[8px] ml:w-[22%] h-[2px] bg-[#06A9EF] border-none"></div>
            <div className="w-full   ml:max-w-[903px] flex flex-col gap-[24px]">
              <div className="bg-[#fff] border-[2px] border-solid border-[#06A9EF] rounded-[12px] py-[24px] px-[16px] ml:px-[60px] flex flex-col gap-[12px]">
                <div className="w-full flex flex-row justify-center gap-[12px] text-[14px] ml:text-[20px] font-[600]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_4403_58133)">
                      <path
                        d="M28.7109 15.6445C28.7109 23.5729 22.2838 30 14.3555 30C6.42715 30 0 23.5729 0 15.6445C0 7.71621 6.42715 1.28906 14.3555 1.28906C22.2838 1.28906 28.7109 7.71621 28.7109 15.6445Z"
                        fill="#00C1FB"
                      />
                      <path
                        d="M26.8555 13.5352C26.8555 20.0072 21.6088 25.2539 15.1367 25.2539C8.66463 25.2539 3.41797 20.0072 3.41797 13.5352C3.41797 7.06307 8.66463 1.81641 15.1367 1.81641C21.6088 1.81641 26.8555 7.06307 26.8555 13.5352Z"
                        fill="#00D1FC"
                      />
                      <path
                        d="M4.21875 28.1392H2.40234C1.91695 28.1392 1.52344 27.7456 1.52344 27.2603V15.5415C1.52344 15.0561 1.91695 14.6626 2.40234 14.6626H4.21875C4.70414 14.6626 5.09766 15.0561 5.09766 15.5415V27.2603C5.09766 27.7457 4.70414 28.1392 4.21875 28.1392Z"
                        fill="#FF3980"
                      />
                      <path
                        d="M15 15.5415V27.2603C15 27.7456 14.6065 28.1392 14.1211 28.1392H4.21875C3.73336 28.1392 3.33984 27.7456 3.33984 27.2603V15.5415C3.33984 15.0561 3.73336 14.6626 4.21875 14.6626H14.1211C14.6065 14.6626 15 15.0561 15 15.5415Z"
                        fill="#FF5E95"
                      />
                      <path
                        d="M8.70219 25.4941C8.70219 25.8663 8.40049 26.168 8.02836 26.168C7.65623 26.168 7.35453 25.8663 7.35453 25.4941C7.35453 25.122 7.65623 24.8203 8.02836 24.8203C8.40049 24.8203 8.70219 25.122 8.70219 25.4941ZM10.4792 19.7146C10.4129 18.4373 9.35844 17.4165 8.07869 17.3907C6.83393 17.3648 5.76939 18.2737 5.59783 19.5029C5.58213 19.6154 5.57422 19.7303 5.57422 19.8443C5.57422 20.168 5.83654 20.4303 6.16016 20.4303C6.48377 20.4303 6.74609 20.168 6.74609 19.8443C6.74609 19.7842 6.75025 19.7238 6.75846 19.6648C6.84805 19.0232 7.40727 18.55 8.05514 18.5624C8.72357 18.5758 9.2743 19.1086 9.30893 19.7754C9.32738 20.1314 9.20287 20.4693 8.9583 20.7269C8.7135 20.9847 8.38326 21.1267 8.02842 21.1267C7.70481 21.1267 7.44248 21.389 7.44248 21.7126V23.6662C7.44248 23.9898 7.70481 24.2521 8.02842 24.2521C8.35203 24.2521 8.61436 23.9898 8.61436 23.6662V22.2268C9.06629 22.1149 9.48354 21.8756 9.80815 21.5337C10.2761 21.0408 10.5145 20.3948 10.4792 19.7146Z"
                        fill="#FFAFE2"
                      />
                      <path
                        d="M9.80814 21.5337C9.48353 21.8756 9.06629 22.1149 8.61436 22.2268V22.3939C8.61436 22.7175 8.35203 22.9798 8.02842 22.9798C7.7048 22.9798 7.44248 22.7175 7.44248 22.3939V21.7126C7.44248 21.3899 7.7034 21.1261 8.02613 21.1267C8.38186 21.1273 8.71297 20.9852 8.9583 20.7269C9.20287 20.4693 9.32738 20.1313 9.30893 19.7754C9.2743 19.1086 8.72357 18.5758 8.05514 18.5624C7.40727 18.5501 6.84805 19.0232 6.75846 19.6648C6.75061 19.7211 6.74645 19.7788 6.74609 19.8362C6.74416 20.1482 6.49988 20.4151 6.18828 20.4296C5.85189 20.4454 5.57422 20.1773 5.57422 19.8443C5.57422 19.7303 5.58219 19.6154 5.59783 19.5029C5.76939 18.2737 6.83393 17.3648 8.07869 17.3907C9.35844 17.4165 10.4129 18.4372 10.4792 19.7146C10.5146 20.3947 10.2762 21.0408 9.80814 21.5337Z"
                        fill="#FFC7E8"
                      />
                      <path
                        d="M29.9982 10.4151C29.9982 12.3188 29.4874 14.1032 28.5954 15.6387C28.4818 15.8344 28.3188 15.9974 28.1232 16.111C26.5875 17.003 24.8031 17.5138 22.8992 17.5138C17.1528 17.5137 12.4843 12.8451 12.4844 7.09869C12.4844 5.18672 12.9996 3.3951 13.8988 1.85502C14.0052 1.67273 14.1572 1.5208 14.3395 1.41439C15.8795 0.515273 17.6712 5.51523e-10 19.5831 5.51523e-10C25.3296 -5.85932e-05 29.9983 4.66863 29.9982 10.4151Z"
                        fill="#FFC143"
                      />
                      <path
                        d="M28.616 15.6095C26.817 18.7296 23.4472 20.8298 19.5869 20.8298C13.8348 20.8298 9.17188 16.1669 9.17188 10.4148C9.17188 6.55447 11.2721 3.18469 14.3922 1.38574C13.5106 2.91475 13.0062 4.68867 13.0062 6.58043C13.0062 12.3325 17.6692 16.9955 23.4213 16.9955C25.313 16.9955 27.087 16.4911 28.616 15.6095Z"
                        fill="#FFB509"
                      />
                      <path
                        d="M20.4698 17.4778C20.4698 17.9658 20.0742 18.3614 19.5862 18.3614C19.0982 18.3614 18.7026 17.9658 18.7026 17.4778C18.7026 16.9898 19.0981 16.5942 19.5862 16.5942C20.0741 16.5942 20.4698 16.9898 20.4698 17.4778ZM24.1738 6.81947C24.0497 4.42856 22.076 2.51787 19.6805 2.46965C17.3541 2.424 15.3575 4.12234 15.0365 6.42303C15.0071 6.63356 14.9922 6.84883 14.9922 7.0627C14.9922 7.54809 15.3857 7.9416 15.8711 7.9416C16.3565 7.9416 16.75 7.54809 16.75 7.0627C16.75 6.92981 16.7592 6.79633 16.7774 6.66602C16.9728 5.2658 18.1752 4.22652 19.5871 4.22652C19.6063 4.22652 19.6257 4.2267 19.6451 4.22711C21.1236 4.25688 22.3418 5.43561 22.4184 6.91059C22.4592 7.69768 22.1838 8.44492 21.6428 9.01469C21.1015 9.58486 20.371 9.89887 19.5861 9.89887C19.1007 9.89887 18.7072 10.2924 18.7072 10.7778V14.6625C18.7072 15.1479 19.1007 15.5414 19.5861 15.5414C20.0715 15.5414 20.465 15.1479 20.465 14.6625V11.5737C21.397 11.3949 22.2469 10.9314 22.9175 10.2251C23.7938 9.30215 24.2399 8.09272 24.1738 6.81947Z"
                        fill="#FFE7BF"
                      />
                      <path
                        d="M22.9174 10.2251C22.2468 10.9314 21.3968 11.3949 20.4649 11.5737V12.4369C20.4649 12.9222 20.0714 13.3158 19.586 13.3158C19.1006 13.3158 18.7071 12.9222 18.7071 12.4369V10.7778C18.7071 10.2927 19.104 9.89939 19.5891 9.89887C20.3729 9.89805 21.1021 9.5841 21.6427 9.01469C22.1837 8.44492 22.4591 7.69768 22.4183 6.91059C22.3417 5.43561 21.1235 4.25688 19.645 4.22711C19.6256 4.2267 19.6062 4.22652 19.587 4.22652C18.1751 4.22652 16.9727 5.2658 16.7773 6.66602C16.7591 6.79633 16.7499 6.92981 16.7499 7.0627C16.7499 7.55729 16.3413 7.95649 15.8433 7.94119C15.3628 7.92643 14.9891 7.5134 14.9922 7.03275C14.9936 6.82873 15.0084 6.62377 15.0364 6.42303C15.3574 4.12234 17.354 2.424 19.6804 2.46965C22.0759 2.51787 24.0496 4.42856 24.1737 6.81947C24.2398 8.09277 23.7936 9.30221 22.9174 10.2251Z"
                        fill="#FFF5F5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4403_58133">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  {camelCase(selectedSkill)} Assessment
                </div>
                <div className="flex flex-col gap-[24px]">
                  <div
                    className="rounded-[6px] ml:rounded-[16px] flex flex-col gap-[12px] p-[24px] bg-[#E0F6FF]"
                    style={{
                      boxShadow: "  0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="text-[14px] ml:text-[20px] text-[#06A9EF] font-[600]">
                      Question {questionIndex + 1}
                    </div>
                    <div className="text-[12px] ml:text-[16px] text-[#333] font-[600]">
                      {question[questionIndex]?.question}
                    </div>
                  </div>
                  <div className="flex flex-col ml:flex-row gap-[24px]">
                    <div className="w-full flex items-between  flex-col gap-[24px]">
                      <div
                        className={`py-[12px] px-[16px] rounded-[6px] ml:rounded-[8px] text-[12px] ml:text-[16px] font-[600] h-[50%]  ${
                          isSelected(
                            question[questionIndex]?.options[0],
                            questionIndex + 1
                          ) && "bg-[#06A9EF] text-white"
                        }`}
                        style={{
                          boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                        }}
                        onClick={() =>
                          answerSeter(
                            questionIndex + 1,
                            question[questionIndex]?.options[0]
                          )
                        }
                      >
                        A) {question[questionIndex]?.options[0]}
                      </div>
                      <div
                        className={`py-[12px] px-[16px] rounded-[6px] ml:rounded-[8px] text-[12px] ml:text-[16px] font-[600] h-[50%]  ${
                          isSelected(
                            question[questionIndex]?.options[2],
                            questionIndex + 1
                          ) && "bg-[#06A9EF] text-white"
                        }`}
                        style={{
                          boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                        }}
                        onClick={() =>
                          answerSeter(
                            questionIndex + 1,
                            question[questionIndex]?.options[2]
                          )
                        }
                      >
                        C){question[questionIndex]?.options[2]}
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-between gap-[24px]">
                      <div
                        className={`py-[12px] px-[16px] rounded-[6px] ml:rounded-[8px] text-[12px] ml:text-[16px] font-[600] h-[50%]  ${
                          isSelected(
                            question[questionIndex]?.options[1],
                            questionIndex + 1
                          ) && "bg-[#06A9EF] text-white"
                        }`}
                        style={{
                          boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                        }}
                        onClick={() =>
                          answerSeter(
                            questionIndex + 1,
                            question[questionIndex]?.options[1]
                          )
                        }
                      >
                        B) {question[questionIndex]?.options[1]}
                      </div>
                      <div
                        className={`py-[12px] px-[16px] rounded-[6px] ml:rounded-[8px] text-[12px] ml:text-[16px] font-[600] h-[50%]  ${
                          isSelected(
                            question[questionIndex]?.options[3],
                            questionIndex + 1
                          ) && "bg-[#06A9EF] text-white"
                        }`}
                        style={{
                          boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                        }}
                        onClick={() =>
                          answerSeter(
                            questionIndex + 1,
                            question[questionIndex]?.options[3]
                          )
                        }
                      >
                        D) {question[questionIndex]?.options[3]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml:flex-row w-full gap-[12px]  justify-center">
                <div className="w-full  flex justify-center ml:justify-start">
                  <Timer
                    startTimer={startTimer}
                    setIsTimerOver={setIsTimerOver}
                  />
                </div>
                <div
                  className="flex flex-row gap-[3px] items-center cursor-pointer text-[18px] font-[600] w-[340px] px-[12px] justify-between  rounded-[8px] border-[1px] border-solid border-[#06A9EF] bg-[#fff]"
                  onClick={() => {
                    if (questionIndex == 9) {
                      axios
                        .post(
                          "https://freedygoservices.in/api/assessment/add",
                          {
                            userId: userDataGlobal._id,
                            skill: selectedSkill,
                            score: checkAnswer() * 10,
                            date: new Date(),
                          }
                        )
                        .then((res) => {
                          setScore(true);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      setQuestionIndex(
                        questionIndex + 1 < 10 ? questionIndex + 1 : 9
                      );
                    }
                    setSkipped([...skipped, questionIndex]);
                  }}
                >
                  <span className="text-red">X</span>
                  Not Relevent
                </div>
                <div className="flex flex-row justify-between ml:gap-[72px]">
                  <div
                    className="flex flex-row gap-[3px] items-center justify-center text-[18px] font-[600]"
                    onClick={() =>
                      setQuestionIndex(
                        questionIndex - 1 >= 0 ? questionIndex - 1 : 0
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <g mask="url(#mask0_4403_58165)">
                        <path
                          d="M17.9367 19.9998L23.2027 25.2658L21.7444 26.7658L14.9785 19.9998L21.7444 13.2338L23.2027 14.7338L17.9367 19.9998ZM19.9959 35.8331C22.1858 35.8331 24.2442 35.4175 26.1711 34.5864C28.098 33.7553 29.7742 32.6228 31.1995 31.1888C32.6249 29.7548 33.7534 28.0765 34.5848 26.154C35.4163 24.2315 35.832 22.1811 35.832 20.0026C35.832 17.8127 35.4165 15.7543 34.5854 13.8274C33.7543 11.9005 32.6263 10.2244 31.2016 8.79901C29.7769 7.37362 28.1015 6.24519 26.1754 5.41371C24.2494 4.58224 22.1914 4.1665 20.0015 4.1665C17.8116 4.1665 15.7579 4.58206 13.8402 5.41317C11.9226 6.24428 10.2465 7.3722 8.81182 8.79692C7.37718 10.2217 6.24413 11.8971 5.41265 13.8231C4.58118 15.7492 4.16545 17.8071 4.16545 19.997C4.16545 22.1755 4.581 24.2264 5.41211 26.1498C6.24323 28.0731 7.37578 29.7521 8.80978 31.1867C10.2438 32.6214 11.9192 33.7544 13.8359 34.5859C15.7527 35.4174 17.8061 35.8331 19.9959 35.8331Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                    Previous
                  </div>

                  <button
                    disabled={loading}
                    className="flex flex-row gap-[3px] items-center justify-center text-[18px] font-[600] "
                    style={{ opacity: loading ? "0.5" : 1 }}
                    onClick={() => {
                      if (questionIndex == 9) {
                        axios
                          .post(
                            "https://freedygoservices.in/api/assessment/add",
                            {
                              userId: userDataGlobal._id,
                              skill: selectedSkill,
                              score: checkAnswer() * 10,
                              date: new Date(),
                            }
                          )
                          .then((res) => {
                            setScore(true);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      } else {
                        setQuestionIndex(
                          questionIndex + 1 < 10 ? questionIndex + 1 : 9
                        );
                      }
                    }}
                  >
                    {questionIndex == 9 ? "Submit" : "Next"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <g mask="url(#mask0_4403_58171)">
                        <path
                          d="M22.0633 19.9998L16.7973 25.2658L18.2556 26.7658L25.0215 19.9998L18.2556 13.2338L16.7973 14.7338L22.0633 19.9998ZM20.0041 35.8331C17.8142 35.8331 15.7558 35.4175 13.8289 34.5864C11.902 33.7553 10.2258 32.6228 8.80047 31.1888C7.37508 29.7548 6.24665 28.0765 5.41518 26.154C4.58371 24.2315 4.16797 22.1811 4.16797 20.0026C4.16797 17.8127 4.58352 15.7543 5.41464 13.8274C6.24575 11.9005 7.37366 10.2244 8.79839 8.79901C10.2231 7.37362 11.8985 6.24519 13.8246 5.41371C15.7506 4.58224 17.8086 4.1665 19.9985 4.1665C22.1884 4.1665 24.2421 4.58206 26.1598 5.41317C28.0774 6.24428 29.7535 7.3722 31.1882 8.79692C32.6228 10.2217 33.7559 11.8971 34.5873 13.8231C35.4188 15.7492 35.8346 17.8071 35.8346 19.997C35.8346 22.1755 35.419 24.2264 34.5879 26.1498C33.7568 28.0731 32.6242 29.7521 31.1902 31.1867C29.7562 32.6214 28.0808 33.7544 26.1641 34.5859C24.2473 35.4174 22.1939 35.8331 20.0041 35.8331Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[8px] ml:w-[22%] h-[2px] bg-[#06A9EF] border-none"></div>
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
                            <div className="text-[22px] font-[600] text-[#263751]">
                              {checkAnswer()} Answers
                            </div>
                            <div className="text-[14px] font-[600] text-[#646464] flex gap-[4px]">
                              You got Right{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
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
                            </div>
                          </div>
                          <div className="text-[12px] font-[400] flex justify-end">
                            {((checkAnswer() / question.length) * 100).toFixed(
                              0
                            )}
                            %
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <div className="text-[22px] font-[600] text-[#263751]">
                              {answer.length - checkAnswer()} Answers
                            </div>
                            <div className="text-[14px] font-[600] text-[#646464] flex gap-[4px]">
                              You got Wrong{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
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
                            </div>
                          </div>
                          <div className="text-[12px] font-[400] flex justify-end">
                            {(
                              (checkAnswer() / question.length) * 100 -
                              100
                            ).toFixed(0)}{" "}
                            %
                          </div>
                        </div>
                        <div className="text-[18px] text-[#5B5B5B] font-[600]">
                          Your Grade is{" "}
                          {((checkAnswer() / question.length) * 100).toFixed(0)}{" "}
                          %
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center pb-[12px]">
                    <button
                      onClick={() => {
                        setToggle(0);
                        setScore(false);
                        setQuestionIndex(0);
                        setQuestion([]);
                        setSkipped([])
                      }}
                      className="border-[1px] border-solid border-[#06A9EF] rounded-[12px] px-[36px] py-[12px] text-[16px] text-[#333] font-[500]"
                    >
                      Close
                    </button>
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
