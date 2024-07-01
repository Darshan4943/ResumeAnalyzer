// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// const Index = () => {
//   const [planData, setPlanData] = useState({
//     name: "",
//     days: "",
//     amount: "",
//     description: "",
//     limits: {
//       uploads: "",
//       download: "",
//       save: "",
//       clients: "",
//     },
//     features: [],
//   });

//   const [inputValue, setInputValue] = useState("");
//   const [submittedValues, setSubmittedValues] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editInputValue, setEditInputValue] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [hasChanges, setHasChanges] = useState(false);

//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       fetchPlanData(id);
//     }
//   }, [id]);

//   const fetchPlanData = async (planId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:2000/api/plans/getByIndex/${planId}`
//       );
//       console.log("API response:", response.data);
//       const plan = response.data.data[0];
//       setPlanData({
//         name: plan.name,
//         days: plan.days,
//         amount: plan.amount,
//         description: plan.description,
//         limits: {
//           uploads: plan.limits.uploads,
//           download: plan.limits.download,
//           save: plan.limits.save,
//           clients: plan.limits.clients,
//         },
//         features: plan.features || [],
//       });
//       setSubmittedValues(plan.features || []);
//     } catch (error) {
//       console.error("Error fetching plan data:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPlanData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setHasChanges(true);
//   };

//   const handleLimitsChange = (e) => {
//     const { name, value } = e.target;
//     setPlanData((prevData) => ({
//       ...prevData,
//       limits: {
//         ...prevData.limits,
//         [name]: value,
//       },
//     }));
//     setHasChanges(true);
//   };

