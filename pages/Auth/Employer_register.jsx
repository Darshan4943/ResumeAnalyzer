import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ALink from "~/components/alink";
const Employer_register = () => {
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
        <div className="mt-[24px]" >


            {/* // SECOND SECTION  */}

           
                <div className="fixed w-[100%] py-[40px] z-[900] bg-white">
                    <div className="register_head">
                        <div className="register_cadidate">
                            <div className="register_text_parent">
                                <p className="register_heding_text">Register as Employer</p>
                                <p className="register_heding_desc">
                                    Start your career with Skilotech
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="comp_lines">
                        <div className="c_parent">
                            <img src="./images/auth/employer/c1.png" alt="" className="c1_img" />
                            <div className="line_one_two"></div>
                            <img src="./images/auth/employer/c2.png" alt="" className="c1_img" />
                        </div>
                    </div>
                    <div className="main_comp_lines">
                        <div className="c_parent_det">
                            <div className="compd1">
                                <p className="details">Company Details</p>
                            </div>
                            <div className="compd1">
                                <p className="details">Upload Documents</p>
                            </div>
                        </div>
                    </div>
                </div>
                                  {/* animation section  */}
                                  
                <div className={tog === 1 ? "show-content" : "content"}>
                <div className="sec_main_parent_head pt-[220px]">
                    <div className="img_parent_head">
                        <div className="four_img_cont">
                            <div className="img_contener1">
                                <img
                                    src="./images/auth/employer/rec_img1.png"
                                    alt=""
                                    className="first_img_div"
                                />
                            </div>
                            <div className="img_contener2">
                                <img
                                    src="./images/auth/employer/rec_img2.png"
                                    alt=""
                                    className="sec_img_div"
                                />
                            </div>
                            <div className="img_contener3">
                                <img
                                    src="./images/auth/employer/rec_img3.png"
                                    alt=""
                                    className="three_img_div"
                                />
                            </div>
                            <div className="img_contener4">
                                <img
                                    src="./images/auth/employer/rec_img4.png"
                                    alt=""
                                    className="four_img_div"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="main_register">
                        <div className="regiser_sec">
                            <div className="comp_name">
                                <p className="comp_head">
                                    Company Name <span className="star">*</span>{" "}
                                </p>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter company name"
                                    className="enter_name"
                                />
                            </div>
                            <div className="comp_name">
                                <p className="comp_head">
                                    Company Email <span className="star">*</span>
                                </p>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter company Email"
                                    className="enter_name"
                                />
                            </div>
                            <div className="comp_name_pass">
                                <p className="comp_head">
                                    Password <span className="star">*</span>
                                </p>
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Create new password"
                                    className="enter_name"
                                />
                                <img src="./images/auth/employer/eye.png" alt="" className="eye_img" />
                            </div>
                            <div className="comp_name">
                                <p className="comp_head">
                                    Contact number <span className="star">*</span>{" "}
                                </p>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter contact number"
                                    className="enter_name"
                                />
                            </div>
                            <div className="comp_name">
                                <p className="comp_head">
                                    Company Website URL <span className="star">*</span>{" "}
                                </p>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter website url"
                                    className="enter_name"
                                />
                            </div>
                            <div className="comp_name">
                                <p className="comp_head">Year of Establish </p>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter year of establish"
                                    className="enter_name"
                                />
                            </div>
                            <div className="comp_name_pass">
                                <p className="comp_head">
                                    Company Location <span className="star">*</span>
                                </p>
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Enter your current location"
                                    className="enter_name"
                                />
                                <img src="./images/auth/employer/eye.png" alt="" className="eye_img" />
                            </div>
                            <div className="bottom_buttons">
                                <ALink href="/Auth/Sign_up">
                                    <button
                                        className="go_button"
                                        //   onClick={() => updateTog(1)}
                                        id="border_button"
                                    >
                                        Go Back
                                    </button>
                                </ALink>
                                <button
                                    className="go_button"
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
            <div className={`${tog === 2 ? "show-content" : "content"}  `}>


                {/* ANIMATION SECTION  */}
                <div className="last_main_parent_head pt-[290px]">


                    <div className="last_img_parent_head">
                        <div className="lastfour_img_cont">
                            <div className="last_img_contener1">
                                <img
                                    src="./images/auth/employer/last1.png"
                                    alt=""
                                    className="last_img_1"
                                />
                            </div>
                            <div className="last_img_contener2">
                                <img
                                    src="./images/auth/employer/last2.png"
                                    alt=""
                                    className="last_img_2"
                                />
                            </div>
                            <div className="last_img_contener3">
                                <img
                                    src="./images/auth/employer/last3.png"
                                    alt=""
                                    className="last_img_3"
                                />
                            </div>
                            <div className="last_img_contener4">
                                <img
                                    src="./images/auth/employer/last4.png"
                                    alt=""
                                    className="last_img_4"
                                />
                            </div>
                            <div className="last_img_contener5">
                                <img
                                    src="./images/auth/employer/last5.png"
                                    alt=""
                                    className="five_img_div"
                                />
                            </div>
                            <div className="last_img_contener6">
                                <img
                                    src="./images/auth/employer/last6.png"
                                    alt=""
                                    className="six_img_div"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="main_parent_last">
                        <div className="main_last">
                            <div className="two_both">
                                <div className="comp_name">
                                    <p className="comp_head">
                                        GST No <span className="star">*</span>{" "}
                                    </p>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter GST number"
                                        className="enter_name_gst"
                                    />
                                </div>
                                <div className="comp_name">
                                    <p className="comp_head">
                                        Upload Certificate <span className="star">*</span>{" "}
                                    </p>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Upload certificate"
                                        className="enter_name_gst"
                                    />
                                    {/* <img src="./images/home/eye.png" alt="" /> */}
                                </div>
                            </div>
                            <div className="two_both_sec">
                                <div className="comp_name">
                                    <p className="comp_head">
                                        PAN No <span className="star">*</span>{" "}
                                    </p>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter PAN number"
                                        className="enter_name_gst"
                                    />
                                </div>
                                <div className="comp_name">
                                    <p className="comp_head">
                                        Upload PAN <span className="star">*</span>{" "}
                                    </p>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Upload PAN"
                                        className="enter_name_gst"
                                    />
                                </div>
                            </div>
                            <div className="comp_name_last">
                                <p className="comp_head">
                                    Company Logo <span className="star">*</span>{" "}
                                </p>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Upload company logo"
                                    className="enter_name_last"
                                />
                            </div>

                            <div className="bottom_buttons_last">
                                <button
                                    className="go_button"
                                    id="border_button"
                                    onClick={() => updateTog(1)}
                                >
                                    Go Back
                                </button>
                                <button className="gen_button" id="border_button">
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