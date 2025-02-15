import React from 'react';

function DocumentDetails({ fileData, setFileData, tog, updateTog, setIsCompleted, setProgress, setIsCompleted1, setProgress1, formData, setFormData }) {

    const handleBack1 = () => {
        setProgress1(0);
        setIsCompleted1(false);
        updateTog(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    console.log(fileData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData(prev => {
                const updatedFileData = { ...prev, [name]: files[0] };
                console.log("Updated fileData:", updatedFileData);
                return updatedFileData;
            });
        }
    };



    return (
        <div style={{ boxShadow: "0px 1px 6px 0px #00000040" }} className={`${tog === 3 ? "flex" : "hidden"} bg-white w-[45%] rounded-[16px] p-6 flex-col gap-6`}>


            <div className="w-full gap-[20px] grid grid-cols-12">
                <div className="flex  flex-col gap-1 col-span-6">
                    <label className="text-[16px] font-[500] text-[#333333]">GST No<span className="text-red">*</span></label>
                    <input type="text" name="gstNo" value={formData.gstNo || ''} onChange={handleChange} placeholder="Enter GST number" className="rounded-[8px] py-[8.2px] px-4 border border-[#9D9D9D] w-full outline-none" />
                </div>
                <div className="flex col-span-6 flex-col gap-1">
                    <label className="text-[16px] font-[500] text-[#333333]">PAN No<span className="text-red">*</span></label>
                    <input type="text" name="panNo" value={formData.panNo || ''} onChange={handleChange} placeholder="Enter PAN number" className="rounded-[8px] py-[8.2px] px-4 border border-[#9D9D9D] w-full outline-none" />
                </div>

                
            </div>


            <div className=" grid grid-cols-12 gap-[20px]">
            <div className="flex  flex-col gap-1 col-span-6">
                    <label className="text-[16px] font-[500] text-[#333333]">Upload Certificate<span className="text-red">*</span></label>
                    <div className="rounded-[8px] py-[5.6px] px-4 border border-[#9D9D9D] flex items-center justify-between cursor-pointer"
                    >


                        <input type="file" id="certificateInput" name="certificate" onChange={handleFileChange} className="" />
                    </div>
                </div>

                <div className="flex col-span-6 flex-col gap-1">
                    <label className="text-[16px] font-[500] text-[#333333]">Upload PAN<span className="text-red">*</span></label>
                    <div className="rounded-[8px] py-[5.6px] px-4 border border-[#9D9D9D] flex items-center justify-between cursor-pointer"
                    >


                        <input type="file" id="panFileInput" name="panFile" onChange={handleFileChange} className="" />
                    </div>
                </div>
            </div>


            <div className="flex w-full flex-col gap-1">
                <label className="text-[16px] font-[500] text-[#333333]">Company Logo<span className="text-red">*</span></label>
                <div className="rounded-[8px] py-[5.6px] px-4 border border-[#9D9D9D] flex items-center justify-between cursor-pointer"
                >


                    <input type="file" id="companyLogoInput" name="companyLogo" onChange={handleFileChange} className="" />
                </div>
            </div>
            <div className="w-full flex justify-between">
                <button onClick={handleBack1} className="py-2 md:py-[8px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] md:rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#333333]">Go Back</button>
                <button className="py-2 md:py-[8px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] bg-blue md:rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#FFFFFF]">Continue</button>
            </div>
        </div>
    );
}

export default DocumentDetails;
