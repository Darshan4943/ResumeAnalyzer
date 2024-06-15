import React, { useEffect, useState } from "react";
import { data } from "../../../../common/Bars";

const EmployerDetails = ({ data, setData, errors, setError }) => {
  const [isShow, setIsShow] = useState(true);
  const [EmployerData, setEmployerData] = useState({
    employerName: "",
    employerOrganizationName: "",
    employerAddress: "",
    employerCityState: "",
    employerCountry: "",
  });
  const [touched, setTouched] = useState({
    employerName: false,
    employerOrganizationName: false,
    employerAddress: false,
    employerCityState: false,
    employerCountry: false,
  });
  const [formErrors, setFormErrors] = useState({
    employerName: false,
    employerOrganizationName: false,
    employerAddress: false,
    employerCityState: false,
    employerCountry: false,
  });

  useEffect(() => {
    setEmployerData({
      employerName: data?.employerName,
      employerOrganizationName: data?.employerOrganizationName,
      employerAddress: data?.employerAddress,
      employerCityState: data?.employerCityState,
      employerCountry: data?.employerCountry,
    });
  }, [data]);
  const inputFields = [
    {
      label: "Employer Name",
      type: "text",
      name: "employerName",
      placeholder: "Employer Name",
      value: EmployerData.employerName,
      className: " ",
    },
    {
      label: "Organization Name",
      type: "text",
      name: "employerOrganizationName",
      placeholder: "Organization Name",
      value: EmployerData.employerOrganizationName,
      className: " col-span-2",
    },
    {
      label: "Address",
      type: "text",
      name: "employerAddress",
      placeholder: " Enter Address",
      value: EmployerData.employerAddress,
      className: " col-span-2 ",
    },
    {
      label: "City/ State",
      type: "text", // Adjusted type from 'email' to 'text'
      name: "employerCityState",
      placeholder: "Enter City/ State",
      value: EmployerData.employerCityState,
      className: " col-span-2",
    },
    {
      label: "Country",
      type: "text",
      name: "employerCountry",
      placeholder: "Enter Country",
      value: EmployerData.employerCountry,
      className: " col-span-2",
    },
  ];

  const validateFields = () => {
    const newErrors = {};
    let allFieldsValid = true;

    inputFields.forEach((field) => {
      const { name } = field;
      const value = EmployerData[name];
      switch (name) {
        case "employerName":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "First name is required";
            allFieldsValid = false;
          }
          break;
        case "employerOrganizationName":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Organization name is required";
            allFieldsValid = false;
          }
          break;
        case "employerAddress":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Employer Address is required";
            allFieldsValid = false;
          }
          break;
        case "employerCityState":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "State or City is required";
            allFieldsValid = false;
          }
          break;
        case "employerCountry":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Country is required";
            allFieldsValid = false;
          }
          break;

        default:
          break;
      }
    });

    setFormErrors(newErrors);
    return allFieldsValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (newErrors[name]) {
      delete newErrors[name];
    }
    setEmployerData({ ...EmployerData, [name]: value });
    setData({ ...data, [name]: value });
    setError(newErrors);
  };

  return (
    <div className="flex flex-col gap-[16px] w-full bg-white py-4">
      <div className="flex flex-row justify-between gap-[8px] items-center">
        <div>
          <span className="font-montserrat text-[18px] font-[600] leading-[21.94px] text-left text-[#333333]">
            Employer Details
          </span>
        </div>
        <div>
          {isShow ? (
            <div onClick={() => setIsShow(!isShow)}>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00078 2.7999L2.10078 6.6749C1.91745 6.85824 1.68828 6.95407 1.41328 6.9624C1.13828 6.97074 0.900781 6.8749 0.700781 6.6749C0.517448 6.49157 0.425781 6.25824 0.425781 5.9749C0.425781 5.69157 0.517448 5.45824 0.700781 5.2749L5.30078 0.674902C5.40078 0.574902 5.50911 0.504069 5.62578 0.462402C5.74245 0.420736 5.86745 0.399902 6.00078 0.399902C6.13411 0.399902 6.25911 0.420736 6.37578 0.462402C6.49245 0.504069 6.60078 0.574902 6.70078 0.674902L11.3008 5.2749C11.4841 5.45824 11.5799 5.6874 11.5883 5.9624C11.5966 6.2374 11.5008 6.4749 11.3008 6.6749C11.1174 6.85824 10.8841 6.9499 10.6008 6.9499C10.3174 6.9499 10.0841 6.85824 9.90078 6.6749L6.00078 2.7999Z"
                  fill="#333333"
                />
              </svg>
            </div>
          ) : (
            <div onClick={() => setIsShow(!isShow)}>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00011 6.95021C5.86678 6.95021 5.74178 6.92937 5.62511 6.88771C5.50844 6.84604 5.40011 6.77521 5.30011 6.67521L0.700109 2.07521C0.516776 1.89187 0.420943 1.66271 0.412609 1.38771C0.404276 1.11271 0.500109 0.875207 0.700109 0.675207C0.883443 0.491874 1.11678 0.400207 1.40011 0.400207C1.68344 0.400207 1.91678 0.491874 2.10011 0.675207L6.00011 4.55021L9.90011 0.675207C10.0834 0.491874 10.3126 0.39604 10.5876 0.387707C10.8626 0.379374 11.1001 0.475207 11.3001 0.675207C11.4834 0.85854 11.5751 1.09187 11.5751 1.37521C11.5751 1.65854 11.4834 1.89187 11.3001 2.07521L6.70011 6.67521C6.60011 6.77521 6.49178 6.84604 6.37511 6.88771C6.25844 6.92937 6.13344 6.95021 6.00011 6.95021Z"
                  fill="#333333"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {isShow && (
        <div className="flex flex-col gap-[8px]">
          {inputFields.map((employer, index) => {
            if (
              employer.label === "City/ State" ||
              employer.label === "Country"
            ) {
              return null; // Skip these labels for now
            }
            return (
              <div className="flex flex-col gap-[8px]" key={index}>
                <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
                  {employer.label}{" "}
                  <span className="text-red text-[12px]">*</span>
                </label>
                <input
                  type={employer.type}
                  name={employer.name}
                  placeholder={employer.placeholder}
                  value={EmployerData[employer.name]}
                  onChange={handleInputChange}
                  className={`w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400] ${
                    errors && errors[employer?.name]
                      ? "border-red"
                      : "border-[#C4C4C4]"
                  }`}
                />
                {errors && errors[employer.name] && (
                  <span className="text-red text-[12px]">
                    field is required!
                  </span>
                )}
              </div>
            );
          })}
          <div className="flex flex-row gap-[16px]">
            {inputFields
              .filter(
                (employer) =>
                  employer.label === "City/ State" ||
                  employer.label === "Country"
              )
              .map((employer, index) => (
                <div className="flex flex-col gap-[8px] w-full" key={index}>
                  <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
                    {employer.label}{" "}
                    <span className="text-red text-[12px]">*</span>
                  </label>
                  <input
                    type={employer.type}
                    name={employer.name}
                    placeholder={employer.placeholder}
                    value={EmployerData[employer.name]}
                    onChange={handleInputChange}
                    className={`w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400] ${
                      errors && errors[employer?.name]
                        ? "border-red"
                        : "border-[#C4C4C4]"
                    }`}
                  />
                  {errors && errors[employer.name] && (
                    <span className="text-[12px] text-red">
                      field is required!
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDetails;
