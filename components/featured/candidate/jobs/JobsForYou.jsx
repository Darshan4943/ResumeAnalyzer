import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NormalJobCard from "./NormalJobCard";

function JobsForYou({ isRelevant, isSimilar, jobData }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [userSkills, setUserSkills] = useState();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  console.log(isRelevant, isSimilar);
  useEffect(() => {
    if (profileData?.skills) {
      setUserSkills(profileData.skills.map((item) => item.value));
    }
    if (profileData?.totalExperience) {
      setExperience(profileData?.totalExperience?.years);
    }
  }, [profileData]);

  useEffect(() => {
    if (userDataGlobal?.country) {
      setCountry(userDataGlobal?.country);
    } else {
      setCountry(localStorage.getItem("country", country));
    }
  }, []);

  const getAllData = async () => {
    try {
      const res = await axios.post(
        "https://jamblix.com/api/job/getAll",
        {
          requiredSkills:
            isRelevant || isSimilar ? jobData?.mustSkills : "",
          jobTitle: isSimilar ? jobData?.jobTitle : "",
          country: country,
          location: "",
          experience: isSimilar ? "" : "",
          isExperinceNo: true,
        },
        {
          params: { page, limit },

        }
      );

      setJobsData(res.data.filteredJobs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllData();
  }, [country, userSkills]);

  return (
    <div
      className={`flex flex-col  ${isRelevant ? "" : isSimilar ? "gap-3" : "gap-5"
        }`}
      style={{
        ...(isRelevant ? {} : { boxShadow: "0px 0px 14px 0px #00000005" }),
      }}
    >
      {jobsData?.map((item, index) => (
        <div
          key={index}
          className={`${isRelevant
              ? index !== jobsData.length - 1 && "border-b"
              : "border rounded-[12px]"
            } border-[#D2D2D2]  w-full`}
        >
          <NormalJobCard item={item} />
        </div>
      ))}
    </div>
  );
}

export default JobsForYou;
