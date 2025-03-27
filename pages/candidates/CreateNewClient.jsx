import "react-phone-input-2/lib/bootstrap.css";

import { useRouter } from "next/router";
import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";
import { details, telCode } from "../../utils/data";

import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import ImageContainer from "../../components/common/image";
import ImageCropper from "../../components/featured/candidate/createResume/components/imageCropper";
function CreateNewClient() {
  const router = useRouter();

  const { id, isUpdate } = router.query;
  // console.log(322, id, isUpdate)
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const isViewportBelow850 = useMediaQuery("(max-width:850px)");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [isProfileImageRemoved, setIsProfileImageRemoved] = useState(false);
  const [error, setError] = useState(false);
  const [modelView, setModelView] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [countyCode, setCountryCode] = useState();
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [modifyUpdate, setModifyUpdate] = useState();
  const [originalData, setOriginalData] = useState({});

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    designation: "",
    dial_code: "",
    email: "",
    location: "",
    gender: "male",
    img: null,
  });
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    setIsProfileImageRemoved(false);
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
        if (selectedFile?.type.includes("image")) {
          setData({ ...data, img: selectedFile });
          setModelView(true);
          setError(false);
          event.target.value = "";
        } else {
          toast.error("Only Image files are allowed");
        }
      } else {
        toast.error("Please select a file that is  2 MB.");
      }
    }
  };

  useEffect(() => {
    setData({ ...data, img: croppedImage?.blob });
  }, [croppedImage]);

  // const callData = () => {
  //   axios
  //     .get(
  //       `https://dev.api.skilotech.com/api/client/getByRecruiter/${userDataGlobal?._id}`
  //     )
  //     .then((res) => {
  //       setDetails(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   callData();
  // }, [userDataGlobal]);

  const [formError, setFormError] = useState({});

  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          errors.firstName = "First Name is required";
        } else if (!isNaN(value)) {
          errors.firstName = "First Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.firstName = "First Name cannot contain numbers";
        } else {
          delete errors.firstName;
        }
        break;
      case "lastName":
        if (!value.trim()) {
          errors.lastName = "Last Name is required";
        } else if (!isNaN(value)) {
          errors.lastName = "Last Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.lastName = "Last Name cannot contain numbers";
        } else {
          delete errors.lastName;
        }
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Invalid email format";
        } else {
          delete errors.email;
        }
        break;

      case "mobileNo":
        if (!value.trim()) {
          errors.mobileNo = "Mobile Number is required";
        } else if (isNaN(value)) {
          errors.mobileNo = "Mobile Number cannot be text";
        } else {
          delete errors.mobileNo;
        }
        break;
      case "designation":
        if (!value.trim()) {
          errors.designation = "Designation Name is required";
        } else if (!isNaN(value)) {
          errors.designation = "Designation Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.designation = "Designation Name cannot contain numbers";
        } else {
          delete errors.designation;
        }
        break;
      case "location":
        if (!value.trim()) {
          errors.location = "Current Location is required";
        } else {
          delete errors.location;
        }
        break;

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };
  const handleInputChange = (fieldName, value) => {
    if (fieldName == "mobileNo") {
      if (value.replace(/\D/g, "").length <= 10) {
        setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
      }
    } else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
    // const hasChanged = Object.keys(data).some(
    //   (key) => data[key] !== originalData[key]
    // );
    // setModifyUpdate(hasChanged);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const errors = validateInput();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "designation",
      "location",
      "mobileNo",
      "gender",
      "dial_code",
    ];
    const emptyFields = requiredFields.filter((field) => !data[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        const formdata = new FormData();
        Object.keys(data).forEach((key) => {
          if (key === "email") {
            formdata.append(key, data[key].toLowerCase());
          } else {
            formdata.append(key, data[key]);
          }
        });
        formdata.append("recruiterId", userDataGlobal?._id);
        formdata.append(
          "img",
          croppedImage === null ? details.profilePicture : croppedImage
        );
        formdata.append("isProfileImageRemoved", isProfileImageRemoved);
        const url = isUpdate
          ? "https://dev.api.skilotech.com/api/updateClient"
          : "https://dev.api.skilotech.com/api/client/create";

        const response = await axios.post(url, formdata);

        setData({
          firstName: "",
          lastName: "",
          mobileNo: "",
          designation: "",
          dial_code: "",
          email: "",
          img: "",
          location: "",
          gender: "male",
        });
        const clientSaveLimit = localStorage.getItem("clientCount");
        localStorage.setItem("clientCount", Number(clientSaveLimit) + 1);

        setFormError({});
        setLoading(false);
        router.push("/candidates");

        toast.success(
          isUpdate
            ? "Candidate Updated successfully"
            : "Candidate created successfully"
        );
      } catch (error) {
        setLoading(false);
        if (error.response?.data.message === "User already exist") {
          toast.error("Candidate already exist");
        } else {
          console.error(
            "Error updating/creating Candidate:",
            error.response || error.message
          );
          toast.error("Failed to create Candidate");
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dev.api.skilotech.com/api/client/getByClientId/${id}`)
        .then((res) => {
          const details = res.data.data;
          setDetails(details);
          // console.log(4545,details)
          const initialData = {
            firstName: details.firstName,
            lastName: details.lastName,
            mobileNo: details.mobileNo,
            designation: details.designation,
            email: details.email,
            location: details.location,
            gender: details.gender,
            img: details.profilePicture,
            dial_code: details.dial_code,
          };
          // setCroppedImage(details.profilePicture)
          setData(initialData);
          setOriginalData(initialData);
        });
    }
  }, [id]);

  // console.log(222, selectedItem, countyCode)
  // console.log(4545,croppedImage)

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code });
    setSearchTerm("");
  };

  useEffect(() => {
    setCountryCode(details.dial_code);
    const filteredItems = filteredTelCode.filter(
      (item) => item.dial_code === countyCode
    );

    setSelectedItem(filteredItems);
  }, [details, countyCode]);

  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);
    const filteredCodes = telCode.filter(filterLogic);
    const firstSixCodes = filteredCodes.slice(0, 6);
    const remainingCodes = filteredCodes.slice(6);

    const sortedRemainingCodes = remainingCodes.sort((a, b) => {
      const numA = parseInt(a.dial_code.replace("+", ""), 10);
      const numB = parseInt(b.dial_code.replace("+", ""), 10);
      return numA - numB;
    });

    const combinedCodes = [...firstSixCodes, ...sortedRemainingCodes];
    setFilteredTelCode(combinedCodes);

    // setFilteredTelCode(filteredCodes);
  }, [telCode, searchTerm]);

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const customFilterOption = ({ label, value, data }, inputValue) => {
    const lowercasedInput = inputValue.toLowerCase();
    return (
      data.code.toLowerCase().includes(lowercasedInput) ||
      data.dial_code.includes(inputValue)
    );
  };

  return (
    <>
      {modelView && (
        <ImageCropper
          setModelView={setModelView}
          file={data.img}
          setCroppedImage={setCroppedImage}
        />
      )}
      <div className="flex justify-center">
        <div className="flex flex-col  gap-4   w-[100%] ">
          <p className="text-[18px] font-semibold">
            {isUpdate ? "Update" : "Create New"} Candidate
          </p>
          <div
            className="flex flex-col gap-9 rounded-[16px] scr420:p-6 p-3 bg-white"
            // style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
          >
            <div className="flex flex-col gap-4">
              <p className="text-[16px] font-medium">Profile Photo</p>
              <div className="flex sm:gap-6 gap-3">
                {data.img ? (
                  <ImageContainer
                    src={
                      croppedImage ? croppedImage?.url : details.profilePicture
                    }
                    alt="Selected File"
                    className="w-[112px] h-[112px] rounded-[50%] object-cover"
                  />
                ) : (
                  <svg
                    width="112"
                    height="112"
                    viewBox="0 0 112 112"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112Z"
                      fill="#EFFAFF"
                    />
                    <path
                      d="M72.8477 57.6827C82.1815 49.1895 82.1815 35.4193 72.8477 26.9261C63.514 18.4329 48.381 18.4329 39.0472 26.9261C29.7135 35.4193 29.7135 49.1895 39.0472 57.6827C48.381 66.176 63.514 66.1759 72.8477 57.6827Z"
                      fill="#D4E5EF"
                    />
                    <path
                      d="M55.9999 112C73.0337 112 88.289 104.393 98.5599 92.3928C93.1095 75.6573 76.1192 66.7704 55.9999 66.7704C35.8806 66.7704 18.8903 75.6573 13.4399 92.3928C23.7108 104.393 38.9661 112 55.9999 112Z"
                      fill="#D4E5EF"
                    />
                  </svg>
                )}

                <div className="flex flex-col gap-3 w-[168px] text-center items-center ">
                  <p className="text-[12px] font-normal">
                    Allowed file formats: jpg, jpeg | up to 2 MB
                  </p>
                  <div className="text-[12px] font-semibold px-4 py-2 rounded-[8px] bg-[#06A9EF] text-white w-[135px] upload-btn-wrapper ">
                    <input
                      type="file"
                      ref={fileRef}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    Upload Picture
                  </div>
                  <div
                    className="text-[12px] font-semibold px-4 py-2 rounded-[8px]  border border-[#06A9EF]  w-[135px] cursor-pointer"
                    onClick={() => {
                      setData({ ...data, img: null });
                      setCroppedImage(null);
                      setError(false);
                      setIsProfileImageRemoved(true);
                    }}
                  >
                    Remove Picture
                  </div>
                </div>
              </div>
              {error && <div className="text-[16px] text-red">{error}</div>}
              <div>
                <div className="flex flex-col gap-4">
                  <div className=" flex justify-center pt-4  pb-2">
                    <form className=" w-[100%]  education_page ">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-6 w-[100%] ml:flex-row flex-col ">
                          <div className="personal_name_parent flex ml:flex-row flex-col ml:w-[50%] w-[100%]">
                            <div className="personal_name ml:w-[50%] w-[100%]">
                              <p className="form_text_heading ">
                                First Name <span className="star">*</span>
                              </p>
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter First Name"
                                value={data.firstName}
                                maxLength={50}
                                className="h-[40px] px-2 rounded-[8px] border border-[#DEDEDE] w-full"
                                onChange={(e) =>
                                  handleInputChange("firstName", e.target.value)
                                }
                              />
                              {formError && (
                                <p className="text-[12px] text-[red] font-[500]">
                                  {formError.firstName}
                                </p>
                              )}
                            </div>

                            <div className="personal_name ml:w-[50%] w-[100%]">
                              <p className="form_text_heading">
                                Last Name <span className="star">*</span>
                              </p>
                              <input
                                type="text"
                                name=""
                                className="h-[40px] px-2 rounded-[8px] border border-[#DEDEDE] w-full"
                                placeholder="Enter Last Name"
                                value={data.lastName}
                                onChange={(e) =>
                                  handleInputChange("lastName", e.target.value)
                                }
                              />
                              {formError && (
                                <p className="text-[12px] text-[red] font-[500]">
                                  {formError?.lastName}
                                </p>
                              )}
                            </div>
                          </div>

                          <div
                            className={`personal_name ml:w-[50%] w-[100%] `}
                          >
                            <p className="form_text_heading">
                              Email <span className="star">*</span>
                            </p>
                            <input
                              className={`${isUpdate && "opacity-70"} h-[40px] px-2 rounded-[8px] border border-[#DEDEDE] w-full`}
                              disabled={isUpdate}
                              type="email"
                              name=""
                             
                              placeholder="Enter Email"
                              value={data.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                            />
                            {formError && (
                              <p className="text-[12px] text-[red] font-[500]">
                                {formError?.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-6 ml:flex-row flex-col  w-[100%]  ">
                          <div className="personal_single_input ml:w-[50%] w-[100%] gap-2">
                            <p className="form_text_heading">
                              Contact Number <span className="star">*</span>
                            </p>
                            <div
                              className={`flex  items-center h-[40px] px-2 rounded-[8px] border border-[#DEDEDE] w-full ${
                                isViewportBelow850
                                  ? "gap-[4px] "
                                  : "gap-[16px] "
                              }`}
                            
                            >
                              <div
                                className={`relative min-w-[150px] ${
                                  isViewportBelow850 ? "w-[65%] " : "w-[40%] "
                                } items-center`}
                              >
                                <div className="  w-[100%] sm:text-[14px] text-[13px] justify-center items-center  flex font-[500] text-[#646464]">
                                  <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[140px] w-[100%]">
                                    <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                                      <ReactSelect
                                        options={filteredTelCode}
                                        className="w-[100%] flex  items-center py-1  rounded-[8px]"
                                        name=""
                                        placeholder="Select"
                                        value={selectedItem}
                                        onChange={handleItemClick}
                                        getOptionLabel={(option) => (
                                          <div className="flex items-center  ">
                                            <img
                                              src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                              width="20px"
                                            />
                                            <span className="ml-2 text-[#333]">
                                              {option.code} {option.dial_code}
                                            </span>
                                          </div>
                                        )}
                                        // getOptionValue={(option) =>
                                        //   option.dial_code
                                        // }
                                        filterOption={customFilterOption}
                                        styles={{
                                          control: (provided) => ({
                                            ...provided,
                                            border: "none",

                                            minWidth: "130px",
                                          }),
                                        }}
                                        theme={(theme) => ({
                                          ...theme,
                                          borderRadius: 0,
                                          colors: {
                                            ...theme.colors,
                                            // primary25: 'hotpink',
                                            primary: "neutral0",
                                          },
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <input
                                className="w-full mobileNo  "
                                type="text"
                                name=""
                                // id="single_input"
                                placeholder={`${
                                  isViewportBelow850
                                    ? "Enter Number "
                                    : "Enter Contact Number "
                                }`}
                                value={data.mobileNo}
                                onChange={(e) =>
                                  handleInputChange("mobileNo", e.target.value)
                                }
                              />
                            </div>

                            {/* Display error message if any */}
                            {formError && (
                              <p className="text-[12px] text-[red] font-[500]">
                                {formError?.mobileNo}
                              </p>
                            )}
                          </div>

                          <div className="personal_name ml:w-[50%] w-[100%]">
                            <p className="form_text_heading">
                              Designation<span className="star">*</span>
                            </p>
                            <input
                              type="text"
                              name=""
                           className="h-[38px] px-2 rounded-[8px] border border-[#DEDEDE] w-full"
                              placeholder="Enter Designation"
                              value={data.designation}
                              onChange={(e) =>
                                handleInputChange("designation", e.target.value)
                              }
                            />
                            {formError && (
                              <p className="text-[12px] text-[red] font-[500]">
                                {formError?.designation}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                          <div className="personal_single_input">
                            <p className="form_text_heading">
                              Gender <span className="star">*</span>
                            </p>
                            <div className="gender_button">
                              <button
                                className={`gen_button ${
                                  data.gender == "male" && "gen_button_active"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setData({ ...data, gender: "male" });
                                }}
                              >
                                Male
                              </button>
                              <button
                                className={`gen_button ${
                                  data.gender == "female" && "gen_button_active"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setData({ ...data, gender: "female" });
                                }}
                              >
                                Female
                              </button>
                              <button
                                className={`gen_button ${
                                  data.gender == "other" && "gen_button_active"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setData({ ...data, gender: "other" });
                                }}
                              >
                                Other
                              </button>
                            </div>
                          </div>
                          <div className="personal_single_input">
                            <div className="personal_name w-[100%]">
                              <p className="form_text_heading">
                                Current Location <span className="star">*</span>
                              </p>
                              <input
                                type="text"
                                name=""
                                 className="h-[38px] px-2 rounded-[8px] border border-[#DEDEDE] w-full"
                                placeholder="Enter Your Location"
                                value={data.location}
                                onChange={(e) =>
                                  handleInputChange("location", e.target.value)
                                }
                              />
                              {formError && (
                                <p className="text-[12px] text-[red] font-[500]">
                                  {formError?.location}
                                </p>
                              )}
                              <img
                                className="icon"
                                src="/images/auth/candidate/location_on.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bottom_buttons pt-6  font-[500] flex justify-between">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              router.back();
                            }}
                            className="px-6 h-[40px] blue_border_Button  rounded-[30px]"
                          >
                            Back
                          </button>
                          <button
                            className={` font-[500] px-6 bg_Button h-[40px] rounded-[30px] `}
                            id=""
                            onClick={submitHandler}
                          >
                            {loading ? (
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
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                            ) : isUpdate ? (
                              "Update Candidate"
                            ) : (
                              "Create Candidate"
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewClient;
