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
import { preboarding } from "@/utils/preboardArray";
import { headings } from "@/utils/preboardArray";
import Joined from "@/components/featured/employer/afterLogin/preBoarding/Joined";
import Declined from "@/components/featured/employer/afterLogin/preBoarding/Declined";
import { applicants } from "@/utils/preboardArray";
function Preboarding() {
  const btn = ["In Preboarding", "Joined", "Declined"];

  const router = useRouter();
  const query = router.query;

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

  const [preview, setPreview] = useState(false);
  const [activeOption, setActiveOption] = useState("In Preboarding");

  return (
    <>
      {!preview && (
        <div className="flex flex-col items-start gap-6 w-full  ">
          <div
            className="flex p-2 ml:p-4 gap-0 ml:gap-4 items-start w-[100%] rounded-2xl bg-[#fff]"
            style={{ boxShadow: "box-shadow: 0px -1px 0px 0px #D6DDEB inset" }}
          >
          
            <div className="flex flex-col cursor-pointer items-center gap-[2px] ml:gap-[7px] shadow-border">
              <p
                onClick={() => {
                  setActiveOption("In Preboarding");
                }}
                className={` ${
                  activeOption === "In Preboarding" ? "" : "text-[#646464]"
                } ml:text-[16px] text-[14px]   font-[600]`}
              >
                In Preboarding
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="89"
                height="4"
                viewBox="0 0 89 4"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                  fill={activeOption === "In Preboarding" ? "#06A9EF" : "white"}
                />
              </svg>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-[2px] ml:gap-[7px] shadow-border">
              <p
                onClick={() => {
                  setActiveOption("Joined");
                }}
                className={` ${activeOption === "Joined" ? "" : "text-[#646464]"
                  }  font-[600]`}
              >
                Joined
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="89"
                height="4"
                viewBox="0 0 89 4"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                  fill={activeOption === "Joined" ? "#06A9EF" : "white"}
                />
              </svg>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-[2px] ml:gap-[7px] shadow-border">
              <p
                onClick={() => {
                  setActiveOption("Declined");
                }}
                className={` ${activeOption === "Declined" ? "" : "text-[#646464]"
                  }  font-[600]`}
              >
                Declined
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="89"
                height="4"
                viewBox="0 0 89 4"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                  fill={activeOption === "Declined" ? "#06A9EF" : "white"}
                />
              </svg>
            </div>
          </div>

          {activeOption === "In Preboarding" && (
            <>
              <div className="flex items-center flex-row p-2 overflow-x-scroll w-full">
                {preboarding.map((e, index) => (
                  <>
                    <div
                      onClick={() => setToggle(index)}
                      key={index}
                      className={`flex p-[8px] min-w-[12rem]  justify-between   items-center rounded-[8px] ${toggle === index ? "bg-[#06A9EF] " : "bg-[#fff] "
                        }`}
                      style={{
                        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                      }}
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
            </>
          )}
          {activeOption === "Joined" && (
            <>
              <Joined setPreview={setPreview} />


            </>
          )}
          {activeOption === "Declined" &&
            <>
              <Declined setPreview={setPreview} />
            </>
          }
        </div>
      )}

      {preview && <ApplicantPreview setPreview={setPreview} />}
      {preview && <ApplicantPreview setPreview={setPreview} />}

     
    </>


  );
}

export default Preboarding;
