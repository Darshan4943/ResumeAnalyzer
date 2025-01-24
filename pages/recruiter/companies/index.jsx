import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MiniLoader from "../../../components/common/miniLoader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomPagination from "../../../components/common/CustomPagination";

function Index() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [miniloading, setMiniloading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState();
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  useEffect(() => {
    setId(userDataGlobal?._id || "");
  }, [userDataGlobal]);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/company/getCompaniesById/${id}`,
        {
          params: { page, limit },
        }
      );
      setCompanyData(response.data.companies || []);
      setTotalPages(response.data.totalPages || 1);
      setTimeout(() => {
        setMiniloading(false);
      }, 500);
    } catch (err) {
      console.error("Error fetching company data:", err);
      setError("Error fetching company data.");
      setTimeout(() => {
        setMiniloading(false);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchCompanyData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCompanyData();
    }
  }, [page, limit]);

  const handleEditCompany = (companyId) => {
    router.push(`/recruiter/companies/createCompany?companyId=${companyId}`);
  };

  const handleDelete = async (companyId) => {
    if (!companyId) {
      toast.error("No company selected for deletion.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:2000/api/company/deleteCompany/${companyId}`
      );
      if (response.data.success) {
        toast.success("Company deleted successfully!");
        fetchCompanyData();
      } else {
        toast.error(response.data.message || "Failed to delete company.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        onClick={() => router.push("/recruiter/companies/createCompany")}
        className="bg-[#06A9EF] text-[#FFFFFF] w-[239px] h-[42px] text-[14px] font-[600] rounded-[30px] px-6 py-3 flex items-center justify-center"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#mask0_6706_95211)">
            <path
              d="M8.25 9.75H4.5C4.2875 9.75 4.10938 9.67812 3.96562 9.53438C3.82187 9.39062 3.75 9.2125 3.75 9C3.75 8.7875 3.82187 8.60938 3.96562 8.46562C4.10938 8.32188 4.2875 8.25 4.5 8.25H8.25V4.5C8.25 4.2875 8.32188 4.10938 8.46562 3.96562C8.60938 3.82187 8.7875 3.75 9 3.75C9.2125 3.75 9.39062 3.82187 9.53438 3.96562C9.67812 4.10938 9.75 4.2875 9.75 4.5V8.25H13.5C13.7125 8.25 13.8906 8.32188 14.0344 8.46562C14.1781 8.60938 14.25 8.7875 14.25 9C14.25 9.2125 14.1781 9.39062 14.0344 9.53438C13.8906 9.67812 13.7125 9.75 13.5 9.75H9.75V13.5C9.75 13.7125 9.67812 13.8906 9.53438 14.0344C9.39062 14.1781 9.2125 14.25 9 14.25C8.7875 14.25 8.60938 14.1781 8.46562 14.0344C8.32188 13.8906 8.25 13.7125 8.25 13.5V9.75Z"
              fill="white"
            />
          </g>
        </svg>
        Create Company Profile
      </button>
      {loading ? (
        <div className=" min-h-[360px] ">
          <MiniLoader />
        </div>
      ) : (
        <div className="flex w-full flex-wrap gap-[18px]">
          {companyData.length > 0 ? (
            companyData.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] p-5 rounded-[12px] flex flex-col items-center justify-between gap-1 w-full ms:w-[48%] scr1024:w-[30.75%]"
              >
                <div className="gap-1 flex flex-col">
                  <img
                    src={item.companyLogo || "/images/jobs/logo.png"}
                    alt="Company logo"
                    className="h-[60px] object-contain"
                  />
                  <div className="flex w-full flex-col gap-2 text-center text-[14px] font-[500] text-[#333333]">
                    {item.companyName}
                    <div className=" w-full text-[12px] font-[400] text-[#646464] text-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.companyDescription,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-end gap-2">
                  <button onClick={() => handleEditCompany(item._id)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_7809_106553)">
                        <path
                          d="M11.6693 17.5013V16.1263C11.6693 16.0152 11.6901 15.9076 11.7318 15.8034C11.7734 15.6992 11.8359 15.6055 11.9193 15.5221L16.2734 11.1888C16.3984 11.0638 16.5373 10.9735 16.6901 10.918C16.8429 10.8624 16.9957 10.8346 17.1484 10.8346C17.3151 10.8346 17.4748 10.8659 17.6276 10.9284C17.7804 10.9909 17.9193 11.0846 18.0443 11.2096L18.8151 11.9805C18.9262 12.1055 19.013 12.2444 19.0755 12.3971C19.138 12.5499 19.1693 12.7027 19.1693 12.8555C19.1693 13.0082 19.1415 13.1645 19.0859 13.3242C19.0304 13.4839 18.9401 13.6263 18.8151 13.7513L14.4818 18.0846C14.3984 18.168 14.3047 18.2305 14.2005 18.2721C14.0964 18.3138 13.9887 18.3346 13.8776 18.3346H12.5026C12.2665 18.3346 12.0686 18.2548 11.9089 18.0951C11.7491 17.9353 11.6693 17.7374 11.6693 17.5013ZM12.9193 17.0846H13.7109L16.2318 14.543L15.4609 13.7721L12.9193 16.293V17.0846ZM5.0026 18.3346C4.54427 18.3346 4.15191 18.1714 3.82552 17.8451C3.49913 17.5187 3.33594 17.1263 3.33594 16.668V3.33464C3.33594 2.8763 3.49913 2.48394 3.82552 2.15755C4.15191 1.83116 4.54427 1.66797 5.0026 1.66797H10.9818C11.204 1.66797 11.4158 1.70964 11.6172 1.79297C11.8186 1.8763 11.9957 1.99436 12.1484 2.14714L16.1901 6.1888C16.3429 6.34158 16.4609 6.51866 16.5443 6.72005C16.6276 6.92144 16.6693 7.13325 16.6693 7.35547V8.54297C16.6693 8.77908 16.5894 8.977 16.4297 9.13672C16.27 9.29644 16.072 9.3763 15.8359 9.3763C15.5998 9.3763 15.4019 9.29644 15.2422 9.13672C15.0825 8.977 15.0026 8.77908 15.0026 8.54297V7.5013H11.6693C11.4332 7.5013 11.2352 7.42144 11.0755 7.26172C10.9158 7.102 10.8359 6.90408 10.8359 6.66797V3.33464H5.0026V16.668H9.16927C9.40538 16.668 9.6033 16.7478 9.76302 16.9076C9.92274 17.0673 10.0026 17.2652 10.0026 17.5013C10.0026 17.7374 9.92274 17.9353 9.76302 18.0951C9.6033 18.2548 9.40538 18.3346 9.16927 18.3346H5.0026ZM15.8568 14.1471L15.4609 13.7721L16.2318 14.543L15.8568 14.1471Z"
                          fill="#646464"
                        />
                      </g>
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_7761_107696)">
                        <path
                          d="M5.83594 17.5C5.3776 17.5 4.98524 17.3368 4.65885 17.0104C4.33247 16.684 4.16927 16.2917 4.16927 15.8333V5H3.33594V3.33333H7.5026V2.5H12.5026V3.33333H16.6693V5H15.8359V15.8333C15.8359 16.2917 15.6727 16.684 15.3464 17.0104C15.02 17.3368 14.6276 17.5 14.1693 17.5H5.83594ZM14.1693 5H5.83594V15.8333H14.1693V5ZM7.5026 14.1667H9.16927V6.66667H7.5026V14.1667ZM10.8359 14.1667H12.5026V6.66667H10.8359V14.1667Z"
                          fill="#646464"
                        />
                      </g>
                    </svg>
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div>No companies found.</div>
          )}
          <CustomPagination
            setMiniloading={setMiniloading}
            miniLoading={miniloading}
            setPage={setPage}
            title={"Jobs"}
            setLimit={setLimit}
            totalPages={totalPages}
            limit={limit}
            page={page}
          />
        </div>
      )}
    </div>
  );
}

export default Index;
