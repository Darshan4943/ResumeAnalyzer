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
      console.log("Valid email is required to subscribe");
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
        background: "#212121",
        gap: "24px",
      }}
    >
      <div className="footer_main_box customMargins">
        <div className="Footer_firstContainer">
          <div>
            <img
              style={{ width: "172px", height: "58px" }}
              src="/images/logo_skilotech.png"
              alt=""
            />
          </div>

          <p className="largest">
            Skilotech is the modern talent platform powered by Artificial
            Intelligence for career development and recruitment.
          </p>
          <div className="web">
            <div className=" flex gap-6 ">
              <a
                href="https://www.facebook.com/profile.php?id=61559079794587&mibextid=ZbWKwL"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/facebook_icon.png"
                  alt=""
                />
              </a>
              {/**    <a
                // href="https://www.instagram.com/skilotech_hrms/?hl=en"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/twitter_icon.png"
                  alt=""
                />
              </a> */}
              <a
                href="https://www.instagram.com/skilotech_hrms/?hl=en"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/instagram_icon.png"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/skilotech/"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/linkedin_icon.png"
                  alt=""
                />
              </a>
              {/** <img
                className="media"
                src="/images/home/youtube_icon.png"
                alt=""
              />*/}
            </div>
          </div>
        </div>
        <div className="Footer_secondContainer ">
          <div className="flex gap-4 footerThird ml:w-[45%] scr420:justify-between justify-between break-word pt-6">
            <div className="flex flex-col justify-between gap-4  flex-wrap address">
              <div className="footer_sub_address">
                {/* <div>
                  <p className="footer_address_P">Address</p>
                </div> */}
                <div className="footer_add ">
                  <div className=" flex flex-col gap-3">
                    <p className="text-[#fff] font-[600]">Offices </p>
                    <p className="footer_address_Para leading-6">
                      <ul className="flex flex-col gap-1">
                        <li className="flex flex-row gap-2 items-center">
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="5" cy="5" r="5" fill="#fff" />
                          </svg>
                          Harare, Zimbabwe.{" "}
                        </li>
                        <li className="flex flex-row gap-2 items-center">
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="5" cy="5" r="5" fill="#fff" />
                          </svg>
                          Pune, India.{" "}
                        </li>
                        <li className="flex flex-row gap-2 items-center">
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="5" cy="5" r="5" fill="#fff" />
                          </svg>
                          London, United Kingdom.{" "}
                        </li>
                       
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col flex-wrap  ">
                <p className="footer_address_Email">Email </p>
                <p className="footer_address_Email_font flex flex-wrap ">
                  <a href="mailto:support@skilotech.com">
                    support@skilotech.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="footer_about_section ">
                <p className="text-[#fff] font-[600]">About</p>
                <div className="footer_sub_about ">
                  <p
                    onClick={() => openInNewTab("/TermsAndConditions")}
                    className="footer_sub_about_P cursor-pointer leading-6"
                  >
                    Terms and Conditions
                  </p>
                  <p
                    onClick={() => openInNewTab("/PrivacyPolicy")}
                    className="footer_sub_about_P cursor-pointer leading-6"
                  >
                    Privacy Policy
                  </p>
                  <p
                    onClick={() => router.push("/ContactUs")}
                    className="footer_sub_about_P cursor-pointer leading-6"
                  >
                    {" "}
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
          <div className="footer_input_conatainer ml:w-[60%]  items-center">
            <p className="footer_input_conatainer_P text-center">
              Like to stay market relevant with news and updates?{" "}
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
            {/* <div className="flex gap-4 justify-center">
              <img
                className="playstore"
                src="/images/playStore.png"
                alt=""
              />
              <img
                className="playstore"
                src="/images/iosStore.png"
                alt=""
              />
            </div> */}
          </div>
          <div className="mobile">
            <div className=" flex sm:gap-6 gap-4 items-center">
              <div className="text-[#06A9EF] sm:text-[24px] text-[14px]">
                Connect us
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61559079794587&mibextid=ZbWKwL"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/facebook_icon.png"
                  alt=""
                />
              </a>

              <a
                href="https://www.instagram.com/skilotech_hrms/?hl=en"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/instagram_icon.png"
                  alt="Instagram"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/skilotech/"
                target="_blank"
              >
                <img
                  className="media"
                  src="/images/home/linkedin_icon.png"
                  alt=""
                />
              </a>
              <img
                className="media"
                src="/images/home/youtube_icon.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer_down_straight_line">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1"
          viewBox="0 0 986 1"
          fill="none"
          className="footerLine"
        >
          <path d="M1 0.5H985" stroke="#828282" strokeLinecap="round" />
        </svg>{" "}
      </div>

      <div className="footer_copyright">
        Copyright © 2024 Skilotech. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
