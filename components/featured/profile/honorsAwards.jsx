import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClosedIcon } from "../../../utils/svg";
import DateSelector from "../../common/dateSelector";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import { isValid } from "date-fns";

function HonorsAwards({ setAddAchivements, editAchievement, Achievement }) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const dispatch = useDispatch();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    issuedBy: "",
    issuedDate: { year: "Year", month: "Month" },
    description: "",
    ...(editAchievement && {
      title: Achievement?.title,
      issuedBy: Achievement?.issuedBy,
      issuedDate: {
        year: Achievement?.issuedDate?.years,
        month: Achievement?.issuedDate?.months,
      },
      description: Achievement?.description,
    }),
  });

  function getYear() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;

    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  }

  const isEditing = !!editAchievement;

  const validateForm = () => {
    let validationErrors = {};

    if (!data.title.trim()) {
      validationErrors.title = "Award title is required.";
    }

    if (!data.issuedBy.trim()) {
      validationErrors.issuedBy = "Awarding entity is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const awardData = {
      title: data.title,
      issuedBy: data.issuedBy,
      issuedDateYear: data.issuedDate.year,
      issuedDateMonth: data.issuedDate.month,
      description: data.description,
    };
    if (isEditing) {
      axios
        .put(
          `http://localhost:2000/api/candidate/${userDataGlobal?._id}/updateAchivement/${Achievement._id}`,
          awardData
        )
        .then((res) => {
          dispatch(fetchUserData());
          setAddAchivements(false);
          toast.success("Awards updated successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(
          `http://localhost:2000/api/candidate/addAchivement/${userDataGlobal?._id}`,
          awardData
        )
        .then((res) => {
          dispatch(fetchUserData());
          setAddAchivements(false);
          toast.success("Awards added successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "years" || name === "months") {
      setData({
        ...data,
        issuedDate: {
          ...data.issuedDate,
          [name]: parseInt(value) || 0,
        },
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
    setErrors({ ...errors, [name]: "" });
  };
  
  const handleDateChange = (key, value) => {
    const updatedIssuedDate = { ...data.issuedDate, [key]: value };
  
    setData({
      ...data,
      issuedDate: updatedIssuedDate,
    });
  
    if (updatedIssuedDate.month !== "Month" && updatedIssuedDate.year !== "Year") {
      setErrors({ ...errors, issuedDate: "" });
    }
  };
  

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 self-stretch w-full">
            <div className="min-w-[180px] text-[#25324B] font-Montserrat  text-[18px] font-[600] leading-160">
              {isEditing ? " Edit" : "Add"} Achievements
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
            <div className="cursor-pointer" onClick={() => setAddAchivements(false)}>
              <ClosedIcon />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[12px] leading-[20px] text-[#333]">
              Add links to your Honors and Awards given for your work
            </p>

            <div className=" w-full flex flex-col gap-[8px]">
              <div className="text-[14px] font-[500]">
                Award title <span className="text-[#C00000]">*</span>
              </div>
              <input
                className={`text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid  w-full flex items-center justify-between py-[8px] px-[16px] ${
                  errors.title ? "border-red" : "border-[#DEDEDE]"
                } `}
                placeholder="Enter award title"
                type="text"
                name="title"
                value={data.title}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">
            Awarded by <span className="text-[#C00000]">*</span>
          </div>
          <input
            className={`text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid  w-full flex items-center justify-between py-[8px] px-[16px] ${
              errors.issuedBy ? "border-red" : "border-[#DEDEDE]"
            } `}
            placeholder="Enter name of awarding entity"
            type="text"
            name="issuedBy"
            value={data.issuedBy}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-4 w-[100%] sm:w-[50%]">
          <div className="text-[14px] font-[500]">
            Issued Date
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex gap-4 w-full">
              <div className="flex  items-center rounded-lg border border-[#DEDEDE] bg-white text-[12px]  font-montserrat font-small w-[50%]">
                <select
                  value={data.issuedDate.month}
                  onChange={(e) => handleDateChange("month", e.target.value)}
                  className="w-outline-none focus-visible:outline-none  p-2 w-full "
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    position: "relative",
                    zIndex: 1,
                    background: " transparent",
                  }}
                >
                  <option value="Month" className="px-4 py-2">
                    Month
                  </option>

                  {months.map((month) => (
                    <option
                      key={month}
                      value={month}
                      className="px-4 text-[12px] py-2"
                    >
                      {new Date(0, month - 1).toLocaleString("en", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>

                <img
                  src="/images/down_arrow.png"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </div>

              <div
                className="flex  items-center rounded-lg border border-[#DEDEDE] bg-white text-[12px]  font-montserrat font-small  w-[50%]"
              >
                <select
                  value={data.issuedDate.year}
                  onChange={(e) => handleDateChange("year", e.target.value)}
                  className="w-outline-none  focus-visible:outline-none  p-2 w-full "
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    position: "relative",
                    zIndex: 1,
                    background: " transparent",
                  }}
                >
                  <option value="Year">Year</option>
                  {getYear().map((year) => (
                    <option key={year} value={year} className="mt-4 px-4 py-2">
                      {year}
                    </option>
                  ))}
                </select>
                <img
                  src="/images/down_arrow.png"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">Description</div>
          <textarea
            className="border-solid border-[#DEDEDE] border-[1px] rounded-[8px] p-[12px] text-[12px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="description"
            value={data.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="w-full flex justify-end">
          <div className="flex gap-[12px]">
            <button
              className="px-[26px] red_border_Button h-[38px] rounded-[30px]"
              onClick={() => setAddAchivements(false)}
            >
              Cancel
            </button>
            <button
              className="px-[32px] bg_Button h-[38px] rounded-[30px]"
              onClick={handleSubmit}
            >
              {isEditing ? " Save Changes" : "Add Achievement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HonorsAwards;
