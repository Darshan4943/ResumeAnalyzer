import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect,Font,Defs, ClipPath } from '@react-pdf/renderer';

const Resume12 = ({ data }) => {
//   console.log(4, data.experience);

  return (
    <Page size="A4">
      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 12, width: 794, minHeight: 1122 }}>
        <View style={{ width: "100%", height: 236 }}>
          <View style={{ backgroundColor: "#0C2438", height: "100%", position: "relative" }}>
            <View style={{ position: "absolute", bottom: 0, width: 582, height: 100, backgroundColor: "#2EA0D7" }}>
              <View style={{ flexDirection: "column", paddingLeft: 80 }}>
                <Text style={{ fontSize: 38, color: "#fff", }}>
                  {data.firstName} {data.lastName}
                </Text>
                <Text style={{ fontSize: 16, color: "#fff"}}>
                  {data.designation}
                </Text>
              </View>
            </View>
            <View style={{ position: "absolute", right: 58, bottom: -26 }}>
              {data.profilePhoto ? (
                <Image
                  source={{ uri: URL.createObjectURL(data.profilePhoto) }}
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                />
              ) : (
                <img src="/images/services/profile.png" alt="" 
                  style={{ width: 208, height: 208, borderRadius: 104 }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", width: "88.41%", gap: 8 }}>
          <View style={{ width: "100%", flexDirection: "column", gap: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#495970"}}>
              CONTACTS
            </Text>
            <View style={{ width: "90.62%", flexDirection: "row", gap: 8 }}>
              <View style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2, width: "18.72%", maxWidth: 130 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#495970" }}>PHONE</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", color: "#8B8C8C" }}>{data.mobileNumber}</Text>
              </View>
              <View style={{ backgroundColor: "#B5BCC5", width: 1, height: 50 }}></View>
              <View style={{ maxWidth: 200, width: "auto", gap: 2, flexDirection: "column" }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#495970" }}>EMAIL</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", color: "#8B8C8C" }}>{data.email}</Text>
              </View>
              <View style={{ backgroundColor: "#B5BCC5", width: 1, height: 50 }}></View>
              <View style={{ maxWidth: 225, width: "auto", gap: 2, flexDirection: "column" }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#495970" }}>ADDRESS</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", color: "#8B8C8C", breakMode: "word-wrap" }}>{data.location}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", gap: 4, width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#495970", }}>EDUCATION</Text>
              <View style={{ backgroundColor: "#B5BCC5", width: 572, height: 1 }}></View>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 7, flexWrap: "wrap" }}>
              {data?.education?.map((detail, index) => (
                <View style={{ flexDirection: "column", gap: 2, width: 337 }}>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <View style={{ flexDirection: "column", gap: 2 }}>
                      {detail.duration?.end?.year && (
                        <>
                          <Text style={{ fontSize: 14, fontWeight: "700", color: "#495970"}}>
                            {detail.duration?.start?.year}
                          </Text>
                          <Text style={{ fontSize: 14, fontWeight: "700", color: "#495970" }}>
                            {detail.duration?.end?.year}
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={{ backgroundColor: "#B5BCC5", height: "auto", width: 1 }}></View>
                    <View style={{ flexDirection: "column", gap: 2, width: "100%"}}>
                      <Text style={{ fontSize: 12, fontWeight: "400", color: "#495970" }}>
                        {detail.instituteName}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "700", color: "#495970" }}>
                        {detail.qualification}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: "#676A6D", }}>
                    {detail.specialization}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* EXPERIENCE  */}
          <View style={{ flexDirection: "column", gap: 4, width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#495970", }}>EXPERIENCES</Text>
              <View style={{ backgroundColor: "#B5BCC5", width: 572, height: 1 }}></View>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 7, }}>
              {data?.experience?.map((detail, index) => (
                <View style={{ flexDirection: "column", gap: 6, width: "100%" }}>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: "#495970", }}>
                    {detail.duration?.start?.year}-{" "}
                    {detail.currentlyWorking ? "Present" : detail.duration?.end?.year}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#495970"}}>
                    {detail.designation}
                  </Text>
                  <View style={{ flexDirection: "row", width: "33.7%", gap: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: "#495970", maxWidth: 180, }}>
                      {detail.organization}
                    </Text>
                    <View style={{ backgroundColor: "#495970", height: "100%", width: 1 }}></View>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: "#495970"}}>
                      {detail.location}
                    </Text>
                  </View>
                  <Text style={{ width: 337, fontSize: 12, fontWeight: "400", color: "#676A6D" }}>
                    {detail.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* SKILLS   */}
          <View style={{ flexDirection: "column", width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#495970"}}>SKILLS</Text>
              <View style={{ backgroundColor: "#B5BCC5", width: "100%", height: 1 }}></View>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 2, paddingTop: 4,  }}>
              {data.skills?.map((detail, index) => {
                const ratingPercentage = calculateWidthPercentage(detail.rating);
                return (
                  <View style={{ flexDirection: "column" }} key={index}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 2, width: 270 }}>
                      <Text style={{ fontSize: 12, color: "#545554", width: 160, fontWeight: "300" }}>
                        {detail.skill}
                      </Text>
                      <View style={{ width: "59.21%", height: 3.78, marginBottom: 1, backgroundColor: "#DCDDDE" }}>
                        <View style={{ height: "100%", backgroundColor: "#2EA0D7", width: `${ratingPercentage}%` }}></View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* INTEREST  */}
          <View style={{ flexDirection: "column", width: "100%", paddingBottom: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#495970"}}>INTERESTS</Text>
              <View style={{ backgroundColor: "#B5BCC5", width: "100%", height: 1 }}></View>
            </View>
            <View style={{ flexDirection: "row",  }}>
              {data.hobbies?.map((detail, index) => (
                <Text style={{ backgroundColor: "#B5BCC5", color: "black", padding: 1, borderRadius: 100 }} key={index}>
                  {detail.title}
                </Text>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "100%", paddingBottom: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#495970" }}>LANGUAGES</Text>
              <View style={{ backgroundColor: "#B5BCC5", width: "100%", height: 1 }}></View>
            </View>
            <View style={{ flexDirection: "row", gap: 1, paddingTop: 2 }}>
              {data?.languages?.map((detail, index) => (
                <View key={index}>
                  <Text style={{ color: "#545554", fontWeight: "400", fontSize: 14}}>
                    {detail.languages} {","}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default Resume12;
