
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import ALink from '../../alink';

function EmployerMobileHeader({ selectedPage, setIsSidebar, setIsLogin, isLogin }) {



    const loginList = [
        {
            img: '/images/employer/sidebar/home.png',
            img2: '/images/employer/sidebar/home2.png',
            title: 'Home',
            route: '/employer/afterLogin/EmployerHome',
        },
        {
            img: '/images/employer/sidebar/requisition.png',
            img2: '/images/employer/sidebar/requisition2.png',
            title: 'Requisition',
            route: '/employer/afterLogin/Requisition',
        },
        {
            img: '/images/employer/sidebar/jobPosting.png',
            img2: '/images/employer/sidebar/jobPosting2.png',
            title: 'Job Posting',
            route: '/employer/afterLogin/JobPosting',
        },
        {
            img: '/images/employer/sidebar/hiring.png',
            img2: '/images/employer/sidebar/hiring2.png',
            title: 'Hiring',
            route: '/employer/afterLogin/Hiring',
        },
        {
            img: '/images/employer/sidebar/preboarding.png',
            img2: '/images/employer/sidebar/preboarding2.png',
            title: 'Preboarding',
            route: '/employer/afterLogin/Preboarding',
        },
        {
            img: '/images/employer/sidebar/bulkUploads.png',
            img2: '/images/employer/sidebar/bulkUploads2.png',
            title: 'Bulk Uploads',
            route: '/employer/afterLogin/BulkUploads',
        },
    ];

    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    const handleNavigation = (page) => {
        setIsSidebar(false);
        router.push(page);
    };

    const getListItemStyles = (page) => {
        const isSelected = selectedPage === page;

        const backgroundColor = isSelected ? 'rgba(6, 169, 239, 0.50)' : 'rgba(255, 255, 255, 0.50)';
        const textColor = isSelected ? '#FFF' : '#000';

        return {
            backgroundColor,
            color: textColor,
            cursor: 'pointer',
        };
    };

    const handleLogOut = () => {
        router.push("/");
        setIsLogin(false);
        localStorage.clear();
    };

    return (
        <div className=' h-[10000px] flex flex-col  pt-[3.5rem]  bg-cover bg-no-repeat w-screen  relative  ' >
            <div className='sticky top-0'>
                <div className='flex justify-between px-4 mt-3 py-2 '>
                    <div onClick={() => router.push("/employer/afterLogin/EmployerHome")}>
                        <img src="/images/logo_skilotech.png" alt="" className="w-[123px] h-[40px] object-contain" />
                    </div>
                    <div className='' onClick={() => { setIsSidebar(false), window.scroll(0, 0) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">

                            <g mask="url(#mask0_5925_108792)">
                                <path d="M8 23.75L6.25 22L13.25 15L6.25 8L8 6.25L15 13.25L22 6.25L23.75 8L16.75 15L23.75 22L22 23.75L15 16.75L8 23.75Z" fill="#1C1B1F" />
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col  overflow-hidden">

                    <div
                         onClick={() => router.push("/employer/afterLogin/Profile")}
                        className='flex gap-4 p-4 items-center '>
                        <img
                            className="max-w-[44px] max-h-[44px] w-[100vw] h-[100vh] rounded-full object-cover p-1"

                            src={
                                userDataGlobal?.profilePicture?.img
                                    ? userDataGlobal?.profilePicture?.img
                                    : "/images/profile/profileNew.png"
                            }
                            alt=""
                        />
                        <div className='text-[20px] font-semibold'>
                            {userDataGlobal?.basics?.firstName ?
                                <>
                                    {userDataGlobal?.basics?.firstName}{" "}
                                    {userDataGlobal?.basics?.lastName}
                                </>
                                : "John Doe"
                            }
                        </div>
                    </div>
                    {loginList.map((item, index) => (
                        <ALink href={item.route} key={index}>
                            <div
                                className={`flex gap-5 px-4 py-5 items-center ${selectedPage === item.route ? 'border-l-[4px] pl-3 border-[#FFDA1D] border-b-[2px] border-b-[#06A9EF] bg-[#57697B] ' : 'border-b-[2px] border-[#06A9EF]'
                                    }`}
                            >
                                <img src={selectedPage === item.route ? item.img : item.img2} alt="" className={`w-[44px] h-[44px] `} />
                                <div className={`text-center text-[20px] font-semibold ${selectedPage === item.route ? 'text-white' : ''
                                    }`}>{item.title}</div>
                            </div>
                        </ALink>
                    ))}

                    <div onClick={() => handleLogOut()} className='   text-[#C00000] text-[20px] font-semibold flex gap-5 px-4 py-5 items-center'  >
                    <img src={"/images/employer/sidebar/logOut.png"} alt="" className={`w-[44px] h-[44px] `} />
                        Log Out
                    </div>
              
            </div>

        </div>
        </div >
    );
}

export default EmployerMobileHeader;
