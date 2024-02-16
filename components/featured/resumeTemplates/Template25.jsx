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

function Template25({ data }) {
  return (
    <Page size="A4">
      <View
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "841px",
          height: "100%",
          gap: "18px",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: "24px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              width: "100%",
            }}
          >
            <Text
              style={{ fontSize: "32px", fontWeight: "400", color: "#231F20" }}
            >
              {data.firstName ? <>{data.firstName}</> : <>First Name</>}{" "}
              {data.lastName ? <>{data.lastName}</> : <>Last Name</>}
            </Text>
            <Text
              style={{ fontSize: "14px", fontWeight: "500", color: "#8E8E8E" }}
            >
              {data.designation ? <>{data.designation}</> : <>designation</>}
            </Text>
          </View>
          <View
            style={{
              paddingTop: "16px",
              paddingRight: "24px",
              paddingBottom: "16px",
              paddingLeft: "24px",
              gap: "10px",
              width: "300px",
              backgroundColor: "#414042",
            }}
          >
            <Text
              style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF" }}
            >
              CONTACT
            </Text>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <View
                style={{ display: "flex", flexDirection: "row", gap: "14px" }}
              >
                {/* <Svg width={20} height={20} viewBox="0 0 20 20">
  <G clipPath="url(#clip0_1838_46264)">
    <Rect width={20} height={20} fill="white" />

    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.99931 18.8228C5.12562 18.8228 1.17578 14.873 1.17578 9.99931C1.17578 5.12562 5.12562 1.17578 9.99931 1.17578C14.873 1.17578 18.8228 5.12562 18.8228 9.99931C18.8243 14.873 14.873 18.8228 9.99931 18.8228Z"
      stroke="white"
      strokeWidth="0.5"
      strokeMiterlimit="10"
    />

    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.42326 15.0744V13.9023H13.8103V15.0744C13.8103 15.2166 13.6399 15.3735 13.4854 15.3735H6.74643C6.59538 15.3735 6.42326 15.215 6.42326 15.0744ZM6.42326 5.88346H13.8103V13.6501H6.42326V5.88346ZM6.42326 4.68873C6.42326 4.54808 6.59363 4.38964 6.74818 4.38964H13.4871C13.6417 4.38964 13.812 4.54808 13.812 4.68873V5.607H6.42502L6.42326 4.68873ZM6 4.71135V15.0517C6 15.4414 6.39165 15.7647 6.72359 15.7647H13.5135C13.6908 15.7647 13.9297 15.6305 14.0193 15.5416C14.1229 15.4381 14.2353 15.2441 14.2353 15.0534V4.71298C14.2353 4.32497 13.8436 4 13.5117 4H6.72184C6.5427 4 6.30559 4.13419 6.21602 4.2231C6.10889 4.33142 6 4.51088 6 4.71135Z"
      fill="white"
    />

    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.74388 14.7322V14.6174C9.74388 14.3975 10.118 14.2067 10.3726 14.4056C10.5869 14.5705 10.5377 15.0312 10.118 15.0312C9.92654 15.0312 9.74388 14.8987 9.74388 14.7322ZM9.44531 14.6626C9.44531 15.0216 9.7474 15.2802 10.1004 15.2996C10.4288 15.3174 10.7942 15.0377 10.7942 14.6853C10.7942 14.3312 10.5131 14.0645 10.0706 14.0645C9.74564 14.0661 9.44531 14.3652 9.44531 14.6626Z"
      fill="white"
    />

    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.19556 5.19636H11.0432C11.1872 5.19636 11.2908 4.91992 10.9431 4.91992H9.29567C8.94792 4.91992 9.04979 5.19636 9.19556 5.19636Z"
      fill="white"
    />

    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.56836 5.05848C8.56836 5.21207 8.8441 5.27836 8.8441 5.03423C8.8441 4.89520 8.56836 4.89196 8.56836 5.05848Z"
      fill="white"
    />
  </G>
                </Svg> */}
                <Image
                  style={{ height: "20px", width: "20px" }}
                  src="/images/services/resume25Contact.png"
                  alt=""
                />
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#FFFFFF",
                  }}
                >
                  {data.mobileNumber ? (
                    <>{data.mobileNumber}</>
                  ) : (
                    <>Your Phone</>
                  )}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "14px",
                  width: "100%",
                }}
              >
                <Image
                  style={{ height: "20px", width: "20px" }}
                  src="/images/services/resume25mail.png"
                  alt=""
                />
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#FFFFFF",
                    width: "100%",
                  }}
                >
                  {data.email ? <>{data.email}</> : <>Your Email</>}
                </Text>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", gap: "14px" }}
              >
                <Image
                  style={{ height: "20px", width: "20px" }}
                  src="/images/services/resume25location.png"
                  alt=""
                />
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#FFFFFF",
                  }}
                >
                  {data.location ? <>{data.location}</> : <>Your Address</>}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Svg
          width="100%"
          height="2"
          viewBox="0 0 700 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M1 1H699"
            stroke="#8E8E8E"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </Svg>
        <View style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "14px",
                width: "100%",
              }}
            >
              <Svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M11.9919 9.48653C13.0781 8.80577 13.7582 7.65084 13.7582 6.29043C13.7582 4.18265 12.0596 2.48242 9.95383 2.48242C7.84805 2.48242 6.14943 4.18265 6.14943 6.29043C6.14943 7.65084 6.89723 8.80577 7.91572 9.48653C5.47044 9.69088 3.5 11.7975 3.5 14.314V18.2575V18.3264L3.77182 18.3941C6.35358 19.2092 8.59472 19.4824 10.361 19.4824C13.9624 19.4824 16.0682 18.4618 16.1358 18.3941L16.4077 18.2575H16.4753V14.314C16.4753 11.7975 14.506 9.69088 11.9919 9.48653Z"
                  fill="#414042"
                />
              </Svg>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#414042",
                  }}
                >
                  ABOUT ME
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#6D6E71",
                    width: "100%",
                  }}
                >
                  {data.summery}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "14px",
                width: "100%",
              }}
            >
              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M17.3074 4.67235H13.467V2.75178L11.7533 1.05273H8.24825L6.53321 2.75178V4.67235H2.69412C1.79846 4.67235 1.05273 5.41114 1.05273 6.29716V16.27C1.05273 17.156 1.79846 17.8948 2.69412 17.8948H17.3074C18.2031 17.8948 18.9475 17.156 18.9475 16.27V6.29716C18.9475 5.41114 18.2031 4.67235 17.3074 4.67235ZM12.0137 4.67235H7.98652V2.4938H12.0137V4.67235Z"
                  fill="#414042"
                />
              </Svg>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#414042",
                  }}
                >
                  EXPERIENCE
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                    width: "100%",
                  }}
                >
                  {data?.experience?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#231F20",
                        }}
                      >
                        {detail.designation ? (
                          <>{detail.designation}</>
                        ) : (
                          <>Designation</>
                        )}
                        -
                        {detail.organization ? (
                          <>{detail.organization}</>
                        ) : (
                          <>Organization</>
                        )}
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#939598",
                        }}
                      >
                        {detail.duration?.start?.year}-{" "}
                        {detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year}
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#6D6E71",
                          width: "100%",
                        }}
                      >
                        {detail.description ? (
                          <>{detail.description}</>
                        ) : (
                          <>Description</>
                        )}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ width: "300px", display: "flex", flexDirection: "column" }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "#E6E7E8",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#494949",
                  }}
                >
                  EDUCATION
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {data?.education?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "8px",
                        }}
                      >
                        <Svg
                          width="6"
                          height="7"
                          viewBox="0 0 6 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M3 6.5C4.65685 6.5 6 5.15689 6 3.50004C6 1.84319 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84319 0 3.50004C0 5.15689 1.34315 6.5 3 6.5Z"
                            fill="#606060"
                          />
                        </Svg>
                        <Text
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#606060",
                          }}
                        >
                          {detail.duration?.start?.year}-
                          {detail.duration?.end?.year}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          paddingLeft: "16px",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#494949",
                          }}
                        >
                          {detail.qualification ? (
                            <>{detail.qualification}</>
                          ) : (
                            <>Qualification</>
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#606060",
                          }}
                        >
                          {detail.specialization ? (
                            <>{detail.specialization}</>
                          ) : (
                            <>Specialization</>
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#606060",
                          }}
                        >
                          {detail.instituteName ? (
                            <>{detail.instituteName}</>
                          ) : (
                            <>institute Name</>
                          )}
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
                  gap: "16px",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#494949",
                  }}
                >
                  HOBBIES
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {data?.hobbies?.map((item, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                      }}
                    >
                      <Svg
                        width="8"
                        height="9"
                        viewBox="0 0 8 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M4 7.5C5.65685 7.5 7 6.15689 7 4.50004C7 2.84319 5.65685 1.5 4 1.5C2.34315 1.5 1 2.84319 1 4.50004C1 6.15689 2.34315 7.5 4 7.5Z"
                          fill="#606060"
                        />
                      </Svg>

                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#5E5F5E",
                        }}
                      >
                        {item?.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "#414042",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            ></View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template25;
