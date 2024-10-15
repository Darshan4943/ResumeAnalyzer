import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FileNameModel = ({ setNamePreview, setFunction, data, clientId,isResume ,isEdit}) => {
 
  const [name, setName] = useState(data.firstName + (isResume  ? "_resume" : "_cover"));
  const [existingNames, setExistingNames] = useState([]);
 
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setName(value);
      setError("");
    } else {
      setError("File name cannot exceed 40 characters");
    }
  };
  const userDataGlobal = useSelector((state) => state.userData);

  const callData = () => {
    const id = userDataGlobal.role === "user" ? userDataGlobal?._id : clientId;
    const url = isResume
    ? `http://localhost:2000/api/resume/${id}`
    : `http://localhost:2000/api/cover/get/${id}`;
  
    if (id) {
      axios
      .get(url )

      .then((res) => {
        
        const dataArray = res.data.data;
        const filenames = dataArray.map(item => item.fileName.replace('.pdf', ''));
        
        setExistingNames(filenames);
        if (!isEdit) {
            setName(data.firstName + (isResume  ? "_resume " : "_cover ") + (res.data.data.length + 1));
        }
        else {
      
          setName(data.fileName.replace('.pdf', ''));
        }
    })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  
  useEffect(() => {
    callData();
    if (!isEdit) {
      setName(data.firstName + (isResume  ? "_resume" : "_cover"));
    } else {
      setName(data.fileName.replace('.pdf', ''));
    }
  }, [userDataGlobal, data.firstName, ]);



  const handleSave = () => {
    if (existingNames.includes(name)) {
      setError("A file with this name already exists.");
    } else {
      setFunction(name);
      setNamePreview(false);
    }
  };

  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="absolute bg-white px-4 py-2 rounded-lg shadow-lg  flex flex-col gap-2 items-end ml:w-[486px] w-[90vw]">
          <div className="text-[20px] text-[#333333] font-500 w-full">
            Enter File Name
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter File Name"
              value={name}
              className="py-[12px] px-[16px] text-[14px] w-full border rounded-[8px] border-[#DEDEDE] h-[48px]"
              onChange={handleChange}
            />
            {error && (
              <div className="text-red font-medium text-sm mt-1">{error}</div>
            )}
          </div>
          <div className="flex justify-between py-2 gap-2">
            <button
              className="font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[83px] h-[32px]"
              onClick={() => setNamePreview(false)}
            >
              Cancel
            </button>
            <button
              className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px] bg-[#06A9EF] w-[60px] h-[32px]`}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileNameModel;
