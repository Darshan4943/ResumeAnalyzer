import React, { useState } from "react";
import JobInfo from "./JobInfo";
import KeySkills from "./KeySkills";
import KeyResponsibilty from "./KeyResponsibilty";
import ExtraSection from "./ExtraSection";
import ExtraSectionForm from "./ExtraSectionForm";
import Requirements from "./Requirements";
import Benifits from "./Benifits";

const JdMatchingsideBar = ({
  setExtractedData,
  extratctedData,
  loadingg,
  setLoadingg,
  MatchJob,
  text,
  settext,
  setShowsideBar,
}) => {
  const [ShowForm, setShowForm] = useState(false);
  const [openExtraSection, setAddExtraSection] = useState(false);
  const [jdData, setJdData] = useState([]);
  const [isEdit, setIsEdit] = useState();
  const [editId, setEditId] = useState(null);
  const [isExtraData, setIsExtraData] = useState(false);

  return (
    <div className="h-screen flex flex-row justify-center gap-[8px]  ">
      <div class="flex flex-col p-[24px] px-[16px] gap-[16px] bg-[#FFFFFF] overflow-y-scroll relative">
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
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>

        {isExtraData && (
          <>
            {extratctedData.extra_section && (
              <div className="flex flex-col gap-[16px] w-[416px]">
                <h3 className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
                  Extra Section
                </h3>
                <div className="flex flex-col gap-[4px]">
                  {Object.entries(extratctedData.extra_section).map(
                    ([key, value], index) => (
                      <>
                        <div
                          key={index}
                          className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold"
                        >
                          {key} {":"}
                        </div>
                        <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                          {value.join(", ")}
                        </p>
                        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>
                      </>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}

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
            <ExtraSection
              setAddExtraSection={setAddExtraSection}
              extratctedData={extratctedData}
              setExtractedData={setExtractedData}
              setIsExtraData={setIsExtraData}
            />
          </>
        )}
        <div className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"></div>

        <div className="flex ">
          <button
            className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] "
            style={{ opacity: loadingg || text.length < 100 ? 0.5 : 1 }}
            disabled={loadingg || text.length < 100}
            onClick={() => {
              MatchJob();
              setShowsideBar(false);
              // window.scrollTo(0, 0);
            }}
          >
            {loadingg ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4  text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <div className="flex gap-[8px] justify-center">
                Fetch Finding{" "}
                <img
                  src="/images/icons/person_search.png"
                  className="h-[24px] w-[24px]"
                  alt=""
                />{" "}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Rest of your components */}
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
