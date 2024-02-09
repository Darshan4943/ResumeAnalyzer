import React from "react";

const Resume7 = ({ data }) => {
    return (
        <div className="bg-[#F5F7FB]">
            <div className="">
                <div className="bg-[#F5F7FB] w-[794px]">
                    <div className="flex flex-row w-full pt-[68px] pl-[73.56px]  gap-[38px]">
                        <div className="flex justify-center items-center w-[108px]">
                            <img
                                src="/images/profile/profileNew.png"
                                className="border border-[#0077F9] rounded-full border-[4.72px] "
                            />
                        </div>
                        <div className="w-[101px]">
                            <p className="text-[34px] font-[300] text-[#222933]">
                                {data.firstName}
                            </p>
                            <p className="text-[34px] font-[700]">{data.lastName} </p>
                            <p className="text-[10px] font-[400] whitespace-nowrap">
                                {data.designation}
                            </p>
                        </div>
                    </div>

                    <div className="flex px-[44.98px] ">
                        <div className="flex flex-row justify-center items-center w-[682px] pt-[44.99px]">
                            <p className="text-[10px] font-[400]  bg-[#FFFFFF] w-full px-[21px] py-[10px]">
                                {data.location}
                            </p>
                            <p className="text-[10px] font-[400]  bg-[#0077F9] w-full py-[10px] pl-[16.09px] pr-[76.91px]">
                                {data.email} | {data.mobileNumber}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-[21.98px] pl-[44.98px] w-full justify-center items-center">
                <div className="w-full justify-center items-center">
                    <div className="h-[10px] w-[683px] bg-[#0077F9] "></div>

                    <div className="flex flex-row bg-[#FFFFFF]">
                        <div className="w-[472px] px-[20px] py-[20px] flex flex-col gap-[16px]">
                            <div className="flex flex-col gap-[14px]">
                                <p className="text-[12px] font-[700]">ABOUT ME</p>
                                <p className="text-[9px] font-[400]">{data.summery} </p>
                            </div>

                            <div>
                                <p className="text-[12px] font-[700]">EXPERIENCE</p>
                                <div className="flex flex-col gap-[4px]">
                                    <p className="text-[9px] font-[500]">20YY - 20YY</p>
                                    <p className="text-[11px] font-[600]">
                                        ENTER YOUR JOB POSITION
                                    </p>
                                    <p className="text-[9px] font-[500]">
                                        Company Name Here / Location{" "}
                                    </p>
                                    <p className="text-[9px] font-[400]">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry Ipsum has been the industry's standard
                                        dummy text ever since the when unknown printer took a galley
                                        of type and scrambled it to make a type specimen book Lorem
                                        Ipsum is simply dummy text of the printing and typesetting
                                        industry Ipsum has
                                    </p>
                                    <ul style={{ listStyleType: "disc" }} className="pl-[20px]">
                                        <li className="text-[9px] font-[400px]">
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry Ipsum
                                        </li>
                                        <li className="text-[9px] font-[400px]">
                                            has been the industry's standard dummy text ever since the
                                        </li>
                                        <li className="text-[9px] font-[400px]">
                                            printer took a galley of type and scrambled it to make a
                                            type specimen book Lorem
                                        </li>
                                        <li className="text-[9px] font-[400px]">
                                            Ipsum is simply dummy text of the printing and typesetting
                                            industry{" "}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[4px]">
                                <p className="text-[9px] font-[500]">20YY - 20YY</p>
                                <p className="text-[11px] font-[600]">
                                    ENTER YOUR JOB POSITION
                                </p>
                                <p className="text-[9px] font-[500]">
                                    Company Name Here / Location{" "}
                                </p>
                                <p className="text-[9px] font-[400]">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry Ipsum has been the industry's standard
                                    dummy text ever since the when unknown printer took a galley
                                    of type and scrambled it to make a type specimen book Lorem
                                    Ipsum is simply dummy text of the printing and typesetting
                                    industry Ipsum has
                                </p>
                                <ul style={{ listStyleType: "disc" }} className="pl-[20px]">
                                    <li className="text-[9px] font-[400px]">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry Ipsum
                                    </li>
                                    <li className="text-[9px] font-[400px]">
                                        has been the industry's standard dummy text ever since the
                                    </li>
                                    <li className="text-[9px] font-[400px]">
                                        printer took a galley of type and scrambled it to make a
                                        type specimen
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[48px] bg-[#F5F7FB]">
                            <div className="w-[173px] pt-[20px] pl-[23px] flex flex-col gap-[16px]">
                                <div className="text-[12px] font-[700]">EDUCATION</div>

                                <div className="flex flex-col gap-[18px]">
                                    <div className="flex flex-col gap-[4px]">
                                        <p className="text-[9px] font-[500]"></p>
                                        <p className="text-[11px] font-[600]">YOUR MAJOR DEGREE</p>
                                        <p className="text-[9px] font-[500]">
                                            University Name / Location
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-[4px]">
                                        <p className="text-[9px] font-[500]">20YY - 20YY</p>
                                        <p className="text-[11px] font-[600]">YOUR MAJOR DEGREE</p>
                                        <p className="text-[9px] font-[500]">
                                            University Name / Location
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-[4px]">
                                        <p className="text-[9px] font-[500]">20YY - 20YY</p>
                                        <p className="text-[11px] font-[600]">YOUR MAJOR DEGREE</p>
                                        <p className="text-[9px] font-[500]">
                                            University Name / Location
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[132px] h-[0.5px] bg-[#36434E]  ml-[20px]"></div>

                            <div className="flex flex-col pl-[23px] ">
                                <p className="text-[12px] font-[700]">EXPERTISE</p>

                                <div className="flex flex-col gap-[11px]">
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">Lorem Ipsum </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">dummy text of </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">printing and </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">typesetting </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">Ipsum has been </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">the industrys</p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">dummy text ever </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">since the when </p>
                                    </div>
                                    <div className="flex flex-row gap-[11px]">
                                        <p className="text-[9px] font-[400]">printer took </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 2 */}

            <div className="w-[794px] pl-[58px] py-[20px]  bg-[#F5F7FB] flex flex-row gap-[31px] h-[1122px]">
                <div className="w-[476px] bg-[#FFFFFF] px-[20px] py-[20px] flex flex-col gap-[14px]">
                    <div>
                        <p className="text-[12px] font-[700]">EXPERIENCE (CONTINUED)</p>
                    </div>

                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[9px] font-[500]">20YY - 20YY</p>
                        <p className="text-[11px] font-[600]">ENTER YOUR JOB POSITION</p>
                        <p className="text-[9px] font-[500]">
                            Company Name Here / Location{" "}
                        </p>
                        <p className="text-[9px] font-[400]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry Ipsum has been the industry's standard dummy text ever
                            since the when unknown printer took a galley of type and scrambled
                            it to make a type specimen book Lorem Ipsum is simply dummy text
                            of the printing and typesetting industry Ipsum has
                        </p>
                        <ul style={{ listStyleType: "disc" }} className="pl-[20px]">
                            <li className="text-[9px] font-[400px]">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry Ipsum
                            </li>
                            <li className="text-[9px] font-[400px]">
                                has been the industry's standard dummy text ever since the
                            </li>
                            <li className="text-[9px] font-[400px]">
                                printer took a galley of type and scrambled it to make a type
                                specimen book Lorem I
                            </li>
                            <li className="text-[9px] font-[400px]">
                                Ipsum is simply dummy text of the printing and typesetting industry
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[9px] font-[500]">20YY - 20YY</p>
                        <p className="text-[11px] font-[600]">ENTER YOUR JOB POSITION</p>
                        <p className="text-[9px] font-[500]">
                            Company Name Here / Location{" "}
                        </p>
                        <p className="text-[9px] font-[400]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry Ipsum has been the industry's standard dummy text ever
                            since the when unknown printer took a galley of type and scrambled
                            it to make a type specimen book Lorem Ipsum is simply dummy text
                            of the printing and typesetting industry Ipsum has
                        </p>
                        <ul style={{ listStyleType: "disc" }} className="pl-[20px]">
                            <li className="text-[9px] font-[400px]">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry Ipsum
                            </li>
                            <li className="text-[9px] font-[400px]">
                                has been the industry's standard dummy text ever since the
                            </li>
                            <li className="text-[9px] font-[400px]">
                                printer took a galley of type and scrambled it to make a type
                                specimen book Lorem I
                            </li>
                            <li className="text-[9px] font-[400px]">
                                Ipsum is simply dummy text of the printing and typesetting industry
                            </li>
                        </ul>

                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <div>
                            <p className="text-[12px] font-[700]">INTERESTS</p>
                        </div>
                        <div>
                            <ul style={{ listStyleType: "disc" }} className="pl-[20px] flex flex-row gap-[24px]">
                                <li className="text-[9px] font-[400]">Lorem Ipsum is simply </li>
                                <li className="text-[9px] font-[400]">printing and </li>
                            </ul>
                            <ul style={{ listStyleType: "disc" }} className="pl-[20px] flex flex-row gap-[24px]">
                                <li className="text-[9px] font-[400]">dummy text of the </li>
                                <li className="text-[9px] font-[400]">typesetting industry </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-[169px] bg-[#F5F7FB] flex flex-col gap-[44px] ">
                    <div className="w-[130px] h-[10px] bg-[#0077F9]"></div>
                    <div className="flex flex-col gap-[16px]">
                        <p>EXPERTISE</p>
                        <ul style={{ listStyleType: "disc" }} className="pl-[20px] flex flex-col gap-[9px]">
                            <li className="text-[9px] font-[400]">Lorem Ipsum is simply </li>
                            <li className="text-[9px] font-[400]">dummy text of the </li>
                            <li className="text-[9px] font-[400]">printing and </li>
                            <li className="text-[9px] font-[400]">typesetting industry </li>
                            <li className="text-[9px] font-[400]">Ipsum has been </li>
                            <li className="text-[9px] font-[400]">the industry's standard </li>
                            <li className="text-[9px] font-[400]">dummy text ever </li>
                            <li className="text-[9px] font-[400]">since the when unknown </li>
                            <li className="text-[9px] font-[400]">printer took a galley </li>
                            <li className="text-[9px] font-[400]">of type and scrambled </li>
                        </ul>
                    </div>
                    <div className="w-[130px] h-[0.5px] bg-[#36434E]"></div>

                    <div className="flex flex-col gap-[20px]">

                        <p className="text-[12px] font-[700]">AWARDS</p>
                        <div className="flex flex-col gap-[23px]">
                            <div>
                                <p className="text-[11.65px] font-[500]">20YY - 20YY</p>
                                <p className="text-[14.24px] font-[600]">AWARD NAME</p>
                                <p className="text-[11px] font-[500]">Company Name / Location</p>
                            </div>

                            <div>
                                <p className="text-[11.65px] font-[500]">20YY - 20YY</p>
                                <p className="text-[14.24px] font-[600]">AWARD NAME</p>
                                <p className="text-[11px] font-[500]">Company Name / Location</p>
                            </div>

                            <div>
                                <p className="text-[11.65px] font-[500]">20YY - 20YY</p>
                                <p className="text-[14.24px] font-[600]">AWARD NAME</p>
                                <p className="text-[11px] font-[500]">Company Name / Location</p>
                            </div>
                        </div>

                    </div>

                    <div className="w-[169px] h-[0.5px] bg-[#36434E]"></div>

                    <div className="flex flex-col gap-[20px] ">
                        <p className="text-[16px] font-[700]">SOCIAL INFO</p>
                        <div className="flex flex-col gap-[15px]">
                            <p className="text-[12px] font-[700]">Social.com/demousername</p>
                            <p className="text-[12px] font-[700]">Social.com/username</p>
                            <p className="text-[12px] font-[700]">Social.com/demousername</p>
                            <p className="text-[12px] font-[700]" >Social.com/username</p>
                        </div>
                    </div>




                </div>



            </div>



        </div>
    );
};

export default Resume7;