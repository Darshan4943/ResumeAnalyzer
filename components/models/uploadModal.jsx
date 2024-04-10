import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const UploadModal = ({ role, setUploadPopUp }) => {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (
        selectedFile?.type.includes("application/x-iwork-numbers-sffnumbers") ||
        selectedFile?.type.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Only Excel file are allowed");
      }
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {" "}
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
        <div className="p-[24px] flex flex-col gap-[36px] bg-white rounded-[16px] min-w-[500px]">
          <span className="text-[20px] text-[#333333] font-medium">
            Create Candidate In Bulk
          </span>
          <div className="flex sm:flex-row flex-col gap-4 items-center justify-center w-full">
            <div
              class="border-dashed border-[3px] border-[#06A9EF] flex flex-col rounded-[12px] p-4 items-center justify-center upload-btn-wrapper w-full min-h-[6rem]"
              onDragOver={handleDragOver}
              ref={fileRef}
              onDrop={handleFileChange}
            >
              <input type="file" name="myfile" onChange={handleFileChange} />
              {file ? (
                <div className="flex flex-row gap-4 w-full items-center h-full">
                  <div className="flex flex-row gap-2 items-center w-[60%]">
                    <img
                      src="/images/excel.png"
                      className="h-[38px] object-contain"
                      alt=""
                    />
                    <div className="text-[14px] w-[70%]">{file.name}</div>
                  </div>
                  <button
                    className=" rounded-[12px] py-[8px] px-[12px] font-[500] bg-[#06A9EF] text-white flex flex-row gap-2"
                    onClick={() => handleButtonClick()}
                  >
                    Browse File
                  </button>
                </div>
              ) : (
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
                    Allowed file formats: Excel
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between">
            <button
              className="py-[12px] px-[36px] rounded-[12px] font-[500] bg-white border border-[#06A9EF] text-[#333333] flex flex-row gap-2"
              onClick={() => setUploadPopUp(false)}
            >
              Cancle
            </button>
            <button
              className="py-[12px] px-[36px] rounded-[12px] font-[500] bg-[#06A9EF] border border-[#06A9EF] text-white flex flex-row gap-2"
              onClick={() => setUploadPopUp(false)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
