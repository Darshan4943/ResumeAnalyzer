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
import Template32 from "../components/featured/resumeTemplates/Template32";
import Template39 from "../components/featured/resumeTemplates/Template39";
import Template44 from "../components/featured/resumeTemplates/Template44";
import Template48 from "../components/featured/resumeTemplates/Template48";
import { DocSVG, DocSVG1, PDFSvg, PDFSvg1, PNGICON, PNGICON1 } from "./svg";

export function camelCase(str) {
  if (typeof str !== "string") return ""; 
  return str
    .toLowerCase()
    .replace(/\b\w/g, (word) => word.toUpperCase());
}

export const dateSeter = (date) => {
  const monthLater = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  return `${day} ${monthLater[month]} ${year} `;
};
export const fileIconSeter = (data) => {
  if (
    data?.fileName?.includes("docx") ||
    data?.fileName?.toLowerCase()?.includes("doc")
  ) {
    return <DocSVG />;
  } else if (data?.fileName?.toLowerCase()?.includes("pdf")) {
    return <PDFSvg />;
  } else if (
    data?.fileName?.includes("png") ||
    data?.fileName?.includes("jpg") ||
    data?.fileName?.includes("jpeg")
  ) {
    return <PNGICON />;
  } else {
    return (
      <svg
        className="min-w-[28px] min-h-[28px]"
        width="50"
        height="44"
        viewBox="0 0 57 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg "
      >
        <path
          d="M50.4997 7.99998H29.7362L27.3944 3.31641C26.8987 2.31758 26.1333 1.47753 25.1847 0.891397C24.2361 0.305266 23.1423 -0.00351467 22.0273 3.01816e-05H6.49996C4.90921 0.00177713 3.38411 0.634475 2.25928 1.75931C1.13445 2.88414 0.501747 4.40924 0.5 5.99999V41.9998C0.501747 43.5905 1.13445 45.1156 2.25928 46.2405C3.38411 47.3653 4.90921 47.998 6.49996 47.9997H50.4997C52.0904 47.998 53.6155 47.3653 54.7404 46.2405C55.8652 45.1156 56.4979 43.5905 56.4996 41.9998V13.9999C56.4979 12.4092 55.8652 10.8841 54.7404 9.75926C53.6155 8.63443 52.0904 8.00173 50.4997 7.99998Z"
          fill="#4294FF"
        />
        <path
          d="M51.9597 47.7996C51.4854 47.9373 50.9935 48.0047 50.4997 47.9996H6.49996C4.9101 47.995 3.38668 47.3614 2.26248 46.2371C1.13827 45.1129 0.504644 43.5895 0.5 41.9997V5.99989C0.499548 4.7876 0.868792 3.60401 1.55846 2.60702C2.24814 1.61003 3.22544 0.847069 4.35998 0.419922C9.95994 16.1198 23.0599 40.0197 51.9597 47.7996Z"
          fill="#2965ED"
        />
      </svg>
    );
  }
};
export const fileIconSeter1 = (data) => {
  if (
    data?.fileName?.includes("docx") ||
    data?.fileName?.toLowerCase()?.includes("doc")
  ) {
    return <DocSVG1 />;
  } else if (data?.fileName?.toLowerCase()?.includes("pdf")) {
    return <PDFSvg1 />;
  } else if (
    data?.fileName?.includes("png") ||
    data?.fileName?.includes("jpg") ||
    data?.fileName?.includes("jpeg")
  ) {
    return <PNGICON1 />;
  } else {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 57 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg "
      >
        <path
          d="M50.4997 7.99998H29.7362L27.3944 3.31641C26.8987 2.31758 26.1333 1.47753 25.1847 0.891397C24.2361 0.305266 23.1423 -0.00351467 22.0273 3.01816e-05H6.49996C4.90921 0.00177713 3.38411 0.634475 2.25928 1.75931C1.13445 2.88414 0.501747 4.40924 0.5 5.99999V41.9998C0.501747 43.5905 1.13445 45.1156 2.25928 46.2405C3.38411 47.3653 4.90921 47.998 6.49996 47.9997H50.4997C52.0904 47.998 53.6155 47.3653 54.7404 46.2405C55.8652 45.1156 56.4979 43.5905 56.4996 41.9998V13.9999C56.4979 12.4092 55.8652 10.8841 54.7404 9.75926C53.6155 8.63443 52.0904 8.00173 50.4997 7.99998Z"
          fill="#4294FF"
        />
        <path
          d="M51.9597 47.7996C51.4854 47.9373 50.9935 48.0047 50.4997 47.9996H6.49996C4.9101 47.995 3.38668 47.3614 2.26248 46.2371C1.13827 45.1129 0.504644 43.5895 0.5 41.9997V5.99989C0.499548 4.7876 0.868792 3.60401 1.55846 2.60702C2.24814 1.61003 3.22544 0.847069 4.35998 0.419922C9.95994 16.1198 23.0599 40.0197 51.9597 47.7996Z"
          fill="#2965ED"
        />
      </svg>
    );
  }
};
export const fileIconSeter2 = (data) => {
  if (
    data?.file?.name?.includes("docx") ||
    data?.file?.name?.toLowerCase()?.includes("doc")
  ) {
    return <DocSVG1 />;
  } else if (data?.file?.name?.toLowerCase()?.includes("pdf")) {
    return <PDFSvg1 />;
  } else if (
    data?.file?.name?.includes("png") ||
    data?.file?.name?.includes("jpg") ||
    data?.file?.name?.includes("jpeg")
  ) {
    return <PNGICON1 />;
  } else {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 57 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg "
      >
        <path
          d="M50.4997 7.99998H29.7362L27.3944 3.31641C26.8987 2.31758 26.1333 1.47753 25.1847 0.891397C24.2361 0.305266 23.1423 -0.00351467 22.0273 3.01816e-05H6.49996C4.90921 0.00177713 3.38411 0.634475 2.25928 1.75931C1.13445 2.88414 0.501747 4.40924 0.5 5.99999V41.9998C0.501747 43.5905 1.13445 45.1156 2.25928 46.2405C3.38411 47.3653 4.90921 47.998 6.49996 47.9997H50.4997C52.0904 47.998 53.6155 47.3653 54.7404 46.2405C55.8652 45.1156 56.4979 43.5905 56.4996 41.9998V13.9999C56.4979 12.4092 55.8652 10.8841 54.7404 9.75926C53.6155 8.63443 52.0904 8.00173 50.4997 7.99998Z"
          fill="#4294FF"
        />
        <path
          d="M51.9597 47.7996C51.4854 47.9373 50.9935 48.0047 50.4997 47.9996H6.49996C4.9101 47.995 3.38668 47.3614 2.26248 46.2371C1.13827 45.1129 0.504644 43.5895 0.5 41.9997V5.99989C0.499548 4.7876 0.868792 3.60401 1.55846 2.60702C2.24814 1.61003 3.22544 0.847069 4.35998 0.419922C9.95994 16.1198 23.0599 40.0197 51.9597 47.7996Z"
          fill="#2965ED"
        />
      </svg>
    );
  }
};
export const dateFormatter = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatInterviewDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
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
export function convertBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB"];
  if (bytes == 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
export const getFileSize = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.headers.get("content-length");
    })
    .then((size) => {
      return parseInt(size, 10);
    });
};

