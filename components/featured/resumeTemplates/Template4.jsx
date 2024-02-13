import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template4({ data }) {
    return (
        <View style={{flexDirection:'row', gap: "1.5rem" }}>

        <View style={{ width: "260.23px" }}>
            <View style={{ flexDirection: "column", minHeight: "792px", backgroundColor: "#282829", width: "100%", gap: "18px" }}>
                <View style={{  alignItems: "center", marginTop: "35px", flexDirection: "column", width: "100%" }}>
    
                    {data.profilePhoto ? (
                        <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "102px", marginBottom: "16px", height: "102px", borderRadius: "50%" }} />
                    ) : (
                        <Image src="/images/services/profile.png" alt="" style={{ width: "102px", marginBottom: "16px", height: "102px", borderRadius: "50%" }} />
                    )}
                    <Text style={{ color: "#fff", fontWeight: 400,   fontSize: "24px",  }}>{data.firstName}</Text>
                    <Text style={{ color: "#fff", fontWeight: 400,   fontSize: "24px",  }}>{data.lastName}</Text>
                    <Text style={{ fontSize: "8px",   fontWeight: 500, color: "#00AEEF" }}>{data.designation}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <View style={{ marginRight:'-24px', marginTop: "4px", alignItems: "center", flexDirection:"row" }}>
                    <Svg width={258} height={43} viewBox="0 0 180 43">
          <Path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
          <Path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
          <Text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white"  style={{fontWeight:'600',fontSize:"16px"}}>
            CONTACT
          </Text>
        </Svg>
                    </View>
                    {data?.mobileNumber && (
                        <View style={{ flexDirection:"row", gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "40px", paddingRight: " 16px", paddingTop: "5px" }}>
                            <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                <Image style={{ width: "18px", height: "18px" }} src="/images/services/telephone_blue.png" alt="" />
                            </View>
                            <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection:"row", fontWeight: 400, color: "#fff",}}>{data.mobileNumber}</Text>
                        </View>
                    )}
                    {data?.email && (
                        <View style={{ flexDirection:"row",breakAll:true ,gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "40px", paddingRight: " 16px" }}>
                            <View style={{ height: "24px", display: "flex", alignItems: "center" }}>
                                <Image style={{ width: "18px", height: "18px" }} src="/images/services/message_blue.png" alt="" />
                            </View>
                            <Text style={{ fontSize: "10px" ,width:'80%', paddingTop: "2px",flexDirection:"row", fontWeight: 400, color: "#fff", }}>{data.email}</Text>
                        </View>
                    )}
                </View>
                {/* {data?.sociaLinks > 0 && (
                    <View style={{ flexDirection:"row",breakAll:true , gap: "12px", justifyContent:"start" , alignItems: "center", marginLeft: "40px", paddingRight: " 16px" }}>
                        <View style={{ height: "24px", flexDirection:"row", alignItems: "center" }}>
                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                        </View>
                        <View style={{ flexDirection:"row", fontSize: "11px", paddingTop: "2px", fontWeight: 400, color: "#fff", }}>{data.sociaLinks}</View>
                    </View>
                )} */}
                {data?.location && (
                    <View style={{ flexDirection:"row",breakAll:true , justifyContent:"start" ,gap: "12px", alignItems: "center", marginLeft: "40px", paddingRight: " 16px" }}>
                        <View style={{ height: "24px", flexDirection:"row", alignItems: "center" }}>
                            <Image style={{ width: "18px", height: "18px" }} src="/images/services/location_blue.png" alt="" />
                        </View>
                        <Text style={{ fontSize: "10px", flexDirection:"row", fontWeight: 400, color: "#fff",  }}>{data.location}</Text>
                    </View>
                )}
                {data?.languages?.length > 0 && (
                    <>
                        <View style={{ height: "27px",  marginRight:'-24px', marginTop: "4px", alignItems: "center",flexDirection:"row" }}>
                        <Svg width={258}  height={43} viewBox="0 0 180 43">
          <Path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
          <Path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
          <Text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white"  style={{fontWeight:'600',fontSize:"16px"}}>
            LANGUAGES
          </Text>
        </Svg>
                        </View>
    
                        <View style={{  flexDirection: "column", color: "white", paddingRight: "16px", gap: "8px", justifyContent: "space-between", marginLeft: "40px" }}>
                            {data?.languages?.map((detail, index) => (
                                <View key={index} style={{ flexDirection:"row", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                            <Text style={{ fontSize: "10px", paddingTop: "2px" ,flexDirection:"row", fontWeight: 400, color: "#fff",}}>{detail.languages}</Text>
                                    <View style={{ flexDirection:"row", gap: "0.25rem", marginTop: "4px" }}>
                                        {[...Array(5)].map((_, i) => (
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
                    <View style={{ flexDirection:"row", flexDirection: "column", gap: " 16px", paddingBottom:"16px" , }}>
    
                        <View style={{ height: "27px", marginLeft: "19px", marginTop: "4px", alignItems: "center", flexDirection:"row"}}>
                        <Svg width={258} height={43} viewBox="0 0 180 43">
          <Path d="M10.942 32.118H179.514V0.887939H10.942L0.782959 16.5029L10.942 32.118Z" fill="#00AEEF" />
          <Path d="M167.942 42.8819L179.514 32.118L167.942 32.1179V42.8819Z" fill="#007DC5" />
          <Text x="10%" y="40%" dominantBaseline="middle" textAnchor="start" fill="white"  style={{fontWeight:'600',fontSize:"16px"}}>
            HOBBIES
          </Text>
        </Svg>
                        </View>
                        <View style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: " 16px",  marginRight:'-24px', paddingRight: " 16px" }}>
                            {data?.hobbies?.map((item, index) => (
                                <View key={index} style={{ color: "white", fontSize: "12px" }}>
                                    {item?.title}
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
        <View style={{ width: "530px", padding: " 16px", display: "flex", flexDirection: "column", gap: " 16px" }}>
            {/* <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start", paddingTop: "26px" }}>
                <View style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", width: "100%" }}>
                    <Image style={{ width: "27px", height: "27px", display: "flex", alignItems: "flex-end" }} src="/images/services/profile_img.png" alt="" />
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "90%" }}>
                        <Text style={{ color: "#282829", fontWeight: 500,      marginBottom: "2px", fontSize: "16px" }}>About me</Text>
                        <View style={{ height: "1px", width: "95%", backgroundColor: "#282829" }}></View>
                    </View>
                </View>
                <View style={{}}>
                    <Text style={{    color: "#787879",   fontSize: "16px", paddingLeft: "0.5rem", fontWeight: 400 }}>{data.summery}</Text>
                </View>
            </View> */}
            {/* <View style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                <View style={{ paddingTop: "2px" }}>
                    <Image style={{ width: "27px", height: "27px" }} src="/images/services/education.png" alt="" />
                </View>
    
                <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "90%" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <Text style={{ color: "#282829", fontWeight: 500,      fontSize: "16px" }}>EDUCATION</Text>
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
            </View> */}
            <View style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                {/* <View style={{ paddingTop: "2px" }}>
                    <Image style={{ width: "35px", height: "35px" }} src="/images/services/experience.png" alt="" />
                </View> */}
    
                {/* <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "90%" }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <Text style={{ color: "#282829", fontWeight: 500,      fontSize: "16px" }}>EXPERIENCE</Text>
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
                </View> */}
            </View>
            {/* {data?.skills?.length > 0 && (

                <View style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                    <View style={{ paddingTop: "2px" }}>
                        <Image style={{ width: "35px", height: "35px" }} src="/images/services/skills.png" alt="" />
                    </View>
    
                    <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <Text style={{ color: "#282829", fontWeight: 500,      fontSize: "16px" }}>SKILLS</Text>
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
            )} */}
        </View>
    </View>
    
    )
}

export default Template4


