import { ClosedIcon } from '@/utils/svg';
import React, { useState } from 'react';
import DateSelector from '../common/dateSelector';

function AddEducation( { setOpenAddEducation ,education,setEducation,educationData,setEducationData}) {

    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEducationData({
            ...educationData,
            [name]: value,
        });
    };

    const handleStartDateChange = (startMonth, startYear) => {
        setEducationData({
            ...educationData,
            startDate: { month: startMonth, year: startYear },
        });
    };

    const handleEndDateChange = (endMonth, endYear) => {
        setEducationData({
            ...educationData,
            endDate: { month: endMonth, year: endYear },
        });
    };

    const handleSaveChanges = () => {
        setEducation([...education, educationData]);
        setEducationData({
            isCurrentJob: '',
            education: '',
            university: '',
            institute: '',
            course: '',
            specialization: '',
            location: '',
            isCurrentlyPursuing: '',
            startDate: { month: '', year: '' },
            endDate: { month: '', year: '' },
            gradingSystem: '',
            score: '',
        });

        setOpenAddEducation(false);
    };
      

  return (
    <div className='flex flex-col gap-4 p-6 bg-white rounded-[16px] ' style={{ boxShadow: '0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)' }} >
    <div className='flex justify-between w-full items-center'>
        <p className='text-[24px] font-medium'>Add Education</p>
        <div className='bg-[#DEDEDE] h-[1px] w-[54.54%]'></div>
        <div onClick={() => setOpenAddEducation(false)}>
            <ClosedIcon />
        </div>
    </div>
    <div className='flex flex-col gap-3 '>
        <p className='text-[16px] font-medium'>Is this your current Job? </p>
        <div className='w-[70%] flex justify-between text-[14px] font-montserrat items-center font-medium'>
            <div className='flex gap-2'>
            <input type='radio' name='isCurrentJob' value='Yes' onChange={handleInputChange} />
            <label>Full Time</label>
            </div>
            <div className='flex gap-2'>
            <input type='radio' name='isCurrentJob' value='No' onChange={handleInputChange} />
            <label>Part Time</label>
            </div>
            <div className='flex gap-2'>
            <input type='radio' name='isCurrentJob' value='No' onChange={handleInputChange} />
            <label>Correspondence/ Distance learning</label>
            </div>
        </div>
    </div>
   
    <div className='flex flex-col gap-2 '>
        <div className='text-[16px] font-montserrat  font-medium'>Education</div>
        <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
            <input
                type='text'
                name='education'
                placeholder='Select your education here'
                className='w-full text-[14px] font-montserrat font-small'
                value={educationData.education}
                onChange={handleInputChange}
            />
        </div>
    </div>
    <div className='flex flex-col gap-2 '>
        <div className='text-[16px] font-montserrat  font-medium'>University</div>
        <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
            <input
                type='text'
                name='university'
                placeholder='Enter your University'
                className='w-full text-[14px] font-montserrat font-small'
                value={educationData.university}
                onChange={handleInputChange}
            />
        </div>
    </div>
    <div className='flex flex-col gap-2 '>
        <div className='text-[16px] font-montserrat  font-medium'>Institute</div>
        <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
            <input
                type='text'
                name='institute'
                placeholder='Enter your Institute'
                className='w-full text-[14px] font-montserrat font-small'
                value={educationData.institute}
                onChange={handleInputChange}
            />
        </div>
    </div>
    <div className='flex flex-col gap-2 '>
        <div className='text-[16px] font-montserrat  font-medium'>Select Course</div>
        <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
            <input
                type='text'
                name='course'
                placeholder='Enter your Course'
                className='w-full text-[14px] font-montserrat font-small'
                value={educationData.Course}
                onChange={handleInputChange}
            />
        </div>
    </div>
    <div className='flex flex-col gap-2 '>
        <div className='text-[16px] font-montserrat  font-medium'>Select Specialization</div>
        <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
            <input
                type='text'
                name='specialization'
                placeholder='Enter your Specialization'
                className='w-full text-[14px] font-montserrat font-small'
                value={educationData.specialization}
                onChange={handleInputChange}
            />
        </div>
    </div>

    <div className='flex flex-col gap-2 '>
        <div className='text-[16px] font-montserrat  font-medium'>Location</div>
        <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
            <input
                type='text'
                name='location'
                placeholder='Enter your Institute'
                className='w-full text-[14px] font-montserrat font-small'
                value={educationData.location}
                onChange={handleInputChange}
            />
        </div>
    </div>
    <div className='flex flex-col gap-3 '>
        <p className='text-[16px] font-medium'>Are you currently pursuing? </p>
        <div className='w-full flex gap-4 text-[14px] font-montserrat items-center font-medium'>
            <div className='flex gap-2'>
            <input type='radio' name='isCurrentJob' value='Yes' onChange={handleInputChange} />
            <label>Yes</label>
            </div>
            <div className='flex gap-2'>
            <input type='radio' name='isCurrentJob' value='No' onChange={handleInputChange} />
            <label>No</label>
            </div>
           
        </div>
    </div>
    <div className='w-full'>
        {' '}
        <DateSelector
            idPrefix='addEducation'
            defaultStartMonth='' 
            defaultStartYear=''
            defaultEndMonth=''
            defaultEndYear=''
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
        />
    </div>
    

    <div className='flex flex-col gap-3 '>
        <p className='text-[16px] font-medium'>Grading system </p>
        <div className='w-[70%] flex gap-3 justify-between text-[14px] font-montserrat items-center font-medium'>
         <div className='bg-white rounded-[30px] px-4 py-2'  style={{boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)"}}>Percentage</div>
         <div className='bg-white rounded-[30px] px-4 py-2'  style={{boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)"}}>CGPA</div>
         <div className='bg-white rounded-[30px] px-4 py-2'  style={{boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)"}}>GPA</div>
         <div className='bg-white rounded-[30px] px-4 py-2'  style={{boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)"}}>Grade</div>
         <input
                type='text'
                name='score'
                placeholder='Enter your score'
                className='w-full text-[14px] font-montserrat font-small bg-white rounded-[8px] px-4 py-2'
                value={educationData.score}
                onChange={handleInputChange}
              
                 style={{boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)"}}
            />
           
        </div>
    </div>
 

    <div class='flex justify-end gap-3'>
        <button
            className='px-4 py-2 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]'
            id='button'
            onClick={() => setOpenAddEducation(false)}
        >
            Cancel
        </button>

        <button className={`px-4 py-2 bg-[#06A9EF] border rounded-[12px] font-semibold text-white `} onClick={handleSaveChanges}>
            Save Changes
        </button>
    </div>

   
</div>
  )
}

export default AddEducation
