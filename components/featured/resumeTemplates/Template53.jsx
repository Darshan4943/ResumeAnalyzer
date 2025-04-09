

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
import { formatLink } from "../../../utils/middleware";
function Template53({
  data,
  selectedColor,
  selectedFont,
  preview,
  pageLayout,
}) {

  const fetchImageAsBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); 
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const [profileBase64, setProfileBase64] = useState(null);

useEffect(() => {
  const prepareImage = async () => {
    if (data?.profilePhoto && typeof data.profilePhoto === 'string' && data.profilePhoto.startsWith('http')) {
      try {
        const base64Image = await fetchImageAsBase64(data.profilePhoto);
        setProfileBase64(base64Image);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
  };
  prepareImage();
}, [data?.profilePhoto]);
  //   const shouldWrap = (description) => {
  //     if (description?.length > 500) {
  //         return false;
  //     }
  //     return true;
  // };

  // const wraptext = shouldWrap(data?.experience?.description);
  // console.log(wraptext);

  // const shouldWrap = (description) => {
  //   if (description && description.length > 500) {
  //       return false;
  //   }
  //   return true;
  // };

  // const wraptext = shouldWrap(data?.experience?.description);
  // console.log(wraptext);

  return (
    <Page size="A4" style={{ padding: 26 }}>
      <View style={{ flexDirection: "column", gap: 26, minHeight: 757 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {data?.showProfile === true && (
            <>
              {data.profilePhoto ? (
                <Image
                src={
                  preview
                    ? profileBase64 || data?.profilePhoto
                    : Object.keys(data?.profilePhoto || {}).includes("filename")
                      ? URL.createObjectURL(data?.profilePhoto)
                      : profileBase64 || data?.profilePhoto
                }
                  style={{
                    width: "30%",
                    height: 142,
                    borderBottomRightRadius: 58,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Image
                  src={"/images/services/template_profile.png"}
                  style={{
                    width: 144,
                    height: 142,
                    borderBottomRightRadius: 58,
                    objectFit: "contain",
                  }}
                />
              )}
            </>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "70%",
              paddingLeft: "10px",
            }}
          >
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 30,
                  color: "#344A50",
                  wordBreak: "break-word",
                  flexWrap: "wrap",
                  flexWrap: "wrap",
                }}
              >
                {data.firstName} {data.lastName}
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 14,
                  color: selectedColor,
                  wordBreak: "break-word",
                  flexWrap: "wrap",
                }}
              >
                {data.designation}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.location && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
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
                      d="M8.00051 15C11.866 15 15 11.866 15 7.99949C15 4.13396 11.866 1 8.00051 1C4.13498 1 1 4.13396 1 7.99949C1.00101 11.866 4.13498 15 8.00051 15Z"
                      fill="#344A50"
                    />
                    <Path
                      d="M10.2349 9.67811L9.85289 10.0581C9.76575 10.1452 9.62389 10.1452 9.53675 10.0581L8.33909 8.86042C8.23168 8.75301 8.05843 8.75301 7.95204 8.86042L7.35624 9.4562C7.20729 9.60515 6.95297 9.53728 6.89825 9.33361L6.06435 6.22397C6.00964 6.0203 6.19607 5.83386 6.39973 5.88857L9.50839 6.71944C9.71206 6.77416 9.78093 7.02848 9.63199 7.17742L9.03622 7.77321C8.92983 7.88061 8.92983 8.05388 9.03622 8.16027L10.2369 9.36097C10.323 9.44912 10.323 9.59098 10.2349 9.67811Z"
                      fill="white"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontFamily: `${selectedFont} 500`,
                      fontSize: 10,
                      color: "#344A50",
                    }}
                  >
                    {data.location}
                  </Text>
                </View>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
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
                    d="M8.00051 15C11.866 15 15 11.866 15 7.9995C15 4.13397 11.866 1 8.00051 1C4.13498 1 1 4.13397 1 7.9995C1.00101 11.866 4.13498 15 8.00051 15Z"
                    fill="#344A50"
                  />
                  <Path
                    d="M11.5829 10.2814H4.41016V5.71875H11.5829V10.2814ZM5.27346 9.41911H10.7206V6.58102H5.27346V9.41911Z"
                    fill="white"
                  />
                  <Path
                    d="M7.9981 8.49891L4.625 6.52004L5.06072 5.77734L7.9981 7.49986L10.9355 5.77734L11.3702 6.52004L7.9981 8.49891Z"
                    fill="white"
                  />
                </Svg>

                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    fontSize: 10,
                    color: "#344A50",
                  }}
                >
                  {data.email}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M6.99949 14C10.866 14 14 10.8663 14 6.99999C14 3.13373 10.866 0 6.99949 0C3.13396 0 0 3.13373 0 6.99999C0 10.8663 3.13294 14 6.99949 14Z"
                    fill="#344A50"
                  />
                  <Path
                    d="M9.15018 6.8563L8.57464 7.52904L7.9292 8.34059L7.35369 9.00928C6.69913 9.7722 5.57747 9.91405 4.75573 9.34161C4.44568 9.12479 4.38588 8.68404 4.63616 8.3963L5.10326 7.84717C5.22688 7.70533 5.40219 7.63035 5.57748 7.63035C5.71224 7.63035 5.84698 7.67088 5.95945 7.76105C6.22492 7.96267 6.60185 7.92519 6.8197 7.67089L6.95752 7.50675L7.607 6.69519L7.74479 6.53107C7.96162 6.28082 7.9434 5.9029 7.70326 5.67089C7.57255 5.54728 7.5087 5.38315 7.5087 5.21901C7.5087 5.07717 7.55734 4.93127 7.65867 4.81476L8.12982 4.26561C8.37706 3.97382 8.82188 3.96267 9.0833 4.23927C9.77433 4.9647 9.80373 6.09743 9.15018 6.8563Z"
                    fill="white"
                  />
                </Svg>

                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    fontSize: 10,
                    color: "#344A50",
                  }}
                >
                  {data.dial_code} {data.mobileNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {data?.summery?.length > 0 && data?.showSummary === true && (
          <View style={{ display: "flex", flexDirection: "column", gap: 23 }}>
            <View
              style={{ backgroundColor: "#344A50", width: 511, height: 1 }}
            ></View>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 14,
                  color: selectedColor,
                }}
              >
                PROFILE
              </Text>

              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#161616",
                }}
              >
                {data.summery}
              </Text>
            </View>
            <View
              style={{ backgroundColor: "#344A50", width: 511, height: 1 }}
            ></View>
          </View>
        )}

        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
          <View
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {data?.experience?.length > 0 && data?.showExperience === true && (
              <View>
                {data?.experience
                  ?.slice(0, pageLayout && 1)
                  ?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        // gap: 16,
                      }}
                      wrap={false}
                      key={index}
                    >
                      {index === 0 && (
                        <View>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: selectedColor,
                            }}
                          >
                            EXPERIENCE
                          </Text>
                        </View>
                      )}
                      <View style={{ width: "100%", marginVertical: "4px" }}>
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              width: "70%",
                            }}
                          >
                            {detail.designation}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,
                              // marginTop:'6px',
                              color: selectedColor,
                              justifyContent: "flex-end",
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                               `}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 12,
                              width: "100%",
                              color: "#010101",
                            }}
                          >
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                ></View>
              </View>
            )}

            {data?.project?.length > 0 && data?.showProject === true && (
              <View>
                {data?.project
                  ?.slice(0, pageLayout && 1)
                  ?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        // gap: 16,
                      }}
                      wrap={false}
                      key={index}
                    >
                      {index === 0 && (
                        <View>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: selectedColor,
                            }}
                          >
                            PROJECTS
                          </Text>
                        </View>
                      )}
                      <View style={{ width: "100%", marginVertical: "4px" }}>
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              width: "70%",
                            }}
                          >
                            {detail.title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,
                              // marginTop:'6px',
                              color: selectedColor,
                              justifyContent: "flex-end",
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                               `}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 12,
                              width: "100%",
                              color: "#010101",
                            }}
                          >
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                ></View>
              </View>
            )}

            {data?.internship?.length > 0 && data?.showInternship === true && (
              <View>
                {data?.internship
                  ?.slice(0, pageLayout && 1)
                  ?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        // gap: 16,
                      }}
                      wrap={false}
                      key={index}
                    >
                      {index === 0 && (
                        <View>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: selectedColor,
                            }}
                          >
                            INTERNSHIP
                          </Text>
                        </View>
                      )}
                      <View style={{ width: "100%", marginVertical: "4px" }}>
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              width: "70%",
                            }}
                          >
                            {detail.title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,
                              // marginTop:'6px',
                              color: selectedColor,
                              justifyContent: "flex-end",
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                               `}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 12,
                              width: "100%",
                              color: "#010101",
                            }}
                          >
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}

                <View
                  wrap={false}
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                ></View>
              </View>
            )}

            {data?.course?.length > 0 &&
              data?.showCourses === true &&
              !pageLayout && (
                <View>
                  {data?.course?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        // gap: 16,
                      }}
                      wrap={false}
                      key={index}
                    >
                      {index === 0 && (
                        <View>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: selectedColor,
                            }}
                          >
                            COURSES & CERTIFICATIONS
                          </Text>
                        </View>
                      )}
                      <View style={{ width: "100%", marginVertical: "4px" }}>
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              width: "70%",
                            }}
                          >
                            {detail.title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,
                              // marginTop:'6px',
                              color: selectedColor,
                              justifyContent: "flex-end",
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                               `}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 12,
                              width: "100%",
                              color: "#010101",
                            }}
                          >
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#344A50",
                      marginTop: "14px",
                    }}
                    wrap={false}
                  ></View>
                </View>
              )}

            {data?.extraCaricularData?.length > 0 &&
              data?.showExtraCariculam === true &&
              !pageLayout && (
                <View>
                  {data?.extraCaricularData?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        // gap: 16,
                      }}
                      wrap={false}
                      key={index}
                    >
                      {index === 0 && (
                        <View>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: selectedColor,
                            }}
                          >
                            Extra Activities
                          </Text>
                        </View>
                      )}
                      <View style={{ width: "100%", marginVertical: "4px" }}>
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              width: "70%",
                            }}
                          >
                            {detail.title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,
                              // marginTop:'6px',
                              color: selectedColor,
                              justifyContent: "flex-end",
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${
                                detail.currentlyWorking ||
                                detail.duration?.end?.year === "Year"
                                  ? "Present"
                                  : detail.duration?.end?.year
                              }
                               `}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 12,
                              width: "100%",
                              color: "#010101",
                            }}
                          >
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#344A50",
                      marginTop: "14px",
                    }}
                    wrap={false}
                  ></View>
                </View>
              )}

{data?.section?.length > 0 &&
          data?.showCustomSection === true &&
          !pageLayout && (
            <>
              {data?.section.map((item, index) => (
                <View key={index}>
                  <View
                    // wrap={index === 0 &&  false}
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    wrap={false}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                              fontSize: 14,
                              color: selectedColor,
                      }}
                    >
                      {item.header}
                    </Text>
                    <View
                      style={{
                        width: "100%", gap: 24
                      }}
                    >
                      {item?.subSection?.map((detail, index) => (
                        <View
                          key={index}
                          wrap={false}
                          style={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                          }}
                        >
                          <View
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "start",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: `${selectedFont} 700`,
                                fontSize: 12,
                                color: "#161616",
                                width: "70%",
                              }}
                            >
                              {detail.title}
                            </Text>
                            <Text
                              style={{
                                fontFamily: `${selectedFont} 500`,
                                    fontSize: 10,

                                    color: selectedColor,
                                    justifyContent: "flex-end",
                                // marginLeft: 10, // Add margin for spacing if needed
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
                          <Text
                            style={{
                              width: "100%",
                                  fontFamily: `${selectedFont} 400`,
                                  fontSize: 10,
                                  color: "#161616",
                                  marginTop:"8px"
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
              <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#344A50",
                      marginTop: "4px",
                    }}
                    wrap={false}
                  ></View>
            </>
          )}

          </View>
                   {/* SECOND SECTION */}
          <View
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >

{data?.education?.length > 0 && data?.showEducation === true && (
              <View>
                  {data?.education
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    EDUCATION
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            // flexDirection: "row",
                            // justifyContent: "space-between",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              marginVertical:"4px"
                            }}
                          >
                            {detail.qualification}
                          </Text>
                       
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            fontSize: 12,
                            width: "100%",
                            color: "#010101",
                            marginVertical:"4px"
                          }}
                        >
                          {detail.specialization}
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                            fontFamily: `${selectedFont} 400`,
                            fontSize: 10,
                            color: "#161616",
                            marginVertical:"4px"
                          }}
                        >
                          {detail.instituteName}
                        </Text>
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 500`,
                            fontSize: 10,
                            color: selectedColor,
                            marginVertical:"4px"
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
                      </View>
                    ))}
                <View>
               
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}


