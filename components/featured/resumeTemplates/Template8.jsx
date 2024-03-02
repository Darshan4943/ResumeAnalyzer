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

function Template8({ data, selectedColor, selectedFont, preview }) {
  return (
    <Page size="A4" style={{ padding: 24 }}>
      <View style={{ backgroundColor: "#FFFFFF", gap: 24 }}>
        <View
          style={{ display: "flex", flexDirection: "row", gap: 24, width: 508 }}
        >
          {/* 1st part */}
          <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 282,
                alignItems: "flex-start",
                width: 222,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 36,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                  }}
                >
                  {data.firstName}
                </Text>
                <Text
                  style={{
                    fontSize: 36,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                  }}
                >
                  {data.lastName}
                </Text>
              </View>
              <View
                style={{
                  width: 161,
                  height: 161,
                  borderRadius: "50%",
                  paddingLeft: 30,
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
                      objectFit: "contain",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                    alt=""
                  />
                ) : (
                  <Image
                    src="/images/services/profile.png"
                    alt=""
                    style={{ borderRadius: "50%", objectFit: "contain" }}
                  />
                )}
              </View>
            </View>

            <View
              style={{ width: 222, display: "flex", flexDirection: "column" }}
            >
              <View style={{ backgroundColor: selectedColor }}>
                <Text
                  style={{
                    padding: "5px 0px 5px 10px",
                    fontSize: 14,
                    fontFamily: `${selectedFont} 400`,
                    color: "white",
                  }}
                >
                  CONTACT
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "33px",
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderRight: 1,
                    borderRightColor: "#000000",
                  }}
                >
                  <Svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M19.5154 16.1094L17.8824 17.7425C17.27 18.33 16.4784 18.661 15.637 18.661C15.1777 18.661 14.7184 18.5589 14.3102 18.3548C11.7835 17.1301 9.46093 15.4709 7.49689 13.4807C5.50668 11.4905 3.84751 9.19407 2.62277 6.66737C2.06142 5.46749 2.29041 4.03864 3.23514 3.09522L4.8943 1.46221C4.99637 1.36014 5.09843 1.33398 5.20049 1.33398C5.32741 1.33398 5.45565 1.36014 5.53285 1.46221L9.43738 5.36675C9.53944 5.44264 9.56431 5.57087 9.56431 5.6991C9.56431 5.80117 9.53944 5.9281 9.43738 6.0053L7.88028 7.58724C8.51882 8.7361 9.33532 9.7816 10.2539 10.7263C11.1986 11.6449 12.2441 12.4614 13.3929 13.0999L14.95 11.5428C15.128 11.3636 15.4355 11.3636 15.6135 11.5428L19.518 15.4474C19.518 15.4474 19.518 15.4474 19.5442 15.4474C19.6946 15.6502 19.6946 15.9315 19.5154 16.1094Z"
                      fill={selectedColor}
                    />
                  </Svg>
                </View>
                <View
                  style={{
                    width: 152,
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderLeftColor: "#000000",
                    height: "33px",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 8,
                      paddingLeft: 15,
                      fontSize: 10,
                      fontFamily: `${selectedFont} 500`,
                      color: "#000000",
                    }}
                  >
                    {data.mobileNumber}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "33px",
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderRight: 1,
                    borderRightColor: "#000000",
                  }}
                >
                  <Svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M16.5745 2.66797H5.39943C3.68855 2.66797 2.32031 4.03624 2.32031 5.74712V14.574C2.32031 16.2848 3.68855 17.6531 5.39943 17.6531H16.5745C18.2854 17.6531 19.6536 16.2848 19.6536 14.574V5.74712C19.6536 4.03624 18.2854 2.66797 16.5745 2.66797ZM17.5557 7.75383C17.5557 7.75383 17.5323 7.75385 17.5101 7.77724V7.75383L12.2418 10.7183C11.4664 11.1522 10.5087 11.1522 9.73335 10.7183L4.44166 7.75383C4.0768 7.59362 3.89437 7.16093 4.05341 6.79606C4.21362 6.40781 4.64631 6.24877 5.01118 6.40781C5.08017 6.4312 5.12578 6.45344 5.17139 6.47683L10.4397 9.41912C10.7823 9.62494 11.1928 9.62494 11.5343 9.41912L16.8026 6.47683C17.144 6.27101 17.6013 6.3856 17.8059 6.72708C18.0118 7.06972 17.8972 7.52579 17.5557 7.75383Z"
                      fill={selectedColor}
                    />
                  </Svg>
                </View>
                <View
                  style={{
                    width: 152,
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderLeftColor: "#000000",
                    height: "33px",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 8,
                      paddingLeft: 15,
                      fontSize: 10,
                      fontFamily: `${selectedFont} 500`,
                      color: "#000000",
                    }}
                  >
                    {data.email}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "33px",
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderRight: 1,
                    borderRightColor: "#000000",
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
                      d="M9.33464 0.365234C4.55606 0.365234 0.667969 4.25333 0.667969 9.0319C0.667969 13.8105 4.55606 17.6986 9.33464 17.6986C14.1132 17.6986 18.0013 13.8105 18.0013 9.0319C18.0013 4.25333 14.1132 0.365234 9.33464 0.365234ZM16.8151 8.28511C15.7263 8.67738 14.6607 8.96055 13.6255 9.15459C13.6318 8.88084 13.6423 8.60709 13.6255 8.33229C13.4472 5.29691 11.918 2.96639 10.8219 1.66266C14.0188 2.30666 16.4878 4.98542 16.8151 8.28511ZM6.19123 9.24377C6.18074 8.96687 6.17235 8.68892 6.18808 8.41203C6.38002 5.07772 8.47248 2.61607 9.33464 1.73504C10.1968 2.61188 12.283 5.05988 12.4791 8.40047C12.498 8.71513 12.4927 9.0298 12.477 9.34341C10.1087 9.65177 7.95225 9.52486 6.19123 9.24377ZM12.3406 10.5338C11.9798 12.4574 10.9646 14.3705 9.33359 16.248C7.67955 14.3422 6.66111 12.4019 6.31394 10.4499C7.32503 10.5989 8.44836 10.6975 9.66188 10.6975C10.5136 10.6964 11.4114 10.6461 12.3406 10.5338ZM7.84736 1.66266C6.75131 2.96534 5.22209 5.29691 5.04273 8.33229C5.0291 8.56409 5.04064 8.79588 5.04273 9.02768C3.53658 8.70568 2.42899 8.31029 1.88044 8.09108C2.28425 4.88159 4.71339 2.29407 7.84736 1.66266ZM1.8301 9.30877C2.54227 9.57833 3.67818 9.94964 5.13188 10.2423C5.41507 12.3368 6.35485 14.4051 7.96903 16.42C4.56236 15.7917 1.96016 12.8633 1.8301 9.30877ZM10.7002 16.42C12.284 14.4429 13.2196 12.4134 13.5227 10.3597C14.5904 10.172 15.697 9.8909 16.8287 9.50492C16.6116 12.9703 14.044 15.8033 10.7002 16.42Z"
                      fill={selectedColor}
                    />
                  </Svg>
                </View>
                <View
                  style={{
                    width: 152,
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderLeftColor: "#000000",
                    height: "33px",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 8,
                      paddingLeft: 15,
                      fontSize: 10,
                      fontFamily: `${selectedFont} 500`,
                      color: "#000000",
                    }}
                  >
                    www.nomedosite.com
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "33px",
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderRight: 1,
                    borderRightColor: "#000000",
                  }}
                >
                  <Svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M11.3183 1.33398C7.82432 1.33398 4.98438 4.29566 4.98438 7.94196C4.98438 13.8209 10.6408 18.3317 10.9028 18.514C11.1436 18.7184 11.493 18.7184 11.7326 18.514C11.9734 18.3317 17.651 13.8197 17.651 7.94196C17.6522 4.29566 14.8122 1.33398 11.3183 1.33398ZM11.3183 10.7214C9.83334 10.7214 8.63174 9.46777 8.63174 7.94196C8.63174 6.39278 9.83334 5.13916 11.3183 5.13916C12.7819 5.13916 13.9824 6.39278 13.9824 7.94196C13.9824 9.46777 12.7808 10.7214 11.3183 10.7214Z"
                      fill={selectedColor}
                    />
                  </Svg>
                </View>
                <View
                  style={{
                    width: 152,
                    borderBottom: 1,
                    borderBottomColor: "#000000",
                    borderLeftColor: "#000000",
                    height: "33px",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 8,
                      paddingLeft: 15,
                      fontSize: 10,
                      fontFamily: `${selectedFont} 500`,
                      color: "#000000",
                    }}
                  >
                    {data.location}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <View style={{ backgroundColor: selectedColor }}>
                <Text
                  style={{
                    padding: "5px 0px 5px 10px",
                    fontSize: 14,
                    fontFamily: `${selectedFont} 400`,
                    color: "white",
                  }}
                >
                  ABOUT ME
                </Text>
              </View>
              <View
                style={{
                  paddingRight: 10,
                  wordBreak: "break-word",
                  width: 222,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: `${selectedFont} 500`,
                    color: "#414042",
                  }}
                >
                  {" "}
                  {data.summery}{" "}
                </Text>
              </View>
            </View>

            {data?.skills?.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  width: 222,
                  wordBreak: "break-word",
                }}
              >
                <View style={{ backgroundColor: selectedColor }}>
                  <Text
                    style={{
                      padding: "5px 0px 5px 10px",
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "white",
                    }}
                  >
                    SKILLS
                  </Text>
                </View>
                {data?.skills?.map((detail, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      wordBreak: "break-word",
                      width: 222,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 12,
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                      }}
                    >
                      <View
                        style={{
                          Width: "60%",
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            color: "#000000",
                            wordBreak: "break-word",
                            width: 116,
                          }}
                        >
                          {detail.skill}
                        </Text>
                      </View>
                      <View
                        style={{
                          Width: 106,
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <View key={i}>
                            {detail.rating[i] === 0 ? (
                              <Svg
                                width="5"
                                height="6"
                                viewBox="0 0 5 5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <Path
                                  d="M4.63672 0.978516H0.636719V4.97852H4.63672V0.978516Z"
                                  fill="#DEDEDE"
                                />
                              </Svg>
                            ) : (
                              <Svg
                                width="5"
                                height="6"
                                viewBox="0 0 3 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <Path
                                  d="M2.88668 0.583984H0.0976562V3.37302H2.88668V0.583984Z"
                                  fill={selectedColor}
                                />
                              </Svg>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* 2nd part */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              minHeight: 792,
              position: "relative",
            }}
          >
            <View
              style={{
                width: 282,
                display: "flex",
                flexDirection: "column",
                gap: 36,
              }}
            >
              <View
                style={{ width: 282, display: "flex", alignItems: "flex-end" }}
              >
                <Svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M44.6406 44.4785V0.478516H0.640625C0.640625 24.7799 20.3393 44.4785 44.6406 44.4785Z"
                    fill={selectedColor}
                  />
                </Svg>
              </View>

              <View
                style={{ display: "flex", flexDirection: "column", gap: 26 }}
              >
                <View style={{ backgroundColor: selectedColor }}>
                  <Text
                    style={{
                      padding: "5px 0px 5px 10px",
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "white",
                    }}
                  >
                    EDUCATION
                  </Text>
                </View>
                {data?.education?.map((detail, index) => (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        width: 282,
                        wordBreak: "break-word",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 700`,
                          color: "#000000",
                          paddingVertical: 5,
                        }}
                      >
                        {" "}
                        {detail.duration?.start?.year}-
                        {detail.duration?.end?.year}
                      </Text>
                      <View
                        style={{
                          height: "100%",
                          width: 1,
                          backgroundColor: "#000000",
                        }}
                      ></View>
                      <View
                        style={{
                          width: 194,
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: `${selectedFont} 600`,
                            color: "#000000",
                          }}
                        >
                          {detail.instituteName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: `${selectedFont} 600`,
                            color: "#000000",
                          }}
                        >
                          {detail.qualification} - {detail.specialization}{" "}
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 282,
                  gap: 18,
                }}
              >
                <View style={{ backgroundColor: selectedColor }}>
                  <Text
                    style={{
                      padding: "5px 0px 5px 10px",
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "white",
                    }}
                  >
                    EXPERIENCE
                  </Text>
                </View>
                {data.experience?.map((detail, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 700`,
                        color: "#000000",
                      }}
                    >
                      {detail.designation} | {detail.duration?.start?.year}-{" "}
                      {detail.currentlyWorking
                        ? "Present"
                        : detail.duration?.end?.year}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 500`,
                        color: "#000000",
                      }}
                    >
                      {detail.organization} | {detail.location}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 500`,
                        color: "#000000",
                      }}
                    >
                      {detail.description}{" "}
                    </Text>
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

export default Template8;
