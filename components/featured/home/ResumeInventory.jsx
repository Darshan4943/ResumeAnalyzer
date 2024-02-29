import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { popupVisible } from '../../../Redux/actions/user'

function ResumeInventory({ isLogin }) {
    const dispatch = useDispatch()
    return (
        <div className="flex flex-row gap-8 items-center py-9 px-4 bg-inventory bg-cover bg-no-repeat ">
            <div className="w-[50%]  flex justify-center  items-center p-5">
                <img
                    src="/images/resumeBuilder/resumeInventory.png"
                    alt=""
                    className={`w-[40vw] h-[40vw] object-contain`}
                />



            </div>
            <div className=" flex flex-col gap-6 w-[50%] text-[#000000] pl-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="font-semibold text-[2.5vw] leading-none ">
                        <span className='text-[#06A9EF]'>My Collection</span>  is Your Personal Resume Inventory
                    </div>
                    <div className="font-medium text-[1.4vw] text-[#333333] ">
                        My Collection is your one-stop destination for organizing and managing your personalized resume collection. Seamlessly store, update, and tailor your resumes for various job opportunities with ease.
                    </div>
                    <button
                        onClick={() => isLogin ? router.push("/home/BuildResume") : dispatch(popupVisible())}
                        className="px-9 py-4 bg-[#06A9EF] text-white  rounded-[12px] text-[1.2vw] font-semibold"
                        style={{ width: "fit-content" }}
                    >
                        Get Started
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ResumeInventory