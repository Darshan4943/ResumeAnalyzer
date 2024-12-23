import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ALink from '../../alink';



function EmployerSidebar() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('');

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const dataArray = [
    {
      img: '/images/employer/sidebar/home.png',
      title: 'Home',
      route: '/employer/EmployerHome',
    },
    {
      img: '/images/employer/sidebar/requisition.png',
      title: 'Requisition',
      route: '/employer/Requisition',
    },
    {
      img: '/images/employer/sidebar/jobPosting.png',
      title: 'Job Posting',
      route: '/employer/JobPosting',
    },
    {
      img: '/images/employer/sidebar/hiring.png',
      title: 'Hiring',
      route: '/employer/Hiring',
    },
    {
      img: '/images/employer/sidebar/preboarding.png',
      title: 'Preboarding',
      route: '/employer/Preboarding',
    },
    {
      img: '/images/employer/sidebar/bulkUploads.png',
      title: 'Bulk Uploads',
      route: '/employer/BulkUploads',
    },
  ];

  return (
    <div className="flex flex-col h-[100vh] bg-blue w-[120px] pt-[70px] overflow-hidden">
      {dataArray.map((item, index) => (
        <ALink href={item.route} key={index}>
          <div
            className={`flex flex-col gap-2 px-2 py-4 justify-center items-center ${
              selectedPage === item.route ? 'border-l-[4px] pl-1 border-[#FFDA1D] bg-[#57697B]' : '' 
            }`}
          >
            <img src={item.img} alt="" className="w-[32px] h-[32px]" />
            <div className="text-center text-[12px] font-semibold text-white">{item.title}</div>
          </div>
        </ALink>
      ))}
    </div>
  );
}

export default EmployerSidebar;
