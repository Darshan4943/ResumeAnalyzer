import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Index() {
  const [resume, setResume] = useState();
  console.log(resume);
  const userDataGlobal = useSelector((state) => state.userData);
  console.log(9, userDataGlobal);
  useEffect(() => {
    axios
      .get("https://jamblix.com/api/resume/" + userDataGlobal._id)
      .then((res) => {
        const selectedResume = res.data.data.find(
          (resume) => resume._id === userDataGlobal.selectedResume
        );

        if (selectedResume) {
          setResume(selectedResume);
        } else {
          setResume();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  return <div>dff</div>;
}

export default Index;
