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

function Template13({ data, selectedColor, selectedFont }) {

  const formatLink = (link) => {
    if (link?.length > 30) {
      return link?.match(/.{1,30}/g).join('\n');  }
    return link;
  };
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
                    flexWrap: "wrap"
                  }}
                >
                  {data.lastName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%", gap: 20 }}>
                <View style={{ flexDirection: "column", gap: 14, width: "70%" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: `${selectedFont} 500`,
                      color: selectedColor,
                    }}
                  >
                    {data.designation}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "#333333",
                    }}
                  >
                    {data.summery}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    width: "30%",
                    backgroundColor: "#F9F9F9",
                    gap: 14,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 4,
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
                        fontSize: 14,
                        width: "100%",
                        marginRight: "6px",
                        fontFamily: `${selectedFont} 600`,
                        color: "#333333",
                        flexWrap: "wrap"

                      }}
                    >
                      {data.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 4,
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
                        fontSize: 14,
                        fontFamily: `${selectedFont} 600`,
                        color: "#333333",
                      }}
                    >
                      {data.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 4,
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
                        fontSize: 14,
                        fontFamily: `${selectedFont} 600`,
                        color: "#333333",
                      }}
                    >
                      {data.mobileNumber}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 24, paddingTop: 24 }}>
            <View>
              <View style={{ flexDirection: "column", gap: 16, width: 261 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                  Work experience
                </Text>
                {data.experience.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", }}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#797979",
                        }}
                      >
                        {detail.organization} {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
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
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>    

              {data.project.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16, width: 261 ,paddingTop: 24 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                 PROJECTS
                </Text>
                {data.project.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", }}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#797979",
                        }}
                      >
                        {detail.organization} {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
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
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>
              )}

{data.internship.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16, width: 261 ,paddingTop: 24 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                 INTERNSHIP
                </Text>
                {data.internship.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", }}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#797979",
                        }}
                      >
                        {detail.organization} {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
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
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>
              )}

{data.course.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16, width: 261 ,paddingTop: 24 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                CERTIFICATION
                </Text>
                {data.course.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", }}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#797979",
                        }}
                      >
                        {detail.organization} {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
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
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>
              )}

{data.extraCaricularData.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16, width: 261 ,paddingTop: 24 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                ACTIVITIES
                </Text>
                {data.extraCaricularData.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", }}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#797979",
                        }}
                      >
                        {detail.organization} {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
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
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>
              )}

{data.section?.length > 0 &&
                  data.section.map((item, index) => (
                    <View
                      style={{ flexDirection: "column", marginTop: "24px", gap: 16, width: 261 }}
                      key={index}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: `${selectedFont} 500`,
                          color: selectedColor,
                        }}
                      >
                        {item.header}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {item.subSection.map((detail, index) => (
                          <>
                            <View
                              key={index}
                              style={{ flexDirection: "column", }}
                           
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: `${selectedFont} 700`,
                                  color: "#333333",
                                }}
                              >
                                {detail.title}
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
                                {(detail?.duration?.end?.year === "" || detail?.duration?.end?.year === undefined)
                                  ? "Present"
                                  : detail?.duration?.end?.year
                                }
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
                              style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                          </>


                        ))}
                      </View>
                    </View>
                  ))}
            </View>

            <View style={{ flexDirection: "column", gap: 24, width: 261 }}>

            {data.achievements.length > 0 && (
                <View style={{ flexDirection: "column", gap: 16 }} wrap={false}>
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
                    {data.achievements.map((detail, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: "#333333",
                          lineHeight: 1.2,
                        }}
                      >
                        {detail.title},
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <View style={{ flexDirection: "column", gap: 16 }} wrap={false}>
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
                    style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                  >
                    {data.skills.map((detail, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: "#333333",
                          lineHeight: 1.2,
                        }}
                      >
                        {detail.skill},
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Education */}
              <View style={{ flexDirection: "column", gap: 16 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                  Education
                </Text>
                {data.education.map((detail, index) => (
                  <>
                    <View
                      key={index}
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
                        {detail.specialization}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", width: "100%", gap: 8 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            width: "70%",
                            fontFamily: `${selectedFont} 400`,
                            color: "#797979",
                          }}
                        >
                          {detail.qualification}
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
                          `${detail.duration?.start?.year}-${detail.duration?.end?.year ==="Year" ? "Pursuing" : detail.duration?.end?.year}`}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>

              {/* social links */}
              {data?.socialLinks?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                  SOCIAL LINKS
                </Text>
                {data.socialLinks.map((detail, index) => (
                  <>
                    <View
                      key={index}
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
                        {detail.platform}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", width: "100%", gap: 8 ,}}>
                        <Text
                          style={{
                            fontSize: 12,
                            
                            fontFamily: `${selectedFont} 400`,
                            color: "#797979",
                          }}
                        >
                          {formatLink(detail.link)}
                        </Text>
                       
                      </View>
                    </View>
                    <View
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
                ))}
              </View>
              )}


              {/* Languages */}
              {data.languages.length > 0 && (
                <View style={{ flexDirection: "column", gap: 16 }} wrap={false}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: `${selectedFont} 500`,
                      color: selectedColor,
                    }}
                  >
                    Languages
                  </Text>
                  <View
                    style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                  >
                    {data.languages.map((detail, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: "#333333",
                          lineHeight: 1.2,
                        }}
                      >
                        {detail.languages},
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {data.hobbies.length > 0 && (
                <View style={{ flexDirection: "column", gap: 16 }} wrap={false}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: `${selectedFont} 500`,
                      color: selectedColor,
                    }}
                  >
                    Interests
                  </Text>
                  <View
                    style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}
                  >
                    {data.hobbies.map((detail, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: "#333333",
                          lineHeight: 1.2,
                        }}
                      >
                        {detail.title},
                      </Text>
                    ))}
                  </View>
                </View>
              )}
 
 {data.reference.length > 0 && (
           <View style={{ flexDirection: "column", gap: 16, width: 261 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: `${selectedFont} 500`,
                    color: selectedColor,
                  }}
                >
                  REFERENCE
                </Text>
                {data.reference.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column" }}
                      // wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#333333",
                          lineHeight: 1.2,
                        }}
                      >
                        {detail.referantName}
                      </Text>
                      <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#333333",
                            lineHeight: 1.2,
                          }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#333333",
                            lineHeight: 1.2,
                          }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#333333",
                            lineHeight: 1.2,
                          }}
                      >
                        {detail.email}
                      </Text>
                 
                    </View>
                    <View
                      style={{ height: "0.2px", width: "100%", backgroundColor: "#333333" }} />
                  </>
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
