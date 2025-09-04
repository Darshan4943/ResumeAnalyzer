import React from 'react';

function Jobs() {
    const downloadExcel = async () => {
  try {
    const response = await fetch("https://api.skilotech.com/api/download-applications-jobs", {
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to download");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications_jobs.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("❌ Error downloading Excel:", error);
  }
};

  return (
    <div className=' w-full pt-12 flex justify-center items-center '>
        <button onClick={downloadExcel} className='h-[40px] bg_Button px-4 rounded-[30px]'>
            Download Jobs
        </button>
      
    </div>
  );
}

export default Jobs;
