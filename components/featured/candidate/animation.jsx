import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Candidate_animation() {
  const [isDiv, setIsDiv] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [slideImage, setSlideImage] = useState(false);
  const [slideImageUp, setSlideImageUp] = useState(false);
  const [isLineAnimate, setIsLineAnimate] = useState(false);


  const handleScroll = () => {
    if (window.scrollY >= 300 && !isAnimate) {
      setIsAnimate(true);
      setIsLineAnimate(true);
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
        setSlideImage(true);
      }, 6000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAnimate]);

  useEffect(() => {
    let divTimer;

    if (isAnimate) {
      divTimer = setTimeout(() => {
        setIsDiv(true);
        setIsLineAnimate(false);
      }, 7000);
    }

    return () => {
      if (divTimer) {
        clearTimeout(divTimer);
      }
    };
  }, [isAnimate]);



  useEffect(() => {
    let divTimer;

    if (isAnimate) {
      divTimer = setTimeout(() => {
        setSlideImageUp(true)
      }, 7500);
    }

    return () => {
      if (divTimer) {
        clearTimeout(divTimer);
      }
    };
  }, [isAnimate]);



  return (
    <>
      {isDiv && (
        <div
          className="customMargins"

        >
          <div className="ai_powered_parent">
            <motion.div className="ai_text"

            >
              <motion.div 
              animate={{
                opacity: slideImageUp ? 1 : 0,
              }}
                initial={{ opacity: 0 }}
                transition={{ duration: 4 }}>
                <p id='ai_text'>Free Ai Powered profile creation</p>
              </motion.div>
              <motion.div  className='candidate_Profile_list'
               animate={{
                opacity: slideImageUp ? 1 : 0,
              }}
                initial={{ opacity: 0 }}
                transition={{ duration: 5 ,delay:1}}>
                <p id='easy_text'>Easy process to create your profile</p>
                <p id='streamlines_text'>It streamlines job searches, improves candidate-employer matches, and contributes to a more efficient and effective job-seeking process.</p>
        
                <div>
                  <ol className='candidate_list'>
                    <li>Fill your details.</li>
                    <li>Let system organize the data to a beautiful & attractive templet to create your resume for free.</li>
                    <li>Download or share your ready resume in PDF.</li>

                  </ol>
                </div>
              </motion.div>
            </motion.div>
            <motion.div className="ai_images"
              animate={{
                x: slideImageUp ? 0 : 400,
                y: slideImageUp ? 0 : 400,
                opacity: slideImageUp ? 1 : 0,
                scale: slideImageUp ? 1 : 0.2,
              }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img  className ="name_resume " src="./images/candidate/name_resume.png" alt=""  />
              <img  className ="david_resume " src="./images/candidate/david_resume.png" alt=""  />
            </motion.div>
          </div>
        </div>
      )}



      {isLineAnimate &&



        <motion.div className=" candidate_Animation customMargins"
          animate={{
            x: slideImage ? 500 : 0,
            y: slideImage ? 200 : 0,
            opacity: slideImage ? 0 : 1,
            scale: slideImage ? 0.5 : 1
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}


        >

          <div className='candidate_profile'>
            <motion.div
              animate={{ rotate: "360deg" }}


            >
              <img className='cand_circle_img' src="./images/candidate/candidate_circle.png" alt="" id='name_resume' />
            </motion.div>

            <div className='candidate_details'>
              <div>
                <text className='candidate_name'>Name Surname</text>
                <p className='candidate_designation'>Profession</p>
              </div>
              <div className='candidate_line'></div>
              <div className='candidate_profession'>

                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Iusto mollitia, facere nobis eveniet at impedit amet quas
                molestias alias minima voluptatibus debitis dolorum porro iure
                nesciunt expedita laboriosam maiores facilis praesentium
                tempore assumenda dicta quia et! Dolor quas impedit harum
                natus recusandae vel, distinctio suscipit nam similique earum
                enim voluptatibus.

              </div>
            </div>
          </div>
          <div className="candidate_second_head">
            <div className="candidate_personal_info">
              <div className="candidate_section1">
                <div className="candidate_second_head1">

                  <div className="candidate_second_head_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="43"
                      height="54"
                      viewBox="0 0 43 54"
                      fill="none"
                    >
                      <path
                        d="M21.2708 27.5563C28.8725 27.5563 35.0348 21.394 35.0348 13.7923C35.0348 6.19068 28.8725 0.0283203 21.2708 0.0283203C13.6692 0.0283203 7.50684 6.19068 7.50684 13.7923C7.50684 21.394 13.6692 27.5563 21.2708 27.5563Z"
                        fill="#333333"
                      />
                      <path
                        d="M0 53.4216V45.0576C0 37.3586 7.37 31.0596 16.378 31.0596H26.164C35.172 31.0596 42.542 37.3586 42.542 45.0576V53.4216H0Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>

                  <div className="candidate_second_head2">
                    <motion.div
                      className="candidate_proffesion_chil2_annn"
                      animate={{
                        x: '-230px'
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6
                      }}
                    ></motion.div>

                    <div className="candidate_info_cont">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="91"
                        height="20"
                        viewBox="0 0 91 20"
                        fill="none"
                      >
                        <path
                          d="M6 -0.00878906C2.68629 -0.00878906 0 2.6775 0 5.99121V11.0672V18.7532V19.1662C0 19.5666 0.324596 19.8912 0.725006 19.8912H90.275C90.6754 19.8912 91 19.5666 91 19.1662V18.7532V13.1782V11.0672V5.99121C91 2.67751 88.3137 -0.00878906 85 -0.00878906H6Z"
                          fill="#073C53"
                        />
                      </svg>
                      <h5 className="candidate_p_info">Personal Info</h5>
                    </div>
                    <div className="candidate_address">
                      <div className="candidate_loction">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                        >
                          <path
                            d="M7.01926 0.391113C3.48226 0.391113 0.614258 3.25811 0.614258 6.79611C0.614258 10.3331 7.18626 17.8791 7.18626 17.8791C7.18626 17.8791 13.4243 10.3331 13.4243 6.79611C13.4233 3.25811 10.5563 0.391113 7.01926 0.391113ZM7.01926 9.67311C5.33826 9.67311 3.97526 8.31011 3.97526 6.62811C3.97526 4.94711 5.33826 3.58411 7.01926 3.58411C8.70026 3.58411 10.0633 4.94711 10.0633 6.62811C10.0633 8.31011 8.70026 9.67311 7.01926 9.67311Z"
                            fill="#073C53"
                          />
                        </svg>
                      </div>
                      <div className="candidate_address_cont">
                        <div className="candidate_headline">
                          <p className="candidate_headline_1">address</p>
                        </div>
                        <p className="candidate_headline_2">
                          Lorem ipsum dolor sit amet, consectetuer{" "}
                        </p>
                        <p className="candidate_headline_2">
                          adipiscing elit, sed diam nonummy nibh.
                        </p>
                      </div>
                    </div>



                    <div className="candidate_address2">
                      <div className="candidate_loction2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="11"
                          viewBox="0 0 17 11"
                          fill="none"
                        >
                          <path
                            d="M15.3818 0.910156H1.42676L8.40475 5.84915L15.3818 0.910156Z"
                            fill="#073C53"
                          />
                          <path
                            d="M8.40441 6.77208L0.774414 1.37207V10.1411H16.0334V1.37207L8.40441 6.77208Z"
                            fill="#073C53"
                          />
                        </svg>
                      </div>
                      <div className="candidate_address_cont2">
                        <div className="candidate_headline_email">
                          <p className="candidate_headline_mail1_id">e-mail</p>
                        </div>
                        <p className="candidate_headline_mail2_mail">Lorem ipsum </p>
                      </div>
                    </div>



                    <div className="candidate_address3">
                      <div className="candidate_loction3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="18"
                          viewBox="0 0 11 18"
                          fill="none"
                        >
                          <path
                            d="M9.21038 0.821289H1.87238C1.08238 0.821289 0.442383 1.4613 0.442383 2.2513V16.1193C0.442383 16.9093 1.08238 17.5493 1.87238 17.5493H9.21038C10.0004 17.5493 10.6404 16.9093 10.6404 16.1193V2.2513C10.6404 1.4623 10.0004 0.821289 9.21038 0.821289ZM5.54138 16.4623C5.11238 16.4623 4.76438 16.1143 4.76438 15.6853C4.76438 15.2563 5.11238 14.9083 5.54138 14.9083C5.97038 14.9083 6.31838 15.2563 6.31838 15.6853C6.31838 16.1143 5.97038 16.4623 5.54138 16.4623ZM9.33538 13.5003C9.33538 13.8993 9.01138 14.2233 8.61238 14.2233H2.47038C2.07138 14.2233 1.74738 13.8993 1.74738 13.5003V2.88129C1.74738 2.48229 2.07138 2.15829 2.47038 2.15829H8.61238C9.01138 2.15829 9.33538 2.48229 9.33538 2.88129V13.5003Z"
                            fill="#073C53"
                          />
                        </svg>
                      </div>
                      <div className="candidate_address_cont3">
                        <div className="candidate_headline_phone1">
                          <p className="candidate_headline_phone">phone</p>
                        </div>
                        <p className="candidate_headline_phone2">+9955545455 </p>
                      </div>
                    </div>



                    <div className="candidate_address4">
                      <div className="candidate_loction4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                        >
                          <path
                            d="M6.54098 0.285156C3.00398 0.285156 0.125977 3.16215 0.125977 6.70015C0.125977 10.2371 3.00398 13.1152 6.54098 13.1152C10.078 13.1152 12.956 10.2371 12.956 6.70015C12.955 3.16215 10.078 0.285156 6.54098 0.285156ZM6.54098 11.5312C5.65698 11.5312 4.83098 11.2892 4.11698 10.8732C4.33698 10.5352 4.33698 9.92515 3.97098 9.53615C3.44298 8.97515 2.75098 9.17315 2.91598 8.31615C3.06998 7.51415 1.88198 7.08716 1.72698 7.03516C1.71898 6.92416 1.70998 6.81316 1.70998 6.69916C1.70998 6.41816 1.73898 6.14416 1.78598 5.87616C1.92698 5.98716 2.09698 6.07915 2.29398 6.13515C3.08598 6.35815 2.98698 5.44216 3.45598 5.39316C3.92598 5.34316 4.12398 6.23415 4.81698 5.61615C5.50998 4.99815 4.56998 4.15716 4.32198 3.51416C4.14098 3.04316 4.38298 2.54816 4.52598 2.31516C5.09098 2.05415 5.71398 1.90115 6.37098 1.87715C6.28498 1.96415 5.43898 2.86316 6.37898 3.27016C7.36798 3.69916 7.46698 2.80815 7.99498 3.10515C8.52298 3.40215 7.76398 4.09415 8.75398 4.65515C9.74298 5.21615 9.67698 5.01815 10.271 5.67715C10.624 6.06915 11.056 6.24916 11.337 6.13216C11.359 6.31816 11.373 6.50716 11.373 6.69916C11.372 9.36416 9.20498 11.5312 6.54098 11.5312Z"
                            fill="#073C53"
                          />
                          <path
                            d="M8.95818 6.93294C8.34018 6.93094 7.63418 5.40694 6.71218 6.13594C6.71218 6.13594 5.98318 6.34594 6.36018 7.47594C6.66618 8.39194 6.65718 8.05994 6.60818 8.69194C6.55918 9.32394 6.83718 10.1109 7.68718 9.93394C8.53718 9.75694 7.94418 9.84295 9.13718 9.51595C10.3302 9.18895 10.7182 8.30494 10.5442 7.78894C10.3692 7.27194 9.57718 6.93394 8.95818 6.93294Z"
                            fill="#073C53"
                          />
                          <path
                            d="M5.37025 7.09615C5.37025 7.09615 4.99525 6.70016 4.59825 7.11216C4.43925 7.27716 4.13426 8.25016 4.89226 8.11816C5.65026 7.98616 5.69525 7.22815 5.37025 7.09615Z"
                            fill="#073C53"
                          />
                        </svg>
                      </div>
                      <div className="candidate_address_cont4">
                        <div className="candidate_headline_web">
                          <p className="candidate_headline_web1">website</p>
                        </div>
                        <p className="candidate_headline_web2"> www.Loremipsum.com </p>
                      </div>
                      <div className="candidate_pro_line">
                        <img className="cand_circle5" src="./images/candidate/cand_circle.png" alt="" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="168" height="4" fill="none" className='candidate_blue_line2'>
                          <path d="M160.209 0H0.841797V4H160.209V0Z" fill="#06A9EF" />
                        </svg>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col candidate_midle_section">

                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="150" fill="none" className='candidate_blue_line1'>
                    <path d="M4 0H0V336H4V0Z" fill="#06A9EF" />
                  </svg>

                </div>

                <div className="candidate_Education">
                  <div className="candidate_child2">
                    <motion.div
                      className="candidate_proffesion_chil2_an"
                      animate={{
                        x: '230px'
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6
                      }}
                    ></motion.div>
                    <div className="candidate_education_img">
                      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="20" viewBox="0 0 72 20" fill="none">
                        <path d="M6 0C2.68629 0 0 2.68629 0 6V11.1317V18.8563V19.2714C0 19.6738 0.326227 20 0.728649 20H71.2714C71.6738 20 72 19.6738 72 19.2714V18.8563V13.2533V11.1317V6C72 2.68629 69.3137 0 66 0H6Z" fill="#073C53" />
                      </svg>
                      <h5 className="candidate_educ_info">Education</h5>
                    </div>
                    <div className="candidate_master_degree">
                      <div className="candidate_jun">
                        <p className="candidate_jun_date">Jun 2017-Jul 2018</p>
                        <div className="dash_line" ></div>
                      </div>
                      <div className="candidate_degree_block">
                        <div className="candidate_degree_cont1">
                          <p className="candidate_degree_para1">Master Degree</p>
                        </div>
                        <div className="candidate_degree_cont2">
                          <p className="candidate_degree_para2">University</p>
                        </div>
                        <div className="candidate_degree_container">
                          <div className="candidate_d_para1">
                            <p className="candidate_degree_lor">Lorem ipsum dolor sit amet, consectetuer </p>
                          </div>
                          <div className="candidate_d_para1">
                            <p className="candidate_degree_lor">adipiscing elit, sed diam nonummy nibh.</p>
                          </div>
                        </div>


                      </div>
                    </div>

                    <div className="candidate_master_degree">
                      <div className="candidate_jun">
                        <p className="candidate_jun_date">Jun 2017-Jul 2018</p>
                        <div className="dash_line" ></div>
                      </div>
                      <div className="candidate_degree_block">
                        <div className="candidate_degree_cont1">
                          <p className="candidate_degree_para1">Master Degree</p>
                        </div>
                        <div className="candidate_degree_cont2">
                          <p className="candidate_degree_para2">University</p>
                        </div>
                        <div className="candidate_degree_container">
                          <div className="candidate_d_para1">
                            <p className="candidate_degree_lor">Lorem ipsum dolor sit amet, consectetuer </p>
                          </div>
                          <div className="candidate_d_para1">
                            <p className="candidate_degree_lor">adipiscing elit, sed diam nonummy nibh.</p>
                          </div>
                        </div>


                      </div>
                    </div>

                    <div className="candidate_education_line">

                      <svg xmlns="http://www.w3.org/2000/svg" width="168" height="4" fill="none" className='candidate_second_animation_line'>
                        <path d="M159.558 0H0.191406V4H159.558V0Z" fill="#06A9EF" />
                      </svg>
                      <img className="cand_circle6" src="./images/candidate/cand_circle.png" alt="" />

                    </div>

                    <img className="cand_circle1" src="./images/candidate/cand_circle.png" alt="" />


                  </div>
                  <div className="candidate_eduction_img_cap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="37" fill="none">
                      <path d="M7.10254 26.9302H52.547V19.2312L29.8242 14.4932L7.10254 19.1132V26.9302Z" fill="#333333" />
                      <path d="M29.3735 0.78418L0.0132235 8.48219L0 17.4942L0.00551822 17.4932V36.3462L4.62306 32.2292V16.5302L29.572 11.3252L59.1307 17.6032V8.48219L29.3735 0.78418Z" fill="#333333" />
                    </svg>
                  </div>
                </div>

              </div >

              <div className="candidate_section2">
                <div className="candidate_section2_1">
                  <div className="candidate_second_head_softwere_sec">
                    <motion.div
                      className="candidate_fixed_rectangle"
                      initial={{ y: "20%", height: '120%' }}
                      animate={{ x: '0%', height: '0%' }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      style={{
                        width: '170px',
                        // background: 'red',
                        background: 'white',
                        bottom: '0px',
                        zIndex: 1,
                        position: 'absolute', // Set the position to fixed
                      }}
                    ></motion.div>



                    <div className="candidate_second_head_img">
                      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
                        <path d="M41.679 25.784V16.8109H34.952C34.724 16.0959 34.432 15.409 34.103 14.745L39.113 9.73395L32.769 3.38895L27.886 8.27194C27.076 7.83194 26.218 7.46896 25.326 7.18396V0.417969H16.353V7.18396C15.596 7.42496 14.871 7.73396 14.171 8.08896L9.276 3.19397L2.931 9.53897L7.759 14.366C7.346 15.143 6.998 15.96 6.727 16.81H0V25.783H6.727C7.011 26.675 7.374 27.533 7.815 28.343L3.298 32.8589L9.643 39.2039L14.288 34.559C14.952 34.888 15.638 35.18 16.354 35.408V42.095H25.327V35.407C26.178 35.136 26.995 34.789 27.771 34.375L32.404 39.008L38.749 32.663L34.049 27.963C34.403 27.263 34.713 26.5379 34.954 25.7809H41.679V25.784ZM20.839 26.763C17.826 26.763 15.375 24.312 15.375 21.299C15.375 18.285 17.826 15.8329 20.839 15.8329C23.853 15.8329 26.305 18.285 26.305 21.299C26.305 24.312 23.853 26.763 20.839 26.763Z" fill="#333333" />
                      </svg>
                    </div>
                    <div className="candidate_softwere_head_main">
                      <div className="candidate_soft_cont_name">
                        <div className="candidate_soft_cont_child1">
                          <svg xmlns="http://www.w3.org/2000/svg" className=" candidate_langauge_img_svg" width="64" height="20" viewBox="0 0 64 20" fill="none">
                            <path d="M6 0C2.68629 0 0 2.68629 0 6V11.077V18.762V19.176C0 19.5764 0.324596 19.901 0.725006 19.901H63.275C63.6754 19.901 64 19.5764 64 19.176V18.762V13.187V11.077V6C64 2.68629 61.3137 0 58 0H6Z" fill="#073C53" />
                          </svg>
                          <h5 className="candidate_soft_info">Software</h5>
                        </div>
                      </div>

                      <div className="candidate_soft_two">
                        <div className="candidate_softwere_container">
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Software 1</p>
                          </div>
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Software 2</p>
                          </div>
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Software 3</p>
                          </div>
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Software 4</p>
                          </div>

                        </div>
                        <div className="candidate_softwere_container2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="39" viewBox="0 0 44 39" fill="none">
                            <path d="M41.2691 4.37601H3.01515C1.80715 4.37601 0.827148 3.39599 0.827148 2.18799C0.827148 0.979988 1.80715 0 3.01515 0H41.2691C42.4771 0 43.4572 0.978988 43.4572 2.18799C43.4572 3.39699 42.4781 4.37601 41.2691 4.37601Z" fill="#BCBCBC" />
                            <path d="M41.2691 4.37601H3.01515C1.80715 4.37601 0.827148 3.39599 0.827148 2.18799C0.827148 0.979988 1.80715 0 3.01515 0H41.2691C42.4771 0 43.4572 0.978988 43.4572 2.18799C43.4572 3.39699 42.4781 4.37601 41.2691 4.37601Z" fill="#FFDA1D" />
                            <path d="M41.3251 15.8101H2.95915C1.78115 15.8101 0.827148 14.8551 0.827148 13.6781V13.5661C0.827148 12.3891 1.78215 11.4341 2.95915 11.4341H41.3251C42.5032 11.4341 43.4572 12.3891 43.4572 13.5661V13.6781C43.4572 14.8551 42.5032 15.8101 41.3251 15.8101Z" fill="#E5E5E5" />
                            <path d="M35.7512 15.8101H3.01515C1.80715 15.8101 0.827148 14.8301 0.827148 13.6221C0.827148 12.4141 1.80715 11.4341 3.01515 11.4341H35.7512C36.9592 11.4341 37.9391 12.4141 37.9391 13.6221C37.9391 14.8301 36.9592 15.8101 35.7512 15.8101Z" fill="#FFDA1D" />
                            <path d="M41.2691 27.4473H3.01515C1.80715 27.4473 0.827148 26.4683 0.827148 25.2593C0.827148 24.0513 1.80715 23.0713 3.01515 23.0713H41.2691C42.4771 23.0713 43.4572 24.0503 43.4572 25.2593C43.4572 26.4673 42.4781 27.4473 41.2691 27.4473Z" fill="#E5E5E5" />
                            <path d="M31.0812 27.4473H3.01515C1.80715 27.4473 0.827148 26.4673 0.827148 25.2593C0.827148 24.0513 1.80715 23.0713 3.01515 23.0713H31.0812C32.2892 23.0713 33.2691 24.0503 33.2691 25.2593C33.2691 26.4673 32.2892 27.4473 31.0812 27.4473Z" fill="#FFDA1D" />
                            <path d="M41.2691 38.8804H3.01515C1.80715 38.8804 0.827148 37.9004 0.827148 36.6924C0.827148 35.4844 1.80715 34.5044 3.01515 34.5044H41.2691C42.4771 34.5044 43.4572 35.4844 43.4572 36.6924C43.4572 37.9004 42.4781 38.8804 41.2691 38.8804Z" fill="#E5E5E5" />
                          </svg>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="candidate_second_head_langauge">
                    <motion.div
                      className="candidate_red_box_lang" 
                      initial={{ x: '-20%' }}   
                      animate={{ x: '-100%' }}
                      transition={{ duration: 0.6, delay: 1.8 }} 
                      style={{
                        width: '215px',    
                        height: '130px',   
                        // background: 'red',
                        background: 'white',
                        position: 'absolute',
                        top: 0,
                        left: -15,
                        zIndex: 1
                      }}
                    ></motion.div>

                    <div className="candidate_second_head_img3 ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="38" viewBox="0 0 44 38" fill="none">
                        <path d="M23.0224 8.43115L19.4844 15.8051H24.5954L23.0934 8.43115H23.0224Z" fill="#333333" />
                        <path d="M37.87 0.157227H6.071C2.718 0.157227 0 2.87524 0 6.22824V22.5322C0 25.8852 2.718 28.6032 6.071 28.6032H11.564V36.6422C11.564 37.8382 13.103 38.3262 13.792 37.3482L19.95 28.6032H37.871C41.224 28.6032 43.942 25.8852 43.942 22.5322V6.22824C43.941 2.87524 41.223 0.157227 37.87 0.157227ZM25.902 22.2442L25.086 18.2132H18.327L16.404 22.2442H13.487L22.174 4.98123H24.901L28.83 22.2442H25.902Z" fill="#333333" />
                      </svg>
                    </div>
                    <div className="candidate_softwere_head">
                      <div className="candidate_soft_cont">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="91"
                          height="20"
                          viewBox="0 0 91 20"
                          fill="none"
                        >
                          <path
                            d="M6 -0.00878906C2.68629 -0.00878906 0 2.6775 0 5.99121V11.0672V18.7532V19.1662C0 19.5666 0.324596 19.8912 0.725006 19.8912H90.275C90.6754 19.8912 91 19.5666 91 19.1662V18.7532V13.1782V11.0672V5.99121C91 2.67751 88.3137 -0.00878906 85 -0.00878906H6Z"
                            fill="#073C53"
                          />
                        </svg>
                        <h5 className="candidate_soft_info">Language</h5>
                      </div>

                      <div className="candidate_soft_two">
                        <div className="candidate_softwere_container">
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Language 1</p>
                          </div>
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Language 2</p>
                          </div>
                          <div className="candidate_soft_child1">
                            <p className="candidate_soft_css">Language 3</p>
                          </div>


                        </div>
                        <div className="candidate_softwere_container2">
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="44" height="39" viewBox="0 0 44 39" fill="none">
                            <path d="M41.2691 4.37601H3.01515C1.80715 4.37601 0.827148 3.39599 0.827148 2.18799C0.827148 0.979988 1.80715 0 3.01515 0H41.2691C42.4771 0 43.4572 0.978988 43.4572 2.18799C43.4572 3.39699 42.4781 4.37601 41.2691 4.37601Z" fill="#BCBCBC" />
                            <path d="M41.2691 4.37601H3.01515C1.80715 4.37601 0.827148 3.39599 0.827148 2.18799C0.827148 0.979988 1.80715 0 3.01515 0H41.2691C42.4771 0 43.4572 0.978988 43.4572 2.18799C43.4572 3.39699 42.4781 4.37601 41.2691 4.37601Z" fill="#FFDA1D" />
                            <path d="M41.3251 15.8101H2.95915C1.78115 15.8101 0.827148 14.8551 0.827148 13.6781V13.5661C0.827148 12.3891 1.78215 11.4341 2.95915 11.4341H41.3251C42.5032 11.4341 43.4572 12.3891 43.4572 13.5661V13.6781C43.4572 14.8551 42.5032 15.8101 41.3251 15.8101Z" fill="#E5E5E5" />
                            <path d="M35.7512 15.8101H3.01515C1.80715 15.8101 0.827148 14.8301 0.827148 13.6221C0.827148 12.4141 1.80715 11.4341 3.01515 11.4341H35.7512C36.9592 11.4341 37.9391 12.4141 37.9391 13.6221C37.9391 14.8301 36.9592 15.8101 35.7512 15.8101Z" fill="#FFDA1D" />
                            <path d="M41.2691 27.4473H3.01515C1.80715 27.4473 0.827148 26.4683 0.827148 25.2593C0.827148 24.0513 1.80715 23.0713 3.01515 23.0713H41.2691C42.4771 23.0713 43.4572 24.0503 43.4572 25.2593C43.4572 26.4673 42.4781 27.4473 41.2691 27.4473Z" fill="#E5E5E5" />
                            <path d="M31.0812 27.4473H3.01515C1.80715 27.4473 0.827148 26.4673 0.827148 25.2593C0.827148 24.0513 1.80715 23.0713 3.01515 23.0713H31.0812C32.2892 23.0713 33.2691 24.0503 33.2691 25.2593C33.2691 26.4673 32.2892 27.4473 31.0812 27.4473Z" fill="#FFDA1D" />
                            <path d="M41.2691 38.8804H3.01515C1.80715 38.8804 0.827148 37.9004 0.827148 36.6924C0.827148 35.4844 1.80715 34.5044 3.01515 34.5044H41.2691C42.4771 34.5044 43.4572 35.4844 43.4572 36.6924C43.4572 37.9004 42.4781 38.8804 41.2691 38.8804Z" fill="#E5E5E5" />
                          </svg> */}
                          <img className="lang_line" src="./images/candidate/lang_line.png" alt="" />


                        </div>
                      </div>

                    </div>
                    <div className="candidate_lang_line_three">
                      <img className="cand_circle7" src="./images/candidate/cand_circle.png" alt="" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="168" height="4" fill="none" className="candidate_blue_line5">
                        <path d="M159.94 0H0.573242V4H159.94V0Z" fill="#06A9EF" />
                      </svg>
                      <img className="cand_circle2" src="./images/candidate/cand_circle.png" alt="" />

                    </div>
                  </div>
                </div>
                <div className=" candidate_midle_section">
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="140" fill="none" className='candidate_blue_line4'>
                    <path d="M4 0H0V336H4V0Z" fill="#06A9EF" />
                  </svg>
                  {/* <img className="cand_circle9" src="./images/candidate/cand_circle.png" alt="" /> */}

                </div>

                <div className="candidate_section2_2">
                  <div className="candidate_proffesion_cont">

                    <div className="candidate_software_container_parent ">

                      <div className="candidate_soft_heading">
                        <motion.div
                          className="candidate_proffesion_boxA"
                          animate={{
                            x: '250px'
                          }}
                          transition={{
                            duration: 0.6,
                            delay: 2.7
                          }}
                        ></motion.div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="170"
                          height="20"
                          viewBox="0 0 159 20"
                          fill="none"
                        >
                          <path
                            d="M6 0C2.68629 0 0 2.68629 0 6V11.077V18.762V19.176C0 19.5764 0.324596 19.901 0.725006 19.901H158.275C158.675 19.901 159 19.5764 159 19.176V18.762V13.187V11.077V6C159 2.68629 156.314 0 153 0H6Z"
                            fill="#073C53"
                          />
                        </svg>
                        <h5 className="candidate_soft_info_cont">Professional Experience</h5>
                      </div>


                      <div className="row row-cols-3 candidate_soft_box p-0  d-flex">
                        <div className=" col candidate_yellow_line " style={{ maxWidth: "5px" }}>
                          <img className="candidate_yellow_line" src="./images/candidate/yellow_line.png" alt="" />
                        </div>


                        <div
                          className="col candidate_child_para2 p-0"
                          style={{ maxWidth: "35px", height: "69px" }}
                        >
                          <div className="candidate_parameter_date1">
                            <p className="candidate_child_p1">2013-2014 </p>
                            <div className="dash_line1" ></div>
                          </div>
                          <div className="candidate_parameter_date1">
                            <p className="candidate_child_p1">2014-2016</p>
                            <div className="dash_line1" ></div>
                          </div>
                          <div className="candidate_parameter_date1">
                            <p className="candidate_child_p1">2016-2017</p>
                            <div className="dash_line1" ></div>
                          </div>

                        </div>

                        <div
                          className="col candidate_job_title_para p-0 m-0"
                          style={{ maxWidth: "90px" }}
                        >

                          <div className="candidate_job_title_parent">
                            <div className="candidate_job_title_head">
                              <p className="candidate_child_title1">job titles</p>
                            </div>
                            <div className="candidate_job_title_head2">
                              <p className="candidate_child_title2">company name</p>
                            </div>
                            <div className="candidate_job_title_head3 m-0">
                              <p className="candidate_child_title3 m-0">Lorem ipsum dolor sit amet, consectetuer </p>
                              <p className="candidate_child_title3 m-0">adipiscing elit, sed diam nonummy nibh.</p>
                            </div>
                          </div>

                          <div className="candidate_job_title_parent">
                            <div className="candidate_job_title_head">
                              <p className="candidate_child_title1">job titles</p>
                            </div>
                            <div className="candidate_job_title_head2">
                              <p className="candidate_child_title2">company name</p>
                            </div>
                            <div className="candidate_job_title_head3 m-0">
                              <p className="candidate_child_title3 m-0">Lorem ipsum dolor sit amet, consectetuer </p>
                              <p className="candidate_child_title3 m-0">adipiscing elit, sed diam nonummy nibh.</p>
                            </div>
                          </div>



                          <div className="candidate_job_title_parent">
                            <div className="candidate_job_title_head">
                              <p className="candidate_child_title1">job titles</p>
                            </div>
                            <div className="candidate_job_title_head2">
                              <p className="candidate_child_title2">company name</p>
                            </div>
                            <div className="candidate_job_title_head3 m-0">
                              <p className="candidate_child_title3 m-0">Lorem ipsum dolor sit amet, consectetuer </p>
                              <p className="candidate_child_title3 m-0">adipiscing elit, sed diam nonummy nibh.</p>
                            </div>
                          </div>


                        </div>

                      </div>
                    </div>
                    <div className="col candidate_bag_container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="48" viewBox="0 0 50 48" fill="none">
                        <path d="M28.4434 28.3184H21.6934V31.7853H28.4434V28.3184Z" fill="#333333" />
                        <path d="M31.4433 28.3182V34.7852H18.6933V28.3182H0.114319V25.3182H49.4383V18.5392V12.4092H43.3083H37.5503C37.5733 12.1202 37.5943 11.8312 37.5943 11.5372C37.5943 5.56023 32.7313 0.698242 26.7553 0.698242H22.7683C16.7913 0.698242 11.9283 5.56123 11.9283 11.5372C11.9283 11.8312 11.9493 12.1202 11.9733 12.4092H11.8203H10.7363H9.65231H8.56833H7.48431H6.40033H6.24332H5.31631H4.23233H3.14832H2.0643H0.980316H0.112305V13.2372V17.3962V18.5392V21.5552V25.7142V29.8732V34.0322V38.1912V40.9542V42.3502V46.5092V47.0852H0.262329H1.34631H2.43033H3.51431H4.59833H5.68231H6.24332H6.76633H7.85031H8.93433H10.0183H11.1023H12.1863H13.2703H14.3543H15.4383H16.5223H17.6063H18.6903H19.7743H20.8583H21.9423H23.0263H24.1103H25.1943H26.2783H27.3623H28.4463H29.5303H30.6143H31.6983H32.7823H43.3123H49.4423V40.9552V28.3202H31.4433V28.3182ZM22.7683 4.68524H26.7553C30.5333 4.68524 33.6073 7.75923 33.6073 11.5372C33.6073 11.8362 33.5563 12.1202 33.5193 12.4092H23.7413H22.6573H21.5733H20.4893H19.4053H18.3213H17.2373H16.1533H16.0013C15.9643 12.1202 15.9133 11.8362 15.9133 11.5372C15.9153 7.75823 18.9893 4.68524 22.7683 4.68524Z" fill="#333333" />
                      </svg>
                    </div>
                  </div>
                  <img className="cand_circle4" src="./images/candidate/cand_circle.png" alt="" />
                  <div className="candidate_lang_line_four">

                    <svg xmlns="http://www.w3.org/2000/svg" width="168" height="4" fill="none">
                      <path d="M159.94 0H0.573242V4H159.94V0Z" fill="#06A9EF" />
                    </svg>
                    <img className="cand_circle8" src="./images/candidate/cand_circle.png" alt="" />

                  </div>
                  <div className="candidate_hobbie_main" >
                    <div className="candidate_hobbie">
                      <motion.div
                        className="candidate_red_box_lang"
                        initial={{ height: '200%', y: 0 }}
                        animate={{ height: '200%', y: '150%' }}
                        transition={{ duration: 0.6, delay: 2.7 }}
                        style={{
                          // width: '200px',
                          // height: '100%',
                          // background: 'red',
                          width: '200px',
                          height: '300px',
                          background: 'white',
                          // backgroundr:'red',
                          position: 'absolute',
                          zIndex: 1,
                          top: -9,
                          left: -8,
                        }}
                      ></motion.div>

                      <motion.div
                        className="candidate_red_box_lang"
                        initial={{ height: '250%', y: 0 }}
                        animate={{ height: '250%', y: '150%' }}
                        transition={{ duration: 1.5, delay: 2.4 }}
                        style={{
                          // width: '200px',
                          // height: '100%',
                          // background: 'red',
                          width: '15px',
                          height: '300px',
                          background: 'white',
                          // backgroundr:'red',
                          position: 'absolute',
                          zIndex: 1,
                          top: -47,
                          left: -25,
                        }}
                      ></motion.div>

                      <div className="candidate_hoobi_head">
                        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="20" viewBox="0 0 58 20" fill="none">
                          <path d="M6 0C2.68629 0 0 2.68629 0 6V11.077V18.762V19.176C0 19.5764 0.324596 19.901 0.725006 19.901H57.275C57.6754 19.901 58 19.5764 58 19.176V18.762V13.187V11.077V6C58 2.68629 55.3137 0 52 0H6Z" fill="#073C53" />
                        </svg>
                        <h5 className='candidate_hobi_info'>Hobbies</h5>
                      </div>
                      <div className="candidate_music">
                        <svg xmlns="http://www.w3.org/2000/svg" width="89" height="21" viewBox="0 0 89 21" fill="none">
                          <path d="M20.9574 1.46616C20.9774 1.10816 20.6914 0.806152 20.3324 0.806152H19.1114H7.29838H6.11137C5.77937 0.806152 5.50538 1.06515 5.48738 1.39615L5.4644 1.39514L4.82737 13.0801L4.79338 13.6962C4.16338 13.3902 2.63438 12.8532 1.75538 13.1532C-0.328616 13.8632 -0.401622 16.9542 0.724378 18.1472C1.50038 18.9692 2.98538 19.2562 4.64738 19.2112C5.66638 19.1842 6.48139 18.3501 6.50139 17.3311L6.54338 15.2401L6.65538 13.1801L7.09538 5.11215H18.8514H18.9184L18.3984 14.6472C17.7564 14.3402 16.2534 13.8182 15.3844 14.1142C13.2994 14.8242 13.2274 17.9152 14.3534 19.1082C15.1294 19.9302 16.6144 20.2171 18.2764 20.1721C19.2954 20.1451 20.1104 19.3111 20.1304 18.2921L20.1724 16.2011L20.2844 14.1411L20.3874 11.8221L20.9574 1.46616Z" fill="#FFDA1D" />
                          <path d="M51.4419 6.70161L47.9883 3.91455L39.7985 14.063L43.2522 16.8501L51.4419 6.70161Z" fill="#FFDA1D" />
                          <path d="M52.3062 5.63229L48.8525 2.84521L48.3168 3.50904L51.7705 6.29612L52.3062 5.63229Z" fill="#FFDA1D" />
                          <path d="M49.1602 2.445C49.9362 1.484 51.3432 1.334 52.3042 2.109C53.2652 2.885 53.4152 4.29199 52.6402 5.25399L49.1602 2.445Z" fill="#FFDA1D" />
                          <path d="M41.2763 15.7593L39.5443 14.3613L39.4643 14.4613L38.7373 17.9553C38.9423 17.9413 39.1673 17.9723 39.3583 18.1263C39.5343 18.2683 39.6273 18.4713 39.6773 18.6713L40.7923 18.1603L42.9993 17.1493L41.2763 15.7593Z" fill="#FFDA1D" />
                          <path d="M39.1006 18.4442C38.9766 18.3442 38.7997 18.3473 38.6487 18.3773L38.4727 19.2212L39.2936 18.8452C39.2666 18.6882 39.2096 18.5332 39.1006 18.4442Z" fill="#FFDA1D" />
                          <path d="M86.3509 9.099C86.7929 8.358 87.0519 7.497 87.0519 6.573C87.0519 3.845 84.8319 1.625 82.1039 1.625H72.6779C69.9489 1.625 67.7299 3.845 67.7299 6.573C67.7299 7.516 67.9999 8.396 68.4599 9.147C67.5199 11.079 66.4179 13.869 66.8639 15.624C67.0279 16.266 67.3889 16.77 67.9099 17.079C68.1059 17.195 68.3999 17.308 68.7999 17.308C68.9949 17.308 69.2149 17.281 69.4619 17.215C71.2209 16.744 73.5409 14.539 75.5449 11.522H79.2909C81.2939 14.539 83.6139 16.744 85.3739 17.215C85.6209 17.281 85.8409 17.308 86.0359 17.308C86.4359 17.308 86.7299 17.196 86.9259 17.079C87.4469 16.77 87.8079 16.267 87.9719 15.624C88.4199 13.854 87.2959 11.032 86.3509 9.099ZM86.3819 15.22C86.3089 15.507 86.1869 15.61 86.0989 15.663C85.6559 15.819 83.6059 14.74 81.2719 11.521C80.9129 11.027 80.5479 10.481 80.1799 9.88199H78.2789H76.5539H74.6529C74.2849 10.481 73.9199 11.026 73.5609 11.521C71.2269 14.738 69.1779 15.815 68.7439 15.668C68.6459 15.61 68.5239 15.506 68.4509 15.219C68.1919 14.203 68.8369 12.262 69.6479 10.476C69.8879 9.94701 70.1409 9.43399 70.3919 8.95999C69.9259 8.51399 69.5899 7.93401 69.4469 7.28101C69.3969 7.05201 69.3689 6.81499 69.3689 6.57199C69.3689 4.74699 70.8539 3.263 72.6789 3.263H82.1049C83.9299 3.263 85.4139 4.74799 85.4139 6.57199C85.4139 6.79199 85.3909 7.007 85.3499 7.215C85.2189 7.878 84.8889 8.47 84.4259 8.927C84.6769 9.401 84.9319 9.91501 85.1739 10.446C85.9889 12.241 86.6429 14.196 86.3819 15.22Z" fill="#FFDA1D" />
                          <path d="M74.0067 6.06732H73.2227V5.28333C73.2227 4.99433 72.9867 4.75732 72.6977 4.75732H72.5527C72.2637 4.75732 72.0277 4.99333 72.0277 5.28333V6.06732H71.2437C70.9547 6.06732 70.7188 6.30335 70.7188 6.59235V6.73734C70.7188 7.02634 70.9547 7.26233 71.2437 7.26233H72.0277V8.04633C72.0277 8.33533 72.2637 8.57135 72.5527 8.57135H72.6977C72.9867 8.57135 73.2227 8.33533 73.2227 8.04633V7.26233H74.0067C74.2957 7.26233 74.5317 7.02634 74.5317 6.73734V6.59235C74.5317 6.30335 74.2957 6.06732 74.0067 6.06732Z" fill="#FFDA1D" />
                          <path d="M82.375 6.1319C82.6981 6.1319 82.96 5.86999 82.96 5.54691C82.96 5.22382 82.6981 4.96191 82.375 4.96191C82.0519 4.96191 81.79 5.22382 81.79 5.54691C81.79 5.86999 82.0519 6.1319 82.375 6.1319Z" fill="#FFDA1D" />
                          <path d="M81.7901 6.71634C81.7901 7.03934 81.5281 7.30133 81.2051 7.30133C80.8821 7.30133 80.6201 7.03934 80.6201 6.71634C80.6201 6.39334 80.8821 6.13135 81.2051 6.13135C81.5281 6.13235 81.7901 6.39334 81.7901 6.71634Z" fill="#FFDA1D" />
                          <path d="M84.129 6.71634C84.129 7.03934 83.867 7.30133 83.544 7.30133C83.221 7.30133 82.959 7.03934 82.959 6.71634C82.959 6.39334 83.221 6.13135 83.544 6.13135C83.867 6.13235 84.129 6.39334 84.129 6.71634Z" fill="#FFDA1D" />
                          <path d="M82.375 8.5733C82.6981 8.5733 82.96 8.3114 82.96 7.98831C82.96 7.66523 82.6981 7.40332 82.375 7.40332C82.0519 7.40332 81.79 7.66523 81.79 7.98831C81.79 8.3114 82.0519 8.5733 82.375 8.5733Z" fill="#FFDA1D" />
                        </svg>
                      </div>


                      <div className="candidate_last_line_three">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="4" height="116.99" viewBox="0 0 4 336" fill="none" className='blue_line_lastt'>
                            <path d="M4 0H0V336H4V0Z" fill="#06A9EF" />
                        </svg> */}
                        <motion.div className="candidate_last_line_box"
                          initial={{ y: 0, height: '99%' }}
                          animate={{ x: '0%', height: '0%' }}
                          transition={{ duration: 2, delay: 8 }}
                          style={{
                            width: '5px',
                            // background: 'red',
                            background: 'white',
                            left: '0px',
                            bottom: '0px',
                            zIndex: 1,
                            position: 'absolute', // Set the position to fixed
                          }}
                        > </motion.div>
                      </div>
                    </div>

                    <div className="candidate_game_img">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36" fill="none">
                        <path d="M43.7778 17.0031C44.7638 15.3511 45.3418 13.4281 45.3418 11.3681C45.3418 5.28013 40.3889 0.328125 34.3009 0.328125H13.2668C7.17882 0.328125 2.22584 5.28013 2.22584 11.3681C2.22584 13.4731 2.82884 15.4351 3.85484 17.1101C1.75684 21.4211 -0.702167 27.6461 0.293833 31.5621C0.658833 32.9961 1.46485 34.1181 2.62785 34.8081C3.06585 35.0681 3.72084 35.3181 4.61384 35.3181C5.04884 35.3181 5.54084 35.2581 6.09184 35.1111C10.0178 34.0611 15.1938 29.1401 19.6638 22.4091H28.0228C32.4928 29.1401 37.6688 34.0611 41.5948 35.1111C42.1458 35.2581 42.6368 35.3181 43.0728 35.3181C43.9658 35.3181 44.6199 35.0671 45.0588 34.8081C46.2208 34.1191 47.0278 32.9961 47.3928 31.5621C48.3938 27.6141 45.8868 21.3171 43.7778 17.0031ZM43.8468 30.6611C43.6848 31.3011 43.4118 31.5321 43.2158 31.6501C42.2278 31.9971 37.6538 29.5911 32.4448 22.4091C31.6438 21.3051 30.8288 20.0891 30.0088 18.7531H25.7668H21.9168H17.6748C16.8548 20.0901 16.0388 21.3061 15.2388 22.4091C10.0298 29.5881 5.45883 31.9901 4.49183 31.6611C4.27283 31.5321 3.99984 31.3011 3.83784 30.6611C3.26084 28.3931 4.69985 24.0631 6.50785 20.0791C7.04385 18.8981 7.60885 17.7531 8.16685 16.6961C7.12685 15.7001 6.37684 14.4061 6.05784 12.9501C5.94584 12.4401 5.88285 11.9121 5.88285 11.3681C5.88285 7.29613 9.19583 3.98413 13.2678 3.98413H34.3009C38.3729 3.98413 41.6858 7.29713 41.6858 11.3681C41.6858 11.8591 41.6348 12.3391 41.5438 12.8041C41.2508 14.2831 40.5159 15.6041 39.4819 16.6241C40.0429 17.6811 40.6109 18.8291 41.1499 20.0131C42.9699 24.0131 44.4278 28.3761 43.8468 30.6611Z" fill="#333333" />
                        <path d="M16.2316 10.2379H14.4825V8.48892C14.4825 7.84392 13.9545 7.31689 13.3105 7.31689H12.9865C12.3415 7.31689 11.8145 7.84392 11.8145 8.48892V10.2379H10.0656C9.42055 10.2379 8.89355 10.7649 8.89355 11.4099V11.7339C8.89355 12.3789 9.42055 12.9059 10.0656 12.9059H11.8145V14.6549C11.8145 15.2999 12.3425 15.8269 12.9865 15.8269H13.3105C13.9555 15.8269 14.4825 15.2999 14.4825 14.6549V12.9059H16.2316C16.8766 12.9059 17.4036 12.3779 17.4036 11.7339V11.4099C17.4036 10.7649 16.8766 10.2379 16.2316 10.2379Z" fill="#333333" />
                        <path d="M36.2096 9.07693C36.2096 9.79793 35.6256 10.3819 34.9056 10.3819C34.1856 10.3819 33.6006 9.79793 33.6006 9.07693C33.6006 8.35693 34.1846 7.77295 34.9056 7.77295C35.6256 7.77295 36.2096 8.35693 36.2096 9.07693Z" fill="#333333" />
                        <path d="M33.6012 11.6863C33.6012 12.4063 33.0172 12.9903 32.2972 12.9903C31.5772 12.9903 30.9922 12.4063 30.9922 11.6863C30.9922 10.9663 31.5762 10.3823 32.2972 10.3823C33.0172 10.3823 33.6012 10.9663 33.6012 11.6863Z" fill="#333333" />
                        <path d="M38.8189 11.6863C38.8189 12.4063 38.235 12.9903 37.515 12.9903C36.795 12.9903 36.21 12.4063 36.21 11.6863C36.21 10.9663 36.794 10.3823 37.515 10.3823C38.235 10.3823 38.8189 10.9663 38.8189 11.6863Z" fill="#333333" />
                        <path d="M36.2096 14.5242C36.2096 15.2452 35.6256 15.8292 34.9056 15.8292C34.1856 15.8292 33.6006 15.2452 33.6006 14.5242C33.6006 13.8042 34.1846 13.2202 34.9056 13.2202C35.6256 13.2202 36.2096 13.8042 36.2096 14.5242Z" fill="#333333" />
                      </svg>
                    </div>
                    <img className="cand_circle10" src="./images/candidate/cand_circle.png" alt="" />
                  </div>
                </div>


              </div>




            </div>


          </div>
        </motion.div>
      }
    </>
  )
}

export default Candidate_animation












