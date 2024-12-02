import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
function Footer({ isSubscribe, setIsSubcrib }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (value.includes(".com" && "@")) {
      setError("");
    } else {
      setError("! please enter a valid email");
    }
  };

  // const notify = () => toast("Wow so easy!");

  // const handleSubscribed = (e) => {
  // const handleSubscribed = (e) => {
  //   e.preventdefault();
  //   toast.error("something went wrong")
  //   console.log("click")
  //   if (email.trim() !== '' && !error) {
  //     setIsSubscribed(true);
  //     // Add any additional subscription logic here, e.g., API call
  //     console.log('Subscribed with email:', email);
  //     toast.error("Something Went Wrong!")
  //   } else {
  //     console.log('Valid email is required to subscribe');
  //   }
  // };

  const handleSubscribed = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && !error) {
      setIsSubscribed(true);
      toast.success("Subscribe successfully");
      // console.log('Subscribed with email:', email);
    } else {
    
      toast.error("please enter a valid email");
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="footer "
      id="footer_respo"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        background: "#00303B",
        gap: "12px",
      }}
    >
      <div className="footer_main_box py-[38px] customMargins">
        <div className="Footer_firstContainer">
          <div>
            <img
              style={{ width: "172px", height: "58px" }}
              src="/images/logo_skilotech.png"
              alt=""
            />
          </div>

          <p className="largest">
          Skilotech is the Modern Talent Platform for career development and recruitment
          </p>
         
        </div>
        <div className="flex gap-4 footerThird ml:w-[33%] scr420:justify-between justify-between break-word ">
          <div className="flex flex-col justify-between gap-4  flex-wrap address">
            <div className="footer_sub_address">
              <div className="footer_add ">
                <div className=" flex flex-col gap-1 ">
                  <p className="text-[#fff] font-[600]">Offices </p>
                  <div className="footer_address_Para">
                    <ul className="flex flex-col gap-[4px]">
                      <li className="flex flex-row gap-2 items-start  font-[400]  text-[14px]">
                        London, United Kingdom.
                      </li>
                      <li className="flex flex-row gap-2 items-start  font-[400]  text-[14px]">
                        Pune, India.
                      </li>
                      <li className="flex flex-row gap-2 items-start  font-[400] text-[14px]">
                        Harare, Zimbabwe.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col flex-wrap  ">
              <p className="footer_address_Email">Reach us </p>
              <p className="footer_address_Email_font flex flex-wrap font-[400] ">
                <a href="mailto:support@skilotech.com">support@skilotech.com</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="footer_about_section ">
              <p className="text-[#fff] font-[500] text-[16px]">About</p>
              <div className="footer_sub_about gap-[4px]">
                <p
                  onClick={() => openInNewTab("/TermsAndConditions")}
                  className="footer_sub_about_P cursor-pointer"
                >
                  Terms and Conditions
                </p>
                <p
                  onClick={() => openInNewTab("/PrivacyPolicy")}
                  className="footer_sub_about_P cursor-pointer "
                >
                  Privacy Policy
                </p>
                <p
                  onClick={() => router.push("/ContactUs")}
                  className="footer_sub_about_P cursor-pointer "
                >
                  Contact Us
                </p>
              </div>
            </div>
            {/* <div className="footer_about_section">
                <p className="footer_about_P">My Account</p>
                <div className="footer_sub_about">
                  <p className="footer_sub_about_P">Log Out</p>

                  <p className="footer_sub_about_P" >

                    My Profile
                  </p>
                </div>
              </div> */}
          </div>
        </div>
        <div className="footer_input_conatainer ml:w-[60%]  flex flex-col justify-between">
          <div className="flex flex-col items-center gap-[20px] footer_input_container">
           
            <p className="footer_input_conatainer_P text-center text-[14px] font-[500]">
              Like to stay market relevant with news and updates?
            </p>
            <div className="footer_input relative ">
              <input
                className="footer_input_bar text-[#444444] font-normal"
                type="text"
                placeholder="Enter your email address here..."
                value={email}
                onChange={handleChange}
                required
              />
              {/* {error && <div className="error_message text-[8px] absolute bg-white px-[4px] py-[0.5px] rounded-[4px] font-[500] top-[60px] left-[10px] text-red">{error}</div>} */}
              <div className="footer_inner_input_box"></div>
              <button
                onClick={handleSubscribed}
                className="footer_input_btn btn_hover_effect"
                // disabled={error || email.trim() === ''}
              >
                Subscribe
              </button>
              {/* {isSubscribed && <p className="subscription_message">Thank you for subscribing!</p>} */}
            </div>
          </div>
          <div className="">
            <div className=" flex gap-6 justify-center ">
              <a
                href="https://www.facebook.com/profile.php?id=61559079794587&mibextid=ZbWKwL"
                target="_blank"
              >
                <img
                  className="media h-[28px] w-[28px]"
                  src="/images/fb.png"
                  alt=""
                />
              </a>
              <a href="https://x.com/Skilotech_Hrms" target="_blank">
                <img className="media h-[28px] w-[28px]" src="/images/twitter.png" alt="" />
              </a>
              <a
                href="https://www.instagram.com/skilotech_hrms/?hl=en"
                target="_blank"
              >
                <img
                  className="media h-[28px] w-[28px]"
                  src="/images/instagram_icon.png"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.youtube.com/@Skilotech-ss9nl"
                target="_blank"
              >
                <img
                  className="media h-[28px] w-[28px]"
                  src="/images/youtube_icon.png"
                  alt=""
                />
              </a>
              <a
                href="https://www.linkedin.com/company/skilotech/"
                target="_blank"
              >
                <img
                  className="media h-[28px] w-[28px]"
                  src="/images/linkedin_icon.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          
        </div>
     
      </div>
  

      <div className="footer_copyright">
        Copyright © 2024 Skilotech. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;