import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LeftArow } from "../../../utils/svg";
import { dateSeter } from "../../../utils/middleware";
import Applications from "./applications";
import Details from "./details";
import MiniLoader from "../../../components/common/miniLoader";
import ApplicantRanking from "./applicantRanking";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { currencyMap } from "../../../utils/data";
const Index = () => {
  const router = useRouter();
  const { id, isUser } = router.query;
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const userDataGlobal = useSelector((state) => state.userData);
  const [jobPost, setJobPost] = useState(null);
  const [applications, setApplications] = useState([]);
  const [options, setOption] = useState(10);
  const [syncnResume, setSynchResume] = useState([]);
  const [miniLoading, setMiniloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingg, setLoadingg] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const selectOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
  ];
  const [resumeList, setResumeList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getData = async () => {
    setLoading(true);
    if (id) {
      await axios
        .get("https://jamblix.com/api/job/getById/" + id)
        .then((res) => {
          setLoading(false);
          setJobPost(res.data);

          setOption(res.data.applications.length > 0 ? 10 : 0);
          // setApplications(res.data.applications);
        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
        });
    }
  };
  useEffect(() => {
    getData();
    getAllAppliedData();
  }, [id]);
 

  //sycn resume manually
  const SyncResume = async () => {
    setLoadingg(true);
    if (id) {
      try {
        const res = await axios.get(
          `https://jamblix.com/api/jobs/SyncById/${id}`
        );

        if (res.data.success) {
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingg(false);
      }
    } else {
      setLoadingg(false);
    }
  };

  //get All applicant /applications
  const getAllAppliedData = async () => {
    try {
      const response = await axios.get(
        `https://jamblix.com/api/job/getSynchData/${id}`,
        {
          params: {
            page,
            limit,
          },
        }
      );

      setApplications(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.error("err", err);
    }
  };
  useEffect(() => {
    getAllAppliedData();
  }, [page, limit]);

  return (
    <div className="min-h-[90vh] my-[16px] customMargins flex flex-col gap-[16px] ">
      {loading ? (
        <div className="flex items-center justify-center h-[70vh] ">
          <MiniLoader />
        </div>
      ) : (
        <div
          className="rounded-[16px] min-h-[90vh]"
          style={{ boxShadow: " 0px 1px 2px 0px #00000040" }}
        >
          <div className="sm:p-[24px] p-3 flex flex-row gap-[16px] items-center">
            <div
              className="h-[36px] w-[36px] rounded-[36px] border border-[#bebebe] flex items-center justify-center cursor-pointer "
              onClick={() => router.back()}
            >
              <svg
                className=" cursor-pointer"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.1751 8.83345L8.5918 14.2501C8.75845 14.4168 8.84039 14.6112 8.83762 14.8335C8.83484 15.0557 8.75011 15.2501 8.58345 15.4168C8.41678 15.5779 8.22234 15.6598 8.00012 15.6626C7.77791 15.6654 7.58346 15.5835 7.4168 15.4168L0.583447 8.58345C0.494563 8.49456 0.432063 8.4029 0.395947 8.30845C0.359847 8.21401 0.341797 8.11124 0.341797 8.00012C0.341797 7.88901 0.359847 7.78623 0.395947 7.6918C0.432063 7.59735 0.494563 7.50568 0.583447 7.4168L7.4168 0.583447C7.5779 0.422347 7.77095 0.341797 7.99595 0.341797C8.22095 0.341797 8.41678 0.422347 8.58345 0.583447C8.75011 0.750114 8.83345 0.945947 8.83345 1.17095C8.83345 1.39595 8.75011 1.59178 8.58345 1.75845L3.1751 7.1668H15.1668C15.4057 7.1668 15.6043 7.24596 15.7626 7.4043C15.921 7.56263 16.0001 7.76124 16.0001 8.00012C16.0001 8.23901 15.921 8.43761 15.7626 8.59595C15.6043 8.75428 15.4057 8.83345 15.1668 8.83345H3.1751Z"
                  fill="#1C1B1F"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[8px]">
              <span className="text-[#333333] text-[20px] font-medium ">
                {jobPost?.jobTitle}
              </span>
            </div>
          </div>
          <div
            className="flex flex-row justify-between sm:px-[24px] px-3"
            style={{ borderBottom: "1px solid #bebebe" }}
          >
            <div className="flex flex-row gap-[40px] ">
              <div
                className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
                onClick={() => setTab(0)}
                style={{
                  borderBottom: `4px solid ${tab == 0 ? "#06A9EF" : "white"}`,
                }}
              >
                Job Details
              </div>
              {isUser ? null : (
                <div
                  className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
                  onClick={() => setTab(1)}
                  style={{
                    borderBottom: `4px solid ${tab == 1 ? "#06A9EF" : "white"}`,
                  }}
                >
                  Applicants
                </div>
              )}
              {isUser ? null : (
                <div
                  className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
                  onClick={() => setTab(2)}
                  style={{
                    borderBottom: `4px solid ${tab == 2 ? "#06A9EF" : "white"}`,
                  }}
                >
                  Resume Ranking
                </div>
              )}
            </div>
            {tab == 2 && (
              <div className="flex items-center flex-row justify-between pb-[8px] gap-[16px]">
                <div>
                  <button
                    className=" font-montserrat text-[14px] font-semibold px-[16px] rounded-[8px] border border-[#06A9EF] w-[84px] h-[38px] bg-[#06A9EF] text-[#fff]"
                    onClick={() => SyncResume()}
                  >
                    {loadingg ? (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4  animate-spin"
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
                      "Sync"
                    )}
                  </button>
                </div>
                <div>
                  <CreatableSelect
                    value={
                      selectOptions.find(
                        (option) => option.value === options
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        setOption(selectedOption.value); // Set selected option's value
                      } else {
                        setOption(10); // Default to 10 when cleared or no value is selected
                      }
                    }}
                    options={selectOptions}
                    className="w-full"
                    isClearable
                    placeholder="Resumes Per Page"
                  />
                </div>
              </div>
            )}
          </div>
          {tab == 0 && (
            <Details applications={applications} jobPost={jobPost} />
          )}
          {tab == 1 && (
            <Applications
              applications={applications}
              jobPost={jobPost}
              setLimit={setLimit}
              setPage={setPage}
              page={page}
              limit={limit}
              miniLoading={miniLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}

          {tab == 2 && (
            <ApplicantRanking
              resumeList={resumeList}
              jobPost={jobPost}
              loadingg={loadingg}
              setLoadingg={setLoadingg}
              setOption={setOption}
              options={options}
              id={id}
              setResumeList={setResumeList}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
