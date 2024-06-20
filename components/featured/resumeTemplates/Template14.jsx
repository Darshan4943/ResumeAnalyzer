import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Rect,
  Font,
  Defs,
  ClipPath,
} from "@react-pdf/renderer";
function Template14({ data, selectedColor, selectedFont }) {
  // console.log("data", data);
  // const formatLink = (link, count = 200) => {
  //   console.log("first");
  //   if (link?.length > count) {
  //     return link?.match(/.{1,200}/g).join("\n");
  //   }
  //   return link;
  // };

  const formatLink = (link) => {
    if (link?.length > 100) {
      return link?.match(/.{1,100}/g).join('\n');
    }
    return link;
  };

  const formatEmail = (email) => {
    if (email?.length > 35) {
      return email?.match(/.{1,35}/g).join('\n');
    }
    return email;
  };

  const formatLocation = (location) => {
    if (location?.length > 35) {
      return location?.match(/.{1,35}/g).join('\n');
    }
    return location;
  };

  const formatDesi = (designation) => {
    if (designation?.length > 35) {
      return designation?.match(/.{1,35}/g).join('\n');
    }
    return designation;
  };

  const { firstName, lastName } = data;

  const formatNames = (firstName, lastName) => {
    const fullName = `${firstName} ${lastName}`;
    if (fullName.length > 35) {
      return fullName.match(/.{1,35}/g).join('\n');
    }
    return fullName;
  };

  const formattedNames = formatNames(firstName, lastName);

  return (
    <Page size="A4" style={{ padding: "24px" }} wrap={true}>
      <View
        style={{
          minHeight: 792,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >

            <View style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "4px"
            }}>

              {/* <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap:"4px"
              }}> */}
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: `${selectedFont} 700`,
                  color: selectedColor,
                  maxWidth:"60%"

                }}
              >
                {/* {data.firstName} {data.lastName} */}
                {/* {formatEmail`$((data.firstName)(data.firstName))`} */}
                {formattedNames}




              </Text>

              {/* <Text
                  style={{
                    fontSize: 32,
                    fontFamily: `${selectedFont} 700`,
                    color: selectedColor,
                    maxWidth: "50%"

                  }}
                >
                  {data.firstName}

                </Text>
                <Text
                  style={{
                    fontSize: 32,
                    fontFamily: `${selectedFont} 700`,
                    color: selectedColor,
                    maxWidth: "50%"

                  }}
                >
                  {data.lastName}

                </Text>

              </View> */}
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: `${selectedFont} 700`,
                  color: selectedColor,
                  maxWidth: "50%"

                }}
              >
                {/* {data.designation} */}
                {formatDesi(data.designation)}

              </Text>

            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                maxWidth: "50%",
                gap:'4px'
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: `${selectedFont} 400`,
                  color: "#4D4D4D",
                  display: "flex",
                  // flexWrap: "wrap",
                  maxWidth: "100%"
                }}
              >
                {/* {data.email} */}
                {formatEmail(data.email)}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: `${selectedFont} 400`,
                  color: "#4D4D4D",
                }}
              >
                {data.dial_code}  {data.mobileNumber}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            {data?.showSummary === true && (
              <View>
                <Text
                  style={{
                    width: "55%",
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#4D4D4D",
                  }}
                >
                  {data.summery}
                </Text>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                width: "50%",
              }}
            >
              <Text
                style={{

                  fontSize: 12,
                  fontFamily: `${selectedFont} 400`,
                  color: "#4D4D4D",
                }}
              >
                {/* {data.location} */}
                {formatLocation(data.location)}
              </Text>
            </View>
          </View>
        </View>

        {data?.skills?.length > 0 && data?.showSkills === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                SKILLS
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "16px",
                  // rowGap:'26px',
                  // columnGap:'8px'
                }}
              >
                {Array.isArray(data?.skills) &&
                  data?.skills?.map((detail, index) => (
                    <Text
                      key={index}
                      style={{
                        // width: "23%", // Slightly less than 25% to account for gaps
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.skill}
                    </Text>
                  ))}
              </View>
            </View>
          </>
        )}

        {data?.experience?.length > 0 && data?.showExperience === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                EXPERIENCE
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {data?.experience?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{
                      gap: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1, // Use flex for better width handling
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                          maxWidth: '80%'

                        }}
                      >
                        {detail.organization}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                          // marginLeft: 10, // Add margin for spacing if needed
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                            ? "Present"
                            : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "100%"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#989898",
                        }}
                      >
                        {detail.designation}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#989898",
                        }}
                      >
                        {detail.location}
                      </Text> */}
                    </View>


                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}


        {data?.education?.length > 0 && data?.showEducation === true && (
          <>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} >
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View style={{ display: "flex", flexDirection: "column", gap: 12,marginTop:'4px' }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                  }}
                >
                  EDUCATION
                </Text>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {data?.education?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{ gap: 4, display: "flex", flexDirection: "column" }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "98%",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            flex: 1, // Use flex for better width handling
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: selectedColor,
                            maxWidth: '80%'
                          }}
                        >
                          {detail.qualification}
                        </Text>

                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            color: "#4D4D4D",
                            // marginLeft: 10, // Add margin for spacing if needed
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year} - ${detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                            }`}
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {detail.specialization}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.instituteName}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}

        {data?.internship?.length > 0 && data?.showInternship === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                INTERNSHIP
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {data?.internship?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{
                      gap: 3,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1, // Use flex for better width handling
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {detail.title}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                          // marginLeft: 10, // Add margin for spacing if needed
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                            ? "Present"
                            : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#989898",
                        }}
                      >
                        {detail.organization}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}



        {data?.course?.length > 0 && data?.showCourses === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "2px" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                 
                }}
              >
                COURSES & CERTIFICATIONS
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {data?.course?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{
                      gap: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1, // Use flex for better width handling
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {detail.title}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                          // marginLeft: 10, // Add margin for spacing if needed
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                            ? "Present"
                            : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#989898",
                        }}
                      >
                        {detail.organization}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {data?.project?.length > 0 && data?.showProject === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 8,marginTop:'2px' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                PROJECTS
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {data?.project?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{
                      gap: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1, // Use flex for better width handling
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {detail.title}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                          // marginLeft: 10, // Add margin for spacing if needed
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                            ? "Present"
                            : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#989898",
                        }}
                      >
                        {detail.organization}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
        {data?.extraCaricularData?.length > 0 &&
          data?.showExtraCariculam === true && (
            <>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8,marginTop:'2px' }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                  }}
                >
                  Extra Activities
                </Text>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {data?.extraCaricularData?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{
                        gap: 4,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            flex: 1, // Use flex for better width handling
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
                            color: selectedColor,
                          }}
                        >
                          {detail.title}
                        </Text>

                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            color: "#4D4D4D",
                            // marginLeft: 10, // Add margin for spacing if needed
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                              ? "Present"
                              : detail.duration?.end?.year
                            }
                         `}
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {detail.organization}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        {data?.achievements?.length > 0 && data?.showAchievements === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 ,marginTop:'2px'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                ACHIEVEMENTS & AWARDS
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {data?.achievements?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{ gap: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      {detail.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {data?.reference?.length > 0 && data?.showReference === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                  marginTop: "4px",
                }}
              >
                REFERENCES
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {data?.reference?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{ gap: 4, display: "flex", flexDirection: "column" }}
                  >
                    <Text
                      style={{
                        // flex: 1, // Use flex for better width handling
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      {detail.referantName}
                    </Text>

                    <Text
                      style={{
                        // flex: 1,
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#989898",
                      }}
                    >
                      {detail.designation}
                    </Text>

                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.organization}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.email}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
        {data?.socialLinks?.length > 0 && data?.showLinks === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                  marginTop: "4px",
                }}
              >
                LINKS
              </Text>

              <View style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {data?.socialLinks?.map((detail, index) => (
                  <View
                    key={index}
                    style={{
                      gap: 4,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      {detail.platform}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {/* {console.log(formatLink(detail?.link, 20))} */}
                      {/* {detail.link} */}
                      {formatLink(detail?.link)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {data?.section?.length > 0 && data?.showCustomSection === true && (
          <>
            {data.section.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#DEDEDE",
                    marginTop: '6px'
                  }}
                ></View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: `${selectedFont} 500`,
                      color: "#4D4D4D",
                      marginTop: "8px",
                    }}
                  >
                    {item.header}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {item?.subSection?.map((detail, index) => (
                      <View
                        key={index}
                        style={{
                          gap: 4,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "start",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              flex: 1, // Use flex for better width handling
                              fontSize: 14,
                              fontFamily: `${selectedFont} 400`,
                              color: selectedColor,
                            }}
                          >
                            {detail.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              color: "#4D4D4D",
                              // marginLeft: 10, // Add margin for spacing if needed
                            }}
                          >
                            {detail?.duration?.start?.year}
                            {detail?.duration?.start?.year && "-"}
                            {detail?.duration?.end?.year === "Year" ||
                              detail?.duration?.end?.year === undefined
                              ? "Present"
                              : detail?.duration?.end?.year}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            color: "#4D4D4D",
                          }}
                        >
                          {detail.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {data?.hobbies?.length > 0 && data?.showHobbies === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                HOBBIES
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "26px",
                }}
              >
                {data?.hobbies?.map((detail, index) => (
                  <Text
                    // wrap={false}
                    key={index}
                    style={{
                      fontSize: 10,
                      fontFamily: `${selectedFont} 400`,
                      color: "#4D4D4D",
                    }}
                  >
                    {detail.title}
                  </Text>
                ))}
              </View>
            </View>
          </>
        )}

        {data?.languages?.length > 0 && data?.showLanguage === true && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                LANGUAGES
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "26px",
                }}
              >
                {data?.languages?.map((detail, index) => (
                  <Text
                    // wrap={false}
                    key={index}
                    style={{
                      fontSize: 10,
                      fontFamily: `${selectedFont} 400`,
                      color: "#4D4D4D",
                    }}
                  >
                    {detail.languages}
                  </Text>
                ))}
              </View>
            </View>
          </>
        )}
      </View>
    </Page>
  );
}

export default Template14;
