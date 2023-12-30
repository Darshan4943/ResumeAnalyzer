import React, { useState } from 'react';

const DateSelector1 = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear - index);

  return (
    <div>
      <label htmlFor="month">Month:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>

      <label htmlFor="year">Year:</label>
      <select id="year" value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

    
    </div>
  );
};

export default DateSelector1;
