import axios from "axios";
import React, { useEffect, useState } from "react";
import { currenciesWithIcons } from "../../utils/data";

function RequisitionPreview({ setOpenPreview, requisitionId }) {
  const [requisition, setRequisition] = useState([]);

  const fetchRequisition = async () => {
    try {
      const response = await axios.get(
        `https://api.skilotech.com/api/getRequisitionById/${requisitionId}`
      );
      setRequisition(response.data.data);
    } catch (error) {
      console.error("Error fetching requisition:", error);
    }
  };

  useEffect(() => {
    if (requisitionId) {
      fetchRequisition();
    }
  }, [requisitionId]);
  const getCurrencyIcon = (currency) => {
    const icon = currenciesWithIcons?.find(
      (item) => item?.icon?.toLowerCase() === currency?.toLowerCase()
    );

    return icon?.symbol || "";
  };

  const ApprovalLevel = [];
  return (
    <div className="bg-white w-full max-w-[718px] h-[70vh] md:h-[75vh] lg:h-[85vh] overflow-y-auto scrollbar-hide rounded-[16px] p-5 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <div className="text-[16px] font-[500]">
          Requisition Status : ({requisition.status})
        </div>
        <svg
          onClick={() => setOpenPreview(false)}
          className="hover:fill-red-500 transition-all duration-200 cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="transition-all duration-200"
            d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
            fill="#333333"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
          {requisition?.jobTitle && (
            <div className="w-full md:w-[46.58%] flex flex-col gap-1">
              <span className="text-[#646464] text-[10px] font-[500]">
                Job Title
              </span>
              <span className="text-[#333333] text-[14px] font-[600]">
                {requisition.jobTitle}
              </span>
            </div>
          )}
          {requisition?.positions !== null && (
            <div className="w-full md:w-[46.58%] flex flex-col gap-1">
              <span className="text-[#646464] text-[10px] font-[500]">
                Positions
              </span>
              <span className="text-[#333333] text-[14px] font-[600]">
                {requisition.positions}
              </span>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
          {requisition?.isPriority && (
            <div className="w-full md:w-[46.58%] flex flex-col gap-1">
              <span className="text-[#646464] text-[10px] font-[500]">
                Priority
              </span>
              <span className="text-[#333333] text-[14px] font-[600]">
                {requisition.isPriority ? "Yes" : "No"}
              </span>
            </div>
          )}
          {requisition?.budgetFrom !== null && (
            <div className="w-full md:w-[46.58%] flex flex-col gap-1">
              <span className="text-[#646464] text-[10px] font-[500]">
                Budget
              </span>
              <span className="text-[#333333] text-[14px] font-[600]">
                <>
                  {getCurrencyIcon(requisition.currency)}{" "}
                  {requisition.budgetFrom || 0} -{" "}
                  {getCurrencyIcon(requisition.currency)}{" "}
                  {requisition.budgetTo || ""}
                </>
              </span>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
          {requisition?.location && (
            <div className="w-full md:w-[46.58%] flex flex-col gap-1">
              <span className="text-[#646464] text-[10px] font-[500]">
                Location
              </span>
              <span className="text-[#333333] text-[14px] font-[600]">
                {requisition.location.join(", ")}
              </span>
            </div>
          )}

          {requisition?.department && (
            <div className="w-full md:w-[46.58%] flex flex-col gap-1">
              <span className="text-[#646464] text-[10px] font-[500]">
                Department
              </span>
              <span className="text-[#333333] text-[14px] font-[600]">
                {requisition.department}
              </span>
            </div>
          )}
        </div>

        {requisition?.hiringDate && (
          <div className="w-full flex flex-col gap-1">
            <span className="text-[#646464] text-[10px] font-[500]">
              Hiring Date
            </span>
            <span className="text-[#333333] text-[14px] font-[600]">
              {new Date(requisition.hiringDate).toISOString().split("T")[0]}
            </span>
          </div>
        )}

        <div className="w-full flex flex-col gap-2">
          <span className="text-[#333333] text-[14px] font-[600]">
            Approval
          </span>

          {requisition?.RequisitionLevel?.length > 0 && (
            <>
              {requisition.RequisitionLevel.map((item, index) => (
                <div key={index} className="w-full flex flex-col gap-[4px]">
                  <span className="text-[#646464] text-[10px] font-[500] gap-2">
                    Level {index + 1} ({item.status})
                  </span>
                  <span className="text-[#333333] text-[14px] font-[600]">
                    {item.name}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        {requisition?.comments && (
          <div className="w-full flex flex-col gap-2">
            <span className="text-[#333333] text-[14px] font-[600]">
              Additional Comments
            </span>
            <span className="text-[#646464] text-[12px] font-[400]">
              {requisition.comments}
            </span>
          </div>
        )}

        <div className="h-[1px] w-full bg-[#DEDEDE]" />

        {requisition?.description && (
          <div className="flex flex-col gap-2">
            <span className="text-[#333333] text-[14px] font-[600]">
              Job Description
            </span>
            <div
              className="text-[#333333] text-[12px] font-[400]"
              dangerouslySetInnerHTML={{ __html: requisition.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RequisitionPreview;
