import React from "react";

const Resume10 = ({ data }) => {
    return (
        <div>
            <div className="p-[41px] w-[794px] flex flex-row gap-[42px]">
                <div className="py-[115px] flex flex-col gap-[36px] w-[164px]">
                    <div className="flex flex-col gap-[24px]">
                        <p className="text-[16px] font-[400]">CONTACT</p>
                        {data.mobileNumber && (
                            <div className="flex flex-col gap-[17px]">
                                <div className="flex gap-2 items-start  pr-4">
                                    <div className="h-[24px] flex items-center">
                                        <svg
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20.0046 17.2915C20.0379 17.5513 19.9596 17.7778 19.7664 17.9693L17.5114 20.206C17.4098 20.3193 17.2766 20.4159 17.1134 20.4942C16.9501 20.5725 16.7886 20.6241 16.6304 20.6474C16.6187 20.6474 16.5854 20.6507 16.5288 20.6557C16.4722 20.6607 16.3989 20.6641 16.3089 20.6641C16.0941 20.6641 15.746 20.6274 15.2664 20.5541C14.7851 20.4808 14.1988 20.301 13.5027 20.0112C12.8082 19.7231 12.0204 19.2917 11.1394 18.7155C10.2584 18.1392 9.3207 17.3481 8.32477 16.3422C7.53368 15.5628 6.87915 14.8166 6.35787 14.1038C5.83825 13.3927 5.42022 12.7332 5.10378 12.1286C4.78735 11.5241 4.54919 10.9761 4.39264 10.4848C4.23442 9.99352 4.12783 9.5705 4.07121 9.21409C4.01458 8.85768 3.99126 8.57787 4.00292 8.37468C4.01458 8.1715 4.01958 8.05827 4.01958 8.03662C4.04289 7.8784 4.09286 7.71683 4.1728 7.55362C4.25274 7.39041 4.34767 7.25717 4.46092 7.15558L6.71594 4.90055C6.87416 4.74234 7.05403 4.66406 7.25888 4.66406C7.40544 4.66406 7.53534 4.70571 7.64859 4.79064C7.76184 4.87558 7.85844 4.9805 7.93672 5.10541L9.75039 8.54624C9.85198 8.72611 9.8803 8.92428 9.83533 9.13912C9.79036 9.35397 9.69377 9.53384 9.54721 9.68207L8.71615 10.5131C8.69283 10.5365 8.67285 10.5731 8.65786 10.623C8.6412 10.6747 8.63288 10.7163 8.63288 10.7513C8.67784 10.9878 8.77943 11.2593 8.93765 11.564C9.07255 11.8355 9.2824 12.1652 9.56553 12.5566C9.84865 12.9463 10.2484 13.396 10.768 13.904C11.2759 14.4236 11.7289 14.8283 12.1237 15.1164C12.5184 15.4046 12.8498 15.6161 13.1146 15.7526C13.3811 15.8875 13.5843 15.9708 13.7242 15.9975L13.9357 16.0391C13.959 16.0391 13.994 16.0308 14.0456 16.0141C14.0972 15.9975 14.1322 15.9775 14.1555 15.9558L15.1215 14.9732C15.3247 14.7933 15.5628 14.7017 15.8326 14.7017C16.0241 14.7017 16.1774 14.735 16.2906 14.8033H16.3073L19.5782 16.7353C19.818 16.8785 19.9579 17.065 20.0046 17.2915Z"
                                                stroke="#B2B2B2"
                                                stroke-width="0.666734"
                                                stroke-miterlimit="10"
                                            />
                                        </svg>
                                    </div>
                                    <p className=" text-[14px] pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                                        {data.mobileNumber}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start  pr-4">
                                    <div className="h-[24px] flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="14"
                                            viewBox="0 0 15 10"
                                            fill="none"
                                        >
                                            <path
                                                d="M14.0457 0.732755H1.27976C1.17318 0.713537 1.06224 0.753722 0.99498 0.838456C0.939947 0.907466 0.918109 0.99832 0.93558 1.08393V9.32056C0.93558 9.48479 1.06923 9.61757 1.23258 9.61757H7.30022C7.46445 9.61757 7.59723 9.48392 7.59723 9.32056C7.59723 9.15634 7.46358 9.02356 7.30022 9.02356H2.01965L5.96283 5.55908C6.44852 5.90763 7.03903 6.09806 7.63566 6.09806C7.63916 6.09806 7.64265 6.09806 7.64615 6.09806C8.2419 6.09806 8.83155 5.90764 9.31724 5.56084L13.2595 9.02356H10.0895C9.92523 9.02356 9.79245 9.15721 9.79245 9.32056C9.79245 9.48479 9.9261 9.61757 10.0895 9.61757H14.0475C14.1951 9.61669 14.3209 9.50577 14.341 9.36077L14.3419 9.35463C14.3427 9.34765 14.3427 9.34155 14.3436 9.33456C14.3436 9.33194 14.3436 9.32932 14.3436 9.3267V9.32232V1.02888C14.3436 0.865525 14.21 0.732755 14.0457 0.732755ZM5.49985 5.17387L1.52959 8.66279V1.68753L5.49985 5.17387ZM13.2569 1.32676L9.14515 4.93887C8.73633 5.29615 8.21133 5.49707 7.66886 5.50318C7.66013 5.50318 7.65139 5.50318 7.64178 5.50318C7.11328 5.50318 6.59964 5.31974 6.1917 4.9843C6.18471 4.97556 6.17859 4.9677 6.17161 4.96071C6.15064 4.93887 6.12618 4.92053 6.09997 4.90568L2.0214 1.32591L13.2569 1.32676ZM13.7487 1.68667V8.66279L9.77759 5.1756L13.7487 1.68667Z"
                                                fill="#316059"
                                            />
                                            <path
                                                d="M8.7671 9.02393H8.20716C8.04294 9.02393 7.91016 9.15757 7.91016 9.32093C7.91016 9.48515 8.04381 9.61793 8.20716 9.61793H8.7671C8.93133 9.61793 9.06411 9.48428 9.06411 9.32093C9.06498 9.15757 8.93133 9.02393 8.7671 9.02393Z"
                                                fill="#316059"
                                            />
                                        </svg>
                                    </div>
                                    <p className=" text-[14px]  pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                                        {data.email}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start  pr-4">
                                    <div className="h-[24px] flex items-center">
                                        <svg
                                            width="15"
                                            height="22"
                                            viewBox="0 0 15 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.65934 0.664062C3.98697 0.664062 1 3.65102 1 7.32206C1 8.80088 1.94409 11.2118 3.88696 14.6935C5.26043 17.1551 6.61256 19.2086 6.66857 19.2939L7.658 20.7941L8.64744 19.2939C8.70477 19.2086 10.0556 17.1551 11.429 14.6935C13.3719 11.2131 14.316 8.80222 14.316 7.3234C14.3173 3.65103 11.3304 0.664062 7.65934 0.664062ZM7.65934 10.7304C5.75248 10.7304 4.20832 9.18491 4.20832 7.27805C4.20832 5.37119 5.75381 3.82572 7.65934 3.82572C9.56486 3.82572 11.1104 5.37119 11.1104 7.27805C11.1104 9.18491 9.56486 10.7304 7.65934 10.7304Z"
                                                stroke="#B2B2B2"
                                                stroke-width="0.666734"
                                                stroke-miterlimit="10"
                                            />
                                        </svg>
                                    </div>
                                    <p className=" text-[14px] pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                                        {data.location}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start  pr-4">
                                    <div className="h-[24px] flex items-center">
                                        <svg
                                            width="20"
                                            height="19"
                                            viewBox="0 0 20 19"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 0.664062C5.05282 0.664062 1 4.71689 1 9.66407C1 14.6127 5.05137 18.6641 10 18.6641C14.9472 18.6641 19 14.6113 19 9.66407C19 4.71544 14.9486 0.664062 10 0.664062ZM16.21 6.06492H13.5991C13.3318 4.89603 12.8796 3.90199 12.3378 2.82557C13.9604 3.45408 15.4023 4.53482 16.21 6.06492ZM10 2.46579C10.721 3.54221 11.3495 4.71543 11.7107 6.06492H8.29074C8.65195 4.80356 9.27902 3.54221 10 2.46579ZM3.07048 11.4658C2.88987 10.9254 2.80318 10.2926 2.80318 9.66407C2.80318 9.03556 2.89132 8.4027 3.07048 7.86233H6.12924C6.0411 8.49517 6.0411 9.03556 6.0411 9.66407C6.0411 10.2926 6.12924 10.833 6.12924 11.4658H3.07048ZM3.79146 13.2632H6.40232C6.66961 14.4321 7.12185 15.4247 7.66367 16.5026C6.0411 15.8741 4.59913 14.7919 3.79146 13.2632ZM6.40232 6.06492H3.79146C4.6916 4.53482 6.0411 3.45408 7.66367 2.82557C7.12185 3.90199 6.66961 4.89603 6.40232 6.06492ZM10 16.8623C9.27902 15.7859 8.65051 14.6127 8.2893 13.2632H11.7093C11.3495 14.5231 10.721 15.7845 10 16.8623ZM12.0705 11.4658H7.93097C7.8385 10.833 7.75036 10.2926 7.75036 9.66407C7.75036 9.03556 7.8385 8.49517 7.93097 7.86233H12.163C12.2511 8.49517 12.3378 9.03556 12.3378 9.66407C12.3392 10.2926 12.163 10.833 12.0705 11.4658ZM12.3392 16.5011C12.8796 15.5114 13.3318 14.4306 13.6006 13.2618H16.2114C15.4023 14.7919 13.9604 15.8741 12.3392 16.5011ZM13.9604 11.4658C14.0528 10.833 14.0528 10.2926 14.0528 9.66407C14.0528 9.03556 13.9604 8.49517 13.9604 7.86233H17.0177C17.1983 8.4027 17.2893 9.03556 17.2893 9.66407C17.2893 10.2926 17.1968 10.9254 17.0177 11.4658H13.9604Z"
                                                fill="#B2B2B2"
                                                stroke="white"
                                                stroke-width="0.5"
                                                stroke-miterlimit="10"
                                            />
                                        </svg>
                                    </div>
                                    <p className=" text-[14px]  pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                                        {data.location}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-[24px]">
                        <p>SKILLS</p>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center">
                            <svg
                                className=""
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p className="">Skill 1</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Skill 1</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            {" "}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Skill 1</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            {" "}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Skill 1</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            {" "}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Skill 1</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center">
                            <svg
                                className=""
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p className="">Skill 1</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[24px]">
                        <p>TOOLS</p>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center">
                            <svg
                                className=""
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p className="">Tool 1</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Tool 2</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            {" "}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Tool 3</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            {" "}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Tool 4</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center  ">
                            {" "}
                            <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p>Tool 5</p>
                        </div>
                        <div className="flex flex-row gap-[16px] flex justify-start items-center">
                            <svg
                                className=""
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                                    stroke="#F2BE5C"
                                    stroke-width="4.0004"
                                    stroke-miterlimit="10"
                                />
                            </svg>
                            <p className="">Tool 6</p>
                        </div>
                    </div>

                    <div className="flex w-[268px] flex-col py-2">
    <div className="flex items-start justify-start flex-col gap-3">
        <p className="text-[16px] font-[400]">LANGAUGES</p>
        <div className="gap-4 flex flex-col w-[240px]">
            {data?.languages?.length > 0 && (
                <>
                    {data.languages?.map((detail, index) => {
                        const calculateWidthPercentage = (rating) => {
                            let ratingPercentage = 0;
                            if (rating && rating.length > 0) {
                                const zerosCount = rating.filter(
                                    (val) => val === 0
                                ).length;

                                if (zerosCount === 0) ratingPercentage = 100;
                                else if (zerosCount === 1) ratingPercentage = 66;
                                else if (zerosCount === 2) ratingPercentage = 33;
                            }
                            return ratingPercentage;
                        };
                        const ratingPercentage = calculateWidthPercentage(
                            detail.rating
                        );
                        return (
                            <div className="w-full flex flex-col" key={index}>
                                <div className="flex items-center">
                                    <p className="text-[#414042] font-kanit text-[12px] w-[80px] font-[400]">
                                        {detail.languages}
                                    </p>
                                    <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                                        <div
                                            className="h-full bg-[#F2BE5C]"
                                            style={{ width: `${ratingPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    </div>
</div>


                </div>
            </div>

            <div className="w-[506px] flex flex-col gap-[24px]">
                <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <p className="text-[38px] font-[400]">John Doe</p>
                            <p className="text-[16px] font-[400]">Current Designation</p>
                        </div>
                        <div>
                            <img
                                className="w-[124px] h-[124px]"
                                src="/images/profile/profileNew.png"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-[12px] font-[500]">
                            Short intro about you/ Summary
                        </p>
                        <p className="text-[12px] font-[400]">
                            Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh
                            euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad
                            minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex
                            eacommodoconsequat.Duisautemveleumiriuredolorinhendreritinvulputatevelit
                            essemolestieconsequat,velillumdoloreeufeugiatnullafacilisisatveroeroset
                        </p>
                    </div>
                </div>

                <div className="flex flex-row gap-[10px]">
                    <svg
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3714 18.8977C31.6052 11.295 26.4423 4.13153 18.8396 2.89766C11.2369 1.66379 4.07345 6.82675 2.83958 14.4294C1.60571 22.0321 6.76867 29.1956 14.3714 30.4294C21.9741 31.6633 29.1375 26.5004 30.3714 18.8977Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M24.4478 23.7961H8.74364C7.83448 23.7961 7.09766 23.0593 7.09766 22.1501V12.2768C7.09766 11.3677 7.83448 10.6309 8.74364 10.6309H24.4478C25.3569 10.6309 26.0938 11.3677 26.0938 12.2768V22.1501C26.0938 23.0593 25.3569 23.7961 24.4478 23.7961Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M20.7815 10.6292C20.6328 9.2705 19.4952 8.20898 18.0977 8.20898H14.9494C13.5519 8.20898 12.4142 9.2705 12.2656 10.6292H20.7815Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M24.8999 16.8206H8.29154C7.63215 16.8206 7.09766 16.2861 7.09766 15.6268V12.3398C7.09766 11.3944 7.86319 10.6289 8.80856 10.6289H24.3828C25.3282 10.6289 26.0937 11.3944 26.0937 12.3398V15.6268C26.0925 16.2861 25.558 16.8206 24.8999 16.8206Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M16.5242 17.9997C16.0621 17.9997 15.6875 17.6251 15.6875 17.163V16.4774C15.6875 16.0153 16.0621 15.6406 16.5242 15.6406C16.9863 15.6406 17.3609 16.0153 17.3609 16.4774V17.163C17.3609 17.6251 16.9863 17.9997 16.5242 17.9997Z"
                            fill="white"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                    </svg>
                    <p>EXPERIENCE</p>
                </div>



                <div className="flex flex-col gap-[4px]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px]  font-[400] ">
                                    COMPANY 1 - DESIGNATION{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            LOCATION
                        </div>
                    </div>
                    <div className="text-[12px] font-[400]">
                        Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh
                        euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad
                        minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex
                        eacommodoconsequat.
                    </div>
                </div>

                <div>
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px] font-[400] text-[]">
                                    COMPANY 1 - DESIGNATION{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            LOCATION
                        </div>
                    </div>
                    <div className="text-[12px] font-[400]">
                        Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh
                        euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad
                        minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex
                        eacommodoconsequat.
                    </div>
                </div>

                <div>
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px] font-[400] text-[]">
                                    COMPANY 1 - DESIGNATION{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            LOCATION
                        </div>
                    </div>
                    <div className="text-[12px] font-[400]">
                        Loremipsumdolorsitamet,consectetueradipiscingelit,seddiamnonummynibh
                        euismodtinciduntutlaoreetdoloremagnaaliquameratvolutpat.Utwisienimad
                        minimveniam,quisnostrudexercitationullamcorpersuscipitlobortisnislutaliquipex
                        eacommodoconsequat.
                    </div>
                </div>

                <div className="flex flex-row gap-[10px]">
                    <svg
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3713 18.9855C31.6052 11.3828 26.4423 4.21941 18.8396 2.98554C11.2369 1.75168 4.07345 6.91462 2.83959 14.5173C1.60572 22.12 6.76866 29.2834 14.3713 30.5173C21.974 31.7512 29.1375 26.5882 30.3713 18.9855Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M26.5106 12.7612L17.0507 8.34037C16.7098 8.18052 16.3164 8.17554 15.9717 8.32665L5.82738 12.7563C5.41027 12.9386 5.40527 13.5293 5.81989 13.7178L15.9517 18.3348C16.3077 18.4972 16.7173 18.4922 17.0682 18.3199L26.5182 13.7117C26.9165 13.5181 26.9128 12.9486 26.5106 12.7612Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M9.36719 15.332V23.5944C9.36719 23.5944 16.6579 27.3571 23.0295 23.5944V15.4144L16.9676 18.3704C16.6829 18.5091 16.3507 18.5141 16.061 18.3817L9.36719 15.332Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M26.7812 13.334V18.2319"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M26.8147 21.2701C27.7134 21.2701 28.442 20.5415 28.442 19.6428C28.442 18.7441 27.7134 18.0156 26.8147 18.0156C25.916 18.0156 25.1875 18.7441 25.1875 19.6428C25.1875 20.5415 25.916 21.2701 26.8147 21.2701Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                    </svg>
                    <p>EDUCATION</p>
                </div>


                <div className="flex flex-col gap-[4px]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px] font-[400] text-[]">
                                    DEGREE 1 - SPECIALIZATION{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            LOCATION
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[4px]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px] font-[400] text-[]">
                                    DEGREE 1 - SPECIALIZATION{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            LOCATION
                        </div>
                    </div>
                </div>


                <div className="flex flex-row gap-[10px]">
                    <svg
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3713 18.9855C31.6052 11.3828 26.4423 4.21941 18.8396 2.98554C11.2369 1.75168 4.07345 6.91462 2.83959 14.5173C1.60572 22.12 6.76866 29.2834 14.3713 30.5173C21.974 31.7512 29.1375 26.5882 30.3713 18.9855Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M26.5106 12.7612L17.0507 8.34037C16.7098 8.18052 16.3164 8.17554 15.9717 8.32665L5.82738 12.7563C5.41027 12.9386 5.40527 13.5293 5.81989 13.7178L15.9517 18.3348C16.3077 18.4972 16.7173 18.4922 17.0682 18.3199L26.5182 13.7117C26.9165 13.5181 26.9128 12.9486 26.5106 12.7612Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M9.36719 15.332V23.5944C9.36719 23.5944 16.6579 27.3571 23.0295 23.5944V15.4144L16.9676 18.3704C16.6829 18.5091 16.3507 18.5141 16.061 18.3817L9.36719 15.332Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M26.7812 13.334V18.2319"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M26.8147 21.2701C27.7134 21.2701 28.442 20.5415 28.442 19.6428C28.442 18.7441 27.7134 18.0156 26.8147 18.0156C25.916 18.0156 25.1875 18.7441 25.1875 19.6428C25.1875 20.5415 25.916 21.2701 26.8147 21.2701Z"
                            stroke="#B2B2B2"
                            stroke-width="0.666734"
                            stroke-miterlimit="10"
                        />
                    </svg>
                    <p>COURSE & CERTIFICATE</p>
                </div>

                <div className="flex flex-col gap-[4px]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px] font-[400] text-[]">
                                    COURSE NAME{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            INSTITUTION NAME
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[4px]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <ul style={{ listStyleType: "disc" }}>
                                <li className="text-[14px] font-[400] text-[]">
                                    COURSE NAME{" "}
                                </li>
                            </ul>
                            <p className="text-[#F2BE5C] text-[14px] font-[400]">YEAR</p>
                        </div>
                        <div className="text-[#F2BE5C] text-[14px] font-[400]">
                            INSTITUTION NAME
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default Resume10;