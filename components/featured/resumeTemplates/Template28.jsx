import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template28({ data }) {

    return (
        <Page size="A4" style={{ paddingVertical: 24 }}>
            <View style={{ flexDirection: 'row', gap: "1.5rem" }}>

                <View style={{ width: "191px", marginVertical: -24 }}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: "#2AB6BB", gap: "18px", }}>
                        <View style={{ alignItems: "center", marginTop: "35px", flexDirection: "column", }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" }} />
                            ) : (
                                <Image src="/images/services/profile.png" alt="" style={{ width: "134px", marginBottom: "16px", height: "134px", borderRadius: "50%" }} />
                            )}
                            <View style={{ display: "flex" }}>
                                <Text style={{ color: "#fff", fontWeight: 400, fontSize: "24px", }}>{data.firstName}</Text>
                                <Text style={{ color: "#fff", fontWeight: 400, fontSize: "24px", }}>{data.lastName}</Text>
                            </View>
                            <Text style={{ fontSize: "8px", fontWeight: 500, color: "#00AEEF" }}>{data.designation}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>
                            <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                <Text style={{ color: "white" }}>CONTACT</Text>

                            </View>
                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px", paddingTop: "5px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/telephone_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/message_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{data.email}</Text>
                                </View>
                            )}
                            {data?.location && (
                                <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", marginLeft: "24px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", flexDirection: "row", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_white.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.languages?.length > 0 && (
                            <>
                                <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                    <Text style={{ color: "white" }}>LANGUAGES</Text>

                                </View>
                                <View style={{ flexDirection: "column", color: "white", paddingRight: "16px", gap: "8px", justifyContent: "space-between", marginLeft: "24px" }}>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                            <Text style={{ fontSize: "12px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{detail.languages}</Text>
                                            <View style={{ flexDirection: "row", gap: "16", marginTop: "4px" }}>
                                                {[...Array(3)].map((_, i) => (
                                                    <View key={i}>
                                                        {
                                                            detail.rating[i] === 0 ? (
                                                                <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M4 8.42383C6.20914 8.42383 8 6.63292 8 4.42379C8 2.21467 6.20914 0.423828 4 0.423828C1.79086 0.423828 0 2.21467 0 4.42379C0 6.63292 1.79086 8.42383 4 8.42383Z" fill="white" />
                                                                </Svg>
                                                            ) : (
                                                                <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.423828C1.79135 0.423828 0 2.21518 0 4.42383C0 6.63248 1.79135 8.42383 4 8.42383C6.20864 8.42383 8 6.63248 8 4.42383C8 2.21518 6.20987 0.423828 4 0.423828Z" fill="#009C9E" />
                                                                </Svg>

                                                            )
                                                        }
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}
                        {data?.hobbies?.length > 0 && (
                            <View style={{ flexDirection: "column", gap: "16px", }}>

                                <View style={{ padding: "8px 24px", backgroundColor: "#009C9E", marginTop: "4px", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "190px" }}>

                                    <Text style={{ color: "white" }}>HOBBIES</Text>

                                </View>
                                <View style={{ display: "grid", gridTemplateColumns: "2 1fr", gap: "16px", marginLeft: "24px" }}>
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
                <View style={{ width: "407px", padding: " 16px", display: "flex", flexDirection: "column", gap: "36px" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", paddingTop: "26px" }}>
                        <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                            <Image style={{ width: "27px", height: "27px", display: "flex", alignItems: "flex-end" }} src="/images/services/profile_sky.png" alt="" />
                            <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "90%" }}>
                                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>About me</Text>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: "#787879", fontSize: "16px", paddingLeft: 8, fontWeight: 400 }}>{data.summery}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>
                        <View style={{}}>
                            <Image style={{ width: "27px", height: "27px" }} src="/images/services/education_sky.png" alt="" />
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EDUCATION</Text>
                                <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 16 }} >
                                {data?.education?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                                                <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }} >
                                                    <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                                                    <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.instituteName}</Text>

                                                </View>
                                                <Text style={{ color: "#414042", fontSize: "9px", fontWeight: 400, }}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>

                                                <Text style={{ color: "#787879", fontSize: "9px", fontWeight: 400 }}>{detail.qualification} - {detail.specialization}</Text>
                                            </View>

                                        </View>
                                    </>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, width: "100%" }}>
                        <View style={{}}>
                            <Image style={{ width: "27px", height: "27px" }} src="/images/services/experience_sky.png" alt="" />
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 16, width: "90%" }}>
                            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>EXPERIENCE</Text>
                                <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", gap: 2 }} >
                                {data?.experience?.map((detail, index) => (

                                    <View key={index} style={{ display: "flex", alignItems: "start", gap: 4 }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }} >
                                                <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                                                <Text style={{ color: "#414042", fontSize: "11px", fontWeight: 400, }}>{detail.organization}</Text>

                                            </View>
                                            <Text style={{ color: "#414042", fontSize: "9px", fontWeight: 400, }}>{" "}{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                        </View>


                                        <Text style={{ color: "#787879", fontSize: "9px", fontWeight: 400 }}>{detail.designation} </Text>
                                        <Text style={{ color: "#787879", fontSize: "9px", fontWeight: 400 }}>{detail.description} </Text>


                                    </View>

                                ))}
                            </View>
                        </View>
                    </View>

                    {data?.skills?.length > 0 && (


                        <View style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", paddingTop: "26px" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", width: "100%" }}>
                                <Image style={{ width: "27px", height: "27px", display: "flex", alignItems: "flex-end" }} src="/images/services/skills_sky.png" alt="" />
                                <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "90%" }}>
                                    <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>SKILLS</Text>
                                    <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", gap: 8, justifyContent: "space-between", width: "100%" }}>
                                {data?.skills?.map((detail, index) => (
                                    <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8", width: "100%" }}>
                                        <Text style={{ fontSize: 14 }}>
                                            {detail.skill}
                                        </Text>
                                        <View style={{ display: "flex", gap: 24, flexDirection: "row", marginTop: "4px" }}>
                                            {[...Array(5)].map((_, i) => (
                                                <View key={i}>
                                                    {
                                                        detail.rating[i] === 0 ? (
                                                            <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path d="M4 8.52344C6.20914 8.52344 8 6.73252 8 4.5234C8 2.31428 6.20914 0.523438 4 0.523438C1.79086 0.523438 0 2.31428 0 4.5234C0 6.73252 1.79086 8.52344 4 8.52344Z" fill="#D1D3D4" />
                                                            </Svg>

                                                        ) : (
                                                            <Svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.423828C1.79135 0.423828 0 2.21518 0 4.42383C0 6.63248 1.79135 8.42383 4 8.42383C6.20864 8.42383 8 6.63248 8 4.42383C8 2.21518 6.20987 0.423828 4 0.423828Z" fill="#009C9E" />
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
                </View>
            </View>
        </Page>

    )
}

export default Template28


