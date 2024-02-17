import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template10({ data }) {
  console.log(4, data)
  return (
    <Page size="A4" style={{ padding: 24 }}>
      <View style={{ flexDirection: "row", gap: 24 }}>

        <View style={{ width: "150px", marginTop: "86px" }}>
          <View style={{ flexDirection: "column", gap: 24 }}>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>CONTACT</Text>

              <View style={{ flexDirection: "col", gap: 8, paddingRight: 4 }} >
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M11.6593 2.66406C7.98697 2.66406 5 5.65102 5 9.32206C5 10.8009 5.94409 13.2118 7.88696 16.6935C9.26043 19.1551 10.6126 21.2086 10.6686 21.2939L11.658 22.7941L12.6474 21.2939C12.7048 21.2086 14.0556 19.1551 15.429 16.6935C17.3719 13.2131 18.316 10.8022 18.316 9.3234C18.3173 5.65103 15.3304 2.66406 11.6593 2.66406ZM11.6593 12.7304C9.75248 12.7304 8.20832 11.1849 8.20832 9.27805C8.20832 7.37119 9.75381 5.82572 11.6593 5.82572C13.5649 5.82572 15.1104 7.37119 15.1104 9.27805C15.1104 11.1849 13.5649 12.7304 11.6593 12.7304Z" stroke="#B2B2B2" stroke-width="0.666734" stroke-miterlimit="10" />
                  </Svg>

                  <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>{data.location}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M20.0046 17.2915C20.0379 17.5513 19.9596 17.7778 19.7664 17.9693L17.5114 20.206C17.4098 20.3193 17.2766 20.4159 17.1134 20.4942C16.9501 20.5725 16.7886 20.6241 16.6304 20.6474C16.6187 20.6474 16.5854 20.6507 16.5288 20.6557C16.4722 20.6607 16.3989 20.6641 16.3089 20.6641C16.0941 20.6641 15.746 20.6274 15.2664 20.5541C14.7851 20.4808 14.1988 20.301 13.5027 20.0112C12.8082 19.7231 12.0204 19.2917 11.1394 18.7155C10.2584 18.1392 9.3207 17.3481 8.32477 16.3422C7.53368 15.5628 6.87915 14.8166 6.35787 14.1038C5.83825 13.3927 5.42022 12.7332 5.10378 12.1286C4.78735 11.5241 4.54919 10.9761 4.39264 10.4848C4.23442 9.99352 4.12783 9.5705 4.07121 9.21409C4.01458 8.85768 3.99126 8.57787 4.00292 8.37468C4.01458 8.1715 4.01958 8.05827 4.01958 8.03662C4.04289 7.8784 4.09286 7.71683 4.1728 7.55362C4.25274 7.39041 4.34767 7.25717 4.46092 7.15558L6.71594 4.90055C6.87416 4.74234 7.05403 4.66406 7.25888 4.66406C7.40544 4.66406 7.53534 4.70571 7.64859 4.79064C7.76184 4.87558 7.85844 4.9805 7.93672 5.10541L9.75039 8.54624C9.85198 8.72611 9.8803 8.92428 9.83533 9.13912C9.79036 9.35397 9.69377 9.53384 9.54721 9.68207L8.71615 10.5131C8.69283 10.5365 8.67285 10.5731 8.65786 10.623C8.6412 10.6747 8.63288 10.7163 8.63288 10.7513C8.67784 10.9878 8.77943 11.2593 8.93765 11.564C9.07255 11.8355 9.2824 12.1652 9.56553 12.5566C9.84865 12.9463 10.2484 13.396 10.768 13.904C11.2759 14.4236 11.7289 14.8283 12.1237 15.1164C12.5184 15.4046 12.8498 15.6161 13.1146 15.7526C13.3811 15.8875 13.5843 15.9708 13.7242 15.9975L13.9357 16.0391C13.959 16.0391 13.994 16.0308 14.0456 16.0141C14.0972 15.9975 14.1322 15.9775 14.1555 15.9558L15.1215 14.9732C15.3247 14.7933 15.5628 14.7017 15.8326 14.7017C16.0241 14.7017 16.1774 14.735 16.2906 14.8033H16.3073L19.5782 16.7353C19.818 16.8785 19.9579 17.065 20.0046 17.2915Z" stroke="#B2B2B2" stroke-width="0.666734" stroke-miterlimit="10" />
                  </Svg>

                  <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>{data.mobileNumber}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M18.088 18.6641H5.24486C4.00514 18.6641 3 17.6589 3 16.4192V7.90892C3 6.6692 4.00514 5.66406 5.24486 5.66406H18.088C19.3277 5.66406 20.3329 6.6692 20.3329 7.90892V16.4192C20.3329 17.6589 19.3277 18.6641 18.088 18.6641Z" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                    <Path d="M19.7818 6.11719L11.6643 13.295L3.69141 6.29312" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                    <Path d="M9.53716 12.1426L3.45312 18.7517" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                    <Path d="M19.8809 18.7517L13.7969 12.1426" stroke="#B2B2B2" strokeWidth="0.666734" strokeMiterlimit="10" />
                  </Svg>
                  <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>{data.email}</Text>
                </View>


              </View>
            </View>
            <View style={{ flexDirection: "column", gap: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>SKILLS</Text>
              {data?.skills?.map((detail, index) => (
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                    <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                  </Svg>
                  <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>{detail.skill}</Text>
                </View>
              ))}



            </View>
            {/* <View style={{ flexDirection: "column", gap: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>TOOLS</Text>

              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 1</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 2</Text>
              </View>


              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 3</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 4</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 5</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 6</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 16 }}>
                <Svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M6.99999 3.16406C4.79135 3.16406 3 4.95541 3 7.16404C3 9.37392 4.79135 11.1641 6.99999 11.1641C9.20863 11.1641 11 9.37268 11 7.16404C11 4.95541 9.20987 3.16406 6.99999 3.16406Z" stroke="#F2BE5C" strokeWidth="4.0004" strokeMiterlimit="10" />
                </Svg>
                <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>Tool 7</Text>
              </View>

            </View> */}



            {data?.languages?.length > 0 && (
              <>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}>LANGUAGES</Text>

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
                              fontWeight: "300",
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
                              borderRadius: "4px"
                            }}
                          >
                            <View
                              style={{
                                width: `${ratingPercentage}%`,
                                height: "100%",
                                backgroundColor: "#F2BE5C",
                                borderRadius: "4px"
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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "column", gap: 8 }}>
                <View>
                  <Text style={{ fontSize: 36, fontWeight: '400', color: '#414042' }}>{data.firstName}</Text>
                  <Text style={{ fontSize: 36, fontWeight: '400', color: '#414042' }}>{data.lastName}</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#414042' }}>{data.designation} </Text>
              </View>

              <View style={{ width: "124px", height: "124px", borderRadius: "50%" }}>
                {data.profilePhoto ? (
                  <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{}} />
                ) : (
                  <Image src="/images/services/profile.png" alt="" style={{}} />
                )}
              </View>

            </View>

            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#414042' }}>ABOUT</Text>
              <Text style={{ fontSize: 10, fontWeight: '400', color: '#414042' }}>{data.summery} </Text>

            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <Image style={{ width: "27px", height: "27px" }} src="/images/services/experience_white.png" alt="" />
              <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EXPERIENCE</Text>
                <View style={{ height: "1px", marginTop: "4px", width: "100%", backgroundColor: "#B2B2B2" }}></View>
              </View>
            </View>
            {data.experience?.map((detail, index) => (
              <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
                <View style={{ flexDirection: "row", gap: 4, width: "100%", alignItems: "center" }}>
                  <Svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M2.9375 4.79279C2.53646 4.79279 2.17022 4.69502 1.83878 4.49947C1.50734 4.3006 1.24219 4.03545 1.04332 3.70401C0.847775 3.37257 0.75 3.00633 0.75 2.60529C0.75 2.20094 0.847775 1.83469 1.04332 1.50657C1.24219 1.17513 1.50734 0.911636 1.83878 0.716086C2.17022 0.517223 2.53646 0.417791 2.9375 0.417791C3.34186 0.417791 3.7081 0.517223 4.03622 0.716086C4.36766 0.911636 4.63116 1.17513 4.8267 1.50657C5.02557 1.83469 5.125 2.20094 5.125 2.60529C5.125 3.00633 5.02557 3.37257 4.8267 3.70401C4.63116 4.03545 4.36766 4.3006 4.03622 4.49947C3.7081 4.69502 3.34186 4.79279 2.9375 4.79279Z" fill="#F2BE5C" />
                  </Svg>

                  <View style={{ flexDirection: "column", gap: 3, width: "100%", paddingTop: 14 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>

                      <Text style={{ fontSize: 14, fontWeight: '400', color: '#414042' }}> {detail.organization}- {detail.designation} </Text>
                      <Text style={{ fontSize: 14, fontWeight: '400', color: '#F2BE5C' }}>{detail.duration?.start?.year}-{" "}
                        {detail.currentlyWorking
                          ? "Present"
                          : detail.duration?.end?.year}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>{detail.location}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>{detail.description}</Text>
                </View>

              </View>
            ))}
          </View>
          <View style={{ flexDirection: "column", gap: 10 }} >
            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <Image style={{ width: "27px", height: "27px" }} src="/images/services/experience_white.png" alt="" />
              <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EDUCATION</Text>
                <View style={{ height: "1px", marginTop: "4px", width: "100%", backgroundColor: "#B2B2B2" }}></View>
              </View>
            </View>

            {data?.education?.map((detail, index) => (
              <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
                <View style={{ flexDirection: "row", gap: 4, width: "100%", alignItems: "center" }}>
                  <Svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M2.9375 4.79279C2.53646 4.79279 2.17022 4.69502 1.83878 4.49947C1.50734 4.3006 1.24219 4.03545 1.04332 3.70401C0.847775 3.37257 0.75 3.00633 0.75 2.60529C0.75 2.20094 0.847775 1.83469 1.04332 1.50657C1.24219 1.17513 1.50734 0.911636 1.83878 0.716086C2.17022 0.517223 2.53646 0.417791 2.9375 0.417791C3.34186 0.417791 3.7081 0.517223 4.03622 0.716086C4.36766 0.911636 4.63116 1.17513 4.8267 1.50657C5.02557 1.83469 5.125 2.20094 5.125 2.60529C5.125 3.00633 5.02557 3.37257 4.8267 3.70401C4.63116 4.03545 4.36766 4.3006 4.03622 4.49947C3.7081 4.69502 3.34186 4.79279 2.9375 4.79279Z" fill="#F2BE5C" />
                  </Svg>

                  <View style={{ flexDirection: "column", gap: 3, width: "100%", paddingTop: 14 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                      <Text style={{ fontSize: 12, fontWeight: '400', color: '#414042' }}>   {detail.qualification} - {detail.specialization}</Text>
                      <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}> {detail.duration?.end?.year && (
                        <>
                          {detail.duration?.start?.year}-
                          {detail.duration?.end?.year}
                        </>
                      )}</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}>   {detail.instituteName}</Text>
                    <View>

                    </View>
                  </View>
                </View>
                <View>

                </View>

              </View>

            ))}


          </View>



          <View style={{ flexDirection: "column", gap: 10 }} >
            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <Image style={{ width: "27px", height: "27px" }} src="/images/services/experience_white.png" alt="" />
              <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>COURSE</Text>
                <View style={{ height: "1px", marginTop: "4px", width: "100%", backgroundColor: "#B2B2B2" }}></View>
              </View>
            </View>

            {data?.course?.map((detail, index) => (
              <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
                <View style={{ flexDirection: "row", gap: 4, width: "100%", alignItems: "center" }}>
                  <Svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M2.9375 4.79279C2.53646 4.79279 2.17022 4.69502 1.83878 4.49947C1.50734 4.3006 1.24219 4.03545 1.04332 3.70401C0.847775 3.37257 0.75 3.00633 0.75 2.60529C0.75 2.20094 0.847775 1.83469 1.04332 1.50657C1.24219 1.17513 1.50734 0.911636 1.83878 0.716086C2.17022 0.517223 2.53646 0.417791 2.9375 0.417791C3.34186 0.417791 3.7081 0.517223 4.03622 0.716086C4.36766 0.911636 4.63116 1.17513 4.8267 1.50657C5.02557 1.83469 5.125 2.20094 5.125 2.60529C5.125 3.00633 5.02557 3.37257 4.8267 3.70401C4.63116 4.03545 4.36766 4.3006 4.03622 4.49947C3.7081 4.69502 3.34186 4.79279 2.9375 4.79279Z" fill="#F2BE5C" />
                  </Svg>

                  <View style={{ flexDirection: "column", gap: 3, width: "100%", paddingTop: 14 }}>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#414042' }}>{detail.courseName} </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#F2BE5C' }}> {detail.duration?.end?.month}-
                      {detail.duration?.end?.year}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, fontWeight: '400', color: '#F2BE5C' }}>{detail.issuedBy}</Text>
                    <View>

                    </View>
                  </View>
                </View>
                <View>

                </View>

              </View>
            ))}



          </View>
        </View>



      </View>
    </Page>
  )
}

export default Template10