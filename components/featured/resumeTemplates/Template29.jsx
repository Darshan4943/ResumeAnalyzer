import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template29({ data }) {

    return (
        <Page size="A4" style={{}}>
            <View style={{ flexDirection: 'row', }}>

                <View style={{ width: "221px" ,}}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: "#324955",  gap: "30px", }}>
                        <View style={{ paddingLeft: 24, marginTop: "35px", flexDirection: "column", gap: 24 }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "173",  height: "173", borderRadius: "50%" }} />
                            ) : (
                                <Image src="/images/services/profile.png" alt="" style={{ width: "173", height: "173", borderRadius: "50%" }} />
                            )}
                            <View style={{ width: "173px" }}>
                                {data?.mobileNumber && (
                                    <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", paddingRight: " 4px", }}>
                                        <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/telephone_white.png" alt="" />
                                        </View>
                                        <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#BEC5C6", }}>{data.mobileNumber}</Text>
                                    </View>
                                )}
                                {data?.email && (
                                    <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", }}>
                                        <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/message_white.png" alt="" />
                                        </View>
                                        <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#BEC5C6", }}>{data.email}</Text>
                                    </View>
                                )}
                                {data?.location && (
                                    <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", }}>
                                        <View style={{ height: "24px", flexDirection: "row", alignItems: "center" }}>
                                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_white.png" alt="" />
                                        </View>
                                        <Text style={{ fontSize: "10px", flexDirection: "row", fontWeight: 400, color: "#BEC5C6", }}>{data.location}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={{ width: "173px", backgroundColor: "#BEC5C6", height: 2 }}></View>

                        </View>

                        {data?.skills?.length > 0 && (


                            <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", paddingLeft: "26px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: "8px 24px", borderColor: "white", borderWidth: 2 }}>
                                    <Text style={{ color: "#FFF" }}>SKILLS</Text>
                                </View>
                                <View style={{ flexDirection: "column", gap: 16, justifyContent: "space-between", width: "100%" }}>
                                    {data?.skills?.map((detail, index) => (
                                        <View key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "8px", width: "100%" }}>
                                            <Text style={{ fontSize: 14, color: "#FFF" }}>
                                                {detail.skill}
                                            </Text>
                                            <View style={{ display: "flex", gap: 16, flexDirection: "row", }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <View key={i}>
                                                        {
                                                            detail.rating[i] === 0 ? (
                                                                <Svg width="13" height="13" viewBox="0 0 13 13" fill="#324955" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M0.5 12.5V0.5H12.5V12.5H0.5Z" stroke="white" stroke-miterlimit="10" />
                                                                </Svg>



                                                            ) : (
                                                                <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M13 0H0V13H13V0Z" fill="white" />
                                                                </Svg>

                                                            )
                                                        }
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>

                        )}


                        {data?.languages?.length > 0 && (


                            <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", paddingLeft: "26px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: "8px 24px", borderColor: "white", borderWidth: 2 }}>
                                    <Text style={{ color: "#FFF" }}>LANGUAGES</Text>
                                </View>
                                <View style={{ flexDirection: "column", gap: 16, justifyContent: "space-between", width: "100%" }}>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "8px", width: "100%" }}>
                                            <Text style={{ fontSize: 14, color: "#FFF" }}>
                                                {detail.languages}
                                            </Text>
                                            <View style={{ display: "flex", gap: 24, flexDirection: "row", }}>
                                                {[...Array(3)].map((_, i) => (
                                                    <View key={i}>
                                                        {
                                                            detail.rating[i] === 0 ? (
                                                                <Svg width="13" height="13" viewBox="0 0 13 13" fill="#324955" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M0.5 12.5V0.5H12.5V12.5H0.5Z" stroke="white" stroke-miterlimit="10" />
                                                                </Svg>



                                                            ) : (
                                                                <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M13 0H0V13H13V0Z" fill="white" />
                                                                </Svg>

                                                            )
                                                        }
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>

                        )}
                        {data?.hobbies?.length > 0 && (
                            <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", paddingLeft: "26px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: "8px 24px", borderColor: "white", borderWidth: 2 }}>
                                    <Text style={{ color: "#FFF" }}>HOBBIES</Text>
                                </View>
                                <View style={{ display: "grid", gridTemplateColumns: "2 1fr", gap: "16px", }}>
                                    {data?.hobbies?.map((item, index) => (
                                        <View key={index} style={{ color: "white", fontSize: "12px" }}>
                                            <Text>
                                                {item?.title}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                    </View>
                </View>
                <View style={{ width: "373px", padding: " 24px", display: "flex", flexDirection: "column", gap: "24px" }}>

                    <View style={{ flexDirection: "column", }}>
                        <Text style={{ color: "#324955", fontWeight: 400, fontSize: "36px", }}>{data.firstName} {data.lastName}</Text>
                        <Text style={{ color: "#A9B0B3", fontWeight: 400, fontSize: "16px", }}>{data.designation}</Text>
                    </View>



                    <View style={{ display: "flex", flexDirection: "column", gap: 8, }}>
                        <Text style={{ color: "#324955", fontWeight: 500, fontSize: "14px" }}>About me</Text>
                        <Text style={{ color: "#6D6E71", fontWeight: 500, fontSize: "12px" }}>{data.summery}</Text>

                    </View>


                    {data?.education?.length > 0 && (
                        <View style={{ display: "flex", flexDirection: "column", }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: "4px 16px", border: "1px",   }}>
                                <Text style={{fontSize: "14px"}}>EDUCATION</Text>
                            </View>
                            <View style={{ backgroundColor: "#324955", width: 1, height: "20px", marginBottom: -6 }}></View>
                            <View style={{ display: "flex", flexDirection: "column", }} >
                                {data?.education?.map((detail, index) => (

                                    <View key={index} style={{ flexDirection: "row", }}>

                                        {index !== data.education.length - 1 && (
                                            <View style={{ backgroundColor: "#324955", width: 1, height: "100%", marginTop: 6 }}></View>
                                        )}

                                        <View style={{ backgroundColor: "#324955", height: 1, width: "16px", marginTop: 6 }}></View>
                                        <Svg style={{ marginTop: 3 }} width="5" height="6" viewBox="0 0 5 6" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M4.40746 1.32031H0.668945V5.51192H4.40746V1.32031Z" stroke="#324955" stroke-width="0.722005" stroke-miterlimit="10" />
                                        </Svg>


                                        <View key={index} style={{ flexDirection: "column", paddingBottom: 16, gap: 4, paddingLeft: 16 }}>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "flex-start" }} >
                                                <Text style={{ color: "#414042", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                                <View style={{ backgroundColor: "#324955", height: "1px", width: "20px" }}></View>
                                                <Text style={{ color: "#414042", fontSize: "12px", fontWeight: 400, }}>{detail.instituteName}</Text>


                                            </View>



                                            <Text style={{ color: "#787879", fontSize: "12px", fontWeight: 400, display: "flex", flexDirection: "column", gap: 4 }}>{detail.qualification} - {detail.specialization}</Text>


                                        </View>

                                    </View>

                                ))}
                            </View>

                        </View>
                    )}


                    {data?.experience?.length > 0 && (
                        <View style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: "4px 16px", border: "1px", width: "50%", }}>
                                <Text style={{ color: "#324955",fontSize: "14px" }}>EXPERIENCE</Text>
                            </View>
                            <View style={{ backgroundColor: "#324955", width: 1, height: "20px", marginBottom: -6 }}></View>
                            <View style={{ display: "flex", flexDirection: "column", }} >
                                {data?.experience?.map((detail, index) => (

                                    <View key={index} style={{ flexDirection: "row", }}>

                                        {index !== data.experience.length - 1 && (
                                            <View style={{ backgroundColor: "#324955", width: 1, height: "100%", marginTop: 6 }}></View>
                                        )}

                                        <View style={{ backgroundColor: "#324955", height: 1, width: "16px", marginTop: 6 }}></View>
                                        <Svg style={{ marginTop: 3 }} width="5" height="6" viewBox="0 0 5 6" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M4.40746 1.32031H0.668945V5.51192H4.40746V1.32031Z" stroke="#324955" stroke-width="0.722005" stroke-miterlimit="10" />
                                        </Svg>


                                        <View key={index} style={{ flexDirection: "column", paddingBottom: 16, gap: 4, paddingLeft: 16 }}>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "flex-start" }} >
                                                <Text style={{ color: "#414042", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                                <View style={{ backgroundColor: "#324955", height: "1px", width: "20px" }}></View>
                                                <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.designation}</Text>


                                            </View>



                                            <Text style={{ color: "#787879", fontSize: "12px", fontWeight: 400, display: "flex", flexDirection: "column", gap: 4 }}>{detail.description}</Text>

                                        </View>

                                    </View>

                                ))}
                            </View>

                        </View>
                    )}





                </View>
            </View>
        </Page >

    )
}

export default Template29


