import React from 'react';

function TrustedBy() {
    const categories = [
        { img: "/images/withoutLogin/trusted1.png" },
        { img: "/images/withoutLogin/trusted2.png" },
        { img: "/images/withoutLogin/trusted3.png" },
        { img: "/images/withoutLogin/trusted4.png" },
        { img: "/images/withoutLogin/trusted5.png" },
        { img: "/images/withoutLogin/trusted1.png" },
        { img: "/images/withoutLogin/trusted2.png" },
        { img: "/images/withoutLogin/trusted3.png" },
        { img: "/images/withoutLogin/trusted4.png" },
        { img: "/images/withoutLogin/trusted5.png" },
    ];

    return (
        <div className='flex flex-col gap-9 h-[206px] bg-[#F2FBFF] py-[46px] items-center overflow-hidden'>
            <p className='text-[24px] font-[600] text-center leading-tight'>
                Trusted by...
            </p>
            <div className='relative  overflow-hidden  max-w-[1440px] flex justify-center'>
                <div className='trusted-images flex gap-[120px] animate-slide '>
                    {categories.map((category, index) => (
                        <div key={index} className="flex-shrink-0">
                            <img src={category.img} alt={`trusted-${index}`} className="h-[48px] w-auto" />
                        </div>
                    ))}

                  
                    
                    
                </div>
            </div>
        </div>
    );
}

export default TrustedBy;
