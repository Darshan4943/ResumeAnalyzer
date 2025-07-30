import axios from "axios";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import ClientFolders from "./clientFolders";
import MyFolders from "./MyFolders";
import { useRouter } from "next/router";

function Files({
  isList,
  tabIndex,
  setTabIndex,
  data,
  setData,
  setFolderData,
  files,
  setFiles,
  clientData,
  tab,
  select,
  setSelect,
  selectedIndexes,
  setSelectedIndexes,
  setParentId,
  parentId,
  setFolderList,
  query,
  rename,
  getData,
  setRename,
  selectJob,
  setSelectJob
}) {
  const [clientId, setClientId] = useState();
  const router = useRouter();
  const [clientResumes, setClientResumes] = useState();
  const dispatch = useDispatch();

  const openFolder = (index, parentId, name, item) => {

    if (item?.type == "file") {
      window.location.href = item.file;
    } else {
      localStorage.setItem("previousPage", window.location.href);
      router.push({
        pathname: "/myCollection",
        query: { ...query, name, parentId },
      });
    }
  };

  const openClientFolder = (index, clientId, name, item) => {
    if (item?.resumeUrl?.includes("pdf")) {
      window.location.href = item.resumeUrl;
    } else {
      localStorage.setItem("previousPage", window.location.href);
      router.push({
        pathname: "/myCollection",
        query: { ...query, skilotechCollection: true, name, clientId },
      });
    }
  };
  const toggleSelect = (item) => {
    if (clientData[item]?._id && clientData[item]?.fileName === "CVs From Skilotech") {
      return;
    }

    setSelectedIndexes((prev) =>
      prev.includes(item._id)
        ? prev.filter((i) => i !== item._id)
        : [...prev, item._id]
    );
  };


  useEffect(() => {
    if (clientId) {
      axios
        .get("https://api.skilotech.com/api/resume/" + clientId)
        .then((res) => {
          setClientResumes(res.data.data);
          setFiles(
            res.data.data.map((file) => ({
              ...file,
              fileExtension: file.resumeUrl.split(".").pop(),
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clientId, tab, tabIndex]);

  return (
    <>
      {(tab === 0 || tab === 2) && (
        <>
          <MyFolders
            isList={isList}
            selectedIndexes={selectedIndexes}
            setSelectedIndexes={setSelectedIndexes}
            setSelect={setSelect}
            select={select}
            setTabIndex={setTabIndex}
            setFolderData={setFolderData}
            tabIndex={tabIndex}
            data={data}
            setData={setData}
            files={files}
            setFiles={setFiles}
            clientData={clientData}
            tab={tab}
            openFolder={openFolder}
            toggleSelect={toggleSelect}
            rename={rename}
            getData={getData}
            setRename={setRename}
             setSelectJob={setSelectJob}
            selectJob={selectJob}

          />
        </>
      )}
      {tab === 1 && (
        <>
          <ClientFolders
            isList={isList}
            selectedIndexes={selectedIndexes}
            setSelectedIndexes={setSelectedIndexes}
            setSelect={setSelect}
            select={select}
            setTabIndex={setTabIndex}
            setFolderData={setFolderData}
            tabIndex={tabIndex}
            data={data}
            setData={setData}
            files={files}
            setFiles={setFiles}
            clientData={clientData}
            tab={tab}
            openClientFolder={openFolder}
            toggleSelect={toggleSelect}
            query={query}
          />
        </>
      )}
    </>
  );
}

export default Files;
