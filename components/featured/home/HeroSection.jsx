import React from "react";

function HeroSection() {
  return (
    <div >
      <div className="hero_section_parent">

        <div className="hero_wrapper  customMargins  ">
          <div className="slider1 ">
            <div className="only_slider1 ">
              <img style={{
                position: 'absolute',
                width: '107rem',
                right: "5%",
              }} className="only_slider1 " src="./images/home/Rectangle_1.png" alt="" />
            </div>
            <div >
              <div className="title_cont">
                <p className="p0 ">Empowering</p>{" "}
                <p className="p3">Job Seekers,</p>
              </div>
            </div>
          </div>
          
            <div className="hero_wrapper2">
              <div className="slider2">
                <div className="only_slider1">
                  <img style={{
                    position: 'absolute',
                    
                    right: '10%',
                  }}  src="./images/home/Rectangle_3.png" alt="" />
                </div>
                <div >
                  <div className="title_cont">
                    <p className="p1 ">Connecting </p>{" "}
                    <p className="p2">Employers</p>
                  </div>
                </div>
              </div>
            </div>
          
        </div>
        {/* <div className="landing_container"> */}
        <div className="customMargins1">
          <div className="animation_parent ">
            <div className="hr_animation_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="yellow_animation"
                width="90%"
                // height="307"
                viewBox="0 0 351 307"
                fill="none"
              >
                <path
                  d="M250.234 188.927C215.561 279.795 219.097 330.171 130.409 296.329C41.7199 262.487 -25.0638 159.138 9.60983 68.2696C44.2835 -22.5987 230.442 -7.45664 319.131 26.3853C407.819 60.2273 284.908 98.0589 250.234 188.927Z"
                  fill="#FBD515"
                />
              </svg>
              {/* <div className="yellow_animation"> </div> */}

              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="blue_animation"
                
                  viewBox="0 0 315 377"
                  fill="none"
                >
                  <g filter="url(#filter0_b_2474_41366)">
                    <path
                      d="M267.95 207.716C267.95 322.225 289.214 376.154 194.288 376.154C99.3615 376.154 0.121094 290.501 0.121094 175.992C0.121094 61.4822 179.446 0 274.372 0C369.298 0 267.95 93.206 267.95 207.716Z"
                      fill="#00A2E8"
                      fill-opacity="0.7"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_b_2474_41366"
                      x="-11.6706"
                      y="-11.7917"
                      width="338.42"
                      height="399.737"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="5.89583"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2474_41366"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2474_41366"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              }
              {/* <div className="blue_animation"></div> */}

              <img src="./images/home/girl.png" alt="" className="female" />
              <img src="./images/home/man_img.png" alt="" className="male" />
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="customMargins">
          <div className="main_para_cont">
            <p className="para_paragraf">
              Discover your dream career with SkiloTech. We're your one-stop
              destination for job opportunities that match your skills and
              aspirations. Find, apply, and excel in your next job effortlessly.
              Start your journey to success today!
            </p>
          </div>

          <button className="btn_for_join">Join Now</button>

          <div className="searchbox">

            <div className="searchBar">
              <div className="sub_searchBar_one">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5vw"
                  height="5vh"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M27.125 27.125L33.25 33.25L27.125 27.125ZM8.75 19.25C8.75 20.6289 9.02159 21.9943 9.54926 23.2682C10.0769 24.5421 10.8504 25.6996 11.8254 26.6746C12.8004 27.6496 13.9579 28.4231 15.2318 28.9507C16.5057 29.4784 17.8711 29.75 19.25 29.75C20.6289 29.75 21.9943 29.4784 23.2682 28.9507C24.5421 28.4231 25.6996 27.6496 26.6746 26.6746C27.6496 25.6996 28.4231 24.5421 28.9507 23.2682C29.4784 21.9943 29.75 20.6289 29.75 19.25C29.75 16.4652 28.6438 13.7945 26.6746 11.8254C24.7055 9.85625 22.0348 8.75 19.25 8.75C16.4652 8.75 13.7945 9.85625 11.8254 11.8254C9.85625 13.7945 8.75 16.4652 8.75 19.25V19.25Z"
                    stroke="#333333"
                    stroke-width="3.1544"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="search_p">Job title or keyword</p>
              </div>

              <img className="searcgBarLine " src="./images/home/searcgBarLine.png" alt="" />
              <div className="sub_searchBar_two">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4vw"
                  height="4vh"
                  viewBox="0 0 35 34"
                  fill="none"
                >
                  <path
                    d="M28.3919 14.1666C28.3919 20.4255 17.0586 31.1666 17.0586 31.1666C17.0586 31.1666 5.72522 20.4255 5.72522 14.1666C5.72522 11.1609 6.91926 8.27818 9.04468 6.15277C11.1701 4.02736 14.0528 2.83331 17.0586 2.83331C20.0643 2.83331 22.947 4.02736 25.0724 6.15277C27.1978 8.27818 28.3919 11.1609 28.3919 14.1666V14.1666Z"
                    stroke="#333333"
                    stroke-width="3.1544"
                  />
                  <path
                    d="M17.0588 15.5833C17.4345 15.5833 17.7948 15.4341 18.0605 15.1684C18.3262 14.9027 18.4754 14.5424 18.4754 14.1667C18.4754 13.7909 18.3262 13.4306 18.0605 13.1649C17.7948 12.8993 17.4345 12.75 17.0588 12.75C16.683 12.75 16.3227 12.8993 16.057 13.1649C15.7913 13.4306 15.6421 13.7909 15.6421 14.1667C15.6421 14.5424 15.7913 14.9027 16.057 15.1684C16.3227 15.4341 16.683 15.5833 17.0588 15.5833Z"
                    fill="white"
                    stroke="#333333"
                    stroke-width="3.1544"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="search_p">Colney, United Kingdom</p>
              </div>
              <button className="searchbtn">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection
