// import Initial from "@/components/featured/employer/afterLogin/preBoarding/Initial";
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

function Preboarding() {
  const btn = ["In Preboarding", "Joined", "Declined"];
  const [editTemplate, setEditTemplate] = useState(false);
  const router = useRouter();
  const query = router.query;
  const { userDataGlobal } = useSelector((state) => state.user.userData);

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
  const [id, setId] = useState("");

  useEffect(() => {
    if (userDataGlobal && userDataGlobal._id) {
      setId(userDataGlobal._id);
    }
  }, [userDataGlobal]);

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/job/getJobById/${id}`
        );
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
      }
    };

    if (id) {
      fetchJobs();
    }
  }, [id]);
  
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
                  {toggle === 0 && (
                    <>
                      <Initial jobs={jobs} setToggle={setToggle} />
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
