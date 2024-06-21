import React, { useEffect, useRef, useState } from "react";
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
import CoverLetter13 from "./letters/CoverLatter13";
import LimitUsedModal from "../../../models/limitUsedModal";

function CoverPreview({ data, clientId, selectedCoverIndex }) {
  const [namePreview, setNamePreview] = useState(false);
  const [name, setName] = useState(data.firstName + "_cover");
  const [blob, setBlob] = useState("");
  const userDataGlobal = useSelector((state) => state.userData);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const [loading, setLoading] = useState(false);

  const [download, setDownload] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [minZoomLevel, setMinZoomLevel] = useState(0.5);
  const [maxZoomLevel, setMaxZoomLevel] = useState(2);
  const [saveLimit, setSaveLimit] = useState(0);
  const [downloadLimit, setDownloadLimit] = useState(0);
  const [limitUsedModal, setLimitUsedModal] = useState(false);
  const getLimits = () => {
    const downloadCount = localStorage.getItem("downloadCount");
    const saveCount = localStorage.getItem("saveCount");
    if (downloadCount) {
      setDownloadLimit(downloadCount);
    }
    if (saveCount) {
      setSaveLimit(saveCount);
    }
  };

  useEffect(() => {
    getLimits();
  }, []);

  const updateZoomLimits = () => {
    const width = window.innerWidth;

    if (width >= 1024) {
      setMinZoomLevel(0.35);
      setMaxZoomLevel(1.5);
    } else if (width >= 768) {
      setMinZoomLevel(0.5);
      setMaxZoomLevel(1.05);
    } else if (width >= 425) {
      setMinZoomLevel(0.75);
      setMaxZoomLevel(0.65);
    } else if (width >= 375) {
      setMinZoomLevel(0.55);
      setMaxZoomLevel(0.75);
    } else {
      setMinZoomLevel(0.25);
      setMaxZoomLevel(1.5);
    }
  };

  const updateInitialZoomLevel = () => {
    const width = window.innerWidth;

    if (width >= 1024) {
      setZoomLevel(1);
    } else if (width >= 768) {
      setZoomLevel(1.05);
    } else if (width >= 790) {
      setZoomLevel(0.94);
    } else if (width >= 425) {
      setZoomLevel(0.65);
    } else if (width >= 375) {
      setZoomLevel(0.55);
    } else if (width >= 320) {
      setZoomLevel(0.44);
    } else {
      setZoomLevel(0.25);
    }
  };

  useEffect(() => {
    updateZoomLimits();
    updateInitialZoomLevel();
    window.addEventListener("resize", updateZoomLimits);
    return () => window.removeEventListener("resize", updateZoomLimits);
  }, []);

  const zoomIn = () => {
    setZoomLevel((prevZoomLevel) =>
      Math.min(prevZoomLevel + 0.1, maxZoomLevel)
    );
  };

  const zoomOut = () => {
    setZoomLevel((prevZoomLevel) =>
      Math.max(prevZoomLevel - 0.1, minZoomLevel)
    );
  };

  const addCoverLetter = async () => {
    try {
      const pdfBlob = await generatePdfBlob();
      if (!pdfBlob) {
        return;
      }
      if (saveLimit <= 0) {
        setLoading(false);
        setLoading1(false);
        setLimitUsedModal(true);
      
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
      formData.append("UserId", userDataGlobal._id);
      formData.append("pdfBlob", pdfBlob);
      if (userDataGlobal.role === "user") {
        formData.append("userId", userDataGlobal._id);
      } else if (userDataGlobal.role === "recruiter") {
        formData.append("userId", clientId);
        // formData.append("recruiterId", userDataGlobal._id);
      }

      formData.append("fileName", name);

      const response = await axios.post(
        "https://jamblix.com/api/cover/add",
        formData
      );

      localStorage.setItem("saveCount", saveLimit - 1);
      getLimits();
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

  const callData = () => {
    const id = userDataGlobal.role === "user" ? userDataGlobal?._id : clientId;
    if (id) {
      axios
        .get("https://jamblix.com/api/cover/get/" + id)

        .then((res) => {
          // Remove .pdf extension from filenames

          setName(data.firstName + "_cover " + (res.data.data.length + 1));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    callData();
    setName(data.firstName + "_cover");
  }, [userDataGlobal, data.firstName]);

  const generatePdfBlob = async () => {
    if (!page1Ref.current) {
      console.error("Reference to page 1 is not set.");
      return null;
    }

    const input1 = page1Ref.current;
    const input2 = page2Ref.current;

    try {
      const canvas1 = await html2canvas(input1, { scale: 5 });
      const imgData1 = canvas1.toDataURL("image/jpeg", 0.7);

      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData1, "JPEG", 0, 0, 595.28, 841.89);

      if (input2) {
        const canvas2 = await html2canvas(input2, { scale: 5 });
        const imgData2 = canvas2.toDataURL("image/jpeg", 0.7);
        pdf.addPage();
        pdf.addImage(imgData2, "JPEG", 0, 0, 595.28, 841.89);
      }

      const pdfBlob = pdf.output("blob");

      return pdfBlob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    }
  };

  //downloadw
 
  const downloadPdfBlob = async () => {
    const input1 = page1Ref.current;
    const input2 = page2Ref.current;

    try {
      const canvas1 = await html2canvas(input1, { scale: 5 });
      const imgData1 = canvas1.toDataURL("image/jpeg", 0.7);

      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData1, "JPEG", 0, 0, 595.28, 841.89);

      if (input2) {
        const canvas2 = await html2canvas(input2, { scale: 5 });
        const imgData2 = canvas2.toDataURL("image/jpeg", 0.7);
        pdf.addPage();
        pdf.addImage(imgData2, "JPEG", 0, 0, 595.28, 841.89);
      }

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

  const selectCoverTemplate = (index) => {
    console.log("index1", index);
    switch (index) {
      case 1:
        return <CoverLetter data={data} />;
      case 2:
        return <CoverLetter2 data={data} />;
      case 3:
        return <CoverLetter3 data={data} />;
      case 4:
        return <CoverLetter4 data={data} />;
      case 5:
        return <CoverLetter5 data={data} />;
      case 6:
        return <CoverLetter6 data={data} />;
      case 7:
        return <CoverLetter7 data={data} />;
      case 8:
        return <CoverLetter8 data={data} />;
      case 9:
        return <CoverLetter9 data={data} />;
      case 10:
        return <CoverLetter10 data={data} />;
      case 11:
        return <CoverLetter11 data={data} />;
      case 13:
        return <CoverLetter13 data={data} />;

      default:
        return <CoverLetter data={data} />;
    }
  };
  const selectCoverTemplate1 = (index) => {
    console.log("index2", index);
    switch (index) {
      case 1:
        return (
          <CoverLetter data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 2:
        return (
          <CoverLetter2 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 3:
        return (
          <CoverLetter3 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 4:
        return (
          <CoverLetter4 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 5:
        return (
          <CoverLetter5 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 6:
        return (
          <CoverLetter6 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 7:
        return (
          <CoverLetter7 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 8:
        return (
          <CoverLetter8 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 9:
        return (
          <CoverLetter9 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 10:
        return (
          <CoverLetter10 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
      case 11:
        return (
          <CoverLetter11 data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );

      default:
        return (
          <CoverLetter data={data} page1Ref={page1Ref} page2Ref={page2Ref} />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 relative h-[88vh] ">
       <LimitUsedModal visible={limitUsedModal} setVisible={setLimitUsedModal} />
      <div className="scr1024:flex scr1024:flex-row flex-col-reverse justify-between ml:gap-0 gap-2 sticky top-0">
        <div
          className="scr1024:flex  items-center justify-between  scr1024:w-[58%] w-full gap-4"
          style={{ flexDirection: "column-reverse" }}
        >
          <div
            className="text-[14px] scr460:text-[20px] font-montserrat font-medium flex gap-3 items-center cursor-pointer"
            onClick={() => setNamePreview(true)}
            style={{}}
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
        <div className="flex gap-4 justify-end ">
          <button
            onClick={() => {
              if (data?.passages) {
                handleSave();
                setLoading(true);
              } else {
                toast.error("required to fill details!");
              }
            }}
            className="flex gap-1 h-[38.33px] scr1024:text-[14px] scr1024:w-[150px]  min-w-[100px] justify-center text-[#FFF] font-montserrat font-semibold scr1024:px-3 scr1024:py-2  px-[4px] py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
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
      <div className="   overflow-auto roundScrollbar flex flex-col gap-3 rounded-[8px] bg-[#F9F9F9] px-2 py-6  relative">
        <div className="flex justify-end absolute right-4 z-[20] ">
          {/**  <div
            className=" "
            style={{
              backgroundColor: "rgba(50, 54, 57, 0.5)", // Change this value to adjust transparency
              borderRadius: "50px",
              display: "flex",
              gap: "12px",
              padding: "6px 16px",
              width: "96px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              onClick={zoomIn}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" cursor-pointer"
            >
              <g mask="url(#mask0_4509_40583)">
                <path
                  d="M8.76955 10.25H7.5773C7.3648 10.25 7.18663 10.1781 7.0428 10.0343C6.89913 9.89043 6.8273 9.71226 6.8273 9.49976C6.8273 9.2871 6.89913 9.10902 7.0428 8.96552C7.18663 8.82185 7.3648 8.75002 7.5773 8.75002H8.76955V7.55777C8.76955 7.34527 8.84146 7.1671 8.9853 7.02327C9.12913 6.8796 9.3073 6.80777 9.5198 6.80777C9.73246 6.80777 9.91055 6.8796 10.054 7.02327C10.1977 7.1671 10.2695 7.34527 10.2695 7.55777V8.75002H11.4618C11.6743 8.75002 11.8525 8.82193 11.9963 8.96577C12.14 9.1096 12.2118 9.28777 12.2118 9.50027C12.2118 9.71293 12.14 9.89102 11.9963 10.0345C11.8525 10.1782 11.6743 10.25 11.4618 10.25H10.2695V11.4423C10.2695 11.6548 10.1976 11.8329 10.0538 11.9768C9.90996 12.1204 9.7318 12.1923 9.5193 12.1923C9.30663 12.1923 9.12855 12.1204 8.98505 11.9768C8.84138 11.8329 8.76955 11.6548 8.76955 11.4423V10.25ZM9.51955 15.6153C7.81038 15.6153 6.36388 15.0235 5.18005 13.84C3.99621 12.6565 3.4043 11.2103 3.4043 9.50152C3.4043 7.79285 3.99605 6.34618 5.17955 5.16152C6.36305 3.97702 7.80921 3.38477 9.51805 3.38477C11.2267 3.38477 12.6734 3.97668 13.858 5.16051C15.0425 6.34435 15.6348 7.79085 15.6348 9.50002C15.6348 10.2142 15.515 10.8963 15.2753 11.5463C15.0355 12.1963 14.7155 12.7616 14.3155 13.2423L20.0695 18.9963C20.208 19.1346 20.2789 19.3086 20.282 19.5183C20.2852 19.7279 20.2144 19.9052 20.0695 20.05C19.9247 20.1948 19.749 20.2673 19.5425 20.2673C19.3362 20.2673 19.1606 20.1948 19.0158 20.05L13.2618 14.296C12.7618 14.7088 12.1868 15.0319 11.5368 15.2653C10.8868 15.4986 10.2144 15.6153 9.51955 15.6153ZM9.51955 14.1155C10.808 14.1155 11.8994 13.6683 12.7935 12.774C13.6879 11.8798 14.135 10.7885 14.135 9.50002C14.135 8.21152 13.6879 7.12018 12.7935 6.22601C11.8994 5.33168 10.808 4.88452 9.51955 4.88452C8.23105 4.88452 7.13971 5.33168 6.24555 6.22601C5.35121 7.12018 4.90405 8.21152 4.90405 9.50002C4.90405 10.7885 5.35121 11.8798 6.24555 12.774C7.13971 13.6683 8.23105 14.1155 9.51955 14.1155Z"
                  fill="white"
                />
              </g>
            </svg>
            <div className="bg-[#646464] w-[1px] h-[90%] "></div>
            <svg
              onClick={zoomOut}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" cursor-pointer"
            >
              <g mask="url(#mask0_4509_40599)">
                <path
                  d="M7.8848 10.25C7.6723 10.25 7.49421 10.1781 7.35055 10.0343C7.20688 9.89043 7.13505 9.71226 7.13505 9.49976C7.13505 9.2871 7.20688 9.10902 7.35055 8.96552C7.49421 8.82185 7.6723 8.75002 7.8848 8.75002H11.154C11.3665 8.75002 11.5447 8.82193 11.6885 8.96577C11.8322 9.1096 11.904 9.28777 11.904 9.50027C11.904 9.71293 11.8322 9.89102 11.6885 10.0345C11.5447 10.1782 11.3665 10.25 11.154 10.25H7.8848ZM9.51955 15.6153C7.81038 15.6153 6.36388 15.0235 5.18005 13.84C3.99621 12.6565 3.4043 11.2103 3.4043 9.50152C3.4043 7.79285 3.99605 6.34618 5.17955 5.16152C6.36305 3.97702 7.80921 3.38477 9.51805 3.38477C11.2267 3.38477 12.6734 3.97668 13.858 5.16051C15.0425 6.34435 15.6348 7.79085 15.6348 9.50002C15.6348 10.2142 15.515 10.8963 15.2753 11.5463C15.0355 12.1963 14.7155 12.7616 14.3155 13.2423L20.0695 18.9963C20.208 19.1346 20.2789 19.3086 20.282 19.5183C20.2852 19.7279 20.2144 19.9052 20.0695 20.05C19.9247 20.1948 19.749 20.2673 19.5425 20.2673C19.3362 20.2673 19.1606 20.1948 19.0158 20.05L13.2618 14.296C12.7618 14.7088 12.1868 15.0319 11.5368 15.2653C10.8868 15.4986 10.2144 15.6153 9.51955 15.6153ZM9.51955 14.1155C10.808 14.1155 11.8994 13.6683 12.7935 12.774C13.6879 11.8798 14.135 10.7885 14.135 9.50002C14.135 8.21152 13.6879 7.12018 12.7935 6.22601C11.8994 5.33168 10.808 4.88452 9.51955 4.88452C8.23105 4.88452 7.13971 5.33168 6.24555 6.22601C5.35121 7.12018 4.90405 8.21152 4.90405 9.50002C4.90405 10.7885 5.35121 11.8798 6.24555 12.774C7.13971 13.6683 8.23105 14.1155 9.51955 14.1155Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>*/}
          <div
            className="flex gap-4 rounded-lg overflow-y-auto bg-white ml:py-[6px] ml:px-[16px] py-[4px] px-[8px]  ml:min-w-[96px]  min-w-[60px]"
            style={{
              backgroundColor: "rgba(50, 54, 57, 0.5)",
              borderRadius: "50px",
              display: "flex",
              gap: "12px",
              // padding: "6px 16px",
              // width: "96px",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <div
              style={{ transform: `scale(${zoomLevel})` }}
              // Zoom Level: {zoomLevel}
            >
              {" "}
            </div>
            <svg
              onClick={zoomIn}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer ml:min-w-[24px] ml:min-h-[24px] min-w-[16px] min-h-[16px]"
            >
              <g mask="url(#mask0_4509_40583)">
                <path
                  d="M8.76955 10.25H7.5773C7.3648 10.25 7.18663 10.1781 7.0428 10.0343C6.89913 9.89043 6.8273 9.71226 6.8273 9.49976C6.8273 9.2871 6.89913 9.10902 7.0428 8.96552C7.18663 8.82185 7.3648 8.75002 7.5773 8.75002H8.76955V7.55777C8.76955 7.34527 8.84146 7.1671 8.9853 7.02327C9.12913 6.8796 9.3073 6.80777 9.5198 6.80777C9.73246 6.80777 9.91055 6.8796 10.054 7.02327C10.1977 7.1671 10.2695 7.34527 10.2695 7.55777V8.75002H11.4618C11.6743 8.75002 11.8525 8.82193 11.9963 8.96577C12.14 9.1096 12.2118 9.28777 12.2118 9.50027C12.2118 9.71293 12.14 9.89102 11.9963 10.0345C11.8525 10.1782 11.6743 10.25 11.4618 10.25H10.2695V11.4423C10.2695 11.6548 10.1976 11.8329 10.0538 11.9768C9.90996 12.1204 9.7318 12.1923 9.5193 12.1923C9.30663 12.1923 9.12855 12.1204 8.98505 11.9768C8.84138 11.8329 8.76955 11.6548 8.76955 11.4423V10.25ZM9.51955 15.6153C7.81038 15.6153 6.36388 15.0235 5.18005 13.84C3.99621 12.6565 3.4043 11.2103 3.4043 9.50152C3.4043 7.79285 3.99605 6.34618 5.17955 5.16152C6.36305 3.97702 7.80921 3.38477 9.51805 3.38477C11.2267 3.38477 12.6734 3.97668 13.858 5.16051C15.0425 6.34435 15.6348 7.79085 15.6348 9.50002C15.6348 10.2142 15.515 10.8963 15.2753 11.5463C15.0355 12.1963 14.7155 12.7616 14.3155 13.2423L20.0695 18.9963C20.208 19.1346 20.2789 19.3086 20.282 19.5183C20.2852 19.7279 20.2144 19.9052 20.0695 20.05C19.9247 20.1948 19.749 20.2673 19.5425 20.2673C19.3362 20.2673 19.1606 20.1948 19.0158 20.05L13.2618 14.296C12.7618 14.7088 12.1868 15.0319 11.5368 15.2653C10.8868 15.4986 10.2144 15.6153 9.51955 15.6153ZM9.51955 14.1155C10.808 14.1155 11.8994 13.6683 12.7935 12.774C13.6879 11.8798 14.135 10.7885 14.135 9.50002C14.135 8.21152 13.6879 7.12018 12.7935 6.22601C11.8994 5.33168 10.808 4.88452 9.51955 4.88452C8.23105 4.88452 7.13971 5.33168 6.24555 6.22601C5.35121 7.12018 4.90405 8.21152 4.90405 9.50002C4.90405 10.7885 5.35121 11.8798 6.24555 12.774C7.13971 13.6683 8.23105 14.1155 9.51955 14.1155Z"
                  fill="white"
                />
              </g>
            </svg>
            <div className="bg-[#646464] w-[1px] h-[90%] "></div>
            <svg
              onClick={zoomOut}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer ml:min-w-[24px] ml:min-h-[24px] min-w-[16px] min-h-[16px]"
            >
              <g mask="url(#mask0_4509_40599)">
                <path
                  d="M7.8848 10.25C7.6723 10.25 7.49421 10.1781 7.35055 10.0343C7.20688 9.89043 7.13505 9.71226 7.13505 9.49976C7.13505 9.2871 7.20688 9.10902 7.35055 8.96552C7.49421 8.82185 7.6723 8.75002 7.8848 8.75002H11.154C11.3665 8.75002 11.5447 8.82193 11.6885 8.96577C11.8322 9.1096 11.904 9.28777 11.904 9.50027C11.904 9.71293 11.8322 9.89102 11.6885 10.0345C11.5447 10.1782 11.3665 10.25 11.154 10.25H7.8848ZM9.51955 15.6153C7.81038 15.6153 6.36388 15.0235 5.18005 13.84C3.99621 12.6565 3.4043 11.2103 3.4043 9.50152C3.4043 7.79285 3.99605 6.34618 5.17955 5.16152C6.36305 3.97702 7.80921 3.38477 9.51805 3.38477C11.2267 3.38477 12.6734 3.97668 13.858 5.16051C15.0425 6.34435 15.6348 7.79085 15.6348 9.50002C15.6348 10.2142 15.515 10.8963 15.2753 11.5463C15.0355 12.1963 14.7155 12.7616 14.3155 13.2423L20.0695 18.9963C20.208 19.1346 20.2789 19.3086 20.282 19.5183C20.2852 19.7279 20.2144 19.9052 20.0695 20.05C19.9247 20.1948 19.749 20.2673 19.5425 20.2673C19.3362 20.2673 19.1606 20.1948 19.0158 20.05L13.2618 14.296C12.7618 14.7088 12.1868 15.0319 11.5368 15.2653C10.8868 15.4986 10.2144 15.6153 9.51955 15.6153ZM9.51955 14.1155C10.808 14.1155 11.8994 13.6683 12.7935 12.774C13.6879 11.8798 14.135 10.7885 14.135 9.50002C14.135 8.21152 13.6879 7.12018 12.7935 6.22601C11.8994 5.33168 10.808 4.88452 9.51955 4.88452C8.23105 4.88452 7.13971 5.33168 6.24555 6.22601C5.35121 7.12018 4.90405 8.21152 4.90405 9.50002C4.90405 10.7885 5.35121 11.8798 6.24555 12.774C7.13971 13.6683 8.23105 14.1155 9.51955 14.1155Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          style={{ display: "flex", overflow: "auto" }}
          className="flex justify-center"
        >
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top center",
              display: "inline-block",
            }}
          >
            <div style={{ boxShadow: "0px 1px 2px 0px #00000040" }}>
              {selectCoverTemplate(selectedCoverIndex)}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute  left-[10000px]">
        {selectCoverTemplate1(selectedCoverIndex)}
      </div>

      {namePreview && (
        <FileNameModel
          data={data}
          setNamePreview={setNamePreview}
          setFunction={(data) => setName(data)}
          clientId={clientId}
          isResume={false}
        />
      )}
    </div>
  );
}

export default CoverPreview;
