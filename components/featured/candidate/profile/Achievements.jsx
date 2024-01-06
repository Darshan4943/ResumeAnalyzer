import { AddIcon } from "@/utils/svg";
import React, { useState } from "react";
import HonorsAwards from "./modals/HonorsAwards";

const Achievements = ({ data }) => {
  const [addAchivements, setAddAchivements] = useState(false);
  return (
    <>
      <div className="build_ai ai2" style={{ gap: "16px" }}>
        <p className="page_headings flex justify-between w-full">
          Achievements{" "}
          <div onClick={() => setAddAchivements(true)}>
            <AddIcon />
          </div>
        </p>
        {data?.map((achive) => (
          <div className="essential_gap">
            <div className="gap">
              <p className="heading_first">{achive.a}</p>
              <img
                style={{ width: "24px" }}
                src="./images/profile/edit.png"
                alt=""
              />
            </div>

            <p className="sec_head">{achive.b}</p>
          </div>
        ))}
      </div>
      {addAchivements && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <HonorsAwards setAddAchivements={setAddAchivements} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Achievements;
