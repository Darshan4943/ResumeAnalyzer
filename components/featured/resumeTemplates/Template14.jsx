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
              maxWidth:"30%"
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
        <View
        wrap={data?.experience?.length > 1 ? true : false}
        > 
          
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}
        // wrap={data?.experience?.length > 1 ? true : false}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: `${selectedFont} 500`,
              color: "#4D4D4D",
              marginTop:'4px'
            }}
          >
            EXPERIENCE
          </Text>
          <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {data?.experience?.map((detail, index) => (
              <View
                wrap={false}
                key={index}
                style={{ gap: 4, display: "flex", flexDirection: "column" }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
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
                      `${detail.duration?.start?.year} - ${
                        detail.currentlyWorking
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
                    justifyContent:'flex-start',
                    alignItems:'flex-start'

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
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        {/* <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: `${selectedFont} 400`,
              color: "#4D4D4D",
            }}
          >
            EDUCATION
          </Text>
          <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data?.education?.map((detail, index) => (
              <View
                wrap={false}
                key={index}
                style={{ gap: 6, display: "flex", flexDirection: "column" }}
              >
              
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 14.64 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: `${selectedFont} 600`,
                      color: selectedColor,
                    }}
                  >
                    {detail.qualification} -
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    {detail.specialization}
                  </Text>
                </View>

                <View
                  style={{ display: "flex", flexDirection: "row", gap: 14.64 }}
                >
                  <Text
                    style={{ fontSize: 10, fontFamily: `${selectedFont} 400` }}
                  >
                    {detail.duration?.start?.year !== "Year" &&
                      `${detail.duration?.start?.year}-${detail.duration?.end?.year}`}
                  </Text>

                  <View
                    style={{ width: 1, height: 20, backgroundColor: "#DEDEDE" }}
                  ></View>

                  <Text
                    style={{ fontFamily: `${selectedFont} 400`, fontSize: 12 }}
                  >
                    {" "}
                    {detail.instituteName}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View> */}
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: `${selectedFont} 500`,
              color: "#4D4D4D",
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
                    alignItems: "center",
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
                      `${detail.duration?.start?.year}-${detail.duration?.end?.year}`}
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
        {data?.course?.length > 0 && (
          <>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                CERTIFICATION
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {data?.course?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{ gap: 6, display: "flex", flexDirection: "column" }}
                  >
                    <View
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: `${selectedFont} 600`,
                          color: selectedColor,
                        }}
                      >
                        {detail.courseName}
                      </Text>
                      {new Date(detail.duration?.start?.year) &&
                        new Date(detail.duration?.end?.year) && (
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year} -{" "}
                            {detail.duration?.end?.year}
                          </Text>
                        )}
                    </View>
                    <View style={{ display: "flex", gap: 8 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.issuedBy}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
        ></View>
        {data?.section?.map((item, index) => (
          <View key={index}>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                {item?.header}
              </Text> */}
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {item?.subSection?.map((detail, index) => (
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
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                       <View style={{maxWidth:'80%'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: `${selectedFont} 500`,
                          color: "#4D4D4D",
                        }}
                      >
                        {item?.header}
                      </Text>
                      </View>
                     
                        {detail.duration?.start?.year &&
                          detail.duration?.end?.year && (
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: `${selectedFont} 400`,
                                color: "#4D4D4D",
                                marginLeft: 10,
                              }}
                            >
                              {detail.duration?.start?.year} -{" "}
                              {detail.duration?.end?.year}
                            </Text>
                          )}
                      
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: "#989898",
                      }}
                    >
                      {detail.title}
                    </Text>
                    <View style={{ display: "flex", gap: 8 }}>
                      {/* {detail.duration?.start?.year &&
                        detail.duration?.end?.year && (
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year} -{" "}
                            {detail.duration?.end?.year}
                          </Text>
                        )} */}

                      {detail.description?.length > 5 && (
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            paddingBottom: "8px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: `${selectedFont} 400`,
                              color: "#4D4D4D",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#DEDEDE" }}
            ></View>
          </View>
        ))}

        <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
          {data?.hobbies?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 500`,
                  color: "#4D4D4D",
                }}
              >
                {" "}
                HOBBIES
              </Text>
              <View style={{ display: "flex", gap: 4 }}>
                {data?.hobbies?.map((detail, index) => (
                  <Text
                    wrap={false}
                    key={index}
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "#989898",
                      marginLeft:'6px'
                    }}
                  >
                    {detail.title}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {data?.languages?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: 12,
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
              <View style={{ display: "flex", gap: 4 }}>
                {data?.languages?.map((detail, index) => (
                  <Text
                    wrap={false}
                    key={index}
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "#989898",
                      
                    }}
                  >
                    {detail.languages}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </Page>
  );
}

export default Template14;
