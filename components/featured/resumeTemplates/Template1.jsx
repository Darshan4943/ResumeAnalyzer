import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
} from "@react-pdf/renderer";

function Template1({ data, selectedColor, selectedFont, preview }) {
  return (
    <Page size="A4" style={{ padding: 24 }} pageMode={"fullScreen"} wrap={true}>
      <View
        style={{
          flexDirection: "column",
          minHeight: "792px",
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingBottom: "24px",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "col", gap: 4 }}>
            <View>
              <Text
                style={{
                  color: "#414042",
                  fontSize: 43,
                  width: "80%",
                  lineHeight: 1.2,
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                {data.firstName}
              </Text>
              <Text
                style={{
                  color: "#414042",
                  fontSize: 43,
                  lineHeight: 1.2,
                  width: "80%",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                {data.lastName}
              </Text>
            </View>
            <Text
              style={{
                color: "#414042",
                fontFamily: `${selectedFont} 400`,
                width: "80%",
                lineHeight: 1.2,
              }}
            >
              {data.designation}
            </Text>
          </View>
          <View
            style={{
              width: "112px",
              height: "112px",
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
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "112px",
                  height: "112px",
                }}
              />
            ) : (
              <Image src="/images/services/profile.png" />
            )}
          </View>
        </View>

        <View
          style={{ height: "1px", width: "100%", backgroundColor: "#333" }}
        />

        <View style={{ flexDirection: "row", height: "100%" }}>
          <View style={{ flexDirection: "column", width: "35%", gap: "32px" }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                paddingTop: "24px",
                gap: 12,
              }}
            >
              <Text
                style={{
                  color: "#414042",
                  fontSize: "16px",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                CONTACT
              </Text>
              <Svg width={141} height={4} viewBox="0 0 141 4">
                <Path
                  d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                  fill="#A7A9AC"
                />
                <Path
                  d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                  fill={selectedColor}
                />
              </Svg>
              <View
                style={{
                  flexDirection: "column",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    height: 24,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Svg width="22" height="22" viewBox="0 0 22 22">
                    <Path d="M22 0H0V22H22V0Z" fill={selectedColor} />
                    <Path
                      d="M17.0236 14.5541C17.0487 14.7527 16.9895 14.9272 16.8441 15.0747L15.1461 16.7937C15.0689 16.879 14.9696 16.9542 14.8472 17.0154C14.7228 17.0756 14.6015 17.1157 14.4811 17.1338C14.4721 17.1338 14.447 17.1358 14.4039 17.1398C14.3618 17.1438 14.3056 17.1468 14.2384 17.1468C14.0769 17.1468 13.8162 17.1187 13.4551 17.0625C13.093 17.0064 12.6497 16.867 12.1262 16.6453C11.6036 16.4237 11.0099 16.0917 10.3459 15.6494C9.68194 15.2071 8.97485 14.5993 8.22664 13.827C7.63188 13.2292 7.13642 12.6565 6.74526 12.1089C6.35511 11.5623 6.03917 11.0558 5.80147 10.5914C5.56377 10.1281 5.38424 9.7058 5.26488 9.32969C5.14553 8.95157 5.0663 8.62662 5.02317 8.35181C4.98004 8.079 4.96199 7.86336 4.97102 7.7069C4.98004 7.55144 4.98305 7.46418 4.98305 7.44613C5.00111 7.32477 5.03922 7.2014 5.09839 7.07603C5.15857 6.95066 5.23079 6.84835 5.31604 6.77012L7.01305 5.03901C7.1324 4.91765 7.2688 4.85547 7.42326 4.85547C7.53359 4.85547 7.63087 4.88756 7.71613 4.95276C7.80038 5.01695 7.87259 5.09818 7.93277 5.19447L9.2988 7.83729C9.37402 7.9767 9.39509 8.12714 9.36199 8.29364C9.32789 8.45812 9.25567 8.59752 9.14435 8.70885L8.5205 9.34674C8.50245 9.36479 8.48841 9.39187 8.47637 9.43098C8.46333 9.4701 8.45631 9.5032 8.45631 9.52928C8.49041 9.71182 8.56764 9.91944 8.687 10.1541C8.7883 10.3617 8.94576 10.6155 9.15839 10.9154C9.37202 11.2153 9.67391 11.5603 10.0651 11.9504C10.4482 12.3496 10.7892 12.6595 11.0871 12.8822C11.385 13.1038 11.6337 13.2663 11.8343 13.3696C12.0329 13.4739 12.1863 13.5361 12.2926 13.5582L12.4531 13.5903C12.4702 13.5903 12.4983 13.5843 12.5364 13.5712C12.5745 13.5582 12.6016 13.5431 12.6186 13.5241L13.3458 12.7699C13.5002 12.6294 13.6777 12.5612 13.8844 12.5612C14.0278 12.5612 14.1431 12.5883 14.2284 12.6405H14.2404L16.7057 14.1249C16.8832 14.2372 16.9885 14.3806 17.0236 14.5541Z"
                      fill="white"
                    />
                  </Svg>
                  <Text
                    style={{
                      color: "#414042",
                      fontSize: "10px",
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {data.mobileNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    maxWidth: "150px",
                  }}
                >
                  <Svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ minWidth: "22px", minHeight: "22px" }}
                  >
                    <Rect width="22" height="22" fill={selectedColor} />
                    <Path
                      d="M17.3652 14.1791C17.3652 14.4579 17.287 14.7167 17.1606 14.9443L13.1427 10.449L17.1165 6.97178C17.2709 7.2175 17.3642 7.50533 17.3642 7.81625L17.3652 14.1791ZM11.0024 11.2655L16.5318 6.42717C16.3051 6.3028 16.0493 6.22656 15.7735 6.22656H6.23032C5.95451 6.22656 5.69875 6.3028 5.47309 6.42717L11.0024 11.2655ZM12.544 10.9726L11.2642 12.0939C11.189 12.1591 11.0957 12.1912 11.0024 12.1912C10.9091 12.1912 10.8159 12.1581 10.7406 12.0929L9.46087 10.9726L5.39285 15.525C5.63657 15.6785 5.92241 15.7698 6.23133 15.7698H15.7745C16.0834 15.7698 16.3693 15.6785 16.613 15.525L12.544 10.9726ZM4.88836 6.97279C4.7339 7.21851 4.64062 7.50634 4.64062 7.81726V14.1791C4.64062 14.4579 4.71886 14.7167 4.84523 14.9443L8.8621 10.4481L4.88836 6.97279Z"
                      fill="white"
                    />
                  </Svg>

                  <Text
                    style={{
                      color: "#414042",
                      fontSize: "10px",
                      fontFamily: `${selectedFont} 400`,
                      flexWrap: "wrap",
                      width: "80%",
                    }}
                  >
                    {data.email}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <Text
                  style={{
                    color: "#414042",
                    fontSize: "16px",
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  EDUCATION
                </Text>
                <Svg width={141} height={4} viewBox="0 0 141 4">
                  <Path
                    d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                    fill="#A7A9AC"
                  />
                  <Path
                    d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                    fill={selectedColor}
                  />
                </Svg>
                <View style={{ flexDirection: "column", gap: 20 }}>
                  {data?.education?.map((detail, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 700`,
                            lineHeight: 1.5,
                            marginRight: "6px",
                          }}
                        >
                          {detail.qualification}
                        </Text>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 700`,
                            lineHeight: 1.5,
                          }}
                        >
                          {detail.instituteName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "column", gap: 2 }}>
                        {detail.duration?.start?.year != "Year" && (
                          <View
                            style={{
                              width: 16,
                              height: 1,
                              backgroundColor: "#414042",
                            }}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          color: "#414042",
                          fontSize: 8.962,
                          fontFamily: `${selectedFont} 400`,
                          lineHeight: 1.5,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year" ? "Pursuing" : detail.duration?.end?.year}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {data?.skills?.length > 0 && (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  <Text
                    style={{
                      color: "#414042",
                      fontSize: "16px",
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    SKILLS
                  </Text>
                  <Svg width={141} height={4} viewBox="0 0 141 4">
                    <Path
                      d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                      fill="#A7A9AC"
                    />
                    <Path
                      d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                      fill={selectedColor}
                    />
                  </Svg>
                  <View style={{ flexDirection: "column", gap: 8 }}>
                    {data.skills.map((detail, index) => (
                      <View key={index} wrap={false}>
                        <View>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "12px",
                              marginRight: "6px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.skill}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
            {data?.hobbies?.length > 0 && (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  <Text
                    style={{
                      color: "#414042",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    HOBBIES
                  </Text>
                  <Svg width={141} height={4} viewBox="0 0 141 4">
                    <Path
                      d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                      fill="#A7A9AC"
                    />
                    <Path
                      d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                      fill={selectedColor}
                    />
                  </Svg>
                  <View
                    style={{ flexDirection: "col", gap: "8px" }}
                    wrap={false}
                  >
                    {data.hobbies.map((detail, index) => (
                      <View key={index}>
                        <View>
                          <Text
                            style={{
                              color: "#414042",
                              fontFamily: `${selectedFont} 400`,
                              fontSize: "12px",
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              width: "1px",
              height: "100%",

              backgroundColor: "#333",
            }}
          />
          <View
            style={{
              width: "65%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingTop: "24px",
              gap: "36px",
              paddingLeft: 24,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                color: "#414042",
                gap: 12,
              }}
            >
              <Text
                style={{
                  color: "#414042",
                  fontSize: "16px",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                ABOUT ME
              </Text>
              <Text
                wrap={true}
                style={{
                  color: "#6D6E71",
                  fontSize: "10px",
                  lineHeight: 1.2,
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                {data.summery}
              </Text>
            </View>
            <View style={{ flexDirection: "column", gap: 12, width: "100%" }}>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <Text
                  style={{
                    color: "#414042",
                    fontSize: "16px",
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  EXPERIENCE
                </Text>
                <Svg width={141} height={4} viewBox="0 0 141 4">
                  <Path
                    d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                    fill="#A7A9AC"
                  />
                  <Path
                    d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                    fill={selectedColor}
                  />
                </Svg>
              </View>
              {data?.experience?.map((detail, index) => (
                <>
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 2 }}

                  >
                    <View>
                      <Text
                        style={{
                          color: "#414042",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 700`,
                          lineHeight: 1.5,
                        }}
                      >
                        {detail.designation}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#414042",
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          lineHeight: 1.5,
                          width: "100%",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#414142",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            lineHeight: 1.5,
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year
                            }
                         `}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          color: "#6D6E71",
                          fontSize: "10px",
                          lineHeight: 1.2,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  </View>
                  {/* <View
                    style={{ backgroundColor: "#333", height: "1px", width: "16px" }}></View> */}
                </>
              ))}
            </View>

            {data?.section?.map((item, index) => (
              <View
                style={{ flexDirection: "column", gap: 16, width: "100%" }}
                key={index}
              >
                <View style={{ flexDirection: "column", gap: 12 }}>
                  <Text
                    style={{
                      color: "#414042",
                      fontSize: "16px",
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {item?.header.toUpperCase()}
                  </Text>
                  <Svg width={141} height={4} viewBox="0 0 141 4">
                    <Path
                      d="M140.396 1.72095H0.209961V2.72095H140.396V1.72095Z"
                      fill="#A7A9AC"
                    />
                    <Path
                      d="M35.262 0.720947H0.209961V3.72095H35.262V0.720947Z"
                      fill={selectedColor}
                    />
                  </Svg>
                </View>
                {item.subSection.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 12, width: "100%" }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#414142",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 700`,
                          lineHeight: 1.5,
                          width: "70%",
                        }}
                      >
                        {detail.title}
                      </Text>
                      {detail.duration?.start?.year &&
                      (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            {" "}
                            <View style={{}}>
                              <Text
                                style={{
                                  color: "#414142",
                                  fontSize: 10,
                                  fontFamily: `${selectedFont} 400`,
                                  lineHeight: 1.5,
                                }}
                              >
                                {detail?.duration?.start?.year}
                                {detail?.duration?.start?.year && "-"}
                                {(detail?.duration?.end?.year === "" || detail?.duration?.end?.year === undefined)
                                  ? "Present"
                                  : detail?.duration?.end?.year
                                }
                              </Text>
                            </View>
                          </View>
                        )}
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexWrap: "wrap",
                        paddingRight: "4px",
                      }}
                    >
                      <Text
                        style={{
                          color: "#6D6E71",
                          fontSize: "10px",
                          lineHeight: 1.2,
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template1;
