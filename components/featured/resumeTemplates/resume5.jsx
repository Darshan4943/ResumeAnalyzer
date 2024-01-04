import React from "react";

function Resume5({ data }) {
  return (
    <div className="resume_file relative">
      <div class="resume_file_container">
        <div class="resume_file_header">
          <div class="full-name">
            <span class="first-name">{data.firstName}</span>
            <span class="last-name"> {data.lastName}</span>
          </div>
          <div class="contact-info">
            <span class="email">Email: </span>
            <span class="email-val">{data.email}</span>
            <span class="separator"></span>
            <span class="phone">Phone: </span>
            <span class="phone-val">{data.mobileNumber}</span>
          </div>

          <div class="about">
            <span class="position"> {data.designation} </span>
            <span class="desc">{data.summery}</span>
          </div>
        </div>
        <div class="details">
          <div class="section">
            <div class="section__title">Experience</div>
            <div class="section__list">
              {data.experience?.map((detail, index) => (
                <div class="section__list-item">
                  <div class="left">
                    <div class="name">{detail.organization}</div>
                    <div class="addr"> {detail.location}</div>
                    <div class="duration">
                      {" "}
                      {detail.duration?.start?.year}-{" "}
                      {detail.currentlyWorking
                        ? "Present"
                        : detail.duration?.end?.year}
                    </div>
                  </div>
                  <div class="right">
                    <div class="name">{detail.designation} </div>
                    <div class="desc">{detail.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="section">
            <div class="section__title">Education</div>
            <div class="section__list">
              {data?.education?.map((detail, index) => (
                <div class="section__list-item">
                  <div class="left">
                    <div class="name"> {detail.instituteName}</div>
                    <div class="duration">
                      {" "}
                      {detail.duration?.start?.year}-
                      {detail.duration?.end?.year}
                    </div>
                  </div>
                  <div class="right">
                    <div class="name"> {detail.qualification}</div>
                    <div class="desc">{detail.specialization}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="section">
            <div class="section__title">Course</div>
            <div class="section__list">
              {data?.course?.map((detail, index) => (
                <div class="section__list-item">
                  <div class="left">
                    <div class="name"> {detail.courseName}</div>
                    <div class="duration">
                      {" "}
                      {detail.duration?.start?.year}-{" "}
                      {detail.duration?.end?.year}
                    </div>
                  </div>
                  <div class="right">
                    <div class="name"> {detail.issuedBy}</div>
                    <div class="desc"> {detail.discription}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="section">
            <div class="section__title">Skills</div>
            <div class="skills">
              {data?.skills?.map((detail, index) => (
                <div class="skills__item">
                  <div class="left">
                    <div class="name"> {detail.skill}</div>
                  </div>
                  <div class="right">
                    <input
                      id="ck1"
                      type="checkbox"
                      checked={
                        detail.rating.filter((item) => item != 0).length >= 1
                      }
                    />

                    <label for="ck1"></label>
                    <input
                      id="ck2"
                      type="checkbox"
                      checked={
                        detail.rating.filter((item) => item != 0).length >= 2
                      }
                    />

                    <label for="ck2"></label>
                    <input
                      id="ck3"
                      type="checkbox"
                      checked={
                        detail.rating.filter((item) => item != 0).length >= 3
                      }
                    />

                    <label for="ck3"></label>
                    <input
                      id="ck4"
                      type="checkbox"
                      checked={
                        detail.rating.filter((item) => item != 0).length >= 4
                      }
                    />
                    <label for="ck4"></label>
                    <input
                      id="ck5"
                      type="checkbox"
                      checked={
                        detail.rating.filter((item) => item != 0).length == 5
                      }
                    />
                    <label for="ck5"></label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="section mb-8">
            <div class="section__title">Language</div>
            <div class="section__list">
              <div class="section__list-item">
                {" "}
                {data?.languages?.map((detail, index) => detail.languages)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10px] right-[10px]">
        {" "}
        <img src="/images/logo_skilotech.png" alt="" className="h-[20px]" />
      </div>
    </div>
  );
}

export default Resume5;
