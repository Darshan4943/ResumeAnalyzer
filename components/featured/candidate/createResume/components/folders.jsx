import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import Files from "./files";
import MiniLoader from "../../../../common/miniLoader";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

function Folders({
  tabIndex,
  setTabIndex,
  data,
  setData,
  clientData,
  tab,
  setFolderData,
  folderData,
  setParentId,
  parentId,
  setFolderList,
  loading,
  query,
  setRecall,
  setRename,
  isCreate,
  setIsCreate,
  setIsFile,
  setIsCreateFolder,
}) {
  const router = useRouter();
  const [mainData, setMainData] = useState(data);
  const [mainDataAll, setMainDataAll] = useState(data);
  const { clients, folders, clientId, name, trash } = query;
  const [isSort, setIsSort] = useState(false);
  const [sortSelect, setSortSelect] = useState(1);
  const [files, setFiles] = useState(null);
  const [filesAll, setFilesAll] = useState([]);
  const [select, setSelect] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isList, setIsList] = useState(false);
  const [previousPage, setpreviousPage] = useState(null);
  console.log(select)
  console.log(name)
  const handleFileChange = (event, folderName) => {
    const uploadedFiles = event.target.files;
    const newFiles = Array.from(uploadedFiles);

    const newData = data.map((folder) => {
      if (folder.name === folderName) {
        return {
          ...folder,
          files: [...folder.files, ...newFiles],
        };
      }
      return folder;
    });

    setData(newData);
  };
  useEffect(() => {
    if (tab == 1 || tab == 2) {
      setMainData(data);
      setMainDataAll(data);
    } else {
      setMainData(clientData);
      setMainDataAll(clientData);
    }
  }, [data, clientData]);
  const deleteFiles = () => {
    const ids = selectedIndexes.map((item) => data[item]._id);
    if (ids.length == 0) {
      toast.error("Please select file to delete");
      return;
    }
    axios
      .post("https://freedygoservices.in/api/folder/delete", {
        ids,
        type: trash ? 2 : 1,
      })
      .then((res) => {
        setRecall();
        toast.success('Documents deleted successfully');
        setSelectedIndexes([]);
        setSelect(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const restoreFile = () => {
    const ids = selectedIndexes.map((item) => data[item]._id);
    if (ids.length == 0) {
      toast.error("Please select file to delete");
      return;
    }
    axios
      .post("https://freedygoservices.in/api/folder/restore", {
        ids,
        type: trash ? 2 : 1,
      })
      .then((res) => {
        setRecall();
        toast.success('Documents restored successfully');
        setSelectedIndexes([]);
        setSelect(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  useEffect(() => {
    setFilesAll(files);
  }, [folderData]);
  useEffect(() => {
    const data = localStorage.getItem("previousPage");
    setpreviousPage(data);
  }, []);
  const changeHandler = (value) => {
    if (value.length > 0) {
      const options = {
        includeScore: true,
        keys: ["fileName", "lastName", "firstName"],
      };
      const fuse = new Fuse(mainDataAll, options);
      const result = fuse.search(value);
      setMainData(result.map((item) => item.item));
    } else {
      setMainData(mainDataAll);
    }
  };
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(
        Array.from({ length: clientData.length }, (_, index) => index)
      );
    }
    setSelectAll(!selectAll);
  };

  const sort = ["A to Z", "Date Modified", "Size"];
  const sortClientData = (data, selectedIndex) => {
    switch (sort[selectedIndex]) {
      case "A to Z":
        return data.sort((a, b) => a.firstName.localeCompare(b.firstName));

      case "Date Modified":
        return data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      case "Type":

      default:
        return data;
    }
  };
  const handleSortSelect = (index) => {
    setSortSelect(index);
    // const sortedData = sortClientData([...clientData], index);
  };
  const sortData = (data) => {
    if (sortSelect == 0) {
      return data?.sort((a, b) => a.fileName.localeCompare(b.fileName));
    } else if (sortSelect == 1) {
      return data?.sort((a, b) => a.updatedAt - b.updatedAt);
    } else if (sortSelect == 2) {
      return data?.sort((a, b) => a.size - b.size);
    }
  };
  return (
    <div className="flex flex-col gap-4 ml:w-[80%] w-[100%] ">
      <div className="flex justify-between">
        <p className="text-[24px] font-semibold ml:block hidden">My Collection</p>
        <button
          onClick={(e) => {
            setIsCreate(!isCreate);
            e.stopPropagation();
          }}
          disabled={tab != 1}
          className={`rounded-[8px] text-[14px] font-semibold px-4 py-2 ml:hidden flex gap-2 justify-center relative items-center w-[98px] bg-blue text-white `}
          style={{ opacity: tab == 1 ? 1 : 0.6 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g mask="url(#mask0_1346_17971)">
              <path
                d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                fill="white"
              />
            </g>
          </svg>
          New
          {isCreate && (
            <>
              <div
                className="absolute flex text-[14px] text-[#000000] rounded-[8px] left-0 right-0 z-10 top-[110%] w-[165px] p-4 gap-4 bg-white"
                style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div
                  onClick={(e) => {
                    setIsFile(false);
                    setIsCreateFolder(true);
                  }}
                  className="flex gap-1  items-center"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1304_20124)">
                      <path
                        d="M14.25 15.75H15.75V13.75H17.75V12.25H15.75V10.25H14.25V12.25H12.25V13.75H14.25V15.75ZM4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H9.79803L11.798 6.5H19.6923C20.1974 6.5 20.625 6.675 20.975 7.025C21.325 7.375 21.5 7.80257 21.5 8.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V8.3077C20 8.21795 19.9711 8.14422 19.9134 8.08652C19.8557 8.02883 19.782 7.99998 19.6923 7.99998H11.1846L9.1846 5.99998H4.3077C4.21795 5.99998 4.14423 6.02882 4.08653 6.08652C4.02883 6.14423 3.99998 6.21795 3.99998 6.3077V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  New Folder
                </div>

                <div
                  className="flex gap-1 items-center upload-btn-wrapper"
                  onClick={(e) => {
                    setIsFile(true);
                    setIsCreateFolder(true);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1304_20136)">
                      <path
                        d="M11.25 18.3846H12.7499V13.9499L14.6 15.7999L15.6538 14.7307L12 11.0769L8.34615 14.7307L9.41535 15.7846L11.25 13.9499V18.3846ZM6.3077 21.5C5.80257 21.5 5.375 21.325 5.025 20.975C4.675 20.625 4.5 20.1974 4.5 19.6923V4.3077C4.5 3.80257 4.675 3.375 5.025 3.025C5.375 2.675 5.80257 2.5 6.3077 2.5H14.25L19.5 7.74995V19.6923C19.5 20.1974 19.325 20.625 18.975 20.975C18.625 21.325 18.1974 21.5 17.6922 21.5H6.3077ZM13.5 8.49995V3.99998H6.3077C6.23077 3.99998 6.16024 4.03203 6.09612 4.09613C6.03202 4.16024 5.99997 4.23077 5.99997 4.3077V19.6923C5.99997 19.7692 6.03202 19.8397 6.09612 19.9038C6.16024 19.9679 6.23077 20 6.3077 20H17.6922C17.7692 20 17.8397 19.9679 17.9038 19.9038C17.9679 19.8397 18 19.7692 18 19.6923V8.49995H13.5Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  {/* <input
                        multiple
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) =>
                          handleFileChange(event, folderData.folderName)
                        }
                      /> */}
                  Upload Files
                </div>
              </div>
            </>
          )}
        </button>
        <div
          className="bg-[#FFFFFF] rounded-[36px] py-[10px] px-3 flex gap-2 items-center "
          style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
        >
          <svg
            className="cursor-pointer"
            onClick={() => setIsList(true)}
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.50033 11.9997H15.667V9.77051H6.50033V11.9997ZM2.33366 4.22884H4.83366V1.99967H2.33366V4.22884ZM2.33366 8.12467H4.83366V5.89551H2.33366V8.12467ZM2.33366 11.9997H4.83366V9.77051H2.33366V11.9997ZM6.50033 8.12467H15.667V5.89551H6.50033V8.12467ZM6.50033 4.22884H15.667V1.99967H6.50033V4.22884ZM2.33366 13.6663C1.87533 13.6663 1.48296 13.5031 1.15658 13.1768C0.830187 12.8504 0.666992 12.458 0.666992 11.9997V1.99967C0.666992 1.54134 0.830187 1.14898 1.15658 0.822591C1.48296 0.496202 1.87533 0.333008 2.33366 0.333008H15.667C16.1253 0.333008 16.5177 0.496202 16.8441 0.822591C17.1705 1.14898 17.3337 1.54134 17.3337 1.99967V11.9997C17.3337 12.458 17.1705 12.8504 16.8441 13.1768C16.5177 13.5031 16.1253 13.6663 15.667 13.6663H2.33366Z"
              fill={isList ? "#333333" : "#808080"}
            />
          </svg>
          <div className="h-full w-[1px] bg-[#DEDEDE]"></div>
          <svg
            className="cursor-pointer"
            onClick={() => setIsList(false)}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 7.16667V0.5H7.16667V7.16667H0.5ZM0.5 15.5V8.83333H7.16667V15.5H0.5ZM8.83333 7.16667V0.5H15.5V7.16667H8.83333ZM8.83333 15.5V8.83333H15.5V15.5H8.83333ZM2.16667 5.5H5.5V2.16667H2.16667V5.5ZM10.5 5.5H13.8333V2.16667H10.5V5.5ZM10.5 13.8333H13.8333V10.5H10.5V13.8333ZM2.16667 13.8333H5.5V10.5H2.16667V13.8333Z"
              fill={!isList ? "#333333" : "#808080"}
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4  border border-[#DEDEDE] bg-white ms:p-6 p-2  rounded-[16px] h-full ">
        <div className="flex flex-col-reverse gap-4 w-full  ">
          <div className={` ${select ? "flex" : "hidden"} gap-12  items-center w-[100%] h-[40px] `}>
            {select ? (
              <div className="bg-[#D1EDFF] flex sm:gap-4  gap-2 rounded-[50px] pl-[6px] sm:pr-4 pr-2 py-[6px] items-center w-full scr540:min-w-[440px]  ">
                <div
                  onClick={() => setSelect(false)}
                  style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
                  className="bg-[#F9F9F9] rounded-[50%] p-[8.5px]  cursor-pointer"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 10.5L0.5 9.5L4.5 5.5L0.5 1.5L1.5 0.5L5.5 4.5L9.5 0.5L10.5 1.5L6.5 5.5L10.5 9.5L9.5 10.5L5.5 6.5L1.5 10.5Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
                <div className="flex ms:gap-6 sm:gap-4 gap-2 w-full scr540:justify-start justify-between ">
                  <div className="flex gap-2 text-[14px] font-medium">
                    <label className="flex items-center gap-2 text-[14px] font-medium">
                      Select All
                      <input
                        type="checkbox"
                        className=" rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox cursor-pointer"
                        style={{ width: "20px", height: "20px" }}
                        checked={selectAll}
                        onChange={toggleSelectAll}
                      />
                    </label>
                  </div>

                  <div className=" scr540:flex hidden gap-3 justify-end">
                    {trash ? (
                      <>
                        <svg
                          onClick={restoreFile}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g mask="url(#mask0_1721_19645)">
                            <path
                              d="M10 14C10.9722 14 11.7986 13.6597 12.4792 12.9792C13.1597 12.2986 13.5 11.4722 13.5 10.5C13.5 9.52778 13.1597 8.70139 12.4792 8.02083C11.7986 7.34028 10.9722 7 10 7C9.46715 7 8.96935 7.11458 8.5066 7.34375C8.04387 7.57292 7.65278 7.875 7.33333 8.25V7H6.33333V10H9.33333V9H8C8.23611 8.69444 8.52778 8.45139 8.875 8.27083C9.22222 8.09028 9.59722 8 10 8C10.6923 8 11.282 8.24381 11.7692 8.73144C12.2564 9.21905 12.5 9.80933 12.5 10.5023C12.5 11.1952 12.2564 11.7847 11.7692 12.2708C11.282 12.7569 10.6923 13 10 13C9.59722 13 9.22222 12.9097 8.875 12.7292C8.52778 12.5486 8.23611 12.3056 8 12H6.85417C7.13194 12.5972 7.54861 13.0799 8.10417 13.4479C8.65972 13.816 9.29167 14 10 14ZM5.4941 18C5.08137 18 4.72917 17.8531 4.4375 17.5594C4.14583 17.2656 4 16.9125 4 16.5V3.5C4 3.0875 4.14687 2.73438 4.44062 2.44063C4.73437 2.14688 5.0875 2 5.5 2H12L16 6V16.5C16 16.9125 15.853 17.2656 15.5591 17.5594C15.2652 17.8531 14.9119 18 14.4992 18H5.4941ZM5.5 16.5H14.5V6.625L11.375 3.5H5.5V16.5Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                        <div className="min-w-[1px] h-full bg-[#06A9EF] " />
                      </>
                    ) : (
                      <>
                        {" "}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g mask="url(#mask0_1381_18129)">
                            <path
                              d="M10.1641 11.6654L8.8099 13.0195L9.97656 14.1862L13.3307 10.832L9.97656 7.47786L8.8099 8.64453L10.1641 9.9987H6.66406V11.6654H10.1641ZM3.33073 16.6654C2.8724 16.6654 2.48003 16.5022 2.15365 16.1758C1.82726 15.8494 1.66406 15.457 1.66406 14.9987V4.9987C1.66406 4.54036 1.82726 4.148 2.15365 3.82161C2.48003 3.49523 2.8724 3.33203 3.33073 3.33203H8.33073L9.9974 4.9987H16.6641C17.1224 4.9987 17.5148 5.16189 17.8411 5.48828C18.1675 5.81467 18.3307 6.20703 18.3307 6.66536V14.9987C18.3307 15.457 18.1675 15.8494 17.8411 16.1758C17.5148 16.5022 17.1224 16.6654 16.6641 16.6654H3.33073ZM3.33073 14.9987H16.6641V6.66536H9.3099L7.64323 4.9987H3.33073V14.9987Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                        <div className="min-w-[1px] h-full bg-[#06A9EF] ">
                          {" "}
                        </div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g mask="url(#mask0_1381_18133)">
                            <path
                              d="M7.5 15.0003C7.04167 15.0003 6.64931 14.8371 6.32292 14.5107C5.99653 14.1844 5.83333 13.792 5.83333 13.3337V3.33366C5.83333 2.87533 5.99653 2.48296 6.32292 2.15658C6.64931 1.83019 7.04167 1.66699 7.5 1.66699H15C15.4583 1.66699 15.8507 1.83019 16.1771 2.15658C16.5035 2.48296 16.6667 2.87533 16.6667 3.33366V13.3337C16.6667 13.792 16.5035 14.1844 16.1771 14.5107C15.8507 14.8371 15.4583 15.0003 15 15.0003H7.5ZM7.5 13.3337H15V3.33366H7.5V13.3337ZM4.16667 18.3337C3.70833 18.3337 3.31597 18.1705 2.98958 17.8441C2.66319 17.5177 2.5 17.1253 2.5 16.667V5.00033H4.16667V16.667H13.3333V18.3337H4.16667Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                        {!clients &&
                        <div className="min-w-[1px] h-full bg-[#06A9EF] ">
                          {" "}
                        </div>
}
                      </>
                    )}
                    {!clients &&
                      <svg
                        onClick={deleteFiles}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_1381_18138)">
                          <path
                            d="M5.83594 17.5C5.3776 17.5 4.98524 17.3368 4.65885 17.0104C4.33247 16.684 4.16927 16.2917 4.16927 15.8333V5H3.33594V3.33333H7.5026V2.5H12.5026V3.33333H16.6693V5H15.8359V15.8333C15.8359 16.2917 15.6727 16.684 15.3464 17.0104C15.02 17.3368 14.6276 17.5 14.1693 17.5H5.83594ZM14.1693 5H5.83594V15.8333H14.1693V5ZM7.5026 14.1667H9.16927V6.66667H7.5026V14.1667ZM10.8359 14.1667H12.5026V6.66667H10.8359V14.1667Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                    }
                    {trash || selectedIndexes.length > 1 ? null : (
                      <>
                        {" "}
                        <div className="min-w-[1px] h-full bg-[#06A9EF] ">
                          {" "}
                        </div>
                        <svg
                          onClick={() => setRename(selectedIndexes[0])}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g mask="url(#mask0_1381_18142)">
                            <path
                              d="M2 20V16H18V20H2ZM5.5 12.5H6.5625L12.375 6.6875L11.8333 6.125L11.3125 5.625L5.5 11.4375V12.5ZM4 14V10.8142L12.375 2.4375C12.5278 2.28472 12.6933 2.17361 12.8716 2.10417C13.0499 2.03472 13.2374 2 13.4341 2C13.6308 2 13.8194 2.03472 14 2.10417C14.1806 2.17361 14.3479 2.28431 14.5022 2.43627L15.5625 3.5C15.7153 3.65278 15.8264 3.81944 15.8958 4C15.9653 4.18056 16 4.37081 16 4.57077C16 4.75823 15.9656 4.94256 15.8969 5.12377C15.8281 5.30498 15.7188 5.47057 15.5688 5.62054L7.1875 14H4ZM12.375 6.6875L11.8333 6.125L11.3125 5.625L12.375 6.6875Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                      </>
                    )}
                  </div>


                  <div className="text-[14px] font-semibold min-w-[85px] items-center flex justify-end">
                    {selectedIndexes.length} selected
                  </div>
                  <svg className="scr540:hidden" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g mask="url(#mask0_1759_35016)">
                      <path d="M13.9997 20.6673C13.5413 20.6673 13.149 20.5041 12.8226 20.1777C12.4962 19.8513 12.333 19.459 12.333 19.0007C12.333 18.5423 12.4962 18.15 12.8226 17.8236C13.149 17.4972 13.5413 17.334 13.9997 17.334C14.458 17.334 14.8504 17.4972 15.1768 17.8236C15.5031 18.15 15.6663 18.5423 15.6663 19.0007C15.6663 19.459 15.5031 19.8513 15.1768 20.1777C14.8504 20.5041 14.458 20.6673 13.9997 20.6673ZM13.9997 15.6673C13.5413 15.6673 13.149 15.5041 12.8226 15.1777C12.4962 14.8513 12.333 14.459 12.333 14.0007C12.333 13.5423 12.4962 13.15 12.8226 12.8236C13.149 12.4972 13.5413 12.334 13.9997 12.334C14.458 12.334 14.8504 12.4972 15.1768 12.8236C15.5031 13.15 15.6663 13.5423 15.6663 14.0007C15.6663 14.459 15.5031 14.8513 15.1768 15.1777C14.8504 15.5041 14.458 15.6673 13.9997 15.6673ZM13.9997 10.6673C13.5413 10.6673 13.149 10.5041 12.8226 10.1777C12.4962 9.85135 12.333 9.45898 12.333 9.00065C12.333 8.54232 12.4962 8.14996 12.8226 7.82357C13.149 7.49718 13.5413 7.33398 13.9997 7.33398C14.458 7.33398 14.8504 7.49718 15.1768 7.82357C15.5031 8.14996 15.6663 8.54232 15.6663 9.00065C15.6663 9.45898 15.5031 9.85135 15.1768 10.1777C14.8504 10.5041 14.458 10.6673 13.9997 10.6673Z" fill="#1C1B1F" />
                    </g>
                  </svg>

                </div>
              </div>
            ) : (
              <div className="mobile">
                {/* {name && (
                  <div className="flex gap-4  items-center h-[40px] min-w-[185px] ">
                    <svg
                      className="bg-[#FFF] p-2 rounded-[50%] border border-[#DEDEDE] cursor-pointer"
                      onClick={() => router.back()}
                      width="36"
                      height="36"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.95831 15.3892L15.9584 25.3892L14 27.3337L0.666687 14.0003L14 0.666992L15.9584 2.61141L5.95831 12.6115H27.3334V15.3892H5.95831Z"
                        fill="#1C1B1F"
                      />
                    </svg>
                    <div className="text-[14px] font-medium py-[5.8px] px-4 rounded-[36px] border border-blue">
                      {name}
                    </div>
                  </div>
                )} */}
              </div>
            )}
          </div>
          <div className="flex justify-between ml:gap-4 gap-2">
            <div className="">
              {name && (
                <div className="flex gap-4  items-center h-[40px] ml:min-w-[185px] ">
                  <svg
                    className="bg-[#FFF] p-2 rounded-[50%] border border-[#DEDEDE] cursor-pointer"
                    onClick={() => router.back()}
                    width="36"
                    height="36"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.95831 15.3892L15.9584 25.3892L14 27.3337L0.666687 14.0003L14 0.666992L15.9584 2.61141L5.95831 12.6115H27.3334V15.3892H5.95831Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  <div className="text-[14px] font-medium py-[5.8px] px-4 rounded-[36px] border border-blue web">
                    {name}
                  </div>
                </div>
              )}
            </div>
            <div className=" ml:w-[65%] w-[80%] flex justify-end ml:gap-4 gap-2 items-center h-[38px] ">
              <div className="rounded-[30px] py-2 px-3 flex gap-2 bg-[#E9EEF6] w-[336px]  items-center h-[40px] sm:min-w-[138px] min-w-[60%]  ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.499 15.5L18.999 19L15.499 15.5ZM4.99902 11C4.99902 11.7879 5.15422 12.5681 5.45575 13.2961C5.75727 14.0241 6.19923 14.6855 6.75638 15.2426C7.31353 15.7998 7.97497 16.2417 8.70292 16.5433C9.43088 16.8448 10.2111 17 10.999 17C11.787 17 12.5672 16.8448 13.2951 16.5433C14.0231 16.2417 14.6845 15.7998 15.2417 15.2426C15.7988 14.6855 16.2408 14.0241 16.5423 13.2961C16.8438 12.5681 16.999 11.7879 16.999 11C16.999 9.4087 16.3669 7.88258 15.2417 6.75736C14.1164 5.63214 12.5903 5 10.999 5C9.40772 5 7.8816 5.63214 6.75638 6.75736C5.63116 7.88258 4.99902 9.4087 4.99902 11V11Z"
                    stroke="#1F1F1F"
                    strokeWidth="1.71429"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  onChange={(e) => changeHandler(e.target.value)}
                  className="w-full bg-[#E9EEF6] text-[#333333]"
                  type="text"
                  placeholder="Search File"
                />
              </div>
              <div className=" flex gap-2 px-5 py-2 bg-[#E9EEF6] rounded-[30px] sm:w-[210px] h-[40px]">
                <div
                  onClick={() => setSelect(!select)}
                  className=" flex gap-2 text-[14px] font-medium  items-center cursor-pointer "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1148_17404)">
                      <path
                        d="M11.8548 15.3759C11.548 15.3759 11.2839 15.2651 11.0622 15.0435C10.8406 14.8219 10.7298 14.5577 10.7298 14.251V11.1067C10.7298 10.8 10.8406 10.5358 11.0622 10.3142C11.2839 10.0926 11.548 9.98175 11.8548 9.98175H14.999C15.3057 9.98175 15.5699 10.0926 15.7915 10.3142C16.0132 10.5358 16.124 10.8 16.124 11.1067V14.251C16.124 14.5577 16.0132 14.8219 15.7915 15.0435C15.5699 15.2651 15.3057 15.3759 14.999 15.3759H11.8548ZM11.8548 14.251H14.999V11.1067H11.8548V14.251ZM1.87402 13.2413V12.1163H8.33556V13.2413H1.87402ZM11.8548 8.02016C11.548 8.02016 11.2839 7.90935 11.0622 7.68773C10.8406 7.4661 10.7298 7.20193 10.7298 6.8952V3.75096C10.7298 3.44423 10.8406 3.18006 11.0622 2.95843C11.2839 2.7368 11.548 2.62598 11.8548 2.62598H14.999C15.3057 2.62598 15.5699 2.7368 15.7915 2.95843C16.0132 3.18006 16.124 3.44423 16.124 3.75096V6.8952C16.124 7.20193 16.0132 7.4661 15.7915 7.68773C15.5699 7.90935 15.3057 8.02016 14.999 8.02016H11.8548ZM11.8548 6.8952H14.999V3.75096H11.8548V6.8952ZM1.87402 5.88557V4.76059H8.33556V5.88557H1.87402Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>

                  <p className="sm:block  hidden">Select</p>
                </div>
                {trash ? null : (
                  <>
                    {" "}
                    {/* <div className="w-[1px] h-full bg-white"></div>
                  <div className="  flex gap-2 text-[14px] font-medium items-center  ">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_1148_17389)">
                        <path
                          d="M7.5 13.5V12H10.5V13.5H7.5ZM4.5 9.75V8.25H13.5V9.75H4.5ZM2.25 6V4.5H15.75V6H2.25Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                    Filter
                  </div> */}
                    <div className="w-[1px] h-full bg-white"></div>
                    <div
                      onClick={() => setIsSort(!isSort)}
                      className=" flex gap-2 text-[14px] font-medium items-center relative cursor-pointer sm:w-[78px]"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_1142_17256)">
                          <path
                            d="M6.30289 9.48938V4.02879L4.17692 6.15476L3.375 5.36439L6.86537 1.87402L10.3557 5.36439L9.55384 6.15476L7.42787 4.02879V9.48938H6.30289ZM11.1274 16.124L7.63701 12.6336L8.43891 11.8432L10.5649 13.9692V8.50864H11.6899V13.9692L13.8158 11.8432L14.6177 12.6336L11.1274 16.124Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                      <p className="sm:block  hidden">Sort By</p>
                      {isSort && (
                        <>
                          <div
                            className="absolute flex flex-col text-[14px] text-[#000000] rounded-[8px] right-[-20%] z-10 top-[140%] min-w-[150px] p-4 gap-4 bg-white"
                            style={{
                              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            {sort?.map((item, index) => (
                              <div
                                key={index}
                                onClick={() => handleSortSelect(index)}
                                className="flex gap-2 items-center"
                              >
                                {sortSelect === index ? (
                                  <svg
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4.00295 7.5C3.02876 7.5 2.20139 7.1607 1.52083 6.48211C0.840278 5.80351 0.5 4.97712 0.5 4.00295C0.5 3.02876 0.839296 2.20139 1.51789 1.52083C2.19649 0.840278 3.02288 0.5 3.99705 0.5C4.97124 0.5 5.79861 0.839295 6.47917 1.51789C7.15972 2.19649 7.5 3.02288 7.5 3.99705C7.5 4.97124 7.1607 5.79861 6.48211 6.47917C5.80351 7.15972 4.97712 7.5 4.00295 7.5Z"
                                      fill="#808080"
                                    />
                                  </svg>
                                ) : (
                                  <div className="w-[8px] h-[8px]"> </div>
                                )}
                                {item}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
        {loading ? (
          <MiniLoader />
        ) : (
          <Files
            isList={isList}
            selectedIndexes={selectedIndexes}
            setSelectedIndexes={setSelectedIndexes}
            setSelect={setSelect}
            select={select}
            setTabIndex={setTabIndex}
            setFolderData={setFolderData}
            tabIndex={tabIndex}
            data={sortData(mainData)}
            setData={setData}
            files={files}
            setFiles={setFiles}
            clientData={sortData(mainData)}
            tab={tab}
            setParentId={setParentId}
            parentId={parentId}
            setFolderList={setFolderList}
            query={query}
          />
        )}
      </div>
    </div>
  );
}

export default Folders;
