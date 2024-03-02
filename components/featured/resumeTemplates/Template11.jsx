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
  return (
    <Page size="A4">
      <View style={{ minHeight: 841.8, flexDirection: "row" }}>
        <View
          style={{
            width: 245,
            backgroundColor: selectedColor,
            flexDirection: "column",
            paddingTop: 42,
            paddingLeft: 24,
            gap: 26,
            alignItems: "flex-start",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 36, fontFamily: `${selectedFont} 700` }}>
              {data.firstName}
            </Text>
            <Text style={{ fontSize: 36, fontFamily: `${selectedFont} 700` }}>
              {data.lastName}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}>
              {data.designation}
            </Text>
          </View>

          <View style={{ width: "221px", height: "180px" }}>
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

          <View>
            {data?.skills?.length > 0 && (
              <>
                <View style={{ objectFit: "contain" }}>
                  <Text
                    style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}
                  >
                    SKILLS
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "column", gap: 14, paddingTop: 12 }}
                >
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
                      <View style={{ flexDirection: "column" }} key={index}>
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              fontFamily: `${selectedFont} 500`,
                              width: "45%",
                            }}
                          >
                            {detail.skill}
                          </Text>
                          <View
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
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>
          <View>
            {data?.languages?.length > 0 && (
              <>
                <View style={{ objectFit: "contain" }}>
                  <Text
                    style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}
                  >
                    LANGUAGES
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "column", gap: 14, paddingTop: 12 }}
                >
                  {data.languages?.map((detail, index) => {
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
                      <View style={{ flexDirection: "column" }} key={index}>
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              fontFamily: `${selectedFont} 500`,
                              width: "45%",
                            }}
                          >
                            {detail.languages}
                          </Text>
                          <View
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
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>

          <View>
            {data?.hobbies?.length > 0 && (
              <View style={{ width: 228 }}>
                <View style={{ width: 228, objectFit: "contain" }}>
                  <Text
                    style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}
                  >
                    HOBBIES
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 14,
                    paddingTop: 6,
                  }}
                >
                  {data?.hobbies?.map((item, index) => (
                    <Text
                      key={index}
                      style={{
                        color: "#000000",
                        fontSize: 14,
                        fontFamily: `${selectedFont} 500`,
                      }}
                    >
                      {item?.title}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            width: 350,
            alignItems: "flex-start",
            paddingTop: 32,
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
            }}
          >
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

            <View style={{ flexDirection: "column", gap: 16 }}>
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
                <View style={{ flexDirection: "row" }}>
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
                      width: "250",
                      height: "33",
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
                      {data.mobileNumber}
                    </Text>
                  </View>
                </View>
              )}

              {data.email && (
                <View style={{ flexDirection: "row" }}>
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
                      width: "250",
                      height: "33",
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
                      {data.email}
                    </Text>
                  </View>
                </View>
              )}

              {data.location && (
                <View style={{ flexDirection: "row" }}>
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
                      width: "250",
                      height: "33",
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
                      {data.location}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <View style={{ flexDirection: "column", gap: 16, paddingTop: 24 }}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: `${selectedFont} 700`,
                }}
              >
                Experience
              </Text>
              {data.experience.map((detail, index) => (
                <View
                  style={{ flexDirection: "row", gap: 30, width: "90%" }}
                  key={index}
                >
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <View
                      style={{ flexDirection: "column", gap: 5, width: 124 }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year} -
                        {detail.duration?.end?.year == undefined || "Year"
                          ? "Present"
                          : detail.duration?.end?.year}
                      </Text>

                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                        }}
                      >
                        {detail.organization}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.location}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "column", gap: 2, width: "70%" }}
                    >
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
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "column", gap: 16, paddingTop: 24 }}>
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
                <View style={{ flexDirection: "row", gap: 30 }} key={index}>
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <View
                      style={{ flexDirection: "column", gap: 5, width: 124 }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year}-
                        {detail.duration?.end?.year}
                      </Text>

                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                        }}
                      >
                        {detail.instituteName}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.location}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "column", width: 246, gap: 2 }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.qualification}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.specialization}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "column", gap: 16, paddingTop: 24 }}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: `${selectedFont} 700`,
                }}
              >
                Course and certification
              </Text>
              {data?.course?.map((detail, index) => (
                <View style={{ flexDirection: "row", gap: 30 }} key={index}>
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <View
                      style={{ flexDirection: "column", gap: 5, width: 124 }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.duration?.start?.year}-
                        {detail.duration?.end?.year}
                      </Text>

                      <Text
                        style={{
                          color: "#1C75BC",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 700`,
                        }}
                      >
                        {detail.courseName}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "column", width: 246, gap: 2 }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.issuedBy}
                      </Text>

                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 13,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.discription}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template11;
