import React from "react";
import ReactDOMServer from "react-dom/server";
import Template2 from "../components/featured/resumeTemplates/Template2";
import Template3 from "../components/featured/resumeTemplates/Template3";
import Template4 from "../components/featured/resumeTemplates/Template4";
import Template5 from "../components/featured/resumeTemplates/Template5";
import Template9 from "../components/featured/resumeTemplates/Template9";
import Template7 from "../components/featured/resumeTemplates/Template7";
import Template6 from "../components/featured/resumeTemplates/Template6";
import Template12 from "../components/featured/resumeTemplates/Template12";
import Template15 from "../components/featured/resumeTemplates/Template15";
import Template18 from "../components/featured/resumeTemplates/Template18";
import Template17 from "../components/featured/resumeTemplates/Template17";
import Template8 from "../components/featured/resumeTemplates/Template8";
import Template10 from "../components/featured/resumeTemplates/Template10";
import Template20 from "../components/featured/resumeTemplates/Template20";
import Template11 from "../components/featured/resumeTemplates/Template11";
import Template19 from "../components/featured/resumeTemplates/Template19";
import Template13 from "../components/featured/resumeTemplates/Template13";

import Template14 from "../components/featured/resumeTemplates/Template14";
import Template16 from "../components/featured/resumeTemplates/Template16";
import Template1 from "../components/featured/resumeTemplates/Template1";

export function camelCase(str) {
  return str
    ?.toLowerCase() // Convert the entire string to lowercase
    .replace(/\b\w/g, function (word) {
      return word.toUpperCase(); // Convert the first character of each word to uppercase
    });
}

export const dateFormatter = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function timeAgo(date) {
  const currentDate = new Date();
  const timestamp = date.getTime();
  const currentTimestamp = currentDate.getTime();
  const difference = currentTimestamp - timestamp;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
}

export function formatDate(inputDate) {
  const dateObj = new Date(inputDate);
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = dateObj.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const generatePDFUsingRenderer = async (MyDocument) => {
  // Render the PDF document to a blob
  const pdfBlob = await new Promise((resolve) => {
    const doc = React.createElement(<MyDocument />);
    const blob = new Blob([ReactDOMServer.renderToStaticMarkup(doc)], {
      type: "application/pdf",
    });
    resolve(blob);
  });

  return pdfBlob;
};

export const selectResumeTemplate = (
  index,
  data,
  selectedColor,
  selectedFont,
  preview
) => {
  switch (index) {
    case 1:
      return (
        <Template1
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 2:
      return (
        <Template2
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 3:
      return (
        <Template3
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 4:
      return (
        <Template4
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 5:
      return (
        <Template5
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 6:
      return (
        <Template6
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 7:
      return (
        <Template7
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 8:
      return (
        <Template8
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 9:
      return (
        <Template9
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 10:
      return (
        <Template10
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 11:
      return (
        <Template11
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 12:
      return (
        <Template12
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 13:
      return (
        <Template13
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 14:
      return (
        <Template14
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 15:
      return (
        <Template15
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 16:
      return (
        <Template16
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 17:
      return (
        <Template17
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 18:
      return (
        <Template18
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 19:
      return (
        <Template19
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 20:
      return (
        <Template20
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
  }
};
