import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
function Profile_creation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 575 ) {
      setIsAnimate(true);
     
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
    const timeout = setTimeout(() => {
      setIsVisible(true); 
    }, 1000);

   
    return () => clearTimeout(timeout);
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

        <div className="animation_9">
          <div className="animation_9_1" >
         
            <div className="animation_line9_img9">
              <img src="./images/home/animation_line9_img9.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
            </div>

            <div className="animation_9_2"   >
              <motion.div
                className=""
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{
                  width: '168px',
                  height: '90px',
                  background: 'white',
                  position: 'absolute',
                  left: -168,
                  zIndex: 2
                }}
              ></motion.div>
              
              <div className="animation_line9" >
                <img src="./images/home/animation_line9.png" alt="" />

              </div>
            
            </div>
          </div>
        </div>


        <div className="animation_10">
          <div className="animation_10_1" >

            <div className="animation_line10_img10">
              <img src="./images/home/animation_line10_img10.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }} />
            </div>

            <div className="animation_10_2" >
              <motion.div
                className=""
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
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

        <div className="animation_8">
          <div className="animation_8_1" >

            <div className="animation_line8_img8">
              <img src="./images/home/animation_line8_img8.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }}/>
            </div>

            <div className="animation_8_2" >
              <motion.div
                className=""
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
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

        <div className="animation_7">
          <div className="animation_7_1" >



            <div className="animation_7_2" >
              <motion.div
                className=""
                initial={{ y: '-100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{
                  width: '80px',
                  height: '130px',
                  background: 'white',
                  position: 'absolute',
                  top: 100,
                  zIndex: 6
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

        <div className="animation_6">
          <div className="animation_6_1" >



            <div className="animation_6_2" >
              <motion.div
                className=""
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
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

        <div className="animation_5">
          <div className="animation_5_1" >



            <div className="animation_5_2" >
              <motion.div
                className=""
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{
                  width: '131px',
                  height: '50px',
                  background: 'white',
                  position: 'absolute',
                
                  left: 111,
                  zIndex: 2
                }}
              ></motion.div>
              <div className="animation_line5">
                <img src="./images/home/animation_line5.png" alt="" />
              </div>
            </div>

            <div className="animation_line5_img5">
              <img src="./images/home/animation_line5_img5.png" alt=""  style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }}/>
            </div>
          </div>
        </div>

        <div className="animation_4">
          <div className="animation_4_1" >



            <div className="animation_4_2" >
              <motion.div
                className=""
                initial={{ y: '100%' }}
                animate={{ y: '-15%' }}
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

            <div className="animation_line4_img4">
              <img src="./images/home/animation_line4_img4.png" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }}/>
            </div>


          </div>
        </div>

        <div className="animation_3">
          <div className="animation_3_1" >



            <div className="animation_3_2" >
              <motion.div
                className=""
                initial={{ y: '100%' }}
                animate={{ y: '-15%' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{
                  width: '100px',
                  height: '100%',
                  background: 'white',
                  position: 'absolute',
                  top:-20,
                  right:170,
                  zIndex: 6
                }}
              ></motion.div>


              <div className="animation_line3">
                <img style={{height:"210px", width:"69px"}} src="./images/home/animation_line3.png" alt="" />
              </div>


            </div>

            <div className="animation_line3_img3">
              <img src="./images/home/animation_line3_img3.png" alt=""  style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease', }} />
            </div>


          </div>
        </div>


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