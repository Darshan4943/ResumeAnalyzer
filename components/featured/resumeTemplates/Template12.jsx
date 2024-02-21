import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath } from '@react-pdf/renderer';

const Template12 = ({ data }) => {

  return (
    <Page>
      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: 595 }}>
        <View style={{ width: 595, }}>
          <View style={{ backgroundColor: "#0C2438", width: '595', position: 'relative', height: 176 }}>
            <View style={{ backgroundColor: "#2EA0D7", position: 'absolute', width: 495, bottom: 0, height: 75 }}>
              <View style={{ flexDirection: "column", paddingLeft: 40, gap: 4, paddingTop: 5 }}>
                <Text style={{ fontSize: "30px", color: '#fff', fontFamily: "Lato 4000" }}>
                  {data.firstName} {data.lastName}
                </Text>
                <Text style={{ fontSize: "16", color: '#fff', fontFamily: "Lato 4000" }}>
                  {data.designation}
                </Text>
              </View>
            </View>
            <View
              style={{ position: 'absolute', right: 58, paddingTop: 64 }}
            >
              {data.profilePhoto ? (
                <Image
                  src={{ uri: URL.createObjectURL(data.profilePhoto) }}
                  style={{ width: 155, height: 155, borderRadius: 80 }}
                />
              ) : (
                <Image
                  src={("/images/services/profile.png")}
                  style={{ width: 155, height: 155, borderRadius: 80 }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 8, width: 525, alignItems: "center", justifyContent: 'center' }}>
          <View style={{ flexDirection: "column", gap: 10, width: 595, padding: 20, paddingTop: 30 }}>
            <Text style={{ fontSize: 16, fontFamily: "Lato 700", color: "#495970" }}>
              CONTACTS
            </Text>
            <View style={{ width: "90.62%", flexDirection: "row", gap: 8 }}>
              <View style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2, width: "18.72%", maxWidth: 130 }}>
                <Text style={{ fontSize: 12, fontFamily: "Lato 700", color: "#495970" }}>PHONE</Text>
                <Text style={{ fontSize: 12, fontFamily: "Lato 400", color: "#8B8C8C" }}>{data.mobileNumber}</Text>
              </View>
              <View style={{ backgroundColor: "#B5BCC5", width: 1, height: 30 }}></View>
              <View style={{ maxWidth: 200, width: "auto", gap: 2, flexDirection: "column" }}>
                <Text style={{ fontSize: 12, fontFamily: "Lato 700", color: "#495970" }}>EMAIL</Text>
                <Text style={{ fontSize: 12, fontFamily: "Lato 400", color: "#8B8C8C" }}>{data.email}</Text>
              </View>
              <View style={{ backgroundColor: "#B5BCC5", width: 1, height: 30 }}></View>
              <View style={{ maxWidth: 225, width: "auto", gap: 2, flexDirection: "column" }}>
                <Text style={{ fontSize: 12, fontFamily: "Lato 700", color: "#495970", }}>ADDRESS</Text>
                <Text style={{ fontSize: 12, fontFamily: "Lato 400", color: "#8B8C8C", }}>{data.location}</Text>
              </View>
            </View>
          </View>


          <View style={{ flexDirection: "column", width: "595", gap: 8, paddingLeft: 10 }}>
            <View style={{ flexDirection: "row", width: "525", alignItems: "center", justifyContent: 'center', gap: 6 }}>
              <Text style={{ fontSize: 16, fontFamily: "Lato 700", color: "#495970" }}>
                EDUCATION
              </Text>
              <View style={{ backgroundColor: "#B5BCC5", width: 400, height: 1 }}></View>
            </View>
            <View style={{ width: "525", flexDirection: "row", gap: 25, paddingLeft: 10 }}>
              {data?.education?.map((detail, index) => (
                <View key={index} style={{ flexDirection: "column", gap: 8, width: '50%' }}>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <View style={{ flexDirection: "column", gap: 4 }}>
                      {detail.duration?.end?.year && (
                        <>
                          <Text style={{ fontSize: 12, fontFamily: "Lato 700", color: "#495970" }}>
                            {detail.duration?.start?.year}
                          </Text>
                          <Text style={{ fontSize: 12, fontFamily: "Lato 700", color: "#495970" }}>
                            {detail.duration?.end?.year}
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={{ backgroundColor: "#B5BCC5", height: "auto", width: 1 }}></View>
                    <View style={{ flexDirection: "column", gap: 2, width: "100%" }}>
                      <Text style={{ fontSize: 12, fontFamily: "Lato 400", color: "#495970" }}>
                        {detail.instituteName}
                      </Text>
                      <Text style={{ fontSize: 12, fontFamily: "Lato 700", color: "#495970" }}>
                        {detail.qualification}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, fontFamily: "Lato 400", color: "#676A6D", width: "100%" }}>
                    {detail.specialization}
                  </Text>
                </View>
              ))}
            </View>

          </View>
          {/* <View style={{ flexDirection: "column", width: "595", gap: 8,paddingLeft:10 }}>
            <View style={{ flexDirection: "row",width: "525", alignItems: "center",justifyContent:'center', gap: 6 }}>
              <Text style={{ fontSize: 16, fontFamily: "700", color: "#495970" }}>
                EDUCATION
              </Text>
              <View style={{ backgroundColor: "#B5BCC5", width: 400, height: 1 }}></View>
            </View>
            <View style={{ width: "525", flexDirection: "row", gap: 25,paddingLeft:10  }}>
              {data?.education?.map((detail, index) => (
                <View style={{ flexDirection: "column", gap: 8, width: 380 }}>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <View style={{ flexDirection: "column", gap: 4 }}>
                      {detail.duration?.end?.year && (
                        <>
                          <Text style={{ fontSize: 12, fontFamily: "700", color: "#495970" }}>
                            {detail.duration?.start?.year}
                          </Text>
                          <Text style={{ fontSize: 12, fontFamily: "700", color: "#495970"}}>
                            {detail.duration?.end?.year}
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={{ backgroundColor: "#B5BCC5", height: "auto", width: 1 }}></View>
                    <View style={{ flexDirection: "column", gap: 2, width: "100%" }}>
                      <Text style={{ fontSize: 12, fontFamily: "400", color: "#495970"}}>
                        {detail.instituteName}
                      </Text>
                      <Text style={{ fontSize: 12, fontFamily: "700", color: "#495970"}}>
                        {detail.qualification}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, fontFamily: "400", color: "#676A6D", width: "100%"}}>
                    {detail.specialization}
                  </Text>
                </View>
              ))}
            </View>
          </View> */}



          <View style={{ flexDirection: "column", width: "595", gap: 6, paddingLeft: 23, paddingTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 525, }}>
              <Text style={{ fontSize: 16, fontFamily: "Lato 700", color: "#495970", }}>
                EXPERIENCES
              </Text>
              <View style={{ backgroundColor: "#B5BCC5", width: 400, height: 1 }}></View>
            </View>
            <View style={{ width: "525", flexDirection: "row", gap: 6 }}>
              {data?.experience?.map((detail, index) => (
                <View style={{ flexDirection: "column", gap: 6, width: "370" }}>
                  <Text style={{ fontSize: 10, fontFamily: "Lato 400", color: "#495970" }}>
                    {detail.duration?.start?.year}-{" "}
                    {detail.currentlyWorking
                      ? "Present"
                      : detail.duration?.end?.year}
                  </Text>
                  <Text style={{ fontSize: 10, fontFamily: "Lato 700", color: "#495970" }}>
                    {detail.designation}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 1 }}>
                    <Text style={{ fontSize: 10, fontFamily: "Lato 400", color: "#495970", maxWidth: 180, }}>
                      {" "}
                      {detail.organization}
                    </Text>
                    <View style={{ height: "100%", width: 1, backgroundColor: "#495970" }}></View>
                    <Text style={{ fontSize: 10, fontFamily: "Lato 400", color: "#495970" }}>
                      {" "}
                      {detail.location}
                    </Text>
                  </View>
                  <Text style={{ width: 337, fontSize: 10, fontFamily: "Lato 400", color: "#676A6D" }}>
                    {" "}
                    {detail.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>



          <View style={{ flexDirection: "column", width: "595", paddingLeft: 23, }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, width: 525 }}>
              <Text style={{ fontSize: 16, fontFamily: "Lato 700", color: "#495970", }}>
                SKILLS
              </Text>
              <View style={{ backgroundColor: "#B5BCC5", width: "450", height: 1 }}></View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, paddingTop: 10, columnGap: 30 }}>
              {data.skills?.map((detail, index) => {
                const calculateWidthPercentage = (rating) => {
                  let ratingPercentage = 0;
                  if (rating && rating.length > 0) {
                    const zerosCount = rating.filter((val) => val === 0).length;

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
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }} key={index}>
                    <Text style={{ color: "#545554", fontSize: 12, width: 100, fontFamily: "Lato 300" }}>
                      {detail.skill}
                    </Text>
                    <View style={{ width: "100", height: 3, backgroundColor: "#DCDDDE", }}>
                      <View style={{ width: `${ratingPercentage}%`, height: "100%", backgroundColor: "#2EA0D7" }}></View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>



          <View style={{ flexDirection: "column", width: "595", paddingBottom: 2, paddingLeft: 20, paddingTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, width: 525 }}>
              <Text style={{ fontSize: 16, fontFamily: "Lato 700", color: "#495970", }}>
                INTERESTS
              </Text>
              <View style={{ backgroundColor: "#B5BCC5", width: "450", height: 1 }}></View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", width: 595, gap: 6, paddingTop: 10 }}>
              {data.hobbies?.map((detail, index) => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 130, fontSize: 10 }}>
                  <Text style={{ color: "#282829", }}>&#8226;</Text>
                  <Text style={{ color: "#282829", fontFamily: "Lato 400" }}>{detail.title}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ flexDirection: "column", width: "595", paddingBottom: 4, paddingLeft: 20, paddingTop: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 16, fontFamily: "Lato 700", color: "#495970", }}>
                LANGUAGES
              </Text>
              <View style={{ backgroundColor: "#B5BCC5", width: "420", height: 1 }}></View>
            </View>
            <View style={{ flexDirection: "row", gap: 1, paddingTop: 8 }}>
              {data?.languages?.map((detail, index) => (
                <Text key={index} style={{ color: "#545554", fontSize: 14, fontFamily: "Lato 400", }}>
                  {detail.languages} {","}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default Template12;

