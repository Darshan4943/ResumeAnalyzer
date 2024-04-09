import React, { useRef, useState } from "react";
import ImageCropper from "../../../components/featured/candidate/createResume/components/imageCropper";
import ImageContainer from "../../../components/common/image";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { PlusAddLogo, SparklingStarts } from "../../../utils/svg";
import Tiptap from "../../../components/editor/Tiptap";
import axios from "axios";
import MiniLoader from "../../../components/common/mini-loader";
const Leftform = ({
  file,
  setFile,
  data,
  setData,
  croppedImage,
  setCroppedImage,
}) => {
  const fileRef = useRef();
  const [loactionText, setLoactionText] = useState("");
  const [modelView, setModelView] = useState(false);
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
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const [loading, setLoading] = useState(false);

  const generateText = () => {
    const prompt = `Original Paragraph:\n${data.description}\n\nNew Paragraph:\n`;
    if (data.description.length > 100) {
      setLoading(true);
      axios
        .post("https://freedygoservices.in/api/text/regenrate", { prompt })
        .then((res) => {
          setLoading(false);
          setData({
            ...data,
            description: res.data.data.choices[0].message.content,
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setError("Minimum 100 characters required");
    }
  };
  return (
    <div className="flex flex-col md:w-[40%] w-full gap-[24px]">
      {modelView && (
        <ImageCropper
          setModelView={setModelView}
          file={file}
          setCroppedImage={setCroppedImage}
        />
      )}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <span className="text-[14px] text-[#333333] font-medium">
            Company Logo
          </span>
          <span className="text-[14px] text-[#7C8493] font-medium">
            This image will be shown publicly as company logo.
          </span>
        </div>
        {croppedImage ? (
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-row gap-[16px] items-center justify-between w-[100%]  ">
              <div className="flex flex-col gap-[4px] items-center justify-center w-[30%]  ">
                {croppedImage?.url && (
                  <ImageContainer
                    src={croppedImage.url}
                    alt="Selected File"
                    className="w-[112px] h-[112px] rounded-[50%] object-cover"
                  />
                )}
                <button
                  className="text-[14px] text-red font-medium"
                  onClick={() => {
                    setCroppedImage(null);
                    setFile(null);
                  }}
                >
                  Remove
                </button>
              </div>
              <div
                ref={fileRef}
                onDrop={handleFileChange}
                className="border-dashed border-[3px] bg-[#EFFAFF] border-[#06A9EF] flex flex-row w-[60%] justify-center rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
              >
                <input
                  type="file"
                  name="myfile"
                  onChange={handleFileChange}
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                />

                <div className="  flex  flex-col  items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    onClick={handleButtonClick}
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
                  <div className="flex flex-col gap-[4px]	font-medium	">
                    <div className="flex text-center justify-center  scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                      <span
                        onClick={handleButtonClick}
                        className="text-[#06A9EF]"
                      >
                        &nbsp;Browse file{" "}
                      </span>
                      &nbsp;to upload Image
                    </div>
                    <p className="text-center text-[12px] font-medium text-[#7C8493]"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              ref={fileRef}
              onDrop={handleFileChange}
              className="border-dashed border-[3px] bg-[#EFFAFF] border-[#06A9EF] flex flex-row w-full justify-center rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
            >
              <input
                type="file"
                name="myfile"
                onChange={handleFileChange}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />

              <div className="  flex  flex-col  items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  onClick={handleButtonClick}
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
                <div className="flex flex-col gap-[4px]	font-medium	">
                  <div className="flex text-center justify-center  scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                    <span
                      onClick={handleButtonClick}
                      className="text-[#06A9EF]"
                    >
                      &nbsp;Browse file{" "}
                    </span>
                    &nbsp;to upload Image
                  </div>
                  <p className="text-center text-[12px] font-medium text-[#7C8493]"></p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter Company name"
            className="input"
            value={data?.companyName}
            onChange={(e) => {
              setData({ ...data, companyName: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Location
          </label>
          <div className="w-full relative ">
            <input
              type="text"
              placeholder="Location"
              className="input"
              value={loactionText}
              onChange={(e) => setLoactionText(e.target.value)}
            />
            <button
              className=" absolute right-3 top-[12px] "
              disabled={loactionText?.length == 0}
              onClick={() => {
                setData({
                  ...data,
                  location: [...data.location, loactionText],
                });
                setLoactionText("");
              }}
            >
              <PlusAddLogo
                color={loactionText?.length > 0 ? "#646464" : "#bebebe"}
              />
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {data?.location?.map((item, index) => (
              <div
                key={index}
                className="py-[4px] px-[8px] bg-[#effaff] rounded-[8px] flex flex-row gap-3 items-center "
              >
                <span> {item}</span>
                <span
                  className="text-[14px]  cursor-pointer font-medium "
                  onClick={() =>
                    setData({
                      ...data,
                      location: data.location.filter((data) => data != item),
                    })
                  }
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Job Description
          </label>

          {data && (
            <Tiptap
              data={data}
              value={"description"}
              setData={setData}
              placeholder={"Enter Job Description here"}
            />
          )}
          <div className="w-full flex  justify-end mt-3 ">
            {" "}
            {/* <button
              className=" flex gap-1 items-center font-montserrat text-xs font-semibold btn_outline"
              onClick={generateText}
            >
              {loading ? (
                <MiniLoader />
              ) : (
                <>
                  <SparklingStarts />
                  Generate with AI
                </>
              )}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftform;
