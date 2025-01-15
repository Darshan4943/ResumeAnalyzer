import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TablePagination } from "@mui/material";
import axios from "axios";
import MiniLoader from "../../../../common/miniLoader";
import CustomPagination from "../../../../common/CustomPagination";

function RequisitionList({ filterData }) {
  const router = useRouter();
  const query = router.query;
  const [requisitions, setRequisitions] = useState([]);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [miniLoading, setMiniloading] = useState(true);
  const [totalPages, setTotalpages] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setMiniloading(true);
    const fetchRequisitions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/getrequisitions",
          {
            params: {
              ...filterData,
              page,
              limit,
            },
          }
        );
        setRequisitions(response.data.data);
        console.log(response.data.data);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const labels = [
    "Requisition for",
    "Requested by",
    "Priority",
    "Location",
    "Budget",
    "Open Position",
    "Status",
  ];

  return (
    <div className=" w-full bg-[#FFFFFF] overflow-hidden rounded-[6px]">
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
              className="w-full bg-[#FFFFFF] p-[16px] flex justify-between items-center border-b-[1px] border-solid border-[#DEDEDE]"
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
                  {requisition.Requestedby}
                </div>
                <div className="text-[#646464] text-center text-[12px] font-[500]">
                  {new Date(requisition.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                {requisition.isPriority ? "Priority" : "Not Priority"}{" "}
              </div>
              <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                {requisition.location}
              </div>
              <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                {(!requisition.budgetFrom && !requisition.budgetTo) ? "" : <>${requisition.budgetFrom || 0} - ${requisition.budgetTo || ""}</>}
              </div>
              <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                {requisition.positions} positions
              </div>
              <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
                {requisition.Status}
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
  );
}

export default RequisitionList;
