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
  data,
} from "@react-pdf/renderer";
import React from "react";

const Template44 = ({ data, selectedColor, selectedFont, preview }) => {
  return (
    <Page size="A4" wrap={true} style={{ paddingTop: "12px" }}>
      <View
        style={{
          width: 595,
          display: "flex",
          flexDirection: "row",
          marginTop: "-12px",
        }}
      >
        <View
          style={{
            width: 207,
            padding: 2,
            flexDirection: "column",
            gap: 14,
            backgroundColor: selectedColor,
            minHeight: 829.7,
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: "24px" }}>
            {data?.profilePhoto ? (
              <Image
                src={
                  preview
                    ? data.profilePhoto
                    : Object.keys(data?.profilePhoto).includes("filename")
                    ? URL.createObjectURL(data.profilePhoto)
                    : data.profilePhoto
                }
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "112px",
                  height: "112px",
                }}
              />
            ) : (
              <Image
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "112px",
                  height: "112px",
                }}
                src="/images/services/profile.png"
              />
            )}
          </View>

          <View
            style={{ flexDirection: "column", gap: 16, alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: `${selectedFont} 500`,
                fontSize: 14,
                color: "#2D3033",
              }}
            >
              PROFILE
            </Text>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 10,
                color: "#6D6E71",
                paddingHorizontal: "18px",
              }}
            >
              {data.summery ? <>{data.summery}</> : <>About</>}
            </Text>
          </View>

          <View
            style={{ width: 123, height: 1, backgroundColor: "#A7A9AC" }}
          ></View>

          <View
            style={{
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 14,
                  color: "#2D3033",
                }}
              >
                CONTACT ME
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                paddingHorizontal: "8px",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 12,
                  color: "#282829",
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#282829",
                  paddingHorizontal: "16px",
                }}
              >
                {data.location ? <>{data.location}</> : <>Your Address</>}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 12,
                  color: "#282829",
                }}
              >
                Mobile{" "}
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#282829",
                }}
              >
                {data.mobileNumber ? <>{data.mobileNumber}</> : <>Your Phone</>}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "100%",
                paddingHorizontal: "10px",
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 12,
                  color: "#282829",
                }}
              >
                Email{" "}
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#282829",
                }}
              >
                {data.email ? <>{data.email}</> : <>Your Email</>}
              </Text>
            </View>
          </View>

          <View
            style={{ width: 123, height: 1, backgroundColor: "#A7A9AC" }}
          ></View>
          {/* {data?.skills?.length > 0 && (
                        <View wrap={false} style={{ flexDirection: "column", gap: 16, width: "100%" }}>
                            <View>
                                <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 14, color: "#2D3033" }}>Personal Skills</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
                                {data.skills?.map((detail, index) => {
                                    const calculateWidthPercentage = (rating) => {
                                        let ratingPercentage = 0;
                                        if (rating && rating.length > 0) {
                                            const zerosCount = rating.filter(
                                                (val) => val === 0
                                            ).length;
                                            if (zerosCount === 0) ratingPercentage = 100;
                                            else if (zerosCount === 1) ratingPercentage = 80;
                                            else if (zerosCount === 2) ratingPercentage = 60;
                                            else if (zerosCount === 3) ratingPercentage = 40;
                                            else if (zerosCount === 4) ratingPercentage = 20;
                                        }
                                        return ratingPercentage;
                                    };
                                    const ratingPercentage = calculateWidthPercentage(
                                        detail.rating
                                    );
                                    return (
                                        <View
                                            key={index}
                                            style={{

                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%"
                                            }}
                                        >
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: "16px",
                                                    width: "100%"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#282829",
                                                        fontSize: "10px",
                                                        fontWeight: "400",
                                                        width: "80px",
                                                    }}
                                                >
                                                    {detail.skill}
                                                </Text>
                                                <View
                                                    style={{
                                                        width: "60px",
                                                        height: "6px",
                                                        display: "flex",
                                                        marginBottom: "1px",
                                                        backgroundColor: "#A7A9AC",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            width: `${ratingPercentage}%`,
                                                            height: "100%",
                                                            backgroundColor: "#282829",
                                                        }}
                                                    ></View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                            
                        </View>
                    )} */}
          {/* <View ></View> */}
          {/* {data?.skills?.length > 0 && (
            <View
              wrap={false}
              style={{
                flexDirection: "column",
                gap: 4,
                width: "100%",
                display: "flex",
                alignItems: "center",
                width : "100%"
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#2D3033",
                  }}
                >
                  Skills
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 16,
                  paddingTop: 20,
                  gap: 8,
                }}
              >
                {data.skills.map((detail, index) => (
                  <Text
                    wrap={false}
                    key={index}
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {detail.skill}
                  </Text>
                ))}
              </View>
            </View>
          )} */}
          {data?.skills?.length > 0 && (
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize:14
                  }}
                >
                  SKILLS
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.skills?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {detail.skill}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            width: 388,
            marginTop:'24px',
            paddingHorizontal: 42,
            paddingBottom: 42,
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 36,
                color: "#0D0D0D",
              }}
            >
              {data.firstName} {data.lastName}
            </Text>

            <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 20,
                  color: "#0D0D0D",
                }}
              >
                {data.designation ? <>{data.designation}</> : <>Designation</>}
              </Text>
              <View
                style={{ width: 36, height: 2, backgroundColor: "#BCBEC0" }}
              ></View>
            </View>
          </View>
          {data?.experience?.length > 0 && (
            <View style={{ display: "flex", flexDirection: "column", gap: 15 }}
            wrap={data?.experience?.length > 1 ? true : false}
           
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  EXPERIENCE
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 16 }}>
                {data?.experience?.map((detail, index) => (
                  <View key={index} style={{ flexDirection: "column", gap: 4, }}
                  wrap={false}
                  
                  >
                    
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: "#2D3033",
                      }}
                    >
                      {detail.organization} /{" "}
                      {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${" "}${
                          detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year
                        }`}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.designation}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <View
            // wrap={false}
            style={{ display: "flex", flexDirection: "column", gap: 15 }}
            wrap={data?.education?.length > 1 ? true : false}
          >
            <View
              style={{
                backgroundColor: "#2D3033",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                EDUCATION
              </Text>
            </View>
            {data?.education?.map((detail, index) => (
              <View key={index}>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 13,
                    color: "#2D3033",
                  }}
                >
                  {detail.qualification} /{" "}
                  {detail.duration?.start?.year !== "Year" &&
                    `${detail.duration?.start?.year}-${detail.duration?.end?.year}`}
                </Text>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 12,
                    color: "#6D6E71",
                  }}
                >
                  {detail.instituteName}
                </Text>
              </View>
            ))}
          </View>
          {data?.course?.length > 0 && (
            <View
              wrap={false}
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  CERTIFICATION
                </Text>
              </View>
              {data?.course?.map((detail, index) => (
                <View key={index}>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 13,
                      color: "#2D3033",
                    }}
                  >
                    {detail.courseName} / {detail.duration?.start?.year}-
                    {detail.duration?.end?.year}
                  </Text>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 12,
                      color: "#6D6E71",
                    }}
                  >
                    {detail.issuedBy}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data?.section?.map((item, index) => (
            <View
              wrap={false}
              key={index}
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  {item?.header}
                </Text>
              </View>
              {item?.subSection?.map((detail, index) => (
                <>
                  <View key={index}>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 13,
                        color: "#2D3033",
                      }}
                    >
                      {detail?.title}{" "}
                      {detail.duration?.start?.year &&
                        detail.duration?.end?.year && (
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: "#2D3033",
                            }}
                          >
                            / {detail?.duration?.start?.year}-
                            {detail?.duration?.end?.year}
                          </Text>
                        )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                </>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
};

export default Template44;
