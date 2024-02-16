import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';
function Template38({ data }) {

    return (
        <Page size="A4" style={{ padding: 24 }}>
            <View style={{ flexDirection: 'row' }}>

                <View style={{ width: "195px" }}>
                    <View style={{ flexDirection: "column", minHeight: "792.7px", height: "100%", gap: "18px", }}>
                        <View style={{  marginTop: "35px", flexDirection: "column", }}>

                            {data.profilePhoto ? (
                                <Image src={URL.createObjectURL(data.profilePhoto)} alt="" style={{ width: "174px", marginBottom: "16px", height: "174px", borderRadius: "50%" }} />
                            ) : (
                                <Image src="/images/services/profile.png" alt="" style={{ width: "174px", height: "174px", borderRadius: "50%" }} />
                            )}

                        </View>


                        <View style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", paddingTop: "26px" }}>




                            <Text style={{ color: "#C49A6C", fontWeight: 500, fontSize: "12px" }}>About me</Text>



                            <Text style={{ color: "#58595B", fontSize: "14px", fontWeight: 400 }}>{data.summery}</Text>

                        </View>

                        <View style={{ height: "1px", width: "95%", backgroundColor: "#C49A6C" }}></View>



                        <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>



                            <Text style={{ color: "#C49A6C", fontWeight: 500, fontSize: "16px" }}>EDUCATION</Text>



                            <View style={{ display: "flex", flexDirection: "column", gap: 16, }} >
                                {data?.education?.map((detail, index) => (
                                    <>
                                        <View key={index} style={{ display: "flex", flexDirection: "row", gap: 16, alignItems: "start" }}>
                                            <View style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "space-between", }}>
                                                <Text style={{ color: "#414042", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.start?.year}-{detail.duration?.end?.year}</Text>
                                                <Text style={{ color: "#787879", fontSize: "12px", fontWeight: 400 }}>{detail.qualification} - {detail.specialization}</Text>
                                                <Text style={{ color: "#414042", fontSize: "12px", fontWeight: 400, }}>{detail.instituteName}</Text>

                                            </View>

                                        </View>
                                    </>
                                ))}
                            </View>
                        </View>
                        <View style={{ height: "1px", width: "95%", backgroundColor: "#C49A6C" }}></View>


                        <View style={{ display: "flex", flexDirection: "column", gap: "8" }}>
                            <Text style={{ color: "#C49A6C", fontSize: "14px", fontWeight: 400, }}>CONTACT</Text>

                            {data?.mobileNumber && (
                                <View style={{ flexDirection: "row", gap: "12px", justifyContent: "start", alignItems: "center", paddingRight: " 4px", paddingTop: "5px" }}>

                                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M0 0V12H12V0H0ZM9.47543 8.97354L9.1538 9.29116L9.14739 9.2847C9.01155 9.39187 8.85391 9.48096 8.68732 9.5481C8.53097 9.60879 8.37719 9.64752 8.217 9.66688C8.14395 9.67463 6.437 9.83603 4.31867 7.70175C2.78599 6.15753 2.22214 5.02002 2.37079 3.77534C2.38873 3.62041 2.4259 3.46546 2.48742 3.30277C2.55405 3.13234 2.64246 2.97353 2.75011 2.83667L2.74115 2.82763L3.05895 2.50485C3.29218 2.26986 3.66382 2.2634 3.88808 2.48935L5.01711 3.62685C5.24137 3.85281 5.23493 4.22854 5.0017 4.46224L4.8146 4.65204L4.43271 5.03551C4.45321 5.07037 4.47244 5.10781 4.49423 5.14655C4.69414 5.50807 4.96712 6.00387 5.48484 6.52679C6.00257 7.04842 6.49337 7.32344 6.85219 7.52357C6.89064 7.54552 6.9291 7.56617 6.96498 7.58683L7.53397 7.01356C7.7672 6.77857 8.13885 6.77211 8.36311 6.99806L9.49209 8.13558C9.71507 8.36282 9.70738 8.73855 9.47543 8.97354Z" fill="#C49A6C" />
                                    </Svg>

                                    <Text style={{ fontSize: "10px", paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#414042", }}>{data.mobileNumber}</Text>
                                </View>
                            )}
                            {data?.email && (
                                <View style={{ flexDirection: "row", breakAll: true, gap: "12px", justifyContent: "start", alignItems: "center", paddingRight: " 4px" }}>
                                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M0 0V12H12V0H0ZM3.06278 3.53002H8.93722C9.06922 3.53002 9.18712 3.58037 9.27555 3.6643L6.00002 6.49322L2.72449 3.66559C2.8142 3.58166 2.93207 3.53002 3.06278 3.53002ZM2.56943 3.96385L4.93764 6.03874L2.56943 8.06714V3.96385ZM8.93722 8.46869H3.06278C2.93078 8.46869 2.81291 8.41705 2.72449 8.33441L5.15164 6.23887L6.00002 6.98774L6.84836 6.23887L9.27426 8.33441C9.18712 8.41705 9.06793 8.46869 8.93722 8.46869ZM9.43061 8.06714L7.06236 6.03874L9.43061 3.96256V8.06714Z" fill="#C49A6C" />
                                    </Svg>

                                    <Text style={{ fontSize: "10px", width: '80%', paddingTop: "2px", flexDirection: "row", fontWeight: 400, color: "#414042", }}>{data.email}</Text>
                                </View>
                            )}


                            {data?.location && (
                                <View style={{ flexDirection: "row", breakAll: true, justifyContent: "start", gap: "12px", alignItems: "center", paddingRight: " 4px" }}>
                                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M6.0284 5.79743C6.59204 5.79743 7.04894 5.33736 7.04894 4.76982C7.04894 4.20228 6.59204 3.74219 6.0284 3.74219C5.46476 3.74219 5.00781 4.20228 5.00781 4.76982C5.00781 5.33736 5.46476 5.79743 6.0284 5.79743Z" fill="#C49A6C" />
                                        <Path d="M0 0V12H12V0H0ZM8.23624 6.76694L6.00127 10.0194L3.76251 6.76178C2.92697 5.63976 3.04869 3.78824 4.0252 2.80438C4.55318 2.27243 5.25415 1.97935 6.00127 1.97935C6.74711 1.97935 7.4494 2.27243 7.97738 2.80438C8.95389 3.78954 9.07435 5.64105 8.23624 6.76694Z" fill="#C49A6C" />
                                    </Svg>

                                    <Text style={{ fontSize: "10px", flexDirection: "row", fontWeight: 400, color: "#414042", }}>{data.location}</Text>
                                </View>
                            )}
                        </View>





                    </View>
                </View>
                <View style={{ width: "351px", padding: " 16px", display: "flex", flexDirection: "column", gap: "36px" }}>
                    <View style={{ flexDirection: "column", marginTop: 24, gap: 4 }}>
                        <Text style={{ color: "#C49A6C", fontWeight: 400, fontSize: "24px", }}>{data.firstName} {data.lastName}</Text>
                        <Text style={{ fontSize: "12px", fontWeight: 500, color: "#58595B" }}>{data.designation}</Text>
                    </View>
                    <View style={{ height: "10px", width: "120%", backgroundColor: "#C49A6C" }}></View>

                    <View style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>



                        <Text style={{ color: "#C49A6C", fontWeight: 500, fontSize: "16px" }}>EXPERIENCE</Text>



                        <View style={{ display: "flex", flexDirection: "column", gap: 16, }} >
                            {data?.experience?.map((detail, index) => (
                                <>

                                    <View style={{ display: "flex", flexDirection: "column", gap: 4, justifyContent: "space-between", }}>
                                        <Text style={{ color: "#58595B", fontSize: "12px", fontWeight: 400, }}>{detail.duration?.start?.year}-{" "}{detail.currentlyWorking ? "Present" : detail.duration?.end?.year}</Text>
                                        <Text style={{ color: "#58595B", fontSize: "12px", fontWeight: 400 }}>{detail.designation}</Text>
                                        <Text style={{ color: "#58595B", fontSize: "12px", fontWeight: 400, }}>{detail.organization}</Text>
                                        <Text style={{ color: "#58595B", fontSize: "12px", fontWeight: 400, }}>{detail.description}</Text>



                                    </View>






                                </>
                            ))}
                        </View>
                    </View>



                    <View style={{ flexDirection: "row", gap: "16px", }}>

                    {data?.skills?.length > 0 && (
                            <View style={{flexDirection: "column", gap: "16px", }}>


                                <Text style={{ color: "#C49A6C",fontSize:12 }}> PERSONAL SKILLS</Text>



                                <View

                                >

                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >
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
                                                                color: "#58595B",
                                                                fontSize: "12px",
                                                                fontWeight: "300",
                                                                width: "80px",
                                                            }}
                                                        >
                                                            {detail.skill}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                width: "50.21%",
                                                                height: "3.78px",
                                                                display: "flex",
                                                                marginBottom: "1px",
                                                                backgroundColor: "#D1D3D4",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: `${ratingPercentage}%`,
                                                                    height: "100%",
                                                                    backgroundColor: "#C49A6C",
                                                                }}
                                                            ></View>
                                                        </View>
                                                    </View>
                                              
                                            );
                                        })}
                                    </View>

                                </View>

                            </View>
                        )}


                        {data?.skills?.length > 0 && (
                            <View style={{flexDirection: "column", gap: "16px", }}>


                                <Text style={{ color: "#C49A6C",fontSize:12 }}> SOFTWARE SKILLS</Text>



                                <View

                                >

                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >
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
                                                                color: "#58595B",
                                                                fontSize: "12px",
                                                                fontWeight: "300",
                                                                width: "80px",
                                                            }}
                                                        >
                                                            {detail.skill}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                width: "50.21%",
                                                                height: "3.78px",
                                                                display: "flex",
                                                                marginBottom: "1px",
                                                                backgroundColor: "#D1D3D4",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: `${ratingPercentage}%`,
                                                                    height: "100%",
                                                                    backgroundColor: "#C49A6C",
                                                                }}
                                                            ></View>
                                                        </View>
                                                    </View>
                                              
                                            );
                                        })}
                                    </View>

                                </View>

                            </View>
                        )}

                    </View>
                    {data?.hobbies?.length > 0 && (
                            <View style={{ flexDirection: "column", gap: "16px", }}>

                                <View style={{ }}>

                                    <Text style={{ color: "#C49A6C" }}>HOBBIES</Text>

                                </View>
                                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "16px", }}>
                                    {data?.hobbies?.map((item, index) => (
                                        <View key={index} style={{ color: "#414042", fontSize: "12px", width: "calc(40% - 8px)" }}>
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
        </Page>

    )
}

export default Template38


