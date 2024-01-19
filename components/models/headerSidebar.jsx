import { ClosedIcon } from '@/utils/svg';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function HeaderSidebar({ selectedPage, setIsSidebar, setIsLogin, isLogin }) {
    const list = ["Home", "Candidate", "Employer", "Recruiter"];
    const loginList = ["Home", "Jobs", "Services"]
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
        <div className=' h-[10000px] flex flex-col  pt-[3.5rem] relative ' >
            <div className='sticky top-0'>
                <div className='flex justify-between px-4 mt-3 py-2 '>
                    <div onClick={() => router.push("/candidate/afterLogin/home/candidateHome")}>
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
                {!isLogin ?
                    <div className='flex flex-col' style={{ listStyle: 'none' }}>


                        {list.map((item, index) => (
                            <li
                                key={index}
                                className='px-4 py-7 border-b-2 border-[#06A9EF]'
                                style={{
                                    ...getListItemStyles(`/${item.toLowerCase()}`),
                                    ...(item === 'Home' && getListItemStyles('/')),
                                }}

                                onClick={() => item === 'Home' ? handleNavigation('/') : handleNavigation(`/${item.toLowerCase()}`)}
                            >
                                {item}
                            </li>
                        ))}
                    </div>
                    :
                    <div className='flex flex-col' style={{ listStyle: 'none' }}>
                        <div onClick={() => router.push("/profile")} className='flex gap-4 p-4 items-center '>
                            <img
                                className="max-w-[44px] max-h-[44px] w-[100vw] h-[100vh] rounded-full object-cover p-1"

                                src={
                                    userDataGlobal?.profilePicture?.img
                                        ? userDataGlobal?.profilePicture?.img
                                        : "/images/profile/profileNew.png"
                                }
                                alt=""
                            />
                            <div className='text-[20px] font-medium'>
                                {userDataGlobal?.basics?.firstName}{" "}
                                {userDataGlobal?.basics?.lastName}
                            </div>
                        </div>
                        {loginList.map((item, index) => (
                            <li
                                key={index}
                                className='px-4 py-7 border-b-2 border-[#06A9EF]'
                                style={{
                                    ...getListItemStyles(`/candidate/afterLogin/${item.toLowerCase()}/${item.toLowerCase()}`),
                                    ...(item === 'Home' && getListItemStyles('/candidate/afterLogin/home/candidateHome')),
                                }}

                                onClick={() => item === 'Home' ? handleNavigation('/candidate/afterLogin/home/candidateHome') : handleNavigation(`/candidate/afterLogin/${item.toLowerCase()}/${item.toLowerCase()}`)}
                            >
                                {item}
                            </li>
                        ))}
                        <div onClick={() => handleLogOut()} className='px-4 py-7 border-b-2 border-[#06A9EF] bg-backgroundColor text-[#C00000]'  >
                            Log Out
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default HeaderSidebar;
