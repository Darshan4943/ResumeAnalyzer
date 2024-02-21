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

function Template24({ data }) {
  return (
    <Page size="A4">
      <View
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          minHeight: "841px",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start-",
            gap: "24px",
          }}
        >
          {data.profilePhoto ? (
            <Image
              src={URL.createObjectURL(data.profilePhoto)}
              style={{
                height: "150px",
                width: "145px",
                objectFit: "contain",
              }}
            />
          ) : (
            <Image
              src="/images/services/black.png"
              style={{
                height: "150px",
                width: "145px",
                objectFit: "contain",
              }}
            />
          )}
          <View
            style={{ height: "100%", width: "3px", backgroundColor: "#F37321" }}
          ></View>
          <View style={{ display: "flex", gap: "8px" }}>
            <View>
              <Text style={{ fontSize: "32px", color: "#434343" ,fontFamily:'Poppins 600'}}>
                {data.firstName ? <>{data.firstName}</> : <>First Name</>}{" "}
                {data.lastName ? <>{data.lastName}</> : <>Last Name</>}
              </Text>
              <Text style={{ fontSize: "14px", color: "#434343",fontFamily:'Poppins 600' }}>
                {data.designation ? <>{data.designation}</> : <>designation</>}
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M12.4729 1.04297C6.46186 1.04297 1.5918 5.92694 1.5918 11.938C1.5918 17.949 6.46186 22.8191 12.4729 22.8191C18.4839 22.8191 23.354 17.949 23.354 11.938C23.3554 5.92694 18.4853 1.04297 12.4729 1.04297ZM12.7248 17.0307C12.5856 17.1698 12.363 17.1698 12.2238 17.0307C12.0847 16.8637 8.70348 13.079 8.70348 10.5048C8.70348 8.41763 10.401 6.73397 12.4743 6.73397C14.5475 6.73397 16.2451 8.41763 16.2451 10.5048C16.2437 13.079 12.8625 16.8637 12.7248 17.0307Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M12.4744 8.59766C11.4308 8.59766 10.582 9.44645 10.582 10.5039C10.582 11.5475 11.4308 12.3963 12.4744 12.3963C13.518 12.3963 14.3668 11.5475 14.3668 10.5039C14.3668 9.44645 13.518 8.59766 12.4744 8.59766Z"
                    fill="#F37321"
                  />
                </Svg>
                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily:'Poppins 700',
                    color: "#696969",
                  }}
                >
                  {data.location ? <>{data.location}</> : <>Your Address</>}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M12.4729 1.04297C6.46186 1.04297 1.5918 5.91301 1.5918 11.9241C1.5918 17.9351 6.46186 22.8191 12.4729 22.8191C18.4839 22.8191 23.354 17.9351 23.354 11.9241C23.354 5.91301 18.4839 1.04297 12.4729 1.04297ZM17.1621 15.3749L15.7985 16.8359C15.7428 16.9054 15.6593 16.975 15.5619 17.0167C15.4645 17.0724 15.3671 17.1002 15.2697 17.1142C15.2558 17.1142 15.2419 17.1142 15.2001 17.1281H15.0749C14.9358 17.1281 14.7271 17.1002 14.4488 17.0585C14.1566 17.0167 13.7948 16.8915 13.3773 16.7106C12.9599 16.5158 12.4868 16.2375 11.9441 15.8618C11.4154 15.4862 10.8449 14.9713 10.2466 14.3173C9.77349 13.8164 9.37001 13.3294 9.06389 12.8702C8.74386 12.3972 8.49337 11.9658 8.29857 11.5762C8.11768 11.1866 7.96463 10.8248 7.86723 10.5048C7.78374 10.1848 7.71419 9.92037 7.67245 9.68383C7.64462 9.44728 7.63067 9.26639 7.64459 9.14116V8.91855C7.6585 8.80723 7.68634 8.70982 7.742 8.5985C7.78374 8.5011 7.85331 8.40371 7.90897 8.34805L9.2726 6.87313C9.37 6.77572 9.4813 6.72007 9.60653 6.72007C9.69002 6.72007 9.77352 6.74789 9.8431 6.80355C9.91267 6.85921 9.96832 6.92877 10.0101 7.01226L11.1093 9.25248C11.1649 9.3638 11.1928 9.48903 11.1649 9.62818C11.1371 9.76732 11.0814 9.89255 10.984 9.98995L10.4831 10.5326C10.4692 10.5465 10.4553 10.5604 10.4553 10.6022C10.4414 10.63 10.4275 10.6578 10.4275 10.6857C10.4553 10.8387 10.5249 11.0057 10.6223 11.2144C10.7058 11.3814 10.831 11.604 10.998 11.8545C11.1649 12.105 11.4154 12.3971 11.7215 12.7311C12.0276 13.065 12.306 13.3294 12.5425 13.5242C12.779 13.7051 12.9878 13.8443 13.1408 13.9277C13.3078 14.0251 13.4191 14.0808 13.5165 14.0947L13.6417 14.1225C13.6556 14.1225 13.6696 14.1086 13.7113 14.1086C13.7391 14.0947 13.753 14.0808 13.7669 14.0669L14.3514 13.4268C14.4766 13.3016 14.6157 13.2459 14.7827 13.2459C14.9079 13.2459 14.9914 13.2738 15.061 13.3155H15.0749L17.0508 14.5678C17.1899 14.6652 17.2734 14.7904 17.3012 14.9296C17.329 15.1105 17.2734 15.2496 17.1621 15.3749Z"
                    fill="#F37321"
                  />
                </Svg>

                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily:'Poppins 700',
                    color: "#696969",
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
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Circle cx="11.4338" cy="10.885" r="10.885" fill="#F37321" />
                  <Path
                    d="M11.6194 11.4383L17.321 6.7308C17.2996 6.72458 17.2782 6.71991 17.2568 6.7168H5.98047L11.6194 11.4383Z"
                    fill="white"
                  />
                  <Path
                    d="M11.8945 12.3513C11.7354 12.4851 11.5044 12.4851 11.3453 12.3513L5.54883 7.49609V15.0946C5.54883 15.3388 5.74312 15.5347 5.9833 15.5347H17.2596C17.4998 15.5347 17.6941 15.3372 17.6941 15.0946V7.56141L11.8945 12.3513Z"
                    fill="white"
                  />
                </Svg>

                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily:'Poppins 700',
                    color: "#696969",
                  }}
                >
                  {data.email ? <>{data.email}</> : <>Your Email</>}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M10.2342 13.6627H12.1293V12.2754H10.0547C10.0742 12.7638 10.1368 13.2313 10.2342 13.6627Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M12.13 16.3945V14.3574H10.4297C10.8026 15.4372 11.4162 16.2039 12.13 16.3945Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M10.0547 11.5806H12.1293V10.1934H10.2342C10.1368 10.6261 10.0742 11.0922 10.0547 11.5806Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M10.4297 9.50052H12.13V7.46484C11.4162 7.65547 10.8026 8.42076 10.4297 9.50052Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M9.53332 10.1934H8.31304C8.13216 10.6261 8.01804 11.0922 7.98047 11.5806H9.36219C9.38167 11.0978 9.44009 10.6317 9.53332 10.1934Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M10.5325 7.85938C9.77281 8.22393 9.12995 8.79443 8.67773 9.49989H9.71716C9.91892 8.864 10.1972 8.30464 10.5325 7.85938Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M8.67773 14.3574C9.12995 15.0629 9.77281 15.6348 10.5325 15.9979C10.1972 15.5527 9.91891 14.9933 9.71576 14.3574H8.67773Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M16.2786 9.49989C15.8264 8.79443 15.1836 8.22393 14.4238 7.85938C14.7606 8.30464 15.0375 8.864 15.2406 9.49989H16.2786Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M9.36219 12.2754H7.98047C8.01665 12.7638 8.13216 13.2313 8.31304 13.6627H9.53332C9.44009 13.2243 9.38167 12.7596 9.36219 12.2754Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M15.4219 13.6627H16.6408C16.8203 13.2299 16.9358 12.7638 16.9734 12.2754H15.5916C15.5736 12.7596 15.5151 13.2243 15.4219 13.6627Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M15.4219 10.1934C15.5151 10.6317 15.5736 11.0978 15.593 11.5806H16.9748C16.9386 11.0922 16.8231 10.6247 16.6422 10.1934H15.4219Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M14.4219 15.9979C15.1816 15.6334 15.8259 15.0629 16.2767 14.3574H15.2387C15.0369 14.9947 14.7572 15.5527 14.4219 15.9979Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M12.8242 7.46484V9.50052H14.5245C14.1516 8.42076 13.5366 7.65547 12.8242 7.46484Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M12.4771 1.04297C6.46463 1.04297 1.5918 5.91722 1.5918 11.9283C1.5918 17.9407 6.46602 22.8149 12.4771 22.8149C18.4881 22.8149 23.3623 17.9407 23.3623 11.9283C23.3623 5.91722 18.4895 1.04297 12.4771 1.04297ZM17.6811 11.9296V12.2761H17.6686C17.4974 14.8739 15.4214 16.95 12.8236 17.1211V17.1336H12.4771H12.1306V17.1211C9.53278 16.95 7.45675 14.8739 7.2856 12.2761H7.27308V11.9296V11.5832H7.2856C7.45675 8.98535 9.53278 6.9093 12.1306 6.73815V6.72563H12.4771H12.8236V6.73815C15.4214 6.9093 17.4974 8.98535 17.6686 11.5832H17.6811V11.9296Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M12.8242 14.3574V16.3945C13.5366 16.2039 14.1516 15.4372 14.5245 14.3574H12.8242Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M14.8989 12.2754H12.8242V13.6627H14.7194C14.8168 13.2313 14.8794 12.7638 14.8989 12.2754Z"
                    fill="#F37321"
                  />
                  <Path
                    d="M14.7194 10.1934H12.8242V11.5806H14.8989C14.878 11.0922 14.8168 10.6261 14.7194 10.1934Z"
                    fill="#F37321"
                  />
                </Svg>

                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily:'Poppins 700',
                    color: "#696969",
                  }}
                >
                  {data.location ? <>{data.link}</> : <>Your Website</>}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            gap: "18px",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View style={{ display: "flex", gap: "18px", width: "100%" }}>
            <View
              style={{
                backgroundColor: "#FBEDE4",
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderTopLeftRadius: "24px",
                borderBottomRightRadius: "24px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily:'Poppins 600',
                  color: "#434343",
                }}
              >
                Profile
              </Text>
              <View
                style={{
                  height: "2px",
                  width: "45.49px",
                  backgroundColor: "#434343",
                }}
              ></View>
              <Text
                style={{
                  fontSize: "12px",
                  fontFamily:'Poppins 400',
                  color: "#696969",
                }}
              >
                {data.summery ? <>{data.summery}</> : <>About you</>}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#FBEDE4",
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderTopLeftRadius: "24px",
                borderBottomRightRadius: "24px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily:'Poppins 600',
                  color: "#434343",
                }}
              >
                Experience
              </Text>
              <View
                style={{
                  height: "2px",
                  width: "45.49px",
                  backgroundColor: "#434343",
                }}
              ></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {data?.experience?.map((detail, index) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "12px",
                          fontFamily:'Poppins 700',
                          color: "#696969",
                        }}
                      >
                        {data.designation}
                      </Text>
                      <View
                        style={{
                          width: "40%",
                          height: "1px",
                          backgroundColor: "#696969",
                        }}
                      ></View>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontFamily:'Poppins 600',
                          color: "#F37321",
                        }}
                      >
                        {detail.duration?.start?.year}-{" "}
                        {detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "12px",
                          fontFamily:'Poppins 700',
                          color: "#696969",
                        }}
                      >
                        {detail.organization}
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontFamily:'Poppins 400',
                          color: "#696969",
                          width: "80%",
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={{ display: "flex", gap: "18px", width: "100%" }}>
            <View
              style={{
                backgroundColor: "#FBEDE4",
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderTopLeftRadius: "24px",
                borderBottomRightRadius: "24px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily:'Poppins 600',
                  color: "#434343",
                }}
              >
                Education
              </Text>
              <View
                style={{
                  height: "2px",
                  width: "45.49px",
                  backgroundColor: "#434343",
                }}
              ></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {data?.education?.map((detail, index) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily:'Poppins 400',
                        color: "#F37321",
                      }}
                    >
                      {detail.qualification}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "14px",
                          fontFamily:'Poppins 400',
                          color: "#696969",
                        }}
                      >
                        {detail.instituteName}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontFamily:'Poppins 400',
                          color: "#696969",
                        }}
                      >
                        {detail.duration?.start?.year}-
                        {detail.duration?.end?.year}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#FBEDE4",
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderTopLeftRadius: "24px",
                borderBottomRightRadius: "24px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily:'Poppins 600',
                  color: "#434343",
                }}
              >
                Skills
              </Text>
              <View
                style={{
                  height: "2px",
                  width: "45.49px",
                  backgroundColor: "#434343",
                }}
              ></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {data?.skills?.map((detail, index) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "45%",
                      gap: "4px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        fontFamily:'Poppins 600',
                        color: "#696969",
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      {detail.skill}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                        width: "40%",
                      }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <View key={i}>
                          {detail.rating[i] === 0 ? (
                            <Svg
                              width="6"
                              height="6"
                              viewBox="0 0 6 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M5.81685 3.0002C5.81685 4.54836 4.56207 5.80314 3.01391 5.80314C1.46576 5.80314 0.210938 4.54836 0.210938 3.0002C0.210938 1.45205 1.46576 0.197267 3.01391 0.197267C4.56207 0.195933 5.81685 1.45205 5.81685 3.0002Z"
                                fill="#F37321"
                              />
                            </Svg>
                          ) : (
                            <Svg
                              width="6"
                              height="6"
                              viewBox="0 0 6 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M5.60587 3.0002C5.60587 4.54836 4.35109 5.80314 2.80294 5.80314C1.25478 5.80314 0 4.54836 0 3.0002C0 1.45205 1.25478 0.197267 2.80294 0.197267C4.35109 0.195933 5.60587 1.45205 5.60587 3.0002Z"
                                fill="#434343"
                              />
                            </Svg>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#FBEDE4",
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderTopLeftRadius: "24px",
                borderBottomRightRadius: "24px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily:'Poppins 600',
                  color: "#434343",
                }}
              >
                Languages
              </Text>
              <View
                style={{
                  height: "2px",
                  width: "45.49px",
                  backgroundColor: "#434343",
                }}
              ></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {data?.languages?.map((detail, index) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "45%",
                      gap: "4px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        fontFamily:'Poppins 600',
                        color: "#696969",
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      {detail.languages}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                        width: "40%",
                      }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <View key={i}>
                          {detail.rating[i] === 0 ? (
                            <Svg
                              width="6"
                              height="6"
                              viewBox="0 0 6 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M5.81685 3.0002C5.81685 4.54836 4.56207 5.80314 3.01391 5.80314C1.46576 5.80314 0.210938 4.54836 0.210938 3.0002C0.210938 1.45205 1.46576 0.197267 3.01391 0.197267C4.56207 0.195933 5.81685 1.45205 5.81685 3.0002Z"
                                fill="#F37321"
                              />
                            </Svg>
                          ) : (
                            <Svg
                              width="6"
                              height="6"
                              viewBox="0 0 6 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M5.60587 3.0002C5.60587 4.54836 4.35109 5.80314 2.80294 5.80314C1.25478 5.80314 0 4.54836 0 3.0002C0 1.45205 1.25478 0.197267 2.80294 0.197267C4.35109 0.195933 5.60587 1.45205 5.60587 3.0002Z"
                                fill="#434343"
                              />
                            </Svg>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#FBEDE4",
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderTopLeftRadius: "24px",
                borderBottomRightRadius: "24px",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily:'Poppins 600',
                  color: "#434343",
                }}
              >
                Hobbies
              </Text>
              <View
                style={{
                  height: "2px",
                  width: "45.49px",
                  backgroundColor: "#434343",
                }}
              ></View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {data?.hobbies?.map((item, index) => (
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily:'Poppins 600',
                      color: "#696969",
                    }}
                  >
                    {item?.title}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template24;
