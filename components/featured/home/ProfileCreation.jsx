import React from "react";
import { motion } from 'framer-motion';
function Profile_creation() {
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
      <motion.div
                      className="candidate_red_box_lang" // Added className for the selector
                      initial={{ y: '-20%' }}    // Initial position (center of the screen)
                      animate={{ y: '-100%' }}
                      transition={{ duration: 0.6, delay: 3.8 }} // Animation duration and delay of 5 seconds
                      style={{
                        width: '5px',    // Set the width
                        height: '130px',   // Set the height
                        // background: 'red',
                        background: 'red',
                        position: 'absolute',
                        top: 0,
                       left:50,
                        zIndex: 1
                      }}
                    ></motion.div>
        <img  className="Line_man" src="./images/home/Line_man.png" alt="" />

        
        <img  className="animation_line1" src="./images/home/animation_line1.png" alt="" />
        <img  className="animation_line1_img1" src="./images/home/animation_line1_img1.png" alt="" />
        <img  className="animation_line2" src="./images/home/animation_line2.png" alt="" />
        <img  className="animation_line1_img2" src="./images/home/animation_line1_img2.png" alt="" />
        <img  className="animation_line3" src="./images/home/animation_line3.png" alt="" />
      </div>
    </div>
  );
}

export default Profile_creation;