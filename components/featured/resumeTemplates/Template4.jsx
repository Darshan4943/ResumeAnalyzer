import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template4({ data }) {
    return (
        <Page size="A4">
            <View style={{ flexDirection: 'row', gap: "1.5rem" }}>

                <View style={{ width: "190px" }}>
                    <View style={{ flexDirection: "column", minHeight: "841.7px", height: "100%", backgroundColor: "#282829", gap: "18px", paddingLeft: 24 }}>
                        <View style={{ alignItems: "center", marginTop: "35px", flexDirection: "column", marginLeft: -24 }}>

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
                        <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <View style={{ marginRight: '-12px', marginTop: "4px", alignItems: "center", flexDirection: "row" }}>
                                <Svg width={180} height={43} viewBox="0 0 180 43">
                                    <Path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
                                    <Path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
                                    <Text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white" style={{ fontWeight: '600', fontSize: "14px" }}>
                                        CONTACT
                                    </Text>
                                </Svg>


                            </View>
                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "16px", paddingRight: " 4px", paddingTop: "5px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/telephone_blue.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", marginLeft: "16px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/message_blue.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{data.email}</Text>
                                </View>
                            )}

                            {/* {data?.sociaLinks > 0 && (
                    <View style={{ flexDirection:"row",breakAll:true , gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "40px", paddingRight: " 16px" }}>
                        <View style={{ height: "24px", flexDirection:"row", alignItems: "center" }}>
                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                        </View>
                        <View style={{ flexDirection:"row", fontSize: "11px", paddingTop: "2px", fontWeight: 400, color: "#fff", }}>{data.sociaLinks}</View>
                    </View>
                )} */}
                            {data?.location && (
                                <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", marginLeft: "16px", paddingRight: " 4px" }}>
                                    <View style={{ height: "24px", flexDirection: "row", alignItems: "center" }}>
                                        <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                                    </View>
                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>

                        {data?.languages?.length > 0 && (
                            <>
                                <View style={{ marginRight: '-12px', marginTop: "4px", alignItems: "center", flexDirection: "row" }}>
                                    <Svg width={180} height={43} viewBox="0 0 180 43">
                                        <Path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
                                        <Path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
                                        <Text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white" style={{ fontWeight: '600', fontSize: "14px" }}>
                                            LANGUAGES
                                        </Text>
                                    </Svg>


                                </View>
                                <View style={{ flexDirection: "column", color: "white", paddingRight: "16px", gap: "8px", justifyContent: "space-between", marginLeft: "16px" }}>
                                    {data?.languages?.map((detail, index) => (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                            <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#fff", }}>{detail.languages}</Text>
                                            <View style={{ flexDirection: "row", gap: "0.25rem", marginTop: "4px" }}>
                                                {[...Array(3)].map((_, i) => (
                                                    <View key={i}>
                                                        {
                                                            detail.rating[i] === 0 ? (
                                                                <Svg width={8} height={7} viewBox="0 0 8 7">
                                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                                </Svg>
                                                            ) : (
                                                                <Svg width={8} height={8} viewBox="0 0 8 8">
                                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF" />
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
                            <View style={{ flexDirection: "column", gap: " 16px", }}>

                                <View style={{ marginRight: '-12px', marginTop: "4px", alignItems: "center", flexDirection: "row" }}>
                                    <Svg width={180} height={43} viewBox="0 0 180 43">
                                        <Path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
                                        <Path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
                                        <Text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white" style={{ fontWeight: '600', fontSize: "14px" }}>
                                            HOBBIES
                                        </Text>
                                    </Svg>


                                </View>
                                <View style={{ display: "grid", gridTemplateColumns: "2 1fr", gap: " 16px", marginLeft: "16px" }}>
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
                            <Image style={{ width: "27px", height: "27px", display: "flex", alignItems: "flex-end" }} src="/images/services/profile_img.png" alt="" />
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
                            <Image style={{ width: "27px", height: "27px" }} src="/images/services/education.png" alt="" />
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
                            <Image style={{ width: "27px", height: "27px" }} src="/images/services/education.png" alt="" />
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
                            <Image style={{ width: "27px", height: "27px", display: "flex", alignItems: "flex-end" }} src="/images/services/profile_img.png" alt="" />
                            <View style={{ display: "flex", flexDirection: "column", gap: 4, width: "90%" }}>
                                <Text style={{ color: "#282829", fontWeight: 500, fontSize: "16px" }}>SKILLS</Text>
                                <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", gap: 8, justifyContent: "space-between",width: "100%"  }}>
                                    {data?.skills?.map((detail, index) => (
                                        <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "8",width:"100%" }}>
                                            <Text style={{fontSize:12}}>
                                                {detail.skill}
                                            </Text>
                                            <View style={{ display: "flex", gap: 16, flexDirection: "row", marginTop: "4px" }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <View key={i}>
                                                        {
                                                            detail.rating[i] === 0 ? (
                                                                <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                                </Svg>
                                                            ) : (
                                                                <Svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF" />
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

export default Template4


