import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { useRouter } from "next/router";
import CreateNewRequisition from "../../components/featured/employer/CreateNewRequisition";
import RequisitionFilter from "../../components/featured/employer/afterLogin/requisition/requisitionFilter";
import RequisitionList from "../../components/featured/employer/afterLogin/requisition/requisitionList";
import axios from "axios";
import RequisitionPreview from "./requisitionPreview";

function Requisition() {
  const router = useRouter();
  const query = router.query;
  const [toggle, setToggle] = useState(0);
  const [openSort, setOpenSort] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
  const [requisitionId, setRequisitionId] = useState(null);

  useEffect(() => {
    if (query.content === "CreateNewRequisition") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const toggleContent = () => {
    const CreateNewRequisition = toggle ? "" : "CreateNewRequisition";
    router.push(`Requisition/?content=${CreateNewRequisition}`);
    setToggle((prevToggle) => !prevToggle);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headings = [
    {
      heading: "Department",
      options: ["Assistant Manager", "product manager", "developer"],
    },
    {
      heading: "Location",
      options: ["Mumbai", "Pune", "Banglore"],
    },
    {
      heading: "Status",
      options: ["Pending", "Approved"],
    },
    {
      heading: "Priority",
      options: ["Yes", "No"],
    },
  ];

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
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

  const requisition = [];

  return (
    <div className="">
      {toggle === 0 && (
        <>
          <div className=" flex w-full flex-col gap-[12px]">
            <div className="w-full p-4 bg-white rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-800 text-lg font-medium gap-4">
              <span className="text-base sm:text-lg">
                All Requisition Requests
              </span>
              <button
                onClick={() =>
                  router.push("/employer/requisition/CreateNewRequisition")
                }
                className="px-5 py-2.5 bg-[#06A9EF] text-white text-sm sm:text-base font-semibold rounded-full flex items-center gap-2 shadow-md hover:bg-[#0597d3] transition-all duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 9.75H4.5C4.2875 9.75 4.10938 9.67812 3.96562 9.53438C3.82187 9.39062 3.75 9.2125 3.75 9C3.75 8.7875 3.82187 8.60938 3.96562 8.46562C4.10938 8.32188 4.2875 8.25 4.5 8.25H8.25V4.5C8.25 4.2875 8.32188 4.10938 8.46562 3.96562C8.60938 3.82187 8.7875 3.75 9 3.75C9.2125 3.75 9.39062 3.82187 9.53438 3.96562C9.67812 4.10938 9.75 4.2875 9.75 4.5V8.25H13.5C13.7125 8.25 13.8906 8.32188 14.0344 8.46562C14.1781 8.60938 14.25 8.7875 14.25 9C14.25 9.2125 14.1781 9.39062 14.0344 9.53438C13.8906 9.67812 13.7125 9.75 13.5 9.75H9.75V13.5C9.75 13.7125 9.67812 13.8906 9.53438 14.0344C9.39062 14.1781 9.2125 14.25 9 14.25C8.7875 14.25 8.60938 14.1781 8.46562 14.0344C8.32188 13.8906 8.25 13.7125 8.25 13.5V9.75Z"
                    fill="white"
                  />
                </svg>
                Create New Requisition
              </button>
            </div>

            <RequisitionFilter
              filterData={filterData}
              setFilterData={setFilterData}
            />
            <RequisitionList
              filterData={filterData}
              setFilterData={setFilterData}
              openPreview={openPreview}
              setOpenPreview={setOpenPreview}
              requisitionId={requisitionId}
              setRequisitionId={setRequisitionId}
            />
            {openPreview && (
              <>
                <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <RequisitionPreview
                    setOpenPreview={setOpenPreview}
                    requisitionId={requisitionId}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* {toggle === 1 && <CreateNewRequisition setToggle={setToggle} />} */}
    </div>
  );
}

export default Requisition;
