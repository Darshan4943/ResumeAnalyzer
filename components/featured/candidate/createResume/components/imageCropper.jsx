import React, { useState } from "react";
import Cropper from "react-easy-crop";
import MiniLoader from "../../../../common/mini-loader";

const ImageCropper = ({ setModelView, file, setCroppedImage }) => {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const getCroppedImg = async (imageSrc, croppedAreaPixels, fileName, quality = 0.4) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the canvas size based on the cropped area
    canvas.width = croppedAreaPixels.width; 
    canvas.height = croppedAreaPixels.height;

    // Optional: Set a transparent or colored background
    ctx.fillStyle = "rgba(255, 255, 255, 0)"; // Transparent background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image onto the canvas
    ctx.drawImage(
        image,
        croppedAreaPixels.x,  // Use croppedAreaPixels.x
        croppedAreaPixels.y,  // Use croppedAreaPixels.y
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                const url = URL.createObjectURL(blob);
                resolve({ blob, url });
            },
            "image/jpeg",
            quality
        );
    });
};

const createImage = (url) => {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Ensure CORS settings are correct
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
  });
};


  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels,
        file.name,
        0.4 // Adjust the quality here (0.4 means 40% quality)
      );
      setCroppedImage(croppedImage);
      setModelView(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Cropped Area Pixels:", croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="absolute bg-white px-4 py-2 rounded-lg shadow-lg flex flex-col gap-2 items-end max-h-[500px] max-w-[600px] ml:h-[50vw] ml:w-[60vw] sm:h-[60vw] sm:w-[70vw] w-[80vw] h-[80vw]">
          <div className="flex gap-[16px]">
            <button onClick={() => setModelView(false)}>
              {/* Replace this with your ClosedIcon component */}
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="crop-container overflow-hidden rounded-[12px] max-h-[400px] max-w-[400px] ml:w-[50vw] ml:h-[35vw] sm:h-[45vw] sm:w-[60vw] h-[50vw] w-[70vw]">
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
          <button
            className="font-montserrat text-white font-medium text-[14px] flex items-center justify-center px-[12px] rounded-[8px] bg-[#06A9EF] w-[80px] h-[42px]"
            onClick={() => {
              setLoading(true);
              showCroppedImage();
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
