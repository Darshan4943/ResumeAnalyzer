import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Path,
  Rect,
} from "@react-pdf/renderer";

function Template13({ data, selectedColor, selectedFont, pageLayout }) {
  const formatLink = (link) => {
    if (link?.length > 26) {
      return link?.match(/.{1,26}/g).join("\n");
    }
    return link;
  };

  const formatLink32 = (link) => {
    if (link?.length > 32) {
      return link?.match(/.{1,32}/g).join("\n");
    }
    return link;
  };

  const formatLink50 = (link) => {
    if (link?.length > 50) {
      return link?.match(/.{1,50}/g).join("\n");
    }
    return link;
  };

  const formatLink45 = (link) => {
    if (link?.length > 40) {
      return link?.match(/.{1,45}/g).join("\n");
    }
    return link;
  };

  const formatLink40 = (link) => {
    if (link?.length > 40) {
      return link?.match(/.{1,40}/g).join("\n");
    }
    return link;
  };

  const formatLink22 = (link) => {
    if (link?.length > 22) {
      return link?.match(/.{1,22}/g).join("\n");
    }
    return link;
  };
  const formatLink24 = (link) => {
    if (link?.length > 24) {
      return link?.match(/.{1,24}/g).join("\n");
    }
    return link;
  };

  const formatLink30 = (link) => {
    if (link?.length > 30) {
      return link?.match(/.{1,30}/g).join("\n");
    }
    return link;
  };

  const formatLink28 = (link) => {
    if (link?.length > 28) {
      return link?.match(/.{1,28}/g).join("\n");
    }
    return link;
  };

  // const formatLink20 = (link) => {
  //   if (link?.length > 20) {
  //     return link?.match(/.{1,16}/g).join('\n');  }
  //   return link;
  // };

  return (
    <Page size="A4" style={{ padding: 24 }} wrap={true}>
      <View style={{}}>
        <View style={{ flexDirection: "column", gap: 24 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 24,
              backgroundColor: "#F9F9F9",
              margin: -24,
              padding: 24,
            }}
          >
            <View style={{ flexDirection: "column", width: "100%" }}>
              <View style={{ flexDirection: "row", gap: 4, flexWrap: "wrap" }}>
                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: `${selectedFont} 700`,
                    color: "#333333",
                    marginBottom: 4,
                  }}
                >
                  {data.firstName}
                </Text>
                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: `${selectedFont} 700`,
                    color: "#333333",
                    marginBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  {data.lastName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%", gap: 20 }}>
                <View
                  style={{ flexDirection: "column", gap: 14, width: "60%" }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: `${selectedFont} 500`,
                      color: selectedColor,
                    }}
                  >
                    {formatLink24(data.designation)}
                  </Text>
                  {data?.showSummary === true && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#333333",
                      }}
                    >
                      {data.summery}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    width: "40%",
                    backgroundColor: "#F9F9F9",
                    gap: 14,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 500`,
                        color: "#949494",
                      }}
                    >
                      Email
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        width: "100%",
                        marginRight: "6px",
                        fontFamily: `${selectedFont} 600`,
                        color: "#333333",
                        flexWrap: "wrap",
                      }}
                    >
                      {formatLink28(data.email)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 500`,
                        color: "#949494",
                      }}
                    >
                      Phone
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 600`,
                        color: "#333333",
                      }}
                    >
                      {data.dial_code} {data.mobileNumber}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 500`,
                        color: "#949494",
                      }}
                    >
                      Location
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 600`,
                        color: "#333333",
                      }}
                    >
                      {formatLink28(data.location)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 24, paddingTop: 24 }}>
            <View style={{ flexDirection: "column", gap: 24, width: 261 }}>
              {data?.experience?.length > 0 &&
                data?.showExperience === true && (
                  <View
                    
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      WORK EXPERIENCE
                    </Text>
                    {data.experience
                      ?.slice(0, pageLayout && 1)
                      ?.map((detail, index) => (
                        <View style={{marginBottom:24}}
                        key={index}
                        >
                          <View
                           
                            wrap={false}
                            style={{ flexDirection: "column", }}
                         
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                              }}
                            >
                              {formatLink32(detail.designation)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: `${selectedFont} 400`,
                                color: "#797979",
                                lineHeight: 1,
                              }}
                            >
                              {formatLink40(detail.organization)}{" "}
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${
                                  detail.currentlyWorking ||
                                  detail.duration?.end?.year === "Year"
                                    ? "Present"
                                    : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                color: "#333333",
                              }}
                            >
                              {detail.description}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: "0.2px",
                              width: "100%",
                              backgroundColor: "#333333",
                              marginTop:"10px"
                            }}
                          >
                          </View>
                        </View>
                      ))}
                  </View>
                )}

              {data.project.length > 0 && data?.showProject === true && (
                <View>
                  {data.project
                    ?.slice(0, pageLayout && 1)
                    ?.map((detail, index) => (
                      <View
                        wrap={false}
                        key={index}
                        style={{
                          flexDirection: "column",
                          gap: 12,
                          width: 261,
                          paddingTop: 24,
                        }}
                      >
                        {index === 0 && (
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: `${selectedFont} 500`,
                              color: selectedColor,
                            }}
                          >
                            PROJECTS
                          </Text>
                        )}
                      
                          <View
                            style={{ flexDirection: "column" }}
                            // wrap={false}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                              }}
                            >
                              {formatLink32(detail.title)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                              }}
                            >
                              {formatLink32(detail.organization)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: `${selectedFont} 400`,
                                color: "#797979",
                                lineHeight: 1,
                                marginBottom: 5,
                              }}
                            >
                              {formatLink32(detail.organization)}{" "}
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${
                                  detail.currentlyWorking ||
                                  detail.duration?.end?.year === "Year"
                                    ? "Present"
                                    : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                color: "#333333",
                           
                              }}
                            >
                              {detail.description}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: "0.2px",
                              width: "100%",
                              backgroundColor: "#333333",
                            }}
                          />
                        
                      </View>
                    ))}
                </View>
              )}

              {data.internship.length > 0 &&
                data?.showInternship === true &&
                !pageLayout && (
                  <View>
                  {data.internship.map((detail, index) => (
                  <View
                  key={index}
                  wrap={false}
                    style={{
                      flexDirection: "column",
                      gap: 12,
                      width: 261,
                      paddingTop: 24,
                    }}
                  >

      {  index === 0 &&          
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: `${selectedFont} 500`,
                      color: selectedColor,
                      lineHeight: 1,
                    }}
                  >
                    INTERNSHIP
                  </Text>
                }
                      <>
                        <View
                    
                          style={{ flexDirection: "column" }}
                          wrap={false}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: `${selectedFont} 700`,
                              color: "#333333",
                            }}
                          >
                            {formatLink32(detail.title)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: `${selectedFont} 700`,
                              color: "#333333",
                            }}
                          >
                            {formatLink32(detail.organization)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                              color: "#797979",
                              lineHeight: 1,
                            }}
                          >
                            {formatLink32(detail.organization)}{" "}
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              color: "#333333",
                              marginTop:5
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: "0.2px",
                            width: "100%",
                            backgroundColor: "#333333",
                          }}
                        />
                      </>
                  
                  </View>
                ))}
                </View>
                )}

              {data.course.length > 0 &&
                data?.showCourses === true &&
                !pageLayout && (
                  <View>
                  {data.course.map((detail, index) => (
                  <View
                  key={index}
                  wrap={false}
                    style={{
                      flexDirection: "column",
                      gap: 12,
                      width: 261,
                      paddingTop: 24,
                    }}
                  >
{
    index === 0 &&
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      CERTIFICATION
                    </Text>
                    }
                      <>
                        <View
                        
                          style={{ flexDirection: "column" }}
                          wrap={false}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: `${selectedFont} 700`,
                              color: "#333333",
                            }}
                          >
                            {formatLink32(detail.title)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: `${selectedFont} 700`,
                              color: "#333333",
                            }}
                          >
                            {formatLink32(detail.organization)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                              color: "#797979",
                              lineHeight: 1,
                            }}
                          >
                            {detail.organization}{" "}
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              color: "#333333",
                              marginTop:index >0 ? 5: 0
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: "0.2px",
                            width: "100%",
                            backgroundColor: "#333333",
                          }}
                        />
                      </>
                 
                  </View>
                     ))}
                      </View>
                )}

              {data.extraCaricularData.length > 0 &&
                data?.showExtraCariculam === true &&
                !pageLayout && (
                 <View>
                  {data.extraCaricularData.map((detail, index) => (
                  <View
                  key={index}
                  wrap={false}
                    style={{
                      flexDirection: "column",
                      gap: 12,
                      width: 261,
                      paddingTop: 24,
                    }}
                  >

            {  index === 0 &&      
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      ACTIVITIES
                    </Text>
                 }
                      <>
                        <View
                       
                          style={{ flexDirection: "column" }}
                          wrap={false}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: `${selectedFont} 700`,
                              color: "#333333",
                            }}
                          >
                            {formatLink32(detail.title)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: `${selectedFont} 700`,
                              color: "#333333",
                            }}
                          >
                            {formatLink32(detail.organization)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                              color: "#797979",
                              lineHeight: 1,
                            }}
                          >
                            {formatLink32(detail.organization)}{" "}
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              color: "#333333",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: "0.2px",
                            width: "100%",
                            backgroundColor: "#333333",
                          }}
                        />
                      </>
                
                  </View>
                ))}
                </View>
                )}

              {data.section?.length > 0 &&  data?.showCustomSection === true &&  !pageLayout &&
                data.section.map((item, index) => (
                  <View
                    style={{
                      flexDirection: "column",
                      marginTop: "24px",
                      gap: 12,
                      width: 261,
                    }}
                    key={index}
                    wrap={false}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      {formatLink22(item.header)}
                    </Text>
                    <View
                      wrap={false}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {item.subSection.map((detail, index) => (
                        <>
                          <View key={index} style={{ flexDirection: "column" }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                              }}
                            >
                              {formatLink22(detail.title)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: `${selectedFont} 400`,
                                color: "#797979",
                              }}
                            >
                              {detail?.duration?.start?.year}
                              {detail?.duration?.start?.year && "-"}
                              {detail?.duration?.end?.year === "Year" ||
                              detail?.duration?.end?.year === undefined
                                ? "Present"
                                : detail?.duration?.end?.year}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                color: "#333333",
                              }}
                            >
                              {detail.description}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: "0.2px",
                              width: "100%",
                              backgroundColor: "#333333",
                            }}
                          />
                        </>
                      ))}
                    </View>
                  </View>
                ))}
            </View>

            <View style={{ flexDirection: "column", gap: 24, width: 261 }}>
              {data.achievements.length > 0 &&
                data?.showAchievements === true && (
                  <View
                    style={{ flexDirection: "column", gap: 12 }}
                    wrap={false}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      AWARDS
                    </Text>
                    <View
                      style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                    >
                      {data.achievements
                        ?.slice(0, pageLayout && 5)
                        ?.map((detail, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                              color: "#333333",
                              lineHeight: 1.2,
                            }}
                          >
                            {formatLink40(detail.title)},
                          </Text>
                        ))}
                    </View>
                  </View>
                )}

              {/* Skills */}
              {data.skills.length > 0 && data?.showSkills === true && (
                <View style={{ flexDirection: "column", gap: 12 }} wrap={false}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: `${selectedFont} 500`,
                      color: selectedColor,
                    }}
                  >
                    SKILLS
                  </Text>
                  <View
                  wrap={false}
                    style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                  >
                    {data.skills?.slice(0, pageLayout && 8).map((detail, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
                            color: "#333333",
                            lineHeight: 1.2,
                          }}
                        >
                          {formatLink40(detail.skill)},
                        </Text>
                      ))}
                  </View>
                </View>
              )}

              {/* Education */}
              {data?.education?.length > 0 && data.showEducation === true && (
                <View>
                  {data.education
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{ flexDirection: "column", gap: 12 }}
                      >
                        {index === 0 && (
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: `${selectedFont} 500`,
                              color: selectedColor,
                            }}
                          >
                            EDUCATION
                          </Text>
                        )}
                        <>
                          <View
                            style={{ flexDirection: "column", gap: 8 }}
                            wrap={false}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                              }}
                            >
                              {formatLink32(detail.specialization)}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                gap: 8,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  width: "70%",
                                  fontFamily: `${selectedFont} 400`,
                                  color: "#797979",
                                }}
                              >
                                {formatLink30(detail.qualification)}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  width: "30%",
                                  fontFamily: `${selectedFont} 400`,
                                  color: "#797979",
                                }}
                              >
                                {detail.duration?.start?.year !== "Year" &&
                                  `${detail.duration?.start?.year}-${
                                    detail.duration?.end?.year === "Year"
                                      ? "Pursuing"
                                      : detail.duration?.end?.year
                                  }`}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: "0.2px",
                              width: "100%",
                              backgroundColor: "#333333",
                              marginBottom:'5px'
                            }}
                          />
                        </>
                      </View>
                    ))}
                </View>
              )}
              {/* social links */}
              {data?.socialLinks?.length > 0 &&
                data?.showLinks === true &&
                !pageLayout && (
                  <View>
                    {data.socialLinks.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{ flexDirection: "column", gap: 12 }}
                      >
                        {index === 0 && (
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: `${selectedFont} 500`,
                              color: selectedColor,
                            }}
                          >
                            SOCIAL LINKS
                          </Text>
                        )}
                        <>
                          <View
                            style={{ flexDirection: "column", gap: 8 }}
                            wrap={false}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                              }}
                            >
                              {formatLink40(detail.platform)}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                gap: 8,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 10,

                                  fontFamily: `${selectedFont} 400`,
                                  color: "#797979",
                                }}
                              >
                                {formatLink40(detail.link)}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: "0.2px",
                              width: "100%",
                              backgroundColor: "#333333",
                              marginBottom: 5,
                            }}
                          />
                        </>
                      </View>
                    ))}
                  </View>
                )}

              {/* Languages */}
              {data.languages.length > 0 &&
                data?.showLanguage === true &&
                !pageLayout && (
                  <View
                    style={{ flexDirection: "column", gap: 12 }}
                    wrap={false}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      LANGUAGES
                    </Text>
                    <View
                      style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                    >
                      {data.languages.map((detail, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
                            color: "#333333",
                            lineHeight: 1.2,
                          }}
                        >
                          {formatLink40(detail.languages)},
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

              {data.hobbies.length > 0 &&
                data?.showHobbies === true &&
                !pageLayout && (
                  <View
                    style={{ flexDirection: "column", gap: 12 }}
                    wrap={false}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: `${selectedFont} 500`,
                        color: selectedColor,
                      }}
                    >
                      HOBBIES
                    </Text>
                    <View
                      style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                    >
                      {data.hobbies.map((detail, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
                            color: "#333333",
                            lineHeight: 1.2,
                          }}
                        >
                          {formatLink40(detail.title)},
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

              {data.reference.length > 0 &&
                data?.showReference === true &&
                !pageLayout && (
                  <View>
                    {data.reference.map((detail, index) => (
                      <View
                        wrap={false}
                        key={index}
                        style={{ flexDirection: "column", gap: 12, width: 261 }}
                      >
                        {index === 0 && (
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: `${selectedFont} 500`,
                              color: selectedColor,
                            }}
                          >
                            REFERENCE
                          </Text>
                        )}
                        <>
                          <View
                            style={{ flexDirection: "column" }}
                            wrap={false}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 700`,
                                color: "#333333",
                                lineHeight: 1.2,
                                marginBottom: "5px",
                              }}
                            >
                              {formatLink32(detail.referantName)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                color: "#333333",
                                lineHeight: 1.4,
                                // marginBottom:"5px"
                              }}
                            >
                              {formatLink50(detail.designation)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                color: "#333333",
                                lineHeight: 1.4,
                              }}
                            >
                              {formatLink50(detail.organization)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                color: "#333333",
                                lineHeight: 1.4,
                                marginBottom: "4px",
                              }}
                            >
                              {formatLink45(detail.email)}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: "0.2px",
                              width: "100%",
                              backgroundColor: "#333333",
                            }}
                          />
                        </>
                      </View>
                    ))}
                  </View>
                )}
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template13;
