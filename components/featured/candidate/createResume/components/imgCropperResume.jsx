import React, { useState } from "react";
import { ClosedIcon } from "../../../../../utils/svg";
import Cropper from "react-easy-crop";
import MiniLoader from "../../../../common/mini-loader";

const ImageCropperResume = ({ setModelView, file, setCroppedImage }) => {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          blob.name = "cropped.png"; // Set the name of the blob
          resolve(blob);
        },
        "image/png", // Specify PNG as the output format
        1 // Use the default quality for PNG
      );
    });
  };

  const showCroppedImage = async () => {
    try {
      setLoading(true);
      const croppedImageBlob = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
      setCroppedImage({ blob: croppedImageBlob, url: croppedImageUrl });
      setModelView(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="absolute bg-white px-4 py-2 rounded-lg shadow-lg flex flex-col gap-2 items-end max-h-[500px] max-w-[600px] ml:h-[50vw] ml:w-[60vw] sm:h-[60vw] sm:w-[70vw] w-[80vw] h-[80vw]">
          <div className="flex gap-[16px]">
            <button onClick={() => setModelView(false)}>
              <ClosedIcon />
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="crop-container overflow-hidden rounded-[12px] max-h-[400px] max-w-[400px] ml:w-[50vw] ml:h-[35vw] sm:h-[45vw] sm:w-[60vw] h-[50vw] w-[70vw]">
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
          <button
            className="font-montserrat text-white font-medium text-[14px] flex items-center justify-center px-[12px] rounded-[8px] bg-[#06A9EF] w-[80px] h-[42px]"
            onClick={showCroppedImage}
          >
            {loading && <MiniLoader />}
            {!loading && "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperResume;
