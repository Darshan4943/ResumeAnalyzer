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

import React from "react";

function Template11({ data, selectedColor, selectedFont, preview }) {
  const formatLink22 = (link) => {
    if (link?.length > 18) {
      return link?.match(/.{1,18}/g).join("\n");
    }
    return link;
  };

  const formatLink21 = (link) => {
    if (link?.length > 24) {
      return link?.match(/.{1,24}/g).join("\n");
    }
    return link;
  };

  const formatLink6 = (link) => {
    if (link?.length > 10) {
      return link?.match(/.{1,10}/g).join("\n");
    }
    return link;
  };

  const formatLink35 = (link) => {
    if (link?.length > 35) {
      return link?.match(/.{1,35}/g).join('\n');  }
    return link;
  };

  const formatLink30 = (link) => {
    if (link?.length > 30) {
      return link?.match(/.{1,30}/g).join('\n');  }
    return link;
  };

  const formatLink25 = (link) => {
    if (link?.length > 25) {
      return link?.match(/.{1,25}/g).join('\n');  }
    return link;
  };

  const formatLink58 = (link) => {
    if (link?.length > 56) {
      return link?.match(/.{1,56}/g).join('\n');  }
    return link;
  };

  return (
    <Page size="A4" wrap={true} style={{ paddingTop: "12px" }}>
      <View
        style={{ minHeight: 829.7, flexDirection: "row", marginTop: "-12px" }}
      >
        <View
          style={{
            width: 200,
            backgroundColor: selectedColor,
            flexDirection: "column",
            paddingTop: 42,
            paddingLeft: 24,
            gap: 26,
            alignItems: "flex-start",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: `${selectedFont} 700`,
                // width: "80%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {formatLink6(data.firstName)}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontFamily: `${selectedFont} 700`,
                // width: "80%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {formatLink6(data.lastName)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                paddingTop: "10px",
                fontFamily: `${selectedFont} 700`,
                marginRight: "6px",
              }}
            >
              {formatLink25(data.designation)}
            </Text>
          </View>

          <View style={{ width: "176px", height: "180px" }}>
            {data.profilePhoto ? (
              <Image
                src={
                  preview
                    ? data.profilePhoto
                    : Object.keys(data?.profilePhoto).includes("filename")
                    ? URL.createObjectURL(data.profilePhoto)
                    : data.profilePhoto
                }
                style={{ objectFit: "contain" }}
                alt=""
              />
            ) : (
              <Image
                src="/images/services/template_profile.png"
                alt=""
                style={{}}
              />
            )}
          </View>

          <View
          //  wrap={false}
          >
            {data?.skills?.length > 0 && data?.showSkills === true && (
              <>
                <View style={{ objectFit: "contain" }}>
                  <Text
                    style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}
                  >
                    Skills
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "column", gap: 14, paddingTop: 12 }}
                >
                  {data.skills?.map((detail, index) => {
                    // const calculateWidthPercentage = (rating) => {
                    //   let ratingPercentage = 0;
                    //   if (rating && rating.length > 0) {
                    //     const zerosCount = rating.filter(
                    //       (val) => val === 0
                    //     ).length;

                    //     if (zerosCount === 0) ratingPercentage = 100;
                    //     else if (zerosCount === 1) ratingPercentage = 80;
                    //     else if (zerosCount === 2) ratingPercentage = 60;
                    //     else if (zerosCount === 3) ratingPercentage = 40;
                    //     else if (zerosCount === 4) ratingPercentage = 20;
                    //   }
                    //   return ratingPercentage;
                    // };

                    // const ratingPercentage = calculateWidthPercentage(
                    //   detail.rating
                    // );

                    return (
                      <View style={{ flexDirection: "column" }} key={index}>
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              fontFamily: `${selectedFont} 500`,
                              width: "100%",
                              flexWrap: "wrap",
                              marginRight: "6px",
                              overflow: "hidden",
                            }}
                          >
                            {formatLink22(detail.skill)}
                          </Text>
                          {/* <View
                            style={{
                              width: "30%",
                              height: 3.78,
                              alignSelf: "flex-end",
                              marginBottom: 1,
                              backgroundColor: "#C1C1C1",
                              width: "40%",
                            }}
                          >
                            <View
                              style={{
                                height: "100%",
                                backgroundColor: "#1C75BC",
                                // width: `${ratingPercentage}%`,
                              }}
                            ></View>
                          </View> */}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>

          <View>
            {data?.achievements?.length > 0 && data?.showAchievements === true && (
              <View style={{ width: 228 }}>
                <View style={{ width: 228, objectFit: "contain" }}>
                  <Text
                    style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}
                  >
                    Achievements
                  </Text>
                </View>
                <View
                  style={{
                    width: 180,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 14,
                    paddingTop: 6,
                  }}
                >
                  {data?.achievements?.map((item, index) => (
                    <Text
                      wrap={false}
                      key={index}
                      style={{
                        color: "#000000",
                        fontSize: 12,
                        fontFamily: `${selectedFont} 500`,
                        // width: "90%",
                      }}
                    >
                      {formatLink22(item?.title)}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View>
            {data?.languages?.length > 0 && data?.showLanguage === true && (
              <>
                <View wrap={false}>
                  <Text
                    style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}
                  >
                    Languages
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "column", gap: 14, paddingTop: 12 }}
                >
                  {data.languages?.map((detail, index) => {
                    // const calculateWidthPercentage = (rating) => {
                    //   let ratingPercentage = 0;
                    //   if (rating && rating.length > 0) {
                    //     const zerosCount = rating.filter(
                    //       (val) => val === 0
                    //     ).length;

                    //     if (zerosCount === 0) ratingPercentage = 100;
                    //     else if (zerosCount === 1) ratingPercentage = 80;
                    //     else if (zerosCount === 2) ratingPercentage = 60;
                    //     else if (zerosCount === 3) ratingPercentage = 40;
                    //     else if (zerosCount === 4) ratingPercentage = 20;
                    //   }
                    //   return ratingPercentage;
                    // };

                    // const ratingPercentage = calculateWidthPercentage(
                    //   detail.rating
                    // );

                    return (
                      <View
                        style={{ flexDirection: "column" }}
                        key={index}
                        wrap={false}
                      >
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              fontFamily: `${selectedFont} 500`,
                              // width: "100%",
                              // flexWrap: "wrap",
                            }}
                          >
                            {formatLink21(detail.languages)}
                          </Text>
                          {/* <View
                            style={{
                              width: "30%",
                              height: 3.78,
                              alignSelf: "flex-end",
                              marginBottom: 1,
                              backgroundColor: "#C1C1C1",
                              width: "40%",
                            }}
                          >
                            <View
                              style={{
                                height: "100%",
                                backgroundColor: "#1C75BC",
                                width: `${ratingPercentage}%`,
                              }}
                            ></View>
                          </View> */}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>

          <View>
            {data?.hobbies?.length > 0 &&  data?.showHobbies === true && (
              <View style={{ width: 228 }}>
                <View style={{ width: 228, objectFit: "contain" }}>
                  <Text
                    style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}
                  >
                    Hobbies
                  </Text>
                </View>
                <View
                  style={{
                    width: 180,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 14,
                    paddingTop: 6,
                  }}
                >
                  {data?.hobbies?.map((item, index) => (
                    <Text
                      wrap={false}
                      key={index}
                      style={{
                        color: "#000000",
                        fontSize: 12,
                        fontFamily: `${selectedFont} 500`,
                        // width: "90%",
                      }}
                    >
                      {formatLink22(item?.title)}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
          {data?.socialLinks?.length > 0 && data?.showLinks === true &&  (
            <View style={{ width: 228 }}>
              <View style={{ width: 228, objectFit: "contain" }}>
                <Text
                  style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}
                >
                  Links
                </Text>
              </View>
              <View
                style={{
                  width: 180,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 4,
                  paddingTop: 6,
                }}
              >
                {data?.socialLinks?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 180,
                      flexDirection: "column",

                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 12,
                        fontFamily: `${selectedFont} 500`,
                        // width: "90%",
                      }}
                    >
                      {formatLink21(item?.platform)}
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 10,
                        fontFamily: `${selectedFont} 500`,
                        // width: "90%",
                      }}
                    >
                      {formatLink22(item?.link)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.reference?.length > 0 && data?.showReference === true && (
            <View style={{ width: 228 }}>
              <View style={{ width: 228, objectFit: "contain" }}>
                <Text
                  style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}
                >
                  References
                </Text>
              </View>
              <View
                style={{
                  width: 180,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 14,
                  paddingTop: 6,
                }}
              >
                {data?.reference?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      fontSize: "12px",
                      // width: "90%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {formatLink21(item?.referantName)}
                    </Text>
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {formatLink21(item?.designation)}
                    </Text>
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {formatLink21(item?.organization)}
                    </Text>
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {formatLink21(item?.email)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            width: 395,
            alignItems: "flex-start",
            paddingTop: 42,
            paddingLeft: 24,
            paddingBottom: 38,
            paddingRight: 16,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 22,
              width: "100%",
            }}
          >
            {data?.showSummary === true && (
              <View style={{ width: "95%" }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 18,
                      fontFamily: `${selectedFont} 700`,
                    }}
                  >
                    About Me
                  </Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#6D6E71",
                        fontSize: 12,
                        fontFamily: `${selectedFont} 500`,
                      }}
                    >
                      {data.summery}
                    </Text>
                  </View>
                </View>
              </View>
            )}


            <View style={{ flexDirection: "column", gap: 16, width: "100%" }}>
              <View style={{}}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Contact
                </Text>
              </View>
              {data.mobileNumber && (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "black",
                  }}
                >
                  <Svg
                    width="30"
                    height="33"
                    viewBox="0 0 30 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Rect
                      width="29.1538"
                      height="32"
                      transform="translate(0.800781 0.125)"
                      fill="black"
                    />
                    <Path
                      d="M22.4522 20.8917L20.993 22.3509C20.4461 22.8751 19.7392 23.1712 18.9856 23.1712C18.5748 23.1712 18.1653 23.0805 17.7998 22.8977C15.5417 21.8027 13.4676 20.3208 11.7109 18.5428C9.93293 16.7635 8.4497 14.7121 7.35596 12.4539C6.85444 11.3828 7.05986 10.105 7.90283 9.26204L9.38475 7.80284C9.47545 7.71214 9.56746 7.68945 9.65816 7.68945C9.77154 7.68945 9.88627 7.71214 9.95429 7.80284L13.4436 11.2921C13.5343 11.3601 13.5569 11.4749 13.5569 11.5882C13.5569 11.6789 13.5343 11.7936 13.4436 11.8617L12.0524 13.2755C12.6219 14.3012 13.3529 15.2362 14.1732 16.0806C15.0175 16.9009 15.9525 17.6318 16.9782 18.2014L18.3694 16.8102C18.5294 16.6501 18.8029 16.6501 18.9616 16.8102L22.4509 20.2995C22.4509 20.2995 22.4509 20.2995 22.4736 20.2995C22.6123 20.4822 22.6123 20.733 22.4522 20.8917Z"
                      fill="white"
                    />
                  </Svg>

                  <View
                    style={{
                      backgroundColor: selectedColor,
                      width: "100%",
                      // height: "33",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12",
                        fontFamily: `${selectedFont} 700`,
                      }}
                    >
                    {data.dial_code} {data.mobileNumber}
                    </Text>
                  </View>
                </View>
              )}

              {data.email && (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "black",
                  }}
                >
                  <Svg
                    width="30"
                    height="33"
                    viewBox="0 0 30 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Rect
                      width="29.1538"
                      height="32"
                      transform="translate(0.800781 0.0649414)"
                      fill="black"
                    />
                    <Path
                      d="M21.3379 7.81543H10.1644C8.45442 7.81543 7.08594 9.18393 7.08594 10.8939V19.7185C7.08594 21.4285 8.45442 22.797 10.1644 22.797H21.3379C23.0478 22.797 24.4163 21.4285 24.4163 19.7185V10.8939C24.4176 9.1826 23.0492 7.81543 21.3379 7.81543ZM22.3196 12.9C22.3196 12.9 22.2969 12.9 22.2742 12.9226V12.9L17.0069 15.8651C16.232 16.2986 15.2743 16.2986 14.498 15.8651L9.20806 12.9C8.84392 12.7399 8.66117 12.3064 8.8199 11.9423C8.97995 11.5541 9.41347 11.3954 9.77761 11.5541C9.84563 11.5768 9.89231 11.5995 9.93766 11.6222L15.2049 14.5633C15.5464 14.7687 15.9572 14.7687 16.3 14.5633L21.5673 11.6222C21.9087 11.4168 22.3649 11.5315 22.5703 11.8729C22.7757 12.2157 22.661 12.6719 22.3196 12.9Z"
                      fill="white"
                    />
                  </Svg>

                  <View
                    style={{
                      backgroundColor: selectedColor,
                      width: "100%",
                      // height: "33",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12",
                        fontFamily: `${selectedFont} 700`,
                      }}
                    >
                      {formatLink35(data.email)}
                    </Text>
                  </View>
                </View>
              )}

              {data.location && (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "black",
                  }}
                >
                  <Svg
                    width="30"
                    height="33"
                    viewBox="0 0 30 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Rect
                      width="29.1538"
                      height="32"
                      transform="translate(0.800781 -0.00683594)"
                      fill="black"
                    />
                    <Path
                      d="M15.033 6.59375C11.385 6.59375 8.41992 9.55886 8.41992 13.2069C8.41992 19.0904 14.3261 23.6054 14.5995 23.7881C14.8503 23.9935 15.2158 23.9935 15.4665 23.7881C15.7173 23.6054 21.6461 19.0904 21.6461 13.2069C21.6461 9.55752 18.681 6.59375 15.033 6.59375ZM15.033 15.9879C13.4818 15.9879 12.228 14.7341 12.228 13.2055C12.228 11.6543 13.4818 10.4005 15.033 10.4005C16.5616 10.4005 17.8154 11.6543 17.8154 13.2055C17.8154 14.7341 16.5602 15.9879 15.033 15.9879Z"
                      fill="white"
                    />
                  </Svg>

                  <View
                    style={{
                      backgroundColor: selectedColor,
                      width: "100%",
                      // height: "33",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12",
                        fontFamily: `${selectedFont} 700`,
                        paddingVertical:'5px'
                      }}
                    >
                      {formatLink35(data.location)}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* {data?.experience?.length > 0 && data?.showExperience && (
              <View style={{ flexDirection: "column", width: "100%", gap: 24 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Experience
                </Text>
                {data.experience?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", width: "100%" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                          width: "70%",
                        }}
                      >
                        {formatLink30(detail.organization)}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,

                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${
                            detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: "6px",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.location}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontFamily: `${selectedFont} 500`,
                          flexWrap: "wrap",
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )} */}

{data?.experience?.length > 0 && data?.showExperience && (
              <View
              // wrap={false}
                style={{ flexDirection: "column", gap: 24, paddingTop: 24 }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  EXPERIENCE
                </Text>
                {data?.experience?.map((detail, index) => (
                  <>
                    <View
                      // wrap={false}
                      key={index}
                      style={{
                        flexDirection: "column",
                        gap: 10,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: "#1C75BC",
                            fontSize: 13,
                            fontFamily: `${selectedFont} 700`,
                            width: "70%",
                          }}
                        >
                          {formatLink30(detail.organization)}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
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
                      <View
                        style={{
                          marginBottom:'10px',
                          flexDirection: "column",
                          gap: "8px",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 13,
                            fontFamily: `${selectedFont} 500`,
                          }}
                        >
                          {detail.location}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 13,
                            fontFamily: `${selectedFont} 500`,
                          }}
                        >
                          {detail.designation}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 500`,
                            flexWrap: "wrap",
                          }}
                        >
                          {formatLink58(detail.description)}
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
              </View>
            )}


            {data?.education?.length > 0 && data?.showEducation === true && (
              <View
              wrap={false}
                style={{ flexDirection: "column", gap: 24, paddingTop: 24 }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Education
                </Text>
                {data?.education?.map((detail, index) => (
                  <>
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        flexDirection: "column",
                        gap: 10,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: "#1C75BC",
                            fontSize: 13,
                            fontFamily: `${selectedFont} 700`,
                            width: "70%",
                          }}
                        >
                          {formatLink30(detail.qualification)}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 400`,
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
                      <View
                        style={{
                          flexDirection: "column",
                          gap: "4px",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 13,
                            fontFamily: `${selectedFont} 500`,
                          }}
                        >
                          {detail.specialization}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 13,
                            fontFamily: `${selectedFont} 500`,
                          }}
                        >
                          {formatLink58(detail.description)}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 500`,
                            flexWrap: "wrap",
                          }}
                        >
                          {detail.instituteName}
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
              </View>
            )}

            {data?.course?.length > 0 && data?.showCourses === true && (
              <View style={{ flexDirection: "column", width: "100%", gap: 24 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Courses
                </Text>
                {data.course?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", width: "100%" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                          width: "70%",
                        }}
                      >
                        {formatLink30(detail.title)}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,

                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${
                            detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: "6px",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.organization}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontFamily: `${selectedFont} 500`,
                          flexWrap: "wrap",
                        }}
                      >
                        {formatLink58(detail.description)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            {data?.project?.length > 0 && data?.showProject === true && (
              <View style={{ flexDirection: "column", width: "100%", gap: 24 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Project
                </Text>
                {data.project?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", width: "100%" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                          width: "70%",
                        }}
                      >
                        {formatLink30(detail.title)}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,

                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${
                            detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: "6px",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.organization}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontFamily: `${selectedFont} 500`,
                          flexWrap: "wrap",
                        }}
                      >
                        {formatLink58(detail.description)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {data?.internship?.length > 0 && data?.showInternship === true && (
              <View style={{ flexDirection: "column", width: "100%", gap: 24 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Internship
                </Text>
                {data.internship?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", width: "100%" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                          width: "70%",
                        }}
                      >
                        {formatLink30(detail.title)}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,

                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${
                            detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: "6px",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.organization}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontFamily: `${selectedFont} 500`,
                          flexWrap: "wrap",
                        }}
                      >
                        {formatLink58(detail.description)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {data?.extraCaricularData?.length > 0 && data?.showExtraCariculam === true && (
              <View style={{ flexDirection: "column", width: "100%", gap: 24 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    fontFamily: `${selectedFont} 700`,
                  }}
                >
                  Extra-Curriculum Activities
                </Text>
                {data.extraCaricularData?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", width: "100%" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                          width: "70%",
                        }}
                      >
                        {formatLink30(detail.title)}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,

                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${" "}${
                            detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                          }
                         `}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: "6px",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.organization}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontFamily: `${selectedFont} 500`,
                          flexWrap: "wrap",
                        }}
                      >
                        {formatLink58(detail.description)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {data?.section?.length > 0 && data?.showCustomSection === true && (
              <>
                {data?.section?.map((item, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 16, paddingTop: 24 }}
                  >
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 18,
                        fontFamily: `${selectedFont} 700`,
                      }}
                    >
                      {item?.header}
                    </Text>
                    {item?.subSection?.map((detail, index) => (
                      <View
                        style={{ flexDirection: "row", gap: 12 }}
                        key={index}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            gap: 16,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 5,
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            {detail.title.length > 0 && (
                              <Text
                                style={{
                                  color: "#1C75BC",
                                  fontSize: 13,
                                  width: "70%",
                                  fontFamily: `${selectedFont} 700`,
                                }}
                              >
                                {formatLink30(detail.title)}
                              </Text>
                            )}
                            {detail.duration?.start?.year && (
                              <Text
                                style={{
                                  color: "#000000",
                                  fontSize: 12,
                                  fontFamily: `${selectedFont} 400`,
                                }}
                              >
                                {detail?.duration?.start?.year}
                                {detail?.duration?.start?.year && "-"}
                                {detail?.duration?.end?.year === "" ||
                                detail?.duration?.end?.year === undefined
                                  ? "Present"
                                  : detail?.duration?.end?.year}
                              </Text>
                            )}
                          </View>

                          {detail.description?.length > 0 && (
                            <View
                              style={{
                                flexDirection: "column",
                                width: "100%",
                                gap: 2,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#000000",
                                  fontSize: 12,
                                  fontFamily: `${selectedFont} 500`,
                                }}
                              >
                                {formatLink58(detail.description)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template11;
