import React, { useState } from "react";
import { ClosedIcon } from "../../../../../utils/svg";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import axios from "axios";
import MiniLoader from "../../../../common/mini-loader";
const ImageCropper = ({ setModelView, file, setCroppedImage }) => {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );
      setCroppedImage(croppedImage);
      setModelView(false);
    } catch (e) {
      console.error(e);
    }
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };
  return (
    <div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
        <div className=" absolute bg-white  px-4 py-2 rounded-lg shadow-lg  flex flex-col gap-2 items-end ml:h-[50vw] ml:w-[60vw] sm:h-[60vw] sm:w-[70vw] w-[80vw] h-[80vw]">
          <div className="flex gap-[16px]">
            <button onClick={() => setModelView(false)}>
              <ClosedIcon />
            </button>
          </div>

          <div className="w-full  h-full flex items-center justify-center relative">
            <div className="crop-container overflow-hidden rounded-[12px] ml:w-[50vw] ml:h-[35vw] sm:h-[45vw] sm:w-[60vw] h-[50vw] w-[70vw]  ">
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                zoom={zoom}
                aspect={1/1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
          <button
            className=" font-montserrat text-white font-medium text-[14px] flex items-center justify-center px-[12px] rounded-[8px]  bg-[#06A9EF] w-[80px] h-[42px]"
            onClick={() => {
              showCroppedImage();
              setLoading(true);
            }}

          >
            {loading && <MiniLoader />}
            {!loading && "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
