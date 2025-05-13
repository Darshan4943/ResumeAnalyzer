import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";


import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import MiniLoader from "../../components/common/miniLoader";
import MyCollectionFiles from "./MyCollectionFiles";


function MyCollectionFolder({
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
  unSyncFiles,
  getLimits,
  setOption
}) {

 
  const router = useRouter();
  const [mainData, setMainData] = useState(data);
  const [mainDataAll, setMainDataAll] = useState(data);
  const { skilotechCollection, folders, clientId, name, trash } = query;
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
  const [showDelete, setShowDelete] = useState(false);
  const [isOption, setIsOption] = useState(false);
  
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
      .post("https://jamblix.com/api/folder/delete", {
        ids,
        type: trash ? 2 : 1,
      })
      .then((res) => {
        setRecall();
        toast.success("Documents deleted successfully");
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
      toast.error("Please select file to restore");
      return;
    }
    axios
      .post("https://jamblix.com/api/folder/restore", {
        ids,
        type: trash ? 2 : 1,
      })
      .then((res) => {
        setRecall();
        toast.success("Documents restored successfully");
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
        clientData
          ?.map((client, index) => (client.fileName === "My Clients" ? null : index))
          .filter((index) => index !== null)
      );

    }
    setSelectAll(!selectAll);
  };

  const sort = ["A to Z", "Date Modified"];

  const sortClientData = (data, selectedIndex) => {

    if (sortSelect == 0) {
      return data?.sort((a, b) => a.firstName?.localeCompare(b.firstName));
    } else if (sortSelect == 1) {
      return data?.sort((a, b) => a.createdAt?.localeCompare(b.createdAt));
    } else if (sortSelect == 2) {
      return data?.sort((a, b) => a.size - b.size);
    }
  };
  const handleSortSelect = (index) => {
    setSortSelect(index);
    // const sortedData = sortClientData([...clientData], index);
  };
  const sortData = (data) => {
    if (sortSelect == 0) {
      return data?.sort((a, b) => a.fileName?.localeCompare(b.fileName));
    } else if (sortSelect == 1) {
      return data?.sort((a, b) => a.updatedAt?.localeCompare(b.updatedAt));
    } else if (sortSelect == 2) {
      return data?.sort((a, b) => a.size - b.size);
    }
  };

  useEffect(() => {
    if (data?.length === selectedIndexes?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedIndexes]);

  return (
    <div className="flex flex-col gap-4  w-[100%] ">
    

      <div className="flex flex-col gap-4   bg-white ms:p-6 p-2  rounded-[16px]   min-h-[560px] ">
        <div className="flex flex-col-reverse gap-4 w-full  ">
          {/* <div className="flex justify-end text-[14px] font-medium ">
            {unSyncFiles > 0 &&
              <div className="bg-[#FEFCE8] w-[245px] py-1 px-2 flex justify-between gap-2 items-center text-[#854D0E] rounded-[8px]">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g mask="url(#mask0_4063_46474)">
                    <path d="M3.71064 22.2075C3.52701 22.2075 3.36208 22.1626 3.21583 22.0729C3.06958 21.9832 2.95592 21.8648 2.87485 21.7178C2.79035 21.572 2.74385 21.414 2.73537 21.2439C2.72688 21.0738 2.77274 20.9053 2.87295 20.7385L12.1471 4.71818C12.2475 4.55135 12.373 4.42803 12.5236 4.34823C12.6743 4.26842 12.833 4.22852 12.9997 4.22852C13.1663 4.22852 13.325 4.26842 13.4758 4.34823C13.6264 4.42803 13.7519 4.55135 13.8523 4.71818L23.1264 20.7385C23.2266 20.9053 23.2725 21.0738 23.264 21.2439C23.2555 21.414 23.209 21.572 23.1245 21.7178C23.0434 21.8648 22.9298 21.9832 22.7835 22.0729C22.6373 22.1626 22.4723 22.2075 22.2887 22.2075H3.71064ZM12.9997 19.2909C13.2476 19.2909 13.4554 19.207 13.6231 19.0393C13.7909 18.8716 13.8747 18.6638 13.8747 18.4158C13.8747 18.1679 13.7909 17.9601 13.6231 17.7924C13.4554 17.6247 13.2476 17.5408 12.9997 17.5408C12.7518 17.5408 12.544 17.6247 12.3762 17.7924C12.2085 17.9601 12.1246 18.1679 12.1246 18.4158C12.1246 18.6638 12.2085 18.8716 12.3762 19.0393C12.544 19.207 12.7518 19.2909 12.9997 19.2909ZM13 16.4575C13.2303 16.4575 13.4233 16.3796 13.5787 16.224C13.7344 16.0682 13.8122 15.8752 13.8122 15.645V11.8533C13.8122 11.6231 13.7343 11.4302 13.5785 11.2745C13.4226 11.1187 13.2296 11.0408 12.9994 11.0408C12.769 11.0408 12.5761 11.1187 12.4206 11.2745C12.265 11.4302 12.1872 11.6231 12.1872 11.8533V15.645C12.1872 15.8752 12.2651 16.0682 12.4209 16.224C12.5767 16.3796 12.7697 16.4575 13 16.4575Z" fill="#FFD500" />
                  </g>
                </svg>

                {unSyncFiles} files syncing in progress
              </div>
            }
          </div> */}
          <div
            className={` ${select ? "flex" : "hidden"
              } gap-12  items-center w-[100%] h-[40px] `}
          >
           
          </div>
          <div className="flex justify-between ml:gap-4 gap-2">
            <div className="">
              {name && (
                <div className="flex gap-4  items-center h-[40px] ml:min-w-[185px] ">
                  <svg
                    className="bg-[#FFF] p-2 rounded-[50%] border border-[#DEDEDE] cursor-pointer"
                    onClick={() => router.push({
                      pathname: '/', 
                      query: { isCollection: true },
                    })
                    }
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
            <div className=" ml:w-[65%] w-[100%] flex justify-end ml:gap-4 gap-2 items-center h-[38px] ">
              <div className="rounded-[30px] py-2 px-3 flex gap-2  w-[80%]  items-center h-[40px] sm:min-w-[138px] min-w-[60%] border border-[#DEDEDE]  ">
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
                  className="w-full  text-[#333333]"
                  type="text"
                  placeholder="Search File"
                />
              </div>
             
            </div>

          </div>

        </div>

        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
       
        {loading ? (
          <MiniLoader />
        ) : (
          <MyCollectionFiles
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
            clientData={sortClientData(mainData)}
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

export default MyCollectionFolder;
