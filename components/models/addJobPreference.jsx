import { ClosedIcon } from '@/utils/svg'
import React, { useState } from 'react'

function AddJobPreference({ setAddJobPreference }) {

    const [data, setData] = useState({

        industry: "PHD",
        department: "",
        jobRole: "",
        jobType: "PHD",
        jobMode: "",
        expectedSalary: "",
        preferedLocation:" "
      });
    


    return (
        <div className='flex flex-col gap-4 p-6 bg-white rounded-[16px] ' style={{ boxShadow: '0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)' }} >
            <div className='flex justify-between w-full items-center'>
                <p className='text-[24px] font-medium'>Edit Job Preferences</p>
                <div className='bg-[#DEDEDE] h-[1px] w-[54.54%]'></div>
                <div onClick={() => setAddJobPreference(false)}>
                    <ClosedIcon />
                </div>
            </div>
            <p className='text-[12px] font-normal'>Customize your job settings to match what you're looking for in a job.</p>

            <div className='flex gap-6 w-full '>
                <div className='flex flex-col gap-2 w-[48%]'>
                    <p className='text-[14px] font-medium'> Preferred Industry</p>
                    <select
                        className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'
                        name=''

                    >
                        <option value='' disabled selected className='text-[14px] font-normal'>
                            Select
                        </option>
                        <option value=''>Information Technology</option>

                    </select>
                </div>
                <div className='flex flex-col gap-2 w-[48%]'>
                    <p className='text-[14px] font-medium'> Preferred Industry</p>
                    <select
                        className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'


                    >
                        <option value='' disabled selected className=''>
                            Select
                        </option>
                        <option value=''>Design and Architecture</option>

                    </select>
                </div>

            </div>
            <div className='flex gap-6 w-full '>
                <div className='flex flex-col gap-2 w-[48%]'>
                    <p className='text-[14px] font-medium'> Preferred Job Role</p>
                    <select
                        className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'
                        name=''

                    >
                        <option value='' disabled selected className=''>
                            Select
                        </option>
                        <option value=''>Information Technology</option>

                    </select>
                </div>
                <div className='flex flex-col gap-2 w-[48%]'>
                    <p className='text-[14px] font-medium'> Preferred Job Type</p>
                    <select
                        className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'


                    >
                        <option value='' disabled selected className=''>
                            Select
                        </option>
                        <option value=''>Design and Architecture</option>

                    </select>
                </div>

            </div>
            <div className='flex gap-6 w-full '>
                <div className='flex flex-col gap-2 w-[48%]'>
                    <p className='text-[14px] font-medium'> Preferred shift</p>
                    <select
                        className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'
                        name=''

                    >
                        <option value='' disabled selected className=''>
                            Select
                        </option>
                        <option value=''>Information Technology</option>

                    </select>
                </div>
                <div className='flex flex-col gap-2 w-[48%]'>
                    <p className='text-[14px] font-medium'> Preferred Job mode</p>
                    <select
                        className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'


                    >
                        <option value='' disabled selected className=''>
                            Select
                        </option>
                        <option value=''>Design and Architecture</option>

                    </select>
                </div>


            </div>

            <div className='flex flex-col gap-2 w-[48%]'>
                <p className='text-[14px] font-medium'> Expected salary</p>
                <div className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'>
                    <input
                        type='text'
                        name='expectedSalary'
                        placeholder='Enter your Expected Salary'
                        className='w-full text-[14px] font-montserrat font-small'
                        value=""

                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 w-[48%]'>
                <p className='text-[14px] font-medium'> Preferred work location</p>
                <select
                    className=' border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]'


                >
                    <option value='' disabled selected className=''>
                        Select
                    </option>
                    <option value=''>Pune</option>

                </select>
            </div>

            <div className='flex justify-between'>
                <button   className='px-4 py-2 bg-white-600 border border-[#C00000] text-[#C00000] font font-medium rounded-[8px]'>Delete</button>
                <div class='flex justify-end gap-3'>
                    <button
                        className='px-4 py-2 bg-white-600 border border-[#06A9EF] font font-medium rounded-[8px]'
                        id='button'
                        onClick={() => setAddJobPreference(false)}
                    >
                        Cancel
                    </button>

                    <button className={`px-4 py-2 bg-[#06A9EF] border rounded-[8px] font-semibold text-white `} onClick={(e) => handleSaveChanges(e)}>
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddJobPreference
