import ImageContainer from "@/components/common/image";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ChangeProfile({ setIsChangeProfile, userData }) {
  const userDataGlobal = useSelector((state) => state.userData);

  const [isImg, IsNotImg] = useState(null);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile?.type.includes("image")) {
        setFile(selectedFile);
      } else {
        toast.error("Only Image files are allowed");
      }
    }
  };
  const saveProfilePhoto = () => {
    const formData = new FormData();
    formData.append("img", file);
    axios
      .put(
        "https://freedygoservices.in/api/candidate/updateProfileImage/" +
          userDataGlobal._id,
        formData
      )
      .then((res) => {
        toast.success("Profile Picture Updated Successfully");
        window.location.reload();
        setIsChangeProfile(false);
      })
      .catch((err) => toast.error("Size should be less than 2 mb"));
  };
  return (
    <>
      <div
        className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px]"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p
              className="text-[#25324B] text-[16px] sm:text-[18px] ms:text-[24px] font-[500] w-[35
              rem] scr420:w-[45%] leading-[160%]"
            >
              Update Profile Picture
            </p>

            <div className="h-[1px] bg-[#DEDEDE] flex items-center w-[60%]"></div>
            <svg
              onClick={() => setIsChangeProfile(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_5716_140784)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                />
              </g>
            </svg>
          </div>
          <p className="text-[#646464] text-[14px] font-[400]">
            Recruiters are 40% more likely to notice a profile with a picture.
          </p>
        </div>

        <div className="flex p-[24px] flex-col justify-center items-center gap-4 rounded-[12px] bg-[#fff] border-[1px] border-solid border-[#06A9EF]">
          <div className="flex flex-col items-center gap-[36px]">
            {file ? (
              <>
                <div className="flex items-center justify-center w-[286px] h-[286px] rounded-[286px] border-[3px] border-solid border-[#646464]">
                  <ImageContainer
                    src={URL.createObjectURL(file)}
                    alt="Selected File"
                    className="w-[252px] h-[252px] rounded-[50%] overflow-hidden"
                  />
                </div>
                <div className="flex gap-4 justify-center items-start">
                  <button className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] text-[#333] text-[16px] font-[500] upload-btn-wrapper">
                    <input
                      type="file"
                      name="myfile"
                      onChange={handleFileChange}
                      className="h-full w-full"
                    />
                    Change Picture
                  </button>
                  <button
                    className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                    onClick={saveProfilePhoto}
                  >
                    Save Picture
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-[286px] h-[286px] rounded-[286px] border-[3px] border-solid border-[#646464]">
                  <img
                    class="w-[20px] h-[20px]"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : userData?.profilePicture?.img
                    }
                    alt=""
                  />
                </div>
                <div className="flex gap-4 justify-center items-start">
                  <button className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] text-[#333] text-[16px] font-[500] upload-btn-wrapper">
                    <input
                      type="file"
                      name="myfile"
                      onChange={handleFileChange}
                      className="h-full w-full"
                    />
                    Change Picture
                  </button>
                  <button
                    className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                    onClick={saveProfilePhoto}
                  >
                    Save Picture
                  </button>
                </div>
              </>
            )}
          </div>
          <p className="text-[#7C8493] text-[12px] ms:text-[16px] font-[400] leading-normal">
            Supported file format: png, jpg, jpeg, gif - upto 2MB
          </p>
        </div>
        <p className="text-[#333] text-[14px] font-[400] leading-[20px] text-center">
          By uploading your photo, you certify that skilotech has permission to
          show it to recruiters and that the supplied file does not violate our{" "}
          <span className="text-[#06A9EF] font-[600]">Terms of Service</span>.
        </p>
      </div>
    </>
  );
}

export default ChangeProfile;
