import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TablePagination } from "@mui/material";
import axios from "axios";

function RequisitionList() {
  const router = useRouter();
  const query = router.query;
  const [requisitions, setRequisitions] = useState([]);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/getrequisitions"
        );
        setRequisitions(response.data.data);
        console.log("object", response.data.data);
      } catch (error) {
        setError("Failed to fetch requisitions");
        console.error("Error fetching requisitions:", error);
      }
    };

    fetchRequisitions();
  }, []);

  useEffect(() => {
    if (query.content === "CreateNewRequisition") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Paginate requisitions based on current page and rowsPerPage
  const paginatedRequisitions = requisitions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="h-[calc(95vh-328px)] w-full bg-[#FFFFFF] overflow-hidden rounded-[6px]">
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
      <div className="overflow-scroll h-[66%]">
        {paginatedRequisitions.map((requisition) => (
          <div className="w-full bg-[#FFFFFF] p-[16px] flex justify-between items-center border-b-[1px] border-solid border-[#DEDEDE]" key={requisition.id}>
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
              {requisition.isPriority ? "Priority" : "Not Priority"}{" "}
            </div>
            <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
              {requisition.location}
            </div>
            <div className="w-[12.84%] text-[#333333] text-center text-[14px] font-[500]">
              ${requisition.budgetFrom}-{requisition.budgetTo}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        className="h-[80px] rounded-b-[12px] flex items-center justify-end py-[12px] px-[16px] border-t bg-white sticky bottom-0 w-[100%]"
        count={requisitions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default RequisitionList;
