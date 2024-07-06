import React, { useRef, useEffect, useState } from "react";

const ResultPdf = ({ questions, answers }) => {
  // const data = questions.map((questionItem, index) => ({
  //   ...questionItem,
  //   yourAns: answers[index]?.Answer,
  // }));
  const data = [
    {
      question:
        "What is the correct syntax for creating a function in JavaScript?",
      options: [
        "function: myFunction()",
        "func myFunction()",
        "function myFunction()",
        "def myFunction()",
      ],
      answer: "function myFunction()",
      yourAns: undefined,
    },
    {
      question: "How do you declare a variable in JavaScript?",
      options: [
        "v myVar;",
        "var myVar;",
        "variable myVar;",
        "myVar = variable;",
      ],
      answer: "var myVar;",
      yourAns: undefined,
    },
    {
      question: "What will the following code output: console.log(2 + '2')?",
      options: ["22", "4", "NaN", "TypeError"],
      answer: "22",
      yourAns: undefined,
    },
    {
      question:
        "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["let", "static", "var", "const"],
      answer: "const",
      yourAns: undefined,
    },
    {
      question: "How do you check if a variable is an array in JavaScript?",
      options: [
        "isArray(myVar)",
        "myVar.isArray()",
        'myVar.typeOf === "array"',
        'typeof myVar === "array"',
      ],
      answer: "Array.isArray(myVar)",
      yourAns: undefined,
    },
    {
      question: "What does the 'use strict' directive do in JavaScript?",
      options: [
        "Enforces stricter parsing and error handling",
        "Defines a strict subset of JavaScript",
        "Disables certain features in JavaScript",
        "Allows you to use strict mode in functions",
      ],
      answer: "Enforces stricter parsing and error handling",
      yourAns: undefined,
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        "Math.round(7.25)",
        "round(7.25)",
        "Math.rnd(7.25)",
        "Math.floor(7.25)",
      ],
      answer: "Math.round(7.25)",
      yourAns: undefined,
    },
    {
      question: "Which operator is used to concatenate strings in JavaScript?",
      options: ["&", "+", "--", "%"],
      answer: "+",
      yourAns: undefined,
    },
    {
      question: "What is the result of the expression: '5' + 2?",
      options: ["7", "52", "5+2", "Error"],
      answer: "52",
      yourAns: undefined,
    },
    {
      question:
        "How do you access the last element of an array called myArray?",
      options: [
        "myArray[-1]",
        "myArray[len-1]",
        "myArray[last]",
        "myArray[myArray.length-1]",
      ],
      answer: "myArray[myArray.length-1]",
      yourAns: undefined,
    },
    {
      question:
        "What is the correct syntax for creating a function in JavaScript?",
      options: [
        "function: myFunction()",
        "func myFunction()",
        "function myFunction()",
        "def myFunction()",
      ],
      answer: "function myFunction()",
      yourAns: undefined,
    },
    {
      question: "How do you declare a variable in JavaScript?",
      options: [
        "v myVar;",
        "var myVar;",
        "variable myVar;",
        "myVar = variable;",
      ],
      answer: "var myVar;",
      yourAns: undefined,
    },
    {
      question: "What will the following code output: console.log(2 + '2')?",
      options: ["22", "4", "NaN", "TypeError"],
      answer: "22",
      yourAns: undefined,
    },
    {
      question:
        "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["let", "static", "var", "const"],
      answer: "const",
      yourAns: undefined,
    },
    {
      question: "How do you check if a variable is an array in JavaScript?",
      options: [
        "isArray(myVar)",
        "myVar.isArray()",
        'myVar.typeOf === "array"',
        'typeof myVar === "array"',
      ],
      answer: "Array.isArray(myVar)",
      yourAns: undefined,
    },
    {
      question: "What does the 'use strict' directive do in JavaScript?",
      options: [
        "Enforces stricter parsing and error handling",
        "Defines a strict subset of JavaScript",
        "Disables certain features in JavaScript",
        "Allows you to use strict mode in functions",
      ],
      answer: "Enforces stricter parsing and error handling",
      yourAns: undefined,
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        "Math.round(7.25)",
        "round(7.25)",
        "Math.rnd(7.25)",
        "Math.floor(7.25)",
      ],
      answer: "Math.round(7.25)",
      yourAns: undefined,
    },
    {
      question: "Which operator is used to concatenate strings in JavaScript?",
      options: ["&", "+", "--", "%"],
      answer: "+",
      yourAns: undefined,
    },
    {
      question: "What is the result of the expression: '5' + 2?",
      options: ["7", "52", "5+2", "Error"],
      answer: "52",
      yourAns: undefined,
    },
    {
      question:
        "How do you access the last element of an array called myArray?",
      options: [
        "myArray[-1]",
        "myArray[len-1]",
        "myArray[last]",
        "myArray[myArray.length-1]",
      ],
      answer: "myArray[myArray.length-1]",
      yourAns: undefined,
    },
    {
      question:
        "What is the correct syntax for creating a function in JavaScript?",
      options: [
        "function: myFunction()",
        "func myFunction()",
        "function myFunction()",
        "def myFunction()",
      ],
      answer: "function myFunction()",
      yourAns: undefined,
    },
    {
      question: "How do you declare a variable in JavaScript?",
      options: [
        "v myVar;",
        "var myVar;",
        "variable myVar;",
        "myVar = variable;",
      ],
      answer: "var myVar;",
      yourAns: undefined,
    },
    {
      question: "What will the following code output: console.log(2 + '2')?",
      options: ["22", "4", "NaN", "TypeError"],
      answer: "22",
      yourAns: undefined,
    },
    {
      question:
        "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["let", "static", "var", "const"],
      answer: "const",
      yourAns: undefined,
    },
    {
      question: "How do you check if a variable is an array in JavaScript?",
      options: [
        "isArray(myVar)",
        "myVar.isArray()",
        'myVar.typeOf === "array"',
        'typeof myVar === "array"',
      ],
      answer: "Array.isArray(myVar)",
      yourAns: undefined,
    },
    {
      question: "What does the 'use strict' directive do in JavaScript?",
      options: [
        "Enforces stricter parsing and error handling",
        "Defines a strict subset of JavaScript",
        "Disables certain features in JavaScript",
        "Allows you to use strict mode in functions",
      ],
      answer: "Enforces stricter parsing and error handling",
      yourAns: undefined,
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        "Math.round(7.25)",
        "round(7.25)",
        "Math.rnd(7.25)",
        "Math.floor(7.25)",
      ],
      answer: "Math.round(7.25)",
      yourAns: undefined,
    },
    {
      question: "Which operator is used to concatenate strings in JavaScript?",
      options: ["&", "+", "--", "%"],
      answer: "+",
      yourAns: undefined,
    },
    {
      question: "What is the result of the expression: '5' + 2?",
      options: ["7", "52", "5+2", "Error"],
      answer: "52",
      yourAns: undefined,
    },
    {
      question:
        "How do you access the last element of an array called myArray?",
      options: [
        "myArray[-1]",
        "myArray[len-1]",
        "myArray[last]",
        "myArray[myArray.length-1]",
      ],
      answer: "myArray[myArray.length-1]",
      yourAns: undefined,
    },
    {
      question:
        "What is the correct syntax for creating a function in JavaScript?",
      options: [
        "function: myFunction()",
        "func myFunction()",
        "function myFunction()",
        "def myFunction()",
      ],
      answer: "function myFunction()",
      yourAns: undefined,
    },
    {
      question: "How do you declare a variable in JavaScript?",
      options: [
        "v myVar;",
        "var myVar;",
        "variable myVar;",
        "myVar = variable;",
      ],
      answer: "var myVar;",
      yourAns: undefined,
    },
    {
      question: "What will the following code output: console.log(2 + '2')?",
      options: ["22", "4", "NaN", "TypeError"],
      answer: "22",
      yourAns: undefined,
    },
    {
      question:
        "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["let", "static", "var", "const"],
      answer: "const",
      yourAns: undefined,
    },
    {
      question: "How do you check if a variable is an array in JavaScript?",
      options: [
        "isArray(myVar)",
        "myVar.isArray()",
        'myVar.typeOf === "array"',
        'typeof myVar === "array"',
      ],
      answer: "Array.isArray(myVar)",
      yourAns: undefined,
    },
    {
      question: "What does the 'use strict' directive do in JavaScript?",
      options: [
        "Enforces stricter parsing and error handling",
        "Defines a strict subset of JavaScript",
        "Disables certain features in JavaScript",
        "Allows you to use strict mode in functions",
      ],
      answer: "Enforces stricter parsing and error handling",
      yourAns: undefined,
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        "Math.round(7.25)",
        "round(7.25)",
        "Math.rnd(7.25)",
        "Math.floor(7.25)",
      ],
      answer: "Math.round(7.25)",
      yourAns: undefined,
    },
    {
      question: "Which operator is used to concatenate strings in JavaScript?",
      options: ["&", "+", "--", "%"],
      answer: "+",
      yourAns: undefined,
    },
    {
      question: "What is the result of the expression: '5' + 2?",
      options: ["7", "52", "5+2", "Error"],
      answer: "52",
      yourAns: undefined,
    },
    {
      question:
        "How do you access the last element of an array called myArray?",
      options: [
        "myArray[-1]",
        "myArray[len-1]",
        "myArray[last]",
        "myArray[myArray.length-1]",
      ],
      answer: "myArray[myArray.length-1]",
      yourAns: undefined,
    },
    {
      question:
        "What is the correct syntax for creating a function in JavaScript?",
      options: [
        "function: myFunction()",
        "func myFunction()",
        "function myFunction()",
        "def myFunction()",
      ],
      answer: "function myFunction()",
      yourAns: undefined,
    },
    {
      question: "How do you declare a variable in JavaScript?",
      options: [
        "v myVar;",
        "var myVar;",
        "variable myVar;",
        "myVar = variable;",
      ],
      answer: "var myVar;",
      yourAns: undefined,
    },
    {
      question: "What will the following code output: console.log(2 + '2')?",
      options: ["22", "4", "NaN", "TypeError"],
      answer: "22",
      yourAns: undefined,
    },
    {
      question:
        "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["let", "static", "var", "const"],
      answer: "const",
      yourAns: undefined,
    },
    {
      question: "How do you check if a variable is an array in JavaScript?",
      options: [
        "isArray(myVar)",
        "myVar.isArray()",
        'myVar.typeOf === "array"',
        'typeof myVar === "array"',
      ],
      answer: "Array.isArray(myVar)",
      yourAns: undefined,
    },
    {
      question: "What does the 'use strict' directive do in JavaScript?",
      options: [
        "Enforces stricter parsing and error handling",
        "Defines a strict subset of JavaScript",
        "Disables certain features in JavaScript",
        "Allows you to use strict mode in functions",
      ],
      answer: "Enforces stricter parsing and error handling",
      yourAns: undefined,
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        "Math.round(7.25)",
        "round(7.25)",
        "Math.rnd(7.25)",
        "Math.floor(7.25)",
      ],
      answer: "Math.round(7.25)",
      yourAns: undefined,
    },
    {
      question: "Which operator is used to concatenate strings in JavaScript?",
      options: ["&", "+", "--", "%"],
      answer: "+",
      yourAns: undefined,
    },
    {
      question: "What is the result of the expression: '5' + 2?",
      options: ["7", "52", "5+2", "Error"],
      answer: "52",
      yourAns: undefined,
    },
    {
      question:
        "How do you access the last element of an array called myArray?",
      options: [
        "myArray[-1]",
        "myArray[len-1]",
        "myArray[last]",
        "myArray[myArray.length-1]",
      ],
      answer: "myArray[myArray.length-1]",
      yourAns: undefined,
    },
  ];

  const pageRefs = useRef([]);

  const [pages, setPages] = useState([]);

  const firstContainer = useRef(null);
  const secondContainer = useRef(null);
  const thirdContainer = useRef(null);
  const fourthContainer = useRef(null);
  const fifthContainer = useRef(null);
  const sixthContainer = useRef(null);
  const [firstPageData, setFirstPageData] = useState([]);
  const [secondPageData, setSecondPageData] = useState([]);
  const [thirdPageData, setThirdPageData] = useState([]);
  const [fourthPageData, setFourthPageData] = useState([]);
  const [fifthPageData, setFifthPageData] = useState([]);
  const [sixthPageData, setSixthPageData] = useState([]);
  {
    /**
  useEffect(() => {
    const splitContent = () => {
      const pageHeight = 567;
      const pageWidth = 595;
      const pages = [];
      const tempDiv = document.createElement("div");

      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.width = `${pageWidth}px`;
      document.body.appendChild(tempDiv);

      let currentPageContent = "";

      data.forEach((item, index) => {
        let questionBlock = `<p><span className="">Question ${
          index + 1
        }:</span> ${item.question}</p>`;
        questionBlock += `<p><strong>Correct Answer:</strong> ${item.answer}</p>`;
        questionBlock += `<p><strong>Your Answer:</strong> ${item.yourAns}</p>`;
        tempDiv.innerHTML = currentPageContent + questionBlock;

        if (tempDiv.clientHeight > pageHeight) {
          pages.push(currentPageContent);
          currentPageContent = questionBlock;
        } else {
          currentPageContent += questionBlock;
        }

        if (index === data.length - 1 && currentPageContent) {
          pages.push(currentPageContent);
        }
      });

      document.body.removeChild(tempDiv);
      setPages(pages);
    };

    splitContent();
  }, [data]);
 */
  }

  useEffect(() => {
    const splitContent = () => {
      const pageHeight = 567;
      const pageWidth = 595;
      const pages = {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh: "",
      }; // Object to store content for each page
      const tempDiv = document.createElement("div");

      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.width = `${pageWidth}px`;
      document.body.appendChild(tempDiv);

      let currentPage = "first"; // Initial page
      let currentPageContent = "";

      data.forEach((item, index) => {
        let questionBlock = `<p><span className="">Question ${
          index + 1
        }:</span> ${item.question}</p>`;
        questionBlock += `<p><strong>Correct Answer:</strong> ${item.answer}</p>`;
        questionBlock += `<p><strong>Your Answer:</strong> ${item.yourAns}</p>`;

        tempDiv.innerHTML = currentPageContent + questionBlock;

        if (tempDiv.clientHeight > pageHeight) {
          // If content exceeds page height, switch to next page
          pages[currentPage] = currentPageContent; // Store current page content
          if (currentPage === "first") currentPage = "second";
          else if (currentPage === "second") currentPage = "third";
          currentPageContent = questionBlock; // Start new page content
        } else {
          currentPageContent += questionBlock;
        }

        // Store last page content after loop ends
        if (index === data.length - 1) {
          pages[currentPage] = currentPageContent;
        }
      });

      document.body.removeChild(tempDiv);
      setPages(pages);
    };

    splitContent();
  }, [data]);

  console.log("data", pages);

  return (
    <div className="flex flex-col h-[842px] w-[595px] ">
      <div className="flex flex-col p-[34px] gap-[20px] items-center ">
        <div className="flex flex-row items-center justify-between py-[6px] px-[16px] bg-[#06A9EF] rounded-[32px] w-full">
          <div className="flex flex-row items-center gap-[16px]">
            <div className="text-[12px] text-[#FFFFFF] font-Montserrat font-[600] ">
              Skill Assessment- Figma (Advanced)
            </div>
          </div>
          <div className="font-[600] text-[12px] font-Montserrat leading-[14px] text-[#FFFFFF]">
            Score : 80%
          </div>
        </div>

        {/** {pages.map((content, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-[595px] h-[700px] border"
          >
            <div
              className="flex flex-col w-full h-full p-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ))} */}
        {pages && (
          <div className="flex flex-col items-center w-[595px] h-[700px]">
            {pages?.first}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPdf;
