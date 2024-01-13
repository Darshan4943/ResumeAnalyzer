import React, { useState, useEffect } from "react";

function Employer_sorting({ showAnimation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
  const [showMain, setShowMain] = useState(false);
  useEffect(() => {
    setShowMain(showAnimation);
    setCurrentIndex(0);
    setShowDiv(false);
  }, [showAnimation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiv(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showAnimation]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 3400);

    return () => clearTimeout(timer);
  }, [showAnimation]);

  const divs = [
    <div key={0}></div>,
    <div key={1} className="animation 1st">
      <img
        src="/images/employer/Employer_sorting/Frame1.png"
        className="i a img1"
        alt=""
      />
    </div>,
    <div key={2} className="animation 2nd">
      <img
        src="/images/employer/Employer_sorting/Frame1.png"
        className="i img1"
        alt=""
      />
      <img
        src="/images/employer/Employer_sorting/Frame2.png"
        className="i a img2"
        alt=""
      />
    </div>,
    <div key={3} className="animation 3rd">
      <img
        src="/images/employer/Employer_sorting/Frame1.png"
        className="i img1"
        alt=""
      />
      <img
        src="/images/employer/Employer_sorting/Frame2.png"
        className="i img2"
        alt=""
      />
      <img
        src="/images/employer/Employer_sorting/Frame3.png"
        className="i a img3"
        alt=""
      />
    </div>,
    <div key={4} className="animation 4rt">
      {[1, 2, 3, 4].map((item) => (
        <img
          src={`/images/employer/Employer_sorting/Frame${item}.png`}
          className={`i ${item == 4 && "a"} img${item}`}
          alt=""
        />
      ))}{" "}
    </div>,
    <div key={5} className="animation 5th">
      {[1, 2, 3, 4, 5].map((item) => (
        <img
          src={`/images/employer/Employer_sorting/Frame${item}.png`}
          className={`i ${item == 5 && "a"} img${item}`}
          alt=""
        />
      ))}{" "}
    </div>,
    <div key={6} className="animation 6th">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <img
          src={`/images/employer/Employer_sorting/Frame${item}.png`}
          className={`i ${item == 6 && "a"} img${item}`}
          alt=""
        />
      ))}{" "}
    </div>,
    <div key={7} className="animation 7th">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <img
          src={`/images/employer/Employer_sorting/Frame${item}.png`}
          className={`i ${item == 7 && "a"} img${item}`}
          alt=""
        />
      ))}
    </div>,
    <div key={8} className="animation 8th">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <img
          src={`/images/employer/Employer_sorting/Frame${item}.png`}
          className={`i ${item == 8 && "a"} img${item}`}
          alt=""
        />
      ))}
    </div>,
    <div key={9} className="animation 9th">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <img
          src={`/images/employer/Employer_sorting/Frame${item}.png`}
          className={`i ${item == 9 && "a"} img${item}`}
          alt=""
        />
      ))}
    </div>,
    // Add the rest of your divs here.
  ];

  const showNextDiv = () => {
    if (currentIndex < divs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    // You can use this effect to automatically advance to the next div at a certain interval.
    // For example, to show the next div every 2 seconds, you can use the setTimeout function.

    const timer = setTimeout(() => {
      showNextDiv();
    }, 200);

    // Cleanup the timer on unmount to avoid memory leaks.
    return () => clearTimeout(timer);
  }, [currentIndex, showAnimation]);

  return (

    
    <div style={{ overflow: "hidden" }} className="h-[40rem]">
      {showMain ? (
        <div className="Employer_sorting_container customMargins">
          <div className="Employer_sorting_sub_container">
            <div className="sorting_wrapper">
              <div className="sorting_head">
                Ai Powered <br />
                Candidate Sorting
              </div>
              <div className="sorting_2nd_heading">
                Improving candidate selection efficiency
              </div>
              <div className="sorting_para desk_para">
                <div className="sorting_para one">
                  AI-powered candidate sorting is an automated system that uses
                  artificial
                  <div className="sorting_para_white_div white_para1"></div>
                </div>
                <div className="sorting_para two">
                  intelligence to quickly and objectively evaluate job
                  applicants based on specific
                  <div className="sorting_para_white_div white_para2"></div>
                </div>
                <div className="sorting_para three">
                  criteria, streamlining the hiring process and improving
                  candidate selection efficiency.
                  <div className="sorting_para_white_div white_para3"></div>
                </div>
              </div>
              <div className="sorting_para phone_para">
                AI-powered candidate sorting is an automated system that uses
                artificial intelligence to quickly and objectively evaluate job
                applicants based on specific criteria, streamlining the hiring
                process and improving candidate selection efficiency.
              </div>
            </div>
            <div className="sorting_image">
              <img
                src="/images/employer/Employer_sorting/Frame4.png"
                alt=""
                className="sorting_image_animation"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="sorting_main-container customMargins">
            <div className="abc">
              {showDiv && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="179"
                  height="179"
                  viewBox="0 0 179 179"
                  fill="none"
                  className="anime-svg"
                >
                  <path
                    d="M173.321 178.143C176.458 177.674 178.621 174.75 178.152 171.613C177.683 168.476 174.759 166.313 171.622 166.782C168.485 167.251 166.322 170.175 166.791 173.312C167.26 176.449 170.184 178.612 173.321 178.143Z"
                    fill="#807983"
                  />
                  <path
                    d="M168.686 168.148C167.485 169.201 166.723 170.743 166.723 172.465C166.723 175.63 169.283 178.196 172.445 178.208C173.646 177.155 174.409 175.613 174.409 173.891C174.409 170.726 171.848 168.16 168.686 168.148Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M111.673 111.671C132.067 91.2761 132.067 58.2102 111.673 37.8158C91.2782 17.4214 58.2124 17.4214 37.818 37.8158C17.4236 58.2102 17.4236 91.2761 37.818 111.671C58.2124 132.065 91.2782 132.065 111.673 111.671Z"
                    fill="#EBE9EB"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M137.45 137.448C134.88 140.018 130.713 140.018 128.143 137.448L105.693 113.211L113.213 105.691L137.45 128.142C140.02 130.711 140.02 134.879 137.45 137.448Z"
                    fill="#807983"
                  />
                  <path
                    d="M107.431 111.79L105.846 113.375L128.143 137.448C129.627 138.932 131.642 139.553 133.575 139.324C133.695 137.5 133.063 135.635 131.668 134.24L107.431 111.79Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M114.953 123.207C116.422 121.95 117.859 120.636 119.249 119.246C120.639 117.856 121.953 116.419 123.209 114.95L114.21 106.615L106.617 114.208L114.953 123.207Z"
                    fill="#2C2031"
                  />
                  <path
                    d="M37.0829 37.0806C16.2822 57.8813 16.2822 91.6057 37.0829 112.406C57.8836 133.207 91.6075 133.207 112.408 112.406C133.209 91.6052 133.209 57.8808 112.408 37.0806C91.608 16.2804 57.8836 16.2804 37.0829 37.0806ZM105.392 105.39C88.4669 122.315 61.0252 122.315 44.0993 105.39C27.1735 88.4646 27.174 61.0229 44.0993 44.097C61.0247 27.1716 88.4664 27.1716 105.392 44.097C122.318 61.0224 122.318 88.4646 105.392 105.39Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M113.988 112.961C104.065 122.883 90.366 129.028 75.2583 129.028C45.0433 129.028 20.4609 104.446 20.4609 74.231C20.4609 44.0155 45.0433 19.4345 75.2583 19.4336C105.473 19.4341 130.056 44.0164 130.056 74.231C130.055 89.3387 123.91 103.038 113.988 112.961ZM42.0253 40.9984C33.5101 49.5136 28.2377 61.2659 28.2377 74.2314C28.2381 100.159 49.3316 121.253 75.2588 121.253C88.2209 121.253 99.9775 115.977 108.492 107.465C117.008 98.9502 122.28 87.1965 122.28 74.2314C122.28 48.3042 101.186 27.2108 75.2588 27.2103C62.2966 27.2103 50.5386 32.4846 42.0253 40.9984Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M115.267 115.265C104.886 125.645 90.553 132.075 74.7472 132.075C43.1346 132.075 17.416 106.357 17.416 74.7442C17.416 43.1312 43.1351 17.414 74.7472 17.4131C106.359 17.4136 132.078 43.1322 132.078 74.7442C132.078 90.5505 125.648 104.883 115.267 115.265ZM39.9769 39.9744C31.0677 48.8831 25.552 61.1795 25.5515 74.7442C25.552 101.87 47.6205 123.939 74.7467 123.939C88.3081 123.939 100.609 118.42 109.517 109.514C118.426 100.606 123.942 88.3085 123.942 74.7442C123.942 47.6181 101.873 25.5491 74.7467 25.5491C61.1858 25.5491 48.8841 31.0672 39.9769 39.9744Z"
                    fill="#807983"
                  />
                  <path
                    d="M172.467 172.465C168.056 176.877 160.904 176.877 156.492 172.465L117.957 130.862L130.864 117.955L172.467 156.49C176.879 160.902 176.879 168.054 172.467 172.465Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M130.868 117.956L117.961 130.862L118.284 131.211L131.216 118.279L130.868 117.956Z"
                    fill="#807983"
                  />
                  <path
                    d="M139.69 126.128L138.992 125.482L125.486 138.988L126.132 139.685L139.69 126.128Z"
                    fill="#807983"
                  />
                  <path
                    d="M148.165 133.978L147.467 133.332L133.336 147.463L133.982 148.16L148.165 133.978Z"
                    fill="#807983"
                  />
                  <path
                    d="M156.639 141.827L155.941 141.181L141.186 155.937L141.832 156.635L156.639 141.827Z"
                    fill="#807983"
                  />
                  <path
                    d="M165.114 149.676L164.416 149.03L149.035 164.41L149.681 165.108L165.114 149.676Z"
                    fill="#807983"
                  />
                  <path
                    d="M157.654 173.461L173.468 157.647C173.276 157.396 173.071 157.153 172.856 156.915L156.922 172.849C157.159 173.065 157.403 173.27 157.654 173.461Z"
                    fill="#807983"
                  />
                  <path
                    d="M170.152 161.17L127.321 121.498L117.957 130.862L156.492 172.466C160.904 176.877 168.056 176.877 172.467 172.466C172.954 171.979 173.377 171.454 173.757 170.909C174.02 167.419 172.821 163.839 170.152 161.17Z"
                    fill="#2C2031"
                  />
                  <path
                    d="M74.748 40.8062L108.685 74.7429C108.685 56.0004 93.4906 40.8062 74.748 40.8062Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M117.041 133.203C116.676 133.203 116.311 133.064 116.033 132.785C115.476 132.229 115.476 131.326 116.033 130.769L130.772 116.03C131.329 115.473 132.231 115.473 132.788 116.03C133.345 116.586 133.345 117.489 132.788 118.046L118.049 132.785C117.77 133.064 117.406 133.203 117.041 133.203Z"
                    fill="#807983"
                  />
                  <path
                    d="M125.482 138.986L126.128 139.684L136.144 129.669L135.446 129.023L125.482 138.986Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M144.618 137.518L143.921 136.872L133.332 147.46L133.978 148.158L144.618 137.518Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M153.093 145.367L152.395 144.721L141.182 155.935L141.828 156.632L153.093 145.367Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M161.568 153.217L160.87 152.57L149.031 164.409L149.678 165.106L161.568 153.217Z"
                    fill="#564D5A"
                  />
                  <path
                    d="M170.041 161.066L169.344 160.42L156.916 172.847C157.154 173.063 157.397 173.268 157.648 173.459L170.041 161.066Z"
                    fill="#564D5A"
                  />
                </svg>
              )}
            </div>
            <div className="animation-container">
              {divs[currentIndex]}
              {currentIndex < divs.length - 1 && (
                <button onClick={showNextDiv} className="animation-btn">
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employer_sorting;
