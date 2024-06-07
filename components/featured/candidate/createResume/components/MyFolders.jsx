import React from "react";
import {
  convertBytes,
  dateSeter,
  fileIconSeter,
  fileIconSeter1,
  formatDate,
} from "../../../../../utils/middleware";

function MyFolders({
  toggleSelect,
  isList,
  tabIndex,
  data,
  files,
  select,
  selectedIndexes,
  openFolder,
}) {
  function sortFoldersAndFiles(data) {
    return data.sort((a, b) => {
      if (a.type === b.type) {
        return 0;
      }
      return a.type === "folder" ? -1 : 1;
    });
  }
  return (
    <div className="">
      {tabIndex === 0 && (
        <div className="rounded-[16px] sm:p-4 flex flex-row gap-y-6 flex-wrap justify-evenly scr460:justify-start  w-full h-full">
          {data?.length > 0 ? (
            <>
              {!isList ? (
                sortFoldersAndFiles(data)?.map((item, index) => (
                  <>
                    <div
                      onClick={() => {
                        !select &&
                          openFolder(index, item._id, item.fileName, item);
                      }}
                      key={index}
                      className=" break-all h-[74px] flex flex-col gap-[8px] group relative items-center text-center cursor-pointer  scr460:w-[142px] w-[98px] px-[8px]"
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
                        {item.isSync === false && item.type==="file" &&
                          <div className="absolute -bottom-2 -left-2 z-50">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                              <g mask="url(#mask0_4063_46389)">
                                <rect x="2.5" y="2.5" width="19" height="19" rx="9.5" fill="white" />
                                <path d="M12 13.0538L15.073 16.127C15.2115 16.2653 15.3856 16.3362 15.5953 16.3395C15.8048 16.3427 15.982 16.2718 16.127 16.127C16.2718 15.982 16.3443 15.8063 16.3443 15.6C16.3443 15.3937 16.2718 15.218 16.127 15.073L13.0538 12L16.127 8.927C16.2653 8.7885 16.3362 8.61442 16.3395 8.40475C16.3427 8.19525 16.2718 8.018 16.127 7.873C15.982 7.72817 15.8063 7.65575 15.6 7.65575C15.3937 7.65575 15.218 7.72817 15.073 7.873L12 10.9462L8.927 7.873C8.7885 7.73467 8.61442 7.66383 8.40475 7.6605C8.19525 7.65733 8.018 7.72817 7.873 7.873C7.72817 8.018 7.65575 8.19367 7.65575 8.4C7.65575 8.60633 7.72817 8.782 7.873 8.927L10.9462 12L7.873 15.073C7.73467 15.2115 7.66383 15.3856 7.6605 15.5953C7.65733 15.8048 7.72817 15.982 7.873 16.127C8.018 16.2718 8.19367 16.3443 8.4 16.3443C8.60633 16.3443 8.782 16.2718 8.927 16.127L12 13.0538ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#C00000" />
                              </g>
                            </svg>


                          </div>
                        }
                      </div>
                      <span
                        style={{ overflow: "hidden" }}
                        className="text-[12px]"
                      >
                        {item.fileName}{" "}
                      </span>
                      <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                        {item.fileName}
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <table className="w-[100%] flex flex-col">
                  <thead className="flex w-full">
                    <tr className="flex w-full ">
                      <th className="py-3 px-2 w-[70%] scr390:px-4 rounded-l-[12px] bg-[#C2E7FF] text-[12px] scr390:text-[14px]  text-left border-r border-[#FFF]">
                        Name
                      </th>
                      <th className="py-3 px-2 w-[30%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF]  rounded-r-[12px]">
                        Date Modifie
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortFoldersAndFiles(data).map((item, index) => (
                      <tr
                        key={index}
                        onClick={() =>
                          openFolder(index, item._id, item.fileName, item)
                        }
                        className="cursor-pointer flex w-full"
                      >
                        <td className="px-2  w-[70%] break-all scr390:px-4 py-2 text-[12px] scr390:text-[14px] font-medium flex gap-2 relative items-center">
                          <div className="h-[24px] min-w-[24px]">
                            {fileIconSeter1(item)}
                          </div>
                          {select && (
                            <input
                              type="checkbox"
                              className="   rounded-[4.5px]  w-full outline-none text-[12px] scr390:text-[14px] font-medium custom-checkbox"
                              style={{ width: "20px", height: "20px" }}
                              onClick={(e) => e.stopPropagation()}
                              checked={selectedIndexes.includes(index)}
                              onChange={() => toggleSelect(index)}
                            />
                          )}
                          {item.fileName.length > 25
                            ? `${item.fileName.slice(0, 25)}...`
                            : item.fileName}
                        </td>
                        <td className="w-[30%] scr460:px-4 justify-start flex  items-center text-[#858585] text-[12px] scr390:text-[14px]">
                          {dateSeter(item.updatedAt)}
                        </td>
                        {/* <td className="px-4 py-2 text-[#858585] text-[14px]">
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
          {files?.length > 0 ? (
            <table className="w-[100%] ">
              <thead>
                <tr>
                  <th className="py-3 px-4 rounded-l-[12px] bg-[#C2E7FF] w-[30%] text-left  ">
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
                {files.map((item, index) => (
                  <tr key={index} className="">
                    <td className="px-4 py-2 font-medium">{item.fileName}</td>
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

export default MyFolders;
