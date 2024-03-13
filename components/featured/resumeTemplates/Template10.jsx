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
function Template10({ data, selectedColor, selectedFont,preview }) {
  return (
    <Page size="A4" style={{ padding: 24 }}>
      <View style={{ flexDirection: "row", gap: 24 }}>
        <View style={{ width: "150px", marginTop: "86px" }}>
          <View style={{ flexDirection: "column", gap: 24 }}>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: `${selectedFont} 400`,
                  color: "#414042",
                }}
              >
                CONTACT
              </Text>

              <View style={{ flexDirection: "col", gap: 8, paddingRight: 4 }}>
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M11.6593 2C7.98697 2 5 4.98696 5 8.658C5 10.1368 5.94409 12.5477 7.88696 16.0294C9.26043 18.491 10.6126 20.5445 10.6686 20.6299L11.658 22.13L12.6474 20.6299C12.7048 20.5445 14.0556 18.491 15.429 16.0294C17.3719 12.5491 18.316 10.1382 18.316 8.65934C18.3173 4.98697 15.3304 2 11.6593 2ZM11.6593 12.0663C9.75248 12.0663 8.20832 10.5208 8.20832 8.61399C8.20832 6.70713 9.75381 5.16165 11.6593 5.16165C13.5649 5.16165 15.1104 6.70713 15.1104 8.61399C15.1104 10.5208 13.5649 12.0663 11.6593 12.0663Z"
                      stroke={selectedColor}
                      stroke-width="0.666734"
                      stroke-miterlimit="10"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.location}
                  </Text>
                </View>

                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M20.0046 17.2915C20.0379 17.5513 19.9596 17.7778 19.7664 17.9693L17.5114 20.206C17.4098 20.3193 17.2766 20.4159 17.1134 20.4942C16.9501 20.5725 16.7886 20.6241 16.6304 20.6474C16.6187 20.6474 16.5854 20.6507 16.5288 20.6557C16.4722 20.6607 16.3989 20.6641 16.3089 20.6641C16.0941 20.6641 15.746 20.6274 15.2664 20.5541C14.7851 20.4808 14.1988 20.301 13.5027 20.0112C12.8082 19.7231 12.0204 19.2917 11.1394 18.7155C10.2584 18.1392 9.3207 17.3481 8.32477 16.3422C7.53368 15.5628 6.87915 14.8166 6.35787 14.1038C5.83825 13.3927 5.42022 12.7332 5.10378 12.1286C4.78735 11.5241 4.54919 10.9761 4.39264 10.4848C4.23442 9.99352 4.12783 9.5705 4.07121 9.21409C4.01458 8.85768 3.99126 8.57787 4.00292 8.37468C4.01458 8.1715 4.01958 8.05827 4.01958 8.03662C4.04289 7.8784 4.09286 7.71683 4.1728 7.55362C4.25274 7.39041 4.34767 7.25717 4.46092 7.15558L6.71594 4.90055C6.87416 4.74234 7.05403 4.66406 7.25888 4.66406C7.40544 4.66406 7.53534 4.70571 7.64859 4.79064C7.76184 4.87558 7.85844 4.9805 7.93672 5.10541L9.75039 8.54624C9.85198 8.72611 9.8803 8.92428 9.83533 9.13912C9.79036 9.35397 9.69377 9.53384 9.54721 9.68207L8.71615 10.5131C8.69283 10.5365 8.67285 10.5731 8.65786 10.623C8.6412 10.6747 8.63288 10.7163 8.63288 10.7513C8.67784 10.9878 8.77943 11.2593 8.93765 11.564C9.07255 11.8355 9.2824 12.1652 9.56553 12.5566C9.84865 12.9463 10.2484 13.396 10.768 13.904C11.2759 14.4236 11.7289 14.8283 12.1237 15.1164C12.5184 15.4046 12.8498 15.6161 13.1146 15.7526C13.3811 15.8875 13.5843 15.9708 13.7242 15.9975L13.9357 16.0391C13.959 16.0391 13.994 16.0308 14.0456 16.0141C14.0972 15.9975 14.1322 15.9775 14.1555 15.9558L15.1215 14.9732C15.3247 14.7933 15.5628 14.7017 15.8326 14.7017C16.0241 14.7017 16.1774 14.735 16.2906 14.8033H16.3073L19.5782 16.7353C19.818 16.8785 19.9579 17.065 20.0046 17.2915Z"
                      stroke={selectedColor}
                      stroke-width="0.666734"
                      stroke-miterlimit="10"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.mobileNumber}
                  </Text>
                </View>

                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M18.088 18.6641H5.24486C4.00514 18.6641 3 17.6589 3 16.4192V7.90892C3 6.6692 4.00514 5.66406 5.24486 5.66406H18.088C19.3277 5.66406 20.3329 6.6692 20.3329 7.90892V16.4192C20.3329 17.6589 19.3277 18.6641 18.088 18.6641Z"
                      stroke={selectedColor}
                      strokeWidth="0.666734"
                      strokeMiterlimit="10"
                    />
                    <Path
                      d="M19.7818 6.11719L11.6643 13.295L3.69141 6.29312"
                      stroke={selectedColor}
                      strokeWidth="0.666734"
                      strokeMiterlimit="10"
                    />
                    <Path
                      d="M9.53716 12.1426L3.45312 18.7517"
                      stroke={selectedColor}
                      strokeWidth="0.666734"
                      strokeMiterlimit="10"
                    />
                    <Path
                      d="M19.8809 18.7517L13.7969 12.1426"
                      stroke={selectedColor}
                      strokeWidth="0.666734"
                      strokeMiterlimit="10"
                    />
                  </Svg>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.email}
                  </Text>
                </View>
              </View>
            </View>
            {data?.skills?.length > 0 && (
              <View style={{ flexDirection: "column", gap: 12 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: `${selectedFont} 400`,
                    color: "#414042",
                  }}
                >
                  SKILLS
                </Text>
                {data?.skills?.map((detail, index) => (
                  <View style={{ flexDirection: "row", gap: 16 }} key={index}>
                    <Svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z"
                        stroke={selectedColor}
                        strokeWidth="4.0004"
                        strokeMiterlimit="10"
                      />
                    </Svg>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: `${selectedFont} 400`,
                        color: "#414042",
                      }}
                    >
                      {detail.skill}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {data?.languages?.length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: `${selectedFont} 400`,
                    color: "#414042",
                  }}
                >
                  LANGUAGES
                </Text>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {data.languages?.map((detail, index) => {
                    const calculateWidthPercentage = (rating) => {
                      let ratingPercentage = 0;
                      if (rating && rating.length > 0) {
                        const zerosCount = rating.filter(
                          (val) => val === 0
                        ).length;

                        if (zerosCount === 0) ratingPercentage = 100;
                        else if (zerosCount === 1) ratingPercentage = 50;
                        else if (zerosCount === 2) ratingPercentage = 20;
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
                              color: "#414042",
                              fontSize: "12px",
                              fontFamily: `${selectedFont} 400`,
                              width: "80px",
                            }}
                          >
                            {detail.languages}
                          </Text>
                          <View
                            style={{
                              width: "59.21%",
                              height: "3.78px",
                              display: "flex",
                              marginBottom: "1px",
                              backgroundColor: "#414042",
                              borderRadius: "4px",
                            }}
                          >
                            <View
                              style={{
                                width: `${ratingPercentage}%`,
                                height: "100%",
                                backgroundColor: selectedColor,
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
        </View>

        <View style={{ width: "373px", gap: 24 }}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "column", gap: 8 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 36,
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.firstName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 36,
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.lastName}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: `${selectedFont} 400`,
                    color: "#414042",
                  }}
                >
                  {data.designation}{" "}
                </Text>
              </View>

              <View
                style={{ width: "124px", height: "124px", borderRadius: "50%" }}
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
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <Image src="/images/services/profile.png" alt="" style={{}} />
                )}
              </View>
            </View>

            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: `${selectedFont} 500`,
                  color: "#414042",
                }}
              >
                ABOUT
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: `${selectedFont} 400`,
                  color: "#414042",
                }}
              >
                {data.summery}{" "}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <Svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M30.3714 18.2336C31.6052 10.6309 26.4423 3.46746 18.8396 2.2336C11.2369 0.999729 4.07345 6.16269 2.83958 13.7654C1.60571 21.3681 6.76867 28.5315 14.3714 29.7654C21.9741 30.9992 29.1375 25.8363 30.3714 18.2336Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M24.4478 23.132H8.74364C7.83448 23.132 7.09766 22.3952 7.09766 21.4861V11.6128C7.09766 10.7036 7.83448 9.9668 8.74364 9.9668H24.4478C25.3569 9.9668 26.0938 10.7036 26.0938 11.6128V21.4861C26.0938 22.3952 25.3569 23.132 24.4478 23.132Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M20.7815 9.96518C20.6328 8.60644 19.4952 7.54492 18.0977 7.54492H14.9494C13.5519 7.54492 12.4142 8.60644 12.2656 9.96518H20.7815Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M24.8999 16.1566H8.29154C7.63215 16.1566 7.09766 15.6221 7.09766 14.9627V11.6757C7.09766 10.7304 7.86319 9.96484 8.80856 9.96484H24.3828C25.3282 9.96484 26.0937 10.7304 26.0937 11.6757V14.9627C26.0925 15.6221 25.558 16.1566 24.8999 16.1566Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M16.5242 17.3356C16.0621 17.3356 15.6875 16.961 15.6875 16.4989V15.8133C15.6875 15.3512 16.0621 14.9766 16.5242 14.9766C16.9863 14.9766 17.3609 15.3512 17.3609 15.8133V16.4989C17.3609 16.961 16.9863 17.3356 16.5242 17.3356Z"
                  fill="white"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
              </Svg>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#282829",
                    fontFamily: `${selectedFont} 400`,
                    fontSize: "16px",
                  }}
                >
                  EXPERIENCE
                </Text>
                <View
                  style={{
                    height: "1px",
                    marginTop: "4px",
                    width: "100%",
                    backgroundColor: selectedColor,
                  }}
                ></View>
              </View>
            </View>
            {data.experience?.map((detail, index) => (
              <View
                style={{ flexDirection: "column", gap: 8, width: "100%" }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Svg
                    width="6"
                    height="5"
                    viewBox="0 0 6 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M2.9375 4.79279C2.53646 4.79279 2.17022 4.69502 1.83878 4.49947C1.50734 4.3006 1.24219 4.03545 1.04332 3.70401C0.847775 3.37257 0.75 3.00633 0.75 2.60529C0.75 2.20094 0.847775 1.83469 1.04332 1.50657C1.24219 1.17513 1.50734 0.911636 1.83878 0.716086C2.17022 0.517223 2.53646 0.417791 2.9375 0.417791C3.34186 0.417791 3.7081 0.517223 4.03622 0.716086C4.36766 0.911636 4.63116 1.17513 4.8267 1.50657C5.02557 1.83469 5.125 2.20094 5.125 2.60529C5.125 3.00633 5.02557 3.37257 4.8267 3.70401C4.63116 4.03545 4.36766 4.3006 4.03622 4.49947C3.7081 4.69502 3.34186 4.79279 2.9375 4.79279Z"
                      fill={selectedColor}
                    />
                  </Svg>

                  <View
                    style={{
                      flexDirection: "column",
                      gap: 3,
                      width: "100%",
                      paddingTop: 14,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: "#414042",
                        }}
                      >
                        {" "}
                        {detail.organization}- {detail.designation}{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {detail.duration?.start?.year !== "Year" &&
                        `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year}
                         `}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {detail.location}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {detail.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <Svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M30.3713 18.3215C31.6052 10.7188 26.4423 3.55535 18.8396 2.32148C11.2369 1.08761 4.07345 6.25056 2.83959 13.8532C1.60572 21.4559 6.76866 28.6194 14.3713 29.8533C21.974 31.0871 29.1375 25.9242 30.3713 18.3215Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M26.5106 12.0972L17.0507 7.67631C16.7098 7.51646 16.3164 7.51148 15.9717 7.66259L5.82738 12.0922C5.41027 12.2745 5.40527 12.8652 5.81989 13.0538L15.9517 17.6708C16.3077 17.8331 16.7173 17.8282 17.0682 17.6558L26.5182 13.0476C26.9165 12.854 26.9128 12.2845 26.5106 12.0972Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M9.36719 14.668V22.9303C9.36719 22.9303 16.6579 26.6931 23.0295 22.9303V14.7504L16.9676 17.7064C16.6829 17.845 16.3507 17.85 16.061 17.7177L9.36719 14.668Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M26.7812 12.6699V17.5679"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
                <Path
                  d="M26.8147 20.6061C27.7134 20.6061 28.442 19.8775 28.442 18.9788C28.442 18.0801 27.7134 17.3516 26.8147 17.3516C25.916 17.3516 25.1875 18.0801 25.1875 18.9788C25.1875 19.8775 25.916 20.6061 26.8147 20.6061Z"
                  stroke={selectedColor}
                  stroke-width="0.666734"
                  stroke-miterlimit="10"
                />
              </Svg>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#282829",
                    fontFamily: `${selectedFont} 400`,
                    fontSize: "16px",
                  }}
                >
                  EDUCATION
                </Text>
                <View
                  style={{
                    height: "1px",
                    marginTop: "4px",
                    width: "100%",
                    backgroundColor: selectedColor,
                  }}
                ></View>
              </View>
            </View>

            {data?.education?.map((detail, index) => (
              <View
                style={{ flexDirection: "column", gap: 8, width: "100%" }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Svg
                    width="6"
                    height="5"
                    viewBox="0 0 6 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M2.9375 4.79279C2.53646 4.79279 2.17022 4.69502 1.83878 4.49947C1.50734 4.3006 1.24219 4.03545 1.04332 3.70401C0.847775 3.37257 0.75 3.00633 0.75 2.60529C0.75 2.20094 0.847775 1.83469 1.04332 1.50657C1.24219 1.17513 1.50734 0.911636 1.83878 0.716086C2.17022 0.517223 2.53646 0.417791 2.9375 0.417791C3.34186 0.417791 3.7081 0.517223 4.03622 0.716086C4.36766 0.911636 4.63116 1.17513 4.8267 1.50657C5.02557 1.83469 5.125 2.20094 5.125 2.60529C5.125 3.00633 5.02557 3.37257 4.8267 3.70401C4.63116 4.03545 4.36766 4.3006 4.03622 4.49947C3.7081 4.69502 3.34186 4.79279 2.9375 4.79279Z"
                      fill={selectedColor}
                    />
                  </Svg>

                  <View
                    style={{
                      flexDirection: "column",
                      gap: 3,
                      width: "100%",
                      paddingTop: 14,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#414042",
                        }}
                      >
                        {" "}
                        {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${detail.duration?.end?.year}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {" "}
                        {detail.duration?.end?.year && (
                          <>
                            {detail.duration?.start?.year}-
                            {detail.duration?.end?.year}
                          </>
                        )}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: `${selectedFont} 400`,
                        color: selectedColor,
                      }}
                    >
                      {" "}
                      {detail.instituteName}
                    </Text>
                    <View></View>
                  </View>
                </View>
                <View></View>
              </View>
            ))}
          </View>

          {data?.course?.length > 0 && (
            <View style={{ flexDirection: "column", gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
                <Svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M30.3713 18.3215C31.6052 10.7188 26.4423 3.55535 18.8396 2.32148C11.2369 1.08761 4.07345 6.25056 2.83959 13.8532C1.60572 21.4559 6.76866 28.6194 14.3713 29.8533C21.974 31.0871 29.1375 25.9242 30.3713 18.3215Z"
                    stroke={selectedColor}
                    stroke-width="0.666734"
                    stroke-miterlimit="10"
                  />
                  <Path
                    d="M26.5106 12.0972L17.0507 7.67631C16.7098 7.51646 16.3164 7.51148 15.9717 7.66259L5.82738 12.0922C5.41027 12.2745 5.40527 12.8652 5.81989 13.0538L15.9517 17.6708C16.3077 17.8331 16.7173 17.8282 17.0682 17.6558L26.5182 13.0476C26.9165 12.854 26.9128 12.2845 26.5106 12.0972Z"
                    stroke={selectedColor}
                    stroke-width="0.666734"
                    stroke-miterlimit="10"
                  />
                  <Path
                    d="M9.36719 14.668V22.9303C9.36719 22.9303 16.6579 26.6931 23.0295 22.9303V14.7504L16.9676 17.7064C16.6829 17.845 16.3507 17.85 16.061 17.7177L9.36719 14.668Z"
                    stroke={selectedColor}
                    stroke-width="0.666734"
                    stroke-miterlimit="10"
                  />
                  <Path
                    d="M26.7812 12.6699V17.5679"
                    stroke={selectedColor}
                    stroke-width="0.666734"
                    stroke-miterlimit="10"
                  />
                  <Path
                    d="M26.8147 20.6061C27.7134 20.6061 28.442 19.8775 28.442 18.9788C28.442 18.0801 27.7134 17.3516 26.8147 17.3516C25.916 17.3516 25.1875 18.0801 25.1875 18.9788C25.1875 19.8775 25.916 20.6061 26.8147 20.6061Z"
                    stroke={selectedColor}
                    stroke-width="0.666734"
                    stroke-miterlimit="10"
                  />
                </Svg>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    COURSE
                  </Text>
                  <View
                    style={{
                      height: "1px",
                      marginTop: "4px",
                      width: "100%",
                      backgroundColor: selectedColor,
                    }}
                  ></View>
                </View>
              </View>

              {data?.course?.map((detail, index) => (
                <View
                  style={{ flexDirection: "column", gap: 8, width: "100%" }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Svg
                      width="6"
                      height="5"
                      viewBox="0 0 6 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M2.9375 4.79279C2.53646 4.79279 2.17022 4.69502 1.83878 4.49947C1.50734 4.3006 1.24219 4.03545 1.04332 3.70401C0.847775 3.37257 0.75 3.00633 0.75 2.60529C0.75 2.20094 0.847775 1.83469 1.04332 1.50657C1.24219 1.17513 1.50734 0.911636 1.83878 0.716086C2.17022 0.517223 2.53646 0.417791 2.9375 0.417791C3.34186 0.417791 3.7081 0.517223 4.03622 0.716086C4.36766 0.911636 4.63116 1.17513 4.8267 1.50657C5.02557 1.83469 5.125 2.20094 5.125 2.60529C5.125 3.00633 5.02557 3.37257 4.8267 3.70401C4.63116 4.03545 4.36766 4.3006 4.03622 4.49947C3.7081 4.69502 3.34186 4.79279 2.9375 4.79279Z"
                        fill={selectedColor}
                      />
                    </Svg>

                    <View
                      style={{
                        flexDirection: "column",
                        gap: 3,
                        width: "100%",
                        paddingTop: 14,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: "#414042",
                        }}
                      >
                        {detail.courseName}{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {" "}
                        {detail.duration?.end?.month}-
                        {detail.duration?.end?.year}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: `${selectedFont} 400`,
                          color: selectedColor,
                        }}
                      >
                        {detail.issuedBy}
                      </Text>
                      <View></View>
                    </View>
                  </View>
                  <View></View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
}

export default Template10;
