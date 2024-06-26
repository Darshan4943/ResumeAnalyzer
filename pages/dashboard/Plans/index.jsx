import React, { useState } from 'react'
import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import SubscriptionPlansAdmin from '../../../components/featured/home/SubscriptionPlansAdmin';

function Index() {
    const userDataGlobal = useSelector((state) => state.userData);
    const [toggle, setToggle] = useState(true)

    return (
        <div className='bg-subscriptionPlan  bg-cover bg-no-repeat    min-h-[95vh]'>
            <div className='customMargins pt-10'>
                <div
                    className="text-[14px] relative rounded-[6px] w-fit bg-[#F7F7F7] flex gap-[10px]  ">
                    <button
                        className={`px-4 font-[600] py-[8px]  rounded-[6px] ${toggle ? "text-[#F7F7F7]" : "text-[#646464]"}`}
                        onClick={() => setToggle(true)} >
                        Candidate Plans
                    </button>
                    <button
                        className={` px-4 font-[600] py-[8px] rounded-[6px]  ${toggle ? "text-[#646464]" : "text-[#F7F7F7]"} `}
                        onClick={() => setToggle(false)}>
                        Recruiter Plans
                    </button>
                    <motion.button
                        initial={{ x: toggle ? 0 : 160 }}
                        animate={{ x: toggle ? 0 : 160 }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                        style={{ textWrap: 'nowrap' }}
                        className={` px-4 font-[600] py-[8px] ${toggle ? "w-[50%]" : "w-[124px]"}h-full  absolute text-[#fff] bg-[#06A9EF] rounded-[6px] `}
                    >
                        {`${toggle ? "Candidate Plans" : "Recruiter Plans"}`}
                    </motion.button>
                </div>
                <SubscriptionPlansAdmin toggle={toggle} />
            </div>
        </div>
    )
}

export default Index
