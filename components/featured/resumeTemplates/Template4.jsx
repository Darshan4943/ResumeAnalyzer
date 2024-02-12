import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template4({ data }) {
    return (
        <View style={{flexDirection:'row', gap: "1.5rem" }}>

        <View style={{ width: "260.23px" }}>
            <View style={{ flexDirection: "column", minHeight: "1131px", backgroundColor: "#282829", width: "100%", gap: "18px" }}>
                <View style={{  alignItems: "center", marginTop: "35px", flexDirection: "column", width: "100%" }}>
    
                    {/* {data.profilePhoto ? (
                        <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "102px", marginBottom: "16px", height: "102px", borderRadius: "50%" }} />
                    ) : (
                        <Image src="/images/services/profile.png" alt="" style={{ width: "102px", marginBottom: "16px", height: "102px", borderRadius: "50%" }} />
                    )} */}
                    <Text style={{ color: "#fff", fontWeight: 400,   fontSize: "24px",  }}>{data.firstName}</Text>
                    <Text style={{ color: "#fff", fontWeight: 400,   fontSize: "24px",  }}>{data.lastName}</Text>
                    <Text style={{ fontSize: "8px",   fontWeight: 500, color: "#00AEEF" }}>{data.designation}</Text>
                </View>
                {/* <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <View style={{ height: "27px", marginLeft: "19px", marginTop: "4px", alignItems: "center", display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="258" viewBox="0 0 180 43" fill="none">
                            <path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
                            <path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
                            <text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white" fontSize="16" fontWeight="600">CONTACT </text>
                        </svg>
                    </View>
                    {data?.mobileNumber && (
                        <View style={{ display: "flex", gap: "0.25rem", alignItems: "flex-start", marginLeft: "40px", paddingRight: "1rem", paddingTop: "5px" }}>
                            <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                <img style={{ width: "18px", height: "18px" }} src="/images/services/telephone_blue.png" alt="" />
                            </View>
                            <Text style={{ fontSize: "11px", paddingTop: "2px", display: "flex", fontWeight: 400, color: "#fff", lineHeight: "normal" }}>{data.mobileNumber}</Text>
                        </View>
                    )}
                    {data?.email && (
                        <View style={{ display: "flex", gap: "0.25rem", alignItems: "flex-start", marginLeft: "40px", paddingRight: "1rem" }}>
                            <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                <img style={{ width: "18px", height: "18px" }} src="/images/services/message_blue.png" alt="" />
                            </View>
                            <Text style={{ fontSize: "11px", paddingTop: "2px", display: "flex", fontWeight: 400, color: "#fff", lineHeight: "normal" }}>{data.email}</Text>
                        </View>
                    )}
                </View> */}
                {/* {data?.sociaLinks > 0 && (
                    <View style={{ display: "flex", gap: "0.25rem", alignItems: "flex-start", marginLeft: "40px", paddingRight: "1rem" }}>
                        <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                            <img style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                        </View>
                        <View style={{ display: "flex", fontSize: "11px", paddingTop: "2px", fontWeight: 400, color: "#fff", lineHeight: "normal" }}>{""}</View>
                    </View>
                )}
                {data?.location && (
                    <View style={{ display: "flex", gap: "0.25rem", alignItems: "flex-start", marginLeft: "40px", paddingRight: "1rem" }}>
                        <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                            <img style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                        </View>
                        <View style={{ fontSize: "11px", paddingTop: "2px", display: "flex", fontWeight: 400, color: "#fff", lineHeight: "normal" }}>{data.location}</View>
                    </View>
                )}
                {data?.languages?.length > 0 && (
                    <>
                        <View style={{ height: "27px", marginLeft: "19px", marginTop: "4px", alignItems: "center", display: "flex" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="258" viewBox="0 0 180 43" fill="none">
                                <path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
                                <path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
                                <text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white" fontSize="16" fontWeight="600">LANGUAGES </text>
                            </svg>
                        </View>
    
                        <View style={{ display: "flex", flexDirection: "column", color: "white", paddingRight: "2rem", gap: "0.25rem", justifyContent: "space-between", marginLeft: "40px" }}>
                            {data?.languages?.map((detail, index) => (
                                <View key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                                    {detail.languages}
                                    <View style={{ display: "flex", gap: "0.25rem", marginTop: "4px" }}>
                                        {[...Array(3)].map((_, i) => (
                                            <View key={i}>
                                                {
                                                    detail.rating[i] === 0 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF" />
                                                        </svg>
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
                    <View style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingBottom: "1rem" }}>
    
                        <View style={{ height: "27px", marginLeft: "19px", marginTop: "4px", alignItems: "center", display: "flex" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="258" viewBox="0 0 180 43" fill="none">
                                <path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
                                <path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
                                <text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white" fontSize="16" fontWeight="600">HOBBIES </text>
                            </svg>
                        </View>
                        <View style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginLeft: "40px", paddingRight: "1rem" }}>
                            {data?.hobbies?.map((item, index) => (
                                <View key={index} style={{ color: "white", fontSize: "12px" }}>
                                    {item?.title}
                                </View>
                            ))}
                        </View>
                    </View>
                )} */}
            </View>
        </View>
        {/* <View style={{ width: "530px", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start", paddingTop: "26px" }}>
                <View style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", width: "100%" }}>
                    <img style={{ width: "27px", height: "27px", display: "flex", alignItems: "flex-end" }} src="/images/services/profile_img.png" alt="" />
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "90%" }}>
                        <Text style={{ color: "#282829", fontWeight: 500,    lineHeight: "normal", marginBottom: "2px", fontSize: "16px" }}>About me</Text>
                        <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                    </View>
                </View>
                <View style={{}}>
                    <Text style={{    color: "#787879", lineHeight: "normal", fontSize: "16px", paddingLeft: "0.5rem", fontWeight: 400 }}>{data.summery}</Text>
                </View>
            </View>
            <View style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                <View style={{ paddingTop: "2px" }}>
                    <img style={{ width: "27px", height: "27px" }} src="/images/services/education.png" alt="" />
                </View>
    
                <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "90%" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <Text style={{ color: "#282829", fontWeight: 500,    lineHeight: "normal", fontSize: "16px" }}>EDUCATION</Text>
                        <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                    </View>
                    {data?.education?.map((detail, index) => (
                        <>
                            <View key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <View style={{ display: "flex", gap: "0.5rem" }}>
                                    <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                                    <View style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                        <Text style={{ color: "#414042", fontSize: "11px",    fontWeight: 400, lineHeight: "normal" }}>{detail.instituteName}</Text>
                                        <Text style={{ color: "#787879", fontSize: "9px",    fontWeight: 400 }}>{detail.qualification} - {detail.specialization}</Text>
                                    </View>
                                </View>
                                <Text style={{ color: "#414042", fontSize: "9px",    fontWeight: 400, lineHeight: "normal" }}>{" "}{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                            </View>
                        </>
                    ))}
                </View>
            </View>
            <View style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                <View style={{ paddingTop: "2px" }}>
                    <img style={{ width: "35px", height: "35px" }} src="/images/services/experience.png" alt="" />
                </View>
    
                <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "90%" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <Text style={{ color: "#282829", fontWeight: 500,    lineHeight: "normal", fontSize: "16px" }}>EXPERIENCE</Text>
                        <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                    </View>
    
                    {data.experience?.map((detail, index) => (
                        <>
                            <View key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <View style={{ display: "flex", gap: "0.5rem" }}>
                                    <Text style={{ marginTop: "-1px" }}>{">"}</Text>
                                    <View style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                        <Text style={{ color: "#414042", fontSize: "11px",    fontWeight: 400, lineHeight: "normal" }}>{detail.organization}</Text>
                                        <Text style={{ color: "#787879", fontSize: "9px",    fontWeight: 400 }}>{detail.designation}</Text>
                                        <Text style={{ color: "#787879", fontSize: "9px",    fontWeight: 400 }}>{detail.description}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: "9px", color: "#414042" }}>  {" "}{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                            </View>
                        </>
                    ))}
                </View>
            </View>
            {data?.skills?.length > 0 && (
                <View style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                    <View style={{ paddingTop: "2px" }}>
                        <img style={{ width: "35px", height: "35px" }} src="/images/services/skills.png" alt="" />
                    </View>
    
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <Text style={{ color: "#282829", fontWeight: 500,    lineHeight: "normal", fontSize: "16px" }}>SKILLS</Text>
                            <View style={{ height: "1px", marginTop: "4px", width: "95%", backgroundColor: "#282829" }}></View>
                        </View>
    
                        <View style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", justifyContent: "space-between", width: "100%" }}>
                            {data?.skills?.map((detail, index) => (
                                <View key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                                    {detail.skill}
                                    <View style={{ display: "flex", gap: "0.25rem", marginTop: "4px" }}>
                                        {[...Array(5)].map((_, i) => (
                                            <View key={i}>
                                                {
                                                    detail.rating[i] === 0 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF" />
                                                        </svg>
                                                    )
                                                }
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            )}
        </View> */}
    </View>
    
    )
}

export default Template4


