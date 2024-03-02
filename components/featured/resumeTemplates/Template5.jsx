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
function Template5({ data, selectedColor, selectedFont }) {

  return (
    <Page size="A4">
      <View
        style={{
          display: "flex",
          flexDirection: "row",

          minHeight: "841px",
        }}
      >
        <View
          style={{
            width: "232.61px",
            height: "100%",
          }}
        >
          <View>
            {data.profilePhoto ? (
              <Image
                src={URL.createObjectURL(data.profilePhoto)}
                style={{
                  height: "230.24px",
                  width: "183.71px",
                  objectFit: "contain",
                  paddingTop: "33.72px",
                  paddingLeft: "27.74px",
                }}
              />
            ) : (
              <Image
                src="/images/services/black.png"
                style={{
                  height: "230.24px",
                  width: "183.71px",
                  paddingTop: "33.72px",
                  paddingLeft: "27.74px",
                }}
              />
            )}
          </View>

          <View>
            <View
              style={{
                width: "100%",
                height: "29.2px",
                backgroundColor: selectedColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "39.93px",
              }}
            >
              <Text
                style={{
                  fontSize: "17px",
                  fontFamily: `${selectedFont} 400`,
                  color: "#F9F9F9",
                }}
              >
                CONTACT
              </Text>
            </View>
            <View
              style={{
                marginTop: "25.23px",
              }}
            >
              <View
                style={{
                  paddingLeft: "28.14px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <Svg width={15} height={16} viewBox="0 0 15 16" fill="none">
                  <Path
                    d="M14.6092 11.5145L12.3132 9.21849C12.0682 8.97349 11.7532 8.8465 11.4262 8.8625C11.0962 8.8785 10.7722 9.0365 10.4892 9.3195C9.64022 10.1685 9.07222 10.5935 8.59223 10.7395C8.12323 10.8825 7.69722 10.7705 7.12122 10.3525C6.97722 10.2475 6.77622 10.2795 6.67122 10.4235C6.56622 10.5675 6.59923 10.7685 6.74323 10.8735C7.48323 11.4105 8.11122 11.5595 8.78022 11.3555C9.16523 11.2385 9.56422 11.0055 10.0522 10.6005L13.1372 13.6855C11.2962 14.7995 7.74022 15.9155 3.65322 11.8465C-0.416776 7.75848 0.698224 4.20249 1.81322 2.36149L4.89823 5.44648C4.49423 5.93448 4.26122 6.33249 4.14322 6.71849C3.93922 7.38749 4.08823 8.01551 4.62523 8.75551C4.73023 8.89951 4.93122 8.93149 5.07522 8.82649C5.21922 8.72149 5.25123 8.52051 5.14623 8.37651C4.72823 7.80051 4.61623 7.3745 4.75923 6.9055C4.90523 6.4255 5.33022 5.8585 6.18022 5.0085C6.75622 4.4325 6.79722 3.69949 6.28222 3.18449L3.98622 0.888501C3.92822 0.828501 3.57923 0.494491 3.01923 0.546491C2.44223 0.600491 1.88423 1.04549 1.36023 1.86949C0.767225 2.80249 0.0742252 4.3045 0.141225 6.1635C0.217225 8.2755 1.24522 10.3405 3.19822 12.3025C5.15922 14.2545 7.22422 15.2825 9.33622 15.3585C9.42022 15.3615 9.50222 15.3635 9.58523 15.3635C11.3292 15.3635 12.7392 14.7055 13.6302 14.1395C14.4552 13.6155 14.9002 13.0575 14.9532 12.4805C15.0032 11.9225 14.6692 11.5725 14.6092 11.5145ZM3.06722 1.19148C3.32922 1.16248 3.49923 1.31751 3.52023 1.33751C3.52323 1.34051 3.52223 1.33949 3.52623 1.34349L5.82522 3.6425C6.08322 3.9005 6.04623 4.23249 5.72323 4.55549C5.57923 4.69949 5.44722 4.8355 5.32522 4.9655L2.18223 1.82249C2.56023 1.34949 2.86422 1.21348 3.06722 1.19148ZM14.3092 12.4225C14.2902 12.6275 14.1572 12.9355 13.6772 13.3175L10.5342 10.1745C10.6642 10.0525 10.8012 9.9195 10.9442 9.7765C11.1122 9.6085 11.2902 9.51548 11.4572 9.50648C11.6392 9.49748 11.7752 9.59248 11.8562 9.67448L14.1552 11.9735C14.1582 11.9765 14.1602 11.9785 14.1632 11.9815C14.1652 11.9825 14.3342 12.1535 14.3092 12.4225Z"
                    fill={selectedColor}
                  />
                  <Path
                    d="M5.84544 9.33203C5.66744 9.33203 5.52344 9.47602 5.52344 9.65402C5.52344 9.83202 5.66744 9.97604 5.84544 9.97604C6.02344 9.97604 6.16744 9.83202 6.16744 9.65402C6.16744 9.47602 6.02344 9.33203 5.84544 9.33203Z"
                    fill={selectedColor}
                  />
                </Svg>

                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily: `${selectedFont} 300`,
                    color: "#414142",
                  }}
                >
                  {data.mobileNumber}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: "25.23px",
              }}
            >
              <View
                style={{
                  paddingLeft: "28.14px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <Svg width={17} height={11} viewBox="0 0 17 11" fill="none">
                  <Path
                    d="M15.8194 0.503459H1.20543C1.08343 0.481459 0.956432 0.527461 0.879432 0.624461C0.816432 0.703461 0.791433 0.807467 0.811433 0.905467V10.3345C0.811433 10.5225 0.964431 10.6744 1.15143 10.6744H8.09743C8.28543 10.6744 8.43743 10.5215 8.43743 10.3345C8.43743 10.1465 8.28443 9.99446 8.09743 9.99446H2.05243L6.56643 6.02845C7.12243 6.42745 7.79843 6.64546 8.48143 6.64546C8.48543 6.64546 8.48943 6.64546 8.49343 6.64546C9.17543 6.64546 9.85043 6.42747 10.4064 6.03047L14.9194 9.99446H11.2904C11.1024 9.99446 10.9504 10.1475 10.9504 10.3345C10.9504 10.5225 11.1034 10.6744 11.2904 10.6744H15.8214C15.9904 10.6734 16.1344 10.5465 16.1574 10.3805L16.1584 10.3735C16.1594 10.3655 16.1594 10.3585 16.1604 10.3505C16.1604 10.3475 16.1604 10.3445 16.1604 10.3415V10.3365V0.842448C16.1604 0.655448 16.0074 0.503459 15.8194 0.503459ZM6.03643 5.58747L1.49143 9.58146V1.59645L6.03643 5.58747ZM14.9164 1.18345L10.2094 5.31846C9.74143 5.72746 9.14043 5.95746 8.51943 5.96446C8.50943 5.96446 8.49943 5.96446 8.48843 5.96446C7.88343 5.96446 7.29543 5.75446 6.82843 5.37046C6.82043 5.36046 6.81343 5.35146 6.80543 5.34346C6.78143 5.31846 6.75343 5.29747 6.72343 5.28047L2.05443 1.18248L14.9164 1.18345ZM15.4794 1.59547V9.58146L10.9334 5.58946L15.4794 1.59547Z"
                    fill={selectedColor}
                  />
                  <Path
                    d="M9.77787 9.99414H9.13688C8.94888 9.99414 8.79688 10.1471 8.79688 10.3341C8.79688 10.5221 8.94988 10.6741 9.13688 10.6741H9.77787C9.96587 10.6741 10.1179 10.5211 10.1179 10.3341C10.1189 10.1471 9.96587 9.99414 9.77787 9.99414Z"
                    fill={selectedColor}
                  />
                </Svg>

                {data.email && (
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily: `${selectedFont} 300`,
                      color: "#414142",
                    }}
                  >
                    {data.email}
                  </Text>
                )}
              </View>
            </View>
            {/* <View
              style={{
                marginTop: "25.23px",
              }}
            >
              <View
                style={{
                  paddingLeft: "28.14px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <Svg width={17} height={16} viewBox="0 0 17 16" fill="none">
                  <Path
                    d="M12.9293 13.4733C12.7833 13.5943 12.6233 13.7133 12.4563 13.8273C12.3473 13.9013 12.2812 14.0243 12.2812 14.1563C12.2812 14.3743 12.4593 14.5523 12.6783 14.5523C12.7583 14.5523 12.8343 14.5283 12.9003 14.4843C13.0923 14.3543 13.2713 14.2183 13.4473 14.0743C13.6113 13.9303 13.6283 13.6783 13.4863 13.5153C13.3433 13.3483 13.0943 13.3303 12.9293 13.4733Z"
                    fill={selectedColor}
                  />
                  <Path
                    d="M15.5797 4.86347C14.3367 2.17047 11.6167 0.400465 8.66269 0.354465C8.64169 0.350465 8.62069 0.351451 8.58569 0.352451H8.49969V0.533451L8.44969 0.353458C5.47869 0.396458 2.75269 2.16644 1.50569 4.86444C1.04069 5.88444 0.804688 6.96945 0.804688 8.08945C0.804688 9.20945 1.04069 10.2945 1.50569 11.3155C2.74869 14.0085 5.46869 15.7785 8.41969 15.8245C8.46169 15.8295 8.50569 15.8285 8.55469 15.8285C9.57169 15.8285 10.5627 15.6315 11.5027 15.2415C11.7007 15.1555 11.7937 14.9325 11.7147 14.7325C11.6357 14.5295 11.4077 14.4305 11.1977 14.5095C10.9877 14.5965 10.7717 14.6734 10.5517 14.7394C11.0737 14.1164 11.5097 13.2504 11.8307 12.1924C12.7047 12.0894 13.5837 11.9375 14.4497 11.7415C14.3057 11.9755 14.1457 12.2025 13.9727 12.4185C13.8467 12.5875 13.8737 12.8245 14.0337 12.9605C14.1137 13.0295 14.2237 13.0635 14.3237 13.0525C14.4297 13.0435 14.5247 12.9935 14.5967 12.9085C14.9697 12.4405 15.2927 11.9185 15.5337 11.3915C15.5717 11.3435 15.5977 11.2914 15.6107 11.2354C16.5177 9.20245 16.5077 6.88247 15.5797 4.86347ZM10.9507 12.2835C10.4487 13.7425 9.71569 14.7174 8.93969 14.9684V12.3724C9.61769 12.3674 10.2907 12.3385 10.9507 12.2835ZM8.93969 11.5785V8.48545H11.5947C11.5667 9.52245 11.4297 10.5455 11.1947 11.4645C10.4467 11.5355 9.68969 11.5745 8.93969 11.5785ZM14.9317 5.36545C15.2467 6.10745 15.4287 6.88945 15.4747 7.69245H12.3887C12.3657 6.67845 12.2507 5.71045 12.0477 4.80945C13.0137 4.93745 13.9817 5.12345 14.9317 5.36545ZM8.93969 3.80747V1.21045C9.71569 1.46045 10.4477 2.43645 10.9507 3.89545C10.2837 3.83945 9.60969 3.81047 8.93969 3.80747ZM11.5947 7.69245H8.93969V4.60047C9.68969 4.60347 10.4467 4.64245 11.1947 4.71445C11.4297 5.63245 11.5667 6.65545 11.5947 7.69245ZM11.8317 3.98545C11.5137 2.93745 11.0827 2.07646 10.5657 1.45346C12.1777 1.94546 13.5557 3.00146 14.4477 4.43546C13.5867 4.24146 12.7087 4.08945 11.8317 3.98545ZM15.4747 8.48545C15.4297 9.28845 15.2467 10.0704 14.9317 10.8124C13.9817 11.0554 13.0127 11.2414 12.0477 11.3684C12.2507 10.4684 12.3647 9.50045 12.3887 8.48545H15.4747ZM8.14669 12.3715V14.9684C7.37169 14.7184 6.63969 13.7425 6.13569 12.2835C6.79469 12.3385 7.46869 12.3675 8.14669 12.3715ZM5.25469 12.1924C5.57169 13.2404 6.00369 14.1015 6.52069 14.7245C4.90769 14.2325 3.53069 13.1765 2.63969 11.7425C3.50569 11.9385 4.38369 12.0894 5.25469 12.1924ZM8.14669 8.48545V11.5785C7.39669 11.5745 6.63969 11.5355 5.89169 11.4645C5.65769 10.5435 5.51969 9.51945 5.49169 8.48545H8.14669ZM5.03869 4.80945C4.83569 5.70945 4.72069 6.67745 4.69769 7.69245H1.61269C1.65769 6.88745 1.84069 6.10545 2.15469 5.36545C3.10369 5.12345 4.07269 4.93745 5.03869 4.80945ZM2.63869 4.43647C3.53169 3.00347 4.90869 1.94744 6.51969 1.45444C6.00269 2.07744 5.57169 2.93745 5.25369 3.98645C4.37769 4.08945 3.49969 4.24147 2.63869 4.43647ZM8.14669 4.60047V7.69245H5.49169C5.51969 6.65845 5.65669 5.63545 5.89169 4.71445C6.63969 4.64245 7.39669 4.60447 8.14669 4.60047ZM6.13569 3.89545C6.63969 2.43645 7.37169 1.46145 8.14669 1.21045V3.80747C7.47669 3.81047 6.80269 3.83945 6.13569 3.89545ZM2.15469 10.8124C1.83969 10.0704 1.65769 9.28945 1.61169 8.48545H4.69669C4.71969 9.50045 4.83469 10.4674 5.03769 11.3684C4.07269 11.2414 3.10369 11.0544 2.15469 10.8124Z"
                    fill={selectedColor}
                  />
                </Svg>

                {data.mobileNumber && (
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily: `${selectedFont} 300`,
                      color: "#414142",
                    }}
                  >
                    {data.sociaLinks.map((detail, index) => (
                      <>{detail.link}</>
                    ))}
                  </Text>
                )}
              </View>
            </View> */}
            <View
              style={{
                marginTop: "25.23px",
              }}
            >
              <View
                style={{
                  paddingLeft: "28.14px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <Svg width={17} height={21} viewBox="0 0 17 21" fill="none">
                  <Path
                    d="M8.48269 0.630859C4.24868 0.630859 0.804688 4.07484 0.804688 8.30884C0.804688 10.0688 1.41369 11.7849 2.52069 13.1479C2.52869 13.1609 2.53769 13.1728 2.54769 13.1848L8.07169 20.2618C8.17069 20.3888 8.32269 20.4629 8.48369 20.4629C8.64469 20.4629 8.79669 20.3888 8.89469 20.2618L14.4447 13.1479C14.4467 13.1449 14.4487 13.1428 14.4507 13.1408C15.5537 11.7798 16.1617 10.0648 16.1617 8.30984C16.1607 4.07484 12.7157 0.630859 8.48269 0.630859ZM13.6277 12.4969C13.6207 12.5049 13.6147 12.5129 13.6087 12.5219L8.48269 19.0928L3.40769 12.5919C3.39469 12.5709 3.38069 12.5519 3.36569 12.5319C2.38769 11.3479 1.84869 9.84785 1.84869 8.30984C1.84869 4.65184 4.82469 1.67584 8.48269 1.67584C12.1407 1.67584 15.1167 4.65184 15.1167 8.30984C15.1167 9.83084 14.5877 11.3189 13.6277 12.4969Z"
                    fill={selectedColor}
                  />
                  <Path
                    d="M12.3382 6.73675C12.0622 6.81875 11.9042 7.10874 11.9852 7.38574C12.3642 8.67174 12.0122 10.0597 11.0642 11.0067C10.3742 11.6967 9.45716 12.0768 8.48116 12.0768C7.50516 12.0768 6.58816 11.6967 5.89816 11.0067C5.20816 10.3167 4.82816 9.39877 4.82816 8.42377C4.82816 7.44777 5.20816 6.53076 5.89816 5.84076C6.84616 4.89276 8.23516 4.53975 9.52216 4.92175C9.79916 5.00375 10.0892 4.84576 10.1712 4.56976C10.2532 4.29376 10.0952 4.00274 9.81916 3.92074C8.16516 3.43074 6.38016 3.88375 5.16116 5.10275C4.27416 5.98975 3.78516 7.16977 3.78516 8.42377C3.78516 9.67877 4.27416 10.8577 5.16116 11.7448C6.04816 12.6318 7.22815 13.1208 8.48215 13.1208C9.73715 13.1208 10.9162 12.6318 11.8032 11.7448C13.0212 10.5268 13.4742 8.74376 12.9862 7.09076C12.9052 6.81376 12.6142 6.65575 12.3382 6.73675Z"
                    fill={selectedColor}
                  />
                  <Path
                    d="M11.0761 5.84923C11.1781 5.95123 11.3121 6.00224 11.4451 6.00224C11.5791 6.00224 11.7121 5.95123 11.8141 5.84923C12.0181 5.64523 12.0181 5.31522 11.8141 5.11122L11.8051 5.10222C11.6011 4.89822 11.2711 4.89822 11.0671 5.10222C10.8631 5.30622 10.8631 5.63623 11.0671 5.84023L11.0761 5.84923Z"
                    fill={selectedColor}
                  />
                </Svg>

                {data.location && (
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily: `${selectedFont} 300`,
                      color: "#414142",
                    }}
                  >
                    {data.location}
                  </Text>
                )}
              </View>
            </View>

            {data?.skills?.length > 0 && (
              <>
                <View
                  style={{
                    width: "100%",
                    height: "29.2px",
                    backgroundColor: selectedColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "38.43px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "17px",
                      fontFamily: `${selectedFont} 400`,
                      color: "#F9F9F9",
                    }}
                  >
                    SKILLS
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: "38.43px",
                    marginRight: "39.72px",
                    marginLeft: "27.03px",
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
                                    fontFamily: `${selectedFont} 300`,
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
                                    backgroundColor: "#C1C1C1",
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
                    </>
                  )}
                </View>
              </>
            )}
            {data?.languages?.length > 0 && (
              <>
                <View
                  style={{
                    width: "100%",
                    height: "29.2px",
                    backgroundColor: selectedColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "38.43px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "17px",
                      fontFamily: `${selectedFont} 400`,
                      color: "#F9F9F9",
                    }}
                  >
                    LANGUAGES
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: "27.11px",
                    marginRight: "39.98px",
                    marginTop: "38.43px",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  {data?.languages?.length > 0 && (
                    <>
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
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            key={index}
                          >
                            <View
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#414142",
                                  fontSize: "12px",
                                  width: "80px",
                                  fontFamily: `${selectedFont} 300`
                                }}
                              >
                                {detail.languages}
                              </Text>
                              <View
                                style={{
                                  width: "59.21%",
                                  height: "3.78px",
                                  display: "flex",
                                  backgroundColor: "#C1C1C1",
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
                    </>
                  )}
                </View>
              </>
            )}
          </View>

        </View>
        <View
          style={{
            width: "362.67px",
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                height: "27.74px",
                width: "27.74px",
                backgroundColor: selectedColor,
              }}
            ></View>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "102px",
            }}
          >
            <Text
              style={{
                color: "#2B2A2A",
                fontSize: "26.33px",
                fontFamily: `${selectedFont} 600`,
              }}
            >
              JOHN DOE
            </Text>
            <Text
              style={{
                color: selectedColor,
                fontSize: "18.96px",
                fontFamily: `${selectedFont} 300`,
              }}
            >
              COMMUNITY MANAGER
            </Text>
          </View>
          <View
            style={{
              height: "100%",
              borderTopLeftRadius: "40px",
              backgroundColor: selectedColor,
              paddingLeft: "38.97px",
              paddingTop: "27.5px",
              paddingRight: "27.74px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: "#F9F9F9",
                  fontSize: "17px",
                  fontFamily: `${selectedFont} 400`,
                }}
              >
                About Me
              </Text>
              <Text
                style={{
                  fontSize: "11px",
                  fontFamily: `${selectedFont} 300`,
                  color: "#E2E2E2",
                  paddingLeft: "15px",
                  paddingTop: "25px",
                }}
              >
                {data.summery}
              </Text>
            </View>
            <View
              style={{
                height: "0.46px",
                width: "176.57px",
                backgroundColor: "#F9F9F9",
                marginTop: "27px",
                marginBottom: "27px",
              }}
            ></View>
            <View
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "17px",
                  fontFamily: `${selectedFont} 400`,
                  color: "#F9F9F9",
                  paddingBottom: "27px",
                }}
              >
                EDUCATION
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {data?.education?.map((detail, index) => (
                  <View key={index}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        gap: "4px",
                        alignItems: "center"
                      }}
                    >
                      <Svg width={6} height={5} viewBox="0 0 6 5">
                        <Path
                          d="M2.56562 4.69059L0.678625 2.80359C0.544625 2.66959 0.544625 2.4516 0.678625 2.3176L2.56562 0.430578C2.69962 0.296578 2.91761 0.296578 3.05161 0.430578L4.9386 2.3176C5.0726 2.4516 5.0726 2.66959 4.9386 2.80359L3.05161 4.69059C2.91761 4.82459 2.69962 4.82459 2.56562 4.69059Z"
                          fill="#F9F9F9"
                        />
                      </Svg>
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily: `${selectedFont} 400`,
                          color: "#F9F9F9",
                        }}
                      >
                        {detail.qualification}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: "9px",
                        fontFamily: `${selectedFont} 300`,
                        color: "#F2F2F2",
                        paddingLeft: "10px",
                      }}
                    >
                      {detail.instituteName}
                    </Text>
                    <Text
                      style={{
                        fontSize: "7px",
                        fontFamily: `${selectedFont} 400`,
                        color: "#F9F9F9",
                        paddingLeft: "10px",
                      }}
                    >
                      {detail.duration?.start?.year}-
                      {detail.duration?.end?.year}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                height: "0.46px",
                width: "176.57px",
                backgroundColor: "#F9F9F9",
                marginTop: "27px",
                marginBottom: "27px",
              }}
            ></View>
            <View
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: "17px",
                  fontFamily: `${selectedFont} 400`,
                  color: "#F9F9F9",
                  paddingBottom: "27px",
                }}
              >
                EXPERIENCE
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {data?.experience?.map((detail, index) => (
                  <View key={index}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        gap: "4px",
                        alignItems: "center"
                      }}
                    >
                      <Svg width={6} height={5} viewBox="0 0 6 5">
                        <Path
                          d="M2.56562 4.69059L0.678625 2.80359C0.544625 2.66959 0.544625 2.4516 0.678625 2.3176L2.56562 0.430578C2.69962 0.296578 2.91761 0.296578 3.05161 0.430578L4.9386 2.3176C5.0726 2.4516 5.0726 2.66959 4.9386 2.80359L3.05161 4.69059C2.91761 4.82459 2.69962 4.82459 2.56562 4.69059Z"
                          fill="#F9F9F9"
                        />
                      </Svg>
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily: `${selectedFont} 400`,
                          color: "#F9F9F9",
                        }}
                      >
                        {detail.organization}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: "7px",
                        fontFamily: `${selectedFont} 400`,
                        color: "#F9F9F9",
                        paddingLeft: "10px",
                      }}
                    >
                      {detail.duration?.start?.year}-{" "}
                      {detail.currentlyWorking
                        ? "Present"
                        : detail.duration?.end?.year}
                    </Text>
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily: `${selectedFont} 300`,
                        color: "#F2F2F2",
                        paddingLeft: "10px",
                        paddingTop: "17px",
                      }}
                    >
                      {detail.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default Template5;
