import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyCollection = () => {
  const userDataGlobal = useSelector((state) => state.userData);
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        setResumeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);
  console.log(resumeList);

  return <div className="customMargins py-6 min-h-[80vh] ">my collection</div>;
};

export default MyCollection;
