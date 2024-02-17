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
  Circle,
  Rect,
} from "@react-pdf/renderer";
function Template36({ data }) {
  return (
    <Page size="A4">
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "792px",
          height: "100%",
          padding: "34px",
          gap: "24px",
        }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Text
            style={{ fontSize: "32px", fontWeight: "400", color: "#F15A29" }}
          >
            {data.firstName ? <>{data.firstName}</> : <>First Name</>}{" "}
            {data.lastName ? <>{data.lastName}</> : <>Last Name</>}
          </Text>
          <Text
            style={{ fontSize: "12px", fontWeight: "400", color: "#58595B" }}
          >
            {data.designation ? <>{data.designation}</> : <>Designation</>}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "169px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <View style={{ height: "124px", width: "100%" }}>
              {data.profilePhoto ? (
                <Image
                  src={URL.createObjectURL(data.profilePhoto)}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Image
                  src="/images/services/black.png"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#F15A29",
                }}
              >
                CONTACT
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <View
                  style={{ display: "flex", flexDirection: "row", gap: "6px" }}
                >
                  <Svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M6 12C2.69219 12 0 9.30781 0 6C0 2.69219 2.69102 0 6 0C9.30898 0 12 2.69102 12 6C12.0012 9.30898 9.30898 12 6 12ZM6 0.809173C3.13758 0.809173 0.809172 3.13758 0.809172 6C0.809172 8.86242 3.13758 11.192 6 11.192C8.86241 11.192 11.192 8.86359 11.192 6C11.192 3.13758 8.86358 0.809173 6 0.809173Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M8.94181 7.78707L7.99156 6.83681C7.80267 6.64793 7.48903 6.65374 7.29315 6.84962L6.81395 7.32767C6.78363 7.31134 6.75215 7.29388 6.7195 7.27522C6.41752 7.10732 6.00361 6.87761 5.56754 6.4427C5.13031 6.00664 4.90062 5.59158 4.73272 5.28959C4.71523 5.25811 4.69774 5.22662 4.68141 5.19747L5.00322 4.87684L5.16063 4.71825C5.35651 4.52237 5.36233 4.20873 5.17345 4.01985L4.2232 3.06959C4.03431 2.88071 3.72067 2.88655 3.52479 3.08244L3.25662 3.35176L3.26362 3.35877C3.17384 3.47303 3.09922 3.60593 3.04325 3.74818C2.99195 3.88343 2.9593 4.01287 2.94531 4.14346C2.81939 5.18349 3.2951 6.13374 4.58464 7.42445C6.36738 9.2072 7.80501 9.0731 7.8668 9.0661C8.00205 9.04978 8.13147 9.01714 8.26323 8.96701C8.40431 8.91221 8.53606 8.83643 8.65149 8.74782L8.65732 8.75248L8.92899 8.48665C9.12487 8.2896 9.12953 7.97712 8.94181 7.78707Z"
                      fill="#F15A29"
                    />
                  </Svg>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#58595B",
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
                  style={{ display: "flex", flexDirection: "row", gap: "6px" }}
                >
                  <Svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M6.00474 6.82418L5.29001 6.19922L3.24609 7.9505C3.32071 8.01929 3.42099 8.06241 3.53175 8.06241H8.47773C8.58733 8.06241 8.6876 8.01929 8.76105 7.9505L6.71947 6.19922L6.00474 6.82418Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M6 12C2.69219 12 0 9.30781 0 6C0 2.69219 2.69102 0 6 0C9.30898 0 12 2.69219 12 6C12.0012 9.30781 9.30898 12 6 12ZM6 0.807999C3.13758 0.807999 0.809172 3.13641 0.809172 5.99883C0.809172 8.86125 3.13758 11.1908 6 11.1908C8.86241 11.1908 11.192 8.86241 11.192 5.99883C11.192 3.13641 8.86358 0.807999 6 0.807999Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M8.76222 4.04745C8.6876 3.97866 8.58849 3.93555 8.47656 3.93555H3.53059C3.42099 3.93555 3.32071 3.97867 3.24609 4.04863L6.00357 6.41203L8.76222 4.04745Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M3.11328 4.29688V7.72434L5.10917 6.03042L3.11328 4.29688Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M6.89453 6.03156L8.89042 7.72548V4.29688L6.89453 6.03156Z"
                      fill="#F15A29"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#58595B",
                    }}
                  >
                    {data.email ? <>{data.email}</> : <>Your Email</>}
                  </Text>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: "6px" }}
                >
                  <Svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M6 12C2.69219 12 0 9.30781 0 6C0 2.69219 2.69102 0 6 0C9.30898 0 12 2.69102 12 6C12.0012 9.30898 9.30898 12 6 12ZM6 0.809173C3.13758 0.809173 0.809172 3.13758 0.809172 6C0.809172 8.86242 3.13758 11.192 6 11.192C8.86241 11.192 11.192 8.86359 11.192 6C11.192 3.13758 8.86358 0.809173 6 0.809173Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M9.06144 5.79639C8.96117 4.26433 7.73575 3.03892 6.20369 2.93865V2.93164H5.99848H5.79327V2.93865C4.26121 3.03892 3.03579 4.26433 2.93552 5.79639H2.92969V6.00163V6.20683H2.93668C3.03696 7.7389 4.26237 8.96314 5.79444 9.06458V9.07159H5.99965H6.20485V9.06458C7.73692 8.9643 8.96117 7.7389 9.06261 6.20683H9.0696V6.00163V5.79639H9.06144ZM4.85118 3.6009C4.65297 3.86324 4.48973 4.19323 4.36964 4.56867H3.75635C4.02336 4.15242 4.40229 3.81544 4.85118 3.6009ZM3.54298 4.9779H4.26237C4.20757 5.23674 4.1726 5.51073 4.1621 5.79639H3.3471C3.36809 5.5084 3.43688 5.23208 3.54298 4.9779ZM3.3471 6.20566H4.1621C4.1726 6.49132 4.20757 6.76531 4.26237 7.02415H3.54298C3.43688 6.76881 3.36809 6.49365 3.3471 6.20566ZM3.75635 7.43342H4.36848C4.4874 7.80886 4.6518 8.13881 4.85002 8.40115C4.40229 8.18661 4.02336 7.84967 3.75635 7.43342ZM5.79444 8.63435C5.37353 8.52125 5.01208 8.07002 4.79172 7.43225H5.79444V8.63435ZM5.79444 7.02415H4.67629C4.61916 6.76881 4.58185 6.49365 4.57019 6.20566H5.79444V7.02415ZM5.79444 5.79639H4.57019C4.58185 5.5084 4.61799 5.23324 4.67629 4.9779H5.79444V5.79639ZM5.79444 4.56867H4.79172C5.01092 3.93089 5.37353 3.47967 5.79444 3.36774V4.56867ZM8.24178 4.56867H7.62965C7.50956 4.19323 7.34632 3.86324 7.14811 3.6009C7.59467 3.81544 7.97477 4.15242 8.24178 4.56867ZM6.20369 3.36656C6.62343 3.47849 6.98604 3.93088 7.20641 4.56749H6.20369V3.36656ZM6.20369 4.9779H7.32067C7.37897 5.23324 7.41395 5.5084 7.42677 5.79639H6.20252L6.20369 4.9779ZM6.20369 6.20566H7.42794C7.41628 6.49365 7.38014 6.76881 7.32184 7.02415H6.20485L6.20369 6.20566ZM6.20369 8.63435V7.43225H7.20641C6.98721 8.07002 6.6246 8.52242 6.20369 8.63435ZM7.14694 8.40115C7.34516 8.13764 7.50956 7.80886 7.62848 7.43342H8.24061C7.97477 7.84967 7.59467 8.18661 7.14694 8.40115ZM8.45514 7.02415H7.73575C7.79055 6.76531 7.82553 6.49132 7.83602 6.20566H8.65102C8.63004 6.49365 8.56241 6.76881 8.45514 7.02415ZM7.83719 5.79639C7.8267 5.51073 7.79172 5.23674 7.73692 4.9779H8.45631C8.56241 5.23324 8.6312 5.5084 8.65219 5.79639H7.83719Z"
                      fill="#F15A29"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#58595B",
                    }}
                  >
                    {data.sociaLinks ? <>{data.sociaLinks}</> : <>Your Website</>}
                  </Text>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: "6px" }}
                >
                  <Svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M6 12C2.69219 12 0 9.30781 0 6C0 2.69219 2.69102 0 6 0C9.30898 0 12 2.69102 12 6C12 9.30898 9.30898 12 6 12ZM6 0.809173C3.13758 0.809173 0.809172 3.13758 0.809172 6C0.809172 8.86242 3.13758 11.192 6 11.192C8.86241 11.192 11.192 8.86359 11.192 6C11.192 3.13758 8.86358 0.809173 6 0.809173Z"
                      fill="#F15A29"
                    />
                    <Path
                      d="M7.66518 3.32971C7.22095 2.88548 6.62981 2.64062 6.00136 2.64062C5.37291 2.64062 4.78178 2.88548 4.33755 3.32971C3.51555 4.15171 3.41295 5.69893 4.11602 6.63636L6.00136 9.35885L7.88321 6.64102C8.58978 5.69892 8.48834 4.15171 7.66518 3.32971ZM6.02352 5.82949C5.55014 5.82949 5.16421 5.44473 5.16421 4.97019C5.16421 4.49681 5.54897 4.11088 6.02352 4.11088C6.49806 4.11088 6.88282 4.49681 6.88282 4.97019C6.88282 5.44473 6.49689 5.82949 6.02352 5.82949Z"
                      fill="#F15A29"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#58595B",
                    }}
                  >
                    {data.location ? <>{data.location}</> : <>Your Address</>}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#F15A29",
                }}
              >
                EDUCATION
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {data?.education?.map((detail, index) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#58595B",
                      }}
                    >
                      {detail.duration?.start?.year}-
                      {detail.duration?.end?.year}
                    </Text>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#58595B",
                      }}
                    >
                      {detail.qualification}
                    </Text>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#58595B",
                      }}
                    >
                      {detail.instituteName}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#F15A29",
                }}
              >
                SKILLS
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {data?.skills?.length > 0 && (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {data.skills?.map((detail, index) => {
                        const calculateWidthPercentage = (rating) => {
                          let ratingPercentage = 0;
                          if (rating && rating.length > 0) {
                            const zerosCount = rating.filter(
                              (val) => val === 0
                            ).length;

                            if (zerosCount === 0) ratingPercentage = 100;
                            else if (zerosCount === 1) ratingPercentage = 75;
                            else if (zerosCount === 2) ratingPercentage = 50;
                            else if (zerosCount === 3) ratingPercentage = 25;
                            else if (zerosCount === 4) ratingPercentage = 10;
                          }
                          return ratingPercentage;
                        };

                        const ratingPercentage = calculateWidthPercentage(
                          detail.rating
                        );

                        return (
                          <View
                            key={index}
                            style={{
                              paddingRight: "12px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "16px",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#414142",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                  width: "80px",
                                }}
                              >
                                {detail.skill}
                              </Text>
                              <View
                                style={{
                                  width: "59.21%",
                                  height: "3.78px",
                                  display: "flex",
                                  marginBottom: "1px",
                                  backgroundColor: "#D1D3D4",
                                  borderRadius: "4px",
                                }}
                              >
                                <View
                                  style={{
                                    width: `${ratingPercentage}%`,
                                    height: "100%",
                                    backgroundColor: "#F15A29",
                                    borderRadius: "4px",
                                  }}
                                ></View>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </>
                )}
              </View>
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#F15A29",
                }}
              >
                HOBBIES
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {data?.hobbies?.map((item, index) => (
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#58595B",
                    }}
                  >
                    {item?.title}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              width: "324px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#F15A29",
                }}
              >
                PROFILE
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#58595B",
                }}
              >
                {data.summery}
              </Text>
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#F15A29",
                }}
              >
                EXPERIENCE
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {data?.experience?.map((detail, index) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "#58595B",
                        }}
                      >
                        {detail.duration?.start?.year}-{" "}
                        {detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year}
                      </Text>
                      <View
                        style={{
                          width: "1px",
                          height: "100%",
                          backgroundColor: "#F15A29",
                        }}
                      ></View>
                      <Text
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "#58595B",
                        }}
                      >
                        {detail.designation}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#58595B",
                      }}
                    >
                      {detail.organization}/{detail.location}
                    </Text>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#58595B",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F15A29",
                }}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template36;
