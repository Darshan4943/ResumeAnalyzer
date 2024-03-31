import React, { useEffect, useReducer, useState } from "react";
import InternalJobMatching from "../../components/featured/jobMatching/internal";
import ExternalJobMatching from "../../components/featured/jobMatching/external";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
import axios from "axios";
import { DocSVG, PDFSvg, SearchIcon } from "../../utils/svg";
import { useRouter } from "next/router";
import JdFiles from "../../components/featured/candidate/createResume/components/JdFiles";
import JdMatching from "../../components/featured/candidate/createResume/components/JdMatching";
import JdDescription from "../../components/featured/candidate/createResume/components/JdDescription";
import EarthLoader from "../../components/common/EarthLoader";

const JobMatching = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tab, setTab] = useState(null);
  const [ParentId, setParentId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    value: "My Collection",
    label: "My Collection",
  });
  const { clients, folders, clientId, parentId, trash } = router.query;
  const [isBack, setIsBack] = useState(false);
  const [recall, setRecall] = useReducer((x) => x + 1, 0);

  const [options, setOptions] = useState(["My Collection", "Upload File"]);

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("");
  const [resumeCount, setResumeCount] = useState(5);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [resuneList, setResuneList] = useState([]);
  const selectOptions = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  useEffect(() => {
    if (selectedOptions.value === "My Collection") {
      setTab(1);

      if (parentId) {
        setParentId(parentId);
        getParentData(parentId);
      } else {
        getFolderData();
      }
    } else if (selectedOptions.value === "My Clients") {
      setTab(0);

      if (clientId) {
        getClientData(clientId);
      } else {
        getClients();
      }
    }
    const storedIndexes = localStorage.getItem("selectedIndexes");

    if (storedIndexes) {
      setSelectedIndexes(JSON.parse(storedIndexes));
    }
  }, [selectedOptions, clientId, parentId, userDataGlobal, recall]);

  const getParentData = (parentId) => {
    axios
      .get(`https://freedygoservices.in/api/folder/getByParentId/${parentId}`)
      .then((res) => {
        setDetails(res.data.data);
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
      .get("https://freedygoservices.in/api/resume/" + clientId)
      .then((res) => {
        setDetails(res.data.data);
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
      .get(`https://freedygoservices.in/api/folder/get/${userDataGlobal._id}`)
      .then((res) => {
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const getClients = () => {
    setLoading(true);
    axios
      .get(
        `https://freedygoservices.in/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        console.log(res.data.data);
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const jobMatching = () => {
    setLoadingg(true);
    axios
      .post("https://freedygoservices.in/api/external/jobMatching/", {
        jd: text,
        resumeCount,
        ids: selectedIndexes,
      })
      .then((res) => {
        console.log(res.data);
        setResuneList(res.data.data);
        setLoadingg(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" p-6 flex flex-col gap-6 min-h-[80vh]  ">
      {loadingg && <EarthLoader />}
      <div className=" font-semibold text-[24px]">Job Description Matching</div>
      <div className="bg-[#DEDEDE] w-full h-[1px]"></div>

      <div className="flex gap-4 h-full">
        <div className="w-[40%] flex  flex-col gap-6">
          <ReactSelect
            options={options?.map((item, index) => ({
              value: item,
              label: item,
            }))}
            className="my-4 outline outline-offset-1 outline-blue rounded-[8px]"
            name=""
            placeholder="Select"
            value={selectedOptions}
            onChange={(selectedOption) => selectOptions(selectedOption)}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                minWidth: "130px",
              }),
            }}
          />

          <JdFiles
            details={details}
            query={router.query}
            selectedOptions={selectedOptions.value}
            setSelectedIndexes={setSelectedIndexes}
            selectedIndexes={selectedIndexes}
            loading={loading}
          />
          <JdDescription
            text={text}
            error={error}
            resumeCount={resumeCount}
            loadingg={loadingg}
            setText={setText}
            setError={setError}
            setResumeCount={setResumeCount}
            jobMatching={jobMatching}
          />
        </div>
        <div className="bg-[#DEDEDE] h-screen w-[1px]"></div>
        <div className="w-[60%]">
          <JdMatching details={details} resuneList={resuneList} />
        </div>
      </div>
    </div>
  );
};

export default JobMatching;

// import React, { useEffect, useState } from "react";
// import InternalJobMatching from "../../components/featured/jobMatching/internal";
// import ExternalJobMatching from "../../components/featured/jobMatching/external";

// const JobMatching = () => {
//   const [tabIndex, setTabIndex] = useState(1);
//   return (
//     <div className=" p-6 flex flex-col gap-6 min-h-[80vh] ">
//       <div className=" font-semibold text-[24px]">Job Description Matching</div>

//       <div className="relative">
//         <div
//           className="absolute top-[0px]"
//           style={{
//             width: "fit-content",
//           }}
//         >
//           <button
//             onClick={() => setTabIndex(1)}
//             style={{
//               borderRadius:
//                 tabIndex == 1 ? "12px 0px 0px 0px" : "12px 0px 0px 0px",
//               boxShadow: "rgb(84 84 84 / 19%) -3px -2px 4px -1px",
//               borderBottom: `1px solid ${
//                 tabIndex == 1 ? "#06A9EF" : "#c7c7c7"
//               } `,
//             }}
//             className={`px-4 py-3 ${
//               tabIndex == 1
//                 ? " bg-[#06A9EF] text-white"
//                 : " text-black bg-[#fff]"
//             }  text-[16px]  font-semibold w-[166px]`}
//           >
//             Internal
//           </button>
//           <button
//             onClick={() => setTabIndex(2)}
//             style={{
//               borderRadius:
//                 tabIndex == 2 ? "0px 12px 0px 0px" : "0px 12px 0px 0px",
//               boxShadow: "rgb(84 84 84 / 19%) 2px -2px 4px -1px",
//               borderBottom: `1px solid ${
//                 tabIndex == 2 ? "#06A9EF" : "#c7c7c7"
//               } `,
//             }}
//             className={`px-4 py-3 ${
//               tabIndex == 2
//                 ? " bg-[#06A9EF] text-white"
//                 : " text-black bg-[#fff]"
//             } text-[16px] font-semibold  w-[166px]`}
//           >
//             External
//           </button>
//         </div>
//         <div className="mt-[48px]">
//           {tabIndex == 1 ? <InternalJobMatching /> : <ExternalJobMatching />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobMatching;
