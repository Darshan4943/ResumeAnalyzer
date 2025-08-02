import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const JdDataExport = ({ resumeList }) => {
  const downloadExcel = () => {
    // Format data with skills and matching parameters
    const formattedData = resumeList.map((item) => {
      const mpArray = item.matching_parameters || [];

      const matchingDetails = mpArray
        .map(
          (mp) =>
            `${mp.title}\nMatching Points: ${mp.matching_points}\n\n${mp.description}`
        )
        .join('\n\n------------------------------------\n\n');

      return {
        Name: item.name,
        Email: item.email,
        Mobile: item.mobile,
        Location: item.location,
        Qualification: item.highestQualification,
        Experience: item.totalExperience,
        CurrentJob: item.currentJob,
        Designation: item.designation,
        MatchingPercentage: item.matching_percentage,
        ResumeFileName: item.fileName,
        ResumeURL: item.file,
        Skills: Array.isArray(item.skills) ? item.skills.join(', ') : item.skills,
        About: item.about,
        Conclusion: item.conclusion,
        MatchingParameters: matchingDetails,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Set custom column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 18 }, // Mobile
      { wch: 18 }, // Location
      { wch: 22 }, // Qualification
      { wch: 18 }, // Experience
      { wch: 22 }, // CurrentJob
      { wch: 22 }, // Designation
      { wch: 20 }, // MatchingPercentage
      { wch: 30 }, // ResumeFileName
      { wch: 60 }, // ResumeURL
      { wch: 50 }, // Skills
      { wch: 40 }, // About
      { wch: 70 }, // Conclusion
      { wch: 100 }, // MatchingParameters (long content)
    ];

    // Apply wrapText and top alignment to all cells
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cell_address]) continue;

        worksheet[cell_address].s = {
          alignment: {
            wrapText: true,
            vertical: 'top',
          },
        };
      }
    }

    // Create workbook and append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumes');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true, // necessary for styling
    });

    const data = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(data, 'Resume_List.xlsx');
  };

  return (
    <div>
      <button
        onClick={downloadExcel}
        className="px-6 rounded-[30px] h-[40px] text-[14px]"
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
        }}
      >
        Download
      </button>
    </div>
  );
};

export default JdDataExport;
