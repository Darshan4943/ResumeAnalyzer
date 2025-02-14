import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TablePagination } from "@mui/material";
import axios from "axios";
import MiniLoader from "../../../../common/miniLoader";
import CustomPagination from "../../../../common/CustomPagination";
import RequisitionPreview from "../../../../../pages/employer/requisitionPreview";
import { useSelector } from "react-redux";

function RequisitionList({
  filterData,
  openPreview,
  setOpenPreview,
  requisitionId,
  setRequisitionId,
}) {
  const router = useRouter();
  const query = router.query;
  const [requisitions, setRequisitions] = useState([]);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [miniLoading, setMiniloading] = useState(true);
  const [totalPages, setTotalpages] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  useEffect(() => {
    setLoading(true);
    setMiniloading(true);
    const fetchRequisitions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/getrequisitions/${userDataGlobal._id}`,
          {
            params: {
              ...filterData,
              page,
              limit,
            
            },
          }
        );
        setRequisitions(response.data.data);
        setTimeout(() => {
          setMiniloading(false);
          setLoading(false);
        }, 500);
        setTotalCount(response.data.pagination.totalCount);
        setTotalpages(response.data.pagination.totalPages);
      } catch (error) {
        setError("Failed to fetch requisitions");
        setTimeout(() => {
          setMiniloading(false);
          setLoading(false);
        }, 500);
        console.error("Error fetching requisitions:", error);
      }
    };

    fetchRequisitions();
  }, [filterData, page, limit]);

  useEffect(() => {
    if (query.content === "CreateNewRequisition") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const labels = [
    "Requisition for",
    "Requested by",
    "Priority",
    "Location",
    "Budget",
    "Open Position",
    "Status",
  ];

  const openPreviewModel = () => {
    setRequisitionId(requisitions._id);
    setOpenPreview(true);
  };

  return (
    <>
      <div className="web w-full bg-[#FFFFFF] overflow-hidden rounded-[6px]">
        <div className="w-full bg-[#E0F6FF] p-[16px] flex justify-between items-center">
          {labels.map((req, index) => (
            <div
              key={index}
              className="w-[12.84%] text-[#333333] text-center text-[16px] font-[600]"
            >
              {req}
            </div>
          ))}
        </div>

        {loading ? (
          <MiniLoader />
        ) : requisitions.length === 0 ? (
          <div className="p-3 flex items-center justify-center">
            <img
              className="w-[40%]"
              src="/images/employer/OBJECTS.png"
              alt="No data available"
            />
          </div>
        ) : (
          <div className="">
            {requisitions.map((requisition) => (
              <div
                onClick={() => {
                  setRequisitionId(requisition?._id);
                  setOpenPreview(true);
                }}
                className="w-full bg-[#FFFFFF] hover:bg-[#DFF4FD] cursor-pointer p-[16px] flex justify-between items-center border-b-[1px] border-solid border-[#DEDEDE]"
                key={requisition.id}
              >
                <div className="w-[12.84%] text-[#333333] text-[16px] font-[600] flex flex-col gap-[6px]">
                  <div className="text-[#333333] text-center text-[14px] font-[500]">
                    {requisition.requisitionType}
                  </div>
                  <div className="text-[#646464] text-center text-[12px] font-[500]">
                    {requisition.jobTitle}
                  </div>
                </div>
                <div className="w-[12.84%] text-[#333333] text-center text-[16px] font-[600] flex flex-col gap-[6px]">
                  <div className="text-[#333333] text-center text-[14px] font-[500]">
                    {userDataGlobal?.name || "-"}
                  </div>
                  <div className="text-[#646464] text-center text-[12px] font-[500]">
                    {new Date(requisition.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
                <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                  {requisition.isPriority ? "Yes" : "No"}{" "}
                </div>
                <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                  {requisition.location && requisition.location.length > 0 ? (
                    requisition.location.length > 2 ? (
                      <div className="flex flex-col">
                        {requisition.location.map((loc, index) => (
                          <span key={index}>
                            {loc}
                            {index !== requisition.location.length - 1 && ","}
                          </span>
                        ))}
                      </div>
                    ) : (
                      requisition.location.join(", ")
                    )
                  ) : (
                    "-" 
                  )}
                </div>

                <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                  {!requisition.budgetFrom && !requisition.budgetTo ? (
                    "-"
                  ) : (
                    <>
                      ${requisition.budgetFrom || 0} - $
                      {requisition.budgetTo || ""}
                    </>
                  )}
                </div>
                <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                  {requisition.positions
                    ? `${requisition.positions} positions`
                    : "-"}
                </div>
                <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                  {requisition?.status || "-"}
                </div>
              </div>
            ))}
          </div>
        )}
        <CustomPagination
          setMiniloading={setMiniloading}
          miniLoading={miniLoading}
          setPage={setPage}
          title={"RequisitionList"}
          setLimit={setLimit}
          totalPages={totalPages}
          limit={limit}
          page={page}
        />
      </div>
      <div className="mobile  ">
              <div className=" flex flex-col gap-2   relative ">
               
                <div>
                  {requisitions.map((req, index) => (
                      <div
                        key={index}
                        className="p-[12px] bg-[#fff] rounded-[12px] gap-[16px] border-[0.5px] border-solid border-[#DEDEDE] mb-[8px]"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col gap-[2px]">
                            <div className="text-[12px] font-[500] text-[#06A9EF]">
                              {req.tittle1}
                            </div>
                            <div className="text-[#646464] text-[10px] font-[500]">
                              {req.tittle2}
                            </div>
                          </div>
                          <div className="text-[#333] text-[12px] font-[500]">
                            {req.Location}
                          </div>
                        </div>
                        <div className="flex justify-evenly">
                          <div className="text-center">
                            <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                              Requested by
                            </div>
                            <div className="text-[#333] text-[12px] font-[500]  ">
                              {req.Requestedby}
                              <div className="text-[#646464] text-[10px] font-[500]"></div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="py-[6px] px-[12px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                              Budget
                            </div>
                            <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                              {req.Budget}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                              Open Position
                            </div>
                            <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                              {req.opening}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center self-stretch">
                          <div className="flex items-center self-stretch rounded-sm bg-[#E0F6FF]">
                            <div className="flex py-3 px-[6px] bg-[#F8F8F8] rounded-[4px 0 0 4px]">
                              <p className="text-[#333] text-[12px] font-medium">
                                Priority
                              </p>
                            </div>
                            <div className="flex py-[6px] px-3 ">
                              <p className="text-[#333] text-[12px] font-medium">
                                Yes
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                              <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                                Pending
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
    </>
  );
}

export default RequisitionList;
