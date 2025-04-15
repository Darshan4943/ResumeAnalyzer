import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import ImageCropperResume from "../candidate/createResume/components/imgCropperResume";
import ImageContainer from "../../common/image";
import { DeleteProfileImg, ImageSelect } from "../../../utils/svg";

function ChangeProfile({ setIsChangeProfile, userData }) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [modelView, setModelView] = useState(false);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isImg, IsNotImg] = useState(null);
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState("device");

  useEffect(() => {
    if (userData?.profilePicture?.img) {
      setCroppedImage({ url: userData?.profilePicture?.img });
    }
  }, [userData?.profilePicture?.img]);


  const imgSelect = (e) => {
    setSelectedImg(e);
  };

  const handleFileChange = async (event) => {
    event.preventDefault();

    const files = event.target.files || event.dataTransfer?.files;

    if (files && files[0]) {
      const selectedFile = files[0];

      if (selectedFile.size <= 1 * 1024 * 1024) {
        if (selectedFile.type.includes("image")) {
          try {
            const pngBlob = await convertToPng(selectedFile);
            if (pngBlob.size <= 1 * 1024 * 1024) {
              setFile(pngBlob);
              setModelView(true);
              event.target.value = ""; 
            } else {
              toast.error("Converted PNG file is larger than 1 MB.");
            }
          } catch (error) {
            toast.error("Error converting the image to PNG.");
            console.error("Conversion error:", error);
          }
        } else {
          toast.error("Only image files are allowed.");
        }
      } else {
        toast.error("Please select a file which is less than 1 MB.");
      }
    } else {
      toast.error("No file selected.");
    }
  };

  const convertToPng = async (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDimension = 1000; 
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height *= maxDimension / width;
            width = maxDimension;
          } else {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas to Blob conversion failed"));
            }
          },
          "image/png",
          0.8
        );
      };

      reader.readAsDataURL(file);
    });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeImgae = () => {
 
    setSelectedImg("dummy")
    setCroppedImage({ url: "/images/services/profile.png" });
  

  };

  console.log(selectedImg)
  const saveProfilePhoto = async () => {
    const formData = new FormData();

    if (selectedImg === "device" && croppedImage?.blob) {
      formData.append("croppedImage", croppedImage.blob);
    }else if (selectedImg === "dummy") {
      formData.append(
        "profilePicture",
        JSON.stringify({ img: "/images/services/profile.png" })
      );
    } 
     else if (selectedImg === "man") {
      formData.append(
        "profilePicture",
        JSON.stringify({ img: "/images/profile/dummyMan.png" })
      );
    } else if (selectedImg === "girl") {
      formData.append(
        "profilePicture",
        JSON.stringify({ img: "/images/profile/dummyGirl.png" })
      );
    }

    try {
      const response = await axios.put(
        `http://localhost:2000/api/candidate/updateProfileImage/${userDataGlobal?._id}`,
        formData
      );
      dispatch(fetchUserData());
      toast.success("Profile Picture Updated Successfully");
      setIsChangeProfile(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to update profile picture. Ensure the file size is within the limit."
      );
    }
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p className="text-[#25324B] text-[18px] font-[600] min-w-[215px]  leading-[160%]">
              Update Profile Picture
            </p>

            <div className="h-[1px] bg-[#DEDEDE] flex items-center w-full"></div>
            <svg
              onClick={() => setIsChangeProfile(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="min-w-[40px]"
            >
              <g mask="url(#mask0_5716_140784)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                />
              </g>
            </svg>
          </div>
          <p className="text-[#646464] text-[16px] font-[400]">
            Recruiters are 40% more likely to notice a profile with a picture.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          ref={fileRef}
          onDrop={handleFileChange}
          className="flex p-[24px] flex-col justify-center items-center gap-4 rounded-[12px] bg-[#fff] border-[1px] border-solid border-[#06A9EF]"
        >
          <div className="flex flex-col items-center gap-[36px]">
            <>
              <div className="flex md:flex-row flex-col gap-9">
                <div
                  onClick={(e) => imgSelect("man")}
                  className=" cursor-pointer flex relative items-center justify-center  min-w-[186px]  min-h-[186px] max-w-[186px]  max-h-[186px] rounded-[186px] border-[3px]  border-[#646464]"
                >
                  {selectedImg === "man" && (
                    <div className={"absolute top-0 left-1"}>
                      <ImageSelect />
                    </div>
                  )}
                  <img
                    src={"/images/profile/dummyMan.png"}
                    alt=""
                    className="min-h-[164px] max-w-[164px]  max-h-[164px] min-w-[164px]  rounded-[50%] object-contain"
                  />
                </div>
                <div
                  onClick={(e) => imgSelect("device")}
                  className="flex relative items-center justify-center  min-w-[186px]  min-h-[186px] max-w-[186px]  max-h-[186px] rounded-[186px] border-[3px]  border-[#646464]"
                >
                  {croppedImage ? (
                    <>
                      <ImageContainer
                        src={croppedImage.url}
                        alt="Selected File"
                        className="min-h-[164px] max-w-[164px]  max-h-[164px] min-w-[164px] rounded-[50%] object-contain"
                      />
                    </>
                  ) : (
                    <img
                      src={
                        userData?.profilePicture?.img
                          ? userData?.profilePicture?.img
                          : "/images/services/profile.png"
                      }
                      alt=""
                      className="min-h-[164px] max-w-[164px]  max-h-[164px] min-w-[164px]  rounded-[50%] object-contain "
                    />
                  )}
                  {(selectedImg === "device" || selectedImg === "dummy") && (
                    <div className={"absolute -top-0.5 left-1"}>
                      <ImageSelect />
                    </div>
                  )}
                  {selectedImg === "device" && (
                    <div
                      onClick={(e) => {e.stopPropagation();removeImgae()}}
                      className={"absolute -bottom-0.5 right-1"}
                    >
                      <DeleteProfileImg />
                    </div>
                  )}
                </div>
                <div
                  onClick={(e) => imgSelect("girl")}
                  className=" cursor-pointer flex relative items-center justify-center  min-w-[186px]  min-h-[186px] max-w-[186px]  max-h-[186px] rounded-[186px] border-[3px]  border-[#646464]"
                >
                  {selectedImg === "girl" && (
                    <div className={"absolute top-0 left-1"}>
                      <ImageSelect />
                    </div>
                  )}

                  <img
                    onClick={() => setSelectedImg("girl")}
                    src={"/images/profile/dummyGirl.png"}
                    alt=""
                    className="min-h-[164px] max-w-[164px]  max-h-[164px] min-w-[164px]  rounded-[50%] object-contain"
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-center items-start">
                <button className=" cursor-pointer flex justify-center items-center px-[5px] ms:px-[36px] py-[8px] rounded-[30px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] text-[#333]  text-[14px] font-[600] upload-btn-wrapper">
                  <input
                    type="file"
                    name="myfile"
                    onChange={handleFileChange}
                    className="h-full w-full cursor-pointer"
                  />
                  Change Picture
                </button>
                <button
                  className="flex justify-center items-center ms:px-[36px] px-2 py-[8px] rounded-[30px] border-[1px] border-solid border-[#06A9EF] bg-[#06A9EF] text-[#fff] text-[14px] font-[600]"
                  onClick={saveProfilePhoto}
                >
                  Save Picture
                </button>
              </div>
            </>
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
      {modelView && (
        <ImageCropperResume
          setModelView={setModelView}
          file={file}
          setCroppedImage={setCroppedImage}
        />
      )}
    </div>
  );
}

export default ChangeProfile;
