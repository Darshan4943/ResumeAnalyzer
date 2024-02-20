import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font, Defs, ClipPath, data } from '@react-pdf/renderer';
import React from 'react'

const Template44 = ({ data }) => {
  console.log(5, data)
  return (
    <Page size="A4">
      <View style={{ width: 595, display: "flex", flexDirection: "row", }}>

        <View style={{ width: 207, padding: 42, flexDirection: "column", gap: 34, backgroundColor: "#C7EAFB", minHeight: 841 }}>


          <View style={{}}>
            {data.profilePhoto ? (
              <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "123px", marginBottom: "16px", height: "123px", borderRadius: "50%" }} />
            ) : (
              <Image src="/images/services/profile.png" alt="" style={{ width: "123px", height: "123px", borderRadius: "50%" }} />
            )}
          </View>

          <View style={{ flexDirection: "column", gap: 16, alignItems: "center" }}>
            <Text style={{ fontWeight: 400, fontSize: 14, color: "#2D3033" }}>Profile</Text>
            <Text style={{ fontWeight: 400, fontSize: 10, color: "#6D6E71" }}>{data.summery ? <>{data.summery}</> : <>About</>}</Text>
          </View>

          <View style={{ width: 123, height: 1, backgroundColor: "#A7A9AC" }}></View>

          <View style={{ flexDirection: "column", gap: 16, justifyContent: "center", alignItems: "center" }}>

            <View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: "#2D3033" }}>contact me</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", gap: 2 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#282829", }}>Address</Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: "#282829" }}>{data.location ? <>{data.location}</> : <>Your Address</>}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", gap: 2 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#282829", }}>Mobile  </Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: "#282829" }}>{data.mobileNumber ? (<>{data.mobileNumber}</>) : (<>Your Phone</>)}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", gap: 2 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#282829", }}>Email     </Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: "#282829" }}>{data.email ? <>{data.email}</> : <>Your Email</>}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", gap: 2 }}>
              <Text style={{ fontWeight: 400, fontSize: 12, color: "#282829", }}>Website</Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: "#282829" }}>{data.sociaLinks ? <>{data.sociaLinks}</> : <>Your Websites</>}</Text>
            </View>

          </View>

          <View style={{ width: 123, height: 1, backgroundColor: "#A7A9AC" }}></View>

          <View style={{ flexDirection: "column", gap: 16, width: "100%" }}>
            <View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: "#2D3033" }}>Personal Skills</Text>
            </View>
            <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
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

                      display: "flex",
                      flexDirection: "column",
                      width: "100%"
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        width: "100%"
                      }}
                    >
                      <Text
                        style={{
                          color: "#282829",
                          fontSize: "10px",
                          fontWeight: "400",
                          width: "80px",
                        }}
                      >
                        {detail.skill}
                      </Text>
                      <View
                        style={{
                          width: "60px",
                          height: "6px",
                          display: "flex",
                          marginBottom: "1px",
                          backgroundColor: "#A7A9AC",
                        }}
                      >
                        <View
                          style={{
                            width: `${ratingPercentage}%`,
                            height: "100%",
                            backgroundColor: "#282829",
                          }}
                        ></View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={{ width: 388, padding: 42, display: "flex", flexDirection: "column", gap: 44 }}>

          <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Text style={{ fontWeight: 400, fontSize: 40, color: "#0D0D0D" }}>{data.firstName ? <>{data.firstName}</> : <>First Name</>}{data.lastName ? <>{data.lastName}</> : <>Last Name</>}</Text>
            <View>
              <Text style={{ fontWeight: 400, fontSize: 20, color: "#0D0D0D" }}>{data.designation ? <>{data.designation}</> : <>Designation</>}</Text>
              <View style={{ width: 36, height: 2, backgroundColor: "#BCBEC0" }}></View>
            </View>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <View style={{ backgroundColor: "#2D3033", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: 400, fontSize: 14, color: "#FFFFFF" }}>EXPERIENCE</Text>
            </View>
            {data?.experience?.map((detail, index) => (
              <View style={{ flexDirection: "column", gap: 4 }}>
                <Text style={{ fontWeight: 400, fontSize: 14, color: "#2D3033" }}>{detail.organization ? (<>{detail.organization}</>) : (<>organization</>)} / {detail.duration?.start?.year}-{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#6D6E71" }}>{detail.designation ? (<>{detail.designation}</>) : (<>Designation</>)}</Text>
                <Text style={{ fontWeight: 400, fontSize: 10, color: "#6D6E71" }}>{detail.description ? (<>{detail.description}</>) : (<>Description</>)}</Text>
              </View>
            ))}
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <View style={{ backgroundColor: "#2D3033", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: 400, fontSize: 14, color: "#FFFFFF" }}>EDUCATION</Text>
            </View>
            {data?.education?.map((detail, index) => (
              <View>
                <Text style={{ fontWeight: 400, fontSize: 13, color: "#2D3033" }}>{detail.qualification} / {detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#6D6E71" }}>{detail.instituteName}</Text>
              </View>
            ))}
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <View style={{ backgroundColor: "#2D3033", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: 400, fontSize: 14, color: "#FFFFFF" }}>CERTIFICATION</Text>
            </View>
            {data?.course?.map((detail, index) => (
              <View>
                <Text style={{ fontWeight: 400, fontSize: 13, color: "#2D3033" }}>{detail.courseName} / {detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                <Text style={{ fontWeight: 400, fontSize: 12, color: "#6D6E71" }}>{detail.issuedBy}</Text>
              </View>
            ))}


          </View>


        </View>

      </View>
    </Page>
  )
}

export default Template44