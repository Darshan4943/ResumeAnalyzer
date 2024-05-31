import React from "react";

const FileError = ({ setError }) => {
  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
        <div className="absolute ms:w-[362px] w-[90%] ">
          <div className="rounded-[16px] w-[280px] scr420:w-[362px] p-[16px] flex flex-col gap-[26px] bg-[#ffffff]">
            <div className="flex gap-[8px] justify-center items-center">
              <svg
                width="28"
                height="34"
                viewBox="0 0 28 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6116 15.333H15.3891V6.99968H12.6116V15.333ZM14.0003 21.4443C14.38 21.4443 14.7064 21.3076 14.9795 21.0343C15.2525 20.7612 15.3891 20.4348 15.3891 20.0551C15.3891 19.6756 15.2525 19.3493 14.9795 19.0759C14.7064 18.8029 14.38 18.6663 14.0003 18.6663C13.6206 18.6663 13.2942 18.8029 13.0212 19.0759C12.7481 19.3493 12.6116 19.6756 12.6116 20.0551C12.6116 20.4348 12.7481 20.7612 13.0212 21.0343C13.2942 21.3076 13.6206 21.4443 14.0003 21.4443ZM14.0003 29.9997C17.5928 26.7219 20.2502 23.7473 21.9724 21.0759C23.6946 18.4048 24.5557 16.0461 24.5557 13.9997C24.5557 10.8052 23.5349 8.19176 21.4932 6.15926C19.4516 4.12704 16.9539 3.11092 14.0003 3.11092C11.0467 3.11092 8.54908 4.12704 6.50741 6.15926C4.46574 8.19176 3.44491 10.8052 3.44491 13.9997C3.44491 16.0461 4.31991 18.4048 6.06991 21.0759C7.81991 23.7473 10.4634 26.7219 14.0003 29.9997ZM14.0003 33.6663C9.5281 29.8608 6.18783 26.3261 3.97949 23.0622C1.77116 19.7983 0.666992 16.7775 0.666992 13.9997C0.666992 9.83301 2.00727 6.51356 4.68783 4.04134C7.36838 1.56912 10.4725 0.333008 14.0003 0.333008C17.5281 0.333008 20.6323 1.56912 23.3128 4.04134C25.9934 6.51356 27.3337 9.83301 27.3337 13.9997C27.3337 16.7775 26.2295 19.7983 24.0212 23.0622C21.8128 26.3261 18.4725 29.8608 14.0003 33.6663Z"
                  fill="#C00000"
                />
              </svg>
              <div className="font-[500] text-[20px] text-[#C00000]">
                Upload Failed
              </div>
            </div>
            <div className="flex flex-wrap w-full text-center justify-center items-center text-[#333333] font-[500] text-[14px]">
              Not able to read file, Please check the file content and try
              to upload again.
            </div>
            <div className="flex w-full justify-center items-center">
              <button
                onClick={() => setError(false)}
                className="rounded-[12px] pt-2 pr-6 pb-2 pl-6 bg-[#06A9EF] text-[#FFFFFF] font-[600] text-[16px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileError;
