// import StackedBarChart from "@/components/common/StackedBarChart";
// import StackedBarChart from "@/components/common/Bars";
// import ChartComponent, { Bars } from "@/components/common/Bars";
// import StackedBarChart from "@/components/common/StackedBarChart";
import { TablePagination } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StackedBarChart from "/components/common/StackedBarChart";

function AdminDashboard({ toggleContentt }) {

  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [recruiterData, setRecruiterData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [inquiriesData, setInquiriesData] = useState([]);
  const [activeplans, setActivePlans] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getData = () => {


    axios
      .get("http://localhost:2000/api/recruiters")
      .then((res) => {

        setRecruiterData(res.data)
        setUserList(res.data.users.results);


        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // setMiniloading(false);
      });
    axios
      .get("http://localhost:2000/api/activeSubscription")
      .then((res) => {
        console.log(444, res.data.data)
        setActivePlans(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:2000/api/candidates")
      .then((res) => {

        setCandidateData(res.data)


        setLoading(false);

        setCandidateData(res.data)


        setLoading(false);





      })
      .catch((err) => {
        console.log(err);
        setLoading(false);


      });

    axios
      .get("http://localhost:2000/api/enquires")
      .then((res) => {


        setInquiriesData(res.data)
        setLoading(false);




      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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

  const [list, setList] = useState([]);
  //  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [miniLoading, setMiniloading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [userList, setUserList] = useState([]);
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const [limit, setLimit] = useState(10)
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
    setPage(1)

  };



  return (
    <div className=" ml:h-[80vh] w-[100%] customMargins overflow-y-auto">


      <div className="ml:pt-5 pt-4 lg:flex flex lg:flex-row flex-col flex-wrap items-start lg:justify-between gap-3">
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[24%] w-[100%] gap-[6px]  ml:gap-4"
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
                Total Recruiter               </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>

        </div>
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[24%] w-[100%] gap-[6px]  ml:gap-4"
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
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div
          className="flex py-4 px-4 flex-col bg-[#fff] items-center w-full"
          style={{
            boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <div className="flex lg:flex-row flex-col  w-[100%] ml:py-[24px] ml:px-[16px] gap-4 lg:justify-between items-start lg:items-center bg-[#fff]">
            <p className="font-[600] text-[16px]">Recent Applications</p>

            <div className="flex gap-2 items-start justify-between sm:w-[430px]   ">
              <div
                className="flex py-3 px-4 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/employer/icon_search.png"
                  className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />
                <input type="text" placeholder="Search" className="w-full" />
              </div>
              <div
                className="flex py-3 px-4 gap-2 justify-center items-center bg-white sm:w-[108px] w-[98px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/profile/fil.png"
                  className=" sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />

                <p className="font-Montserrat text-[14px] sm:text-base font-semibold leading-6 text-[#333]">
                  Filter
                </p>
              </div>
            </div>
            {/* </div> */}
          </div>

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
                {list?.map((item, index) => (
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
                          (data) => data.duration + " " + data.limit == item.plan
                        )?.price
                      }
                    </th>
                    <th className="text-[14px] font-semibold text-[#333333] w-[15%]">
                      <button
                        className={`bg-[#06a9ef] text-white py-[8px] px-[16px] rounded-[8px]`}
                        onClick={() =>
                          router.push(`/dashboard/Enquiries/details?id=${item._id}`)
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
        </div>
      </div>

      <div className="mobile">
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicants, index) => (
                <>
                  <div
                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl"
                    style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff", border: '1px solid #DEDEDE' }}
                  >
                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start"
                    >
                      <div className="flex justify-between items-center self-stretch">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-[40px] h-[40px]"
                            src="/images/profile/john_doe.png"
                            alt=""
                          />
                          <p className="text-[14px] text-[#333] font-[600]">
                            {applicants.name}
                          </p>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-[24px] h-[24px]"
                              src="/images/employer/st.png"
                              alt=""
                            />
                            <p className="text-[14px] font-semibold text-[#333]">
                              0.0
                            </p>
                            {applicants.img_star2}
                          </div>
                          <svg
                            xlgns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_7540_117410)">
                              <path
                                d="M11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_7540_117410">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="matrix(0 1 -1 0 24 0)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#333] font-[600]">
                          20 Nov, 2023{" "}
                        </p>
                        <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                          <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                            In Review
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">
                        <div
                          className="flex px-6 py-3 justify-center items-center gap-[10px] bg-[#E7F8FF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                        >
                          <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                            See Application
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        )}


      </>
    </div>
  );
}

export default AdminDashboard;
