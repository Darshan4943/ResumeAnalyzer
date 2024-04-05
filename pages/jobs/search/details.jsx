import React, { useEffect, useState } from "react";

import {
  convertBytes,
  dateSeter,
  fileIconSeter,
} from "../../../utils/middleware";
import Progress_bar from "../../../components/featured/jobMatching/ProgressBar";
import CloseIcon, { ClosedIcon } from "../../../utils/svg";
import { useSelector } from "react-redux";
import axios from "axios";

const Details = ({ data, setJd, files, extractedData, resume }) => {
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [isApplied, setIsApplied] = useState(true);
  const getData = () => {
    setLoading(true);
    axios
      .get("http://localhost:2000/api/job/getById/" + data._id)
      .then((res) => {
        setLoading(false);
        setIsApplied(
          res.data.applications.find(
            (item) => item.applicantId == userDataGlobal._id
          )
        );
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [data]);
  const applyForJob = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:2000/api/job/apply/" + data._id, {
        userId: userDataGlobal._id,
        resumeId: resume._id,
        percentage: data.percentage,
      })
      .then((res) => {
        setLoading(false);
        getData();
        toast.success("Application Sent Successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center    px-4 py-4 ">
        <div className=" absolute bg-white rounded-lg   shadow-lg min-h-[500px] max-h-[80vh] overflow-x-auto  items-end ml:w-[50vw] sm:w-[70%] w-[90%] flex flex-col gap-[8px]">
          <div className="relative w-full p-4 h-[80vh]">
            <div className="flex flex-col gap-[4px]  w-full  sticky top-0 bg-white z-10  py-[8px]">
              <div className="flex gap-[4px] w-full justify-between">
                <span className=" text-[16px] font-semibold ">
                  Title : {data?.jobTitle}
                </span>
                <div
                  className="  cursor-pointer translate-y-[-10px]"
                  onClick={() => setJd(null)}
                >
                  <ClosedIcon size={36} />
                </div>
              </div>
              <div className="flex gap-[12px] items-center ">
                <span
                  className="text-[14px] font-500"
                  style={{
                    borderRight: "1px solid #bebebe",
                    paddingRight: "8px",
                  }}
                >
                  {data?.companyName}
                </span>
                <span className="text-[14px] font-500">
                  {data?.location?.join(", ")}
                </span>
              </div>

              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-[8px] mt-2  ">
                  <span className="text-[14px] font-500">
                    Apply Before : {dateSeter(data?.deadLine)}
                  </span>
                  <span className="text-[14px] font-500">
                    Job Posted On : {dateSeter(data?.createdAt)}
                  </span>
                </div>
                <button
                  className="px-[16px] py-[8px] w-[112px] bg-[#06A9EF] mt-2 rounded-[8px] text-[#fff]"
                  onClick={() => applyForJob(data)}
                  disabled={isApplied}
                  style={{ opacity: isApplied ? 0.6 : 1 }}
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4  text-white animate-spin"
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
                    <> {isApplied ? "Applied" : "Apply"}</>
                  )}
                </button>
              </div>
              <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
            </div>

            <div className="w-full flex flex-row justify-between mt-6 h-[71%]  ">
              <div
                className="flex flex-col gap-[24px]   w-[49%]  h-[100%] overflow-auto"
                style={{
                  paddingRight: "12px",
                  borderRight: "1px solid #bebebe",
                }}
              >
                <div className="flex flex-col gap-[8px] sticky top-0 bg-white z-10 pb-[8px]">
                  <div className="flex flex-row gap-2 items-center ">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.16599 6.74355C6.36393 6.74355 5.6773 6.45797 5.10612 5.8868C4.53494 5.31562 4.24935 4.62899 4.24935 3.82692C4.24935 3.02484 4.53494 2.33822 5.10612 1.76705C5.6773 1.19587 6.36393 0.910278 7.16599 0.910278C7.96806 0.910278 8.65469 1.19587 9.22587 1.76705C9.79705 2.33822 10.0826 3.02484 10.0826 3.82692C10.0826 4.62899 9.79705 5.31562 9.22587 5.8868C8.65469 6.45797 7.96806 6.74355 7.16599 6.74355ZM7.16599 5.49359C7.62433 5.49359 8.01669 5.3304 8.34308 5.00401C8.66947 4.67762 8.83266 4.28526 8.83266 3.82692C8.83266 3.36859 8.66947 2.97623 8.34308 2.64984C8.01669 2.32345 7.62433 2.16026 7.16599 2.16026C6.70766 2.16026 6.3153 2.32345 5.98891 2.64984C5.66252 2.97623 5.49933 3.36859 5.49933 3.82692C5.49933 4.28526 5.66252 4.67762 5.98891 5.00401C6.3153 5.3304 6.70766 5.49359 7.16599 5.49359ZM16.0474 15.9262L13.6051 13.4839C13.3241 13.6613 13.0276 13.8002 12.7157 13.9006C12.4037 14.001 12.0821 14.0512 11.751 14.0512C10.8311 14.0512 10.0506 13.7301 9.4096 13.0878C8.76859 12.4455 8.44808 11.6656 8.44808 10.7481C8.44808 9.83056 8.76922 9.05129 9.4115 8.41026C10.0538 7.76924 10.8337 7.44874 11.7512 7.44874C12.6688 7.44874 13.448 7.7697 14.0891 8.41161C14.7301 9.05352 15.0506 9.83297 15.0506 10.75C15.0506 11.0823 15.0004 11.4044 14.8999 11.7163C14.7995 12.0283 14.6606 12.3248 14.4833 12.6057L16.9256 15.048L16.0474 15.9262ZM11.7493 12.8013C12.3273 12.8013 12.8137 12.6039 13.2085 12.2091C13.6032 11.8143 13.8006 11.328 13.8006 10.75C13.8006 10.172 13.6032 9.68563 13.2085 9.29086C12.8137 8.8961 12.3273 8.69872 11.7493 8.69872C11.1713 8.69872 10.685 8.8961 10.2902 9.29086C9.89544 9.68563 9.69806 10.172 9.69806 10.75C9.69806 11.328 9.89544 11.8143 10.2902 12.2091C10.685 12.6039 11.1713 12.8013 11.7493 12.8013ZM0.916016 13.0897V11.25C0.916016 10.8365 1.02472 10.4565 1.24214 10.1098C1.45956 9.76308 1.7579 9.49359 2.13716 9.30128C2.79208 8.97222 3.58134 8.68002 4.50495 8.42467C5.42856 8.16934 6.44005 8.06304 7.53941 8.10578C7.41548 8.30235 7.3079 8.50475 7.21668 8.71299C7.12546 8.92122 7.05302 9.13708 6.99937 9.36055C6.0859 9.37123 5.2547 9.49222 4.50577 9.72353C3.75682 9.95483 3.1628 10.1859 2.7237 10.4166C2.54741 10.5021 2.41039 10.6193 2.31264 10.7681C2.21488 10.917 2.16599 11.0776 2.16599 11.25V11.8397H6.9032C6.95129 12.0598 7.01699 12.2753 7.10031 12.4863C7.18364 12.6973 7.28193 12.8985 7.39518 13.0897H0.916016Z"
                        fill="#06A9EF"
                      />
                    </svg>
                    <span className="text-[#333333] text-[18px] font-semibold">
                      Match Score
                    </span>
                  </div>
                  <div className="w-[100%]">
                    {(
                      data?.percentage > 0 &&
                      data &&
                      data["justification Of Matching"]?.length > 0 &&
                      data["justification Of Matching"]
                        ?.toLowerCase()
                        .split(" ")
                        .includes("no")
                        ? false
                        : true
                    ) ? (
                      <Progress_bar progress={data?.percentage} />
                    ) : null}
                  </div>
                </div>
                {data && data["Matching parameters"]?.length > 0 && (
                  <div className="flex flex-col gap-[8px]  justify-top relative w-full ">
                    <span className="text-[#333333] text-[16px] font-semibold ">
                      Matching Parameters
                    </span>
                    <ul className="flex flex-col gap-[4px]">
                      {data["Matching parameters"].map((item, i) => (
                        <li
                          key={i}
                          className="text-[#333333] text-[14px] font-500 flex flex-row items-center gap-[8px]"
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
                          </svg>

                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data && data["justification Of Matching"]?.length > 0 && (
                  <div className="flex flex-col gap-[8px]  justify-between relative  w-full ">
                    <span className="text-[#333333] text-[16px] font-semibold">
                      Justification
                    </span>
                    <span className="text-[12px] text-[#333333] ">
                      {data["justification Of Matching"]}
                    </span>
                  </div>
                )}

                {data?.percentage > 0 &&
                  data["Matching parameters details"] &&
                  Object.keys(data["Matching parameters details"]).length > 0 &&
                  Object.keys(data["Matching parameters details"]["required"])
                    .length > 0 && (
                    <div className="flex flex-col gap-[8px]  justify-between relative  w-full ">
                      <span className="text-[#333333] text-[16px] font-semibold">
                        Details
                      </span>

                      {data["Matching parameters details"]["required"] &&
                        Object.keys(
                          data["Matching parameters details"]["required"]
                        ).length > 0 && (
                          <ul className="flex flex-col gap-[4px]">
                            <span className="text-[#333333] text-[12px] font-semibold">
                              Required
                            </span>
                            {console.log(
                              data["Matching parameters details"]["required"]
                            )}
                            {Object.keys(
                              data["Matching parameters details"]["required"]
                            ).map(
                              (item, index) =>
                                data["Matching parameters details"]["required"][
                                  item
                                ] && (
                                  <li
                                    key={index}
                                    className="text-[#333333] text-[12px] font-500 flex flex-row items-top gap-[8px]"
                                  >
                                    <div className="w-[10px] mt-[5px]">
                                      <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <circle
                                          cx="5"
                                          cy="5"
                                          r="5"
                                          fill="#D9D9D9"
                                        />
                                      </svg>
                                    </div>
                                    <span
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item}{" "}
                                      {Array.isArray(
                                        data["Matching parameters details"][
                                          "required"
                                        ][item]
                                      ) && ":"}
                                      {data["Matching parameters details"][
                                        "required"
                                      ][item] &&
                                        data["Matching parameters details"][
                                          "required"
                                        ][item].length > 0 &&
                                        Array.isArray(
                                          data["Matching parameters details"][
                                            "required"
                                          ][item]
                                        ) &&
                                        data["Matching parameters details"][
                                          "required"
                                        ][item]?.join(", ")}
                                    </span>
                                  </li>
                                )
                            )}
                          </ul>
                        )}
                      {data["Matching parameters details"]["provided"] &&
                        Object.keys(
                          data["Matching parameters details"]["provided"]
                        ).length > 0 && (
                          <ul className="flex flex-col gap-[4px]">
                            <span className="text-[#333333] text-[12px] font-semibold">
                              Provided
                            </span>

                            {Object.keys(
                              data["Matching parameters details"]["provided"]
                            ).map(
                              (item, index) =>
                                data["Matching parameters details"]["provided"][
                                  item
                                ] && (
                                  <li
                                    key={index}
                                    className="text-[#333333] text-[12px] font-500 flex flex-row items-top gap-[8px]"
                                  >
                                    <div className="w-[10px] mt-[5px]">
                                      <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <circle
                                          cx="5"
                                          cy="5"
                                          r="5"
                                          fill="#D9D9D9"
                                        />
                                      </svg>
                                    </div>
                                    <span
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item}{" "}
                                      {Array.isArray(
                                        data["Matching parameters details"][
                                          "provided"
                                        ][item]
                                      ) && ":"}
                                      {data["Matching parameters details"][
                                        "provided"
                                      ][item] &&
                                        data["Matching parameters details"][
                                          "provided"
                                        ][item].length > 0 &&
                                        Array.isArray(
                                          data["Matching parameters details"][
                                            "provided"
                                          ][item]
                                        ) &&
                                        data["Matching parameters details"][
                                          "provided"
                                        ][item]?.join(", ")}
                                    </span>
                                  </li>
                                )
                            )}
                          </ul>
                        )}
                    </div>
                  )}
              </div>

              <div className="w-[48%] flex flex-col gap-[24px]  h-[100%] overflow-auto relative ">
                <span className="text-[#333333] text-[18px] font-semibold sticky top-0 w-full bg-white">
                  Job Description
                </span>
                <div className="flex flex-col gap-[8px]">
                  <span className="text-[#333333] text-[16px] font-semibold">
                    Qualifications
                  </span>
                  <span className="text-[#333333] text-[14px] font-medium">
                    {data?.requiredQualification}
                  </span>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="text-[#333333] text-[16px] font-semibold">
                    Required Skills
                  </span>
                  <div className="flex flex-row flex-wrap gap-3">
                    {data?.skills?.map((item, index) => (
                      <div
                        key={index}
                        className="py-[4px] px-[12px] bg-[#effaff] rounded-[25px] flex flex-row gap-3 items-center border border-[#06A9EF]"
                      >
                        <span className="text-[14px]"> {item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="text-[#333333] text-[16px] font-semibold">
                    Full job Description
                  </span>
                  <div
                    className="html-content text-[12px]"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
