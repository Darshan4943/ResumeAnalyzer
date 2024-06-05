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
function Template32({ data, selectedColor, selectedFont, preview }) {
  return (
    <Page size="A4" wrap={true} style={{ paddingTop: "12px" }}>
      <View style={{ flexDirection: "row", gap: "1.5rem", marginTop: "-12px" }}>
        <View style={{ width: "207px" }}>
          <View
            style={{
              flexDirection: "column",
              minHeight: 829.7,
              height: "100%",
              backgroundColor: "#F2F2F2",
              gap: "18px",
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginTop: "35px",
                flexDirection: "column",
                maxWidth: "100%",
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
                    width: "134px",
                    marginBottom: "16px",
                    height: "134px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  src="/images/services/profile.png"
                  alt=""
                  style={{
                    width: "134px",
                    height: "134px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 24,
                  gap: 4,
                  alignItems: "center",
                  maxWidth: "100%",
                  // paddingHorizontal:'10px'
                }}
              >
                <View
                  style={{
                    maxWidth: "100%",
                    paddingHorizontal: "14px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#414042",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "24px",
                    }}
                  >
                    {data.firstName}
                  </Text>
                  {/* </View> */}
                  {/* <View style={{maxWidth:"100%",paddingHorizontal:'14px'}}> */}

                  <Text
                    style={{
                      color: selectedColor,
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "24px",
                    }}
                  >
                    {data.lastName}
                  </Text>
                </View>
                {/* </View> */}
                <View style={{ maxWidth: "100%", paddingHorizontal: "14px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.designation}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "8" }}
            >
              {data?.mobileNumber && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: "12px",
                    justifyContent: "start",
                    alignItems: "center",
                    marginLeft: "24px",
                    paddingRight: " 4px",
                    paddingTop: "5px",
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
                      d="M15.0273 12.1398C15.0551 12.3563 14.9899 12.5451 14.829 12.7047L12.951 14.5688C12.8664 14.6632 12.7555 14.7437 12.6195 14.809C12.4836 14.8742 12.3491 14.9172 12.2173 14.9367C12.2076 14.9367 12.1799 14.9395 12.1327 14.9436C12.0855 14.9478 12.0245 14.9505 11.9496 14.9505C11.7707 14.9505 11.4808 14.92 11.0814 14.8589C10.6805 14.7979 10.1923 14.6479 9.61395 14.4064C9.03558 14.1663 8.37954 13.8068 7.64444 13.3266C6.91073 12.8463 6.12986 12.187 5.30184 11.3486C4.64302 10.699 4.09794 10.0772 3.66381 9.4831C3.23108 8.89042 2.88295 8.34076 2.61942 7.8383C2.3559 7.33445 2.15756 6.87779 2.02718 6.46832C1.89542 6.05886 1.80665 5.7063 1.7595 5.40926C1.71234 5.11222 1.69292 4.87904 1.70263 4.7097C1.71234 4.54036 1.7165 4.44597 1.7165 4.42793C1.73592 4.29606 1.77753 4.16141 1.8441 4.02539C1.91068 3.88936 1.98973 3.77834 2.08405 3.69367L3.96202 1.81428C4.09378 1.68242 4.24357 1.61719 4.41417 1.61719C4.53622 1.61719 4.64441 1.65187 4.73872 1.72266C4.83304 1.79345 4.91348 1.88089 4.97867 1.98499L6.48909 4.85266C6.5737 5.00257 6.59727 5.16777 6.55983 5.34682C6.52238 5.52588 6.44193 5.67577 6.31988 5.7993L5.62778 6.49192C5.60836 6.51135 5.59172 6.5419 5.57785 6.58354C5.56398 6.62657 5.55704 6.66126 5.55704 6.69041C5.59449 6.88751 5.67909 7.11377 5.81086 7.36777C5.92459 7.59402 6.09796 7.86886 6.33375 8.19505C6.56953 8.51985 6.90241 8.8946 7.33515 9.31795C7.75817 9.75101 8.13543 10.0883 8.46415 10.3284C8.79286 10.5686 9.06887 10.7448 9.2894 10.8586C9.51132 10.9711 9.68053 11.0405 9.79703 11.0627L9.97318 11.0988C9.9926 11.0988 10.0217 11.0918 10.0647 11.078C10.1077 11.0641 10.1368 11.0474 10.1563 11.0294L10.9607 10.2105C11.1299 10.0592 11.3283 9.98417 11.5529 9.98417C11.7124 9.98417 11.84 10.0119 11.9344 10.0688H11.9482L14.6723 11.679C14.872 11.7956 14.9885 11.951 15.0273 12.1398Z"
                      fill={selectedColor}
                    />
                  </Svg>
                  <Text
                    style={{
                      fontSize: "10px",
                      // paddingTop: "2px",
                      flexDirection: "row",
                      marginBottom: "2px",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.mobileNumber}
                  </Text>
                </View>
              )}
              {data?.email && (
                <View
                  style={{
                    flexDirection: "row",
                    breakAll: true,
                    gap: "12px",
                    justifyContent: "start",
                    alignItems: "center",
                    marginLeft: "24px",
                    paddingRight: " 4px",
                    maxWidth: "100%",
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
                      fontSize: "10px",
                      width: "80%",
                      marginBottom: "4px",
                      flexDirection: "row",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.email}
                  </Text>
                </View>
              )}

              {/* {data?.sociaLinks > 0 && (
                    <View style={{ flexDirection:"row",breakAll:true , gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "24px", paddingRight: " 16px" }}>
                        <View style={{ height: "24px", flexDirection:"row", alignItems: "center" }}>
                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/social_white.png" alt="" />
                        </View>
                        <View style={{ flexDirection:"row", fontSize: "11px", paddingTop: "2px", fontWeight: 400, color: "#fff", }}>{data.sociaLinks}</View>
                    </View>
                )} */}
              {data?.location && (
                <View
                  style={{
                    flexDirection: "row",
                    breakAll: true,
                    justifyContent: "start",
                    gap: "12px",
                    alignItems: "center",
                    marginLeft: "24px",
                    paddingRight: " 4px",
                    maxWidth: "70%",
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
                      fontSize: "10px",
                      flexDirection: "row",
                      fontFamily: `${selectedFont} 400`,
                      color: "#414042",
                    }}
                  >
                    {data.location}
                  </Text>
                </View>
              )}
            </View>

            {data?.skills?.length > 0 && (
              <>
                <View style={{ paddingHorizontal: "24px" }}>
                  <Text
                    style={{
                      color: selectedColor,
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    SKILLS
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: "24px",
                  }}
                >
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
                          else if (zerosCount === 1) ratingPercentage = 80;
                          else if (zerosCount === 2) ratingPercentage = 60;
                          else if (zerosCount === 3) ratingPercentage = 40;
                          else if (zerosCount === 4) ratingPercentage = 20;
                        }
                        return ratingPercentage;
                      };

                      const ratingPercentage = calculateWidthPercentage(
                        detail.rating
                      );

                      return (
                        <View
                          wrap={false}
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
                                fontSize: "10px",
                                fontFamily: `${selectedFont} 400`,
                                width: "150px",
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
                                backgroundColor: "#BCBEC0",
                              }}
                            >
                              <View
                                style={{
                                  width: `${ratingPercentage}%`,
                                  height: "100%",
                                  backgroundColor: selectedColor,
                                }}
                              ></View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </>
            )}

            {data?.languages?.length > 0 && (
              <>
                <View style={{ paddingHorizontal: "24px" }}>
                  <Text
                    style={{
                      color: selectedColor,
                      fontFamily: `${selectedFont} 400`,
                    }}
                  >
                    LANGUAGES
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: "24px",
                  }}
                >
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
                          else if (zerosCount === 1) ratingPercentage = 80;
                          else if (zerosCount === 2) ratingPercentage = 60;
                          else if (zerosCount === 3) ratingPercentage = 40;
                          else if (zerosCount === 4) ratingPercentage = 20;
                        }
                        return ratingPercentage;
                      };

                      const ratingPercentage = calculateWidthPercentage(
                        detail.rating
                      );

                      return (
                        <View
                          wrap={false}
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
                                fontSize: "10px",
                                fontFamily: `${selectedFont} 400`,
                                width: "150px",
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
                                backgroundColor: "#BCBEC0",
                              }}
                            >
                              <View
                                style={{
                                  width: `${ratingPercentage}%`,
                                  height: "100%",
                                  backgroundColor: selectedColor,
                                }}
                              ></View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </>
            )}

            {data?.socialLinks?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: "16px" }}
                wrap={false}
              >
                <View style={{ paddingLeft: "24px", paddingRight: "16px" }}>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                      width: "100%",
                    }}
                  >
                    SOCIAL LINK
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginLeft: "24px",
                  }}
                >
                  {data?.socialLinks?.map((item, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        color: "#414042",
                        fontSize: "12px",
                        width: "90%",
                        // width: "calc(40% - 8px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Text style={{ fontFamily: `${selectedFont} 600` }}>
                        {item?.platform}
                      </Text>
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {item?.link}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.achievements?.length > 0 && (
              <View style={{ flexDirection: "column", gap: "16px" }} wrap={false}>
                <View style={{ paddingLeft: '24px', paddingRight: '16px' }}>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                      width: "100%",
                    }}
                  >
                    ACHIEVMENTS
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginLeft: "24px",
                  }}
                >
                  {data?.achievements?.map((item, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        color: "#414042",
                        fontSize: "12px",
                        width: "90%",
                        // width: "calc(40% - 8px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Text style={{ fontFamily: `${selectedFont} 600` }}>
                        {item?.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.reference?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: "16px" }}
                wrap={false}
              >
                <View style={{ paddingLeft: "24px", paddingRight: "16px" }}>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                      width: "100%",
                    }}
                  >
                    REFERENCES
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginLeft: "24px",
                  }}
                >
                  {data?.reference?.map((item, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        color: "#414042",
                        fontSize: "12px",
                        width: "90%",
                        // width: "calc(40% - 8px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Text style={{ fontFamily: `${selectedFont} 600` }}>
                        {item?.referantName}
                      </Text>
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {item?.designation}
                      </Text>
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {item?.organization}
                      </Text>
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {item?.email}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data?.hobbies?.length > 0 && (
              <View
                style={{ flexDirection: "column", gap: "16px" }}
                wrap={false}
              >
                <View style={{ paddingHorizontal: "24px" }}>
                  <Text
                    style={{
                      fontFamily: `${selectedFont} 400`,
                      color: selectedColor,
                    }}
                  >
                    HOBBIES
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginLeft: "24px",
                  }}
                >
                  {data?.hobbies?.map((item, index) => (
                    <View
                      wrap={false}
                      key={index}
                      style={{
                        color: "#414042",
                        fontSize: "12px",
                        width: "90%",
                        // width: "calc(40% - 8px)",
                        gap: "4px",
                      }}
                    >
                      <Text style={{ fontFamily: `${selectedFont} 400` }}>
                        {item?.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            width: "388px",
            padding: " 16px",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
          }}
        >
          {data?.summery?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-start",
                paddingTop: "26px",
                paddingRight: "20px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                  }}
                >
                  <Svg
                    width="26"
                    height="26"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M15.9944 30C23.7229 30 29.991 23.732 29.9946 16C29.9981 8.26801 23.7359 2 16.0074 2C8.27886 2 2.01077 8.26801 2.00718 16C2.00359 23.732 8.26587 30 15.9944 30Z"
                      fill={selectedColor}
                    />
                    <Path
                      d="M18.1427 19.4048C17.7135 19.337 17.7047 18.1531 17.7047 18.1531C17.7047 18.1531 18.9648 16.9014 19.2388 15.219C19.9771 15.219 20.4338 13.43 19.6943 12.801C19.7256 12.1381 20.644 7.59961 15.9929 7.59961C11.3417 7.59961 12.2614 12.1381 12.2915 12.801C11.5532 13.43 12.0087 15.219 12.7469 15.219C13.021 16.9014 14.2811 18.1531 14.2811 18.1531C14.2811 18.1531 14.2711 19.3357 13.8419 19.4048C12.4604 19.6257 7.30371 21.9069 7.30371 24.4103H24.6783C24.6808 21.9069 19.5241 19.6257 18.1427 19.4048Z"
                      fill="white"
                    />
                  </Svg>

                  <Text
                    style={{
                      color: "#282829",
                      fontFamily: `${selectedFont} 400`,
                      fontSize: "16px",
                    }}
                  >
                    ABOUT ME
                  </Text>
                </View>
                <View
                  style={{
                    height: "1px",
                    width: "95%",
                    backgroundColor: "#BCBEC0",
                  }}
                ></View>
              </View>
              <View style={{ marginTop: "10px" }}>
                <Text
                  style={{
                    color: "#414042",
                    fontSize: "10px",
                    paddingLeft: 8,
                    fontFamily: `${selectedFont} 400`,
                  }}
                >
                  {data.summery}
                </Text>
              </View>
            </View>
          )}

          {data?.education?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Svg
                      width="26"
                      height="26"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M15.9932 30C23.7216 30 29.9896 23.732 29.9932 16C29.9968 8.26802 23.7346 2 16.0062 2C8.2778 2 2.00979 8.26802 2.0062 16C2.00262 23.732 8.26481 30 15.9932 30Z"
                        fill={selectedColor}
                      />
                      <Path
                        d="M17.3008 19.9571C16.938 20.1806 16.4725 20.3036 15.9907 20.3036C15.509 20.3036 15.0435 20.1806 14.6806 19.9571L8.74942 16.3075C8.74942 16.3075 8.21387 15.9785 8.21387 16.7243V20.3689C8.21387 22.2885 11.6962 24.3575 15.9907 24.3575C20.2852 24.3575 23.7676 22.2885 23.7676 20.3689V16.5184C23.7676 15.9195 23.3872 16.2121 23.3872 16.2121L17.3008 19.9571Z"
                        fill="white"
                      />
                      <Path
                        d="M25.8546 13.4035C26.31 13.1236 26.31 12.6641 25.8546 12.3841L16.8189 7.8506C16.3634 7.57063 15.6176 7.57063 15.1621 7.8506L6.12774 12.3841C5.67226 12.6641 5.67226 13.1236 6.12774 13.4035L15.1621 18.9627C15.6176 19.2427 16.3634 19.2427 16.8189 18.9627"
                        fill="white"
                      />
                      <Path
                        d="M25.4808 21.6418V15.5014C25.4808 15.5014 25.4846 15.2101 25.3131 15.3068C25.1755 15.3834 24.8376 15.5729 24.7175 15.6771C24.5799 15.7964 24.6112 16.0663 24.6112 16.0663V21.6418C24.6112 21.7209 24.5436 21.7586 24.5111 21.7774C24.1982 21.962 23.9893 22.3022 23.9893 22.6914C23.9893 23.2777 24.4623 23.7523 25.0466 23.7523C25.631 23.7523 26.104 23.2777 26.104 22.6914C26.104 22.2997 25.8925 21.9595 25.5784 21.7749C25.5459 21.7573 25.4808 21.7209 25.4808 21.6418Z"
                        fill="white"
                      />
                    </Svg>

                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      EDUCATION
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#BCBEC0",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingLeft: 8,
                  }}
                >
                  {data?.education?.map((detail, index) => (
                    <>
                      <View
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
                            gap: 6,
                            justifyContent: "space-between",
                            width: "30%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.instituteName}
                          </Text>

                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {" "}
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${detail.duration?.end?.year === "Year"
                                ? "Pursuing"
                                : detail.duration?.end?.year
                              }`}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            width: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#787879",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.qualification} - {detail.specialization}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}

          {data?.experience?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Svg
                      width="26"
                      height="26"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M15.9803 30.0234C23.7017 30.0234 29.9697 23.7554 29.9803 16.0234C29.9909 8.29145 23.7402 2.02344 16.0188 2.02344C8.29747 2.02344 2.02946 8.29145 2.01883 16.0234C2.00819 23.7554 8.25895 30.0234 15.9803 30.0234Z"
                        fill={selectedColor}
                      />
                      <Path
                        d="M16.9366 17.7995V17.3741C16.9366 16.8572 16.5188 16.4395 16.0033 16.4395C15.4879 16.4395 15.0713 16.856 15.0713 17.3741V17.7995C15.0713 18.3151 15.4879 18.7342 16.0033 18.7342C16.52 18.7342 16.9366 18.3151 16.9366 17.7995Z"
                        fill="white"
                      />
                      <Path
                        d="M17.5765 18.3163C17.3688 18.9951 16.7457 19.4932 16.0026 19.4932C15.2595 19.4932 14.6364 18.9938 14.4288 18.3163H8.00206C7.59672 18.3163 7.21389 18.221 6.87109 18.0566V22.3374C6.87109 23.1717 7.55167 23.8568 8.38613 23.8568H23.6216C24.4548 23.8568 25.1366 23.1717 25.1366 22.3374V18.0591C24.7926 18.2222 24.4098 18.3176 24.0044 18.3176H17.5765V18.3163Z"
                        fill="white"
                      />
                      <Path
                        d="M23.9397 10.6319H20.3028C20.0851 9.25561 18.8929 8.19922 17.4604 8.19922H14.5454C13.1117 8.19922 11.9207 9.25686 11.7005 10.6319H8.0649C7.19791 10.6319 6.4873 11.317 6.4873 12.1525V15.658C6.4873 16.4986 7.16665 17.1786 8.00236 17.1786H14.359C14.379 16.7407 14.5679 16.348 14.8632 16.0645C14.8707 16.0545 14.882 16.0494 14.8907 16.0406C14.957 15.9817 15.0258 15.924 15.0996 15.8738C15.1259 15.8575 15.1572 15.8449 15.1847 15.8273C15.246 15.7922 15.3073 15.7546 15.3711 15.7295C15.4224 15.7069 15.48 15.6944 15.5337 15.6793C15.5825 15.6643 15.6263 15.6454 15.6739 15.6367C15.779 15.6141 15.8903 15.6028 16.0017 15.6028C16.1143 15.6028 16.2231 15.6141 16.3294 15.6367C16.3782 15.6454 16.422 15.6643 16.4695 15.6793C16.5233 15.6944 16.5784 15.7069 16.6309 15.7295C16.6972 15.7571 16.7585 15.7922 16.8198 15.8273C16.8474 15.8436 16.8774 15.8562 16.9049 15.8738C16.9787 15.924 17.0475 15.9817 17.1113 16.0406C17.1214 16.0494 17.1314 16.0557 17.1414 16.0645C17.4366 16.3493 17.6243 16.7407 17.6455 17.1786H24.0022C24.8379 17.1786 25.5173 16.4986 25.5173 15.6592V12.1513C25.5173 11.3157 24.8079 10.6319 23.9397 10.6319ZM13.1605 10.6319C13.3544 10.0473 13.8986 9.62071 14.5454 9.62071H17.4604C18.1072 9.62071 18.6514 10.0473 18.8453 10.6319H13.1605Z"
                        fill="white"
                      />
                    </Svg>

                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      EXPERIENCE
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#BCBEC0",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingLeft: 8,
                  }}
                >
                  {data?.experience?.map((detail, index) => (
                    <>
                      <View
                        // wrap={true}
                        // wrap={false}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 16,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            justifyContent: "space-between",
                            width: "30%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.designation}
                          </Text>

                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
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
                            gap: 4,
                            width: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.organization}{" "}
                          </Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.description}{" "}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}

          {data?.project?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Svg width="26" height="26" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                      <Path d="M9.99653 19.1666C15.0573 19.1666 19.1613 15.0625 19.1632 9.99993C19.1651 4.93732 15.0641 0.833252 10.0033 0.833252C4.94261 0.833252 0.838563 4.93732 0.836682 9.99993C0.834802 15.0625 4.9358 19.1666 9.99653 19.1666Z" fill={selectedColor} />


                      <Path d="M6.13558 14.5129C5.94113 14.5906 5.75884 14.5712 5.5887 14.4545C5.41857 14.3379 5.3335 14.1774 5.3335 13.9733V11.3774C5.3335 11.183 5.37968 10.9983 5.47204 10.8233C5.5644 10.6483 5.69322 10.5073 5.8585 10.4004L6.50016 9.97744C6.56822 10.7649 6.67273 11.4455 6.8137 12.0191C6.95468 12.5927 7.18558 13.2441 7.50641 13.9733L6.13558 14.5129ZM8.71683 13.667C8.58072 13.667 8.46405 13.6233 8.36683 13.5358C8.26961 13.4483 8.19669 13.3413 8.14808 13.2149C7.88558 12.5441 7.69114 11.9243 7.56475 11.3556C7.43836 10.7868 7.37516 10.133 7.37516 9.39411C7.37516 8.30522 7.56961 7.26737 7.9585 6.28057C8.34739 5.29376 8.87725 4.49411 9.54808 3.88161C9.60641 3.82327 9.6769 3.78196 9.75954 3.75765C9.84218 3.73334 9.92239 3.72119 10.0002 3.72119C10.0779 3.72119 10.1581 3.73334 10.2408 3.75765C10.3234 3.78196 10.3939 3.82327 10.4522 3.88161C11.1231 4.49411 11.6529 5.29376 12.0418 6.28057C12.4307 7.26737 12.6252 8.30522 12.6252 9.39411C12.6252 10.1427 12.562 10.799 12.4356 11.3629C12.3092 11.9267 12.1147 12.5441 11.8522 13.2149C11.8036 13.3413 11.7307 13.4483 11.6335 13.5358C11.5363 13.6233 11.4196 13.667 11.2835 13.667H8.71683ZM10.0002 9.58369C10.321 9.58369 10.5956 9.46946 10.8241 9.24098C11.0526 9.01251 11.1668 8.73786 11.1668 8.41703C11.1668 8.09619 11.0526 7.82154 10.8241 7.59307C10.5956 7.36459 10.321 7.25036 10.0002 7.25036C9.67933 7.25036 9.40468 7.36459 9.1762 7.59307C8.94773 7.82154 8.8335 8.09619 8.8335 8.41703C8.8335 8.73786 8.94773 9.01251 9.1762 9.24098C9.40468 9.46946 9.67933 9.58369 10.0002 9.58369ZM13.8647 14.5129L12.4939 13.9733C12.8147 13.2441 13.0456 12.5927 13.1866 12.0191C13.3276 11.4455 13.4321 10.7649 13.5002 9.97744L14.1418 10.4004C14.3071 10.5073 14.4359 10.6483 14.5283 10.8233C14.6206 10.9983 14.6668 11.183 14.6668 11.3774V13.9733C14.6668 14.1774 14.5818 14.3379 14.4116 14.4545C14.2415 14.5712 14.0592 14.5906 13.8647 14.5129Z" fill="white" />

                    </Svg>


                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      PROJECTS
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#BCBEC0",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingLeft: 8,
                  }}
                >
                  {data?.project?.map((detail, index) => (
                    <>
                      <View
                        // wrap={true}
                        // wrap={false}
                        key={index}
                        style={{ display: "flex", flexDirection: "row", gap: 16 }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            justifyContent: "space-between",
                            width: "30%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.title}
                          </Text>

                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
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
                            gap: 4,
                            width: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.organization}{" "}
                          </Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.description}{" "}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}

          {data?.internship?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Svg width="26" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                      <Path d="M10.0454 19.1666C15.1061 19.1666 19.2102 15.0625 19.212 9.99993C19.2139 4.93732 15.1129 0.833252 10.0522 0.833252C4.99144 0.833252 0.887391 4.93732 0.88551 9.99993C0.88363 15.0625 4.98463 19.1666 10.0454 19.1666Z" fill={selectedColor} />


                      <Path d="M5.88147 14.5C5.65647 14.5 5.4613 14.4174 5.29597 14.2521C5.13072 14.0868 5.0481 13.8916 5.0481 13.6666V7.83337C5.0481 7.60837 5.13072 7.41321 5.29597 7.24788C5.4613 7.08263 5.65647 7 5.88147 7H8.0481V5.83337C8.0481 5.60837 8.13072 5.41321 8.29597 5.24788C8.4613 5.08263 8.65647 5 8.88147 5H11.2147C11.4397 5 11.6349 5.08263 11.8002 5.24788C11.9655 5.41321 12.0481 5.60837 12.0481 5.83337V7H14.2147C14.4397 7 14.6349 7.08263 14.8002 7.24788C14.9655 7.41321 15.0481 7.60837 15.0481 7.83337V13.6666C15.0481 13.8916 14.9655 14.0868 14.8002 14.2521C14.6349 14.4174 14.4397 14.5 14.2147 14.5H5.88147ZM8.88147 7H11.2147V5.83337H8.88147V7Z" fill="white" />



                    </Svg>


                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      INTERNSHIP
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#BCBEC0",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingLeft: 8,
                  }}
                >
                  {data?.internship?.map((detail, index) => (
                    <>
                      <View
                        // wrap={true}
                        // wrap={false}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 16,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            justifyContent: "space-between",
                            width: "30%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.title}
                          </Text>

                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
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
                            gap: 4,
                            width: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.organization}{" "}
                          </Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.description}{" "}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}

          {data?.course?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M12.9957 24.9166C19.5746 24.9166 24.9099 19.5813 24.9123 12.9999C24.9148 6.41855 19.5835 1.08325 13.0045 1.08325C6.42557 1.08325 1.0903 6.41855 1.08786 12.9999C1.08541 19.5813 6.41671 24.9166 12.9957 24.9166Z" fill={selectedColor} />
                      <Path d="M17.1835 12.0249C15.7052 12.0249 14.5023 13.2278 14.5023 14.7061C14.5023 16.1844 15.7052 17.3872 17.1835 17.3872C18.6618 17.3872 19.8646 16.1844 19.8646 14.7061C19.8646 13.2278 18.6618 12.0249 17.1835 12.0249ZM18.3202 14.2759C17.5408 15.4451 17.7618 15.1137 17.3453 15.7383C17.1956 15.9628 16.8927 16.0223 16.6692 15.8733L15.938 15.3858C15.714 15.2365 15.6537 14.934 15.803 14.7097C15.9523 14.4858 16.2548 14.4255 16.4791 14.5748L16.8045 14.7917C17.5819 13.6257 17.5401 13.6579 17.671 13.5834C18.115 13.3265 18.6056 13.8473 18.3202 14.2759ZM14.9898 17.6292V20.3121C14.9898 20.6856 15.3944 20.921 15.7192 20.7353L17.1835 19.8987L18.6478 20.7353C18.9713 20.9208 19.3771 20.6867 19.3771 20.3121V17.6292C18.0784 18.6063 16.2904 18.6077 14.9898 17.6292ZM18.1584 11.1822V6.25895C18.1584 5.67519 17.6834 5.2002 17.0997 5.2002H8.49259C7.90883 5.2002 7.43384 5.67519 7.43384 6.25895V17.5472C7.43384 18.131 7.90883 18.6059 8.49259 18.6059H14.0148C14.0148 16.5082 14.0116 16.638 14.0225 16.5415C12.3906 13.7437 14.9891 10.3021 18.1584 11.1822ZM10.3587 7.6376H14.5023C14.7717 7.6376 14.9898 7.85575 14.9898 8.12509C14.9898 8.39442 14.7717 8.61257 14.5023 8.61257H10.3587C10.0894 8.61257 9.87125 8.39442 9.87125 8.12509C9.87125 7.85575 10.0894 7.6376 10.3587 7.6376ZM12.7961 12.5124H10.3587C10.0894 12.5124 9.87125 12.2943 9.87125 12.0249C9.87125 11.7556 10.0894 11.5375 10.3587 11.5375H12.7961C13.0655 11.5375 13.2836 11.7556 13.2836 12.0249C13.2836 12.2943 13.0655 12.5124 12.7961 12.5124ZM10.3587 10.5625C10.0894 10.5625 9.87125 10.3443 9.87125 10.075C9.87125 9.80568 10.0894 9.58753 10.3587 9.58753H14.5023C14.7717 9.58753 14.9898 9.80568 14.9898 10.075C14.9898 10.3443 14.7717 10.5625 14.5023 10.5625H10.3587Z" fill="white" />
                    </Svg>


                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      COURSES & CERTIFICATIONS
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#BCBEC0",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingLeft: 8,
                  }}
                >
                  {data?.course?.map((detail, index) => (
                    <>
                      <View
                        // wrap={true}
                        // wrap={false}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 16,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            justifyContent: "space-between",
                            width: "30%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.title}
                          </Text>

                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
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
                            gap: 4,
                            width: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.organization}{" "}
                          </Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.description}{" "}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}

          {data?.extraCaricularData?.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "95%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M12.9957 24.9166C19.5746 24.9166 24.9099 19.5813 24.9123 12.9999C24.9148 6.41855 19.5835 1.08325 13.0045 1.08325C6.42557 1.08325 1.0903 6.41855 1.08786 12.9999C1.08541 19.5813 6.41671 24.9166 12.9957 24.9166Z" fill={selectedColor} />
                      <Path d="M20.4727 9.12879L11.176 6.07056V5.85512C11.176 5.49341 10.8828 5.2002 10.5211 5.2002C10.1594 5.2002 9.86618 5.49341 9.86618 5.85512V18.3287C8.7506 18.4905 7.79716 19.0463 7.22151 19.6826C7.14727 19.7647 7.12834 19.8828 7.17324 19.9839C7.21814 20.0851 7.31844 20.1502 7.42909 20.1502H13.6131C13.7238 20.1502 13.824 20.085 13.8689 19.9839C13.9138 19.8828 13.8949 19.7646 13.8207 19.6826C13.2451 19.0464 12.2915 18.4908 11.176 18.3288V13.0294L20.4727 9.97122C20.6546 9.91139 20.7775 9.74151 20.7775 9.55C20.7776 9.3585 20.6546 9.18865 20.4727 9.12879Z" fill="white" />
                    </Svg>

                    <Text
                      style={{
                        color: "#282829",
                        fontFamily: `${selectedFont} 400`,
                        fontSize: "16px",
                      }}
                    >
                      ACTIVITIES
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "1px",
                      width: "95%",
                      backgroundColor: "#BCBEC0",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingLeft: 8,
                  }}
                >
                  {data?.extraCaricularData?.map((detail, index) => (
                    <>
                      <View
                        // wrap={true}
                        // wrap={false}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 16,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            justifyContent: "space-between",
                            width: "30%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.title}
                          </Text>

                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "9px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.duration?.start?.year !== "Year" &&
                              `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
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
                            gap: 4,
                            width: "70%",
                          }}
                        >
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 700`,
                            }}
                          >
                            {detail.organization}{" "}
                          </Text>
                          <Text
                            style={{
                              color: "#414042",
                              fontSize: "10px",
                              fontFamily: `${selectedFont} 400`,
                            }}
                          >
                            {detail.description}{" "}
                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
          )}





          {data?.section?.length > 0 && (
            <>
              {data.section.map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      width: "95%",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                          width: "100%",
                        }}
                      >
                        <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M12.9999 24.9166C19.5813 24.9166 24.9166 19.5813 24.9166 12.9999C24.9166 6.41852 19.5813 1.08325 12.9999 1.08325C6.41853 1.08325 1.08325 6.41852 1.08326 12.9999C1.08326 19.5813 6.41854 24.9166 12.9999 24.9166Z" fill={selectedColor} />


                          <Path d="M8.59338 18.8501C8.42008 18.8501 8.27553 18.7918 8.15975 18.675C8.04397 18.5581 7.98608 18.4134 7.98608 18.2408V13.5608H7.10858C6.93601 13.5608 6.79128 13.5022 6.6744 13.385C6.55765 13.2677 6.49927 13.1225 6.49927 12.9493C6.49927 12.776 6.55765 12.6315 6.6744 12.5157C6.79128 12.3999 6.93601 12.342 7.10858 12.342H10.0824C10.2551 12.342 10.3998 12.4006 10.5166 12.5179C10.6333 12.635 10.6917 12.7802 10.6917 12.9535C10.6917 13.1268 10.6333 13.2714 10.5166 13.3872C10.3998 13.5029 10.2551 13.5608 10.0824 13.5608H9.20489V18.2408C9.20489 18.4134 9.14627 18.5581 9.02903 18.675C8.91191 18.7918 8.76669 18.8501 8.59338 18.8501ZM8.59338 11.1232C8.42008 11.1232 8.27553 11.0648 8.15975 10.9481C8.04397 10.8313 7.98608 10.6866 7.98608 10.5139V7.75946C7.98608 7.58689 8.0447 7.44216 8.16195 7.32528C8.27919 7.20852 8.42441 7.15015 8.59759 7.15015C8.7709 7.15015 8.91544 7.20852 9.03122 7.32528C9.147 7.44216 9.20489 7.58689 9.20489 7.75946V10.5139C9.20489 10.6866 9.14627 10.8313 9.02903 10.9481C8.91191 11.0648 8.76669 11.1232 8.59338 11.1232ZM11.5937 10.6236C11.421 10.6236 11.2763 10.565 11.1595 10.4477C11.0426 10.3306 10.9842 10.1854 10.9842 10.0121C10.9842 9.83877 11.0426 9.69423 11.1595 9.57844C11.2763 9.46266 11.421 9.40477 11.5937 9.40477H12.4712V7.75946C12.4712 7.58689 12.5298 7.44216 12.6469 7.32528C12.7641 7.20852 12.9094 7.15015 13.0827 7.15015C13.2559 7.15015 13.4004 7.20852 13.5162 7.32528C13.6319 7.44216 13.6898 7.58689 13.6898 7.75946V9.40477H14.5673C14.74 9.40477 14.8848 9.46339 15.0015 9.58064C15.1184 9.69788 15.1768 9.8431 15.1768 10.0163C15.1768 10.1896 15.1184 10.3341 15.0015 10.4499C14.8848 10.5657 14.74 10.6236 14.5673 10.6236H11.5937ZM13.0783 18.8501C12.9051 18.8501 12.7607 18.7918 12.6449 18.675C12.5291 18.5581 12.4712 18.4134 12.4712 18.2408V12.4517C12.4712 12.279 12.5298 12.1343 12.6469 12.0175C12.7641 11.9008 12.9094 11.8424 13.0827 11.8424C13.2559 11.8424 13.4004 11.9008 13.5162 12.0175C13.6319 12.1343 13.6898 12.279 13.6898 12.4517V18.2408C13.6898 18.4134 13.6313 18.5581 13.5141 18.675C13.3969 18.7918 13.2516 18.8501 13.0783 18.8501ZM17.5634 18.8501C17.3901 18.8501 17.2456 18.7918 17.1298 18.675C17.014 18.5581 16.9561 18.4134 16.9561 18.2408V16.571H16.0786C15.9059 16.571 15.7612 16.5125 15.6445 16.3953C15.5277 16.2781 15.4693 16.1328 15.4693 15.9595C15.4693 15.7863 15.5277 15.6418 15.6445 15.5261C15.7612 15.4103 15.9059 15.3524 16.0786 15.3524H19.0525C19.225 15.3524 19.3698 15.411 19.4866 15.5281C19.6034 15.6453 19.6618 15.7906 19.6618 15.9639C19.6618 16.1371 19.6034 16.2816 19.4866 16.3974C19.3698 16.5131 19.225 16.571 19.0525 16.571H18.175V18.2408C18.175 18.4134 18.1163 18.5581 17.9991 18.675C17.8818 18.7918 17.7366 18.8501 17.5634 18.8501ZM17.5634 14.1336C17.3901 14.1336 17.2456 14.0752 17.1298 13.9584C17.014 13.8416 16.9561 13.6968 16.9561 13.5243V7.75946C16.9561 7.58689 17.0148 7.44216 17.132 7.32528C17.2491 7.20852 17.3943 7.15015 17.5677 7.15015C17.741 7.15015 17.8855 7.20852 18.0013 7.32528C18.1171 7.44216 18.175 7.58689 18.175 7.75946V13.5243C18.175 13.6968 18.1163 13.8416 17.9991 13.9584C17.8818 14.0752 17.7366 14.1336 17.5634 14.1336Z" fill="white" />

                        </Svg>

                        <Text
                          style={{
                            color: "#282829",
                            fontFamily: `${selectedFont} 400`,
                            fontSize: "16px",
                          }}
                        >
                          {item.header}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: "1px",
                          width: "95%",
                          backgroundColor: "#BCBEC0",
                        }}
                      ></View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        paddingLeft: 8,
                      }}
                    >
                      {item?.subSection?.map((detail, index) => (
                        <>
                          <View
                            // wrap={true}
                            // wrap={false}
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 16,
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                justifyContent: "space-between",
                                width: "30%",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#414042",
                                  fontSize: "10px",
                                  fontFamily: `${selectedFont} 700`,
                                }}
                              >
                                {detail.title}
                              </Text>

                              <Text
                                style={{
                                  color: "#414042",
                                  fontSize: "9px",
                                  fontFamily: `${selectedFont} 400`,
                                }}
                              >
                                {detail.duration?.start?.year !== "Year" &&
                                  `${detail.duration?.start?.year}-${" "}${detail.currentlyWorking
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
                                gap: 4,
                                width: "70%",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#414042",
                                  fontSize: "10px",
                                  fontFamily: `${selectedFont} 700`,
                                }}
                              >
                                {detail.organization}{" "}
                              </Text>
                              <Text
                                style={{
                                  color: "#414042",
                                  fontSize: "10px",
                                  fontFamily: `${selectedFont} 400`,
                                }}
                              >
                                {detail.description}{" "}
                              </Text>
                            </View>
                          </View>
                        </>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </Page>
  );
}

export default Template32;
