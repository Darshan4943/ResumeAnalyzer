import React from 'react';

function JobCategories() {
    const categories = [
        { img: "/images/withoutLogin/cat1.png", label: "MNC" },
        { img: "/images/withoutLogin/cat2.png", label: "Sales" },
        { img: "/images/withoutLogin/cat3.png", label: "Marketing" },
        { img: "/images/withoutLogin/cat4.png", label: "Engineering" },
        { img: "/images/withoutLogin/cat5.png", label: "Supply Chain" },
        { img: "/images/withoutLogin/cat6.png", label: "Fresher" },
        { img: "/images/withoutLogin/cat7.png", label: "Banking and Finance" },
        { img: "/images/withoutLogin/cat8.png", label: "Startup" },
        { img: "/images/withoutLogin/cat9.png", label: "Remote" },
        { img: "/images/withoutLogin/cat10.png", label: "Project Manager" },
        { img: "/images/withoutLogin/cat11.png", label: "HR" },
        { img: "/images/withoutLogin/cat12.png", label: "Design" },
    ];

    return (
        <div className='flex flex-col gap-6 customMargins'>
            <div className='flex flex-col gap-3 text-center'>
                <p className='text-[24px] font-bold'>Popular Job Categories</p>
                <p className='text-[14px] font-medium text-[#705E5E]'>
                    Discover exciting career opportunities in popular fields, from technology to healthcare,<br />
                    finance to marketing, and more.
                </p>
            </div>
            <div className='flex flex-wrap gap-6 justify-center'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        style={{ boxShadow: "0px 3px 8px 0px #C9C8C840" }}
                     
                   

                        className='py-2 px-[10px] flex gap-[6px] border-[0.5px] border-[#DBDBDB] rounded-[6px] items-center'
                    >
                        <img
                            src={category.img}
                            alt={category.label}
                            className="h-[34px] w-[30px] object-cover"
                        />
                        <span className='text-[14px] font-[600]'>{category.label}</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g mask="url(#mask0_6043_3945)">
                                <path
                                    d="M12.9458 12.0005L8.87252 7.9275C8.73419 7.789 8.66336 7.61492 8.66002 7.40525C8.65686 7.19575 8.72769 7.0185 8.87252 6.8735C9.01752 6.72867 9.19319 6.65625 9.39952 6.65625C9.60586 6.65625 9.78152 6.72867 9.92652 6.8735L14.4208 11.3678C14.5143 11.4614 14.5803 11.5602 14.6188 11.664C14.6573 11.7678 14.6765 11.88 14.6765 12.0005C14.6765 12.121 14.6573 12.2332 14.6188 12.337C14.5803 12.4408 14.5143 12.5396 14.4208 12.6333L9.92652 17.1275C9.78802 17.2658 9.61394 17.3367 9.40427 17.34C9.19477 17.3432 9.01752 17.2723 8.87252 17.1275C8.72769 16.9825 8.65527 16.8068 8.65527 16.6005C8.65527 16.3942 8.72769 16.2185 8.87252 16.0735L12.9458 12.0005Z"
                                    fill="#333333"
                                />
                            </g>
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobCategories;
