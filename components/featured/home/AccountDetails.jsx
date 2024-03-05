import React, { useEffect, useRef, useState } from "react";
import { telCode } from "../../../utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { useRouter } from "next/router";

function AccountDetails({ selectedPlan }) {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
  function getDateAfterDays(days) {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    return futureDate;
  }
  const [successModel, setSuccessModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    dial_code: "+260",
    checked: false,
  });
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  useEffect(() => {
    const filteredCodes = telCode;
    setFilteredTelCode(filteredCodes);
  }, [telCode]);
  const [selectedItem, setSelectedItem] = useState(telCode[telCode.length - 2]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code });
  };

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

  useEffect(() => {
    if (userDataGlobal.email) {
      setData({
        email: userDataGlobal.email,
        firstName: userDataGlobal.firstName ? userDataGlobal.firstName : "",
        lastName: userDataGlobal.lastName ? userDataGlobal.lastName : "",
        mobileNo: userDataGlobal.mobileNo ? userDataGlobal.mobileNo : "",
        dial_code: userDataGlobal.dial_code ? userDataGlobal.dial_codel : "",
      });
      setSelectedItem(
        telCode.find((item) => item.dial_code === userDataGlobal.dial_code)
      );
    }
  }, []);

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  const purchaseHandler = async (e) => {
    e.preventDefault();
    if (data.checked) {
      const errors = validateInput();
      const requiredFields = ["firstName", "lastName", "email", "mobileNo"];
      const emptyFields = requiredFields.filter((field) => !data[field]);
      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields");
        return;
      }
      const hasErrors = Object.keys(errors).length > 0;
      if (hasErrors) {
        toast.error("Please enter valid information");
        setFormError(errors);
      } else {
        try {
          setLoading(true);
          const {
            data: { key },
          } = await axios.get(`https://freedygoservices.in/api/getkey`);
          const { data: order } = await axios.post(
            `https://freedygoservices.in/api/checkout/`,
            {
              amount: parseInt(selectedPlan.amount),
            }
          );
          const ex = order;
          const options = {
            key,
            amount: order.order.amount,
            currency: "USD",
            description: "Test Transaction",
            image:
              "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Frame+427322205.png",
            name: "Skiloteck",
            order_id: order.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            modal: {
              ondismiss: function () {
                setLoading(false);
              },
            },
            handler: function (response) {
              axios
                .post("https://freedygoservices.in/api/add/subscription", {
                  ...response,
                  userId: userDataGlobal._id,
                  plan: selectedPlan.duration + " " + selectedPlan.limit,
                  startDate: new Date(),
                  endDate: getDateAfterDays(selectedPlan.days),
                  paidAt: new Date(),
                  ...data,
                  mobileNo: data.mobileNo,
                  index: selectedPlan.index,
                })
                .then((res) => {
                  setLoading(false);
                  setSuccessModel(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            theme: {
              color: "#06A9EF",
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
        } catch (e) {
          console.log("error", e);
          setLoading(false);
          toast.error("Payment Failed");
        }
      }
    } else {
      toast.error("Please accept the terms and conditions");
    }
  };

  return (
    <div className={" scr700:w-[60%] w-[100%]"}>
      {successModel && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-[40%] left-0 right-0  flex items-center justify-center  ">
            <div className=" absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 w-[25%] ">
              <svg
                className="absolute top-[-40px]  left-[38%] right-[62%] flex"
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
                  Payment Successful! you have purchased the plan.
                </div>
                <div className="text-[16px] font-[500] text-[#333]">
                  Check your email for confirmation
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    router.push("/purchase/MyPurchase");
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
                  className={`relative  min-w-[160px] ${
                    isViewportBelow850 ? "w-[65%] " : "w-[24%] "
                  } items-center`}
                >
                  <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                    <ReactSelect
                      options={filteredTelCode}
                      className="w-[100%] flex min-w-[150px]  items-center py-1  rounded-[8px]"
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
            checked={data.checked}
            className="w-4 h-4 rounded-md border border-[#06A9EF] bg-white custom-checkbox"
            onClick={() => {
              setData({ ...data, checked: !data.checked });
            }}
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
          disabled={loading}
        >
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            " Purchase Plan"
          )}
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
