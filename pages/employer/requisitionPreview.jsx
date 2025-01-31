import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RequisitionPreview({ setOpenPreview, requisitionId }) {
  console.log("requisitionId", requisitionId)
  const [requisition, setRequisition] = useState([]);


  const fetchRequisition = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/getRequisitionById/${requisitionId}`);
      console.log("object", response.data.data)
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
  console.log("requisition", requisition)

  const ApprovalLevel = [

  ]

  return (
    <div className='bg-[#FFFFFF] max-w-[718px]  min-w-[718px] h-[85vh] overflow-scroll scrollbar-hide rounded-[16px] p-4 pb-6 flex flex-col gap-4'>
      <div className='flex w-full justify-end '>
        <svg
          onClick={() => setOpenPreview(false)}
          className="hover:fill-red-500 transition-all duration-200"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#mask0_6706_82032)">
            <path
              className="group-hover:fill-red-500 transition-all duration-200"
              d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
              fill="#333333"
            />
          </g>
        </svg>
      </div>
      <div className='w-full flex justify-between'>
        {requisition?.jobTitle?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Job Title</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.jobTitle}</span>
          </div>}
        {requisition?.positions?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Number of Positions</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.positions}</span>
          </div>}
      </div>
      <div className='w-full flex justify-between'>
        {requisition?.isPriority?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Mark as Priority</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.isPriority ? "Yes" : "No"}</span>
          </div>}
        {(requisition?.budgetFrom?.length == 0) && (requisition?.budgetTo?.length === 0) ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Budget</span>
            <span className='text-[#333333] text-[12px] font-[500]'>${requisition.budgetFrom}-${requisition.budgetTo}</span>
          </div>}
      </div>
      <div className='w-full flex justify-between'>
        {requisition?.location?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Location</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.location}</span>
          </div>}
        {requisition?.department?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Department</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.department}</span>
          </div>}
      </div>
      <div className='w-full flex justify-between'>
        {requisition?.experience?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Experience</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.experience} Years</span>
          </div>}
        {requisition?.jobType?.length === 0 ? "" :
          <div className='w-[46.58%] flex flex-col gap-2'>
            <span className='text-[#646464] text-[12px] font-[500]'>Job Type</span>
            <span className='text-[#333333] text-[12px] font-[500]'>{requisition.jobType}</span>
          </div>}
      </div>
      {requisition?.hiringDate?.length === 0 ? "" :
        <div className='w-full flex flex-col gap-2'>
          <span className='text-[#646464] text-[12px] font-[500]'>Target Hiring Date</span>
          <span className='text-[#333333] text-[12px] font-[500]'>{requisition.hiringDate}</span>
        </div>}
      {requisition?.RequisitionLevel?.name?.length === 0 ? "" :
        <div className='w-full flex flex-col gap-2'>
          <span className='text-[#333333] text-[12px] font-[600]'>Approval</span>
          {requisition.RequisitionLevel?.map((item, index) => (
            <div key={index} className="w-full flex flex-col gap-[2px]">
              <span className="text-[#646464] text-[12px] font-[400]">Level {index + 1}</span>
              <span className="text-[#333333] text-[14px] font-[500]">{item.name}</span>
            </div>
          ))}
        </div>}
      {requisition?.comments?.length === 0 ? "" :
        <div className='w-full flex flex-col gap-2'>
          <span className='text-[#333333] text-[14px] font-[500]'>Additional Comments</span>
          <span className='text-[#646464] text-[12px] font-[400]'>{requisition?.comments}</span>
        </div>}
      <div className='h-[1px] w-full bg-[#DEDEDE] ' />
      {requisition?.description?.length === 0 ? "" :
        <div className='flex flex-col gap-2'>
          <span className='text-[#333333] text-[14px] font-[500]'>Job Description</span>
          <span className='text-[#333333] text-[12px] font-[400]'>{requisition?.description}</span>
        </div>}
    </div>
  )
}

export default RequisitionPreview
