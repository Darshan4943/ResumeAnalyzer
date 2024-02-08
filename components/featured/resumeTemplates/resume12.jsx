import React from 'react'

const Resume12 = ({data}) => {
  return (
   <>
   <div className="flex gap-12 justify-start items-center flex-col w-[794px] min-h-[1122px]">
   <div className="w-full h-[236px] ">
    <div className="bg-[#0C2438] h-full relative">
    <div className="absolute bottom-0 w-[582px] h-[100px] bg-[#2EA0D7]">
    <div className="flex flex-col pl-[80px]">
        <p className='text-[38px] font-[400] text-[#fff] font-Lato'>
            {data.firstName} {data.lastName}
        </p>
        <p className='text-[16px] font-[400] text-[#fff] font-Lato'>
            {data.designation}
        </p>
    </div>
</div>

        <div className="absolute right-[58px] bottom-[-26px]">
              {data.profilePhoto ? (
                <img src={URL.createObjectURL(data.profilePhoto)} alt="" className="w-[200px] relative h-[200px] rounded-full z-20" />
              ) : (
                <img src="/images/services/profile.png" alt="" className="w-[208px] relative z-20 h-[208px] rounded-3xl" />
              )}
    </div>
    </div>
</div>
<div className="flex flex-col w-[702px]">
    <div className="w-full flex flex-col">
        <p className='font-[700px] text-[18px] text-[#495970] font-lato'></p>

    </div>

</div>


   </div>
   
   </>
  )
}

export default Resume12
