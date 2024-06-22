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
function Template39({ data, selectedColor, selectedFont, preview,pageLayout }) {
  const formatLink = (link) => {
    if (link?.length > 19) {
      return link?.match(/.{1,19}/g).join("\n");
    }
    return link;
  };

  const formatEmail = (email) => {
    if (email?.length > 16) {
      return email?.match(/.{1,16}/g).join("\n");
    }
    return email;
  };

  return (
    <Page size="A4" style={{ padding: 24 }} wrap={true}>
      <View
        style={{
          height: "24px",
          width: "120%",
          backgroundColor: "#2A2E31",
          margin: -24,
        }}
      ></View>
      <View style={{ flexDirection: "row", gap: 24, marginTop: 48 }}>
        <View style={{ width: "156px" }}>
          <View style={{ flexDirection: "column", gap: "24px" }}>
            {data?.showProfile === true && (
              <View style={{ flexDirection: "column" }}>
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
            )}
            <View
              style={{
                paddingTop: data?.showProfile ? "" : "30px",
                display: "flex",
                flexDirection: "column",
                gap: "8",
                maxWidth: "100%",
              }}
            >
              <Text
                style={{
                  color: "#030203",
                  fontSize: "16px",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                CONTACT
              </Text>

              {data?.mobileNumber && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: "12px",
                    justifyContent: "start",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingHorizontal: "2px",
                  }}
                >
                  <Svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M13.7305 11.4931L11.8772 9.63512C11.5082 9.26663 10.8975 9.27796 10.5158 9.66062L9.58132 10.596C9.52194 10.5648 9.46115 10.5294 9.39754 10.494C8.80803 10.1666 8.0008 9.71874 7.15117 8.86555C6.30012 8.01094 5.85198 7.20025 5.524 6.60926C5.48866 6.5469 5.45615 6.48737 5.42363 6.42927L6.0499 5.80143L6.35808 5.49246C6.73978 5.1098 6.75251 4.49613 6.38212 4.12764L4.52876 2.26961C4.1612 1.90112 3.55048 1.91105 3.16595 2.29513L2.6443 2.82093L2.65843 2.8351C2.48313 3.05903 2.33752 3.31697 2.22867 3.59617C2.12829 3.86262 2.06468 4.11488 2.03782 4.36715C1.79325 6.40092 2.72064 8.26037 5.2342 10.7817C8.71189 14.2667 11.5153 14.0045 11.6354 13.9904C11.8984 13.9592 12.1514 13.8968 12.4073 13.7962C12.683 13.6885 12.9403 13.5425 13.1636 13.3668L13.1749 13.3781L13.7051 12.858C14.0882 12.4753 14.0995 11.863 13.7305 11.4931Z"
                      fill="#221F1F"
                    />
                  </Svg>

                  <Text
                    style={{

                      fontSize: "10px",
                      paddingTop: "2px",
                      flexDirection: "row",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.dial_code} {data.mobileNumber}
                  </Text>
                </View>
              )}
              {data?.email && (
                <View
                  style={{
                    flexDirection: "row",

                    gap: "12px",
                    justifyContent: "start",
                    // alignItems: "center",
                    paddingHorizontal: "2px",
                    // maxWidth: "100%",
                  }}
                >
                  <Svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M8.00216 9.80322L6.51532 8.43582L2.27112 12.2536C2.42543 12.4085 2.63165 12.5 2.86095 12.5H13.1362C13.3655 12.5 13.5717 12.4071 13.726 12.2536L9.48179 8.43582L8.00216 9.80322ZM13.7274 3.74642C13.5775 3.59152 13.3669 3.5 13.1376 3.5H2.8624C2.63598 3.5 2.42543 3.59293 2.27257 3.74642L8.00361 8.90198L13.7274 3.74642ZM2 4.2914V11.7691L6.14325 8.07113L2 4.2914ZM9.85675 8.06971L14 11.7677V4.28577L9.85675 8.06971Z"
                      fill="#221F1F"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: "10px",
                      // width: "80%",
                      paddingTop: "2px",
                      flexDirection: "row",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {/* {data.email} */}
                    {formatEmail(data.email)}
                  </Text>
                </View>
              )}

              {data?.location && (
                <View
                  style={{
                    flexDirection: "row",
                    breakAll: true,
                    justifyContent: "start",
                    gap: "12px",
                    // alignItems: "center",
                    paddingHorizontal: "2px",
                  }}
                >
                  <Svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M8.25055 2C5.90431 2 4 3.89132 4 6.2184C4 7.0097 4.22097 7.77202 4.63403 8.43849L8.0096 13.8349C8.14396 14.0567 8.48041 14.0567 8.61476 13.8249L11.9037 8.38054C12.2979 7.73412 12.5 6.98183 12.5 6.2184C12.5011 3.89132 10.5968 2 8.25055 2ZM8.25055 8.33149C7.058 8.33149 6.11529 7.37636 6.11529 6.21728C6.11529 5.05931 7.07688 4.10306 8.25055 4.10306C9.42423 4.10306 10.3758 5.05819 10.3758 6.21728C10.3758 7.36633 9.45199 8.33149 8.25055 8.33149Z"
                      fill="#221F1F"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: "10px",
                      flexDirection: "row",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {formatEmail(data.location)}
                  </Text>
                </View>
              )}
            </View>
            {data?.education?.length > 0 && data?.showEducation === true && (
              <View
                wrap={data?.education?.length > 1 ? true : false}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "100%",
                }}
              // wrap={data?.education?.length > 1 ? true : false}
              >
                <Text
                  style={{
                    color: "#030203",
                    fontFamily: `${selectedFont} 400`,
                    fontSize: "16px",
                  }}
                >
                  EDUCATION
                </Text>

                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.education?.map((detail, index) => (
                    <>
                      <View
                        // wrap={true}
                        wrap={false}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 16,
                          alignItems: "start",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                              // justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                color: "#000000",
                                fontSize: "12px",
                                fontFamily: `${selectedFont} 400`,
                              }}
                            >
                              {formatLink(detail.qualification)}
                            </Text>
                            <Text
                              style={{
                                color: "#000000",
                                fontSize: "12px",
                                fontFamily: `${selectedFont} 400`,
                              }}
                            >
                              {formatLink(detail.specialization)}
                            </Text>

                            <Text
                              style={{
                                color: "#58595B",
                                fontSize: "12px",
                                fontFamily: `${selectedFont} 400`,
                              }}
                            >
                              {formatLink(detail.instituteName)}
                            </Text>
                          </View>
                          {detail.duration?.start?.year && (
                            <Text
                              style={{
                                color: "#58595B",
                                fontSize: "10px",
                                fontFamily: `${selectedFont} 400`,
                                height: "15px",
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year"
                                  ? "Pursuing"
                                  : detail.duration?.end?.year
                                }`}
                            </Text>
                          )}
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            {data?.achievements?.length > 0 &&
              data?.showAchievements === true && (
                <View
                  wrap={data?.achievements?.length > 1 ? true : false}
                  style={{ flexDirection: "column", gap: 12, width: "100%" }}
                >
                  <View style={{ flexDirection: "column", gap: 12 }}>
                    <Text
                      style={{
                        color: "#030203",
                        fontSize: "16px",
                        fontFamily: `${selectedFont} 400`,
                        textTransform: "uppercase",
                      }}
                    >
                      Achievements & Awards
                    </Text>
                  </View>
                  {data?.achievements?.map((detail, index) => (
                    <>
                      <View
                        key={index}
                        style={{ flexDirection: "column", gap: "8px" }}
                        wrap={false}
                      >
                        <View>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: 12,
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            maxWidth: "100%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              maxWidth: "100%",
                            }}
                          >
                            {detail.description}
                          </Text>
                          {/* <View style={{}}> */}

                          {/* </View> */}
                        </View>
                      </View>
                      {/* <View
                    style={{ backgroundColor: "#333", height: "1px", width: "16px" }}></View> */}
                    </>
                  ))}
                </View>
              )}
            {data?.socialLinks?.length > 0 && data?.showLinks === true && (
              <View
                wrap={data?.reference?.length > 1 ? true : false}
                style={{ flexDirection: "column", gap: 16 }}>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    color: "#030203",
                    fontSize: "16",
                    textTransform: "uppercase",
                  }}
                >
                  SOCIAL LINKS
                </Text>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.socialLinks?.map((item, index) => {
                    return (
                      <View
                        wrap={false}
                        key={index}
                        style={{
                          flexDirection: "column",
                          gap: 4,
                          alignItems: "left",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 700`,
                            color: "#414042",
                            fontSize: "12",
                          }}
                        >
                          {item?.platform}
                        </Text>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "10",
                          }}
                        >
                          {/* {item?.link} */}
                          {formatLink(item?.link)}
                        </Text>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "10",
                          }}
                        >
                          {item?.discription}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            <View
              // wrap={false}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {data?.skills?.length > 0 && data?.showSkills === true && (
                <View style={{ flexDirection: "column", gap: 16 }}>
                  <Text
                    wrap={data?.skills?.length > 1 ? true : false}
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      color: "#030203",
                      fontSize: "16",
                    }}
                  >
                    SKILLS
                  </Text>

                  <View style={{ flexDirection: "column", gap: 12 }}>
                    {data?.skills?.map((detail, index) => (
                      <View
                        wrap={false}
                        key={index}
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "center",
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
                            d="M3.89326 7.79296C5.7673 7.79296 7.2865 6.2723 7.2865 4.39648C7.2865 2.52066 5.7673 1 3.89326 1C2.01922 1 0.5 2.52066 0.5 4.39648C0.5 6.2723 2.01922 7.79296 3.89326 7.79296Z"
                            fill="#59595C"
                          />
                        </Svg>

                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "12",
                          }}
                        >
                          {detail.skill}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
            {data?.languages?.length > 0 && data?.showLanguage === true && (
              <View
                wrap={false}
                style={{ flexDirection: "column", gap: 16 }}>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    color: "#030203",
                    fontSize: "16",
                  }}
                >
                  LANGUAGES
                </Text>

                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.languages?.map((detail, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
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
                          d="M3.89326 7.79296C5.7673 7.79296 7.2865 6.2723 7.2865 4.39648C7.2865 2.52066 5.7673 1 3.89326 1C2.01922 1 0.5 2.52066 0.5 4.39648C0.5 6.2723 2.01922 7.79296 3.89326 7.79296Z"
                          fill="#59595C"
                        />
                      </Svg>

                      <Text
                        style={{
                          fontFamily: `${selectedFont} 400`,
                          color: "#58595B",
                          fontSize: "12",
                        }}
                      >
                        {detail.languages}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.hobbies?.length > 0 && data?.showHobbies === true && (
              <View
                wrap={false}
                style={{ flexDirection: "column", gap: 16 }}>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    color: "#030203",
                    fontSize: "16",
                  }}
                >
                  HOBBIES
                </Text>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.hobbies?.map((item, index) => {
                    return (
                      <View
                        wrap={false}
                        key={index}
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "center",
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
                            d="M3.89326 7.79296C5.7673 7.79296 7.2865 6.2723 7.2865 4.39648C7.2865 2.52066 5.7673 1 3.89326 1C2.01922 1 0.5 2.52066 0.5 4.39648C0.5 6.2723 2.01922 7.79296 3.89326 7.79296Z"
                            fill="#59595C"
                          />
                        </Svg>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "12",
                          }}
                        >
                          {item?.title}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {data?.reference?.length > 0 && data?.showReference === true && (
              <View style={{ flexDirection: "column", gap: 16 }}
                wrap={data?.reference?.length > 1 ? true : false}>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    color: "#030203",
                    fontSize: "16",
                    textTransform: "uppercase",
                  }}
                >
                  References
                </Text>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.reference?.map((item, index) => {
                    return (
                      <View
                        wrap={false}
                        key={index}
                        style={{
                          flexDirection: "column",
                          gap: 4,
                          alignItems: "left",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 700`,
                            color: "#414042",
                            fontSize: "12",
                          }}
                        >
                          {item?.referantName}
                        </Text>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "10",
                            width: "100%",
                          }}
                        >
                          {item?.email}
                        </Text>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "10",
                          }}
                        >
                          {item?.organization}
                        </Text>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            color: "#58595B",
                            fontSize: "10",
                          }}
                        >
                          {item?.designation}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            width: "450px",
            padding: " 16px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              marginTop: 8,
              gap: 4,
              maxWidth: "100%",
            }}
          >
            <View style={{ maxWidth: "100%" }}>
              <Text
                style={{
                  color: "#030203",
                  fontFamily: `${selectedFont} 400`,
                  fontSize: "28px",
                }}
              >
                {data.firstName} {data.lastName}
              </Text>
            </View>
            {/* <View style={{maxWidth:"80%" ,paddingHorizontal:'20px'}}> */}
            <Text
              style={{
                fontSize: "14px",
                fontFamily: `${selectedFont} 400`,
                color: "#58595B",
              }}
            >
              {data.designation}
            </Text>
            {/* </View> */}
            <View
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "#221F1F",
                marginTop: 12,
              }}
            ></View>
          </View>

          {data?.summery?.length > 0 && data?.showSummary === true && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#030203",
                  fontFamily: `${selectedFont} 400`,
                  fontSize: "16px",
                }}
              >
                ABOUT ME
              </Text>

              <Text
                style={{
                  color: "#58595B",
                  fontSize: "10px",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                {data.summery}
              </Text>
            </View>
          )}

          {data?.experience?.length > 0 && data?.showExperience === true && (
            <View
              wrap={data?.experience?.length > 1 ? true : false}
              style={{ flexDirection: "column", gap: 12, width: "100%" }}>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <Text
                  style={{
                    color: "#030203",
                    fontSize: "16px",
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  EXPERIENCE
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {data?.experience?.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                      wrap={false}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 700`,
                          }}
                        >
                          {detail.designation}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            maxWidth: "75%",
                          }}
                        >
                          {detail.organization}
                        </Text>
                        {/* <View style={{}}> */}
                        {detail.duration?.start?.year && (
                          <Text
                            style={{
                              color: "#414142",
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              // border: "1px",
                              height: "15px"
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                ? "Present"
                                : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                        )}
                        {/* </View> */}
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            color: "#6D6E71",
                            fontSize: "10px",
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
            </View>
          )}

          {data?.project?.length > 0 && data?.showProject === true && (
            <View
              wrap={data?.project?.length > 1 ? true : false}
              style={{ flexDirection: "column", gap: 12, width: "100%" }}>
              <View wrap={false}
                style={{ flexDirection: "column", gap: 12 }}>
                <Text

                  style={{
                    color: "#030203",
                    fontSize: "16px",
                    fontFamily: `${selectedFont} 400`,
                    textTransform: "uppercase",
                  }}
                >
                  Projects
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {data?.project?.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                      wrap={false}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 700`,
                          }}
                        >
                          {detail.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            maxWidth: "75%",
                          }}
                        >
                          {detail.organization}
                        </Text>
                        {/* <View style={{}}> */}
                        {detail.duration?.start?.year && (
                          <Text
                            style={{
                              color: "#414142",
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              height: "15px"
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                ? "Present"
                                : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                        )}
                        {/* </View> */}
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            color: "#6D6E71",
                            fontSize: "10px",
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
            </View>
          )}

          {data?.internship?.length > 0 && data?.showInternship === true && (
            <View wrap={data?.internship?.length > 1 ? true : false}
              style={{ flexDirection: "column", gap: 12, width: "100%" }}>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <Text
                  style={{
                    color: "#030203",
                    fontSize: "16px",
                    fontFamily: `${selectedFont} 400`,
                    textTransform: "uppercase",
                  }}
                >
                  INTERNSHIP
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {data?.internship?.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                      wrap={false}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 700`,
                          }}
                        >
                          {detail.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            maxWidth: "75%",
                          }}
                        >
                          {detail.organization}
                        </Text>
                        {/* <View style={{}}> */}
                        {detail.duration?.start?.year && (
                          <Text
                            style={{
                              color: "#414142",
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              height: "15px"
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                ? "Present"
                                : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                        )}
                        {/* </View> */}
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            color: "#6D6E71",
                            fontSize: "10px",
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
            </View>
          )}

          {data?.course?.length > 0 && data?.showCourses === true && (
            <View
              wrap={data?.course?.length > 1 ? true : false}
              style={{ flexDirection: "column", gap: 12, width: "100%" }}>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <Text
                  style={{
                    color: "#030203",
                    fontSize: "16px",
                    fontFamily: `${selectedFont} 400`,
                    textTransform: "uppercase",
                  }}
                >
                  Courses & Certifications
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {data?.course?.map((detail, index) => (
                  <>
                    <View
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                      wrap={false}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 12,
                            fontFamily: `${selectedFont} 700`,
                          }}
                        >
                          {detail.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: 10,
                            fontFamily: `${selectedFont} 400`,
                            maxWidth: "75%",
                          }}
                        >
                          {detail.organization}
                        </Text>
                        {/* <View style={{}}> */}
                        {detail.duration?.start?.year && (
                          <Text
                            style={{
                              color: "#414142",
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              height: "15px"
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                ? "Present"
                                : detail.duration?.end?.year
                              }
                         `}
                          </Text>
                        )}
                        {/* </View> */}
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            color: "#6D6E71",
                            fontSize: "10px",
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
            </View>
          )}

          {data?.extraCaricularData?.length > 0 &&
            data?.showExtraCariculam === true && (
              <View
                wrap={data?.extraCaricularData?.length > 1 ? true : false}
                style={{ flexDirection: "column", gap: 12, width: "100%" }}>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  <Text
                    style={{
                      color: "#030203",
                      fontSize: "16px",
                      fontFamily: `${selectedFont} 400`,
                      textTransform: "uppercase",
                    }}
                  >
                    Extra-Curriculum Activities
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {data?.extraCaricularData?.map((detail, index) => (
                    <>
                      <View
                        key={index}
                        style={{ flexDirection: "column", gap: "8px" }}
                        wrap={false}
                      >
                        <View>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: 12,
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            maxWidth: "100%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: 10,
                              fontFamily: `${selectedFont} 400`,
                              maxWidth: "75%",
                            }}
                          >
                            {detail.organization}
                          </Text>
                          {/* <View style={{}}> */}
                          {detail.duration?.start?.year && (
                            <Text
                              style={{
                                color: "#414142",
                                fontSize: 10,
                                fontFamily: `${selectedFont} 400`,
                                height: "15px"
                              }}
                            >
                              {detail.duration?.start?.year !== "Year" &&
                                `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking || detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                                }
                         `}
                            </Text>
                          )}
                          {/* </View> */}
                        </View>
                        <View style={{ width: "100%" }}>
                          <Text
                            style={{
                              color: "#6D6E71",
                              fontSize: "10px",
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
              </View>
            )}

          {data?.section?.length > 0 &&
            data?.showCustomSection === true &&
            data?.section?.map((item, index) => (
              <View
                key={index}
                wrap={data?.section?.length > 1 ? true : false}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#030203",
                    fontFamily: `${selectedFont} 400`,
                    fontSize: "16px",
                  }}
                >
                  {item?.header.toUpperCase()}
                </Text>

                <View style={{ flexDirection: "column", gap: 18 }}>
                  {item?.subSection?.map((detail, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        flexDirection: "column",
                        gap: 8,
                        alignItems: "start",
                        justifyContent: "start",
                        maxWidth: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          // gap: 8,
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            width: "80%",
                            color: "#000000",
                            fontSize: "12px",
                            fontFamily: `${selectedFont} 700`,
                          }}
                        >
                          {detail?.title}
                        </Text>
                        {detail.duration?.start?.year && (
                          <View style={{ flexDirection: "row", gap: 4 }}>
                            <Text
                              style={{
                                color: "#414142",
                                fontSize: "10px",
                                fontFamily: `${selectedFont} 400`,
                                height: "15px"
                              }}
                            >
                              {detail?.duration?.start?.year}
                              {detail?.duration?.start?.year && "-"}
                              {detail?.duration?.end?.year === "Year" ||
                                detail?.duration?.end?.year === undefined
                                ? "Present"
                                : detail?.duration?.end?.year}
                            </Text>
                          </View>
                        )}
                      </View>

                      <Text
                        style={{
                          color: "#6D6E71",
                          fontSize: "10px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>
    </Page>
  );
}

export default Template39;
