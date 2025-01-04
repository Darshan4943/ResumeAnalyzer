import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { DesignationSVG, DocSVG } from "../../../../../utils/svg";
import Progress_bar from "../../../jobMatching/ProgressBar";
import ResumePreview from "../../../../common/ResumePreview";
import Image from "next/image";
import MatchingDetails from "../../../jobMatching/matchingDetails";
import {
  convertBytes,
  fileIconSeter,
  getFileSize,
} from "../../../../../utils/middleware";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function FileSizeDisplay({ fileUrl }) {
  const [fileSize, setFileSize] = useState(null);

  useEffect(() => {
    const getFileSize = async () => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const size = response.headers.get("content-length");
        setFileSize(parseInt(size, 10));
      } catch (error) {
        console.error("Error calculating file size:", error);
      }
    };

    getFileSize();
  }, [fileUrl]);

  return <span>{convertBytes(fileSize)}</span>;
}

const JdMatching = ({ details, resumeList, isAnimate, setShowsideBar }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  function getAllFiles(obj) {
    let files = [];

    function traverse(node) {
      if (node.type === "file") {
        files.push({
          ...node,
        });
      } else if (node.files && node.files.length > 0) {
        files.push({
          ...node,
        });
        node.files.forEach((child) => traverse(child));
      }
    }

    traverse(obj);
    return files;
  }
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [borderline, setBorderLine] = useState(false);
  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setBorderLine(true);

      const timeout2 = setTimeout(() => {
        setBorderLine(false);
      }, 1500);

      return () => clearTimeout(timeout2);
    }, 2000);

    return () => clearTimeout(timeout1);
  }, []);

 

  return (
    <div className="flex flex-col gap-4  min-h-[100vh] ">
      {selectedFile && showDetails === true && (
        <MatchingDetails
          data={selectedFile}
          setSelectedFile={setSelectedFile}
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
      )}
      {preview && (
        <>
          <ResumePreview
            selectedResumeIndex={selected.resumeTemplateIndex}
            data={selected}
            selectedColor={selected.selectedColor}
            selectedFont={selected.selectedFont}
            setPreview={setPreview}
            preview={true}
          />
        </>
      )}
     
    </div>
  );
};

export default JdMatching;
