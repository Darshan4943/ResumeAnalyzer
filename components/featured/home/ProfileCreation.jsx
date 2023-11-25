import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
function Profile_creation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  const [isHovered9, setIsHovered9] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  

  const handleScroll = () => {
    if (window.scrollY >= 600 && !isAnimate) {
      setIsAnimate(true);
      setIsAnimation(true)
      window.removeEventListener('scroll', handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    if (isAnimate) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAnimate]);

  return (
    <div className="profile_creation_container customMargins">
      <div className="profile_creation_sub_container_one">
        <p className="profile_creation_head">Ai Powered profile creation</p>
        <p className="profile_creation_head_one">
          Easy process to create your profile
        </p>
        <p className="profile_creation_head_para">
          It streamlines job searches, improves candidate-employer matches, and
          contributes to a more efficient and effective job-seeking process.
        </p>
        <p className="profile_creation_head_steps">1. Upload your CV/Resume.</p>
        <p className="profile_creation_head_steps">
          2. Let system scan it and make your profile almost ready.
        </p>
      </div>

      <div className="profile_creation_sub_container_two" >

        <img className="Line_man" src="./images/home/Line_man.png" alt="" />
        {isAnimation && (
          <>
            <div className="animation_9" onMouseEnter={() => setIsHovered9(true)}

              onMouseLeave={() => {
                setTimeout(() => {
                  setIsHovered9(false);
                }, 1000);
              }}

              style={{ zIndex: isHovered9 ? 2 : 20  }}>
              <div className="animation_9_1" >

                <div className="animation_line9_img9">
                  <img src="./images/home/animation_line9_img9.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>

                <div className="animation_9_2"   >
                  <motion.div
                    className=""
                    initial={{ x: '100%' }}
                    animate={{ x: isHovered9 ? ['0%', '100%', '0%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '168px',
                      height: '90px',
                      background: 'white',
                      position: 'absolute',
                      left: -168,
                      zIndex: 20,
                      // clipPath:  'polygon(0% 0%, 60% 0, 100% 100%, 0 100%)' ,
                    }}
                  ></motion.div>

                  <div className="animation_line9" >
                    <img src="./images/home/animation_line9.png" alt="" />

                  </div>

                </div>
              </div>
            </div>


            <div className="animation_10" onMouseEnter={() => setIsHovered10(true)} onMouseLeave={() => {
              setTimeout(() => {
                setIsHovered10(false);
              }, 1000);
            }} >
              <div className="animation_10_1" >

                <div className="animation_line10_img10">
                  <img src="./images/home/animation_line10_img10.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>

                <div className="animation_10_2" >
                  <motion.div
                    className=""
                    initial={{ x: '100%' }}
                    animate={{ x: isHovered10 ? ['0%', '100%', '0%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '152px',
                      height: '80px',
                      background: 'white',
                      position: 'absolute',
                      left: -152,
                      zIndex: 2
                    }}
                  ></motion.div>
                  <div className="animation_line10">
                    <img src="./images/home/animation_line10.png" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="animation_8" onMouseEnter={() => setIsHovered8(true)} onMouseLeave={() => {
              setTimeout(() => {
                setIsHovered8(false);
              }, 1000);
            }} >
              <div className="animation_8_1" >

                <div className="animation_line8_img8">
                  <img src="./images/home/animation_line8_img8.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>

                <div className="animation_8_2" >
                  <motion.div
                    className=""
                    initial={{ x: '100%' }}
                    animate={{ x: isHovered8 ? ['0%', '100%', '0%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '131px',
                      height: '80px',
                      background: 'white',
                      position: 'absolute',
                      left: -131,
                      zIndex: 2
                    }}
                  ></motion.div>
                  <div className="animation_line8">
                    <img src="./images/home/animation_line8.png" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="animation_7" onMouseEnter={() => setIsHovered7(true)} onMouseLeave={() => {
              setTimeout(() => {
                setIsHovered7(false);
              }, 1000);
            }} style={{ zIndex: isHovered7 ? 1 : 15 }}>
              <div className="animation_7_1" >



                <div className="animation_7_2" >
                  <motion.div
                    className=""
                    initial={{ y: '-100%' }}
                    animate={{ y: isHovered7 ? ['0%', '-100%', '0%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '80px',
                      height: '130px',
                      background: 'white',
                      position: 'absolute',
                      top: 100,

                    }}
                  ></motion.div>


                  <div className="animation_line7">
                    <img src="./images/home/animation_line7.png" alt="" />
                  </div>
                </div>

                <div className="animation_line7_img7">
                  <img src="./images/home/animation_line7_img7.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>


              </div>
            </div>

            <div className="animation_6" onMouseEnter={() => setIsHovered6(true)} onMouseLeave={() => {
              setTimeout(() => {
                setIsHovered6(false);
              }, 1000);
            }}>
              <div className="animation_6_1" >



                <div className="animation_6_2" >
                  <motion.div
                    className=""
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered6 ? ['0%', '-100%', '0%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '131px',
                      height: '50px',
                      background: 'white',
                      position: 'absolute',
                      left: 110,
                      zIndex: 2
                    }}
                  ></motion.div>
                  <div className="animation_line6">
                    <img src="./images/home/animation_line6.png" alt="" />
                  </div>
                </div>

                <div className="animation_line6_img6">
                  <img src="./images/home/animation_line6_img6.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>
              </div>
            </div>

            <div className="animation_5" onMouseEnter={() => setIsHovered5(true)} onMouseLeave={() => {

              setTimeout(() => {
                setIsHovered5(false);
              }, 1000);
            }} style={{ zIndex: isHovered5 ? 2 : 20 }}
            >
              <div className="animation_5_1"  >
                <div className="animation_5_2" >
                  <motion.div
                    className=""
                    initial={{ x: '-100%' }}
                    // animate={{ x: isHovered5 ? '-100%' : '0%' }}
                    animate={{ x: isHovered5 ? ['0%', '-100%', '0%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}

                    style={{
                      width: '110px',
                      height: '50px',
                      background: 'white',
                      position: 'absolute',
                      overflow: 'hidden',
                      // borderTopLeftRadius:"15px",
                      // clipPath:  'polygon(30% 0%, 100% 0, 100% 100%, 0 100%)' ,
                      left: 111,

                    }}
                  ></motion.div>
                  <div className="animation_line5">
                    <img src="./images/home/animation_line5.png" alt="" />
                  </div>
                </div>

                <div className="animation_line5_img5">
                  <img src="./images/home/animation_line5_img5.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>
              </div>
            </div>

            <div className="animation_4" >
              <div className="animation_4_1" >



                <div className="animation_4_2" >
                  <motion.div
                    className=""
                    initial={{ y: '100%' }}
                    animate={{ y: isHovered4 ? ['-15%', '100%', '-15%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '54px',
                      height: '100%',
                      background: 'white',
                      position: 'absolute',
                      top: -207,
                      zIndex: 6
                    }}
                  ></motion.div>


                  <div className="animation_line4">
                    <img src="./images/home/animation_line4.png" alt="" />
                  </div>
                </div>

                <div className="animation_line4_img4" onMouseEnter={() => setIsHovered4(true)} onMouseLeave={() => {

                  setTimeout(() => {
                    setIsHovered4(false);
                  }, 1000);
                }}>
                  <img src="./images/home/animation_line4_img4.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
                </div>


              </div>
            </div>

            <div className="animation_3" >
              <div className="animation_3_1" >



                <div className="animation_3_2" >
                  <motion.div
                    className=""
                    initial={{ y: '100%' }}
                    animate={{ y: isHovered3 ? ['-16%', '100%', '-16%'] : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                      width: '100px',
                      height: '100%',
                      background: 'white',
                      position: 'absolute',
                      top: -230,
                      right: 0,
                      zIndex: 26
                    }}
                  ></motion.div>


                  <div className="animation_line3" >
                    <img style={{ height: "210px", width: "69px" }} src="./images/home/animation_line3.png" alt="" />
                  </div>


                </div>

                <div className="animation_line3_img3" onMouseEnter={() => setIsHovered3(true)} onMouseLeave={() => {

                  setTimeout(() => {
                    setIsHovered3(false);
                  }, 1000);
                }}>
                  <img src="./images/home/animation_line3_img3.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease', }} />
                </div>


              </div>
            </div>
          </>
        )}

        {/* <div>
          <img className="animation_line1" src="./images/home/animation_line1.png" alt="" />
        </div> */}


        {/* <img className="animation_line1_img1" src="./images/home/animation_line1_img1.png" alt="" />
        <img className="animation_line2" src="./images/home/animation_line2.png" alt="" />
        <img className="animation_line1_img2" src="./images/home/animation_line1_img2.png" alt="" />
        <img className="animation_line3" src="./images/home/animation_line3.png" alt="" /> */}
      </div>
    </div>
  );
}

export default Profile_creation;