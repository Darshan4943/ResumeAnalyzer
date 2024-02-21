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

function Template31({ data }) {
  return (
    <Page size="A4">
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "841px",
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "139px",
            backgroundColor: "#1D2028",

            height: "100%",
            width: "229px",
          }}
        >
          <View
            style={{ display: "flex", position: "relative", width: "100%" }}
          >
            <Svg
              width="120"
              height="120"
              viewBox="0 0 153 155"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path d="M152.508 0H0V154.054H152.508V0Z" fill="#227CFF" />
            </Svg>
            <View
              style={{
                position: "absolute",
                top: "40px",
                left: "40px",
                borderRadius: "30px",
                overflow: "hidden",
              }}
            >
              {data.profilePhoto ? (
                <Image
                  src={URL.createObjectURL(data.profilePhoto)}
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "contain",
                    borderRadius: "30px",
                  }}
                />
              ) : (
                <Image
                  src="/images/services/black.png"
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "contain",
                    borderRadius: "30px",
                  }}
                />
              )}
            </View>
          </View>

          <View
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingRight: "40px",
              }}
            >
              <Svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M34 0H0V22H34V0Z" fill="#227CFF" />
              </Svg>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily:'Poppins 600',
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Experience
                </Text>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {data?.experience?.map((detail, index) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily:'Poppins 700',
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#227CFF",
                          }}
                        >
                          {data.designation}
                        </Text>
                        <Text
                          style={{
                            fontFamily:'Poppins 600',
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#FFFFFF",
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
                          fontFamily:'Poppins 300',
                          fontSize: "11px",
                          color: "#FFFFFF",
                          width: "100%",
                        }}
                      >
                        {detail.description}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingRight: "40px",
              }}
            >
              <Svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M34 0H0V22H34V0Z" fill="#227CFF" />
              </Svg>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily:'Poppins 600',
                    fontSize: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  Contact
                </Text>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                    }}
                  >
                    <Svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M7.99922 1.42188C5.35957 1.42188 3.19922 3.66714 3.19922 6.44916C3.19922 9.88077 7.50334 14.9269 7.68014 15.1497C7.85695 15.3348 8.14011 15.3348 8.3183 15.1497C8.4951 14.9269 12.7992 9.88077 12.7992 6.44916C12.7992 3.66569 10.6389 1.42188 7.99922 1.42188ZM7.99922 8.97226C6.67042 8.97226 5.59024 7.8409 5.59024 6.44916C5.59024 5.03862 6.67042 3.90726 7.99922 3.90726C9.32803 3.90726 10.4082 5.03862 10.4082 6.44916C10.4082 7.8409 9.32803 8.97226 7.99922 8.97226Z"
                        fill="#227CFF"
                      />
                    </Svg>
                    <Text
                      style={{
                        fontFamily:'Poppins 300',
                        fontSize: "12px",
                        fontWeight: "300",
                        color: "#FFFFFF",
                      }}
                    >
                      {data.location ? <>{data.location}</> : <>Your Address</>}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                    }}
                  >
                    <Svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M14.8487 12.3168C14.8884 12.5544 14.809 12.7389 14.6517 12.9042L12.7182 14.8286C12.6387 14.9201 12.5212 15.0116 12.3829 15.0662C12.2447 15.14 12.1065 15.1769 11.9683 15.1946C11.9492 15.1946 11.9285 15.1946 11.8698 15.2123H11.6918C11.4948 15.2123 11.1977 15.1754 10.8037 15.1208C10.389 15.0662 9.87587 14.9009 9.28326 14.6618C8.69065 14.405 8.02019 14.039 7.25123 13.5432C6.50134 13.0488 5.69266 12.37 4.84267 11.5082C4.17222 10.8485 3.59868 10.2065 3.16494 9.60149C2.71056 8.97872 2.35626 8.41051 2.07982 7.89694C1.82403 7.38338 1.60637 6.90672 1.46815 6.48612C1.34899 6.06406 1.25049 5.71573 1.1917 5.40434C1.15198 5.09296 1.13291 4.85396 1.15198 4.69015V4.39642C1.17105 4.25032 1.21077 4.12192 1.2902 3.97434C1.34899 3.84595 1.44749 3.71756 1.52693 3.64377L3.46045 1.70026C3.59867 1.57187 3.75596 1.49805 3.9339 1.49805C4.05306 1.49805 4.17063 1.53496 4.26913 1.60875C4.36764 1.68253 4.44707 1.77399 4.50585 1.8832L6.06443 4.83472C6.14387 4.98082 6.18359 5.14614 6.14387 5.32913C6.10415 5.51213 6.02471 5.67741 5.88807 5.8058L5.1779 6.52008C5.15884 6.53779 5.13818 6.55699 5.13818 6.6116C5.11911 6.64849 5.09846 6.68531 5.09846 6.72221C5.13818 6.92439 5.23669 7.14434 5.37491 7.41883C5.49406 7.63872 5.67042 7.93237 5.90714 8.26147C6.14387 8.59204 6.49975 8.97577 6.93348 9.41702C7.36721 9.85679 7.76282 10.205 8.09805 10.4618C8.43327 10.6994 8.73037 10.8839 8.94644 10.9931C9.18317 11.1215 9.34046 11.1953 9.47868 11.213L9.65662 11.2498C9.67568 11.2498 9.69634 11.2322 9.75512 11.2322C9.79484 11.2145 9.8139 11.1953 9.83456 11.1776L10.6639 10.3349C10.8418 10.1696 11.0388 10.0973 11.2756 10.0973C11.4535 10.0973 11.5711 10.1342 11.6696 10.1888H11.6886L14.4912 11.8387C14.6914 11.9686 14.8106 12.1338 14.8487 12.3168Z"
                        fill="#227CFF"
                      />
                    </Svg>

                    <Text
                      style={{
                        fontFamily:'Poppins 300',
                        fontSize: "12px",
                        fontWeight: "300",
                        color: "#FFFFFF",
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
                      gap: "8px",
                    }}
                  >
                    <Svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M14.84 7.89662C14.6201 4.46807 11.8888 1.73674 8.46026 1.51685V1.49805H7.54308V1.51685C4.13332 1.73674 1.38323 4.46807 1.16334 7.89662H1.14453V8.81376H1.16334C1.38323 12.2235 4.13332 14.9736 7.54308 15.1935V15.2123H8.46026V15.1935C11.8888 14.9736 14.6201 12.2235 14.84 8.81376H14.8588V7.89662H14.84ZM5.43531 2.98381C4.99553 3.57115 4.62808 4.30315 4.37202 5.14654H2.9977C3.60095 4.21201 4.44435 3.45976 5.43531 2.98381ZM2.5203 6.06368H4.13332C4.00457 6.65102 3.93224 7.25576 3.89462 7.89662H2.07907C2.13404 7.25576 2.2816 6.63221 2.5203 6.06368ZM2.07907 8.81376H3.89462C3.93079 9.43726 4.00457 10.0608 4.13332 10.6293H2.5203C2.2816 10.0608 2.13404 9.45462 2.07907 8.81376ZM2.99625 11.545H4.37057C4.62663 12.3884 4.99408 13.1219 5.43386 13.7078C4.44435 13.2318 3.60095 12.4796 2.99625 11.545ZM7.54308 14.2402C6.60855 13.9841 5.80132 12.9758 5.30656 11.545H7.54308V14.2402ZM7.54308 10.6293H5.04905C4.9203 10.0608 4.84797 9.45607 4.81035 8.81376H7.54164L7.54308 10.6293ZM7.54308 7.89662H4.8118C4.84797 7.25431 4.92175 6.63076 5.0505 6.06368H7.54453L7.54308 7.89662ZM7.54308 5.14654H5.30656C5.80132 3.73461 6.60855 2.70744 7.54308 2.47019V5.14654ZM13.0071 5.14654H11.6501C11.3753 4.30315 11.0078 3.5697 10.568 2.98381C11.5764 3.45976 12.4198 4.21201 13.0071 5.14654ZM8.46026 2.47019C9.3948 2.72625 10.2208 3.73461 10.6968 5.14654H8.46026V2.47019ZM8.46026 6.06368H10.9543C11.0831 6.63221 11.1742 7.25576 11.193 7.89662H8.46171V6.06368H8.46026ZM8.46026 8.81376H11.1915C11.1727 9.45462 11.0816 10.0608 10.9529 10.6293H8.45882L8.46026 8.81376ZM8.46026 14.2402V11.545H10.6968C10.2194 12.9758 9.3948 13.9841 8.46026 14.2402ZM10.568 13.7093C11.0078 13.1219 11.3753 12.3899 11.6501 11.5465H13.0071C12.4198 12.4796 11.5764 13.2319 10.568 13.7093ZM13.483 10.6293H11.8874C12.0161 10.0608 12.0885 9.43726 12.1073 8.81376H13.9228C13.8867 9.45462 13.7217 10.0608 13.483 10.6293ZM12.1087 7.89662C12.0899 7.25431 12.0176 6.64957 11.8888 6.06368H13.4845C13.7232 6.63221 13.8881 7.25576 13.9243 7.89662H12.1087Z"
                        fill="#227CFF"
                      />
                    </Svg>

                    <Text
                      style={{
                        fontFamily:'Poppins 300',
                        fontSize: "12px",
                        fontWeight: "300",
                        color: "#FFFFFF",
                      }}
                    >
                      {data.sociaLinks ? <>{data.sociaLinks}</> : <>Your Website</>}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "366px",
            height: "100%",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          <View
            style={{
              display: "flex",
              paddingTop: "60px",
              paddingLeft: "40px",
              paddingRight: "40px",
              gap: "4px",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily:'Poppins 600',
                  fontSize: "36px",
                  color: "#1D2028",
                }}
              >
                {data.firstName ? <>{data.firstName}</> : <>First Name</>}{" "}
                {data.lastName ? <>{data.lastName}</> : <>Last Name</>}
              </Text>
              <Text
                style={{
                  fontSize: "24px",
                  fontFamily:'Poppins 600',
                  color: "#227CFF",
                }}
              >
                {data.designation ? <>{data.designation}</> : <>Designation</>}
              </Text>
            </View>
          </View>
          <View
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingRight: "40px",
              }}
            >
              <Svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M34 0H0V22H34V0Z" fill="#227CFF" />
              </Svg>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "20px",
                      fontFamily:'Poppins 600',
                      color: "#1D2028",
                    }}
                  >
                    Profile
                  </Text>
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:'Poppins 300',
                      color: "#1D2028",
                    }}
                  >
                    {data.summery ? <>{data.summery}</> : <>About you</>}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingRight: "40px",
              }}
            >
              <Svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M34 0H0V22H34V0Z" fill="#227CFF" />
              </Svg>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "20px",
                      fontFamily:'Poppins 600',
                      color: "#1D2028",
                    }}
                  >
                    Education
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {data?.education?.map((detail, index) => (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "12px",
                            fontFamily:'Poppins 300',
                            color: "#1D2028",
                          }}
                        >
                          {detail.duration?.start?.year}-
                          {detail.duration?.end?.year}
                        </Text>
                        <Text
                          style={{
                            fontSize: "12px",
                            fontFamily:'Poppins 700',
                            color: "#227CFF",
                          }}
                        >
                          {detail.qualification}
                        </Text>
                        <Text
                          style={{
                            fontSize: "11px",
                            ffontFamily:'Poppins 700',
                            color: "#1D2028",
                          }}
                        >
                          {detail.instituteName}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingRight: "40px",
              }}
            >
              <Svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M34 0H0V22H34V0Z" fill="#227CFF" />
              </Svg>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "20px",
                      fontFamily:'Poppins 600',
                      color: "#1D2028",
                    }}
                  >
                    Expertise
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <View
                      style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "12px",
                          fontFamily:'Poppins 700',
                          color: "#227CFF",
                        }}
                      >
                        Adobe Illustrator
                      </Text>
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:'Poppins 300',
                          color: "#1D2028",
                        }}
                      >
                        Loremipsumdolorsitamet,consectetueradipiscingelit
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template31;
