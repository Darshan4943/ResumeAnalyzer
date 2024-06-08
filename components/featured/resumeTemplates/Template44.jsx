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
  Defs,
  ClipPath,
  data,
} from "@react-pdf/renderer";
import React from "react";
import { formatLink } from "../../../utils/middleware";

//template 13
const Template44 = ({ data, selectedColor, selectedFont, preview }) => {
  console.log("first", data);
  return (
    <Page size="A4" wrap={true} style={{ paddingTop: "12px" }}>
      <View
        style={{
          width: 595,
          display: "flex",
          flexDirection: "row",
          marginTop: "-12px",
        }}
      >
        <View
          style={{
            width: 207,
            padding: 2,
            flexDirection: "column",
            gap: 14,
            backgroundColor: selectedColor,
            minHeight: 829.7,
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: "24px" }}>
            {data?.profilePhoto ? (
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

          <View
            style={{ flexDirection: "column", gap: 16, alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: `${selectedFont} 500`,
                fontSize: 14,
                color: "#2D3033",
              }}
            >
              PROFILE
            </Text>
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 10,
                color: "#6D6E71",
                paddingHorizontal: "18px",
              }}
            >
              {data.summery ? <>{data.summery}</> : <>About</>}
            </Text>
          </View>

          <View
            style={{ width: 123, height: 1, backgroundColor: "#A7A9AC" }}
          ></View>

          <View
            style={{
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 14,
                  color: "#2D3033",
                }}
              >
                CONTACT ME
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                paddingHorizontal: "8px",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 12,
                  color: "#282829",
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#282829",
                  paddingHorizontal: "16px",
                }}
              >
                {data.location ? <>{data.location}</> : <>Your Address</>}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 12,
                  color: "#282829",
                }}
              >
                Mobile{" "}
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#282829",
                }}
              >
                {data.mobileNumber ? <>{data.mobileNumber}</> : <>Your Phone</>}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "100%",
                paddingHorizontal: "10px",
              }}
            >
              <Text
                style={{
                  fontFamily: `${selectedFont} 500`,
                  fontSize: 12,
                  color: "#282829",
                }}
              >
                Email{" "}
              </Text>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 10,
                  color: "#282829",
                }}
              >
                {data.email ? <>{data.email}</> : <>Your Email</>}
              </Text>
            </View>
          </View>

          <View
            style={{ width: 123, height: 1, backgroundColor: "#A7A9AC" }}
          ></View>

          {data?.skills?.length > 0 && (
            <View
            // wrap={false}
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize: 14,
                  }}
                >
                  SKILLS
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.skills?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {detail.skill}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.achievements?.length > 0 && (
            <View
            wrap={false}
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize: 14,
                  }}
                >
                  Achievements & Awards
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.achievements?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {detail.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.socialLinks?.length > 0 && (
            <View
            wrap={false}
              style={{
               
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize: 14,
                  }}
                >
                  Website & Social link
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.socialLinks?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 500` }}>
                      {detail.platform}
                    </Text>
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        lineHeight: 1.5,
                      }}
                    >
                   {formatLink(detail.link)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.languages?.length > 0 && (
            <View
            wrap={false}
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize: 14,
                  }}
                >
                  LANGUAGES
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.languages?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {detail?.languages}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.hobbies?.length > 0 && (
            <View
            wrap={false}
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize: 14,
                  }}
                >
                  HOBBIES
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.hobbies?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 400` }}>
                      {detail.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.reference?.length > 0 && (
            <View
            wrap={false}
              style={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                padding: "8px",
                gap: "10px",
              }}
            >
              <View
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 500`,
                    // color: selectedColor,
                    fontSize: 14,
                  }}
                >
                  REFERENCE
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: "column",

                  // flexWrap: "wrap",
                  // rowGap:'10px',
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "8px",
                  gap: "8px",
                }}
              >
                {data?.reference?.map((detail, index) => (
                  <View
                    wrap={false}
                    key={index}
                    style={{
                      color: "#414042",
                      fontSize: "12px",
                      // width: "calc(50% - 4px)",
                      width: "100%",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Text style={{ fontFamily: `${selectedFont} 500` }}>
                      {detail.referantName}
                    </Text>
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        lineHeight: 1.5,
                      }}
                    >
                      {detail.designation}
                    </Text>
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        lineHeight: 1.5,
                      }}
                    >
                      {detail.organization}
                    </Text>
                    <Text
                      style={{
                        color: "#414042",
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        lineHeight: 1.5,
                      }}
                    >
                      {detail.email}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            width: 388,
            marginTop: "24px",
            paddingHorizontal: 32,
            paddingBottom: 42,
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: `${selectedFont} 400`,
                fontSize: 36,
                color: "#0D0D0D",
              }}
            >
              {data.firstName} {data.lastName}
            </Text>

            <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Text
                style={{
                  fontFamily: `${selectedFont} 400`,
                  fontSize: 20,
                  color: "#0D0D0D",
                }}
              >
                {data.designation ? <>{data.designation}</> : <>Designation</>}
              </Text>
              <View
                style={{ width: 36, height: 2, backgroundColor: "#BCBEC0" }}
              ></View>
            </View>
          </View>
          {data?.experience?.length > 0 && (
            <View
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            // wrap={data?.experience?.length > 1 ? true : false}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  EXPERIENCE
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 16 }}>
                {data?.experience?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 4 }}
                  // wrap={false}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: "#2D3033",
                      }}
                    >
                      {detail.organization} /{" "}
                      {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year
                        }`}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.designation}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {data?.education?.length > 0 && (
            <View
              // wrap={false}
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            // wrap={data?.education?.length > 1 ? true : false}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  EDUCATION
                </Text>
              </View>
              {data?.education?.map((detail, index) => (
                <View
                  key={index}
                  wrap={false}
                  style={{
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 13,
                      color: "#2D3033",
                    }}
                  >
                    {detail.qualification} /{" "}
                    {detail.duration?.start?.year !== "Year" &&
                      `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year"
                        ? "Pursuing"
                        : detail.duration?.end?.year
                      }`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 12,
                      color: "#6D6E71",
                    }}
                  >
                    {detail.instituteName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      fontSize: 10,
                      color: "#6D6E71",
                    }}
                  >
                    {detail.specialization}
                  </Text>
                </View>
              ))}
            </View>
          )}
        
        {data?.course?.length > 0 && (
            <View
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            // wrap={data?.experience?.length > 1 ? true : false}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  COURSE
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 16 }}>
                {data?.course?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 4 }}
                  // wrap={false}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: "#2D3033",
                      }}
                    >
                      {detail.title} /{" "}
                      {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year
                        }`}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.organization}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

{data?.internship?.length > 0 && (
            <View
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            // wrap={data?.experience?.length > 1 ? true : false}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  INTERNSHIP
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 16 }}>
                {data?.internship?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 4 }}
                  // wrap={false}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: "#2D3033",
                      }}
                    >
                      {detail.title} /{" "}
                      {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year
                        }`}
                    </Text>
               
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.organization}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