export const formatLink = (link) => {
  if (link?.length > 25) {
    return link?.match(/.{1,25}/g).join("\n");
  }
  return link;
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
    case 32:
      return (
        <Template32
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 39:
      return (
        <Template39
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 44:
      return (
        <Template44
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
    case 48:
      return (
        <Template48
          data={data}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
          preview={preview}
        />
      );
  }
};

export const daysCalculator = (date) => {
  const givenDate = new Date(date);

  const today = new Date();
  const difference = today - givenDate;
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (daysDifference < 1) {
    return "Today";
  } else if (daysDifference < 2) {
    return "Yesterday";
  } else if (daysDifference < 7) {
    return `${daysDifference} days ago`;
  } else if (daysDifference < 30) {
    const weeks = Math.floor(daysDifference / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (daysDifference < 365) {
    const months = Math.floor(daysDifference / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(daysDifference / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};

export const coverLetters = [
  {
    title: "Cover1",
    imgUrl: "/images/coverLetter/Cover-letter-1.png",
    index: 1,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover2",
    imgUrl: "/images/coverLetter/Cover-letter-2.png",
    index: 2,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover3",
    imgUrl: "/images/coverLetter/Cover-letter-3.png",
    index: 3,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover4",
    imgUrl: "/images/coverLetter/Cover-letter-4.png",
    index: 4,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover5",
    imgUrl: "/images/coverLetter/Cover-letter-5.png",
    index: 5,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover6",
    imgUrl: "/images/coverLetter/Cover-letter-6.png",
    index: 6,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover7",
    imgUrl: "/images/coverLetter/Cover-letter-7.png",
    index: 7,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover8",
    imgUrl: "/images/coverLetter/Cover-letter-8.png",
    index: 8,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover9",
    imgUrl: "/images/coverLetter/Cover-letter-9.png",
    index: 9,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover10",
    imgUrl: "/images/coverLetter/Cover-letter-10.png",
    index: 10,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover11",
    imgUrl: "/images/coverLetter/Cover-letter-11.png",
    index: 11,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Cover13",
    imgUrl: "/images/coverLetter/Cover-letter-13.png",
    index: 12,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
];
