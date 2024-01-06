import { AddIcon } from "@/utils/svg";
import React, { useState } from "react";
import SampleWork from "./modals/SampleWork";

function Projects({ data }) {
  const [addSampleWork, setaddSampleWork] = useState(false);
  return (
    <>
      <div
        div
        className="bg-[#fff] rounded-[16px] p-[16px] flex flex-col gap-[16px]"
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <p className="page_headings flex justify-between w-full">
          Projects{" "}
          <div  onClick={() => setaddSampleWork(true)}>
            <AddIcon />
          </div>
        </p>
        {data?.map((SampleWark) => (
          <div className="essential_gap">
            <div className="gap">
              <p className="heading_first">{SampleWark.a}</p>
              <img
                style={{ width: "24px" }}
                src="./images/profile/edit.png"
                alt=""
              />
            </div>
            <p className="sec_head">{SampleWark.b}</p>
          </div>
        ))}
      </div>
      {addSampleWork && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <SampleWork setaddSampleWork={setaddSampleWork} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Projects;
