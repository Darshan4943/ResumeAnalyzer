import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Initial from "../../components/featured/employer/afterLogin/preBoarding/Initial";
import Documention from "../../components/featured/employer/afterLogin/preBoarding/Documention";
import Verification from "../../components/featured/employer/afterLogin/preBoarding/Verification";
import Offer from "../../components/featured/employer/afterLogin/preBoarding/Offer";
import Acceptance from "../../components/featured/employer/afterLogin/preBoarding/Acceptance";
import Hire from "../../components/featured/employer/afterLogin/preBoarding/Hire";
import Joined from "../../components/featured/employer/afterLogin/preBoarding/Joined";
import Declined from "../../components/featured/employer/afterLogin/preBoarding/Declined";
import ApplicantPreview from "../../components/featured/employer/afterLogin/preBoarding/ApplicantPreview";
import EditOfferTemplate from "../../components/featured/employer/afterLogin/preBoarding/EditOfferTemplate";
import { useSelector } from "react-redux";
import axios from "axios";
import { preboarding } from "../../utils/preboardArray";
import MiniLoader from "../../components/common/miniLoader";

function Preboarding() {
  const btn = ["In Preboarding", "Joined", "Declined"];
  const [editTemplate, setEditTemplate] = useState(false);
  const router = useRouter();
  const query = router.query;
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [toggle, setToggle] = useState(0);
  const [preview, setPreview] = useState(false);
  const [activeOption, setActiveOption] = useState("In Preboarding");
  const [id, setId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataState, setDataState] = useState({
    preboardings: [],
    error: null,
  });

  useEffect(() => {
    if (userDataGlobal && userDataGlobal?._id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:2000/api/job/getjobapplicantstatus/${id}`
        );
        setJobs(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
      }
    };

    if (id) {
      fetchJobs();
    }
  }, [id]);

  const fetchPreboardings = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:2000/api/getPreboardings/${id}`
      );

      setDataState({
        preboardings: response.data.data,
        error: null,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);

      console.log("Preboardings data:", response.data.data);
    } catch (err) {
      console.error("Error:", err);

      setDataState({
        preboardings: [],
        error: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <>
      {!editTemplate && (
        <>
          {!preview && (
            <div className="flex flex-col items-start gap-6 w-full  ">
              <div
                className="flex p-2 ml:p-4 gap-0 ml:gap-4 items-start w-[100%] rounded-2xl bg-[#fff]"
                style={{
                  boxShadow: "box-shadow: 0px -1px 0px 0px #D6DDEB inset",
                }}
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
                      fill={
                        activeOption === "In Preboarding" ? "#06A9EF" : "white"
                      }
                    />
                  </svg>
                </div>
                <div className="flex cursor-pointer flex-col items-center gap-[2px] ml:gap-[7px] shadow-border">
                  <p
                    onClick={() => {
                      setActiveOption("Joined");
                    }}
                    className={` ${
                      activeOption === "Joined" ? "" : "text-[#646464]"
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
                    className={` ${
                      activeOption === "Declined" ? "" : "text-[#646464]"
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
                          className={`flex p-[8px] min-w-[12rem]  justify-between   items-center rounded-[8px] ${
                            toggle === index ? "bg-[#06A9EF] " : "bg-[#fff] "
                          }`}
                          style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <p
                            className={`text-[14px] text-[#333] leading-[160%]  ${
                              toggle === index ? "text-white" : " "
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

                  {toggle === 0 && (
                    <>
                      {loading ? (
                        <div className=" justify-center items-center w-full">
                          <MiniLoader />
                        </div>
                      ) : (
                        <Initial
                          jobs={jobs}
                          fetchPreboardings={fetchPreboardings}
                          setToggle={setToggle}
                        />
                      )}
                    </>
                  )}

                  {toggle === 1 && (
                    <>
                      <Documention setToggle={setToggle} />
                    </>
                  )}

                  {toggle === 2 && (
                    <>
                      <Verification setToggle={setToggle} />
                    </>
                  )}

                  {toggle === 3 && (
                    <>
                      <Offer
                        setToggle={setToggle}
                        setEditTemplate={setEditTemplate}
                      />
                    </>
                  )}

                  {toggle === 4 && (
                    <>
                      <Acceptance setToggle={setToggle} />
                    </>
                  )}

                  {toggle === 5 && (
                    <>
                      <Hire setPreview={setPreview} setToggle={setToggle} />
                    </>
                  )}
                </>
              )}

              {activeOption === "Joined" && (
                <>
                  <Joined setPreview={setPreview} />
                </>
              )}
              {activeOption === "Declined" && (
                <>
                  <Declined setPreview={setPreview} />
                </>
              )}
            </div>
          )}
          {preview && <ApplicantPreview setPreview={setPreview} />}
        </>
      )}
      {editTemplate && <EditOfferTemplate setEditTemplate={setEditTemplate} />}
    </>
  );
}

export default Preboarding;
