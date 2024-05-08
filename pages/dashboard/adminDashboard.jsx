// import StackedBarChart from "@/components/common/StackedBarChart";
// import StackedBarChart from "@/components/common/Bars";
// import ChartComponent, { Bars } from "@/components/common/Bars";
// import StackedBarChart from "@/components/common/StackedBarChart";
import { TablePagination } from "@mui/material";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dateSeter } from "../../utils/middleware";
import { plans } from "../../utils/data";
import StackedBarChart from "../../components/common/StackedBarChart";
import StackedBarChartCan from "../../components/common/StackedBarChartCand";
import StackedBarChartCand from "../../components/common/StackedBarChartCand";

function AdminDashboard({ toggleContentt }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [recruiterData, setRecruiterData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [inquiriesData, setInquiriesData] = useState([]);
  const [activeRecruiters, setActiveRecruiters] = useState([]);
  const [result, setResult] = useState();
  console.log(102, result);
  const [activeplans, setActivePlans] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getData = () => {
    axios
      .get("https://freedygoservices.in/api/recruiters")
      .then((res) => {
        setRecruiterData(res.data);
        setUserList(res.data.users.results);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // setMiniloading(false);
      });
    axios
      .get("https://freedygoservices.in/api/activeSubscription")
      .then((res) => {
        console.log(444, res.data.data);
        setActivePlans(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://freedygoservices.in/api/candidates")
      .then((res) => {
        setCandidateData(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .get("https://freedygoservices.in/api/enquires")
      .then((res) => {
        setList(res.data.data.results);
        setInquiriesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .get("https://freedygoservices.in/api/activeRecruiters")
      .then((res) => {
        console.log(res);
        setResult(res.data);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  {
    console.log(333, inquiriesData);
  }

  const [list, setList] = useState([]);
  //  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [miniLoading, setMiniloading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [userList, setUserList] = useState([]);
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  //  const [page, setPage] = useState(1)
  const [data, setData] = useState([]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };
  const handleChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  return (
    <div className=" flex flex-col gap-12 w-[100%] customMargins ">
      <div className="ml:pt-5 pt-4 lg:flex flex lg:flex-row flex-col flex-wrap items-start lg:justify-between gap-3">
        <div
          onClick={() => router.push("/dashboard/Recruiters")}
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[24%] w-[100%] gap-[6px]  ml:gap-4 cursor-pointer"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between  gap-[5px] self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px] ml:text-[30px] font-semibold leading-normal">
              {recruiterData.totalCount}
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[16px] text-[14px] leading-4 font-medium font-montserrat ">
                Total Recruiter{" "}
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
        </div>

        <div
          onClick={() => router.push("/dashboard/Candidates")}
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[24%] w-[100%] gap-[6px]  ml:gap-4 cursor-pointer"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center gap-[5px] justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px] ml:text-[30px] font-semibold leading-normal">
              {candidateData.totalCount}
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[14px] text-[14px] leading-4 font-medium font-montserrat ">
                Total Candidates
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
        </div>

        <div
          onClick={() => router.push("/dashboard/Enquiries")}
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[24%] w-[100%] gap-[6px]  ml:gap-4 cursor-pointer"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between gap-[5px] self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px] ml:text-[30px] font-semibold leading-normal">
              {inquiriesData.totalCount}
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[14px] text-[14px] leading-4 font-medium font-montserrat ">
                Toatal Inquiries
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
        </div>

        <div
          // onClick={() => router.push("/dashboard/Recruiters")}
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[24%] w-[100%] gap-[6px]  ml:gap-4"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between gap-[5px] self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px] ml:text-[30px] font-semibold leading-normal">
              {activeplans?.length}
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[14px] text-[14px] leading-4 font-medium font-montserrat ">
                Active Plans
              </p>
            </div>
            {/* <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            /> */}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-evenly gap-[16px]">
        <div
          className="w-[35%] h-[450px] overflow-hidden"
          style={{
            borderRadius: "14px",
            backgroundColor: "#fff",
            boxShadow: "1px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          {result?.ActiveRecruiter && (
            <StackedBarChart
              title={"Active/Inactive Recruiters "}
              data={[
                { asset: "Active", Recruiters: result?.ActiveRecruiter },
                { asset: "Inactive", Recruiters: result?.InActiveRecruiter },
              ]}
            />
          )}
        </div>
        <div
          className="w-[35%] h-[450px] overflow-hidden"
          style={{
            borderRadius: "14px",
            backgroundColor: "#fff",
            boxShadow: "1px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          {result?.ActiveCandidate && (
            <StackedBarChartCand
              title={"Active/Inactive Candidates "}
              data={[
                { asset: "Active", Candidates: result?.ActiveCandidate },
                { asset: "Inactive", Candidates: result?.InActiveCandidate },
              ]}
            />
          )}
        </div>
      </div>
      <>
        {list?.length > 0 ? (
          <div className="w-full h-[72vh] overflow-auto relative">
            <table className="w-full">
              <thead className="w-full sticky top-0">
                <tr className="w-full bg-[#06A9EF] flex flex-row justify-between items-center px-[24px] py-[12px]">
                  <th className="text-[16px] font-semibold text-white w-[5%] text-center ">
                    Sr.no
                  </th>
                  <th className="text-[16px] font-semibold text-white w-[15%] text-center">
                    Enquiry At
                  </th>
                  <th className="text-[16px] font-semibold text-white w-[25%] text-left ">
                    Email Address
                  </th>
                  <th className="text-[16px] font-semibold text-white w-[15%] text-center ">
                    Role
                  </th>

                  <th className="text-[16px] font-semibold text-white w-[15%]">
                    Plan
                  </th>
                  <th className="text-[16px] font-semibold text-white w-[15%]">
                    Price
                  </th>
                  <th className="text-[16px] font-semibold text-white w-[15%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.slice(0, 5).map((item, index) => (
                  <tr
                    className="w-full  flex flex-row justify-between items-center px-[24px] py-[16px] border-b-[1px] border-[#bebebe]"
                    key={index}
                  >
                    <th className="text-[16px] font-semibold text-[#333333] w-[5%] text-center ">
                      {index + 1}
                    </th>
                    <th className="text-[14px] font-semibold text-[#333333] w-[15%] text-center">
                      {dateSeter(item.createdAt)}
                    </th>
                    <th className="  w-[25%] flex flex-row items-center gap-[8px]">
                      <span className="text-[14px] font-semibold text-[#333333] text-left">
                        {item?.userData?.email}
                      </span>
                    </th>
                    <th
                      className="text-[14px] font-semibold text-[#333333] w-[15%]"
                      style={{ textTransform: "capitalize" }}
                    >
                      {item?.userData?.role
                        ? item?.userData?.role == "user"
                          ? "Candidate"
                          : item?.userData?.role
                        : "-"}
                    </th>

                    <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                      {item?.plan}
                    </th>
                    <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                      {
                        plans.find(
                          (data) =>
                            data.duration + " " + data.limit == item.plan
                        )?.price
                      }
                    </th>
                    <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                      <button
                        className={`bg-[#06a9ef] text-white py-[8px] px-[16px] rounded-[8px]`}
                        onClick={() =>
                          router.push(
                            `/dashboard/Enquiries/details?id=${item._id}`
                          )
                        }
                      >
                        Active Plan
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full text-[24px] text-[#bebebe] font-semibold h-[40vh]">
            No Request Available !
          </div>
        )}
      </>
    </div>
  );
}

export default AdminDashboard;
