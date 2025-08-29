import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const DownloadApplicantExcel = (jobDetails, jobData) => {
  if (!jobDetails?.data?.applications?.length) {
    alert("No applicants found");
    return;
  }

  const applications = jobDetails.data.applications;

  const rows = applications.map((app) => {
    const personal = app.details.personal || {};
    const professional = app.details.professional || {};

    const education = (professional.education || [])
      .map(
        (edu) =>
          `${edu.course_name} - ${edu.university_name} (${edu.start_date?.year || ""}/${edu.start_date?.month || ""} - ${edu.end_date?.year || ""}/${edu.end_date?.month || ""})`
      )
      .join("; ");

    const workExp = (professional.work_experience || [])
      .map(
        (we) =>
          `${we.title} @ ${we.company} (${we.start_date?.year || ""}/${we.start_date?.month || ""} - ${we.end_date?.year || ""}/${we.end_date?.month || ""}) - ${we.description}`
      )
      .join("; ");

    const skills = (professional.skills || []).map((s) => s.skill).join(", ");

    return {
      "First Name": personal.firstName || "",
      "Last Name": personal.lastName || "",
      Email: personal.email || "",
      "Mobile No": `${personal.dial_code || ""} ${personal.mobileNo || ""}`,
      Education: education || "",
      "Highest Qualification": professional.hightestQul || "",
      Experience: professional.relevant_experience || "",
      "Work Experience": workExp || "",
      Skills: skills || "",
      Summary: professional.summary || "",
    };
  });

  // Create worksheet & workbook
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 🔹 Adjust column widths
  worksheet["!cols"] = [
    { wch: 15 }, // First Name
    { wch: 15 }, // Last Name
    { wch: 30 }, // Email
    { wch: 20 }, // Mobile No
    { wch: 50 }, // Education (wide)
    { wch: 25 }, // Highest Qualification
    { wch: 50 }, // Experience (wide)
    { wch: 60 }, // Work Experience (wider)
    { wch: 40 }, // Skills (wide)
    { wch: 60 }, // Summary (wide)
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

  // Export file
  const fileName = `${jobData?.jobTitle || "Applicants"}.xlsx`;
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, fileName);
};
