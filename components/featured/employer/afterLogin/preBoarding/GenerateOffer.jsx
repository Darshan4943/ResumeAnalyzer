import axios from "axios";
import React, { useEffect, useState } from "react";
import MiniLoader from "../../../../common/mini-loader";

const GenerateOffer = ({
  setGenerateOffer,
  setPopup,
  offerData,
  fetchJobs,
}) => {
  const [data, setData] = useState({
    subject: "",
    to: "",
    cc: "",
    body: "",
    selectedFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [errors, setErrors] = useState(false);
  const validate = () => {
    let tempErrors = {};
    if (!data.selectedFile) tempErrors.selectedFile = "File is required";
    if (!data.subject.trim()) tempErrors.subject = "Subject is required";
    if (!data.body.trim()) tempErrors.body = "Body is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    if (offerData) {
      setData((prev) => ({
        ...prev,
        subject: `Skilotech-Offer Letter for ${offerData.firstName} ${offerData.lastName}`,
        to: offerData.email,
      }));
    }
  }, [offerData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validExtensions = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 2 * 1024 * 1024;

    if (!validExtensions.includes(file.type)) {
      alert("Only PDF and Word files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be under 2MB.");
      return;
    }
    setErrors((prevErrors) => ({ ...prevErrors, selectedFile: false }));
    setData((prevData) => ({ ...prevData, selectedFile: file }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validate()) return;
      setLoading(true);
      const formdata = new FormData();
      formdata.append("subject", data.subject);
      formdata.append("to", data.to);
      formdata.append("cc", data.cc);
      formdata.append("body", data.body);

      if (data.selectedFile) {
        formdata.append("file", data.selectedFile);
      }
      const response = await axios.post(
        `http://192.168.1.161:2000/api/preboarding/genretoffer/${offerData.jobId}/${offerData.applicantId}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccessfull(true);
      fetchJobs();
      setLoading(false);
    } catch (error) {
      console.error(
        "Error sending offer:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[2000] bg-black opacity-50"></div>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center customMargins">
        <div className="absolute w-[95%] sm:w-[90%]">
          <div className="flex flex-col items-center w-full h-[80vh] p-6 gap-6 rounded-xl overflow-y-auto bg-white shadow-2xl">
            <div className="flex justify-between w-full">
              <p className="text-2xl font-semibold text-[#333]">
                Generate Offer
              </p>
              <svg
                onClick={() => setGenerateOffer(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                <path
                  d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
                  fill="#333"
                />
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="73"
                height="66"
                viewBox="0 0 73 66"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 1V43.6673L54.6482 65.7019L55.4988 64.3321L54.6482 22.922L19.2601 1.02534L18 1Z"
                  fill="#449B82"
                />
              </svg>
              <label className="flex items-center gap-2 px-4 py-2 text-[#333] border border-[#06A9EF] rounded-lg cursor-pointer hover:bg-blue-100 transition">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.45768 12.823V5.48968L7.38237 7.56499L6.60835 6.80702L9.99933 3.41602L13.3903 6.80702L12.6163 7.56499L10.541 5.48968V12.823H9.45768ZM5.74985 15.5826C5.37452 15.5826 5.05838 15.4531 4.80143 15.1941C4.54449 14.9351 4.41602 14.618 4.41602 14.2429V12.9833H5.49933V14.2429C5.49933 14.307 5.52604 14.3658 5.57945 14.4192C5.63288 14.4726 5.69165 14.4993 5.75577 14.4993H14.2429C14.307 14.4993 14.3658 14.4726 14.4192 14.4192C14.4726 14.3658 14.4993 14.307 14.4993 14.2429V12.9833H15.5826V14.2429C15.5826 14.618 15.453 14.9351 15.1938 15.1941C14.9347 15.4531 14.6174 15.5826 14.2421 15.5826H5.74985Z"
                    fill="#333"
                  />
                </svg>
                Upload File
              </label>


              {data.selectedFile && (
                <div className="relative w-48 h-12 flex items-center justify-between bg-gray-100 rounded-lg shadow-md border border-gray-300 px-3">
                  <span className="text-sm text-black truncate">
                    {data.selectedFile.name}
                  </span>
                  <button
                    onClick={() =>
                      setData((prevData) => ({
                        ...prevData,
                        selectedFile: null,
                      }))
                    }
                    className="ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-red-500 hover:text-red-700 transition"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {["Subject", "To", "CC", "Body"].map((label, index) => (
              <div key={index} className="flex flex-col gap-2 w-full">
                <p className="text-lg font-medium text-[#333]">{label}</p>
                {label === "Body" ? (
                  <>
                    <textarea
                      className="w-full outline-none h-40 px-4 py-2 border border-gray rounded-lg "
                      name={label.toLowerCase()}
                      value={data[label.toLowerCase()]}
                      onChange={handleChange}
                    ></textarea>
                    {errors[label.toLowerCase()] && (
                      <span style={{ color: "red" }}>
                        {errors[label.toLowerCase()]}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400"
                      name={label.toLowerCase()}
                      value={data[label.toLowerCase()]}
                      onChange={handleChange}
                      disabled={label === "To"}
                    />
                    {errors[label.toLowerCase()] && (
                      <span style={{ color: "red" }}>
                        {errors[label.toLowerCase()]}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="w-full flex justify-end">
              {errors.selectedFile && (
                <span style={{ color: "red" }}>{errors.selectedFile}</span>
              )}
            </div>


            <div className="flex justify-end gap-4 w-full">
              <button
                onClick={() => setGenerateOffer(false)}
                className="px-6 py-2 text-gray-700 border border-[#06A9EF] rounded-[30px] bg-white font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              {loading ?
                <div className="w-[171.33px] flex justify-center items-center px-6 py-2 text-white border border-[#06A9EF] rounded-[30px] bg-[#06A9EF] font-semibold hover:bg-blue-700 transition">

                  <MiniLoader />
                </div>
                :

                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className="px-6 py-2 text-white border border-[#06A9EF] rounded-[30px] bg-[#06A9EF] font-semibold hover:bg-blue-700 transition"
                >
                  Generate Offer
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      {successfull && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div
              className="w-[330px] relative rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white"
              style={{
                boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <svg
                className="absolute top-[-30px]  left-[38%] right-[62%] flex"
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
                fill="none"
              >
                <g clip-path="url(#clip0_6622_116765)">
                  <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                  <g mask="url(#mask0_6622_116765)">
                    <path
                      d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_6622_116765">
                    <rect width="85" height="85" rx="42.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="text-center">
                <div className="text-[24px] font-[500] text-[#333]">
                  Offer Generated Successfully
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setGenerateOffer(false), setSuccessfull(false);
                  }}
                  className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GenerateOffer;
