import { useState } from 'react';
import axios from 'axios';

const DateSelectorComponent = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleDownload = async () => {
    try {
      const requestData = isAllSelected ? {} : { startDate, endDate };
      const response = await axios.post('https://dev.api.skilotech.com/api/apiLogs/download', requestData, {
        responseType: 'blob', // Important to receive the response as a Blob (binary data)
      });

      // Create a URL for the file and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'api_logs.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading logs:', error);
      alert('Failed to download logs. Please try again.');
    }
  };

  const handleAllSelection = () => {
    setIsAllSelected(!isAllSelected);
    if (!isAllSelected) {
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md customMargins mt-12">
      <h3 className="text-lg font-semibold mb-4">Download API Logs</h3>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={handleAllSelection}
          className="form-checkbox mr-2"
        />
        <span>Select All</span>
      </label>

      {!isAllSelected && (
        <div className="space-y-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleDownload}
        className="mt-4 buttons font-[500] bg-[#06A9EF] text-white bg_Button w-full"
      >
        Download Logs
      </button>
    </div>
  );
};

export default DateSelectorComponent;
