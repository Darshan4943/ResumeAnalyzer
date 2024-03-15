import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ImageContainer from "../../../../common/image";
import { DumyImage } from "../../../../../utils/svg";
import Cropper from "react-easy-crop";
import ImageCropper from "./imageCropper";

const ResumeList = ({ data, setData }) => {

  const [file, setFile] = useState(null);
  const [modelView, setModelView] = useState(false);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const [croppedImage, setCroppedImage] = useState(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile?.type.includes("image")) {
        setFile(selectedFile);
        setModelView(true);
      } else {
        toast.error("Only Image files are allowed");
      }
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  console.log(9,file)
 

  const removeImgae=() => {
    
      setCroppedImage({ url:"/images/services/profile.png"  });
    
  };
  
  // useEffect(() => {
   
  //     setCroppedImage({ url: data.profilePhoto });
  // //  setFile(data.profilePhoto)
  // }, [data]);


  return (
    <>
      {/* <div className="bg-[#06A9EF] p-4 rounded-[16px] flex justify-between text-white">
        <p className="text-[20px] font-medium">My Resume</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g mask="url(#mask0_5765_78572)">
            <path
              d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
              fill="white"
            />
          </g>
        </svg>
      </div> */}
      <div
        className="flex flex-col gap-4 p-4 bg-white rounded-lg"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <p className="text-[20px] font-medium">Upload Photo</p>
        <div className="flex gap-4 items-center justify-center">
          { croppedImage ? (
            <ImageContainer
              src={croppedImage.url}
              alt="Selected File"
              className="w-[112px] h-[112px] rounded-[50%] object-cover"
            />
          ) : (
            <img
            src="/images/services/profile.png"
            alt="Selected File"
            className="w-[112px] h-[112px] rounded-[50%] object-cover"
          />
          )}
          <div
            class="border-dashed border-[3px] border-[#06A9EF] flex flex-col rounded-[12px] p-4 items-center upload-btn-wrapper"
            onDragOver={handleDragOver}
            ref={fileRef}
            onDrop={handleFileChange}
          >
            <input type="file" name="myfile" onChange={handleFileChange} />

            <div className="  flex  flex-col  items-center">
              <DumyImage />
            </div>
            <div class="flex flex-col gap-[4px]	font-normal	">
              <div class="flex text-center justify-center  text-[14px] text-[#515B6F]">
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <p
                  onClick={handleButtonClick}
                  class="text-[#06A9EF] font-medium"
                >
                  &nbsp;Browse file{" "}
                </p>
                &nbsp;or drag and drop
              </div>
              <p class="text-center text-[14px] font-normal text-[#333]">
                {" "}
                Allowed file formats: jpg, jpeg | up to 1.5 MB
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-between  py-2 gap-2">
            <button
              className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[83px] h-[32px]"
              onClick={() => removeImgae()}
            >
              Remove
            </button>
            <button
              disabled={file == data?.profilePhoto}
              className={` font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] ${
                file == data?.profilePhoto ? "opacity-50" : "opacity-100"
              }`}
              onClick={() => {
                setData({ ...data, profilePhoto: croppedImage?.blob });
              }}
            >
              Save
            </button>
          </div>
        </div>
        {modelView && (
          <ImageCropper
            setModelView={setModelView}
            file={file}
            setCroppedImage={setCroppedImage}
          />
        )}
      </div>
    </>
  );
};

export default ResumeList;