{data?.skills?.length > 0 && data?.showSkills === true && (
              <View>
                  {data?.skills
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                           SKILLS
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            // flexDirection: "row",
                            // justifyContent: "space-between",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#47484C",
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              flexWrap: "wrap",
                              marginVertical:"4px"
                            }}
                          >
                             {detail.skill}
                          </Text>
                        </View>
                      </View>
                    ))}
                <View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}


{data?.achievements?.length > 0 && data?.showAchievements === true && (
              <View>
                  {data?.achievements
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                              ACHIEVEMENTS & AWARDS
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#47484C",
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              flexWrap: "wrap",
                              marginVertical:"4px"
                            }}
                          >
                             {detail.title}
                          </Text>
                        </View>
                      </View>
                    ))}
                <View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}

            
{data?.languages?.length > 0 && data?.showLanguage === true && (
              <View>
                  {data?.languages
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                               LANGUAGES
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#47484C",
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              flexWrap: "wrap",
                              marginVertical:"4px"
                            }}
                          >
                             {detail.languages}
                          </Text>
                        </View>
                      </View>
                    ))}
                <View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}


{data?.socialLinks?.length > 0 && data?.showLinks === true && (
              <View>
                  {data?.socialLinks
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                           WEBSITE & SOCIAL LINK
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              marginVertical:"4px"
                            }}
                          >
                             {detail.platform}
                          </Text>
                          <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            fontSize: 12,
                            width: "100%",
                            color: "#010101",
                          }}
                        >
                          {formatLink(detail.link)}
                        </Text>
                        </View>
                      </View>
                    ))}
                <View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}



