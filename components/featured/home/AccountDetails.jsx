import React, { useEffect, useRef, useState } from "react";
import { telCode } from "../../../utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";

function AccountDetails({ selectedPlan }) {
  const userDataGlobal = useSelector((state) => state.userData);
  function getDateAfterDays(days) {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    return futureDate;
  }
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    code: "",
  });
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);

    const filteredCodes = telCode.filter(filterLogic);
    setFilteredTelCode(filteredCodes);
  }, [telCode, searchTerm]);
  const [selectedItem, setSelectedItem] = useState(telCode[telCode.length - 2]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code });
  };

  // Example usage:
  // 30 days after current date

  const [formError, setFormError] = useState({});
  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          errors.firstName = "First Name is required";
        } else if (!isNaN(value)) {
          errors.firstName = "First Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.firstName = "First Name cannot contain numbers";
        } else {
          delete errors.firstName;
        }
        break;
      case "lastName":
        if (!value.trim()) {
          errors.lastName = "Last Name is required";
        } else if (!isNaN(value)) {
          errors.lastName = "Last Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.lastName = "Last Name cannot contain numbers";
        } else {
          delete errors.lastName;
        }
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Invalid email format";
        } else {
          delete errors.email;
        }
        break;

      case "mobileNo":
        if (!value.trim()) {
          errors.mobileNo = "Mobile Number is required";
        } else if (isNaN(value)) {
          errors.mobileNo = "Mobile Number cannot be text";
        } else {
          delete errors.mobileNo;
        }
        break;

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };
  const handleInputChange = (fieldName, value) => {
    if (fieldName == "mobileNo") {
      if (value.replace(/\D/g, "").length <= 10) {
        setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
      }
    } else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (userDataGlobal.email) {
      setData({
        email: userDataGlobal.email,
      });
    }
  }, []);

  const handleInputClick = () => {
    setDropdown(true);
    setSearchTerm("");
    setShowInput(true);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  const purchaseHandler = async (e) => {
    e.preventDefault();
    const errors = validateInput();
    const requiredFields = ["firstName", "lastName", "email", "mobileNo"];
    const emptyFields = requiredFields.filter((field) => !data[field]);
    // if (emptyFields.length > 0) {
    //   toast.error("Please fill in all required fields");
    //   return;
    // }
    const hasErrors = Object.keys(errors).length > 0;
    // if (hasErrors) {
    //   toast.error("Please enter valid information");
    //   setFormError(errors);
    // } else {
    // try {
    //   const {
    //     data: { key },
    //   } = await axios.get(`http://localhost:2000/api/getkey`);
    //   const { data: order } = await axios.post(
    //     `http://localhost:2000/api/checkout/`,
    //     {
    //       amount: parseInt(selectedPlan.amount),
    //     }
    //   );
    //   const ex = order;
    //   const options = {
    //     key,
    //     amount: order.order.amount,
    //     currency: "USD",
    //     description: "Test Transaction",
    //     image:
    //       "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Frame+427322205.png",
    //     name: "Skiloteck",
    //     order_id: order.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //     handler: function (response) {
    //       axios
    //         .post("http://localhost:2000/api/add/subscription", {
    //           ...response,
    //           userId: userDataGlobal._id,
    //           plan: selectedPlan.duration + " " + selectedPlan.limit,
    //           startDate: new Date(),
    //           endDate: getDateAfterDays(selectedPlan.days),
    //           paidAt: new Date(),
    //           ...data,
    //           mobileNo: data.code + data.mobileNo,
    //           index:selectedPlan.index
    //         })
    //         .then((res) => {
    //           console.log(res.data);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     },
    //     theme: {
    //       color: "#06A9EF",
    //     },
    //   };
    //   const razor = new window.Razorpay(options);
    //   razor.open();
    // } catch (e) {
    //   console.log("error", e);
    // }
    axios
      .post("http://localhost:2000/api/add/subscription", {
        userId: userDataGlobal._id,
        plan: selectedPlan.duration + " " + selectedPlan.limit,
        startDate: new Date(),
        endDate: getDateAfterDays(selectedPlan.days),
        paidAt: new Date(),
        ...data,
        mobileNo: data.code + data.mobileNo,
        index: selectedPlan.index,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };
  console.log(data.mobileNo);

  return (
    <div className={" w-[60%] "}>
      <div className="flex flex-col gap-6 w-[100%]">
        <div className=" flex flex-col gap-4 justify-center w-[100%] ">
          <div className="text-[24px] font-[600] ">Account Details</div>
          <div className="flex flex-col gap-6 w-[100%]">
            <div className="flex gap-5 w-[100%] ">
              <div className=" w-[50%]">
                <p className="">
                  First name <span className="star">*</span>
                </p>
                <input
                  type="text"
                  name=""
                  id="single_input"
                  placeholder="Enter first name"
                  value={data.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                {formError && (
                  <p className="text-[12px] text-[red] font-[500]">
                    {formError.firstName}
                  </p>
                )}
              </div>

              <div className="w-[50%]">
                <p className=" ">
                  Last name <span className="star">*</span>
                </p>
                <input
                  type="text"
                  name=""
                  id="single_input"
                  placeholder="Enter Last name"
                  value={data.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
                {formError && (
                  <p className="text-[12px] text-[red] font-[500]">
                    {formError?.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <p className="">
                Email <span className="star">*</span>
              </p>
              <input
                type="email"
                name=""
                id="single_input"
                placeholder="Enter Email"
                value={data.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {formError && (
                <p className="text-[12px] text-[red] font-[500]">
                  {formError?.email}
                </p>
              )}
            </div>

            <div className="">
              <p className="">
                Contact Number <span className="star">*</span>
              </p>
              <div
                className={`flex w-[100%] items-start ${
                  isViewportBelow850 ? "gap-[4px] " : "gap-[16px] "
                }`}
                id="single_input"
              >
                <div
                  className={`relative pl-3 ${
                    isViewportBelow850 ? "w-[65%] " : "w-[30%] "
                  } items-center`}
                >
                  <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                    <ReactSelect
                      options={filteredTelCode}
                      className="w-[100%] flex  items-center py-1  rounded-[8px]"
                      name=""
                      placeholder="Search"
                      value={selectedItem}
                      onChange={handleItemClick}
                      getOptionLabel={(option) => (
                        <div className="flex items-center  ">
                          <img
                            src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                            width="20px"
                          />
                          <span className="ml-2">
                            {option.code} {option.dial_code}
                          </span>
                        </div>
                      )}
                      getOptionValue={(option) => option.code}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "none",

                          minWidth: "130px",
                        }),
                      }}
                    />
                  </div>
                </div>

                <input
                  placeholder={`${
                    isViewportBelow850
                      ? "Enter Number "
                      : "Enter Contact Number "
                  }`}
                  value={data.mobileNo}
                  onChange={(e) =>
                    handleInputChange("mobileNo", e.target.value)
                  }
                  className="w-full mobileNo "
                  type="text"
                  name=""
                  // id="single_input"
                />
              </div>

              {/* Display error message if any */}
              {formError && (
                <p className="text-[12px] text-[red] font-[500]">
                  {formError?.mobileNo}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className=" flex flex-col gap-2 justify-center ">
          <div className="text-[24px] font-[600] ">Payment Summary</div>
          <div className="p-4 border border-[#06A9EF] rounded-[12px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-[16px] font-semibold">
                  {selectedPlan?.duration} {selectedPlan?.limit}
                </p>
                <p className="text-[16px] font-semibold">
                  {selectedPlan?.price}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[16px] font-medium">Estimated tax (18%)</p>
                <p className="text-[16px] font-medium">$ 4</p>
              </div>
              <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
              <div className="flex justify-between">
                <p className="text-[20px] font-semibold">Total</p>
                <p className="text-[20px] font-semibold">
                  {" "}
                  {selectedPlan?.price}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-md border border-[#06A9EF] bg-white custom-checkbox"
          />

          <div className="text-[16px] font-normal">
            I agree to the{" "}
            <span className="text-[#06A9EF] border-b border-[#06A9EF] cursor-pointer">
              License Terms
            </span>{" "}
            and{" "}
            <span className="text-[#06A9EF] border-b border-[#06A9EF] cursor-pointer">
              User Agreement.
            </span>
          </div>
        </div>
        <button
          className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[16px] font-semibold"
          onClick={purchaseHandler}
        >
          Purchase Plan
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
