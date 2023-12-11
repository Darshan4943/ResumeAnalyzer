import React from "react";
import Profile1 from "~/components/featured/candidate/afterLogin/services/Profile1";


function profile() {
  const arr = [
    "My Resume",
    "About me",
    "Resume Headline",
    "Skills",
    "Education",
    "Work Experience",
    "Achievements",
    "Profile summary",
    "Achievements",
    "Personal details",
    "Career profile",
  ];
  const sk_buttons = [
    "User Interface Designing",
    "Product Design",
    "User Research",
    "Mockups",
    "Wireframing",
    "Wireframe",
    "Prototype",
    "User Experience Design",
    "Figma",
    "Adobe Xd",
    "Illustrator",
    "Management",
    "Sketching",
    "AutoCAD"
  ]

  const achive = [
    {
      a: "Online Profile",
      b: "Link to the profiles"
    },
    {
      a: "Sample Work",
      b: "Add link to your projects (e.g. Github links etc.)"
    },
    {
      a: 'Presentation',
      b: 'Add links to your online presentations (e.g. Slide share presentation links etc.)'
    }
  ]
  const job_prefer = [
    {
      a: 'Preferred industry',
      b: 'Information technology',
      c: 'Preferred Department',
      d: 'UX, Design & Architecture'
    },
    {
      a: 'Preferred Job role',
      b: 'UI / UX Designer',
      c: 'Preferred job type',
      d: 'permanent'
    },
    {
      a: 'Preferred shift',
      b: 'Day shift',
      c: 'Preferred job mode',
      d: 'Full-time'
    },
    {
      a: 'Expected salary',
      b: '₹5,00,000',
      c: 'Preferred work location',
      d: 'Mumbai, Pune, Bangalore/Bengaluru, Delhi / NCR, Ahmedabad'
    },
  ]


  const heading_data = [
    {
      a: 'Gender',
      b: 'Male',
      c: 'Career break',
      d: 'No'
    },
    {
      a: 'Marital status',
      b: 'Single / unmarried',
      c: 'Work permit',
      d: 'No'
    },
    {
      a: 'Date of birth',
      b: '02 Apr 1999',
      c: 'Address',
      d: 'VITTHAL NAGAR, SPINE ROAD CHIKHALI, PRADHIKARAN, pimpri-chinchwad, 411062'
    },
    {
      a: 'Differently able',
      b: 'No',
      // c:'',
      // d:''
    },
  ]


  return (
    <div className="bg-[#F9F9F9]">


      <div>
        <Profile1 />
      </div>

      <div className="customMargins relative pb-6">
        <div className="flex mt-[24px] gap-[24px]">
          <div className="profile_left_section sticky top-[7rem]">
            <div className="score_all">
              <div className="profile_score">
                <img src="./images/profile/Ellipse_24.png" alt="" />
                <img src="./images/profile/Ellipse_25.png"  className="eclips_25" alt="" />
                <p className="profile_percent">75 %</p>
              </div>

              <div className="profile_right_section">
                <p className="profile_score_text">Profile Score</p>
                <p className="improve_text">
                  Improve your profile score, to get more recruiter attention.
                </p>
              </div>
            </div>

            <div className="profile_option">
              {arr.map((arr) => (
                <div className="profile_option_menu">
                  <p className="my_resume">{arr}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="profile_right">
            <div className="build_ai">
              <div className="build_ai_left">
                <img src="./images/profile/Wavy_Bus.png" alt="" />
              </div>

              <div className="build_ai_right">
                <p className="build_heading">Build AI Powered Resume</p>
                <div className="prof_template">
                  <p className="prof_template">Professional Templates</p>
                  <div className="verti_line"></div>
                  <p className="prof_template">AI suggestion</p>
                  <div className="verti_line"></div>
                  <p className="prof_template">Preview</p>
                </div>

                <p className="content_text">
                  Use our pre-designed resume template, customized to your
                  Skilotech profile, or quickly create your own CV.
                </p>

                <div className="build_ai_button_parent">
                  <button className="build_ai_button">Create New Resume</button>
                  <button className="build_ai_button">Download Resume</button>
                </div>
              </div>
            </div>

            <div className="build_ai ai2">
              <p className="page_headings">My Resume</p>
              <div className="upload_resume">
                <div className="upload_resume_parent">
                  <div className="upload_resume_left">
                    <p className="resume-text">
                      John Doe Resume Bsc CS 2023.pdf
                    </p>
                    <p className="resume_text_small">Last updated 1 m ago</p>
                  </div>

                  <div className="upload_resume_right">
                    <div className="resume_button">
                      <img src="./images/profile/download.png" alt="" />
                    </div>
                    <div className="resume_button">
                      <img src="./images/profile/delete.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="up_button">
                <button className="build_ai_button">Upload Resume</button>
              </div>
            </div>

            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">Resume Headline</p>
                <img
                  style={{ width: "24px" }}
                  src="./images/profile/edit.png"
                  alt=""
                />
              </div>
              <p className="content_text">
                Versatile and Accomplished Professional: Driving Success Through
                Innovation and Collaboration
              </p>
            </div>

            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">About me</p>
                <img
                  style={{ width: "24px" }}
                  src="./images/profile/edit.png"
                  alt=""
                />
              </div>
              <p className="content_text">
                The ideal person would have Experience working on the user
                interface of websites Know how to create mockups, understand
                feedback and present their work Have experience building
                sitemaps, wireframes and prototypes as per the project brief
                Have strong design and creative skills In-depth experience using
                Adobe Illustrator, Figma
              </p>
            </div>

            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">Work Experience</p>
                <div className="add_delete">
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/add.png"
                    alt=""
                  />
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/edit.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="work_logo">
                <div className="logo_img">
                  <img src="./images/profile/logo_1.png" alt="" />
                </div>

                <div className="logo_disc">
                  <p className="heading_first">Company 1</p>
                  <p className="heading_sec">UI/UX Designer</p>
                  <div className="full_time">
                    <p className="sec_head">Full Time</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">Sept 2019 to 2022</p>
                  </div>
                  <div className="full_time">
                    <p className="sec_head">Pune, Maharashtra, India</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">On-site</p>
                  </div>
                  <p className="sec_head">The ideal person would have Experience working on the user interface of websites  <br />
                    Know how to create mockups, understand feedback and present their work Have experience building sitemaps, wireframes <br /> and prototypes as per the project brief <br />
                    Have strong design and creative skills In-depth experience using Adobe Illustrator, Figma</p>
                </div>


              </div>
            </div>


            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">Education</p>
                <div className="add_delete">
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/add.png"
                    alt=""
                  />
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/edit.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="work_logo">
                <div className="logo_img">
                  <img src="./images/profile/logo_1.png" alt="" />
                </div>

                <div className="logo_disc">
                  <p className="heading_first">B.Tech/B.E.Mechanical</p>
                  <p className="heading_sec">International School of Business and Media (ISBM)</p>
                  <div className="full_time">
                    <p className="sec_head">Full Time</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">Sept 2019 to 2022</p>
                  </div>
                  <div className="full_time">
                    <p className="sec_head">Pune, Maharashtra, India</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">On-site</p>
                  </div>

                </div>
              </div>

              <div className="work_logo" style={{ marginTop: '16px' }}>
                <div className="logo_img">
                  <img src="./images/profile/logo_1.png" alt="" />
                </div>

                <div className="logo_disc">
                  <p className="heading_first">Diploma</p>
                  <p className="heading_sec">MIT Institute of Design</p>
                  <div className="full_time">
                    <p className="sec_head">Full Time</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">Sept 2019 to 2022</p>
                  </div>
                  <div className="full_time">
                    <p className="sec_head">Pune, Maharashtra, India</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">On-site</p>
                  </div>

                </div>
              </div>
            </div>


            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">Skills</p>
                <div className="add_delete">
                  <button className="take_test">Take Skill Test</button>
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/add.png"
                    alt=""
                  />
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/edit.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="skill_buttons">
                {
                  sk_buttons.map((sk_buttons) => (<button className="skill_button">{sk_buttons}</button>
                  ))
                }
              </div>
            </div>

            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">Certifications</p>
                <div className="add_delete">
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/add.png"
                    alt=""
                  />
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/edit.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="work_logo">
                <div className="logo_img">
                  <img src="./images/profile/certification_logo.png" alt="" />
                </div>

                <div className="logo_disc">
                  <p className="heading_first">Essential Skills Program</p>
                  <p className="heading_sec">Harappa Education</p>
                  <div className="full_time">
                    <p className="sec_head">Full Time</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">Sept 2019 to 2022</p>
                    <div className="vertical_line"></div>
                    <p className="sec_head">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="build_ai ai2">
              <div className="gap">
                <p className="page_headings">Profile summary</p>
                <img
                  style={{ width: "24px" }}
                  src="./images/profile/edit.png"
                  alt=""
                />
              </div>
              <p className="content_text">
                Versatile and Accomplished Professional: Driving Success Through Innovation and Collaboration
              </p>
            </div>

            <div className="build_ai ai2" style={{ gap: '16px' }}>
              <p className="page_headings">Achievements</p>
              {
                achive.map((achive) => (<div className="essential_gap">
                  <div className="gap">
                    <p className="heading_first">{achive.a}</p>
                    <img
                      style={{ width: "24px" }}
                      src="./images/profile/edit.png"
                      alt=""
                    />
                  </div>

                  <p className="sec_head">{achive.b}</p>
                </div>
                ))}
            </div>


            <div className="build_ai ai2" style={{ gap: '16px' }}>
              <p className="page_headings">Job Preferences</p>
              <div className="job_preference">
                <div className="job_preference_left">
                  {
                    job_prefer.map((job_prefer) => (<div className="essential_gap">
                      <p className="sec_head">{job_prefer.a}</p>
                      <p className="heading_first">{job_prefer.b}</p>
                    </div>
                    ))}
                </div>
                <div className="job_preference_right">
                  {
                    job_prefer.map((job_prefer) => (<div className="essential_gap">
                      <p className="sec_head">{job_prefer.c}</p>
                      <p className="heading_first">{job_prefer.d}</p>
                    </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="build_ai ai2" style={{ gap: '16px' }}>
              <p className="page_headings">Personal details</p>
              <div className="job_preference">
                <div className="job_preference_left">
                  {
                    heading_data.map((heading_data) => (<div className="essential_gap">
                      <p className="sec_head">{heading_data.a}</p>
                      <p className="heading_first">{heading_data.b}</p>
                    </div>
                    ))}
                </div>
                <div className="job_preference_right">
                  {
                    heading_data.map((heading_data) => (<div className="essential_gap">
                      <p className="sec_head">{heading_data.c}</p>
                      <p className="heading_first">{heading_data.d}</p>
                    </div>
                    ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
}

export default profile;