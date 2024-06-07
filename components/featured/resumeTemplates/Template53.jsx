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
function Template53({ data, selectedColor, selectedFont, preview }) {
  return (
    <Page size="A4" style={{ padding: 42 }}>
      <View style={{ flexDirection: "column", gap: 36, minHeight: 757 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
                width: "30%",
                height: 142,
                borderBottomRightRadius: 58,
                objectFit: "contain",
              }}
            />
          ) : (
            <Image
              src={"/images/services/template_profile.png"}
              style={{ width: 144, height: 142, borderBottomRightRadius: 58 }}
            />
          )}

          <View style={{ display: "flex", flexDirection: "column", gap: 16, width: "70%", paddingLeft: "10px" }}>
            <View style={{gap:4}}>
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
            {data.location &&
              <View style={{ display: "flex", flexDirection: "row", gap: 12,alignItems:'center' }}>
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
}
              <View style={{ display: "flex", flexDirection: "row", gap: 12,alignItems:'center' }}>
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
              <View style={{ display: "flex", flexDirection: "row", gap: 12,alignItems:'center' }}>
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
                  {data.mobileNumber}
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
                  fontSize: 12,
                  color: selectedColor,
                }}
              >
                PROFILE
              </Text>
           
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 14,
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

        <View style={{ display: "flex", flexDirection: "row", gap: 24 }}>
          <View
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {data?.experience?.length > 0 &&  data?.showExperience === true && (<View style={{ display: "flex", flexDirection: "column", width: "100%", gap: 16 }}>
              <View>
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: selectedColor,
                  }}
                >
                  WORK
                </Text>
              </View>
              <View style={{ width: "100%", gap: 24 }}>
                {data?.experience?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ display: "flex", width: "100%", flexDirection: "column" }}
                  >
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: `${selectedFont} 700`,
                          fontSize: 12,
                          color: "#161616",
                          width: "70%"
                        }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                        style={{
                          fontFamily: `${selectedFont} 500`,
                          fontSize: 10,

                            color: selectedColor,
                            justifyContent: "flex-end",
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
                  ))}
                </View>
              </View>
            )}

            {data?.project?.length > 0 && data?.showProject === true &&(
              <>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                  }}
                ></View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 16,
                  }}
                >
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
                  <View style={{ width: "100%", gap: 24 }}>
                    {data?.project?.map((detail, index) => (
                      <View
                        key={index}
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
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,

                              color: selectedColor,
                              justifyContent: "flex-end",
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
                            {detail.designation}
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
                    ))}
                  </View>
                </View>
              </>
            )}

            {data?.internship?.length > 0 && data?.showInternship === true && (
              <>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                  }}
                ></View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 16,
                  }}
                >
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
                  <View style={{ width: "100%", gap: 24 }}>
                    {data?.internship?.map((detail, index) => (
                      <View
                        key={index}
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
                    ))}
                  </View>
                </View>
              </>
            )}

            {data?.course?.length > 0 && data?.showCourses === true && (
              <>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                  }}
                ></View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 16,
                  }}
                >
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
                  <View style={{ width: "100%", gap: 24 }}>
                    {data?.course?.map((detail, index) => (
                      <View
                        key={index}
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
                            {detail.organization}
                          </Text>
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 500`,
                              fontSize: 10,

                              color: selectedColor,
                              justifyContent: "flex-end",
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
                            {detail.designation}
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
                    ))}
                  </View>
                </View>
              </>
            )}

            {data?.extraCaricularData?.length > 0 && data?.showExtraCuriculam === true && (
              <>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#344A50",
                  }}
                ></View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 16,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: selectedColor,
                      }}
                    >
                      EXTRA-CURRICULUM ACTIVITIES
                    </Text>
                  </View>
                  <View style={{ width: "100%", gap: 24 }}>
                    {data?.extraCaricularData?.map((detail, index) => (
                      <View
                        key={index}
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
                    ))}
                  </View>
                </View>
              </>
            )}

            {data?.section?.length > 0 && data?.showCustomSection === true && (
              <>
                  {data?.section.map((item, index) => (
              <View key={index} style={{gap:'4px' ,display:'flex',flexDirection:'column'}}>
                <View
                  style={{ width: '100%', height: 1, backgroundColor: "#344A50" }}
                ></View>
                <View style={{ display: "flex", flexDirection: "column", width: "100%", gap: 16,marginTop:8 }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: selectedColor,
                      }}
                    >
                       {item.header}
                    </Text>
                  </View>
                  <View style={{ width: "100%", gap: 24 }}>
                    {item?.subSection?.map((detail, index) => (
                      <View
                        key={index}
                        style={{ display: "flex", width: "100%", flexDirection: "column" }}
                      >
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start"
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: `${selectedFont} 700`,
                              fontSize: 12,
                              color: "#161616",
                              width: "70%"
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
                                }}
                              >
                                {detail?.duration?.start?.year}
                              {detail?.duration?.start?.year && "-"}
                              {detail?.duration?.end?.year === "" ||
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
              </>
            )}
          </View>

          <View
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {data?.education?.length > 0 && data?.showEducation === true && (
              <>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    EDUCATION
                  </Text>
                </View>

                <View
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  {data?.education?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 700`,
                            fontSize: 12,
                            color: "#161616",
                          }}
                        >
                          {detail.qualification}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: `${selectedFont} 400`,
                          fontSize: 12,
                          width: "100%",
                          color: "#010101",
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
                        }}
                      >
                        {detail.instituteName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: `${selectedFont} 500`,
                          fontSize: 10,

                          color: selectedColor,
                          justifyContent: "flex-end",
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
                  ))}
                </View>
              </>
            )}

            {data?.skills?.length > 0 && data?.showSkills=== true && (
              <>
                {" "}
                <View
                  style={{ width: 180, height: 1, backgroundColor: "#344A50" }}
                ></View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      SKILLS
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {data?.skills?.map((detail, index) => (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#47484C",
                            width: "100%",
                            fontFamily: `${selectedFont} 400`,
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.skill}
                        </Text>
                        {/* <View
                      style={{
                        display: "flex",
                        gap: 4,
                        flexDirection: "row",
                        marginTop: "4px",
                        width: "100%",
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <View key={i}>
                          {detail.rating[i] === 0 ? (
                            <Svg
                              width="5"
                              height="5"
                              viewBox="0 0 5 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M5 2.5C5 3.87971 3.88139 5 2.5 5C1.12029 5 0 3.88139 0 2.5C0 1.11861 1.11861 0 2.5 0C3.88139 0 5 1.12029 5 2.5Z"
                                fill="#F3E1C3"
                              />
                            </Svg>
                          ) : (
                            <Svg
                              width="5"
                              height="5"
                              viewBox="0 0 5 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M5 2.5C5 3.87971 3.88139 5 2.5 5C1.12029 5 0 3.88139 0 2.5C0 1.11861 1.12029 0 2.5 0C3.88139 0 5 1.12029 5 2.5Z"
                                fill="#AC5428"
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
              </>
            )}

            {data?.achievements?.length > 0 && data?.showAchievements === true &&(<>  <View
              style={{ width: 180, height: 1, backgroundColor: "#344A50" }}
            ></View>

              <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    ACHIEVEMENTS & AWARDS
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {data?.achievements?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#47484C",
                          width: "100%",
                          fontFamily: `${selectedFont} 500`,
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {detail.title}
                      </Text>

                    </View>
                  ))}
                </View>
              </View></>)}


            {data?.languages?.length > 0 && data?.showLanguage === true && (
              <>
                {" "}
                <View
                  style={{ width: 180, height: 1, backgroundColor: "#344A50" }}
                ></View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      LANGUAGES
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {data?.languages?.map((detail, index) => (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#47484C",
                            width: "100%",
                            fontFamily: `${selectedFont} 400`,
                            flexWrap: "wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.languages}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}

            {data?.socialLinks?.length > 0 && data?.showLinks === true && (
              <>
                <View
                  style={{ width: 180, height: 1, backgroundColor: "#344A50" }}
                ></View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    WEBSITE & SOCIAL LINK
                  </Text>
                </View>

                <View
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  {data?.socialLinks?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 700`,
                            fontSize: 14,
                            color: "#161616",
                          }}
                        >
                          {detail.platform}
                        </Text>
                      </View>
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
                  ))}
                </View>
              </>
            )}

            {data?.reference?.length > 0 && data?.showReference === true &&  (
              <>
                <View
                  style={{ width: 180, height: 1, backgroundColor: "#344A50" }}
                ></View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    REFERENCES
                  </Text>
                </View>

                <View
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  {data?.reference?.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 700`,
                            fontSize: 14,
                            color: "#161616",
                          }}
                        >
                          {detail.referantName}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: `${selectedFont} 400`,
                          fontSize: 12,
                          width: "100%",
                          color: "#010101",
                        }}
                      >
                        {detail.designation}
                      </Text>
                      <Text
                        style={{
                          width: "100%",
                          fontFamily: `${selectedFont} 400`,
                          fontSize: 10,
                          color: "#161616",
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
                        {detail.email}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {data?.hobbies?.length > 0 && data?.showHobbies === true && (
              <>
                {" "}
                <View
                  style={{ width: 180, height: 1, backgroundColor: "#344A50" }}
                ></View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      HOBBIES
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {data?.hobbies?.map((detail, index) => (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#47484C",
                            width: "100%",
                            fontFamily: `${selectedFont} 400`,
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
              </>
            )}
          </View>
        </View>
        {/* 
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "absolute",
            bottom: 0,
          }}
        >
          <View
            style={{ backgroundColor: "#344A50", width: 307, height: 1 }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 10,
                color: "#010101",
              }}
            >
              Find me on social media
            </Text>

            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.88325 14.2702H10.6683V10.1224H11.7318L12.046 8.62579H10.6683C10.6683 8.62579 10.6683 8.06661 10.6683 7.77307C10.6683 7.41958 10.7396 7.28005 11.0807 7.28005C11.3546 7.28005 12.0471 7.28005 12.0471 7.28005V5.72656C12.0471 5.72656 11.0279 5.72656 10.8109 5.72656C9.48273 5.72656 8.88325 6.31158 8.88325 7.43096C8.88325 8.40667 8.88325 8.62475 8.88325 8.62475H7.95508V10.14H8.88325V14.2702Z"
                fill="#AC5428"
              />
              <Path
                d="M10.0002 18.8891C5.09893 18.8891 1.11133 14.9025 1.11133 10.0002C1.11133 5.09892 5.09893 1.11133 10.0002 1.11133C14.9015 1.11133 18.8891 5.09789 18.8891 10.0002C18.8891 14.9025 14.9015 18.8891 10.0002 18.8891ZM10.0002 2.13666C5.6643 2.13666 2.1377 5.6643 2.1377 10.0002C2.1377 14.3372 5.6643 17.8638 10.0002 17.8638C14.3361 17.8638 17.8627 14.3372 17.8627 10.0002C17.8627 5.6643 14.3361 2.13666 10.0002 2.13666Z"
                fill="#AC5428"
              />
            </Svg>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.98605 8.625H6.46875V13.3178H7.98605V8.625Z"
                fill="#AC5428"
              />
              <Path
                d="M7.22139 7.9818C7.71648 7.9818 8.11856 7.57661 8.11856 7.07632C8.11856 6.57707 7.71648 6.17188 7.22139 6.17188C6.7263 6.17188 6.32422 6.57707 6.32422 7.07632C6.32422 7.57661 6.7263 7.9818 7.22139 7.9818Z"
                fill="#AC5428"
              />
              <Path
                d="M10.4143 10.9533C10.4143 10.2639 10.7316 9.8535 11.3394 9.8535C11.8975 9.8535 12.1652 10.2473 12.1652 10.9533C12.1652 12.2485 12.1652 13.2925 12.1652 13.2925L13.6753 13.3173C13.6753 13.3173 13.6753 11.7358 13.6753 10.423C13.6753 9.10927 12.9311 8.47461 11.8913 8.47461C10.8515 8.47461 10.4143 9.285 10.4143 9.285V8.62449H8.95898V13.3173H10.4143C10.4143 13.3173 10.4143 11.7079 10.4143 10.9533Z"
                fill="#AC5428"
              />
              <Path
                d="M10.0002 18.8891C5.0989 18.8891 1.11133 14.9023 1.11133 10.0007C1.11133 5.09915 5.0989 1.11133 10.0002 1.11133C14.9015 1.11133 18.8891 5.09915 18.8891 10.0007C18.8891 14.9013 14.9015 18.8891 10.0002 18.8891ZM10.0002 2.13672C5.66428 2.13672 2.13767 5.66457 2.13767 10.0018C2.13767 14.3369 5.66531 17.8648 10.0002 17.8648C14.3361 17.8648 17.8628 14.3369 17.8628 10.0018C17.8628 5.66457 14.3361 2.13672 10.0002 2.13672Z"
                fill="#AC5428"
              />
            </Svg>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6.09375 12.4542C6.80279 12.909 7.64622 13.1746 8.55061 13.1746C12.1041 13.1746 13.208 10.6609 13.1067 8.40665C13.4199 8.19786 13.6917 7.90949 13.9067 7.57668C13.6183 7.70381 13.3423 7.79373 13.0178 7.83301C13.3496 7.63559 13.5708 7.31724 13.6907 6.94205C13.3806 7.12499 13.0374 7.25937 12.6726 7.33068C12.3801 7.01957 11.9635 6.82422 11.5025 6.82422C10.4679 6.82422 9.72582 7.86918 9.95941 8.87177C8.62711 8.80562 7.42709 8.08727 6.63742 7.11776C6.21778 7.83818 6.41934 8.78081 7.13252 9.25833C6.86998 9.25006 6.62193 9.17771 6.40694 9.05781C6.38937 9.79993 6.92169 10.4955 7.69275 10.6506C7.46742 10.7116 7.22038 10.726 6.96922 10.6775C7.17284 11.3141 7.83332 11.7224 8.53513 11.7358C7.86122 12.264 6.94336 12.5544 6.09375 12.4542Z"
                fill="#AC5428"
              />
              <Path
                d="M10.0002 18.8891C5.09894 18.8891 1.11133 14.9015 1.11133 10.0002C1.11133 5.09789 5.09894 1.11133 10.0002 1.11133C14.9005 1.11133 18.8891 5.09892 18.8891 10.0002C18.8891 14.9015 14.9005 18.8891 10.0002 18.8891ZM10.0002 2.13666C5.66328 2.13666 2.13767 5.66326 2.13767 10.0002C2.13767 14.3361 5.66431 17.8638 10.0002 17.8638C14.3351 17.8638 17.8628 14.3372 17.8628 10.0002C17.8628 5.66326 14.3351 2.13666 10.0002 2.13666Z"
                fill="#AC5428"
              />
            </Svg>
          </View>
        </View> */}
      </View>
    </Page>
  );
}

export default Template53;
