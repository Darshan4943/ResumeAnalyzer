import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setRecallData } from '../../Redux/slices/recallSlice';
import MyCollectionFolder from './myCollectionFolder';



function MyCollection({setOption}) {
  const router = useRouter();
  const dispatch = useDispatch();
  // dispatch(setPageOpened());
  
  const [data, setData] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterType, setFilterType] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const { skilotechCollection, folders, clientId, parentId, trash } = router.query;
  const { recallData } = useSelector((state) => state.recall);

  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [rename, setRename] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

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
  const [unSyncFiles, setUnSyncFiles] = useState(null);
  const [count, setCount] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [collectionCount, setCollectionCount] = useState(0);
  const [error, setError] = useState("");
  const widths = ["25%", "10%", "15%", "25%", "15%", "10%"];
  const texts = ["start", "start", "start", "start", "start", "center"];

  const getData = () => {

    setTab(0);
    setTabIndex(0);
    if (parentId) {
      setParentId(parentId);
      getParentData(parentId);
    } else {
      getFolderData();
    }


  };

  const getParentData = (parentId) => {
    axios
      .get(`http://192.168.1.208:2000/api/folder/getByParentId/${parentId}`)
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
      .get(`http://192.168.1.208:2000/api/folder/get/${userDataGlobal?._id}`)
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



  const getUnSyncFiles = () => {
    axios
      .get(`http://192.168.1.208:2000/api/getUnsyncedFile/${userDataGlobal?._id}`)
      .then((res) => {
        const files = res.data.data.filter((item) => item.type === "file");
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
        getUnSyncFiles();
        getData();
        dispatch(setRecallData(!recallData));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [unSyncFiles]);
  useEffect(() => {
    const fetchAndSetData = () => {
      getData();
    };
  
    // Initial fetch
    fetchAndSetData();
  
    // Set interval for every 10 seconds
    const interval = setInterval(fetchAndSetData, 10000);
  
    // Clear interval on unmount or dependencies change
    return () => clearInterval(interval);
  }, [skilotechCollection, folders, clientId, parentId, userDataGlobal, recall]);
  
  // Handle checkbox change for individual applicants
  const handleCheckboxChange = (applicant) => {
    setSelectedApplicants((prevSelected) => {
      const isSelected = prevSelected.find((item) => item._id === applicant._id);
      if (isSelected) {
        return prevSelected.filter((item) => item._id !== applicant._id);
      } else {
        return [...prevSelected, applicant];
      }
    });
  };

  // Handle 'select all' checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedApplicants(data); // `data` contains all applicants
    } else {
      setSelectedApplicants([]);
    }
    setSelectAll(e.target.checked);
  };

  // Function to send email (single or bulk)
  const handleSendMail = async (applicants) => {
    try {
      const response = await axios.post('http://192.168.1.208:2000/api/sendEvaluationMail', {
        userData: applicants.map((app) => ({
          email: app.email,
          evaluationSummary: app.evaluation,
          id: app._id

        })),
      });

      if (response.data.success) {
        alert("Email sent successfully!");
        setSelectedApplicants([]);
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email.");
    }
  };


  // Function to send email to an individual applicant
  const handleSendIndividualMail = async (applicant) => {
    setLoading(applicant._id)
    try {
      const response = await axios.post('http://192.168.1.208:2000/api/sendEvaluationMail', {
        userData: [{
          email: applicant?.details?.personal?.email,
          evaluationSummary: applicant?.details?.personal?.evaluation,
          id: applicant?.details?.personal?._id
        }]
      });

      if (response.data.success) {
        setLoading("")
      } else {
        setLoading("")
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setLoading("")
    }
  };


  // Table headers
  const applicant_head = [
    {
      name: "Name of Candidate",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "Dial Code",
      check: "",
    },
    {
      name: "Mobile No",
      check: "",
    },
    {
      name: "Email",
      check: "",
    },
    {
      name: "Payment Status",
      check: "",
      isFilter: true,
      filters: ["paid", "unpaid"],
    },
    {
      name: "Action",
      check: "",
    },
  ];

  return (
    <div>

      <MyCollectionFolder
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
        setOption={setOption}
        parentId={parentId}
      />
      
    </div>
  );
}

export default MyCollection;
