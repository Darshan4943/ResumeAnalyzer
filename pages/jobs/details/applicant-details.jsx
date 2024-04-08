import React, { useEffect, useState } from "react";
import { LeftArow } from "../../../utils/svg";
import { useRouter } from "next/router";
import axios from "axios";

import {
  daysCalculator,
  selectResumeTemplate,
} from "../../../utils/middleware";
import { Document, PDFViewer } from "@react-pdf/renderer";
import Fonts from "../../../public/fonts/fonts";
import MiniLoader from "../../../components/common/miniLoader";
<Fonts />;
const ApplicantDetails = () => {
  const router = useRouter();

  const query = router.query;
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jobPost, setJobPost] = useState(null);
  const [application, setApplication] = useState({});
  const getData = () => {
    setLoading(true);
    axios
      .get("https://freedygoservices.in/api/job/getById/" + query["job-post"])
      .then((res) => {
        setLoading(false);
        setJobPost(res.data.data);
        setApplication(
          res.data.applications.find((item) => item.resumeId == query.applicant)
        );
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [router]);

  const MyDocument = ({
    resumeTemplateIndex,
    application,
    selectedColor,
    selectedFont,
  }) => (
    <Document>
      {selectResumeTemplate(
        resumeTemplateIndex,
        application,
        selectedColor,
        selectedFont,
        true
      )}
    </Document>
  );
  return (
    <div
      className="min-h-[90vh] my-[16px] rounded-[16px] customMargins  "

    >
      {loading ? (
        <div className="flex items-center justify-center h-[70vh] ">
          <MiniLoader />
        </div>
      ) : (
        <div className="rounded-[16px] min-h-[90vh]  sm:p-[24px] p-2 flex flex-col gap-[24px]" style={{ boxShadow: " 0px 1px 2px 0px #00000040" }}>
          <div className="flex items-center gap-[8px] ">
            <div className=" cursor-pointer" onClick={() => router.back()}>
              <LeftArow />
            </div>
            <div className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] sm:header header1 w-[50%] min-w-[250px]">
              Applicant Details
            </div>
          </div>
          <div className="flex ml:flex-row flex-col gap-4 justify-between ">
            <div className="flex flex-col ml:w-[38%] w-full gap-[16px]">
              <div className="flex flex-row gap-[16px]">
                <img
                  src={
                    application.profilePhoto
                      ? application.profilePhoto
                      : "/images/services/profile.png"
                  }
                  alt="img"
                  className="h-[96px] w-[96px] object-contain rounded-[50%]"
                />
                <div className="flex flex-col gap-[8px] justify-center">
                  <span className="text-[18px] text-[#333333] font-medium">
                    {application?.firstName + " " + application?.lastName}
                  </span>
                  <span className="text-[16px] text-[#333333] font-normal">
                    {application?.designation}
                  </span>
                </div>
              </div>
              <div className="bg-[#EFFAFF] p-[16px] flex flex-col gap-[8px] ">
                <div className="flex w-full justify-between border-b-[1px] border-[#D6DDEB] pb-[8px]">
                  <span className="text-[16px] text-[#333333] font-medium">
                    Applied Job
                  </span>
                  <span className="text-[16px] text-[#333333] font-medium">
                    {daysCalculator(application?.appliedOn)}
                  </span>
                </div>
                <div className="flex flex-col w-full gap-[8px] ">
                  <span className="text-[16px] text-[#333333] font-normal">
                    {jobPost?.jobTitle}
                  </span>
                  <div className="flex flex-row gap-[8px]">
                    <div className="text-[14px] text-[#333333] font-normal border-r-[1px] pr-2 border-[#D6DDEB]">
                      {jobPost?.companyName}
                    </div>
                    <span className="text-[14px] text-[#333333] font-normal">
                      {jobPost?.location?.join(" , ")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <span className="text-[16px] text-[#333333] font-medium">
                  Contact
                </span>
                <div className="flex flex-row gap-[8px] items-center">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.3077 15.5C1.80257 15.5 1.375 15.325 1.025 14.975C0.675 14.625 0.5 14.1974 0.5 13.6923V2.3077C0.5 1.80257 0.675 1.375 1.025 1.025C1.375 0.675 1.80257 0.5 2.3077 0.5H17.6923C18.1974 0.5 18.625 0.675 18.975 1.025C19.325 1.375 19.5 1.80257 19.5 2.3077V13.6923C19.5 14.1974 19.325 14.625 18.975 14.975C18.625 15.325 18.1974 15.5 17.6923 15.5H2.3077ZM9.99998 8.55763L1.99998 3.44225V13.6923C1.99998 13.782 2.02883 13.8557 2.08653 13.9134C2.14423 13.9711 2.21795 14 2.3077 14H17.6923C17.782 14 17.8557 13.9711 17.9134 13.9134C17.9711 13.8557 18 13.782 18 13.6923V3.44225L9.99998 8.55763ZM9.99998 6.99998L17.8461 1.99998H2.15383L9.99998 6.99998ZM1.99998 3.44225V1.99998V13.6923C1.99998 13.782 2.02883 13.8557 2.08653 13.9134C2.14423 13.9711 2.21795 14 2.3077 14H1.99998V3.44225Z"
                      fill="#06A9EF"
                    />
                  </svg>
                  <span className="text-[14px] text-[#333333] font-normal">
                    {application?.email}
                  </span>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4403 17.5C14.5557 17.5 12.6625 17.0618 10.7606 16.1855C8.85863 15.3092 7.11121 14.073 5.51828 12.4769C3.92533 10.8807 2.69071 9.1333 1.81442 7.2346C0.938142 5.33588 0.5 3.44423 0.5 1.55963C0.5 1.25688 0.6 1.00458 0.8 0.802751C1 0.600918 1.25 0.5 1.55 0.5H4.8115C5.06407 0.5 5.28683 0.582375 5.47977 0.747125C5.67272 0.911875 5.79548 1.1154 5.84803 1.3577L6.4211 4.29998C6.46085 4.57306 6.45252 4.80768 6.3961 5.00383C6.3397 5.19998 6.23842 5.36472 6.09225 5.49805L3.78265 7.74613C4.15445 8.42689 4.57913 9.0708 5.0567 9.67785C5.53427 10.2849 6.05125 10.8647 6.60765 11.4173C7.15638 11.966 7.73973 12.4756 8.35768 12.9462C8.97563 13.4167 9.64293 13.8545 10.3596 14.2596L12.6038 11.9962C12.7602 11.8333 12.9497 11.7192 13.1721 11.6539C13.3945 11.5885 13.6256 11.5724 13.8654 11.6058L16.6423 12.1712C16.8948 12.2378 17.1009 12.3667 17.2605 12.5577C17.4201 12.7487 17.5 12.9654 17.5 13.2077V16.45C17.5 16.75 17.399 17 17.1972 17.2C16.9954 17.4 16.7431 17.5 16.4403 17.5ZM3.07305 6.32693L4.85768 4.61923C4.88973 4.59358 4.91056 4.55832 4.92018 4.51345C4.92979 4.46857 4.92819 4.4269 4.91538 4.38845L4.48075 2.15383C4.46793 2.10254 4.4455 2.06408 4.41345 2.03845C4.3814 2.0128 4.33973 1.99998 4.28845 1.99998H2.14997C2.11152 1.99998 2.07948 2.0128 2.05383 2.03845C2.02818 2.06408 2.01535 2.09613 2.01535 2.1346C2.06663 2.81793 2.17849 3.51217 2.35092 4.2173C2.52337 4.92243 2.76408 5.62564 3.07305 6.32693ZM11.773 14.9692C12.4359 15.2782 13.1272 15.5144 13.8471 15.6779C14.567 15.8413 15.2397 15.9384 15.8654 15.9692C15.9038 15.9692 15.9359 15.9564 15.9615 15.9308C15.9872 15.9051 16 15.873 16 15.8346V13.7308C16 13.6795 15.9872 13.6378 15.9615 13.6057C15.9359 13.5737 15.8974 13.5512 15.8461 13.5384L13.7461 13.1115C13.7077 13.0987 13.674 13.0971 13.6452 13.1067C13.6163 13.1163 13.5859 13.1372 13.5538 13.1692L11.773 14.9692Z"
                      fill="#06A9EF"
                    />
                  </svg>

                  <span className="text-[14px] text-[#333333] font-normal">
                    {application?.mobileNumber}
                  </span>
                </div>
                <div className="flex flex-row gap-[8px] items-top ">
                  <svg
                    width="20"
                    height="28"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00092 9.86535C8.4985 9.86535 8.9239 9.68818 9.2771 9.33385C9.6303 8.97952 9.8069 8.55356 9.8069 8.05598C9.8069 7.55839 9.62973 7.133 9.2754 6.7798C8.92106 6.4266 8.4951 6.25 7.99752 6.25C7.49994 6.25 7.07455 6.42717 6.72135 6.7815C6.36815 7.13583 6.19155 7.56179 6.19155 8.05938C6.19155 8.55696 6.36871 8.98235 6.72305 9.33555C7.07738 9.68875 7.50334 9.86535 8.00092 9.86535ZM7.99922 17.5135C9.95562 15.7622 11.4527 14.0824 12.4906 12.474C13.5284 10.8657 14.0473 9.45703 14.0473 8.24805C14.0473 6.42498 13.4681 4.92627 12.3098 3.7519C11.1515 2.57753 9.71461 1.99035 7.99922 1.99035C6.28384 1.99035 4.84698 2.57753 3.68865 3.7519C2.53031 4.92627 1.95115 6.42498 1.95115 8.24805C1.95115 9.45703 2.47006 10.8657 3.50787 12.474C4.54571 14.0824 6.04282 15.7622 7.99922 17.5135ZM7.99922 19.5096C5.48257 17.3288 3.5954 15.2993 2.3377 13.4211C1.08001 11.5429 0.451172 9.81857 0.451172 8.24805C0.451172 5.94038 1.19765 4.07213 2.6906 2.64328C4.18353 1.21443 5.95307 0.5 7.99922 0.5C10.0454 0.5 11.8149 1.21443 13.3078 2.64328C14.8008 4.07213 15.5473 5.94038 15.5473 8.24805C15.5473 9.81857 14.9184 11.5429 13.6607 13.4211C12.403 15.2993 10.5159 17.3288 7.99922 19.5096Z"
                      fill="#06A9EF"
                    />
                  </svg>

                  <span className="text-[14px] text-[#333333] font-normal">
                    {application?.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#D6DDEB] w-full h-[1px] mobile"> </div>

            <div className="flex flex-col ml:w-[58%] w-full">
              <div
                className="flex flex-row gap-[40px] ml:px-[24px]"
                style={{ borderBottom: "1px solid #bebebe" }}
              >
                <div
                  className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
                  onClick={() => setTab(0)}
                  style={{
                    borderBottom: `4px solid ${tab == 0 ? "#06A9EF" : "white"}`,
                  }}
                >
                  Applicant Profile
                </div>
                <div
                  className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
                  onClick={() => setTab(1)}
                  style={{
                    borderBottom: `4px solid ${tab == 1 ? "#06A9EF" : "white"}`,
                  }}
                >
                  Resume
                </div>
              </div>
              {tab == 0 && (
                <div className="flex flex-col ml:p-[24px] py-4 gap-[16px]">
                  <div className="flex flex-col gap-[16px] border-b-[1px] border-[#D6DDEB] pb-[16px]">
                    <span className="text-[16px] text-[#333333] font-semibold">
                      Personal Info
                    </span>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[16px] text-[#333333] font-medium">
                        Full Name
                      </span>
                      <span className="text-[14px] text-[#333333] font-normal">
                        {application?.firstName + " " + application?.lastName}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[16px] text-[#333333] font-medium">
                        Address
                      </span>
                      <span className="text-[14px] text-[#333333] font-normal">
                        {application?.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] pb-[16px]">
                    <span className="text-[16px] text-[#333333] font-semibold">
                      Professional Info
                    </span>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[16px] text-[#333333] font-medium">
                        About Me
                      </span>
                      <span className="text-[14px] text-[#333333] font-normal">
                        {application?.summery}
                      </span>
                    </div>
                    <div className="flex ms:flex-row flex-col gap-[16px]">
                      <div className="ms:w-[30%] w-full flex flex-col gap-[16px] ">
                        <div className="flex flex-col">
                          <span className="text-[16px] text-[#333333] font-medium">
                            Current Job
                          </span>
                          <span className="text-[14px] text-[#333333] font-normal">
                            {application?.experience &&
                              application?.experience[0]?.designation}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[16px] text-[#333333] font-medium">
                            Highest Qualification
                          </span>
                          <span className="text-[14px] text-[#333333] font-normal">
                            {application?.education &&
                              application?.education[0]?.qualification}
                          </span>
                        </div>
                      </div>
                      <div className="ms:w-[70%] w-full flex flex-col gap-[16px] ">
                        <span className="text-[16px] text-[#333333] font-medium">
                          Skills
                        </span>
                        <div className="flex flex-row flex-wrap gap-[12px]">
                          {application?.skills?.map((item, index) => (
                            <div
                              key={index}
                              className="text-[14px] text-[#333333] text-medium py-[8px] rounded-[25px] px-[16px] border border-[#06A9EF]"
                            >
                              {item.skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tab == 1 && application && (
                <div className="w-full mt-2  bg-[#525659] h-full flex items-center justify-center py-[16px]">
                  <PDFViewer width="80%" height="900px" showToolbar={false}>
                    <MyDocument
                      resumeTemplateIndex={application.resumeTemplateIndex}
                      application={application}
                      selectedColor={application.selectedColor}
                      selectedFont={application.selectedFont}
                    />
                  </PDFViewer>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetails;
