import React from 'react';

function Index() {
  const topCompanyData = [
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
    {
      logo: "/images/candidate/image 5.png",
      companyNm: "Aven",
      ratings: "3.6",
      reviews: "786",
      description: "IT Services & Consulting",
    },
  ]
  return (
    <>
      <div className='customMargins  w-full flex flex-col gap-5 pt-6 pb-6'>
        <span className='text-[18px] font-[500] text-[#000000]'>Top Companies</span>
        <div className='flex gap-6 w-full'>
          <div className='flex w-full justify-between gap-y-5 flex-wrap'>
            {topCompanyData.map((company, index) => (
              <div
                key={index}
                className="w-full lg:w-[49.05%] min-w-[268px] rounded-[10px] bg-[#FFFFFF] py-3 px-4 flex gap-[14px]"
              >
                <img
                  src={company.logo}
                  alt={`${company.companyNm} logo`}
                  className="h-[56px] w-[56px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] object-contain"
                />
                <div className="flex flex-col gap-[6px]">
                  <span className="text-[14px] font-[500] text-[#333333]">
                    {company.companyNm}
                  </span>
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0.5L8.5716 5.33688H13.6574L9.5429 8.32624L11.1145 13.1631L7 10.1738L2.8855 13.1631L4.4571 8.32624L0.342604 5.33688H5.4284L7 0.5Z"
                        fill="#F4D224"
                      />
                    </svg>
                    <span className="flex items-center text-[12px] font-[500] text-[#A1A1A1]">
                      {company.ratings}
                    </span>
                    <div className="flex items-center w-[1px] h-[12px] bg-[#C5C5C5]"></div>
                    <span className="flex items-center text-[12px] font-[500] text-[#A1A1A1]">
                      {company.reviews} Reviews
                    </span>
                  </div>
                  <div className="py-[2px] px-[6px] border-[0.5px] border-solid border-[#DEDEDE] text-[10px] font-[400] text-[#333333] rounded-[12px]">
                    {company.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='hidden scr700:block min-w-[357px] h-[256px] bg-[#D9D9D9]'></div>
        </div>
      </div>
    </>
  );
}
export default Index;
