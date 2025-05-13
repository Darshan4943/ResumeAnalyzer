import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import { telCode } from "../utils/data";
import { fromJSON } from "postcss";
import { useMediaQuery } from "@react-hook/media-query";

function ContactUs() {
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    mobileNo: "",
    subject: "",
    query: "",
    dial_code: "",
  });

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  function handleKeyPress(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.208:2000/api/contactUs/create",
        formData
      );
      // console.log("Response:", response.data);
      toast.success("Contacted Successfully");
      setFormData({
        firstName: "",
        email: "",
        mobileNo: "",
        subject: "",
        query: "",
        dial_code: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setFormData({ ...formData, dial_code: item.dial_code });
  };

  const customFilterOption = ({ label, value, data }, inputValue) => {
    const lowercasedInput = inputValue.toLowerCase();
    return (
      data.code.toLowerCase().includes(lowercasedInput) ||
      data.dial_code.includes(inputValue)
    );
  };

  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);

    const filteredCodes = telCode.filter(filterLogic);
    const firstSixCodes = filteredCodes.slice(0, 6);
    const remainingCodes = filteredCodes.slice(6);

    const sortedRemainingCodes = remainingCodes.sort((a, b) => {
      const numA = parseInt(a.dial_code.replace("+", ""), 10);
      const numB = parseInt(b.dial_code.replace("+", ""), 10);
      return numA - numB;
    });

    const combinedCodes = [...firstSixCodes, ...sortedRemainingCodes];
    setFilteredTelCode(combinedCodes);
  }, [telCode, searchTerm]);

  return (
    <div className="w-[100%]  flex items-center my-[50px] justify-center customMargins ">
      <div className="ml:w-[90%] rounded-[16px] w-[100%] ml:flex ml:flex-row items-center ml:items-end flex-col-reverse flex gap-4  ml:p-[24px] sm:p-[16px] p-[8px] h-max-content bg-cover bg-center bg-no-repeat bg_contactUs">
        <div className="ml:w-[50%] sm:w-[80%] w-[100%] h-full justify-end gap-2 flex flex-col ">
          <div className="flex items-center gap-2">
            <svg
              className="min-w-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g mask="url(#mask0_5716_135587)">
                <path
                  d="M10.0004 9.88747C10.4151 9.88747 10.7696 9.73983 11.0639 9.44455C11.3583 9.14927 11.5054 8.79431 11.5054 8.37965C11.5054 7.965 11.3578 7.61051 11.0625 7.31617C10.7672 7.02184 10.4123 6.87467 9.99761 6.87467C9.58296 6.87467 9.22846 7.02231 8.93413 7.31759C8.6398 7.61287 8.49263 7.96783 8.49263 8.38249C8.49263 8.79714 8.64027 9.15163 8.93555 9.44597C9.23082 9.7403 9.58579 9.88747 10.0004 9.88747ZM9.99903 16.2609C11.6294 14.8015 12.877 13.4017 13.7418 12.0614C14.6067 10.7211 15.0391 9.5472 15.0391 8.53972C15.0391 7.02049 14.5564 5.77156 13.5912 4.79293C12.6259 3.81429 11.4285 3.32497 9.99903 3.32497C8.56954 3.32497 7.37216 3.81429 6.40688 4.79293C5.4416 5.77156 4.95896 7.02049 4.95896 8.53972C4.95896 9.5472 5.39139 10.7211 6.25623 12.0614C7.1211 13.4017 8.36869 14.8015 9.99903 16.2609ZM9.99903 17.9243C7.90182 16.107 6.32917 14.4158 5.28109 12.8506C4.23302 11.2854 3.70898 9.84848 3.70898 8.53972C3.70898 6.61666 4.33105 5.05978 5.57517 3.86907C6.81928 2.67836 8.2939 2.08301 9.99903 2.08301C11.7042 2.08301 13.1788 2.67836 14.4229 3.86907C15.667 5.05978 16.2891 6.61666 16.2891 8.53972C16.2891 9.84848 15.765 11.2854 14.717 12.8506C13.6689 14.4158 12.0962 16.107 9.99903 17.9243Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
            <p className="text-[14px] text-[#fff] font-[400] leading-[16px]">
              London, United Kingdom | Pune, India | Harare, Zimbabwe
            </p>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g mask="url(#mask0_5716_135592)">
                <path
                  d="M3.5904 16.25C3.16946 16.25 2.81315 16.1041 2.52148 15.8125C2.22982 15.5208 2.08398 15.1645 2.08398 14.7435V5.25642C2.08398 4.83547 2.22982 4.47917 2.52148 4.1875C2.81315 3.89583 3.16946 3.75 3.5904 3.75H16.4109C16.8318 3.75 17.1881 3.89583 17.4798 4.1875C17.7714 4.47917 17.9173 4.83547 17.9173 5.25642V14.7435C17.9173 15.1645 17.7714 15.5208 17.4798 15.8125C17.1881 16.1041 16.8318 16.25 16.4109 16.25H3.5904ZM10.0006 10.4647L3.33396 6.20187V14.7435C3.33396 14.8183 3.35801 14.8798 3.40609 14.9279C3.45417 14.9759 3.51561 15 3.5904 15H16.4109C16.4857 15 16.5471 14.9759 16.5952 14.9279C16.6433 14.8798 16.6673 14.8183 16.6673 14.7435V6.20187L10.0006 10.4647ZM10.0006 9.16665L16.5391 4.99998H3.46217L10.0006 9.16665ZM3.33396 6.20187V4.99998V14.7435C3.33396 14.8183 3.35801 14.8798 3.40609 14.9279C3.45417 14.9759 3.51561 15 3.5904 15H3.33396V6.20187Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
            <p className="text-[14px] text-[#fff] font-[400] leading-[16px]">
              <a href="mailto:support@skilotech.com">support@skilotech.com</a>
            </p>
          </div>
        </div>

        <div className="ml:w-[50%] sm:w-[80%] w-[100%]">
          <form
            onSubmit={handleSubmit}
            className="w-[100%] items-start flex flex-col p-[8px] sm:p-[16px] gap-[16px] rounded-[16px] bg-opacity-75 bg-white shadow-md"
          >
            <div className="flex flex-col">
              <p className="text-[20px] font-[500] leading-normal text-[#333]">
                Got any Questions?
              </p>
              <p className="text-[12px] font-[400] leading-normal text-[#333]">
                Our executive will get in touch with you soon
              </p>
            </div>

            <input
              id="first_name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-2 text-[14px] font-[400] leading-[17.07px] font-Montserrat"
              required
            />
            <input
              id="first_name"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full px-2 text-[14px] font-[400] leading-[17.07px] font-Montserrat"
              required
            />
            {/* <div id="first_name"> */}
            <div
              className={`w-full flex gap-2 rounded-[8px] text-[14px] font-[400] leading-[17.07px] font-Montserrat bg-[#FFFFFF] py-1 border border-[#9d9d9d]`}
            >
              <ReactSelect
                options={filteredTelCode}
                className={`flex items-center rounded-[8px] outline-none border-none cursor-pointer w-[100%] min-w-[130px]`}
                name=""
                placeholder="Select"
                value={selectedItem}
                onChange={handleItemClick}
                getOptionLabel={(option) => (
                  <div className="flex items-center cursor-pointer text-[14px] font-[400] leading-[17.07px] font-Montserrat min-w-[90px] ">
                    <img
                      src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                      width="20px"
                    />
                    <span className="ml-2 text-[#333333] cursor-pointer text-[12px] sm:text-[14px]  font-[400] leading-[17.07px] font-Montserrat ">
                      {option.code} {option.dial_code}
                    </span>
                  </div>
                )}
                filterOption={customFilterOption}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    minWidth: "130px",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: "neutral0",
                  },
                })}
              />

              <input
                // id="first_name"
                type="text"
                name="mobileNo"
                className="w-full text-[12px] sm:text-[14px] font-[400] leading-[17.07px] font-Montserrat"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder={`${isViewportBelow850
                  ? "Enter Number "
                  : "Enter Contact Number "
                  }`}
                required
                maxLength={10}
                minLength={10}
                onKeyPress={handleKeyPress}
              />
            </div>
            {/* </div> */}

            <input
              required
              id="first_name"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-2 text-[14px] font-[400] leading-[17.07px] font-Montserrat"
            />

            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              className="w-[100%] border border-[#9d9d9d] placeholder-xl px-[16px] py-[12px] rounded-[8px] text-[14px] outline-none font-[400] leading-[17.07px] font-Montserrat text-[#333] h-[94px]"
              placeholder="Write your query here"
              required
            ></textarea>
            <div className="w-[100%] flex justify-center">
              <button
                type="submit"
                className="buttons hover:bg-[#333] bg_Button bg-[#06A9EF] text-[#fff] font-[600] text-[14px]  leading-[17.07px] font-Montserrat rounded-lg"
                id="border_button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
