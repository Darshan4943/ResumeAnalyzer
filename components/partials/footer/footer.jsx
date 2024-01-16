import { useRouter } from "next/router";
import React from "react";

function Footer() {
  const router = useRouter();
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
                <img
                  className="media"
                  src="/images/home/facebook_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/twitter_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/instagram_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/linkedin_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/youtube_icon.png"
                  alt=""
                />
              </div>
            </div>
        </div>
        <div className="Footer_secondContainer ">
          <div className="flex gap-4 footerThird w-full scr420:justify-center justify-between break-all">
            <div className="flex flex-col justify-between gap-4  flex-wrap address">
              <div className="footer_sub_address">
                <div>
                  <p className="footer_address_P">Address</p>
                </div>
                <div className="footer_add">
                  <div>
                    <p className="text-[#fff] font-[600]">Offices :</p>
                    <p className="footer_address_Para">
                      Pune India, <br /> Harare Zimbabwe,<br /> London United Kingdom
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col flex-wrap  ">
                <p className="footer_address_Email">Email </p>
                <p className="footer_address_Email_font flex flex-wrap">
                  info@skilotech.com
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="footer_about_section ">
                <p className="footer_about_P">About</p>
                <div className="footer_sub_about">
                  <p className="footer_sub_about_P">Terms and Conditions</p>
                  <p className="footer_sub_about_P">Privacy Policy</p>
                  <p
                    onClick={() => router.push("/components/models/Contact")}
                    className="footer_sub_about_P"
                  >
                    {" "}
                    Contact Us
                  </p>
                </div>
              </div>
              <div className="footer_about_section">
                <p className="footer_about_P">My Account</p>
                <div className="footer_sub_about">
                  <p className="footer_sub_about_P">Log Out</p>

                  <p className="footer_sub_about_P" >

                    My Profile
                  </p>
                </div>
              </div>

            </div>
          </div>
          <div className="footer_input_conatainer">
            <p className="footer_input_conatainer_P text-center">
              Like to stay market relevant  with news and updates?{" "}
            </p>
            <div className="footer_input ">
              <input
                className="footer_input_bar"
                type="text"
                name=""
                placeholder="Enter your email address here..."
                id=""
              />
              <div className="footer_inner_input_box"></div>
              <button className="footer_input_btn">Subscribe</button>
            </div>
            <div className="flex gap-4 justify-center">
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
            </div>
          </div>
          <div className="mobile">
              <div className=" flex sm:gap-6 gap-4 items-center">
                <div className="text-[#06A9EF] sm:text-[24px] text-[14px]">
                Connect us
                </div>
                <img
                  className="media"
                  src="/images/home/facebook_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/twitter_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/instagram_icon.png"
                  alt=""
                />
                <img
                  className="media"
                  src="/images/home/linkedin_icon.png"
                  alt=""
                />
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
          fill="none" className="footerLine"
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
