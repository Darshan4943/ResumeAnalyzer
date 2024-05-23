import axios from "axios";
import React, { useEffect, useState } from "react";
import { reCallUserData } from "../../../../../Redux/actions/user";
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
        pathname: "/collection",
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
        pathname: "/collection",
        query: { ...query, clients: true, name, clientId },
      });
    }
  };
  const toggleSelect = (index) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  useEffect(() => {
    if (clientId) {
      axios
        .get("https://freedygoservices.in/api/resume/" + clientId)
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
      {(tab === 1 || tab === 2) && (
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
          openFolder={tab === 0 ? openClientFolder : openFolder}
          toggleSelect={toggleSelect}
        />
      )}
      {tab === 0 && (
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
          openClientFolder={openClientFolder}
          toggleSelect={toggleSelect}
          query={query}
        />
      )}
    </>
  );
}

export default Files;
