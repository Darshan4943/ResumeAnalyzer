import React from 'react';
import ReactSelect from 'react-select';
import { currencyMap } from '../../../utils/data';

const ProfessionalDetails = ({ data, handleInputChange, formError, jobDetails, setFormData }) => {


  const currencyOptions = currencyMap.map((item) => ({
    value: item.currency,
    label: item.currency,
  }));
  const handleNumberInput = (field, value) => {

    if (/^\d*$/.test(value)) {
      handleInputChange(field, value);
    }
  };


  return (
    <div className="flex flex-col gap-4">
      <div className='flex flex-row gap-4 items-center'>
        <h2 className="sm:text-[24px] text-[20px] font-medium sm:min-w-[239px] min-w-[200px]">Professional Details</h2>
        <div className='h-[1px] w-[75%] bg-[#DEDEDE]'></div>
      </div>

      <form className="space-y-4">
        <div className="grid ml:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              How many years of Total experience you have?
            </label>
            <input
              type="text"
              placeholder="Enter value"
              className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
              value={data?.totalExperience}
              onChange={(e) => handleNumberInput('totalExperience', e.target.value)}
            />
            {formError?.totalExperience && (
              <p className="text-xs text-red font-medium mt-1">{formError.totalExperience}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              How many years of Relevant experience you have?
            </label>
            <input
              type="text"
              placeholder="Enter value"
              className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
              value={data?.relevantExperience}
              onChange={(e) => handleNumberInput('relevantExperience', e.target.value)}
            />
            {formError?.relevantExperience && (
              <p className="text-xs text-red font-medium mt-1">{formError.relevantExperience}</p>
            )}
          </div>
        </div>

        <div className="flex ml:flex-row flex-col gap-4">
          <div className='ml:w-[49.5%] w-[100%] flex flex-row  gap-4'>
            <div className=" w-[20%]  flex flex-col ">
              <label className="text-[#333333] text-[14px] font-medium">
                Currency
              </label>
              <div className="flex flex-col mt-1 items-center rounded-lg border  border-[#AFAFAF] bg-white text-[14px] font-montserrat font-small relative min-w-[90px] overflow-visible h-[41.33px]">
                <ReactSelect
                  options={currencyOptions}
                  className="w-[100%] flex min-w-[70px] items-center py-1 rounded-[8px] text-[14px] font-montserrat font-small text-black h-[41.33px]"
                  placeholder="Select Currency"
                  value={
                    currencyOptions.find(
                      (option) => option.value === data?.currencyCurrentCTC
                    ) || null
                  }
                  onChange={(value) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      professional: {
                        ...prevData.professional,
                        currencyCurrentCTC: value.value,
                      },
                    }));
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      width: "100%",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 1,
                      position: "absolute",
                    }),
                  }}
                />

              </div>
              <div className="flex flex-row items-start justify-start">
                {formError && (
                  <p className="text-[12px] text-[red] font-[500] text-left">
                    {formError.currency}
                  </p>
                )}
              </div>
            </div>
            <div className=" w-[78%] flex flex-col ">
              <label className="block text-sm font-medium text-gray-700">
                Current CTC
              </label>
              <input
                type="text"
                placeholder="Enter value"
                className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
                value={data?.currentCTC}
                onChange={(e) => handleNumberInput('currentCTC', e.target.value)}
              />
              {formError?.currentCTC && (
                <p className="text-xs text-red font-medium mt-1">{formError.currentCTC}</p>
              )}
            </div>
          </div>
          <div className='ml:w-[49.5%] w-[100%] flex flex-row  gap-4'>
            <div className=" w-[20%]  flex flex-col ">
              <label className="text-[#333333] text-[14px] font-medium">
                Currency
              </label>
              <div className="flex flex-col mt-1 items-center rounded-lg border  border-[#AFAFAF] bg-white text-[14px] font-montserrat font-small relative min-w-[90px] overflow-visible h-[41.33px]">
                <ReactSelect
                  options={currencyOptions}
                  className="w-[100%] flex min-w-[70px] items-center py-1 rounded-[8px] text-[14px] font-montserrat font-small text-black h-[41.33px]"
                  placeholder="Select Currency"
                  value={
                    currencyOptions.find(
                      (option) => option.value === data?.currencyExpectedCTC
                    ) || null
                  }
                  onChange={(value) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      professional: {
                        ...prevData.professional,
                        currencyExpectedCTC: value.value,
                      },
                    }));
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      width: "100%",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 1,
                      position: "absolute",
                    }),
                  }}
                />

              </div>
              <div className="flex flex-row items-start justify-start">
                {formError && (
                  <p className="text-[12px] text-[red] font-[500] text-left">
                    {formError.currency}
                  </p>
                )}
              </div>
            </div>
            <div className='w-[78%] flex flex-col'>
              <label className="block text-sm font-medium text-gray-700">
                Expected CTC
              </label>
              <input
                type="text"
                placeholder="Enter value"
                className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
                value={data?.expectedCTC}
                onChange={(e) => handleNumberInput('expectedCTC', e.target.value)}
              />
              {formError?.expectedCTC && (
                <p className="text-xs text-red font-medium mt-1">{formError.expectedCTC}</p>
              )}
            </div>
          </div>
        </div>

        <div className='ms:w-[49.5%] w-[100%]'>
          <label className="block text-sm font-medium text-gray-700">
            Notice Period
          </label>
          <select
            className="mt-1 block w-full p-2 border border-[#AFAFAF] rounded-md"
            value={data?.noticePeriod}
            onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
          >
            <option value="" disabled>Select</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
          </select>
          {formError?.noticePeriod && (
            <p className="text-xs text-red font-medium mt-1">{formError.noticePeriod}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Are you comfortable commuting to this job&#39;s location?
          </label>

          <div className="mt-2 flex flex-row gap-6">
            <div className="flex items-center">
              <input
                id="yes"
                name="commute"
                type="radio"
                value="Yes"
                checked={data?.comfortableWithLocation === 'Yes'}
                onChange={(e) => handleInputChange('comfortableWithLocation', e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-[#AFAFAF]"
              />
              <label htmlFor="yes" className="ml-3 block text-sm font-medium text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="no"
                name="commute"
                type="radio"
                value="No"
                checked={data?.comfortableWithLocation === 'No'}
                onChange={(e) => handleInputChange('comfortableWithLocation', e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-[#AFAFAF]"
              />
              <label htmlFor="no" className="ml-3 block text-sm font-medium text-gray-700">
                No
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalDetails;
