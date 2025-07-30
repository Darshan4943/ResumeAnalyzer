import React from 'react';
import { Close_svg } from '../../utils/svg';

function LinkedinPopUp({ setLinkedinPopUp }) {
    return (
        <div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className='bg-white rounded-[12px] p-4 flex flex-col gap-4 items-center w-[372px] relative '>
                    <div className=' absolute right-4 top-4'>
                        <svg onClick={() => setLinkedinPopUp(false)} className=' cursor-pointer' width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g mask="url(#mask0_11308_135644)">
                                <path d="M4.71874 14.1668L3.84375 13.2918L8.13126 9.00429L3.84375 4.71678L4.71874 3.8418L9.00624 8.1293L13.2938 3.8418L14.1687 4.71678L9.88123 9.00429L14.1687 13.2918L13.2938 14.1668L9.00624 9.87928L4.71874 14.1668Z" fill="#333333" />
                            </g>
                        </svg>

                    </div>

                    <img
                        src="/images/connectLinkedin.png"
                        className="h-[153px] w-[200px] object-cover"
                        alt=""

                    />
                    <p className='text-[16px] font-medium text-center'>Connect with us on LinkedIn to explore exclusive job opportunities</p>
                    <button
                        className="w-fit bg_Button px-6 h-[38px] flex justify-center items-center rounded-[30px]"
                        onClick={() => { localStorage.setItem("linkedinConnect", true);setLinkedinPopUp(false); window.open('https://www.linkedin.com/company/skilotech', '_blank') }}
                    >
                        Connect Now
                    </button>


                </div>
            </div>

        </div>
    );
}

export default LinkedinPopUp;
