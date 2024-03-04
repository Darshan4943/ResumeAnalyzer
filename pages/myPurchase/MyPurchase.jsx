import React from 'react'
import SubscriptionPlans from '../../components/featured/home/SubscriptionPlans';

function MyPurchase() {
    const plans = [
        {
            duration: '1 Day',
            limit: "One-Time",
            price: '$ 1',
            status: "Active",
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

    ];

    return (
        <div className='flex flex-col gap-8 pt-[34px]'>
            <div className='flex flex-col justify-center items-center bg-blue h-[89px]  py-3'>
                <div className=' font-semibold text-[30px] text-white'>My Purchase</div>
                <div className=' font-medium text-[16px] text-white'>Manage your account and subscription here with Skilotech</div>

            </div>
            <div className='px-6 pb-12 w-[100%]'>
                <div style={{ boxShadow: "0px 1px 6px 0px #00000040" }} className=' flex flex-col gap-10 p-6 rounded-[16px] '>
                    <div className=' flex gap-4  border border-[#06A9EF] rounded-[16px] p-6 '>
                        {plans.map((plan, index) => (
                            <div className='flex gap-12  w-[100%]' key={index}>

                                <div className='flex flex-col gap-6  w-[20%] items-center justify-between'>
                                    <div key={index} className='flex text-center flex-col gap-3 text-[#333333] w-[100%] p-4'>
                                        <p className='text-[22px] font-[600]'><span className='text-[#06A9EF]'>{plan.duration}</span> {plan.limit}</p>
                                        <p className='text-[36px] font-[700]'>{plan.price}</p>
                                        <p className='text-[14px] font-[500]'>{plan.description}</p>
                                        <div className='bg-[#DEDEDE] h-[2px]' />

                                    </div>
                                    <button className='px-9 py-3 bg-[#DEDEDE] rounded-[12px] text-[16px] font-[600] text-white w-[60%] min-w-[160px]'>
                                        Purchased
                                    </button>
                                </div>
                                <div className='flex flex-col gap-6  w-[35%] pl-4'>
                                    <div className='text-[20px] font-[600]'> Active plan summary</div>
                                    <div className='flex flex-col gap-9 w-[100%] '>
                                        <div className='flex  gap-4'>
                                            <div className='flex  gap-4 font-[700] justify-between w-[40%]'>

                                                <p>Plan Name</p>
                                                <div>:</div>

                                            </div>
                                            <div className='text-[16px] font-[500]'>
                                                {plan.duration} plan {"("}{plan.limit}{")"}
                                            </div>
                                        </div>
                                        <div className='flex  gap-4'>
                                            <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                                <p className='text-[#0C8A0A]'>Status</p>
                                                <div className='text-[#0C8A0A]'>:</div>

                                            </div>
                                            <div className='text-[16px] font-[500] text-[#0C8A0A]'>
                                                {plan.status}
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                                <p>Date of Purchase</p>
                                                <div>:</div>

                                            </div>
                                            <div className='text-[16px] font-[500]'>
                                                20 february 2024
                                            </div>
                                        </div>
                                        <div className='flex  gap-4'>
                                            <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                                <p>Date of Renewal</p>
                                                <div>:</div>

                                            </div>
                                            <div className='text-[16px] font-[500]'>
                                                20 March 2024
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className='bg-[#DEDEDE] w-[1px] h-[100%]'>
                                </div>
                                <div className='flex gap-3 flex-col text-left'>
                                    <div className='text-[20px] font-[600]'> Available Services</div>
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className='flex gap-4 items-center'>
                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.16683 17.75L5.5835 15.0833L2.5835 14.4167L2.87516 11.3333L0.833496 9L2.87516 6.66667L2.5835 3.58333L5.5835 2.91667L7.16683 0.25L10.0002 1.45833L12.8335 0.25L14.4168 2.91667L17.4168 3.58333L17.1252 6.66667L19.1668 9L17.1252 11.3333L17.4168 14.4167L14.4168 15.0833L12.8335 17.75L10.0002 16.5417L7.16683 17.75ZM9.12516 11.9583L13.8335 7.25L12.6668 6.04167L9.12516 9.58333L7.3335 7.83333L6.16683 9L9.12516 11.9583Z" fill="#06A9EF" />
                                            </svg>
                                            <p className='text-[16px] font-[500]'>{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}





                    </div>

                    <div className='flex flex-col gap-6  w-[100%] pl-4'>
                        <div className='text-[20px] font-[600]'> Account Details</div>
                        <div className='flex  gap-12 w-[100%] '>
                            <div className='flex flex-col gap-6 min-w-[30%] '>
                                <div className='flex  gap-4'>
                                    <div className='flex  gap-4 font-[700] justify-between w-[40%]'>

                                        <p>User Name </p>
                                        <div>:</div>

                                    </div>
                                    <div className='text-[16px] font-[500]'>
                                        Prathamesh Jadhav
                                    </div>
                                </div>
                                <div className='flex  gap-4'>
                                    <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                        <p >User ID</p>
                                        <div >:</div>

                                    </div>
                                    <div className='text-[16px] font-[500] '>
                                        01
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                        <p>Activated on </p>
                                        <div>:</div>

                                    </div>
                                    <div className='text-[16px] font-[500]'>
                                        20 February 2024
                                    </div>
                                </div>

                            </div>
                            <div className='bg-[#DEDEDE] w-[1px] h-[120px]'>
                            </div>
                            <div className='flex flex-col gap-6 min-w-[30%] '>
                                <div className='flex  gap-4'>
                                    <div className='flex  gap-4 font-[700] justify-between w-[40%]'>

                                        <p>User Name </p>
                                        <div>:</div>

                                    </div>
                                    <div className='text-[16px] font-[500]'>
                                        Prathamesh Jadhav
                                    </div>
                                </div>
                                <div className='flex  gap-4'>
                                    <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                        <p >User ID</p>
                                        <div >:</div>

                                    </div>
                                    <div className='text-[16px] font-[500] '>
                                        01
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex  gap-4 justify-between font-[700] w-[40%]'>

                                        <p>Activated on </p>
                                        <div>:</div>

                                    </div>
                                    <div className='text-[16px] font-[500]'>
                                        20 February 2024
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className='bg-[#DEDEDE] w-[100%] h-[1px]'></div>
                    <div className='flex flex-col gap-4'>
                        <div className='font-[600] text-[24px]'>Our Popular Subscription Plan</div>


                        <SubscriptionPlans />
                    </div>


                </div>
            </div>

        </div>
    )
}

export default MyPurchase
