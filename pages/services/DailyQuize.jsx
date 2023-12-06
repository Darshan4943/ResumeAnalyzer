import React, { useState } from "react";
import Profile2 from "~/components/featured/services/Profile2";

const DailyQuiz = () => {

    const [toggle, setToggle] = useState(0)

    return (
        <div className="bg-[#F9F9F9]">
            <div>
                <Profile2 />
            </div>

            <div class="my-8 flex items-center justify-center gap-[30px] flex-col ">
                <div className="flex flex-row items-center gap-[24px]">
                    <div className="bg-[#06A9EF] w-[264px] h-[3px]"></div>
                    <div className="bg-[#06A9EF] rounded-[16px] py-[12px] px-[60px] flex flex-col gap-[12px]">
                        <div className="text-[24px] font-[600] text-[#fff]">
                            Welcome to the Daily Quiz Challenge!
                        </div>
                        <div className="text-[18px] flex justify-center items-center text-[#fff] font-[500]">
                            Test your Knowledge Daily{" "}
                        </div>
                    </div>
                    <div className="bg-[#06A9EF] w-[264px] h-[3px]"></div>
                </div>

                {toggle === 0 &&
                    <div className="flex flex-col justify-center gap-9 items-center" >
                        <div class="w-[1128px] h-[174px] bg-[#005A81] rounded-2xl	flex flex-row justify-between py-[24px] px-[60px]">
                            <div class="flex flex-col items-center gap-[8px]  text-center ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_4275_58287)">
                                        <path
                                            d="M26.6875 35.279C25.725 35.279 24.9034 34.9392 24.2226 34.2597C23.5418 33.5803 23.2014 32.7602 23.2014 31.7995V25.1461C23.2014 24.1896 23.5418 23.3706 24.2226 22.689C24.9034 22.0074 25.725 21.6666 26.6875 21.6666H33.3343C34.2968 21.6666 35.1184 22.0074 35.7992 22.689C36.48 23.3706 36.8204 24.1896 36.8204 25.1461V31.7995C36.8204 32.7602 36.48 33.5803 35.7992 34.2597C35.1184 34.9392 34.2968 35.279 33.3343 35.279H26.6875ZM26.3644 32.1226H33.6573V24.823H26.3644V32.1226ZM3.05859 30.0543V26.8913H18.1881V30.0543H3.05859ZM26.6875 18.3333C25.725 18.3333 24.9034 17.9929 24.2226 17.3121C23.5418 16.6313 23.2014 15.8097 23.2014 14.8472V8.20048C23.2014 7.23795 23.5418 6.4163 24.2226 5.73552C24.9034 5.05474 25.725 4.71436 26.6875 4.71436H33.3343C34.2968 4.71436 35.1184 5.05474 35.7992 5.73552C36.48 6.4163 36.8204 7.23795 36.8204 8.20048V14.8472C36.8204 15.8097 36.48 16.6313 35.7992 17.3121C35.1184 17.9929 34.2968 18.3333 33.3343 18.3333H26.6875ZM26.3644 15.1703H33.6573V7.8774H26.3644V15.1703ZM3.05859 13.102V9.94565H18.1881V13.102H3.05859Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>{" "}
                                <p class="font-[600] text-[18px] text-white">5 MCQs</p>
                                <p class="text-[13px] text-[#fff] font-[500]">
                                    4 Options
                                    <br /> each
                                </p>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="41"
                                    height="40"
                                    viewBox="0 0 41 40"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_4275_58293)">
                                        <path
                                            d="M20.8331 27.0854L26.7881 30.6941L25.1963 23.9389L30.4385 19.3852L23.5345 18.7801L20.8331 12.4006V27.0854ZM10.1296 37.2412L12.9508 25.0579L3.49219 16.8607L15.9771 15.7859L20.8331 4.29248L25.6891 15.7859L38.1739 16.8607L28.7153 25.0579L31.5432 37.2412L20.8331 30.7704L10.1296 37.2412Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                                <p class="flex flex-col gap-[8px] font-[600] text-[18px] text-white">
                                    5 Points
                                </p>
                                <p class="text-white flex flex-col gap-[8px] font-[500] flex text-center  text-[13px]">
                                    for each
                                    <br />
                                    right
                                    <br /> answer
                                </p>
                            </div>
                            <div class="flex flex-col gap-[8px] items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="41"
                                    height="40"
                                    viewBox="0 0 41 40"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_4275_58299)">
                                        <path
                                            d="M16.0928 9.36807H18.9236V6.54382H16.0928V9.36807ZM21.7479 9.36807V6.54382H24.5788V9.36807H21.7479ZM16.0928 20.6784V17.8541H18.9236V20.6784H16.0928ZM27.4031 15.0232V12.199H30.234V15.0232H27.4031ZM27.4031 20.6784V17.8541H30.234V20.6784H27.4031ZM21.7479 20.6784V17.8541H24.5788V20.6784H21.7479ZM27.4031 9.36807V6.54382H30.234V9.36807H27.4031ZM18.9236 12.199V9.36807H21.7479V12.199H18.9236ZM10.1055 33.5891V6.54382H13.2685V9.36807H16.0928V12.1967H13.2685V15.0254H16.0928V17.8541H13.2685V33.5891H10.1055ZM24.5788 17.8541V15.0232H27.4031V17.8541H24.5788ZM18.9236 17.8541V15.0232H21.7479V17.8541H18.9236ZM16.0928 15.0232V12.199H18.9236V15.0232H16.0928ZM21.7479 15.0232V12.199H24.5788V15.0232H21.7479ZM24.5788 12.199V9.36807H27.4031V12.199H24.5788Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                                <p class="flex flex-col gap-[8px] font-[600] text-[18px] text-white">
                                    Quick Result
                                </p>
                                <p class="flex flex-col gap-[8px] text-[13px] text-[#fff] font-[500]  items-center justify-center">
                                    Check your score
                                    <br />
                                    after the Quiz
                                </p>
                            </div>
                            <div class="flex flex-col justify-center align-center">
                                <svg
                                    class=""
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_4275_58305)">
                                        <path
                                            d="M9.75391 36.9125V29.6096C8.1728 28.143 6.94418 26.4334 6.06807 24.4807C5.19196 22.528 4.75391 20.4789 4.75391 18.3334C4.75391 14.0966 6.23574 10.4953 9.19941 7.52956C12.163 4.56381 15.7618 3.08093 19.9955 3.08093C23.5237 3.08093 26.6502 4.12114 29.375 6.20156C32.0999 8.28197 33.875 10.9876 34.7005 14.3186L36.9638 23.2911C37.0996 23.7905 37.0103 24.2411 36.6957 24.643C36.381 25.0449 35.9616 25.2458 35.4372 25.2458H31.9188V30.4227C31.9188 31.2976 31.6108 32.0423 30.9947 32.6571C30.3787 33.2718 29.6324 33.5791 28.7557 33.5791H25.2521V36.9125H22.0891V30.4227H28.7557V22.0894H33.3892L31.6546 15.1027C30.9972 12.5014 29.5823 10.3747 27.41 8.72239C25.2377 7.07011 22.7686 6.24397 20.0027 6.24397C16.6497 6.24397 13.796 7.40774 11.4417 9.73527C9.08746 12.0628 7.91032 14.8973 7.91032 18.2387C7.91032 19.9634 8.26362 21.6072 8.9702 23.1701C9.67678 24.733 10.6795 26.1153 11.9782 27.3171L12.9103 28.1926V36.9125H9.75391ZM18.583 24.6111H21.3608L21.5275 22.6945C21.8238 22.6296 22.0992 22.5189 22.3538 22.3622C22.6083 22.2055 22.8329 22.0292 23.0274 21.8334L24.8197 22.5L26.1664 20.2222L24.7775 19.1389C24.8886 18.8056 24.9442 18.463 24.9442 18.1111C24.9442 17.7593 24.8886 17.4167 24.7775 17.0834L26.1664 16L24.8197 13.7222L23.0282 14.3889C22.8287 14.2001 22.5983 14.0303 22.3371 13.8793C22.0759 13.7283 21.8062 13.6111 21.528 13.5278L21.3608 11.6111H18.583L18.4164 13.5278C18.1386 13.6111 17.8693 13.7283 17.6085 13.8793C17.3477 14.0303 17.1176 14.2001 16.9183 14.3889L15.1307 13.7222L13.7775 16L15.1664 17.0834C15.0553 17.4167 14.9997 17.7593 14.9997 18.1111C14.9997 18.463 15.0553 18.8056 15.1664 19.1389L13.7775 20.2222L15.1307 22.5L16.9183 21.8334C17.1125 22.0292 17.3366 22.2055 17.5907 22.3622C17.8449 22.5189 18.1201 22.6296 18.4164 22.6945L18.583 24.6111ZM19.9752 20.8889C19.2045 20.8889 18.5483 20.6192 18.0067 20.0797C17.465 19.5402 17.1941 18.8851 17.1941 18.1144C17.1941 17.3437 17.4639 16.6875 18.0034 16.1459C18.5429 15.6042 19.198 15.3334 19.9687 15.3334C20.7394 15.3334 21.3955 15.6031 21.9372 16.1426C22.4789 16.6821 22.7497 17.3372 22.7497 18.1079C22.7497 18.8785 22.48 19.5347 21.9405 20.0764C21.401 20.6181 20.7459 20.8889 19.9752 20.8889Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                                <p class="flex flex-col gap-[8px] font-[600] text-[18px] text-white  items-center justify-center">
                                    Brainstorming
                                </p>
                                <p class="flex flex-col gap-[8px] text-[13px] text-[#fff] font-[500]  items-center justify-center">
                                    Fun way to learn
                                    <br /> and earn
                                    <br /> Knowledge
                                </p>
                            </div>
                        </div>

                        <div class="w-[744px]  bg-[#fff] rounded-[16px] pt-[24px] flex flex-col justify-center items-center overflow-hidden gap-[24px] ">
                            <div className="flex flex-col gap-[16px] px-[60px] text-center">
                                <div className="text-[20px] font-[600]">
                                    DevInsights - Unleashing Developer Knowledge
                                </div>
                                <div className="text-[14px] font-[500] text-start">
                                    In the ever-evolving landscape of software development, proficiency
                                    in version control systems has become an indispensable skill for
                                    developers. Version control systems, such as Git, enable developers
                                    to track changes in their codebase, collaborate seamlessly with team
                                    members, and maintain a well-organized and documented development
                                    history. A skilled developer proficient in version control not only
                                    ensures the integrity of the codebase but also facilitates efficient
                                    collaboration in both small and large-scale projects. This skill not
                                    only streamlines the development process but also enhances the
                                    overall software quality and project management. In the
                                    ever-evolving landscape of software development, proficiency in
                                    version control systems has become an indispensable skill for
                                    developers. Version control systems, such as Git, enable developers
                                    to track changes in their codebase, collaborate seamlessly with team
                                    members, and maintain a well-organized and documented development
                                    history. A skilled developer proficient in version control not only
                                    ensures the integrity of the codebase but also facilitates efficient
                                    collaboration in both small and large-scale projects. This skill not
                                    only streamlines the development process but also enhances the
                                    overall software quality and project management.
                                </div>
                            </div>
                            <div className="bg-[#005A80]  p-[16px] text-[#fff] text-center flex flex-col gap-[12px] w-full">
                                <div className="text-[16px] text-[#fff] font-[600]">
                                    Get ready to test your knowledge!
                                </div>
                                <div className="text-[12px] text-[#fff] font-[500]">
                                    The quiz begins as soon as you click Start{" "}
                                    <span className="text-[12px] text-[#fff] font-[700]">Start.</span>{" "}
                                    Make sure you have a stable internet connection.
                                </div>
                                <div onClick={() => setToggle(1)}>
                                    <button className="py-[12px] px-[36px] border-solid border-[1px] border-[#06A9EF] bg-[#fff] text-[#333] text-[14px] font-[500] rounded-[8px]">
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {toggle === 1 &&
                    <div className="w-full flex justify-center items-center flex-row py-[36px] customMargins ">
                       
                        <div className="w-[82.97%] flex flex-col gap-[24px]">
                            <div className="bg-[#fff] border-[2px] border-solid border-[#06A9EF] rounded-[12px] p-[24px] flex flex-col gap-[12px]">
                                
                                <div className="flex flex-col gap-[24px]">
                                    <div
                                        className="rounded-[16px] flex flex-col gap-[12px] p-[24px] bg-[#E0F6FF]"
                                        style={{
                                            boxShadow: "  0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                                        }}
                                    >
                                        <div className="text-[20px] text-[#333] font-[600]">
                                            Question 1
                                        </div>
                                        <div className="text-[16px] text-[#333] font-[600]">
                                            What does the acronym "API" stand for?
                                        </div>
                                    </div>
                                    <div className="flex flex-row  gap-[24px]">
                                        <div className="w-[50%] flex items-between  flex-col gap-[24px]">
                                            <div
                                                className="py-[12px] px-[16px] rounded-[8px] text-[16px] font-[600] h-[50%]"
                                                style={{
                                                    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                                                }}
                                            >
                                                A) Application Programming Interface
                                            </div>
                                            <div
                                                className="py-[12px] px-[16px] rounded-[8px] text-[16px] font-[600] h-[50%]"
                                                style={{
                                                    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                                                }}
                                            >
                                                C) Automated Processing Interface
                                            </div>
                                        </div>
                                        <div className="w-[50%] flex flex-col items-between gap-[24px]">
                                            <div
                                                className="py-[12px] px-[16px] rounded-[8px] text-[16px] font-[600] h-[50%]"
                                                style={{
                                                    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                                                }}
                                            >
                                                B) Advanced Programming Integration
                                            </div>
                                            <div
                                                className="py-[12px] px-[16px] rounded-[8px] text-[16px] font-[600] h-[50%]"
                                                style={{
                                                    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                                                }}
                                            >
                                                D) Application Process Integration
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-between">
                                <div className="rounded-[8px] border-[1px] border-solid border-[#06A9EF] bg-[#fff] flex flex-row gap-[8px] text-[18px] font-[600] p-[8px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <g mask="url(#mask0_4403_58159)">
                                            <path
                                                d="M12.0001 22.2034C10.5849 22.2034 9.25703 21.9359 8.01645 21.401C6.77587 20.866 5.69661 20.1396 4.77868 19.2216C3.86074 18.3037 3.13429 17.2244 2.59933 15.9839C2.06436 14.7433 1.79688 13.4154 1.79688 12.0001C1.79688 10.5849 2.06436 9.25703 2.59933 8.01645C3.13429 6.77587 3.86074 5.69661 4.77868 4.77867C5.69661 3.86074 6.77587 3.13429 8.01645 2.59932C9.25703 2.06436 10.5849 1.79688 12.0001 1.79688C13.4154 1.79688 14.7433 2.06436 15.9839 2.59932C17.2244 3.13429 18.3037 3.86074 19.2216 4.77867C20.1396 5.69661 20.866 6.77587 21.401 8.01645C21.9359 9.25703 22.2034 10.5849 22.2034 12.0001C22.2034 12.4422 22.1794 12.8759 22.1314 13.3012C22.0834 13.7266 22.0051 14.1436 21.8964 14.5523C21.6272 14.2498 21.3135 14.0029 20.9553 13.8115C20.5972 13.6202 20.2108 13.5032 19.7964 13.4605C19.8424 13.2264 19.8759 12.9872 19.8969 12.7428C19.9179 12.4984 19.9284 12.2509 19.9284 12.0001C19.9284 9.78277 19.1614 7.90704 17.6273 6.37298C16.0933 4.83893 14.2175 4.0719 12.0001 4.0719C9.78277 4.0719 7.90704 4.83893 6.37297 6.37298C4.83892 7.90704 4.0719 9.78277 4.0719 12.0001C4.0719 14.2175 4.83892 16.0933 6.37297 17.6273C7.90704 19.1614 9.78277 19.9284 12.0001 19.9284C12.8382 19.9284 13.6367 19.8074 14.3958 19.5654C15.1549 19.3233 15.8554 18.9833 16.4974 18.5452C16.7014 18.8844 16.9642 19.1812 17.2858 19.4358C17.6073 19.6903 17.9587 19.8838 18.3398 20.0164C17.4739 20.7038 16.5038 21.2401 15.4295 21.6254C14.3552 22.0108 13.2121 22.2034 12.0001 22.2034ZM19.3817 18.1974C18.9958 18.1974 18.6681 18.0627 18.3985 17.7931C18.129 17.5235 17.9942 17.1958 17.9942 16.8099C17.9942 16.4241 18.129 16.0963 18.3985 15.8268C18.6681 15.5572 18.9958 15.4224 19.3817 15.4224C19.7675 15.4224 20.0953 15.5572 20.3648 15.8268C20.6344 16.0963 20.7692 16.4241 20.7692 16.8099C20.7692 17.1958 20.6344 17.5235 20.3648 17.7931C20.0953 18.0627 19.7675 18.1974 19.3817 18.1974ZM15.2105 16.736L10.9105 12.436V7.03005H13.0898V11.5523L16.748 15.2105L15.2105 16.736Z"
                                                fill="#06A9EF"
                                            />
                                        </g>
                                    </svg>
                                    19 : 48 Minutes
                                </div>
                                <div className="flex flex-row gap-[72px]">
                                    <div className="flex flex-row gap-[3px] items-center justify-center text-[18px] font-[600]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                        >
                                            <g mask="url(#mask0_4403_58165)">
                                                <path
                                                    d="M17.9367 19.9998L23.2027 25.2658L21.7444 26.7658L14.9785 19.9998L21.7444 13.2338L23.2027 14.7338L17.9367 19.9998ZM19.9959 35.8331C22.1858 35.8331 24.2442 35.4175 26.1711 34.5864C28.098 33.7553 29.7742 32.6228 31.1995 31.1888C32.6249 29.7548 33.7534 28.0765 34.5848 26.154C35.4163 24.2315 35.832 22.1811 35.832 20.0026C35.832 17.8127 35.4165 15.7543 34.5854 13.8274C33.7543 11.9005 32.6263 10.2244 31.2016 8.79901C29.7769 7.37362 28.1015 6.24519 26.1754 5.41371C24.2494 4.58224 22.1914 4.1665 20.0015 4.1665C17.8116 4.1665 15.7579 4.58206 13.8402 5.41317C11.9226 6.24428 10.2465 7.3722 8.81182 8.79692C7.37718 10.2217 6.24413 11.8971 5.41265 13.8231C4.58118 15.7492 4.16545 17.8071 4.16545 19.997C4.16545 22.1755 4.581 24.2264 5.41211 26.1498C6.24323 28.0731 7.37578 29.7521 8.80978 31.1867C10.2438 32.6214 11.9192 33.7544 13.8359 34.5859C15.7527 35.4174 17.8061 35.8331 19.9959 35.8331Z"
                                                    fill="#06A9EF"
                                                />
                                            </g>
                                        </svg>
                                        Previous
                                    </div>
                                    <div className="flex flex-row gap-[3px] items-center justify-center text-[18px] font-[600]">
                                        Next
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                        >
                                            <g mask="url(#mask0_4403_58171)">
                                                <path
                                                    d="M22.0633 19.9998L16.7973 25.2658L18.2556 26.7658L25.0215 19.9998L18.2556 13.2338L16.7973 14.7338L22.0633 19.9998ZM20.0041 35.8331C17.8142 35.8331 15.7558 35.4175 13.8289 34.5864C11.902 33.7553 10.2258 32.6228 8.80047 31.1888C7.37508 29.7548 6.24665 28.0765 5.41518 26.154C4.58371 24.2315 4.16797 22.1811 4.16797 20.0026C4.16797 17.8127 4.58352 15.7543 5.41464 13.8274C6.24575 11.9005 7.37366 10.2244 8.79839 8.79901C10.2231 7.37362 11.8985 6.24519 13.8246 5.41371C15.7506 4.58224 17.8086 4.1665 19.9985 4.1665C22.1884 4.1665 24.2421 4.58206 26.1598 5.41317C28.0774 6.24428 29.7535 7.3722 31.1882 8.79692C32.6228 10.2217 33.7559 11.8971 34.5873 13.8231C35.4188 15.7492 35.8346 17.8071 35.8346 19.997C35.8346 22.1755 35.419 24.2264 34.5879 26.1498C33.7568 28.0731 32.6242 29.7521 31.1902 31.1867C29.7562 32.6214 28.0808 33.7544 26.1641 34.5859C24.2473 35.4174 22.1939 35.8331 20.0041 35.8331Z"
                                                    fill="#06A9EF"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                }

            </div>

        </div>
    );
};

export default DailyQuiz;
