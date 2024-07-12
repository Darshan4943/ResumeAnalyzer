import React, { useRef, useEffect, useState } from "react";
import { camelCase } from "../../../utils/middleware";
import WaterMark from "../../../public/images/Watermark.svg";
import { SkillFooter, SkillHeader } from "../../../utils/svg";

const ResultPdf = ({
  questions,
  answers,
  firstContainer,
  secondContainer,
  thirdContainer,
  fourthContainer,
  fifthContainer,
  sixthContainer,
  seventhContainer,
  selectedSkill,
  checkAnswer,
  assesmentType,
  level,
  // setPages,
  // pages,
}) => {
  const [data, setData] = useState([]);

  console.log("answers", answers);
  console.log("questions", questions);

  useEffect(() => {
    const dataa = questions.map((questionItem, index) => ({
      ...questionItem,
      yourAns: answers[index]?.Answer,
    }));

    setData(dataa);
  }, [answers]);

  // useEffect(() => {
  //   const dataa = questions
  //     .map((questionItem, index) => {
  //       const answer = answers[index]?.Answer;
  //       console.log("an", answer)
  //       if (answer !== undefined) {
  //         return {
  //           ...questionItem,
  //           yourAns: answer,
  //         };
  //       }
  //       return null; // Return null if no answer
  //     })
  //     .filter((item) => item !== null); // Filter out the null values

  //   setData(dataa);
  // }, [answers, questions]);

  const pageRefs = useRef([]);

  const [pages, setPages] = useState([]);
  const firstPageRef = useRef(null);

  useEffect(() => {
    const splitContent = () => {
      const pageHeight = 820;
      const tempDiv = document.createElement("div");

      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      document.body.appendChild(tempDiv);

      let currentPage = "first";
      let currentPageContent = [];
      const pages = {
        first: [],
        second: [],
        third: [],
        fourth: [],
        fifth: [],
        sixth: [],
        seventh: [],
      };
      const pageKeys = Object.keys(pages);
      let currentPageIndex = 0;
      let questionCounter = 1;

      data.forEach((item, index) => {
        const questionBlock = {
          questionCounter: questionCounter,
          question: `${item.question}`,
          correctAnswer: `${item.answer}`,
          yourAnswer: `${item.yourAns}`,
        };

        tempDiv.innerText =
          currentPageContent
            .map((q) => {
              const correctAnswerText =
                q.correctAnswer !== q.yourAnswer && `\n${q.correctAnswer}` ;
              return `${q.question}\n${correctAnswerText}\n${q.yourAnswer}`;
            })
            .join("\n") +
          `\n${questionBlock.question}` +
          (questionBlock.correctAnswer !== questionBlock.yourAnswer
            && `\n${questionBlock.correctAnswer}`
            ) +
          `\n${questionBlock.yourAnswer}`;

        if (tempDiv.clientHeight >= pageHeight) {
          pages[pageKeys[currentPageIndex]] = [...currentPageContent];
          currentPageContent = [questionBlock];
          currentPageIndex++;
          currentPage = pageKeys[currentPageIndex];
        } else {
          currentPageContent.push(questionBlock);
        }

        questionCounter++;

        if (index === data.length - 1) {
          pages[pageKeys[currentPageIndex]] = [...currentPageContent];
        }
      });

      document.body.removeChild(tempDiv);

      const nonEmptyPages = Object.fromEntries(
        Object.entries(pages).filter(([key, value]) => value.length > 0)
      );

      setPages(nonEmptyPages);
    };

    splitContent();
  }, [data]);

  console.log("pages", pages);

  return (
    <>
      <div className="flex flex-col gap-[24px] h-[842px] w-[595px] ">
        <div
          className="flex flex-col p-[34px] gap-[20px] w-full   bg-watermark  bg-cover bg-no-repeat  "
          ref={firstContainer}
        >
          <>
            <div className="flex flex-col h-[700px] w-full gap-[20px]">
              <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                <div className="flex flex-row items-center gap-[16px]">
                  <SkillHeader />
                  <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                    Skill Assessment - {camelCase(selectedSkill)} (
                    {camelCase(level)})
                  </div>
                </div>
                <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                  <p className="mt-[-12px] py-[6px] px-[12px]">
                    Score : {checkAnswer()} / {questions.length}
                  </p>
                </div>
              </div>

              {pages?.first?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-[16px]">
                    {pages?.first?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[6px] ">
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">
                            Question {item?.questionCounter}
                          </p>
                          <span>: </span>
                          <p className="font-[500]"> {item.question}</p>
                        </div>
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">Your Answer</p>
                          <span>: </span>
                          <p
                            className="font-[500]"
                            style={{
                              color:
                                item.yourAnswer === item.correctAnswer
                                  ? "#0C8A0A"
                                  : "#C00000",
                            }}
                          >
                            {" "}
                            {item.yourAnswer}
                          </p>
                        </div>
                        {item.yourAnswer !== item.correctAnswer && (
                          <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Correct Answer</p>
                            <span>: </span>
                            <p className="font-[500]"> {item.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
            <div className="flex flex-row justify-between ">
              <SkillFooter />
              <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                Page {pages?.first && 1} of {Object.keys(pages).length}
              </div>
            </div>
          </>
        </div>

        {pages.second?.length > 0 && (
          <>
            <div
              className="flex flex-col p-[34px] gap-[20px]   bg-watermark  bg-cover bg-no-repeat   "
              ref={secondContainer}
            >
              <div className="flex flex-col min-h-[700px] w-full gap-[20px] ">
                <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                  <div className="flex flex-row items-center gap-[16px]">
                    <SkillHeader />
                    <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                      Skill Assessment - {camelCase(selectedSkill)} (
                      {camelCase(level)})
                    </div>
                  </div>
                  <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                    <p className="mt-[-12px] py-[6px] px-[12px]">
                      Score : {checkAnswer()} / {questions.length}
                    </p>
                  </div>
                </div>
                {pages?.second?.length > 0 && (
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full gap-[16px]">
                      {pages?.second?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-[6px] ">
                          <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">
                              {" "}
                              Question {item?.questionCounter}
                            </p>
                            <span>: </span>
                            <p className="font-[500]"> {item.question}</p>
                          </div>
                          <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Your Answer</p>
                            <span>: </span>
                            <p
                              className="font-[500]"
                              style={{
                                color:
                                  item.yourAnswer === item.correctAnswer
                                    ? "#0C8A0A"
                                    : "#C00000",
                              }}
                            >
                              {" "}
                              {item.yourAnswer}
                            </p>
                          </div>
                          {item.yourAnswer !== item.correctAnswer && (
                            <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                              <p className=" min-w-[72px]">Correct Answer</p>
                              <span>: </span>
                              <p className="font-[500]">
                                {" "}
                                {item.correctAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
              <div className="flex flex-row justify-between pt-[20px]">
                <SkillFooter />
                <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                  Page {pages?.second && 2} of {Object.keys(pages).length}
                </div>
              </div>
            </div>
          </>
        )}

        {pages?.third?.length > 0 && (
          <div className="flex flex-col p-[34px] gap-[20px] w-full   bg-watermark  bg-cover bg-no-repeat ">
            <div
              className="flex flex-col min-h-[712px] p-[34px] w-full gap-[20px]"
              ref={thirdContainer}
            >
              <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                <div className="flex flex-row items-center gap-[16px]">
                  <SkillHeader />
                  <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                    Skill Assessment - {camelCase(selectedSkill)} (
                    {camelCase(level)})
                  </div>
                </div>
                <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                  <p className="mt-[-12px] py-[6px] px-[12px]">
                    Score : {checkAnswer()} / {questions.length}
                  </p>
                </div>
              </div>
              {pages?.third?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-[16px]">
                    {pages?.third?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[6px] ">
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">
                            {" "}
                            Question {item?.questionCounter}
                          </p>
                          <span>: </span>
                          <p className="font-[500]"> {item.question}</p>
                        </div>
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">Your Answer</p>
                          <span>: </span>
                          <p
                            className="font-[500]"
                            style={{
                              color:
                                item.yourAnswer === item.correctAnswer
                                  ? "#0C8A0A"
                                  : "#C00000",
                            }}
                          >
                            {" "}
                            {item.yourAnswer}
                          </p>
                        </div>
                        {item.yourAnswer !== item.correctAnswer && (
                          <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Correct Answer</p>
                            <span>: </span>
                            <p className="font-[500]"> {item.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
            <div className="flex flex-row justify-between pt-[20px]">
              <SkillFooter />
              <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                Page {pages?.third && 3} of {Object.keys(pages).length}
              </div>
            </div>
          </div>
        )}

        {pages?.fourth?.length > 0 && (
          <div
            className="flex flex-col p-[34px] gap-[20px] w-full   bg-watermark  bg-cover bg-no-repeat"
            ref={fourthContainer}
          >
            <div className="flex flex-col min-h-[700px] w-full gap-[20px] p-[34px]  ">
              <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                <div className="flex flex-row items-center gap-[16px]">
                  <SkillHeader />
                  <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                    Skill Assessment - {camelCase(selectedSkill)} (
                    {camelCase(level)})
                  </div>
                </div>
                <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                  <p className="mt-[-12px] py-[6px] px-[12px]">
                    Score : {checkAnswer()} / {questions.length}
                  </p>
                </div>
              </div>
              {pages?.fourth?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-[16px]">
                    {pages?.fourth?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[6px] ">
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">
                            {" "}
                            Question {item?.questionCounter}
                          </p>
                          <span>: </span>
                          <p className="font-[500]"> {item.question}</p>
                        </div>
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">Your Answer</p>
                          <span>: </span>
                          <p
                            className="font-[500]"
                            style={{
                              color:
                                item.yourAnswer === item.correctAnswer
                                  ? "#0C8A0A"
                                  : "#C00000",
                            }}
                          >
                            {" "}
                            {item.yourAnswer}
                          </p>
                        </div>
                        {item.yourAnswer !== item.correctAnswer && (
                          <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Correct Answer</p>
                            <span>: </span>
                            <p className="font-[500]"> {item.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
            <div className="flex flex-row justify-between pt-[20px]">
              <SkillFooter />
              <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                Page {pages?.fourth && 4} of {Object.keys(pages).length}
              </div>
            </div>
          </div>
        )}

        {pages?.fifth?.length > 0 && (
          <div className="flex flex-col p-[34px] gap-[20px] w-full   bg-watermark  bg-cover bg-no-repeat">
            <div
              className="flex flex-col min-h-[712px] p-[34px] w-full gap-[20px]"
              ref={fifthContainer}
            >
              <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                <div className="flex flex-row items-center gap-[16px]">
                  <SkillHeader />
                  <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                    Skill Assessment - {camelCase(selectedSkill)} (
                    {camelCase(level)})
                  </div>
                </div>
                <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                  <p className="mt-[-12px] py-[6px] px-[12px]">
                    Score : {checkAnswer()} / {questions.length}
                  </p>
                </div>
              </div>
              {pages?.fifth?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-[16px]">
                    {pages?.fifth?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[6px] ">
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">
                            {" "}
                            Question {item?.questionCounter}
                          </p>
                          <span>: </span>
                          <p className="font-[500]"> {item.question}</p>
                        </div>
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">Your Answer</p>
                          <span>: </span>
                          <p
                            className="font-[500]"
                            style={{
                              color:
                                item.yourAnswer === item.correctAnswer
                                  ? "#0C8A0A"
                                  : "#C00000",
                            }}
                          >
                            {" "}
                            {item.yourAnswer}
                          </p>
                        </div>
                        {item.yourAnswer !== item.correctAnswer && (
                          <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Correct Answer</p>
                            <span>: </span>
                            <p className="font-[500]"> {item.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
            <div className="flex flex-row justify-between pt-[20px]">
              <SkillFooter />
              <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                Page {pages?.fifth && 5} of {Object.keys(pages).length}
              </div>
            </div>
          </div>
        )}

        {pages?.sixth?.length > 0 && (
          <div className="flex flex-col p-[34px] gap-[20px] w-full   bg-watermark  bg-cover bg-no-repeat">
            <div
              className="flex flex-col min-h-[712px] p-[34px] w-full gap-[20px]"
              ref={sixthContainer}
            >
              <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                <div className="flex flex-row items-center gap-[16px]">
                  <SkillHeader />
                  <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                    Skill Assessment - {camelCase(selectedSkill)} (
                    {camelCase(level)})
                  </div>
                </div>
                <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                  <p className="mt-[-12px] py-[6px] px-[12px]">
                    Score : {checkAnswer()} / {questions.length}
                  </p>
                </div>
              </div>
              {pages?.sixth?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-[16px]">
                    {pages?.sixth?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[6px] ">
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">
                            {" "}
                            Question {item?.questionCounter}
                          </p>
                          <span>: </span>
                          <p className="font-[500]"> {item.question}</p>
                        </div>
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">Your Answer</p>
                          <span>: </span>
                          <p
                            className="font-[500]"
                            style={{
                              color:
                                item.yourAnswer === item.correctAnswer
                                  ? "#0C8A0A"
                                  : "#C00000",
                            }}
                          >
                            {" "}
                            {item.yourAnswer}
                          </p>
                        </div>
                        {item.yourAnswer !== item.correctAnswer && (
                          <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Correct Answer</p>
                            <span>: </span>
                            <p className="font-[500]"> {item.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
            <div className="flex flex-row justify-between pt-[20px]">
              <SkillFooter />
              <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                Page {pages?.sixth && 6} of {Object.keys(pages).length}
              </div>
            </div>
          </div>
        )}

        {pages?.seventh?.length > 0 && (
          <div
            className="flex flex-col p-[34px] gap-[20px] w-full   bg-watermark  bg-cover bg-no-repeat"
            ref={seventhContainer}
          >
            <div className="flex flex-col min-h-[700px] w-full gap-[20px] p-[34px]">
              <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
                <div className="flex flex-row items-center gap-[16px]">
                  <SkillHeader />
                  <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] mt-[-12px]">
                    Skill Assessment - {camelCase(selectedSkill)} (
                    {camelCase(level)})
                  </div>
                </div>
                <div className="font-[600] text-[12px] font-Montserrat  text-[#333333]  bg-white rounded-[32px] py-[6px] px-[12px]">
                  <p className="mt-[-12px] py-[6px] px-[12px]">
                    Score : {checkAnswer()} / {questions.length}
                  </p>
                </div>
              </div>
              {pages?.seventh?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-[16px]">
                    {pages?.seventh?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[6px] ">
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">
                            {" "}
                            Question {item?.questionCounter}
                          </p>
                          <span>: </span>
                          <p className="font-[500]"> {item.question}</p>
                        </div>
                        <div className="flex flex-row text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                          <p className=" min-w-[72px]">Your Answer</p>
                          <span>: </span>
                          <p
                            className="font-[500]"
                            style={{
                              color:
                                item.yourAnswer === item.correctAnswer
                                  ? "#0C8A0A"
                                  : "#C00000",
                            }}
                          >
                            {" "}
                            {item.yourAnswer}
                          </p>
                        </div>
                        {item.yourAnswer !== item.correctAnswer && (
                          <div className="flex flex-row  text-[9px] font-[600] font-Montserrat  text-[#333333] gap-[10px]">
                            <p className=" min-w-[72px]">Correct Answer</p>
                            <span>: </span>
                            <p className="font-[500]"> {item.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[1px] w-[100%] bg-[#DEDEDE]"></div>
            <div className="flex flex-row justify-between pt-[20px]">
              <SkillFooter />
              <div className="text-[10px] font-[500] text-Montserrat text-[#646464]">
                Page {pages?.seventh && 7} of {Object.keys(pages).length}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultPdf;
