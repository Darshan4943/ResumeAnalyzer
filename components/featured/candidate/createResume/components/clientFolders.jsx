import axios from "axios";
import React, { useEffect } from "react";

function ClientFolders({
  toggleSelect,
  isList,
  tabIndex,
  setTabIndex,
  data,
  setData,
  setFolderData,
  files,
  setFiles,
  clientData,
  setClientData,
  tab,
  select,
  setSelect,
  selectedIndexes,
  setSelectedIndexes,
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

  return (
    <div className="">
      {tabIndex === 0 && (
        <div className="rounded-[16px] p-4 flex flex-row gap-y-6 flex-wrap  w-full h-full">
          {clientData?.length > 0 ? (
            <>
              {!isList ? (
                clientData?.map((item, index) => (
                  <>
                    <div
                      onClick={() => {
                        !select && openClientFolder(index, item._id);
                      }}
                      key={index}
                      className=" break-all flex flex-col items-center text-center cursor-pointer h-fit w-[120px] px-2"
                    >
                      <div className=" relative">
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
                      {clientId ? (
                        item.fileName
                      ) : (
                        <>
                          {" "}
                          {item.firstName} {item.lastName}
                        </>
                      )}
                    </div>
                  </>
                ))
              ) : (
                <table className="w-[100%]">
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
                      <tr
                        key={index}
                        onClick={() => openClientFolder(index, item._id)}
                        className=""
                      >
                        <td className="px-4 py-2 font-medium flex gap-2 relative items-center cursor-pointer ">
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.4286 4.49999H12.5299L11.5263 2.45093C11.3138 2.01394 10.9857 1.64642 10.5792 1.38999C10.1727 1.13355 9.70391 0.998462 9.22603 1.00001H2.57143C1.88967 1.00078 1.23606 1.27758 0.753981 1.7697C0.271907 2.26181 0.000748696 2.92904 0 3.625V19.3749C0.000748696 20.0709 0.271907 20.7381 0.753981 21.2302C1.23606 21.7223 1.88967 21.9991 2.57143 21.9999H21.4286C22.1103 21.9991 22.7639 21.7223 23.246 21.2302C23.7281 20.7381 23.9993 20.0709 24 19.3749V7.12497C23.9993 6.42902 23.7281 5.76179 23.246 5.26968C22.7639 4.77756 22.1103 4.50076 21.4286 4.49999Z"
                              fill="#4294FF"
                            />
                            <path
                              d="M22.0543 21.9122C21.851 21.9725 21.6402 22.0019 21.4286 21.9997H2.57143C1.89006 21.9977 1.23716 21.7205 0.755352 21.2286C0.273547 20.7368 0.00199013 20.0703 1.77688e-07 19.3747V3.62483C-0.000193566 3.09445 0.158055 2.57663 0.45363 2.14045C0.749206 1.70427 1.16805 1.37047 1.65429 1.18359C4.05429 8.0523 9.66857 18.5085 22.0543 21.9122Z"
                              fill="#2965ED"
                            />
                          </svg>
                          {item.firstName} {item.lastName}
                        </td>
                        <td className="px-4 py-2 text-[#858585]">
                          {formatDate(item?.updatedAt)}
                        </td>
                        <td className="px-4 py-2 text-[#858585]">
                          {item?.category}
                        </td>
                        <td className="px-4 py-2 text-[#858585]">
                          {item?.size}
                        </td>
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
    </div>
  );
}

export default ClientFolders;
