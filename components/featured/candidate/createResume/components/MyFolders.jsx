import React, { useEffect, useRef, useState } from "react";
import {
  convertBytes,
  dateSeter,
  fileIconSeter,
  fileIconSeter1,

  formatDate,
} from "../../../../../utils/middleware";
import SyncLoader from "../../../../common/SyncLoader";
import axios from "axios";

function MyFolders({
  toggleSelect,
  isList,
  tab,
  tabIndex,
  data,
  files,
  select,
  selectedIndexes,
  openFolder,
  getData,
  setRename,
  rename,
  setSelectedIndexes
}) {
  const inputRef = useRef(null);
  const [newName, setNewName] = useState('');

  const handleClickOutside = async (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      if (newName.trim()) {
        try {
          const response = await axios.post("https://jamblix.com/api/folder/rename", {
            _id: selectedIndexes[0],
            newName: newName.trim(),
          });

          if (response.status === 200) {
            getData();
            setRename(false);
            setNewName("");
          }
        } catch (error) {
          console.error("Rename failed:", error);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newName]);
  useEffect(() => {
    const fileNames = data
      ?.filter((item) => selectedIndexes.includes(item._id))
      .map((item) => item.fileName);
    setNewName(fileNames[0])
  }, [selectedIndexes])

  const handleKeyDown = async (e, _id) => {

    if (e.key === 'Enter' && newName.trim()) {

      try {
        const response = await axios.post('https://jamblix.com/api/folder/rename', {
          _id,
          newName: newName.trim(),
        });

        if (response.status === 200) {
          getData()
          setRename(false)
          setNewName('');
        }
      } catch (error) {
        console.error('Rename failed:', error);
      }
    }
  };
  function sortFoldersAndFiles(data) {
    return data.sort((a, b) => {
      if (a.type === b.type) {
        return 0;
      }
      return a.type === "folder" ? -1 : 1;
    });
  }


  return (
    <div className=" overflow-y-auto">
      {tabIndex === 0 && (
        <div className="rounded-[16px] pt-2 flex flex-row gap-y-6 flex-wrap justify-start scr460:justify-start  w-full  pb-12 ">
          {data?.length > 0 ? (
            <>
              {!isList ? (
                sortFoldersAndFiles(data)?.map((item, index) => (

                  <div

                    key={index}
                    className=" break-all h-[74px] flex flex-col gap-[8px]  relative items-center text-center cursor-pointer  scr460:w-[142px] w-[98px] px-[8px]"
                  >
                    <div className=" relative" onClick={() => {
                      !select &&
                        openFolder(index, item._id, item.fileName, item);
                    }}>

                      {fileIconSeter(item)}
                      {(select && item.fileName !== "CVs From Skilotech") && (
                        <input
                          type="checkbox"
                          className=" absolute right-[-15%] top-0 rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] z-[200] font-medium custom-checkbox"
                          style={{ width: "20px", height: "20px" }}
                          onClick={(e) => e.stopPropagation()}
                          checked={selectedIndexes.includes(item._id)}
                          onChange={() => toggleSelect(item)}
                        />
                      )}
                      {/* {item.isSync === false && item.type === "file" && item.syncStatus !== "failed" &&
                        <div className="absolute -bottom-2 -left-2 z-50">
                          <SyncLoader />
                        </div>
                      } */}
                      {item.syncStatus === "failed" &&
                        <div className="absolute -bottom-2 -left-2 z-50">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.0625 10L0 8.9375L3.9375 5L0 1.0625L1.0625 0L5 3.9375L8.9375 0L10 1.0625L6.0625 5L10 8.9375L8.9375 10L5 6.0625L1.0625 10Z" fill="#B3261E" />
                          </svg>


                        </div>
                      }
                    </div>
                    <div className={`${(!rename && !selectedIndexes.includes(item._id)) && "group"}`}>
                      {rename && selectedIndexes.includes(item._id) ? (
                        <input
                          ref={inputRef}
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, item._id)}
                          onFocus={(e) => e.target.select()}
                          className="border px-2 py-1 rounded w-full text-[12px]"
                          autoFocus
                        />
                      ) : (
                        <span
                          onClick={() => {
                            item.fileName !== "CVs From Skilotech" && setSelectedIndexes([item._id]);
                            setRename(true);
                          }}
                          style={{ overflow: 'hidden' }}
                          className="text-[12px]"
                        >
                          {item.fileName.length > 14
                            ? `${item.fileName.slice(0, 14)}...`
                            : item.fileName}
                        </span>

                      )}


                      <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                        {item.fileName}
                      </div>
                    </div>

                  </div>

                ))
              ) : (
                <table className="w-[100%] flex flex-col">
                  <thead className="flex w-full">
                    <tr className="flex w-full ">
                      <th className="py-3 px-2 w-[50%] scr390:px-4 rounded-l-[12px] bg-[#C2E7FF] text-[12px] scr390:text-[14px]  text-left border-r border-[#FFF] font-medium">
                        Name
                      </th>
                      <th className="py-3 px-2 w-[30%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF] font-medium">
                        Date Modified
                      </th>
                      <th className="py-3 px-2 w-[20%] scr390:px-4 bg-[#C2E7FF]  text-left text-[12px] scr390:text-[14px] border-r border-[#FFF]  rounded-r-[12px] font-medium">
                        Action
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
                        <td className="px-2  w-[50%] break-all scr390:px-4 py-2 text-[12px] scr390:text-[14px] font-medium flex gap-2 relative items-center">

                          {select && (
                            <input
                              type="checkbox"
                              className="   rounded-[4.5px]  w-full outline-none text-[12px] scr390:text-[14px] font-medium custom-checkbox"
                              style={{ width: "20px", height: "20px" }}
                              onClick={(e) => e.stopPropagation()}
                              checked={selectedIndexes.includes(item._id)}
                              onChange={() => toggleSelect(item)}
                            />
                          )}
                          <div className="h-[24px] min-w-[21px]">
                            {fileIconSeter1(item)}
                          </div>
                          {item.fileName}
                        </td>
                        <td className="w-[30%] scr460:px-4 justify-between flex  items-center text-[#858585] text-[12px] scr390:text-[14px]">
                          {dateSeter(item.updatedAt)}
                          {/* {item.isSync === false && item.type === "file" && item.syncStatus !== "failed" &&
                            <div className=" overflow-hidden">
                              <SyncLoader />
                            </div>
                          } */}
                          {item.syncStatus === "failed" &&
                            <div className="absolute -bottom-2 -left-2 z-50">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.0625 10L0 8.9375L3.9375 5L0 1.0625L1.0625 0L5 3.9375L8.9375 0L10 1.0625L6.0625 5L10 8.9375L8.9375 10L5 6.0625L1.0625 10Z" fill="#B3261E" />
                              </svg>


                            </div>
                          }
                        </td>
                        {/* <td className="px-4 py-2 w-[30%] text-[#858585] text-[14px]">
                          {convertBytes(item.size)}
                        </td> */}

                        <td className="px-4 py-2 w-[20%] ">
                          {item?.type !== "folder" &&
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                              <g mask="url(#mask0_6706_99235)">
                                <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#06A9EF" />
                              </g>
                            </svg>
                          }
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <>
              {tab === 2 ?
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
                  <img
                    src="/images/trash.png"
                    className="h-[180px] w-[240px]"
                    alt=""
                  />
                  <div className="text-[20px] font-medium text-[#808080]">
                    Nothing in Trash{" "}
                  </div>
                </div>
                :

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
              }
            </>
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
