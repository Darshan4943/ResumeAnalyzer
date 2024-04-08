import React, { useState } from "react";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div
        className="min-h-[90vh] my-[16px] rounded-[16px] customMargins flex flex-col gap-[16px] py-[24px] "
        style={{ boxShadow: " 0px 1px 2px 0px #00000040" }}
      >
        <div
          className="flex flex-row gap-[40px] px-[24px]"
          style={{ borderBottom: "1px solid #bebebe" }}
        >
          <div
            className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
            onClick={() => setTab(0)}
            style={{
              borderBottom: `4px solid ${tab == 0 ? "#06A9EF" : "white"}`,
            }}
          >
            Job Details
          </div>
          <div
            className="text-[16px] font-semibold text-[#333333] pb-[8px] cursor-pointer "
            onClick={() => setTab(1)}
            style={{
              borderBottom: `4px solid ${tab == 1 ? "#06A9EF" : "white"}`,
            }}
          >
            Applicants
          </div>
        </div>
        {/* {tab == 0 && <Details applications={applications} jobPost={jobPost} />}
        {tab == 1 && (
          <Applications applications={applications} jobPost={jobPost} />
        )} */}
      </div>
    </>
  );
};

export default AdminDashboard;
