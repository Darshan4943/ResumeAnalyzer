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
//template 15
function Template30({ data, selectedColor, selectedFont, preview }) {

  const formatLink = (link) => {
    if (link?.length > 25) {
      return link?.match(/.{1,25}/g).join('\n');  }
    return link;
  };

  const formatEmail = (email) => {
    if (email?.length > 25) {
      return email?.match(/.{1,25}/g).join('\n');  }
    return email;
  };


  return (
    <Page size="A4" style={{ padding: 24 }}>
      <View style={{ flexDirection: "column", gap: 24, maxWidth: "100%" }}>
        <View
          style={{
            maxWidth: "100%",
            backgroundColor: "#F1F2F2",
            borderRadius: "50%",
            flexDirection: "row",
            gap: "32px",
            alignItems: "center",
            display: "flex",
          }}
        >
          <View
            style={{
              width: "173",
              height: "173",
              borderRadius: "50%",
              marginTop: "20px",
              marginLeft: "18px",
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
                style={{ width: "153", height: "153", borderRadius: "50%" }}
              />
            ) : (
              <Image
                src="/images/services/profile.png"
                alt=""
                style={{ width: "153", height: "153", borderRadius: "50%" }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 4,
              maxWidth: "40%",
              display: "flex",
              paddingVertical: "6px",
            }}
          >
            <Text
              style={{ fontFamily: `${selectedFont} 700`, fontSize: "24px" }}
            >
              {data.firstName} {data.lastName}
            </Text>
            <Text
              style={{
                fontFamily: `${selectedFont} 500`,
                fontSize: "16px",
              }}
            >
              {data.designation}
            </Text>
            <View style={{ display: "flex" }}>
              <View
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", gap: "4px" }}
                >
                  <Svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M15.0273 12.1398C15.0551 12.3563 14.9899 12.5451 14.829 12.7047L12.951 14.5688C12.8664 14.6632 12.7555 14.7437 12.6195 14.809C12.4836 14.8742 12.3491 14.9172 12.2173 14.9367C12.2076 14.9367 12.1799 14.9395 12.1327 14.9436C12.0855 14.9478 12.0245 14.9505 11.9496 14.9505C11.7707 14.9505 11.4808 14.92 11.0814 14.8589C10.6805 14.7979 10.1923 14.6479 9.61395 14.4064C9.03558 14.1663 8.37954 13.8068 7.64444 13.3266C6.91073 12.8463 6.12986 12.187 5.30184 11.3486C4.64302 10.699 4.09794 10.0772 3.66381 9.4831C3.23108 8.89042 2.88295 8.34076 2.61942 7.8383C2.3559 7.33445 2.15756 6.87779 2.02718 6.46832C1.89542 6.05886 1.80665 5.7063 1.7595 5.40926C1.71234 5.11222 1.69292 4.87904 1.70263 4.7097C1.71234 4.54036 1.7165 4.44597 1.7165 4.42793C1.73592 4.29606 1.77753 4.16141 1.8441 4.02539C1.91068 3.88936 1.98973 3.77834 2.08405 3.69367L3.96202 1.81428C4.09378 1.68242 4.24357 1.61719 4.41417 1.61719C4.53622 1.61719 4.64441 1.65187 4.73872 1.72266C4.83304 1.79345 4.91348 1.88089 4.97867 1.98499L6.48909 4.85266C6.5737 5.00257 6.59727 5.16777 6.55983 5.34682C6.52238 5.52588 6.44193 5.67577 6.31988 5.7993L5.62778 6.49192C5.60836 6.51135 5.59172 6.5419 5.57785 6.58354C5.56398 6.62657 5.55704 6.66126 5.55704 6.69041C5.59449 6.88751 5.67909 7.11377 5.81086 7.36777C5.92459 7.59402 6.09796 7.86886 6.33375 8.19505C6.56953 8.51985 6.90241 8.8946 7.33515 9.31795C7.75817 9.75101 8.13543 10.0883 8.46415 10.3284C8.79286 10.5686 9.06887 10.7448 9.2894 10.8586C9.51132 10.9711 9.68053 11.0405 9.79703 11.0627L9.97318 11.0988C9.9926 11.0988 10.0217 11.0918 10.0647 11.078C10.1077 11.0641 10.1368 11.0474 10.1563 11.0294L10.9607 10.2105C11.1299 10.0592 11.3283 9.98417 11.5529 9.98417C11.7124 9.98417 11.84 10.0119 11.9344 10.0688H11.9482L14.6723 11.679C14.872 11.7956 14.9885 11.951 15.0273 12.1398Z"
                      fill={selectedColor}
                    />
                  </Svg>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 500`,
                      fontSize: "12px",
                      color: "#808080",
                    }}
                  >
                    {data.mobileNumber}
                  </Text>
                </View>
                {/* </View> */}
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                    }}
                  >
                    <Svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M15.0335 11.2831C15.0335 11.5758 14.9517 11.8465 14.8195 12.0847L10.6094 7.37372L14.7744 3.72982C14.936 3.98688 15.0335 4.28904 15.0335 4.61535V11.2831ZM8.36739 8.22883L14.1617 3.15904C13.9246 3.02894 13.656 2.94922 13.3675 2.94922H3.36725C3.0777 2.94922 2.81017 3.02894 2.57307 3.15904L8.36739 8.22883ZM9.98199 7.92247L8.64121 9.09652C8.56252 9.16472 8.46496 9.19937 8.36634 9.19937C8.26877 9.19937 8.1712 9.16472 8.09252 9.09652L6.75068 7.92247L2.48704 12.6932C2.74303 12.8538 3.04203 12.9492 3.36621 12.9492H13.3665C13.6906 12.9492 13.9896 12.8527 14.2456 12.6932L9.98199 7.92247ZM1.95933 3.72982C1.79776 3.98688 1.7002 4.28904 1.7002 4.61535V11.282C1.7002 11.5748 1.78203 11.8455 1.91422 12.0836L6.12331 7.37164L1.95933 3.72982Z"
                        fill={selectedColor}
                      />
                    </Svg>

                    <Text
                      style={{
                        fontFamily: `${selectedFont} 500`,
                        fontSize: "12px",
                        color: "#808080",
                      }}
                    >
                      {/* {data.email} */}
                    {formatEmail(data.email)}

                    </Text>
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                    }}
                  >
                    <Svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M8.36795 1.61719C5.97804 1.61719 4.03418 3.59575 4.03418 6.02747C4.03418 7.00705 4.64858 8.60405 5.91295 10.9095C6.80678 12.54 7.68673 13.9003 7.72317 13.9568L8.36795 14.9505L9.01185 13.9568C9.04917 13.9003 9.92824 12.54 10.8221 10.9095C12.0864 8.60405 12.7008 7.00705 12.7008 6.02747C12.7008 3.59575 10.757 1.61719 8.36795 1.61719ZM8.36795 8.28518C7.127 8.28518 6.12209 7.26144 6.12209 5.99833C6.12209 4.73522 7.12787 3.71146 8.36795 3.71146C9.60802 3.71146 10.6138 4.73522 10.6138 5.99833C10.6138 7.26144 9.60802 8.28518 8.36795 8.28518Z"
                        fill={selectedColor}
                      />
                    </Svg>

                    <Text
                      style={{
                        fontFamily: `${selectedFont} 500`,
                        fontSize: "12px",
                        color: "#808080",
                      }}
                    >
                      {data.location}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

      
        </View>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "column", gap: 24, width: 160 }}>
            {data?.summery?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                    ABOUT ME
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#58595B",
                    fontSize: "12",
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  {data.summery}
                </Text>
              </View>
            )}
            {data?.skills?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                    SKILLS
                  </Text>
                </View>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.skills?.map((detail, index) => (
                    <Text
                      key={index}
                      style={{
                        color: "#58595B",
                        fontSize: "14",
                        fontFamily: `${selectedFont} 400`,
                      }}
                    >
                      {detail.skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            {data?.hobbies?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                  HOBBIES
                  </Text>
                </View>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.hobbies?.map((detail, index) => (
                    <Text
                      key={index}
                      style={{
                        color: "#58595B",
                        fontSize: "14",
                        fontFamily: `${selectedFont} 400`,
                      }}
                    >
                      {detail.title}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            {data?.languages?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                    LANGUAGES
                  </Text>
                </View>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.languages?.map((detail, index) => (
                    <Text
                      key={index}
                      style={{
                        color: "#58595B",
                        fontSize: "14",
                        fontFamily: `${selectedFont} 400`,
                        // textAlign: "center",
                      }}
                    >
                      {detail.languages}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            {data?.achievements?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                    ACHIEVEMENTS
                  </Text>
                </View>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.achievements?.map((detail, index) => (
                    <Text
                      key={index}
                      style={{
                        color: "#58595B",
                        fontSize: "14",
                        fontFamily: `${selectedFont} 400`,
                        // textAlign: "center",
                      }}
                    >
                      {detail.title}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            {data?.socialLinks?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 16 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                    SOCIAL LINKS
                  </Text>
                </View>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.socialLinks?.map((detail, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                    >
                      <Text
                        key={index}
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.platform}
                      </Text>
                      <Text
                        style={{
                          color: "#414042",
                          fontSize: 12,
                          fontFamily: `${selectedFont} 500`,
                          lineHeight: 1.5,
                        }}
                      >
                        {/* {detail.link} */}
                        {formatLink(detail?.link)}

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
                  gap: 12,
                  marginRight: "10px",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedColor,
                    padding: "8px 16px",
                    borderRadius: "25%",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: `${selectedFont} 600`,
                      fontSize: "14px",
                    }}
                  >
                    REFERENCE
                  </Text>
                </View>
                <View style={{ flexDirection: "column", gap: 12 }}>
                  {data?.reference?.map((detail, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{ flexDirection: "column", gap: "8px" }}
                    >
                      <View style={{ gap: 8 }}>
                        <Text
                          key={index}
                          style={{
                            color: "#58595B",
                            fontSize: "14",
                            fontFamily: `${selectedFont} 400`,
                            // textAlign: "center",
                          }}
                        >
                          {detail.referantName}
                        </Text>

                        <Text
                          style={{
                            color: "#414042",
                            fontFamily: `${selectedFont} 400`,
                            fontSize: "12px",
                          }}
                        >
                          {detail.designation}
                        </Text>
                        <Text
                          style={{
                            color: "#414042",
                            fontFamily: `${selectedFont} 400`,
                            fontSize: "12px",
                          }}
                        >
                          {detail.organization}
                        </Text>
                        <Text
                          style={{
                            color: "#414042",
                            fontFamily: `${selectedFont} 400`,
                            fontSize: "12px",
                          }}
                        >
                          {detail.email}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
          <View
            style={{ flexDirection: "column", gap: 12, width: 350 }}
            //   wrap={data?.experience?.length > 1 ? true : false}
          >
            {data?.experience?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: 16, maxWidth: "100%" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedColor,
                      padding: "8px 16px",
                      borderRadius: "25%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: `${selectedFont} 600`,
                        fontSize: "14px",
                      }}
                    >
                      EXPERIENCE
                    </Text>
                  </View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.experience?.map((detail, index) => (
                    <View
                      key={index}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "start",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            maxWidth: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "14px",
                              fontFamily: `${selectedFont} 500`,
                            }}
                          >
                            {detail.designation}{" "}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "14px",
                            fontFamily: `${selectedFont} 500`,
                          }}
                        >
                          {detail.duration?.start?.year}-{" "}
                          {detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {data?.education?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: 16 }}
                // wrap={data?.experience?.length > 1 ? true : false}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedColor,
                      padding: "8px 16px",
                      borderRadius: "25%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: `${selectedFont} 600`,
                        fontSize: "14px",
                      }}
                    >
                      EDUCATION
                    </Text>
                  </View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {data?.education?.map((detail, index) => (
                    <View
                      key={index}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                      wrap={false}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "start",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            maxWidth: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "14px",
                              fontFamily: `${selectedFont} 500`,
                            }}
                          >
                            {detail.qualification} - {detail.specialization}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "14px",
                            fontFamily: `${selectedFont} 500`,
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

                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.instituteName}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.internship?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: 16, maxWidth: "100%" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedColor,
                      padding: "8px 16px",
                      borderRadius: "25%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: `${selectedFont} 600`,
                        fontSize: "14px",
                      }}
                    >
                      INTERNSHIPS
                    </Text>
                  </View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.internship?.map((detail, index) => (
                    <View
                      key={index}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "start",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            maxWidth: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "14px",
                              fontFamily: `${selectedFont} 500`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "14px",
                            fontFamily: `${selectedFont} 500`,
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

                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {data?.project?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: 16, maxWidth: "100%" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedColor,
                      padding: "8px 16px",
                      borderRadius: "25%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: `${selectedFont} 600`,
                        fontSize: "14px",
                      }}
                    >
                      PROJECTS
                    </Text>
                  </View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.project?.map((detail, index) => (
                    <View
                      key={index}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "start",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            maxWidth: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "14px",
                              fontFamily: `${selectedFont} 500`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "14px",
                            fontFamily: `${selectedFont} 500`,
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

                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.course?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: 16, maxWidth: "100%" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedColor,
                      padding: "8px 16px",
                      borderRadius: "25%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: `${selectedFont} 600`,
                        fontSize: "14px",
                      }}
                    >
                      CERTIFICATIONS
                    </Text>
                  </View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.course?.map((detail, index) => (
                    <View
                      key={index}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "start",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            maxWidth: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "14px",
                              fontFamily: `${selectedFont} 500`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "14px",
                            fontFamily: `${selectedFont} 500`,
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

                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.extraCaricularData?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: 16, maxWidth: "100%" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedColor,
                      padding: "8px 16px",
                      borderRadius: "25%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: `${selectedFont} 600`,
                        fontSize: "14px",
                      }}
                    >
                    ACTIVITIES
                    </Text>
                  </View>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {data?.extraCaricularData?.map((detail, index) => (
                    <View
                      key={index}
                      style={{ display: "flex", alignItems: "start", gap: 4 }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "start",
                          justifyContent: "space-between",
                          maxWidth: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "start",
                            maxWidth: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "14px",
                              fontFamily: `${selectedFont} 500`,
                            }}
                          >
                            {detail.title}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#414042",
                            fontSize: "14px",
                            fontFamily: `${selectedFont} 500`,
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

                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          color: "#58595B",
                          fontSize: "12px",
                          fontFamily: `${selectedFont} 400`,
                        }}
                      >
                        {detail.description}{" "}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.section?.length > 0 && (
              <>
                {data?.section?.map((item, index) => (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 16,
                      maxWidth: "100%",
                    }}
                    key={index}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          width: "50%",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: selectedColor,
                          padding: "8px 16px",
                          borderRadius: "25%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFF",
                            fontFamily: `${selectedFont} 600`,
                            fontSize: "14px",
                          }}
                        >
                          {item?.header?.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      {item?.subSection?.map((detail, index) => (
                        <View
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "start",
                            gap: 4,
                          }}
                        >
                          {detail?.title}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 8,
                              alignItems: "start",
                              justifyContent: "space-between",
                              maxWidth: "100%",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 8,
                                alignItems: "start",
                                maxWidth: "70%",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#414042",
                                  fontSize: "14px",
                                  fontFamily: `${selectedFont} 500`,
                                }}
                              >
                                {detail?.title}
                              </Text>
                            </View>
                            {detail.duration?.start?.year && (
                              <Text
                                style={{
                                  color: "#414042",
                                  fontSize: "14px",
                                  fontFamily: `${selectedFont} 500`,
                                }}
                              >
                                {detail?.duration?.start?.year}
                                {detail?.duration?.start?.year && "-"}
                                {detail?.duration?.end?.year === "" ||
                                detail?.duration?.end?.year === undefined
                                  ? "Present"
                                  : detail?.duration?.end?.year}
                              </Text>
                            )}
                          </View>

                          <Text
                            style={{
                              color: "#58595B",
                              fontSize: "12px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail?.organization}
                          </Text>
                          <Text
                            style={{
                              color: "#58595B",
                              fontSize: "12px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail?.description}{" "}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template30;
