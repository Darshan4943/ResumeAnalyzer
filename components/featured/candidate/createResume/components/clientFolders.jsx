import axios from "axios";
import React, { useEffect } from "react";
import { PDFSvg } from "../../../../../utils/svg";
import { convertBytes, dateSeter, fileIconSeter1 } from "../../../../../utils/middleware";

function ClientFolders({
  toggleSelect,
  isList,
  tabIndex,
  files,
  setFiles,
  clientData,
  select,
  selectedIndexes,
  openClientFolder,
  query,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };
  const { clientId } = query;

  useEffect(() => {
    if (files && Array.isArray(files) && files.length > 0) {
      axios
        .head(files[0].resumeUrl)
        .then((response) => {
          const contentLengthBytes = parseInt(
            response.headers["content-length"],
            10
          );
          const contentLengthKB = contentLengthBytes / 1024;
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[0].size = contentLengthKB.toFixed(2) + " KB";
            return updatedFiles;
          });
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        });
    } else {
      console.error("Files array is either undefined, not an array, or empty.");
    }
  }, [isList]);

  const fileIconSeter = (data) => {
    if (data?.resumeUrl?.toLowerCase().includes("pdf")) {
      return <PDFSvg />;
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

  return (
    <div className="">
      {tabIndex === 0 && (
        <div className="rounded-[16px] sm:p-4 flex flex-row gap-y-6 flex-wrap justify-evenly scr460:justify-start w-full h-full">
          {clientData?.length > 0 ? (
            <>
              {!isList ? (
                clientData?.map((item, index) => (
                  <>
                    <div
                      onClick={() => {
                        !select &&
                          openClientFolder(
                            index,
                            item._id,
                            clientId
                              ?<>{item.fileName.length > 15
                                ? `${item.fileName.slice(0, 14)}...`
                                : item.fileName}</>
                              : item.firstName + " " + item.lastName,
                            item
                          );
                      }}
                      key={index}
                      className=" break-all relative group flex flex-col gap-[8px] items-center text-center cursor-pointer h-fit scr460:w-[142px] w-[98px] px-[8px]"
                    >
                      <div className=" relative">
                        {fileIconSeter(item)}
                        {select && (
                          <input
                            type="checkbox"
                            className=" absolute right-[-15%] top-0 rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox"
                            style={{ width: "20px", height: "20px" }}
                            onClick={(e) => e.stopPropagation()}
                            checked={selectedIndexes.includes(index)}
                            onChange={() => toggleSelect(index)}
                          />
                        )}
                      </div>
                      <span className="text-[12px]">
                        {" "}
                        {clientId
                          ?<>{item.fileName.length > 15
                            ? `${item.fileName.slice(0, 14)}...`
                            : item.fileName}</>
                          : item.firstName + " " + item.lastName}
                      </span>
                      <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                        {clientId
                          ? item.fileName
                          : item.firstName + " " + item.lastName}
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <table className="w-[100%] text-[12px] sm:text-[16px]">
                  <thead>
                    <tr>
                      <th className="py-3 sm:px-4 px-2 rounded-l-[12px] bg-[#C2E7FF] w-[30%] text-left border-r border-[#FFF]">
                        Name
                      </th>
                      <th className="py-3 sm:px-4 px-2 bg-[#C2E7FF] w-[25%] text-left border-r border-[#FFF]  rounded-r-[12px]">
                        Date Modified
                      </th>
                      {/* <th className="py-3 sm:px-4 px-2 rounded-r-[12px] bg-[#C2E7FF] w-[25%] text-left">
                        Size
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {clientData.map((item, index) => (

                      <tr
                        key={index}
                        onClick={() =>
                          openClientFolder(
                            index,
                            item._id,
                            clientId
                              ? item.fileName
                              : item.firstName + " " + item.lastName,
                            item
                          )
                        }
                        className="cursor-pointer"
                      >
                        <td className="sm:px-4 px-2 py-2 font-medium flex gap-2 relative items-center ">
                          
                          {select && (

                            <input
                              type="checkbox"
                              className="   rounded-[4.5px]  outline-none text-[14px] font-medium custom-checkbox"
                              style={{ width: "20px", height: "20px" }}
                              onClick={(e) => e.stopPropagation()}
                              checked={selectedIndexes.includes(index)}
                              onChange={() => toggleSelect(index)}
                            />
                          )}
                          <div className="h-[24px] min-w-[24px]">
                            {fileIconSeter1(item)}
                          </div>
                          {clientId
                            ? item.fileName
                            : item.firstName + " " + item.lastName}
                        </td>
                        <td className="sm:px-4 px-2 py-2 text-[#858585]">
                          {dateSeter(item.updatedAt)}
                        </td>
                        {/* <td className="sm:px-4 px-2 py-2 text-[#858585]">
                          {convertBytes(item.size)}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
              <img
                src="/images/noFile.png"
                className="h-[300px] w-[375px]"
                alt=""
              />
              <div className="text-[20px] font-medium text-[#808080]">
                No Folders Available{" "}
              </div>
            </div>
          )}
        </div>
      )}
      {tabIndex === 1 && (
        <div className=" gap-[1px] p-4 bg-white w-full min-h-[60vh]">
          {clientData?.length > 0 ? (
            <table className="w-[100%] ">
              <thead>
                <tr>
                  <th className="py-3 px-4 rounded-l-[12px] bg-[#C2E7FF] w-[30%] text-left">
                    Name
                  </th>
                  <th className="py-3 px-4 bg-[#C2E7FF] w-[25%] text-left">
                    Date Modified
                  </th>
                  <th className="py-3 px-4 bg-[#C2E7FF] w-[20%] text-left">
                    Category
                  </th>
                  <th className="py-3 px-4 rounded-r-[12px] bg-[#C2E7FF] w-[25%] text-left">
                    Size
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientData.map((item, index) => (
                  <tr key={index} className="">
                    <td className="px-4 py-2 font-medium">
                      {clientId
                        ? <>{item.fileName.length > 15
                          ? `${item.fileName.slice(0, 14)}...`
                          : item.fileName}</>
                        : item.firstName + " " + item.lastName}
                    </td>
                    {/* <td className='px-4 py-2 text-[#858585]'>{item.dateModified}</td>
                            <td className='px-4 py-2 text-[#858585]'>{item.category}</td>
                            <td className='px-4 py-2 text-[#858585]'>{item.size}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
              <img
                src="/images/noFile.png"
                className="h-[300px] w-[375px]"
                alt=""
              />
              <div className="text-[20px] font-medium text-[#808080]">
                No Files Available{" "}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientFolders;
