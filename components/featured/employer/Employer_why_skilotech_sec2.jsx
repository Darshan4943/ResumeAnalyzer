import React from "react";

function Employer_why_skilotech_sec2() {
  return (
    <div className="Employer_why_skilotech_sec2_container">
      <div className="Employer_why_skilotech_sec2_sub_container">
        <div className="cart-wrapper">
          {[1, 2, 3, 4, 5, 6].map((current, index) => (
            <div className="Employer_why_skilotech_sec2_cart" key={index}>
              <div className="Employer_why_skilotech_sec2_cart_1st">
                <svg
                className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="42"
                  viewBox="0 0 48 42"
                  fill="none"
                >
                  <path
                  className="Employer_why_skilotech_sec2_cart_1st_img"
                    d="M44.2353 8.76478H34.8078V4.05889C34.8078 1.98304 33.119 0.294189 31.0431 0.294189H16.9569C14.881 0.294189 13.1922 1.98304 13.1922 4.05889V8.76478H3.76471C1.68885 8.76478 0 10.4536 0 12.5295V22.4118C0 23.7707 0.7344 25.008 1.88235 25.6719V37.9412C1.88235 40.0171 3.5712 41.7059 5.64706 41.7059H42.3529C44.4288 41.7059 46.1176 40.0171 46.1176 37.9412V25.672C47.2655 25.0083 48 23.7709 48 22.4118V12.5295C48 10.4536 46.3112 8.76478 44.2353 8.76478ZM15.0745 4.05889C15.0745 3.02097 15.919 2.17654 16.9569 2.17654H31.0431C32.081 2.17654 32.9255 3.02097 32.9255 4.05889V8.76478H31.0745V5.00007C31.0745 4.48035 30.6532 4.05889 30.1334 4.05889H17.8981C17.3783 4.05889 16.9569 4.48035 16.9569 5.00007V8.76478H15.0745V4.05889ZM29.1922 8.76478H18.8392V5.94125H29.1922V8.76478ZM44.2353 37.9412C44.2353 38.9792 43.3909 39.8236 42.3529 39.8236H5.64706C4.60913 39.8236 3.76471 38.9792 3.76471 37.9412V26.1927C6.23944 26.6532 17.8606 28.8153 19.7647 29.1696V32.2942C19.7647 33.3321 20.6091 34.1765 21.6471 34.1765H26.3529C27.3909 34.1765 28.2353 33.3321 28.2353 32.2942V29.1696C31.0094 28.6535 43.0452 26.4142 44.2353 26.1927V37.9412ZM26.3529 32.2942H21.6471C21.6471 30.7755 21.6471 26.8959 21.6471 25.7059H26.3529V32.2942ZM46.1176 22.4118C46.1176 23.2074 45.6146 23.92 44.8662 24.1858C44.8555 24.1894 28.246 27.2529 28.2353 27.2548V25.7059C28.2353 24.668 27.3909 23.8236 26.3529 23.8236H21.6471C20.6091 23.8236 19.7647 24.668 19.7647 25.7059V27.2548C2.90692 24.1241 3.92885 24.2942 3.76471 24.2942C2.72122 24.2942 1.88235 23.4461 1.88235 22.4118V12.5295C1.88235 11.4916 2.72678 10.6471 3.76471 10.6471H44.2353C45.2732 10.6471 46.1176 11.4916 46.1176 12.5295V22.4118Z"
                    fill="#646464"
                  />
                </svg>{" "}
                <div className="Employer_why_skilotech_sec2_cart_1st_head">Post Jobs for Free</div>
              </div>
              <div className="Employer_why_skilotech_sec2_cart_2nd">
                Create job postings on Skilotech to find candidates both
                domestically and abroad. All you have to do to make an account
                is signup.
              </div>
              {/* {index % 3 === 2 ? <div className="clear"></div> : null} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
    
export default Employer_why_skilotech_sec2;
