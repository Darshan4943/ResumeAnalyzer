import React from 'react'
import SubscriptionPlans from './SubscriptionPlans';

function SubscriptionPlan({isLogin}) {

   

    return (
        <div className='flex flex-col gap-12  bg-subscriptionPlan justify-center items-center bg-cover bg-no-repeat px-[100px] py-[60px]'>
            <div className='text-center'>
                <p className='text-[2.9vw] text-[#333333] font-[700]'>Try our <span className="text-[#06A9EF]">Subscription</span>  plans</p>
                <p className='text-[1.5vw] text-[#646464] font-[400]'>Affordable plans for all the aspiring professionals.</p>
            </div>

            <SubscriptionPlans isLogin={isLogin} />
        </div>
    )
}

export default SubscriptionPlan