import Fuse from "fuse.js";
import React, { useEffect, useReducer, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";


import { useRouter } from "next/router";
import Tesseract from "tesseract.js";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import Docxtemplater from "docxtemplater";

import {
  fileIconSeter,
  fileIconSeter1,
  fileIconSeter2,
} from "../../utils/middleware";
import Folders from "../../components/featured/candidate/createResume/components/folders";
import { setRecallData } from "../../Redux/slices/recallSlice";
import MiniLoader from "../../components/common/miniLoader";
import RequestCV from "../../components/common/RequestCV";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Collection() {
  const router = useRouter();
  const { skilotechCollection, folders, clientId, parentId, trash } = router.query;
  const { recallData } = useSelector((state) => state.recall);
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [rename, setRename] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState();
  const [folderList, setFolderList] = useState(null);
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const inputRef = useRef(null);
  const [tab, setTab] = useState(null);

  const [ParentId, setParentId] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileLoader, setFileLoader] = useState(false);
  const [textData, setTextData] = useState([]);
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);
  const [recall, setRecall] = useReducer((x) => x + 1, 0);
  const [uploadCount, setUploadCount] = useState(0);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [failedFiles, setFailedFiles] = useState([]);
  const [unSyncFiles, setUnSyncFiles] = useState(null)
  const [count, setCount] = useState("");
  const [refresh, setRefresh] = useState(true)
  const [collectionCount, setCollectionCount] = useState(0)
  const [error, setError] = useState("")

  const getLimits = () => {
    const collectionCountDaily = JSON.parse(localStorage.getItem("collectionCountDaily"));
    const collectionCountDailyLimit = JSON.parse(localStorage.getItem("collectionCountDailyLimit"));
    const collectionCountMonthly = JSON.parse(localStorage.getItem("collectionCountMonthly"));
    const collectionCountMonthlyLimit = JSON.parse(localStorage.getItem("collectionCountMonthlyLimit"));

    const remainingDaily = collectionCountDailyLimit - collectionCountDaily;
    const remainingMonthly = collectionCountMonthlyLimit - collectionCountMonthly;


    const finalLimit = Math.max(0, Math.min(remainingDaily, remainingMonthly));
    setCollectionCount(finalLimit)
  }
  useEffect(() => {
    getLimits()
  }, []);

  const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          pdf.getPage(pageNumber).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items.map((item) => item.str);
              resolve(textItems.join(" "));
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, [isCreate]);



  const getData = () => {

    if (folders == "true") {
      setTab(0);
      setTabIndex(0);
      if (clientId) {
        getClientData(clientId);

      }
      else if (parentId) {
        setParentId(parentId);
        getParentData(parentId);


      } else {
        getFolderData();

      }
    } else if (skilotechCollection == "true") {
      setLoading(false)
      setTab(1);
      setTabIndex(0);
      // if (!parentId) {
      //   getSkilotechCollectionData();
      // } else {
      //   setParentId(parentId);
      //   getParentData(parentId);
      // }

    } else if (trash == "true") {
      setTab(2);
      setTabIndex(0);
      getTrashed();

    } else {
      setTab(1);
      setTabIndex(0);
      // getFolderData();

    }
  };

  const getParentData = (parentId) => {
    axios
      .get(`https://dev.api.skilotech.com/api/folder/getByParentId/${parentId}`)
      .then((res) => {
        setFolderList(res.data.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getClientData = (clientId) => {
    axios
      .get("https://dev.api.skilotech.com/api/resume/" + clientId)
      .then((res) => {
        setFolderList(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFolderData = () => {
    setLoading(true);
    axios
      .get(`https://dev.api.skilotech.com/api/folder/get/${userDataGlobal?._id}`)
      .then((res) => {
        setFolderList(res.data.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const getSkilotechCollectionData = () => {
    setLoading(true);
    axios
      .get(
        `https://dev.api.skilotech.com/api/folder/getSkilotechCollectionData/${userDataGlobal?._id}`
      )
      .then((res) => {

        setFolderList(res.data.data[0].files);

        getParentData(res.data.data[0]._id);
        setParentId(res.data.data[0]._id)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const getTrashed = () => {
    setLoading(true);
    axios
      .get(`https://dev.api.skilotech.com/api/folder/getTrashed/${userDataGlobal?._id}`)
      .then((res) => {
        setFolderList(res.data.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUnSyncFiles = () => {

    axios
      .get(`https://dev.api.skilotech.com/api/getUnsyncedFile/${userDataGlobal?._id}`)
      .then((res) => {
        const files = res.data.data.filter(item => item.type === 'file');
        setUnSyncFiles(files.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {

    getUnSyncFiles();
    dispatch(setRecallData(!recallData));
    if (unSyncFiles > 0) {
      const interval = setInterval(() => {
        getUnSyncFiles()
        getData()
        dispatch(setRecallData(!recallData));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [unSyncFiles]);


  const createFolder = () => {
    setFileLoader(true);
    if (folderName?.length > 3) {
      const formData = new FormData();
      formData.append("fileName", folderName);
      formData.append("type", "folder");
      formData.append("userId", userDataGlobal?._id);
      formData.append("parentId", ParentId ? ParentId : undefined);

      axios
        .post("https://dev.api.skilotech.com/api/folder/create", formData)
        .then((res) => {
          setRecall();
          setIsCreateFolder(false);
          setFolderName("");
          toast.success("Folder created successfully");
          setFileLoader(false);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setFileLoader(false);
        });
    } else {
      toast.error("Please Enter valid folder name");
      setFileLoader(false);
    }
  };



  const parseData = () => {
    return new Promise((resolve, reject) => {
      const textDataPromises = Object.values(files).map(async (file, index) => {
        return new Promise((resolve) => {
          if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const reader = new FileReader();
            reader.onload = (e) => {
              const content = e.target.result;
              const doc = new Docxtemplater(new PizZip(content), {
                delimiters: {
                  start: "12op1j2po1j2poj1po",
                  end: "op21j4po21jp4oj1op24j",
                },
              });
              const text = doc.getFullText();
              resolve({ text, index });
            };
            reader.readAsBinaryString(file);
          } else if (file.type === "image/png") {
            Tesseract.recognize(file, "eng", {
              logger: (m) => console.log(m),
            }).then(({ data: { text } }) => {
              resolve({ text, index });
            });
          } else if (file.type === "application/pdf") {
            const pdfTextPromises = [];
            for (let i = 1; i <= 1; i++) {
              pdfTextPromises.push(fileToText(file, i));
            }
            Promise.all(pdfTextPromises).then((texts) => {
              const fullText = texts.join("");
              resolve({ text: fullText, index });
            });
          } else {
            resolve({ text: "", index });
          }
        });
      });

      Promise.all(textDataPromises).then((results) => {
        resolve(results.filter(result => result.text.length > 0));
      });
    });
  };

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    const textData = [];

    const allowedFiles = Array.from(selectedFiles).slice(0, collectionCount);
    if (allowedFiles.length) {
      const promises = allowedFiles.map((file, index) => {
        return new Promise((resolve) => {
          if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const reader = new FileReader();
            reader.onload = async (e) => {
              const content = e.target.result;
              const doc = new Docxtemplater(new PizZip(content), {
                delimiters: {
                  start: "12op1j2po1j2poj1po",
                  end: "op21j4po21jp4oj1op24j",
                },
              });
              const text = doc.getFullText();
              textData.push({ index, text });
              resolve();
            };
            reader.readAsBinaryString(file);
          } else if (file.type === "image/png") {
            Tesseract.recognize(file, "eng", {
              logger: (m) => console.log(m),
            }).then(({ data: { text } }) => {
              textData.push({ index, text });
              resolve();
            });
          } else if (file.type === "application/pdf") {
            fileToText(file, 1).then((text) => {
              textData.push({ index, text });
              resolve();
            });
          } else {
            resolve(); // For unsupported file types
          }
        });
      });

      await Promise.all(promises);
    }

    setTextData(textData); // Store extracted text globally
    setFiles(allowedFiles);
  };

  const addFiles = async () => {
    setCount(0);
    setFileLoader(true);

    if (files.length === 0) {
      toast.error("No File Selected");
      setFileLoader(false);
      return;
    }

    // Directly use `textData` instead of calling `parseData()`
    const promises = files.map(async (file, index) => {
      const textItem = textData.find((item) => item.index === index);
      const text = textItem ? textItem.text : null;
      return addData(file, index, text);
    });

    await Promise.all(promises);
  };




  const addData = async (file, index, text) => {

    return new Promise((resolve) => {
      setTimeout(async () => {
        const formData = new FormData();
        try {
          if (folderList.some((existingFile) => existingFile.fileName === file.name)) {
            setDuplicateFiles((prevDuplicateFiles) => [
              ...prevDuplicateFiles,
              { file, index },
            ]);
            setCount((prevCount) => prevCount + 1);
            return;
          }
          if (text === undefined || text === null || text.length <= 30) {
            setCount((prevCount) => prevCount + 1);
            setFailedFiles((prevFailedFiles) => [
              ...prevFailedFiles,
              { file, index, error: 'Invalid text' },
            ]);
            return;
          }

          formData.append("fileName", file.name);
          formData.append("type", "file");
          formData.append("userId", userDataGlobal?._id);
          formData.append("text", text);
          formData.append("file", file);
          formData.append("parentId", ParentId ? ParentId : undefined);

          try {
            const response = await axios.post(
              "https://dev.api.skilotech.com/api/folder/create",
              formData
            );
            setCount((prevCount) => prevCount + 1);
            setUploadCount((prevCount) => prevCount + 1);
            resolve({ index, response: response.data });
          } catch (e) {
            setCount((prevCount) => prevCount + 1);
            setFailedFiles((prevFailedFiles) => [
              ...prevFailedFiles,
              { file, index, error: e },
            ]);
          }
        } catch (err) {
          return;
        }
      }, 200);
    });
  };





  const handleButtonClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    if (files.length === count) {
      setFileLoader(false);
    }
  }, [count]);

  useEffect(() => {
    getData();
  }, [skilotechCollection, folders, clientId, parentId, userDataGlobal, recall]);




  // const updateCollectionLimit = async () => {
  //   if (uploadCount === 0) {
  //     console.log('No files to update. Skipping API call.');
  //     return { success: false, message: 'Files count is zero, no update needed.' };
  //   }
  //   try {

  //     const apiUrl = `https://dev.api.skilotech.com/api/apiLogs/updateCollectionCount/${userDataGlobal?._id}`;
  //     const response = await axios.put(apiUrl, { uploadCount });

  //     if (response.data.success) {

  //       setUploadCount(0);
  //    
  //       return response.data;
  //     } else {
  //       console.error('Error:', response.data.message);
  //       setUploadCount(0);
  //       return response.data;

  //     }
  //   } catch (error) {
  //     console.error('Something went wrong:', error);
  //     setUploadCount(0);
  //     return { success: false, message: 'Something went wrong', error };

  //   }

  // };

  const updateCollectionLimit = async () => {
    if (uploadCount === 0) {
      console.log('No files to update. Skipping API call.');
      return { success: false, message: 'Files count is zero, no update needed.' };
    }
    try {
      const apiUrl = `https://dev.api.skilotech.com/api/apiLogs/updateCollectionCount/${userDataGlobal?._id}`;
      const anotherApiUrl = `https://dev.api.skilotech.com/api/subscription/updateCollectionLimit/${userDataGlobal?._id}`;

      const updateCountPromise = axios.put(apiUrl, { uploadCount });
      const anotherApiPromise = axios.put(anotherApiUrl, { uploadCount });

      const [response, secondResponse] = await Promise.all([updateCountPromise, anotherApiPromise]);

      if (response.data.success) {

        setUploadCount(0);
        dispatch(setRecallData(!recallData));
      } else {
        console.error('First API call error:', response.data.message);
      }

      if (secondResponse.data.success) {

        console.log('Second API call was successful');
      } else {
        console.error('Second API call error:', secondResponse.data.message);
      }


      return {
        success: response.data.success && secondResponse.data.success,
        message: 'Both API calls completed',
        firstApiResponse: response.data,
        secondApiResponse: secondResponse.data,
      };
    } catch (error) {
      console.error('Something went wrong:', error);
      setUploadCount(0);
      return { success: false, message: 'Something went wrong', error };
    }
  };


  return (
    <>
      {isCreateFolder && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center    ">
            <div className="absolute  w-[90%]  scr460:w-[35%] scr460:min-w-[436px] rounded-[14px] bg-white px-4 py-2 flex flex-col gap-3 ">
              <div className="text-[24px] font-medium leading-tight">
                New {isFile ? "Files" : "Folder"}
              </div>
              {isFile ? (
                <div
                  ref={fileRef}
                  onDrop={handleFileChange}
                  className="border-dashed border-[3px] border-[#b4b4b4] flex flex-row w-full justify-center rounded-[12px] p-4 items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
                >
                  {fileLoader ? (
                    <>
                      <div className="miniLoader">
                        <div className="box max-h-[80px]">
                          <div className="container">
                            <span className="circle1"></span>
                            <span className="circle1"></span>
                            <span className="circle1"></span>
                            <span className="circle1"></span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {files.length !== count ? (
                        <>
                          {" "}
                          <input
                            type="file"
                            name="myfile"
                            onChange={handleFileChange}
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,"
                          />
                          {Object.keys(files).length > 0 ? (
                            <div className="w-full flex justify-center items-center">
                              <div className="flex flex-row gap-[16px] items-center justify-between w-[80%]  ">
                                <div className="flex flex-row gap-[16px] items-center  ">
                                  <span className="tex-[16px] font-[500]">
                                    ({Object.values(files).length}) Files
                                    Selected
                                  </span>
                                </div>
                                <button
                                  className="px-[16px] py-[8px] border border-[#06A9EF]  rounded-[12px]"
                                  onClick={handleButtonClick}
                                >
                                  Browse file
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="  flex  flex-col  items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  onClick={handleButtonClick}
                                >
                                  <g clipPath="url(#clip0_4121_52475)">
                                    <path
                                      d="M25 13.3333H25.0167"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_4121_52475">
                                      <rect
                                        width="40"
                                        height="40"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div className="flex flex-col gap-[4px]	font-normal	">
                                <div className="flex text-center justify-center  scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                                  <span
                                    onClick={handleButtonClick}
                                    className="text-[#06A9EF]"
                                  >
                                    &nbsp;Browse file{" "}
                                  </span>
                                  &nbsp;to upload PDF or DOCS
                                </div>
                                <p className="text-center text-[12px] font-normal text-[#7C8493]"></p>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col gap-3 font-medium w-full">
                          <div className="flex gap-2 items-center">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g mask="url(#mask0_3793_40528)">
                                <path
                                  d="M8.9375 10.875L7.6875 9.64583C7.53472 9.49306 7.36111 9.41667 7.16667 9.41667C6.97222 9.41667 6.79861 9.49306 6.64583 9.64583C6.49306 9.79861 6.41667 9.9757 6.41667 10.1771C6.41667 10.3785 6.49306 10.5556 6.64583 10.7083L8.41667 12.4792C8.56944 12.6319 8.74306 12.7083 8.9375 12.7083C9.13194 12.7083 9.30556 12.6319 9.45833 12.4792L13.3542 8.58333C13.5069 8.43056 13.5833 8.25347 13.5833 8.05208C13.5833 7.85069 13.5069 7.67361 13.3542 7.52083C13.2014 7.36806 13.0278 7.29167 12.8333 7.29167C12.6389 7.29167 12.4653 7.36806 12.3125 7.52083L8.9375 10.875ZM10 18C8.90278 18 7.86806 17.7917 6.89583 17.375C5.92361 16.9583 5.07292 16.3854 4.34375 15.6562C3.61458 14.9271 3.04167 14.0764 2.625 13.1042C2.20833 12.1319 2 11.0972 2 10C2 8.88889 2.20833 7.85069 2.625 6.88542C3.04167 5.92014 3.61458 5.07292 4.34375 4.34375C5.07292 3.61458 5.92361 3.04167 6.89583 2.625C7.86806 2.20833 8.90278 2 10 2C11.1111 2 12.1493 2.20833 13.1146 2.625C14.0799 3.04167 14.9271 3.61458 15.6562 4.34375C16.3854 5.07292 16.9583 5.92014 17.375 6.88542C17.7917 7.85069 18 8.88889 18 10C18 11.0972 17.7917 12.1319 17.375 13.1042C16.9583 14.0764 16.3854 14.9271 15.6562 15.6562C14.9271 16.3854 14.0799 16.9583 13.1146 17.375C12.1493 17.7917 11.1111 18 10 18Z"
                                  fill="#0C8A0A"
                                />
                              </g>
                            </svg>
                            {uploadCount} {uploadCount === 1 ? "file" : "files"}{" "}
                            uploaded successfully.
                          </div>
                          {duplicateFiles.length > 0 && (
                            <>
                              <div className="w-full h-[1px] bg-[#808080]">
                                {" "}
                              </div>
                              <div className="flex gap-2 items-center w-full">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M11.3438 9.28125H9.28125C8.90175 9.28125 8.59375 9.58925 8.59375 9.96875C8.59375 10.3482 8.90175 10.6562 9.28125 10.6562H11.3438V12.7188C11.3438 13.0982 11.6518 13.4062 12.0312 13.4062C12.4107 13.4062 12.7188 13.0982 12.7188 12.7188V10.6562H14.7812C15.1607 10.6562 15.4688 10.3482 15.4688 9.96875C15.4688 9.58925 15.1607 9.28125 14.7812 9.28125H12.7188V7.21875C12.7188 6.83925 12.4107 6.53125 12.0312 6.53125C11.6518 6.53125 11.3438 6.83925 11.3438 7.21875V9.28125Z"
                                    fill="#333333"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.8125 16.1562V5.15625H4.125C3.74516 5.15625 3.4375 5.46391 3.4375 5.84375V18.9062C3.4375 19.2861 3.74516 19.5938 4.125 19.5938H15.125C15.5048 19.5938 15.8125 19.2861 15.8125 18.9062V18.2188H6.875C5.73581 18.2188 4.8125 17.2954 4.8125 16.1562ZM17.875 4.89602V16.1562C17.875 16.5361 17.5673 16.8438 17.1875 16.8438H6.875C6.49516 16.8438 6.1875 16.5361 6.1875 16.1562V3.09375C6.1875 2.71391 6.49516 2.40625 6.875 2.40625H15.3852C15.4767 2.40625 15.564 2.44235 15.6283 2.50698L17.7743 4.653C17.8389 4.71728 17.875 4.80459 17.875 4.89602ZM4.125 3.78125C2.98581 3.78125 2.0625 4.70456 2.0625 5.84375V18.9062C2.0625 20.0454 2.98581 20.9688 4.125 20.9688H15.125C16.2642 20.9688 17.1875 20.0454 17.1875 18.9062V18.2188C18.3267 18.2188 19.25 17.2954 19.25 16.1562V4.89602C19.25 4.44021 19.0688 4.00296 18.7467 3.68052C18.2177 3.15149 17.1297 2.06353 16.6007 1.5345C16.2783 1.2124 15.841 1.03125 15.3852 1.03125H6.875C5.73581 1.03125 4.8125 1.95456 4.8125 3.09375V3.78125"
                                    fill="#333333"
                                  />
                                </svg>
                                {duplicateFiles.length} Duplicate{" "}
                                {duplicateFiles.length === 1 ? "file" : "files"}{" "}
                                found.
                              </div>
                              <div className="grid grid-cols-2 scr1300:gap-4 gap-x-3 gap-y-2 h-[60px] scr1300:px-4 overflow-y-auto mt-2">
                                {duplicateFiles.map((item, index) => (
                                  <>
                                    <div className="flex gap-2 text-[14px]">
                                      <div className="w-[24px] h-[22px]">
                                        {fileIconSeter2(item)}
                                      </div>

                                      {item.file.name.length > 14
                                        ? `${item.file.name.slice(0, 14)}...`
                                        : item.file.name}
                                    </div>
                                  </>
                                ))}
                              </div>
                            </>
                          )}
                          {failedFiles.length > 0 && (
                            <>
                              <div className="w-full h-[1px] bg-[#808080]">
                                {" "}
                              </div>

                              <div className="flex flex-col gap-3">
                                <p className="flex gap-2 items-center">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g mask="url(#mask0_3793_40534)">
                                      <path
                                        d="M10 11.0625L12.4167 13.4792C12.5694 13.6319 12.7465 13.7049 12.9479 13.6979C13.1493 13.691 13.3264 13.6111 13.4792 13.4583C13.6319 13.3056 13.7083 13.1285 13.7083 12.9271C13.7083 12.7257 13.6319 12.5489 13.4792 12.3967L11.0625 9.98958L13.4792 7.5825C13.6319 7.43028 13.7083 7.25347 13.7083 7.05208C13.7083 6.85069 13.6319 6.67361 13.4792 6.52083C13.3264 6.36806 13.1493 6.29167 12.9479 6.29167C12.7465 6.29167 12.5694 6.36806 12.4167 6.52083L10 8.9375L7.58333 6.52083C7.43056 6.36806 7.25694 6.29167 7.0625 6.29167C6.86806 6.29167 6.69444 6.36806 6.54167 6.52083C6.38889 6.67361 6.3125 6.85069 6.3125 7.05208C6.3125 7.25347 6.38826 7.43056 6.53979 7.58333L8.9375 10L6.52083 12.4167C6.36806 12.5694 6.29514 12.7431 6.30208 12.9375C6.30903 13.1319 6.38889 13.3056 6.54167 13.4583C6.69444 13.6111 6.87153 13.6875 7.07292 13.6875C7.27431 13.6875 7.45076 13.6117 7.60229 13.4602L10 11.0625ZM10.0058 18C8.90472 18 7.86806 17.7917 6.89583 17.375C5.92361 16.9583 5.07292 16.3854 4.34375 15.6562C3.61458 14.9271 3.04167 14.0767 2.625 13.105C2.20833 12.1333 2 11.0951 2 9.99042C2 8.88569 2.20833 7.85069 2.625 6.88542C3.04167 5.92014 3.61458 5.07292 4.34375 4.34375C5.07292 3.61458 5.92333 3.04167 6.895 2.625C7.86667 2.20833 8.90486 2 10.0096 2C11.1143 2 12.1493 2.20833 13.1146 2.625C14.0799 3.04167 14.9271 3.61458 15.6562 4.34375C16.3854 5.07292 16.9583 5.92167 17.375 6.89C17.7917 7.85847 18 8.89319 18 9.99417C18 11.0953 17.7917 12.1319 17.375 13.1042C16.9583 14.0764 16.3854 14.9271 15.6562 15.6562C14.9271 16.3854 14.0783 16.9583 13.11 17.375C12.1415 17.7917 11.1068 18 10.0058 18Z"
                                        fill="#C00000"
                                      />
                                    </g>
                                  </svg>
                                  {failedFiles.length}{" "}
                                  {failedFiles.length === 1 ? "file" : "files"}{" "}
                                  failed to upload.
                                </p>

                                <div className="text-red flex flex-col gap-2">
                                  <p className="font-medium">
                                    Possible reasons of failure :
                                  </p>
                                  <ol className="flex flex-col gap-2 ml-2 text-[14px]">
                                    <li className="flex">
                                      <p className="min-w-[10px]">1</p>
                                      <p className="min-w-[10px]"> :</p>
                                      <p>{`"The file size exceeds the 2MB limit"`}</p>
                                    </li>
                                    <li className="flex">
                                      <p className="min-w-[10px]">2</p>
                                      <p className="min-w-[10px]"> :</p>
                                      <p>{`"Unsupported file type. Only the latest versions of PDF and DOC files are allowed."`}</p>
                                    </li>
                                    <li className="flex">
                                      <p className="min-w-[10px]">3</p>
                                      <p className="min-w-[10px]"> :</p>
                                      <p>{`"The PDF file contains images, which are not allowed. Please upload a text-only PDF."`}</p>
                                    </li>
                                  </ol>
                                </div>

                                <div className="grid grid-cols-2 scr1300:gap-4 gap-x-3 gap-y-2 h-[60px] scr1300:px-4 overflow-y-auto mt-2">
                                  {failedFiles.map((item, index) => (
                                    <>
                                      <div className="flex gap-2 text-[14px] ">
                                        <div className="w-[24px] h-[22px]">
                                          {fileIconSeter2(item)}
                                        </div>

                                        {item.file.name.length > 14
                                          ? `${item.file.name.slice(0, 14)}...`
                                          : item.file.name}
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <input
                  className="border border-blue rounded-[8px] py-2 px-4"
                  ref={inputRef}
                  type="text"
                  value={folderName}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "Skilotech Collection") {
                      setError(`${newValue} not allowed`)
                      setFolderName(newValue);
                    } else {
                      setError("")
                      setFolderName(newValue);
                    }

                  }}
                />

              )}
              {fileLoader && isFile && Object.values(files).length > 1 && (
                <>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700">
                      Please Wait Uploading{" "}
                      {Object.keys(files).length > 0 ? "Files" : "File"}
                    </span>
                    <span className="text-sm font-medium text-blue-700">
                      {`${Math.round(
                        (uploadCount / Object.keys(files).length) * 100
                      ).toString() != "Infinity"
                        ? Math.round(
                          (uploadCount / Object.keys(files).length) * 100
                        )
                        : 100
                        }%`}
                    </span>
                  </div>
                  <div className="w-full bg-[#e8f0ff] rounded-full h-2.5">
                    <div
                      class="bg-[#06a9ef] h-2.5 rounded-full"
                      style={{
                        width: `${(uploadCount / Object.keys(files).length) * 100
                          }%`,
                      }}
                    ></div>
                  </div>
                </>
              )}
              {error &&
                <p className="text-red font-[500] text-[12px]">{error}</p>
              }

              <div className="flex justify-between gap-6">
                <div className={`text-[16px] font-medium ${collectionCount > 0 ? "text-[#000000]" : "text-red"}`} >
                  {isFile &&
                    <>
                      Daily upload limit : {collectionCount ? collectionCount : 0}
                    </>
                  }
                </div>

                <div className="flex justify-end gap-6 text-blue font-medium">
                  <button
                    disabled={fileLoader}
                    style={{ opacity: fileLoader ? 0.5 : 1 }}
                    onClick={() => {
                      setIsCreateFolder(false);
                      setFolderName("Untitled folder");
                      setCount("");
                      setFiles([]);

                      setFailedFiles([]);
                      setDuplicateFiles([]);
                      getData();
                      getUnSyncFiles()
                      setTimeout(() => {
                        getUnSyncFiles()
                      }, 10000);
                      updateCollectionLimit()

                    }}
                  >
                    Close
                  </button>
                  {count <= 0 && (
                    <button
                      //  id="border_button"
                      disabled={
                        fileLoader || error ||
                        (isFile ? Object.values(files).length === 0 : !folderName)
                      }
                      style={{
                        minWidth: "80px",
                        opacity:
                          fileLoader || error ||
                            (isFile
                              ? Object.values(files).length === 0
                              : !folderName)
                            ? 0.5
                            : 1,
                      }}
                      onClick={isFile ? addFiles : createFolder}
                    >
                      {fileLoader ? (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4  text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#06A9EF"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <>{isFile ? "Add Files" : "Create"}</>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
      <div className="">
        <div className="  flex ml:flex-row flex-col ml:justify-between  gap-4   relative  ">
          <div className="flex flex-col gap-5  justify-between ml:w-[25%] w-[100%]  min-w-[315px] ">
            <div className="flex flex-col gap-4 ">
              <p className="text-[18px] font-semibold h-[36px] ">
                My Collection
              </p>

              <div className="flex ml:flex-col flex-row  sm:gap-2 w-full  bg-white rounded-[16px] scr420:px-4 scr420:py-4  ml:justify-start justify-between py-2  px-2 ml:min-h-[560px]  ">

                <button
                  onClick={() => {
                    // setTab(1);
                    // setTabIndex(0);
                    router.push("/myCollection?folders=true");
                  }}
                  className={`rounded-[30px] sm:text-[14px] text-[12px] font-semibold scr900:px-6 sm:px-4 scr360:px-2 px-1 py-2 flex gap-2 ml:justify-start justify-center items-center ml:min-w-full sm:min-w-[30%] scr420:min-w-[110px] min-w-[90px]  ${tab === 0 && "bg-[#C2E7FF]"
                    }  `}
                >
                  <svg
                    className="scr420:block hidden"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1148_17425)">
                      <path
                        d="M2.49967 17.5003C2.04134 17.5003 1.64898 17.3371 1.32259 17.0107C0.996202 16.6844 0.833008 16.292 0.833008 15.8337V5.00033H2.49967V15.8337H16.6663V17.5003H2.49967ZM5.83301 14.167C5.37467 14.167 4.98231 14.0038 4.65592 13.6774C4.32954 13.351 4.16634 12.9587 4.16634 12.5003V3.33366C4.16634 2.87533 4.32954 2.48296 4.65592 2.15658C4.98231 1.83019 5.37467 1.66699 5.83301 1.66699H9.99967L11.6663 3.33366H17.4997C17.958 3.33366 18.3504 3.49685 18.6768 3.82324C19.0031 4.14963 19.1663 4.54199 19.1663 5.00033V12.5003C19.1663 12.9587 19.0031 13.351 18.6768 13.6774C18.3504 14.0038 17.958 14.167 17.4997 14.167H5.83301ZM5.83301 12.5003H17.4997V5.00033H10.9788L9.31217 3.33366H5.83301V12.5003Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  My Folders
                </button>
                <button
                  onClick={() => {
                    router.push("/myCollection?skilotechCollection=true");
                  }}
                  className={`rounded-[30px] sm:text-[14px] text-[12px] font-semibold scr900:px-6 sm:px-4 scr360:px-2 px-1  py-2 flex gap-2 ml:justify-start justify-center items-center   min-w-[280px] ${tab === 1 && "bg-[#C2E7FF]"
                    }   `}
                >
                  <svg
                    className="min-w-[20px] scr420:block hidden"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1148_17425)">
                      <path
                        d="M2.49967 17.5003C2.04134 17.5003 1.64898 17.3371 1.32259 17.0107C0.996202 16.6844 0.833008 16.292 0.833008 15.8337V5.00033H2.49967V15.8337H16.6663V17.5003H2.49967ZM5.83301 14.167C5.37467 14.167 4.98231 14.0038 4.65592 13.6774C4.32954 13.351 4.16634 12.9587 4.16634 12.5003V3.33366C4.16634 2.87533 4.32954 2.48296 4.65592 2.15658C4.98231 1.83019 5.37467 1.66699 5.83301 1.66699H9.99967L11.6663 3.33366H17.4997C17.958 3.33366 18.3504 3.49685 18.6768 3.82324C19.0031 4.14963 19.1663 4.54199 19.1663 5.00033V12.5003C19.1663 12.9587 19.0031 13.351 18.6768 13.6774C18.3504 14.0038 17.958 14.167 17.4997 14.167H5.83301ZM5.83301 12.5003H17.4997V5.00033H10.9788L9.31217 3.33366H5.83301V12.5003Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  Request CVs From Skilotech
                </button>
                <button
                  onClick={() => {
                    router.push("/myCollection?trash=true");
                  }}
                  className={`rounded-[30px] sm:text-[14px] text-[12px] font-semibold scr900:px-6 sm:px-4 scr360:px-2 px-1 py-2 flex gap-2 ml:justify-start justify-center items-center ml:min-w-full sm:min-w-[30%] min-w-[80px]  ${tab === 2 && "bg-[#C2E7FF]"
                    }  `}
                >
                  <svg
                    className="scr420:block hidden"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1358_21473)">
                      <path
                        d="M5.83398 17.5C5.37565 17.5 4.98329 17.3368 4.6569 17.0104C4.33051 16.684 4.16732 16.2917 4.16732 15.8333V5H3.33398V3.33333H7.50065V2.5H12.5007V3.33333H16.6673V5H15.834V15.8333C15.834 16.2917 15.6708 16.684 15.3444 17.0104C15.018 17.3368 14.6257 17.5 14.1673 17.5H5.83398ZM14.1673 5H5.83398V15.8333H14.1673V5ZM7.50065 14.1667H9.16732V6.66667H7.50065V14.1667ZM10.834 14.1667H12.5007V6.66667H10.834V14.1667Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                  Trash
                </button>
              </div>
            </div>
            {/* <div className="border border-[#DEDEDE] rounded-[14px] py-2 px-4 ml:flex hidden flex-col gap-2 bg-white">
              <p className="text-[14px] font-semibold">Cloud Storage</p>
              <div className="h-[6px] rounded-[6px] bg-[#DEDEDE] relative">
                <div className="absolute h-[6px] rounded-[6px]  bg-blue w-[30%]"></div>
              </div>
              <p className="text-[14px] font-normal">400 mb of 2 GB used</p>
            </div> */}
          </div>
          {tab === 0 || tab === 2 ?

            <Folders
              folderData={folderData}
              unSyncFiles={unSyncFiles}
              setFolderData={setFolderData}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              data={folderList}
              setData={setData}
              clientData={folderList}
              tab={tab}
              setFolderList={setFolderList}
              loading={loading}
              query={router.query}
              setRecall={setRecall}
              setRename={setRename}
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              setIsFile={setIsFile}
              setIsCreateFolder={setIsCreateFolder}
              getLimits={getLimits}
              parentId={parentId}
            />
            :

            <RequestCV />

          }
        </div>
      </div>
    </>
  );
}

export default Collection;
