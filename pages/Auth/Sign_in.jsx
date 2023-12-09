import React from "react";
import ALink from "~/components/alink";

function Sign_in() {
  return (
    <div className="flex justify-center items-center py-12">
      <div
        className="flex w-[464px] p-[24px] gap-[24px] flex-col justify-center items-center rounded-[24px] "
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="text-[30px] font-[600]">Welcome</div>
        <div className="w-full flex flex-col gap-[24px] ">
          <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] border-solid border-[#9D9D9D]">
            <input type="text" name="" id="" placeholder="Enter Email" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] border-solid border-[#9D9D9D] justify-between">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter password"
                className="w-full"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_4203_46482)">
                  <path
                    d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                    fill="#9D9D9D"
                  />
                </g>
              </svg>
            </div>
            <div className="flex justify-end text-[#06A9EF] text-[12px] font-[500] ">
              <a href="" className="already_sign">Forgot password?</a>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[16px]">
          <button className="w-full px-[36px] py-[12px] rounded-[12px] border-[1px] border-solid border-[#06a9ef] text-[20px] font-[500] hover:bg-[#06a9ef] hover:text-[#fff] transition-all duration-200">
            Sign In
          </button>
          <div className="flex flex-row items-center justify-center gap-[6px]">
            <div className="w-[50%] h-[1px] bg-[#9D9D9D]"></div>Or
            <div className="w-[50%] h-[1px] bg-[#9D9D9D]"></div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <ALink href="/Auth/Sign_up">
              <button className="w-full px-[36px] py-[12px] rounded-[12px] border-[1px] border-solid border-[#06a9ef] bg-[#06a9ef] text-white text-[20px] font-[500] hover:text-[#333]  continue_btn">
                Sign up
              </button>
            </ALink>
            <div className="text-[12px]">
              By signing in, you agree to our{" "}
              <span className="already_sign"
                style={{
                  fontSize: "12px",
                  color: "#06A9EF",
                }}
              >
                <a href="">Terms & Conditions</a>
              </span>{" "}
              and{" "}
              <span className="already_sign"
                style={{
                  fontSize: "12px",
                  color: "#06A9EF",
                }}
              >
                {" "}
                <a href="">Privacy Policy.</a>
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
              
    </div>
  );
}

export default Sign_in;
