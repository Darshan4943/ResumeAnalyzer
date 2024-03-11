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
} from "@react-pdf/renderer";

const Template3 = ({ data, selectedColor, selectedFont, preview }) => {
  return (
    <Page size="A4" wrap={true}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 184,
            backgroundColor: selectedColor,
            minHeight: 841.7,
            flexDirection: "column",
            gap: 24,
          }}
        >
          <View style={{ paddingTop: 21, paddingRight: 22, paddingLeft: 28 }}>
            <View
              style={{
                width: 134,
                height: 134,
                flexShrink: 0,
                backgroundColor: "lightgray",
                borderRadius: "50%",
                overflow: "hidden",
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
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Image src="/images/services/profile.png" />
              )}
            </View>
          </View>

          <View
            style={{
              paddingLeft: -1,
              height: 27,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Svg width={125} viewBox="0 0 125 27" fill="none">
              <Path
                d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z"
                fill="white"
              />
              <Text
                x="10%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="start"
                fill="#414042"
                fontSize={15}
                fontFamily={`${selectedFont} 400`}
              >
                CONTACT{" "}
              </Text>
            </Svg>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 8,
              paddingLeft: 16,
              paddingRight: 8,
              width: "80%",
            }}
          >
            {data.mobileNumber && (
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <View
                  style={{
                    width: 16.76,
                    height: 16.75,
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                  }}
                >
                  <Svg width={13} height={13} viewBox="0 0 10 10" fill="none">
                    <Path
                      d="M9.71377 7.93497C9.73277 8.08097 9.68877 8.20896 9.58277 8.31596L8.33777 9.57597C8.28177 9.63897 8.20777 9.69298 8.11877 9.73798C8.02777 9.78198 7.93877 9.81098 7.85077 9.82397C7.84377 9.82397 7.82577 9.82597 7.79477 9.82797C7.76377 9.83097 7.72277 9.83296 7.67377 9.83296C7.55577 9.83296 7.36377 9.81297 7.09877 9.77097C6.83277 9.72997 6.50877 9.62797 6.12477 9.46497C5.74177 9.30297 5.30677 9.05897 4.81977 8.73497C4.33277 8.41097 3.81477 7.96597 3.26677 7.39897C2.83077 6.96097 2.46777 6.54097 2.18077 6.13997C1.89477 5.73897 1.66277 5.36796 1.48877 5.02696C1.31477 4.68696 1.18277 4.37797 1.09477 4.10197C1.00777 3.82497 0.948773 3.58697 0.917773 3.38597C0.885773 3.18597 0.872773 3.02796 0.879773 2.91296C0.886773 2.79896 0.888773 2.73497 0.888773 2.72197C0.901773 2.63297 0.929774 2.54297 0.973774 2.45097C1.01777 2.35897 1.07077 2.28397 1.13377 2.22697L2.37777 0.957962C2.46477 0.868962 2.56577 0.823975 2.67877 0.823975C2.75977 0.823975 2.83077 0.847966 2.89277 0.895966C2.95477 0.942966 3.00777 1.00297 3.05177 1.07297L4.05377 3.00996C4.10877 3.11196 4.12477 3.22296 4.09977 3.34396C4.07477 3.46496 4.02177 3.56597 3.93977 3.64897L3.48277 4.11697C3.46977 4.12997 3.45877 4.14997 3.44977 4.17897C3.43977 4.20797 3.43477 4.23198 3.43477 4.25098C3.45977 4.38498 3.51677 4.53697 3.60377 4.70897C3.67777 4.86097 3.79377 5.04697 3.94977 5.26697C4.10677 5.48697 4.32777 5.73997 4.61377 6.02597C4.89477 6.31897 5.14477 6.54597 5.36277 6.70897C5.58077 6.87097 5.76377 6.98996 5.91077 7.06596C6.05677 7.14296 6.16877 7.18797 6.24677 7.20497L6.36377 7.22897C6.37577 7.22897 6.39677 7.22497 6.42477 7.21497C6.45277 7.20497 6.47277 7.19497 6.48477 7.18097L7.01777 6.62798C7.13077 6.52498 7.26177 6.47498 7.41177 6.47498C7.51677 6.47498 7.60177 6.49497 7.66377 6.53297H7.67277L9.47977 7.62097C9.61077 7.70297 9.68777 7.80797 9.71377 7.93497Z"
                      fill="#414042"
                    />
                  </Svg>
                </View>
                <View
                  style={{ color: "white", fontSize: 12, flexDirection: "row" }}
                >
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      flexWrap: "wrap",
                    }}
                  >
                    {data.mobileNumber}
                  </Text>
                </View>
              </View>
            )}
            {data.email && (
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <View
                  style={{
                    width: 16.76,
                    marginTop: 1,
                    height: 16.75,
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                  }}
                >
                  <Svg width={12} height={10} viewBox="0 0 9 7" fill="none">
                    <Path
                      d="M8.31786 5.62399C8.31786 5.79999 8.26785 5.96399 8.18885 6.10699L5.65085 3.267L8.16186 1.07001C8.25986 1.22501 8.31886 1.407 8.31886 1.604L8.31786 5.62399ZM4.29786 3.78299L7.79185 0.726013C7.64885 0.647013 7.48685 0.598999 7.31285 0.598999H1.28286C1.10886 0.598999 0.946856 0.647013 0.803856 0.726013L4.29786 3.78299ZM5.27185 3.59799L4.46285 4.306C4.41585 4.347 4.35686 4.36801 4.29786 4.36801C4.23886 4.36801 4.17985 4.347 4.13285 4.306L3.32385 3.59799L0.752855 6.474C0.906855 6.571 1.08786 6.629 1.28286 6.629H7.31285C7.50785 6.629 7.68886 6.571 7.84286 6.474L5.27185 3.59799ZM0.433855 1.07101C0.335855 1.22601 0.276855 1.40801 0.276855 1.60501V5.625C0.276855 5.801 0.325855 5.965 0.405855 6.108L2.94386 3.267L0.433855 1.07101Z"
                      fill="#414042"
                    />
                  </Svg>
                </View>
                <View
                  style={{ color: "white", flexDirection: "row", fontSize: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      flexWrap: "wrap",
                    }}
                  >
                    {data.email}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {data?.skills?.length > 0 && (
            <View style={{}}>
              <View
                style={{
                  paddingLeft: -1,
                  height: 27,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Svg width={125} viewBox="0 0 125 27" fill="none">
                  <Path
                    d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z"
                    fill="white"
                  />
                  <Text
                    x="10%"
                    y="55%"
                    dominantBaseline="middle"
                    textAnchor="start"
                    fill="#414042"
                    fontSize={15}
                    fontFamily={`${selectedFont} 400`}
                  >
                    SKILLS{" "}
                  </Text>
                </Svg>
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
          )}

          {data?.languages?.length > 0 && (
            <View style={{}}>
              <View
                style={{
                  paddingLeft: -1,
                  height: 27,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Svg width={125} viewBox="0 0 125 27" fill="none">
                  <Path
                    d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z"
                    fill="white"
                  />
                  <Text
                    x="10%"
                    y="55%"
                    dominantBaseline="middle"
                    textAnchor="start"
                    fill="#414042"
                    fontSize={15}
                    fontFamily={`${selectedFont} 400`}
                  >
                    LANGUAGES{" "}
                  </Text>
                </Svg>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 16,
                  paddingTop: 20,
                  gap: 8,
                }}
              >
                {data.languages.map((detail, index) => (
                  <Text
                  wrap={false}
                    key={index}
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {detail.languages}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {data?.hobbies?.length > 0 && (
            <View style={{}}>
              <View
                style={{
                  paddingLeft: -1,
                  height: 27,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Svg width={125} viewBox="0 0 125 27" fill="none">
                  <Path
                    d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z"
                    fill="white"
                  />
                  <Text
                    x="10%"
                    y="55%"
                    dominantBaseline="middle"
                    textAnchor="start"
                    fill="#414042"
                    fontSize={15}
                    fontFamily={`${selectedFont} 400`}
                  >
                    HOBBIES{" "}
                  </Text>
                </Svg>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 16,
                  paddingTop: 20,
                  gap: 8,
                }}
              >
                {data.hobbies.map((detail, index) => (
                  <Text
                  wrap={false}
                    key={index}
                    style={{
                      color: "white",
                      fontSize: 8.96,
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {detail.title}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            width: "410px",
            paddingRight: "20px",
            paddingBottom: "20px",
          }}
        >
          <View
            style={{
              paddingLeft: "20px",
              paddingTop: "30px",
              gap: "4",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "#414042",
                fontSize: "43.514px",
                fontFamily: `${selectedFont} 400`,
              }}
            >
              {data.firstName}
            </Text>
            <Text
              style={{
                color: "#414042",
                fontSize: "43.514px",
                fontFamily: `${selectedFont} 400`,
              }}
            >
              {data.lastName}
            </Text>
            <Text
              style={{
                color: "#414042",
                fontSize: "14.015px",
                fontFamily: "Gothic 400",
              }}
            >
              {data.designation}
            </Text>
          </View>
          <View
            style={{
              paddingLeft: "20px",
              paddingTop: "24.78px",
              flexDirection: "column",
              gap: "5.64px",
            }}
          >
            <Text
              style={{ color: "#414042", fontFamily: `${selectedFont} 400` }}
            >
              About Me
            </Text>
            <Text
              style={{
                color: "#646464",
                breakAll: "break-all",
                fontFamily: `${selectedFont} 400`,
                fontSize: "12.015px",
              }}
            >
              {data.summery}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 12,
              paddingTop: "24px",
              marginLeft: "-1",
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              viewBox="0 0 160 27"
              fill="none"
            >
              <Path
                d="M146.641 27H0V0H146.641C154.018 0 160 6.04367 160 13.5C160 20.9564 154.018 27 146.641 27Z"
                fill={selectedColor}
              />
              <Text
                x="10%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="start"
                fill="white"
                fontSize={15}
                fontFamily={`${selectedFont} 400`}
              >
                EDUCATION{" "}
              </Text>
            </Svg>
            <View
              style={{ flexDirection: "column", gap: 12, paddingLeft: "20px" }}
            >
              {data.education.map((detail, index) => (
                <View  wrap={false} key={index} style={{ flexDirection: "column", gap: 8 }}>
                  <View style={{}}>
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: "14",
                        fontFamily: `${selectedFont} 700`,
                      }}
                    >
                      {detail.qualification}
                    </Text>
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: "12",
                        fontFamily: `${selectedFont} 700`,
                      }}
                    >
                      {detail.instituteName}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", gap: 4 }}>
                    <View
                      style={{
                        width: "16px",
                        height: "1px",
                        backgroundColor: "#414042",
                      }}
                    />
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                      }}
                    >
                      {detail.duration?.end?.year
                        ? `${detail.duration?.start?.year}-${detail.duration?.end?.year}`
                        : ""}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 12,
              paddingTop: "24px",
              marginLeft: "-1",
              width: "100%",
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              viewBox="0 0 160 27"
              fill="none"
            >
              <Path
                d="M146.641 27H0V0H146.641C154.018 0 160 6.04367 160 13.5C160 20.9564 154.018 27 146.641 27Z"
                fill={selectedColor}
              />
              <Text
                x="10%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="start"
                fill="white"
                fontSize={15}
                fontFamily={`${selectedFont} 400`}
              >
                EXPERIENCE{" "}
              </Text>
            </Svg>
            {data.experience.map((detail, index) => (
              <View
                wrap={false}
                key={index}
                style={{ flexDirection: "column", gap: 12 }}
              >
                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text
                    style={{
                      color: "#414142",
                      paddingLeft: "18px",
                      fontSize: "14",
                      fontFamily: `${selectedFont} 700`,
                    }}
                  >
                    {detail.organization}
                  </Text>
                  <Text
                    style={{
                      color: "#414142",
                      paddingLeft: "18px",
                      fontSize: "12",
                      fontFamily: `${selectedFont} 700`,
                    }}
                  >
                    {detail.designation}
                  </Text>
                  <Text
                    style={{
                      color: "#414142",
                      paddingLeft: "18px",
                      fontSize: "12",
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    {`${detail.duration?.start?.year} - ${
                      detail.duration?.end?.year
                        ? detail.duration?.end?.year
                        : "Present"
                    }`}
                  </Text>
                </View>
                {detail.description?.length > 5 && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        color: "#646464",
                        paddingLeft: "18px",
                        paddingRight: "16px",
                        fontSize: "12",
                        fontFamily: `${selectedFont} 400`,
                        flexWrap: "wrap",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          {data.section?.map((item, index) => (
            <View
              wrap={false}
              key={index}
              style={{
                flexDirection: "column",
                gap: 12,
                paddingTop: "24px",
                marginLeft: "-1",
                width: "100%",
              }}
            >
              {item.header?.length > 0 && (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="160"
                  viewBox="0 0 160 27"
                  fill="none"
                >
                  <Path
                    d="M146.641 27H0V0H146.641C154.018 0 160 6.04367 160 13.5C160 20.9564 154.018 27 146.641 27Z"
                    fill={selectedColor}
                  />
                  <Text
                    x="10%"
                    y="55%"
                    dominantBaseline="middle"
                    textAnchor="start"
                    fill="white"
                    fontSize={15}
                    fontFamily={`${selectedFont} 400`}
                  >
                    {item.header}
                  </Text>
                </Svg>
              )}

              {item.subSection.map((detail, index) => (
                <View key={index} style={{ flexDirection: "column", gap: 12 }}>
                  {detail.title.length > 0 && (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#414142",
                          paddingLeft: "18px",
                          fontSize: "14",
                          fontFamily: `${selectedFont} 700`,
                        }}
                      >
                        {detail.title}
                      </Text>
                      {detail.duration?.start?.year &&
                        detail.duration?.end?.year && (
                          <Text
                            style={{
                              color: "#414142",
                              paddingLeft: "18px",
                              fontSize: "12",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {`${
                              detail.duration?.start?.year &&
                              detail.duration?.start?.year
                            } - ${
                              detail.duration?.end?.year &&
                              detail.duration?.end?.year
                            }`}
                          </Text>
                        )}
                    </View>
                  )}

                  {detail.description?.length > 5 && (
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <Text
                        style={{
                          color: "#646464",
                          paddingLeft: "18px",
                          paddingRight: "16px",
                          fontSize: "12",
                          fontFamily: `${selectedFont} 400`,
                          flexWrap: "wrap",
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
          {/* {data.section.slice(1,2).map((item, index) => (
          <View break
            key={index}
            style={{
              flexDirection: "column",
              gap: 12,
              paddingTop: "24px",
              marginLeft: "-1",
              width: "100%",
            }}
          >
            {item.header?.length > 0 && (
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                viewBox="0 0 160 27"
                fill="none"
              >
                <Path
                  d="M146.641 27H0V0H146.641C154.018 0 160 6.04367 160 13.5C160 20.9564 154.018 27 146.641 27Z"
                  fill={selectedColor}
                />
                <Text
                  x="10%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="start"
                  fill="white"
                  fontSize={15}
                  fontFamily={`${selectedFont} 400`}
                >
                  {item.header}
                </Text>
              </Svg>
            )}

            {item.subSection.map((detail, index) => (
              <View key={index} style={{ flexDirection: "column", gap: 12 }}>
                {detail.title.length > 0 && detail.duration && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#414142",
                        paddingLeft: "18px",
                        fontSize: "14",
                        fontFamily: `${selectedFont} 700`,
                      }}
                    >
                      {detail.title}
                    </Text>
                    {
                       detail.duration?.start?.year && detail.duration?.end?.year  &&  <Text
                       style={{
                         color: "#414142",
                         paddingLeft: "18px",
                         fontSize: "12",
                         fontFamily: `${selectedFont} 400`,
                       }}
                     >
                       {`${
                         detail.duration?.start?.year &&
                         detail.duration?.start?.year
                       } - ${
                         detail.duration?.end?.year && detail.duration?.end?.year
                       }`}
                     </Text>
                    }
                   
                  </View>
                )}

                {detail.description?.length > 5 && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        color: "#646464",
                        paddingLeft: "18px",
                        paddingRight: "16px",
                        fontSize: "12",
                        fontFamily: `${selectedFont} 400`,
                        flexWrap: "wrap",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))} */}
        </View>
      </View>
    </Page>
  );
};

export default Template3;
