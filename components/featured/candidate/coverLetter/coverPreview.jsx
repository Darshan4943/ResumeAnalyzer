import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CoverLetter11 from "./letters/CoverLetter11"; // Adjust import path as necessary
import FileNameModel from "../createResume/components/fileNameModel";
import CoverLetter from "./letters/CoverLetter";
import CoverLetter3 from "./letters/CoverLetter3";
import CoverLetter5 from "./letters/CoverLetter5";
import CoverLetter7 from "./letters/CoverLetter7";
import CoverLetter9 from "./letters/CoverLetter9";
import CoverLetter10 from "./letters/CoverLetter10";
import CoverLetter2 from "./letters/CoverLetter2";
import CoverLetter4 from "./letters/CoverLetter4";
import CoverLetter6 from "./letters/CoverLetter6";
import CoverLetter8 from "./letters/CoverLetter8";

function CoverPreview({ data }) {
  const [namePreview, setNamePreview] = useState(false);
  const [name, setName] = useState(data.firstName + "_resume");
  const [blob, setBlob] = useState("");
  const userDataGlobal = useSelector((state) => state.userData);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [download, setDownload] = useState(false);
  console.log(download);
  const [loading1, setLoading1] = useState(false);

  const addCoverLetter = async () => {
    try {
      const pdfBlob = await generatePdfBlob();
      if (!pdfBlob) {
        return;
      }

      const formData = new FormData();
      if (Object.keys(data).length > 0) {
        Object.keys(data).map((key) => {
          if (Array.isArray(data[key]) && data[key].length > 0) {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            if (data[key] != undefined) {
              formData.append(key, data[key]);
            }
          }
        });
      }
      formData.append("pdfBlob", pdfBlob);
      formData.append("userId", userDataGlobal._id);
      formData.append("fileName", name);

      const response = await axios.post(
        "http://localhost:2000/api/cover/add",
        formData
      );
      toast.success("Cover Letter added successfully");
      setLoading(false);
      setLoading1(false);
      setDownload(false);
      return response.data;
    } catch (error) {
      console.error("Error adding cover letter:", error);
      toast.error("Error adding cover letter");
      setLoading(false);
      setLoading1(false);
    }
  };

  const generatePdfBlob = async () => {
    const input1 = page1Ref.current;
    const input2 = page2Ref.current;

    try {
      const canvas1 = await html2canvas(input1, { scale: 5 });
      const imgData1 = canvas1.toDataURL("image/jpeg", 0.7);

      const canvas2 = await html2canvas(input2, { scale: 5 });
      const imgData2 = canvas2.toDataURL("image/jpeg", 0.7);

      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData1, "JPEG", 0, 0, 595.28, 841.89);
      pdf.addPage();
      pdf.addImage(imgData2, "JPEG", 0, 0, 595.28, 841.89);

      const pdfBlob = pdf.output("blob");

      return pdfBlob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    }
  };

  const downloadPdfBlob = async () => {
    const input1 = page1Ref.current;
    const input2 = page2Ref.current;

    try {
      const canvas1 = await html2canvas(input1, { scale: 5 });
      const imgData1 = canvas1.toDataURL("image/jpeg", 0.7);

      const canvas2 = await html2canvas(input2, { scale: 5 });
      const imgData2 = canvas2.toDataURL("image/jpeg", 0.7);

      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData1, "JPEG", 0, 0, 595.28, 841.89);
      pdf.addPage();
      pdf.addImage(imgData2, "JPEG", 0, 0, 595.28, 841.89);

      const pdfBlob = pdf.output("blob");

      pdf.save(`${data.firstName}_cover_letter.pdf`);
      setDownload(false);

      return pdfBlob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    }
  };

  const handleDownload = async () => {
    const pdfBlob = await downloadPdfBlob();
    if (pdfBlob) {
      await addCoverLetter(pdfBlob);
      console.log("PDF downloaded successfully");
    } else {
      console.error("Failed to download PDF");
      setLoading(false);
      setLoading1(false);
    }
  };

  const handleSave = async () => {
    const pdfBlob = await generatePdfBlob();
    if (pdfBlob) {
      await addCoverLetter(pdfBlob);
    } else {
      console.error("Failed to generate PDF");
      setLoading(false);
      setLoading1(false);
    }
  };
  const DownloadButton = () => (
    <button
      onClick={() => {
        handleDownload();
        setLoading1(true);
      }}
      className="hover:bg-[#06A9EF] hover-svg-white h-[38.33px] hover:text-[white] flex gap-1 text-[14px] w-fit justify-center font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF]"
      disabled={loading1}
      style={{ opacity: loading1 ? "0.5" : 1 }}
    >
      {loading1 ? (
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-4 h-4  animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          className=""
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#mask0_635_20356)">
            <path
              d="M9.99967 13.333L5.83301 9.16634L6.99967 7.95801L9.16634 10.1247V3.33301H10.833V10.1247L12.9997 7.95801L14.1663 9.16634L9.99967 13.333ZM4.99967 16.6663C4.54134 16.6663 4.14898 16.5031 3.82259 16.1768C3.4962 15.8504 3.33301 15.458 3.33301 14.9997V12.4997H4.99967V14.9997H14.9997V12.4997H16.6663V14.9997C16.6663 15.458 16.5031 15.8504 16.1768 16.1768C15.8504 16.5031 15.458 16.6663 14.9997 16.6663H4.99967Z"
              fill="#333333"
            />
          </g>
        </svg>
      )}
    </button>
  );

  return (
    <div className="flex flex-col gap-4 relative h-[88vh] ">
      <div className="flex justify-between sticky top-0">
        <div className="flex items-center justify-between ml:w-[58%] w-full gap-4">
          <div
            className="text-[14px] scr460:text-[20px] font-montserrat font-medium flex gap-3 items-center cursor-pointer"
            onClick={() => setNamePreview(true)}
          >
            <p>{name}</p>
            <svg
              className="mt-2"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <g mask="url(#mask0_5925_110931)">
                <path
                  d="M4.66404 15.8317H5.71531L14.2458 7.30121L13.1945 6.24994L4.66404 14.7804V15.8317ZM3.41406 17.0817V14.2612L14.4061 3.27402C14.5321 3.15956 14.6712 3.07112 14.8235 3.00868C14.9757 2.94625 15.1354 2.91504 15.3025 2.91504C15.4696 2.91504 15.6314 2.94469 15.7881 3.004C15.9447 3.06329 16.0834 3.15757 16.2041 3.28683L17.2217 4.31727C17.351 4.43799 17.4431 4.57691 17.4981 4.73402C17.5532 4.89112 17.5807 5.04821 17.5807 5.20531C17.5807 5.37288 17.5521 5.5328 17.4948 5.68506C17.4376 5.83734 17.3466 5.97648 17.2217 6.1025L6.23454 17.0817H3.41406ZM13.7109 6.78479L13.1945 6.24994L14.2458 7.30121L13.7109 6.78479Z"
                  fill="#646464"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              handleSave();
              setLoading(true);
            }}
            className="flex gap-1 h-[38.33px] text-[14px] w-[150px] justify-center text-[#FFF] font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4  animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              " Save"
            )}
          </button>
          <DownloadButton />
        </div>
      </div>
      <div className="   overflow-auto ">
        <CoverLetter8 data={data} />
      </div>
      <div className="absolute  left-[10000px]">
        <CoverLetter8 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
      </div>

      {namePreview && (
        <FileNameModel
          data={data}
          setNamePreview={setNamePreview}
          setFunction={(data) => setName(data)}
          clientId={clientId}
        />
      )}
    </div>
  );
}

export default CoverPreview;
