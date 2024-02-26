import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath } from '@react-pdf/renderer';

function Template6({ data,selectedColor,selectedFont  }) {
  //   console.log(data)
  return (
    <Page size="A4">
      <View style={{  flexDirection: "row", gap: 10,minHeight:841.8 }}>
        <View>
          <View style={{ width: 268, flexDirection: "row" }}>
            <View style={{ backgroundColor: selectedColor, width: 46 }}></View>
            <View style={{ flexDirection: "column", width: 268, marginLeft: -30, gap: 16 }}>
              <View style={{ width: 243, flexDirection: "column" }}>
                <View style={{ paddingTop: 50, paddingLeft: 70 }}>
                  <View style={{ width: 154, height: 154, flexShrink: 0, backgroundColor: "lightgray", backgroundPosition: "center", backgroundSize: "cover", borderRadius: 77, overflow: "hidden" }}>
                    {data.profilePhoto ? (
                      <Image
                        src={URL.createObjectURL(data.profilePhoto)}
                        alt=""
                      />
                    ) : (
                      <Image src="/images/services/profile.png" alt="" />
                    )}
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "column", width: 178, justifyContent: "flex-start", alignItems: "flex-center", gap: 6, }}>
                <View style={{ flexDirection: "column", width: 268, gap: 3 }}>
                  <View style={{ flexDirection: "row", gap: 6, width: "100%" }}>
                    <Svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <Path
                        d="M20.0105 16.0772C20.0502 16.3817 19.9576 16.6449 19.7341 16.8685L17.1042 19.4809C16.9851 19.6133 16.8308 19.7251 16.6397 19.8178C16.4485 19.9104 16.2604 19.9693 16.0766 19.9958C16.0634 19.9958 16.0237 19.9987 15.9575 20.0061C15.8914 20.0134 15.8061 20.0163 15.7003 20.0163C15.4504 20.0163 15.0446 19.9737 14.4845 19.8869C13.923 19.8016 13.2379 19.5898 12.4279 19.2529C11.6179 18.9161 10.6977 18.4116 9.66862 17.7393C8.63958 17.0671 7.54585 16.1419 6.3845 14.9696C5.4613 14.059 4.69687 13.1882 4.08973 12.3572C3.48407 11.5261 2.99601 10.7583 2.62555 10.0522C2.25656 9.34616 1.98019 8.70631 1.79496 8.13265C1.61121 7.55898 1.48478 7.06474 1.41863 6.64847C1.35247 6.23219 1.32601 5.90711 1.33925 5.66882C1.35248 5.432 1.35836 5.29962 1.35836 5.27314C1.38482 5.08781 1.44362 4.90099 1.53623 4.7083C1.62885 4.51708 1.74057 4.36264 1.87288 4.24349L4.50282 1.6105C4.68658 1.42664 4.89827 1.33398 5.13642 1.33398C5.30842 1.33398 5.45983 1.38251 5.59067 1.48106C5.72297 1.57962 5.8347 1.70172 5.92731 1.84734L8.0442 5.86445C8.16328 6.07479 8.19562 6.30574 8.1427 6.55727C8.08977 6.80733 7.97805 7.01914 7.80605 7.18977L6.83728 8.15913C6.81082 8.18561 6.7873 8.22826 6.76819 8.28857C6.7476 8.34741 6.73879 8.39741 6.73879 8.43713C6.79171 8.71367 6.90931 9.02992 7.09454 9.38589C7.25331 9.70214 7.49734 10.089 7.82663 10.545C8.15593 10.9995 8.62488 11.5246 9.23054 12.1174C9.82298 12.7249 10.3522 13.1956 10.8123 13.5325C11.2739 13.8678 11.6591 14.1164 11.9693 14.2753C12.2795 14.4327 12.5161 14.5298 12.6808 14.5621L12.9277 14.6121C12.9542 14.6121 12.9968 14.6018 13.0571 14.5827C13.1159 14.5636 13.1586 14.54 13.1865 14.5136L14.314 13.3662C14.5522 13.1559 14.8285 13.05 15.1446 13.05C15.3681 13.05 15.5474 13.0897 15.6782 13.1691H15.6988L19.5166 15.4255C19.7929 15.5947 19.9576 15.8124 20.0105 16.0772Z"
                        fill="#282829"
                      />
                    </Svg>
                    <View style={{ flexDirection: "column", width: "100%", paddingLeft: 9 }}>
                      <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 14 }}>Phone</Text>
                      <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 14 }}>{data.mobileNumber}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6, width: "100%" }}>
                    <Svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <Path
                        d="M20.0495 14.9109C20.0495 15.3399 19.9345 15.7378 19.7501 16.0878L13.8514 9.17279L19.6858 3.82354C19.9122 4.20072 20.0495 4.64402 20.0495 5.1236V14.9109ZM10.7077 10.4288L18.826 2.98623C18.4932 2.7944 18.1171 2.67773 17.7125 2.67773H3.70171C3.29592 2.67773 2.92106 2.7944 2.5895 2.98623L10.7077 10.4288ZM12.9717 9.97899L11.0925 11.7029C10.9824 11.8027 10.8451 11.8532 10.7077 11.8532C10.5704 11.8532 10.4331 11.8027 10.323 11.7016L8.44374 9.9777L2.47073 16.9808C2.82827 17.2155 3.24891 17.3567 3.70295 17.3567H17.715C18.1691 17.3567 18.5885 17.2155 18.946 16.9808L12.9717 9.97899ZM1.73091 3.82483C1.50451 4.20201 1.36719 4.6453 1.36719 5.12488V14.9109C1.36719 15.3399 1.48101 15.7378 1.66658 16.0878L7.56412 9.17279L1.73091 3.82483Z"
                        fill="#282829"
                      />
                    </Svg>
                    <View style={{ flexDirection: "column", width: "100%", paddingLeft: 9 }}>
                      <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 14 }}>Email</Text>
                      <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 14 }}>{data.email}</Text>
                    </View>
                  </View>
                  {/* <View style={{ flexDirection: "row", gap: 6, width: "100%" }}>
                    <View style={{ flexDirection: "column", width: "100%" }}>
                      <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 14 }}>Website</Text>
                      <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 14 }}>{data.email}</Text>
                    </View>
                  </View> */}
                  <View style={{ flexDirection: "row", gap: 6, width: "100%" }}>
                    <Svg width="22" height="23" viewBox="0 0 22 23">
                      <Defs>
                        <ClipPath id="clip0_1657_45195">
                          <Rect width="22" height="22" fill="white" transform="translate(0 0.046875)" />
                        </ClipPath>
                      </Defs>
                      <Path
                        d="M11.0053 0.0488281C7.21322 0.0488281 4.12891 3.31325 4.12891 7.32531C4.12891 8.9415 5.10377 11.5764 7.10995 15.3815C8.52819 18.0718 9.92439 20.316 9.98222 20.4093L11.0039 22.0488L12.0256 20.4093C12.0848 20.316 13.4796 18.0718 14.8979 15.3815C16.904 11.5779 17.8789 8.94297 17.8789 7.32678C17.8817 3.31326 14.7973 0.0488281 11.0053 0.0488281ZM11.0053 11.0503C9.03628 11.0503 7.44179 9.36123 7.44179 7.27723C7.44179 5.19323 9.03765 3.50419 11.0053 3.50419C12.9729 3.50419 14.5701 5.19323 14.5701 7.27723C14.5701 9.35977 12.9743 11.0503 11.0053 11.0503Z"
                        fill="#282829"
                        clipPath="url(#clip0_1657_45195)"
                      />
                    </Svg>
                    <View style={{ flexDirection: "column", width: "100%", paddingLeft: 9 }}>
                      <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 14 }}>Area</Text>
                      <Text style={{ fontFamily: `${selectedFont} 400`, fontSize: 14 }}>{data.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginLeft: 6, paddingTop: 12 }}>
            <View style={{ width: 178, flexDirection: "column", paddingBottom: 12 }}>
              <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                <Text style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}>SKILLS</Text>
                <View style={{ flexDirection: "column", width: 268, gap: 6 }}>
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
                      <View style={{ paddingRight: 4, flexDirection: "column" }} key={index}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                          <Text style={{ color: "#414142", fontSize: 12, width: 80, fontFamily: `${selectedFont} 400` }}>
                            {detail.skill}
                          </Text>
                          <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#DCDDDE" }}>
                            <View
                              style={{ height: "100%", backgroundColor: selectedColor, width: `${ratingPercentage}%` }}
                            ></View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={{ height: 1, width: 240, backgroundColor: "#282829" }}></View>

            <View style={{ width: 268, flexDirection: "column", paddingTop: 10, paddingBottom: 14 }}>
              <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                <Text style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}>LANGAUGES</Text>
                <View style={{ flexDirection: "column", width: 240, gap: 6 }}>
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
                            else if (zerosCount === 1) ratingPercentage = 66;
                            else if (zerosCount === 2) ratingPercentage = 33;
                          }
                          return ratingPercentage;
                        };
                        const ratingPercentage = calculateWidthPercentage(
                          detail.rating
                        );
                        return (
                          <View style={{ width: "100%", flexDirection: "column" }} key={index}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                              <Text style={{ color: "#414142", fontSize: 11.136, width: 80, fontFamily: `${selectedFont} 400` }}>
                                {detail.languages}
                              </Text>
                              <View style={{ width: "59.21%", height: 3.78, alignSelf: "flex-end", marginBottom: 1, backgroundColor: "#C1C1C1" }}>
                                <View
                                  style={{ height: "100%", backgroundColor: selectedColor, width: `${ratingPercentage}%` }}
                                ></View>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </>
                  )}
                </View>
              </View>
            </View>
            <View style={{ height: 1, width: 240, backgroundColor: "#282829" }}></View>
            <View style={{ flexDirection: "column", gap: 2, paddingTop: 8, paddingBottom: 12 }}>
              <Text style={{ fontSize: 16, fontFamily: `${selectedFont} 700`, color: "#282829" }}>HOBBIES</Text>

              {data.hobbies?.map((detail, index) => (
                <View key={index} style={{ flexDirection: "column", marginBottom: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text style={{ color: "#282829", }}>&#8226;</Text>
                    <Text style={{ color: "#282829", fontFamily: `${selectedFont} 400` }}>{detail.title}</Text>
                  </View>
                </View>
              ))}

            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 14, width: 334, paddingRight: 12 }}>
          <View style={{ width: 300, paddingTop: 80, height: 200, alignItems: 'start', justifyContent: 'start' }}>
            <Text style={{ fontSize: 28, fontFamily: `${selectedFont} 700` }}>
              {data.firstName} {data.lastName}
            </Text>
            <Text style={{ fontFamily: `${selectedFont} 500`, fontSize: 16 }}>{data.designation}</Text>
          </View>
          <View style={{ width: 441, flexDirection: "column", gap: 4 }}>
            <View style={{ width: 441, flexDirection: "column", paddingBottom: 8, gap: 8 }}>
              <Text style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}>ABOUT ME</Text>
              <Text wrap={true} style={{ fontSize: 14, fontFamily: `${selectedFont} 400`, width: 300 }}>
                {data.summery}
              </Text>
            </View>
            <View style={{ height: 1, width: 300, backgroundColor: "#282829" }}></View>
            <View style={{ flexDirection: "column", gap: 4, width: 300, paddingTop: 12 }}>
              <Text style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}>WORK EXPERIENCE</Text>
              {data.experience?.map((detail, index) => (
                <>
                  <View style={{ flexDirection: "column", gap: 6 }}>
                    <View style={{ flexDirection: "column", gap: 6 }}>
                      {/* <View style={{flexDirection:'column',gap:6}}> */}
                      <Text style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}>
                        {detail.organization}
                      </Text>

                      {/* </View> */}
                      <View style={{ flexDirection: "row", justifyContent: "space-between", width: 300 }}>
                        <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400`, color: "#939598", width: 100 }}>
                          {detail.designation}
                        </Text>
                        <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400` }}>
                          {" "}
                          {detail.duration?.start?.year}-{" "}
                          {detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400`, width: 300 }}>
                        {detail.description}
                      </Text>
                    </View>
                  </View>
                </>
              ))}
            </View>
            <View style={{ height: 1, width: 300, backgroundColor: "#282829" }}></View>
            <View style={{ flexDirection: "column", gap: 4, width: 300 }}>
              <Text style={{ fontSize: 18, fontFamily: `${selectedFont} 700` }}> EDUCATION</Text>
              {data?.education?.map((detail, index) => (
                <>
                  <View style={{ flexDirection: "column", gap: 5 }}>
                    <View style={{ flexDirection: "column", gap: 6 }}>
                      <Text style={{ fontSize: 16, fontFamily: `${selectedFont} 700` }}>
                        {detail.qualification}

                      </Text>
                      <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400` }}>
                        {detail.specialization}
                      </Text>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", width: 300 }}>
                        <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400`, color: "#939598", width: 200 }}>
                          {detail.instituteName}
                        </Text>
                        <Text style={{ fontSize: 14, fontFamily: `${selectedFont} 400` }}>
                          {detail.duration?.end?.year && (
                            <>
                              {detail.duration?.start?.year}-
                              {detail.duration?.end?.year}
                            </>
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ))}
            </View>
          </View>
        </View>
        <View style={{width:"100%",height:12,position:"absolute",bottom:0, backgroundColor:selectedColor}}></View>
      </View>
    </Page>




  );
}

export default Template6;