{data?.extraCaricularData?.length > 0 && (
            <View
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            // wrap={data?.experience?.length > 1 ? true : false}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  ACTIVITIES
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 16 }}>
                {data?.extraCaricularData?.map((detail, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "column", gap: 4 }}
                  // wrap={false}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 14,
                        color: "#2D3033",
                      }}
                    >
                      {detail.title} /{" "}
                      {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year
                        }`}
                    </Text>
               
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 12,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.organization}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data?.section?.map((item, index) => (
            <View
              // wrap={false}
              // wrap={data?.section?.length > 1 ? true : false}
              key={index}
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            >
              <View
                style={{
                  backgroundColor: "#2D3033",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: `${selectedFont} 400`,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  {item?.header}
                </Text>
              </View>
              {item?.subSection?.map((detail, index) => (
                <>
                  <View
                    key={index}
                    style={{ gap: "10px" }}
                  // wrap={false}
                  >
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 13,
                        color: "#2D3033",
                      }}
                    >
                      {detail?.title}{" "}
                      {detail.duration?.start?.year && (
                        <Text
                          style={{
                            fontFamily: `${selectedFont} 400`,
                            fontSize: 14,
                            color: "#2D3033",
                          }}
                        >
                          / {detail?.duration?.start?.year}
                          {detail?.duration?.start?.year && "-"}
                          {detail?.duration?.end?.year === "" ||
                            detail?.duration?.end?.year === undefined
                            ? "Present"
                            : detail?.duration?.end?.year}
                        </Text>
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: `${selectedFont} 400`,
                        fontSize: 10,
                        color: "#6D6E71",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                </>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
};

export default Template44;