{data?.reference?.length > 0 && data?.showReference === true && (
              <View>
                  {data?.reference
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                                  REFERENCES
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 12,
                              color: "#161616",
                              marginVertical:"2px"
                            }}
                          >
                             {detail.referantName}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                              marginVertical:"2px"
                            }}
                          >
                             {detail.designation}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                              marginVertical:"2px"
                            }}
                          >
                             {detail.organization}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 400`,
                              fontSize: 10,
                              color: "#161616",
                              marginVertical:"2px"
                            }}
                          >
                             {detail.email}
                          </Text>
                        </View>
                      </View>
                    ))}
                <View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}


{data?.hobbies?.length > 0 && data?.showHobbies === true && (
              <View>
                  {data?.hobbies
                    ?.slice(0, pageLayout && 2)
                    ?.map((detail, index) => (
                      <View
                        key={index}
                        wrap={false}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                          {index === 0 && (
                          <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                               HOBBIES
                  </Text>
                      )}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            marginBottom:"4px"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#47484C",
                              width: "100%",
                              fontFamily: `${selectedFont} 400`,
                              flexWrap: "wrap",
                              marginVertical:"4px"
                            }}
                          >
                             {detail.title}
                          </Text>
                        </View>
                      </View>
                    ))}
                <View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                    marginTop: "14px",
                  }}
                  
                ></View>
              </View>
            )}
       
 
          

          </View> 
        </View>
      </View>
    </Page>
  );
}

export default Template53;
