
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import ImageCropperResume from "../candidate/createResume/components/imgCropperResume";
import ImageContainer from "../../common/image";
import { ImageSelect } from "../../../utils/svg";

function ChangeProfile({ setIsChangeProfile, userData }) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [modelView, setModelView] = useState(false);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isImg, IsNotImg] = useState(null);
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [selectedImg, setSelectedImg] = useState("device")
  const [selectedImgToPass, setSelectedImgToPass] = useState()

  console.log(selectedImg)

  useEffect(() => {
    setSelectedImgToPass(croppedImage?.blob)

  }, [croppedImage]);

  const imgSelect = (e) => {
    setSelectedImg(e)
    setSelectedImgToPass()
  }

  const handleFileChange = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size <= 1 * 1024 * 1024) {
        // Check if file is less than 2MB
        if (selectedFile.type.includes("image")) {
          const pngBlob = await convertToPng(selectedFile);
          if (pngBlob.size <= 1 * 1024 * 1024) {
            // Ensure PNG is also less than 2MB
            setFile(pngBlob);
            setModelView(true);
            event.target.value = "";
          } else {
            toast.error("Converted PNG file is larger than 1 MB.");
          }
        } else {
          toast.error("Only image files are allowed.");
        }
      } else {
        toast.error("Please select a file which is less than 1 MB.");
      }
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
        // Create a canvas and draw the image
        const canvas = document.createElement("canvas");
        const maxDimension = 1000; // Resize max dimension
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

        // Convert the canvas content to a PNG blob with compression
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
        ); // Compression quality
      };

      reader.readAsDataURL(file);
    });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeImgae = () => {
    setCroppedImage({ url: "/images/services/profile.png" });
  };
  const saveProfilePhoto = () => {
    const formData = new FormData();
    formData.append("img", selectedImgToPass);
    axios
      .put(
        "http://localhost:2000/api/candidate/updateProfileImage/" +
        userDataGlobal._id,
        formData
      )
      .then((res) => {
        dispatch(fetchUserData());
        toast.success("Profile Picture Updated Successfully");

        setIsChangeProfile(false);
      })
      .catch((err) => toast.error("Size should be less than 2 mb"));
  };
  
  return (
    <div className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
      <div
        className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto "

      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p
              className="text-[#25324B] text-[18px] font-[600] min-w-[215px]  leading-[160%]"
            >
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

        <div className="flex p-[24px] flex-col justify-center items-center gap-4 rounded-[12px] bg-[#fff] border-[1px] border-solid border-[#06A9EF]">
          <div className="flex flex-col items-center gap-[36px]">

            <>

              <div className="flex gap-9">
                <div className="relative">
                  {selectedImg === "man" &&
                    <div className={"absolute top-0 left-1"}>
                      <ImageSelect />
                    </div>
                  }
                  <img
                    onClick={(e) => imgSelect("man")}
                    src={"/images/profile/dummyMan.png"}
                    alt=""
                    className="min-h-[186px] max-w-[186px]  max-h-[186px] min-w-[186px]  rounded-[50%] object-contain"
                  />
                </div>
                <div onClick={(e) => imgSelect("device")} className="flex relative items-center justify-center  min-w-[186px]  min-h-[186px] max-w-[186px]  max-h-[186px] rounded-[186px] border-[3px]  border-[#646464]">
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
                      onClick={(e) => imgSelect("girl")}
                      src={
                        userData?.profilePicture?.img
                          ? userData?.profilePicture?.img
                          : "/images/services/profile.png"
                      }
                      alt=""
                      className="min-h-[164px] max-w-[164px]  max-h-[164px] min-w-[164px]  rounded-[50%] object-contain"
                    />

                  )}
                  {selectedImg === "device" &&
                    <div className={"absolute -top-0.5 left-1"}>
                      <ImageSelect />
                    </div>
                  }
                </div>
                <div className="relative">
                  {selectedImg === "girl" &&
                    <div className={"absolute top-0 left-1"}>
                      <ImageSelect />
                    </div>
                  }
                  <img
                    onClick={() => setSelectedImg("girl")}
                    src={"/images/profile/dummyGirl.png"}
                    alt=""
                    className="min-h-[186px] max-w-[186px]  max-h-[186px] min-w-[186px]  rounded-[50%] object-contain"
                  />
                </div>

              </div>
              <div className="flex gap-4 justify-center items-start">

                <button className="flex justify-center items-center px-[5px] ms:px-[16px] py-[8px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] text-[#333] text-[12px] ms:text-[16px] font-[500] upload-btn-wrapper">
                  <input
                    onDragOver={handleDragOver}
                    ref={fileRef}
                    onDrop={handleFileChange}
                    type="file"
                    name="myfile"

                    onChange={handleFileChange}
                    className="h-full w-full"
                  />
                  Change Picture
                </button>
                <button
                  className="flex justify-center items-center ms:px-[16px] px-[5px] py-[8px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] bg-[#06A9EF] text-[#fff] ms:text-[16px] text-[12px] font-[500]"
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
