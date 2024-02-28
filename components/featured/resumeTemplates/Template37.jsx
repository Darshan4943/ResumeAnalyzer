import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
const Template37 = ({ data,selectedColor,selectedFont  }) => {
  return (
    <Page size="A4">
      <View style={{ flexDirection: "row", gap: "4.63px", }}>

        <View style={{ width: 202, gap: 56, minHeight: 841.8 }}>

          <View
            style={{ width: 106, height: 99, backgroundColor: selectedColor, marginLeft: 52 }}
          ></View>

          <View style={{ width: 202, backgroundColor: "#F2F2F2", marginTop: 16, paddingBottom: 24 }}>

            <View style={{ flexDirection: "column", gap: 28 }}>
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -48 }}>
              {data.profilePhoto ? (
                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "100", height: "100", borderRadius: "50%" }} />
              ) : (
                <Image src="/images/services/profile.png" alt="" style={{ width: "100", height: "100", borderRadius: "50%" }} />
              )}
              </View>

              <View style={{ flexDirection: "column", gap: 24, marginLeft: 48 }}>

                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`,}}>{data.email}</Text>
                  <View style={{ flexDirection: "column", gap: 6 }}>
                    <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`,}}>{data.firstName} {data.lastName}</Text>
                    <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`,}}>{data.location}</Text>

                  </View>
                </View>

                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`, }}>SKILLS</Text>
                  <View style={{ flexDirection: "column", gap: 6 }}>
                    {data.skills.map((detail, index) => (
                      <View style={{ flexDirection: "row", gap: "8", alignItems: "center" }}>
                        <Svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M2.43329 5.0581C3.60457 5.0581 4.55406 4.10769 4.55406 2.9353C4.55406 1.76291 3.60457 0.8125 2.43329 0.8125C1.26201 0.8125 0.3125 1.76291 0.3125 2.9353C0.3125 4.10769 1.26201 5.0581 2.43329 5.0581Z" fill={selectedColor} />
                        </Svg>

                        <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`,}}>{detail.skill}</Text>
                      </View>
                    ))}


                  </View>
                </View>

                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`, }}>LANGUAGES</Text>
                  <View style={{ flexDirection: "column", gap: 6 }}>
                    {data.languages.map((detail, index) => (
                      <View style={{ flexDirection: "row", gap: "8", alignItems: "center" }}>
                        <Svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M2.43329 5.0581C3.60457 5.0581 4.55406 4.10769 4.55406 2.9353C4.55406 1.76291 3.60457 0.8125 2.43329 0.8125C1.26201 0.8125 0.3125 1.76291 0.3125 2.9353C0.3125 4.10769 1.26201 5.0581 2.43329 5.0581Z" fill={selectedColor} />
                        </Svg>

                        <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`, }}>{detail.languages}</Text>
                      </View>
                    ))}


                  </View>
                </View>

                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text style={{ fontSize: 12, fontFamily: `${selectedFont} 400`,}}>HOBBIES</Text>
                  <View style={{ flexDirection: "column", gap: 6 }}>
                    {data.hobbies.map((detail, index) => (
                      <View style={{ flexDirection: "row", gap: "8", alignItems: "center" }}>
                        <Svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M2.43329 5.0581C3.60457 5.0581 4.55406 4.10769 4.55406 2.9353C4.55406 1.76291 3.60457 0.8125 2.43329 0.8125C1.26201 0.8125 0.3125 1.76291 0.3125 2.9353C0.3125 4.10769 1.26201 5.0581 2.43329 5.0581Z" fill={selectedColor} />
                        </Svg>

                        <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`,}}>{detail.title}</Text>
                      </View>
                    ))}


                  </View>
                </View>



              </View>


            </View>
          </View>

          <View
            style={{ width: 106, height: 37, backgroundColor: selectedColor, marginLeft: 52, position: "absolute", left: 0, right: 0, bottom: 0, paddingTop: 24 }}
          ></View>


        </View>


        <View style={{ width: 305 }}>


          <View style={{ flexDirection: "column", paddingTop: 50 }}>
            <Text style={{ fontSize: 24, fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{data.firstName} {data.lastName}</Text>
            <Text style={{ fontSize: 12, fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{data.designation}</Text>
          </View>

          <View style={{ flexDirection: "column", gap: 24, width: 205, paddingTop: 92, paddingLeft: 34 }}>

            <View style={{ fdisplay: "flex", flexDirection: "column", gap: 16 }}>

              <View style={{ display: "flex", flexDirection: "row", gap: 24, width: 305, alignItems: "center" }}>
                <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`, color: "#45484C" }}>EXPERIENCE</Text>
                <View style={{ backgroundColor: "#9C9B9B", height: 1, width: 208 }}></View>
              </View>
              {data?.experience?.map((detail, index) => (
                <View style={{ display: "flex", flexDirection: "row", gap: 36 }}>
                  <View>
                    <Text style={{ fontSize: 10, fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{detail.duration?.start?.year}-{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 500`, color: "#45484C" }}>{detail.designation}</Text>
                      <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{detail.organization}</Text>
                    </View>
                    <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{detail.description}</Text>
                  </View>
                </View>

              ))}

            </View>







            <View style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              <View style={{ display: "flex", flexDirection: "row", gap: 24, width: 305, alignItems: "center" }}>
                <Text style={{ fontSize: 12,  fontFamily: `${selectedFont} 400`, color: "#45484C" }}>EDUCATION</Text>
                <View style={{ backgroundColor: "#9C9B9B", height: 1, width: 208 }}></View>
              </View>
              {data?.education?.map((detail, index) => (
              <View style={{ display: "flex", flexDirection: "row", gap: 36 }}>
                <View>
                  <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 500`, color: "#45484C" }}>{detail.qualification} - {detail.specialization}</Text>
                  <View>
                    <Text style={{ fontSize: 10,  fontFamily: `${selectedFont} 400`, color: "#45484C" }}>{detail.instituteName}</Text>
                  
                  </View>
                </View>
              </View>

              ))}

            </View>
          </View>







        </View>

      </View>
    </Page>
  );
};

export default Template37;
