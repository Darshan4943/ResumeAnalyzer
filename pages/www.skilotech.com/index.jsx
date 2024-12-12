import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Index() {
  const [resume, setResume] = useState();

const {userDataGlobal,profileData} = useSelector((state) => state.user.userData);
 
  useEffect(() => {
    axios
      .get("http://localhost:2000/api/resume/" + userDataGlobal._id)
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
