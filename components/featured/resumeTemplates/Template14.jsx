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
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 400.06,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontFamily: `${selectedFont} 700`,
                color: selectedColor,
              }}
            >
              {data.firstName} {data.lastName}
            </Text>
            <Text
              style={{
                width: "80%",
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              {data.summery}
            </Text>
          </View>
          < View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "flex-end",
              maxWidth: "30%"
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              {data.email}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              {data.mobileNumber}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: `${selectedFont} 400`,
                color: "#4D4D4D",
              }}
            >
              {data.location}
            </Text>
          </View>
        </View>

        {data?.skills?.length > 0 && (
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
                SKILLS
              </Text>
              {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: "8px",
            }}
          >
            {Array.isArray(data?.skills) &&
              data?.skills?.map((detail, index) => (
                <Text
                  key={index}
                  style={{
                    width: "30%",
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#4D4D4D",
                  }}
                >
                  {detail.skill}
                </Text>
              ))}
          </View> */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "26px",
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
                        fontSize: 11,
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
        <View
        // wrap={data?.experience?.length > 1 ? true : false}
        >
          {data?.experience?.length > 0 && (
            <>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: '12px' }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",

                  }}
                >
                  EXPERIENCE
                </Text>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data?.experience?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                          {detail.organization}
                        </Text>

                        <Text
                          style={{
                            fontSize: 14,
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
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'

                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {" "}
                          {detail.designation}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {" "}
                          {detail.location}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

{data?.internships?.length > 0 && (
            <>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                    marginTop: '8px'
                  }}
                >
                Internships
                </Text>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data?.internships?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                            fontSize: 14,
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
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'

                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {" "}
                          {detail.organization}
                        </Text>
                       
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

        </View>
        {data?.education?.length > 0 && (<>

          {/* <View style={{ display: "flex", flexDirection: "column",gap:4 }} > */}

          <View
            style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
          ></View>

          <View style={{ display: "flex", flexDirection: "column", }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: `${selectedFont} 500`,
                color: "#4D4D4D",
                marginTop: 8
              }}
            >
              EDUCATION
            </Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {data?.education?.map((detail, index) => (
                <View
                  wrap={false}
                  key={index}
                  style={{ gap: 6, display: "flex", flexDirection: "column" }}
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
                      {detail.qualification}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                        marginLeft: 10, // Add margin for spacing if needed
                      }}
                    >
                      {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year" ? "Pursuing" : detail.duration?.end?.year}`}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: "#989898",
                      }}
                    >
                      {" "}
                      {detail.specialization}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {" "}
                      {detail.instituteName}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {/* </View> */}
        </>)}





        {(data?.customDataSection?.length > 0 &&
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>

            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data?.customDataSection?.map((detail, index) => (
                <View
                  // wrap={false}
                  key={index}
                  style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                        fontSize: 14,
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


                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: `${selectedFont} 400`,
                      color: "#4D4D4D",
                    }}
                  >
                    {detail.description}{" "}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* {(data?.extraCaricularData?.length > 0 &&
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>

            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data?.extraCaricularData?.map((detail, index) => (
                <View
                  // wrap={false}
                  key={index}
                  style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                        fontSize: 14,
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


                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: `${selectedFont} 400`,
                      color: "#4D4D4D",
                    }}
                  >
                    {detail.description}{" "}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )} */}

{data?.extraCaricularData?.length > 0 && (
            <>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                    marginTop: '8px'
                  }}
                >
                  Extra-Curriculum Activities
                </Text>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data?.extraCaricularData?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                            fontSize: 14,
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
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'

                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {" "}
                          {detail.organization}
                        </Text>
                       
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}


        <View
        >
         

{data?.course?.length > 0 && (
            <>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                    marginTop: '12px'
                  }}
                >
                   Courses & Certifications
                </Text>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data?.course?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                            fontSize: 14,
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
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'

                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {" "}
                          {detail.organization}
                        </Text>
                       
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

        </View>

        <View
        >
          {data?.project?.length > 0 && (
            <>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
              ></View>
              <View style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: `${selectedFont} 500`,
                    color: "#4D4D4D",
                    marginTop: '12px'
                  }}
                >
                 Projects
                </Text>
                <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data?.project?.map((detail, index) => (
                    <View
                      // wrap={false}
                      key={index}
                      style={{ gap: 4, display: "flex", flexDirection: "column" }}
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
                            fontSize: 14,
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
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'

                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: `${selectedFont} 400`,
                            color: "#989898",
                          }}
                        >
                          {" "}
                          {detail.organization}
                        </Text>
                       
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#4D4D4D",
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

        </View>
        {data?.hobbies?.length > 0 && (
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
                Hobbies
              </Text>

              <View style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                gap: "26px",
              }}>
                {data?.hobbies?.map((detail, index) => (
                  <Text
                    // wrap={false} 
                    key={index}
                    style={{
                      fontSize: 11,
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

        {data?.languages?.length > 0 && (
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
                Languages
              </Text>

              <View style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                gap: "26px",
              }}>
                {data?.languages?.map((detail, index) => (
                  <Text
                    // wrap={false} 
                    key={index}
                    style={{
                      fontSize: 11,
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

        {data?.achievement?.length > 0 && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                  marginTop: '4px'
                }}
              >
                Achievements & Awards
              </Text>
              <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {data?.achievement?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{ gap: 4, display: "flex", flexDirection: "column" }}
                  >

                      <Text
                        style={{
                          fontSize: 14,
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
        {data?.reference?.length > 0 && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                  marginTop: '4px'
                }}
              >
                References
              </Text>
              <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {data?.reference?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{ gap: 4, display: "flex", flexDirection: "column" }}
                  >

                    <Text
                      style={{
                        // flex: 1, // Use flex for better width handling
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      {detail.referantName}
                    </Text>

                    <Text
                      style={{
                        // flex: 1,
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: "#989898",
                      }}
                    >
                      {" "}
                      {detail.designation}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.organization}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.email}{" "}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
        {data?.sociaLinks?.length > 0 && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                  marginTop: '4px'
                }}
              >
              Links
              </Text>
              <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {data?.sociaLinks?.map((detail, index) => (
                  <View
                    // wrap={false}
                    key={index}
                    style={{ gap: 4, display: "flex", flexDirection: "column" }}
                  >

                    <Text
                      style={{
                        // flex: 1, // Use flex for better width handling
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      {detail.platform}
                    </Text>

                    <Text
                      style={{
                        // flex: 1,
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {" "}
                      {detail.link}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: "#4D4D4D",
                      }}
                    >
                      {detail.discription}
                    </Text>

                  </View>
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
