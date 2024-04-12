import React from 'react'

function searchBar() {
    return (
        <div>
        <div className="candidate_searchbox">

            <div className="mt-8 flex justify-between z-10 gap-5 px-6 py-4 items-center rounded-[16px] bg-white shadow-xl min-h-[93.33px] relative mb-11 max-scr1100:gap-2 max-scr1024:gap-1 max-scr1024:max-w-[600px] 
                                        xl:min-w-[840px] scr1400:max-w-[840px]   scr1350:max-w-[800px]  scr1300:max-w-[770px]  scr1250:max-w-[770px]   scr1200:max-w-[735px] scr1150:max-w-[700px] scr1100:max-w-[680px] scr1024:max-w-[600px] ">
                <div className="flex items-center justify-between ">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18%"
                        height="18%"
                        viewBox="0 0 42 42"
                        fill="none"
                    >
                        <path
                            d="M27.125 27.125L33.25 33.25L27.125 27.125ZM8.75 19.25C8.75 20.6289 9.02159 21.9943 9.54926 23.2682C10.0769 24.5421 10.8504 25.6996 11.8254 26.6746C12.8004 27.6496 13.9579 28.4231 15.2318 28.9507C16.5057 29.4784 17.8711 29.75 19.25 29.75C20.6289 29.75 21.9943 29.4784 23.2682 28.9507C24.5421 28.4231 25.6996 27.6496 26.6746 26.6746C27.6496 25.6996 28.4231 24.5421 28.9507 23.2682C29.4784 21.9943 29.75 20.6289 29.75 19.25C29.75 16.4652 28.6438 13.7945 26.6746 11.8254C24.7055 9.85625 22.0348 8.75 19.25 8.75C16.4652 8.75 13.7945 9.85625 11.8254 11.8254C9.85625 13.7945 8.75 16.4652 8.75 19.25V19.25Z"
                            stroke="#333333"
                            strokeWidth="3.1544"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <div>
                        <input
                            type="text"
                            className="text-gray font-small text-[20px] max-scr1400:text-[18px] max-scr1350:text-[17px] max-scr1300:text-[16px] max-scr1250:text-[15px] max-scr1200:text-[15px] max-scr1150:text-[15px] max-scr1100:text-[15px]  max-scr1050:text-[15px]  placeholder-center text-center"
                            placeholder="Job title or keyword"
                        />

                    </div>
                </div>

                <img className="w-[3.154px] " src="/images/home/searcgBarLine.png" alt="" />
                <div className="flex items-center gap-4 max-scr1100:gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12%"
                        height="12%"
                        viewBox="0 0 35 34"
                        fill="none"
                    >
                        <path
                            d="M28.3919 14.1666C28.3919 20.4255 17.0586 31.1666 17.0586 31.1666C17.0586 31.1666 5.72522 20.4255 5.72522 14.1666C5.72522 11.1609 6.91926 8.27818 9.04468 6.15277C11.1701 4.02736 14.0528 2.83331 17.0586 2.83331C20.0643 2.83331 22.947 4.02736 25.0724 6.15277C27.1978 8.27818 28.3919 11.1609 28.3919 14.1666V14.1666Z"
                            stroke="#333333"
                            strokeWidth="3.1544"
                        />
                        <path
                            d="M17.0588 15.5833C17.4345 15.5833 17.7948 15.4341 18.0605 15.1684C18.3262 14.9027 18.4754 14.5424 18.4754 14.1667C18.4754 13.7909 18.3262 13.4306 18.0605 13.1649C17.7948 12.8993 17.4345 12.75 17.0588 12.75C16.683 12.75 16.3227 12.8993 16.057 13.1649C15.7913 13.4306 15.6421 13.7909 15.6421 14.1667C15.6421 14.5424 15.7913 14.9027 16.057 15.1684C16.3227 15.4341 16.683 15.5833 17.0588 15.5833Z"
                            fill="white"
                            stroke="#333333"
                            strokeWidth="3.1544"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="text-gray font-small text-[18px] max-scr1400:text-[16px]  max-scr1350:text-[15px] max-scr1100:text-[14px]">Colney, United Kingdom</p>
                </div>
                <button className="flex items-center justify-center py-4 px-12 border border-primary bg-blue text-white rounded-[12px] max-scr1200:px-8 max-scr1100:px-6">Search</button>
            </div>
        </div>
        </div>
    )
}

export default searchBar
