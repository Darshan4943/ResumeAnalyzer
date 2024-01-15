import React, { useState } from "react";
import axios from "axios";
import DateSelector from "@/components/common/dateSelector";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { reCallUserData } from '@/Redux/actions/user';
import { ClosedIcon } from "@/utils/svg";
function HonorsAwards({ setAddAchivements,editAchievement,Achievement }) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const dispatch = useDispatch();
  const userDataGlobal = useSelector((state) => state.userData);
  const [data, setData] = useState({
    title: '',
    issuedBy: '',
    issuedDate: { year: 0, month: 0 },
    discription: '',
    ...(editAchievement && { 
      title: Achievement?.title,
      issuedBy: Achievement?.issuedBy,
      issuedDate: {
        year: Achievement?.issuedDateYear,
        month: Achievement?.issuedDateMonth,
      },
      discription: Achievement?.discription,
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
  console.log(41,isEditing)

  // const handleSubmit = () => {


  //   const awardData = {
  //     title: data.title,
  //     issuedBy: data.issuedBy,
  //     issuedDateYear: data.issuedDate.year, 
  //     issuedDateMonth: data.issuedDate.month,
  //     discription: data.discription, 
  //   };
  //   axios
  //     .post(`https://freedygoservices.in/api/candidate/addAchivement/${userDataGlobal._id}`, awardData)
  //     .then((res) => {

  //       console.log(444, res.data);
  //       dispatch(reCallUserData());
  //       setAddAchivements(false);
  //       toast.success("Awards added successfully");
  //     })
  //     .catch((err) => {

  //       console.log(err);
  //     });
  // };


  const handleSubmit = () => {
   
    const awardData = {
      title: data.title,
      issuedBy: data.issuedBy,
      issuedDateYear: data.issuedDate.year, 
      issuedDateMonth: data.issuedDate.month,
      discription: data.discription, 
    };
    if (isEditing) {
      axios
        .put(
          `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/updateAchivement/${Achievement._id}`,
          data
        )
        .then((res) => {
          console.log(444, res.data);
        dispatch(reCallUserData());
        setAddAchivements(false);
        toast.success("Awards updated successfully");
        })
        .catch((err) => {

          console.error(err);
        });
    } else {
      axios
      .post(`https://freedygoservices.in/api/candidate/addAchivement/${userDataGlobal._id}`, awardData)
      .then((res) => {

        console.log(444, res.data);
        dispatch(reCallUserData());
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
  };
  

  return (
    <>
      <div className=" p-[24px] bg-[#fff] rounded-[16px] flex flex-col gap-[16px]">
      <div className="flex items-center gap-4 self-stretch w-full">
            <div className="w-[30%] text-[#25324B] font-Montserrat font-medium text-[16px] md:text-base lg:text-xl leading-160">
              Add Honors & Awards
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-[50%] md:w-[75.45%]"></div>
            <div onClick={() => handleImageClick(false)}>
              <ClosedIcon />
            </div>
          </div>
          <p className="text-[12px] leading-[20px] text-[#333]">Add links to your Honors and Awards given for your work</p>

        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            Award title <span className="text-[#C00000]">*</span>
          </div>
          <input
            className="text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter award title"
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
          />
        </div>


        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            Awarded by <span className="text-[#C00000]">*</span>
          </div>
          <input
            className="text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter name of awarding entity"
            type="text"
            name="issuedBy"
            value={data.issuedBy}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-4 w-[100%] sm:w-[50%]">
          <div className="text-[16px] font-[500]">
            Issued Date <span className="text-[#C00000]">*</span>
          </div>
          <div className="flex gap-4 w-full">
          <div className="flex gap-4 w-full">
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small w-[50%]">
            <select
              value={data.issuedDate.month}
              onChange={(e) =>
                setData({
                  ...data,
                  issuedDate: {
                    ...data.issuedDate,
                    month: e.target.value,
                  },
                })
              }
              className="w-full outline-none"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <option value="Month" disabled hidden className="px-4 py-2">
                Month
              </option>

              {months.map((month) => (
                <option key={month} value={month} className="px-4 py-2">
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

          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small  w-[50%]">
            <select
              value={data.issuedDate.year}
              onChange={(e) =>
                setData({
                  ...data,
                  issuedDate: {
                    ...data.issuedDate,
                    year: e.target.value,
                  },
                })
              }
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              className="w-full outline-none"
            >
              <option value="Year" disabled hidden>
                Year
              </option>
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
          <div className="text-[16px] font-[500]">Description</div>
          <textarea
            className="border-solid border-#DEDEDE border-[1px] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="discription"
            value={data.discription}
            onChange={handleInputChange}
          ></textarea>
        </div>


        <div className="w-full flex justify-end">
          <div className="flex gap-[12px]">
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[16px] font-[500] hover:cursor-pointer"
              onClick={() => setAddAchivements(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#fff] text-[16px] font-[500] bg-[#06A9EF]"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HonorsAwards;
