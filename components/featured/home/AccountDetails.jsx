import React, { useEffect, useRef, useState } from "react";
import { telCode } from "../../../utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

function AccountDetails({ selectedPlan, recruiterid,role }) {
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
  const [error, setError] = useState();
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    dial_code: "",
    checked: false,
  });
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  useEffect(() => {
    const filteredCodes = telCode;
    setFilteredTelCode(filteredCodes);
  }, [telCode]);
  const [selectedItem, setSelectedItem] = useState();

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
      case "dial_code":
        if (!value.trim()) {
          errors.mobileNo = "dial_code is required";
        }  else {
          delete errors.dial_code;
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
      if (recruiterid) {
        axios
          .get(
            "https://freedygoservices.in/api/skiloteckuser/user/" + recruiterid
          )
          .then((res) => {
            const decode = jwtDecode(res.data.data);
            setData({
              email: decode._doc.email,
              firstName: decode._doc.firstName ? decode._doc.firstName : "",
              lastName: decode._doc.lastName ? decode._doc.lastName : "",
              mobileNo: decode._doc.mobileNo ? decode._doc.mobileNo : "",
              dial_code: decode._doc.dial_code ? decode._doc.dial_codel : "",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
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
    }
  }, []);

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  const purchaseHandler = async (e) => {
    e.preventDefault();
    if (!data.checked) {
      setError("Please agree to the terms and conditions.");
    } else {
      setLoading(true);
      axios
        .post("https://freedygoservices.in/api/add/subscription", {
          userId:
            userDataGlobal.role == "admin" ? recruiterid : userDataGlobal._id,
          plan: selectedPlan.duration + " " + selectedPlan.limit,
          ...data,
          mobileNo: data.mobileNo,
          index: selectedPlan.index,
          isAdmin: userDataGlobal.role == "admin",
          role:userDataGlobal?.role
        })
        .then((res) => {
          setLoading(false);
          setPopUp(true);
          // setSuccessModel(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // if (data.checked) {
    //   const errors = validateInput();
    //   const requiredFields = ["firstName", "lastName", "email", "mobileNo"];
    //   const emptyFields = requiredFields.filter((field) => !data[field]);
    //   if (emptyFields.length > 0) {
    //     toast.error("Please fill in all required fields");
    //     return;
    //   }
    //   const hasErrors = Object.keys(errors).length > 0;
    //   if (hasErrors) {
    //     toast.error("Please enter valid information");
    //     setFormError(errors);
    //   } else {
    //     try {
    //       setLoading(true);
    //       const {
    //         data: { key },
    //       } = await axios.get(`https://freedygoservices.in/api/getkey`);
    //       const { data: order } = await axios.post(
    //         `https://freedygoservices.in/api/checkout/`,
    //         {
    //           amount: parseInt(selectedPlan.amount),
    //         }
    //       );
    //       const ex = order;
    //       const options = {
    //         key,
    //         amount: order.order.amount,
    //         currency: "USD",
    //         description: selectedPlan.duration + " " + selectedPlan.limit,
    //         image:
    //           "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Frame+427322205.png",
    //         name: "Skilotech",
    //         order_id: order.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         modal: {
    //           ondismiss: function () {
    //             setLoading(false);
    //           },
    //         },
    //         handler: function (response) {
    //           axios
    //             .post("https://freedygoservices.in/api/add/subscription", {
    //               ...response,
    //               userId: userDataGlobal._id,
    //               plan: selectedPlan.duration + " " + selectedPlan.limit,
    //               startDate: new Date(),
    //               endDate: getDateAfterDays(selectedPlan.days),
    //               paidAt: new Date(),
    //               ...data,
    //               mobileNo: data.mobileNo,
    //               index: selectedPlan.index,
    //             })
    //             .then((res) => {
    //               setLoading(false);
    //               setSuccessModel(true);
    //             })
    //             .catch((err) => {
    //               console.log(err);
    //             });
    //         },
    //         theme: {
    //           color: "#06A9EF",
    //         },
    //       };
    //       const razor = new window.Razorpay(options);
    //       razor.open();
    //     } catch (e) {
    //       console.log("error", e);
    //       setLoading(false);
    //       toast.error("Payment Failed");
    //     }
    //   }
    // } else {
    //   toast.error("Please accept the terms and conditions");
    // }
  };

  return (
    <div className={" w-[60%] plan-container  "}>
      {popUp && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-[40%] left-0 right-0  flex items-center justify-center  ">
            <div className=" absolute rounded-[16px] bg-white shadow-lg  p-6 flex flex-col gap-4 w-[22%] sm:min-w-[366px]  min-w-[260px] justify-center  items-center ">
              {userDataGlobal.role == "admin" ? (
                <div className="flex items-center justify-center h-[80px] w-[80px] bg-[#0C8A0A] rounded-[50%]">
                  <svg
                    width="45"
                    height="35"
                    viewBox="0 0 45 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 34.1878L0.65625 19.8441L4.59375 15.9066L15 26.3128L40.4062 0.90657L44.3438 4.84407L15 34.1878Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ) : (
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_1009_24285)">
                    <path
                      d="M36.667 70V65H65.0003V39.6667C65.0003 32.7952 62.5747 26.9662 57.7236 22.1797C52.8724 17.3932 46.9646 15 40.0003 15C33.036 15 27.1283 17.3932 22.2771 22.1797C17.4259 26.9662 15.0003 32.7952 15.0003 39.6667V60H13.3337C11.5003 60 9.93088 59.3472 8.62533 58.0417C7.31977 56.7361 6.66699 55.1667 6.66699 53.3333V46.6667C6.66699 45.5 6.95866 44.4028 7.54199 43.375C8.12533 42.3472 8.94477 41.5278 10.0003 40.9167L10.2503 36.5C10.6948 32.7222 11.792 29.2222 13.542 26C15.292 22.7778 17.4864 19.9722 20.1253 17.5833C22.7642 15.1944 25.792 13.3333 29.2087 12C32.6253 10.6667 36.2225 10 40.0003 10C43.7781 10 47.3614 10.6667 50.7503 12C54.1392 13.3333 57.167 15.1806 59.8337 17.5417C62.5003 19.9028 64.6948 22.6944 66.417 25.9167C68.1392 29.1389 69.2503 32.6389 69.7503 36.4167L70.0003 40.75C71.0559 41.25 71.8753 42 72.4587 43C73.042 44 73.3337 45.0556 73.3337 46.1667V53.8333C73.3337 54.9444 73.042 56 72.4587 57C71.8753 58 71.0559 58.75 70.0003 59.25V65C70.0003 66.375 69.5107 67.5521 68.5316 68.5312C67.5524 69.5104 66.3753 70 65.0003 70H36.667ZM29.9857 45.8333C29.2732 45.8333 28.6809 45.5924 28.2087 45.1104C27.7364 44.6284 27.5003 44.0312 27.5003 43.3188C27.5003 42.6063 27.7413 42.0139 28.2232 41.5417C28.7052 41.0694 29.3025 40.8333 30.0149 40.8333C30.7274 40.8333 31.3198 41.0743 31.792 41.5562C32.2642 42.0382 32.5003 42.6355 32.5003 43.3479C32.5003 44.0604 32.2594 44.6528 31.7774 45.125C31.2954 45.5972 30.6982 45.8333 29.9857 45.8333ZM49.9857 45.8333C49.2732 45.8333 48.6809 45.5924 48.2087 45.1104C47.7364 44.6284 47.5003 44.0312 47.5003 43.3188C47.5003 42.6063 47.7413 42.0139 48.2232 41.5417C48.7052 41.0694 49.3025 40.8333 50.0149 40.8333C50.7274 40.8333 51.3198 41.0743 51.792 41.5562C52.2642 42.0382 52.5003 42.6355 52.5003 43.3479C52.5003 44.0604 52.2594 44.6528 51.7774 45.125C51.2954 45.5972 50.6982 45.8333 49.9857 45.8333ZM20.0837 41.5C19.6948 35.6111 21.4725 30.5556 25.417 26.3333C29.3614 22.1111 34.2781 20 40.167 20C45.0003 20 49.1948 21.5972 52.7503 24.7917C56.3059 27.9861 58.4726 31.9722 59.2503 36.75C54.3059 36.6944 49.792 35.3056 45.7087 32.5833C41.6253 29.8611 38.4647 26.2778 36.2269 21.8333C35.3536 26.2778 33.4864 30.2361 30.6253 33.7083C27.7642 37.1806 24.2503 39.7778 20.0837 41.5Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>
              )}

              <div className="flex flex-col gap-2 text-center">
                <text className="text-[24px] font-medium">
                  {userDataGlobal.role == "admin"
                    ? "Plan Activated Successfully"
                    : "Our Team Will Reach Out To You Shortly"}
                </text>

              </div>
              <button
                onClick={() =>
                  router.push(
                    userDataGlobal.role == "admin"
                      ? role=='user'?"/dashboard/Candidates":"/dashboard/Recruiters"
                      : "/purchase/MyPurchase"
                  )
                }
                className="px-9 py-3 bg-blue text-white rounded-[8px] w-[117px] text-[16px] font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
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
          <div className="text-[18px] font-[600] ">Account Details</div>
          <div className="flex flex-col gap-6 w-[100%] text-[14px]">
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
                className={`flex w-[100%]  items-start ${
                  isViewportBelow850 ? "gap-[4px] " : "gap-[16px] "
                }`}
                id="single_input"
                style={{
                  padding: "0px 8px",
                }}
              >
                <div
                  className={`relative  min-w-[120px] ${
                    isViewportBelow850 ? "w-[65%] " : "w-[18%] "
                  } items-center`}
                >
                  <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                    <ReactSelect
                      options={filteredTelCode}
                      className="w-[100%] flex min-w-[150px]  items-center py-1  rounded-[8px]"
                      name=""
                      placeholder="Select"
                      style={{ outline: "unset" }}
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
                  className="w-full mobileNo h-full pl-[20px] "
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
          <div className="text-[16px] font-[600] ">Payment Summary</div>
          <div className="p-4 border border-[#06A9EF] rounded-[12px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-[14px] font-semibold">
                  {selectedPlan?.duration} {selectedPlan?.limit}
                </p>
                <p className="text-[14px] font-semibold">
                  {selectedPlan?.price}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[14px] font-medium">Estimated tax (18%)</p>
                <p className="text-[14px] font-medium">$ 0</p>
              </div>
              <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
              <div className="flex justify-between">
                <p className="text-[16px] font-semibold">Total</p>
                <p className="text-[16px] font-semibold">
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
              setError(false);
              setData({ ...data, checked: !data.checked });
            }}
          />

          <div className="text-[14px] font-normal">
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
        {error && (
          <div className="text-[16px] font-semibold text-red">{error}</div>
        )}
        <div className=" w-full font-[500] flex flex-row gap-[16px] justify-between ">
          <button
            className="buttons"
            id="border_button"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            className="buttons font-[500] bg-[#06A9EF] text-white sm:min-w-[190px]"
            id="border_button"
            onClick={purchaseHandler}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4  text-white animate-spin"
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
    </div>
  );
}

export default AccountDetails;
