import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath } from '@react-pdf/renderer';

const Template18 = ({ data ,selectedColor,selectedFont,preview }) => {
  return (

    <Page size="A4">
    <View style={{ width: 595, display: "flex", flexDirection: "row" }}>
      <View
        style={{
          width: 207,
          padding: 24,
          backgroundColor: "#252829",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          minHeight: 841.8,
        }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <View
            style={{
              height: 159,
              width: 159,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: 2,
              borderColor: "#83C3C9",
              padding: 12,
              borderRadius: "50%",
              overflow:'hidden',
              padding:'4px'
            }}
          >
            {data.profilePhoto ? (
              <Image
              src={
                preview
                  ? data.profilePhoto
                  : Object.keys(data?.profilePhoto).includes("filename")
                  ? URL.createObjectURL(data.profilePhoto)
                  : data.profilePhoto
              }
                alt=""
                style={{objectFit:'contain'}}
              />
            ) : (
              <Image src="/images/services/profile.png" alt="" style={{}} />
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              {data.firstName}
            </Text>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              {data.lastName}
            </Text>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 12,
                color: "#FFFFFF",
              }}
            >
              {data.designation}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 18,
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Contact
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
              <Svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M6.09874 9.4259C4.1505 7.42929 3.66645 5.35396 3.66645 5.35396C3.89606 5.28861 4.32816 5.1516 4.50657 5.06263C5.52737 4.55404 5.46263 3.40852 4.9447 2.26142C4.39892 1.05212 3.34426 0.550599 3.34426 0.550599C1.24922 0.129391 0.960148 1.39459 0.846476 2.15197C0.577727 3.94782 1.4585 8.19611 4.4471 11.2635C4.4456 11.2642 4.44334 11.2658 4.44183 11.2674C4.46818 11.2942 4.49679 11.317 4.52389 11.3438C4.5683 11.3887 4.60896 11.4359 4.65412 11.48C4.65563 11.4768 4.65789 11.4737 4.66015 11.4705C7.76468 14.4198 11.9871 15.1567 13.6862 14.7733C14.4021 14.6119 15.5938 14.2379 15.0728 12.0744C15.0728 12.0744 14.5338 11.0013 13.3482 10.5006C12.2235 10.025 11.1259 10.0227 10.6991 11.1178C10.6246 11.3091 10.5184 11.7681 10.4695 12.0114C10.4695 12.0114 8.46102 11.6248 6.44427 9.70381L6.09874 9.4259Z"
                  fill="#83C3C9"
                />
              </Svg>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                {data.mobileNumber}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
              <Svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="#252829"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M12.6685 11.4664H3.33303C1.94017 11.4664 0.800781 10.3006 0.800781 8.87534V3.65747C0.800781 2.23226 1.94017 1.06641 3.33303 1.06641H12.6685C14.0614 1.06641 15.2008 2.23226 15.2008 3.65747V8.87534C15.2002 10.3006 14.0608 11.4664 12.6685 11.4664Z"
                  stroke="#83C3C9"
                  stroke-width="0.75"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M0.800781 3.6582L8.00078 8.62547L15.2002 3.6582"
                  stroke="#83C3C9"
                  stroke-width="0.75"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M10.168 7.13086L15.1063 9.38114"
                  stroke="#83C3C9"
                  stroke-width="0.75"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M0.800781 8.87591L5.67854 7.02344"
                  stroke="#83C3C9"
                  stroke-width="0.75"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>

              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                {data.email}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
              <Svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="#252829"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9.46931 10.2643C11.0433 7.85978 10.8454 8.15976 10.8908 8.09707C11.4638 7.31018 11.7667 6.38406 11.7667 5.41875C11.7667 2.85881 9.6329 0.75 7 0.75C4.37568 0.75 2.23333 2.85465 2.23333 5.41875C2.23333 6.38344 2.54256 7.33381 3.13438 8.13129L4.53064 10.2643C3.0378 10.4876 0.5 11.1532 0.5 12.6187C0.5 13.153 0.858164 13.9143 2.56446 14.5076C3.75589 14.9218 5.33112 15.15 7 15.15C10.1207 15.15 13.5 14.293 13.5 12.6187C13.5 11.153 10.9652 10.4881 9.46931 10.2643ZM3.8583 7.6672C3.85354 7.65995 3.84857 7.65286 3.84337 7.64588C3.3509 6.9863 3.1 6.20459 3.1 5.41875C3.1 3.30887 4.84506 1.59375 7 1.59375C9.15046 1.59375 10.9 3.30963 10.9 5.41875C10.9 6.20586 10.6538 6.96104 10.188 7.60325C10.1463 7.65685 10.3641 7.32745 7 12.4666L3.8583 7.6672ZM7 14.3062C3.59128 14.3062 1.36667 13.3308 1.36667 12.6187C1.36667 12.1402 2.50974 11.3533 5.04272 11.0465L6.63456 13.4783C6.71412 13.5999 6.85192 13.6734 6.99997 13.6734C7.14803 13.6734 7.28586 13.5998 7.36539 13.4783L8.95719 11.0465C11.4902 11.3533 12.6333 12.1402 12.6333 12.6187C12.6333 13.3247 10.4287 14.3062 7 14.3062Z"
                  fill="#83C3C9"
                />
                <Path
                  d="M6.9987 3.30859C5.804 3.30859 4.83203 4.25486 4.83203 5.41797C4.83203 6.58108 5.804 7.52734 6.9987 7.52734C8.1934 7.52734 9.16536 6.58108 9.16536 5.41797C9.16536 4.25486 8.1934 3.30859 6.9987 3.30859ZM6.9987 6.68359C6.28188 6.68359 5.6987 6.11583 5.6987 5.41797C5.6987 4.7201 6.28188 4.15234 6.9987 4.15234C7.71552 4.15234 8.2987 4.7201 8.2987 5.41797C8.2987 6.11583 7.71552 6.68359 6.9987 6.68359Z"
                  fill="#83C3C9"
                />
              </Svg>

              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                {data.location}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              SKILLS
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {data?.skills?.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 14,
                  width: "100%",
                  flexWrap: "wrap",
                }}
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
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 8,
                        width: "40%",
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.skill}
                      </Text>
                      <View
                        style={{
                          height: 6,
                          backgroundColor: "#555C5E",
                          width: "60",
                        }}
                      >
                        <View
                          style={{
                            height: "100%",
                            backgroundColor: "#83C3C9",
                            width: `${ratingPercentage}%`,
                          }}
                        ></View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Languages
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {data?.languages?.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 14,
                  width: "100%",
                  flexWrap: "wrap",
                }}
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
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 8,
                        width: "40%",
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.languages}
                      </Text>
                      <View
                        style={{
                          height: 6,
                          backgroundColor: "#555C5E",
                          width: "60",
                        }}
                      >
                        <View
                          style={{
                            height: "100%",
                            backgroundColor: "#83C3C9",
                            width: `${ratingPercentage}%`,
                          }}
                        ></View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
        {/* <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
            width:"100%"
          }}
        >
          
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Languages
            </Text>
            {data?.languages?.length > 0 && (
              <View style={{display: "flex", flexDirection: "row",flexWrap:"wrap", gap: 8,width:"100%" }}>
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
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 8,
                        alignItems: "center",
                        width:'40%',
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 500`,
                        }}
                      >
                        {detail.languages}
                      </Text>
                      <View
                        style={{
                          height: 6,
                          backgroundColor: "#555C5E",
                          width: "130",
                        }}
                      >
                        <View
                          style={{
                            height: "100%",
                            backgroundColor: "#83C3C9",
                            width: `${ratingPercentage}%`,
                          }}
                        ></View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
        </View> */}

    
      </View>

      <View style={{ width: 388 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            backgroundColor: "#252829",
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 33,
          }}
        >
          <Svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M8.9993 17.3125C13.5893 17.3125 17.311 13.5913 17.3119 9.00097C17.3127 4.41064 13.5925 0.689453 9.00241 0.689453C4.41237 0.689453 0.690709 4.41064 0.68985 9.00097C0.68899 13.5913 4.40926 17.3125 8.9993 17.3125Z"
              fill="#83C3C9"
            />
          </Svg>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "90%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: `${selectedFont} 400`,
                color: "#FFFFFF",
              }}
            >
              About Me
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: `${selectedFont} 400`,
                color: "#FFFFFF",
              }}
            >
              {data.summery}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            gap: 24,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "90%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9.9993 18.3125C14.5893 18.3125 18.311 14.5913 18.3119 10.001C18.3127 5.41064 14.5925 1.68945 10.0024 1.68945C5.41237 1.68945 1.69071 5.41064 1.68985 10.001C1.68899 14.5913 5.40926 18.3125 9.9993 18.3125Z"
                  fill="#83C3C9"
                />
              </Svg>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 400`,
                  color: "#252829",
                }}
              >
                Work Experience
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 26,
              }}
            >
              {data?.experience?.map((detail, index) => (
                <View key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: index !== 0 ? 16 : 24,
                  }}
                >
                  <Svg
                    style={{ marginTop: 24 }}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M19.496 10C19.4939 15.2469 15.2405 19.5 9.99617 19.5C4.75183 19.5 0.50181 15.2469 0.50388 10C0.50595 4.75313 4.75933 0.500013 10.0037 0.500013C15.248 0.500013 19.498 4.75313 19.496 10Z"
                      stroke="#83C3C9"
                      stroke-miterlimit="10"
                    />
                    <Path
                      d="M9.99998 16C13.3137 16 16 13.3137 16 10C16 6.6863 13.3137 4 9.99998 4C6.68628 4 4 6.6863 4 10C4 13.3137 6.68628 16 9.99998 16Z"
                      fill="#83C3C9"
                    />
                  </Svg>

                  {index !== data.experience.length - 1 && (
                    <View
                      style={{
                        width: "1px",
                        backgroundColor: "#83C3C9",
                        height: "90%",
                        marginLeft: -33,
                        marginTop: 42.5,
                      }}
                    ></View>
                  )}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 600`,
                        fontSize: 12,
                        color: "#252829",
                      }}
                    >
                      {detail.designation} - {detail.organization}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#252829",
                      }}
                    >
                      {detail.duration?.start?.year} -{" "}
                      {detail.duration?.end?.year == undefined || "Year"
                        ? "Present"
                        : detail.duration?.end?.year}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#555C5E",
                        width: 282,
                        height: 1,
                      }}
                    ></View>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#252829",
                        marginBottom: 24,
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "90%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9.9993 18.3125C14.5893 18.3125 18.311 14.5913 18.3119 10.001C18.3127 5.41064 14.5925 1.68945 10.0024 1.68945C5.41237 1.68945 1.69071 5.41064 1.68985 10.001C1.68899 14.5913 5.40926 18.3125 9.9993 18.3125Z"
                  fill="#83C3C9"
                />
              </Svg>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: `${selectedFont} 400`,
                  color: "#252829",
                }}
              >
                Education
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 26,
              }}
            >
              {data?.education?.map((detail, index) => (
                <View key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: index !== 0 ? 16 : 24,
                  }}
                >
                  <Svg
                    style={{ marginTop: 24 }}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M19.496 10C19.4939 15.2469 15.2405 19.5 9.99617 19.5C4.75183 19.5 0.50181 15.2469 0.50388 10C0.50595 4.75313 4.75933 0.500013 10.0037 0.500013C15.248 0.500013 19.498 4.75313 19.496 10Z"
                      stroke="#83C3C9"
                      stroke-miterlimit="10"
                    />
                    <Path
                      d="M9.99998 16C13.3137 16 16 13.3137 16 10C16 6.6863 13.3137 4 9.99998 4C6.68628 4 4 6.6863 4 10C4 13.3137 6.68628 16 9.99998 16Z"
                      fill="#83C3C9"
                    />
                  </Svg>

                  {index !== data.education.length - 1 && (
                    <View
                      style={{
                        width: "1px",
                        backgroundColor: "#83C3C9",
                        height: "90%",
                        marginLeft: -33,
                        marginTop: 42.5,
                      }}
                    ></View>
                  )}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 600`,
                        fontSize: 12,
                        color: "#252829",
                      }}
                    >
                      {detail.qualification} in {detail.specialization}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#252829",
                      }}
                    >
                      {detail.instituteName}
                    </Text>

                    <View
                      style={{
                        backgroundColor: "#555C5E",
                        width: 282,
                        height: 1,
                      }}
                    ></View>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#252829",
                        marginBottom: 24,
                      }}
                    >
                      {detail.duration?.start?.year}-
                      {detail.duration?.end?.year}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  </Page>
  );
}

export default Template18
