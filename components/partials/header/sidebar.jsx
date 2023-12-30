import React from 'react';

function Sidebar() {
  const dataArray = [
    {
      img: '/imagess/employer/sidebar/home.png',
      title: 'Home',
    },
    {
      img: '/imagess/employer/sidebar/requisition.png',
      title: 'Requisition',
    },
    {
      img: '/imagess/employer/sidebar/jobPosting.png',
      title: 'Job Posting',
    },
    {
      img: '/imagess/employer/sidebar/hiring.png',
      title: 'Hiring',
    },
    {
      img: '/imagess/employer/sidebar/preboarding.png',
      title: 'Preboarding',
    },
  ];

  return (
    <div className='flex flex-col h-[100vh] bg-blue w-[120px] pt-[70px]'>
     
      {dataArray.map((item, index) => (
        <div key={index} className=' flex flex-col gap-2 px-2 py-4 justify-center items-center '>
          <img src={item.img} alt="" className='w-[32px] h-[32px]  ' />
          <div className='text-center text-[12px] font-semibold text-white'>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
