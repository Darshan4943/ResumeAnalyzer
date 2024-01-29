import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ALink from "@/components/alink";
import { useRouter } from "next/router";
const Employer_register = () => {
    const router = useRouter();
    const [tog, setTog] = useState(1);

    function updateTog(id) {
        setTog(id);
    }

    useEffect(() => {
        if (tog === 2) {

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [tog]);
    return (
        <div className=" pb-[61px] relative" >


            {/* // SECOND SECTION  */}


            <div className="ml:sticky top-0 w-[100%] ml:mt-[-2.4rem] pb-6 z-[900] bg-white">
                <div className="register_head">
                    <div className="register_employer overflow-hidden">
                        <div className="register_text_parent">
                            <p className="register_heding_text_employer text-[20px] scr390:text-[30px] sm:text-[40px]">Register as Employer</p>
                            <p className="register_heding_descEmployer text-[14px] sm:text-[16px]">
                                Start your career with Skilotech
                            </p>
                        </div>
                    </div>
                </div>
                <div className="comp_lines">
                    <div className="c_parent sm:w-[360px] w-[180px]">
                        <img src="/images/auth/employer/c1.png" alt="" className="c1_img" />
                        <div className="line_one_two"></div>
                        <img src="/images/auth/employer/c2.png" alt="" className="c1_img" />
                    </div>
                </div>
                <div className="main_comp_lines">
                    <div className="c_parent_det sm:gap-[180px] gap-[60px]">
                        <div className="compd1">
                            <p className="details text-[14px] sm:text-[16px]">Company Details</p>
                        </div>
                        <div className="compd1">
                            <p className="details text-[14px] sm:text-[16px]">Upload Documents</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* animation section  */}

            <div className={`${tog === 1 ? "show-content" : "content"}  pt-[-10px]`}>
                <div className="sec_main_parent_head ">
                    <div className="img_parent_head register_back_block">
                        <div className="four_img_cont ">
                            <div className="img_contener1">
                                <img
                                    src="/images/auth/employer/rec_img1.png"
                                    alt=""
                                    className="first_img_div"
                                />
                            </div>
                            <div className="img_contener2">
                                <img
                                    src="/images/auth/employer/rec_img2.png"
                                    alt=""
                                    className="sec_img_div"
                                />
                            </div>
                            <div className="img_contener3">
                                <img
                                    src="/images/auth/employer/rec_img3.png"
                                    alt=""
                                    className="three_img_div"
                                />
                            </div>
                            <div className="img_contener4">
                                <img
                                    src="/images/auth/employer/rec_img4.png"
                                    alt=""
                                    className="four_img_div"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="main_register w-[90%]">
                        <div className="regiser_sec employer_register_card">
                            <div className="comp_name scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Company Name <span className="star">*</span>{" "}
                                </p>
                                <div className="employerInput scr700:w-[600px] w-[100%]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter company name"

                                    />
                                </div>
                            </div>
                            <div className="comp_name scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Company Email <span className="star">*</span>
                                </p>
                                <div className="employerInput  scr700:w-[600px] w-[100%]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter company Email"

                                    />
                                </div>
                            </div>
                            <div className="comp_name_pass scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Password <span className="star">*</span>
                                </p>
                                <div className="employerInput  scr700:w-[600px] w-[100%]">
                                    <input
                                        type="password"
                                        name=""
                                        id=""
                                        placeholder="Create new password"

                                    />
                                </div>
                                <img src="/images/auth/employer/eye.png" alt="" className="eye_img" />
                            </div>
                            <div className="comp_name scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Contact number <span className="star">*</span>{" "}
                                </p>
                                <div className="employerInput  scr700:w-[600px] w-[100%]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter contact number"

                                    />
                                </div>
                            </div>
                            <div className="comp_name scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Company Website URL <span className="star">*</span>{" "}
                                </p>
                                <div className="employerInput  scr700:w-[600px] w-[100%]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter website url"

                                    />
                                </div>
                            </div>
                            <div className="comp_name scr700:w-auto w-[100%]">
                                <p className="comp_head">Year of Establish </p>
                                <div className="employerInput  scr700:w-[600px] w-[100%]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter year of establish"

                                    />
                                </div>
                            </div>
                            <div className="comp_name_pass scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Company Location <span className="star">*</span>
                                </p>
                                <div className="employerInput  scr700:w-[600px] w-[100%]">
                                    <input
                                        type="password"
                                        name=""
                                        id=""
                                        placeholder="Enter your current location"

                                    />
                                </div>
                                <img src="/images/auth/employer/eye.png" alt="" className="eye_img" />
                            </div>
                            <div className="bottom_buttons items-center">
                                <ALink href="/auth/Sign_up">
                                    <button
                                        className="go_button text-[14px] sm:text-[16px] sm:px-[36px] px-[25px]"
                                        //   onClick={() => updateTog(1)}
                                        id="border_button"
                                    >
                                        Go Back
                                    </button>
                                </ALink>
                                <button
                                    className="go_button  text-[14px] sm:text-[16px] sm:px-[36px] px-[25px]"
                                    id="border_button"
                                    onClick={() => updateTog(2)}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="already">
                        <p className="have">
                            Already have an account? <span className="si_blue">Sign In</span>
                        </p>
                    </div>
                </div>
            </div>


            {/* THIRD SECTION    */}
            <div className={`${tog === 2 ? "show-content" : "content"} pt-10 `}>


                {/* ANIMATION SECTION  */}
                <div className="last_main_parent_head ">


                    <div className="last_img_parent_head register_back_block">
                        <div className="lastfour_img_cont">
                            <div className="last_img_contener1">
                                <img
                                    src="/images/auth/employer/last1.png"
                                    alt=""
                                    className="last_img_1"
                                />
                            </div>
                            <div className="last_img_contener2">
                                <img
                                    src="/images/auth/employer/last2.png"
                                    alt=""
                                    className="last_img_2"
                                />
                            </div>
                            <div className="last_img_contener3">
                                <img
                                    src="/images/auth/employer/last3.png"
                                    alt=""
                                    className="last_img_3"
                                />
                            </div>
                            <div className="last_img_contener4">
                                <img
                                    src="/images/auth/employer/last4.png"
                                    alt=""
                                    className="last_img_4"
                                />
                            </div>
                            <div className="last_img_contener5">
                                <img
                                    src="/images/auth/employer/last5.png"
                                    alt=""
                                    className="five_img_div"
                                />
                            </div>
                            <div className="last_img_contener6">
                                <img
                                    src="/images/auth/employer/last6.png"
                                    alt=""
                                    className="six_img_div"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="main_parent_last">
                        <div className="main_last scr700:w-[648px] w-[100%]">
                            <div className="two_both scr700:flex-row flex-col">
                                <div className="comp_name scr700:w-auto w-[100%]">
                                    <p className="comp_head">
                                        GST No <span className="star">*</span>{" "}
                                    </p>
                                    <div className="Employer_enter_name_gst">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter GST number"
                                            className=""
                                        />
                                    </div>
                                </div>
                                <div className="comp_name scr700:w-auto w-[100%]">
                                    <p className="comp_head">
                                        Upload Certificate <span className="star">*</span>{" "}
                                    </p>
                                    <div className="Employer_enter_name_gst">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Upload certificate"
                                            className=""
                                        />
                                    </div>
                                    {/* <img src="/images/home/eye.png" alt="" /> */}
                                </div>
                            </div>
                            <div className="two_both_sec scr700:flex-row flex-col">
                                <div className="comp_name scr700:w-auto w-[100%]">
                                    <p className="comp_head">
                                        PAN No <span className="star">*</span>{" "}
                                    </p>
                                    <div className="Employer_enter_name_gst">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter PAN number"

                                        />
                                    </div>
                                </div>
                                <div className="comp_name scr700:w-auto w-[100%]">
                                    <p className="comp_head">
                                        Upload PAN <span className="star">*</span>{" "}
                                    </p>
                                    <div className="Employer_enter_name_gst">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Upload PAN"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="comp_name_last scr700:w-auto w-[100%]">
                                <p className="comp_head">
                                    Company Logo <span className="star">*</span>{" "}
                                </p>
                                <div className="Employer_enter_name_gst">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Upload company logo"

                                    />
                                </div>
                            </div>

                            <div className="bottom_buttons_last">
                                <button
                                    className="go_button text-[14px] sm:text-[16px] sm:px-[36px] px-[25px]"
                                    id="border_button"
                                    onClick={() => updateTog(1)}
                                >
                                    Go Back
                                </button>
                                <button onClick={() => {

                                    router.push("/employer/afterLogin/EmployerHome");
                                }} className="go_button text-[14px] sm:text-[16px] sm:px-[36px] px-[25px]" id="border_button">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employer_register;