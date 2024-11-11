import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { telCode } from '../../../utils/data';

const PersonalDetails = ({ data, handleInputChange, formError, setFormData,setSelectedItem,selectedItem }) => {
  
    const [filteredTelCode, setFilteredTelCode] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
 
    const handleItemClick = (item) => {
        setSelectedItem(item);
        const newErrors = { ...formError };

        if (newErrors["mobileNo"]) {
            delete newErrors['mobileNo'];
        }


        setFormData((prevData) => ({
            ...prevData,
            dial_code: item.dial_code,
        }));
    };
    const handleNumberInput = (field, value, maxLength) => {
        
        if (/^\d*$/.test(value) && value.length <= maxLength) {
          handleInputChange(field, value);
        }
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
        <div className="  flex flex-col gap-4">
            <div className='flex flex-row gap-4 items-center'>

                <h2 className="sm:text-[24px] text-[20px]  font-medium sm:min-w-[239px] min-w-[200px]">Professional Details</h2>
                <div className='h-[1px] w-full bg-[#DEDEDE]'></div>
            </div>
            <form className="space-y-4">
                <div className='flex ml:flex-row flex-col gap-4 '>


                    <div className='ml:w-[50%] w-[100%]'>
                        <label className="block text-sm font-medium text-gray-700">
                            First name <span className="text-red font-medium">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter first name"
                            className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
                            value={data?.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                        {formError?.firstName && (
                            <p className="text-xs text-red font-medium mt-1 ">{formError.firstName}</p>
                        )}
                    </div>


                    <div className='ml:w-[50%] w-[100%]'>
                        <label className="block text-sm font-medium text-gray-700">
                            Last name <span className="text-red font-medium">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
                            value={data?.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                        {formError?.lastName && (
                            <p className="text-xs text-red font-medium mt-1">{formError.lastName}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select your Gender  <span className="text-red font-medium">*</span>
                    </label>
                    <div className="mt-2 flex flex-row items-center gap-6">
                        <div className="flex items-center">
                            <input
                                id="male"
                                name="gender"
                                type="radio"
                                value="Male"
                                checked={data?.gender === 'Male'}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-[#AFAFAF]"
                            />
                            <label htmlFor="male" className="ml-3 block text-sm font-medium text-gray-700">
                                Male
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="female"
                                name="gender"
                                type="radio"
                                value="Female"
                                checked={data?.gender === 'Female'}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-[#AFAFAF]"
                            />
                            <label htmlFor="female" className="ml-3 block text-sm font-medium text-gray-700">
                                Female
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="other"
                                name="gender"
                                type="radio"
                                value="Others"
                                checked={data?.gender === 'Others'}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-[#AFAFAF]"
                            />
                            <label htmlFor="other" className="ml-3 block text-sm font-medium text-gray-700">
                                Others
                            </label>
                        </div>
                    </div>
                    {formError?.gender && (
                        <p className="text-xs text-red font-medium mt-1">{formError.gender}</p>
                    )}
                </div>

                <div className='flex ml:flex-row flex-col gap-4 '>
                    <div className='ml:w-[50%] w-[100%]'>
                        <label className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red font-medium">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
                            value={data?.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            
                        />
                        {formError?.email && (
                            <p className="text-xs text-red font-medium mt-1">{formError.email}</p>
                        )}
                    </div>

                    <div className='ml:w-[50%] w-[100%]'>
                        <label className="block text-sm font-medium text-gray-700">
                            Contact number <span className="text-red font-medium">*</span>
                        </label>
                        <div className={`mt-1 flex flex-row justify-between  h-[40px] sm:px-2 px-1 py-2 border rounded-md ${formError && (formError["dial_code"] || formError["mobileNo"]) ? "border-red" : "border-[#C4C4C4]"}`}>
                            <ReactSelect
                                options={filteredTelCode}
                                className="sm:min-w-[180px] min-w-[140px] flex items-center rounded-[8px] outline-none border-none cursor-pointer"
                                placeholder="Select"
                                value={selectedItem}
                                onChange={handleItemClick}
                                getOptionLabel={(option) => (
                                    <div className="flex items-center cursor-pointer ">
                                        <img
                                            src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                            width="20px"
                                        />
                                        <span className="ml-2 text-[#333333] cursor-pointer sm:text-[16px] text-[13px]">
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
                                type="text"
                                placeholder="Contact Number"
                                className=" p-2 w-[80%] sm:text-[16px] text-[13px] text-start"
                                value={data?.mobileNo}
                                onChange={(e) => handleNumberInput('mobileNo', e.target.value, 10)}
                            />
                        </div>

                        {formError?.dial_code && (
                            <p className="text-xs text-red font-medium mt-1">{formError.dial_code}</p>
                        )}
                        {formError?.mobileNo && (
                            <p className="text-xs text-red font-medium mt-1">{formError.mobileNo}</p>
                        )}
                    </div>

                </div>

                {/* <div className='ml:w-[49.5%] w-[100%]'>
                    <label className="block text-sm font-medium text-gray-700">
                        Date of Birth <span className="text-red font-medium">*</span>
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
                        value={data?.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                    />
                    {formError?.dob && (
                        <p className="text-xs text-red font-medium mt-1">{formError.dob}</p>
                    )}
                </div> */}
            </form>
        </div>
    );
};

export default PersonalDetails;
