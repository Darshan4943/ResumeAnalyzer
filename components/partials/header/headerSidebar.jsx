
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function HeaderSidebar({ selectedPage, setIsSidebar, setIsLogin, isLogin }) {
    // const list = ["Home", "My Purchase", "Employer", "Recruiter"];
    const loginList = ["Home", "My Collection", "Transform for Job Description", "Skill Test","My Purchase"]
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    console.log(11, userDataGlobal)
    const handleNavigation = (page) => {
        setIsSidebar(false);
        router.push(page);
    };

    const getListItemStyles = (page) => {
        const isSelected = selectedPage === page;

        const backgroundColor = isSelected ? 'rgba(6, 169, 239, 0.50)' : 'rgba(255, 255, 255, 0.50)';
        const textColor = isSelected ? '#FFF' : '#000';
        const fontSize=isSelected ? "20px": "18px"
        const fontWeight= isSelected ? "600" : "500"
        return {
            backgroundColor,
            color: textColor,
            cursor: 'pointer',
            fontSize,
            fontWeight
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
                    <div onClick={() => router.push("/home/BeforeLoginHome")}>
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

                <div className='flex flex-col' style={{ listStyle: 'none' }}>
                    <div className='flex gap-4 p-4 items-center '>
                        {userDataGlobal?.profilePicture ? (
                            <img
                                className=" rounded-full object-cover h-[40px] w-[40px]"
                                src={
                                    userDataGlobal?.profilePicture?.img ||
                                    "/images/profile/profileNew.png"
                                }
                            />
                        ) : (
                            <div
                                className="rounded-[40px] h-[40px] w-[40px] bg-[#06A9EF] flex items-center justify-center text-white font-semibold text-[20px] "
                                style={{ textTransform: "capitalize" }}
                                alt=""
                            >
                                {userDataGlobal?.email?.slice(0, 1)}
                            </div>
                        )}
                        <div className='text-[20px] font-medium'>
                            {userDataGlobal?.name}

                        </div>
                    </div>
                    {loginList.map((item, index) => (
                        <li
                            key={index}
                            className='px-4 py-7 border-b-2 border-[#06A9EF] '
                            style={{
                           
                                ...(item === 'Home' && getListItemStyles('/home/BeforeLoginHome')),
                                ...(item === 'My Purchase' && getListItemStyles('/myPurchase/MyPurchase')),
                                ...(item === 'My Collection' && getListItemStyles('/home/MyCollection')),
                                ...(item === 'Transform for Job Description' && getListItemStyles('/transform/TransformJob')),
                                ...(item === 'Skill Test' && getListItemStyles('/home/SkillAssessment')),
                            }}

                            onClick={() => {
                                switch (item) {
                                    case 'Home':
                                        handleNavigation('/home/BeforeLoginHome');
                                        break;
                                    case 'My Purchase':
                                        handleNavigation('/myPurchase/MyPurchase');
                                        break;
                                    case 'My Collection':
                                        handleNavigation('/home/MyCollection');
                                        break;
                                    case 'Transform for Job Description':
                                        handleNavigation('/transform/TransformJob');
                                        break;
                                    case 'Skill Test':
                                        handleNavigation('/home/SkillAssessment');
                                        break;
                                    default:
                                        break;
                                }
                            }}                            >
                            {item}
                        </li>
                    ))}
                    <div onClick={() => handleLogOut()} className='px-4 py-7 border-b-2 border-[#06A9EF] bg-backgroundColor text-[18px] font-medium text-[#C00000]'  >
                        Log Out
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeaderSidebar;
