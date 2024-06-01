import React, { useState } from "react";
import JobInfo from "./JobInfo";
import KeySkills from "./KeySkills";
import KeyResponsibilty from "./KeyResponsibilty";
import ExtraSection from "./ExtraSection";
import ExtraSectionForm from "./ExtraSectionForm";
import Requirements from "./Requirements";
import Benifits from "./Benifits";

const JdMatchingsideBar = ({ setExtractedData, extratctedData }) => {
  const [ShowForm, setShowForm] = useState(false);
  const [openExtraSection, setAddExtraSection] = useState(false);
  const [jdData, setJdData] = useState([]);
  const [isEdit, setIsEdit] = useState();
  const [editId, setEditId] = useState(null);

  return (
    <div className="h-screen flex flex-row justify-center gap-[8px] ">
      <div class="flex flex-col p-[24px] px-[16px] gap-[16px] bg-[#FFFFFF] overflow-y-scroll">
        <JobInfo
          jdData={jdData}
          setJdData={setJdData}
          extratctedData={extratctedData}
          setExtractedData={setExtractedData}
        />
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>
        <KeySkills
          extratctedData={extratctedData}
          setExtractedData={setExtractedData}
        />
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>

        <Requirements
          extratctedData={extratctedData}
          setExtractedData={setExtractedData}
        />
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>

        <Benifits
          extratctedData={extratctedData}
          setExtractedData={setExtractedData}
        />
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>
        <KeyResponsibilty
          ShowForm={ShowForm}
          setShowForm={setShowForm}
          extratctedData={extratctedData}
          setExtractedData={setExtractedData}
          setIsEdit={setIsEdit}
          setEditId={setEditId}
        />

        <div className="flex justify-end items-end gap-[10px] bg-[#FFFFF] w-[416px]">
          <div className="flex rounded-[24px] p-[4px] px-[12px] pl-[6px] border border-solid border-[#06A9EF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_5716_136351)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#333333"
                />
              </g>
            </svg>
            <p
              onClick={() => setAddExtraSection(true)}
              className="text-[16px] font-semibold text-[#333333] cursor-pointer"
              // disabled={!isChecked}
            >
              Add Section
            </p>
          </div>
        </div>
        {openExtraSection && (
          <>
            <ExtraSection  setAddExtraSection={setAddExtraSection}/>
          </>
        )}
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>
      </div>

      {ShowForm || isEdit ? (
        <div>
          <ExtraSectionForm
            extratctedData={extratctedData}
            setExtractedData={setExtractedData}
            isEdit={isEdit}
            setShowForm={setShowForm}
            editId={editId}
            setIsEdit={setIsEdit}
          />
        </div>
      ) : null}
    </div>
  );
};

export default JdMatchingsideBar;
