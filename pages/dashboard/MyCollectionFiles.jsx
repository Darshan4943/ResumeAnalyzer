import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import MyFolders1 from "./MyFolders1";

function MyCollectionFiles({
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
}) {
   
  const [clientId, setClientId] = useState();
  const router = useRouter();
  const [clientResumes, setClientResumes] = useState();
  const dispatch = useDispatch();

  const openFolder = (index, parentId, name, item) => {

    if (item?.type == "file") {
    //   window.location.href = item.file;
    } else {
   
      router.push({
        pathname: "/",
        query: { ...query, name, parentId },
      });
    }
  };

  const openClientFolder = (index, clientId, name, item) => {
    if (item?.resumeUrl?.includes("pdf")) {
    //   window.location.href = item.resumeUrl;
    } else {
      localStorage.setItem("previousPage", window.location.href);
      router.push({
        pathname: "/",
        query: { ...query, skilotechCollection: true, name, clientId },
      });
    }
  };
  const toggleSelect = (index) => {
    if (clientData[index]?.fileName === "My Clients") {
      return; // Prevent selection for "My Clients"
    }

    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
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
          <MyFolders1
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
          />
        </>
      )}
      
    </>
  );
}

export default MyCollectionFiles;
