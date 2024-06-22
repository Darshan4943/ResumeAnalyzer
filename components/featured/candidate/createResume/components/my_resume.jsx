import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ImageContainer from "../../../../common/image";
import { DumyImage } from "../../../../../utils/svg";
import Cropper from "react-easy-crop";
import ImageCropper from "./imageCropper";
import ImageCropperResume from "./imgCropperResume";

const ResumeList = ({ data, setData }) => {
  const [file, setFile] = useState(null);
  const [modelView, setModelView] = useState(false);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const [croppedImage, setCroppedImage] = useState(null);


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
  const handleImageConversion = async (blob) => {
    // Create an image element
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);

    // Wait for the image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Calculate the desired dimensions
    const scaleFactor = Math.sqrt(blob.size / 156584); // Original JPEG size
    const width = img.width / scaleFactor;
    const height = img.height / scaleFactor;

    // Create a canvas and draw the resized image on it
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    // Convert the canvas content to a PNG blob with maximum compression
    return new Promise((resolve) => {
      canvas.toBlob(
        (pngBlob) => {
          resolve(pngBlob);
        },
        "image/png",
        0.1
      ); // Use lower quality factor to compress
    });
  };

  // const handleClick = async () => {
  //   if (croppedImage?.blob) {
  //     const pngBlob = await handleImageConversion(croppedImage.blob);
  //     setFile(pngBlob)
  //   }
  // };

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
        className="flex flex-col gap-4 py-4 bg-white rounded-lg"
        // style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <p className="text-[20px] font-medium">Upload Photo</p>
        <div className="flex sm:flex-row ml:flex-col xxlg:flex-row  flex-col gap-4 items-center justify-center">
          {croppedImage ? (
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
            className="border-dashed border-[3px] border-[#06A9EF] flex flex-col rounded-[12px] p-4 items-center upload-btn-wrapper"
            onDragOver={handleDragOver}
            ref={fileRef}
            onDrop={handleFileChange}
          >
            <input type="file" name="myfile" onChange={handleFileChange} />

            <div className="  flex  flex-col  items-center">
              <DumyImage />
            </div>
            <div className="flex flex-col gap-[4px]	font-normal	">
              <div className="flex text-center justify-center  text-[14px] text-[#515B6F]">
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <p
                  onClick={handleButtonClick}
                  className="text-[#06A9EF] font-medium"
                >
                  &nbsp;Browse file{" "}
                </p>
                &nbsp;or drag and drop
              </div>
              <p className="text-center text-[14px] font-normal text-[#333]">
                {" "}
                Allowed file formats: jpg, jpeg | up to 1 MB
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between sm:justify-end  ">
          <div className="flex justify-between  py-2 gap-2 sm:w-fit w-full">
            <button
              disabled={
                data.profilePhoto === null || data.profilePhoto === undefined
              }
              className={`font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[83px] h-[32px] ${
                (data.profilePhoto === null ||
                  data.profilePhoto === undefined) &&
                "opacity-50"
              }`}
              onClick={() => removeImgae()}
            >
              Remove
            </button>

            <button
              disabled={!croppedImage}
              className={` font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] ${
                !croppedImage && "opacity-50"
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
          <ImageCropperResume
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
