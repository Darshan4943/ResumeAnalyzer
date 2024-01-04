import ImageContainer from "@/components/common/image";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ChangeProfile({ setIsChangeProfile }) {
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
        toast.success("Profile Picture Updated Successfully")
        setIsChangeProfile(false)
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px]"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p className="text-[#25324B] text-[24px] font-[500] w-[40%] leading-[160%]">
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
              <div class="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]">
                <input
                  type="file"
                  name="myfile"
                  onChange={handleFileChange}
                  className="h-full w-full"
                />
                <div className="  flex  flex-col  items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
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
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="flex flex-col gap-[4px]	font-normal	">
                  <div class="flex text-center justify-center  text-[14px] text-[#515B6F]">
                    drag and drop or{" "}
                    <p class="text-[#06A9EF]">&nbsp;Browse file </p>
                    &nbsp;to upload
                  </div>
                  <p class="text-center text-[12px] font-normal text-[#7C8493]">
                    PDF or DOCS
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="text-[#7C8493] text-[16px] font-[400] leading-normal">
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
