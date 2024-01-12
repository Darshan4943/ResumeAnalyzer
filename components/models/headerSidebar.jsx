import { ClosedIcon } from '@/utils/svg';
import { useRouter } from 'next/router';
import React from 'react';

function HeaderSidebar({ selectedPage, setIsSidebar }) {
    const list = ["Home", "Candidate", "Employer", "Recruiter"];
    const router = useRouter();

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

    return (
        <div className=' h-[800px] flex flex-col gap-3' >
            <div className='flex justify-between px-4 mt-3'>
                <img src="/images/logo_skilotech.png" alt="" className="w-[123px] h-[40px] object-contain" />
                <div className='' onClick={() => setIsSidebar(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">

                        <g mask="url(#mask0_5925_108792)">
                            <path d="M8 23.75L6.25 22L13.25 15L6.25 8L8 6.25L15 13.25L22 6.25L23.75 8L16.75 15L23.75 22L22 23.75L15 16.75L8 23.75Z" fill="#1C1B1F" />
                        </g>
                    </svg>
                </div>
            </div>

            <div className='flex flex-col' style={{ listStyle: 'none' }}>
                {list.map((item, index) => (
                    <li
                        key={index}
                        className='px-4 py-4 border-b-2 border-[#06A9EF]'
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
        </div>
    );
}

export default HeaderSidebar;
