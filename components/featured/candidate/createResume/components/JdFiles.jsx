import React, { useEffect, useState } from "react";
import { DocSVG, PDFSvg, PNGICON, SearchIcon } from "../../../../../utils/svg";
import { useRouter } from "next/router";
import MiniLoader from "../../../../common/miniLoader";
import Fuse from "fuse.js";

function JdFiles({
  files,
  details,
  query,
  selectedOptions,
  selectedIndexes,
  setSelectedIndexes,
  loading,
  setSelectedIndexesFilesType,
  selectedIndexesFileTypes,
}) {
  const router = useRouter();
  const [selectAll, setSelectAll] = useState(false);
  const { clientId, name } = query;
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    setData(details);
    setAllData(details);
  }, [details]);
  const openFolder = (index, parentId, name, item) => {
    if (item?.type == "file") {
      window.location.href = item.file;
    } else {
      localStorage.setItem("previousPage", window.location.href);
      router.push({
        pathname: "/transform/JobMatching",
        query: { ...query, name, parentId },
      });
    }
  };

  // const openClientFolder = (index, clientId, name, item) => {
  //     if (item?.resumeUrl?.includes("pdf")) {
  //         window.location.href = item.resumeUrl;
  //     } else {
  //         localStorage.setItem("previousPage", window.location.href);
  //         router.push({
  //             pathname: "/transform/JobMatching",
  //             query: { ...query, clients: true, name, clientId },
  //         });
  //     }
  // };

  const fileIconSeter = (data) => {
    if (data.fileName?.includes("docx") || data?.fileName?.includes("doc")) {
      return <img src="/images/docIcon.png" className="h-[48px] w-[48px]" />;
      m;
    } else if (data?.fileName?.includes("pdf")) {
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
          width="57"
          height="48"
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
  const changeHandler = (value) => {
    if (value.length > 0) {
      const options = {
        includeScore: true,
        keys: ["fileName"],
      };
      const fuse = new Fuse(allData, options);
      const result = fuse.search(value);
      setData(result.map((item) => item.item));
    } else {
      setData(allData);
    }
  };

  const toggleSelect = (itemId, item) => {
    const fileType = [
      ...getAllFiles(item)
        .filter((data) => data.type == "file")
        .map((item) => item._id),
    ];

    setSelectedIndexesFilesType(fileType);
    const ids = [...getAllFiles(item).map((item) => item._id)];
    let updatedIndexes;

    if (selectedIndexes?.includes(itemId)) {
      updatedIndexes = selectedIndexes.filter((id) => !ids?.includes(id));
    } else {
      updatedIndexes = [...selectedIndexes, ...ids];
    }
    localStorage.setItem("selectedIndexesFileType", JSON.stringify(fileType));
    localStorage.setItem("selectedIndexes", JSON.stringify(updatedIndexes));

    setSelectedIndexes(updatedIndexes);
  };
  return (
    <div className="rounded-[16px] border bg-[#F9F9F9] border-[#DEDEDE] p-[16px] flex flex-col gap-[16px]">
      <div className="flex flex-row items-center justify-between gap-[12px] ">
        <div className="flex flex-row items-center gap-[12px] cursor-pointer ">
          {name && (
            <svg
              onClick={() => router.back()}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_1706_29363)">
                <path
                  d="M9.56631 17.1108L17.5663 25.1108L15.9997 26.6663L5.33301 15.9997L15.9997 5.33301L17.5663 6.88854L9.56631 14.8886H26.6663V17.1108H9.56631Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          )}
          {name && (
            <span className="text-[16px] text-[#333333] font-normal">
              {name}
            </span>
          )}
          <div className="flex flex-row gap-[8px] py-[8px] px-[12px] h-[40px] bg-[#fff] border border-[#DEDEDE] rounded-[30px] items-center">
            <SearchIcon />
            <input
              type="text"
              className="bg-[#fff] text-[#333333] placeholder:text-[#333333] w-[80%]"
              placeholder="Search"
              onChange={(e) => changeHandler(e.target.value)}
            />
          </div>
        </div>
        <span className="text-[14px] text-[#808080] min-w-[75px] flex justify-end">
          {data?.length}
          {" Items"}
        </span>
      </div>
      <div className="border-b-[1px] border-[#DEDEDE] w-full h-[1px]"></div>
      <div
        className="flex flex-row flex-wrap gap-4  py-4  h-[247px] overflow-y-auto bg-[#FFFFFF] border-[1px] border-[#DEDEDE] rounded-[16px] p-[8px]"
        // style={{ overflowX: "auto" }}
      >
        {loading ? (
          <div className="w-full ">
            <MiniLoader />
          </div>
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <>
              <div
                key={index}
                onClick={() => openFolder(index, item._id, item.fileName, item)}
                className="w-[98px] flex flex-col gap-[6px] relative group  items-center py-4 min-h-[90px] rounded-[8px] cursor-pointer "
              >
                <div className="relative">
                  {fileIconSeter(item)}
                  {/* {select && ( */}
                  {(getAllFiles(item).filter((item) => item.type == "file")
                    ?.length > 0 ||
                    item.type === "file") && (
                    <input
                      type="checkbox"
                      className=" absolute right-[-15%] top-0 rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox"
                      style={{ width: "20px", height: "20px" }}
                      onClick={(e) => e.stopPropagation()}
                      checked={selectedIndexes?.includes(item._id)}
                      onChange={() => toggleSelect(item._id, item)}
                    />
                  )}
                  {/* )} */}
                </div>

                <span className="md:text-[14px] text-[12px] text-[#333333] text-center break-all">
                  {item.fileName.length > 17
                    ? `${item.fileName.slice(0, 17)}...`
                    : item.fileName}
                </span>
                <div className="absolute text-[10px] opacity-0 overflow-visible transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-5px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                  {item.fileName}
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="text-[20px] font-medium text-center w-full py-[24px]">
            No Resume Available
          </div>
        )}
      </div>
    </div>
  );
}

export default JdFiles;
