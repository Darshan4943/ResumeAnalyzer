import Initial from "@/components/featured/employer/afterLogin/preBoarding/Initial";
import React, { useState } from "react";
import { TablePagination } from "@mui/material";
import { useRouter } from "next/router";
import Documention from "@/components/featured/employer/afterLogin/preBoarding/Documention";
import Verification from "@/components/featured/employer/afterLogin/preBoarding/Verification";
import Offer from "@/components/featured/employer/afterLogin/preBoarding/Offer";
import Acceptance from "@/components/featured/employer/afterLogin/preBoarding/Acceptance";
import Hire from "@/components/featured/employer/afterLogin/preBoarding/Hire";
import ApplicantDetails from "@/components/featured/employer/ApplicantDetails";
import ApplicantPreview from "@/components/featured/employer/afterLogin/preBoarding/ApplicantPreview";

function Preboarding() {
  const btn = ["In Preboarding", "Joined", "Declined"];

  const router = useRouter();
  const query = router.query;

  const headings = [
    {
      heading: "Job Role",
      options: ["Assistant Manager", "Option 2", "Option 3"],
    },
    {
      heading: "Due Date",
      options: ["Mumbai", "Pune", "Banglore"],
    },
    {
      heading: "Recruiter",
      options: ["Pending", "Approved"],
    },
    {
      heading: "Preboarding status",
      options: ["Yes", "No"],
    },
  ];

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [toggle, setToggle] = useState(0);

  const preboarding = [
    {
      name: "Initial",
      num: "2",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Documentation",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Verification",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Release Offer",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Offer Acceptance",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Hired",
      num: "10",
      line: "",
    },
  ];
  const [preview, setPreview] = useState(false)
  return (
    <>
      {!preview && (
        <div className="flex flex-col items-start gap-6 w-full  ">
          <div
            className="flex p-4 gap-4 items-start w-[100%] rounded-2xl bg-[#fff]"
            style={{ boxShadow: "box-shadow: 0px -1px 0px 0px #D6DDEB inset" }}
          >
            <div className="flex items-start md:gap-10 gap-6">
              {btn.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center md:gap-[7px]"
                >
                  <p className="md:text-[16px] text-[12px] text-[#333] font-Montserrat font-semibold">
                    {item}
                  </p>
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="109"
                  height="4"
                  viewBox="0 0 109 4"
                  fill="none"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H105C107.209 0 109 1.79086 109 4H0Z"
                    fill="#06A9EF"
                  />
                </svg> */}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center flex-row p-2 overflow-x-scroll w-full">
            {preboarding.map((e, index) => (
              <>
                <div
                  onClick={() => setToggle(index)}
                  key={index}
                  className={`flex p-[8px] min-w-[12rem]  justify-between   items-center rounded-[8px] ${toggle === index ? "bg-[#06A9EF] " : "bg-[#fff] "
                    }`}
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                >
                  <p
                    className={`text-[14px] text-[#333] leading-[160%]  ${toggle === index ? "text-white" : " "
                      }`}
                  >
                    {e.name}
                  </p>
                  <div className=" flex ">
                    <p className="bg-[#E9EBFD]  p-1 rounded-[8px] w-[30px] flex justify-center items-center">
                      {e.num}
                    </p>
                  </div>
                </div>
                <div>{e.line}</div>
              </>
            ))}
          </div>

          {/* INITIAL 1ST PAGE  */}

          {toggle === 0 && (

            <>

              <Initial />



            </>
          )}

          {/* DOCUMENTATION PAGE  */}

          {toggle === 1 && (
            <>


              <Documention />

            </>
          )}

          {/* VERIFICATION PAGE  */}

          {toggle === 2 && (
            <>

              <Verification />
            </>
          )}

          {/* OFFER PAGE  */}
          {toggle === 3 && (
            <>

              <Offer />
            </>
          )}

          {/* Offer Acceptance PAGE  */}

          {toggle === 4 && (
            <>

              <Acceptance />
            </>
          )}

          {/* HIRED */}

          {toggle === 5 && (
            <>

              <Hire setPreview={setPreview} />
            </>
          )}
        </div>
      )}

      {preview && <ApplicantPreview setPreview={setPreview} />}
    </>
  );
}

export default Preboarding;
