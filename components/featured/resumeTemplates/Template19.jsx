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

function Template19({ data, selectedColor, selectedFont, preview }) {
  return (
    <Page size="A4" style={{ padding: 24 }}>
      <View
        style={{
          width: 532,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 32 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
              width: 172,
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
                style={{
                  width: 161,
                  height: 161,
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Image
                src="/images/profile/john_doe.png"
                style={{
                  width: 161,
                  height: 161,
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            )}

            {data?.mobileNumber && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/services/call.png"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                    wordBreak: "break-word",
                    flexWrap: "wrap",
                    marginRight: "6px"
                  }}
                >
                  {data.mobileNumber}
                </Text>
              </View>
            )}

            {data?.email?.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/services/mail.png"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                    wordBreak: "break-word",
                    flexWrap: "wrap",
                    marginRight: "6px"
                  }}
                >
                  {data.email}
                </Text>
              </View>
            )}

            {data?.location?.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/services/location.png"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                    wordBreak: "break-word",
                    flexWrap: "wrap"
                  }}
                >
                  {data.location}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              width: 326,
              display: "flex",
              flexDirection: "column",
              gap: 70,
            }}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: `${selectedFont} 400`,
                  color: "#000000",
                  wordBreak: "break-word",
                  flexWrap: "wrap"
                }}
              >
                {data.firstName} {data.lastName}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: `${selectedFont} 400`,
                    color: "#000000",
                    wordBreak: "break-word",
                    flexWrap: "wrap"
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
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: `${selectedFont} 400`,
                  color: "#000000",
                }}
              >
                About me
              </Text>
              <Svg
                width="326"
                height="1"
                viewBox="0 0 436 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M436 0H0V1H436V0Z" fill="black" />
              </Svg>
              <Text
                style={{
                  fontSize: 12,
                  color: "#808285",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                {data.summery}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: 546,
          }}
        >
          <View
            style={{
              width: 532,
              paddingVertical: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: 1,
              borderBottomColor: "#000000",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: `${selectedFont} 400`,
                color: "#000000",
              }}
            >
              Professional Skills
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {data?.skills?.map((detail, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "20%",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#808285",
                    fontFamily: `${selectedFont} 400`,
                    flexWrap: "wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {detail.skill}
                </Text>
                {/* <Svg
                                width="130"
                                height="12"
                                viewBox="0 0 174 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M6 12C9.31371 12 12 9.31373 12 6.00002C12 2.68631 9.31371 0 6 0C2.68629 0 0 2.68631 0 6.00002C0 9.31373 2.68629 12 6 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M24 12C27.3137 12 30 9.31373 30 6.00002C30 2.68631 27.3137 0 24 0C20.6863 0 18 2.68631 18 6.00002C18 9.31373 20.6863 12 24 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M42 12C45.3137 12 48 9.31373 48 6.00002C48 2.68631 45.3137 0 42 0C38.6863 0 36 2.68631 36 6.00002C36 9.31373 38.6863 12 42 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M60 12C63.3137 12 66 9.31373 66 6.00002C66 2.68631 63.3137 0 60 0C56.6863 0 54 2.68631 54 6.00002C54 9.31373 56.6863 12 60 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M78 12C81.3137 12 84 9.31373 84 6.00002C84 2.68631 81.3137 0 78 0C74.6863 0 72 2.68631 72 6.00002C72 9.31373 74.6863 12 78 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M96 12C99.3137 12 102 9.31373 102 6.00002C102 2.68631 99.3137 0 96 0C92.6863 0 90 2.68631 90 6.00002C90 9.31373 92.6863 12 96 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M114 12C117.314 12 120 9.31373 120 6.00002C120 2.68631 117.314 0 114 0C110.686 0 108 2.68631 108 6.00002C108 9.31373 110.686 12 114 12Z"
                                    fill="black"
                                />
                                <Path
                                    d="M132 12C135.314 12 138 9.31373 138 6.00002C138 2.68631 135.314 0 132 0C128.686 0 126 2.68631 126 6.00002C126 9.31373 128.686 12 132 12Z"
                                    fill="#D1D3D4"
                                />
                                <Path
                                    d="M150 12C153.314 12 156 9.31373 156 6.00002C156 2.68631 153.314 0 150 0C146.686 0 144 2.68631 144 6.00002C144 9.31373 146.686 12 150 12Z"
                                    fill="#D1D3D4"
                                />
                                <Path
                                    d="M168 12C171.314 12 174 9.31373 174 6.00002C174 2.68631 171.314 0 168 0C164.686 0 162 2.68631 162 6.00002C162 9.31373 164.686 12 168 12Z"
                                    fill="#D1D3D4"
                                />
                            </Svg> */}
                {/* <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                  {[...Array(5)].map((_, i) => (
                    <View key={i}>
                      {detail.rating[i] === 0 ? (
                        <Svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M150 12C153.314 12 156 9.31373 156 6.00002C156 2.68631 153.314 0 150 0C146.686 0 144 2.68631 144 6.00002C144 9.31373 146.686 12 150 12Z"
                            fill="#D1D3D4"
                          />
                        </Svg>
                      ) : (
                        <Svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M6 12C9.31371 12 12 9.31373 12 6.00002C12 2.68631 9.31371 0 6 0C2.68629 0 0 2.68631 0 6.00002C0 9.31373 2.68629 12 6 12Z"
                            fill="black"
                          />
                        </Svg>
                      )}
                    </View>
                  ))}
                </View> */}
              </View>
            ))}
          </View>
        </View>

        <View
          style={{ display: "flex", flexDirection: "row", gap: 28, width: 546 }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: 268,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "flex-start",
                width: 268,
              }}
            >
              <View
                style={{
                  borderBottom: 1,
                  borderBottomColor: "#000000",
                  width: 268,
                }}
              >
                <Text
                  style={{
                    paddingBottom: 5,
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  EDUCATION
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                {data?.education?.map((detail, index) => (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        width: "100%",
                      }}
                      wrap={false}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            width: "70%",
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.specialization}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            width: "30%",
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                          `${detail.duration?.start?.year}-${detail.duration?.end?.year ==="Year" ? "Pursuing" : detail.duration?.end?.year}`}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#808285",
                          fontFamily: `${selectedFont} 400`,
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {detail.qualification}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#000000",
                          fontFamily: `${selectedFont} 400`,
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {detail.instituteName}
                      </Text>
                    </View>
                  </>
                ))}
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "flex-start",
                width: 268,
              }}
            >
              <View
                style={{
                  borderBottom: 1,
                  borderBottomColor: "#000000",
                  width: 268,
                }}
              >
                <Text
                  style={{
                    paddingBottom: 5,
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  Interests
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                {data.hobbies?.map((detail, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
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
                        d="M3 6.5C4.65685 6.5 6 5.15685 6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5C0 5.15685 1.34315 6.5 3 6.5Z"
                        fill="#5E5F5E"
                      />
                    </Svg>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#000000",
                        flexWrap: "wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {detail.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            {data.section?.length > 0 &&
              data.section.map((item, index) => (
                <View
                key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    alignItems: "flex-start",
                    width: 268,
                  }}
                >
                  <View
                    style={{
                      borderBottom: 1,
                      borderBottomColor: "#000000",
                      width: 268,
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 5,
                        fontFamily: `${selectedFont} 400`,
                      }}
                    >
                      {item.header}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.subSection.map((detail, index) => (
                      <>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                            width: "100%",
                          }}
                        >
                          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "70%",
                                flexWrap: "wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {detail.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000000",
                                fontFamily: `${selectedFont} 400`,
                                width: "30%",
                                flexWrap: "wrap",
                                wordBreak: "break-word",
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
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#808285",
                              fontFamily: `${selectedFont} 400`,
                              flexWrap: "wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {detail.description}
                          </Text>
                          {/* <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.instituteName}
                        </Text> */}
                        </View>
                      </>
                    ))}
                  </View>
                </View>
              ))}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: 250,
              marginRight: 24,
              gap: 16,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "flex-start",
                width: 268,
              }}
            >
              <View
                style={{
                  borderBottom: 1,
                  borderBottomColor: "#000000",
                  width: "100%",

                }}
              >
                <Text
                  style={{
                    paddingBottom: 5,
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  Professional Experience
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "100%",
                  flexWrap: "wrap",

                }}
              >
                {data?.experience?.map((detail, index) => (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        width: "100%",
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            width: "70%",
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.designation}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#000000",
                            fontFamily: `${selectedFont} 400`,
                            width: "30%",
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.duration?.start?.year !== "Year" &&
                            `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                              ? "Present"
                              : detail.duration?.end?.year}
                         `}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#808285",
                          fontFamily: `${selectedFont} 400`,
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#000000",
                          fontFamily: `${selectedFont} 400`,
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  </>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template19;
