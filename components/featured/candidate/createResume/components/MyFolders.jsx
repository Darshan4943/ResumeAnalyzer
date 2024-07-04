import React from "react";
import {
  convertBytes,
  dateSeter,
  fileIconSeter,
  fileIconSeter1,
  formatDate,
} from "../../../../../utils/middleware";
import SyncLoader from "../../../../common/SyncLoader";

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
    <div className="h-[calc(85vh-250px)] overflow-y-auto">
      {tabIndex === 0 && (
        <div className="rounded-[16px] sm:p-4 flex flex-row gap-y-6 flex-wrap justify-evenly scr460:justify-start  w-full ">
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
                        {item.isSync === false && item.type === "file" &&
                          <div className="absolute -bottom-2 -left-2 z-50">
                            <SyncLoader />
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
                          <div className="h-[24px] min-w-[21px]">
                            {fileIconSeter1(item)}
                          </div>
                          {item.fileName}
                        </td>
                        <td className="w-[30%] scr460:px-4 justify-between flex  items-center text-[#858585] text-[12px] scr390:text-[14px]">
                          {dateSeter(item.updatedAt)}
                          {item.isSync === false && item.type === "file" &&
                          <div className=" overflow-hidden">
                            <SyncLoader />
                          </div>
                        }
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