//   const handleSubmitData = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:2000/api/plans/update/${id}`, planData);
//       console.log("Data updated successfully");
//       setHasChanges(false);
//       router.back();
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.length >= 6) {
//       setSubmittedValues([...submittedValues, inputValue]);
//       setPlanData((prevData) => ({
//         ...prevData,
//         features: [...prevData.features, inputValue],
//       }));
//       setInputValue("");
//       setErrorMessage("");
//       setHasChanges(true);
//     } else {
//       setErrorMessage("Input length must be at least 6 characters");
//     }
//   };

//   const handleUpdate = () => {
//     if (editInputValue.length >= 6) {
//       const updatedValues = [...submittedValues];
//       updatedValues[editIndex] = editInputValue;
//       setSubmittedValues(updatedValues);
//       setPlanData((prevData) => ({
//         ...prevData,
//         features: updatedValues,
//       }));
//       setIsEditing(false);
//       setEditIndex(null);
//       setEditInputValue("");
//       setHasChanges(true);
//     } else {
//       setErrorMessage("Input length must be at least 6 characters");
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedValues = submittedValues.filter((_, i) => i !== index);
//     setSubmittedValues(updatedValues);
//     setPlanData((prevData) => ({
//       ...prevData,
//       features: updatedValues,
//     }));
//     setHasChanges(true);
//   };

//   const handleEdit = (index) => {
//     setEditInputValue(submittedValues[index]);
//     setIsEditing(true);
//     setEditIndex(index);
//   };

//   return (
//     <>
//       <div className="flex flex-col w-[100%] ml:h-[92vh] h-full  sm:p-8 p-1 items-center sm:items-start gap-4 bg-[#f9f9f9]">
//         <div className="ml:flex-row flex flex-col w-full gap-4 items-center">
//           <div className="bg-white ml:min-h-[55vh] scr1250:w-[60%] sm:w-[100%] w-[95%] p-4 rounded-lg">
//             <div className="flex flex-col gap-6 w-full">
//               <div className="flex flex-col gap-4">
//                 <div className="flex w-full ml:justify-between gap-2 ">
//                   <div className=" ml:w-[47%] gap-1 flex flex-col w-[50%]">
//                     <p className="scr420:text-[14px] text-[12px]">Enter Name</p>
//                     <input
//                       type="text"
//                       name="name"
//                       value={planData.name}
//                       onChange={handleInputChange}
//                       placeholder="Name"
//                       className=" bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
//                     />
//                   </div>
//                   <div className=" ml:w-[47%] gap-1 flex flex-col w-[50%]">
//                     <p className="scr420:text-[14px] text-[12px]">
//                       Duration in Days
//                     </p>
//                     <input
//                       type="text"
//                       name="days"
//                       value={planData.days}
//                       onChange={handleInputChange}
//                       placeholder="Days"
//                       className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
//                     />
//                   </div>
//                 </div>

//                 <div className=" ml:w-[47%] gap-1 flex flex-col w-[50%]">
//                   <p className="scr420:text-[14px] text-[12px]">
//                     Amount In Dollers
//                   </p>
//                   <input
//                     type="text"
//                     name="amount"
//                     value={planData.amount}
//                     onChange={handleInputChange}
//                     placeholder="Amount"
//                     className=" bg-white scr420:text-[14px] text-[12px]  border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
//                   />
//                 </div>

//                 <div className=" ml:w-[100%] gap-1 flex flex-col w-[100%]">
//                   <p className="scr420:text-[14px] text-[12px]">
//                     Short Description
//                   </p>
//                   <input
//                     type="text"
//                     name="description"
//                     value={planData.description}
//                     onChange={handleInputChange}
//                     placeholder="Description"
//                     className=" bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="form_text_heading">Limits</p>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
//                   <div className="ml:w-[100%] gap-1">
//                     <p className="scr420:text-[14px] text-[12px]">
//                       Upload Limit
//                     </p>
//                     <input
//                       type="text"
//                       name="uploads"
//                       value={planData.limits.uploads}
//                       onChange={handleLimitsChange}
//                       placeholder="Uploads"
//                       className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] p-[8px]"
//                     />
//                   </div>

//                   <div className="ml:w-[100%] gap-1">
//                     <p className="scr420:text-[14px] text-[12px]">Save Limit</p>
//                     <input
//                       type="text"
//                       name="save"
//                       value={planData.limits.save}
//                       onChange={handleLimitsChange}
//                       placeholder="Save"
//                       className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] p-[8px]"
//                     />
//                   </div>

//                   <div className="ml:w-[100%] gap-1 lg:col-span-2">
//                     <p className="scr420:text-[14px] text-[12px]">Clients</p>
//                     <input
//                       type="text"
//                       name="clients"
//                       value={planData.limits.clients}
//                       onChange={handleLimitsChange}
//                       placeholder="Clients"
//                       className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] p-[8px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className=" justify-between ml:min-h-[55vh] bg-white inline-flex p-4 flex-col items-start  gap-4 scr1250:w-[60%] sm:w-[100%] w-[95%] rounded-lg  ">
//             <div className="flex w-full flex-col gap-2">
//               <p className="text-[14px]">Features</p>
//               <div className="flex h-[40vh] overflow-y-auto w-full justify-start flex-col gap-2">
//                 {submittedValues.map((value, index) => (
//                   <div key={index} className="flex items-start gap-2 ">
//                     {isEditing && editIndex === index ? (
//                       <>
//                         <div className="flex w-full justify-between">
//                           <input
//                             type="text"
//                             value={editInputValue}
//                             onChange={(e) => setEditInputValue(e.target.value)}
//                             className="border-[#ccc] text-[#333] rounded-[6px] bg-white scr420:text-[14px] text-[12px] border-[1px] w-[80%] inline-flex p-[8px] flex-col items-start"
//                           />
//                           <div className="flex w-[20%] justify-end scr420:max-h-[36px] max-h-[28px]">
//                             <button
//                               className="bg-[#06A9EF] text-white scr420:p-[3px] p-[1px] ml:text-[14px] text-[8px] w-[80%] rounded-[10px]"
//                               onClick={handleUpdate}
//                               disabled={editInputValue === ""}
//                             >
//                               Update
//                             </button>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="flex w-full justify-between items-center h-full ">
//                           <input
//                             type="text"
//                             value={value}
//                             className="border-[#ccc] text-[#333] rounded-[6px] bg-white scr420:text-[14px] text-[12px] border-[1px] w-[80%] inline-flex p-[8px] flex-col items-start"
//                           />
//                           <div className="flex w-[16%] justify-evenly items-center border border-[#ccc] rounded-[6px] py-[2.5px]">
//                             <svg
//                               onClick={() => handleEdit(index)}
//                               className="scr420:w-[25px] scr420:h-[25px] w-[20px] h-[20px]"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <g mask="url(#mask0_4770_45594)">
//                                 <path
//                                   d="M5 19H6.2615L16.498 8.7635L15.2365 7.502L5 17.7385V19ZM4.404 20.5C4.14783 20.5 3.93317 20.4133 3.76 20.24C3.58667 20.0668 3.5 19.8522 3.5 19.596V17.8635C3.5 17.6197 3.54683 17.3873 3.6405 17.1663C3.734 16.9453 3.86283 16.7527 4.027 16.5885L16.6905 3.93075C16.8417 3.79342 17.0086 3.68733 17.1913 3.6125C17.3741 3.5375 17.5658 3.5 17.7663 3.5C17.9668 3.5 18.1609 3.53558 18.3488 3.60675C18.5368 3.67792 18.7032 3.79108 18.848 3.94625L20.0693 5.18275C20.2244 5.32758 20.335 5.49425 20.401 5.68275C20.467 5.87125 20.5 6.05975 20.5 6.24825C20.5 6.44942 20.4657 6.64133 20.397 6.824C20.3283 7.00683 20.2191 7.17383 20.0693 7.325L7.4115 19.973C7.24733 20.1372 7.05475 20.266 6.83375 20.3595C6.61275 20.4532 6.38033 20.5 6.1365 20.5H4.404ZM15.8562 8.14375L15.2365 7.502L16.498 8.7635L15.8562 8.14375Z"
//                                   fill="#333333"
//                                 />
//                               </g>
//                             </svg>
//                             <div className="w-[1px] h-[14px] bg-[#ccc]"></div>
//                             <svg
//                               onClick={() => handleDelete(index)}
//                               className="scr420:w-[25px] scr420:h-[25px] w-[20px] h-[20px]"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <g mask="url(#mask0_4770_45588)">
//                                 <path
//                                   d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.94092 8.00022 9.76275 8.07206 9.61892 8.21572C9.47508 8.35956 9.40325 8.53772 9.40325 8.75022V16.2502C9.40325 16.4627 9.47508 16.6409 9.61892 16.7847C9.76275 16.9284 9.94092 17.0002 10.1543 17.0002ZM14.1535 17.0002C14.3662 17.0002 14.5443 16.9284 14.688 16.7847C14.8318 16.6409 14.9037 16.4627 14.9037 16.2502V8.75022C14.9037 8.53772 14.8318 8.35956 14.688 8.21572C14.5443 8.07206 14.3662 8.00022 14.1535 8.00022C13.9409 8.00022 13.76275 8.07206 13.61892 8.21572C13.47508 8.35956 13.40325 8.53772 13.40325 8.75022V16.2502C13.40325 16.4627 13.47508 16.6409 13.61892 16.7847C13.76275 16.9284 13.94092 17.0002 14.1535 17.0002Z"
//                                   fill="#C00000"
//                                 />
//                               </g>
//                             </svg>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex flex-col w-full gap-2">
//                 <div className="flex w-full justify-between">
//                   <div className="ml:w-[80%] gap-1 flex flex-col w-[80%]">
//                     <input
//                       type="text"
//                       name=""
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       placeholder="Enter Features"
//                       className="border-[#ccc] rounded-[6px] bg-white scr420:text-[14px] text-[12px] border-[1px] w-full inline-flex p-[8px] flex-col items-start"
//                       disabled={isEditing}
//                     />
//                     {errorMessage && (
//                       <div className="scr420:text-[14px] text-[10px] text-red">
//                         <span className="text-red-500 ">{errorMessage}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex w-[20%] justify-end max-h-[36px]">
//                     <button
//                       className={`bg-[#06A9EF] text-white p-[3px] ml:text-[14px] text-[12px] w-[80%] rounded-[10px] ${
//                         isEditing ? "opacity-50" : ""
//                       }`}
//                       disabled={isEditing}
//                       onClick={handleSubmit}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className=" w-full  flex flex-row gap-[16px] justify-end bg-white p-4  rounded-lg">
//           <button
//             className="bg-[#fff] py-[6px]  text-black px-[3px] text-[12px] ml:text-[14px] ml:w-[8%] w-[20%] rounded-[10px]"
//             id="border_button"
//             onClick={(e) => {
//               e.preventDefault();
//               router.back();
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             className={`bg-[#06A9EF] py-[6px] text-white px-[3px] ml:text-[14px] text-[12px] ml:w-[8%] w-[20%] rounded-[10px] ${
//               !hasChanges ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             id="border_button"
//             onClick={handleSubmitData}
//             disabled={!hasChanges}
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       {/* </div> */}
//     </>
//   );
// };

// export default Index;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Index = () => {
  const [planData, setPlanData] = useState({
    name: "",
    days: "",
    amount: "",
    description: "",
    limits: {
      uploads: "",
      download: "",
      save: "",
      clients: "",
    },
    features: [],
  });

  const [inputValue, setInputValue] = useState("");
  const [submittedValues, setSubmittedValues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPlanData(id);
    }
  }, [id]);

  const fetchPlanData = async (planId) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/plans/getByIndex/${planId}`
      );
      console.log("API response:", response.data);
      const plan = response.data.data[0];
      setPlanData({
        name: plan.name,
        days: plan.days,
        amount: plan.amount,
        description: plan.description,
        limits: {
          uploads: plan.limits.uploads,
          download: plan.limits.download,
          save: plan.limits.save,
          clients: plan.limits.clients,
        },
        features: plan.features || [],
      });
      setSubmittedValues(plan.features || []);
    } catch (error) {
      console.error("Error fetching plan data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleLimitsChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevData) => ({
      ...prevData,
      limits: {
        ...prevData.limits,
        [name]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jamblix.com/api/plans/update/${id}`, planData);
      console.log("Data updated successfully");
      setHasChanges(false);
      router.back();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length >= 6) {
      setSubmittedValues([...submittedValues, inputValue]);
      setPlanData((prevData) => ({
        ...prevData,
        features: [...prevData.features, inputValue],
      }));
      setInputValue("");
      setErrorMessage("");
      setHasChanges(true);
    } else {
      setErrorMessage("Input length must be at least 6 characters");
    }
  };

  const handleUpdate = () => {
    if (editInputValue.length >= 6) {
      const updatedValues = [...submittedValues];
      updatedValues[editIndex] = editInputValue;
      setSubmittedValues(updatedValues);
      setPlanData((prevData) => ({
        ...prevData,
        features: updatedValues,
      }));
      setIsEditing(false);
      setEditIndex(null);
      setEditInputValue("");
      setHasChanges(true);
    } else {
      setErrorMessage("Input length must be at least 6 characters");
    }
  };

  const handleDelete = (index) => {
    const updatedValues = submittedValues.filter((_, i) => i !== index);
    setSubmittedValues(updatedValues);
    setPlanData((prevData) => ({
      ...prevData,
      features: updatedValues,
    }));
    setHasChanges(true);
  };

  const handleEdit = (index) => {
    setEditInputValue(submittedValues[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <>
      <div className="flex flex-col w-[100%] h-full  sm:p-8 p-1 items-center sm:items-start gap-4 bg-[#f9f9f9]">
        <div className="ml:flex-row flex flex-col w-full gap-4 items-center">
          <div className="bg-white ml:h-[450px] h-[510px] scr1250:w-[60%] sm:w-[100%] w-[95%] p-4 rounded-lg">
            <div className="flex flex-col gap-6 w-full h-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex w-full ml:justify-between gap-2 ">
                  <div className=" ml:w-[47%] gap-1 flex flex-col w-[50%]">
                    <p className="scr420:text-[14px] text-[12px]">Enter Name</p>
                    <input
                      type="text"
                      name="name"
                      value={planData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className=" bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
                    />
                  </div>
                  <div className=" ml:w-[47%] gap-1 flex flex-col w-[50%]">
                    <p className="scr420:text-[14px] text-[12px]">
                      Duration in Days
                    </p>
                    <input
                      type="text"
                      name="days"
                      value={planData.days}
                      onChange={handleInputChange}
                      placeholder="Days"
                      className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
                    />
                  </div>
                </div>

                <div className=" ml:w-[47%] gap-1 flex flex-col w-[50%]">
                  <p className="scr420:text-[14px] text-[12px]">
                    Amount In Dollers
                  </p>
                  <input
                    type="text"
                    name="amount"
                    value={planData.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                    className=" bg-white scr420:text-[14px] text-[12px]  border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
                  />
                </div>

                <div className=" ml:w-[100%] gap-1 flex flex-col w-[100%]">
                  <p className="scr420:text-[14px] text-[12px]">
                    Short Description
                  </p>
                  <input
                    type="text"
                    name="description"
                    value={planData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className=" bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] inline-flex p-[8px] flex-col items-start"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="form_text_heading">Limits</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div className="ml:w-[100%] gap-1">
                    <p className="scr420:text-[14px] text-[12px]">
                      Upload Limit
                    </p>
                    <input
                      type="text"
                      name="uploads"
                      value={planData.limits.uploads}
                      onChange={handleLimitsChange}
                      placeholder="Uploads"
                      className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] p-[8px]"
                    />
                  </div>

                  <div className="ml:w-[100%] gap-1">
                    <p className="scr420:text-[14px] text-[12px]">Save Limit</p>
                    <input
                      type="text"
                      name="save"
                      value={planData.limits.save}
                      onChange={handleLimitsChange}
                      placeholder="Save"
                      className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] p-[8px]"
                    />
                  </div>

                  <div className="ml:w-[100%] gap-1 lg:col-span-2">
                    <p className="scr420:text-[14px] text-[12px]">Clients</p>
                    <input
                      type="text"
                      name="clients"
                      value={planData.limits.clients}
                      onChange={handleLimitsChange}
                      placeholder="Clients"
                      className="bg-white scr420:text-[14px] text-[12px] border-[1px] w-full border-[#ccc] rounded-[6px] p-[8px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" justify-between h-[450px] bg-white inline-flex p-4 flex-col items-start  gap-4 scr1250:w-[60%] sm:w-[100%] w-[95%] rounded-lg  ">
            <div className="flex w-full flex-col justify-between h-full">
              <div className="flex flex-col w-full gap-2">
                <p className="text-[14px]">Features</p>
                <div className="flex h-[336px] overflow-y-auto w-full justify-start flex-col gap-2">
                  {submittedValues.map((value, index) => (
                    <div key={index} className="flex items-start gap-2 ">
                      {isEditing && editIndex === index ? (
                        <>
                          <div className="flex w-full justify-between h-full">
                            <input
                              type="text"
                              value={editInputValue}
                              onChange={(e) =>
                                setEditInputValue(e.target.value)
                              }
                              className="border-[#ccc] text-[#333] rounded-[6px] bg-white scr420:text-[14px] text-[12px] border-[1px] w-[80%] inline-flex p-[8px] flex-col items-start"
                            />
                            <div className="flex w-[20%] justify-end h-full">
                              <button
                                className="bg-[#06A9EF] text-white scr420:p-[3px]  h-full  ml:text-[14px] text-[8px] w-[80%] rounded-[10px]"
                                onClick={handleUpdate}
                                disabled={editInputValue === ""}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex w-full justify-between items-center h-full ">
                            <input
                              type="text"
                              value={value}
                              className="border-[#ccc] text-[#333] rounded-[6px] bg-white scr420:text-[14px] text-[12px] border-[1px] w-[80%] inline-flex p-[8px] flex-col items-start"
                            />
                            <div className="flex w-[16%] justify-evenly items-center border border-[#ccc] rounded-[6px] h-full">
                              <svg
                                onClick={() => handleEdit(index)}
                                className="scr420:w-[25px] scr420:h-[25px] w-[20px] h-[20px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g mask="url(#mask0_4770_45594)">
                                  <path
                                    d="M5 19H6.2615L16.498 8.7635L15.2365 7.502L5 17.7385V19ZM4.404 20.5C4.14783 20.5 3.93317 20.4133 3.76 20.24C3.58667 20.0668 3.5 19.8522 3.5 19.596V17.8635C3.5 17.6197 3.54683 17.3873 3.6405 17.1663C3.734 16.9453 3.86283 16.7527 4.027 16.5885L16.6905 3.93075C16.8417 3.79342 17.0086 3.68733 17.1913 3.6125C17.3741 3.5375 17.5658 3.5 17.7663 3.5C17.9668 3.5 18.1609 3.53558 18.3488 3.60675C18.5368 3.67792 18.7032 3.79108 18.848 3.94625L20.0693 5.18275C20.2244 5.32758 20.335 5.49425 20.401 5.68275C20.467 5.87125 20.5 6.05975 20.5 6.24825C20.5 6.44942 20.4657 6.64133 20.397 6.824C20.3283 7.00683 20.2191 7.17383 20.0693 7.325L7.4115 19.973C7.24733 20.1372 7.05475 20.266 6.83375 20.3595C6.61275 20.4532 6.38033 20.5 6.1365 20.5H4.404ZM15.8562 8.14375L15.2365 7.502L16.498 8.7635L15.8562 8.14375Z"
                                    fill="#333333"
                                  />
                                </g>
                              </svg>
                              <div className="w-[1px] h-[20px] bg-[#ccc]"></div>
                              <svg
                                onClick={() => handleDelete(index)}
                                className="scr420:w-[25px] scr420:h-[25px] w-[20px] h-[20px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g mask="url(#mask0_4770_45588)">
                                  <path
                                    d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.94092 8.00022 9.76275 8.07206 9.61892 8.21572C9.47508 8.35956 9.40325 8.53772 9.40325 8.75022V16.2502C9.40325 16.4627 9.47508 16.6409 9.61892 16.7847C9.76275 16.9284 9.94092 17.0002 10.1543 17.0002ZM14.1535 17.0002C14.3662 17.0002 14.5443 16.9284 14.688 16.7847C14.8318 16.6409 14.9037 16.4627 14.9037 16.2502V8.75022C14.9037 8.53772 14.8318 8.35956 14.688 8.21572C14.5443 8.07206 14.3662 8.00022 14.1535 8.00022C13.9409 8.00022 13.76275 8.07206 13.61892 8.21572C13.47508 8.35956 13.40325 8.53772 13.40325 8.75022V16.2502C13.40325 16.4627 13.47508 16.6409 13.61892 16.7847C13.76275 16.9284 13.94092 17.0002 14.1535 17.0002Z"
                                    fill="#C00000"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="flex w-full justify-between">
                  <div className="ml:w-[80%] gap-1 flex flex-col w-[80%]">
                    <input
                      type="text"
                      name=""
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter Features"
                      className="border-[#ccc] rounded-[6px] bg-white scr420:text-[14px] text-[12px] border-[1px] w-full inline-flex p-[8px] flex-col items-start"
                      disabled={isEditing}
                    />
                    {errorMessage && (
                      <div className="scr420:text-[14px] text-[10px] text-red">
                        <span className="text-red-500 ">{errorMessage}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex w-[20%] justify-end h-full">
                    <button
                      className={`bg-[#06A9EF] text-white sm:h-[38.6px]  ml:text-[14px] xxsm:h-[36.6px] text-[12px] w-[80%] rounded-[10px] ${
                        isEditing ? "opacity-50" : ""
                      }`}
                      disabled={isEditing}
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full h-full  flex flex-row gap-[16px] justify-end bg-white p-4  rounded-lg">
          <button
            className="bg-[#fff] py-[8px]  text-black px-[3px] text-[12px] ml:text-[14px] ml:w-[8%] w-[20%] rounded-[10px]"
            id="border_button"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            className={`bg-[#06A9EF] py-[8px] text-white px-[3px] ml:text-[14px] text-[12px] ml:w-[8%] w-[20%] rounded-[10px] ${
              !hasChanges ? "opacity-50 cursor-not-allowed" : ""
            }`}
            id="border_button"
            onClick={handleSubmitData}
            disabled={!hasChanges}
          >
            Save
          </button>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default Index;
