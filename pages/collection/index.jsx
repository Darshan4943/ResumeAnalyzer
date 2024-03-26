import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import Folders from "../../components/featured/candidate/createResume/components/folders";
import axios from "axios";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { reCallUserData } from "../../Redux/actions/user";
import { useRouter } from "next/router";

function Collection() {
  const router = useRouter();
  const { clients, folders } = router.query;
  const userDataGlobal = useSelector((state) => state.userData);
  const [isCreate, setIsCreate] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState();
  const [folderList, setFolderList] = useState(null);
  const [clientData, setClientData] = useState();
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("Untitled folder");
  const inputRef = useRef(null);
  const [tab, setTab] = useState(0);
  const [parentId, setParentId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, [isCreate]);

  useEffect(() => {
    if (folders == "true") {
      setTab(1);
      setTabIndex(0);
    } else {
      setTab(0);
      setTabIndex(0);
    }
  }, [clients, folders]);
  const getData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:2000/api/folder/get/${userDataGlobal._id}`)
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
  useEffect(() => {
    getData();
  }, [tab]);

  const handleFileChange = (event, folderName) => {
    const uploadedFiles = event.target.files;
    const newFiles = Array.from(uploadedFiles);

    const newData = folderData.map((folder) => {
      if (folder.folderName === folderName) {
        return {
          ...folder,
          files: newFiles,
        };
      }
      return folder;
    });

    setData(newData);
  };

  useEffect(() => {
    axios
      .get(
        `https://freedygoservices.in/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        setClientData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tab, userDataGlobal]);

  const createFolder = () => {
    const formData = new FormData();
    formData.append("fileName", folderName);
    formData.append("type", "folder");
    formData.append("userId", userDataGlobal._id);
    axios
      .post("http://localhost:2000/api/folder/create", formData)
      .then((res) => {
        getData();
        setIsCreateFolder(false);
        setFolderName("Untitled folder");
        toast.success("Folder created successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      {isCreateFolder && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute  w-[30%] rounded-[14px] bg-white p-4 flex flex-col gap-6 ">
              <div className="text-[24px] font-medium">New Folder</div>
              <input
                className="border border-blue rounded-[8px] py-2 px-4"
                ref={inputRef}
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <div className="flex justify-end gap-6 text-blue font-medium">
                <button
                  onClick={() => {
                    setIsCreateFolder(false);
                    setFolderName("Untitled folder");
                  }}
                >
                  Cancel
                </button>
                <button onClick={createFolder}>Create</button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="  flex justify-between  gap-4 p-6 min-h-[80vh] bg-[#F9F9F9] pb-12">
        <div className="flex flex-col gap-5  justify-between w-[20%] min-h-[50vh]">
          <div className="flex flex-col gap-5 ">
            <button
              onClick={(e) => {
                setIsCreate(!isCreate);
                e.stopPropagation();
              }}
              className={`rounded-[8px] text-[14px] font-semibold px-4 py-2 flex gap-2 justify-center relative items-center w-[98px] bg-blue text-white ${
                tabIndex === 1 && "opacity-100"
              } `}
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
                    className="absolute flex flex-col text-[14px] text-[#000000] rounded-[8px] left-0 right-0 z-10 top-[110%] w-[165px] p-4 gap-4 bg-white"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div
                      onClick={(e) => setIsCreateFolder(true)}
                      className="flex gap-1 items-center"
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
                    {tabIndex === 1 && (
                      <div className="flex gap-1 items-center upload-btn-wrapper">
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
                        <input
                          multiple
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(event) =>
                            handleFileChange(event, folderData.folderName)
                          }
                        />
                        Upload Files
                      </div>
                    )}
                    <div className="flex gap-1 items-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_1304_20148)">
                          <path
                            d="M11.25 16.6153H12.75V12.1653L14.6096 14.025L15.6634 12.9711L12 9.3077L8.35578 12.9519L9.4096 14.0057L11.25 12.1653V16.6153ZM4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H9.79803L11.798 6.5H19.6923C20.1974 6.5 20.625 6.675 20.975 7.025C21.325 7.375 21.5 7.80257 21.5 8.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V8.3077C20 8.21795 19.9711 8.14422 19.9134 8.08652C19.8557 8.02883 19.782 7.99998 19.6923 7.99998H11.1846L9.1846 5.99998H4.3077C4.21795 5.99998 4.14423 6.02882 4.08653 6.08652C4.02883 6.14423 3.99998 6.21795 3.99998 6.3077V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18Z"
                            fill="#1C1B1F"
                          />
                        </g>
                      </svg>
                      Upload Folder
                    </div>
                  </div>
                </>
              )}
            </button>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  router.push("/collection?clients=true");
                }}
                className={`rounded-[30px] text-[16px] font-semibold px-6 py-2 flex gap-2 justify-start items-center  ${
                  tab === 0 && "bg-[#C2E7FF]"
                }   `}
              >
                <svg
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
                My Clients
              </button>
              <button
                onClick={() => {
                  // setTab(1);
                  // setTabIndex(0);
                  router.push("/collection?folders=true");
                }}
                className={`rounded-[30px] text-[16px] font-semibold px-6 py-2 flex gap-2 justify-start items-center  ${
                  tab === 1 && "bg-[#C2E7FF]"
                }  `}
              >
                <svg
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
                onClick={() => ""}
                className=" rounded-[30px] text-[16px] font-semibold px-6 py-2 flex gap-2 justify-start items-center    "
              >
                <svg
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
          <div className="border border-[#DEDEDE] rounded-[14px] py-2 px-4 flex flex-col gap-2 bg-white">
            <p className="text-[14px] font-semibold">Cloud Storage</p>
            <div className="h-[6px] rounded-[6px] bg-[#DEDEDE] relative">
              <div className="absolute h-[6px] rounded-[6px]  bg-blue w-[30%]"></div>
            </div>
            <p className="text-[14px] font-normal">400 mb of 2 GB used</p>
          </div>
        </div>

        <Folders
          folderData={folderData}
          setFolderData={setFolderData}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          data={folderList}
          setData={setData}
          clientData={clientData}
          setClientData={setClientData}
          tab={tab}
          setParentId={setParentId}
          parentId={parentId}
          setFolderList={setFolderList}
          loading={loading}
        />
      </div>
    </>
  );
}

export default Collection;
