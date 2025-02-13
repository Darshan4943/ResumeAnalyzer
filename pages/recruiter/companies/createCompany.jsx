import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ImageContainer from "../../../components/common/image";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import MiniLoader from "../../../components/common/miniLoader";
import MiniLoader1 from "../../../components/common/mini-loader";
import ImageCropper from "../../../components/featured/candidate/createResume/components/imageCropper";

function CreateCompany() {
  const [id, setId] = useState("");
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [file, setFile] = useState(null);
  const [modelView, setModelView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const router = useRouter();
  const { companyId } = router.query;
  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({
    companyName: "",
    companyLogo: "",
    companyDescription: "",
  });
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      (companyId ? handleUpdate() : handleSubmit()).finally(() => {
        setIsButtonDisabled(false);
      });
    }
  };

  useEffect(() => {
    if (userDataGlobal?.id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);

  useEffect(() => {
    if (!companyId) return;
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:2000/api/company/fetchCompaniDetails/${companyId}`
        );
        if (response.data) {
          setData({
            companyName: response.data.companyName,
            companyLogo: response.data.companyLogo,
            companyDescription: response.data.companyDescription,
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, [companyId]);

  const debounceUpdate = useCallback(
    debounce((value) => {
      setData((prev) => ({ ...prev, companyDescription: value }));
    }, 500),
    []
  );

  const handleCompanyDescriptionChange = (value) => {
    if (value?.length < 200) {
      setData({ ...data, companyDescription: value.slice(0, 200) });
      debounceUpdate(value.slice(0, 200));
    } else {
      setData({ ...data, companyDescription: value });
      debounceUpdate(value);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const camelCaseToWords = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (char) => char.toUpperCase());
  };

  const validateForm = () => {
    const newErrors = {};
    let initialErrorShown = false;

    if (!data?.companyName?.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!data?.companyDescription?.replace(/<[^>]*>/g, "").trim()) {
      newErrors.companyDescription = "Company description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      if (!initialErrorShown && Object.keys(newErrors).length > 1) {
        toast.error("All fields are required.");
        initialErrorShown = true;
      } else if (Object.keys(newErrors).length === 1) {
        const field = Object.keys(newErrors)[0];
        toast.error(`${camelCaseToWords(field)} is required.`);
      }
    }

    setErrors(newErrors);
    setButtonLoading(false);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setData({ companyName: "", companyLogo: "", companyDescription: "" });
    setCroppedImage(null);
    setFile(null);
    setErrors({});
  };

  const handleFileChange = (event) => {
    event?.preventDefault();
    const selectedFile = event.target.files
      ? event.target.files[0]
      : event.dataTransfer.files[0];
    if (selectedFile) {
      if (
        selectedFile.size <= 3 * 1024 * 1024 &&
        selectedFile.type.includes("image")
      ) {
        setFile(selectedFile);
        setModelView(true);
        setErrors((prev) => ({ ...prev, companyLogo: "" }));
      } else {
        toast.error("Only image files up to 3MB are allowed.");
      }
      event.target.value = "";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    handleFileChange(event);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    if (!validateForm()) return;
    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("companyDescription", data.companyDescription);
      if (croppedImage) {
        const response = await fetch(croppedImage.url);
        const blob = await response.blob();
        const file = new File([blob], "companyLogo.jpg", {
          type: "image/jpeg",
        });
        formData.append("croppedImage", file);
      }
      const response = await axios.post(
        `http://localhost:2000/api/company/addCompany/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        setButtonLoading(false);
        toast.success(response.data.message);
        router.push("/recruiter/companies");
      } else {
        setButtonLoading(false);
        toast.error("Failed to add company.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setButtonLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleUpdate = async () => {
    setButtonLoading(true);
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("companyDescription", data.companyDescription);
      if (croppedImage) {
        const response = await fetch(croppedImage.url);
        const blob = await response.blob();
        const file = new File([blob], "companyLogo.jpg", {
          type: "image/jpeg",
        });
        formData.append("croppedImage", file);
      }

      const response = await axios.put(
        `http://localhost:2000/api/company/updateCompanyDetails/${companyId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setButtonLoading(false);
        toast.success(response.data.message);
        router.push("/recruiter/companies");
      } else {
        setButtonLoading(false);
        toast.error(response.data.message || "Failed to update company.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setButtonLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const previousPage = () => router.back();

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-strike" aria-label="Strike"></button>
        <button
          className="ql-list"
          value="ordered"
          aria-label="Ordered List"
        ></button>
        <button
          className="ql-list"
          value="bullet"
          aria-label="Unordered List"
        ></button>
        <button
          className="ql-align"
          value="left"
          aria-label="Align Left"
        ></button>
        <button
          className="ql-align"
          value="center"
          aria-label="Align Center"
        ></button>
        <button
          className="ql-align"
          value="right"
          aria-label="Align Right"
        ></button>
      </span>
    );
  };

  const header = renderHeader();

  return (
    <div className="w-full relative flex flex-col gap-5">
      <div className="flex gap-3 scr340:text-[18px] text-[16px] font-[600] text-[#333333] items-center">
        <svg
          onClick={previousPage}
          viewBox="0 0 24 24"
          fill="none"
          className="cursor-pointer w-[20px] h-[24px] scr340:w-[24px]"
        >
          <path
            d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z"
            fill="#1C1B1F"
          />
        </svg>
        Add Company Profile
      </div>
      {loading ? (
        <div className=" min-h-[360px] ">
          <MiniLoader />
        </div>
      ) : (
        <div
          style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
          className="rounded-[16px] w-full scr800:p-6 p-3 flex flex-col gap-[32px] bg-[#FFFFFF]"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-6 w-full flex-col scr800:flex-row justify-between">
              <div className="flex w-full scr1024:w-[48%] flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                <div className="gap-1">
                  {" "}
                  Company Name <span className="text-red">*</span>
                </div>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter Company Name"
                  className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2"
                />
              </div>
              <div className="scr1024:w-[48%] w-full flex flex-col scr1024:flex-row items-center justify-between gap-4">
                <div className="scr1024:w-[27.37%] w-full flex flex-col gap-2 text-[#333333] text-[14px] font-[500]">
                  Company Logo
                  <div className="text-[#7C8493] text-[12px] font-[400]">
                    This image will be shown publicly as company logo.
                  </div>
                </div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className="scr1024:w-[70.04%] w-full flex flex-col scr800:flex-row gap-2 items-center justify-between"
                >
                  {(croppedImage || data?.companyLogo) && (
                    <ImageContainer
                      value={data?.companyLogo}
                      src={croppedImage?.url || data?.companyLogo}
                      alt="Selected File"
                      className="w-[32.95%] h-[60px]"
                    />
                  )}

                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-logo"
                  />
                  <label
                    htmlFor="upload-logo"
                    className="px-4 py-2 bg-[#EFFAFF] rounded-lg flex flex-col items-center border-dashed border-[1px] border-[#06A9EF] cursor-pointer"
                  >
                    <div className="text-[12px] font-[400] text-[#333333]">
                      <span className="text-[#06A9EF]">Click to replace</span>{" "}
                      or drag and drop
                    </div>
                    <div className="text-[10px] font-[400] text-[#333333]">
                      SVG, PNG, JPG or GIF (max. 400 x 400px)
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[14px] font-[500] text-[#333333]">
            <div className="gap-1">
              {" "}
              About Company <span className="text-red">*</span>
            </div>
            <Editor
              headerTemplate={header}
              value={data.companyDescription}
              onTextChange={(e) => handleCompanyDescriptionChange(e.htmlValue)}
              maxLength={200}
              style={{
                border: "2px solid #dedede",
                fontSize: "16px",
                color: "#333",
                padding: "10px",
                minHeight: "196px",
              }}
            />
            <div className="text-[12px] text-gray-500">
              {data.companyDescription
                ? data.companyDescription.replace(/<[^>]*>/g, "").length > 200
                  ? 200
                  : data.companyDescription.replace(/<[^>]*>/g, "").length
                : 0}{" "}
              / 200 characters
            </div>
          </div>
          <div className="w-full flex justify-between pt-5">
            <button
              onClick={router.back}
              className="rounded-[30px] border-[1px] border-[#B3261E] boder-solid px-2 ms:px-8 py-1 ms:py-3 text-[14px] font-[600] text-[#B3261E]"
            >
              Cancel
            </button>
            <div className="flex gap-[2px] scr340:gap-[14px]">
              <button
                onClick={handleReset}
                className="rounded-[30px] border-[1px] border-[#06A9EF] boder-solid px-3 ms:px-9 py-1 ms:py-3 text-[14px] font-[600] text-[#333333]"
              >
                Reset
              </button>
              <button
                onClick={handleClick}
                disabled={isButtonDisabled}
                className="rounded-[30px] border-[1px] border-[#06A9EF] bg-[#06A9EF] border-solid px-3 ms:px-9 py-1 ms:py-3 text-[14px] font-[600] text-[#FFFFFF]"
              >
                {isButtonDisabled ? (
                  <MiniLoader1 />
                ) : companyId ? (
                  "Update Details"
                ) : (
                  "Save Details"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {modelView && (
        <ImageCropper
          setModelView={setModelView}
          file={file}
          setCroppedImage={setCroppedImage}
        />
      )}
    </div>
  );
}

export default CreateCompany;
