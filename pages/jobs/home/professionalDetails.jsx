import React from 'react';

const ProfessionalDetails = ({ data, handleInputChange, formError }) => {

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
              How many years of experience you have?
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

        <div className="grid ms:grid-cols-2 grid-cols-1 gap-4">
          <div>
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

          <div>
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
          <label className="block text-sm font-medium text-gray-700">
            Are you comfortable commuting to this job's location?
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
