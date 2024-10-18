import React, { useEffect, useState } from "react";
import Progress_bar from "../../../components/featured/jobMatching/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { recallUser } from "../../../Redux/reducers/userReducer";
import { reCallUserData } from "../../../Redux/actions/user";

const JobCard = ({ data, setJd, resume, jd }) => {
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [isApplied, setIsApplied] = useState(true);
  const [isApply, setIsApply] = useState(false);
  const dispatch = useDispatch();

  const getData = () => {
    setLoading(true);
    if (data) {
      axios
        .get("https://api.shindedarshan.com/api/job/getById/" + data?._id)
        .then((res) => {
          setLoading(false);
          setIsApplied(
            res.data.data.applications?.find(
              (item) => item.applicantId == userDataGlobal._id
            )
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [data, jd, isApply]);

  const applyForJob = (data) => {
    setLoading(true);
    axios
      .post("https://api.shindedarshan.com/api/job/apply/" + data?._id, {
        userId: userDataGlobal._id,
        resumeId: resume._id,
        percentage: data?.percentage,
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
  const SaveJob = (id) => {
    axios
      .post(`https://api.shindedarshan.com/api/saveJob/${userDataGlobal?._id}/${id}`)
      .then((res) => {
        dispatch(reCallUserData());
        getData();
        toast.success("Job Saved  Successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const isSaved = (id) => {
    return userDataGlobal?.savedJobs?.find((item) => item.id == id);
  };

  return (
    <div className="flex flex-col gap-[8px] w-[100%] max-w-[380px] rounded-[16px] border border-[#DEDEDE] bg-white shadow-lg py-[16px] ml:px-[24px] px-3 min-w-[300px] group">
      <div className="flex flex-col gap-[4px]">
        <div className="flex gap-[4px]">
          <span className=" text-[16px] font-500">{data?.jobTitle}</span>{" "}
        </div>
        <div className="flex gap-[8px] items-center ">
          <div
            className="text-[14px] font-500 "
            style={{ borderRight: "1px solid #bebebe", paddingRight: "8px" }}
          >
            {data?.companyName}
          </div>
          <span className="text-[14px] font-500">
            {data?.location?.join(",")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[12px] min-h-[157px] justify-start relative ">
        <span className="text-[#333333] text-[16px] font-[500]">
          Matching based on
        </span>
        <ul className="flex flex-col gap-[4px]">
          {data &&
          data["Matching parameters"] &&
          data["Matching parameters"]?.length > 0 ? (
            <>
              {" "}
              {data["Matching parameters"] &&
                data["Matching parameters"]?.map((item, i) => (
                  <li
                    key={i}
                    className="text-[#333333] text-[14px] font-[500] flex flex-row items-center gap-[8px]"
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
            </>
          ) : (
            <div className="text-[14px]">
              {data && data["justification Of Matching"]
                ? data["justification Of Matching"]
                : null}
            </div>
          )}
        </ul>
        <span
          onClick={() => setJd(data)}
          className="text-[#06A9EF] text-[14px]  underline decoration-solid  text-end absolute bottom-[0px] right-0 cursor-pointer font-semibold"
        >
          See More
        </span>
      </div>
      <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
      <div className="flex flex-row justify-between w-full items-center ">
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
          <span>Match Score</span>
        </div>
        <button
          className="px-[12px] py-[8px] w-[102px] bg-[#06A9EF] rounded-[8px] text-[#fff] text-[14px]"
          onClick={() => {
            applyForJob(data);
            setIsApply(!isApply);
          }}
          disabled={isApplied}
          style={{ opacity: isApplied ? 0.6 : 1 }}
        >
          {loading ? (
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
            <> {isApplied ? "Applied" : "Apply"}</>
          )}
        </button>
      </div>
      <div className="flex flex-row justify-between items-center">
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
          <div style={{ width: "50%" }}>
            <Progress_bar progress={data?.percentage} />
          </div>
        ) : (
          <div
            className="flex flex-row gap-2 items-center justify-between "
            style={{ width: "50%" }}
          >
            <div
              style={{
                width: "80%",
                background: "#8080804d",
                borderRadius: 12,
                fontSize: "8px",
                height: "10px",
              }}
            ></div>
            <span className="text-[14px] font-semibold">0%</span>
          </div>
        )}

        <button
          onClick={() => SaveJob(data?._id)}
          className="p-[8px]  cursor-pointer  px-[12px] py-[6px] w-[102px] border-[1px] border-[#06A9EF] rounded-[8px] text-[14px] "
          disabled={isSaved(data?._id)}
          style={{ opacity: isSaved(data?._id) ? 0.6 : 1 }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default JobCard;
