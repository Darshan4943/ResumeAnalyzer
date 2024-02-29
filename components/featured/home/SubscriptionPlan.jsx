import React from 'react'

function SubscriptionPlan() {

    const plans = [
        {
            duration: '1 Day',
            limit: "One-Time",
            price: '$ 1',
            description: 'create your first resume',
            features: [
                'AI Powered Resume Creation',
                '2 Resume Uploads',
                'Unlimited Access to 100+ Resume Templates',
                'Unlimited Access to Skill Assessment',
                'Resume transformation as per job description',
                '2 resume Cloud storage'
            ]
        },
        {
            duration: '7 Days',
            limit: "for More",
            price: '$ 3',
            description: 'for the active job seekers',
            features: [
                'AI Powered Resume Creation',
                '6 Resume Uploads',
                'Unlimited Access to 100+ Resume Templates',
                'Unlimited Access to Skill Assessment',
                'Resume transformation as per job description',
                '6 resume Cloud storage'
            ]
        },
        {
            duration: '30 Days',
            limit: "Ultimate",
            price: '$ 10',
            description: 'create, save, repeat with ease',
            features: [
                'AI Powered Resume Creation',
                '20 Resume Uploads',
                'Unlimited Access to 100+ Resume Templates',
                'Unlimited Access to Skill Assessment',
                'Resume transformation as per job description',
                '20 resume Cloud storage'
            ]
        }
    ];


    return (
        <div className='flex flex-col gap-12  bg-subscriptionPlan justify-center items-center bg-cover bg-no-repeat px-[100px] py-[60px]'>
            <div className='text-center'>
                <p className='text-[2.9vw] text-[#333333] font-[700]'>Try our Subscription plans</p>
                <p className='text-[1.5vw] text-[#646464] font-[400]'>Affordable plans for all the aspiring professionals.</p>
            </div>

            <div className='flex gap-9'>
                {plans.map((plan, index) => (
                    <div key={index} className=' relative mt-[40px] bg-white  flex flex-col gap-4 items-center rounded-[16px]' style={{ boxShadow: "0px 2px 15px 0px #00000033" }}>
                        {index === 1 && <div className='absolute left-0 top-[-36px] text-[1.3vw] font-semibold px-4 pt-[4px] pb-[16px] bg-[#06A9EF] text-white rounded-t-[16px]'>Recommended</div>}
                        <div className='p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center'>
                            <div className='flex text-center flex-col gap-3 text-[#333333] w-[80%]'>
                                <p className='text-[1.7vw] font-[600]'><span className='text-[#06A9EF]'>{plan.duration}</span> {plan.limit}</p>
                                <p className='text-[2.5vw] font-[700]'>{plan.price}</p>
                                <p className='text-[1.1vw] font-[500]'>{plan.description}</p>
                                <div className='bg-[#DEDEDE] h-[2px]' />
                            </div>
                            <div className='flex gap-3 flex-col text-left'>
                                {plan.features.map((feature, index) => (
                                    <div key={index} className='flex gap-3 items-center'>
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.16683 17.75L5.5835 15.0833L2.5835 14.4167L2.87516 11.3333L0.833496 9L2.87516 6.66667L2.5835 3.58333L5.5835 2.91667L7.16683 0.25L10.0002 1.45833L12.8335 0.25L14.4168 2.91667L17.4168 3.58333L17.1252 6.66667L19.1668 9L17.1252 11.3333L17.4168 14.4167L14.4168 15.0833L12.8335 17.75L10.0002 16.5417L7.16683 17.75ZM9.12516 11.9583L13.8335 7.25L12.6668 6.04167L9.12516 9.58333L7.3335 7.83333L6.16683 9L9.12516 11.9583Z" fill="#06A9EF" />
                                        </svg>
                                        <p className='text-[0.9vw] font-[500]'>{feature}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[1.4vw] font-semibold w-full">Purchase Plan</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SubscriptionPlan