import axios from 'axios';
import React, { useState } from 'react';
import DateSelector from '@/components/common/dateSelector';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { reCallUserData } from '@/Redux/actions/user';

function SampleWork({ setaddSampleWork,Project,editProject }) {
  const dispatch = useDispatch();
  const userDataGlobal = useSelector((state) => state.userData);

  const [data, setData] = useState({
    title: "",
    url: "",
    isCurrentlyWorking: true,
    duration: {
      from: {
        years: 2021,
        months: 9,
      },
      to: {
        years: 2022,
        months: 6,
      },
    },
    description: "",

    ...(editProject && { 
      title: Project?.title,
      url: Project?.url,
      isCurrentlyWorking:Project?.isCurrentlyWorking,
      duration: {
        from: {
          years: Project?.duration?.from?.years,
          months: Project?.duration?.from?.months,
        },
        to: {
          years: Project?.duration?.to?.years,
          months: Project?.duration?.to?.months,
        },
      },
      description: Project?.description,
    }),
  })


  const isEditing = !!editProject;

  const handleSubmit = () => {
    const projectData = 
      {
        title: data.title,
        url: data.url,
        isCurrentlyWorking: data.isCurrentlyWorking,
        duration: {
          from: {
            years: data.duration.from.years,
            months: data.duration.from.months,
          },
          to: {
            years: data.duration.to.years,
            months: data.duration.to.months,
          },
        },
        description: data.description,
      }
      
    

   
      // axios
      // .post(`https://freedygoservices.in/api/candidate/addProject/${userDataGlobal._id}`, projectData)
      //   .then((res) => {
      //     dispatch(reCallUserData());
      //     console.log(444, res.data);
      //     setaddSampleWork(false)
      //     toast.success("Projects Added successfully");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });


        if (isEditing) {
          axios
            .put(
              `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/updateProject/${Project._id}`,
              data
            )
            .then((res) => {
              console.log(444, res.data);
            dispatch(reCallUserData());
            setaddSampleWork(false);
            toast.success("Project updated successfully");
            })
            .catch((err) => {
    
              console.error(err);
            });
        } else {
          axios
          .post(`https://freedygoservices.in/api/candidate/addProject/${userDataGlobal._id}`, projectData)
            .then((res) => {
              dispatch(reCallUserData());
              console.log(444, res.data);
              setaddSampleWork(false)
              toast.success("Projects Added successfully");
            })
            .catch((err) => {
              console.log(err);
            });
        }
  
  };

  return (
    <>
      <div className=" p-[24px] bg-[#fff] rounded-[16px] flex flex-col gap-[16px]">
        <div className="flex gap-[4px] w-full items-center">
        
            <div className="text-[24px] font-[500] text-[#25324B] w-[69.90%]">Add Sample Work</div>
            <div className="h-[1px]  bg-[#DEDEDE] flex items-center w-[63.07%]"></div>
            <svg
              className="hover:cursor-pointer"
              onClick={() => setaddSampleWork(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_5716_141042)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                  className="hover:cursor-pointer"
                />
              </g>
            </svg>
        
          
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            Work title <span className="text-[#C00000]">*</span>
          </div>
          <input
            className=" text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter work title"
            type="text"
            name="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            URL <span className="text-[#C00000]">*</span>
          </div>
          <input
            className=" text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter your social Profile URL"
            type="text"
            name="url"
            value={data.url}
            onChange={(e) => setData({ ...data, url: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="w-[50%] flex flex-col gap-[12px] text-[16px] font-[500] ">
            Are you currently working on this?{" "}
            <div className="flex gap-[16px] items-center">
              <div className="flex gap-[8px]">
                <input
                  className="custom-radio"
                  type="radio"
                  name="isCurrentlyWorking"
                  checked={data.isCurrentlyWorking}
                  onChange={() => setData({ ...data, isCurrentlyWorking: true })}
                />
                <label className="text-[14px] font-[500]">yes</label>
              </div>
              <div className="flex gap-[8px]">
                <input
                  className="custom-radio"
                  type="radio"
                  name="isCurrentlyWorking"
                  checked={!data.isCurrentlyWorking}
                  onChange={() => setData({ ...data, isCurrentlyWorking: false })}
                />
                <label className="text-[14px] font-[500]">no</label>
              </div>
            </div>
          </div>
        </div>
        <DateSelector idPrefix='projects' data={data} dataSeter={setData} />
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">Description</div>
          <textarea
            className="border-solid border-#DEDEDE border-[1px] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <div className="text-[14px] font-[400] text-[#646464] flex justify-end"></div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-[12px]">
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[16px] font-[500] hover:cursor-pointer"
              onClick={() => setaddSampleWork(false)}
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

export default SampleWork
