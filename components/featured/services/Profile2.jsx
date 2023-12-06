import React from 'react'

function Profile2() {
    return (
        <div className="bg-[#E0F6FF] py-[24px]">
            <div className="customMargins">
                <div class="grid grid-cols-1 ">
                    <div class="flex flex-row w-full pt-[8px] pb-[8px] pl-[16px] pr-[16px] items-start gap-2 rounded-lg bg-white shadow-md">
                        <div class="relative flex p-2 md:p-4 items-center gap-5 md:gap-20 rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="120"
                                height="120"
                                viewBox="0 0 120 120"
                                fill="none"
                            >
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="59.2905"
                                    stroke="#646464"
                                    stroke-width="1.419"
                                />
                            </svg>
                            <div class="absolute left-[24px] bottom-[23px] w-[105px] h-[105px] rounded-full">
                                <img src="./images/profile/john_doe.png" alt="" />
                            </div>
                        </div>

                        <div class="flex flex-col items-start gap-2 flex-1">
                            <div class="flex pb-2 items-start gap-2 self-stretch border-b border-gray-400">
                                <div class="flex items-start gap-[8px]">
                                    <div class="flex flex-col items-start">
                                        <p class="text-[#333]  font-montserrat font-medium text-2xl">
                                            John Doe
                                        </p>
                                        <p class="text-[#646464] font-montserrat text-xs font-normal">
                                            Last updated 1 m ago
                                        </p>
                                    </div>
                                    <div class="w-[24px]">
                                        <img src="./images/profile/edit.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex flex-col justify-center items-start gap-[10px] flex-grow flex-shrink-0 flex-basis-0 w-[80%]">
                                    <div class="flex items-center gap-[5px]">
                                        <img
                                            class="w-[20px] h-[20px]"
                                            src="./images/profile/location_on_john.png"
                                            alt=""
                                        />
                                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                                            Pune, Maharashtra, India
                                        </p>
                                    </div>
                                    <div class="flex items-center gap-[5px]">
                                        <img
                                            class="w-[20px] h-[20px]"
                                            src="./images/profile/business_center.png"
                                            alt=""
                                        />
                                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                                            4 Years
                                        </p>
                                    </div>
                                    <div class="flex items-center gap-[5px]">
                                        <img
                                            class="w-[20px] h-[20px]"
                                            src="./images/profile/call.png"
                                            alt=""
                                        />
                                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                                            87661234567
                                        </p>
                                    </div>
                                </div>
                                <div class="flex px-[16px] py-[0px] flex-col justify-center items-start gap-[10px] flex-1 self-stretch border-l border-[#646464]">
                                    <div class="flex items-center gap-[5px]">
                                        <img
                                            class="w-[20px] h-[20px]"
                                            src="./images/profile/school.png"
                                            alt=""
                                        />
                                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                                            BSc Computer Science
                                        </p>
                                    </div>
                                    <div class="flex items-center gap-[5px]">
                                        <img
                                            class="w-[20px] h-[20px]"
                                            src="./images/profile/mail_john.png"
                                            alt=""
                                        />
                                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                                            kshitijwaghmare111@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 items-center justify-center rounded-[8px] p-2' style={{
                            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)'
                        }}>
                            <div className='text-[50px] font-Montserrat text-[#263751] font-semibold px-9'>
                                4.9
                            </div>
                            <div className='flex px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2151 22.5001L10.0422 25.1842C9.42306 25.5054 8.65729 25.2705 8.33179 24.6594C8.20218 24.4161 8.15745 24.1374 8.20453 23.8664L9.19248 18.1814L5.00747 14.1553C4.50659 13.6734 4.49634 12.882 4.98458 12.3876C5.179 12.1908 5.43376 12.0627 5.7094 12.0231L11.4929 11.1937L14.0794 6.02129C14.389 5.40222 15.1484 5.14805 15.7757 5.45358C16.0254 5.57524 16.2276 5.77477 16.3509 6.02129L18.9374 11.1937L24.7209 12.0231C25.4131 12.1224 25.8927 12.7567 25.7921 13.4399C25.7521 13.7119 25.6223 13.9634 25.4228 14.1553L21.2378 18.1814L22.2257 23.8664C22.344 24.5469 21.881 25.1931 21.1916 25.3098C20.917 25.3562 20.6346 25.3121 20.3881 25.1842L15.2151 22.5001Z" fill="#FFDA1D" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2151 22.5001L10.0422 25.1842C9.42306 25.5054 8.65729 25.2705 8.33179 24.6594C8.20218 24.4161 8.15745 24.1374 8.20453 23.8664L9.19248 18.1814L5.00747 14.1553C4.50659 13.6734 4.49634 12.882 4.98458 12.3876C5.179 12.1908 5.43376 12.0627 5.7094 12.0231L11.4929 11.1937L14.0794 6.02129C14.389 5.40222 15.1484 5.14805 15.7757 5.45358C16.0254 5.57524 16.2276 5.77477 16.3509 6.02129L18.9374 11.1937L24.7209 12.0231C25.4131 12.1224 25.8927 12.7567 25.7921 13.4399C25.7521 13.7119 25.6223 13.9634 25.4228 14.1553L21.2378 18.1814L22.2257 23.8664C22.344 24.5469 21.881 25.1931 21.1916 25.3098C20.917 25.3562 20.6346 25.3121 20.3881 25.1842L15.2151 22.5001Z" fill="#FFDA1D" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2151 22.5001L10.0422 25.1842C9.42306 25.5054 8.65729 25.2705 8.33179 24.6594C8.20218 24.4161 8.15745 24.1374 8.20453 23.8664L9.19248 18.1814L5.00747 14.1553C4.50659 13.6734 4.49634 12.882 4.98458 12.3876C5.179 12.1908 5.43376 12.0627 5.7094 12.0231L11.4929 11.1937L14.0794 6.02129C14.389 5.40222 15.1484 5.14805 15.7757 5.45358C16.0254 5.57524 16.2276 5.77477 16.3509 6.02129L18.9374 11.1937L24.7209 12.0231C25.4131 12.1224 25.8927 12.7567 25.7921 13.4399C25.7521 13.7119 25.6223 13.9634 25.4228 14.1553L21.2378 18.1814L22.2257 23.8664C22.344 24.5469 21.881 25.1931 21.1916 25.3098C20.917 25.3562 20.6346 25.3121 20.3881 25.1842L15.2151 22.5001Z" fill="#FFDA1D" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2151 22.5001L10.0422 25.1842C9.42306 25.5054 8.65729 25.2705 8.33179 24.6594C8.20218 24.4161 8.15745 24.1374 8.20453 23.8664L9.19248 18.1814L5.00747 14.1553C4.50659 13.6734 4.49634 12.882 4.98458 12.3876C5.179 12.1908 5.43376 12.0627 5.7094 12.0231L11.4929 11.1937L14.0794 6.02129C14.389 5.40222 15.1484 5.14805 15.7757 5.45358C16.0254 5.57524 16.2276 5.77477 16.3509 6.02129L18.9374 11.1937L24.7209 12.0231C25.4131 12.1224 25.8927 12.7567 25.7921 13.4399C25.7521 13.7119 25.6223 13.9634 25.4228 14.1553L21.2378 18.1814L22.2257 23.8664C22.344 24.5469 21.881 25.1931 21.1916 25.3098C20.917 25.3562 20.6346 25.3121 20.3881 25.1842L15.2151 22.5001Z" fill="#FFDA1D" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M15.8008 22.5001L15.8008 22.5001L20.9738 25.1842C21.2203 25.3121 21.5027 25.3562 21.7773 25.3098C22.4667 25.1931 22.9297 24.5469 22.8115 23.8664L21.8235 18.1814L26.0085 14.1553C26.208 13.9634 26.3378 13.7119 26.3778 13.4399C26.4784 12.7567 25.9988 12.1224 25.3066 12.0231L19.5231 11.1937L16.9366 6.02129C16.8133 5.77477 16.6111 5.57524 16.3614 5.45358C16.1808 5.36564 15.9893 5.32407 15.8008 5.32422V22.5001Z" fill="#FFDA1D" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.801 5.32422C15.3344 5.32459 14.8858 5.58041 14.6653 6.02129L12.0789 11.1937L6.29534 12.0231C6.01969 12.0627 5.76494 12.1908 5.57052 12.3876C5.08228 12.882 5.09252 13.6734 5.59341 14.1553L9.77842 18.1814L8.79047 23.8664C8.74339 24.1374 8.78811 24.4161 8.91773 24.6594C9.24322 25.2705 10.009 25.5054 10.6281 25.1842L15.801 22.5001V5.32422Z" fill="#FFDA1D" />
                                </svg>
                            </div>
                            <div className='text-[14px] font-Montserrat text-[#5B5B5B] font-semibold '>
                                10 quiz completed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile2
